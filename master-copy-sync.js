(() => {
  "use strict";

  const VERSION = "20260827-1";

  const allSlides = () => [...document.querySelectorAll("#deck .slide")];
  const titleOf = slide => slide?.querySelector("h1, h2")?.textContent.trim() || "";
  const findSlide = (...titles) => allSlides().find(slide => titles.includes(titleOf(slide)));

  function setText(el, value) {
    if (el && typeof value === "string") el.textContent = value;
  }

  function setCopyParagraphs(slide, values) {
    if (!slide || !Array.isArray(values)) return;
    const paragraphs = [...slide.querySelectorAll(".copy p")];
    values.forEach((value, index) => {
      const paragraph = paragraphs[index];
      if (!paragraph) return;
      const marker = paragraph.querySelector(".copy-index");
      if (marker) {
        let node = marker.nextSibling;
        if (!node || node.nodeType !== Node.TEXT_NODE) {
          node = document.createTextNode("");
          marker.after(node);
        }
        node.nodeValue = value;
        [...paragraph.childNodes].forEach(child => {
          if (child !== marker && child !== node) child.remove();
        });
      } else {
        paragraph.textContent = value;
      }
    });
  }

  function setQuestionList(slide, values) {
    const list = slide?.querySelector(".question-list");
    if (!list || !Array.isArray(values) || !values.length) return;
    let items = [...list.querySelectorAll(":scope > li")];
    const template = items[0]?.cloneNode(true);
    while (items.length < values.length && template) {
      list.appendChild(template.cloneNode(true));
      items = [...list.querySelectorAll(":scope > li")];
    }
    while (items.length > values.length) {
      items.pop()?.remove();
    }
    items = [...list.querySelectorAll(":scope > li")];
    items.forEach((item, index) => {
      setText(item.querySelector(":scope > span"), String(index + 1).padStart(2, "0"));
      setText(item.querySelector("p"), values[index]);
    });
  }

  function setBulletList(slide, values) {
    const list = slide?.querySelector(".bullet-list");
    if (!list || !Array.isArray(values) || !values.length) return;
    let items = [...list.querySelectorAll(":scope > li")];
    const template = items[0]?.cloneNode(true);
    while (items.length < values.length && template) {
      list.appendChild(template.cloneNode(true));
      items = [...list.querySelectorAll(":scope > li")];
    }
    while (items.length > values.length) items.pop()?.remove();
    items = [...list.querySelectorAll(":scope > li")];
    items.forEach((item, index) => setText(item.querySelector("span"), values[index]));
  }

  function card(slide, title) {
    return [...(slide?.querySelectorAll(".card") || [])].find(item => item.querySelector("h3")?.textContent.trim() === title);
  }

  function addCard(slide, afterTitle, title, text, icon = "reach") {
    const grid = slide?.querySelector(".cards");
    if (!grid || card(slide, title)) return;
    const after = card(slide, afterTitle);
    const template = after || grid.querySelector(".card");
    if (!template) return;
    const next = template.cloneNode(true);
    setText(next.querySelector("h3"), title);
    setText(next.querySelector("p"), text);
    const use = next.querySelector("use");
    if (use) use.setAttribute("href", `#i-${icon}`);
    const indexNode = next.querySelector(".card__index");
    const position = [...grid.querySelectorAll(".card")].indexOf(after) + 2;
    if (indexNode) indexNode.textContent = String(Math.max(1, position)).padStart(2, "0");
    if (after?.nextSibling) grid.insertBefore(next, after.nextSibling);
    else grid.appendChild(next);
    [...grid.querySelectorAll(".card__index")].forEach((node, index) => node.textContent = String(index + 1).padStart(2, "0"));
  }

  function replaceExact(root, replacements) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const raw = node.nodeValue || "";
      const trimmed = raw.trim();
      if (!trimmed || !Object.prototype.hasOwnProperty.call(replacements, trimmed)) return;
      node.nodeValue = raw.replace(trimmed, replacements[trimmed]);
    });
  }

  function patchEnglish() {
    const cover = findSlide("GRAVITAS");
    if (cover) {
      setText(cover.querySelector(".cover-lead"), "An initial roadmap for building an AI & STEM media platform, laboratory, and community");
      const chips = [...cover.querySelectorAll(".meta-row span")];
      const scope = chips.find(node => node.textContent.trim() === "Science × Philosophy × Society");
      if (scope) scope.textContent = "AI × STEM × Philosophy × Society";
      setText(cover.querySelector(".cover-note"), "English is the primary content language; other-language editions are added based on audience, topic, and production capacity. Scope tags show the channels, subjects, and participation modes connected to each roadmap element.");
    }

    const central = findSlide("Curiosity and empowerment are the starting point for Gravitas.", "Curiosity and empowerment are the starting points in Gravitas.");
    if (central) {
      setText(central.querySelector("h2"), "Curiosity and empowerment are the starting points in Gravitas.");
      setCopyParagraphs(central, [
        "Gravitas is built for people who always have questions—people who want to understand how science and technology work, how they change the world, and how they are shaped in return by society, philosophy, politics, economics and how AI can affect or help in all of these. They might be ordinary people who want to know more about these topics, or professional researchers and practitioners in STEM fields who want to deepen their understanding and improve their skills.",
        "Empowerment is central to this path. The audience should acquire the tools, language, and confidence to ask better questions, test and implement ideas, build their own learning path, and participate in discussions or perform deep research.",
        "YouTube, the website, social platforms, courses, and games are parts of this journey. The center of gravity is the community that gradually forms around Gravitas."
      ]);
    }

    const questions = findSlide("From tools to real questions");
    setQuestionList(questions, [
      "How can AI really boost scientific research and education?",
      "Where does AI truly improve research productivity, and where does it only create an illusion of speed?",
      "Will the researcher of the future look more like a scientist or a manager of machines?",
      "Will AI democratize science, or widen the gap between universities and countries?",
      "Can artificial intelligence generate scientific hypotheses?",
      "If a model reaches a result that humans cannot explain, are we still doing science?"
    ]);

    const longForm = findSlide("One Idea, One World");
    if (longForm) {
      setText(longForm.querySelector(".lead"), "Narrative long-form videos, typically 8–20 minutes, are built around a scientific concept, theory, problem, research tool, or AI application—the primary format for deep storytelling; Shorts provide a complementary discovery format.");
      setBulletList(longForm, [
        "Is AI reliable to answer our scientific questions?",
        "Why do physicists still disagree about time?",
        "Is the universe actually computable?",
        "What changed when computers entered physics?",
        "Can a machine truly discover something?",
        "Why do beautiful theories sometimes turn out to be wrong?"
      ]);
    }

    const making = findSlide("Science in the Making", "AI & STEM in the Making");
    if (making) setText(making.querySelector("h2"), "AI & STEM in the Making");

    const upClose = findSlide("Up Close");
    if (upClose) {
      setBulletList(upClose, [
        "When was the last time one of your hypotheses turned out to be completely wrong?",
        "Which part of research is far more tedious than the public imagines?",
        "Have you ever reached a result you could not explain yourself?",
        "What does university fail to tell people about science?",
        "How are you using AI & ML in your research and how much do you rely on them?"
      ]);
    }

    const website = findSlide("Where Gravitas goes deeper");
    if (website) setText(website.querySelector(".section-lead"), "The website is the center for in-depth content, courses, experiences, membership, and the continuation of every topic.");

    const spaces = findSlide("Six Core Spaces");
    const magazine = card(spaces, "Magazine");
    if (magazine) setText(magazine.querySelector("p"), "Narrative, analytical, and specialist articles on science, philosophy, society and AI.");

    const community = findSlide("Watching is not the only role");
    if (community) setText(community.querySelector(".slide-footer"), "Roles such as reader, commenter, reviewer, author, researcher, translator, critic (reviews arguments and ideas), builder (creates games, tools, or experiments), and host (facilitates discussions or events) can make participation more visible and meaningful.");

    const platforms = findSlide("Every platform has a job");
    addCard(platforms, "YouTube", "TikTok and other platforms (?)", "Additional platform-native distribution can be tested selectively based on audience behavior and format fit.", "reach");

    const revenue = findSlide("Six complementary revenue streams");
    const institutional = card(revenue, "Institutional support");
    if (institutional) setText(institutional.querySelector("p"), "Foundations, universities, scientific societies, science centers, and educational institutions support dossiers, games, translation, or science-communication projects. This stream can also include scientific cloud space and AI/ML tools for researchers and universities.");

    const centralQuestion = findSlide("The central question for the first three months");
    if (centralQuestion) {
      setCopyParagraphs(centralQuestion, [
        "Will the audience move from watching a scientific story to taking a scientific action?",
        "That action could be checking a source, testing a hypothesis, recording data, critiquing an argument, joining a discussion, using space and tools, or contributing to a project."
      ]);
      setText(centralQuestion.querySelector("blockquote"), "Gravitas becomes truly differentiated when people do not only know more—they can ask better questions, test and implement ideas, and contribute.");
    }

    const known = findSlide("Do not confuse what we know with what we assume");
    const desk = card(known, "What desk research shows");
    if (desk) setText(desk.querySelector("p"), "English-language AI & STEM media is competitive, and strong examples already exist in storytelling, depth, interaction, citizen science, and physical products.");

    replaceExact(document, {
      "Curiosity and empowerment are the starting point for Gravitas.": "Curiosity and empowerment are the starting points in Gravitas.",
      "Science in the Making": "AI & STEM in the Making",
      "Interactive experiences and a signature Gravitas format": "Interactive experiences and a signature Gravitas format. Games live inside the website’s Interactive Lab, while strong concepts can also become standalone shareable experiences.",
      "Roles such as reader, researcher, translator, critic, builder, and host can make participation more visible and meaningful.": "Roles such as reader, commenter, reviewer, author, researcher, translator, critic (reviews arguments and ideas), builder (creates games, tools, or experiments), and host (facilitates discussions or events) can make participation more visible and meaningful.",
      "Four outcomes that must be proven by the end of month six": "Four objectives that must be proven by the end of month six"
    });

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = "The Gravitas development roadmap: AI & STEM media, research tools, website, games, learning, and community.";
  }

  function patchPersian() {
    const cover = findSlide("GRAVITAS");
    if (cover) {
      setText(cover.querySelector(".cover-lead"), "طرح اولیه‌ی توسعه‌ی یک پلتفرم رسانه‌ای، آزمایشگاه و جامعه‌ی AI و STEM");
      const chips = [...cover.querySelectorAll(".meta-row span")];
      const scope = chips.find(node => node.textContent.trim() === "Science × Philosophy × Society");
      if (scope) scope.textContent = "AI × STEM × Philosophy × Society";
      setText(cover.querySelector(".cover-note"), "زبان پایه‌ی محتوا انگلیسی است؛ نسخه‌های زبان‌های دیگر متناسب با مخاطب، موضوع و ظرفیت تولید اضافه می‌شوند. برچسب‌ها کانال‌ها، موضوعات و شیوه‌های مشارکت مرتبط با هر بخش رودمپ را نشان می‌دهند.");
    }

    const central = findSlide("کنجکاوی و توانمندسازی آدم‌ها، نقطه‌ی شروع Gravitas است.", "کنجکاوی و توانمندسازی آدم‌ها، نقاط شروع Gravitas هستند.");
    if (central) {
      setText(central.querySelector("h2"), "کنجکاوی و توانمندسازی آدم‌ها، نقاط شروع Gravitas هستند.");
      setCopyParagraphs(central, [
        "Gravitas برای آدم‌هایی ساخته می‌شود که همیشه سؤال دارند؛ آدم‌هایی که می‌خواهند بفهمند علم و فناوری چگونه کار می‌کنند، چگونه جهان را تغییر می‌دهند و در مقابل چگونه از جامعه، فلسفه، سیاست و اقتصاد اثر می‌گیرند و AI چگونه می‌تواند بر همه‌ی این حوزه‌ها اثر بگذارد یا کمک کند. این مخاطبان می‌توانند افراد عادیِ کنجکاو یا پژوهشگران و متخصصان حوزه‌های STEM باشند که می‌خواهند درک و مهارت‌هایشان را عمیق‌تر کنند.",
        "توانمندسازی بخش اصلی این مسیر است. مخاطب باید ابزار، زبان و اعتماد لازم را به دست بیاورد تا بهتر سؤال بپرسد، ایده‌ها را آزمایش و پیاده‌سازی کند، مسیر یادگیری خودش را بسازد و در گفت‌وگوها یا پژوهش عمیق مشارکت کند.",
        "یوتیوب، وب‌سایت، شبکه‌های اجتماعی، دوره‌ها و بازی‌ها اجزای این مسیرند. مرکز ثقل پروژه، جامعه‌ای است که به‌مرور دور Gravitas شکل می‌گیرد."
      ]);
    }

    const questions = findSlide("از ابزار تا مسئله");
    setQuestionList(questions, [
      "AI واقعاً چگونه می‌تواند پژوهش و آموزش علمی را تقویت کند؟",
      "AI کجای فرایند پژوهش واقعاً بهره‌وری می‌سازد و کجا فقط توهم سرعت ایجاد می‌کند؟",
      "پژوهشگر آینده بیشتر شبیه دانشمند خواهد بود یا مدیر مجموعه‌ای از ماشین‌ها؟",
      "آیا هوش مصنوعی علم را دموکراتیک‌تر می‌کند یا فاصله‌ی دانشگاه‌ها و کشورها را بیشتر؟",
      "آیا هوش مصنوعی می‌تواند فرضیه‌ی علمی تولید کند؟",
      "وقتی یک مدل به نتیجه‌ای می‌رسد که انسان نمی‌تواند توضیحش دهد، هنوز با علم روبه‌رو هستیم؟"
    ]);

    const longForm = findSlide("یک ایده، یک جهان");
    if (longForm) {
      setText(longForm.querySelector(".lead"), "ویدئوهای روایی بلند، معمولاً ۸ تا ۲۰ دقیقه‌ای، حول یک مفهوم، نظریه، مسئله‌ی علمی، ابزار پژوهشی یا کاربرد AI ساخته می‌شوند؛ فرمت اصلی برای روایت عمیق، در کنار Shorts به‌عنوان فرمت مکمل کشف مخاطب.");
      setBulletList(longForm, [
        "آیا AI برای پاسخ به پرسش‌های علمی ما قابل اتکاست؟",
        "چرا فیزیک‌دان‌ها هنوز درباره‌ی زمان توافق ندارند؟",
        "آیا جهان واقعاً قابل‌محاسبه است؟",
        "وقتی کامپیوترها وارد فیزیک شدند چه چیزی تغییر کرد؟",
        "آیا یک ماشین می‌تواند چیزی را کشف کند؟",
        "چرا بعضی نظریه‌های زیبا اشتباه از آب درمی‌آیند؟"
      ]);
    }

    const making = findSlide("علم در حال ساخته‌شدن است", "AI و STEM در حال ساخته‌شدن");
    if (making) setText(making.querySelector("h2"), "AI و STEM در حال ساخته‌شدن");

    const upClose = findSlide("از نزدیک");
    if (upClose) setBulletList(upClose, [
      "آخرین باری که یک فرضیه‌تان کاملاً اشتباه از آب درآمد چه زمانی بود؟",
      "کدام بخش پژوهش بسیار خسته‌کننده‌تر از تصور عموم است؟",
      "به نتیجه‌ای رسیده‌اید که خودتان هم نتوانید توضیحش دهید؟",
      "چه چیزی در دانشگاه درباره‌ی علم گفته نمی‌شود؟",
      "در پژوهش خود چطور از AI و ML استفاده می‌کنید و تا چه حد به آن‌ها متکی هستید؟"
    ]);

    const website = findSlide("جایی که Gravitas عمیق می‌شود");
    if (website) setText(website.querySelector(".section-lead"), "وب‌سایت مرکز محتوای عمیق، دوره‌ها، تجربه‌ها، عضویت و ادامه‌ی مسیر هر موضوع است.");

    const spaces = findSlide("شش فضای اصلی");
    const magazine = card(spaces, "مجله");
    if (magazine) setText(magazine.querySelector("p"), "مقاله‌های روایی، تحلیلی و تخصصی درباره‌ی علم، فلسفه، جامعه و AI.");

    const community = findSlide("تماشاچی تنها نقش موجود نیست");
    if (community) setText(community.querySelector(".slide-footer"), "نقش‌هایی مثل خواننده، کامنت‌گذار، داور، نویسنده، پژوهشگر، مترجم، منتقد (بررسی استدلال‌ها و ایده‌ها)، سازنده (ساخت بازی، ابزار یا آزمایش) و میزبان (هدایت گفت‌وگو یا رویداد) می‌توانند مشارکت را شفاف‌تر و معنادارتر کنند.");

    const platforms = findSlide("هر فضا، یک وظیفه");
    addCard(platforms, "YouTube", "TikTok و پلتفرم‌های دیگر (?)", "توزیع بومی در پلتفرم‌های دیگر می‌تواند به‌صورت انتخابی و بر اساس رفتار مخاطب و تناسب فرمت آزمایش شود.", "reach");

    const revenue = findSlide("شش مسیر درآمدی مکمل");
    const institutional = card(revenue, "حمایت نهادی");
    if (institutional) setText(institutional.querySelector("p"), "بنیادها، دانشگاه‌ها، انجمن‌های علمی، مراکز علم و نهادهای آموزشی از پرونده‌ها، بازی‌ها، ترجمه یا پروژه‌های ترویج علم حمایت می‌کنند. این مسیر می‌تواند فضای ابری علمی و ابزارهای AI/ML برای پژوهشگران و دانشگاه‌ها را هم شامل شود.");

    const centralQuestion = findSlide("سؤال اصلی سه ماه اول");
    if (centralQuestion) {
      setCopyParagraphs(centralQuestion, [
        "آیا مخاطب از تماشای یک روایت علمی به انجام یک کنش علمی حرکت می‌کند؟",
        "این کنش می‌تواند بررسی یک منبع، آزمودن یک فرضیه، ثبت داده، نقد یک استدلال، پیوستن به بحث، استفاده از فضا و ابزارها یا مشارکت در یک پروژه باشد."
      ]);
      setText(centralQuestion.querySelector("blockquote"), "Gravitas زمانی واقعاً متمایز می‌شود که آدم‌ها فقط بیشتر ندانند؛ بلکه بهتر سؤال بپرسند، ایده‌ها را آزمایش و پیاده‌سازی کنند و مشارکت داشته باشند.");
    }

    const known = findSlide("دانسته‌های فعلی را با فرضیه اشتباه نگیریم");
    const desk = card(known, "آنچه Desk Research نشان می‌دهد") || card(known, "آنچه پژوهش اولیه نشان می‌دهد");
    if (desk) setText(desk.querySelector("p"), "رسانه‌های انگلیسی‌زبان AI و STEM رقابتی‌اند و نمونه‌های قوی در روایت، عمق، تعامل، علم مشارکتی و محصولات فیزیکی وجود دارند.");

    replaceExact(document, {
      "کنجکاوی و توانمندسازی آدم‌ها، نقطه‌ی شروع Gravitas است.": "کنجکاوی و توانمندسازی آدم‌ها، نقاط شروع Gravitas هستند.",
      "علم در حال ساخته‌شدن است": "AI و STEM در حال ساخته‌شدن",
      "تجربه‌های تعاملی و امضای Gravitas": "تجربه‌های تعاملی و امضای Gravitas؛ بازی‌ها در Interactive Lab وب‌سایت زندگی می‌کنند و ایده‌های قوی می‌توانند به تجربه‌های مستقل و قابل‌اشتراک تبدیل شوند.",
      "چهار نتیجه‌ای که باید تا پایان ماه ششم ثابت شوند": "چهار هدفی که باید تا پایان ماه ششم ثابت شوند"
    });
  }

  function apply() {
    if (!document.getElementById("deck")) return;
    const lang = document.documentElement.lang === "fa" ? "fa" : "en";
    if (lang === "fa") patchPersian();
    else patchEnglish();
    document.body.dataset.masterCopyVersion = VERSION;
  }

  setTimeout(apply, 0);
  setTimeout(apply, 250);
  setTimeout(apply, 1000);
  window.addEventListener("hashchange", () => setTimeout(apply, 0));
})();
