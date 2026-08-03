(() => {
  "use strict";

  const slides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];
  const links = new Map();

  slides.forEach((slide) => {
    (slide.cards || []).forEach((card) => {
      if (card?.title && card?.url) links.set(String(card.title).trim(), card.url);
    });
  });

  if (!document.querySelector('style[data-research-links="true"]')) {
    const style = document.createElement("style");
    style.dataset.researchLinks = "true";
    style.textContent = `
      .card.has-source-link {
        grid-template-rows: auto auto 1fr auto;
      }
      .card__title-link {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: inherit;
        text-decoration: none;
        transition: color .2s ease;
      }
      .card__title-link:hover { color: var(--accent); }
      .card__title-link svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        flex: 0 0 auto;
      }
      .card__source-link {
        width: max-content;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 12px;
        padding-top: 9px;
        border-top: 1px solid rgba(var(--accent-rgb,217,230,223),.13);
        color: rgba(var(--accent-rgb,217,230,223),.82);
        font-size: 10px;
        font-weight: 600;
        text-decoration: none;
        letter-spacing: .01em;
      }
      .card__source-link::after {
        content: "↗";
        font: 700 12px/1 var(--latin);
      }
      .card__source-link:hover { color: var(--ink); }
      @media (max-height: 820px) and (min-width: 761px) {
        .card__source-link { margin-top: 7px; padding-top: 6px; font-size: 9px; }
      }
    `;
    document.head.appendChild(style);
  }

  function addSourceLinks() {
    let added = 0;

    document.querySelectorAll(".card").forEach((card) => {
      const heading = card.querySelector("h3");
      const title = heading?.textContent?.trim();
      const url = title ? links.get(title) : null;
      if (!heading || !url || card.classList.contains("has-source-link")) return;

      card.classList.add("has-source-link");
      const titleLink = document.createElement("a");
      titleLink.className = "card__title-link";
      titleLink.href = url;
      titleLink.target = "_blank";
      titleLink.rel = "noopener noreferrer";
      titleLink.innerHTML = `${heading.innerHTML}<svg aria-hidden="true"><use href="#i-link"/></svg>`;
      heading.replaceChildren(titleLink);

      const sourceLink = document.createElement("a");
      sourceLink.className = "card__source-link";
      sourceLink.href = url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "مشاهده‌ی نمونه";
      card.appendChild(sourceLink);
      added += 1;
    });

    return added;
  }

  function cleanFixedInterviewQuotas() {
    document.querySelectorAll(".slide").forEach((slide) => {
      const title = slide.querySelector("h2")?.textContent?.trim() || "";

      if (title === "اعتبارسنجی مدل درآمدی") {
        slide.querySelectorAll(".bullet-list li").forEach((item) => {
          if (item.textContent.includes("۳۰ مصاحبه")) item.remove();
        });
      }

      if (title === "از ساخت پایه تا اولین اثبات") {
        slide.querySelectorAll(".timeline-list > div p").forEach((item) => {
          if (item.textContent.includes("۱۰ مصاحبه")) {
            item.textContent = "ماه ۱ — فهرست نهادها و شرکت‌های هدف، دو Offer اولیه و نمونه‌ی پروپوزال";
          }
          if (item.textContent.includes("۲۰ مصاحبه")) {
            item.textContent = "ماه ۲ — چهار Offer مشخص، سه پروپوزال و پیش‌فروش یا اجرای ورکشاپ آزمایشی";
          }
        });
      }
    });
  }

  function applyResearchEnhancements() {
    const deck = document.getElementById("deck");
    if (!deck || !deck.querySelector(".slide")) return false;

    const added = addSourceLinks();
    cleanFixedInterviewQuotas();
    if (added) window.dispatchEvent(new Event("resize"));
    return true;
  }

  if (!applyResearchEnhancements()) {
    const deck = document.getElementById("deck");
    if (!deck) return;

    const observer = new MutationObserver(() => {
      if (applyResearchEnhancements()) observer.disconnect();
    });
    observer.observe(deck, { childList: true, subtree: true });
  }
})();