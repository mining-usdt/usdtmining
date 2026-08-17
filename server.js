/**
 * ============================================================
 *  🚀 MININGUSDT - SERVER (PRODUCTION GRADE)
 *  - معالجة أخطاء شاملة
 *  - سجلات مفصلة
 *  - أمان عالي
 *  - أداء محسن
 *  - بنية قابلة للتوسع
 * ============================================================
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

// ============================================================
//  🛡️ INITIALIZATION
// ============================================================

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  "mongodb+srv://kabusbaba:Kabus123456@cluster0.zh0a3gc.mongodb.net/miningusdt?retryWrites=true&w=majority";

// ============================================================
//  📋 LOGGING SYSTEM
// ============================================================

const LOGS_DIR = path.join(__dirname, "logs");

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function log(message, type = "INFO") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${type}] ${message}\n`;

  console.log(logEntry.trim());

  const logFile = path.join(
    LOGS_DIR,
    `${new Date().toISOString().slice(0, 10)}.log`
  );

  fs.appendFileSync(logFile, logEntry, "utf8");
}

function logError(error, context = "") {
  const timestamp = new Date().toISOString();

  const logEntry =
    `[${timestamp}] [ERROR] ${context}: ${error.message}\n` +
    `Stack: ${error.stack}\n` +
    `---\n`;

  console.error(logEntry.trim());

  const logFile = path.join(
    LOGS_DIR,
    `error_${new Date().toISOString().slice(0, 10)}.log`
  );

  fs.appendFileSync(logFile, logEntry, "utf8");
}

// ============================================================
//  🔒 SECURITY MIDDLEWARE
// ============================================================

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    originAgentCluster: false,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
    exposedHeaders: ["Content-Length", "X-Total-Count"],
    maxAge: 86400,
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "15mb",
  })
);

// ============================================================
//  🗄️ DATABASE CONNECTION
// ============================================================

const dbOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 10,
  minPoolSize: 2,
};

async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, dbOptions);

    log(
      "✅ MongoDB Connected Successfully",
      "SUCCESS"
    );

    return true;
  } catch (error) {
    logError(error, "Database Connection");

    log(
      "❌ MongoDB Connection Failed - Retrying in 5 seconds",
      "ERROR"
    );

    setTimeout(connectDatabase, 5000);

    return false;
  }
}

mongoose.connection.on("disconnected", () => {
  log(
    "⚠️ MongoDB Disconnected - Attempting to reconnect",
    "WARNING"
  );

  setTimeout(connectDatabase, 3000);
});

mongoose.connection.on("error", (error) => {
  logError(error, "MongoDB Error");
});

// ============================================================
//  📊 USER SCHEMA
// ============================================================

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    profit: {
      type: Number,
      default: 0,
      min: 0,
    },

    plan: {
      type: String,
      default: null,
    },

    planAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    planRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    planDays: {
      type: Number,
      default: 0,
      min: 0,
    },

    planStart: {
      type: Date,
      default: null,
    },

    timerStart: {
      type: Number,
      default: null,
    },

    lastProfitDate: {
      type: String,
      default: null,
    },

    referralCode: {
      type: String,
      unique: true,
      required: true,
      index: true,
      uppercase: true,
      trim: true,
    },

    referredBy: {
      type: String,
      default: null,
      index: true,
    },

    referralBonus: {
      type: Number,
      default: 0,
      min: 0,
    },

    referredUsers: {
      type: [
        {
          email: {
            type: String,
            lowercase: true,
            trim: true,
          },

          name: {
            type: String,
            trim: true,
          },

          joinedAt: {
            type: Date,
            default: Date.now,
          },

          totalDeposits: {
            type: Number,
            default: 0,
            min: 0,
          },

          commissionEarned: {
            type: Number,
            default: 0,
            min: 0,
          },
        },
      ],

      default: [],
    },

    transactions: {
      type: [
        {
          type: {
            type: String,
            required: true,
            trim: true,
          },

          amount: {
            type: Number,
            required: true,
          },

          date: {
            type: Date,
            default: Date.now,
          },

          status: {
            type: String,
            default: "✅ مكتمل",
            trim: true,
          },

          note: {
            type: String,
            default: "",
            trim: true,
          },
        },
      ],

      default: [],
    },
  },

  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },

    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;

        return ret;
      },
    },
  }
);

UserSchema.index({
  createdAt: -1,
});

UserSchema.index({
  plan: 1,
});

UserSchema.index({
  referralBonus: -1,
});

const User = mongoose.model(
  "User",
  UserSchema
);

// ============================================================
// 🟢 ONLINE USERS
// ============================================================

const onlineUsers = new Map();

function markUserOnline(
  userId,
  name,
  email
) {
  if (!userId) return;

  onlineUsers.set(
    String(userId),
    {
      userId: String(userId),
      name: name || "غير معروف",
      email: email || "",
      lastSeen: Date.now(),
    }
  );
}

setInterval(() => {
  const now = Date.now();

  for (
    const [userId, user]
    of onlineUsers.entries()
  ) {
    if (
      now - user.lastSeen >
      120000
    ) {
      onlineUsers.delete(userId);
    }
  }
}, 30000);

// ============================================================
//  🛠️ HELPER FUNCTIONS
// ============================================================

function generateUniqueUserId() {
  return Math.floor(
    100000000 +
      Math.random() * 900000000
  ).toString();
}

function generateReferralCode(userId) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for (let i = 0; i < 8; i++) {
    code += chars.charAt(
      Math.floor(
        Math.random() * chars.length
      )
    );
  }

  return code + userId.slice(-4);
}

async function createUniqueUserId() {
  let userId;

  let attempts = 0;

  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    userId = generateUniqueUserId();

    const exists =
      await User.exists({
        userId,
      });

    if (!exists) {
      return userId;
    }

    attempts++;
  }

  return (
    generateUniqueUserId() +
    Date.now()
      .toString()
      .slice(-4)
  );
}

async function createUniqueReferralCode(
  userId
) {
  let referralCode;

  let attempts = 0;

  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    referralCode =
      generateReferralCode(userId);

    const exists =
      await User.exists({
        referralCode,
      });

    if (!exists) {
      return referralCode;
    }

    attempts++;
  }

  return (
    generateReferralCode(userId) +
    Math.random()
      .toString(36)
      .slice(-4)
      .toUpperCase()
  );
}

function formatResponse(
  success,
  data,
  message = ""
) {
  return {
    success,
    data,
    message,
    timestamp:
      new Date().toISOString(),
  };
}

function handleError(
  res,
  error,
  statusCode = 500,
  message = "حدث خطأ في الخادم"
) {
  logError(error, "API Error");

  return res
    .status(statusCode)
    .json(
      formatResponse(
        false,
        null,
        message
      )
    );
}

// ✅ حساب العمولة 20%
function calculateReferralBonus(amount) {
  return amount * 0.20;
}

// ============================================================
//  📡 API ROUTES
// ============================================================

// --------------------------------------------
//  🏥 HEALTH CHECK
// --------------------------------------------

app.get(
  "/api/health",
  async (req, res) => {
    try {
      const mongoState =
        mongoose.connection.readyState;

      const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
      };

      res.json(
        formatResponse(
          true,
          {
            server: "online",

            mongodb:
              states[mongoState] ||
              "unknown",

            uptime:
              process.uptime(),

            memory:
              process.memoryUsage(),

            timestamp:
              new Date().toISOString(),
          }
        )
      );
    } catch (error) {
      handleError(res, error);
    }
  }
);

// --------------------------------------------
//  📝 REGISTER
// --------------------------------------------

app.post(
  "/api/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        referralCode,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              null,
              "❌ جميع الحقول المطلوبة يجب تعبئتها"
            )
          );
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
      ) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              null,
              "❌ البريد الإلكتروني غير صحيح"
            )
          );
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              null,
              "❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل"
            )
          );
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const existingUser =
        await User.findOne({
          email: normalizedEmail,
        });

      if (existingUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              null,
              "❌ هذا البريد مستخدم بالفعل"
            )
          );
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const userId =
        await createUniqueUserId();

      const referralCodeGenerated =
        await createUniqueReferralCode(
          userId
        );

      const newUser =
        new User({
          userId,

          name: name.trim(),

          email: normalizedEmail,

          password:
            hashedPassword,

          referralCode:
            referralCodeGenerated,

          balance: 0,

          profit: 0,

          plan: null,

          planAmount: 0,

          planRate: 0,

          planDays: 0,

          planStart: null,

          timerStart: null,

          lastProfitDate: null,

          referredBy: null,

          referralBonus: 0,

          referredUsers: [],

          transactions: [],
        });

      // ✅ معالجة كود الدعوة
      if (referralCode) {
        const referrer =
          await User.findOne({
            referralCode:
              referralCode
                .trim()
                .toUpperCase(),
          });

        if (referrer) {
          newUser.referredBy =
            referrer.email;

          if (
            !Array.isArray(
              referrer.referredUsers
            )
          ) {
            referrer.referredUsers =
              [];
          }

          referrer.referredUsers.push(
            {
              email:
                normalizedEmail,

              name:
                name.trim(),

              joinedAt:
                new Date(),

              totalDeposits: 0,

              commissionEarned: 0,
            }
          );

          await referrer.save();

          log(
            `User ${name} registered with referral code ${referralCode}`,
            "INFO"
          );
        } else {
          log(
            `Invalid referral code: ${referralCode}`,
            "WARNING"
          );
        }
      }

      await newUser.save();

      log(
        `New user registered: ${name} (${email})`,
        "SUCCESS"
      );

      return res
        .status(201)
        .json(
          formatResponse(
            true,
            {
              userId:
                newUser.userId,

              name:
                newUser.name,

              email:
                newUser.email,

              balance:
                newUser.balance,

              profit:
                newUser.profit,

              plan:
                newUser.plan,

              referralCode:
                newUser.referralCode,

              createdAt:
                newUser.createdAt,
            }
          )
        );
    } catch (error) {
      return handleError(
        res,
        error
      );
    }
  }
);

// --------------------------------------------
//  🔐 LOGIN
// --------------------------------------------

app.post(
  "/api/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              null,
              "❌ البريد وكلمة المرور مطلوبان"
            )
          );
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const user =
        await User.findOne({
          email:
            normalizedEmail,
        }).select(
          "+password"
        );

      if (!user) {
        return res
          .status(401)
          .json(
            formatResponse(
              false,
              null,
              "❌ البريد أو كلمة المرور غير صحيحة"
            )
          );
      }

      const isValidPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isValidPassword) {
        return res
          .status(401)
          .json(
            formatResponse(
              false,
              null,
              "❌ البريد أو كلمة المرور غير صحيحة"
            )
          );
      }

      // ✅ تسجيل المستخدم كمتصل
      markUserOnline(
        user.userId,
        user.name,
        user.email
      );

      log(
        `User logged in: ${user.name} (${user.email})`,
        "SUCCESS"
      );

      return res.json(
        formatResponse(
          true,
          {
            userId:
              user.userId,

            _id:
              user._id.toString(),

            name:
              user.name,

            email:
              user.email,

            balance:
              user.balance,

            profit:
              user.profit,

            plan:
              user.plan,

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

            lastProfitDate:
              user.lastProfitDate,

            referralCode:
              user.referralCode,

            referredBy:
              user.referredBy,

            referralBonus:
              user.referralBonus,

            referredUsers:
              user.referredUsers,

            transactions:
              user.transactions.slice(
                0,
                20
              ),

            createdAt:
              user.createdAt,
          }
        )
      );
    } catch (error) {
      return handleError(
        res,
        error
      );
    }
  }
);

// --------------------------------------------
//  👥 ADMIN - GET ALL USERS
// --------------------------------------------

app.get(
  "/api/admin/users",
  async (req, res) => {
    try {
      const page =
        parseInt(
          req.query.page
        ) || 1;

      const limit =
        parseInt(
          req.query.limit
        ) || 100;

      const skip =
        (page - 1) * limit;

      const [
        users,
        total,
      ] = await Promise.all([
        User.find({})
          .select("-password")
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        User.countDocuments(),
      ]);

      const formattedUsers =
        users.map(
          (user) => ({
            ...user,

            id:
              user.userId ||
              user._id.toString(),

            userId:
              user.userId ||
              user._id.toString(),

            _id:
              user._id.toString(),
          })
        );

      // ✅ إضافة حالة الاتصال لكل مستخدم
      const usersWithOnline = formattedUsers.map(user => ({
        ...user,
        isOnline: onlineUsers.has(String(user.userId || user._id))
      }));

      return res.json({
        success: true,

        users:
          usersWithOnline,

        pagination: {
          page,
          limit,
          total,
          pages:
            Math.ceil(
              total / limit
            ),
        },

        onlineCount: onlineUsers.size,

        timestamp:
          new Date().toISOString(),
      });
    } catch (error) {
      logError(
        error,
        "GET /api/admin/users"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ فشل جلب المستخدمين",

          error:
            error.message,
        });
    }
  }
);

// ============================================================
// 🟢 USER ONLINE HEARTBEAT
// ============================================================

app.post(
  "/api/online/heartbeat",
  async (req, res) => {
    try {
      const {
        userId,
        name,
        email,
      } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "userId مطلوب",
          });
      }

      markUserOnline(
        userId,
        name,
        email
      );

      return res.json({
        success: true,
        onlineCount: onlineUsers.size,
      });
    } catch (error) {
      console.error(
        "Online error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
        });
    }
  }
);

// ============================================================
// 🟢 GET ONLINE USERS
// ============================================================

app.get(
  "/api/online",
  (req, res) => {
    const users =
      Array.from(
        onlineUsers.values()
      );

    res.json({
      success: true,
      count:
        users.length,
      users,
    });
  }
);

// --------------------------------------------
//  👤 ADMIN - GET SINGLE USER
// --------------------------------------------

app.get(
  "/api/admin/user/:identifier",
  async (req, res) => {
    try {
      const identifier =
        req.params.identifier.trim();

      if (!identifier) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف مطلوب",
          });
      }

      let user =
        await User.findOne({
          $or: [
            {
              userId:
                identifier,
            },

            {
              email:
                identifier.toLowerCase(),
            },

            {
              referralCode:
                identifier.toUpperCase(),
            },
          ],
        })
          .select(
            "-password"
          )
          .lean();

      if (
        !user &&
        mongoose.Types.ObjectId.isValid(
          identifier
        )
      ) {
        user =
          await User.findById(
            identifier
          )
            .select(
              "-password"
            )
            .lean();
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      const formattedUser =
        {
          ...user,

          id:
            user.userId ||
            user._id.toString(),

          userId:
            user.userId ||
            user._id.toString(),

          _id:
            user._id.toString(),

          isOnline: onlineUsers.has(String(user.userId || user._id))
        };

      return res.json({
        success: true,
        user:
          formattedUser,
      });
    } catch (error) {
      logError(
        error,
        "GET /api/admin/user/:identifier"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في جلب المستخدم",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  ✏️ ADMIN - UPDATE USER
// --------------------------------------------

app.put(
  "/api/admin/user/:userId",
  async (req, res) => {
    try {
      const userId =
        req.params.userId.trim();

      if (!userId) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف مطلوب",
          });
      }

      const updateData =
        {
          ...req.body,
        };

      delete updateData._id;
      delete updateData.__v;
      delete updateData.password;
      delete updateData.userId;
      delete updateData.createdAt;
      delete updateData.updatedAt;
      delete updateData.id;

      if (
        updateData.balance !==
          undefined &&
        updateData.balance < 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ الرصيد لا يمكن أن يكون سالباً",
          });
      }

      if (
        updateData.profit !==
          undefined &&
        updateData.profit < 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ الأرباح لا يمكن أن تكون سالبة",
          });
      }

      let user =
        await User.findOne({
          userId,
        });

      if (
        !user &&
        mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {
        user =
          await User.findById(
            userId
          );
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      const updatedUser =
        await User.findByIdAndUpdate(
          user._id,
          {
            $set:
              updateData,
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .select(
            "-password"
          )
          .lean();

      const formattedUser =
        {
          ...updatedUser,

          id:
            updatedUser.userId ||
            updatedUser._id.toString(),

          userId:
            updatedUser.userId ||
            updatedUser._id.toString(),

          _id:
            updatedUser._id.toString(),
        };

      log(
        `User updated: ${updatedUser.name} (${updatedUser.email})`,
        "SUCCESS"
      );

      return res.json({
        success: true,
        user:
          formattedUser,
      });
    } catch (error) {
      logError(
        error,
        "PUT /api/admin/user/:userId"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في تحديث المستخدم",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  💰 ADMIN - BALANCE (DEPOSIT / WITHDRAW)
// --------------------------------------------

app.post(
  "/api/admin/balance",
  async (req, res) => {
    try {
      const {
        userId,
        email,
        amount,
        type,
        adminName = "أدمن",
      } = req.body;

      if (
        !userId &&
        !email
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف أو البريد مطلوب",
          });
      }

      if (
        !amount ||
        amount <= 0 ||
        !Number.isFinite(
          amount
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المبلغ غير صالح",
          });
      }

      if (
        ![
          "deposit",
          "withdraw",
        ].includes(type)
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ نوع العملية غير صالح",
          });
      }

      let user = null;

      if (userId) {
        user =
          await User.findOne({
            userId,
          });

        if (
          !user &&
          mongoose.Types.ObjectId.isValid(
            userId
          )
        ) {
          user =
            await User.findById(
              userId
            );
        }
      }

      if (!user && email) {
        user =
          await User.findOne({
            email:
              email.toLowerCase(),
          });
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      const oldBalance =
        Number(
          user.balance || 0
        );

      let newBalance;
      let transactionAmount;
      let transactionType;

      if (
        type === "deposit"
      ) {
        newBalance =
          oldBalance +
          amount;

        transactionAmount =
          amount;

        transactionType =
          "💰 إيداع (أدمن)";
      } else {
        if (
          oldBalance <
          amount
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "❌ الرصيد غير كافٍ",
            });
        }

        newBalance =
          oldBalance -
          amount;

        transactionAmount =
          -amount;

        transactionType =
          "💸 سحب (أدمن)";
      }

      const transaction =
        {
          type:
            transactionType,

          amount:
            transactionAmount,

          date:
            new Date(),

          status:
            "✅ مكتمل",

          note:
            `بواسطة الأدمن ${adminName}`,
        };

      const result =
        await User.updateOne(
          {
            _id:
              user._id,
          },

          {
            $set: {
              balance:
                newBalance,
            },

            $push: {
              transactions: {
                $each: [
                  transaction,
                ],

                $position: 0,
              },
            },
          }
        );

      if (
        !result.acknowledged ||
        result.matchedCount !==
          1
      ) {
        return res
          .status(500)
          .json({
            success: false,
            message:
              "❌ لم يتم تحديث الحساب",
          });
      }

      const updatedUser =
        await User.findById(
          user._id
        )
          .select(
            "-password"
          )
          .lean();

      const formattedUser =
        {
          ...updatedUser,

          id:
            updatedUser.userId ||
            updatedUser._id.toString(),

          userId:
            updatedUser.userId ||
            updatedUser._id.toString(),

          _id:
            updatedUser._id.toString(),
        };

      log(
        `Balance ${type} for ${user.name}: $${amount} (New balance: $${newBalance})`,
        "SUCCESS"
      );

      return res.json({
        success: true,

        user:
          formattedUser,

        message:
          `✅ ${
            type === "deposit"
              ? "تم إيداع"
              : "تم سحب"
          } $${amount.toFixed(
            2
          )} بنجاح`,
      });
    } catch (error) {
      logError(
        error,
        "POST /api/admin/balance"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في معالجة العملية",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  📋 ADMIN - TRANSACTIONS
// --------------------------------------------

app.get(
  "/api/admin/user/:identifier/transactions",
  async (req, res) => {
    try {
      const identifier =
        req.params.identifier.trim();

      if (!identifier) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف مطلوب",
          });
      }

      let user =
        await User.findOne({
          $or: [
            {
              userId:
                identifier,
            },

            {
              email:
                identifier.toLowerCase(),
            },

            {
              referralCode:
                identifier.toUpperCase(),
            },
          ],
        }).lean();

      if (
        !user &&
        mongoose.Types.ObjectId.isValid(
          identifier
        )
      ) {
        user =
          await User.findById(
            identifier
          ).lean();
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      return res.json({
        success: true,

        userId:
          user.userId,

        name:
          user.name,

        email:
          user.email,

        transactions:
          user.transactions ||
          [],

        totalTransactions:
          (
            user.transactions ||
            []
          ).length,
      });
    } catch (error) {
      logError(
        error,
        "GET /api/admin/user/:identifier/transactions"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في جلب العمليات",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  🚀 ACTIVATE PLAN
// --------------------------------------------

app.post(
  "/api/activate-plan",
  async (req, res) => {
    try {
      const {
        userId,
        planId,
        planAmount,
        planRate,
        planDays,
      } = req.body;

      if (
        !userId ||
        !planId
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف والخطة مطلوبان",
          });
      }

      if (
        !planAmount ||
        planAmount <= 0 ||
        !planRate ||
        planRate <= 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ بيانات الخطة غير صالحة",
          });
      }

      let user =
        await User.findOne({
          userId,
        });

      if (
        !user &&
        mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {
        user =
          await User.findById(
            userId
          );
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      const currentBalance =
        Number(
          user.balance || 0
        );

      if (
        currentBalance <
        planAmount
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              `❌ الرصيد غير كافٍ - رصيدك: $${currentBalance.toFixed(
                2
              )} — المطلوب: $${planAmount}`,
          });
      }

      user.balance =
        currentBalance -
        planAmount;

      user.plan =
        planId;

      user.planAmount =
        planAmount;

      user.planRate =
        planRate;

      user.planDays =
        planDays;

      user.planStart =
        new Date();

      user.timerStart =
        Date.now();

      user.lastProfitDate =
        null;

      if (
        !user.transactions
      ) {
        user.transactions =
          [];
      }

      user.transactions.unshift(
        {
          type:
            `🚀 تفعيل خطة ${planId}`,

          amount:
            -planAmount,

          date:
            new Date(),

          status:
            "✅ مكتمل",
        }
      );

      await user.save();

      log(
        `Plan activated for ${user.name}: ${planId} ($${planAmount})`,
        "SUCCESS"
      );

      const formattedUser =
        {
          ...user.toObject(),

          id:
            user.userId,

          _id:
            user._id.toString(),
        };

      delete formattedUser.password;
      delete formattedUser.__v;

      return res.json({
        success: true,

        user:
          formattedUser,

        message:
          `✅ تم تفعيل خطة ${planId} بنجاح`,
      });
    } catch (error) {
      logError(
        error,
        "POST /api/activate-plan"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في تفعيل الخطة",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  ❌ DELETE USER (ADMIN)
// --------------------------------------------

app.delete(
  "/api/admin/user/:identifier",
  async (req, res) => {
    try {
      const identifier =
        req.params.identifier.trim();

      if (!identifier) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "❌ المعرف مطلوب",
          });
      }

      let user =
        await User.findOne({
          $or: [
            {
              userId:
                identifier,
            },

            {
              email:
                identifier.toLowerCase(),
            },

            {
              referralCode:
                identifier.toUpperCase(),
            },
          ],
        });

      if (
        !user &&
        mongoose.Types.ObjectId.isValid(
          identifier
        )
      ) {
        user =
          await User.findById(
            identifier
          );
      }

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "❌ المستخدم غير موجود",
          });
      }

      const userInfo =
        {
          userId:
            user.userId,

          email:
            user.email,

          name:
            user.name,
        };

      // ✅ حذف من قائمة المتصلين
      onlineUsers.delete(String(user.userId));

      await User.deleteOne({
        _id:
          user._id,
      });

      log(
        `User deleted: ${user.name} (${user.email})`,
        "WARNING"
      );

      return res.json({
        success: true,

        deleted:
          true,

        userId:
          userInfo.userId,

        email:
          userInfo.email,

        message:
          `✅ تم حذف المستخدم ${userInfo.name} بنجاح`,
      });
    } catch (error) {
      logError(
        error,
        "DELETE /api/admin/user/:identifier"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في حذف المستخدم",

          error:
            error.message,
        });
    }
  }
);

// --------------------------------------------
//  📊 ADMIN STATS
// --------------------------------------------

app.get(
  "/api/admin/stats",
  async (req, res) => {
    try {
      const [
        totalUsers,
        totalBalance,
        totalProfit,
        activePlans,
      ] =
        await Promise.all([
          User.countDocuments(),

          User.aggregate([
            {
              $group: {
                _id: null,

                total: {
                  $sum:
                    "$balance",
                },
              },
            },
          ]),

          User.aggregate([
            {
              $group: {
                _id: null,

                total: {
                  $sum:
                    "$profit",
                },
              },
            },
          ]),

          User.countDocuments({
            plan: {
              $ne: null,
              $nin: [
                null,
                "—",
                "",
              ],
            },
          }),
        ]);

      return res.json({
        success: true,

        totalUsers,

        totalBalance:
          totalBalance[0]
            ?.total || 0,

        totalProfit:
          totalProfit[0]
            ?.total || 0,

        activePlans,

        onlineCount: onlineUsers.size,

        timestamp:
          new Date().toISOString(),
      });
    } catch (error) {
      logError(
        error,
        "GET /api/admin/stats"
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "❌ حدث خطأ في جلب الإحصائيات",

          error:
            error.message,
        });
    }
  }
);

// ============================================================
//  🌐 STATIC FILES
// ============================================================

app.use(
  express.static(
    __dirname
  )
);

app.get(
  "/",
  (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "index.html"
      )
    );
  }
);

app.get(
  "/:page.html",
  (req, res) => {
    const page =
      req.params.page;

    const filePath =
      path.join(
        __dirname,
        `${page}.html`
      );

    if (
      fs.existsSync(
        filePath
      )
    ) {
      res.sendFile(
        filePath
      );
    } else {
      res
        .status(404)
        .send(
          "الصفحة غير موجودة"
        );
    }
  }
);

// ============================================================
//  🚨 GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (req, res) => {
    res
      .status(404)
      .json({
        success: false,
        message:
          "❌ المسار غير موجود",
      });
  }
);

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    logError(
      err,
      "Unhandled Error"
    );

    res
      .status(500)
      .json({
        success: false,
        message:
          "❌ حدث خطأ غير متوقع في الخادم",
      });
  }
);

// ============================================================
//  🚀 START SERVER
// ============================================================

async function startServer() {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        log(
          `🚀 Server running on port ${PORT}`,
          "SUCCESS"
        );

        log(
          `📡 API available at: http://localhost:${PORT}/api`,
          "INFO"
        );

        log(
          `🛡️ Environment: ${
            process.env.NODE_ENV ||
            "development"
          }`,
          "INFO"
        );

        log(
          `📁 Logs directory: ${LOGS_DIR}`,
          "INFO"
        );
      }
    );

    process.on(
      "SIGTERM",
      () => {
        log(
          "🛑 SIGTERM received - Shutting down gracefully",
          "WARNING"
        );

        mongoose.connection.close(
          () => {
            log(
              "✅ MongoDB connection closed",
              "SUCCESS"
            );

            process.exit(0);
          }
        );
      }
    );

    process.on(
      "SIGINT",
      () => {
        log(
          "🛑 SIGINT received - Shutting down gracefully",
          "WARNING"
        );

        mongoose.connection.close(
          () => {
            log(
              "✅ MongoDB connection closed",
              "SUCCESS"
            );

            process.exit(0);
          }
        );
      }
    );

    process.on(
      "uncaughtException",
      (error) => {
        logError(
          error,
          "Uncaught Exception"
        );
      }
    );

    process.on(
      "unhandledRejection",
      (reason, promise) => {
        logError(
          new Error(reason),
          "Unhandled Rejection"
        );
      }
    );
  } catch (error) {
    logError(
      error,
      "Server Startup Failed"
    );

    process.exit(1);
  }
}

// بدء الخادم
startServer();

// ============================================================
//  📝 EXPOSE FOR TESTING
// ============================================================

module.exports = {
  app,
  User,
  connectDatabase,
  log,
  logError,
};
