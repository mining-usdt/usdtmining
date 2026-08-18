/* =========================================================
   MININGUSDT - MAIN SCRIPT (FULLY TRANSLATED)
   - All texts translated for ar/en/tr
   - Referral System with 20% commission
   - Plans: VIP 1 = $100, VIP 2 = $200, VIP 3 = $300, VIP 4 = $400, VIP 5 = $500
   - Sound disabled
   - Live Crypto Prices from CoinGecko
   - 24-hour Timer with auto-profit addition
   - Celebration on plan activation
========================================================= */

// =========================================================
//  FIX: DEFINE EVERYTHING EARLY
// =========================================================

console.log('🟢 TΔWØRM-V99 🜁 booting...');

// تعريف PLANS في النطاق العام
const PLANS = [
  { id: "VIP 1", amount: 100, rate: 10, days: 30, netProfit: 300, finalBalance: 400, featured: true },
  { id: "VIP 2", amount: 200, rate: 11, days: 30, netProfit: 660, finalBalance: 860 },
  { id: "VIP 3", amount: 300, rate: 13, days: 30, netProfit: 1170, finalBalance: 1470 },
  { id: "VIP 4", amount: 400, rate: 14, days: 30, netProfit: 1680, finalBalance: 2080 },
  { id: "VIP 5", amount: 500, rate: 15, days: 30, netProfit: 2250, finalBalance: 2750 }
];
window.PLANS = PLANS;

// تعريف toast مبكراً
function toast(message) {
  let element = document.getElementById("toast");
  if (!element) {
    element = document.createElement("div");
    element.id = "toast";
    element.className = "toast";
    document.body.appendChild(element);
  }
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
}
window.toast = toast;

