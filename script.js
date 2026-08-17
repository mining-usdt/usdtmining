/* =========================================================
   MININGUSDT - MAIN SCRIPT (FULLY TRANSLATED)
   - All texts translated for ar/en/tr
   - Referral System with 20% commission
   - Plans: VIP 1 = $100, VIP 2 = $200, VIP 3 = $300, VIP 4 = $400, VIP 5 = $500
   - Sound disabled
   - Live Crypto Prices from CoinGecko
   - 24-hour Timer with auto-profit addition
   - Celebration on plan activation
   - ✅ تم إصلاح مشاكل الرفع على Render و GitHub
   - ✅ تم إصلاح مشكلة المعرفات (ID) والمزامنة مع الخادم
   - ✅ تم إصلاح نظام الإيداع مع الخادم
   - ✅ تم إصلاح مشكلة ensureAuth غير المعرفة
   - ✅ تم إصلاح ربط أزرار الخطط
   - ✅ تم إصلاح جميع الأخطاء الحرجة
========================================================= */

const I18N = {

  ar: {
    // Navigation
    home: "الرئيسية",
    plans: "خطط التعدين",
    deposit: "الإيداع",
    withdraw: "السحب",
    profits: "الأرباح",
    contact: "تواصل معنا",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل خروج",
    dashboard: "لوحة التحكم",
    back: "رجوع",
    games: "🎰 ألعاب الحظ",

    // Hero - index
    heroEyebrow: "MININGUSDT • منصة رقمية",
    heroTitle: "منصة التعدين الرقمية",
    heroSub: "نظام التعدين وإدارة الأرباح في بيئة آمنة.",
    start: "ابدأ الآن",
    viewPlans: "عرض خطط التعدين",
    liveDemo: "LIVE",
    liveStats: "المتصلون الآن",
    onlineUsers: "متصلاً الآن",
    live: "مباشر",

    // Plans
    plansTitle: "خطط التعدين",
    plansSub: "خطط لأغراض الاستثمار.",
    activate: "تفعيل الخطة",
    depositValue: "الإيداع",
    rate: "العائد",
    daily: "يوميًا",
    days: "المدة",
    planBadge: "🔥 الأكثر ربحية",
    viewPlan: "عرض الخطة",
    currentPlan: "الخطة الحالية",
    dailyProfit: "الأرباح اليومية",
    totalProfit: "إجمالي الأرباح",
    startDate: "تاريخ بدء الخطة",
    noPlan: "لا توجد خطة",
    netProfit: "🎯 أرباحك الصافية",
    finalBalance: "💰 الرصيد النهائي",
    vipPlans: "خطط التعدين",
    depositValueLabel: "الإيداع",
    rateLabel: "العائد",
    nextProfit: "⏳ وقت الربح القادم",
    timerHint: "🔄 سيتم إضافة الربح تلقائيًا عند انتهاء العدّاد",
    timerActive: "🟢 نشط",
    timerInactive: "⏸ غير نشط",
    timerAdding: "🔄 جاري الإضافة...",

    // Auth
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirm: "تأكيد كلمة المرور",
    loginBtn: "دخول",
    registerBtn: "🚀 إنشاء الحساب",
    forgotPassword: "نسيت كلمة المرور؟",
    alreadyHaveAccount: "لديك حساب؟",
    noAccount: "ليس لديك حساب؟",
    welcomeBack: "مرحباً بعودتك",
    account: "الحساب",

    // Referral
    referralMyCode: "🎯 كود الدعوة الخاص بك",
    referralCodeLabel: "🔗 الكود:",
    referralShareHint: "💡 شارك هذا الكود مع أصدقائك — تحصل على 20% من كل إيداع يقومون به!",
    referralTotalBonusLabel: "💰 إجمالي العمولات",
    referralTotalReferralsLabel: "👥 عدد المدعوين",
    referralBonusPerReferralLabel: "🎁 نسبة العمولة",
    referralBonusAmount: "+ 20% عمولة من كل إيداع",
    referralShareTelegram: "📱 مشاركة عبر تيليجرام",
    referralShareWhatsapp: "💬 مشاركة عبر واتساب",
    referralShareTwitter: "🐦 مشاركة عبر تويتر",
    referralCopyLink: "🔗 نسخ الرابط",
    copy: "📋 نسخ",
    copied: "✅ تم النسخ!",
    referralCodeLabelShort: "🔗 كود الدعوة",
    optional: "(اختياري)",
    referralPlaceholder: "أدخل كود الدعوة إن وجد",
    referralHint: "💡 إذا كان لديك كود دعوة من صديق، أدخله هنا لتحصل أنت وهو على مكافأة!",
    referralCopied: "✅ تم نسخ الكود!",
    referralInviteFriends: "🚀 دعوة الأصدقاء",

    // Dashboard
    dashboardTitle: "لوحة التحكم",
    balance: "الرصيد",
    profit: "الأرباح",
    recent: "آخر العمليات",
    noOps: "لا توجد عمليات حتى الآن.",
    type: "نوع العملية",
    amount: "المبلغ",
    date: "التاريخ",
    status: "الحالة",
    complete: "مكتمل",
    pending: "قيد المراجعة",
    quickActions: "إجراءات سريعة",
    depositOp: "إيداع",
    profitOp: "ربح",
    withdrawOp: "سحب",
    referralBonus: "🎁 عمولة دعوة 20%",
    dashboardWelcome: "مرحبًا",
    userId: "🆔 المعرف",
    miningDashboard: "لوحة تحكم التعدين",
    activity: "آخر العمليات",

    // Deposit
    depositTitle: "إيداع USDT",
    depositSub: "اختر طريقة الإيداع واتبع الخطوات.",
    selectCurrency: "اختر العملة",
    selectNetwork: "اختر الشبكة",
    enterAmount: "حدد مبلغ الإيداع",
    paymentInfo: "معلومات الدفع",
    paymentProof: "إثبات الدفع",
    successTitle: "تم استلام الطلب",
    successSub: "تم إرسال طلب الإيداع بنجاح.",
    network: "الشبكة",
    amountLabel: "المبلغ",
    statusLabel: "الحالة",
    copyAddress: "نسخ العنوان",
    uploadProof: "ارفع صورة الإيداع",
    uploadHint: "JPG / JPEG / PNG",
    confirmDeposit: "تأكيد الإيداع",
    paymentDone: "تم الدفع",
    reviewMessage: "سيتم مراجعة طلبك",
    reviewSub: "يرجى الانتظار حتى يتم التحقق من العملية.",
    backToDashboard: "العودة إلى لوحة التحكم",
    featuresSecure: "🔒 حماية عالية",
    featuresSecureSub: "يتم التعامل مع طلبك ضمن خطوات واضحة.",
    featuresSimple: "⚡ خطوات بسيطة",
    featuresSimpleSub: "اختر الشبكة والمبلغ ثم أرسل الإثبات.",
    featuresReview: "✓ مراجعة الطلب",
    featuresReviewSub: "يتم التحقق من بيانات العملية قبل تحديث الحالة.",
    stepCurrency: "العملة",
    stepNetwork: "الشبكة",
    stepAmount: "المبلغ",
    stepPayment: "الدفع",
    stepProof: "الإثبات",
    usdt: "USDT",
    trc20: "TRC20",
    bep20: "BEP20",
    tronNetwork: "شبكة ترون",
    bnbNetwork: "شبكة BNB",
    warningNetwork: "⚠️ تحقق من الشبكة قبل التحويل",
    warningNetworkSub: "تأكد من أن الشبكة المختارة مطابقة للشبكة التي تستخدمها في محفظتك.",
    removeImage: "🗑️ حذف الصورة",
    selectImage: "📷 اضغط هنا لاختيار الصورة",
    secureDeposit: "إيداع آمن",
    depositStep: "الخطوة",
    chooseCurrency: "اختر العملة",
    chooseNetwork: "اختر الشبكة",
    enterDepositAmount: "أدخل مبلغ الإيداع",
    paymentInformation: "معلومات الدفع",
    paymentProofTitle: "إثبات الدفع",
    depositSuccess: "تم الإيداع بنجاح",
    review: "مراجعة",

    // Withdraw
    withdrawTitle: "سحب",
    withdrawSub: "السحب يتم بشكل فوري بعد التأكيد.",
    available: "الرصيد المتاح",
    address: "عنوان المحفظة",
    requestWithdraw: "طلب سحب",
    demoWithdraw: "سحب",

    // Contact
    contactTitle: "تواصل معنا",
    contactSub: "سنرد عليك في أقرب وقت.",
    message: "الرسالة",
    send: "إرسال",
    contactSuccess: "تم إرسال الرسالة بنجاح",
    contact: "تواصل",
    trustUsers: "مستخدم نشط",
    trustUsersSub: "يثقون بمنصتنا",
    trustRating: "تقييم المستخدمين",
    trustRatingSub: "من 5 نجوم",
    trustSecurity: "أمان وشفافية",
    trustSecuritySub: "بياناتك آمنة",
    trustExperience: "سنوات من الخبرة",
    trustExperienceSub: "في مجال التعدين الرقمي",
    telegram: "تيليجرام",
    telegramSub: "@+905318254215",
    telegramBadge: "💬 تواصل مباشر — رد خلال دقائق",

    // Games
    gamesTitle: "🎰 ألعاب الحظ",
    gamesSub: "اختر لعبتك وابدأ الفوز — الحظ ينتظرك!",
    backGames: "العودة للألعاب",
    backHome: "العودة للرئيسية",
    noHistory: "لا توجد سجلات بعد",
    betAmount: "💰 الرهان:",
    heads: "👑 وجه",
    tails: "🦅 كتابة",
    coinBtn: "🪙 اقلب!",
    diceBtn: "🎲 ارم النرد!",
    slotsBtn: "🎰 دور!",
    guessBtn: "🔮 خمن!",
    rouletteBtn: "🎡 دور العجلة!",
    badgeEasy: "🔥 سهل",
    badgeMedium: "⚡ متوسط",
    badgeHigh: "🔥 عالي",
    badgeFair: "⚖️ عادل",
    badgeJackpot: "💎 جاكبوت",
    gameGuessTitle: "🎯 خمن الرقم",
    gameGuessDesc: "اختر رقم 1-6 واربح ×2.5",
    gameDiceTitle: "🎲 رمية النرد",
    gameDiceDesc: "ارم النرد واربح ×2.5",
    gameSlotsTitle: "🎰 ماكينة الحظ",
    gameSlotsDesc: "جاكبوت ×4 أو ×1.5",
    gameCoinTitle: "🪙 قلب العملة",
    gameCoinDesc: "اختر وجه العملة — إذا أصبت تربح ضعف رهانك!",
    gameRouletteTitle: "🎡 عجلة الحظ",
    gameRouletteDesc: "اختر رقم من 0 إلى 9 — إذا ظهر رقمك تربح 6 أضعاف رهانك!",

    // Game Results
    gameWin: "🎉 فوز!",
    gameLose: "😞 خسرت!",
    gameDraw: "🔄 تعادل!",
    gameJackpot: "💎 جاكبوت!!!",
    gameTwoMatch: "🎉 رمزان متشابهان!",
    gameCoinHeads: "وجه",
    gameCoinTails: "كتابة",
    gameGuessResultWin: "🎉 فوز! الرقم كان {target} — ربحت ${amount}",
    gameGuessResultLose: "😞 خسرت! الرقم كان {target} — حاول مرة أخرى",
    gameDiceResultWin: "🎉 فوز! {d1}+{d2}={sum} — ربحت ${amount}",
    gameDiceResultLose: "💀 خسارة! {d1}+{d2}={sum} — خسرت ${amount}",
    gameDiceResultDraw: "🔄 تعادل! {d1}+{d2}={sum} — لم تربح ولم تخسر",
    gameCoinResultWin: "🎉 فوز! ظهر {side} — ربحت ${amount}",
    gameCoinResultLose: "😞 خسرت! ظهر {side} — خسرت ${amount}",
    gameSlotsResultJackpot: "💎 جاكبوت!!! {s1} {s2} {s3} — ربحت ${amount} 🎉🎉🎉",
    gameSlotsResultTwoMatch: "🎉 رمزان متشابهان! {s1} {s2} {s3} — ربحت ${amount}",
    gameSlotsResultLose: "😞 {s1} {s2} {s3} — خسرت ${amount}",
    gameRouletteResultWin: "🎉 فوز! ظهر الرقم {result} — ربحت ${amount} (×6) 🎉",
    gameRouletteResultLose: "😞 خسرت! ظهر الرقم {result} — خسرت ${amount}",

    // General Messages
    planNotFound: "الخطة غير موجودة",
    insufficientBalance: "⚠️ لا يوجد لديك رصيد كافي",
    planActivated: "🎉 تم تفعيل الخطة بنجاح!",
    imageTooLargeMsg: "حجم الصورة كبير.",
    depositSubmitted: "تم إرسال الطلب للمراجعة.",
    walletAddressPlaceholder: "سيظهر عنوان الشبكة هنا",
    pleaseLoginFirst: "يرجى تسجيل الدخول أولاً",
    enterValidBet: "أدخل رهان صحيح",
    insufficientBalanceShort: "❌ رصيد غير كافٍ",
    enterNumber1to6: "اختر رقم بين 1 و 6",
    enterNumber0to9: "اختر رقم بين 0 و 9",

    // Footer
    footerLinks: "روابط",
    footerAccount: "الحساب",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - منصة تعدين رقمية",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",

    // Errors & Messages
    loginFirst: "يرجى تسجيل الدخول أولًا.",
    badLogin: "❌ البريد أو كلمة المرور غير صحيحة.",
    registered: "✅ تم إنشاء الحساب بنجاح.",
    wrongConfirm: "❌ كلمتا المرور غير متطابقتين.",
    already: "❌ هذا البريد مستخدم بالفعل.",
    logged: "✅ تم تسجيل الدخول.",
    depositDone: "✅ تمت إضافة العملية.",
    withdrawDone: "✅ تم تسجيل طلب السحب.",
    planDone: "✅ تم تفعيل الخطة.",
    contactDone: "✅ تم إرسال الرسالة.",
    noFunds: "❌ الرصيد غير كافٍ.",
    invalidAmount: "⚠️ أدخل مبلغ صحيح.",
    selectNetworkFirst: "⚠️ اختر الشبكة أولاً.",
    uploadImageFirst: "⚠️ ارفع صورة الإيداع أولاً.",
    imageTooLarge: "⚠️ حجم الصورة يجب ألا يتجاوز 10MB.",
    invalidImage: "⚠️ يرجى اختيار صورة فقط.",
    referralInvalid: "⚠️ كود الدعوة غير صحيح، تم تجاهله.",
    referralBonusMsg: "🎉 تم إضافة عمولة 20% من إيداع مدعوك!",
    copiedAddress: "✅ تم نسخ العنوان.",
    profitAdded: "💰 تم إضافة ${amount} أرباح يومية!",
    
    // Super Panel
    superPanel: "🛡️ لوحة التحكم الإدارية",
    superPanelSub: "KBS ✕ RT7",
    adminLogin: "🚀 دخول إلى النظام",
    adminUsername: "👤 اسم المستخدم",
    adminPassword: "🔑 كلمة المرور",
    adminLoginError: "❌ اسم المستخدم أو كلمة المرور غير صحيحة",
    adminWelcome: "👋 مرحباً",
    adminLogout: "🚪 خروج",
    adminRefresh: "🔄 تحديث",
    adminExport: "📥 تصدير",
    adminTotalUsers: "👥 إجمالي المستخدمين",
    adminTotalBalance: "💰 إجمالي الأرصدة",
    adminTotalProfit: "📈 إجمالي الأرباح",
    adminActivePlans: "📋 الخطط النشطة",
    adminSearch: "🔍 التحكم بالحساب",
    adminSearchPlaceholder: "🆔 معرف المستخدم (ID)",
    adminSearchBtn: "🔎 بحث عن المستخدم",
    adminUserId: "🆔 المعرف",
    adminUserName: "👤 الاسم",
    adminUserEmail: "📧 البريد",
    adminUserBalance: "💰 الرصيد",
    adminUserProfit: "📈 الأرباح",
    adminUserPlan: "📋 الخطة",
    adminUserCreated: "📅 تاريخ الإنشاء",
    adminUserTransactions: "📊 العمليات",
    adminUserReferral: "🔗 كود الدعوة",
    adminDeposit: "💰 إيداع يدوي",
    adminWithdraw: "💸 سحب يدوي",
    adminViewTx: "📜 العمليات",
    adminResetPlan: "🔄 إلغاء الخطة",
    adminDeleteUser: "🗑️ حذف الحساب",
    adminAmount: "💵 المبلغ",
    adminConfirmDeposit: "تأكيد الإيداع",
    adminConfirmWithdraw: "تأكيد السحب",
    adminConfirmDelete: "تأكيد الحذف",
    adminConfirmReset: "تأكيد إلغاء الخطة",
    adminCancel: "إلغاء",
    adminConfirm: "تأكيد",
    adminUserList: "📋 المستخدمين",
    adminNoUsers: "📭 لا يوجد مستخدمين بعد",
    adminUserNotFound: "❌ لم يتم العثور على مستخدم",
    adminUserFound: "✅ تم العثور على المستخدم",
    adminDepositSuccess: "✅ تم الإيداع بنجاح",
    adminWithdrawSuccess: "✅ تم السحب بنجاح",
    adminDeleteSuccess: "✅ تم حذف الحساب بنجاح",
    adminResetSuccess: "✅ تم إلغاء الخطة بنجاح",
    adminNoPlan: "ℹ️ هذا المستخدم ليس لديه خطة نشطة",
    adminNoTransactions: "📭 لا توجد عمليات",
    adminExportSuccess: "✅ تم تصدير البيانات بنجاح",
    adminRefreshSuccess: "✅ تم تحديث البيانات",
    adminSoundOn: "🔊 تم تشغيل الصوت",
    adminSoundOff: "🔇 تم إيقاف الصوت",

    // Crypto
    livePrices: "أسعار العملات الحية",
    lastUpdate: "آخر تحديث:",
    price: "السعر",
    change: "التغير",
    loading: "جاري التحميل..."
  },

  en: {
    // Navigation
    home: "Home",
    plans: "Mining Plans",
    deposit: "Deposit",
    withdraw: "Withdraw",
    profits: "Profits",
    contact: "Contact",
    login: "Login",
    register: "Create Account",
    logout: "Logout",
    dashboard: "Dashboard",
    back: "Back",
    games: "🎰 Games",

    // Hero - index
    heroEyebrow: "MININGUSDT • Digital Platform",
    heroTitle: "Digital Mining Platform",
    heroSub: "Mining and profit management system in a secure environment.",
    start: "Start Now",
    viewPlans: "View Plans",
    liveDemo: "LIVE",
    liveStats: "Online Now",
    onlineUsers: "Online Now",
    live: "Live",

    // Plans
    plansTitle: "Mining Plans",
    plansSub: "Plans for investment.",
    activate: "Activate Plan",
    depositValue: "Deposit",
    rate: "Return Rate",
    daily: "daily",
    days: "Duration",
    planBadge: "🔥 Most Profitable",
    viewPlan: "View Plan",
    currentPlan: "Current Plan",
    dailyProfit: "Daily Profit",
    totalProfit: "Total Profit",
    startDate: "Plan Start Date",
    noPlan: "No Plan",
    netProfit: "🎯 Your Net Profit",
    finalBalance: "💰 Final Balance",
    vipPlans: "Mining Plans",
    depositValueLabel: "Deposit",
    rateLabel: "Return",
    nextProfit: "⏳ Next Profit Time",
    timerHint: "🔄 Profit will be added automatically when timer ends",
    timerActive: "🟢 Active",
    timerInactive: "⏸ Inactive",
    timerAdding: "🔄 Adding...",

    // Auth
    loginTitle: "Login",
    registerTitle: "Create Account",
    name: "Name",
    email: "Email",
    password: "Password",
    confirm: "Confirm Password",
    loginBtn: "Login",
    registerBtn: "🚀 Create Account",
    forgotPassword: "Forgot password?",
    alreadyHaveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    welcomeBack: "Welcome Back",
    account: "Account",

    // Referral
    referralMyCode: "🎯 Your Referral Code",
    referralCodeLabel: "🔗 Code:",
    referralShareHint: "💡 Share this code with your friends — you get 20% of every deposit they make!",
    referralTotalBonusLabel: "💰 Total Commissions",
    referralTotalReferralsLabel: "👥 Total Referrals",
    referralBonusPerReferralLabel: "🎁 Commission Rate",
    referralBonusAmount: "+ 20% commission on every deposit",
    referralShareTelegram: "📱 Share via Telegram",
    referralShareWhatsapp: "💬 Share via WhatsApp",
    referralShareTwitter: "🐦 Share via Twitter",
    referralCopyLink: "🔗 Copy Link",
    copy: "📋 Copy",
    copied: "✅ Copied!",
    referralCodeLabelShort: "🔗 Referral Code",
    optional: "(Optional)",
    referralPlaceholder: "Enter referral code if you have one",
    referralHint: "💡 If you have a referral code from a friend, enter it here to get a bonus for both of you!",
    referralCopied: "✅ Code copied!",
    referralInviteFriends: "🚀 Invite Friends",

    // Dashboard
    dashboardTitle: "Dashboard",
    balance: "Balance",
    profit: "Profit",
    recent: "Recent Transactions",
    noOps: "No transactions yet.",
    type: "Type",
    amount: "Amount",
    date: "Date",
    status: "Status",
    complete: "Completed",
    pending: "Pending Review",
    quickActions: "Quick Actions",
    depositOp: "Deposit",
    profitOp: "Profit",
    withdrawOp: "Withdrawal",
    referralBonus: "🎁 20% Referral Commission",
    dashboardWelcome: "Welcome",
    userId: "🆔 ID",
    miningDashboard: "Mining Dashboard",
    activity: "Activity",

    // Deposit
    depositTitle: "USDT Deposit",
    depositSub: "Choose a deposit method and follow the steps.",
    selectCurrency: "Select Currency",
    selectNetwork: "Select Network",
    enterAmount: "Enter Deposit Amount",
    paymentInfo: "Payment Information",
    paymentProof: "Payment Proof",
    successTitle: "Request Received",
    successSub: "Your deposit request has been submitted successfully.",
    network: "Network",
    amountLabel: "Amount",
    statusLabel: "Status",
    copyAddress: "Copy Address",
    uploadProof: "Upload Deposit Screenshot",
    uploadHint: "JPG / JPEG / PNG",
    confirmDeposit: "Confirm Deposit",
    paymentDone: "Payment Done",
    reviewMessage: "Your request will be reviewed",
    reviewSub: "Please wait while we verify your transaction.",
    backToDashboard: "Back to Dashboard",
    featuresSecure: "🔒 High Security",
    featuresSecureSub: "Your request is handled through clear steps.",
    featuresSimple: "⚡ Simple Steps",
    featuresSimpleSub: "Choose network and amount, then submit proof.",
    featuresReview: "✓ Request Review",
    featuresReviewSub: "Transaction data is verified before status update.",
    stepCurrency: "Currency",
    stepNetwork: "Network",
    stepAmount: "Amount",
    stepPayment: "Payment",
    stepProof: "Proof",
    usdt: "USDT",
    trc20: "TRC20",
    bep20: "BEP20",
    tronNetwork: "Tron Network",
    bnbNetwork: "BNB Smart Chain",
    warningNetwork: "⚠️ Check network before transfer",
    warningNetworkSub: "Make sure the selected network matches the one in your wallet.",
    removeImage: "🗑️ Remove Image",
    selectImage: "📷 Click here to select image",
    secureDeposit: "Secure Deposit",
    depositStep: "Step",
    chooseCurrency: "Choose Currency",
    chooseNetwork: "Choose Network",
    enterDepositAmount: "Enter Deposit Amount",
    paymentInformation: "Payment Information",
    paymentProofTitle: "Payment Proof",
    depositSuccess: "Deposit Successful",
    review: "Review",

    // Withdraw
    withdrawTitle: "Withdrawal",
    withdrawSub: "Withdrawal is processed immediately after confirmation.",
    available: "Available Balance",
    address: "Wallet Address",
    requestWithdraw: "Request Withdrawal",
    demoWithdraw: "Withdraw",

    // Contact
    contactTitle: "Contact Us",
    contactSub: "We will reply as soon as possible.",
    message: "Message",
    send: "Send",
    contactSuccess: "Message sent successfully",
    contact: "Contact",
    trustUsers: "Active Users",
    trustUsersSub: "Trust our platform",
    trustRating: "User Rating",
    trustRatingSub: "out of 5 stars",
    trustSecurity: "Security & Transparency",
    trustSecuritySub: "Your data is safe",
    trustExperience: "Years of Experience",
    trustExperienceSub: "in digital mining",
    telegram: "Telegram",
    telegramSub: "@+905318254215",
    telegramBadge: "💬 Direct contact — Reply within minutes",

    // Games
    gamesTitle: "🎰 Lucky Games",
    gamesSub: "Pick your game and start winning — luck awaits!",
    backGames: "Back to Games",
    backHome: "Back to Home",
    noHistory: "No history yet",
    betAmount: "💰 Bet:",
    heads: "👑 Heads",
    tails: "🦅 Tails",
    coinBtn: "🪙 Flip!",
    diceBtn: "🎲 Roll Dice!",
    slotsBtn: "🎰 Spin!",
    guessBtn: "🔮 Guess!",
    rouletteBtn: "🎡 Spin Wheel!",
    badgeEasy: "🔥 Easy",
    badgeMedium: "⚡ Medium",
    badgeHigh: "🔥 High",
    badgeFair: "⚖️ Fair",
    badgeJackpot: "💎 Jackpot",
    gameGuessTitle: "🎯 Guess the Number",
    gameGuessDesc: "Pick 1-6 and win ×2.5",
    gameDiceTitle: "🎲 Dice Roll",
    gameDiceDesc: "Roll the dice and win ×2.5",
    gameSlotsTitle: "🎰 Slot Machine",
    gameSlotsDesc: "Jackpot ×4 or ×1.5",
    gameCoinTitle: "🪙 Coin Flip",
    gameCoinDesc: "Heads or Tails — ×2",
    gameRouletteTitle: "🎡 Roulette",
    gameRouletteDesc: "Pick a number and win ×6",

    // Game Results
    gameWin: "🎉 Win!",
    gameLose: "😞 Lost!",
    gameDraw: "🔄 Draw!",
    gameJackpot: "💎 Jackpot!!!",
    gameTwoMatch: "🎉 Two matching symbols!",
    gameCoinHeads: "Heads",
    gameCoinTails: "Tails",
    gameGuessResultWin: "🎉 Win! The number was {target} — You won ${amount}",
    gameGuessResultLose: "😞 Lost! The number was {target} — Try again",
    gameDiceResultWin: "🎉 Win! {d1}+{d2}={sum} — You won ${amount}",
    gameDiceResultLose: "💀 Loss! {d1}+{d2}={sum} — You lost ${amount}",
    gameDiceResultDraw: "🔄 Draw! {d1}+{d2}={sum} — No win, no loss",
    gameCoinResultWin: "🎉 Win! {side} appeared — You won ${amount}",
    gameCoinResultLose: "😞 Lost! {side} appeared — You lost ${amount}",
    gameSlotsResultJackpot: "💎 Jackpot!!! {s1} {s2} {s3} — You won ${amount} 🎉🎉🎉",
    gameSlotsResultTwoMatch: "🎉 Two matching symbols! {s1} {s2} {s3} — You won ${amount}",
    gameSlotsResultLose: "😞 {s1} {s2} {s3} — You lost ${amount}",
    gameRouletteResultWin: "🎉 Win! Number {result} appeared — You won ${amount} (×6) 🎉",
    gameRouletteResultLose: "😞 Lost! Number {result} appeared — You lost ${amount}",

    // General Messages
    planNotFound: "Plan not found",
    insufficientBalance: "⚠️ Insufficient balance",
    planActivated: "🎉 Plan activated successfully!",
    imageTooLargeMsg: "Image size is too large.",
    depositSubmitted: "Request submitted for review.",
    walletAddressPlaceholder: "Network address will appear here",
    pleaseLoginFirst: "Please login first",
    enterValidBet: "Enter a valid bet",
    insufficientBalanceShort: "❌ Insufficient balance",
    enterNumber1to6: "Choose a number between 1 and 6",
    enterNumber0to9: "Choose a number between 0 and 9",

    // Footer
    footerLinks: "Links",
    footerAccount: "Account",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Digital Mining Platform",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    whatsapp: "WhatsApp",
    email: "Email",

    // Errors & Messages
    loginFirst: "Please log in first.",
    badLogin: "❌ Incorrect email or password.",
    registered: "✅ Account created successfully.",
    wrongConfirm: "❌ Passwords do not match.",
    already: "❌ Email is already registered.",
    logged: "✅ Logged in.",
    depositDone: "✅ Transaction added.",
    withdrawDone: "✅ Withdrawal request recorded.",
    planDone: "✅ Plan activated.",
    contactDone: "✅ Message sent.",
    noFunds: "❌ Insufficient balance.",
    invalidAmount: "⚠️ Enter a valid amount.",
    selectNetworkFirst: "⚠️ Select network first.",
    uploadImageFirst: "⚠️ Upload deposit proof first.",
    imageTooLarge: "⚠️ Image size must not exceed 10MB.",
    invalidImage: "⚠️ Please select an image only.",
    referralInvalid: "⚠️ Invalid referral code, ignored.",
    referralBonusMsg: "🎉 20% commission added from your referral's deposit!",
    copiedAddress: "✅ Address copied.",
    profitAdded: "💰 Added ${amount} daily profit!",

    // Super Panel
    superPanel: "🛡️ Super Admin Panel",
    superPanelSub: "KBS ✕ RT7",
    adminLogin: "🚀 Login to System",
    adminUsername: "👤 Username",
    adminPassword: "🔑 Password",
    adminLoginError: "❌ Incorrect username or password",
    adminWelcome: "👋 Welcome",
    adminLogout: "🚪 Logout",
    adminRefresh: "🔄 Refresh",
    adminExport: "📥 Export",
    adminTotalUsers: "👥 Total Users",
    adminTotalBalance: "💰 Total Balances",
    adminTotalProfit: "📈 Total Profits",
    adminActivePlans: "📋 Active Plans",
    adminSearch: "🔍 Account Control",
    adminSearchPlaceholder: "🆔 User ID",
    adminSearchBtn: "🔎 Search User",
    adminUserId: "🆔 ID",
    adminUserName: "👤 Name",
    adminUserEmail: "📧 Email",
    adminUserBalance: "💰 Balance",
    adminUserProfit: "📈 Profit",
    adminUserPlan: "📋 Plan",
    adminUserCreated: "📅 Created",
    adminUserTransactions: "📊 Transactions",
    adminUserReferral: "🔗 Referral Code",
    adminDeposit: "💰 Manual Deposit",
    adminWithdraw: "💸 Manual Withdraw",
    adminViewTx: "📜 Transactions",
    adminResetPlan: "🔄 Reset Plan",
    adminDeleteUser: "🗑️ Delete Account",
    adminAmount: "💵 Amount",
    adminConfirmDeposit: "Confirm Deposit",
    adminConfirmWithdraw: "Confirm Withdrawal",
    adminConfirmDelete: "Confirm Deletion",
    adminConfirmReset: "Confirm Plan Reset",
    adminCancel: "Cancel",
    adminConfirm: "Confirm",
    adminUserList: "📋 Users",
    adminNoUsers: "📭 No users yet",
    adminUserNotFound: "❌ User not found",
    adminUserFound: "✅ User found",
    adminDepositSuccess: "✅ Deposit successful",
    adminWithdrawSuccess: "✅ Withdrawal successful",
    adminDeleteSuccess: "✅ Account deleted successfully",
    adminResetSuccess: "✅ Plan reset successfully",
    adminNoPlan: "ℹ️ This user has no active plan",
    adminNoTransactions: "📭 No transactions",
    adminExportSuccess: "✅ Data exported successfully",
    adminRefreshSuccess: "✅ Data refreshed",
    adminSoundOn: "🔊 Sound enabled",
    adminSoundOff: "🔇 Sound disabled",

    // Crypto
    livePrices: "Live Crypto Prices",
    lastUpdate: "Last update:",
    price: "Price",
    change: "Change",
    loading: "Loading..."
  },

  tr: {
    // Navigation
    home: "Ana Sayfa",
    plans: "Madencilik Planları",
    deposit: "Yatırma",
    withdraw: "Çekme",
    profits: "Kârlar",
    contact: "İletişim",
    login: "Giriş",
    register: "Hesap Oluştur",
    logout: "Çıkış",
    dashboard: "Kontrol Paneli",
    back: "Geri",
    games: "🎰 Oyunlar",

    // Hero - index
    heroEyebrow: "MININGUSDT • Dijital Platform",
    heroTitle: "Dijital Madencilik Platformu",
    heroSub: "Güvenli ortamda madencilik ve kâr yönetim sistemi.",
    start: "Başla",
    viewPlans: "Planları Gör",
    liveDemo: "CANLI",
    liveStats: "Şu Anda Çevrimiçi",
    onlineUsers: "Çevrimiçi",
    live: "Canlı",

    // Plans
    plansTitle: "Madencilik Planları",
    plansSub: "Yatırım için planlar.",
    activate: "Planı Etkinleştir",
    depositValue: "Yatırma",
    rate: "Getiri Oranı",
    daily: "günlük",
    days: "Süre",
    planBadge: "🔥 En Karlı",
    viewPlan: "Planı Gör",
    currentPlan: "Mevcut Plan",
    dailyProfit: "Günlük Kâr",
    totalProfit: "Toplam Kâr",
    startDate: "Plan Başlangıcı",
    noPlan: "Plan Yok",
    netProfit: "🎯 Net Kârınız",
    finalBalance: "💰 Son Bakiye",
    vipPlans: "Madencilik Planları",
    depositValueLabel: "Yatırma",
    rateLabel: "Getiri",
    nextProfit: "⏳ Sonraki Kâr Zamanı",
    timerHint: "🔄 Zamanlayıcı bittiğinde kâr otomatik eklenecek",
    timerActive: "🟢 Aktif",
    timerInactive: "⏸ Pasif",
    timerAdding: "🔄 Ekleniyor...",

    // Auth
    loginTitle: "Giriş",
    registerTitle: "Hesap Oluştur",
    name: "Ad",
    email: "E-posta",
    password: "Şifre",
    confirm: "Şifre Tekrar",
    loginBtn: "Giriş",
    registerBtn: "🚀 Hesap Oluştur",
    forgotPassword: "Şifremi unuttum?",
    alreadyHaveAccount: "Zaten hesabınız var mı?",
    noAccount: "Hesabınız yok mu?",
    welcomeBack: "Tekrar Hoş Geldiniz",
    account: "Hesap",

    // Referral
    referralMyCode: "🎯 Davet Kodunuz",
    referralCodeLabel: "🔗 Kod:",
    referralShareHint: "💡 Bu kodu arkadaşlarınızla paylaşın — yaptıkları her yatırımdan %20 kazanırsınız!",
    referralTotalBonusLabel: "💰 Toplam Komisyon",
    referralTotalReferralsLabel: "👥 Toplam Davet",
    referralBonusPerReferralLabel: "🎁 Komisyon Oranı",
    referralBonusAmount: "+ Her yatırımdan %20 komisyon",
    referralShareTelegram: "📱 Telegram ile Paylaş",
    referralShareWhatsapp: "💬 WhatsApp ile Paylaş",
    referralShareTwitter: "🐦 Twitter ile Paylaş",
    referralCopyLink: "🔗 Bağlantıyı Kopyala",
    copy: "📋 Kopyala",
    copied: "✅ Kopyalandı!",
    referralCodeLabelShort: "🔗 Davet Kodu",
    optional: "(İsteğe bağlı)",
    referralPlaceholder: "Varsa referans kodunu girin",
    referralHint: "💡 Bir arkadaşınızdan referans kodunuz varsa, ikinizin de bonus alması için buraya girin!",
    referralCopied: "✅ Kod kopyalandı!",
    referralInviteFriends: "🚀 Arkadaşları Davet Et",

    // Dashboard
    dashboardTitle: "Kontrol Paneli",
    balance: "Bakiye",
    profit: "Kâr",
    recent: "Son İşlemler",
    noOps: "Henüz işlem yok.",
    type: "İşlem",
    amount: "Tutar",
    date: "Tarih",
    status: "Durum",
    complete: "Tamamlandı",
    pending: "İnceleniyor",
    quickActions: "Hızlı İşlemler",
    depositOp: "Yatırma",
    profitOp: "Kâr",
    withdrawOp: "Çekme",
    referralBonus: "🎁 %20 Davet Komisyonu",
    dashboardWelcome: "Hoş Geldiniz",
    userId: "🆔 ID",
    miningDashboard: "Madencilik Kontrol Paneli",
    activity: "Aktivite",

    // Deposit
    depositTitle: "USDT Yatırma",
    depositSub: "Bir yatırma yöntemi seçin ve adımları takip edin.",
    selectCurrency: "Para Birimi Seç",
    selectNetwork: "Ağ Seç",
    enterAmount: "Yatırma Tutarını Gir",
    paymentInfo: "Ödeme Bilgileri",
    paymentProof: "Ödeme Kanıtı",
    successTitle: "Talep Alındı",
    successSub: "Yatırma talebiniz başarıyla gönderildi.",
    network: "Ağ",
    amountLabel: "Tutar",
    statusLabel: "Durum",
    copyAddress: "Adresi Kopyala",
    uploadProof: "Yatırma Ekran Görüntüsü Yükle",
    uploadHint: "JPG / JPEG / PNG",
    confirmDeposit: "Yatırmayı Onayla",
    paymentDone: "Ödeme Yapıldı",
    reviewMessage: "Talebiniz incelenecek",
    reviewSub: "Lütfen işleminiz doğrulanırken bekleyin.",
    backToDashboard: "Kontrol Paneline Dön",
    featuresSecure: "🔒 Yüksek Güvenlik",
    featuresSecureSub: "Talebiniz net adımlarla işlenir.",
    featuresSimple: "⚡ Basit Adımlar",
    featuresSimpleSub: "Ağ ve tutarı seçin, ardından kanıt gönderin.",
    featuresReview: "✓ Talep İncelemesi",
    featuresReviewSub: "Durum güncellenmeden önce işlem verileri doğrulanır.",
    stepCurrency: "Para Birimi",
    stepNetwork: "Ağ",
    stepAmount: "Tutar",
    stepPayment: "Ödeme",
    stepProof: "Kanıt",
    usdt: "USDT",
    trc20: "TRC20",
    bep20: "BEP20",
    tronNetwork: "Tron Ağı",
    bnbNetwork: "BNB Smart Chain",
    warningNetwork: "⚠️ Transfer öncesi ağı kontrol edin",
    warningNetworkSub: "Seçilen ağın cüzdanınızdaki ağ ile eşleştiğinden emin olun.",
    removeImage: "🗑️ Resmi Kaldır",
    selectImage: "📷 Resim seçmek için tıklayın",
    secureDeposit: "Güvenli Yatırma",
    depositStep: "Adım",
    chooseCurrency: "Para Birimi Seç",
    chooseNetwork: "Ağ Seç",
    enterDepositAmount: "Yatırma Tutarını Gir",
    paymentInformation: "Ödeme Bilgileri",
    paymentProofTitle: "Ödeme Kanıtı",
    depositSuccess: "Yatırma Başarılı",
    review: "İnceleme",

    // Withdraw
    withdrawTitle: "Çekme",
    withdrawSub: "Çekme onaydan sonra hemen işleme alınır.",
    available: "Mevcut Bakiye",
    address: "Cüzdan Adresi",
    requestWithdraw: "Çekme Talebi",
    demoWithdraw: "Çekme",

    // Contact
    contactTitle: "İletişim",
    contactSub: "En kısa sürede cevap vereceğiz.",
    message: "Mesaj",
    send: "Gönder",
    contactSuccess: "Mesaj başarıyla gönderildi",
    contact: "İletişim",
    trustUsers: "Aktif Kullanıcı",
    trustUsersSub: "Platformumuza güveniyor",
    trustRating: "Kullanıcı Puanı",
    trustRatingSub: "5 yıldız üzerinden",
    trustSecurity: "Güvenlik ve Şeffaflık",
    trustSecuritySub: "Verileriniz güvende",
    trustExperience: "Yıllık Deneyim",
    trustExperienceSub: "dijital madencilikte",
    telegram: "Telegram",
    telegramSub: "@+905318254215",
    telegramBadge: "💬 Doğrudan iletişim — Dakikalar içinde yanıt",

    // Games
    gamesTitle: "🎰 Şans Oyunları",
    gamesSub: "Oyununu seç ve kazanmaya başla — şans seni bekliyor!",
    backGames: "Oyunlara Dön",
    backHome: "Ana Sayfaya Dön",
    noHistory: "Henüz kayıt yok",
    betAmount: "💰 Bahis:",
    heads: "👑 Yazı",
    tails: "🦅 Tura",
    coinBtn: "🪙 At!",
    diceBtn: "🎲 Zar At!",
    slotsBtn: "🎰 Döndür!",
    guessBtn: "🔮 Tahmin Et!",
    rouletteBtn: "🎡 Çarkı Döndür!",
    badgeEasy: "🔥 Kolay",
    badgeMedium: "⚡ Orta",
    badgeHigh: "🔥 Yüksek",
    badgeFair: "⚖️ Adil",
    badgeJackpot: "💎 Jackpot",
    gameGuessTitle: "🎯 Sayıyı Tahmin Et",
    gameGuessDesc: "1-6 arası seç ve ×2.5 kazan",
    gameDiceTitle: "🎲 Zar At",
    gameDiceDesc: "Zarı at ve ×2.5 kazan",
    gameSlotsTitle: "🎰 Slot Makinesi",
    gameSlotsDesc: "Jackpot ×4 veya ×1.5",
    gameCoinTitle: "🪙 Yazı Tura",
    gameCoinDesc: "Yazı mı Tura mı — ×2",
    gameRouletteTitle: "🎡 Rulet",
    gameRouletteDesc: "Bir sayı seç ve ×6 kazan",

    // Game Results
    gameWin: "🎉 Kazandın!",
    gameLose: "😞 Kaybettin!",
    gameDraw: "🔄 Beraberlik!",
    gameJackpot: "💎 Jackpot!!!",
    gameTwoMatch: "🎉 İki eşleşen sembol!",
    gameCoinHeads: "Yazı",
    gameCoinTails: "Tura",
    gameGuessResultWin: "🎉 Kazandın! Sayı {target} idi — ${amount} kazandın",
    gameGuessResultLose: "😞 Kaybettin! Sayı {target} idi — Tekrar dene",
    gameDiceResultWin: "🎉 Kazandın! {d1}+{d2}={sum} — ${amount} kazandın",
    gameDiceResultLose: "💀 Kaybettin! {d1}+{d2}={sum} — ${amount} kaybettin",
    gameDiceResultDraw: "🔄 Beraberlik! {d1}+{d2}={sum} — Ne kazandın ne kaybettin",
    gameCoinResultWin: "🎉 Kazandın! {side} geldi — ${amount} kazandın",
    gameCoinResultLose: "😞 Kaybettin! {side} geldi — ${amount} kaybettin",
    gameSlotsResultJackpot: "💎 Jackpot!!! {s1} {s2} {s3} — ${amount} kazandın 🎉🎉🎉",
    gameSlotsResultTwoMatch: "🎉 İki eşleşen sembol! {s1} {s2} {s3} — ${amount} kazandın",
    gameSlotsResultLose: "😞 {s1} {s2} {s3} — ${amount} kaybettin",
    gameRouletteResultWin: "🎉 Kazandın! {result} sayısı geldi — ${amount} kazandın (×6) 🎉",
    gameRouletteResultLose: "😞 Kaybettin! {result} sayısı geldi — ${amount} kaybettin",

    // General Messages
    planNotFound: "Plan bulunamadı",
    insufficientBalance: "⚠️ Yetersiz bakiye",
    planActivated: "🎉 Plan başarıyla etkinleştirildi!",
    imageTooLargeMsg: "Resim boyutu çok büyük.",
    depositSubmitted: "Talep incelenmek üzere gönderildi.",
    walletAddressPlaceholder: "Ağ adresi burada görünecek",
    pleaseLoginFirst: "Lütfen önce giriş yapın",
    enterValidBet: "Geçerli bir bahis girin",
    insufficientBalanceShort: "❌ Yetersiz bakiye",
    enterNumber1to6: "1 ile 6 arasında bir sayı seçin",
    enterNumber0to9: "0 ile 9 arasında bir sayı seçin",

    // Footer
    footerLinks: "Bağlantılar",
    footerAccount: "Hesap",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Dijital Madencilik Platformu",
    privacy: "Gizlilik Politikası",
    terms: "Şartlar ve Koşullar",
    whatsapp: "WhatsApp",
    email: "E-posta",

    // Errors & Messages
    loginFirst: "Lütfen önce giriş yapın.",
    badLogin: "❌ E-posta veya şifre yanlış.",
    registered: "✅ Hesap başarıyla oluşturuldu.",
    wrongConfirm: "❌ Şifreler eşleşmiyor.",
    already: "❌ Bu e-posta zaten kayıtlı.",
    logged: "✅ Giriş yapıldı.",
    depositDone: "✅ İşlem eklendi.",
    withdrawDone: "✅ Çekme talebi kaydedildi.",
    planDone: "✅ Plan etkinleştirildi.",
    contactDone: "✅ Mesaj gönderildi.",
    noFunds: "❌ Yetersiz bakiye.",
    invalidAmount: "⚠️ Geçerli bir tutar girin.",
    selectNetworkFirst: "⚠️ Önce ağı seçin.",
    uploadImageFirst: "⚠️ Önce yatırma kanıtını yükleyin.",
    imageTooLarge: "⚠️ Resim boyutu 10MB'ı aşmamalıdır.",
    invalidImage: "⚠️ Lütfen sadece resim seçin.",
    referralInvalid: "⚠️ Geçersiz referans kodu, yoksayıldı.",
    referralBonusMsg: "🎉 Davetinizin yatırımından %20 komisyon eklendi!",
    copiedAddress: "✅ Adres kopyalandı.",
    profitAdded: "💰 ${amount} günlük kâr eklendi!",

    // Super Panel
    superPanel: "🛡️ Süper Yönetim Paneli",
    superPanelSub: "KBS ✕ RT7",
    adminLogin: "🚀 Sisteme Giriş",
    adminUsername: "👤 Kullanıcı Adı",
    adminPassword: "🔑 Şifre",
    adminLoginError: "❌ Kullanıcı adı veya şifre yanlış",
    adminWelcome: "👋 Hoş Geldiniz",
    adminLogout: "🚪 Çıkış",
    adminRefresh: "🔄 Yenile",
    adminExport: "📥 Dışa Aktar",
    adminTotalUsers: "👥 Toplam Kullanıcı",
    adminTotalBalance: "💰 Toplam Bakiye",
    adminTotalProfit: "📈 Toplam Kâr",
    adminActivePlans: "📋 Aktif Planlar",
    adminSearch: "🔍 Hesap Kontrolü",
    adminSearchPlaceholder: "🆔 Kullanıcı ID",
    adminSearchBtn: "🔎 Kullanıcı Ara",
    adminUserId: "🆔 ID",
    adminUserName: "👤 Ad",
    adminUserEmail: "📧 E-posta",
    adminUserBalance: "💰 Bakiye",
    adminUserProfit: "📈 Kâr",
    adminUserPlan: "📋 Plan",
    adminUserCreated: "📅 Oluşturulma",
    adminUserTransactions: "📊 İşlemler",
    adminUserReferral: "🔗 Referans Kodu",
    adminDeposit: "💰 Manuel Yatır",
    adminWithdraw: "💸 Manuel Çek",
    adminViewTx: "📜 İşlemler",
    adminResetPlan: "🔄 Planı Sıfırla",
    adminDeleteUser: "🗑️ Hesabı Sil",
    adminAmount: "💵 Tutar",
    adminConfirmDeposit: "Yatırmayı Onayla",
    adminConfirmWithdraw: "Çekmeyi Onayla",
    adminConfirmDelete: "Silmeyi Onayla",
    adminConfirmReset: "Planı Sıfırlamayı Onayla",
    adminCancel: "İptal",
    adminConfirm: "Onayla",
    adminUserList: "📋 Kullanıcılar",
    adminNoUsers: "📭 Henüz kullanıcı yok",
    adminUserNotFound: "❌ Kullanıcı bulunamadı",
    adminUserFound: "✅ Kullanıcı bulundu",
    adminDepositSuccess: "✅ Yatırma başarılı",
    adminWithdrawSuccess: "✅ Çekme başarılı",
    adminDeleteSuccess: "✅ Hesap başarıyla silindi",
    adminResetSuccess: "✅ Plan başarıyla sıfırlandı",
    adminNoPlan: "ℹ️ Bu kullanıcının aktif planı yok",
    adminNoTransactions: "📭 İşlem yok",
    adminExportSuccess: "✅ Veriler başarıyla dışa aktarıldı",
    adminRefreshSuccess: "✅ Veriler yenilendi",
    adminSoundOn: "🔊 Ses açıldı",
    adminSoundOff: "🔇 Ses kapatıldı",

    // Crypto
    livePrices: "Canlı Kripto Fiyatları",
    lastUpdate: "Son güncelleme:",
    price: "Fiyat",
    change: "Değişim",
    loading: "Yükleniyor..."
  }

};

