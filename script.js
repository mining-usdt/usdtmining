/* =========================================================
   MININGUSDT - MAIN SCRIPT (FULLY FIXED)
   - All texts translated for ar/en/tr
   - Referral System with 20% commission
   - Plans: VIP 1-5
   - Plan activation fully working
   - Timer with auto-profit
   - Live Crypto Prices
   - ✅ ALL ISSUES FIXED
========================================================= */

// =========================================================
//   I18N TRANSLATIONS
// =========================================================

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
    games: "🎰 ألعاب الحظ",
    heroEyebrow: "MININGUSDT • منصة رقمية",
    heroTitle: "منصة التعدين الرقمية",
    heroSub: "نظام التعدين وإدارة الأرباح في بيئة آمنة.",
    start: "ابدأ الآن",
    viewPlans: "عرض خطط التعدين",
    plansTitle: "خطط التعدين",
    plansSub: "خطط لأغراض الاستثمار.",
    activate: "تفعيل الخطة",
    vipPlans: "خطط التعدين",
    depositValueLabel: "الإيداع",
    rateLabel: "العائد",
    daily: "يوميًا",
    days: "المدة",
    planBadge: "🔥 الأكثر ربحية",
    currentPlan: "الخطة الحالية",
    dailyProfit: "الأرباح اليومية",
    totalProfit: "إجمالي الأرباح",
    startDate: "تاريخ بدء الخطة",
    noPlan: "لا توجد خطة",
    netProfit: "🎯 أرباحك الصافية",
    finalBalance: "💰 الرصيد النهائي",
    nextProfit: "⏳ وقت الربح القادم",
    timerHint: "🔄 سيتم إضافة الربح تلقائيًا عند انتهاء العدّاد",
    timerActive: "🟢 نشط",
    timerInactive: "⏸ غير نشط",
    balance: "الرصيد",
    profit: "الأرباح",
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirm: "تأكيد كلمة المرور",
    loginBtn: "دخول",
    registerBtn: "🚀 إنشاء الحساب",
    welcomeBack: "مرحباً بعودتك",
    noOps: "لا توجد عمليات حتى الآن.",
    type: "نوع العملية",
    amount: "المبلغ",
    date: "التاريخ",
    status: "الحالة",
    complete: "مكتمل",
    pending: "قيد المراجعة",
    quickActions: "إجراءات سريعة",
    depositOp: "إيداع",
    withdrawOp: "سحب",
    dashboardWelcome: "مرحبًا",
    userId: "🆔 المعرف",
    activity: "آخر العمليات",
    referralMyCode: "🎯 كود الدعوة الخاص بك",
    referralCodeLabel: "🔗 الكود:",
    referralShareHint: "💡 شارك هذا الكود مع أصدقائك — تحصل على 20% من كل إيداع يقومون به!",
    referralTotalBonusLabel: "💰 إجمالي العمولات",
    referralTotalReferralsLabel: "👥 عدد المدعوين",
    referralBonusPerReferralLabel: "🎁 نسبة العمولة",
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
    loginFirst: "يرجى تسجيل الدخول أولًا.",
    badLogin: "❌ البريد أو كلمة المرور غير صحيحة.",
    registered: "✅ تم إنشاء الحساب بنجاح.",
    wrongConfirm: "❌ كلمتا المرور غير متطابقتين.",
    already: "❌ هذا البريد مستخدم بالفعل.",
    logged: "✅ تم تسجيل الدخول.",
    depositDone: "✅ تمت إضافة العملية.",
    withdrawDone: "✅ تم تسجيل طلب السحب.",
    planDone: "✅ تم تفعيل الخطة.",
    planNotFound: "الخطة غير موجودة",
    insufficientBalance: "⚠️ لا يوجد لديك رصيد كافي",
    planActivated: "🎉 تم تفعيل الخطة بنجاح!",
    invalidAmount: "⚠️ أدخل مبلغ صحيح.",
    selectNetworkFirst: "⚠️ اختر الشبكة أولاً.",
    uploadImageFirst: "⚠️ ارفع صورة الإيداع أولاً.",
    imageTooLarge: "⚠️ حجم الصورة يجب ألا يتجاوز 10MB.",
    invalidImage: "⚠️ يرجى اختيار صورة فقط.",
    referralInvalid: "⚠️ كود الدعوة غير صحيح، تم تجاهله.",
    copiedAddress: "✅ تم نسخ العنوان.",
    profitAdded: "💰 تم إضافة ${amount} أرباح يومية!",
    livePrices: "أسعار العملات الحية",
    lastUpdate: "آخر تحديث:",
    loading: "جاري التحميل...",
    footerLinks: "روابط",
    footerAccount: "الحساب",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - منصة تعدين رقمية",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    telegram: "تيليجرام",
    contactTitle: "تواصل معنا",
    contactSub: "سنرد عليك في أقرب وقت.",
    message: "الرسالة",
    send: "إرسال",
    contactDone: "✅ تم إرسال الرسالة.",
    trustUsers: "مستخدم نشط",
    trustUsersSub: "يثقون بمنصتنا",
    trustRating: "تقييم المستخدمين",
    trustRatingSub: "من 5 نجوم",
    trustSecurity: "أمان وشفافية",
    trustSecuritySub: "بياناتك آمنة",
    trustExperience: "سنوات من الخبرة",
    trustExperienceSub: "في مجال التعدين الرقمي",
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
    gameWin: "🎉 فوز!",
    gameLose: "😞 خسرت!",
    gameDraw: "🔄 تعادل!",
    gameJackpot: "💎 جاكبوت!!!",
    enterValidBet: "أدخل رهان صحيح",
    insufficientBalanceShort: "❌ رصيد غير كافٍ",
    enterNumber1to6: "اختر رقم بين 1 و 6",
    enterNumber0to9: "اختر رقم بين 0 و 9",
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
    adminLoginError: "❌ اسم المستخدم أو كلمة المرور غير صحيحة"
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
    games: "🎰 Games",
    heroEyebrow: "MININGUSDT • Digital Platform",
    heroTitle: "Digital Mining Platform",
    heroSub: "Mining and profit management system in a secure environment.",
    start: "Start Now",
    viewPlans: "View Plans",
    plansTitle: "Mining Plans",
    plansSub: "Plans for investment.",
    activate: "Activate Plan",
    vipPlans: "Mining Plans",
    depositValueLabel: "Deposit",
    rateLabel: "Return",
    daily: "daily",
    days: "Duration",
    planBadge: "🔥 Most Profitable",
    currentPlan: "Current Plan",
    dailyProfit: "Daily Profit",
    totalProfit: "Total Profit",
    startDate: "Plan Start Date",
    noPlan: "No Plan",
    netProfit: "🎯 Your Net Profit",
    finalBalance: "💰 Final Balance",
    nextProfit: "⏳ Next Profit Time",
    timerHint: "🔄 Profit will be added automatically when timer ends",
    timerActive: "🟢 Active",
    timerInactive: "⏸ Inactive",
    balance: "Balance",
    profit: "Profit",
    loginTitle: "Login",
    registerTitle: "Create Account",
    name: "Name",
    email: "Email",
    password: "Password",
    confirm: "Confirm Password",
    loginBtn: "Login",
    registerBtn: "🚀 Create Account",
    welcomeBack: "Welcome Back",
    noOps: "No transactions yet.",
    type: "Type",
    amount: "Amount",
    date: "Date",
    status: "Status",
    complete: "Completed",
    pending: "Pending Review",
    quickActions: "Quick Actions",
    depositOp: "Deposit",
    withdrawOp: "Withdrawal",
    dashboardWelcome: "Welcome",
    userId: "🆔 ID",
    activity: "Activity",
    referralMyCode: "🎯 Your Referral Code",
    referralCodeLabel: "🔗 Code:",
    referralShareHint: "💡 Share this code with your friends — you get 20% of every deposit they make!",
    referralTotalBonusLabel: "💰 Total Commissions",
    referralTotalReferralsLabel: "👥 Total Referrals",
    referralBonusPerReferralLabel: "🎁 Commission Rate",
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
    loginFirst: "Please log in first.",
    badLogin: "❌ Incorrect email or password.",
    registered: "✅ Account created successfully.",
    wrongConfirm: "❌ Passwords do not match.",
    already: "❌ Email is already registered.",
    logged: "✅ Logged in.",
    depositDone: "✅ Transaction added.",
    withdrawDone: "✅ Withdrawal request recorded.",
    planDone: "✅ Plan activated.",
    planNotFound: "Plan not found",
    insufficientBalance: "⚠️ Insufficient balance",
    planActivated: "🎉 Plan activated successfully!",
    invalidAmount: "⚠️ Enter a valid amount.",
    selectNetworkFirst: "⚠️ Select network first.",
    uploadImageFirst: "⚠️ Upload deposit proof first.",
    imageTooLarge: "⚠️ Image size must not exceed 10MB.",
    invalidImage: "⚠️ Please select an image only.",
    referralInvalid: "⚠️ Invalid referral code, ignored.",
    copiedAddress: "✅ Address copied.",
    profitAdded: "💰 Added ${amount} daily profit!",
    livePrices: "Live Crypto Prices",
    lastUpdate: "Last update:",
    loading: "Loading...",
    footerLinks: "Links",
    footerAccount: "Account",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Digital Mining Platform",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    whatsapp: "WhatsApp",
    email: "Email",
    telegram: "Telegram",
    contactTitle: "Contact Us",
    contactSub: "We will reply as soon as possible.",
    message: "Message",
    send: "Send",
    contactDone: "✅ Message sent.",
    trustUsers: "Active Users",
    trustUsersSub: "Trust our platform",
    trustRating: "User Rating",
    trustRatingSub: "out of 5 stars",
    trustSecurity: "Security & Transparency",
    trustSecuritySub: "Your data is safe",
    trustExperience: "Years of Experience",
    trustExperienceSub: "in digital mining",
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
    gameWin: "🎉 Win!",
    gameLose: "😞 Lost!",
    gameDraw: "🔄 Draw!",
    gameJackpot: "💎 Jackpot!!!",
    enterValidBet: "Enter a valid bet",
    insufficientBalanceShort: "❌ Insufficient balance",
    enterNumber1to6: "Choose a number between 1 and 6",
    enterNumber0to9: "Choose a number between 0 and 9",
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
    adminLoginError: "❌ Incorrect username or password"
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
    games: "🎰 Oyunlar",
    heroEyebrow: "MININGUSDT • Dijital Platform",
    heroTitle: "Dijital Madencilik Platformu",
    heroSub: "Güvenli ortamda madencilik ve kâr yönetim sistemi.",
    start: "Başla",
    viewPlans: "Planları Gör",
    plansTitle: "Madencilik Planları",
    plansSub: "Yatırım için planlar.",
    activate: "Planı Etkinleştir",
    vipPlans: "Madencilik Planları",
    depositValueLabel: "Yatırma",
    rateLabel: "Getiri",
    daily: "günlük",
    days: "Süre",
    planBadge: "🔥 En Karlı",
    currentPlan: "Mevcut Plan",
    dailyProfit: "Günlük Kâr",
    totalProfit: "Toplam Kâr",
    startDate: "Plan Başlangıcı",
    noPlan: "Plan Yok",
    netProfit: "🎯 Net Kârınız",
    finalBalance: "💰 Son Bakiye",
    nextProfit: "⏳ Sonraki Kâr Zamanı",
    timerHint: "🔄 Zamanlayıcı bittiğinde kâr otomatik eklenecek",
    timerActive: "🟢 Aktif",
    timerInactive: "⏸ Pasif",
    balance: "Bakiye",
    profit: "Kâr",
    loginTitle: "Giriş",
    registerTitle: "Hesap Oluştur",
    name: "Ad",
    email: "E-posta",
    password: "Şifre",
    confirm: "Şifre Tekrar",
    loginBtn: "Giriş",
    registerBtn: "🚀 Hesap Oluştur",
    welcomeBack: "Tekrar Hoş Geldiniz",
    noOps: "Henüz işlem yok.",
    type: "İşlem",
    amount: "Tutar",
    date: "Tarih",
    status: "Durum",
    complete: "Tamamlandı",
    pending: "İnceleniyor",
    quickActions: "Hızlı İşlemler",
    depositOp: "Yatırma",
    withdrawOp: "Çekme",
    dashboardWelcome: "Hoş Geldiniz",
    userId: "🆔 ID",
    activity: "Aktivite",
    referralMyCode: "🎯 Davet Kodunuz",
    referralCodeLabel: "🔗 Kod:",
    referralShareHint: "💡 Bu kodu arkadaşlarınızla paylaşın — yaptıkları her yatırımdan %20 kazanırsınız!",
    referralTotalBonusLabel: "💰 Toplam Komisyon",
    referralTotalReferralsLabel: "👥 Toplam Davet",
    referralBonusPerReferralLabel: "🎁 Komisyon Oranı",
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
    loginFirst: "Lütfen önce giriş yapın.",
    badLogin: "❌ E-posta veya şifre yanlış.",
    registered: "✅ Hesap başarıyla oluşturuldu.",
    wrongConfirm: "❌ Şifreler eşleşmiyor.",
    already: "❌ Bu e-posta zaten kayıtlı.",
    logged: "✅ Giriş yapıldı.",
    depositDone: "✅ İşlem eklendi.",
    withdrawDone: "✅ Çekme talebi kaydedildi.",
    planDone: "✅ Plan etkinleştirildi.",
    planNotFound: "Plan bulunamadı",
    insufficientBalance: "⚠️ Yetersiz bakiye",
    planActivated: "🎉 Plan başarıyla etkinleştirildi!",
    invalidAmount: "⚠️ Geçerli bir tutar girin.",
    selectNetworkFirst: "⚠️ Önce ağı seçin.",
    uploadImageFirst: "⚠️ Önce yatırma kanıtını yükleyin.",
    imageTooLarge: "⚠️ Resim boyutu 10MB'ı aşmamalıdır.",
    invalidImage: "⚠️ Lütfen sadece resim seçin.",
    referralInvalid: "⚠️ Geçersiz referans kodu, yoksayıldı.",
    copiedAddress: "✅ Adres kopyalandı.",
    profitAdded: "💰 ${amount} günlük kâr eklendi!",
    livePrices: "Canlı Kripto Fiyatları",
    lastUpdate: "Son güncelleme:",
    loading: "Yükleniyor...",
    footerLinks: "Bağlantılar",
    footerAccount: "Hesap",
    footerSocial: "Social",
    copyright: "© 2026 miningusdt - Dijital Madencilik Platformu",
    privacy: "Gizlilik Politikası",
    terms: "Şartlar ve Koşullar",
    whatsapp: "WhatsApp",
    email: "E-posta",
    telegram: "Telegram",
    contactTitle: "İletişim",
    contactSub: "En kısa sürede cevap vereceğiz.",
    message: "Mesaj",
    send: "Gönder",
    contactDone: "✅ Mesaj gönderildi.",
    trustUsers: "Aktif Kullanıcı",
    trustUsersSub: "Platformumuza güveniyor",
    trustRating: "Kullanıcı Puanı",
    trustRatingSub: "5 yıldız üzerinden",
    trustSecurity: "Güvenlik ve Şeffaflık",
    trustSecuritySub: "Verileriniz güvende",
    trustExperience: "Yıllık Deneyim",
    trustExperienceSub: "dijital madencilikte",
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
    gameWin: "🎉 Kazandın!",
    gameLose: "😞 Kaybettin!",
    gameDraw: "🔄 Beraberlik!",
    gameJackpot: "💎 Jackpot!!!",
    enterValidBet: "Geçerli bir bahis girin",
    insufficientBalanceShort: "❌ Yetersiz bakiye",
    enterNumber1to6: "1 ile 6 arasında bir sayı seçin",
    enterNumber0to9: "0 ile 9 arasında bir sayı seçin",
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
    adminLoginError: "❌ Kullanıcı adı veya şifre yanlış"
  }
};