// تعريف t() مبكراً
const I18N = {
  ar: {
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
    heroEyebrow: "MININGUSDT • منصة رقمية",
    heroTitle: "منصة التعدين الرقمية",
    heroSub: "نظام التعدين وإدارة الأرباح في بيئة آمنة.",
    start: "ابدأ الآن",
    viewPlans: "عرض خطط التعدين",
    liveDemo: "LIVE",
    liveStats: "المتصلون الآن",
    onlineUsers: "متصلاً الآن",
    live: "مباشر",
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
    withdrawTitle: "سحب",
    withdrawSub: "السحب يتم بشكل فوري بعد التأكيد.",
    available: "الرصيد المتاح",
    address: "عنوان المحفظة",
    requestWithdraw: "طلب سحب",
    demoWithdraw: "سحب",
    contactTitle: "تواصل معنا",
    contactSub: "سنرد عليك في أقرب وقت.",
    message: "الرسالة",
    send: "إرسال",
    contactSuccess: "تم إرسال الرسالة بنجاح",
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
    gameWin: "🎉 فوز!",
    gameLose: "😞 خسرت!",
    gameDraw: "🔄 تعادل!",
    gameJackpot: "💎 جاكبوت!!!",
    gameTwoMatch: "🎉 رمزان متشابهان!",
    gameCoinHeads: "وجه",
    gameCoinTails: "كتابة",
    footerLinks: "روابط",
    footerAccount: "الحساب",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - منصة تعدين رقمية",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
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
    livePrices: "أسعار العملات الحية",
    lastUpdate: "آخر تحديث:",
    price: "السعر",
    change: "التغير",
    loading: "جاري التحميل..."
  },
  en: {
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
    heroEyebrow: "MININGUSDT • Digital Platform",
    heroTitle: "Digital Mining Platform",
    heroSub: "Mining and profit management system in a secure environment.",
    start: "Start Now",
    viewPlans: "View Plans",
    liveDemo: "LIVE",
    liveStats: "Online Now",
    onlineUsers: "Online Now",
    live: "Live",
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
    withdrawTitle: "Withdrawal",
    withdrawSub: "Withdrawal is processed immediately after confirmation.",
    available: "Available Balance",
    address: "Wallet Address",
    requestWithdraw: "Request Withdrawal",
    demoWithdraw: "Withdraw",
    contactTitle: "Contact Us",
    contactSub: "We will reply as soon as possible.",
    message: "Message",
    send: "Send",
    contactSuccess: "Message sent successfully",
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
    gameWin: "🎉 Win!",
    gameLose: "😞 Lost!",
    gameDraw: "🔄 Draw!",
    gameJackpot: "💎 Jackpot!!!",
    gameTwoMatch: "🎉 Two matching symbols!",
    gameCoinHeads: "Heads",
    gameCoinTails: "Tails",
    footerLinks: "Links",
    footerAccount: "Account",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Digital Mining Platform",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    whatsapp: "WhatsApp",
    email: "Email",
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
    livePrices: "Live Crypto Prices",
    lastUpdate: "Last update:",
    price: "Price",
    change: "Change",
    loading: "Loading..."
  },
  tr: {
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
    heroEyebrow: "MININGUSDT • Dijital Platform",
    heroTitle: "Dijital Madencilik Platformu",
    heroSub: "Güvenli ortamda madencilik ve kâr yönetim sistemi.",
    start: "Başla",
    viewPlans: "Planları Gör",
    liveDemo: "CANLI",
    liveStats: "Şu Anda Çevrimiçi",
    onlineUsers: "Çevrimiçi",
    live: "Canlı",
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
    withdrawTitle: "Çekme",
    withdrawSub: "Çekme onaydan sonra hemen işleme alınır.",
    available: "Mevcut Bakiye",
    address: "Cüzdan Adresi",
    requestWithdraw: "Çekme Talebi",
    demoWithdraw: "Çekme",
    contactTitle: "İletişim",
    contactSub: "En kısa sürede cevap vereceğiz.",
    message: "Mesaj",
    send: "Gönder",
    contactSuccess: "Mesaj başarıyla gönderildi",
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
    gameWin: "🎉 Kazandın!",
    gameLose: "😞 Kaybettin!",
    gameDraw: "🔄 Beraberlik!",
    gameJackpot: "💎 Jackpot!!!",
    gameTwoMatch: "🎉 İki eşleşen sembol!",
    gameCoinHeads: "Yazı",
    gameCoinTails: "Tura",
    footerLinks: "Bağlantılar",
    footerAccount: "Hesap",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Dijital Madencilik Platformu",
    privacy: "Gizlilik Politikası",
    terms: "Şartlar ve Koşullar",
    whatsapp: "WhatsApp",
    email: "E-posta",
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
    livePrices: "Canlı Kripto Fiyatları",
    lastUpdate: "Son güncelleme:",
    price: "Fiyat",
    change: "Değişim",
    loading: "Yükleniyor..."
  }
};

function t(key) {
  const lang = localStorage.getItem("siteLang") || "ar";
  return (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
}
window.t = t;

// تعريف logout مبكراً
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
window.logout = logout;

// =========================================================
//  UNIQUE USER ID GENERATOR - FIXED
// =========================================================

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

// =========================================================
//  GET USERS - FIXED
// =========================================================

function getUsers() {
  try {
    return JSON.parse(
      localStorage.getItem("miningUsersDB")
    ) || {};
  } catch {
    return {};
  }
}

// =========================================================
//  REFERRAL CODE GENERATOR
// =========================================================

function generateReferralCode(userId) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code + userId.slice(-4);
}

// =========================================================
//  LANGUAGE
// =========================================================

function lang() {
  const saved = localStorage.getItem("siteLang");
  if (saved === "ar" || saved === "en" || saved === "tr") {
    return saved;
  }
  return "ar";
}