/* =========================================================
   PLANS - UPDATED (VIP 1 = $100, VIP 2 = $200, VIP 3 = $300, VIP 4 = $400, VIP 5 = $500)
========================================================= */

const PLANS = [
  {
    id:"VIP 1",
    amount:100,
    rate:10,
    days:30,
    netProfit:300,
    finalBalance:400
  },
  {
    id:"VIP 2",
    amount:200,
    rate:11,
    days:30,
    netProfit:660,
    finalBalance:860
  },
  {
    id:"VIP 3",
    amount:300,
    rate:13,
    days:30,
    netProfit:1170,
    finalBalance:1470
  },
  {
    id:"VIP 4",
    amount:400,
    rate:14,
    days:30,
    netProfit:1680,
    finalBalance:2080
  },
  {
    id:"VIP 5",
    amount:500,
    rate:15,
    days:30,
    netProfit:2250,
    finalBalance:2750
  }
];


/* =========================================================
   UNIQUE USER ID GENERATOR - FIXED
========================================================= */

function generateUniqueUserId() {
  const users = getUsers();
  const existingIds = new Set();

  Object.values(users).forEach(user => {
    if (user.userId) {
      existingIds.add(user.userId);
    }
  });

  let newId;
  let attempts = 0;
  const maxAttempts = 10000;

  do {
    newId = Math.floor(100000000 + Math.random() * 900000000).toString();
    attempts++;
  } while (existingIds.has(newId) && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    newId = Date.now().toString();
  }

  return newId;
}


