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

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("index.html غير موجود");
});

app.get("/index.html", (req, res) => {
  const filePath = path.join(__dirname, "index.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("index.html غير موجود");
});

app.get("/login.html", (req, res) => {
  const filePath = path.join(__dirname, "login.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("login.html غير موجود");
});

app.get("/register.html", (req, res) => {
  const filePath = path.join(__dirname, "register.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("register.html غير موجود");
});

app.get("/dashboard.html", (req, res) => {
  const filePath = path.join(__dirname, "dashboard.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("dashboard.html غير موجود");
});

app.get("/plans.html", (req, res) => {
  const filePath = path.join(__dirname, "plans.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("plans.html غير موجود");
});

app.get("/deposit.html", (req, res) => {
  const filePath = path.join(__dirname, "deposit.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("deposit.html غير موجود");
});

app.get("/withdraw.html", (req, res) => {
  const filePath = path.join(__dirname, "withdraw.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("withdraw.html غير موجود");
});

app.get("/contact.html", (req, res) => {
  const filePath = path.join(__dirname, "contact.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("contact.html غير موجود");
});

app.get("/games.html", (req, res) => {
  const filePath = path.join(__dirname, "games.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("games.html غير موجود");
});

app.get("/superpanel.html", (req, res) => {
  const filePath = path.join(__dirname, "superpanel.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("superpanel.html غير موجود");
});

app.get("/game-coin.html", (req, res) => {
  const filePath = path.join(__dirname, "game-coin.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("game-coin.html غير موجود");
});

app.get("/game-dice.html", (req, res) => {
  const filePath = path.join(__dirname, "game-dice.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("game-dice.html غير موجود");
});

app.get("/game-slots.html", (req, res) => {
  const filePath = path.join(__dirname, "game-slots.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("game-slots.html غير موجود");
});

app.get("/game-roulette.html", (req, res) => {
  const filePath = path.join(__dirname, "game-roulette.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("game-roulette.html غير موجود");
});

app.get("/game-guess.html", (req, res) => {
  const filePath = path.join(__dirname, "game-guess.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.status(404).send("game-guess.html غير موجود");
});

app.get("/game-blackjack.html", (req, res) => {
  const filePath = path.join(__dirname, "game-blackjack.html");

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

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
  let attempts = 0;

  while (exists && attempts < 100) {
    userId = generateUniqueUserId();
    exists = await User.exists({ userId });
    attempts++;
  }

  if (!userId) {
    userId =
      generateUniqueUserId() +
      Date.now().toString().slice(-4);
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
    referralCode =
      generateReferralCode(userId) +
      Math.random().toString(36).slice(-4);
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
// SERVER-SIDE PROFIT CALCULATOR
// =========================================================
async function syncUserProfits(user) {
    if (!user.plan || !user.lastProfitDate) return user;

    const now = Date.now();
    const lastDate = new Date(user.lastProfitDate).getTime();
    const cycle = 24 * 60 * 60 * 1000;
    const elapsed = now - lastDate;

    if (elapsed >= cycle) {
        let cyclesMissed = Math.floor(elapsed / cycle);
        const planStart = new Date(user.planStart).getTime();
        const planDuration = (user.planDays || 30) * cycle;
        const planEndTime = planStart + planDuration;

        let isExpired = false;
        
        // التحقق مما إذا كانت الخطة قد تجاوزت مدتها
        if (lastDate + (cyclesMissed * cycle) >= planEndTime) {
            isExpired = true;
            const totalValidCycles = Math.floor(planDuration / cycle);
            const cyclesGiven = Math.round((lastDate - planStart) / cycle);
            cyclesMissed = totalValidCycles - cyclesGiven;
            if (cyclesMissed < 0) cyclesMissed = 0;
        }

        if (cyclesMissed > 0) {
            const profitPerCycle = (user.planAmount * user.planRate) / 100;
            const totalAdded = cyclesMissed * profitPerCycle;

            user.balance = (user.balance || 0) + totalAdded;
            user.profit = (user.profit || 0) + totalAdded;
            
            user.transactions.unshift({
                type: `📈 ربح مستحق (${user.plan})`,
                amount: totalAdded,
                date: new Date().toISOString(),
                status: '✅ مكتمل',
                note: `عن ${cyclesMissed} دورات`
            });

            // تحديث وقت الربح الأخير مع الحفاظ على التوقيت الدقيق
            user.lastProfitDate = new Date(lastDate + (cyclesMissed * cycle)).toISOString();
        }

        if (isExpired) {
            user.plan = null;
            user.planStart = null;
            user.lastProfitDate = null;
            user.timerStart = null;
        }

        await user.save();
    }
    return user;
}


// =========================================================
// HEALTH
// =========================================================

app.get("/api/health", async (req, res) => {
  try {
    const mongoConnected =
      mongoose.connection.readyState === 1;

    return res.json({
      success: true,
      server: "online",
      mongodb: mongoConnected
        ? "connected"
        : "disconnected",
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

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body.password || "");

    const referralCode = String(
      req.body.referralCode || ""
    )
      .trim()
      .toUpperCase();

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "❌ الاسم يجب أن يكون حرفين على الأقل"
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
        message:
          "❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ البريد مستخدم بالفعل"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const userId = await createUniqueUserId();

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

      referralCode: referralCodeGenerated,
      referredBy: null,
      referralBonus: 0,

      referredUsers: [],
      transactions: []
    });

    // Referral
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

        console.log(
          `✅ تم ربط المستخدم ${email} بالداعي ${referrer.email}`
        );
      } else {
        console.log(
          `⚠️ كود الدعوة ${referralCode} غير صحيح`
        );
      }
    }
    
    await newUser.save();
    return res.json({ success: true, user: publicUser(newUser) });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// =========================================================
// LOGIN
// =========================================================

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: String(email || "").toLowerCase().trim() });
        
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(String(password || ""), user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        // تحديث الأرباح بشكل دوري عند تسجيل الدخول
        user = await syncUserProfits(user);

        return res.json({ success: true, user: publicUser(user) });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// =========================================================
// PLAN ACTIVATION (SECURE SERVER SIDE)
// =========================================================

app.post("/api/activate-plan", async (req, res) => {
    try {
        const { userId, planId, planAmount, planRate, planDays } = req.body;
        
        // جلب بيانات المستخدم وتأمين الخصم المزدوج
        let user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.balance < planAmount) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        if (user.plan) {
            return res.status(400).json({ success: false, message: "Plan already active" });
        }

        // تنفيذ الخصم وبدء الخطة
        user.balance -= planAmount;
        user.plan = planId;
        user.planAmount = planAmount;
        user.planRate = planRate;
        user.planDays = planDays;
        
        const now = new Date();
        user.planStart = now;
        user.lastProfitDate = now.toISOString();
        user.timerStart = now.getTime();

        user.transactions.unshift({
            type: `🚀 تفعيل خطة ${planId}`,
            amount: -planAmount,
            date: now.toISOString(),
            status: '✅ مكتمل'
        });

        await user.save();
        return res.json({ success: true, user: publicUser(user) });
    } catch (err) {
        console.error("Activate plan error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// =========================================================
// SYNC USER DATA & PROFITS
// =========================================================

app.post("/api/sync-user", async (req, res) => {
    try {
        const { userId } = req.body;
        let user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        user = await syncUserProfits(user);
        return res.json({ success: true, user: publicUser(user) });
    } catch (err) {
        console.error("Sync user error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// =========================================================
// UPDATE USER (Legacy support for client-side deposits/withdrawals)
// =========================================================

app.post("/api/update", async (req, res) => {
    try {
         const userData = req.body;
         if (!userData || !userData.userId) return res.status(400).json({ success: false });
         
         let user = await User.findOne({ userId: userData.userId });
         if (!user) return res.status(404).json({ success: false });

         user.balance = userData.balance !== undefined ? userData.balance : user.balance;
         user.profit = userData.profit !== undefined ? userData.profit : user.profit;
         
         if (userData.transactions) {
             user.transactions = userData.transactions;
         }
         if (userData.referredUsers) {
             user.referredUsers = userData.referredUsers;
         }
         if (userData.referralBonus !== undefined) user.referralBonus = userData.referralBonus;

         await user.save();
         return res.json({ success: true, user: publicUser(user) });
    } catch (err) {
         console.error("Update Error:", err);
         return res.status(500).json({ success: false });
    }
});

// =========================================================
// START SERVER
// =========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
