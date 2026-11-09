// Study material: per-topic facts with Q&A, then all overview tables.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var biQA = MBP.ui.biQA;

  MBP.ui.initShell();
  MBP.ui.start(init);

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("Læs stoffet", "Study the material", "h1"));

    // Table of contents
    var toc = h("ul", { class: "toc" });
    D.topics.forEach(function (t) {
      toc.appendChild(h("li", null, h("a", { href: "#" + t.id },
        h("span", { class: "icon", "aria-hidden": "true" }, t.icon),
        bi(
          t.title_da + " (" + t.cluster_ids.length + " emner)",
          t.title_en + " (" + t.cluster_ids.length + " items)",
          "span"))));
    });
    toc.appendChild(h("li", null, h("a", { href: "#tabeller" },
      bi("📊 Alle oversigtstabeller", "All overview tables", "span"))));
    main.appendChild(h("nav", { "aria-label": "Indhold" }, toc));

    // Filter
    var freqBox = h("input", { type: "checkbox", id: "freq-only" });
    freqBox.addEventListener("change", function () {
      main.classList.toggle("only-frequent", freqBox.checked);
    });
    main.appendChild(h("label", { class: "filter", for: "freq-only" }, freqBox,
      bi("Vis kun ⭐ ofte stillede", "Show only ⭐ frequently asked", "span")));

    D.topics.forEach(function (t) {
      main.appendChild(topicSection(D, t));
    });

    // Overview tables
    var tables = h("section", { id: "tabeller", class: "study-section" });
    tables.appendChild(bi("Alle oversigtstabeller", "All overview tables", "h2"));
    D.groups.forEach(function (g) {
      tables.appendChild(groupTable(g, g.id));
    });
    main.appendChild(tables);

    // Scroll to the hash, now that the content exists.
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  function topicSection(D, t) {
    var section = h("section", { id: t.id, class: "study-section" });
    section.appendChild(bi(t.icon + " " + t.title_da, t.title_en, "h2"));

    t.intro.forEach(function (p) {
      section.appendChild(bi(p.da, p.en, "p"));
    });

    t.current_facts.forEach(function (cf) {
      section.appendChild(MBP.ui.box("current", "🔄 Ændret siden prøven", "Changed since the exam", cf.da, cf.en));
    });

    section.appendChild(bi("Det skal du huske", "What to remember", "h3"));
    var items = h("ul", { class: "items" });
    t.cluster_ids.forEach(function (id) {
      var c = D.cById.get(id);
      if (!c) return;
      var head = h("div", { class: "item-head" });
      if (c.frequent) head.appendChild(h("span", { class: "badge" }, "⭐ Ofte stillet"));
      head.appendChild(h("span", { class: "muted small" }, "×" + c.times_asked));
      var details = h("details", null,
        h("summary", null, bi(
          "Spørgsmål og svar (" + c.variants.length + ")",
          "Questions and answers",
          "span")),
        h("ul", null, c.variants.map(function (v) {
          return h("li", null,
            biQA(v.question_da, v.question_en, v.answer_da, v.answer_en, "div"),
            h("p", { class: "ids" }, v.question_ids.join(", ")));
        })));
      var li = h("li", { class: c.frequent ? "freq" : "" }, head, bi(c.fact_da, c.fact_en, "p"), details);
      MBP.ui.noteBoxes(c).forEach(function (b) { li.appendChild(b); });
      items.appendChild(li);
    });
    section.appendChild(items);

    section.appendChild(bi("Lær sammen", "Learn together", "h3"));
    t.fact_group_ids.forEach(function (gid) {
      var g = D.gById.get(gid);
      if (g) section.appendChild(groupTable(g, null));
    });

    var studiedBtn = h("button", { type: "button", class: "btn btn-sm" });
    function paintStudied() {
      var done = MBP.store.isStudied(t.id);
      studiedBtn.textContent = "";
      studiedBtn.appendChild(done
        ? bi("✓ Markeret som læst", "✓ Marked as read", "span")
        : bi("Markér som læst", "Mark as read", "span"));
      studiedBtn.disabled = done;
    }
    studiedBtn.addEventListener("click", function () {
      MBP.store.setStudied(t.id);
      paintStudied();
    });
    paintStudied();

    section.appendChild(h("div", { class: "btn-row" },
      studiedBtn,
      h("a", { class: "btn btn-sm", href: "learn.html?topic=" + t.id },
        bi("Øv dette emne →", "Practise this topic →", "span"))));

    // Reaching the end of the topic counts as studied.
    var sentinel = h("div", { "aria-hidden": "true" });
    section.appendChild(sentinel);
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
      observer.observe(sentinel);
    }
    return section;
  }

  // Fact group table with a caption, bilingual headers, and a "Husk" (remember) box.
  function groupTable(g, id) {
    var headRow = h("tr", null, g.columns_da.map(function (c, i) {
      return h("th", { scope: "col" }, bi(c, g.columns_en[i], "span"));
    }));
    var rows = g.rows.map(function (r) {
      return h("tr", null, r.cells_da.map(function (c, i) {
        return h("td", null, bi(c, r.cells_en[i], "span"));
      }));
    });
    return h("div", { class: "fg", id: id || null },
      h("div", { class: "table-wrap" },
        h("table", null,
          h("caption", null, bi(g.title_da, g.title_en, "span")),
          h("thead", null, headRow),
          h("tbody", null, rows))),
      h("div", { class: "mnemonic" },
        h("div", { class: "box-title" }, bi("💡 Husk", "Remember", "span")),
        bi(g.mnemonic_da, g.mnemonic_en, "p")));
  }
})();