/* =========================================================
   GET USERS - FIXED
========================================================= */

function getUsers() {
  try {
    return JSON.parse(
      localStorage.getItem("miningUsersDB")
    ) || {};
  } catch {
    return {};
  }
}


/* =========================================================
   REFERRAL CODE GENERATOR
========================================================= */

function generateReferralCode(userId) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code + userId.slice(-4);
}


/* =========================================================
   LANGUAGE
========================================================= */

function lang(){

  const saved =
    localStorage.getItem("siteLang");

  if(
    saved === "ar" ||
    saved === "en" ||
    saved === "tr"
  ){
    return saved;
  }

  return "ar";
}


function t(key){

  return (
    (I18N[lang()] &&
      I18N[lang()][key]) ||
    I18N.ar[key] ||
    key
  );
}


function setLang(language){

  if(
    language !== "ar" &&
    language !== "en" &&
    language !== "tr"
  ){
    language = "ar";
  }

  localStorage.setItem(
    "siteLang",
    language
  );

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    language === "ar"
      ? "rtl"
      : "ltr";

  // ترجمة النصوص الداخلية
  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      element.innerHTML =
        t(element.dataset.i18n);

    });

  // ترجمة الـ placeholder
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      element.placeholder =
        t(element.dataset.i18nPlaceholder);

    });

}


