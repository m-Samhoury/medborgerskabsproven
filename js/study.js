// Læs: the material topic by topic (chips on phones, sidebar on desktop), with the confusable-facts tables.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var biQA = MBP.ui.biQA;
  var withBook = MBP.ui.withBook;

  // West to east, for the Farvandene strait strip.
  var STRAIT = [
    ["land", "Jylland", "Jutland"], ["water", "Lillebælt", "Little Belt"],
    ["land", "Fyn", "Funen"], ["water", "Storebælt", "Great Belt"],
    ["land", "Sjælland", "Zealand"], ["water", "Øresund", "the Sound"],
    ["land", "Sverige", "Sweden"]
  ];

  var chipLinks = {};
  var sideRows = {};
  var chipBar = null;
  var activeId = null;

  MBP.ui.initShell();
  MBP.ui.start(init);

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("Læs stoffet", "Study the material", "h1"));
    main.appendChild(bi("10 emner. De mest stillede står først.", "10 topics. The most-asked come first.", "p"));

    // Phone: sticky chip bar. Desktop: sidebar. Both link to the same topic sections.
    var chips = h("nav", { class: "chips", "aria-label": "Emner – Topics" });
    D.topics.forEach(function (t) {
      var link = h("a", { class: "chip-link", href: "#" + t.id }, MBP.ui.topicChip(t));
      chipLinks[t.id] = link;
      chips.appendChild(link);
    });
    chips.appendChild(h("a", { class: "chip-link chip-neutral", href: "#tabeller" }, "Alle tabeller"));
    main.appendChild(chips);
    chipBar = chips;

    var side = h("aside", { class: "side", "aria-label": "Emner – Topics" });
    D.topics.forEach(function (t) {
      var row = h("a", { class: "side-row topic-scope", href: "#" + t.id, style: "--c: var(--t-" + t.id + ")" },
        MBP.ui.stamp(t, MBP.ui.topicProgress(D, t), { mini: true }),
        h("span", { class: "side-text" },
          h("span", { class: "side-name" }, t.title_da),
          h("span", { class: "side-count" }, t.cluster_ids.length + " emner")));
      sideRows[t.id] = row;
      side.appendChild(row);
    });
    side.appendChild(filterControl("freq-side"));
    side.appendChild(h("a", { class: "side-link", href: "#tabeller" }, "Alle tabeller"));

    var content = h("div", { class: "study-content" });
    content.appendChild(filterControl("freq-only"));
    D.topics.forEach(function (t) {
      content.appendChild(topicSection(D, t));
    });

    var tables = h("section", { id: "tabeller", class: "study-section" });
    tables.appendChild(bi("Alle oversigtstabeller", "All overview tables", "h2"));
    D.groups.forEach(function (g) {
      tables.appendChild(groupBlock(D, g, null));
    });
    content.appendChild(tables);

    main.appendChild(h("div", { class: "study" }, side, content));

    watchTopics(D);

    // Scroll to the hash, now that the content exists.
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  // The "only frequently asked" switch. Every switch on the page is kept in step.
  function filterControl(id) {
    var box = h("input", { type: "checkbox", class: "switch", id: id });
    box.addEventListener("change", function () {
      setFrequentOnly(box.checked);
    });
    return h("label", { class: "filter", for: id }, box,
      MBP.icon("star", 16),
      bi("Vis kun ofte stillede", "Show only frequently asked", "span"));
  }

  function setFrequentOnly(on) {
    document.getElementById("main").classList.toggle("only-frequent", on);
    document.querySelectorAll("input.switch").forEach(function (input) {
      input.checked = on;
    });
  }

  // Highlights the topic in view in the chip bar and the sidebar.
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    Object.keys(chipLinks).forEach(function (key) {
      var on = key === id;
      chipLinks[key].classList.toggle("active", on);
      sideRows[key].classList.toggle("active", on);
    });
    // Scroll only the chip bar sideways. scrollIntoView would also scroll the page.
    var link = chipLinks[id];
    if (link && chipBar) {
      var left = link.offsetLeft - (chipBar.clientWidth - link.offsetWidth) / 2;
      chipBar.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }

  // Highlights the topic whose section has reached 40% down the screen.
  function watchTopics(D) {
    var sections = D.topics
      .map(function (t) { return document.getElementById(t.id); })
      .filter(Boolean);
    var queued = false;
    function update() {
      queued = false;
      var line = window.innerHeight * 0.4;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) current = s;
      });
      if (current) setActive(current.id);
    }
    window.addEventListener("scroll", function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // One topic: header band, intro, changes, the facts, the fact groups and the end bar.
  function topicSection(D, t) {
    var progress = MBP.ui.topicProgress(D, t);
    var section = h("section", { id: t.id, class: "topic topic-scope", style: "--c: var(--t-" + t.id + ")" });

    section.appendChild(h("div", { class: "topic-head" },
      MBP.ui.stamp(t, progress, {}),
      h("div", null,
        bi(t.title_da, t.title_en, "h2"),
        bi(
          t.cluster_ids.length + " emner, " + t.question_count + " spørgsmål. " + progress.mastered + " mærker samlet.",
          t.cluster_ids.length + " items, " + t.question_count + " questions. " + progress.mastered + " stamps collected.",
          "p"))));

    t.intro.forEach(function (p) {
      section.appendChild(withBook(bi(p.da, p.en, "p"), p.book));
      if (p.nobook_da) section.appendChild(MBP.ui.nobookNote(p.nobook_da, p.nobook_en));
    });

    t.current_facts.forEach(function (cf) {
      section.appendChild(MBP.ui.note("changed", "Ændret siden prøven", "Changed since the exam", cf.da, cf.en, cf.book));
      if (cf.nobook_da) section.appendChild(MBP.ui.nobookNote(cf.nobook_da, cf.nobook_en));
    });

    section.appendChild(bi("Det skal du huske", "What to remember", "h3"));
    var facts = h("ul", { class: "facts" });
    t.cluster_ids.forEach(function (id) {
      var c = D.cById.get(id);
      if (c) facts.appendChild(factRow(c));
    });
    section.appendChild(facts);

    var groups = t.fact_group_ids.map(function (gid) { return D.gById.get(gid); }).filter(Boolean);
    if (groups.length) {
      section.appendChild(bi("Lær sammen", "Learn together", "h3"));
      groups.forEach(function (g) {
        section.appendChild(groupBlock(D, g, t.id));
      });
    }

    // Topic-level "Mere fra bogen": book text no single fact covers (closed by default).
    var topicMore = MBP.ui.moreBlock(MBP.ui.moreFor(t.id));
    if (topicMore) section.appendChild(topicMore);

    section.appendChild(endBar(t));
    return section;
  }

  // One fact row: face value (and postmark when mastered), the fact, its questions and the notes.
  function factRow(c) {
    var side = [MBP.ui.faceValue(c.times_asked)];
    if (MBP.store.isMastered(c.id)) {
      var mark = MBP.ui.postmark("check", "fact-check");
      side.push(h("span", { class: "fact-mastered", role: "img", title: "Mestret – Mastered", "aria-label": "Mestret – Mastered" }, mark));
    }

    var qa = h("details", { class: "qa" },
      h("summary", null,
        MBP.icon("next", 16),
        bi("Spørgsmål og svar (" + c.variants.length + ")", "Questions and answers", "span")),
      h("div", { class: "qa-body" }, c.variants.map(function (v) {
        return h("div", { class: "qa-item" },
          biQA(v.question_da, v.question_en, v.answer_da, v.answer_en, "div"),
          h("p", { class: "ids" }, v.question_ids.join(", ")));
      })));

    var body = h("div", { class: "fact-body" },
      c.frequent ? h("span", { class: "pill-freq", title: "Frequently asked – asked in 4+ exams" }, MBP.icon("star", 13), "Ofte stillet") : null,
      withBook(bi(c.fact_da, c.fact_en, "p"), c.book, MBP.ui.moreFor(c.id)),
      qa,
      MBP.ui.noteBoxes(c));

    return h("li", { class: c.frequent ? "fact-row freq" : "fact-row" },
      h("div", { class: "fact-side" }, side),
      body);
  }

  // A fact group: the table of confusable facts, the Farvandene strip for fg-farvande, and the mnemonic.
  // prefix is the topic id inside a topic section; null in the all-tables section (then the block gets the group id).
  function groupBlock(D, g, prefix) {
    var first = D.tById.get(g.topic_ids[0]);
    var base = prefix ? prefix + "-" + g.id : g.id;
    var titleId = base + "-t";
    var attrs = { class: "fg topic-scope", style: "--c: var(--t-" + g.topic_ids[0] + ")" };
    if (!prefix) attrs.id = g.id;

    var kids = [
      h("div", { class: "fg-head" },
        first ? MBP.ui.topicChip(first) : null,
        h("h4", { class: "fg-title", id: titleId }, g.title_da, h("span", { class: "en", lang: "en" }, g.title_en)),
        MBP.ui.withBook(h("span", { class: "fg-book" }, h("span", { class: "da" })), g.book, MBP.ui.moreFor(g.id)))
    ];

    if (g.id === "fg-farvande") {
      kids.push(h("ol", { class: "strait", "aria-label": "Fra vest mod øst – West to east" },
        STRAIT.map(function (s) {
          return h("li", { class: s[0] === "land" ? "strait-land" : "strait-water" }, bi(s[1], s[2], "span"));
        })));
      kids.push(bi(
        "Kattegat ligger nord for – det er kun en distraktor.",
        "Kattegat lies to the north – it is only a distractor.",
        "p"));
    }

    var stack = g.columns_da.length >= 3;
    var thead = h("thead", { class: stack ? "sr" : null },
      h("tr", null, g.columns_da.map(function (c, i) {
        return h("th", { scope: "col" }, bi(c, g.columns_en[i], "span"));
      })));
    var rows = g.rows.map(function (r) {
      return h("tr", null, r.cells_da.map(function (c, i) {
        if (i === 0) return h("th", { scope: "row" }, bi(c, r.cells_en[i], "span"));
        return h("td", { "data-label": g.columns_da[i] }, bi(c, r.cells_en[i], "span"));
      }));
    });
    kids.push(h("div", { class: "table-wrap" },
      h("table", { class: "fg-table" + (stack ? " fg-stack" : ""), "aria-labelledby": titleId },
        thead,
        h("tbody", null, rows))));

    if (g.nobook_da) kids.push(MBP.ui.nobookNote(g.nobook_da, g.nobook_en));
    kids.push(MBP.ui.note("remember", "Husk", "Remember", g.mnemonic_da, g.mnemonic_en));

    return h("div", attrs, kids);
  }

  // The bar at the end of a topic: practise it, and mark it as read (also when the end is reached).
  function endBar(t) {
    var studiedBtn = h("button", { type: "button", class: "btn btn-secondary", title: "Mark as read" });
    function paintStudied() {
      var done = MBP.store.isStudied(t.id);
      studiedBtn.textContent = "";
      if (done) {
        studiedBtn.appendChild(MBP.icon("check", 18));
        studiedBtn.appendChild(document.createTextNode("Læst"));
      } else {
        studiedBtn.appendChild(document.createTextNode("Markér som læst"));
      }
      studiedBtn.disabled = done;
    }
    studiedBtn.addEventListener("click", function () {
      MBP.store.setStudied(t.id);
      paintStudied();
    });
    paintStudied();

    var bar = h("div", { class: "topic-end" },
      h("a", {
        class: "btn btn-primary",
        href: "learn.html?topic=" + t.id,
        title: "Practise this topic",
        style: "background: var(--c); color: #fff"
      }, "Øv dette emne"),
      studiedBtn);

    // Reaching the end of the topic counts as studied.
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          if (!MBP.store.isStudied(t.id)) {
            MBP.store.setStudied(t.id);
            paintStudied();
          }
          observer.disconnect();
        }
      });
      observer.observe(bar);
    }
    return bar;
  }
})();
