const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* =========================================================
   BASIC SERVER SETTINGS
========================================================= */

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* =========================================================
   MONGODB
========================================================= */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing from Render Environment Variables.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  });

/* =========================================================
   STATIC WEBSITE FILES
   Your HTML/CSS/JS files are in the project root.
========================================================= */

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =========================================================
   USER MODEL
========================================================= */

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    balance: {
      type: Number,
      default: 0
    },

    profit: {
      type: Number,
      default: 0
    },

    plan: {
      type: String,
      default: null
    },

    planAmount: {
      type: Number,
      default: 0
    },

    planRate: {
      type: Number,
      default: 0
    },

    planDays: {
      type: Number,
      default: 0
    },

    planStart: {
      type: Date,
      default: null
    },

    timerStart: {
      type: Number,
      default: null
    },

    lastProfitDate: {
      type: String,
      default: null
    },

    referralCode: {
      type: String,
      unique: true,
      required: true,
      index: true
    },

    referredBy: {
      type: String,
      default: null
    },

    referralBonus: {
      type: Number,
      default: 0
    },

    referredUsers: [
      {
        email: String,
        name: String,
        joinedAt: Date,
        totalDeposits: {
          type: Number,
          default: 0
        },
        commissionEarned: {
          type: Number,
          default: 0
        }
      }
    ],

    transactions: [
      {
        type: String,
        amount: Number,
        date: Date,
        status: String,
        note: String,
        game: String,
        address: String,
        network: String,
        bet: Number,
        playerTotal: Number,
        dealerTotal: Number,
        guess: Number,
        target: Number,
        dice: [Number],
        sum: Number,
        symbols: [String],
        choice: String,
        result: String
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    minimize: false
  }
);

const User = mongoose.model("User", UserSchema);

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function generateUniqueUserId() {
  return Math.floor(
    100000000 + Math.random() * 900000000
  ).toString();
}

function generateReferralCode(userId) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for (let i = 0; i < 8; i++) {
    code += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return code + userId.slice(-4);
}

async function createUniqueUserId() {
  let userId;
  let exists = true;

  while (exists) {
    userId = generateUniqueUserId();

    exists = await User.exists({
      userId
    });
  }

  return userId;
}

async function createUniqueReferralCode(userId) {
  let referralCode;
  let exists = true;

  while (exists) {
    referralCode = generateReferralCode(userId);

    exists = await User.exists({
      referralCode
    });
  }

  return referralCode;
}

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", async (req, res) => {
  const mongoConnected =
    mongoose.connection.readyState === 1;

  res.json({
    success: true,
    server: "online",
    mongodb: mongoConnected ? "connected" : "disconnected"
  });
});

/* =========================================================
   REGISTER
========================================================= */

app.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body.password || "");

    const referralCode = String(
      req.body.referralCode || ""
    )
      .trim()
      .toUpperCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ جميع الحقول المطلوبة يجب تعبئتها"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد مستخدم بالفعل"
      });
    }

    /* -----------------------------------------------------
       Generate ONE ID on the server.
       MongoDB becomes the source of truth.
    ----------------------------------------------------- */

    const userId = await createUniqueUserId();

    const referralCodeGenerated =
      await createUniqueReferralCode(userId);

    const newUser = new User({
      userId,
      name,
      email,
      password,

      balance: 0,
      profit: 0,

      plan: null,
      planAmount: 0,
      planRate: 0,
      planDays: 0,
      planStart: null,

      timerStart: null,
      lastProfitDate: null,

      referralCode: referralCodeGenerated,
      referredBy: null,
      referralBonus: 0,

      referredUsers: [],
      transactions: []
    });

    /* -----------------------------------------------------
       Referral
    ----------------------------------------------------- */

    if (referralCode) {
      const referrer = await User.findOne({
        referralCode
      });

      if (referrer) {
        newUser.referredBy = referrer.email;

        if (!Array.isArray(referrer.referredUsers)) {
          referrer.referredUsers = [];
        }

        referrer.referredUsers.push({
          email,
          name,
          joinedAt: new Date(),
          totalDeposits: 0,
          commissionEarned: 0
        });

        await referrer.save();
      }
    }

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "✅ تم إنشاء الحساب بنجاح",

      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,

        balance: newUser.balance,
        profit: newUser.profit,

        plan: newUser.plan,
        planAmount: newUser.planAmount,
        planRate: newUser.planRate,
        planDays: newUser.planDays,
        planStart: newUser.planStart,

        timerStart: newUser.timerStart,

        referralCode: newUser.referralCode,
        referredBy: newUser.referredBy,
        referralBonus: newUser.referralBonus,

        referredUsers: newUser.referredUsers,
        transactions: newUser.transactions
      }
    });

  } catch (error) {
    console.error("❌ Register error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد أو المعرف مستخدم بالفعل"
      });
    }

    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