// =========================================================
//   PLANS
// =========================================================

const PLANS = [
  { id: "VIP 1", amount: 100, rate: 10, days: 30, netProfit: 300, finalBalance: 400 },
  { id: "VIP 2", amount: 200, rate: 11, days: 30, netProfit: 660, finalBalance: 860 },
  { id: "VIP 3", amount: 300, rate: 13, days: 30, netProfit: 1170, finalBalance: 1470 },
  { id: "VIP 4", amount: 400, rate: 14, days: 30, netProfit: 1680, finalBalance: 2080 },
  { id: "VIP 5", amount: 500, rate: 15, days: 30, netProfit: 2250, finalBalance: 2750 }
];

// =========================================================
//   HELPERS
// =========================================================

function lang() {
  const saved = localStorage.getItem("siteLang");
  return (saved === "ar" || saved === "en" || saved === "tr") ? saved : "ar";
}

function t(key) {
  return (I18N[lang()] && I18N[lang()][key]) || I18N.ar[key] || key;
}

function money(value) {
  return "$" + Number(value || 0).toFixed(2);
}

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

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("miningUsersDB")) || {};
  } catch {
    return {};
  }
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

function saveUser(user) {
  if (!user || !user.email) return;
  localStorage.setItem("currentUser", JSON.stringify(user));
  const db = getUsers();
  db[user.email] = user;
  localStorage.setItem("miningUsersDB", JSON.stringify(db));
}

