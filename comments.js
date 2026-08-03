(() => {
  "use strict";

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