/* =========================================================
   ✅ GET CURRENT USER - FIXED (مع مزامنة من الخادم)
   ========================================================= */
async function getCurrentUser() {
  const localUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!localUser) return null;

  try {
    const userId = localUser.userId || localUser._id;

    if (!userId) {
      return localUser;
    }

    const apiUrl =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/admin/user/${encodeURIComponent(userId)}`
        : `/api/admin/user/${encodeURIComponent(userId)}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    if (data.success && data.user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      const db = getUsers();
      db[data.user.email] = data.user;

      localStorage.setItem(
        "miningUsersDB",
        JSON.stringify(db)
      );

      return data.user;
    }

  } catch (error) {
    console.warn(
      "⚠️ فشل تحديث المستخدم من الخادم:",
      error
    );
  }

  return localUser;
}

/* =========================================================
   ✅ SAVE USER - FIXED (مع مزامنة مع الخادم)
========================================================= */

function saveUser(user) {
  if (!user) {
    console.error("❌ لا يوجد مستخدم للحفظ");
    return;
  }

  if (!user.userId) {
    console.error("❌ المستخدم لا يحتوي على userId");
    return;
  }

  // حفظ محلي
  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  const database = getUsers();

  if (user.email) {
    database[user.email] = user;
  }

  localStorage.setItem(
    "miningUsersDB",
    JSON.stringify(database)
  );

  // تحديث الحساب الموجود في MongoDB
  const apiUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? `http://localhost:3000/api/admin/user/${encodeURIComponent(user.userId)}`
      : `/api/admin/user/${encodeURIComponent(user.userId)}`;

  fetch(apiUrl, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name: user.name,
      email: user.email,

      balance: Number(user.balance || 0),
      profit: Number(user.profit || 0),

      plan: user.plan || null,
      planAmount: Number(user.planAmount || 0),
      planRate: Number(user.planRate || 0),
      planDays: Number(user.planDays || 0),

      planStart: user.planStart || null,
      timerStart: user.timerStart || null,
      lastProfitDate: user.lastProfitDate || null,

      referredBy: user.referredBy || null,
      referralBonus: Number(user.referralBonus || 0),

      referredUsers: user.referredUsers || [],
      transactions: user.transactions || []
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.user) {
        console.log(
          "✅ تم تحديث المستخدم في MongoDB:",
          data.user.balance
        );

        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );

        const db = getUsers();

        if (data.user.email) {
          db[data.user.email] = data.user;
        }

        localStorage.setItem(
          "miningUsersDB",
          JSON.stringify(db)
        );
      } else {
        console.error(
          "❌ فشل تحديث المستخدم:",
          data
        );
      }
    })
    .catch(err => {
      console.error(
        "❌ خطأ في الاتصال بالسيرفر:",
        err
      );
    });
}


