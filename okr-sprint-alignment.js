(() => {
  "use strict";

  const ASSIGNMENTS = [
    ["O4"],
    ["O4"],
    ["O1", "O4"],
    ["O1"],
    ["O1", "O4"],
    ["O1", "O4"]
  ];

  const LABELS = {
    en: {
      O1: "Content Engine",
      O4: "Operating System"
    },
    fa: {
      O1: "موتور محتوا",
      O4: "سیستم اجرایی"
    }
  };

  function injectStyles() {
    if (document.getElementById("sprint-okr-alignment-styles")) return;

    const style = document.createElement("style");
    style.id = "sprint-okr-alignment-styles";
    style.textContent = `
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
      html[dir="rtl"] .sprint-okr-tags {
        direction: rtl;
      }
      @media (max-width: 720px) {
        .sprint-okr-tags { margin-bottom: 6px; }
        .sprint-okr-tag { font-size: 8.5px; padding: 3px 6px; }
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

  function applyAlignment() {
    injectStyles();

    const slide = findSprintSlide();
    if (!slide) return;

    const lang = document.documentElement.lang === "fa" ? "fa" : "en";
    const labels = LABELS[lang];
    const cards = [...slide.querySelectorAll(".case-grid article")];

    ASSIGNMENTS.forEach((codes, index) => {
      const card = cards[index];
      if (!card) return;

      const copy = card.querySelector(":scope > div");
      const heading = copy?.querySelector("b");
      if (!copy || !heading) return;

      let tags = copy.querySelector(":scope > .sprint-okr-tags");
      if (!tags) {
        tags = document.createElement("div");
        tags.className = "sprint-okr-tags";
        heading.insertAdjacentElement("afterend", tags);
      }

      tags.replaceChildren(...codes.map(code => {
        const tag = document.createElement("span");
        tag.className = "sprint-okr-tag";

        const strong = document.createElement("strong");
        strong.textContent = code;

        const name = document.createElement("span");
        name.textContent = labels[code] || code;

        tag.append(strong, name);
        return tag;
      }));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAlignment, { once: true });
  } else {
    applyAlignment();
  }
})();
