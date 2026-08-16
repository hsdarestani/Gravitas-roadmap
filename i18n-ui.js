(() => {
  "use strict";

  const ctx = window.GRAVITAS_I18N;
  if (!ctx || ctx.language !== "en") return;

  const S = ctx.strings;
  const exact = new Map([
    ["بنیان پروژه", "Foundation"],
    ["بنیان", "Foundation"],
    ["چشم‌انداز، مخاطب، نقطه‌ی شروع و شخصیت محتوایی", "Vision, audience, starting point, and content personality"],
    ["یوتیوب", "YouTube"],
    ["موتور روایت، دیده‌شدن و اعتمادسازی", "The engine for storytelling, discovery, and trust"],
    ["وب‌سایت", "Website"],
    ["مرکز عمق، آرشیو، یادگیری و عضویت", "The home of depth, archives, learning, and membership"],
    ["بازی‌ها", "Games"],
    ["بازی", "Games"],
    ["تجربه‌های تعاملی و امضای Gravitas", "Interactive experiences and a signature Gravitas format"],
    ["کامیونیتی", "Community"],
    ["جامعه", "Community"],
    ["نقش‌ها، مشارکت و دلیل بازگشت", "Roles, participation, and reasons to return"],
    ["رشد و توزیع", "Growth & Distribution"],
    ["رشد", "Growth"],
    ["سیستم انتشار و رسیدن به مخاطب", "Publishing system and audience acquisition"],
    ["مدل درآمدی", "Revenue Model"],
    ["درآمد", "Revenue"],
    ["پروژه، حمایت، عضویت، لایسنس و محصولات علمی", "Projects, sponsorship, membership, licensing, and science products"],
    ["تحقیق و یادگیری", "Research & Learning"],
    ["تحقیق", "Research"],
    ["نیازسنجی، بازارسنجی و آزمایش مستمر", "Needs discovery, market validation, and continuous testing"],
    ["OKR و سنجه‌ها", "OKRs & Metrics"],
    ["Objectiveها، Key Resultها، مایل‌استون‌ها و Gateهای تصمیم", "Objectives, Key Results, milestones, and decision gates"],
    ["رودمپ شش‌ماهه", "Six-Month Roadmap"],
    ["اجرا", "Execution"],
    ["فازها، خروجی‌ها و تصویر بلندمدت", "Phases, outputs, and the long-term direction"],
    ["نقشه‌ی سند", "Document Map"],
    ["مسیر Gravitas در ده فصل", "The Gravitas Roadmap in Ten Chapters"],
    ["سند از تعریف هویت شروع می‌شود، از رسانه، محصول و مدل درآمد عبور می‌کند و به تحقیق، OKR و برنامه‌ی اجرایی می‌رسد.", "The document begins with identity, moves through media, product, and revenue, and ends with research, OKRs, and execution."],
    ["ساختار پروژه", S.projectStructure],
    ["خروجی این فاز", S.phaseOutput],
    ["۱۰ فصل", "10 chapters"],
    ["رسانه + محصول + جامعه", "Media + Product + Community"],
    ["تحقیق + OKR + اجرا", "Research + OKR + Execution"],
    ["کلیدهای جهت‌نما برای حرکت", S.arrowHelp],
    ["اسکرول و Swipe فعال است", S.swipeHelp],
    ["نظرها", S.comments],
    ["فهرست سند", S.index],
    ["فهرست کامل", S.fullIndex],
    ["بخش‌ها", S.sections],
    ["قبلی", S.previous],
    ["بعدی", S.next],
    ["نظرها و بازخوردها", S.commentsTitle],
    ["انتخاب بخش", S.chooseSection],
    ["منوی اصلی", S.mainMenu],
    ["از کدام بخش شروع کنیم؟", S.menuTitle],
    ["هر فصل یک بخش مستقل از برنامه‌ی Gravitas است. مستقیم وارد موضوع موردنظر شوید یا سند را از ابتدا ورق بزنید.", S.menuLead],
    ["مشاهده‌ی نمونه", S.viewExample]
  ]);

  const attributeMap = new Map([
    ["رفتن به جلد", "Go to cover"],
    ["رفتن به منوی بخش‌ها", S.goMenu],
    ["نمایش بخش‌های سند", S.menuAria],
    ["چاپ یا ذخیره به‌صورت PDF", S.print],
    ["نسخه‌ی چاپی", S.printTitle],
    ["بستن فهرست", S.closeIndex],
    ["بستن بخش نظرها", S.closeComments],
    ["فصل‌های سند", S.chaptersLabel],
    ["کنترل اسلایدها", S.slideControls],
    ["اسلاید قبلی", S.previousAria],
    ["اسلاید بعدی", S.nextAria],
    ["لوگوی Gravitas", S.logoAlt],
    ["ساختار پروژه", S.projectStructure]
  ]);

  let applying = false;

  function translateText(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    if (exact.has(trimmed)) return text.replace(trimmed, exact.get(trimmed));

    let match = trimmed.match(/^(\d+)\s*فصل$/);
    if (match) return text.replace(trimmed, `${match[1]} chapters`);

    match = trimmed.match(/^(\d+)\s*اسلاید$/);
    if (match) return text.replace(trimmed, `${match[1]} ${Number(match[1]) === 1 ? S.slide : S.slides}`);

    return text;
  }

  function translateNode(root = document) {
    if (applying) return;
    applying = true;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const next = translateText(node.nodeValue || "");
      if (next !== node.nodeValue) node.nodeValue = next;
    });

    const elements = root.querySelectorAll ? root.querySelectorAll("[aria-label], [title], img[alt]") : [];
    elements.forEach(el => {
      ["aria-label", "title", "alt"].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const current = el.getAttribute(attr);
        if (attributeMap.has(current)) el.setAttribute(attr, attributeMap.get(current));
      });
    });

    const commentsIntro = document.querySelector(".comments-intro p");
    if (commentsIntro && /[\u0600-\u06ff]/.test(commentsIntro.textContent)) commentsIntro.textContent = S.commentsIntro;

    const fallback = document.querySelector(".comments-fallback");
    if (fallback && /[\u0600-\u06ff]/.test(fallback.textContent)) {
      const link = fallback.querySelector("a");
      if (link) {
        link.textContent = S.commentsFallbackLink;
        fallback.replaceChildren(document.createTextNode(S.commentsFallbackBefore), link, document.createTextNode(S.commentsFallbackAfter));
      }
    }

    applying = false;
  }

  translateNode(document);

  const observer = new MutationObserver(mutations => {
    if (applying) return;
    mutations.forEach(mutation => {
      if (mutation.type === "characterData") translateNode(mutation.target.parentElement || document);
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) translateNode(node);
        else if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateNode(node.parentElement);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "title", "alt"] });
  window.addEventListener("hashchange", () => requestAnimationFrame(() => translateNode(document)));
})();