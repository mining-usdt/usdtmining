const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

const app = express();

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// =========================================================
// HANDLE OPTIONS REQUESTS
// =========================================================

app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// =========================================================
// MONGODB CONNECTION
// =========================================================

const MONGODB_URI =
  "mongodb+srv://kbsbaba:ahmet123123@cluster0.zh0a3gc.mongodb.net/miningusdt?appName=Cluster0";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is missing");
} else {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    })
    .then(() => {
      console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
      console.error("❌ MongoDB Connection Error:", error);
    });
}

// =========================================================
// STATIC FILES
// =========================================================

app.use(express.static(__dirname));

// =========================================================
// SERVE HTML PAGES DIRECTLY
// =========================================================

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("index.html غير موجود");
});

app.get("/index.html", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("index.html غير موجود");
});

app.get("/login.html", (req, res) => {
  const filePath = path.join(__dirname, "login.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("login.html غير موجود");
});

app.get("/register.html", (req, res) => {
  const filePath = path.join(__dirname, "register.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("register.html غير موجود");
});

app.get("/dashboard.html", (req, res) => {
  const filePath = path.join(__dirname, "dashboard.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("dashboard.html غير موجود");
});

app.get("/plans.html", (req, res) => {
  const filePath = path.join(__dirname, "plans.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("plans.html غير موجود");
});

app.get("/deposit.html", (req, res) => {
  const filePath = path.join(__dirname, "deposit.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("deposit.html غير موجود");
});

app.get("/withdraw.html", (req, res) => {
  const filePath = path.join(__dirname, "withdraw.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("withdraw.html غير موجود");
});

app.get("/contact.html", (req, res) => {
  const filePath = path.join(__dirname, "contact.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("contact.html غير موجود");
});

app.get("/games.html", (req, res) => {
  const filePath = path.join(__dirname, "games.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("games.html غير موجود");
});

app.get("/superpanel.html", (req, res) => {
  const filePath = path.join(__dirname, "superpanel.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("superpanel.html غير موجود");
});

app.get("/game-coin.html", (req, res) => {
  const filePath = path.join(__dirname, "game-coin.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-coin.html غير موجود");
});

app.get("/game-dice.html", (req, res) => {
  const filePath = path.join(__dirname, "game-dice.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-dice.html غير موجود");
});

app.get("/game-slots.html", (req, res) => {
  const filePath = path.join(__dirname, "game-slots.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-slots.html غير موجود");
});

app.get("/game-roulette.html", (req, res) => {
  const filePath = path.join(__dirname, "game-roulette.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-roulette.html غير موجود");
});

app.get("/game-guess.html", (req, res) => {
  const filePath = path.join(__dirname, "game-guess.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-guess.html غير موجود");
});

app.get("/game-blackjack.html", (req, res) => {
  const filePath = path.join(__dirname, "game-blackjack.html");
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  return res.status(404).send("game-blackjack.html غير موجود");
});

// =========================================================
// USER MODEL
// =========================================================

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
    transactions: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const User = mongoose.model("User", UserSchema);

// =========================================================
// HELPERS
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
  if (!userId) {
    userId = generateUniqueUserId() + Date.now().toString().slice(-4);
  }
  return userId;
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
  if (!referralCode) {
    referralCode = generateReferralCode(userId) + Math.random().toString(36).slice(-4);
  }
  return referralCode;
}

function publicUser(user) {
  if (!user) return null;
  return {
    userId: user.userId,
    _id: user._id ? user._id.toString() : undefined,
    id: user.userId,
    name: user.name,
    email: user.email,
    balance: Number(user.balance || 0),
    profit: Number(user.profit || 0),
    plan: user.plan,
    planAmount: Number(user.planAmount || 0),
    planRate: Number(user.planRate || 0),
    planDays: Number(user.planDays || 0),
    planStart: user.planStart,
    timerStart: user.timerStart,
    lastProfitDate: user.lastProfitDate,
    referralCode: user.referralCode,
    referredBy: user.referredBy,
    referralBonus: Number(user.referralBonus || 0),
    referredUsers: user.referredUsers || [],
    transactions: user.transactions || [],
    createdAt: user.createdAt
  };
}

// =========================================================
//  CORE PROFIT CALCULATION LOGIC
// =========================================================


 async function calculateAndAddProfit(user) {
  if (!user || !user.plan || !user.planStart || !user.timerStart) {
    return user;
  }

  try {
    const now = Date.now();

    // تحويل timerStart إلى رقم بشكل آمن
    const timerStartMs = new Date(user.timerStart).getTime();

    // تحويل planStart إلى رقم بشكل آمن
    const planStartMs = new Date(user.planStart).getTime();

    if (!Number.isFinite(timerStartMs) || !Number.isFinite(planStartMs)) {
      console.error("❌ Invalid timerStart or planStart:", {
        timerStart: user.timerStart,
        planStart: user.planStart
      });

      return user;
    }

    // مدة الخطة
    const planDays = Number(user.planDays || 0);

    const planEndMs =
      planStartMs +
      planDays * 24 * 60 * 60 * 1000;

    // إذا انتهت الخطة بالكامل
    if (planDays > 0 && now >= planEndMs) {
      const elapsedBeforeExpiry =
        now - timerStartMs;

      const fullDay =
        24 * 60 * 60 * 1000;

      const cycles =
        Math.floor(elapsedBeforeExpiry / fullDay);

      // إضافة الأرباح المكتملة قبل انتهاء الخطة
      if (cycles > 0) {
        const dailyProfit =
          (Number(user.planAmount || 0) *
            Number(user.planRate || 0)) / 100;

        const totalProfit =
          dailyProfit * cycles;

        user.balance =
          Number(user.balance || 0) +
          totalProfit;

        user.profit =
          Number(user.profit || 0) +
          totalProfit;

        if (!Array.isArray(user.transactions)) {
          user.transactions = [];
        }

        for (let i = 0; i < cycles; i++) {
          const cycleDate =
            timerStartMs +
            ((i + 1) * fullDay);

          user.transactions.unshift({
            type: `📈 ربح يومي (${user.plan})`,
            amount: dailyProfit,
            date: new Date(cycleDate),
            status: "✅ مكتمل"
          });
        }
      }

      // الخطة انتهت
      user.plan = null;
      user.planAmount = 0;
      user.planRate = 0;
      user.planDays = 0;
      user.planStart = null;
      user.timerStart = null;
      user.lastProfitDate = null;

      await user.save();

      console.log(
        "✅ Plan expired after processing pending profit:",
        user.userId
      );

      return user;
    }

    // حساب الوقت المنقضي من بداية دورة الربح
    const elapsed =
      now - timerStartMs;

    const fullDay =
      24 * 60 * 60 * 1000;

    // لم تكتمل 24 ساعة
    if (elapsed < fullDay) {
      return user;
    }

    // عدد الدورات المكتملة
    const cycles =
      Math.floor(elapsed / fullDay);

    if (cycles <= 0) {
      return user;
    }

    // الربح اليومي
    const dailyProfit =
      (Number(user.planAmount || 0) *
        Number(user.planRate || 0)) / 100;

    const totalProfit =
      dailyProfit * cycles;

    // إضافة الربح إلى الرصيد
    user.balance =
      Number(user.balance || 0) +
      totalProfit;

    user.profit =
      Number(user.profit || 0) +
      totalProfit;

    if (!Array.isArray(user.transactions)) {
      user.transactions = [];
    }

    // إضافة transaction لكل دورة مكتملة
    for (let i = 0; i < cycles; i++) {
      const cycleTime =
        timerStartMs +
        ((i + 1) * fullDay);

      user.transactions.unshift({
        type: `📈 ربح يومي (${user.plan})`,
        amount: dailyProfit,
        date: new Date(cycleTime),
        status: "✅ مكتمل"
      });
    }

    // آخر دورة مكتملة
    const lastCycleTime =
      timerStartMs +
      (cycles * fullDay);

    user.lastProfitDate =
      new Date(lastCycleTime);

    // تشغيل التايمر للدورة التالية
    user.timerStart =
      new Date(lastCycleTime);

    await user.save();

    console.log("✅ Profit cycle completed:", {
      userId: user.userId,
      plan: user.plan,
      cycles: cycles,
      dailyProfit: dailyProfit,
      totalProfit: totalProfit,
      newBalance: user.balance,
      newTimerStart: user.timerStart
    });

    return user;

  } catch (error) {
    console.error(
      "❌ calculateAndAddProfit error:",
      error
    );

    return user;
  }
}

// =========================================================
// HEALTH
// =========================================================

app.get("/api/health", async (req, res) => {
  try {
    const mongoConnected = mongoose.connection.readyState === 1;
    return res.json({
      success: true,
      server: "online",
      mongodb: mongoConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Health error:", error);
    return res.status(500).json({
      success: false,
      server: "online",
      mongodb: "error"
    });
  }
});

// =========================================================
// REGISTER
// =========================================================

app.post("/api/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const referralCode = String(req.body.referralCode || "").trim().toUpperCase();

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "❌ الاسم يجب أن يكون 2 أحرف على الأقل"
      });
    }
    if (!email || !email.includes("@")) {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد مستخدم بالفعل"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUniqueUserId();
    const referralCodeGenerated = await createUniqueReferralCode(userId);

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

    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer.email;
        if (!Array.isArray(referrer.referredUsers)) referrer.referredUsers = [];
        referrer.referredUsers.push({
          email,
          name,
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

    return res.status(201).json({
      success: true,
      message: "✅ تم إنشاء الحساب بنجاح",
      user: publicUser(newUser)
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد أو معرف المستخدم أو كود الدعوة مستخدم بالفعل"
      });
    }
    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في الخادم"
    });
  }
});

// =========================================================
// LOGIN
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

    await calculateAndAddProfit(user);

    return res.json({
      success: true,
      message: "✅ تم تسجيل الدخول بنجاح",
      user: {
        ...publicUser(user),
        transactions: (user.transactions || []).slice(0, 20)
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

// =========================================================
// GET USER
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

    await calculateAndAddProfit(user);

    return res.json({
      success: true,
      user: publicUser(user)
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
// ACTIVATE PLAN
// =========================================================

app.post("/api/activate-plan", async (req, res) => {
  try {
    const userId = String(req.body.userId || "").trim();
    const planId = String(req.body.planId || "").trim();
    const planAmount = Number(req.body.planAmount);
    const planRate = Number(req.body.planRate);
    const planDays = Number(req.body.planDays);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "❌ معرف المستخدم مطلوب"
      });
    }
    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "❌ معرف الخطة مطلوب"
      });
    }
    if (!Number.isFinite(planAmount) || planAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "❌ مبلغ الخطة غير صالح"
      });
    }
    if (!Number.isFinite(planRate) || planRate <= 0) {
      return res.status(400).json({
        success: false,
        message: "❌ نسبة الربح غير صالحة"
      });
    }
    if (!Number.isFinite(planDays) || planDays <= 0) {
      return res.status(400).json({
        success: false,
        message: "❌ مدة الخطة غير صالحة"
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    if (user.plan && Number(user.planAmount || 0) > 0 && user.timerStart) {
      return res.status(400).json({
        success: false,
        message: `⚠️ لديك خطة مفعلة بالفعل: ${user.plan}`
      });
    }

    const currentBalance = Number(user.balance || 0);
    if (currentBalance < planAmount) {
      return res.status(400).json({
        success: false,
        message: `⚠️ الرصيد غير كافي. رصيدك الحالي: $${currentBalance.toFixed(2)}`
      });
    }

    const activationTime = new Date();

    user.balance = currentBalance - planAmount;
    user.plan = planId;
    user.planAmount = planAmount;
    user.planRate = planRate;
    user.planDays = planDays;
    user.planStart = activationTime;
    user.timerStart = activationTime.getTime();
    user.lastProfitDate = null;

    if (!Array.isArray(user.transactions)) user.transactions = [];
    user.transactions.unshift({
      type: `🚀 تفعيل خطة ${planId}`,
      amount: -planAmount,
      date: activationTime,
      status: "✅ مكتمل",
      note: `تم تفعيل الخطة ${planId} بمبلغ $${planAmount}`
    });

    await user.save();

    console.log(`✅ Plan activated | user=${userId} | plan=${planId} | amount=${planAmount} | balance=${user.balance} | timerStart=${user.timerStart}`);

    return res.json({
      success: true,
      message: "🎉 تم تفعيل الخطة بنجاح",
      user: publicUser(user)
    });
  } catch (error) {
    console.error("❌ Activate plan error:", error);
    return res.status(500).json({
      success: false,
      message: "❌ حدث خطأ أثناء تفعيل الخطة"
    });
  }
});

// =========================================================
// ADMIN - GET ALL USERS
// =========================================================

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    const formattedUsers = users.map((user) => ({
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
// ADMIN - GET SINGLE USER
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
// ADMIN - UPDATE USER
// =========================================================

app.put("/api/admin/user/:userId", async (req, res) => {
  try {
    const userId = String(req.params.userId || "").trim();
    const updateData = { ...(req.body || {}) };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.password;
    delete updateData.id;
    delete updateData.userId;
    delete updateData.email;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "❌ معرف المستخدم مطلوب"
      });
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
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
// ADMIN - BALANCE (FIXED - STRONG)
// =========================================================

app.post("/api/admin/balance", async (req, res) => {
  try {
    const userId = String(req.body.userId || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const amount = Number(req.body.amount);
    const type = String(req.body.type || "").trim();
    const adminName = String(req.body.adminName || "غير معروف").trim();

    console.log(`📥 Admin balance request: userId=${userId}, email=${email}, amount=${amount}, type=${type}`);

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

    const filter = userId ? { userId } : { email };
    console.log(`🔍 Searching with filter:`, filter);

    let user = await User.findOne(filter);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود"
      });
    }

    const currentBalance = Number(user.balance || 0);

    if (type === "withdraw" && currentBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "❌ الرصيد غير كافٍ"
      });
    }

    const transaction = {
      type: type === "deposit" ? "💰 إيداع (أدمن)" : "💸 سحب (أدمن)",
      amount: type === "deposit" ? amount : -amount,
      date: new Date(),
      status: "✅ مكتمل",
      note: `بواسطة الأدمن ${adminName}`
    };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      {
        $inc: { balance: type === "deposit" ? amount : -amount },
        $push: { transactions: transaction }
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "❌ المستخدم غير موجود بعد التحديث"
      });
    }

    console.log(`✅ Admin ${type} | user=${updatedUser.userId} | amount=${amount} | new balance=${updatedUser.balance}`);

    // =========================================================
    // REFERRAL COMMISSION - 10%
    // =========================================================
    if (type === "deposit" && updatedUser.referredBy) {
      try {
        const commission = amount * 0.10;

        const referrer = await User.findOne({
          email: String(updatedUser.referredBy).trim().toLowerCase()
        });

        if (referrer) {
          const referralUpdate = {
            $inc: {
              balance: commission,
              referralBonus: commission
            },
            $push: {
              transactions: {
                type: "🎁 عمولة دعوة 10%",
                amount: commission,
                date: new Date(),
                status: "✅ مكتمل",
                note: `عمولة 10% من إيداع المدعو ${updatedUser.email}`
              }
            }
          };

          const referredIndex = (referrer.referredUsers || []).findIndex(
            u => String(u.email).trim().toLowerCase() ===
                 String(updatedUser.email).trim().toLowerCase()
          );

          if (referredIndex !== -1) {
            referralUpdate.$inc[`referredUsers.${referredIndex}.totalDeposits`] = amount;
            referralUpdate.$inc[`referredUsers.${referredIndex}.commissionEarned`] = commission;
          }

          await User.findOneAndUpdate(
            { _id: referrer._id },
            referralUpdate,
            { new: true, runValidators: true }
          );

          console.log(
            `🎁 Referral 10% = ${commission} | referrer=${referrer.email} | referred=${updatedUser.email}`
          );
        }
      } catch (referralError) {
        console.error("❌ Referral commission error:", referralError);
      }
    }

    return res.json({
      success: true,
      message: type === "deposit" ? "✅ تم الإيداع بنجاح" : "✅ تم السحب بنجاح",
      user: publicUser(updatedUser)
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
//  SUBMIT WITHDRAWAL REQUEST (FROM USER)
// =========================================================

app.post("/api/withdraw", async (req, res) => {
  try {
    const userId = String(req.body.userId || "").trim();
    const amount = Number(req.body.amount);
    const address = String(req.body.address || "").trim();

    if (!userId) {
      return res.status(400).json({ success: false, message: "❌ معرف المستخدم مطلوب" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "❌ المبلغ غير صالح" });
    }
    if (!address || address.length < 5) {
      return res.status(400).json({ success: false, message: "❌ عنوان المحفظة غير صالح (يجب أن يكون 5 أحرف على الأقل)" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "❌ المستخدم غير موجود" });
    }

    const currentBalance = Number(user.balance || 0);
    if (currentBalance < amount) {
      return res.status(400).json({ success: false, message: `❌ الرصيد غير كافٍ. رصيدك: $${currentBalance.toFixed(2)}` });
    }

    // خصم الرصيد
    user.balance = currentBalance - amount;

    // إضافة معاملة السحب
    if (!Array.isArray(user.transactions)) user.transactions = [];
    user.transactions.unshift({
      type: "💸 طلب سحب",
      amount: -amount,
      date: new Date(),
      status: "pending",
      address: address,
      walletAddress: address,
      note: `طلب سحب إلى المحفظة: ${address}`
    });

    await user.save();

    console.log(`✅ Withdrawal request | user=${userId} | amount=${amount} | address=${address}`);
    console.log(`📊 New balance: $${user.balance.toFixed(2)}`);

    return res.json({
      success: true,
      message: "✅ تم تسجيل طلب السحب بنجاح، في انتظار مراجعة الإدارة",
      user: publicUser(user)
    });

  } catch (error) {
    console.error("❌ Withdrawal error:", error);
    return res.status(500).json({ success: false, message: "❌ حدث خطأ في الخادم" });
  }
});

// =========================================================
// ADMIN - DELETE USER
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
// ADMIN - STATS
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
      plan: { $nin: [null, ""] }
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
// CATCH-ALL ROUTE FOR FRONTEND
// =========================================================

app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: "❌ API endpoint غير موجود",
      path: req.originalUrl
    });
  }

  const page = req.path.replace(/^\//, "").replace(/\.html$/, "");
  const filePath = path.join(__dirname, `${page}.html`);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  const indexFile = path.join(__dirname, "index.html");
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }

  return res.status(404).send("الصفحة غير موجودة");
});

// =========================================================
// 404 API HANDLER
// =========================================================

app.use("/api", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "❌ API endpoint غير موجود",
    path: req.originalUrl
  });
});

// =========================================================
// ERROR HANDLER
// =========================================================

app.use((err, req, res, next) => {
  console.error("❌ Express error:", err);
  if (res.headersSent) return next(err);
  return res.status(500).json({
    success: false,
    message: "❌ حدث خطأ في الخادم"
  });
});

// =========================================================
// START SERVER
// =========================================================

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at /api`);
  console.log(`👥 Users endpoint: /api/admin/users`);
  console.log(`🔗 MongoDB: ${MONGODB_URI ? "configured" : "NOT CONFIGURED"}`);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

module.exports = app;