function toast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function addTransaction(user, type, amount, status = "مكتمل") {
  if (!user.transactions) user.transactions = [];
  user.transactions.unshift({
    type: type,
    amount: amount,
    date: new Date().toISOString(),
    status: status
  });
}

// =========================================================
//   GET API URL
// =========================================================

function getApiUrl(endpoint) {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000/api' + endpoint;
  }
  return '/api' + endpoint;
}

// =========================================================
//   SET LANGUAGE
// =========================================================

function setLang(language) {
  if (language !== "ar" && language !== "en" && language !== "tr") {
    language = "ar";
  }
  localStorage.setItem("siteLang", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

// =========================================================
//   ✅ PLAN ACTIVATION - THE FIX
// =========================================================

function activatePlan(planId) {
  console.log("🟢 activatePlan called with:", planId);
  
  const user = getCurrentUser();
  if (!user) {
    toast("⚠️ " + t("loginFirst"));
    setTimeout(() => window.location.href = "login.html", 1500);
    return;
  }

  const plan = PLANS.find(p => p.id === planId);
  if (!plan) {
    toast(t("planNotFound"));
    return;
  }

  console.log("👤 User:", user);
  console.log("💰 User balance:", user.balance);
  console.log("💰 Plan amount:", plan.amount);

  if (Number(user.balance || 0) < plan.amount) {
    toast("⚠️ " + t("insufficientBalance") + " رصيدك: $" + Number(user.balance || 0).toFixed(2) + " — المطلوب: $" + plan.amount);
    // هز الزر
    document.querySelectorAll('[data-plan="' + planId + '"]').forEach(btn => {
      btn.style.animation = 'shake 0.5s ease';
      btn.style.borderColor = 'var(--danger)';
      setTimeout(() => {
        btn.style.animation = '';
        btn.style.borderColor = '';
      }, 600);
    });
    return;
  }

  // ✅ نافذة تأكيد
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

// =========================================================
//   EXECUTE PLAN ACTIVATION
// =========================================================

function executePlanActivation(plan, user) {
  console.log("✅ Executing plan activation for:", plan.id);
  
  // ✅ خصم المبلغ
  user.balance = Number(user.balance || 0) - plan.amount;
  
  // ✅ تحديث بيانات الخطة
  user.plan = plan.id;
  user.planAmount = plan.amount;
  user.planRate = plan.rate;
  user.planDays = plan.days;
  user.planStart = new Date().toISOString();
  user.timerStart = Date.now();
  
  // ✅ تسجيل المعاملة
  addTransaction(user, `📊 تفعيل خطة ${plan.id}`, -plan.amount, '✅ مكتمل');
  
  // ✅ حفظ محلياً
  saveUser(user);
  
  // ✅ محاولة المزامنة مع الخادم
  const apiUrl = getApiUrl('/activate-plan');
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.userId,
      planId: plan.id,
      planAmount: plan.amount,
      planRate: plan.rate,
      planDays: plan.days
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success && data.user) {
      saveUser(data.user);
    }
  })
  .catch(err => console.warn("⚠️ فشل المزامنة مع الخادم:", err));
  
  // ✅ عرض الاحتفال
  showCelebration(plan);
  
  // ✅ رسالة نجاح
  toast("🎉 " + t("planActivated") + " رصيدك: $" + Number(user.balance).toFixed(2));
  
  // ✅ التوجيه إلى لوحة التحكم
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2500);
}

