const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// =========================================================
// MongoDB
// =========================================================

const MONGODB_URI =
  "mongodb+srv://kabusbaba:Kabus123456@cluster0.zh0a3gc.mongodb.net/miningusdt?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) =>
    console.error("❌ MongoDB Connection Error:", error)
  );

// =========================================================
// Static Files
// =========================================================

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:page.html", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, `${page}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("الصفحة غير موجودة");
  }
});

// =========================================================
// User Schema
// =========================================================

const UserSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", UserSchema);

// =========================================================
// Helpers
// =========================================================

function generateUniqueUserId() {
  return Math.floor(
    100000000 + Math.random() * 900000000
  ).toString();
}

function generateReferralCode(userId) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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
  let attempts = 0;

  while (exists && attempts < 100) {
    userId = generateUniqueUserId();

    exists = await User.exists({
      userId
    });

    attempts++;
  }

  return (
    userId ||
    generateUniqueUserId() +
      Date.now().toString().slice(-4)
  );
}

async function createUniqueReferralCode(userId) {
  let referralCode;
  let exists = true;
  let attempts = 0;

  while (exists && attempts < 100) {
    referralCode =
      generateReferralCode(userId);

    exists = await User.exists({
      referralCode
    });

    attempts++;
  }

  return (
    referralCode ||
    generateReferralCode(userId) +
      Math.random().toString(36).slice(-4)
  );
}

// =========================================================
// HEALTH
// =========================================================

