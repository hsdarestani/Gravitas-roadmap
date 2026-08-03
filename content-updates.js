(() => {
  "use strict";

  const slides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];
  if (!slides.length) return;

  const byTitle = title => slides.find(slide => slide.title === title);

  const cover = byTitle("GRAVITAS");
  if (cover) {
    cover.note = "زبان پایه‌ی محتوا انگلیسی است؛ فارسی و زبان‌های دیگر متناسب با مخاطب، موضوع و ظرفیت تولید اضافه می‌شوند.";
    cover.meta = ["English-first", "YouTube", "Website", "Science × Philosophy × Society", "Games", "Community"];
  }

  const centralIdea = slides.find(slide => String(slide.eyebrow || "").includes("ایده‌ی مرکزی"));
  if (centralIdea) {
    centralIdea.title = "کنجکاوی و توانمندسازی آدم‌ها، نقطه‌ی شروع Gravitas است.";
    centralIdea.paragraphs = [
      "Gravitas برای آدم‌هایی ساخته می‌شود که هنوز سؤال دارند؛ آدم‌هایی که می‌خواهند بفهمند علم چگونه کار می‌کند، چطور جهان را تغییر می‌دهد و خودش چطور از جامعه، فلسفه، سیاست، اقتصاد و فناوری اثر می‌گیرد.",
      "توانمندسازی بخش اصلی این مسیر است. مخاطب باید ابزار، زبان و اعتماد لازم را پیدا کند تا دقیق‌تر سؤال بپرسد، چیزی را امتحان کند، مسیر یادگیری خودش را بسازد و در گفت‌وگو یا پژوهش مشارکت داشته باشد.",
      "یوتیوب، وب‌سایت، شبکه‌های اجتماعی، دوره‌ها و بازی‌ها اجزای این مسیرند. مرکز ثقل پروژه، جامعه‌ای است که به‌مرور دور Gravitas شکل می‌گیرد."
    ];
    centralIdea.quote = "کنجکاوی آدم‌ها را وارد می‌کند؛ توانمندسازی کمک می‌کند ادامه بدهند و مشارکت کنند.";
  }

  const audience = byTitle("یک فضای مشترک برای دو جهان");
  if (audience) {
    audience.lead = "Gravitas برای مخاطب عمومی یک ورودی روشن می‌سازد و برای دانشجو، پژوهشگر و متخصص ابزار، مسیر یادگیری و امکان مشارکت فراهم می‌کند.";
  }

  const longFormIndex = slides.findIndex(slide => slide.title === "یک ایده، یک جهان");
  if (longFormIndex >= 0) {
    slides[longFormIndex].lead = "ویدئوهای روایی ۸ تا ۲۰ دقیقه‌ای درباره‌ی یک مفهوم، نظریه یا مسئله‌ی علمی؛ فرمت اصلی برای روایت عمیق.";

    const shortsExists = slides.some(slide => slide.title === "شورت‌های یوتیوب");
    if (!shortsExists) {
      slides.splice(longFormIndex + 1, 0, {
        type: "content",
        eyebrow: "فرمت مکمل / YouTube Shorts",
        title: "شورت‌های یوتیوب",
        lead: "ویدئوهای کوتاه، سریع و مستقل برای کشف مخاطب تازه و باز کردن راه ورود به موضوعات بزرگ‌تر.",
        paragraphs: [
          "بعضی شورت‌ها از دل ویدئوی اصلی بیرون می‌آیند و بعضی از ابتدا برای فرمت کوتاه نوشته می‌شوند. هر شورت باید یک ایده‌ی کامل، یک سؤال جدی یا یک لحظه‌ی غافلگیرکننده داشته باشد؛ نه صرفاً تکه‌ای جداشده از محتوای بلند."
        ],
        bullets: [
          "پرسش‌های علمی که در کمتر از یک دقیقه ذهن مخاطب را درگیر می‌کنند",
          "توضیح یک مفهوم، نمودار، آزمایش یا خبر در قالب کوتاه",
          "سری‌های چندقسمتی برای ساخت عادت و بازگشت مخاطب",
          "هدایت طبیعی به ویدئوی بلند، پرونده‌ی سایت، بازی یا گفت‌وگوی کامیونیتی"
        ],
        chips: ["Discovery", "Native Shorts", "Series", "Long-form Bridge"]
      });
    }
  }

  const videoJourney = byTitle("هر ویدئو، آغاز یک مسیر");
  if (videoJourney) {
    videoJourney.paragraphs = [
      "مخاطب بعد از دیدن ویدئو وارد سایت می‌شود و آنجا منابع، مقاله‌ی تکمیلی، نمودار، شبیه‌سازی، بازی، کامنت‌ها، گفت‌وگو و پیشنهاد مطالعه پیدا می‌کند.",
      "محتوا پس از انتشار ویدئو تمام نمی‌شود؛ روی سایت لایه می‌گیرد، قابل جست‌وجو می‌شود، نظر و نقد جمع می‌کند و به فعالیت جمعی وصل می‌شود."
    ];
    videoJourney.chips = ["Watch", "Read", "Explore", "Play", "Comment", "Discuss"];
  }

  const exampleCase = byTitle("آیا جهان قابل‌محاسبه است؟");
  if (exampleCase?.items) {
    const viewpoints = exampleCase.items.find(item => item.label === "دیدگاه‌ها");
    if (viewpoints) {
      viewpoints.label = "دیدگاه‌ها و کامنت‌ها";
      viewpoints.text = "استدلال‌های موافق و مخالف، نقدها و نظرهای مخاطبان";
    }
  }

  const siteArchitecture = byTitle("شش فضای اصلی");
  if (siteArchitecture?.cards) {
    const communityCard = siteArchitecture.cards.find(card => card.title === "کامیونیتی");
    if (communityCard) communityCard.text = "کامنت‌ها، پروفایل اعضا، گفتگوها، گروه‌های مطالعه، رویدادها، چالش‌ها و پروژه‌های جمعی.";
  }

  const distribution = byTitle("یک موضوع، چند تجربه");
  if (distribution?.steps) {
    distribution.steps = [
      "ویدئوی اصلی یوتیوب",
      "YouTube Shorts و کلیپ‌های کوتاه بومی هر پلتفرم",
      "مقاله و منابع",
      "نمودار یا اینفوگرافیک",
      "پرسش تعاملی",
      "بازی یا آزمون",
      "بحث و کامنت‌های کامیونیتی",
      "نسخه‌ی خبرنامه",
      "محتوای تخصصی لینکدین"
    ];
  }

  const platforms = byTitle("هر فضا، یک وظیفه");
  if (platforms?.cards) {
    const youtube = platforms.cards.find(card => card.title === "YouTube");
    if (youtube) youtube.text = "روایت عمیق با ویدئوهای ۸ تا ۲۰ دقیقه‌ای، کشف مخاطب با Shorts و ساختن رابطه‌ی بلندمدت.";
    const telegram = platforms.cards.find(card => card.title === "Telegram");
    if (telegram) telegram.text = "ارتباط مستقیم با اعضای کامیونیتی، توزیع محتوا و خبرنامه‌ی کوتاه در بازارهای زبانی منتخب.";
  }

  const researchQuestions = byTitle("چه چیزی را باید بفهمیم؟");
  if (researchQuestions?.questions) {
    researchQuestions.questions = [
      "چه چیزهایی در فضای علمی انگلیسی بیش از حد تولید شده‌اند؟",
      "کدام مخاطبان در بازارهای هدف نادیده مانده‌اند؟",
      "مردم چه سؤال‌هایی دارند که پاسخ درست و باکیفیت برایشان پیدا نمی‌کنند؟",
      "کدام محتواها بازدید دارند، اما اعتماد ایجاد نمی‌کنند؟",
      "چه موضوعاتی در فضای تخصصی مهم‌اند، اما هنوز به زبان قابل‌فهم روایت نشده‌اند؟",
      "کدام فرمت در بازار هدف کم است، نه فقط کدام موضوع؟"
    ];
  }

  const monthOne = byTitle("پیدا کردن صدای Gravitas");
  if (monthOne?.items?.length) {
    monthOne.items[0] = "بررسی نمونه‌های انگلیسی و بین‌المللی، همراه با بازارهای زبانی بعدی";
  }

  const longTerm = slides.find(slide => String(slide.eyebrow || "").includes("تصویر بلندمدت"));
  if (longTerm) {
    longTerm.title = "انگلیسی، زبان پایه‌ی محتوا";
    longTerm.paragraphs = [
      "تولید اصلی Gravitas از ابتدا به زبان انگلیسی انجام می‌شود تا پروژه در همان نقطه‌ی شروع به گفت‌وگوی جهانی علم، فناوری و فلسفه وصل باشد.",
      "فارسی و زبان‌های دیگر متناسب با نیاز مخاطب، ظرفیت تیم، شریک‌های محلی و عملکرد محتوا اضافه می‌شوند. زیرنویس، بازتولید و نسخه‌های بومی هرکدام جای خودشان را دارند.",
      "چندزبانه شدن برای Gravitas یعنی حفظ یک هویت مشترک و ساختن تجربه‌ای متناسب با هر جامعه؛ نه ترجمه‌ی مکانیکی یک خروجی ثابت."
    ];
    longTerm.chips = ["English First", "Localized Editions", "Subtitles", "Multilingual Community"];
  }
})();