// =========================================================
//   CONFIRM DIALOG
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
      <h2 style="font-size: 26px; font-weight: 800; color: var(--gold, #ffd700); margin-bottom: 10px;">${title}</h2>
      <div style="color: var(--text); font-size: 15px; line-height: 1.9; margin-bottom: 25px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.04);">${message}</div>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button id="confirmYes" style="padding: 14px 32px; border-radius: 14px; border: none; background: linear-gradient(135deg, #00b879, #00ff9d); color: #00130d; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.3s; box-shadow: 0 0 30px rgba(0, 255, 157, 0.15); flex: 1; min-width: 120px;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          ${confirmText}
        </button>
        <button id="confirmNo" style="padding: 14px 32px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.03); color: var(--muted); font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s; flex: 1; min-width: 120px;" onmouseover="this.style.borderColor='var(--danger)';this.style.color='var(--danger)'" onmouseout="this.style.borderColor='';this.style.color=''">
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
}

// =========================================================
//   CELEBRATION
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
    <div style="max-width: 500px; width: 100%; background: linear-gradient(145deg, rgba(8, 24, 31, 0.98), rgba(3, 10, 15, 0.98)); border: 2px solid rgba(0, 255, 157, 0.3); border-radius: 30px; padding: 40px 30px; text-align: center; box-shadow: 0 0 80px rgba(0, 255, 157, 0.15), 0 30px 100px rgba(0, 0, 0, 0.5); animation: celebrationPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden;">
      <div style="position: absolute; inset: -2px; border-radius: 30px; padding: 2px; background: linear-gradient(135deg, #00ff9d, #ffd700, #00ff9d); background-size: 300% 300%; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; animation: celebrationBorder 3s ease-in-out infinite; pointer-events: none;"></div>
      <div style="font-size: 72px; animation: celebrationFloat 2s ease-in-out infinite;">🎉</div>
      <h2 style="font-size: 32px; margin: 10px 0 5px; background: linear-gradient(135deg, #00ff9d, #ffd700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🎊 تم تفعيل الخطة!</h2>
      <p style="color: var(--muted); font-size: 16px; margin-bottom: 15px;">${plan.id} — $${plan.amount}</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0 20px; padding: 15px; border-radius: 16px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.04);">
        <div><div style="color: var(--muted); font-size: 11px;">📈 النسبة</div><div style="color: #00ff9d; font-size: 20px; font-weight: 800;">${plan.rate}%</div></div>
        <div><div style="color: var(--muted); font-size: 11px;">📅 المدة</div><div style="color: #ffd700; font-size: 20px; font-weight: 800;">${plan.days} يوم</div></div>
        <div><div style="color: var(--muted); font-size: 11px;">💰 الربح اليومي</div><div style="color: #00ff9d; font-size: 20px; font-weight: 800;">$${(plan.amount * plan.rate / 100).toFixed(2)}</div></div>
      </div>
      <div style="padding: 12px; border-radius: 14px; background: rgba(0, 255, 157, 0.05); border: 1px solid rgba(0, 255, 157, 0.08); margin-bottom: 20px;">
        <span style="color: var(--muted); font-size: 13px;">💰 الرصيد النهائي المتوقع</span>
        <div style="color: #ffd700; font-size: 28px; font-weight: 800;">$${plan.finalBalance.toFixed(2)}</div>
      </div>
      <button onclick="closeCelebration()" style="padding: 14px 40px; border-radius: 16px; border: none; background: linear-gradient(135deg, #00b879, #00ff9d); color: #00130d; font-weight: 800; font-size: 18px; cursor: pointer; transition: all 0.3s; box-shadow: 0 0 40px rgba(0, 255, 157, 0.15);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        🚀 الذهاب إلى لوحة التحكم
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  
  // نجوم احتفالية
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

