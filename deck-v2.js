(() => {
  "use strict";

  const CHAPTER_IDS = [
    "foundation", "youtube", "website", "games", "community",
    "reach", "revenue", "research", "okr", "roadmap"
  ];

  let resizeTimer = 0;

  function textWeight(slide) {
    const body = slide.querySelector(".slide-body");
    if (!body) return 0;
    return (body.textContent || "").replace(/\s+/g, " ").trim().length;
  }

  function annotateSlide(slide) {
    const chapterIndex = Number(slide.dataset.chapter || 0);
    const chapterId = CHAPTER_IDS[chapterIndex] || CHAPTER_IDS[0];
    slide.dataset.chapterId = chapterId;
    slide.classList.add(`chapter-${chapterId}`);

    const title = slide.querySelector("h2")?.textContent?.trim() || "";
    const cards = slide.querySelector(".cards");
    const cases = slide.querySelector(".case-grid");
    const bullets = slide.querySelectorAll(".bullet-list li").length;
    const timelineItems = slide.querySelectorAll(".timeline-list > div").length;
    const weight = textWeight(slide);

    if (title.length > 34) slide.classList.add("has-long-title");
    if (title.length > 52) slide.classList.add("has-very-long-title");
    if (weight > 760 || bullets > 7 || timelineItems > 6) slide.classList.add("is-dense");

    if (cards) {
      const count = cards.children.length;
      cards.dataset.count = String(count);
      cards.classList.add(`cards-v2-${Math.min(count, 6)}`);
      if (count >= 5) slide.classList.add("is-card-heavy");
    }

    if (cases) {
      const count = cases.children.length;
      cases.dataset.count = String(count);
      cases.classList.add(`case-v2-${Math.min(count, 6)}`);
    }
  }

  function fitSlide(slide) {
    const shell = slide.querySelector(".slide-shell");
    if (!shell || window.matchMedia("(max-width: 760px)").matches) return;

    slide.classList.remove("is-compact", "is-ultra-compact", "is-scrollable");
    shell.scrollTop = 0;

    requestAnimationFrame(() => {
      if (shell.scrollHeight <= shell.clientHeight + 2) return;
      slide.classList.add("is-compact");

      requestAnimationFrame(() => {
        if (shell.scrollHeight <= shell.clientHeight + 2) return;
        slide.classList.add("is-ultra-compact");

        requestAnimationFrame(() => {
          if (shell.scrollHeight > shell.clientHeight + 2) {
            slide.classList.add("is-scrollable");
          }
        });
      });
    });
  }

  function refreshDeck() {
    const slides = [...document.querySelectorAll(".deck .slide")];
    if (!slides.length) return;
    slides.forEach(annotateSlide);
    slides.forEach(fitSlide);
  }

  function installStylesheet() {
    if (document.querySelector('link[data-deck-v2="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "deck-v2.css?v=3";
    link.dataset.deckV2 = "true";
    link.addEventListener("load", refreshDeck, { once: true });
    document.head.appendChild(link);
  }

  installStylesheet();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshDeck, { once: true });
  } else {
    refreshDeck();
  }

  window.addEventListener("load", refreshDeck, { once: true });
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refreshDeck, 140);
  });
})();