function setLang(language) {
  if (language !== "ar" && language !== "en" && language !== "tr") {
    language = "ar";
  }
  localStorage.setItem("siteLang", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.innerHTML = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
}

// =========================================================
//  USER STORAGE
// =========================================================

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

function saveUser(user) {
  if (!user.userId) {
    user.userId = generateUniqueUserId();
  }
  if (!user.referralCode) {
    user.referralCode = generateReferralCode(user.userId);
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  const database = getUsers();
  database[user.email] = user;
  localStorage.setItem("miningUsersDB", JSON.stringify(database));

  try {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log("✅ تم حفظ المستخدم في الخادم:", data);
    })
    .catch(err => {
      console.warn("⚠️ الخادم غير متصل، تم الحفظ محلياً فقط:", err);
    });
  } catch (e) {
    console.warn("⚠️ الخادم غير متصل، تم الحفظ محلياً فقط");
  }
}

// =========================================================
//  AUTH
// =========================================================

function ensureAuth() {
  if (!getCurrentUser()) {
    toast(t("loginFirst"));
    setTimeout(() => {
      window.location.href = "register.html";
    }, 700);
    return false;
  }
  return true;
}

// =========================================================
//  HELPERS
// =========================================================

function money(value) {
  return "$" + Number(value || 0).toFixed(2);
}
window.money = money;

function addTransaction(user, type, amount, status = "Account", extra = {}) {
  if (!user.transactions) {
    user.transactions = [];
  }
  user.transactions.unshift({
    type: type,
    amount: amount,
    date: new Date().toISOString(),
    status: status,
    ...extra
  });
}

