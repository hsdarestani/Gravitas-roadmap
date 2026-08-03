(() => {
  "use strict";

  const sourceSlides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];

  const CHAPTERS = [
    { id: "foundation", number: "01", title: "بنیان پروژه", short: "بنیان", icon: "core", description: "چشم‌انداز، مخاطب، نقطه‌ی شروع و شخصیت محتوایی" },
    { id: "youtube", number: "02", title: "یوتیوب", short: "یوتیوب", icon: "youtube", description: "موتور روایت، دیده‌شدن و اعتمادسازی" },
    { id: "website", number: "03", title: "وب‌سایت", short: "وب‌سایت", icon: "web", description: "مرکز عمق، آرشیو، یادگیری و عضویت" },
    { id: "games", number: "04", title: "بازی‌ها", short: "بازی", icon: "game", description: "تجربه‌های تعاملی و امضای Gravitas" },
    { id: "community", number: "05", title: "کامیونیتی", short: "جامعه", icon: "community", description: "نقش‌ها، مشارکت و دلیل بازگشت" },
    { id: "reach", number: "06", title: "رشد و توزیع", short: "رشد", icon: "reach", description: "سیستم انتشار و رسیدن به مخاطب" },
    { id: "revenue", number: "07", title: "مدل درآمدی", short: "درآمد", icon: "pie", description: "پروژه، حمایت، عضویت، لایسنس و محصولات علمی" },
    { id: "research", number: "08", title: "تحقیق و یادگیری", short: "تحقیق", icon: "search", description: "نیازسنجی، بازارسنجی و آزمایش مستمر" },
    { id: "okr", number: "09", title: "OKR و سنجه‌ها", short: "OKR", icon: "chart", description: "Objectiveها، Key Resultها، مایل‌استون‌ها و Gateهای تصمیم" },
    { id: "roadmap", number: "10", title: "رودمپ شش‌ماهه", short: "اجرا", icon: "calendar", description: "فازها، خروجی‌ها و تصویر بلندمدت" }
  ];

  const overviewSlide = {
    type: "map",
    eyebrow: "نقشه‌ی سند",
    title: "مسیر Gravitas در ده فصل",
    lead: "سند از تعریف هویت شروع می‌شود، از رسانه، محصول و مدل درآمد عبور می‌کند و به تحقیق، OKR و برنامه‌ی اجرایی می‌رسد.",
    chapters: CHAPTERS
  };

  const slides = sourceSlides.length
    ? [sourceSlides[0], overviewSlide, ...sourceSlides.slice(1)]
    : [overviewSlide];

  const deck = document.getElementById("deck");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const currentNumber = document.getElementById("currentNumber");
  const totalNumber = document.getElementById("totalNumber");
  const progressBar = document.getElementById("progressBar");
  const progressChapter = document.getElementById("progressChapter");
  const indexPanel = document.getElementById("indexPanel");
  const indexButton = document.getElementById("indexButton");
  const indexClose = document.getElementById("indexClose");
  const panelBackdrop = document.getElementById("panelBackdrop");
  const indexList = document.getElementById("indexList");
  const printButton = document.getElementById("printButton");
  const chapterRail = document.getElementById("chapterRail");
  const chapterIcon = document.getElementById("chapterIcon");
  const chapterNumber = document.getElementById("chapterNumber");
  const chapterName = document.getElementById("chapterName");

  let current = 0;
  let touchStartY = 0;
  let touchStartX = 0;
  let wheelLocked = false;

  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  const two = n => String(n).padStart(2, "0");
  const icon = (name, className = "") => `<svg class="ui-icon ${className}" aria-hidden="true"><use href="#i-${escapeHTML(name)}"/></svg>`;

  function assignChapters() {
    let chapterIndex = 0;
    slides.forEach((slide, index) => {
      const match = String(slide.eyebrow || "").match(/^0?([2-9]|10)\s*\//);
      if (slide.type === "section" && match) chapterIndex = Number(match[1]) - 1;
      slide._chapter = Math.max(0, Math.min(CHAPTERS.length - 1, chapterIndex));
      slide._index = index;
    });

    CHAPTERS.forEach((chapter, index) => {
      const first = slides.findIndex(slide => slide._chapter === index);
      chapter.firstSlide = first < 0 ? 0 : first;
      chapter.count = slides.filter(slide => slide._chapter === index).length;
    });
  }

  function slideIcon(slide) {
    const title = String(slide.title || "");
    const eyebrow = String(slide.eyebrow || "");
    if (slide.type === "cover") return "core";
    if (slide.type === "map") return "path";
    if (slide.type === "section") return CHAPTERS[slide._chapter]?.icon || "core";
    if (slide.type === "game") {
      if (title.includes("فرضیه")) return "hypothesis";
      if (title.includes("خبر")) return "eye";
      if (title.includes("بودجه")) return "pie";
      if (title.includes("جهان")) return "orbit";
      if (title.includes("داور")) return "review";
      return "bulb";
    }
    if (title.includes("AI") || title.includes("ML")) return "ai";
    if (title.includes("پرسش") || title.includes("مسئله")) return "question";
    if (title.includes("صدا") || title.includes("شخصیت")) return "voice";
    if (title.includes("درآمد") || title.includes("پایداری مالی")) return "pie";
    if (title.includes("OKR") || title.includes("سنجه") || title.includes("Objective")) return "chart";
    if (title.includes("توانمندسازی") || title.includes("North Star")) return "reach";
    if (title.includes("مایل‌استون") || title.includes("ماه")) return "calendar";
    if (title.includes("نقطه‌ی توقف") || title.includes("Gate")) return "check";
    if (eyebrow.includes("برنامه‌ی 01")) return "story";
    if (eyebrow.includes("برنامه‌ی 02")) return "news";
    if (eyebrow.includes("برنامه‌ی 03")) return "mic";
    if (eyebrow.includes("برنامه‌ی 04")) return "lab";
    if (eyebrow.includes("برنامه‌ی 05")) return "table";
    if (title.includes("ویدئو")) return "path";
    if (title.includes("پرونده")) return "folder";
    if (title.includes("فضای اصلی")) return "web";
    if (title.includes("تماشاچی")) return "community";
    if (title.includes("موضوع، چند تجربه")) return "share";
    if (title.includes("وظیفه")) return "layers";
    if (title.includes("موتورهای رشد")) return "reach";
    if (title.includes("بفهمیم")) return "search";
    if (title.includes("آزمایشگاه شناخت")) return "chart";
    if (title.includes("چندزبانه")) return "globe";
    return CHAPTERS[slide._chapter]?.icon || "core";
  }

  function cardIcon(slide, item, index) {
    const key = `${slide.title || ""} ${item.title || item.label || ""}`;
    if (key.includes("عمومی")) return "audience";
    if (key.includes("تخصصی")) return "lab";
    if (key.includes("عمق")) return "layers";
    if (key.includes("روشن")) return "bulb";
    if (key.includes("پیوند")) return "link";
    if (key.includes("درگیر")) return "cursor";
    if (key.includes("مجله") || key.includes("مقاله")) return "article";
    if (key.includes("پرونده")) return "folder";
    if (key.includes("آزمایشگاه") || key.includes("شبیه‌سازی") || key.includes("پک")) return "lab";
    if (key.includes("خبرنامه")) return "mail";
    if (key.includes("یادگیری") || key.includes("منابع")) return "book";
    if (key.includes("کامیونیتی") || key.includes("جامعه") || key.includes("عضویت") || key.includes("دیدگاه")) return "community";
    if (key.includes("تایم‌لاین") || key.includes("مایل‌استون")) return "calendar";
    if (key.includes("درآمد") || key.includes("مالی")) return "pie";
    if (key.includes("پروژه") || key.includes("شرکت") || key.includes("سازمان")) return "briefcase";
    if (key.includes("حمایت")) return "reach";
    if (key.includes("بازی") || key.includes("لایسنس")) return "game";
    if (key.includes("محتوا") || key.includes("O1")) return "youtube";
    if (key.includes("O2")) return "community";
    if (key.includes("O3")) return "pie";
    if (key.includes("O4") || key.includes("سیستم")) return "layers";
    if (key.includes("MEP") || key.includes("North Star")) return "reach";
    if (key.includes("کیفیت")) return "check";
    if (key.includes("Instagram")) return "instagram";
    if (key.includes("Telegram")) return "send";
    if (key.includes("LinkedIn")) return "briefcase";
    if (key.includes("YouTube")) return "youtube";
    if (key.includes("Website")) return "web";
    return ["core", "path", "article", "lab", "community", "reach"][index % 6];
  }

  function renderParagraphs(values) {
    return values?.length ? `<div class="copy">${values.map((value, i) => `<p><span class="copy-index">${two(i + 1)}</span>${escapeHTML(value)}</p>`).join("")}</div>` : "";
  }

  function renderBullets(values) {
    return values?.length ? `<ul class="bullet-list">${values.map(value => `<li>${icon("check", "bullet-icon")}<span>${escapeHTML(value)}</span></li>`).join("")}</ul>` : "";
  }

  function renderChips(values) {
    return values?.length ? `<div class="chips">${values.map(value => `<span>${escapeHTML(value)}</span>`).join("")}</div>` : "";
  }

  function renderMeta(values) {
    return values?.length ? `<div class="meta-row">${values.map(value => `<span>${escapeHTML(value)}</span>`).join("")}</div>` : "";
  }

  function renderCards(slide, values) {
    return values?.length ? `<div class="cards cards--${Math.min(values.length, 6)}">${values.map((item, index) => `
      <article class="card">
        <div class="card__top"><span class="card__icon">${icon(cardIcon(slide, item, index))}</span><span class="card__index">${two(index + 1)}</span></div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
      </article>`).join("")}</div>` : "";
  }

  function renderQuestions(values) {
    return values?.length ? `<ol class="question-list">${values.map((value, index) => `
      <li><span>${two(index + 1)}</span><p>${escapeHTML(value)}</p>${icon("question", "question-icon")}</li>`).join("")}</ol>` : "";
  }

  function renderCaseItems(slide, values) {
    return values?.length ? `<div class="case-grid">${values.map((item, index) => `
      <article><span class="case-icon">${icon(cardIcon(slide, item, index))}</span><div><b>${escapeHTML(item.label)}</b><p>${escapeHTML(item.text)}</p></div><small>${two(index + 1)}</small></article>`).join("")}</div>` : "";
  }

  function flowIcon(index) {
    return ["youtube", "share", "article", "chart", "question", "game", "community", "mail", "briefcase"][index] || "path";
  }

  function renderFlow(values) {
    return values?.length ? `<div class="flow">${values.map((value, index) => `
      <div class="flow__item"><span class="flow__icon">${icon(flowIcon(index))}</span><p>${escapeHTML(value)}</p><small>${two(index + 1)}</small></div>`).join("")}</div>` : "";
  }

  function renderTimeline(values) {
    return values?.length ? `<div class="timeline-list">${values.map((value, index) => `
      <div><span>${icon(index % 3 === 0 ? "search" : index % 3 === 1 ? "path" : "check")}</span><p>${escapeHTML(value)}</p><small>${two(index + 1)}</small></div>`).join("")}</div>` : "";
  }

  function renderMap(chapters) {
    return `<div class="chapter-map">${chapters.map((chapter, index) => `
      <button type="button" class="chapter-map__item" data-chapter-go="${index}">
        <span class="chapter-map__number">${chapter.number}</span>
        <span class="chapter-map__icon">${icon(chapter.icon)}</span>
        <span class="chapter-map__copy"><b>${escapeHTML(chapter.title)}</b><small>${escapeHTML(chapter.description)}</small></span>
        <span class="chapter-map__count">${two(chapter.count)} اسلاید</span>
      </button>`).join("")}</div>`;
  }

  function standardHead(slide, index) {
    const chapter = CHAPTERS[slide._chapter];
    return `<div class="slide-head">
      <div class="slide-head__context">${icon(chapter.icon)}<span>${escapeHTML(chapter.title)}</span><i></i><b>${escapeHTML(slide.eyebrow || "")}</b></div>
      <span class="slide-no">${two(index + 1)}</span>
    </div>`;
  }

  function titleBlock(slide) {
    const name = slideIcon(slide);
    return `<div class="title-block">
      <span class="title-icon">${icon(name)}</span>
      <div><h2>${escapeHTML(slide.title || "")}</h2>${slide.lead ? `<p class="lead">${escapeHTML(slide.lead)}</p>` : ""}</div>
    </div>`;
  }

  function slideInner(slide, index) {
    const head = standardHead(slide, index);
    const watermark = `<div class="slide-watermark" aria-hidden="true">${icon(slideIcon(slide))}</div>`;

    if (slide.type === "cover") {
      return `<div class="cover-mark" aria-hidden="true"><img src="logo.svg" alt=""></div>
        <div class="cover-content">
          <span class="eyebrow">${escapeHTML(slide.eyebrow)}</span>
          <h1>${escapeHTML(slide.title)}</h1>
          <p class="cover-lead">${escapeHTML(slide.lead)}</p>
          ${renderMeta(slide.meta)}
          <p class="cover-note">${escapeHTML(slide.note)}</p>
        </div>
        <div class="cover-architecture" aria-label="ساختار پروژه">
          <span>${icon("youtube")}<b>MEDIA</b></span>
          <i></i>
          <span>${icon("web")}<b>PLATFORM</b></span>
          <i></i>
          <span>${icon("community")}<b>COMMUNITY</b></span>
        </div>`;
    }

    if (slide.type === "map") {
      return `${head}<div class="slide-body">${titleBlock(slide)}${renderMap(slide.chapters)}</div>${watermark}`;
    }

    if (slide.type === "section") {
      const chapter = CHAPTERS[slide._chapter];
      return `${head}<div class="section-layout">
        <div class="section-symbol"><span>${icon(chapter.icon)}</span><small>${chapter.number}</small></div>
        <div><span class="section-kicker">CHAPTER ${chapter.number}</span><h2>${escapeHTML(slide.title)}</h2><p class="section-lead">${escapeHTML(slide.lead)}</p><div class="section-stats"><span>${two(chapter.count)} اسلاید</span><span>${escapeHTML(chapter.description)}</span></div></div>
      </div>${watermark}`;
    }

    if (slide.type === "final") {
      return `${head}<div class="final-layout">
        <div class="final-logo"><img src="logo.svg" alt="لوگوی Gravitas"></div>
        <h2>${escapeHTML(slide.title)}</h2>
        ${renderParagraphs(slide.paragraphs)}
        ${slide.quote ? `<blockquote>${escapeHTML(slide.quote)}</blockquote>` : ""}
        ${renderMeta(slide.meta)}
      </div>${watermark}`;
    }

    let body = `${head}<div class="slide-body">${titleBlock(slide)}`;

    if (["split", "grid", "platforms"].includes(slide.type)) body += renderCards(slide, slide.cards);
    else if (slide.type === "questions") body += renderQuestions(slide.questions);
    else if (slide.type === "case") body += renderCaseItems(slide, slide.items);
    else if (slide.type === "flow") body += renderFlow(slide.steps);
    else if (slide.type === "timeline") {
      body += renderTimeline(slide.items);
      if (slide.outcome) body += `<div class="outcome"><span>${icon("check")}<b>خروجی این فاز</b></span><p>${escapeHTML(slide.outcome)}</p></div>`;
    } else {
      body += renderParagraphs(slide.paragraphs);
      body += renderBullets(slide.bullets);
      body += renderCards(slide, slide.cards);
      body += renderChips(slide.chips);
      if (slide.type === "game") body += `<div class="game-tag"><span>${icon(slideIcon(slide))}</span><b>${escapeHTML(slide.tag)}</b><i></i></div>`;
    }

    if (slide.quote) body += `<blockquote>${escapeHTML(slide.quote)}</blockquote>`;
    if (slide.footer) body += `<p class="slide-footer">${icon("core")}${escapeHTML(slide.footer)}</p>`;
    body += `</div>${watermark}`;
    return body;
  }

  function buildRail() {
    chapterRail.innerHTML = CHAPTERS.map((chapter, index) => `
      <button type="button" data-chapter="${index}" aria-label="${escapeHTML(chapter.title)}">
        <span>${icon(chapter.icon)}</span><small>${escapeHTML(chapter.short)}</small><i></i>
      </button>`).join("");

    chapterRail.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => goTo(CHAPTERS[Number(button.dataset.chapter)].firstSlide));
    });
  }

  function buildIndex() {
    const summaryCount = document.querySelector(".index-summary span:first-child");
    if (summaryCount) summaryCount.textContent = `${CHAPTERS.length} فصل`;

    indexList.innerHTML = CHAPTERS.map((chapter, chapterIndex) => {
      const chapterSlides = slides.filter(slide => slide._chapter === chapterIndex);
      return `<section class="index-group" data-index-chapter="${chapterIndex}">
        <button type="button" class="index-group__head" data-chapter-jump="${chapterIndex}">
          <span>${icon(chapter.icon)}</span><div><small>${chapter.number}</small><b>${escapeHTML(chapter.title)}</b></div><em>${two(chapterSlides.length)}</em>
        </button>
        <ol>${chapterSlides.map(slide => `<li><button type="button" data-index="${slide._index}"><span>${two(slide._index + 1)}</span><p>${escapeHTML(slide.title)}</p><i></i></button></li>`).join("")}</ol>
      </section>`;
    }).join("");

    indexList.querySelectorAll("[data-index]").forEach(button => {
      button.addEventListener("click", () => { goTo(Number(button.dataset.index)); closeIndex(); });
    });

    indexList.querySelectorAll("[data-chapter-jump]").forEach(button => {
      button.addEventListener("click", () => { goTo(CHAPTERS[Number(button.dataset.chapterJump)].firstSlide); closeIndex(); });
    });
  }

  function buildDeck() {
    if (!deck || !slides.length) return;
    assignChapters();

    deck.innerHTML = slides.map((slide, index) => `
      <section class="slide slide--${escapeHTML(slide.type || "content")}" id="slide-${index + 1}" data-index="${index}" data-chapter="${slide._chapter}" aria-hidden="${index === 0 ? "false" : "true"}">
        <div class="slide-shell"><div class="slide-field" aria-hidden="true"></div>${slideInner(slide, index)}</div>
      </section>`).join("");

    totalNumber.textContent = two(slides.length);
    buildRail();
    buildIndex();

    deck.querySelectorAll("[data-chapter-go]").forEach(button => {
      button.addEventListener("click", () => goTo(CHAPTERS[Number(button.dataset.chapterGo)].firstSlide));
    });

    document.querySelectorAll("[data-go]").forEach(button => {
      button.addEventListener("click", () => goTo(Number(button.dataset.go)));
    });

    applyState(false);
  }

  function updateChapterUI() {
    const chapterIndex = slides[current]._chapter;
    const chapter = CHAPTERS[chapterIndex];
    chapterIcon.innerHTML = icon(chapter.icon);
    chapterNumber.textContent = `${chapter.number} / ${two(CHAPTERS.length)}`;
    chapterName.textContent = chapter.title;
    progressChapter.textContent = chapter.short;

    chapterRail.querySelectorAll("button").forEach((button, index) => {
      const active = index === chapterIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "step" : "false");
    });

    indexList.querySelectorAll(".index-group").forEach((group, index) => group.classList.toggle("is-active", index === chapterIndex));
  }

  function applyState(updateHash = true) {
    const nodes = [...deck.querySelectorAll(".slide")];
    nodes.forEach((node, index) => {
      const delta = index - current;
      node.classList.toggle("is-active", delta === 0);
      node.classList.toggle("is-before", delta < 0);
      node.classList.toggle("is-after", delta > 0);
      node.setAttribute("aria-hidden", delta === 0 ? "false" : "true");
    });

    currentNumber.textContent = two(current + 1);
    progressBar.style.transform = `scaleX(${(current + 1) / slides.length})`;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === slides.length - 1;

    indexList.querySelectorAll("[data-index]").forEach(button => {
      button.classList.toggle("is-current", Number(button.dataset.index) === current);
    });

    document.body.dataset.slideType = slides[current]?.type || "content";
    document.body.dataset.chapter = slides[current]?._chapter ?? 0;
    updateChapterUI();

    if (updateHash) history.replaceState(null, "", `#${current + 1}`);
  }

  function goTo(index) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    if (nextIndex === current) return;
    current = nextIndex;
    applyState();
  }

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  function openIndex() {
    indexPanel.classList.add("is-open");
    panelBackdrop.classList.add("is-open");
    indexPanel.setAttribute("aria-hidden", "false");
    indexButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("panel-open");
    const currentItem = indexList.querySelector(".is-current");
    if (currentItem) setTimeout(() => currentItem.scrollIntoView({ block: "center" }), 180);
  }

  function closeIndex() {
    indexPanel.classList.remove("is-open");
    panelBackdrop.classList.remove("is-open");
    indexPanel.setAttribute("aria-hidden", "true");
    indexButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("panel-open");
  }

  prevButton.addEventListener("click", prev);
  nextButton.addEventListener("click", next);
  indexButton.addEventListener("click", () => indexPanel.classList.contains("is-open") ? closeIndex() : openIndex());
  indexClose.addEventListener("click", closeIndex);
  panelBackdrop.addEventListener("click", closeIndex);
  printButton.addEventListener("click", () => window.print());

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") return closeIndex();
    if (document.body.classList.contains("panel-open")) return;
    if (["ArrowLeft", "ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); next(); }
    else if (["ArrowRight", "ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); prev(); }
    else if (event.key === "Home") { event.preventDefault(); goTo(0); }
    else if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
  }, { passive: false });

  window.addEventListener("wheel", event => {
    if (document.body.classList.contains("panel-open") || wheelLocked || Math.abs(event.deltaY) < 14) return;
    const activeShell = deck.querySelector(".slide.is-active .slide-shell");
    if (activeShell && activeShell.scrollHeight > activeShell.clientHeight) {
      const atTop = activeShell.scrollTop <= 0;
      const atBottom = activeShell.scrollTop + activeShell.clientHeight >= activeShell.scrollHeight - 2;
      if ((!atTop && event.deltaY < 0) || (!atBottom && event.deltaY > 0)) return;
    }
    wheelLocked = true;
    event.deltaY > 0 ? next() : prev();
    setTimeout(() => wheelLocked = false, 620);
  }, { passive: true });

  window.addEventListener("touchstart", event => {
    const touch = event.changedTouches[0];
    touchStartY = touch.clientY;
    touchStartX = touch.clientX;
  }, { passive: true });

  window.addEventListener("touchend", event => {
    if (document.body.classList.contains("panel-open")) return;
    const touch = event.changedTouches[0];
    const dy = touch.clientY - touchStartY;
    const dx = touch.clientX - touchStartX;
    if (Math.max(Math.abs(dy), Math.abs(dx)) < 50) return;
    Math.abs(dy) > Math.abs(dx) ? (dy < 0 ? next() : prev()) : (dx < 0 ? next() : prev());
  }, { passive: true });

  window.addEventListener("hashchange", () => {
    const value = Number(location.hash.replace("#", ""));
    if (Number.isFinite(value) && value >= 1 && value <= slides.length) {
      current = value - 1;
      applyState(false);
    }
  });

  const initial = Number(location.hash.replace("#", ""));
  if (Number.isFinite(initial) && initial >= 1 && initial <= slides.length) current = initial - 1;
  buildDeck();
})();
