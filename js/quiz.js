// Quiz: setup, normal quiz (feedback after each answer), exam mode (25 questions, pass at 20), results and review.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var shuffle = MBP.ui.shuffle;
  var EXAM_LENGTH = 25;
  var EXAM_PASS = 20;
  var NORMAL_PASS_PERCENT = 80;

  MBP.ui.initShell();
  MBP.ui.start(init);

  function init(D) {
    var params = new URLSearchParams(location.search);
    var main = document.getElementById("main");
    main.textContent = "";
    if (params.get("exam")) {
      return startRun(D, { mode: "normal", examId: params.get("exam") });
    }
    if (params.get("mode") === "exam") {
      return startRun(D, { mode: "exam", frequent: params.get("frequent") === "1" });
    }
    renderSetup(D, params);
  }

  // Questions whose cluster is in one of the topics (and, optionally, frequent only).
  function eligible(D, topics, frequent) {
    return D.questions.filter(function (q) {
      var c = D.cById.get(q.cluster_id);
      return topics.indexOf(c.topic_id) !== -1 && (!frequent || c.frequent);
    });
  }

  function randomQuestionOf(D, cluster) {
    var ids = cluster.question_ids;
    return D.qById.get(ids[Math.floor(Math.random() * ids.length)]);
  }

  // Exam: 25 distinct clusters, frequent ones twice as likely to be drawn, one random question each.
  function examList(D, frequent) {
    var pool = D.clusters.filter(function (c) { return !frequent || c.frequent; });
    var draw = [];
    pool.forEach(function (c) {
      draw.push(c);
      if (c.frequent) draw.push(c);
    });
    var seen = new Set();
    var clusters = [];
    shuffle(draw).forEach(function (c) {
      if (!seen.has(c.id)) {
        seen.add(c.id);
        clusters.push(c);
      }
    });
    return clusters.slice(0, EXAM_LENGTH).map(function (c) { return randomQuestionOf(D, c); });
  }

  // Length 10 or 25: one random question per cluster, going round again if needed, never repeating an id.
  // Length "all": every eligible question, shuffled.
  function normalList(D, topics, frequent, length) {
    var elig = eligible(D, topics, frequent);
    if (length === "all") return shuffle(elig);
    var n = Math.min(length, elig.length);
    var byCluster = new Map();
    elig.forEach(function (q) {
      if (!byCluster.has(q.cluster_id)) byCluster.set(q.cluster_id, []);
      byCluster.get(q.cluster_id).push(q);
    });
    var queues = Array.from(byCluster.values()).map(function (list) { return shuffle(list); });
    var out = [];
    while (out.length < n) {
      var took = false;
      shuffle(queues).forEach(function (queue) {
        if (queue.length && out.length < n) {
          out.push(queue.shift());
          took = true;
        }
      });
      if (!took) break;
    }
    return out;
  }

  function buildList(D, cfg) {
    if (cfg.fixedList) return cfg.fixedList;
    if (cfg.examId) {
      return D.questions
        .filter(function (q) { return q.exam === cfg.examId; })
        .sort(function (a, b) { return a.number - b.number; });
    }
    if (cfg.mode === "exam") return examList(D, cfg.frequent);
    return normalList(D, cfg.topics, cfg.frequent, cfg.length);
  }

  // ---- Setup screen --------------------------------------------------------

  function renderSetup(D, params) {
    var main = document.getElementById("main");
    main.appendChild(h("h1", null, "Quiz"));

    var allTopicIds = D.topics.map(function (t) { return t.id; });
    var preset = params.get("topics");
    var preChecked = preset ? preset.split(",").filter(function (id) { return allTopicIds.indexOf(id) !== -1; }) : allTopicIds;

    var allBox = h("input", { type: "checkbox", id: "topic-all" });
    var topicBoxes = D.topics.map(function (t) {
      var input = h("input", { type: "checkbox", name: "topic", value: t.id, id: "topic-" + t.id });
      input.checked = preChecked.indexOf(t.id) !== -1;
      return { input: input, topic: t };
    });
    allBox.checked = topicBoxes.every(function (b) { return b.input.checked; });

    var lenName = "len";
    var lenValues = [["10", "10"], ["25", "25"], ["all", null]];
    var lenInputs = lenValues.map(function (pair) {
      return h("input", { type: "radio", name: lenName, value: pair[0], id: "len-" + pair[0] });
    });
    lenInputs[0].checked = true;

    var freqBox = h("input", { type: "checkbox", id: "frequent" });
    var examBox = h("input", { type: "checkbox", id: "exam-mode" });
    var count = h("p", { class: "live-count", "aria-live": "polite" });
    var start = h("button", { type: "submit", class: "btn btn-primary" }, "Start quiz");

    function selectedTopics() {
      if (examBox.checked) return allTopicIds;
      return topicBoxes.filter(function (b) { return b.input.checked; }).map(function (b) { return b.topic.id; });
    }

    function selectedLength() {
      var on = lenInputs.find(function (i) { return i.checked; });
      return on && on.value === "all" ? "all" : Number(on ? on.value : 10);
    }

    function refresh() {
      var controlsOff = examBox.checked;
      allBox.disabled = controlsOff;
      lenInputs.forEach(function (i) { i.disabled = controlsOff; });
      topicBoxes.forEach(function (b) { b.input.disabled = controlsOff; });
      var n = eligible(D, selectedTopics(), freqBox.checked).length;
      count.textContent = "";
      count.appendChild(bi(n + " spørgsmål tilgængelige", n + " questions available", "span"));
      start.disabled = n === 0;
    }

    allBox.addEventListener("change", function () {
      topicBoxes.forEach(function (b) { b.input.checked = allBox.checked; });
      refresh();
    });
    topicBoxes.forEach(function (b) {
      b.input.addEventListener("change", function () {
        allBox.checked = topicBoxes.every(function (x) { return x.input.checked; });
        refresh();
      });
    });
    freqBox.addEventListener("change", refresh);
    examBox.addEventListener("change", refresh);
    lenInputs.forEach(function (i) { i.addEventListener("change", refresh); });

    var form = h("form", { class: "quiz-setup" },
      h("fieldset", null,
        h("legend", null, bi("Emner", "Topics", "span")),
        h("label", { class: "check" }, allBox, bi("Alt", "Everything", "span")),
        topicBoxes.map(function (b) {
          return h("label", { class: "check", for: b.input.id }, b.input, bi(b.topic.icon + " " + b.topic.title_da, b.topic.title_en, "span"));
        })),
      h("fieldset", null,
        h("legend", null, bi("Antal spørgsmål", "Number of questions", "span")),
        h("div", { class: "radio-row" },
          lenValues.map(function (pair, i) {
            var text = pair[1] === null ? bi("Alle", "All", "span") : pair[0];
            return h("label", null, lenInputs[i], text);
          }))),
      h("fieldset", null,
        h("label", { class: "check" }, freqBox,
          bi("Kun ⭐ mest stillede (stillet i 4+ prøver)", "Only ⭐ most repeated (asked in 4+ exams)", "span")),
        h("label", { class: "check" }, examBox,
          bi("Prøvetilstand: 25 spørgsmål, ingen svar før til sidst, bestå ved 20/25",
            "Exam mode: 25 questions, no answers until the end, pass at 20/25", "span"))),
      count,
      h("div", { class: "btn-row" }, start));

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var exam = examBox.checked;
      startRun(D, {
        mode: exam ? "exam" : "normal",
        topics: selectedTopics(),
        length: exam ? EXAM_LENGTH : selectedLength(),
        frequent: freqBox.checked
      });
    });

    main.appendChild(form);
    refresh();
  }

  // ---- Running a quiz -----------------------------------------------------

  function startRun(D, cfg) {
    var list = buildList(D, cfg);
    var main = document.getElementById("main");
    main.textContent = "";
    if (!list.length) {
      main.appendChild(bi("Ingen spørgsmål i dette valg.", "No questions for this choice.", "p"));
      return;
    }
    MBP.quiz = { list: list };
    runQuiz(D, cfg, list);
  }

  function runQuiz(D, cfg, list) {
    var main = document.getElementById("main");
    var isExam = cfg.mode === "exam";
    var n = list.length;
    var i = 0;
    var answers = new Map();
    var content = h("div", { id: "quiz" });
    var header = h("div", { class: "progress-line" });
    var bar = h("progress", { class: "qbar", max: String(n), value: "0" });
    main.textContent = "";
    main.appendChild(header);
    main.appendChild(bar);
    main.appendChild(content);

    function setHeader() {
      header.textContent = "";
      header.appendChild(bi("Spørgsmål " + (i + 1) + " / " + n, "Question " + (i + 1) + " / " + n, "span"));
      if (isExam) header.appendChild(bi(" · Prøvetilstand", " · Exam mode", "span"));
      bar.value = i;
    }

    function nextButton(label, onClick) {
      return h("button", { type: "button", class: "btn btn-primary", onclick: onClick }, label);
    }

    function showNormal() {
      content.textContent = "";
      setHeader();
      var q = list[i];
      var card = MBP.ui.questionCard(q, {
        feedback: true,
        onAnswer: function (ok, key) {
          answers.set(q.id, key);
          MBP.store.record(q.id, q.cluster_id, ok);
          var last = i === n - 1;
          var btn = nextButton(last ? bi("Se resultat", "See result", "span") : "Næste", function () {
            if (last) return finish();
            i++;
            showNormal();
          });
          card.el.appendChild(h("div", { class: "btn-row" }, btn));
          btn.focus();
        }
      });
      content.appendChild(card.el);
    }

    function showExam() {
      content.textContent = "";
      setHeader();
      var q = list[i];
      var card = MBP.ui.questionCard(q, {
        feedback: false,
        chosen: answers.get(q.id) || null,
        onChange: function (key) { answers.set(q.id, key); }
      });
      content.appendChild(card.el);
      var row = h("div", { class: "btn-row" });
      if (i > 0) {
        row.appendChild(h("button", {
          type: "button", class: "btn",
          onclick: function () { i--; showExam(); }
        }, bi("Forrige", "Previous", "span")));
      }
      if (i < n - 1) {
        row.appendChild(nextButton("Næste", function () { i++; showExam(); }));
      } else {
        row.appendChild(nextButton(bi("Aflever", "Hand in", "span"), handIn));
      }
      content.appendChild(row);
    }

    function handIn() {
      var unanswered = list.filter(function (q) { return !answers.get(q.id); }).length;
      if (unanswered > 0 && !confirm("Der er " + unanswered + " ubesvarede spørgsmål. Aflever alligevel? / " + unanswered + " unanswered. Hand in anyway?")) {
        return;
      }
      list.forEach(function (q) {
        var key = answers.get(q.id) || null;
        MBP.store.record(q.id, q.cluster_id, key === q.correct[0]);
      });
      finish();
    }

    function finish() {
      var score = list.filter(function (q) { return answers.get(q.id) === q.correct[0]; }).length;
      MBP.store.addQuiz({ date: new Date().toISOString(), mode: cfg.mode, score: score, total: n });
      renderResult(D, cfg, list, answers, score);
    }

    if (isExam) showExam();
    else showNormal();
  }

  // ---- Result and review ---------------------------------------------------

  function renderResult(D, cfg, list, answers, score) {
    var main = document.getElementById("main");
    var n = list.length;
    var isExam = cfg.mode === "exam";
    main.textContent = "";

    main.appendChild(h("h1", { class: "result-score" }, score + " / " + n));

    var passed;
    if (isExam) {
      passed = score >= EXAM_PASS;
      main.appendChild(h("div", { class: "verdict " + (passed ? "pass" : "fail") },
        passed
          ? bi("Bestået ✅", "Passed", "span")
          : bi("Ikke bestået ❌ – du skal have 20 rigtige", "Not passed – you need 20 correct", "span")));
    } else {
      var pct = n ? Math.round((score / n) * 100) : 0;
      passed = pct >= NORMAL_PASS_PERCENT;
      main.appendChild(h("p", null, pct + " %"));
      main.appendChild(h("div", { class: "verdict " + (passed ? "pass" : "fail") },
        passed
          ? bi("Bestået ✅", "Passed", "span")
          : bi("Ikke bestået ❌", "Not passed", "span")));
    }

    function isRight(q) { return answers.get(q.id) === q.correct[0]; }
    var wrong = list.filter(function (q) { return !isRight(q); });

    var reviewArea = h("div", { class: "review" });
    var showAll = false;
    var toggle = h("input", { type: "checkbox", id: "show-correct" });
    toggle.addEventListener("change", function () {
      showAll = toggle.checked;
      drawReview();
    });

    function drawReview() {
      reviewArea.textContent = "";
      list.forEach(function (q) {
        if (isRight(q) && !showAll) return;
        var card = MBP.ui.questionCard(q, {
          review: { chosen: answers.get(q.id) || null }
        });
        reviewArea.appendChild(h("div", { class: "review-item" }, card.el));
      });
    }

    if (wrong.length || showAll) {
      main.appendChild(h("h2", null, bi("Gennemgang", "Review", "span")));
    }
    if (list.some(function (q) { return isRight(q); })) {
      main.appendChild(h("label", { class: "toggle-line", for: "show-correct" }, toggle,
        bi("Vis også rigtige svar", "Also show correct answers", "span")));
    }
    main.appendChild(reviewArea);
    drawReview();

    var buttons = h("div", { class: "btn-row" });
    buttons.appendChild(h("button", {
      type: "button", class: "btn",
      onclick: function () { startRun(D, cfg); }
    }, bi("Prøv igen med samme indstillinger", "Retry same settings", "span")));
    if (wrong.length) {
      buttons.appendChild(h("button", {
        type: "button", class: "btn",
        onclick: function () {
          startRun(D, { mode: "normal", fixedList: shuffle(wrong) });
        }
      }, bi("Øv mine fejl", "Practise my mistakes", "span")));
    }
    buttons.appendChild(h("a", { class: "btn", href: "quiz.html" }, bi("Ny quiz", "New quiz", "span")));
    main.appendChild(buttons);
  }
})();