// =========================================================
//  RENDER PLANS
// =========================================================

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
          ? `<button class="primary-btn" onclick="window.activatePlan('${plan.id}')" data-i18n="activate">${t("activate")}</button>`
          : `<a class="secondary-btn" href="register.html" data-i18n="register">${t("register")}</a>`
        }
      </div>
    `;
  }).join('');
}

// =========================================================
//  TIMER SYSTEM - FIXED
// =========================================================

function updateTimerDisplay() {
  const user = getCurrentUser();
  const timerEl = document.getElementById('profitTimer');
  
  if (!timerEl) return;
  
  if (!user || !user.plan || !user.timerStart) {
    timerEl.textContent = '--:--:--';
    return;
  }

  const now = Date.now();
  const elapsed = now - user.timerStart;
  let remaining = (24 * 60 * 60 * 1000) - elapsed;
  
  if (remaining <= 0) {
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

function startTimerLoop() {
  updateTimerDisplay();
  setTimeout(startTimerLoop, 1000);
}

// =========================================================
//  PLAN ACTIVATION WITH CONFIRMATION + FIXED TIMER
// =========================================================

function activatePlan(planId) {
  console.log("🟢 activatePlan called with:", planId);
  
  if (!ensureAuth()) {
    console.log("❌ Auth failed");
    return;
  }

  const plan = PLANS.find(item => item.id === planId);
  if (!plan) {
    toast(t("planNotFound"));
    console.log("❌ Plan not found:", planId);
    return;
  }

  const user = getCurrentUser();
  console.log("👤 User:", user);
  console.log("💰 User balance:", user.balance);
  console.log("💰 Plan amount:", plan.amount);

  if (Number(user.balance || 0) < plan.amount) {
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

  showConfirmDialog(
    "🛒 تأكيد شراء الخطة",
    `هل أنت متأكد من شراء خطة <strong>${plan.id}</strong> بمبلغ <strong>$${plan.amount}</strong>؟<br><br>
    📈 العائد اليومي: <strong>${plan.rate}%</strong><br>
    📅 المدة: <strong>${plan.days} يوم</strong><br>
    💰 الربح المتوقع: <strong>$${plan.netProfit.toFixed(2)}</strong>`,
    "✅ نعم، قم بالشراء",
    "❌ لا، إلغاء",
    function() {
      executePlanActivation(plan, user);
    },
    function() {
      toast("❌ تم إلغاء شراء الخطة");
    }
  );
}
window.activatePlan = activatePlan;

function executePlanActivation(plan, user) {
  console.log("✅ Executing plan activation for:", plan.id);

  user.balance = Number(user.balance || 0) - plan.amount;
  console.log("💰 New balance after deduction:", user.balance);

  user.plan = plan.id;
  user.planAmount = plan.amount;
  user.planRate = plan.rate;
  user.planDays = plan.days;
  user.planStart = new Date().toISOString();
  user.timerStart = Date.now();

  addTransaction(user, `🚀 تفعيل خطة ${plan.id}`, -plan.amount, '✅ مكتمل');

  saveUser(user);
  console.log("✅ User saved with plan:", user.plan);
  console.log("⏱️ Timer started at:", new Date(user.timerStart).toLocaleString());

  showCelebration(plan);

  toast("🎉 " + t("planActivated"));

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2500);
}

// =========================================================
//  CONFIRM DIALOG
// =========================================================

function showConfirmDialog(title, message, confirmText, cancelText, onConfirm, onCancel) {
  const existing = document.getElementById('customConfirmDialog');
  if (existing) existing.remove();

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
      <h2 style="font-size: 26px; font-weight: 800; color: #ffd700; margin-bottom: 10px;">${title}</h2>
      <div style="color: #f3fffb; font-size: 15px; line-height: 1.9; margin-bottom: 25px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.04);">${message}</div>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button id="confirmYes" style="padding: 14px 32px; border-radius: 14px; border: none; background: linear-gradient(135deg, #00b879, #00ff9d); color: #00130d; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.3s; box-shadow: 0 0 30px rgba(0, 255, 157, 0.15); flex: 1; min-width: 120px;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          ${confirmText}
        </button>
        <button id="confirmNo" style="padding: 14px 32px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.03); color: #77949a; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s; flex: 1; min-width: 120px;" onmouseover="this.style.borderColor='#ff5d6c';this.style.color='#ff5d6c'" onmouseout="this.style.borderColor='';this.style.color=''">
          ${cancelText}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#confirmYes').addEventListener('click', function() {
    overlay.remove();
    if (typeof onConfirm === 'function') onConfirm();
  });

  overlay.querySelector('#confirmNo').addEventListener('click', function() {
    overlay.remove();
    if (typeof onCancel === 'function') onCancel();
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.remove();
      if (typeof onCancel === 'function') onCancel();
    }
  });

  const escHandler = function(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
      if (typeof onCancel === 'function') onCancel();
    }
  };
  document.addEventListener('keydown', escHandler);
}

// =========================================================
//  CELEBRATION FUNCTION
// =========================================================

function showCelebration(plan) {
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
        background: linear-gradient(135deg, #00ff9d, #ffd700, #00ff9d);
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
        background: linear-gradient(135deg, #00ff9d, #ffd700);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ">🎊 تم تفعيل الخطة!</h2>

      <p style="color: #77949a; font-size: 16px; margin-bottom: 15px;">
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
          <div style="color: #77949a; font-size: 11px;">📈 النسبة</div>
          <div style="color: #00ff9d; font-size: 20px; font-weight: 800;">${plan.rate}%</div>
        </div>
        <div>
          <div style="color: #77949a; font-size: 11px;">📅 المدة</div>
          <div style="color: #ffd700; font-size: 20px; font-weight: 800;">${plan.days} يوم</div>
        </div>
        <div>
          <div style="color: #77949a; font-size: 11px;">💰 الربح اليومي</div>
          <div style="color: #00ff9d; font-size: 20px; font-weight: 800;">$${(plan.amount * plan.rate / 100).toFixed(2)}</div>
        </div>
      </div>

      <div style="
        padding: 12px;
        border-radius: 14px;
        background: rgba(0, 255, 157, 0.05);
        border: 1px solid rgba(0, 255, 157, 0.08);
        margin-bottom: 20px;
      ">
        <span style="color: #77949a; font-size: 13px;">💰 الرصيد النهائي المتوقع</span>
        <div style="color: #ffd700; font-size: 28px; font-weight: 800;">$${plan.finalBalance.toFixed(2)}</div>
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

      <p style="color: #77949a; font-size: 12px; margin-top: 12px;">
        ⏳ سيبدأ العدّاد فوراً — سيتم إضافة الربح كل 24 ساعة
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

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

// إضافة الـ Keyframes
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

// =========================================================
//  MOBILE MENU
// =========================================================

function closeMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const mobile = document.getElementById("mobileToggle");
  if (nav) {
    nav.classList.remove("open");
  }
  if (mobile) {
    mobile.textContent = "☰";
    mobile.setAttribute("aria-expanded", "false");
  }
}

function setupMobileMenu() {
  const mobile = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav-links");
  if (!mobile || !nav) {
    return;
  }
  mobile.setAttribute("aria-expanded", "false");
  mobile.setAttribute("aria-label", "فتح القائمة");

  mobile.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle("open");
    mobile.textContent = isOpen ? "✕" : "☰";
    mobile.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !mobile.contains(event.target)) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMobileMenu();
    }
  });
}

// =========================================================
//  LANGUAGE MENU
// =========================================================

function setupLanguageMenu() {
  const globe = document.getElementById("globeBtn");
  const menu = document.getElementById("langMenu");
  if (!globe || !menu) {
    return;
  }

  globe.addEventListener("click", event => {
    event.stopPropagation();
    menu.classList.toggle("show");
  });

  menu.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      setLang(button.dataset.lang);
      menu.classList.remove("show");
      updateCryptoTicker();
      updateCryptoPricesGrid();
      updateUpdateTime();
    });
  });

  document.addEventListener("click", event => {
    if (!menu.contains(event.target) && !globe.contains(event.target)) {
      menu.classList.remove("show");
    }
  });
}

// =========================================================
//  DASHBOARD
// =========================================================

function renderDashboard() {
  const user = getCurrentUser();
  if (!user) {
    return;
  }

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  setText("dashName", user.name || "User");
  setText("dashUserId", user.userId || "—");
  setText("dashBalance", money(user.balance));
  setText("dashProfit", money(user.profit));
  setText("dashPlan", user.plan || "—");
  setText("dashStart", user.planStart ? new Date(user.planStart).toLocaleDateString() : "—");

  const daily = user.planAmount ? user.planAmount * user.planRate / 100 : 0;
  setText("dashDaily", money(daily));
  setText("dashTotal", money(user.profit));

  // Referral
  const referralCodeEl = document.getElementById("dashReferralCode");
  if (referralCodeEl && user.referralCode) {
    referralCodeEl.textContent = user.referralCode;
  }

  const totalBonusEl = document.getElementById("referralTotalBonus");
  if (totalBonusEl) {
    totalBonusEl.textContent = money(user.referralBonus || 0);
  }

  const totalReferralsEl = document.getElementById("referralTotalReferrals");
  if (totalReferralsEl) {
    const referredCount = (user.referredUsers || []).length;
    totalReferralsEl.textContent = referredCount;
  }

  const bonusPerEl = document.getElementById("referralBonusPerReferral");
  if (bonusPerEl) {
    bonusPerEl.textContent = "20%";
  }

  // Transactions
  const table = document.getElementById("transactionsBody");
  if (!table) {
    return;
  }

  table.innerHTML = "";
  const transactions = (user.transactions || []).slice(0, 12);

  if (!transactions.length) {
    table.innerHTML = `
      <tr>
        <td colspan="4" class="empty">
          ${t("noOps")}
        </td>
      </tr>
    `;
    return;
  }

  transactions.forEach(transaction => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.type}</td>
      <td>${money(transaction.amount)}</td>
      <td>${new Date(transaction.date).toLocaleString()}</td>
      <td><span class="status">${transaction.status}</span></td>
    `;
    table.appendChild(row);
  });
}