// =========================================================
//   TIMER
// =========================================================

function updateTimerDisplay() {
  const user = getCurrentUser();
  const timerEl = document.getElementById('profitTimer');
  if (!timerEl) return;
  
  if (!user || !user.plan || !user.timerStart) {
    timerEl.textContent = '--:--:--';
    const statusEl = document.getElementById('timerStatus');
    if (statusEl) {
      statusEl.textContent = t('timerInactive');
      statusEl.className = 'timer-status inactive';
    }
    return;
  }

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
    const statusEl = document.getElementById('timerStatus');
    if (statusEl) {
      statusEl.textContent = t('timerAdding');
      statusEl.className = 'timer-status active';
    }
    return;
  }

  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
  timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const statusEl = document.getElementById('timerStatus');
  if (statusEl) {
    statusEl.textContent = t('timerActive');
    statusEl.className = 'timer-status active';
  }
}

function startTimerLoop() {
  updateTimerDisplay();
  setTimeout(startTimerLoop, 1000);
}

// =========================================================
//   RENDER PLANS
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
          ? `<button class="primary-btn plan-activate-btn" data-plan="${plan.id}" data-i18n="activate">${t("activate")}</button>`
          : `<a class="secondary-btn" href="register.html" data-i18n="register">${t("register")}</a>`
        }
      </div>
    `;
  }).join('');

  // ✅ ربط أزرار التفعيل
  document.querySelectorAll('.plan-activate-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const planId = this.dataset.plan;
      console.log("🟢 Plan activation clicked:", planId);
      if (typeof window.activatePlan === 'function') {
        window.activatePlan(planId);
      } else {
        console.error("❌ activatePlan is not defined!");
        toast("❌ حدث خطأ في النظام، يرجى تحديث الصفحة");
      }
    });
  });
}

// =========================================================
//   RENDER DASHBOARD
// =========================================================

function renderDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("dashName", user.name || "مستخدم");
  setText("dashUserId", user.userId || "—");
  setText("dashBalance", money(user.balance));
  setText("dashProfit", money(user.profit));
  setText("dashPlan", user.plan || "—");
  setText("dashStart", user.planStart ? new Date(user.planStart).toLocaleDateString() : "—");

  const daily = user.planAmount ? (user.planAmount * user.planRate / 100) : 0;
  setText("dashDaily", money(daily));
  setText("dashTotal", money(user.profit));

  // Referral
  const codeEl = document.getElementById("dashReferralCode");
  if (codeEl) codeEl.textContent = user.referralCode || "—";
  
  const bonusEl = document.getElementById("referralTotalBonus");
  if (bonusEl) bonusEl.textContent = money(user.referralBonus || 0);
  
  const referralsEl = document.getElementById("referralTotalReferrals");
  if (referralsEl) referralsEl.textContent = (user.referredUsers || []).length;

  // Transactions
  const table = document.getElementById("transactionsBody");
  if (table) {
    table.innerHTML = "";
    const transactions = (user.transactions || []).slice(0, 12);
    if (!transactions.length) {
      table.innerHTML = `<tr><td colspan="4" class="empty">${t("noOps")}</td></tr>`;
    } else {
      transactions.forEach(tx => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${tx.type}</td>
          <td>${money(tx.amount)}</td>
          <td>${new Date(tx.date).toLocaleString()}</td>
          <td><span class="status">${tx.status || t("complete")}</span></td>
        `;
        table.appendChild(row);
      });
    }
  }
}

