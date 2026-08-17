const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 رابط MongoDB (استخدم متغيرات البيئة للأمان)
const MONGODB_URI = "mongodb+srv://kabusbaba:aVNjXlWAUTAkdDT3@cluster0.zh0a3gc.mongodb.net/miningusdt";

// =========================================================
//   نموذج المستخدم (User Model)
// =========================================================
const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  plan: { type: String, default: null },
  planAmount: { type: Number, default: 0 },
  planRate: { type: Number, default: 0 },
  planDays: { type: Number, default: 0 },
  planStart: { type: Date, default: null },
  timerStart: { type: Number, default: null },
  lastProfitDate: { type: String, default: null },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  referralBonus: { type: Number, default: 0 },
  referredUsers: [{
    email: String,
    name: String,
    joinedAt: Date,
    totalDeposits: Number,
    commissionEarned: Number
  }],
  transactions: [{
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
  }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

// =========================================================
//   دوال مساعدة
// =========================================================
function generateUniqueUserId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

function generateReferralCode(userId) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code + userId.slice(-4);
}

// =========================================================
//   ✅ مسارات Health Check (لـ Render)
// =========================================================
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '🚀 Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// =========================================================
//   المسارات (Routes)
// =========================================================

// 📌 تسجيل مستخدم جديد
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "❌ البريد مستخدم بالفعل" });
    }

    // إنشاء userId فريد
    let userId;
    let isUnique = false;
    while (!isUnique) {
      userId = generateUniqueUserId();
      const existing = await User.findOne({ userId });
      if (!existing) isUnique = true;
    }

    // إنشاء كود دعوة فريد
    let referralCodeGenerated;
    let isReferralUnique = false;
    while (!isReferralUnique) {
      referralCodeGenerated = generateReferralCode(userId);
      const existing = await User.findOne({ referralCode: referralCodeGenerated });
      if (!existing) isReferralUnique = true;
    }

    // إنشاء المستخدم
    const newUser = new User({
      userId,
      name,
      email,
      password,
      referralCode: referralCodeGenerated,
      referredBy: null,
      balance: 0,
      profit: 0,
      transactions: [],
      referredUsers: []
    });

    // معالجة كود الدعوة
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer.email;
        referrer.referredUsers.push({
          email: email,
          name: name,
          joinedAt: new Date(),
          totalDeposits: 0,
          commissionEarned: 0
        });
        await referrer.save();
      }
    }

    await newUser.save();

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
    res.status(500).json({ success: false, message: "❌ حدث خطأ في الخادم" });
  }
});

// 🔐 تسجيل الدخول
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "❌ البريد أو كلمة المرور غير صحيحة" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "❌ البريد أو كلمة المرور غير صحيحة" });
    }

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
        timerStart: user.timerStart,
        referralCode: user.referralCode,
        referralBonus: user.referralBonus,
        referredUsers: user.referredUsers,
        transactions: user.transactions.slice(0, 20)
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "❌ حدث خطأ في الخادم" });
  }
});

// 📊 جلب جميع المستخدمين (للأدمن)
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error("❌ Admin users error:", error);
    res.status(500).json({ success: false, message: "❌ خطأ في الخادم" });
  }
});

// 🔍 جلب مستخدم محدد (للأدمن)
app.get("/admin/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "❌ المستخدم غير موجود" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Admin user error:", error);
    res.status(500).json({ success: false, message: "❌ خطأ في الخادم" });
  }
});

// 💰 تعديل رصيد المستخدم (للأدمن)
app.post("/admin/user/:userId/balance", async (req, res) => {
  try {
    const { amount, type } = req.body;
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "❌ المستخدم غير موجود" });
    }

    if (type === 'deposit') {
      user.balance += amount;
      user.transactions.unshift({
        type: '💰 إيداع (أدمن)',
        amount: amount,
        date: new Date(),
        status: '✅ مكتمل'
      });
    } else if (type === 'withdraw') {
      if (user.balance < amount) {
        return res.status(400).json({ success: false, message: "❌ الرصيد غير كافٍ" });
      }
      user.balance -= amount;
      user.transactions.unshift({
        type: '💸 سحب (أدمن)',
        amount: -amount,
        date: new Date(),
        status: '✅ مكتمل'
      });
    }

    await user.save();
    res.json({ success: true, message: "✅ تم التعديل بنجاح", balance: user.balance });

  } catch (error) {
    console.error("❌ Balance update error:", error);
    res.status(500).json({ success: false, message: "❌ خطأ في الخادم" });
  }
});

// 🗑️ حذف مستخدم (للأدمن)
app.delete("/admin/user/:userId", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ userId: req.params.userId });
    if (!result) {
      return res.status(404).json({ success: false, message: "❌ المستخدم غير موجود" });
    }
    res.json({ success: true, message: "🗑️ تم حذف الحساب بنجاح" });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({ success: false, message: "❌ خطأ في الخادم" });
  }
});

// =========================================================
//   🚀 تشغيل السيرفر مع إدارة اتصال MongoDB
// =========================================================

const PORT = process.env.PORT || 3000;

// دالة للاتصال بقاعدة البيانات
function connectToDatabase() {
  console.log('🔄 Connecting to MongoDB...');
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // محاولة إعادة الاتصال بعد 5 ثوانٍ
    setTimeout(() => {
      console.log('🔄 Retrying MongoDB connection...');
      connectToDatabase();
    }, 5000);
  });
}

// بدء الاتصال بقاعدة البيانات
connectToDatabase();

// مراقبة حالة الاتصال بعد البدء
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error after connection:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected, attempting to reconnect...');
  setTimeout(() => {
    connectToDatabase();
  }, 5000);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected successfully');
});

// تشغيل السيرفر
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});

// =========================================================
//   معالجة الإغلاق بشكل آمن
// =========================================================
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});