// =========================================================
//  DEPOSIT FORM (WITH 20% REFERRAL COMMISSION)
// =========================================================

function setupDepositForm() {
  const form = document.getElementById("depositForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!ensureAuth()) {
      return;
    }

    const input = document.getElementById("depositAmount");
    const amount = Number(input?.value || 0);

    if (!amount || amount <= 0) {
      toast(t("invalidAmount"));
      return;
    }

    const user = getCurrentUser();
    user.balance = Number(user.balance || 0) + amount;
    addTransaction(user, t("depositOp"), amount, t("complete"));

    // Referral bonus 20%
    if (user.referredBy) {
      const allUsers = getUsers();
      const referrer = allUsers[user.referredBy];
      
      if (referrer) {
        const commission = amount * 0.20;
        referrer.balance = Number(referrer.balance || 0) + commission;
        referrer.referralBonus = Number(referrer.referralBonus || 0) + commission;
        
        if (referrer.referredUsers) {
          const referredIndex = referrer.referredUsers.findIndex(u => u.email === user.email);
          if (referredIndex !== -1) {
            referrer.referredUsers[referredIndex].totalDeposits += amount;
            referrer.referredUsers[referredIndex].commissionEarned += commission;
          }
        }
        
        addTransaction(referrer, t("referralBonus"), commission, t("complete"), { note: `من إيداع ${user.name} (${user.email})` });
        saveUser(referrer);
        toast(`🎉 تم إضافة عمولة $${commission.toFixed(2)} من دعوتك!`);
      }
    }

    saveUser(user);
    toast(t("depositDone"));
    form.reset();

    const balance = document.getElementById("depositBalance");
    if (balance) {
      balance.textContent = money(user.balance);
    }
  });
}

