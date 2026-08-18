const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

const app = express();

// =========================================================
// ✅ MDDLEWARE
// =========================================================

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// =========================================================
// ✅ MONGODB CONNECTION
// =========================================================

const MONGODB_URI = process.env.MONGODB_URI || 
  "mongodb+srv://kabusbaba:GpzqCqKyAlS6N7Kn@cluster0.zh0a3gc.mongodb.net/miningusdt?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// =========================================================
// ✅ SERVE STATIC FILES
// =========================================================

app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// صفحات HTML
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
// ✅ USER MODEL
// =========================================================

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  plan: { type: String, default: null },
  planAmount: { type: Number, default: 0 },
  planRate: { type: Number, default: 0 },
  planDays: { type: Number, default: 0 },
  planStart: { type: Date, default: null },
  timerStart: { type: Number, default: null },
  lastProfitDate: { type: String, default: null },
  referralCode: { type: String, unique: true, required: true, index: true },
  referredBy: { type: String, default: null },
  referralBonus: { type: Number, default: 0 },
  referredUsers: [
    {
      email: String,
      name: String,
      joinedAt: Date,
      totalDeposits: { type: Number, default: 0 },
      commissionEarned: { type: Number, default: 0 }
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
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

// =========================================================
// ✅ HELPER FUNCTIONS
// =========================================================

function generateUniqueUserId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

function generateReferralCode(userId) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code + userId.slice(-4);
}

async function createUniqueUserId() {
  let userId;
  let exists = true;
  let attempts = 0;
  while (exists && attempts < 100) {
    userId = generateUniqueUserId();
    exists = await User.exists({ userId });
    attempts++;
  }
  return userId || generateUniqueUserId() + Date.now().toString().slice(-4);
}

async function createUniqueReferralCode(userId) {
  let referralCode;
  let exists = true;
  let attempts = 0;
  while (exists && attempts < 100) {
    referralCode = generateReferralCode(userId);
    exists = await User.exists({ referralCode });
    attempts++;
  }
  return referralCode || generateReferralCode(userId) + Math.random().toString(36).slice(-4);
}

// =========================================================
// ✅ API: HEALTH CHECK
// =========================================================

app.get("/api/health", async (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    server: "online",
    mongodb: mongoConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// =========================================================
// ✅ API: REGISTER
// =========================================================

app.post("/api/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const referralCode = String(req.body.referralCode || "").trim().toUpperCase();

    // التحقق من الحقول المطلوبة
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "❌ الاسم يجب أن يكون 2 أحرف على الأقل"
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد الإلكتروني غير صحيح"
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      });
    }

    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد مستخدم بالفعل"
      });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء معرف فريد وكود دعوة
    const userId = await createUniqueUserId();
    const referralCodeGenerated = await createUniqueReferralCode(userId);

    // إنشاء المستخدم الجديد
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
      referralCode: referralCodeGenerated,
      referredBy: null,
      referralBonus: 0,
      referredUsers: [],
      transactions: []
    });

    // معالجة كود الدعوة
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer.email;
        if (!Array.isArray(referrer.referredUsers)) {
          referrer.referredUsers = [];
        }
        referrer.referredUsers.push({
          email: email,
          name: name,
          joinedAt: new Date(),
          totalDeposits: 0,
          commissionEarned: 0
        });
        await referrer.save();
        console.log(`✅ تم ربط المستخدم ${email} بالداعي ${referrer.email}`);
      } else {
        console.log(`⚠️ كود الدعوة ${referralCode} غير صحيح`);
      }
    }

    await newUser.save();

    // إرجاع البيانات بدون كلمة المرور
    const userResponse = {
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
      transactions: newUser.transactions,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: "✅ تم إنشاء الحساب بنجاح",
      user: userResponse
    });

  } catch (error) {
    console.error("❌ Register error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: LOGIN
// =========================================================

app.post("/api/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد وكلمة المرور مطلوبان"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "❌ البريد أو كلمة المرور غير صحيحة"
      });
    }

    // إرجاع البيانات بدون كلمة المرور
    const userResponse = {
      userId: user.userId,
      _id: user._id.toString(),
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
      transactions: user.transactions.slice(0, 20),
      createdAt: user.createdAt
    };

    return res.json({
      success: true,
      message: "✅ تم تسجيل الدخول بنجاح",
      user: userResponse
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: GET USER BY ID
// =========================================================

app.get("/api/user/:identifier", async (req, res) => {
  try {
    const identifier = String(req.params.identifier || "").trim();
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "❌ المعرف مطلوب"
      });
    }

    const user = await User.findOne({
      $or: [
        { userId: identifier },
        { email: identifier.toLowerCase() },
        { referralCode: identifier.toUpperCase() }
      ]
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    return res.json({
      success: true,
      user: {
        userId: user.userId,
        _id: user._id.toString(),
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
        transactions: user.transactions,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error("❌ Get user error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ACTIVATE PLAN
// =========================================================

app.post("/api/activate-plan", async (req, res) => {
  try {
    const { userId, planId, planAmount, planRate, planDays } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "❌ معرف المستخدم مطلوب"
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    // التحقق من الرصيد
    if (Number(user.balance || 0) < planAmount) {
      return res.status(400).json({
        success: false,
        message: "❌ الرصيد غير كافٍ لتفعيل هذه الخطة"
      });
    }

    // خصم المبلغ من الرصيد
    user.balance = Number(user.balance || 0) - planAmount;

    // تحديث بيانات الخطة
    user.plan = planId;
    user.planAmount = planAmount;
    user.planRate = planRate;
    user.planDays = planDays;
    user.planStart = new Date();
    user.timerStart = Date.now();

    // تسجيل المعاملة
    if (!user.transactions) user.transactions = [];
    user.transactions.unshift({
      type: `📊 تفعيل خطة ${planId}`,
      amount: -planAmount,
      date: new Date().toISOString(),
      status: '✅ مكتمل'
    });

    await user.save();

    return res.json({
      success: true,
      message: "✅ تم تفعيل الخطة بنجاح",
      user: {
        userId: user.userId,
        _id: user._id.toString(),
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
        transactions: user.transactions,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error("❌ Activate plan error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ADMIN - GET ALL USERS
// =========================================================

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    const formattedUsers = users.map(user => ({
      ...user.toObject(),
      id: user.userId || user._id.toString(),
      userId: user.userId || user._id.toString()
    }));
    console.log(`✅ تم جلب ${formattedUsers.length} مستخدم`);
    return res.json({
      success: true,
      users: formattedUsers
    });
  } catch (error) {
    console.error("❌ Admin users error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم",
      users: []
    });
  }
});

// =========================================================
// ✅ API: ADMIN - GET SINGLE USER
// =========================================================

app.get("/api/admin/user/:identifier", async (req, res) => {
  try {
    const identifier = String(req.params.identifier || "").trim();
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "❌ المعرف مطلوب"
      });
    }

    const user = await User.findOne({
      $or: [
        { userId: identifier },
        { email: identifier.toLowerCase() },
        { referralCode: identifier.toUpperCase() }
      ]
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    return res.json({
      success: true,
      user: {
        ...user.toObject(),
        id: user.userId || user._id.toString(),
        userId: user.userId || user._id.toString()
      }
    });

  } catch (error) {
    console.error("❌ Admin user error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ADMIN - UPDATE USER
// =========================================================

app.put("/api/admin/user/:userId", async (req, res) => {
  try {
    const userId = String(req.params.userId || "").trim();
    const updateData = req.body;

    // حذف الحقول التي لا يجب تحديثها
    delete updateData._id;
    delete updateData.__v;
    delete updateData.password;
    delete updateData.id;

    // التأكد من وجود userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "❌ معرف المستخدم مطلوب"
      });
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    return res.json({
      success: true,
      message: "✅ تم تحديث المستخدم بنجاح",
      user: {
        ...user.toObject(),
        id: user.userId || user._id.toString(),
        userId: user.userId || user._id.toString()
      }
    });

  } catch (error) {
    console.error("❌ Admin update error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ADMIN - BALANCE (DEPOSIT/WITHDRAW)
// =========================================================

app.post("/api/admin/balance", async (req, res) => {
  try {
    const { userId, email, amount, type, adminName } = req.body;

    if (!userId && !email) {
      return res.status(400).json({
        success: false,
        message: "❌ المعرف أو البريد مطلوب"
      });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "❌ المبلغ غير صالح"
      });
    }

    if (type !== "deposit" && type !== "withdraw") {
      return res.status(400).json({
        success: false,
        message: "❌ نوع العملية غير صالح"
      });
    }

    let user;
    if (userId) {
      user = await User.findOne({ userId });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    let balanceChanged = 0;
    let txType = "";
    let txStatus = "✅ مكتمل";

    if (type === "deposit") {
      user.balance = Number(user.balance || 0) + amount;
      balanceChanged = amount;
      txType = "💰 إيداع (أدمن)";
    } else if (type === "withdraw") {
      if (Number(user.balance || 0) < amount) {
        return res.status(400).json({
          success: false,
          message: "❌ الرصيد غير كافٍ"
        });
      }
      user.balance = Number(user.balance || 0) - amount;
      balanceChanged = -amount;
      txType = "💸 سحب (أدمن)";
    }

    if (!user.transactions) user.transactions = [];
    user.transactions.unshift({
      type: txType,
      amount: balanceChanged,
      date: new Date().toISOString(),
      status: txStatus,
      note: `بواسطة الأدمن ${adminName || 'غير معروف'}`
    });

    await user.save();

    return res.json({
      success: true,
      message: `✅ تم ${type === 'deposit' ? 'الإيداع' : 'السحب'} بنجاح`,
      user: {
        userId: user.userId,
        id: user.userId,
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
        transactions: user.transactions,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error("❌ Admin balance error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ADMIN - DELETE USER
// =========================================================

app.delete("/api/admin/user/:userId", async (req, res) => {
  try {
    const userId = String(req.params.userId || "").trim();
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "❌ المعرف مطلوب"
      });
    }

    const result = await User.findOneAndDelete({ userId });
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
    console.error("❌ Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ API: ADMIN - GET STATS
// =========================================================

app.get("/api/admin/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBalance = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$balance" } } }
    ]);
    const totalProfit = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$profit" } } }
    ]);
    const activePlans = await User.countDocuments({
      plan: { $ne: null, $ne: "" }
    });

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalBalance: totalBalance[0]?.total || 0,
        totalProfit: totalProfit[0]?.total || 0,
        activePlans
      }
    });

  } catch (error) {
    console.error("❌ Admin stats error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ خطأ في الخادم"
    });
  }
});

// =========================================================
// ✅ START SERVER
// =========================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/admin/users`);
  console.log(`🔗 MongoDB: ${MONGODB_URI ? 'متصلة' : 'غير متصلة'}`);
});

// معالجة الأخطاء غير المتوقعة
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

module.exports = app;