// =========================================================
//   REGISTER
// =========================================================

function setupRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("regPassword")?.value;
    const confirm = document.getElementById("regConfirm")?.value;
    const referralCode = document.getElementById("regReferral")?.value.trim().toUpperCase();

    if (!name || name.length < 2) { toast('⚠️ أدخل اسم صحيح'); return; }
    if (!email || !email.includes('@')) { toast('⚠️ أدخل بريد إلكتروني صحيح'); return; }
    if (!password || password.length < 6) { toast('⚠️ كلمة المرور 6 أحرف على الأقل'); return; }
    if (password !== confirm) { toast(t("wrongConfirm")); return; }

    const db = getUsers();
    if (db[email]) { toast(t("already")); return; }

    // إنشاء المستخدم
    const userId = generateUniqueUserId();
    const newUser = {
      userId: userId,
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
      timerStart: null,
      lastProfitDate: null,
      transactions: [],
      referralCode: generateReferralCode(userId),
      referredBy: null,
      referralBonus: 0,
      referredUsers: [],
      createdAt: new Date().toISOString()
    };

    // معالجة كود الدعوة
    if (referralCode) {
      let referrer = null;
      for (const key in db) {
        if (db[key].referralCode === referralCode) {
          referrer = db[key];
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

    saveUser(newUser);
    toast(t("registered"));
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  });
}

