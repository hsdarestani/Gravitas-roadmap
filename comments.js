(() => {
  "use strict";

  const UI_VERSION = "20260803-6";

  function loadUiV3() {
    if (!document.querySelector('link[data-ui-v3="true"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `ui-v3.css?v=${UI_VERSION}`;
      link.dataset.uiV3 = "true";
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[data-ui-v3="true"]')) {
      const script = document.createElement("script");
      script.src = `ui-v3.js?v=${UI_VERSION}`;
      script.dataset.uiV3 = "true";
      document.body.appendChild(script);
    }
  }

  function navigateToMenu(replace = false) {
    if (replace) history.replaceState(null, "", "#2");
    else history.pushState(null, "", "#2");
    window.dispatchEvent(new Event("hashchange"));
  }

  function upgradeControls() {
    const actions = document.querySelector(".topbar__actions");
    const brand = document.querySelector(".brand[data-go]");
    const printButton = document.getElementById("printButton");
    const indexButton = document.getElementById("indexButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    if (brand) {
      brand.dataset.go = "1";
      brand.setAttribute("aria-label", "رفتن به منوی بخش‌ها");
    }

    if (actions && !document.getElementById("homeButton")) {
      const homeButton = document.createElement("button");
      homeButton.id = "homeButton";
      homeButton.className = "home-button";
      homeButton.type = "button";
      homeButton.setAttribute("aria-label", "نمایش بخش‌های سند");
      homeButton.innerHTML = '<span>بخش‌ها</span><svg aria-hidden="true"><use href="#i-menu"/></svg>';
      homeButton.addEventListener("click", () => navigateToMenu(false));
      actions.prepend(homeButton);
    }

    if (printButton) {
      printButton.classList.remove("icon-button");
      printButton.classList.add("pdf-button");
      printButton.title = "چاپ یا ذخیره به‌صورت PDF";
      printButton.innerHTML = '<span>PDF</span><svg aria-hidden="true"><use href="#i-print"/></svg>';
    }

    if (indexButton) {
      const label = indexButton.querySelector("span");
      if (label) label.textContent = "فهرست کامل";
    }

    if (prevButton) {
      prevButton.innerHTML = '<svg aria-hidden="true"><use href="#i-arrow"/></svg><span>قبلی</span>';
    }

    if (nextButton) {
      nextButton.innerHTML = '<span>بعدی</span><svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    }
  }

  loadUiV3();
  upgradeControls();

  if (!location.hash || location.hash === "#1") {
    navigateToMenu(true);
  }

  if (!document.querySelector('script[data-deck-v2="true"]')) {
    const deckScript = document.createElement("script");
    deckScript.src = "deck-v2.js?v=20260803-6";
    deckScript.defer = true;
    deckScript.dataset.deckV2 = "true";
    document.body.appendChild(deckScript);
  }

  const button = document.getElementById("commentsButton");
  const panel = document.getElementById("commentsPanel");
  const closeButton = document.getElementById("commentsClose");
  const backdrop = document.getElementById("panelBackdrop");
  const slot = document.getElementById("utterancesSlot");
  const indexPanel = document.getElementById("indexPanel");
  const indexClose = document.getElementById("indexClose");

  if (!button || !panel || !closeButton || !backdrop || !slot) return;

  let loaded = false;

  function loadComments() {
    if (loaded) return;
    loaded = true;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "hsdarestani/Gravitas-roadmap");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-dark");
    slot.appendChild(script);
  }

  function openComments() {
    if (indexPanel?.classList.contains("is-open")) indexClose?.click();
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    backdrop.classList.add("is-open");
    document.body.classList.add("panel-open");
    loadComments();
    setTimeout(() => closeButton.focus(), 160);
  }

  function closeComments() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    if (!indexPanel?.classList.contains("is-open")) {
      backdrop.classList.remove("is-open");
      document.body.classList.remove("panel-open");
    }
  }

  button.addEventListener("click", () => panel.classList.contains("is-open") ? closeComments() : openComments());
  closeButton.addEventListener("click", closeComments);
  backdrop.addEventListener("click", closeComments);

  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) closeComments();
  });
})();