app.get("/api/health", async (req, res) => {
  const mongoConnected =
    mongoose.connection.readyState === 1;

  res.json({
    success: true,
    server: "online",
    mongodb: mongoConnected
      ? "connected"
      : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// =========================================================
// REGISTER
// =========================================================

app.post("/api/register", async (req, res) => {
  try {
    const name =
      String(req.body.name || "").trim();

    const email =
      String(req.body.email || "")
        .trim()
        .toLowerCase();

    const password =
      String(req.body.password || "");

    const referralCode =
      String(req.body.referralCode || "")
        .trim()
        .toUpperCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "❌ جميع الحقول المطلوبة يجب تعبئتها"
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "❌ البريد مستخدم بالفعل"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const userId =
      await createUniqueUserId();

    const referralCodeGenerated =
      await createUniqueReferralCode(userId);

    const newUser = new User({
      userId,
      name,
      email,
      password: hashedPassword,

      balance: 0,
      profit: 0,

      plan: null,
      planAmount: 0,
      planRate: 0,
      planDays: 0,

      planStart: null,
      timerStart: null,
      lastProfitDate: null,

      referralCode:
        referralCodeGenerated,

      referredBy: null,
      referralBonus: 0,

      referredUsers: [],
      transactions: []
    });

    if (referralCode) {
      const referrer =
        await User.findOne({
          referralCode
        });

      if (referrer) {
        newUser.referredBy =
          referrer.email;

        if (
          !Array.isArray(
            referrer.referredUsers
          )
        ) {
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
      message:
        "✅ تم إنشاء الحساب بنجاح",

      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,

        balance: newUser.balance,
        profit: newUser.profit,

        plan: newUser.plan,
        planAmount:
          newUser.planAmount,

        planRate:
          newUser.planRate,

        planDays:
          newUser.planDays,

        planStart:
          newUser.planStart,

        timerStart:
          newUser.timerStart,

        referralCode:
          newUser.referralCode,

        referredBy:
          newUser.referredBy,

        referralBonus:
          newUser.referralBonus,

        referredUsers:
          newUser.referredUsers,

        transactions:
          newUser.transactions
      }
    });

  } catch (error) {
    console.error(
      "❌ Register error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// LOGIN
// =========================================================

app.post("/api/login", async (req, res) => {
  try {
    const email =
      String(req.body.email || "")
        .trim()
        .toLowerCase();

    const password =
      String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "❌ البريد وكلمة المرور مطلوبان"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message:
          "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    return res.json({
      success: true,
      message:
        "✅ تم تسجيل الدخول بنجاح",

      user: {
        userId: user.userId,
        _id: user._id.toString(),

        name: user.name,
        email: user.email,

        balance: user.balance,
        profit: user.profit,

        plan: user.plan,
        planAmount:
          user.planAmount,

        planRate:
          user.planRate,

        planDays:
          user.planDays,

        planStart:
          user.planStart,

        timerStart:
          user.timerStart,

        referralCode:
          user.referralCode,

        referredBy:
          user.referredBy,

        referralBonus:
          user.referralBonus,

        referredUsers:
          user.referredUsers,

        transactions:
          user.transactions.slice(0, 20),

        createdAt:
          user.createdAt
      }
    });

  } catch (error) {
    console.error(
      "❌ Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// ADMIN - ALL USERS
// =========================================================

app.get(
  "/api/admin/users",
  async (req, res) => {
    try {
      const users =
        await User.find({})
          .select("-password")
          .sort({
            createdAt: -1
          });

      const formattedUsers =
        users.map(user => ({
          ...user.toObject(),

          id:
            user.userId ||
            user._id.toString(),

          userId:
            user.userId ||
            user._id.toString()
        }));

      return res.json({
        success: true,
        users: formattedUsers
      });

    } catch (error) {
      console.error(
        "❌ Admin users error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "❌ خطأ في الخادم",
        users: []
      });
    }
  }
);

// =========================================================
// ADMIN - SINGLE USER
// =========================================================

app.get(
  "/api/admin/user/:identifier",
  async (req, res) => {
    try {
      const identifier =
        String(
          req.params.identifier || ""
        ).trim();

      if (!identifier) {
        return res.status(400).json({
          success: false,
          message:
            "❌ المعرف مطلوب"
        });
      }

      const user =
        await User.findOne({
          $or: [
            {
              userId: identifier
            },
            {
              email:
                identifier.toLowerCase()
            },
            {
              referralCode:
                identifier.toUpperCase()
            }
          ]
        })
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "❌ المستخدم غير موجود"
        });
      }

      return res.json({
        success: true,

        user: {
          ...user.toObject(),

          id:
            user.userId ||
            user._id.toString(),

          userId:
            user.userId ||
            user._id.toString()
        }
      });

    } catch (error) {
      console.error(
        "❌ Admin user error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "❌ خطأ في الخادم"
      });
    }
  }
);

// =========================================================
// ADMIN - UPDATE USER
// =========================================================

app.put(
  "/api/admin/user/:userId",
  async (req, res) => {
    try {
      const userId =
        String(
          req.params.userId || ""
        ).trim();

      const updateData =
        req.body;

      delete updateData._id;
      delete updateData.__v;
      delete updateData.password;

      const user =
        await User.findOneAndUpdate(
          { userId },

          {
            $set:
              updateData
          },

          {
            new: true,
            runValidators: true
          }
        )
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "❌ المستخدم غير موجود"
        });
      }

      return res.json({
        success: true,
        message:
          "✅ تم تحديث المستخدم بنجاح",

        user: {
          ...user.toObject(),

          id:
            user.userId ||
            user._id.toString(),

          userId:
            user.userId ||
            user._id.toString()
        }
      });

    } catch (error) {
      console.error(
        "❌ Admin update error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "❌ خطأ في الخادم"
      });
    }
  }
);

// =========================================================
// ADMIN - DEPOSIT / WITHDRAW
// =========================================================

app.post(
  "/api/admin/balance",
  async (req, res) => {
    try {
      const userId =
        String(
          req.body.userId || ""
        ).trim();

      const email =
        String(
          req.body.email || ""
        )
          .trim()
          .toLowerCase();

      const amount =
        Number(req.body.amount);

      const type =
        String(
          req.body.type || ""
        ).trim();

      const adminName =
        String(
          req.body.adminName ||
          "أدمن"
        ).trim();

      console.log(
        "📥 ADMIN BALANCE REQUEST:",
        {
          userId,
          email,
          amount,
          type,
          adminName
        }
      );

      if (!userId && !email) {
        return res.status(400).json({
          success: false,
          message:
            "❌ المعرف أو البريد مطلوب"
        });
      }

      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "❌ المبلغ غير صالح"
        });
      }

      if (
        type !== "deposit" &&
        type !== "withdraw"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "❌ نوع العملية غير صالح"
        });
      }

      let user = null;

      // البحث بالـ userId
      if (userId) {
        user =
          await User.findOne({
            userId
          });

        // احتياطياً MongoDB ObjectId
        if (
          !user &&
          mongoose.isValidObjectId(
            userId
          )
        ) {
          user =
            await User.findById(
              userId
            );
        }
      }

      // احتياطياً بالإيميل
      if (!user && email) {
        user =
          await User.findOne({
            email
          });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "❌ المستخدم غير موجود"
        });
      }

      const oldBalance =
        Number(user.balance || 0);

      let newBalance;
      let transactionAmount;
      let transactionType;

      // =========================
      // DEPOSIT
      // =========================

      if (type === "deposit") {
        newBalance =
          oldBalance + amount;

        transactionAmount =
          amount;

        transactionType =
          "💰 إيداع (أدمن)";
      }

      // =========================
      // WITHDRAW
      // =========================

      else {
        if (
          oldBalance < amount
        ) {
          return res.status(400).json({
            success: false,
            message:
              "❌ الرصيد غير كافٍ"
          });
        }

        newBalance =
          oldBalance - amount;

        transactionAmount =
          -amount;

        transactionType =
          "💸 سحب (أدمن)";
      }

      const transaction = {
        type:
          transactionType,

        amount:
          transactionAmount,

        date:
          new Date(),

        status:
          "✅ مكتمل",

        note:
          `بواسطة الأدمن ${adminName}`
      };

      console.log(
        "💾 Updating MongoDB:",
        {
          mongoId:
            user._id.toString(),

          userId:
            user.userId,

          oldBalance,

          newBalance,

          transactionAmount
        }
      );

      // =====================================================
      // التعديل المباشر في MongoDB
      // بدون user.save()
      // =====================================================

      const result =
        await User.updateOne(
          {
            _id: user._id
          },

          {
            $set: {
              balance:
                newBalance
            },

            $push: {
              transactions: {
                $each: [
                  transaction
                ],
                $position: 0
              }
            }
          }
        );

      console.log(
        "💾 MONGODB UPDATE RESULT:",
        result
      );

      if (
        !result.acknowledged ||
        result.matchedCount !== 1
      ) {
        return res.status(500).json({
          success: false,
          message:
            "❌ لم يتم تحديث الحساب في MongoDB"
        });
      }

      // جلب البيانات بعد التعديل
      const updatedUser =
        await User.findById(
          user._id
        )
          .select("-password")
          .lean();

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message:
            "❌ تعذر جلب الحساب بعد التحديث"
        });
      }

      console.log(
        "✅ UPDATED USER:",
        {
          userId:
            updatedUser.userId,

          balance:
            updatedUser.balance
        }
      );

      return res.json({
        success: true,

        message:
          type === "deposit"
            ? "✅ تم الإيداع بنجاح"
            : "✅ تم السحب بنجاح",

        user: {
          ...updatedUser,

          id:
            updatedUser.userId ||
            updatedUser._id.toString(),

          userId:
            updatedUser.userId ||
            updatedUser._id.toString(),

          _id:
            updatedUser._id.toString()
        }
      });

    } catch (error) {
      console.error(
        "❌❌❌ ADMIN BALANCE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "❌ خطأ في الخادم",

        error:
          error.message
      });
    }
  }
);

// =========================================================
// START SERVER
// =========================================================

const PORT =
  process.env.PORT || 3000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `📡 API available at: http://localhost:${PORT}/api`
    );
  }
);
