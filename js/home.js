// Home: countdown, daily target, progress, last quiz results, shortcuts and the 15 most-asked questions.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var biQA = MBP.ui.biQA;

  MBP.ui.initShell();
  MBP.ui.start(init);

  // Whole days from today to 25 November 2026 (same as local midnight arithmetic, but DST-proof).
  function daysToExam(now) {
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    var exam = Date.UTC(2026, 10, 25);
    return Math.round((exam - today) / 86400000);
  }

  function two(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("Hjem", "Home", "h1"));

    var days = daysToExam(new Date());

    // 1. Countdown
    var countdown = h("section", { class: "panel countdown" });
    if (days > 0) {
      countdown.appendChild(h("div", { class: "big-number" }, String(days)));
      countdown.appendChild(bi("dage til prøven", "days to the exam", "p"));
    } else if (days === 0) {
      countdown.appendChild(h("div", { class: "big-number" }, "0"));
      countdown.appendChild(bi("I dag! Held og lykke!", "Today! Good luck!", "p"));
    } else {
      countdown.appendChild(bi("Prøven er overstået.", "The exam is over.", "p"));
    }
    countdown.appendChild(bi(
      "Prøven: onsdag 25. november 2026",
      "The exam: Wednesday 25 November 2026",
      "p"));
    main.appendChild(countdown);

    // 2. Daily target
    var mastered = D.clusters.filter(function (c) { return MBP.store.isMastered(c.id); }).length;
    var open = D.clusters.length - mastered;
    var perDay = days > 0 ? Math.ceil(open / days) : open;
    main.appendChild(h("section", { class: "panel" },
      bi("Mål i dag: lær " + perDay + " emner", "Today's goal: learn " + perDay + " items", "p"),
      h("div", { class: "btn-row" },
        h("a", { class: "btn btn-primary", href: "learn.html?topic=all" }, bi("Start", "Start", "span")))));

    // 3. Progress
    var progressSection = h("section", { class: "panel" });
    progressSection.appendChild(bi(
      mastered + " af " + D.clusters.length + " emner mestret",
      mastered + " of " + D.clusters.length + " items mastered",
      "p"));
    progressSection.appendChild(h("progress", { max: String(D.clusters.length), value: String(mastered), "aria-label": "Mestret / Mastered" }));
    var topicList = h("div", { class: "topic-list" });
    D.topics.forEach(function (t) {
      var clusters = t.cluster_ids.map(function (id) { return D.cById.get(id); }).filter(Boolean);
      var done = clusters.filter(function (c) { return MBP.store.isMastered(c.id); }).length;
      topicList.appendChild(h("a", { class: "topic-row", href: "study.html#" + t.id },
        h("span", { class: "icon", "aria-hidden": "true" }, t.icon),
        h("span", { class: "label" }, bi(t.title_da, t.title_en, "span")),
        h("progress", { max: String(clusters.length), value: String(done), "aria-label": t.title_da })));
    });
    progressSection.appendChild(topicList);
    main.appendChild(progressSection);

    // 4. Last quiz results (newest first)
    var quizzes = MBP.store.progress().quizzes.slice(-5).reverse();
    var quizSection = h("section", { class: "panel" });
    quizSection.appendChild(bi("Seneste quizresultater", "Latest quiz results", "h2"));
    if (quizzes.length === 0) {
      quizSection.appendChild(bi("Ingen quizzer endnu.", "No quizzes yet.", "p"));
    } else {
      var list = h("ul", { class: "row-list" });
      quizzes.forEach(function (qz) {
        var d = new Date(qz.date);
        var passed = qz.score / qz.total >= 0.8;
        list.appendChild(h("li", null,
          d.getDate() + "." + (d.getMonth() + 1) + ". · " + qz.score + "/" + qz.total + " · ",
          passed ? bi("Bestået", "Passed", "span") : bi("Ikke bestået", "Not passed", "span")));
      });
      quizSection.appendChild(list);
    }
    main.appendChild(quizSection);

    // 5. Link cards
    main.appendChild(h("div", { class: "card-grid" },
      cardLink("study.html", "📖 Læs stoffet", "Study the material"),
      cardLink("learn.html", "🧠 Lær med hjælp", "Assisted learning"),
      cardLink("quiz.html", "✅ Tag en quiz", "Take a quiz"),
      cardLink("quiz.html?mode=exam", "🎯 Prøv en rigtig prøve (25 spm.)", "Try a real exam (25 qs)")));

    // 6. Top 15
    var top = h("section", { class: "panel" });
    top.appendChild(bi("⭐ De 15 mest stillede spørgsmål", "The 15 most-asked questions", "h2"));
    var ol = h("ol", { class: "top-list" });
    D.clusters.slice(0, 15).forEach(function (c) {
      ol.appendChild(h("li", null, biQA(
        c.canonical_question_da, c.canonical_question_en,
        c.answer_da, c.answer_en,
        "div",
        " (×" + c.times_asked + ")", " (×" + c.times_asked + ")")));
    });
    top.appendChild(ol);
    main.appendChild(top);

    // 7. Reset
    main.appendChild(h("div", { class: "btn-row" },
      h("button", {
        type: "button",
        class: "btn btn-sm",
        onclick: function () {
          if (!confirm("Nulstil al fremgang? / Reset all progress?")) return;
          MBP.store.reset();
          location.reload();
        }
      }, bi("Nulstil fremgang", "Reset progress", "span"))));
  }

  function cardLink(href, da, en) {
    return h("a", { class: "link-card", href: href }, bi(da, en, "span"));
  }
})();