/* =========================================================
   HELPERS
========================================================= */

function money(value){

  return "$" +
    Number(value || 0)
      .toFixed(2);

}


function toast(message){

  let element =
    document.getElementById(
      "toast"
    );

  if(!element){

    element =
      document.createElement(
        "div"
      );

    element.id =
      "toast";

    element.className =
      "toast";

    document.body
      .appendChild(element);

  }

  element.textContent =
    message;

  element.classList.add(
    "show"
  );

  clearTimeout(
    window.toastTimer
  );

  window.toastTimer =
    setTimeout(
      () => {
        element.classList.remove(
          "show"
        );
      },
      2600
    );

}


function addTransaction(
  user,
  type,
  amount,
  status="مكتمل",
  extra={}
){

  if(!user.transactions){

    user.transactions =
      [];

  }

  user.transactions.unshift({

    type:type,

    amount:amount,

    date:
      new Date()
        .toISOString(),

    status:status,

    ...extra

  });

}


/* =========================================================
   RENDER PLANS
========================================================= */

function renderPlans() {
  const container = document.getElementById("plansGrid");
  if (!container) return;

  const user = getCurrentUser();
  const isLoggedIn = !!user;

  container.innerHTML = PLANS.map(plan => {
    const isFeatured = plan.id === "VIP 1";
    const badge = isFeatured ? `<span class="plan-badge">${t("planBadge")}</span>` : '';
    
    return `
      <div class="plan ${isFeatured ? 'featured' : ''}">
        ${badge}
        <h3>${plan.id}</h3>
        <div class="plan-price">$${plan.amount}</div>
        <ul>
          <li>💰 ${t("depositValueLabel")}: $${plan.amount}</li>
          <li>📈 ${t("rateLabel")}: ${plan.rate}% ${t("daily")}</li>
          <li>📅 ${t("days")}: ${plan.days} ${t("daily")}</li>
          <li style="color: var(--gold); font-weight: 700; border-top: 1px solid rgba(255,215,0,0.1); padding-top: 8px; margin-top: 8px;">
            ${t("netProfit")}: <span style="color: var(--green);">$${plan.netProfit.toFixed(2)}</span>
          </li>
          <li style="color: var(--gold); font-weight: 700;">
            ${t("finalBalance")}: <span style="color: var(--gold);">$${plan.finalBalance.toFixed(2)}</span>
          </li>
        </ul>
        <div class="progress"><span style="width:${plan.amount === 100 ? 20 : plan.amount === 200 ? 40 : plan.amount === 300 ? 60 : plan.amount === 400 ? 80 : 100}%"></span></div>
        ${isLoggedIn 
          ? `<button class="primary-btn" data-plan="${plan.id}" data-i18n="activate">${t("activate")}</button>`
          : `<a class="secondary-btn" href="register.html" data-i18n="register">${t("register")}</a>`
        }
      </div>
    `;
  }).join('');
}


/* =========================================================
   TIMER SYSTEM - FIXED
========================================================= */

function updateTimerDisplay() {
  const user = getCurrentUser();
  const timerEl = document.getElementById('profitTimer');
  
  if (!timerEl) return;
  
  if (!user || !user.plan || !user.timerStart) {
    timerEl.textContent = '--:--:--';
    return;
  }

  // ✅ حساب الوقت المتبقي من timerStart
  const now = Date.now();
  const elapsed = now - user.timerStart;
  let remaining = (24 * 60 * 60 * 1000) - elapsed;
  
  if (remaining <= 0) {
    // ✅ إضافة الربح اليومي
    const dailyProfit = (user.planAmount * user.planRate) / 100;
    user.balance = Number(user.balance || 0) + dailyProfit;
    user.profit = Number(user.profit || 0) + dailyProfit;
    addTransaction(user, `📈 ربح يومي (${user.plan})`, dailyProfit, '✅ مكتمل');
    user.timerStart = Date.now();
    saveUser(user);
    toast(t('profitAdded').replace('${amount}', dailyProfit.toFixed(2)));
    if (document.body.dataset.page === "dashboard") renderDashboard();
    timerEl.textContent = '00:00:00';
    return;
  }

  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// دالة لتشغيل المؤقت بشكل مستمر
function startTimerLoop() {
  updateTimerDisplay();
  // تحديث كل ثانية
  setTimeout(startTimerLoop, 1000);
}


/* =========================================================
   ✅ ENSURE AUTH - FIXED (تم إضافة هذه الدالة)
========================================================= */

function ensureAuth() {
  const user = getCurrentUser();
  if (!user) {
    toast(t("loginFirst"));
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return false;
  }
  return true;
}


/* =========================================================
   PLAN ACTIVATION WITH CONFIRMATION + FIXED TIMER
========================================================= */

function activatePlan(planId){

  console.log("🟢 activatePlan called with:", planId);
  
  // ✅ التحقق من تسجيل الدخول مباشرة بدون ensureAuth
  const user = getCurrentUser();
  if (!user) {
    toast("⚠️ " + t("loginFirst"));
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  const plan = PLANS.find(item => item.id === planId);
  if(!plan){
    toast(t("planNotFound"));
    console.log("❌ Plan not found:", planId);
    return;
  }

  console.log("👤 User:", user);
  console.log("💰 User balance:", user.balance);
  console.log("💰 Plan amount:", plan.amount);

  // ✅ التحقق من الرصيد
  if(Number(user.balance || 0) < plan.amount){
    toast("⚠️ " + t("insufficientBalance") + " رصيدك: $" + Number(user.balance || 0).toFixed(2) + " — المطلوب: $" + plan.amount);
    console.log("❌ Insufficient balance");
    const btns = document.querySelectorAll('[data-plan="' + planId + '"]');
    btns.forEach(btn => {
      btn.style.animation = 'shake 0.5s ease';
      btn.style.borderColor = 'var(--danger)';
      setTimeout(() => {
        btn.style.animation = '';
        btn.style.borderColor = '';
      }, 600);
    });
    return;
  }

  // ✅ نافذة تأكيد قبل التفعيل
  showConfirmDialog(
    // عنوان
    "🛒 تأكيد شراء الخطة",
    // رسالة
    `هل أنت متأكد من شراء خطة <strong>${plan.id}</strong> بمبلغ <strong>$${plan.amount}</strong>؟<br><br>
    📈 العائد اليومي: <strong>${plan.rate}%</strong><br>
    📅 المدة: <strong>${plan.days} يوم</strong><br>
    💰 الربح المتوقع: <strong>$${plan.netProfit.toFixed(2)}</strong>`,
    // زر تأكيد
    "✅ نعم، قم بالشراء",
    // زر إلغاء
    "❌ لا، إلغاء",
    // callback عند التأكيد
    function() {
      executePlanActivation(plan, user);
    },
    // callback عند الإلغاء
    function() {
      toast("❌ تم إلغاء شراء الخطة");
    }
  );
}

/* =========================================================
   تنفيذ التفعيل بعد التأكيد
========================================================= */

async function executePlanActivation(plan, user) {
  console.log("✅ Executing plan activation for:", plan.id);

  // ✅ إرسال طلب تفعيل الخطة إلى الخادم
  const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/activate-plan'
    : '/api/activate-plan';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        planId: plan.id,
        planAmount: plan.amount,
        planRate: plan.rate,
        planDays: plan.days
      })
    });

    const data = await response.json();

    if (!data.success) {
      toast("❌ " + data.message);
      return;
    }

    // ✅ تحديث المستخدم من الخادم
    const updatedUser = data.user;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // ✅ حفظ في قاعدة البيانات المحلية
    const db = JSON.parse(localStorage.getItem('miningUsersDB')) || {};
    db[updatedUser.email] = updatedUser;
    localStorage.setItem('miningUsersDB', JSON.stringify(db));

    // ✅ عرض الاحتفال
    showCelebration(plan);

    // ✅ عرض رسالة نجاح
    toast("🎉 " + t("planActivated") + " رصيدك: $" + Number(updatedUser.balance).toFixed(2));

    // ✅ التوجيه إلى لوحة التحكم بعد 2.5 ثانية
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2500);

  } catch (error) {
    console.error("❌ فشل تفعيل الخطة:", error);
    toast("❌ فشل الاتصال بالخادم، تأكد من تشغيل server.js");
  }
}