// =========================================================
//  WITHDRAW
// =========================================================

function setupWithdrawForm() {
  const form = document.getElementById("withdrawForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!ensureAuth()) {
      return;
    }

    const amount = Number(document.getElementById("withdrawAmount")?.value || 0);
    const address = document.getElementById("withdrawAddress")?.value.trim();
    const user = getCurrentUser();

    if (!amount || amount <= 0 || !address) {
      toast(t("noFunds"));
      return;
    }

    if (Number(user.balance || 0) < amount) {
      toast(t("noFunds"));
      return;
    }

    user.balance -= amount;
    addTransaction(user, t("withdrawOp"), -amount, t("complete"), { address: address });
    saveUser(user);
    toast(t("withdrawDone"));
    form.reset();

    const balance = document.getElementById("withdrawBalance");
    if (balance) {
      balance.textContent = money(user.balance);
    }
  });
}

// =========================================================
//  REGISTER (WITH REFERRAL) - FIXED
// =========================================================

function setupRegister() {
  const form = document.getElementById("registerForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("regPassword")?.value;
    const confirm = document.getElementById("regConfirm")?.value;
    const referralCode = document.getElementById("regReferral")?.value.trim().toUpperCase();

    if (password !== confirm) {
      toast(t("wrongConfirm"));
      return;
    }

    const database = getUsers();
    if (database[email]) {
      toast(t("already"));
      return;
    }

    const newUser = {
      userId: null,
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
      timerStart: null
    };

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
        if (!referrer.referredUsers) {
          referrer.referredUsers = [];
        }
        referrer.referredUsers.push({
          email: email,
          name: name,
          joinedAt: new Date().toISOString(),
          totalDeposits: 0,
          commissionEarned: 0
        });
        saveUser(referrer);
        toast("✅ تم التسجيل باستخدام كود الدعوة!");
      } else {
        toast(t("referralInvalid"));
      }
    }

    saveUser(newUser);
    toast(t("registered"));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  });
}

// =========================================================
//  LOGIN - FIXED
// =========================================================

function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword")?.value;

    const database = getUsers();
    const user = database[email];

    if (!user || user.password !== password) {
      toast(t("badLogin"));
      return;
    }

    if (!user.userId) {
      user.userId = generateUniqueUserId();
      database[email] = user;
      localStorage.setItem("miningUsersDB", JSON.stringify(database));
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        toast(t("logged"));
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 400);
        return;
      }
    } catch (err) {
      console.warn("⚠️ الخادم غير متصل، استخدام التخزين المحلي");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    toast(t("logged"));
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 400);
  });
}

