(() => {
  "use strict";

  const slides = Array.isArray(window.GRAVITAS_SLIDES) ? window.GRAVITAS_SLIDES : [];
  const deck = document.getElementById("deck");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const currentNumber = document.getElementById("currentNumber");
  const totalNumber = document.getElementById("totalNumber");
  const progressBar = document.getElementById("progressBar");
  const indexPanel = document.getElementById("indexPanel");
  const indexButton = document.getElementById("indexButton");
  const indexClose = document.getElementById("indexClose");
  const panelBackdrop = document.getElementById("panelBackdrop");
  const indexList = document.getElementById("indexList");
  const printButton = document.getElementById("printButton");

  let current = 0;
  let touchStartY = 0;
  let touchStartX = 0;
  let wheelLocked = false;

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[char]);

  const two = n => String(n).padStart(2, "0");

  const renderParagraphs = values =>
    values?.length ? `<div class="copy">${values.map(v => `<p>${escapeHTML(v)}</p>`).join("")}</div>` : "";

  const renderBullets = values =>
    values?.length ? `<ul class="bullet-list">${values.map(v => `<li><span></span>${escapeHTML(v)}</li>`).join("")}</ul>` : "";

  const renderChips = values =>
    values?.length ? `<div class="chips">${values.map(v => `<span>${escapeHTML(v)}</span>`).join("")}</div>` : "";

  const renderCards = values =>
    values?.length ? `<div class="cards cards--${Math.min(values.length, 6)}">${values.map((item, i) =>
      `<article class="card"><span class="card__index">${two(i + 1)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></article>`
    ).join("")}</div>` : "";

  const renderMeta = values =>
    values?.length ? `<div class="meta-row">${values.map(v => `<span>${escapeHTML(v)}</span>`).join("")}</div>` : "";

  const renderQuestions = values =>
    values?.length ? `<ol class="question-list">${values.map((v, i) =>
      `<li><span>${two(i + 1)}</span><p>${escapeHTML(v)}</p></li>`
    ).join("")}</ol>` : "";

  const renderCaseItems = values =>
    values?.length ? `<div class="case-grid">${values.map((item, i) =>
      `<article><span>${two(i + 1)}</span><div><b>${escapeHTML(item.label)}</b><p>${escapeHTML(item.text)}</p></div></article>`
    ).join("")}</div>` : "";

  const renderFlow = values =>
    values?.length ? `<div class="flow">${values.map((v, i) =>
      `<div class="flow__item"><span>${two(i + 1)}</span><p>${escapeHTML(v)}</p></div>`
    ).join("")}</div>` : "";

  const renderTimeline = values =>
    values?.length ? `<div class="timeline-list">${values.map((v, i) =>
      `<div><span>${two(i + 1)}</span><p>${escapeHTML(v)}</p></div>`
    ).join("")}</div>` : "";

  function slideInner(slide, index) {
    const head = `
      <div class="slide-head">
        <span class="eyebrow">${escapeHTML(slide.eyebrow || "")}</span>
        <span class="slide-no">${two(index + 1)}</span>
      </div>`;

    if (slide.type === "cover") {
      return `
        <div class="cover-mark" aria-hidden="true"><img src="logo.svg" alt=""></div>
        <div class="cover-content">
          <span class="eyebrow">${escapeHTML(slide.eyebrow)}</span>
          <h1>${escapeHTML(slide.title)}</h1>
          <p class="cover-lead">${escapeHTML(slide.lead)}</p>
          ${renderMeta(slide.meta)}
          <p class="cover-note">${escapeHTML(slide.note)}</p>
        </div>
        <div class="cover-orbit" aria-hidden="true"><span></span><i></i></div>`;
    }

    if (slide.type === "section") {
      return `${head}
        <div class="section-layout">
          <div class="section-index">${two(index + 1)}</div>
          <div>
            <h2>${escapeHTML(slide.title)}</h2>
            <p class="section-lead">${escapeHTML(slide.lead)}</p>
          </div>
        </div>`;
    }

    if (slide.type === "final") {
      return `${head}
        <div class="final-layout">
          <div class="final-logo"><img src="logo.svg" alt="لوگوی Gravitas"></div>
          <h2>${escapeHTML(slide.title)}</h2>
          ${renderParagraphs(slide.paragraphs)}
          ${slide.quote ? `<blockquote>${escapeHTML(slide.quote)}</blockquote>` : ""}
          ${renderMeta(slide.meta)}
        </div>`;
    }

    let body = `${head}<div class="slide-body">
      <div class="title-block">
        <h2>${escapeHTML(slide.title || "")}</h2>
        ${slide.lead ? `<p class="lead">${escapeHTML(slide.lead)}</p>` : ""}
      </div>`;

    if (slide.type === "split" || slide.type === "grid" || slide.type === "platforms") {
      body += renderCards(slide.cards);
    } else if (slide.type === "questions") {
      body += renderQuestions(slide.questions);
    } else if (slide.type === "case") {
      body += renderCaseItems(slide.items);
    } else if (slide.type === "flow") {
      body += renderFlow(slide.steps);
    } else if (slide.type === "timeline") {
      body += renderTimeline(slide.items);
      if (slide.outcome) body += `<div class="outcome"><span>OUTCOME</span><p>${escapeHTML(slide.outcome)}</p></div>`;
    } else {
      body += renderParagraphs(slide.paragraphs);
      body += renderBullets(slide.bullets);
      body += renderCards(slide.cards);
      body += renderChips(slide.chips);
      if (slide.type === "game") {
        body += `<div class="game-tag"><span>${escapeHTML(slide.tag)}</span><i></i></div>`;
      }
    }

    if (slide.quote) body += `<blockquote>${escapeHTML(slide.quote)}</blockquote>`;
    if (slide.footer) body += `<p class="slide-footer">${escapeHTML(slide.footer)}</p>`;
    body += `</div>`;
    return body;
  }

  function buildDeck() {
    if (!deck || !slides.length) return;

    deck.innerHTML = slides.map((slide, index) => `
      <section class="slide slide--${escapeHTML(slide.type || "content")}" id="slide-${index + 1}" data-index="${index}" aria-hidden="${index === 0 ? "false" : "true"}">
        <div class="slide-shell">
          <div class="slide-field" aria-hidden="true"></div>
          ${slideInner(slide, index)}
        </div>
      </section>`).join("");

    totalNumber.textContent = two(slides.length);
    indexList.innerHTML = slides.map((slide, index) => `
      <li>
        <button type="button" data-index="${index}">
          <span>${two(index + 1)}</span>
          <p>${escapeHTML(slide.title)}</p>
          <i></i>
        </button>
      </li>`).join("");

    indexList.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        goTo(Number(button.dataset.index));
        closeIndex();
      });
    });

    document.querySelectorAll("[data-go]").forEach(button => {
      button.addEventListener("click", () => goTo(Number(button.dataset.go)));
    });

    applyState(false);
  }

  function applyState(updateHash = true) {
    const nodes = [...deck.querySelectorAll(".slide")];
    nodes.forEach((node, index) => {
      const delta = index - current;
      node.classList.toggle("is-active", delta === 0);
      node.classList.toggle("is-before", delta < 0);
      node.classList.toggle("is-after", delta > 0);
      node.setAttribute("aria-hidden", delta === 0 ? "false" : "true");
      node.style.setProperty("--distance", Math.min(Math.abs(delta), 4));
    });

    currentNumber.textContent = two(current + 1);
    progressBar.style.transform = `scaleX(${(current + 1) / slides.length})`;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === slides.length - 1;

    indexList.querySelectorAll("button").forEach((button, index) => {
      button.classList.toggle("is-current", index === current);
    });

    document.body.dataset.slideType = slides[current]?.type || "content";

    if (updateHash) {
      history.replaceState(null, "", `#${current + 1}`);
    }
  }

  function goTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current) return;
    current = next;
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
  indexButton.addEventListener("click", () =>
    indexPanel.classList.contains("is-open") ? closeIndex() : openIndex());
  indexClose.addEventListener("click", closeIndex);
  panelBackdrop.addEventListener("click", closeIndex);
  printButton.addEventListener("click", () => window.print());

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") return closeIndex();
    if (document.body.classList.contains("panel-open")) return;
    if (["ArrowLeft", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      next();
    } else if (["ArrowRight", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      prev();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  }, { passive: false });

  window.addEventListener("wheel", event => {
    if (document.body.classList.contains("panel-open") || wheelLocked || Math.abs(event.deltaY) < 14) return;
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
