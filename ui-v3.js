(() => {
  "use strict";

  function syncMenuState() {
    const isMenu = document.body.dataset.slideType === "map";
    document.body.classList.toggle("is-home-menu", isMenu);
    if (!isMenu) return;

    const chapterNumber = document.getElementById("chapterNumber");
    const chapterName = document.getElementById("chapterName");
    const progressChapter = document.getElementById("progressChapter");
    const chapterIcon = document.getElementById("chapterIcon");

    if (chapterNumber) chapterNumber.textContent = "START";
    if (chapterName) chapterName.textContent = "انتخاب بخش";
    if (progressChapter) progressChapter.textContent = "منوی اصلی";
    if (chapterIcon) chapterIcon.innerHTML = '<svg class="ui-icon" aria-hidden="true"><use href="#i-menu"/></svg>';

    const activeMap = document.querySelector(".slide--map.is-active");
    const title = activeMap?.querySelector("h2");
    const lead = activeMap?.querySelector(".lead");
    if (title) title.textContent = "از کدام بخش شروع کنیم؟";
    if (lead) lead.textContent = "هر فصل یک بخش مستقل از برنامه‌ی Gravitas است. مستقیم وارد موضوع موردنظر شوید یا سند را از ابتدا ورق بزنید.";
  }

  const observer = new MutationObserver(syncMenuState);
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-slide-type"] });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncMenuState, { once: true });
  } else {
    syncMenuState();
  }

  window.addEventListener("hashchange", syncMenuState);
})();
