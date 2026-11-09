// The 15 most-asked questions: the list, with buttons to practise or test only these.
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

    main.appendChild(h("div", { class: "top15" },
      h("a", { class: "btn btn-quiet", href: "index.html" },
        bi("← Tilbage til I dag", "Back to Today", "span")),
      bi("De 15 mest stillede spørgsmål", "The 15 most-asked questions", "h1"),
      bi(
        "Spørgsmålene, der er kommet flest gange i de 20 prøver.",
        "The questions asked most often in the 20 exams.",
        "p"),
      list(D),
      h("div", { class: "btn-row" },
        h("a", { class: "btn btn-primary", href: "learn.html?topic=all&frequent=1", title: "Practise the most-asked" },
          bi("Øv de ofte stillede", "Practise the most-asked", "span")),
        h("a", { class: "btn btn-secondary", href: "quiz.html?mode=quiz&frequent=1", title: "Test the most-asked" },
          bi("Test de ofte stillede", "Test the most-asked", "span")))));
  }

  // The 15 clusters asked most often, numbered by their face value.
  function list(D) {
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
    return ol;
  }
})();
