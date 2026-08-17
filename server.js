const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// =========================================================
// إعدادات السيرفر
// =========================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================================================
// MongoDB
// =========================================================
// مهم:
// ضع MONGODB_URI داخل Render > Environment Variables
//
// مثال:
// MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/miningusdt
//
// لا تضع كلمة المرور داخل هذا الملف.
// =========================================================

const MONGODB_URI = process.env.MONGODB_URI;

let mongoConnected = false;

async function connectMongoDB() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI غير موجود في Environment Variables");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    mongoConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    mongoConnected = false;
    console.error("❌ MongoDB Error:", error.message);
  }
}

// مراقبة حالة MongoDB
mongoose.connection.on("connected", () => {
  mongoConnected = true;
  console.log("✅ MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  mongoConnected = false;
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  mongoConnected = false;
  console.error("❌ MongoDB connection error:", error.message);
});

// =========================================================
// الملفات الثابتة
// =========================================================
// index.html عندك موجود في جذر المشروع وليس public/
// لذلك نستخدم __dirname مباشرة.
//
// مثال هيكل المشروع:
//
// project/
// ├── server.js
// ├── package.json
// ├── index.html
// ├── login.html
// ├── register.html
// ├── dashboard.html
// ├── plans.html
// ├── style.css
// ├── script.js
// └── ...
// =========================================================

app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// =========================================================
// Middleware للتأكد من اتصال MongoDB للـ API
// =========================================================

function requireMongo(req, res, next) {
  if (!mongoConnected || mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "❌ قاعدة البيانات غير متصلة حاليًا، حاول مرة أخرى بعد قليل."
    });
  }

  next();
}

// =========================================================
// نموذج المستخدم User Model
// =========================================================

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
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
    required: true
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
// دوال مساعدة
// =========================================================

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

// =========================================================
// Health Check
// =========================================================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    server: "online",
    mongodb: mongoConnected ? "connected" : "disconnected",
    time: new Date().toISOString()
  });
});

// =========================================================
// تسجيل مستخدم جديد
// =========================================================