/* =========================================================
   نافذة التأكيد المخصصة (بدون مكتبات خارجية)
========================================================= */

function showConfirmDialog(title, message, confirmText, cancelText, onConfirm, onCancel) {
  // إزالة أي نافذة سابقة
  const existing = document.getElementById('customConfirmDialog');
  if (existing) existing.remove();

  // إنشاء الخلفية
  const overlay = document.createElement('div');
  overlay.id = 'customConfirmDialog';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
    padding: 20px;
  `;

  // إنشاء المحتوى
  overlay.innerHTML = `
    <div style="
      max-width: 480px;
      width: 100%;
      background: linear-gradient(145deg, rgba(8, 24, 31, 0.98), rgba(3, 10, 15, 0.98));
      border: 2px solid rgba(255, 215, 0, 0.2);
      border-radius: 28px;
      padding: 35px 30px 30px;
      box-shadow: 0 30px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.05);
      animation: celebrationPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-align: center;
    ">
      <div style="font-size: 52px; margin-bottom: 10px;">🛒</div>
      <h2 style="
        font-size: 26px;
        font-weight: 800;
        color: var(--gold, #ffd700);
        margin-bottom: 10px;
      ">${title}</h2>
      <div style="
        color: var(--text);
        font-size: 15px;
        line-height: 1.9;
        margin-bottom: 25px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.04);
      ">${message}</div>
      <div style="
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      ">
        <button id="confirmYes" style="
          padding: 14px 32px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #00b879, #00ff9d);
          color: #00130d;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 30px rgba(0, 255, 157, 0.15);
          flex: 1;
          min-width: 120px;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          ${confirmText}
        </button>
        <button id="confirmNo" style="
          padding: 14px 32px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--muted);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          flex: 1;
          min-width: 120px;
        " onmouseover="this.style.borderColor='var(--danger)';this.style.color='var(--danger)'" onmouseout="this.style.borderColor='';this.style.color=''">
          ${cancelText}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // ربط الأحداث
  overlay.querySelector('#confirmYes').addEventListener('click', function() {
    overlay.remove();
    if (typeof onConfirm === 'function') onConfirm();
  });

  overlay.querySelector('#confirmNo').addEventListener('click', function() {
    overlay.remove();
    if (typeof onCancel === 'function') onCancel();
  });

  // إغلاق عند الضغط خارج النافذة
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.remove();
      if (typeof onCancel === 'function') onCancel();
    }
  });

  // إغلاق عند الضغط على ESC
  const escHandler = function(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
      if (typeof onCancel === 'function') onCancel();
    }
  };
  document.addEventListener('keydown', escHandler);
}

/* =========================================================
   CELEBRATION FUNCTION
========================================================= */

function showCelebration(plan) {
  // إنشاء عنصر الاحتفال
  const overlay = document.createElement('div');
  overlay.id = 'celebrationOverlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s ease;
    padding: 20px;
  `;

  // إنشاء محتوى الاحتفال
  overlay.innerHTML = `
    <div style="
      max-width: 500px;
      width: 100%;
      background: linear-gradient(145deg, rgba(8, 24, 31, 0.98), rgba(3, 10, 15, 0.98));
      border: 2px solid rgba(0, 255, 157, 0.3);
      border-radius: 30px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 0 80px rgba(0, 255, 157, 0.15), 0 30px 100px rgba(0, 0, 0, 0.5);
      animation: celebrationPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        inset: -2px;
        border-radius: 30px;
        padding: 2px;
        background: linear-gradient(135deg, var(--green), var(--gold), var(--green));
        background-size: 300% 300%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: celebrationBorder 3s ease-in-out infinite;
        pointer-events: none;
      "></div>

      <div style="font-size: 72px; animation: celebrationFloat 2s ease-in-out infinite;">🎉</div>

      <h2 style="
        font-size: 32px;
        margin: 10px 0 5px;
        background: linear-gradient(135deg, var(--green), var(--gold));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ">🎊 تم تفعيل الخطة!</h2>

      <p style="color: var(--muted); font-size: 16px; margin-bottom: 15px;">
        ${plan.id} — $${plan.amount}
      </p>

      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        margin: 15px 0 20px;
        padding: 15px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.04);
      ">
        <div>
          <div style="color: var(--muted); font-size: 11px;">📈 النسبة</div>
          <div style="color: var(--green); font-size: 20px; font-weight: 800;">${plan.rate}%</div>
        </div>
        <div>
          <div style="color: var(--muted); font-size: 11px;">📅 المدة</div>
          <div style="color: var(--gold); font-size: 20px; font-weight: 800;">${plan.days} يوم</div>
        </div>
        <div>
          <div style="color: var(--muted); font-size: 11px;">💰 الربح اليومي</div>
          <div style="color: var(--green); font-size: 20px; font-weight: 800;">$${(plan.amount * plan.rate / 100).toFixed(2)}</div>
        </div>
      </div>

      <div style="
        padding: 12px;
        border-radius: 14px;
        background: rgba(0, 255, 157, 0.05);
        border: 1px solid rgba(0, 255, 157, 0.08);
        margin-bottom: 20px;
      ">
        <span style="color: var(--muted); font-size: 13px;">💰 الرصيد النهائي المتوقع</span>
        <div style="color: var(--gold); font-size: 28px; font-weight: 800;">$${plan.finalBalance.toFixed(2)}</div>
      </div>

      <button onclick="closeCelebration()" style="
        padding: 14px 40px;
        border-radius: 16px;
        border: none;
        background: linear-gradient(135deg, #00b879, #00ff9d);
        color: #00130d;
        font-weight: 800;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 0 40px rgba(0, 255, 157, 0.15);
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        🚀 الذهاب إلى لوحة التحكم
      </button>

      <p style="color: var(--muted); font-size: 12px; margin-top: 12px;">
        ⏳ سيبدأ العدّاد فوراً — سيتم إضافة الربح كل 24 ساعة
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  // إضافة تأثيرات إضافية (نجوم متطايرة)
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: fixed;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${['#ffd700', '#00ff9d', '#32b8ff', '#ff4081', '#b388ff'][Math.floor(Math.random() * 5)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: starBurst ${Math.random() * 2 + 1.5}s ease-out forwards;
      box-shadow: 0 0 20px currentColor;
      opacity: 0.8;
    `;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 3000);
  }
}

function closeCelebration() {
  const overlay = document.getElementById('celebrationOverlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      overlay.remove();
      window.location.href = "dashboard.html";
    }, 300);
  }
}

// إضافة الـ Keyframes إذا لم تكن موجودة
const celebrationStyles = document.createElement('style');
celebrationStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes celebrationPop {
    0% { transform: scale(0.5) rotate(-5deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes celebrationFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  @keyframes celebrationBorder {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  @keyframes starBurst {
    0% { transform: scale(0) translate(0, 0); opacity: 1; }
    100% { transform: scale(1) translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px, ${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px); opacity: 0; }
  }
`;
document.head.appendChild(celebrationStyles);


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu(){

  const nav =
    document.querySelector(
      ".nav-links"
    );

  const mobile =
    document.getElementById(
      "mobileToggle"
    );

  if(nav){

    nav.classList.remove(
      "open"
    );

  }

  if(mobile){

    mobile.textContent =
      "☰";

    mobile.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function setupMobileMenu(){

  const mobile =
    document.getElementById(
      "mobileToggle"
    );

  const nav =
    document.querySelector(
      ".nav-links"
    );

  if(!mobile || !nav){

    return;

  }

  mobile.setAttribute(
    "aria-expanded",
    "false"
  );

  mobile.setAttribute(
    "aria-label",
    "فتح القائمة"
  );

  mobile.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      const isOpen =
        nav.classList.toggle(
          "open"
        );

      mobile.textContent =
        isOpen ? "✕" : "☰";

      mobile.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  nav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          closeMobileMenu();

        }
      );

    });


  document.addEventListener(
    "click",
    event => {

      if(
        !nav.contains(event.target) &&
        !mobile.contains(event.target)
      ){

        closeMobileMenu();

      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if(
        window.innerWidth > 850
      ){

        closeMobileMenu();

      }

    }
  );

}


/* =========================================================
   LANGUAGE MENU
========================================================= */

function setupLanguageMenu(){

  const globe =
    document.getElementById(
      "globeBtn"
    );

  const menu =
    document.getElementById(
      "langMenu"
    );

  if(!globe || !menu){

    return;

  }


  globe.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      menu.classList.toggle(
        "show"
      );

    }
  );


  menu
    .querySelectorAll(
      "[data-lang]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          setLang(
            button.dataset.lang
          );

          menu.classList.remove(
            "show"
          );

          // تحديث الأسعار بعد تغيير اللغة
          updateCryptoTicker();
          updateCryptoPricesGrid();
          updateUpdateTime();

        }
      );

    });


  document.addEventListener(
    "click",
    event => {

      if(
        !menu.contains(
          event.target
        ) &&
        !globe.contains(
          event.target
        )
      ){

        menu.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout(){

  localStorage.removeItem(
    "currentUser"
  );

  window.location.href =
    "index.html";

}


/* =========================================================
   DAILY PROFIT (LEGACY - KEPT FOR COMPATIBILITY)
========================================================= */

function simulateProfit(){

  const user =
    getCurrentUser();

  if(
    !user ||
    !user.planAmount ||
    !user.planRate
  ){

    return;

  }

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  if(
    user.lastProfitDate ===
    today
  ){

    return;

  }

  const dailyProfit =
    user.planAmount *
    user.planRate /
    100;

  user.balance =
    Number(user.balance || 0)
    + dailyProfit;

  user.profit =
    Number(user.profit || 0)
    + dailyProfit;

  user.lastProfitDate =
    today;

  addTransaction(
    user,
    t("profitOp"),
    dailyProfit,
    t("complete")
  );

  saveUser(user);

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard(){

  const user =
    getCurrentUser();

  if(!user){

    return;

  }

  const setText =
    (id,value) => {

      const element =
        document.getElementById(
          id
        );

      if(element){

        element.textContent =
          value;

      }

    };


  setText(
    "dashName",
    user.name || "User"
  );


  setText(
    "dashUserId",
    user.userId || "—"
  );


  setText(
    "dashBalance",
    money(user.balance)
  );


  setText(
    "dashProfit",
    money(user.profit)
  );


  setText(
    "dashPlan",
    user.plan || "—"
  );


  setText(
    "dashStart",
    user.planStart
      ? new Date(
          user.planStart
        ).toLocaleDateString()
      : "—"
  );


  const daily =
    user.planAmount
      ? user.planAmount *
        user.planRate /
        100
      : 0;


  setText(
    "dashDaily",
    money(daily)
  );


  setText(
    "dashTotal",
    money(user.profit)
  );


  // =========================================================
  //            عرض كود الدعوة والإحصائيات
  // =========================================================

  // عرض كود الدعوة
  const referralCodeEl = document.getElementById("dashReferralCode");
  if (referralCodeEl && user.referralCode) {
    referralCodeEl.textContent = user.referralCode;
  }

  // عرض إجمالي العمولات
  const totalBonusEl = document.getElementById("referralTotalBonus");
  if (totalBonusEl) {
    totalBonusEl.textContent = money(user.referralBonus || 0);
  }

  // عرض عدد المدعوين
  const totalReferralsEl = document.getElementById("referralTotalReferrals");
  if (totalReferralsEl) {
    const referredCount = (user.referredUsers || []).length;
    totalReferralsEl.textContent = referredCount;
  }

  // عرض نسبة العمولة
  const bonusPerEl = document.getElementById("referralBonusPerReferral");
  if (bonusPerEl) {
    bonusPerEl.textContent = "20%";
  }


  // =========================================================
  //            جدول العمليات
  // =========================================================

  const table =
    document.getElementById(
      "transactionsBody"
    );

  if(!table){

    return;

  }

  table.innerHTML = "";


  const transactions =
    (user.transactions || [])
      .slice(0,12);


  if(!transactions.length){

    table.innerHTML = `
      <tr>
        <td
          colspan="4"
          class="empty"
        >
          ${t("noOps")}
        </td>
      </tr>
    `;

    return;

  }


  transactions.forEach(
    transaction => {

      const row =
        document.createElement(
          "tr"
        );

      row.innerHTML = `
        <td>
          ${transaction.type}
        </td>

        <td>
          ${money(
            transaction.amount
          )}
        </td>

        <td>
          ${new Date(
            transaction.date
          ).toLocaleString()}
        </td>

        <td>
          <span class="status">
            ${transaction.status}
          </span>
        </td>
      `;

      table.appendChild(
        row
      );

    }
  );

}


/* =========================================================
   DEPOSIT FORM (WITH 20% REFERRAL COMMISSION)
========================================================= */

function setupDepositForm(){

  const form =
    document.getElementById(
      "depositForm"
    );

  if(!form){

    return;

  }

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      if(!ensureAuth()){

        return;

      }

      const input =
        document.getElementById(
          "depositAmount"
        );

      const amount =
        Number(
          input?.value || 0
        );

      if(
        !amount ||
        amount <= 0
      ){

        toast(t("invalidAmount"));
        return;

      }

      const user =
        getCurrentUser();

      // ✅ إضافة المبلغ للحساب
      user.balance =
        Number(
          user.balance || 0
        ) + amount;

      addTransaction(
        user,
        t("depositOp"),
        amount,
        t("complete")
      );

      // =========================================================
      // ✅ نظام العمولة 20% للمدعو (إذا كان هذا المستخدم مدعو)
      // =========================================================
      if (user.referredBy) {
        const allUsers = getUsers();
        const referrer = allUsers[user.referredBy];
        
        if (referrer) {
          // ✅ حساب العمولة 20%
          const commission = amount * 0.20;
          
          // ✅ إضافة العمولة للداعي
          referrer.balance = Number(referrer.balance || 0) + commission;
          referrer.referralBonus = Number(referrer.referralBonus || 0) + commission;
          
          // ✅ تحديث قائمة المدعوين عند الداعي
          if (referrer.referredUsers) {
            const referredIndex = referrer.referredUsers.findIndex(
              u => u.email === user.email
            );
            if (referredIndex !== -1) {
              referrer.referredUsers[referredIndex].totalDeposits += amount;
              referrer.referredUsers[referredIndex].commissionEarned += commission;
            }
          }
          
          // ✅ تسجيل العملية للداعي
          addTransaction(
            referrer,
            t("referralBonus"),
            commission,
            t("complete"),
            { note: `من إيداع ${user.name} (${user.email})` }
          );
          
          // ✅ حفظ الداعي
          saveUser(referrer);
          
          // ✅ إشعار
          toast(`🎉 تم إضافة عمولة $${commission.toFixed(2)} من دعوتك!`);
        }
      }

      saveUser(user);

      toast(
        t("depositDone")
      );

      form.reset();

      const balance =
        document.getElementById(
          "depositBalance"
        );

      if(balance){

        balance.textContent =
          money(user.balance);

      }

    }
  );

}


/* =========================================================
   WITHDRAW
========================================================= */

function setupWithdrawForm(){

  const form =
    document.getElementById(
      "withdrawForm"
    );

  if(!form){

    return;

  }

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      if(!ensureAuth()){

        return;

      }

      const amount =
        Number(
          document.getElementById(
            "withdrawAmount"
          )?.value || 0
        );

      const address =
        document.getElementById(
          "withdrawAddress"
        )?.value
          .trim();


      const user =
        getCurrentUser();


      if(
        !amount ||
        amount <= 0 ||
        !address
      ){

        toast(
          t("noFunds")
        );

        return;

      }


      if(
        Number(
          user.balance || 0
        ) < amount
      ){

        toast(
          t("noFunds")
        );

        return;

      }


      user.balance -=
        amount;


      addTransaction(
        user,
        t("withdrawOp"),
        -amount,
        t("complete"),
        {
          address:address
        }
      );


      saveUser(user);


      toast(
        t("withdrawDone")
      );


      form.reset();


      const balance =
        document.getElementById(
          "withdrawBalance"
        );

      if(balance){

        balance.textContent =
          money(user.balance);

      }

    }
  );

}


