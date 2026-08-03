(() => {
  "use strict";

  const slides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];
  if (!slides.length || slides.some(slide => slide.title === "نتیجه‌ی مرکزی ریسرچ")) return;

  const researchIndex = slides.findIndex(slide => slide.title === "نیازسنجی و بازارسنجی، یک فرایند زنده");
  if (researchIndex < 0) return;

  const researchSection = slides[researchIndex];
  researchSection.eyebrow = "08 / Research";
  researchSection.title = "ریسرچ اجرایی و محتوایی Gravitas";
  researchSection.lead = "Desk Research بازار، رقبا، مخاطب، محتوا، مشارکت، فروش سازمانی و محصولات علمی؛ همراه با برنامه‌ی تحقیق میدانی برای اعتبارسنجی فرضیه‌ها.";

  const researchSlides = [
    {
      type: "case",
      eyebrow: "Executive Summary",
      title: "نتیجه‌ی مرکزی ریسرچ",
      lead: "بازار محتوای علمی انگلیسی شلوغ است. فرصت Gravitas در اتصال چند لایه‌ای است که معمولاً جدا از هم ارائه می‌شوند.",
      items: [
        { label: "Media", text: "روایت علمی جذاب برای کشف مخاطب و ساخت اعتماد" },
        { label: "Depth", text: "منابع، شواهد، عدم قطعیت و مسیر فهم عمیق‌تر" },
        { label: "Interaction", text: "ابزار، بازی، شبیه‌سازی، آزمایش و ثبت نتیجه" },
        { label: "Participation", text: "امکان نقد، تصمیم، تولید داده و مشارکت در یک فعالیت واقعی" }
      ],
      quote: "Gravitas یک کانال علمی دیگر نیست؛ رسانه و آزمایشگاه مشارکتی برای تبدیل پژوهش مرزی به داستان، ابزار، آزمایش و امکان مشارکت است."
    },
    {
      type: "grid",
      eyebrow: "Strategic Decisions / 01",
      title: "چهار تصمیم راهبردی",
      cards: [
        { title: "AI در علم، نقطه‌ی شروع", text: "موضوع اولیه ظرفیت علمی، فلسفی، اجتماعی و کاربردی دارد؛ محتوا نباید به معرفی ابزار و Prompt محدود شود." },
        { title: "ویدئو، دروازه‌ی ورود", text: "کشف و اعتماد روی YouTube و Shorts ساخته می‌شود؛ عمق، ابزار و مشارکت روی سایت ادامه پیدا می‌کند." },
        { title: "مخاطب ارزشمند اولیه", text: "پژوهشگران جوان و افراد حرفه‌ای کنجکاو، علاوه بر مخاطب عمومی، بازار اولیه‌ی جدی‌تری هستند." },
        { title: "درآمد اولیه B2B/B2I", text: "پروژه‌های علمی، آموزش سازمانی و همکاری با نهادها باید هزینه‌ی تولید و آزمایش محصول را تأمین کنند." }
      ]
    },
    {
      type: "grid",
      eyebrow: "Strategic Decisions / 02",
      title: "سه اصل اجرایی",
      cards: [
        { title: "تعامل طراحی‌شده", text: "کامیونیتی با فوروم خالی ساخته نمی‌شود؛ سؤال، چالش، آزمایش، رأی، داده و Ritual لازم دارد." },
        { title: "محصول کوچک قبل از Scale", text: "بازی و پک آزمایش ابتدا با Concept Test، Waitlist، بیعانه و نمونه‌ی محدود اعتبارسنجی می‌شوند." },
        { title: "تمرکز قبل از گسترش", text: "سه ماه اول برای اثبات حرکت مخاطب از تماشا به آزمودن و مشارکت است؛ زبان‌ها و محصولات متعدد بعداً اضافه می‌شوند." }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Science Media",
      title: "رقبای رسانه‌ای و محتوای عمیق",
      cards: [
        { title: "روایت علمی عمومی", text: "Veritasium، Kurzgesagt، Vsauce، SciShow و Huge If True در سؤال، روایت، شخصیت برند و تصویرسازی قوی‌اند." },
        { title: "علم عمیق و تخصصی", text: "Quanta، PBS Space Time، 3Blue1Brown، Numberphile و Computerphile بر اعتبار، عمق و متخصص واقعی تکیه دارند." },
        { title: "آزمایش و مهندسی", text: "Mark Rober، Smarter Every Day، NileRed، Steve Mould و Practical Engineering تجربه‌ی دیدنی و ساختن را محور می‌کنند." },
        { title: "فضای باز", text: "ادامه‌ی مسیر بعد از پایان ویدئو، ابزار عملی، داده‌ی مخاطب و مشارکت واقعی در بسیاری از نمونه‌ها محور اصلی نیست." }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Platforms & Products",
      title: "یادگیری تعاملی، علم مشارکتی و محصول",
      cards: [
        { title: "Interactive Learning", text: "Brilliant، PhET، LabXchange و Khan Academy در حل مسئله، شبیه‌سازی، مسیر یادگیری و بازخورد قوی‌اند." },
        { title: "Participatory Science", text: "Zooniverse، SciStarter، iNaturalist و Foldit مخاطب را به داده و پژوهش واقعی متصل می‌کنند." },
        { title: "Scientific Products", text: "CrunchLabs، KiwiCo، MEL Science و Thames & Kosmos محصول فیزیکی، Subscription و تجربه‌ی تکرارشونده می‌سازند." }
      ],
      footer: "فرصت Gravitas در پیوند رسانه‌ی شخصیت‌محور، عمق پژوهشی، ابزار تعاملی، مشارکت و محصولات علمی است."
    },
    {
      type: "content",
      eyebrow: "Market Gap",
      title: "جای خالی قابل‌تصاحب",
      lead: "یک بازیگر مسلط که همه‌ی این لایه‌ها را با یک هویت واحد جمع کند دیده نمی‌شود.",
      bullets: [
        "Creator-led science media برای کشف و رابطه‌ی انسانی",
        "Research-grade depth با منابع، شواهد و بیان عدم قطعیت",
        "Interactive tools برای آزمودن و تصمیم گرفتن",
        "Real participation در داده، نقد، آزمایش یا پروژه",
        "Scientific products که تجربه‌ی دیجیتال را به جهان فیزیکی وصل کنند"
      ],
      quote: "Science you can question, test, and join."
    },
    {
      type: "split",
      eyebrow: "Audience / Individuals",
      title: "دو مخاطب اولیه‌ی ارزشمند",
      cards: [
        { title: "فرد حرفه‌ای کنجکاو", text: "می‌خواهد موضوعات علمی مرزی را عمیق بفهمد، بدون گذراندن یک دوره‌ی دانشگاهی کامل. ویدئو، خبرنامه، عضویت، رویداد و محصول پریمیوم برای او مناسب‌اند." },
        { title: "پژوهشگر جوان", text: "می‌خواهد از AI، داده و ابزارهای محاسباتی سریع‌تر استفاده کند، بدون آسیب به اعتبار پژوهش. خریدار نهایی آموزش او ممکن است دانشگاه یا کارفرما باشد." }
      ]
    },
    {
      type: "grid",
      eyebrow: "Audience / Institutions",
      title: "چهار خریدار و شریک سازمانی",
      cards: [
        { title: "مدرس و آموزش‌دهنده", text: "تجربه‌ی علمی قابل‌اعتماد و آماده‌ی اجرا می‌خواهد: شبیه‌سازی، بازی، Lesson Plan، Classroom Kit و پنل مدرس." },
        { title: "دانشگاه و آزمایشگاه", text: "می‌خواهد پژوهش برای عموم، حامی، دانشجو و شریک صنعتی قابل‌فهم و قابل‌اندازه‌گیری شود." },
        { title: "شرکت‌ها", text: "به AI Literacy، Data Literacy، Scientific Thinking، محتوای تخصصی و برنامه‌ی CSR علمی نیاز دارند." },
        { title: "نهادهای حمایت‌کننده", text: "به کیفیت علمی، دسترسی، مشارکت واقعی، ارزیابی اثر، بودجه‌ی روشن و امکان تداوم توجه می‌کنند." }
      ]
    },
    {
      type: "split",
      eyebrow: "Opportunity / AI × Science",
      title: "از محتوای اشباع‌شده به سؤال‌های جدی‌تر",
      cards: [
        { title: "اشباع‌شده", text: "معرفی ابزار، فهرست Prompt، چطور با ChatGPT مقاله بنویسیم، مرور عمومی خبرهای AI و ادعاهای کلی درباره‌ی آینده." },
        { title: "فرصت ارزشمند", text: "AI در فرایند واقعی پژوهش، ارزیابی منبع، Peer Review، فرضیه‌سازی، طراحی آزمایش، توضیح‌پذیری، نابرابری علمی و پژوهش خودکار." }
      ],
      footer: "موضوع مناسب Gravitas باید هم‌زمان علمی، فلسفی، اجتماعی و قابل تبدیل به تجربه‌ی تعاملی باشد."
    },
    {
      type: "grid",
      eyebrow: "Content Strategy",
      title: "پنج ستون محتوایی",
      cards: [
        { title: "AI × Discovery", text: "فرضیه‌سازی، مرور ادبیات، مدل‌سازی، Agentها و آزمایشگاه‌های خودکار" },
        { title: "How Science Works", text: "Peer Review، خطا، شکست، تکرارپذیری و سیاست‌های پژوهش" },
        { title: "Big Ideas & Limits", text: "فهم، پیش‌بینی، محاسبه، عدم قطعیت و مرز توضیح علمی" },
        { title: "Inside Research", text: "پژوهشگر، آزمایشگاه، ابزار، داده و تجربه‌ی واقعی کار علمی" },
        { title: "Experiment & Participate", text: "بازی، شبیه‌سازی، آزمایش، چالش و پروژه‌ی جمعی" }
      ]
    },
    {
      type: "case",
      eyebrow: "Format System",
      title: "یک موضوع، سه سطح تجربه",
      items: [
        { label: "Flagship Video", text: "ویدئوی ۸ تا ۲۰ دقیقه‌ای با سؤال، روایت، شواهد، محدودیت و دعوت روشن به ادامه‌ی مسیر" },
        { label: "Native Shorts", text: "One Claim One Check، Guess the Error، Lab Note و Would You Approve It؛ با ایده و پایان مستقل" },
        { label: "Companion Dossier", text: "خلاصه، ادعا و شواهد، منابع، مفاهیم پایه، مجهولات، Interactive، کامنت و مسیر بعدی" }
      ]
    },
    {
      type: "timeline",
      eyebrow: "Pilot Editorial Plan / 90 Days",
      title: "پنج ویدئوی اصلی سه‌ماهه",
      items: [
        "آیا AI می‌تواند فرضیه‌ی علمی بسازد؟ — ادامه: ماشین فرضیه",
        "وقتی AI درست پیش‌بینی می‌کند ولی توضیح نمی‌دهد — ادامه: پیش‌بینی در برابر توضیح",
        "مرور ادبیات با AI کجا خطرناک می‌شود؟ — ادامه: Citation Check",
        "آیا Peer Review برای عصر AI آماده است؟ — ادامه: بازی داوری مقاله",
        "چه کسی از انقلاب AI در علم جا می‌ماند؟ — ادامه: نقشه‌ی نابرابری علمی"
      ],
      outcome: "خروجی مکمل سه‌ماهه: ۱۴ شورت، سه پرونده‌ی سایت، سه خبرنامه، یک بازی MVP، دو جلسه‌ی آنلاین و یک چالش جمعی."
    },
    {
      type: "flow",
      eyebrow: "Community Loop",
      title: "از کامنت تا مشارکت واقعی",
      steps: [
        "یک سؤال در ویدئو",
        "رأی یا پیش‌بینی روی سایت",
        "دیدن پاسخ دیگران",
        "نوشتن استدلال یا نقد",
        "تحلیل نتایج در محتوای بعدی",
        "دعوت به آزمایش، داده یا پروژه‌ی واقعی"
      ],
      footer: "فضای کامیونیتی بعد از شکل‌گیری Ritual و فعالیت تکرارشونده توسعه پیدا می‌کند؛ نه قبل از آن."
    },
    {
      type: "grid",
      eyebrow: "Institutional Offers",
      title: "پنج پیشنهاد قابل‌فروش به سازمان‌ها",
      cards: [
        { title: "Research Story", text: "ویدئو، صفحه‌ی پروژه، مصاحبه، نمودار، شبکه‌های اجتماعی و گزارش اثر" },
        { title: "Interactive Dossier", text: "روایت پژوهش، Timeline، شبیه‌سازی، داده‌ی تعاملی و مشارکت مخاطب" },
        { title: "Citizen Science", text: "طراحی مشارکت، جذب داوطلب، ثبت داده، کامیونیتی و گزارش نتیجه" },
        { title: "AI for Research", text: "ورکشاپ، Workflow، سیاست استفاده، ارزیابی ابزار، محرمانگی و صحت منبع" },
        { title: "Experiment Kit", text: "محصول فیزیکی، راهنمای دیجیتال، Lesson Plan، ثبت داده و رویداد همراه" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Physical Product Concepts",
      title: "سه کانسپت اولیه‌ی محصول فیزیکی",
      cards: [
        { title: "Signal Lab", text: "اندازه‌گیری نور، صدا، حرکت و محیط با سنسور یا موبایل؛ چندبارمصرف، داده‌محور و قابل اتصال به AI و Classroom." },
        { title: "Hidden Light", text: "طیف، پراش، رنگ، شدت نور و تحلیل تصویر؛ با ارتباط به نجوم، سنجش از دور و بینایی ماشین." },
        { title: "Chaos & Prediction", text: "حرکت، ثبت داده، خطا، مدل‌سازی و مقایسه‌ی پیش‌بینی انسان و AI در یک سیستم مکانیکی ساده." }
      ],
      footer: "پیشنهاد اول Signal Lab است. شروع با شیمی به‌دلیل ایمنی، مواد مصرفی و لجستیک در اولویت نیست."
    },
    {
      type: "grid",
      eyebrow: "Lean Operating Model",
      title: "تیم سه‌نفره‌ی شروع",
      cards: [
        { title: "Editorial & Research", text: "انتخاب موضوع، Evidence Map، مصاحبه، Script، کنترل علمی و مدیریت منابع" },
        { title: "Production & Design", text: "فیلم‌برداری، تدوین، Motion، Thumbnail، صدا و هویت بصری" },
        { title: "Product & Growth", text: "سایت، Interactive، کامیونیتی، داده، توزیع، فروش و ارتباط سازمانی" }
      ],
      footer: "Scientific Reviewer، Research Assistant، Motion Designer و توسعه‌دهنده‌ی Interactive می‌توانند قراردادی باشند."
    },
    {
      type: "timeline",
      eyebrow: "Production System",
      title: "فرایند تولید هر پرونده",
      items: [
        "Topic Thesis و تعریف سؤال مرکزی",
        "Evidence Map، منابع اصلی و نقاط اختلاف",
        "مصاحبه‌ی متخصص و Open Questions",
        "Script و Scientific Red Team",
        "تولید و ساخت Companion Page",
        "Shorts، توزیع، جمع‌آوری داده و Post-mortem"
      ],
      outcome: "در Scientific Red Team بررسی می‌شود که ادعا بیش‌ازحد ساده نشده، علت با همبستگی مخلوط نشده و عنوان از شواهد قوی‌تر نباشد."
    },
    {
      type: "grid",
      eyebrow: "Field Research",
      title: "۳۰ مصاحبه برای اعتبارسنجی",
      cards: [
        { title: "۸ فرد حرفه‌ای کنجکاو", text: "رفتار مصرف محتوا، مرز سختی، انگیزه‌ی ورود به سایت و تمایل به پرداخت" },
        { title: "۸ پژوهشگر جوان", text: "Workflow پژوهش، استفاده از AI، اعتماد، سیاست سازمانی و نیاز آموزشی" },
        { title: "۴ مدرس", text: "نیاز کلاس، آماده‌سازی، شبیه‌سازی، ارزیابی و محصول قابل اجرا" },
        { title: "۵ مدیر دانشگاهی", text: "بودجه، Science Communication، معیار موفقیت، خرید و Outsource" },
        { title: "۵ شرکت یا نهاد", text: "تصمیم‌گیر، مسئله‌ی واقعی، اندازه‌ی Pilot، CSR، آموزش و مدل همکاری" }
      ],
      footer: "Desk Research انجام شده؛ تقاضا، قیمت و نرخ تبدیل بعد از این مصاحبه‌ها و Pilotهای واقعی نهایی می‌شوند."
    },
    {
      type: "grid",
      eyebrow: "Validation Experiments",
      title: "چهار فرضیه‌ی اصلی برای آزمایش",
      cards: [
        { title: "Video → Site", text: "آیا مخاطب از ویدئو وارد پرونده و Interactive می‌شود؟ معیار داخلی: حداقل ۵٪ کلیک از مخاطب درگیر." },
        { title: "Research Training", text: "آیا پژوهشگران درد آموزشی مشترک دارند؟ هشت مصاحبه و Landing ورکشاپ برای تشخیص مسئله و تقاضا." },
        { title: "Institutional Pilot", text: "آیا دانشگاه یا نهاد برای بسته‌ی ارتباط علمی پول می‌دهد؟ ده تماس، سه پیشنهاد و حداقل یک Paid Pilot." },
        { title: "Physical Product", text: "آیا محصول بزرگسال بازار دارد؟ Concept Test، Waitlist و بیعانه قبل از Prototype و تولید." }
      ]
    },
    {
      type: "grid",
      eyebrow: "Decision Document / v0.1",
      title: "شروع، محدود و متوقف",
      cards: [
        { title: "شروع می‌کنیم", text: "AI × Research، پنج ویدئوی آزمایشی، چهار سری Shorts، پرونده‌ی سایت، یک بازی MVP، دو Offer سازمانی و Signal Lab Concept." },
        { title: "فعلاً محدود می‌کنیم", text: "تعداد برنامه‌های یوتیوب، توسعه‌ی پورتال، دوره‌ی بزرگ، فروشگاه پرمحصول، چندزبانه‌سازی هم‌زمان و بازی پرهزینه." },
        { title: "فعلاً انجام نمی‌دهیم", text: "اپ مستقل، Membership پیچیده، خبر روزانه، فوروم بدون Ritual، تولید انبوه پک و رقابت مستقیم با انیمیشن‌های پرهزینه." }
      ]
    },
    {
      type: "content",
      eyebrow: "Central Test",
      title: "سؤال اصلی سه ماه اول",
      paragraphs: [
        "تمام فعالیت‌های اولیه باید یک چیز را روشن کنند: آیا مخاطب حاضر است از دیدن یک داستان علمی به انجام یک کنش علمی حرکت کند؟",
        "کنش می‌تواند آزمودن یک فرضیه، بررسی یک منبع، ثبت داده، نقد یک استدلال، حضور در گفت‌وگو یا مشارکت در یک پروژه باشد."
      ],
      quote: "تمایز Gravitas در حرکت از تماشا به آزمودن، نقد کردن و مشارکت است.",
      chips: ["Watch", "Question", "Test", "Contribute", "Learn"]
    }
  ];

  slides.splice(researchIndex + 1, 0, ...researchSlides);
})();
