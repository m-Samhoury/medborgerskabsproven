// Original exams: links to the PDFs and answer keys, plus a practice link for each exam.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;

  var MONTHS = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];

  MBP.ui.initShell();
  MBP.ui.start(init);

  function monthYear(exam) {
    var parts = exam.split("-");
    return MONTHS[Number(parts[1]) - 1] + " " + parts[0];
  }

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(bi("De originale prøver", "The original exams", "h1"));
    main.appendChild(h("div", { class: "intro-box" }, bi(
      "Her er alle 20 officielle prøver med rettenøgle (svar). Bemærk: rettenøglen fra november 2017, spørgsmål 23, har en fejl – det rigtige svar er C (Slesvig og Holsten).",
      "All 20 official exams with answer keys. Note: the November 2017 key, question 23, has an error – the correct answer is C (Slesvig and Holsten).",
      "p")));

    var list = h("ul", { class: "exam-list" });
    D.exams.slice().reverse().forEach(function (exam) {
      list.appendChild(h("li", null,
        h("div", { class: "exam-name" }, monthYear(exam)),
        h("div", { class: "exam-links" },
          h("a", { href: "exams/" + exam + "_medborgerskabsproeve.pdf", target: "_blank", rel: "noopener" }, "📄 Prøve"),
          h("a", { href: "exams/" + exam + "_medborgerskabsproeve_svar.pdf", target: "_blank", rel: "noopener" }, "🔑 Svar"),
          h("a", { href: "quiz.html?exam=" + exam }, bi("Øv denne prøve", "Practise this exam", "span")))));
    });
    main.appendChild(list);
  }
})();
