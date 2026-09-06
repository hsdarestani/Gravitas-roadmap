(() => {
  "use strict";

  const ASSIGNMENTS = [
    ["O4", "O2"],
    ["O4", "O3"],
    ["O1", "O4"],
    ["O1", "O2"],
    ["O1", "O3", "O4"],
    ["O1", "O2", "O3", "O4"]
  ];

  const LABELS = {
    en: {
      O1: "Content Engine",
      O2: "Active Community",
      O3: "Revenue Validation",
      O4: "Operating System"
    },
    fa: {
      O1: "موتور محتوا",
      O2: "جامعه‌ی فعال",
      O3: "اعتبارسنجی درآمد",
      O4: "سیستم اجرایی"
    }
  };

  const ACTIONS = {
    en: [
      "Confirm the initial audience, the AI × Research wedge, the content promise, and the first six topics. Recruit 10–15 founding testers and open one feedback channel for the first community loop.",
      "Build the Evidence Map for episode one, collect primary sources, and select an expert or reviewer. In parallel, define two initial paid offers, a first target-buyer list, and a lightweight proposal template.",
      "Write the Content Brief, script, and Scientific Red Team review; design the first Short in parallel. Lock the repeatable production checklist and ownership for each step.",
      "Shoot, complete the first edit, design the thumbnail, and build the companion website page. Add newsletter/community signup and one meaningful participation prompt to turn viewers into early members.",
      "Run scientific review, final edit, subtitles, CTA, analytics, and release preparation. Prepare the first qualified outreach batch for the two paid offers and define how response and conversion will be recorded.",
      "Publish the video, companion Short, and website page. Record the baseline for retention, clicks, signups, contributions, and buyer response; invite the first community action and send the first qualified commercial outreach."
    ],
    fa: [
      "مخاطب اولیه، Wedge موضوعی AI × Research، وعده‌ی محتوا و شش موضوع نخست را نهایی کنید. هم‌زمان ۱۰ تا ۱۵ تستر اولیه جذب و یک کانال بازخورد برای شروع حلقه‌ی کامیونیتی باز کنید.",
      "Evidence Map قسمت اول را بسازید، منابع اصلی را جمع کنید و متخصص یا Reviewer را انتخاب کنید. هم‌زمان دو Offer اولیه‌ی پولی، فهرست نخست خریداران هدف و قالب ساده‌ی پروپوزال را مشخص کنید.",
      "Content Brief، Script و Scientific Red Team را بنویسید و Short اول را هم‌زمان طراحی کنید. چک‌لیست تکرارپذیر تولید و مسئول هر مرحله را نیز قفل کنید.",
      "فیلم‌برداری، تدوین اولیه، Thumbnail و صفحه‌ی همراه سایت را بسازید. ثبت‌نام خبرنامه/کامیونیتی و یک مشارکت معنادار را اضافه کنید تا بخشی از بیننده‌ها به اعضای اولیه تبدیل شوند.",
      "بازبینی علمی، تدوین نهایی، زیرنویس، CTA، Analytics و آماده‌سازی انتشار را انجام دهید. اولین Outreach واجدشرایط برای دو Offer پولی را آماده و روش ثبت پاسخ و Conversion را مشخص کنید.",
      "ویدئو، Short همراه و صفحه‌ی سایت را منتشر کنید. Baseline برای Retention، کلیک، ثبت‌نام، مشارکت و پاسخ خریداران ثبت شود؛ اولین کنش کامیونیتی گرفته شود و اولین Outreach تجاری واجدشرایط ارسال شود."
    ]
  };

  function injectStyles() {
    if (document.getElementById("sprint-okr-alignment-styles")) return;

    const style = document.createElement("style");
    style.id = "sprint-okr-alignment-styles";
    style.textContent = `
      .sprint-okr-coverage {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin: -5px 0 13px;
      }
      .sprint-okr-coverage__label {
        margin-inline-end: 3px;
        color: rgba(245, 242, 234, .5);
        font-size: 9px;
        font-weight: 600;
        letter-spacing: .03em;
      }
      .sprint-okr-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 1px 0 8px;
        direction: ltr;
      }
      .sprint-okr-tag {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 7px;
        border: 1px solid rgba(217, 230, 223, .2);
        border-radius: 999px;
        color: rgba(245, 242, 234, .78);
        background: rgba(217, 230, 223, .065);
        font-size: 9px;
        font-weight: 600;
        line-height: 1.25;
        white-space: nowrap;
      }
      .sprint-okr-tag strong {
        color: var(--accent, #d9e6df);
        font-family: var(--latin, Inter, Arial, sans-serif);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .04em;
      }
      html[dir="rtl"] .sprint-okr-tags { direction: rtl; }
      .case-grid article { min-height: 136px; }
      .case-grid p { line-height: 1.66; }
      @media (max-width: 1100px) {
        .case-grid article { min-height: 128px; }
        .case-grid p { font-size: 11px; }
      }
      @media (max-width: 720px) {
        .sprint-okr-coverage { margin: 0 0 10px; }
        .sprint-okr-tags { margin-bottom: 6px; }
        .sprint-okr-tag { font-size: 8.5px; padding: 3px 6px; }
        .case-grid article { min-height: auto; }
      }
    `;
    document.head.appendChild(style);
  }

  function findSprintSlide() {
    const titles = new Set([
      "Next action: fourteen days to the first release",
      "اقدام بعدی؛ چهارده روز تا اولین انتشار"
    ]);

    return [...document.querySelectorAll("#deck .slide")].find(slide => {
      const title = slide.querySelector("h1, h2")?.textContent.trim();
      return titles.has(title);
    });
  }

  function makeTag(code, labels) {
    const tag = document.createElement("span");
    tag.className = "sprint-okr-tag";

    const strong = document.createElement("strong");
    strong.textContent = code;

    const name = document.createElement("span");
    name.textContent = labels[code] || code;

    tag.append(strong, name);
    return tag;
  }

  function applyAlignment() {
    injectStyles();

    const slide = findSprintSlide();
    if (!slide) return;

    const lang = document.documentElement.lang === "fa" ? "fa" : "en";
    const labels = LABELS[lang];
    const cards = [...slide.querySelectorAll(".case-grid article")];
    const grid = slide.querySelector(".case-grid");

    if (grid && !slide.querySelector(".sprint-okr-coverage")) {
      const coverage = document.createElement("div");
      coverage.className = "sprint-okr-coverage";

      const label = document.createElement("span");
      label.className = "sprint-okr-coverage__label";
      label.textContent = lang === "fa" ? "پوشش Sprint:" : "Sprint coverage:";
      coverage.appendChild(label);

      ["O1", "O2", "O3", "O4"].forEach(code => coverage.appendChild(makeTag(code, labels)));
      grid.insertAdjacentElement("beforebegin", coverage);
    }

    ASSIGNMENTS.forEach((codes, index) => {
      const card = cards[index];
      if (!card) return;

      const copy = card.querySelector(":scope > div");
      const heading = copy?.querySelector("b");
      const paragraph = copy?.querySelector("p");
      if (!copy || !heading) return;

      if (paragraph && ACTIONS[lang]?.[index]) paragraph.textContent = ACTIONS[lang][index];

      let tags = copy.querySelector(":scope > .sprint-okr-tags");
      if (!tags) {
        tags = document.createElement("div");
        tags.className = "sprint-okr-tags";
        heading.insertAdjacentElement("afterend", tags);
      }

      tags.replaceChildren(...codes.map(code => makeTag(code, labels)));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAlignment, { once: true });
  } else {
    applyAlignment();
  }
})();
