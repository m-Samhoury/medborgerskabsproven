// Prøver: the 20 original exams with links to the PDFs and answer keys, a practice link and the best score for each.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;

  var MONTHS = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  var PASS = 20;
  var KEY_ERROR_EXAM = "2017-11";

  MBP.ui.initShell();
  MBP.ui.start(init);

  function monthYear(exam) {
    var parts = exam.split("-");
    return MONTHS[Number(parts[1]) - 1] + " " + parts[0];
  }

  // Month name with a capital letter, e.g. "November".
  function monthName(exam) {
    var name = MONTHS[Number(exam.split("-")[1]) - 1];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("De 20 rigtige prøver", "The 20 real exams", "h1"));
    main.appendChild(bi(
      "Alle officielle prøver fra december 2016 til juni 2026, med rettenøgle. Du kan også øve hver prøve her på siden.",
      "All official exams from December 2016 to June 2026, with answer keys. You can also practise each exam here on the site.",
      "p"));

    main.appendChild(h("section", {
      class: "note note-keyerror"
    },
      h("p", { class: "note-title" }, MBP.icon("flag", 16),
        bi("Fejl i rettenøglen fra november 2017", "Error in the November 2017 answer key", "span")),
      bi(
        "Rettenøglen fra november 2017, spørgsmål 23, har en fejl – det rigtige svar er C (Slesvig og Holsten).",
        "The November 2017 key, question 23, has an error – the correct answer is C (Slesvig and Holsten).",
        "p")));

    // Exams grouped by year, newest first.
    var years = [];
    D.exams.slice().reverse().forEach(function (exam) {
      var year = exam.split("-")[0];
      var group = years.filter(function (g) { return g.year === year; })[0];
      if (!group) {
        group = { year: year, exams: [] };
        years.push(group);
      }
      group.exams.push(exam);
    });

    years.forEach(function (group) {
      var section = h("section", { class: "exam-year" }, h("h2", null, group.year));
      group.exams.forEach(function (exam) {
        section.appendChild(examRow(D, exam));
      });
      main.appendChild(section);
    });
  }

  // One exam: name, best score and key-error pill on the left; PDFs and practice on the right.
  function examRow(D, exam) {
    var best = MBP.store.bestScore(exam);
    var total = D.questions.filter(function (q) { return q.exam === exam; }).length;
    var left = [h("p", { class: "exam-name" }, monthName(exam))];
    if (best !== null) {
      var stat = h("p", { class: "exam-best" }, bi("Dit bedste: " + best + "/" + total, "Your best: " + best + "/" + total, "span"));
      if (best >= PASS) {
        var mark = MBP.ui.postmark("bestaet", "exam-pm");
        mark.setAttribute("width", "22");
        mark.setAttribute("height", "22");
        mark.querySelectorAll("text")[1].remove();
        stat.appendChild(mark);
      }
      left.push(stat);
    }
    if (exam === KEY_ERROR_EXAM) {
      left.push(h("span", { class: "pill-keyerr" }, MBP.icon("flag", 13), "Fejl i svar-arket, spm. 23"));
    }

    return h("div", { class: "exam-row" },
      h("div", { class: "exam-info" }, left),
      h("div", { class: "btn-row" },
        h("a", { class: "btn btn-secondary btn-small", href: "exams/" + exam + "_medborgerskabsproeve.pdf", target: "_blank", rel: "noopener" },
          MBP.icon("open", 16), "Prøve (PDF)"),
        h("a", { class: "btn btn-secondary btn-small", href: "exams/" + exam + "_medborgerskabsproeve_svar.pdf", target: "_blank", rel: "noopener" },
          MBP.icon("open", 16), "Svar (PDF)"),
        h("a", { class: "btn btn-primary btn-small", href: "quiz.html?exam=" + exam },
          bi("Øv denne prøve", "Practise this exam", "span"))));
  }
})();
