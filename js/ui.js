// Shared rendering helpers. All data text goes in through textContent / text nodes, never innerHTML.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  var LOAD_ERROR = "Kunne ikke indlæse data. Prøv at genindlæse siden. / Could not load data. Try reloading the page.";

  // Short Danish and English stamp names (the stamps are small).
  var SHORT = {
    demokrati: ["Demokrati", "Democracy"],
    kongehus: ["Kongehus", "Royal family"],
    historie: ["Historie", "History"],
    geografi: ["Geografi", "Geography"],
    arbejde: ["Arbejde", "Work"],
    velfaerd: ["Velfærd", "Welfare"],
    uddannelse: ["Uddannelse", "Education"],
    kultur: ["Kultur", "Culture"],
    traditioner: ["Højtider", "Holidays"],
    verden: ["Verden", "The world"]
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

  // The trap, "changed since the exam" and "not in the book" notes for a cluster (all optional).
  function noteBoxes(c) {
    var out = [];
    if (c.trap_note_da) out.push(note("trap", "Pas på", "Watch out", c.trap_note_da, c.trap_note_en));
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

  function refBlock(r) {
    var text = (MBP.data && MBP.data.book && MBP.data.book[r.page + ":" + r.lines]) || "";
    return h("section", { class: "book-ref" },
      h("p", { class: "book-cite" }, "Læremateriale 2026 · " + refLabel(r)),
      text ? h("blockquote", { class: "book-quote", lang: "da" }, text.split("\n").map(function (para) {
        return h("p", null, para);
      })) : null,
      h("p", { class: "book-links" },
        h("a", { href: BOOK_PDF + "#page=" + r.page, target: "_blank", rel: "noopener" },
          MBP.icon("open", 16), bi("Åbn side " + r.page + " i bogen", "Open page " + r.page + " in the book (PDF)", "span"))));
  }

  // One link to the official copy of the book (danskogproever.dk), at the first page referenced.
  function officialLink(refs) {
    return h("p", { class: "book-links book-official" },
      h("a", { href: BOOK_URL + "#page=" + refs[0].page, target: "_blank", rel: "noopener" },
        MBP.icon("open", 16), bi("Officiel kilde: danskogproever.dk", "Official source", "span")));
  }

  // Places the popover under the button, or above it when there is more room there,
  // inside the page gutters. Its height is capped to the room on that side, so it never covers the button.
  function placePop(btn) {
    var gutter = 16;
    var vw = document.documentElement.clientWidth;
    var width = Math.min(440, vw - 2 * gutter);
    pop.style.width = width + "px";
    pop.style.maxHeight = "";
    var r = btn.getBoundingClientRect();
    var left = Math.max(gutter, Math.min(r.left + r.width / 2 - width / 2, vw - width - gutter));
    pop.style.left = (left + window.scrollX) + "px";
    var below = window.innerHeight - r.bottom - 16;
    var above = r.top - 16;
    var natural = pop.offsetHeight;
    var under = below >= natural || below >= above;
    var room = Math.min(POP_MAX, Math.max(160, under ? below : above));
    if (natural > room) pop.style.maxHeight = room + "px";
    var height = Math.min(natural, room);
    var top = under ? r.bottom + 8 : r.top - height - 8;
    pop.style.top = (top + window.scrollY) + "px";
  }

  function openBook(btn, refs) {
    if (!pop) buildPop();
    if (popOwner === btn && !pop.hidden) {
      closeBook(true);
      return;
    }
    closeBook(false);
    pop.textContent = "";
    pop.appendChild(h("div", { class: "book-pop-head" },
      h("p", { class: "book-pop-title", id: "book-pop-title" }, MBP.icon("book", 18),
        bi("Læs mere i bogen", "Read more in the book", "span")),
      h("button", { type: "button", class: "book-pop-close", "aria-label": "Luk – Close", title: "Luk – Close",
        onclick: function () { closeBook(true); } }, MBP.icon("close", 18))));
    pop.appendChild(h("div", { class: "book-pop-body" }, refs.map(refBlock), officialLink(refs)));
    pop.hidden = false;
    popOwner = btn;
    btn.setAttribute("aria-expanded", "true");
    placePop(btn);
    pop.focus({ preventScroll: true });
  }

  // The small book button. refs: [{page, lines}]. Returns null when there are no references.
  function bookButton(refs) {
    if (!refs || !refs.length) return null;
    var label = "Læs mere i bogen: " + refs.map(refLabel).join("; ");
    var btn = h("button", {
      type: "button",
      class: "book-btn",
      "aria-haspopup": "dialog",
      "aria-expanded": "false",
      "aria-controls": "book-pop",
      "aria-label": label,
      title: "Læs mere i bogen – Read more in the book"
    }, MBP.icon("book", 18));
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openBook(btn, refs);
    });
    return btn;
  }

  // Adds the book button at the end of the Danish line of a bi()/biQA() element. Returns el.
  function withBook(el, refs) {
    var btn = bookButton(refs);
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
      var cls = [on ? "on" : null, key === todayKey ? "today" : null].filter(Boolean).join(" ");
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
    // The exam's key stays as published; where the book now says something else, a note says so.
    if (q.book_note_da) {
      kids.push(q.book_status === "nobook"
        ? nobookNote(q.book_note_da, q.book_note_en)
        : note("changed", "Bogen siger nu", "The book now says", q.book_note_da, q.book_note_en, c.book));
    }
    kids = kids.concat(noteBoxes(c));
    if (q.official_correct) {
      kids.push(note("keyerror", "Fejl i rettenøglen fra 2017", "Error in the 2017 answer key",
        "Den officielle rettenøgle fra 2017 siger fejlagtigt B (Skåne, Halland og Blekinge). Det rigtige svar er Slesvig og Holsten – Skåne blev mistet i 1658.",
        "The official 2017 answer key wrongly says B (Skåne, Halland and Blekinge). The correct answer is Slesvig and Holsten – Skåne was lost in 1658.",
        KEYERROR_REFS));
    }
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
    var topic = cluster ? D.tById.get(cluster.topic_id) : null;
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
    if (btn) {
      btn.addEventListener("click", function () {
        var on = document.documentElement.classList.contains("hide-en");
        MBP.store.setShowEnglish(on);
        apply(on);
      });
    }

    // Theme button: cycles Auto → Lys → Mørk → Auto. Label is bilingual; icon shows the current state.
    var themeBtn = document.getElementById("theme-toggle");
    var THEME_NEXT = { auto: "light", light: "dark", dark: "auto" };
    var THEME_NAME = { auto: ["Auto", "auto"], light: ["Lys", "light"], dark: ["Mørk", "dark"] };
    var THEME_ICON = { auto: "theme-auto", light: "theme-light", dark: "theme-dark" };
    var THEME_COLOR = { light: "#F3F5F9", dark: "#0B1430" };

    // The page's two theme-color metas are media-scoped; an explicit choice replaces them with one fixed colour.
    function syncThemeColor(t) {
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      if (metas.length < 2) return;
      var light = metas[0];
      var dark = metas[1];
      if (t === "auto") {
        light.setAttribute("media", "(prefers-color-scheme: light)");
        light.setAttribute("content", THEME_COLOR.light);
        dark.setAttribute("media", "(prefers-color-scheme: dark)");
        dark.setAttribute("content", THEME_COLOR.dark);
      } else {
        light.removeAttribute("media");
        light.setAttribute("content", THEME_COLOR[t]);
        dark.setAttribute("media", "not all");
      }
    }

    function applyTheme(t) {
      if (t === "auto") document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", t);
      if (themeBtn) {
        var label = "Tema: " + THEME_NAME[t][0] + " – Theme: " + THEME_NAME[t][1];
        themeBtn.setAttribute("aria-label", label);
        themeBtn.setAttribute("title", label);
        themeBtn.replaceChildren(MBP.icon(THEME_ICON[t], 20));
      }
      syncThemeColor(t);
    }

    applyTheme(MBP.store.theme());
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = THEME_NEXT[MBP.store.theme()];
        MBP.store.setTheme(next);
        applyTheme(next);
      });
    }
  }

  // Load the data, then run the page script. On failure, <main> shows the fixed error text.
  function start(init) {
    MBP.load().then(init, function () {
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
    withBook: withBook,
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
