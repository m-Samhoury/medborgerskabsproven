// Home: the countdown with today's stamps, the album of topic stamps, latest results and the 15 most-asked questions.
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

    var days = daysToExam(new Date());
    var total = D.clusters.length;
    var mastered = D.clusters.filter(function (c) { return MBP.store.isMastered(c.id); }).length;
    var open = total - mastered;
    var perDay = days > 0 ? Math.ceil(open / days) : open;
    var today = MBP.store.today();
    var streak = MBP.store.streak();
    var allMastered = mastered >= total;

    main.appendChild(h("div", { class: "home" },
      todayPanel(days, streak, today, allMastered, perDay, total),
      quickActions(),
      album(D, mastered, total),
      latestResults(),
      top15(D),
      resetButton()));
  }

  // The blue "today" panel: countdown, week strip, summary and the main button.
  function todayPanel(days, streak, today, allMastered, perDay, total) {
    var label;
    var number = null;
    if (days > 1) {
      number = String(days);
      label = bi("dage til prøven", "days to the test", "h1");
    } else if (days === 1) {
      number = "1";
      label = bi("dag til prøven", "day to the test", "h1");
    } else if (days === 0) {
      label = bi("I dag! Held og lykke!", "Today! Good luck!", "h1");
    } else {
      label = bi("Prøven er overstået.", "The exam is over.", "h1");
    }

    var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dagens mål er nået" : today.answers + " af 25 svar i dag");
    var summaryEn = (streak === 1 ? "1 day in a row" : streak + " days in a row") + ", " + (today.answers >= 25 ? today.answers + " answers today – daily goal reached" : today.answers + " of 25 answers today");
    var summaryTail = today.answers >= 25 ? MBP.icon("check", 18) : null;

    var cta;
    if (allMastered) {
      cta = h("a", { class: "btn btn-stack cta", href: "quiz.html?mode=exam" },
        bi("Tag en prøvesimulering", "Take an exam simulation", "span"));
    } else if (!MBP.store.hasAnyProgress()) {
      cta = h("a", { class: "btn btn-stack cta", href: "learn.html?topic=all" },
        bi("Start med dagens mærker", "Start with today's stamps", "span"));
    } else {
      cta = h("a", { class: "btn btn-stack cta", href: "learn.html?topic=all" },
        bi("Saml dagens mærker", "Collect today's stamps", "span"));
    }

    var courseNote = null;
    if (days > 0 && !allMastered) {
      courseNote = bi(
        "Dagens kurs er 10 emner. For at nå alle " + total + " inden prøven: ca. " + perDay + " om dagen.",
        "Today's course is 10 items. To cover all " + total + " before the test: about " + perDay + " a day.",
        "p");
    }

    var waves = '<svg class="waves" viewBox="0 0 180 60" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M0 10c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 30c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 50c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/></svg>';
    var wavesEl = document.createElement("div");
    wavesEl.innerHTML = waves;

    return h("section", { class: "today" },
      wavesEl.firstChild,
      number ? h("div", { class: "days" }, number) : null,
      label,
      bi(
        "Onsdag 25. november 2026",
        "Wednesday 25 November 2026",
        "p"),
      MBP.ui.weekStamps(),
      h("p", { class: "summary" }, bi(summaryDa, summaryEn, "span"), summaryTail),
      cta,
      courseNote ? h("p", { class: "cta-note" }, courseNote) : null);
  }

  // Two secondary actions under the panel.
  function quickActions() {
    return h("div", { class: "quick" },
      h("a", { class: "btn btn-secondary", href: "quiz.html?mode=exam", title: "Exam simulation – 25 questions" },
        MBP.icon("test", 22), bi("Prøvesimulering", "Exam simulation", "span")),
      h("a", { class: "btn btn-secondary", href: "study.html", title: "Read the material" },
        MBP.icon("read", 22), bi("Læs stoffet", "Read the material", "span")));
  }

  // The album: one stamp per topic, in topic order, with a legend.
  function album(D, mastered, total) {
    var stamps = h("div", { class: "album" });
    D.topics.forEach(function (t) {
      stamps.appendChild(MBP.ui.stamp(t, MBP.ui.topicProgress(D, t), { href: "study.html#" + t.id }));
    });
    return h("section", { class: "album-sec" },
      bi("Dit album", "Your album", "h2"),
      bi(mastered + " af " + total + " mærker samlet", mastered + " of " + total + " stamps collected", "p"),
      stamps,
      h("div", { class: "legend" },
        h("span", { class: "swatches", "aria-hidden": "true" },
          h("span", { class: "sw sw-0" }),
          h("span", { class: "sw sw-1" }),
          h("span", { class: "sw sw-4" })),
        bi(
          "Tom: ikke startet. Farvet: i gang. Trykt med stempel: mestret.",
          "Blank: not started. Tinted: in progress. Printed with postmark: mastered.",
          "p")));
  }

  // The five newest quiz results as chips.
  function latestResults() {
    var quizzes = MBP.store.progress().quizzes.slice(-5).reverse();
    var section = h("section", { class: "latest" }, bi("Seneste resultater", "Latest results", "h2"));
    if (quizzes.length === 0) {
      section.appendChild(bi(
        "Ingen resultater endnu. Tag en prøvesimulering, når du har øvet lidt.",
        "No results yet. Take an exam simulation once you have practised a little.",
        "p"));
      return section;
    }
    var row = h("div", { class: "result-row" });
    quizzes.forEach(function (qz) {
      var d = new Date(qz.date);
      var passed = qz.score / qz.total >= 0.8;
      var when = qz.mode === "exam" ? "Prøve" : "Quiz";
      row.appendChild(h("div", { class: "result-chip" },
        h("span", { class: "score" }, qz.score + "/" + qz.total),
        h("span", { class: passed ? "dot pass" : "dot fail", "aria-hidden": "true" }),
        h("span", { class: "meta" }, when + ", " + d.getDate() + "." + two(d.getMonth() + 1) + ".")));
    });
    section.appendChild(row);
    return section;
  }

  // The 15 most-asked questions, closed on phones and open from 760px.
  function top15(D) {
    var section = h("section", { class: "top15-sec" },
      h("h2", null, MBP.icon("star", 22), bi("De 15 mest stillede spørgsmål", "The 15 most-asked questions", "span")));
    var details = h("details", { class: "top15" }, h("summary", null, bi("Vis listen", "Show the list", "span")));
    var ol = h("ol", { class: "top-list" });
    D.clusters.slice(0, 15).forEach(function (c) {
      var topic = D.tById.get(c.topic_id);
      var style = topic ? "--c: var(--t-" + topic.id + ")" : null;
      ol.appendChild(h("li", { class: "topic-scope", style: style },
        h("div", { class: "face" }, MBP.ui.faceValue(c.times_asked)),
        h("div", { class: "body" },
          topic ? MBP.ui.topicChip(topic) : null,
          biQA(c.canonical_question_da, c.canonical_question_en, c.answer_da, c.answer_en, "div"))));
    });
    details.appendChild(ol);
    if (window.matchMedia && window.matchMedia("(min-width: 760px)").matches) details.open = true;
    section.appendChild(details);
    return section;
  }

  // Reset progress, behind an inline confirm.
  function resetButton() {
    var btn = h("button", {
      type: "button",
      class: "btn btn-quiet reset",
      title: "Reset progress"
    }, "Nulstil fremgang");
    btn.addEventListener("click", function () {
      MBP.ui.confirmInline(btn, {
        da: "Nulstil al fremgang? Det kan ikke fortrydes.",
        en: "Reset all progress? This cannot be undone.",
        actionDa: "Nulstil",
        actionEn: "Reset",
        cancelDa: "Annullér",
        cancelEn: "Cancel",
        onAction: function () {
          MBP.store.reset();
          location.reload();
        }
      });
    });
    return h("div", { class: "reset-row" }, btn);
  }
})();