/* =========================================================
   LOGIN
========================================================= */

app.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد وكلمة المرور مطلوبان"
      });
    }

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    return res.json({
      success: true,
      message: "✅ تم تسجيل الدخول بنجاح",

      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,

        balance: user.balance,
        profit: user.profit,

        plan: user.plan,
        planAmount: user.planAmount,
        planRate: user.planRate,
        planDays: user.planDays,
        planStart: user.planStart,

        timerStart: user.timerStart,

        referralCode: user.referralCode,
        referredBy: user.referredBy,
        referralBonus: user.referralBonus,

        referredUsers: user.referredUsers,

        transactions:
          user.transactions.slice(0, 20)
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);

    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

/* =========================================================
   ADMIN - ALL USERS
========================================================= */

app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      users
    });

  } catch (error) {
    console.error("❌ Admin users error:", error);

    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

/* =========================================================
   ADMIN - GET ONE USER
========================================================= */

app.get("/admin/user/:userId", async (req, res) => {
  try {
    const userId = String(
      req.params.userId || ""
    ).trim();

    const user = await User.findOne({
      userId
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    return res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error("❌ Admin user error:", error);

    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

/* =========================================================
   ADMIN - CHANGE USER BALANCE
========================================================= */

app.post(
  "/admin/user/:userId/balance",
  async (req, res) => {
    try {
      const userId = String(
        req.params.userId || ""
      ).trim();

      const amount = Number(
        req.body.amount
      );

      const type = String(
        req.body.type || ""
      ).trim().toLowerCase();

      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "❌ المبلغ غير صالح"
        });
      }

      if (
        type !== "deposit" &&
        type !== "withdraw"
      ) {
        return res.status(400).json({
          success: false,
          message: "❌ نوع العملية غير صالح"
        });
      }

      const user = await User.findOne({
        userId
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "❌ المستخدم غير موجود"
        });
      }

      if (type === "deposit") {

        user.balance += amount;

        user.transactions.unshift({
          type: "💰 إيداع (أدمن)",
          amount,
          date: new Date(),
          status: "✅ مكتمل"
        });

      }

      if (type === "withdraw") {

        if (user.balance < amount) {
          return res.status(400).json({
            success: false,
            message: "❌ الرصيد غير كافٍ"
          });
        }

        user.balance -= amount;

        user.transactions.unshift({
          type: "💸 سحب (أدمن)",
          amount: -amount,
          date: new Date(),
          status: "✅ مكتمل"
        });
      }

      await user.save();

      return res.json({
        success: true,
        message: "✅ تم التعديل بنجاح",
        balance: user.balance
      });

    } catch (error) {
      console.error(
        "❌ Admin balance error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "❌ خطأ في الخادم"
      });
    }
  }
);

/* =========================================================
   ADMIN - DELETE USER
========================================================= */

app.delete(
  "/admin/user/:userId",
  async (req, res) => {
    try {
      const userId = String(
        req.params.userId || ""
      ).trim();

      const result =
        await User.findOneAndDelete({
          userId
        });

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "❌ المستخدم غير موجود"
        });
      }

      return res.json({
        success: true,
        message: "🗑️ تم حذف الحساب بنجاح"
      });

    } catch (error) {
      console.error(
        "❌ Delete user error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "❌ خطأ في الخادم"
      });
    }
  }
);

/* =========================================================
   404 API RESPONSE
========================================================= */

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ API endpoint not found"
  });
});

/* =========================================================
   SERVER
========================================================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});
