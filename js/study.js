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
  var sideEl = null;
  var activeId = null;

  MBP.ui.initShell();
  MBP.ui.start(init);

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("Læs stoffet", "Study the material", "h1"));
    main.appendChild(bi("Bogens 26 fakta-ark, i samme rækkefølge. I hvert ark står de mest stillede spørgsmål først.", "The book's 26 fact sheets, in the same order. In each sheet, the most-asked questions come first.", "p"));

    // Phone: sticky chip bar. Desktop: sidebar. Both are tabs: each links to one topic, or to the overview tables.
    var chips = h("nav", { class: "chips", "aria-label": "Fakta-ark – Fact sheets" });
    D.topics.forEach(function (t) {
      var link = h("a", { class: "chip-link", href: "#" + t.id }, MBP.ui.topicChip(t));
      chipLinks[t.id] = link;
      chips.appendChild(link);
    });
    var chipTables = h("a", { class: "chip-link chip-neutral", href: "#tabeller" }, "Alle tabeller");
    chipLinks.tabeller = chipTables;
    chips.appendChild(chipTables);
    main.appendChild(chips);
    chipBar = chips;

    var side = h("aside", { class: "side", "aria-label": "Fakta-ark – Fact sheets" });
    sideEl = side;
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
    var sideTables = h("a", { class: "side-link", href: "#tabeller" }, "Alle tabeller");
    sideRows.tabeller = sideTables;
    side.appendChild(sideTables);

    var content = h("div", { class: "study-content" });
    content.appendChild(filterControl("freq-only"));
    main.appendChild(h("div", { class: "study" }, side, content));

    // A tab's section is built the first time it is selected, then kept. Until then it is not in the DOM.
    // Built sections are placed in topic order, with the overview tables last.
    var order = D.topics.map(function (t) { return t.id; }).concat(["tabeller"]);
    var built = {};
    function place(key, el) {
      for (var j = order.indexOf(key) + 1; j < order.length; j++) {
        if (built[order[j]]) {
          content.insertBefore(el, built[order[j]]);
          return;
        }
      }
      content.appendChild(el);
    }
    function ensureBuilt(key) {
      if (built[key]) return;
      var el = key === "tabeller" ? tablesSection(D) : topicSection(D, D.tById.get(key));
      el.hidden = true;
      built[key] = el;
      place(key, el);
    }

    // The tab a hash selects: a topic, the tables, or the tables at one fact group. No (or another) hash: the first topic.
    function selection() {
      var raw = location.hash.slice(1);
      try { raw = decodeURIComponent(raw); } catch (e) { /* keep the raw text */ }
      var slash = raw.indexOf("/");
      if (slash !== -1) {
        var sid = raw.slice(0, slash), cid = raw.slice(slash + 1);
        var st = D.tById.get(sid);
        if (st && st.cluster_ids.indexOf(cid) !== -1) return { key: sid, cluster: cid };
        if (st) return { key: sid };
      }
      if (D.tById.has(raw)) return { key: raw };
      if (raw === "tabeller") return { key: "tabeller" };
      if (D.gById.has(raw)) return { key: "tabeller", group: raw };
      return { key: D.topics[0].id };
    }

    // Shows the selected tab. userSwitch: a click or the back button, so the content top comes into view.
    function show(userSwitch) {
      var sel = selection();
      ensureBuilt(sel.key);
      order.forEach(function (key) {
        if (built[key]) built[key].hidden = key !== sel.key;
      });
      setActive(sel.key);
      if (sel.cluster) {
        focusFact(D, sel.key, sel.cluster);
      } else if (sel.group) {
        var group = document.getElementById(sel.group);
        if (group) group.scrollIntoView();
      } else if (userSwitch) {
        // The chip bar is sticky on phones: put it at the top of the view. On desktop, the sidebar's row is the top.
        var anchor = chipBar.offsetParent ? chipBar : side.parentNode;
        anchor.scrollIntoView({ block: "start" });
      }
    }

    window.addEventListener("hashchange", function () { show(true); });
    show(false);
  }

  // A deep link to one fact (#sheet/cluster): show all questions if the filter hides it, then centre the
  // fact, move focus to it (without scrolling again) and flash it briefly.
  function focusFact(D, sheetId, clusterId) {
    var row = document.getElementById(sheetId + "--" + clusterId);
    if (!row) return;
    var c = D.cById.get(clusterId);
    if (c && !c.frequent && document.getElementById("main").classList.contains("only-frequent")) {
      setFrequentOnly(false);
      MBP.ui.toast("Viser alle spørgsmål", "Showing all questions");
    }
    row.scrollIntoView({ block: "center" });
    row.focus({ preventScroll: true });
    row.classList.remove("flash");
    void row.offsetWidth;
    row.classList.add("flash");
    var done = function () { row.classList.remove("flash"); };
    row.addEventListener("animationend", done, { once: true });
    setTimeout(done, 1800);
  }

  // The overview tables: every fact group once, under the heading.
  function tablesSection(D) {
    var tables = h("section", { id: "tabeller", class: "study-section" });
    tables.appendChild(bi("Alle oversigtstabeller", "All overview tables", "h2"));
    D.groups.forEach(function (g) {
      tables.appendChild(groupBlock(D, g, null));
    });
    return tables;
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

  // Marks the selected tab in the chip bar and the sidebar, and keeps its chip in view on the phone bar.
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    Object.keys(chipLinks).forEach(function (key) {
      var on = key === id;
      [chipLinks[key], sideRows[key]].forEach(function (el) {
        el.classList.toggle("active", on);
        if (on) el.setAttribute("aria-current", "true");
        else el.removeAttribute("aria-current");
      });
    });
    // Keep the active sidebar row visible inside the sidebar only (scrollIntoView would move the page).
    var row = sideRows[id];
    if (row && sideEl && sideEl.scrollHeight > sideEl.clientHeight) {
      var top = row.offsetTop - sideEl.offsetTop;
      if (top < sideEl.scrollTop || top + row.offsetHeight > sideEl.scrollTop + sideEl.clientHeight) {
        sideEl.scrollTop = Math.max(0, top - 8);
      }
    }
    // Scroll only the chip bar sideways. scrollIntoView would also scroll the page.
    var link = chipLinks[id];
    if (link && chipBar) {
      var left = link.offsetLeft - (chipBar.clientWidth - link.offsetWidth) / 2;
      chipBar.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }

  // One topic: header band, intro, changes, the facts, the fact groups and the end bar.
  function topicSection(D, t) {
    var progress = MBP.ui.topicProgress(D, t);
    var section = h("section", { id: t.id, class: "topic topic-scope", style: "--c: var(--t-" + t.id + ")" });

    section.appendChild(h("div", { class: "topic-head" },
      MBP.ui.stamp(t, progress, {}),
      h("div", null,
        bi("Fakta-ark " + t.sheet + " · " + t.title_da, "Fact sheet " + t.sheet + " · " + t.title_en, "h2"),
        bi(
          t.cluster_ids.length + " emner, " + t.question_count + " spørgsmål. " + progress.mastered + " mærker samlet.",
          t.cluster_ids.length + " items, " + t.question_count + " questions. " + progress.mastered + " stamps collected.",
          "p"))));

    t.intro.forEach(function (p) {
      section.appendChild(withBook(introBi(p), p.book));
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
      if (c) facts.appendChild(factRow(c, t.id));
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

  // An intro paragraph. Lines inside it ("\n": the contents box's bullets) keep their line breaks.
  function introBi(p) {
    function lines(text) {
      var out = [];
      text.split("\n").forEach(function (line, i) {
        if (i > 0) out.push(h("br"));
        out.push(line);
      });
      return out;
    }
    var kids = [h("span", { class: "da" }, lines(p.da))];
    if (p.en) kids.push(h("span", { class: "en", lang: "en" }, lines(p.en)));
    return h("p", { class: "bi" }, kids);
  }

  // One fact row: face value (and postmark when mastered), the fact, its questions and the notes.
  function factRow(c, sheetId) {
    var side = [MBP.ui.faceValue(c.times_asked)];
    if (MBP.store.isMastered(c.id)) {
      var mark = MBP.ui.postmark("check", "fact-check");
      side.push(h("span", { class: "fact-mastered", role: "img", title: "Mestret – Mastered", "aria-label": "Mestret – Mastered" }, mark));
    }

    // The questions and answers are built the first time the reader opens them (the block is closed by default).
    var qa = h("details", { class: "qa" },
      h("summary", null,
        MBP.icon("next", 16),
        bi("Spørgsmål og svar (" + c.variants.length + ")", "Questions and answers", "span")));
    qa.addEventListener("toggle", function built() {
      if (!qa.open) return;
      qa.removeEventListener("toggle", built);
      qa.appendChild(h("div", { class: "qa-body" }, c.variants.map(function (v) {
        return h("div", { class: "qa-item" },
          biQA(v.question_da, v.question_en, v.answer_da, v.answer_en, "div"),
          h("p", { class: "ids" }, v.question_ids.join(", ")));
      })));
    });

    var body = h("div", { class: "fact-body" },
      c.frequent ? h("span", { class: "pill-freq", title: "Frequently asked – asked in 4+ exams" }, MBP.icon("star", 13), "Ofte stillet") : null,
      withBook(bi(c.fact_da, c.fact_en, "p"), c.book, MBP.ui.moreFor(c.id)),
      MBP.ui.alsoIn(c, sheetId, true, ""),
      qa,
      MBP.ui.noteBoxes(c));

    return h("li", { class: c.frequent ? "fact-row freq" : "fact-row", id: sheetId + "--" + c.id, tabindex: "-1" },
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
        h("h4", { class: "fg-title", id: titleId }, g.title_da, h("span", { class: "en", lang: "en" }, g.title_en)))
    ];
    // Every row has its own book button. Extra excerpts that belong to a row go in its popover; the rest are
    // listed under the table.
    var extras = MBP.ui.moreFor(g.id);
    var usedExtra = {};

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
      var last = r.cells_da.length - 1;
      var more = (r.more || []).map(function (k) { usedExtra[k] = true; return extras[k]; }).filter(Boolean);
      return h("tr", null, r.cells_da.map(function (c, i) {
        var text = bi(c, r.cells_en[i], "span");
        if (i === last) MBP.ui.withBook(text, r.book, more);
        if (i === 0) return h("th", { scope: "row" }, text);
        return h("td", { "data-label": g.columns_da[i] }, text);
      }));
    });
    kids.push(h("div", { class: "table-wrap" },
      h("table", { class: "fg-table" + (stack ? " fg-stack" : ""), "aria-labelledby": titleId },
        thead,
        h("tbody", null, rows))));

    var rest = extras.filter(function (x, k) { return !usedExtra[k]; });
    if (rest.length) kids.push(MBP.ui.moreBlock(rest));
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
        title: "Practise this fact sheet",
        style: "background: var(--c); color: #fff"
      }, "Øv dette fakta-ark"),
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