// =========================================================
//   LOGIN
// =========================================================

function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword")?.value;

    if (!email || !password) { toast('⚠️ أدخل البريد وكلمة المرور'); return; }

    const db = getUsers();
    const user = db[email];
    if (user && user.password === password) {
      saveUser(user);
      toast(t("logged"));
      setTimeout(() => window.location.href = "dashboard.html", 500);
    } else {
      toast(t("badLogin"));
    }
  });
}

// =========================================================
//   LOGOUT
// =========================================================

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// =========================================================
//   SETUP MOBILE MENU
// =========================================================

function setupMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function() {
    nav.classList.toggle("open");
    this.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });

  document.addEventListener("click", function(e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("open");
      toggle.textContent = "☰";
    }
  });
}

// =========================================================
//   SETUP LANGUAGE MENU
// =========================================================

function setupLanguageMenu() {
  const globe = document.getElementById("globeBtn");
  const menu = document.getElementById("langMenu");
  if (!globe || !menu) return;

  globe.addEventListener("click", function(e) {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  menu.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", function() {
      setLang(this.dataset.lang);
      menu.classList.remove("show");
    });
  });

  document.addEventListener("click", function(e) {
    if (!menu.contains(e.target) && !globe.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
}

// =========================================================
//   SETUP REVEAL ANIMATION
// =========================================================

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  elements.forEach(el => observer.observe(el));
}

// =========================================================
//   COPY BUTTONS
// =========================================================

function setupReferralCopy() {
  const copyBtn = document.getElementById("copyReferralBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function() {
    const codeEl = document.getElementById("dashReferralCode");
    if (!codeEl) return;
    const code = codeEl.textContent.trim();
    if (!code || code === "—") { toast("⚠️ لا يوجد كود دعوة"); return; }

    navigator.clipboard.writeText(code).then(() => {
      toast(t("copied"));
      this.innerHTML = '<span>✅</span> ' + t("copy");
      setTimeout(() => {
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

function setupReferralShare() {
  document.querySelectorAll("[data-share]").forEach(btn => {
    btn.addEventListener("click", function() {
      const codeEl = document.getElementById("dashReferralCode");
      if (!codeEl) return;
      const code = codeEl.textContent.trim();
      if (!code || code === "—") { toast("⚠️ لا يوجد كود دعوة"); return; }

      const shareText = `🎯 انضم إليّ على منصة التعدين واستخدم كود الدعوة الخاص بي: ${code}`;
      const url = window.location.origin + "/register.html";
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
          navigator.clipboard.writeText(`${shareText}\n${url}`).then(() => toast(t("copied")));
          return;
        default:
          return;
      }
      if (shareLink) window.open(shareLink, "_blank");
    });
  });
}

// =========================================================
//   SETUP DEPOSIT
// =========================================================

function setupDepositForm() {
  const form = document.getElementById("depositForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { toast(t("loginFirst")); return; }

    const input = document.getElementById("depositAmount");
    const amount = Number(input?.value || 0);
    if (!amount || amount <= 0) { toast(t("invalidAmount")); return; }

    user.balance = Number(user.balance || 0) + amount;
    addTransaction(user, t("depositOp"), amount, t("complete"));
    saveUser(user);
    toast(t("depositDone"));
    form.reset();
    const balanceEl = document.getElementById("depositBalance");
    if (balanceEl) balanceEl.textContent = money(user.balance);
  });
}

// =========================================================
//   SETUP WITHDRAW
// =========================================================

function setupWithdrawForm() {
  const form = document.getElementById("withdrawForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { toast(t("loginFirst")); return; }

    const amount = Number(document.getElementById("withdrawAmount")?.value || 0);
    const address = document.getElementById("withdrawAddress")?.value.trim();

    if (!amount || amount <= 0 || !address) { toast(t("invalidAmount")); return; }
    if (Number(user.balance || 0) < amount) { toast(t("insufficientBalance")); return; }

    user.balance = Number(user.balance || 0) - amount;
    addTransaction(user, t("withdrawOp"), -amount, t("complete"));
    saveUser(user);
    toast(t("withdrawDone"));
    form.reset();
    const balanceEl = document.getElementById("withdrawBalance");
    if (balanceEl) balanceEl.textContent = money(user.balance);
  });
}

// =========================================================
//   SETUP CONTACT
// =========================================================

function setupContact() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    toast(t("contactDone"));
    form.reset();
  });
}

// =========================================================
//   STYLES FOR ANIMATIONS
// =========================================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
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
document.head.appendChild(styleSheet);

// =========================================================
//   INIT
// =========================================================

document.addEventListener("DOMContentLoaded", function() {
  console.log("🚀 MININGUSDT - Loading...");
  
  // ✅ تعيين اللغة
  setLang(lang());
  
  // ✅ إعداد القوائم
  setupLanguageMenu();
  setupMobileMenu();
  
  // ✅ إعداد النماذج
  setupRegister();
  setupLogin();
  setupDepositForm();
  setupWithdrawForm();
  setupContact();
  
  // ✅ إعداد الخطط
  if (document.getElementById("plansGrid")) {
    renderPlans();
  }
  
  // ✅ إعداد لوحة التحكم
  if (document.body.dataset.page === "dashboard") {
    renderDashboard();
    setupReferralCopy();
    setupReferralShare();
    startTimerLoop();
  }
  
  // ✅ تفعيل الرسوم المتحركة
  setupReveal();
  
  // ✅ أزرار تسجيل الخروج
  document.querySelectorAll("[data-logout]").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      logout();
    });
  });
  
  // ✅ ربط أزرار الخطط - تأكد من وجودها
  document.querySelectorAll('.plan-activate-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const planId = this.dataset.plan;
      console.log("🟢 Plan activation clicked:", planId);
      activatePlan(planId);
    });
  });
  
  // ✅ جعل الوظائف عامة
  window.activatePlan = activatePlan;
  window.executePlanActivation = executePlanActivation;
  window.logout = logout;
  window.toast = toast;
  window.t = t;
  window.getCurrentUser = getCurrentUser;
  window.saveUser = saveUser;
  window.renderPlans = renderPlans;
  window.renderDashboard = renderDashboard;
  window.closeCelebration = closeCelebration;
  window.showCelebration = showCelebration;
  
  console.log("✅ MININGUSDT - Loaded successfully!");
  console.log("✅ activatePlan is available globally:", typeof window.activatePlan);
});
