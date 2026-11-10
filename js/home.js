// Home (I dag): the countdown panel, the two main buttons (Lær and Test), the link to the 15 most-asked questions and reset.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;

  MBP.ui.initShell();
  MBP.ui.start(init);

  // Whole days from today to 25 November 2026 (same as local midnight arithmetic, but DST-proof).
  function daysToExam(now) {
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    var exam = Date.UTC(2026, 10, 25);
    return Math.round((exam - today) / 86400000);
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
      mainActions(),
      top15Link(),
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

  // The two main buttons under the panel: learn and test.
  function mainActions() {
    return h("div", { class: "quick" },
      h("a", { class: "btn btn-secondary", href: "learn.html", title: "Learn – choose a topic" },
        MBP.icon("practise", 22),
        h("span", { class: "btn-text" },
          bi("Lær", "Learn", "span"),
          h("span", { class: "hint" }, bi("Vælg et emne", "Choose a topic", "span")))),
      h("a", { class: "btn btn-secondary", href: "quiz.html?mode=quiz", title: "Test – choose a topic or all" },
        MBP.icon("test", 22),
        h("span", { class: "btn-text" },
          bi("Test", "Test", "span"),
          h("span", { class: "hint" }, bi("Vælg emne eller alle", "Choose a topic or all", "span")))));
  }

  // Quiet link to the 15 most-asked questions, on their own page.
  function top15Link() {
    return h("a", { class: "btn btn-quiet top15-link", href: "top15.html", title: "The 15 most-asked questions" },
      MBP.icon("star", 20), bi("De 15 mest stillede spørgsmål", "The 15 most-asked questions", "span"));
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