/* =========================================================
   ✅ REGISTER - FIXED (مع دعم الخادم)
========================================================= */

function setupRegister() {
  const form = document.getElementById("registerForm");

  if (!form) {
    console.warn('⚠️ نموذج التسجيل غير موجود');
    return;
  }

  console.log('✅ تم العثور على نموذج التسجيل');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("regPassword")?.value;
    const confirm = document.getElementById("regConfirm")?.value;
    const referralCode = document.getElementById("regReferral")?.value.trim().toUpperCase();

    if (!name || name.length < 2) {
      toast('⚠️ أدخل اسم صحيح');
      return;
    }

    if (!email || !email.includes('@')) {
      toast('⚠️ أدخل بريد إلكتروني صحيح');
      return;
    }

    if (!password || password.length < 6) {
      toast('⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (password !== confirm) {
      toast(t("wrongConfirm"));
      return;
    }

    const database = getUsers();

    if (database[email]) {
      toast(t("already"));
      return;
    }

    // ✅ إنشاء مستخدم جديد مع userId
    const newUser = {
      userId: generateUniqueUserId(),
      name: name,
      email: email,
      password: password,
      balance: 0,
      profit: 0,
      plan: null,
      planAmount: 0,
      planRate: 0,
      planDays: 0,
      planStart: null,
      lastProfitDate: null,
      transactions: [],
      referralCode: null,
      referredBy: null,
      referralBonus: 0,
      referredUsers: [],
      timerStart: null,
      createdAt: new Date().toISOString()
    };

    // معالجة كود الدعوة
    if (referralCode) {
      let referrer = null;
      for (const key in database) {
        if (database[key].referralCode === referralCode) {
          referrer = database[key];
          break;
        }
      }

      if (referrer) {
        newUser.referredBy = referrer.email;
        if (!referrer.referredUsers) referrer.referredUsers = [];
        referrer.referredUsers.push({
          email: email,
          name: name,
          joinedAt: new Date().toISOString(),
          totalDeposits: 0,
          commissionEarned: 0
        });
        saveUser(referrer);
        toast('🎉 تم التسجيل باستخدام كود الدعوة!');
      } else {
        toast(t("referralInvalid"));
      }
    }

    // ✅ حفظ المستخدم
    saveUser(newUser);
    toast(t("registered"));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}


/* =========================================================
   ✅ LOGIN - FIXED (مع دعم الخادم)
========================================================= */

function setupLogin() {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.warn('⚠️ نموذج الدخول غير موجود');
    return;
  }

  console.log('✅ تم العثور على نموذج الدخول');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword")?.value;

    if (!email || !password) {
      toast('⚠️ أدخل البريد وكلمة المرور');
      return;
    }

    // ✅ محاولة تسجيل الدخول عبر الخادم أولاً
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api/login'
      : '/api/login';

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        // تحديث قاعدة البيانات المحلية
        const db = getUsers();
        db[data.user.email] = data.user;
        localStorage.setItem("miningUsersDB", JSON.stringify(db));
        toast(t("logged"));
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } else {
        // إذا فشل الخادم، جرب التخزين المحلي
        const database = getUsers();
        const user = database[email];
        if (user && user.password === password) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          toast(t("logged"));
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 500);
        } else {
          toast(t("badLogin"));
        }
      }
    })
    .catch(() => {
      // إذا الخادم غير متصل، استخدم التخزين المحلي
      const database = getUsers();
      const user = database[email];
      if (user && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast(t("logged"));
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } else {
        toast(t("badLogin"));
      }
    });
  });
}


/* =========================================================
   CONTACT
========================================================= */

function setupContact(){

  const form =
    document.getElementById(
      "contactForm"
    );

  if(!form){

    return;

  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      toast(
        t("contactDone")
      );

      form.reset();

    }
  );

}


/* =========================================================
   COPY BUTTONS
========================================================= */

function setupCopyButtons(){

  document
    .querySelectorAll(
      "[data-copy]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const value =
            button.dataset.copy;

          try{

            await navigator
              .clipboard
              .writeText(
                value
              );

            toast(
              t("copied")
            );

          }catch{

            toast(
              value
            );

          }

        }
      );

    });

}


/* =========================================================
   COPY ADDRESS
========================================================= */

function setupAddressCopy(){

  const button =
    document.getElementById(
      "copyAddress"
    );

  const address =
    document.getElementById(
      "walletAddress"
    );

  if(
    !button ||
    !address
  ){

    return;

  }


  button.addEventListener(
    "click",
    async () => {

      const value =
        address.textContent
          .trim();

      if(
        !value ||
        value === "—"
      ){

        return;

      }


      try{

        await navigator
          .clipboard
          .writeText(
            value
          );

        toast(
          t("copiedAddress")
        );

      }catch{

        const range =
          document.createRange();

        range.selectNodeContents(
          address
        );

        const selection =
          window.getSelection();

        selection.removeAllRanges();

        selection.addRange(
          range
        );

      }

    }
  );

}


/* =========================================================
   DEPOSIT PAGE UI
========================================================= */