// =========================================================
//  CONTACT
// =========================================================

function setupContact() {
  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    toast(t("contactDone"));
    form.reset();
  });
}

// =========================================================
//  COPY BUTTONS
// =========================================================

function setupCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        toast(t("copied"));
      } catch {
        toast(value);
      }
    });
  });
}

// =========================================================
//  COPY ADDRESS
// =========================================================

function setupAddressCopy() {
  const button = document.getElementById("copyAddress");
  const address = document.getElementById("walletAddress");
  if (!button || !address) {
    return;
  }

  button.addEventListener("click", async () => {
    const value = address.textContent.trim();
    if (!value || value === "—") {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast(t("copiedAddress"));
    } catch {
      const range = document.createRange();
      range.selectNodeContents(address);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}

// =========================================================
//  DEPOSIT PAGE UI
// =========================================================

function setupDepositUI() {
  const usdtButton = document.getElementById("usdtBtn");
  const networkButtons = document.querySelectorAll("[data-network]");
  const networkLabel = document.getElementById("selectedNetwork");
  const walletAddress = document.getElementById("walletAddress");
  const depositForm = document.getElementById("depositForm");
  const proofStep = document.getElementById("stepProof");
  const proofImage = document.getElementById("proofImage");
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("previewImg");
  const submitProof = document.getElementById("submitProof");
  const removeProof = document.getElementById("removeProof");
  const success = document.getElementById("depositSuccess");

  if (walletAddress) {
    walletAddress.textContent = t("walletAddressPlaceholder");
  }

  if (usdtButton) {
    usdtButton.addEventListener("click", () => {
      usdtButton.classList.add("selected");
      const network = document.getElementById("stepNetwork");
      if (network) {
        network.style.display = "";
        network.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  networkButtons.forEach(button => {
    button.addEventListener("click", () => {
      networkButtons.forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");

      const selected = button.dataset.network;
      if (networkLabel) {
        networkLabel.textContent = selected;
      }
      if (walletAddress) {
        walletAddress.textContent = t("walletAddressPlaceholder");
      }
      if (depositForm) {
        depositForm.style.display = "";
      }
      depositForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  if (depositForm) {
    depositForm.addEventListener("submit", event => {
      event.preventDefault();
      const amount = Number(document.getElementById("depositAmount")?.value || 0);
      if (!amount || amount <= 0) {
        return;
      }
      if (proofStep) {
        proofStep.style.display = "";
        proofStep.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  if (proofImage) {
    proofImage.addEventListener("change", () => {
      const file = proofImage.files?.[0];
      if (!file) {
        return;
      }
      if (!file.type.startsWith("image/")) {
        proofImage.value = "";
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        proofImage.value = "";
        toast(t("imageTooLargeMsg"));
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        if (previewImg) {
          previewImg.src = event.target.result;
        }
        if (preview) {
          preview.style.display = "grid";
        }
        if (submitProof) {
          submitProof.disabled = false;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (removeProof) {
    removeProof.addEventListener("click", () => {
      if (proofImage) {
        proofImage.value = "";
      }
      if (preview) {
        preview.style.display = "none";
      }
      if (previewImg) {
        previewImg.removeAttribute("src");
      }
      if (submitProof) {
        submitProof.disabled = true;
      }
    });
  }

  if (submitProof) {
    submitProof.addEventListener("click", () => {
      if (!proofImage?.files?.length) {
        return;
      }
      if (success) {
        success.style.display = "";
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      toast(t("depositSubmitted"));
      submitProof.disabled = true;
    });
  }
}

// =========================================================
//  REVEAL ANIMATION
// =========================================================

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

// =========================================================
//  BALANCE DISPLAY
// =========================================================

function updateBalances() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return;
  }

  const depositBalance = document.getElementById("depositBalance");
  if (depositBalance) {
    depositBalance.textContent = money(currentUser.balance);
  }

  const withdrawBalance = document.getElementById("withdrawBalance");
  if (withdrawBalance) {
    withdrawBalance.textContent = money(currentUser.balance);
  }
}

// =========================================================
//  BACK BUTTON
// =========================================================

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

// =========================================================
//  REDIRECT GUEST TO REGISTER
// =========================================================

function setupGuestRedirect() {
  const protectedPages = ['dashboard.html', 'deposit.html', 'withdraw.html', 'plans.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage) || currentPage === '') {
    if (!getCurrentUser()) {
      window.location.href = 'register.html';
    }
  }
}

// =========================================================
//  REFERRAL COPY FUNCTION
// =========================================================

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

// =========================================================
//  REFERRAL SHARE BUTTONS
// =========================================================

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

// =========================================================
//  LIVE CRYPTO PRICES (CoinGecko API)
// =========================================================

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

function startCryptoUpdates() {
  fetchCryptoPrices();
  if (cryptoInterval) clearInterval(cryptoInterval);
  cryptoInterval = setInterval(fetchCryptoPrices, 60000);
}

function stopCryptoUpdates() {
  if (cryptoInterval) {
    clearInterval(cryptoInterval);
    cryptoInterval = null;
  }
}

// =========================================================
//  ONLINE USERS COUNTER
// =========================================================

function updateOnlineUsers() {
  const base = 1200;
  const variance = Math.floor(Math.random() * 300);
  const online = base + variance;
  const el = document.getElementById('onlineCount');
  if (el) {
    el.textContent = online.toLocaleString();
  }
}

if (document.getElementById('onlineCount')) {
  updateOnlineUsers();
  setInterval(updateOnlineUsers, 300000);
}

// =========================================================
//  PAGE INIT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log('🟢 DOM fully loaded - Initializing TΔWØRM-V99 🜁');

  setupGuestRedirect();
  setLang(lang());
  setupLanguageMenu();
  setupMobileMenu();

  document.querySelectorAll("[data-logout]").forEach(button => {
    button.addEventListener("click", () => {
      logout();
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

  // ✅ ربط الأزرار يدوياً كحل احتياطي
  document.querySelectorAll('[data-plan]').forEach(btn => {
    const planId = btn.dataset.plan;
    if (planId) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🟢 Button clicked for plan:', planId);
        if (typeof window.activatePlan === 'function') {
          window.activatePlan(planId);
        } else {
          console.error('❌ activatePlan not found!');
          toast('❌ حدث خطأ في النظام، يرجى تحديث الصفحة');
        }
      });
    }
  });

  if (document.getElementById("plansGrid")) {
    renderPlans();
  }

  if (document.body.dataset.page === "dashboard") {
    renderDashboard();
    setupReferralCopy();
    setupReferralShare();
    startTimerLoop();
  }

  updateBalances();
  createBackButton();
  startCryptoUpdates();

  console.log('🟢 TΔWØRM-V99 🜁 fully initialized');
});

// =========================================================
//  EXPOSE FUNCTIONS GLOBALLY
// =========================================================
window.activatePlan = activatePlan;
window.logout = logout;
window.toast = toast;
window.t = t;
window.money = money;
window.PLANS = PLANS;
window.getCurrentUser = getCurrentUser;
window.saveUser = saveUser;
window.getUsers = getUsers;
window.generateReferralCode = generateReferralCode;
window.generateUniqueUserId = generateUniqueUserId;
window.renderPlans = renderPlans;
window.renderDashboard = renderDashboard;
window.startTimerLoop = startTimerLoop;
window.updateTimerDisplay = updateTimerDisplay;
window.showCelebration = showCelebration;
window.closeCelebration = closeCelebration;
window.showConfirmDialog = showConfirmDialog;
window.setLang = setLang;
window.lang = lang;
window.money = money;

console.log('✅ TΔWØRM-V99 🜁 loaded successfully');
console.log('📌 All functions exported globally');
