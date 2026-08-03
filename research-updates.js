(() => {
  "use strict";

  const slides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];
  if (!slides.length) return;

  const researchIndex = slides.findIndex((slide) =>
    slide.type === "section" &&
    (/^08\s*\//.test(String(slide.eyebrow || "")) ||
      slide.title === "نیازسنجی و بازارسنجی، یک فرایند زنده" ||
      slide.title === "چه چیزی را باید بفهمیم؟")
  );
  if (researchIndex < 0) return;

  const nextSectionIndex = slides.findIndex((slide, index) =>
    index > researchIndex && slide.type === "section"
  );

  const researchSection = slides[researchIndex];
  researchSection.eyebrow = "08 / Research";
  researchSection.title = "چه چیزی را باید بفهمیم؟";
  researchSection.lead = "این فصل قرار نیست دوباره مدل محتوا، درآمد یا اجرا را تعریف کند؛ باید مجهول‌هایی را روشن کند که تصمیم‌های Gravitas به پاسخ آن‌ها وابسته‌اند.";

  const researchSlides = [
    {
      type: "content",
      eyebrow: "Central Question",
      title: "سؤال اصلی سه ماه اول",
      paragraphs: [
        "آیا مخاطب حاضر است از دیدن یک داستان علمی به انجام یک کنش علمی حرکت کند؟",
        "کنش می‌تواند بررسی یک منبع، آزمودن یک فرضیه، ثبت داده، نقد یک استدلال، شرکت در گفت‌وگو یا مشارکت در یک پروژه باشد."
      ],
      quote: "تمایز Gravitas زمانی واقعی است که مخاطب فقط بیشتر نداند؛ بتواند بهتر سؤال کند، بیازماید و مشارکت کند.",
      chips: ["Watch", "Question", "Test", "Contribute"]
    },
    {
      type: "grid",
      eyebrow: "Research Map",
      title: "شش مجهول تصمیم‌ساز",
      lead: "هر فعالیت تحقیقاتی باید دست‌کم یکی از این مجهول‌ها را به یک تصمیم روشن تبدیل کند.",
      cards: [
        { title: "مخاطب", text: "دقیقاً چه کسی مسئله‌ی حل‌نشده و انگیزه‌ی بازگشت دارد؟" },
        { title: "نیاز", text: "مخاطب برای فهمیدن، انجام‌دادن یا مشارکت‌کردن کجا گیر می‌کند؟" },
        { title: "جایگاه", text: "Gravitas در بازاری شلوغ کدام ارزش را متفاوت و باورپذیر ارائه می‌کند؟" },
        { title: "محتوا و فرمت", text: "کدام موضوع، عمق، ریتم و قالب باعث توجه، اعتماد و ادامه‌ی مسیر می‌شود؟" },
        { title: "مشارکت", text: "کدام کنش کوچک واقعاً مخاطب را از تماشا به حضور فعال می‌برد؟" },
        { title: "خرید و محصول", text: "چه کسی برای کدام خروجی علمی پول، بودجه یا حمایت اختصاص می‌دهد؟" }
      ]
    },
    {
      type: "split",
      eyebrow: "Known vs Unknown",
      title: "دانسته‌های فعلی را با فرضیه اشتباه نگیریم",
      cards: [
        {
          title: "چیزی که Desk Research نشان می‌دهد",
          text: "رسانه‌ی علمی انگلیسی رقابتی است؛ نمونه‌های قوی در روایت، عمق، تعامل، Citizen Science و محصولات فیزیکی وجود دارند."
        },
        {
          title: "چیزی که هنوز باید ثابت شود",
          text: "این ترکیب برای مخاطب Gravitas ارزش متمایز می‌سازد، او را به کنش می‌رساند و برای مشتری یا حامی سازمانی قابل خرید است."
        }
      ],
      footer: "رقبا امکان‌پذیری یک مدل را نشان می‌دهند؛ تناسب آن مدل با Gravitas هنوز نیازمند شواهد رفتاری و تجاری است."
    },
    {
      type: "grid",
      eyebrow: "Landscape / Story-led Media",
      title: "رسانه‌های علمی روایت‌محور",
      lead: "نمونه‌هایی برای بررسی Hook، شخصیت برند، روایت و تبدیل سؤال علمی به تجربه‌ی دیدن.",
      cards: [
        { title: "Veritasium", text: "سؤال‌های خلاف شهود، آزمایش، مصاحبه و روایت مسئله‌محور.", url: "https://www.veritasium.com/videos" },
        { title: "Kurzgesagt", text: "روایت فشرده، طراحی بصری یکپارچه و توسعه‌ی IP فراتر از ویدئو.", url: "https://kurzgesagt.org/what-we-do" },
        { title: "Vsauce", text: "شروع از یک سؤال ساده و حرکت آزاد میان علم، فلسفه و فرهنگ.", url: "https://www.vsauce.com/" },
        { title: "SciShow", text: "انتشار منظم، تنوع موضوعی و تبدیل علم روز به فرمت قابل‌دنبال‌کردن.", url: "https://www.youtube.com/@SciShow" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Deep Science",
      title: "محتوای علمی عمیق و معتبر",
      lead: "نمونه‌هایی برای بررسی دقت، منبع‌دهی، توضیح مفاهیم دشوار و ساخت اعتماد بلندمدت.",
      cards: [
        { title: "Quanta Magazine", text: "ژورنالیسم عمیق علوم بنیادی با روایت، تصویر و اعتبار تحریریه.", url: "https://www.quantamagazine.org/" },
        { title: "PBS Space Time", text: "ورود جدی به فیزیک و کیهان‌شناسی بدون حذف کامل پیچیدگی.", url: "https://www.pbs.org/show/pbs-space-time/" },
        { title: "3Blue1Brown", text: "تصویرسازی به‌عنوان بخشی از خود استدلال ریاضی، نه تزئین محتوا.", url: "https://www.3blue1brown.com/" },
        { title: "Numberphile", text: "گفت‌وگوی ساده با متخصص و تبدیل ایده‌های ریاضی به کنجکاوی عمومی.", url: "https://www.numberphile.com/" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Experiment & Engineering",
      title: "آزمایش، ساختن و مهندسی",
      lead: "نمونه‌هایی برای فهم اینکه مشاهده، شکست، ساخت و نتیجه‌ی دیدنی چگونه یادگیری را ماندگار می‌کنند.",
      cards: [
        { title: "Mark Rober", text: "مهندسی نمایشی، مسئله‌ی روشن و پروژه‌ای که روایت را جلو می‌برد.", url: "https://www.youtube.com/@MarkRober" },
        { title: "Smarter Every Day", text: "کنجکاوی میدانی، مشاهده‌ی دقیق و یادگیری همراه با متخصص.", url: "https://www.smartereveryday.com/videos" },
        { title: "NileRed", text: "فرایند آزمایشگاهی واقعی، جزئیات روش و روایت مبتنی بر آزمون و خطا.", url: "https://www.youtube.com/@NileRed" },
        { title: "Practical Engineering", text: "توضیح سیستم‌های مهندسی روزمره با مدل، آزمایش و نمایش فیزیکی.", url: "https://practical.engineering/" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Interactive Learning",
      title: "یادگیری تعاملی",
      lead: "نمونه‌هایی برای بررسی حل مسئله، بازخورد فوری، شبیه‌سازی و مسیر یادگیری.",
      cards: [
        { title: "Brilliant", text: "یادگیری با حل مسئله، پیشروی مرحله‌ای و بازخورد سریع.", url: "https://brilliant.org/" },
        { title: "PhET", text: "شبیه‌سازی‌های علمی قابل‌دست‌کاری با تمرکز بر کشف رابطه‌ها.", url: "https://phet.colorado.edu/" },
        { title: "LabXchange", text: "ترکیب محتوای آموزشی، آزمایشگاه مجازی و مسیرهای قابل‌ترکیب.", url: "https://www.labxchange.org/" },
        { title: "Khan Academy", text: "ساختار آموزشی روشن، تمرین، سنجش و پوشش منظم مفاهیم پایه.", url: "https://www.khanacademy.org/science" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Participatory Science",
      title: "علم مشارکتی",
      lead: "نمونه‌هایی که مشارکت مخاطب را به داده، تحلیل یا یک پروژه‌ی پژوهشی واقعی وصل می‌کنند.",
      cards: [
        { title: "Zooniverse", text: "تقسیم کار پژوهشی واقعی به فعالیت‌های قابل‌انجام برای داوطلبان.", url: "https://www.zooniverse.org/projects" },
        { title: "SciStarter", text: "کشف پروژه، آموزش ورود و پیگیری مسیر مشارکت در Citizen Science.", url: "https://scistarter.org/finder" },
        { title: "iNaturalist", text: "ثبت مشاهده، شناسایی جمعی و ساخت داده‌ی علمی از فعالیت روزمره.", url: "https://www.inaturalist.org/" },
        { title: "Foldit", text: "تبدیل یک مسئله‌ی علمی به بازی و استفاده از حل مسئله‌ی جمعی.", url: "https://fold.it/" }
      ]
    },
    {
      type: "grid",
      eyebrow: "Landscape / Physical Products",
      title: "پک آزمایش و محصولات علمی",
      lead: "نمونه‌هایی برای بررسی اتصال محتوا، ساختن، اشتراک و محصول فیزیکی.",
      cards: [
        { title: "CrunchLabs", text: "Subscription، ویدئوی همراه و ساخت پروژه با هویت یک Creator علمی.", url: "https://www.crunchlabs.com/" },
        { title: "KiwiCo", text: "تنوع سنی و موضوعی، بسته‌بندی تجربه و تکرار خرید از طریق Crate.", url: "https://www.kiwico.com/" },
        { title: "MEL Science", text: "پک‌های موضوعی همراه با راهنمای دیجیتال و تجربه‌ی مرحله‌ای.", url: "https://melscience.com/" },
        { title: "Thames & Kosmos", text: "دامنه‌ی وسیع STEM Kit، دفترچه‌ی دقیق و قابلیت استفاده‌ی چندمرحله‌ای.", url: "https://thamesandkosmos.com/collections/science-kits" }
      ]
    },
    {
      type: "questions",
      eyebrow: "Unknown / Audience",
      title: "درباره‌ی مخاطب چه باید بفهمیم؟",
      questions: [
        "کدام گروه مسئله‌ای دارد که با یک محتوای خوب تمام نمی‌شود و نیازمند ابزار، مسیر یا جامعه است؟",
        "مخاطب در چه نقطه‌ای میان محتوای سطحی و منبع دانشگاهی گیر می‌کند؟",
        "چه چیزی باعث می‌شود یک فرد حرفه‌ای کنجکاو یا پژوهشگر جوان دوباره برگردد؟",
        "زبان انگلیسی چه بازارهایی را باز می‌کند و برای کدام گروه‌ها مانع ورود می‌سازد؟",
        "مخاطب Gravitas هنگام انتخاب منبع علمی به چه نشانه‌هایی اعتماد می‌کند؟",
        "توانمندسازی از نگاه خود مخاطب دقیقاً به چه تغییر قابل‌مشاهده‌ای معنا می‌شود؟"
      ]
    },
    {
      type: "questions",
      eyebrow: "Unknown / Content",
      title: "درباره‌ی محتوا و فرمت چه باید بفهمیم؟",
      questions: [
        "کدام سؤال‌های علمی تقاضای واقعی دارند، اما پاسخ موجودشان سطحی، پراکنده یا بیش از حد فنی است؟",
        "برای شروع، AI × Research یک Wedge پایدار است یا فقط موج کوتاه‌مدت توجه؟",
        "کدام ترکیب روایت، توضیح، مصاحبه و آزمایش بیشترین اعتماد را می‌سازد؟",
        "Shorts باید به کشف برند کمک کند، به ویدئوی بلند تبدیل شود یا خودش یک تجربه‌ی کامل باشد؟",
        "چه مقدار عمق برای مخاطب عمومی جذاب می‌ماند و از چه نقطه‌ای بار شناختی زیاد می‌شود؟",
        "کدام ادامه‌ی سایت بعد از ویدئو ارزش واقعی دارد: منبع، ابزار، شبیه‌سازی، بازی یا گفت‌وگو؟"
      ]
    },
    {
      type: "questions",
      eyebrow: "Unknown / Participation",
      title: "درباره‌ی حرکت از تماشا به کنش چه باید بفهمیم؟",
      questions: [
        "کوچک‌ترین کنش معناداری که مخاطب حاضر است انجام دهد چیست؟",
        "آیا رأی‌دادن و کوییز به مشارکت عمیق‌تر منتهی می‌شود یا فقط تعامل سطحی می‌سازد؟",
        "کدام فعالیت باعث یادگیری، بازگشت یا شکل‌گیری هویت جمعی می‌شود؟",
        "مخاطب حاضر است داده، استدلال یا خروجی آزمایش خود را با دیگران به اشتراک بگذارد؟",
        "چه نوع بازخوردی لازم است تا مشارکت دیده‌شده و ارزشمند احساس شود؟",
        "چه زمانی باید از کامنت و رویداد عبور کنیم و یک پروژه‌ی مشارکتی واقعی بسازیم؟"
      ]
    },
    {
      type: "questions",
      eyebrow: "Unknown / Buyers & Products",
      title: "درباره‌ی خرید، حمایت و محصول چه باید بفهمیم؟",
      questions: [
        "دانشگاه، آزمایشگاه، شرکت یا نهاد حامی دقیقاً برای کدام مسئله بودجه دارد؟",
        "خریدار یک پروژه‌ی علمی چه خروجی و چه معیار اثری را قابل‌دفاع می‌داند؟",
        "کدام Offer را می‌توان با نمونه‌ی کوچک و چرخه‌ی فروش کوتاه‌تر شروع کرد؟",
        "پک آزمایش برای خرید شخصی، کلاس، رویداد یا برنامه‌ی سازمانی ارزش بیشتری دارد؟",
        "کدام ویژگی محصول فیزیکی ضروری است: اندازه‌گیری، داده، ویدئو، اجتماع یا قابلیت استفاده‌ی دوباره؟",
        "چه شواهدی پیش از تولید باید وجود داشته باشد تا هزینه‌ی ساخت و لجستیک توجیه شود؟"
      ]
    },
    {
      type: "case",
      eyebrow: "Evidence System",
      title: "جواب‌ها را از کجا به دست می‌آوریم؟",
      items: [
        { label: "رفتار واقعی", text: "Retention، کلیک، تکمیل تجربه، بازگشت و تبدیل میان ویدئو، سایت و فعالیت." },
        { label: "تقاضای جست‌وجو", text: "سؤال‌های پرتکرار، شکاف محتوایی، زبان مخاطب و موضوعات در حال رشد." },
        { label: "گفت‌وگوی کیفی", text: "مصاحبه و مشاهده‌ی مسئله بدون سهمیه‌ی عددی از پیش‌تعیین‌شده؛ تا زمانی که الگوهای تصمیم‌ساز روشن شوند." },
        { label: "آزمایش محتوا", text: "مقایسه‌ی Hook، عمق، قالب، CTA و ادامه‌ی تعاملی با یک سؤال مشخص برای هر تست." },
        { label: "شواهد خرید", text: "درخواست جلسه، پروپوزال، پایلوت پولی، پیش‌ثبت‌نام یا بیعانه؛ نه صرفاً اعلام علاقه." },
        { label: "آزمایش محصول", text: "Concept Test، Prototype محدود و مشاهده‌ی استفاده پیش از تصمیم تولید." }
      ]
    },
    {
      type: "content",
      eyebrow: "Research Output",
      title: "خروجی تحقیق باید چه تصمیم‌هایی بدهد؟",
      bullets: [
        "مخاطب اولیه و مسئله‌ی اصلی او",
        "جایگاه روشن Gravitas در مقایسه با گزینه‌های موجود",
        "Wedge موضوعی و ترکیب فرمت‌های شروع",
        "مسیر قابل‌اندازه‌گیری از تماشا به کنش علمی",
        "اولویت خریداران و Offerهای قابل‌آزمایش",
        "تصمیم ادامه، اصلاح یا توقف برای هر فرضیه‌ی اصلی"
      ],
      quote: "فصل تحقیق زمانی کامل است که مجهول‌ها را به تصمیم تبدیل کند، نه وقتی فقط فهرست بزرگی از رقبا و ایده‌ها ساخته باشد."
    }
  ];

  const removeCount = nextSectionIndex > researchIndex
    ? nextSectionIndex - researchIndex - 1
    : slides.length - researchIndex - 1;

  slides.splice(researchIndex + 1, removeCount, ...researchSlides);
})();