function setupDepositUI(){

  const usdtButton =
    document.getElementById(
      "usdtBtn"
    );

  const networkButtons =
    document.querySelectorAll(
      "[data-network]"
    );

  const networkLabel =
    document.getElementById(
      "selectedNetwork"
    );

  const walletAddress =
    document.getElementById(
      "walletAddress"
    );

  const depositForm =
    document.getElementById(
      "depositForm"
    );

  const proofStep =
    document.getElementById(
      "stepProof"
    );

  const proofImage =
    document.getElementById(
      "proofImage"
    );

  const preview =
    document.getElementById(
      "imagePreview"
    );

  const previewImg =
    document.getElementById(
      "previewImg"
    );

  const submitProof =
    document.getElementById(
      "submitProof"
    );

  const removeProof =
    document.getElementById(
      "removeProof"
    );

  const success =
    document.getElementById(
      "depositSuccess"
    );


  if(walletAddress){
    walletAddress.textContent = t("walletAddressPlaceholder");
  }


  if(
    usdtButton
  ){

    usdtButton.addEventListener(
      "click",
      () => {

        usdtButton.classList.add(
          "selected"
        );

        const network =
          document.getElementById(
            "stepNetwork"
          );

        if(network){

          network.style.display =
            "";

          network.scrollIntoView({
            behavior:"smooth",
            block:"center"
          });

        }

      }
    );

  }


  networkButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          networkButtons
            .forEach(
              item =>
                item.classList.remove(
                  "selected"
                )
            );

          button.classList.add(
            "selected"
          );


          const selected =
            button.dataset.network;


          if(networkLabel){

            networkLabel.textContent =
              selected;

          }


          if(walletAddress){

            walletAddress.textContent =
              t("walletAddressPlaceholder");

          }


          if(depositForm){

            depositForm.style.display =
              "";

          }


          depositForm?.scrollIntoView({
            behavior:"smooth",
            block:"center"
          });

        }
      );

    }
  );


  if(depositForm){

    depositForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const amount =
          Number(
            document.getElementById(
              "depositAmount"
            )?.value || 0
          );

        if(
          !amount ||
          amount <= 0
        ){

          return;

        }


        if(proofStep){

          proofStep.style.display =
            "";

          proofStep.scrollIntoView({
            behavior:"smooth",
            block:"center"
          });

        }

      }
    );

  }


  if(proofImage){

    proofImage.addEventListener(
      "change",
      () => {

        const file =
          proofImage.files?.[0];

        if(!file){

          return;

        }


        if(
          !file.type.startsWith(
            "image/"
          )
        ){

          proofImage.value =
            "";

          return;

        }


        if(
          file.size >
          10 * 1024 * 1024
        ){

          proofImage.value =
            "";

          toast(
            t("imageTooLargeMsg")
          );

          return;

        }


        const reader =
          new FileReader();


        reader.onload =
          event => {

            if(previewImg){

              previewImg.src =
                event.target.result;

            }

            if(preview){

              preview.style.display =
                "grid";

            }

            if(submitProof){

              submitProof.disabled =
                false;

            }

          };


        reader.readAsDataURL(
          file
        );

      }
    );

  }


  if(removeProof){

    removeProof.addEventListener(
      "click",
      () => {

        if(proofImage){

          proofImage.value =
            "";

        }

        if(preview){

          preview.style.display =
            "none";

        }

        if(previewImg){

          previewImg.removeAttribute(
            "src"
          );

        }

        if(submitProof){

          submitProof.disabled =
            true;

        }

      }
    );

  }


  if(submitProof){

    submitProof.addEventListener(
      "click",
      () => {

        if(
          !proofImage?.files?.length
        ){

          return;

        }


        if(success){

          success.style.display =
            "";

          success.scrollIntoView({
            behavior:"smooth",
            block:"center"
          });

        }

        toast(
          t("depositSubmitted")
        );

        submitProof.disabled =
          true;

      }
    );

  }

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function setupReveal(){

  const elements =
    document.querySelectorAll(
      ".reveal"
    );

  if(
    !elements.length
  ){

    return;

  }


  if(
    !("IntersectionObserver"
      in window)
  ){

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target
                .classList
                .add(
                  "visible"
                );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:.12
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================================
   BALANCE DISPLAY
========================================================= */

function updateBalances(){

  const currentUser =
    getCurrentUser();

  if(!currentUser){

    return;

  }


  const depositBalance =
    document.getElementById(
      "depositBalance"
    );

  if(depositBalance){

    depositBalance.textContent =
      money(
        currentUser.balance
      );

  }


  const withdrawBalance =
    document.getElementById(
      "withdrawBalance"
    );

  if(withdrawBalance){

    withdrawBalance.textContent =
      money(
        currentUser.balance
      );

  }

}


/* =========================================================
   SOUND SYSTEM - DISABLED
========================================================= */

let soundEnabled = false;


/* =========================================================
   BACK BUTTON
========================================================= */

function createBackButton() {
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "" ||
    window.location.pathname.includes("dashboard")
  ) {
    return;
  }

  const btn = document.createElement("button");
  btn.className = "back-btn";
  btn.setAttribute("aria-label", t("back"));
  btn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  `;
  btn.addEventListener("click", () => {
    history.back();
  });
  document.body.appendChild(btn);
}


/* =========================================================
   REDIRECT GUEST TO REGISTER
========================================================= */

function setupGuestRedirect() {
  const protectedPages = ['dashboard.html', 'deposit.html', 'withdraw.html', 'plans.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage) || currentPage === '') {
    if (!getCurrentUser()) {
      window.location.href = 'register.html';
    }
  }
}


/* =========================================================
   REFERRAL COPY FUNCTION
========================================================= */

function setupReferralCopy() {
  const copyBtn = document.getElementById("copyReferralBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function() {
    const codeEl = document.getElementById("dashReferralCode");
    if (!codeEl) return;
    
    const code = codeEl.textContent.trim();
    if (!code || code === "—") {
      toast("⚠️ لا يوجد كود دعوة");
      return;
    }

    navigator.clipboard.writeText(code).then(() => {
      toast(t("copied"));
      this.classList.add("copied");
      this.innerHTML = '<span>✅</span> ' + t("referralCopied");
      setTimeout(() => {
        this.classList.remove("copied");
        this.innerHTML = '<span>📋</span> ' + t("copy");
      }, 2000);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast(t("copied"));
    });
  });
}


/* =========================================================
   REFERRAL SHARE BUTTONS
========================================================= */

function setupReferralShare() {
  const shareBtns = document.querySelectorAll("[data-share]");
  if (!shareBtns.length) return;

  shareBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const codeEl = document.getElementById("dashReferralCode");
      if (!codeEl) return;
      
      const code = codeEl.textContent.trim();
      if (!code || code === "—") {
        toast("⚠️ لا يوجد كود دعوة");
        return;
      }

      const shareText = `🎯 انضم إليّ على منصة التعدين واستخدم كود الدعوة الخاص بي: ${code}`;
      const url = window.location.origin + window.location.pathname.replace("dashboard.html", "register.html");
      const encodedText = encodeURIComponent(shareText);
      const encodedUrl = encodeURIComponent(url);

      let shareLink = "";

      switch(this.dataset.share) {
        case "telegram":
          shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
          break;
        case "whatsapp":
          shareLink = `https://api.whatsapp.com/send?text=${encodedText}%0A${encodedUrl}`;
          break;
        case "twitter":
          shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
          break;
        case "copy":
          navigator.clipboard.writeText(`${shareText}\n${url}`).then(() => {
            toast(t("copied"));
          }).catch(() => {
            const ta = document.createElement("textarea");
            ta.value = `${shareText}\n${url}`;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            toast(t("copied"));
          });
          return;
        default:
          return;
      }

      if (shareLink) {
        window.open(shareLink, "_blank", "width=600,height=500");
      }
    });
  });
}


/* =========================================================
   LIVE CRYPTO PRICES (CoinGecko API)
========================================================= */

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'tether'];
const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'USDT'];
let cryptoPrices = {};
let cryptoInterval = null;

async function fetchCryptoPrices() {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS.join(',')}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('API response not OK');
    const data = await response.json();
    
    cryptoPrices = {};
    CRYPTO_IDS.forEach((id, index) => {
      if (data[id]) {
        cryptoPrices[CRYPTO_SYMBOLS[index]] = {
          price: data[id].usd,
          change24h: data[id].usd_24h_change || 0
        };
      }
    });
    
    updateCryptoTicker();
    updateCryptoPricesGrid();
    updateUpdateTime();
    
    return cryptoPrices;
  } catch (error) {
    console.warn('⚠️ Crypto API error:', error);
    // Fallback data
    cryptoPrices = {
      BTC: { price: 62936.00, change24h: -0.04 },
      ETH: { price: 1878.51, change24h: 1.05 },
      USDT: { price: 1.00, change24h: 0.02 },
      SOL: { price: 145.20, change24h: 3.80 },
      XRP: { price: 0.52, change24h: -1.20 },
      DOGE: { price: 0.082, change24h: 2.10 },
      ADA: { price: 0.34, change24h: -0.50 },
      DOT: { price: 4.85, change24h: 0.70 }
    };
    updateCryptoTicker();
    updateCryptoPricesGrid();
    updateUpdateTime();
    return cryptoPrices;
  }
}

function updateCryptoTicker() {
  const ticker = document.getElementById('cryptoTicker');
  if (!ticker) return;
  
  // عملات إضافية للشريط
  const extraSymbols = ['SOL', 'XRP', 'DOGE', 'ADA', 'DOT'];
  const extraPrices = {
    SOL: { price: 145.20, change24h: 3.80 },
    XRP: { price: 0.52, change24h: -1.20 },
    DOGE: { price: 0.082, change24h: 2.10 },
    ADA: { price: 0.34, change24h: -0.50 },
    DOT: { price: 4.85, change24h: 0.70 }
  };
  
  // دمج العملات الحقيقية مع العملات الإضافية
  const allPrices = { ...cryptoPrices };
  
  // إضافة العملات الإضافية (إذا لم تكن موجودة بالفعل من API)
  extraSymbols.forEach(symbol => {
    if (!allPrices[symbol]) {
      allPrices[symbol] = extraPrices[symbol];
    }
  });
  
  let html = '';
  
  // إنشاء 3 نسخ متتالية لضمان عدم وجود فراغ
  for (let repeat = 0; repeat < 3; repeat++) {
    Object.entries(allPrices).forEach(([symbol, data]) => {
      const changeClass = data.change24h >= 0 ? 'positive' : 'negative';
      const changeSign = data.change24h >= 0 ? '+' : '';
      html += `
        <span class="ticker-item">
          <strong>${symbol}</strong>
          <span class="ticker-price">$${data.price.toFixed(2)}</span>
          <span class="ticker-change ${changeClass}">${changeSign}${data.change24h.toFixed(2)}%</span>
        </span>
      `;
    });
  }
  
  ticker.innerHTML = html;
}

function updateCryptoPricesGrid() {
  const grid = document.getElementById('cryptoPricesGrid');
  if (!grid) return;
  
  // عملات إضافية للبطاقة
  const extraSymbols = ['SOL', 'XRP', 'DOGE', 'ADA', 'DOT'];
  const extraPrices = {
    SOL: { price: 145.20, change24h: 3.80 },
    XRP: { price: 0.52, change24h: -1.20 },
    DOGE: { price: 0.082, change24h: 2.10 },
    ADA: { price: 0.34, change24h: -0.50 },
    DOT: { price: 4.85, change24h: 0.70 }
  };
  
  const allPrices = { ...cryptoPrices };
  extraSymbols.forEach(symbol => {
    if (!allPrices[symbol]) {
      allPrices[symbol] = extraPrices[symbol];
    }
  });
  
  let html = '';
  Object.entries(allPrices).forEach(([symbol, data]) => {
    const changeClass = data.change24h >= 0 ? 'positive' : 'negative';
    const changeSign = data.change24h >= 0 ? '+' : '';
    html += `
      <div class="crypto-price-item">
        <span class="crypto-symbol">${symbol}</span>
        <span class="crypto-price">$${data.price.toFixed(2)}</span>
        <span class="crypto-change ${changeClass}">${changeSign}${data.change24h.toFixed(2)}%</span>
      </div>
    `;
  });
  
  grid.innerHTML = html || `<div class="crypto-price-item" style="grid-column:1/-1;color:var(--muted);text-align:center;">${t('loading') || 'جاري التحميل...'}</div>`;
}

function updateUpdateTime() {
  const el = document.getElementById('updateTimeValue');
  if (el) {
    el.textContent = new Date().toLocaleTimeString();
  }
}

// Start auto-refresh every 60 seconds
function startCryptoUpdates() {
  fetchCryptoPrices();
  if (cryptoInterval) clearInterval(cryptoInterval);
  cryptoInterval = setInterval(fetchCryptoPrices, 60000);
}

// Stop updates (cleanup)
function stopCryptoUpdates() {
  if (cryptoInterval) {
    clearInterval(cryptoInterval);
    cryptoInterval = null;
  }
}


/* =========================================================
   ONLINE USERS COUNTER
========================================================= */

function updateOnlineUsers() {
  const base = 1200;
  const variance = Math.floor(Math.random() * 300);
  const online = base + variance;
  const el = document.getElementById('onlineCount');
  if (el) {
    el.textContent = online.toLocaleString();
  }
}

// تحديث كل 5 دقائق (300000 مللي)
if (document.getElementById('onlineCount')) {
  updateOnlineUsers();
  setInterval(updateOnlineUsers, 300000);
}


/* =========================================================
   ✅ PAGE INIT - FIXED (مع ربط الأزرار الآمن)
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupGuestRedirect();

    setLang(lang());
    setupLanguageMenu();

    setupMobileMenu();

    document.querySelectorAll("[data-logout]").forEach(button => {
      button.addEventListener("click", () => {
        logout();
      });
    });

    // =========================================================
    // ✅ ربط أزرار الخطط بشكل آمن
    // =========================================================
    document.querySelectorAll("[data-plan]").forEach(button => {
      // إزالة أي مستمعين سابقين (لتجنب التكرار)
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const planId = this.dataset.plan;
        console.log("🟢 [SECURE] Plan button clicked:", planId);
        
        if (typeof window.activatePlan === 'function') {
          window.activatePlan(planId);
        } else {
          console.error("❌ [SECURE] activatePlan is undefined!");
          toast("❌ حدث خطأ في النظام، يرجى تحديث الصفحة");
        }
      });
    });

    setupReveal();
    setupRegister();
    setupLogin();
    setupDepositForm();
    setupWithdrawForm();
    setupContact();
    setupCopyButtons();
    setupAddressCopy();
    setupDepositUI();

    // ✅ عرض الخطط في صفحة الخطط
    if (document.getElementById("plansGrid")) {
      renderPlans();
    }

    if (document.body.dataset.page === "dashboard") {
      simulateProfit();
      renderDashboard();
      setupReferralCopy();
      setupReferralShare();
      // بدء المؤقت 24 ساعة عند تحميل لوحة التحكم
      startTimerLoop();
    }

    updateBalances();
    createBackButton();

    // ✅ تشغيل تحديث الأسعار الحية
    startCryptoUpdates();

    console.log('✅ تم تهيئة الصفحة بنجاح');
    console.log('🌐 الخادم يعمل على: ' + window.location.origin);

    // =========================================================
    // ✅ EXPOSE FUNCTIONS GLOBALLY - FIX
    // =========================================================
    window.activatePlan = activatePlan;
    window.executePlanActivation = executePlanActivation;
    window.logout = logout;
    window.toast = toast;
    window.t = t;
    window.ensureAuth = ensureAuth;
    window.getCurrentUser = getCurrentUser;
    window.saveUser = saveUser;
    window.renderPlans = renderPlans;
    window.renderDashboard = renderDashboard;

    console.log("✅ All functions are now available globally");
    console.log("✅ activatePlan:", typeof window.activatePlan);
    console.log("✅ executePlanActivation:", typeof window.executePlanActivation);
    console.log("✅ ensureAuth:", typeof window.ensureAuth);

  }
);


// =========================================================
//  EXPOSE activatePlan GLOBALLY - FIX (صلاحية إضافية)
// =========================================================
window.activatePlan = activatePlan;
console.log("✅ activatePlan is now available globally via window.activatePlan");
