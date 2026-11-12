// Shared rendering helpers. All data text goes in through textContent / text nodes, never innerHTML.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  var LOAD_ERROR = "Kunne ikke indlæse data. Prøv at genindlæse siden. / Could not load data. Try reloading the page.";

  // Short Danish and English stamp names for the 26 fact sheets (the stamps are small).
  var SHORT = {
    skole: ["Skole", "School"],
    uddannelse: ["Uddannelse", "Education"],
    dagtilbud: ["Dagtilbud", "Childcare"],
    arbejdsmarked: ["Arbejde", "Work"],
    erhvervsliv: ["Erhverv", "Business"],
    velfaerd: ["Velfærd", "Welfare"],
    familieliv: ["Familie", "Family"],
    foreningsliv: ["Fritid", "Leisure"],
    sundhed: ["Sundhed", "Health"],
    ligestilling: ["Ligestilling", "Equality"],
    grundloven: ["Grundloven", "Constitution"],
    retssamfund: ["Retssamfund", "Justice"],
    folketing: ["Folketinget", "Parliament"],
    selvstyre: ["Kommuner", "Local gov."],
    valg: ["Valg", "Elections"],
    rettigheder: ["Rettigheder", "Rights"],
    religion: ["Religion", "Religion"],
    omverdenen: ["Verden", "The world"],
    geografi: ["Geografi", "Geography"],
    "historie-foer-1945": ["Før 1945", "Before 1945"],
    "historie-efter-1945": ["Efter 1945", "After 1945"],
    kultur: ["Kultur", "Culture"],
    traditioner: ["Traditioner", "Traditions"],
    forsvar: ["Forsvar", "Defence"],
    diskrimination: ["Diskrimination", "Discrimination"],
    klima: ["Klima", "Climate"]
  };

  var NOTE_ICON = { trap: "warn", changed: "changed", remember: "remember", keyerror: "flag", nobook: "book" };

  // The August 2026 book. The PDF is served with the site; the official copy is the fallback link.
  var BOOK_PDF = "bookdump/laeremateriale-til-medborgerskabsproeven.pdf";
  var BOOK_URL = "https://danskogproever.dk/media/4vbfd0ac/laeremateriale-til-medborgerskabsproeven.pdf";
  // The 2017-11 answer-key error: 1864 = Slesvig og Holsten, 1658 = Skåne.
  var KEYERROR_REFS = [{ page: 113, lines: "9-11" }, { page: 111, lines: "20-22" }];
  var DAYS = ["M", "T", "O", "T", "F", "L", "S"];

  // Constant SVG markup (never data text).
  var WAVE = '<svg class="wave" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 5c6-6 12 6 18 0s12 6 18 0 12 6 18 0 12 6 18 0 12 6 18 0 6 3 10 2"/></svg>';
  var POSTMARK = {
    check: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="26" stroke-width="2.5"/><circle cx="30" cy="30" r="20" stroke-width="1.5"/><path d="m20 31 7 7 14-15" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mestret: '<svg viewBox="0 0 90 60" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="25" stroke-width="2"/><circle cx="30" cy="30" r="19" stroke-width="1.2"/><text x="30" y="34" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="11" fill="currentColor" stroke="none">Mestret</text><path d="M56 22c5-4 9 4 14 0s9 4 14 0M56 30c5-4 9 4 14 0s9 4 14 0M56 38c5-4 9 4 14 0s9 4 14 0" stroke-width="2"/></svg>',
    bestaet: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="54" stroke-width="3"/><circle cx="60" cy="60" r="44" stroke-width="1.5"/><text x="60" y="58" text-anchor="middle" font-family="Young Serif, Georgia, serif" font-size="22" fill="currentColor" stroke="none">Bestået</text><text x="60" y="80" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="12" fill="currentColor" stroke="none"></text></svg>'
  };

  // h(tag, attrs, ...children): build an element. Strings become text nodes.
  // Attribute values of null/false are skipped; "on*" keys with a function become listeners.
  function flatten(list, out) {
    list.forEach(function (item) {
      if (Array.isArray(item)) flatten(item, out);
      else if (item !== null && item !== undefined && item !== false) out.push(item);
    });
    return out;
  }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") el.className = v;
        else if (k.indexOf("on") === 0 && typeof v === "function") el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? "" : String(v));
      });
    }
    var kids = flatten(Array.prototype.slice.call(arguments, 2), []);
    kids.forEach(function (kid) {
      el.appendChild(typeof kid === "object" ? kid : document.createTextNode(String(kid)));
    });
    return el;
  }

  // Turns a constant SVG string into an element.
  function constSvg(markup) {
    var holder = document.createElement("div");
    holder.innerHTML = markup;
    return holder.firstChild;
  }

  // bi(da, en, tag): bilingual text. The .en span is left out when there is no English.
  function bi(da, en, tag) {
    var kids = [h("span", { class: "da" }, da)];
    if (en) kids.push(h("span", { class: "en", lang: "en" }, en));
    return h(tag || "p", { class: "bi" }, kids);
  }

  // Question line, then the answer in bold, in both languages. The extra arguments are no longer used.
  function biQA(qDa, qEn, aDa, aEn, tag) {
    return h(tag || "p", { class: "biqa" },
      h("span", { class: "q-line da" }, qDa),
      h("strong", { class: "answer da" }, aDa),
      h("span", { class: "q-line en", lang: "en" }, qEn),
      h("strong", { class: "answer en", lang: "en" }, aEn));
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  // Local date key YYYY-MM-DD.
  function dayKey(d) {
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  // Postmark SVG. kind: "check", "mestret" or "bestaet". Optional className is added to the svg.
  function postmark(kind, className) {
    var el = constSvg(POSTMARK[kind]);
    if (className) el.setAttribute("class", className);
    return el;
  }

  // A note box (§5.1.5). kind: "trap", "changed", "remember", "keyerror" or "nobook".
  // refs (optional): book references; the "read more" button goes at the end of the body.
  function note(kind, titleDa, titleEn, bodyDa, bodyEn, refs) {
    return h("div", { class: "note note-" + kind },
      h("p", { class: "note-title" }, MBP.icon(NOTE_ICON[kind], 16), bi(titleDa, titleEn, "span")),
      withBook(bi(bodyDa, bodyEn, "p"), refs));
  }

  // "Not in the 2026 book" note, for site facts the book does not cover.
  function nobookNote(da, en) {
    return note("nobook", "Ikke i læremateriale 2026", "Not in the 2026 book", da, en);
  }

  // "Også i Fakta-ark 9: Sundhed og sygdom" for a cluster shown in sheet currentId. Each sheet name links to
  // the same fact in that sheet (linked; hrefPrefix is "" on the Læs page, "study.html" elsewhere).
  // Returns null when the cluster is only in one sheet.
  // The sheet to label a cluster with: the first of its sheets that is in `sheets` (the sheets the user
  // chose), else its main sheet.
  function sheetFor(cluster, sheets) {
    var ids = cluster.topic_ids || [cluster.topic_id];
    if (sheets) {
      for (var i = 0; i < ids.length; i++) if (sheets.indexOf(ids[i]) !== -1) return ids[i];
    }
    return cluster.topic_id;
  }

  function alsoIn(cluster, currentId, linked, hrefPrefix) {
    var D = MBP.data;
    var others = (cluster.topic_ids || [cluster.topic_id]).filter(function (id) { return id !== currentId && D.tById.get(id); });
    if (!others.length) return null;
    var parts = [];
    others.forEach(function (id, i) {
      var t = D.tById.get(id);
      if (i > 0) parts.push(", ");
      var label = "Fakta-ark " + t.sheet + ": " + t.title_da;
      parts.push(linked
        ? h("a", { href: (hrefPrefix || "") + "#" + id + "/" + cluster.id, title: "Fact sheet " + t.sheet + ": " + t.title_en }, label)
        : label);
    });
    var en = others.map(function (id) {
      var t = D.tById.get(id);
      return "fact sheet " + t.sheet + ": " + t.title_en;
    }).join(", ");
    return h("p", { class: "also-in" },
      MBP.icon("book", 14),
      h("span", { class: "da" }, "Også i ", parts),
      h("span", { class: "en", lang: "en" }, "Also in " + en));
  }

  // The trap, "changed since the exam" and "not in the book" notes for a cluster (all optional).
  // inQuestion: leaves out the change note (the exam's old answer), which belongs to learning only.
  function noteBoxes(c, inQuestion) {
    var out = [];
    if (c.trap_note_da) out.push(note("trap", "Pas på", "Watch out", c.trap_note_da, c.trap_note_en));
    if (c.change_note_da && !inQuestion) {
      out.push(note("changed", "Ændret siden prøven", "Changed since the exam", c.change_note_da, c.change_note_en, c.book));
    }
    if (c.current_note_da) out.push(note("changed", "Ændret siden prøven", "Changed since the exam", c.current_note_da, c.current_note_en));
    if (c.nobook_note_da) out.push(nobookNote(c.nobook_note_da, c.nobook_note_en));
    return out;
  }

  // ---------- "Læs mere i bogen": the book button and its popover ----------

  function lineLabel(lines) {
    return lines.replace("-", "–");
  }

  function refLabel(r) {
    return "side " + r.page + ", linje " + lineLabel(r.lines);
  }

  var POP_MAX = 360;   // px; the content scrolls inside (matches --book-pop-max)
  var pop = null;      // the one shared popover
  var popOwner = null; // the button that opened it
  var popGrip = null;  // the resize grip, kept across openings

  function closeBook(refocus) {
    if (!pop || pop.hidden) return;
    pop.hidden = true;
    if (popOwner) {
      popOwner.setAttribute("aria-expanded", "false");
      if (refocus) popOwner.focus();
    }
    popOwner = null;
  }

  function buildPop() {
    popGrip = buildGrip();
    pop = h("div", {
      id: "book-pop",
      class: "book-pop",
      role: "dialog",
      "aria-labelledby": "book-pop-title",
      tabindex: "-1",
      hidden: true
    });
    pop.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeBook(true);
      }
    });
    // Focus moving out of the popover (Tab past the end, or a click elsewhere) closes it.
    pop.addEventListener("focusout", function (e) {
      var to = e.relatedTarget;
      if (to && !pop.contains(to) && to !== popOwner) closeBook(false);
    });
    document.addEventListener("click", function (e) {
      if (pop.hidden) return;
      if (pop.contains(e.target) || (popOwner && popOwner.contains(e.target))) return;
      closeBook(false);
    });
    // Phones resize the viewport when the address bar hides, so follow the button instead of closing.
    window.addEventListener("resize", function () {
      if (!pop.hidden && popOwner) placePop(popOwner);
    });
    document.body.appendChild(pop);
  }

  // The English translation of a Danish book text (data/book_en.json, keyed by the exact Danish text). "" when there is none.
  function enFor(da) {
    return (MBP.data && MBP.data.en && MBP.data.en[da]) || "";
  }

  // The Danish quote and, under it, the English translation (hidden until the reader turns it on).
  // Both sit in one wrapper, so a wide popover can show them side by side.
  function quotePair(da, en, body) {
    var pair = [h("blockquote", { class: "book-quote", lang: "da" }, body(da))];
    if (en) pair.push(h("blockquote", { class: "book-quote book-quote-en", lang: "en" },
      h("p", { class: "book-en-label" }, "English translation (not from the book)"), body(en)));
    return h("div", { class: "book-pair" }, pair);
  }

  // The paragraphs of a section-1 text, one <p> per line.
  function paras(text) {
    return text.split("\n").map(function (para) { return h("p", null, para); });
  }

  // The button that shows or hides the English translations. Shared by every popover and block on the page.
  // full: the long label (inline blocks); otherwise the compact "EN" (popover header).
  function bookEnToggle(full) {
    var on = MBP.store.bookEnOpen();
    var label = "Vis engelsk oversættelse · Show English translation";
    return h("button", {
      type: "button",
      class: full ? "book-en-toggle book-en-toggle-full" : "book-en-toggle",
      "aria-pressed": String(on),
      "aria-label": label,
      title: label,
      onclick: function () {
        var next = !MBP.store.bookEnOpen();
        MBP.store.setBookEnOpen(next);
        applyBookEn(next);
      }
    }, full ? label : "EN");
  }

  // Applies the English switch to the whole page: the class drives the CSS, aria-pressed drives every toggle.
  function applyBookEn(on) {
    document.documentElement.classList.toggle("show-book-en", on);
    document.querySelectorAll(".book-en-toggle").forEach(function (b) {
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function refBlock(r) {
    var text = (MBP.data && MBP.data.book && MBP.data.book[r.page + ":" + r.lines]) || "";
    return h("section", { class: "book-ref" },
      h("p", { class: "book-cite" }, "Læremateriale 2026 · " + refLabel(r)),
      text ? quotePair(text, enFor(text), paras) : null,
      pageLink(r.page));
  }

  // "Åbn side N i bogen": the link to the page in the PDF served with the site.
  function pageLink(page) {
    return h("p", { class: "book-links" },
      h("a", { href: BOOK_PDF + "#page=" + page, target: "_blank", rel: "noopener" },
        MBP.icon("open", 16), bi("Åbn side " + page + " i bogen", "Open page " + page + " in the book (PDF)", "span")));
  }

  // ---------- "Mere fra bogen": extra book excerpts (data/book_more.json) ----------

  // The extra excerpts for a cluster, fact-group or topic id, in display order ([] when there are none).
  function moreFor(id) {
    return (MBP.data && MBP.data.more && MBP.data.more[id]) || [];
  }

  // The excerpt text, word for word: the text before the first "•" is a paragraph, each "•" item a list item.
  function moreText(text) {
    var parts = text.split("•").map(function (s) { return s.trim(); });
    var intro = parts.shift();
    var items = parts.filter(Boolean);
    return [
      intro ? h("p", null, intro) : null,
      items.length ? h("ul", { class: "book-more-list" }, items.map(function (s) { return h("li", null, s); })) : null
    ];
  }

  // One extra excerpt: its heading, the citation, the quote and the link to the page.
  function moreItem(x) {
    var enTitle = enFor(x.title_da);
    return h("section", { class: "book-ref book-more-item" },
      h("h4", { class: "book-more-title", lang: "da" }, x.title_da),
      enTitle ? h("p", { class: "book-en-title", lang: "en" }, enTitle) : null,
      h("p", { class: "book-cite" }, "Læremateriale 2026 · " + refLabel(x)),
      quotePair(x.excerpt_da, enFor(x.excerpt_da), moreText),
      pageLink(x.page));
  }

  // The Danish texts of one "Mere fra bogen" excerpt: its title and its quote.
  function moreTexts(x) {
    return [x.title_da, x.excerpt_da];
  }

  // True when at least one of the texts has an English translation (then the English toggle is shown).
  function anyEn(texts) {
    return texts.some(function (t) { return !!enFor(t); });
  }

  // "* = explained in the glossary", once, when one of the excerpts has a "*".
  function starNote(items) {
    var any = items.some(function (x) { return x.excerpt_da.indexOf("*") !== -1; });
    return any ? h("p", { class: "book-more-star" },
      bi("* = forklaret i bogens ordliste, s. 147–155", "* = explained in the book's glossary", "span")) : null;
  }

  // Section 2 of the book popover.
  function moreSection(more) {
    return h("div", { class: "book-more-pop" },
      h("h3", { class: "book-more-head" }, bi("Mere fra bogen", "More from the book", "span")),
      more.map(moreItem),
      starNote(more));
  }

  // "Mere fra bogen (N)" as an inline block. Returns null when there are no excerpts.
  // opts.feedback: the block in the feedback after an answer (open unless the reader closed it; the choice is kept).
  // Without it: the closed block at the end of a topic in Læs.
  function moreBlock(items, opts) {
    if (!items || !items.length) return null;
    var feedback = !!(opts && opts.feedback);
    var isOpen = feedback && MBP.store.bookMoreOpen();
    var chev = MBP.icon("next", 16);
    chev.classList.add("book-more-chev");
    // The body (the excerpts) is built now when the block starts open, otherwise the first time it is opened.
    function buildBody() {
      return h("div", { class: "book-more-body" },
        anyEn(items.map(moreTexts).reduce(function (a, b) { return a.concat(b); }, [])) ? bookEnToggle(true) : null,
        items.map(moreItem), starNote(items));
    }
    var block = h("details", {
      class: feedback ? "book-more book-more-feedback" : "book-more",
      open: isOpen
    },
      h("summary", null, chev,
        bi("Mere fra bogen (" + items.length + ")", "More from the book (" + items.length + ")", "span")),
      isOpen ? buildBody() : null);
    if (!isOpen) {
      block.addEventListener("toggle", function built() {
        if (!block.open) return;
        block.removeEventListener("toggle", built);
        block.appendChild(buildBody());
      });
    }
    if (feedback) {
      block.addEventListener("toggle", function () { MBP.store.setBookMoreOpen(block.open); });
    }
    return block;
  }

  // One link to the official copy of the book (danskogproever.dk), at the first page referenced.
  function officialLink(refs) {
    return h("p", { class: "book-links book-official" },
      h("a", { href: BOOK_URL + "#page=" + refs[0].page, target: "_blank", rel: "noopener" },
        MBP.icon("open", 16), bi("Officiel kilde: danskogproever.dk", "Official source", "span")));
  }

  // Places the popover under the button, or above it when there is more room there,
  // inside the page gutters. Its height is capped to the room on that side, so it never covers the button.
  // The size the reader chose ({w, h} in px), or null for the default size. Kept in the store between visits.
  var userSize = null;
  var DEFAULT_W = 440;
  var LARGE_W = 760;
  var MIN_W = 280;
  var MIN_H = 200;
  var GUTTER = 16;

  // Clamps a size to the room in the viewport: at least MIN_W × MIN_H, at most the page gutters.
  function fitSize(s) {
    var maxW = document.documentElement.clientWidth - 2 * GUTTER;
    var maxH = window.innerHeight - 2 * GUTTER;
    return {
      w: Math.round(Math.min(maxW, Math.max(MIN_W, s.w))),
      h: Math.round(Math.min(maxH, Math.max(MIN_H, s.h)))
    };
  }

  // The "large" size of the expand button: wide, and 80% of the viewport height.
  function largeSize() {
    return fitSize({ w: LARGE_W, h: window.innerHeight * 0.8 });
  }

  function isLarge() {
    var L = largeSize();
    return !!userSize && userSize.w === L.w && userSize.h === L.h;
  }

  function saveSize() {
    MBP.store.setBookPopSize(userSize ? { w: userSize.w, h: userSize.h } : null);
  }

  function placePop(btn) {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var width, height;
    if (userSize) {
      var s = fitSize(userSize);
      width = s.w;
      height = s.h;
      pop.style.height = height + "px";
      pop.style.maxHeight = "none";
    } else {
      width = Math.min(DEFAULT_W, vw - 2 * GUTTER);
      pop.style.height = "";
      pop.style.maxHeight = "";
    }
    pop.style.width = width + "px";
    var r = btn.getBoundingClientRect();
    var left = Math.max(GUTTER, Math.min(r.left + r.width / 2 - width / 2, vw - width - GUTTER));
    pop.style.left = (left + window.scrollX) + "px";
    var below = vh - r.bottom - 16;
    var above = r.top - 16;
    var top;
    if (userSize) {
      // The reader's size is kept: below the button if it fits, else above, else pinned to the bottom of the viewport.
      if (below >= height) top = r.bottom + 8;
      else if (above >= height) top = r.top - height - 8;
      else top = Math.max(GUTTER, vh - height - GUTTER);
    } else {
      // Default size: placed under the button, or above it when there is more room there, capped to that room.
      var natural = pop.offsetHeight;
      var under = below >= natural || below >= above;
      var room = Math.min(POP_MAX, Math.max(160, under ? below : above));
      if (natural > room) pop.style.maxHeight = room + "px";
      height = Math.min(natural, room);
      top = under ? r.bottom + 8 : r.top - height - 8;
    }
    pop.style.top = (top + window.scrollY) + "px";
  }

  // Grip and expand button. The grip resizes with the pointer (mouse, pen, touch) or the arrow keys.
  function buildGrip() {
    var drag = null;
    var grip = h("button", {
      type: "button",
      class: "book-pop-grip",
      "aria-label": "Ændr størrelse – Resize",
      title: "Træk for at ændre størrelse – Drag to resize"
    }, constSvg('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 9 9 20M20 15l-5 5"/></svg>'));
    grip.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      grip.setPointerCapture(e.pointerId);
      drag = { x: e.clientX, y: e.clientY, w: pop.offsetWidth, h: pop.offsetHeight };
    });
    // While dragging only the size changes (the popover stays where it is); it is re-placed when the drag ends.
    grip.addEventListener("pointermove", function (e) {
      if (!drag) return;
      userSize = fitSize({ w: drag.w + e.clientX - drag.x, h: drag.h + e.clientY - drag.y });
      pop.style.width = userSize.w + "px";
      pop.style.height = userSize.h + "px";
      pop.style.maxHeight = "none";
    });
    function endDrag() {
      if (!drag) return;
      drag = null;
      saveSize();
      if (popOwner) placePop(popOwner);
      syncExpand();
    }
    grip.addEventListener("pointerup", endDrag);
    grip.addEventListener("pointercancel", endDrag);
    // Double-click resets to the default size.
    grip.addEventListener("dblclick", function () {
      userSize = null;
      saveSize();
      if (popOwner) placePop(popOwner);
      syncExpand();
    });
    grip.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 96 : 24;
      var d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      userSize = fitSize({ w: pop.offsetWidth + d[0], h: pop.offsetHeight + d[1] });
      saveSize();
      if (popOwner) placePop(popOwner);
      syncExpand();
    });
    return grip;
  }

  // The expand button in the header: switches between the default size and the large size.
  function expandButton() {
    return h("button", {
      type: "button",
      class: "book-pop-size",
      "aria-label": "Stor visning – Large view",
      title: "Stor visning – Large view",
      "aria-pressed": String(isLarge()),
      onclick: function () {
        userSize = isLarge() ? null : largeSize();
        saveSize();
        if (popOwner) placePop(popOwner);
        syncExpand();
      }
    }, constSvg('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>'));
  }

  function syncExpand() {
    var b = pop && pop.querySelector(".book-pop-size");
    if (b) b.setAttribute("aria-pressed", String(isLarge()));
  }

  function openBook(btn, refs, more) {
    if (!pop) buildPop();
    if (popOwner === btn && !pop.hidden) {
      closeBook(true);
      return;
    }
    closeBook(false);
    userSize = MBP.store.bookPopSize();
    var texts = [];
    refs.forEach(function (r) {
      texts.push((MBP.data && MBP.data.book && MBP.data.book[r.page + ":" + r.lines]) || "");
    });
    more.forEach(function (x) { texts = texts.concat(moreTexts(x)); });
    var showEn = anyEn(texts);
    pop.textContent = "";
    pop.appendChild(h("div", { class: "book-pop-head" },
      h("p", { class: "book-pop-title", id: "book-pop-title" }, MBP.icon("book", 18),
        bi("Læs mere i bogen", "Read more in the book", "span")),
      h("div", { class: "book-pop-tools" },
        showEn ? bookEnToggle(false) : null,
        expandButton(),
        h("button", { type: "button", class: "book-pop-close", "aria-label": "Luk – Close", title: "Luk – Close",
          onclick: function () { closeBook(true); } }, MBP.icon("close", 18)))));
    // Section 1: the fact's own references. Section 2 ("Mere fra bogen"): the extra excerpts, when there are any.
    pop.appendChild(h("div", { class: "book-pop-body" },
      refs.map(refBlock),
      more.length ? moreSection(more) : null,
      officialLink(refs.length ? refs : more)));
    pop.appendChild(popGrip);
    pop.hidden = false;
    popOwner = btn;
    btn.setAttribute("aria-expanded", "true");
    placePop(btn);
    pop.focus({ preventScroll: true });
  }

  // The small book button. refs: [{page, lines}]; more (optional): the extra excerpts for popover section 2.
  // Returns null when there is nothing to show. A dot (.has-more) marks a button with extra excerpts.
  function bookButton(refs, more) {
    refs = refs || [];
    more = more || [];
    if (!refs.length && !more.length) return null;
    var label = "Læs mere i bogen";
    if (refs.length) label += ": " + refs.map(refLabel).join("; ");
    if (more.length) label += " – og " + more.length + " afsnit mere fra bogen";
    var btn = h("button", {
      type: "button",
      class: more.length ? "book-btn has-more" : "book-btn",
      "aria-haspopup": "dialog",
      "aria-expanded": "false",
      "aria-controls": "book-pop",
      "aria-label": label,
      title: "Læs mere i bogen – Read more in the book"
    }, MBP.icon("book", 18));
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openBook(btn, refs, more);
    });
    return btn;
  }

  // Adds the book button at the end of the Danish line of a bi()/biQA() element. Returns el.
  // more (optional): extra excerpts for the popover's "Mere fra bogen" section.
  function withBook(el, refs, more) {
    var btn = bookButton(refs, more);
    if (!btn) return el;
    var da = el.querySelector(".answer.da") || el.querySelector(".da");
    if (da && da.classList.contains("answer")) da.after(" ", btn);
    else (da || el).append(" ", btn);
    return el;
  }

  // Counts for a topic: seen and mastered clusters, the total, and the ones due for review.
  function topicProgress(D, topic) {
    var clusters = MBP.store.progress().clusters;
    var now = Date.now();
    var ids = topic.cluster_ids || [];
    var out = { seen: 0, mastered: 0, total: ids.length, due: 0 };
    ids.forEach(function (id) {
      var st = clusters[id];
      var seen = MBP.store.isSeen(id);
      var mastered = MBP.store.isMastered(id);
      if (seen) out.seen++;
      if (mastered) out.mastered++;
      if (seen && !mastered && st && st.due <= now) out.due++;
    });
    return out;
  }

  // Stamp level from progress: 0 blank, 1 tinted, 2 half printed, 4 fully printed with postmark.
  function stampLevel(p) {
    if (p.seen === 0) return 0;
    if (p.mastered >= p.total) return 4;
    return p.mastered / p.total >= 0.5 ? 2 : 1;
  }

  // Topic stamp (§5.1.6). opts: href (renders a link), mini (small, no name, count or postmark).
  function stamp(topic, progress, opts) {
    opts = opts || {};
    var names = SHORT[topic.id] || [topic.title_da, topic.title_en];
    var lvl = stampLevel(progress);
    var mini = !!opts.mini;
    var label = names[0] + ": " + progress.mastered + " af " + progress.total + " mestret – " +
      names[1] + ": " + progress.mastered + " of " + progress.total + " mastered";
    var celebrate = !mini && lvl === 4 && !MBP.store.isMasteredSeen(topic.id);
    if (celebrate) MBP.store.markMasteredSeen(topic.id);

    var face = h("div", { class: "stamp-face" },
      constSvg(WAVE),
      h("div", { class: "art" }, MBP.topicArt(topic.id, mini ? 32 : 64)),
      mini ? null : h("div", { class: "no" }, "Fakta-ark " + topic.sheet),
      mini ? null : h("div", { class: "nm" }, names[0]),
      mini ? null : h("div", { class: "ct" }, progress.mastered + " / " + progress.total));

    var cls = ["stamp", "topic-scope", "lvl-" + lvl];
    if (mini) cls.push("mini");
    if (celebrate) cls.push("just-mastered");
    var attrs = { class: cls.join(" "), style: "--c: var(--t-" + topic.id + ")", "aria-label": label };
    var showPostmark = !mini && lvl === 4;

    if (opts.href) {
      attrs.href = opts.href;
      return h("a", attrs, face, showPostmark ? postmark("mestret", "postmark") : null);
    }
    attrs.role = "img";
    return h("div", attrs, face, showPostmark ? postmark("mestret", "postmark") : null);
  }

  // Small topic label: colour dot with the illustration, then the short name (§5.1.7).
  function topicChip(topic) {
    var names = SHORT[topic.id] || [topic.title_da, topic.title_en];
    return h("span", { class: "tchip topic-scope", style: "--c: var(--t-" + topic.id + ")" },
      h("span", { class: "dot" }, MBP.topicArt(topic.id, 16)),
      names[0]);
  }

  // Face value: how often a question was asked (§5.1.4).
  function faceValue(n) {
    return h("span", { class: "value", title: "Stillet i " + n + (n === 1 ? " prøve" : " prøver") + " – Asked in " + n + (n === 1 ? " exam" : " exams") }, n + "×");
  }

  // Week strip of day-stamps, Monday to Sunday of this week (§5.1.9).
  function weekStamps() {
    var act = MBP.store.activity();
    var now = new Date();
    var mondayOffset = (now.getDay() + 6) % 7;
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
    var todayKey = dayKey(now);
    var practised = 0;
    var cells = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      var key = dayKey(d);
      var entry = act[key];
      var on = !!entry && entry.answers > 0;
      if (on) practised++;
      var cls = [on ? "on" : null, key === todayKey ? "is-today" : null].filter(Boolean).join(" ");
      cells.push(h("span", { class: cls || null }, DAYS[i]));
    }
    return h("div", {
      class: "week",
      role: "group",
      "aria-label": "Denne uge: " + practised + " dage med øvelse – This week: " + practised + " days practised"
    }, cells);
  }

  // Progress bar for a practice run (§5.1.10). onExit is the "Afslut" handler.
  function runBar(done, total, onExit) {
    var pct = total ? Math.round(done / total * 100) : 0;
    return h("div", { class: "run-bar" },
      h("button", { type: "button", class: "btn btn-quiet", "aria-label": "Afslut – Exit", onclick: onExit },
        MBP.icon("close", 20), "Afslut"),
      h("div", {
        class: "track",
        role: "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": String(total),
        "aria-valuenow": String(done),
        "aria-label": "Fremskridt – Progress"
      }, h("i", { style: "width: " + pct + "%" })),
      h("span", { class: "count" }, done + " / " + total));
  }

  // Inline confirm (§5.1.11): inserted above the trigger button, focus on cancel, Escape cancels.
  // opts: da, en (question), actionDa, actionEn, cancelDa, cancelEn, onAction, onCancel.
  function confirmInline(trigger, opts) {
    var panel;
    function close() {
      panel.remove();
      if (trigger && trigger.focus) trigger.focus();
    }
    var cancel = h("button", {
      type: "button",
      class: "btn btn-secondary",
      title: opts.cancelEn,
      onclick: function () {
        close();
        if (opts.onCancel) opts.onCancel();
      }
    }, opts.cancelDa);
    var action = h("button", {
      type: "button",
      class: "btn btn-primary",
      title: opts.actionEn,
      onclick: function () {
        panel.remove();
        if (opts.onAction) opts.onAction();
      }
    }, opts.actionDa);
    panel = h("div", {
      class: "confirm",
      onkeydown: function (e) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          if (opts.onCancel) opts.onCancel();
        }
      }
    }, bi(opts.da, opts.en, "p"), h("div", { class: "actions" }, cancel, action));
    if (trigger && trigger.parentNode) trigger.parentNode.insertBefore(panel, trigger);
    cancel.focus();
    return panel;
  }

  // Short message with a small check postmark, bottom centre; hides itself after 3.5 s (§5.1.12).
  function toast(da, en) {
    var mark = postmark("check", "toast-pm");
    mark.setAttribute("width", "20");
    mark.setAttribute("height", "20");
    var el = h("div", { class: "toast", role: "status" }, mark, bi(da, en, "span"));
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add("out"); }, 3500);
    setTimeout(function () { el.remove(); }, 3800);
    return el;
  }

  // Explanation panel (§5.1.8). verdict: true, false or null (not answered).
  // next: optional {da, en, onNext} for the "Næste" button.
  function explainPanel(q, verdict, next) {
    var D = MBP.data;
    var c = D.cById.get(q.cluster_id);
    var correct = q.options.find(function (o) { return o.key === q.correct[0]; });
    var line;
    if (verdict === true) {
      line = h("p", { class: "verdict verdict-ok" }, MBP.icon("check", 20), bi("Rigtigt", "Correct", "span"));
    } else if (verdict === false) {
      line = h("p", { class: "verdict verdict-bad" }, MBP.icon("cross", 20),
        bi("Ikke helt – svaret er: " + correct.text_da, "Not quite – the answer is: " + correct.text_en, "span"));
    } else {
      line = h("p", { class: "verdict verdict-none" },
        bi("Ikke besvaret – svaret er: " + correct.text_da, "Not answered – the answer is: " + correct.text_en, "span"));
    }
    var kids = [
      line,
      h("div", { class: "fact" }, withBook(bi(c.fact_da, c.fact_en, "p"), c.book))
    ];
    // Outdated keys are already switched to the current answer (q.changed), with no note here.
    // Other questions keep their key; where the book words it differently, a note says so.
    if (q.book_note_da && !q.changed) {
      kids.push(q.book_status === "nobook"
        ? nobookNote(q.book_note_da, q.book_note_en)
        : note("changed", "Bogen siger nu", "The book now says", q.book_note_da, q.book_note_en, c.book));
    }
    kids = kids.concat(noteBoxes(c, true));
    if (q.official_correct) {
      kids.push(note("keyerror", "Fejl i rettenøglen fra 2017", "Error in the 2017 answer key",
        "Den officielle rettenøgle fra 2017 siger fejlagtigt B (Skåne, Halland og Blekinge). Det rigtige svar er Slesvig og Holsten – Skåne blev mistet i 1658.",
        "The official 2017 answer key wrongly says B (Skåne, Halland and Blekinge). The correct answer is Slesvig and Holsten – Skåne was lost in 1658.",
        KEYERROR_REFS));
    }
    // "Mere fra bogen" for this question's cluster, after every answer (right, wrong or not answered).
    // The book button in the fact above gets no extra excerpts, so nothing is shown twice.
    kids.push(moreBlock(moreFor(q.cluster_id), { feedback: true }));
    kids.push(h("p", { class: "freq" }, bi(
      "Stillet i " + c.times_asked + (c.times_asked === 1 ? " prøve: " : " prøver: ") + c.exams.join(", "),
      "Asked in " + c.times_asked + (c.times_asked === 1 ? " exam: " : " exams: ") + c.exams.join(", "),
      "span")));
    if (next) {
      kids.push(h("button", { type: "button", class: "btn btn-primary next", title: next.en, onclick: next.onNext }, next.da));
    }
    return h("div", { class: "explain-panel" }, kids);
  }

  // Question card (§5.1.8).
  // opts: feedback (bool, default true), onAnswer(isCorrect, key), onChange(key) for exam mode,
  //       chosen (key preselected), review ({chosen}) for a locked review card,
  //       next ({da, en, onNext}) for the "Næste" button in the explanation.
  // Returns {el, getChoice()}.
  function questionCard(q, opts) {
    opts = opts || {};
    var D = MBP.data;
    var cluster = D.cById.get(q.cluster_id);
    var sheetId = cluster ? sheetFor(cluster, opts.sheets) : null;
    var topic = cluster ? D.tById.get(sheetId) : null;
    var feedback = opts.feedback !== false;
    var review = opts.review || null;
    var correctKey = q.correct[0];
    var order = shuffle(q.options);
    var chosen = opts.chosen || null;
    var locked = !!review;
    var buttons = [];
    var explain = h("div", { class: "explain", "aria-live": "polite" });

    // Marks the correct and the chosen wrong option. A postmark is earned only when the answer is right.
    function decorate(chosenKey, staticMark) {
      buttons.forEach(function (b, i) {
        var key = order[i].key;
        if (key === correctKey) {
          b.btn.classList.add("correct");
          b.btn.appendChild(postmark("check", staticMark ? "pm pm-static" : "pm"));
          b.sr.textContent = "Rigtigt";
        } else if (key === chosenKey) {
          b.btn.classList.add("wrong", "nudge");
          var cross = MBP.icon("cross", 26);
          cross.setAttribute("class", "x-mark");
          cross.setAttribute("stroke-width", "2.6");
          b.btn.appendChild(cross);
          b.sr.textContent = "Forkert";
        } else {
          b.btn.classList.add("dim");
        }
      });
    }

    function lock() {
      locked = true;
      buttons.forEach(function (b) { b.btn.classList.add("locked"); });
    }

    // Opens the explanation below the options, moves focus to "Næste" and scrolls it into view.
    function showExplanation(verdict) {
      explain.textContent = "";
      var inner = h("div", { class: "explain-inner" }, explainPanel(q, verdict, opts.next || null));
      explain.appendChild(inner);
      void explain.offsetHeight;
      explain.classList.add("open");
      var nextBtn = inner.querySelector(".next");
      if (nextBtn) nextBtn.focus({ preventScroll: true });
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      explain.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
    }

    function refreshSelection() {
      buttons.forEach(function (b, i) {
        var on = order[i].key === chosen;
        b.btn.setAttribute("aria-pressed", String(on));
        b.btn.classList.toggle("selected", on);
      });
    }

    function choose(i) {
      if (locked) return;
      var key = order[i].key;
      chosen = key;
      if (!feedback) {
        refreshSelection();
        if (opts.onChange) opts.onChange(key);
        return;
      }
      lock();
      decorate(key, key !== correctKey);
      showExplanation(key === correctKey);
      if (opts.onAnswer) opts.onAnswer(key === correctKey, key);
    }

    var fieldsetChildren = [h("legend", { class: "sr" }, q.question_da)];
    order.forEach(function (o, i) {
      var sr = h("span", { class: "sr" });
      var btn = h("button", {
        type: "button",
        class: "opt",
        "aria-pressed": feedback ? null : String(chosen === o.key),
        onclick: function () { choose(i); }
      }, h("kbd", { "aria-hidden": "true" }, String(i + 1)), h("span", { class: "opt-text" }, bi(o.text_da, o.text_en, "span")), sr);
      if (chosen === o.key && !feedback) btn.classList.add("selected");
      buttons.push({ btn: btn, sr: sr });
      fieldsetChildren.push(btn);
    });

    var el = h("article", { class: "qcard" },
      h("div", { class: "qmeta" },
        topic ? topicChip(topic) : null,
        bi("Prøve " + q.exam + ", spm. " + q.number, "Exam " + q.exam + ", q. " + q.number, "span"),
        cluster && cluster.frequent ? h("span", { class: "pill-freq", title: "Frequently asked – asked in 4+ exams" }, MBP.icon("star", 13), "Ofte stillet") : null),
      cluster ? alsoIn(cluster, sheetId, !!review, "study.html") : null,
      h("h2", { class: "qtext" }, q.question_da, h("span", { class: "en", lang: "en" }, q.question_en)),
      h("fieldset", { class: "opts" }, fieldsetChildren),
      explain);

    if (review) {
      lock();
      decorate(review.chosen, true);
      showExplanation(review.chosen ? review.chosen === correctKey : null);
    }

    // Keys 1/2/3 pick the option in its displayed order, while this card is on the page.
    function onKey(e) {
      if (!el.isConnected) {
        document.removeEventListener("keydown", onKey);
        return;
      }
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (t && t.matches && t.matches("input, textarea, select")) return;
      var n = Number(e.key);
      if (n >= 1 && n <= buttons.length && !locked) {
        e.preventDefault();
        choose(n - 1);
      }
    }
    document.addEventListener("keydown", onKey);

    if (!feedback && chosen) refreshSelection();

    return {
      el: el,
      getChoice: function () { return chosen; }
    };
  }

  // Shell: nav icons and the EN toggle. The toggle text stays "EN"; "off" strikes it through.
  function initShell() {
    document.querySelectorAll(".nav a[data-icon]").forEach(function (a) {
      if (!a.querySelector("svg")) a.insertBefore(MBP.icon(a.dataset.icon, 22), a.firstChild);
    });
    var btn = document.getElementById("en-toggle");
    function apply(on) {
      document.documentElement.classList.toggle("hide-en", !on);
      if (btn) {
        btn.setAttribute("aria-pressed", String(on));
        btn.classList.toggle("off", !on);
      }
    }
    apply(MBP.store.showEnglish());
    applyBookEn(MBP.store.bookEnOpen());
    if (btn) {
      btn.addEventListener("click", function () {
        var on = document.documentElement.classList.contains("hide-en");
        MBP.store.setShowEnglish(on);
        apply(on);
      });
    }

    // Theme button: switches between Lys and Mørk. With nothing saved, starts from the device's setting, without saving it.
    var themeBtn = document.getElementById("theme-toggle");
    var THEME_LABEL = { light: "Skift til mørkt tema – Switch to dark theme", dark: "Skift til lyst tema – Switch to light theme" };
    var THEME_ICON = { light: "theme-dark", dark: "theme-light" };
    var THEME_COLOR = { light: "#F3F5F9", dark: "#0B1430" };

    // The saved choice, else the device's setting (checked once, not saved).
    function currentTheme() {
      var saved = MBP.store.theme();
      if (saved) return saved;
      return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // The page's two theme-color metas are media-scoped; the shown theme replaces them with one fixed colour.
    function syncThemeColor(t) {
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      if (metas.length < 2) return;
      var light = metas[0];
      var dark = metas[1];
      light.removeAttribute("media");
      light.setAttribute("content", THEME_COLOR[t]);
      dark.setAttribute("media", "not all");
    }

    // The button shows the other theme: the dark icon on a light page, and the light icon on a dark page.
    function applyTheme(t) {
      document.documentElement.setAttribute("data-theme", t);
      if (themeBtn) {
        themeBtn.setAttribute("aria-label", THEME_LABEL[t]);
        themeBtn.setAttribute("title", THEME_LABEL[t]);
        themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
        themeBtn.replaceChildren(MBP.icon(THEME_ICON[t], 20));
      }
      syncThemeColor(t);
    }

    applyTheme(currentTheme());
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        MBP.store.setTheme(next);
        applyTheme(next);
      });
    }

    // A page brought back with the browser's back/forward button can come from the back-forward cache, still
    // showing the theme and English setting it had then. Re-read the saved choices when that happens, and when
    // another tab changes them.
    function refreshPrefs() {
      apply(MBP.store.showEnglish());
      applyBookEn(MBP.store.bookEnOpen());
      applyTheme(currentTheme());
    }
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) refreshPrefs();
    });
    window.addEventListener("storage", function (e) {
      if (!e.key || /^mbp\.v1\.(theme|showEnglish|bookEnOpen)$/.test(e.key)) refreshPrefs();
    });
  }

  // Load the data, then run the page script. On failure, <main> shows the fixed error text.
  // The first sync runs alongside the data load, so the page shows the synced progress.
  function start(init) {
    Promise.all([MBP.load(), MBP.sync ? MBP.sync.beforeRender() : null]).then(function (r) {
      return init(r[0]);
    }, function () {
      var main = document.getElementById("main");
      if (main) {
        main.textContent = "";
        main.appendChild(h("div", { class: "note note-trap" }, LOAD_ERROR));
      }
    });
  }

  MBP.ui = {
    h: h,
    bi: bi,
    biQA: biQA,
    shuffle: shuffle,
    note: note,
    nobookNote: nobookNote,
    noteBoxes: noteBoxes,
    alsoIn: alsoIn,
    sheetFor: sheetFor,
    withBook: withBook,
    moreFor: moreFor,
    moreBlock: moreBlock,
    SHORT: SHORT,
    topicProgress: topicProgress,
    stampLevel: stampLevel,
    stamp: stamp,
    topicChip: topicChip,
    faceValue: faceValue,
    weekStamps: weekStamps,
    runBar: runBar,
    confirmInline: confirmInline,
    toast: toast,
    postmark: postmark,
    explainPanel: explainPanel,
    questionCard: questionCard,
    initShell: initShell,
    start: start
  };
})();
