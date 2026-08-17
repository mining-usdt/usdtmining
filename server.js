const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 حط الباسورد تبعك هون
mongoose.connect("mongodb+srv://kabusbaba:aVNjXlWAUTAkdDT3@cluster0.zh0a3gc.mongodb.net/test")
.then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));
// 👤 موديل المستخدم
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  userId: Number,
  balance: { type: Number, default: 0 }
});

// 🆔 ID تلقائي
let lastId = 200500;

// 📌 تسجيل
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
    userId: ++lastId
  });

  await user.save();
  res.json(user);
});

// 🔐 تسجيل دخول
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  res.json(user);
});

// 🚀 تشغيل السيرفر
app.listen(3000, () => console.log("Server running on port 3000"));