app.post("/register", requireMongo, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      referralCode
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ جميع الحقول المطلوبة يجب تعبئتها"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد مستخدم بالفعل"
      });
    }

    // إنشاء User ID فريد
    let userId;
    let isUnique = false;

    while (!isUnique) {
      userId = generateUniqueUserId();

      const existing = await User.findOne({
        userId
      });

      if (!existing) {
        isUnique = true;
      }
    }

    // إنشاء Referral Code فريد
    let referralCodeGenerated;
    let isReferralUnique = false;

    while (!isReferralUnique) {
      referralCodeGenerated = generateReferralCode(userId);

      const existing = await User.findOne({
        referralCode: referralCodeGenerated
      });

      if (!existing) {
        isReferralUnique = true;
      }
    }

    const newUser = new User({
      userId,
      name: name.trim(),
      email: normalizedEmail,
      password,
      referralCode: referralCodeGenerated,
      referredBy: null,
      balance: 0,
      profit: 0,
      transactions: [],
      referredUsers: []
    });

    // نظام الإحالة
    if (referralCode) {
      const referrer = await User.findOne({
        referralCode: referralCode.trim()
      });

      if (referrer) {
        newUser.referredBy = referrer.email;

        referrer.referredUsers.push({
          email: normalizedEmail,
          name: name.trim(),
          joinedAt: new Date(),
          totalDeposits: 0,
          commissionEarned: 0
        });

        await referrer.save();
      }
    }

    await newUser.save();

    console.log(
      `✅ New user registered: ${newUser.email}`
    );

    res.status(201).json({
      success: true,
      message: "✅ تم إنشاء الحساب بنجاح",

      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
        profit: newUser.profit,
        referralCode: newUser.referralCode,
        referredBy: newUser.referredBy
      }
    });

  } catch (error) {
    console.error("❌ Register error:", error);

    res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// تسجيل الدخول
// =========================================================

app.post("/login", requireMongo, async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد وكلمة المرور مطلوبان"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
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

    console.log(`✅ User logged in: ${user.email}`);

    res.json({
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
        referralBonus: user.referralBonus,
        referredBy: user.referredBy,
        referredUsers: user.referredUsers,
        transactions: user.transactions.slice(0, 20)
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);

    res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// جلب جميع المستخدمين - Admin
// =========================================================

app.get("/admin/users", requireMongo, async (req, res) => {
  try {
    const users = await User
      .find({})
      .select("-password");

    res.json({
      success: true,
      users
    });

  } catch (error) {
    console.error("❌ Admin users error:", error);

    res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// جلب مستخدم محدد - Admin
// =========================================================

app.get(
  "/admin/user/:userId",
  requireMongo,
  async (req, res) => {
    try {
      const user = await User
        .findOne({
          userId: req.params.userId
        })
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "❌ المستخدم غير موجود"
        });
      }

      res.json({
        success: true,
        user
      });

    } catch (error) {
      console.error("❌ Admin user error:", error);

      res.status(500).json({
        success: false,
        message: "❌ خطأ في الخادم"
      });
    }
  }
);

// =========================================================
// تعديل رصيد المستخدم - Admin
// =========================================================

app.post(
  "/admin/user/:userId/balance",
  requireMongo,
  async (req, res) => {
    try {
      const {
        amount,
        type
      } = req.body;

      const numericAmount = Number(amount);

      if (
        !Number.isFinite(numericAmount) ||
        numericAmount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "❌ قيمة المبلغ غير صحيحة"
        });
      }

      if (
        type !== "deposit" &&
        type !== "withdraw"
      ) {
        return res.status(400).json({
          success: false,
          message: "❌ نوع العملية غير صحيح"
        });
      }

      const user = await User.findOne({
        userId: req.params.userId
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "❌ المستخدم غير موجود"
        });
      }

      if (type === "deposit") {

        user.balance += numericAmount;

        user.transactions.unshift({
          type: "💰 إيداع (أدمن)",
          amount: numericAmount,
          date: new Date(),
          status: "✅ مكتمل"
        });

      } else if (type === "withdraw") {

        if (user.balance < numericAmount) {
          return res.status(400).json({
            success: false,
            message: "❌ الرصيد غير كافٍ"
          });
        }

        user.balance -= numericAmount;

        user.transactions.unshift({
          type: "💸 سحب (أدمن)",
          amount: -numericAmount,
          date: new Date(),
          status: "✅ مكتمل"
        });
      }

      await user.save();

      res.json({
        success: true,
        message: "✅ تم التعديل بنجاح",
        balance: user.balance
      });

    } catch (error) {
      console.error(
        "❌ Admin balance error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "❌ خطأ في الخادم"
      });
    }
  }
);

// =========================================================
// حذف مستخدم - Admin
// =========================================================

app.delete(
  "/admin/user/:userId",
  requireMongo,
  async (req, res) => {
    try {
      const result =
        await User.findOneAndDelete({
          userId: req.params.userId
        });

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "❌ المستخدم غير موجود"
        });
      }

      res.json({
        success: true,
        message: "🗑️ تم حذف الحساب بنجاح"
      });

    } catch (error) {
      console.error(
        "❌ Delete user error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "❌ خطأ في الخادم"
      });
    }
  }
);

// =========================================================
// 404 للـ API
// =========================================================

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ API endpoint غير موجود"
  });
});

// =========================================================
// Error Handler
// =========================================================

app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);

  res.status(500).json({
    success: false,
    message: "❌ حدث خطأ داخلي في الخادم"
  });
});

// =========================================================
// تشغيل السيرفر
// =========================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("========================================");
  console.log("🚀 Server started");
  console.log(`🚀 Port: ${PORT}`);
  console.log(`📂 Static files: ${__dirname}`);
  console.log("========================================");

  await connectMongoDB();
});
