const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // تمت إضافة هذه المكتبة للتعامل مع مسارات الملفات

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 رابط MongoDB
const MONGODB_URI = "mongodb+srv://kabusbaba:aVNjXlWAUTAkdDT3@cluster0.zh0a3gc.mongodb.net/miningusdt";

// ✅ إصلاح الاتصال بحذف الخيارات غير المدعومة
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// =========================================================
//   ✅ إعداد خدمة الملفات الثابتة (Frontend)
//   يجب وضع جميع ملفات HTML و CSS و JS داخل مجلد اسمه "public"
// =========================================================
app.use(express.static(path.join(__dirname, 'public')));

// عند فتح الصفحة الرئيسية، يتم إرسال ملف index.html الموجود داخل مجلد public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
//   المسارات (Routes) - API
// =========================================================

// 📌 تسجيل مستخدم جديد
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "❌ البريد مستخدم بالفعل" });
    }

    let userId;
    let isUnique = false;
    while (!isUnique) {
      userId = generateUniqueUserId();
      const existing = await User.findOne({ userId });
      if (!existing) isUnique = true;
    }

    let referralCodeGenerated;
    let isReferralUnique = false;
    while (!isReferralUnique) {
      referralCodeGenerated = generateReferralCode(userId);
      const existing = await User.findOne({ referralCode: referralCodeGenerated });
      if (!existing) isReferralUnique = true;
    }

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
    console.error("Register error:", error);
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
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "❌ حدث خطأ في الخادم" });
  }
});

// 📊 جلب جميع المستخدمين (للأدمن)
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
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
    res.status(500).json({ success: false, message: "❌ خطأ في الخادم" });
  }
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
