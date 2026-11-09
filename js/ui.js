// Shared rendering helpers. All data text goes in through textContent / text nodes, never innerHTML.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  var LOAD_ERROR = "Kunne ikke indlæse data. Prøv at genindlæse siden. / Could not load data. Try reloading the page.";

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

  // bi(da, en, tag): bilingual text. The .en span is left out when there is no English.
  function bi(da, en, tag) {
    var kids = [h("span", { class: "da" }, da)];
    if (en) kids.push(h("span", { class: "en", lang: "en" }, en));
    return h(tag || "p", { class: "bi" }, kids);
  }

  // Question → answer line with the answer in bold. `extraDa`/`extraEn` are appended as plain text.
  function biQA(qDa, qEn, aDa, aEn, tag, extraDa, extraEn) {
    var da = [qDa + " → ", h("strong", null, aDa)];
    if (extraDa) da.push(extraDa);
    var en = [qEn + " → ", h("strong", null, aEn)];
    if (extraEn) en.push(extraEn);
    return h(tag || "p", { class: "bi" }, h("span", { class: "da" }, da), h("span", { class: "en", lang: "en" }, en));
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

  function box(cls, titleDa, titleEn, bodyDa, bodyEn) {
    return h("div", { class: "box " + cls },
      h("div", { class: "box-title" }, bi(titleDa, titleEn, "span")),
      bi(bodyDa, bodyEn, "p"));
  }

  // The trap and "changed since the exam" boxes for a cluster (both optional).
  function noteBoxes(c) {
    var out = [];
    if (c.trap_note_da) out.push(box("trap", "⚠️ Pas på", "Watch out", c.trap_note_da, c.trap_note_en));
    if (c.current_note_da) out.push(box("current", "🔄 Ændret siden prøven", "Changed since the exam", c.current_note_da, c.current_note_en));
    return out;
  }

  // Explanation panel (§4.5): correct answer, fact, notes, key-error note, frequency line.
  function explainPanel(q) {
    var D = MBP.data;
    var c = D.cById.get(q.cluster_id);
    var correct = q.options.find(function (o) { return o.key === q.correct[0]; });
    var kids = [
      bi("Rigtigt svar:", "Correct answer:", "p"),
      bi(correct.text_da, correct.text_en, "p"),
      h("div", { class: "fact" }, bi(c.fact_da, c.fact_en, "p"))
    ];
    kids = kids.concat(noteBoxes(c));
    if (q.official_correct) {
      kids.push(h("div", { class: "box keyerror" }, bi(
        "Den officielle rettenøgle fra 2017 siger fejlagtigt B (Skåne, Halland og Blekinge). Det rigtige svar er Slesvig og Holsten – Skåne blev mistet i 1658.",
        "The official 2017 answer key wrongly says B (Skåne, Halland and Blekinge). The correct answer is Slesvig and Holsten – Skåne was lost in 1658.",
        "p")));
    }
    kids.push(h("p", { class: "muted small" }, bi(
      "Stillet i " + c.times_asked + " prøver: " + c.exams.join(", "),
      "Asked in " + c.times_asked + " exams: " + c.exams.join(", "),
      "span")));
    return h("div", { class: "explain-inner" }, kids);
  }

  // Question card (§4.4).
  // opts: feedback (bool, default true), onAnswer(isCorrect, key), onChange(key) for exam mode,
  //       chosen (key preselected), review ({chosen}) for a locked review card.
  // Returns {el, getChoice()}.
  function questionCard(q, opts) {
    opts = opts || {};
    var D = MBP.data;
    var cluster = D.cById.get(q.cluster_id);
    var feedback = opts.feedback !== false;
    var review = opts.review || null;
    var correctKey = q.correct[0];
    var order = shuffle(q.options);
    var chosen = opts.chosen || null;
    var locked = !!review;
    var buttons = [];
    var explain = h("div", { class: "explain", "aria-live": "polite" });

    function decorate(chosenKey) {
      buttons.forEach(function (b, i) {
        var key = order[i].key;
        if (key === correctKey) {
          b.btn.classList.add("correct");
          b.mark.textContent = "✓";
          b.sr.textContent = "Rigtigt";
        } else if (key === chosenKey) {
          b.btn.classList.add("wrong");
          b.mark.textContent = "✗";
          b.sr.textContent = "Forkert";
        }
      });
    }

    function lock() {
      locked = true;
      buttons.forEach(function (b) { b.btn.classList.add("locked"); });
    }

    function showExplanation() {
      explain.textContent = "";
      explain.appendChild(explainPanel(q));
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
      decorate(key);
      showExplanation();
      if (opts.onAnswer) opts.onAnswer(key === correctKey, key);
    }

    var fieldsetChildren = [h("legend", { class: "sr" }, q.question_da)];
    order.forEach(function (o, i) {
      var mark = h("span", { class: "mark", "aria-hidden": "true" });
      var sr = h("span", { class: "sr" });
      var btn = h("button", {
        type: "button",
        class: "opt",
        "aria-pressed": feedback ? null : String(chosen === o.key),
        onclick: function () { choose(i); }
      }, bi(o.text_da, o.text_en, "span"), mark, sr);
      if (chosen === o.key && !feedback) btn.classList.add("selected");
      buttons.push({ btn: btn, mark: mark, sr: sr });
      fieldsetChildren.push(btn);
    });

    var el = h("article", { class: "qcard" },
      h("div", { class: "meta" },
        bi("Prøve " + q.exam + " · spm. " + q.number, "Exam " + q.exam + " · q. " + q.number, "span"),
        cluster && cluster.frequent ? h("span", { class: "badge" }, "⭐ Ofte stillet") : null),
      bi(q.question_da, q.question_en, "h2"),
      h("fieldset", { class: "opts" }, fieldsetChildren),
      explain);

    if (review) {
      lock();
      decorate(review.chosen);
      if (!review.chosen) {
        explain.appendChild(h("p", { class: "notice" }, bi("Ikke besvaret", "Not answered", "span")));
      }
      showExplanation();
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
      if (n >= 1 && n <= buttons.length) {
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

  // Small helper so pages can write their EN toggle state once.
  function initShell() {
    var btn = document.getElementById("en-toggle");
    function apply(on) {
      document.documentElement.classList.toggle("hide-en", !on);
      if (btn) {
        btn.textContent = on ? "EN: til" : "EN: fra";
        btn.setAttribute("aria-pressed", String(on));
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
  }

  // Load the data, then run the page script. On failure, <main> shows the fixed error text.
  function start(init) {
    MBP.load().then(init, function () {
      var main = document.getElementById("main");
      if (main) main.textContent = LOAD_ERROR;
    });
  }

  MBP.ui = {
    h: h,
    bi: bi,
    biQA: biQA,
    shuffle: shuffle,
    box: box,
    noteBoxes: noteBoxes,
    explainPanel: explainPanel,
    questionCard: questionCard,
    initShell: initShell,
    start: start
  };
})();
