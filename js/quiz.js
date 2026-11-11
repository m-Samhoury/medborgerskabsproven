// Test: setup, quiz with feedback, exam simulation (25 questions, pass at 20), results and review.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var shuffle = MBP.ui.shuffle;
  var EXAM_LENGTH = 25;
  var EXAM_PASS = 20;
  var NORMAL_PASS_PERCENT = 80;
  var MONTHS = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  var WAVES = '<svg class="waves" viewBox="0 0 180 60" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M0 10c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 30c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 50c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/></svg>';

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
      var inSheet = (c.topic_ids || [c.topic_id]).some(function (id) { return topics.indexOf(id) !== -1; });
      return inSheet && (!frequent || c.frequent);
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

  // 2-digit number for dates.
  function two(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // "2017-11" -> "November 2017".
  function monthYear(exam) {
    var parts = exam.split("-");
    var name = MONTHS[Number(parts[1]) - 1];
    return name.charAt(0).toUpperCase() + name.slice(1) + " " + parts[0];
  }

  // Daily goal toast, shown once a day when the 25th answer is recorded.
  function goalToast() {
    MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers");
  }

  // ---- Setup screen --------------------------------------------------------

  function renderSetup(D, params) {
    var main = document.getElementById("main");
    main.appendChild(bi("Test dig selv", "Test yourself", "h1"));

    var allTopicIds = D.topics.map(function (t) { return t.id; });
    var preset = params.get("topics");
    var preChecked = preset ? preset.split(",").filter(function (id) { return allTopicIds.indexOf(id) !== -1; }) : allTopicIds;

    // Mode: exam simulation (default) or quiz with answers. ?topics= preselects the quiz.
    var examInput = h("input", { type: "radio", name: "mode", value: "exam", class: "sr" });
    var quizInput = h("input", { type: "radio", name: "mode", value: "quiz", class: "sr" });
    var wantQuiz = !!preset || params.get("mode") === "quiz";
    examInput.checked = !wantQuiz;
    quizInput.checked = wantQuiz;

    // Topic toggles: a mini stamp per topic. Checked = printed, unchecked = blank.
    var stampBoxes = D.topics.map(function (t) {
      var input = h("input", { type: "checkbox", value: t.id, class: "sr" });
      input.checked = preChecked.indexOf(t.id) !== -1;
      var mini = MBP.ui.stamp(t, { seen: 0, mastered: 0, total: t.cluster_ids.length, due: 0 }, { mini: true });
      var label = h("label", { class: "stamp-toggle topic-scope", style: "--c: var(--t-" + t.id + ")" },
        input, mini, h("span", { class: "toggle-name" }, MBP.ui.SHORT[t.id][0]));
      return { input: input, mini: mini, label: label, topic: t };
    });

    // Length: 10, 25 or all.
    var lenValues = ["10", "25", "all"];
    var lenInputs = lenValues.map(function (value) {
      return h("input", { type: "radio", name: "len", value: value, class: "sr" });
    });
    lenInputs[0].checked = true;

    var freqBox = h("input", { type: "checkbox", class: "switch", id: "frequent" });
    freqBox.checked = params.get("frequent") === "1";
    var quizOpts = h("div", { class: "quiz-opts" });
    var count = h("p", { class: "live-count", "aria-live": "polite" });
    var start = h("button", { type: "submit", class: "btn btn-primary", title: "Start quiz" }, "Start quiz");
    var allBtn = h("button", { type: "button", class: "btn btn-small btn-secondary", "aria-pressed": "false" }, bi("Alle", "All", "span"));
    var startBar = h("div", { class: "start-bar" }, start);

    function setChecked(box, on) {
      box.input.checked = on;
      box.mini.classList.toggle("lvl-4", on);
      box.mini.classList.toggle("lvl-0", !on);
    }
    stampBoxes.forEach(function (box) { setChecked(box, box.input.checked); });

    function selectedTopics() {
      return stampBoxes.filter(function (b) { return b.input.checked; }).map(function (b) { return b.topic.id; });
    }

    function selectedLength() {
      var on = lenInputs.find(function (i) { return i.checked; });
      return on.value === "all" ? "all" : Number(on.value);
    }

    // Keeps the counts, the start button and the quiz options in step with the choices.
    function refresh() {
      var exam = examInput.checked;
      quizOpts.hidden = exam;
      var allOn = stampBoxes.every(function (b) { return b.input.checked; });
      allBtn.setAttribute("aria-pressed", String(allOn));
      count.textContent = "";
      var n;
      if (exam) {
        n = eligible(D, allTopicIds, freqBox.checked).length;
        count.appendChild(bi(EXAM_LENGTH + " spørgsmål trækkes fra " + n, EXAM_LENGTH + " questions drawn from " + n, "span"));
        start.textContent = "";
        start.className = "btn btn-primary btn-stack";
        start.appendChild(bi("Start prøvesimulering", "Start the exam simulation", "span"));
      } else {
        n = eligible(D, selectedTopics(), freqBox.checked).length;
        if (n === 0) {
          count.appendChild(bi("0 spørgsmål – vælg mindst ét emne", "0 questions – choose at least one topic", "span"));
        } else {
          count.appendChild(bi(n + " spørgsmål tilgængelige", n + " questions available", "span"));
        }
        start.textContent = "Start quiz";
        start.className = "btn btn-primary";
      }
      start.disabled = n === 0;
    }

    allBtn.addEventListener("click", function () {
      var all = stampBoxes.every(function (b) { return b.input.checked; });
      stampBoxes.forEach(function (b) { setChecked(b, !all); });
      refresh();
    });
    stampBoxes.forEach(function (box) {
      box.input.addEventListener("change", function () {
        setChecked(box, box.input.checked);
        refresh();
      });
    });
    freqBox.addEventListener("change", refresh);
    examInput.addEventListener("change", refresh);
    quizInput.addEventListener("change", refresh);
    lenInputs.forEach(function (i) { i.addEventListener("change", refresh); });

    quizOpts.appendChild(h("fieldset", { class: "topic-picker" },
      h("legend", null, bi("Emner", "Topics", "span")),
      allBtn,
      h("div", { class: "stamp-grid" }, stampBoxes.map(function (b) { return b.label; }))));
    quizOpts.appendChild(h("fieldset", { class: "len-picker" },
      h("legend", null, bi("Antal spørgsmål", "Number of questions", "span")),
      h("div", { class: "seg" }, lenValues.map(function (value, i) {
        var text = value === "all" ? "Alle" : value;
        return h("label", { class: "seg-opt", title: value === "all" ? "All" : null }, lenInputs[i], text);
      }))));

    var form = h("form", { class: "quiz-setup" },
      h("fieldset", { class: "mode-picker" },
        h("legend", { class: "sr" }, bi("Type", "Type", "span")),
        h("div", { class: "mode-row" },
          h("label", { class: "mode-card" }, examInput,
            MBP.icon("test", 28),
            bi("Prøvesimulering", "Exam simulation", "span"),
            bi(
              "25 spørgsmål som til den rigtige prøve. Du ser svarene til sidst. Bestået ved 20 rigtige.",
              "25 questions like the real test. You see the answers at the end. Pass at 20 correct.",
              "span")),
          h("label", { class: "mode-card" }, quizInput,
            MBP.icon("practise", 28),
            bi("Quiz med svar", "Quiz with answers", "span"),
            bi(
              "Du ser det rigtige svar efter hvert spørgsmål.",
              "You see the right answer after each question.",
              "span")))),
      quizOpts,
      h("label", { class: "filter", for: "frequent" }, freqBox,
        MBP.icon("star", 16),
        bi("Kun ofte stillede (stillet i 4+ prøver)", "Only frequently asked (asked in 4+ exams)", "span")),
      count,
      startBar);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var exam = examInput.checked;
      startRun(D, {
        mode: exam ? "exam" : "normal",
        topics: selectedTopics(),
        length: exam ? EXAM_LENGTH : selectedLength(),
        frequent: freqBox.checked
      });
    });

    main.appendChild(form);
    main.appendChild(h("p", { class: "quiet-row" },
      h("a", { class: "btn btn-quiet", href: "exams.html" },
        bi("Øv en bestemt prøve fra arkivet", "Practise a specific exam from the archive", "span"))));
    main.appendChild(latestResults());
    refresh();
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

  // ---- Running a quiz -----------------------------------------------------

  function startRun(D, cfg) {
    var list = buildList(D, cfg);
    var main = document.getElementById("main");
    main.textContent = "";
    if (!list.length) {
      main.appendChild(bi("Ingen spørgsmål i dette valg.", "No questions for this choice.", "p"));
      main.appendChild(h("div", { class: "btn-row" },
        h("a", { class: "btn btn-secondary", href: "quiz.html" }, bi("Tilbage til Test", "Back to Test", "span"))));
      return;
    }
    MBP.quiz = { list: list };
    runQuiz(D, cfg, list);
  }

  // One run: the quiz (feedback after each answer) or the exam (answers shown at the end).
  function runQuiz(D, cfg, list) {
    var main = document.getElementById("main");
    var isExam = cfg.mode === "exam";
    var n = list.length;
    var i = 0;
    var answers = new Map();
    var content = h("div", { id: "quiz", class: "run" });
    var monthLabel = cfg.examId ? monthYear(cfg.examId) + ", " : "";
    main.textContent = "";
    main.appendChild(content);
    document.body.classList.add("focus-mode");

    // Run bar: exit, track and count (the current question number).
    function paintBar() {
      var bar = MBP.ui.runBar(i + 1, n, exitRun);
      bar.querySelector(".count").textContent = monthLabel + (i + 1) + " / " + n;
      var old = content.querySelector(".run-bar");
      if (old) old.replaceWith(bar);
      else content.insertBefore(bar, content.firstChild);
    }

    // Exam with answers: ask first. Quiz, or no answers yet: leave straight away.
    function exitRun() {
      if (isExam && answers.size > 0) {
        MBP.ui.confirmInline(content.querySelector(".run-bar"), {
          da: "Vil du stoppe prøven? Dine svar bliver ikke gemt.",
          en: "Stop the exam? Your answers will not be saved.",
          actionDa: "Stop prøven",
          actionEn: "Stop the exam",
          cancelDa: "Fortsæt prøven",
          cancelEn: "Continue the exam",
          onAction: leave
        });
        return;
      }
      leave();
    }

    function leave() {
      location.href = "quiz.html";
    }

    function showNormal() {
      content.textContent = "";
      paintBar();
      var q = list[i];
      var last = i === n - 1;
      var card = MBP.ui.questionCard(q, {
        feedback: true,
        onAnswer: function (ok, key) {
          answers.set(q.id, key);
          if (MBP.store.record(q.id, q.cluster_id, ok)) goalToast();
        },
        next: {
          da: last ? "Se resultat" : "Næste",
          en: last ? "See result" : "Next",
          onNext: function () {
            if (last) return finish();
            i++;
            showNormal();
          }
        }
      });
      content.appendChild(card.el);
    }

    function showExam() {
      content.textContent = "";
      paintBar();
      var q = list[i];
      var card = MBP.ui.questionCard(q, {
        feedback: false,
        chosen: answers.get(q.id) || null,
        onChange: function (key) {
          answers.set(q.id, key);
          var old = content.querySelector(".qmap");
          if (old) old.replaceWith(questionMap());
        }
      });
      content.appendChild(card.el);
      content.appendChild(questionMap());

      var row = h("div", { class: "btn-row run-nav" });
      if (i > 0) {
        row.appendChild(h("button", {
          type: "button",
          class: "btn btn-secondary",
          title: "Previous",
          onclick: function () { i--; showExam(); }
        }, MBP.icon("back", 20), "Forrige"));
      }
      if (i < n - 1) {
        row.appendChild(h("button", {
          type: "button",
          class: "btn btn-primary",
          title: "Next",
          onclick: function () { i++; showExam(); }
        }, "Næste", MBP.icon("next", 20)));
      } else {
        row.appendChild(h("button", {
          type: "button",
          class: "btn btn-primary",
          title: "Hand in",
          onclick: function () { handIn(this); }
        }, "Aflever prøven"));
      }
      content.appendChild(row);
    }

    // The question map: one stamp-shaped button per question, answered ones filled.
    function questionMap() {
      var map = h("nav", { class: "qmap", "aria-label": "Spørgsmål – Questions" });
      list.forEach(function (q, k) {
        var answered = !!answers.get(q.id);
        map.appendChild(h("button", {
          type: "button",
          class: answered ? "qmap-btn on" : "qmap-btn",
          "aria-label": "Spørgsmål " + (k + 1) + (answered ? ", besvaret" : ", ikke besvaret"),
          "aria-current": k === i ? "step" : null,
          onclick: function () { i = k; showExam(); }
        }, String(k + 1)));
      });
      return map;
    }

    // Hand in: ask first when questions are unanswered.
    function handIn(button) {
      var unanswered = list.filter(function (q) { return !answers.get(q.id); }).length;
      if (unanswered === 0) return finish();
      MBP.ui.confirmInline(button.parentNode, {
        da: "Der er " + unanswered + " ubesvarede spørgsmål. Aflever alligevel?",
        en: unanswered + " questions are unanswered. Hand in anyway?",
        actionDa: "Aflever",
        actionEn: "Hand in",
        cancelDa: "Tilbage til prøven",
        cancelEn: "Back to the exam",
        onAction: finish
      });
    }

    function finish() {
      var score = list.filter(function (q) { return answers.get(q.id) === q.correct[0]; }).length;
      if (isExam) {
        list.forEach(function (q) {
          var key = answers.get(q.id) || null;
          if (MBP.store.record(q.id, q.cluster_id, key === q.correct[0])) goalToast();
        });
      }
      var entry = { date: new Date().toISOString(), mode: cfg.mode, score: score, total: n };
      if (cfg.examId) entry.examId = cfg.examId;
      MBP.store.addQuiz(entry);
      renderResult(D, cfg, list, answers, score);
    }

    // Arrow keys move through the exam (not while the confirm is open or focus is in a field).
    document.addEventListener("keydown", function onArrow(e) {
      if (!content.isConnected) {
        document.removeEventListener("keydown", onArrow);
        return;
      }
      if (!isExam || e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.querySelector(".confirm")) return;
      var t = e.target;
      if (t && t.matches && t.matches("input, textarea, select")) return;
      if (e.key === "ArrowLeft" && i > 0) {
        i--;
        showExam();
      } else if (e.key === "ArrowRight" && i < n - 1) {
        i++;
        showExam();
      }
    });

    if (isExam) showExam();
    else showNormal();
  }

  // ---- Result and review ---------------------------------------------------

  // Result screen: score, pass gauge, verdict and postmark, actions, then the review.
  function renderResult(D, cfg, list, answers, score) {
    var main = document.getElementById("main");
    var n = list.length;
    var isExam = cfg.mode === "exam";
    var pct = n ? Math.round((score / n) * 100) : 0;
    var passed = isExam ? score >= EXAM_PASS : pct >= NORMAL_PASS_PERCENT;
    main.textContent = "";
    document.body.classList.remove("focus-mode");

    function isRight(q) { return answers.get(q.id) === q.correct[0]; }
    var wrong = list.filter(function (q) { return !isRight(q); });

    var card = h("section", { class: isExam ? "result" : "result quiz-result" });
    card.insertAdjacentHTML("afterbegin", WAVES);
    card.appendChild(h("p", { class: "score-line" },
      h("span", { class: "score-num" }, String(score)),
      h("span", { class: "score-of" }, " / " + n)));
    if (!isExam) card.appendChild(h("p", { class: "score-pct" }, pct + " %"));

    // Gauge: correct segments first, then wrong, then unanswered. Clicking one jumps to its review.
    var order = list.map(function (q, k) {
      var state = isRight(q) ? "ok" : answers.get(q.id) ? "bad" : "none";
      return { k: k, state: state };
    });
    order.sort(function (a, b) {
      var rank = { ok: 0, bad: 1, none: 2 };
      return rank[a.state] - rank[b.state];
    });
    var gauge = h("div", { class: "gauge-wrap" });
    var track = h("div", { class: "gauge" });
    var showAll = false;
    var reviewArea = h("div", { class: "review" });
    var toggle = h("input", { type: "checkbox", class: "switch", id: "show-correct" });

    if (!isExam && n > 50) {
      track.classList.add("bar");
      track.appendChild(h("i", { style: "--pct: " + pct + "%" }));
      track.appendChild(h("span", { class: "bar-mark", "aria-hidden": "true" }));
    } else {
      order.forEach(function (o, idx) {
        var label = "Spørgsmål " + (o.k + 1) + ": " + (o.state === "ok" ? "rigtigt" : o.state === "bad" ? "forkert" : "ubesvaret");
        track.appendChild(h("button", {
          type: "button",
          class: "seg-btn " + o.state,
          style: "--i: " + idx,
          "aria-label": label,
          onclick: function () { focusReview(o.k); }
        }));
      });
    }
    gauge.appendChild(track);
    if (isExam) {
      gauge.appendChild(h("span", { class: "pass-line", style: "left: calc(" + EXAM_PASS + " / " + n + " * 100%)", "aria-hidden": "true" }));
      gauge.appendChild(h("span", { class: "pass-label", style: "left: calc(" + EXAM_PASS + " / " + n + " * 100%)" }, "Bestået ved " + EXAM_PASS));
    }
    card.appendChild(gauge);
    requestAnimationFrame(function () { track.classList.add("filled"); });

    // Verdict: a Bestået postmark on a pass (with today's date), no postmark on a fail.
    var verdict = h("div", { class: "verdict-block" });
    if (passed) {
      var pm = MBP.ui.postmark("bestaet", "result-pm");
      var now = new Date();
      pm.querySelectorAll("text")[1].textContent = two(now.getDate()) + "." + two(now.getMonth() + 1) + "." + now.getFullYear();
      card.appendChild(pm);
      verdict.appendChild(h("p", { class: "verdict-text pass" },
        isExam ? bi("Bestået. Godt gået.", "Passed. Well done.", "span") : bi("Bestået", "Passed", "span")));
    } else if (isExam) {
      verdict.appendChild(h("p", { class: "verdict-text" },
        bi("Ikke bestået endnu – du manglede " + (EXAM_PASS - score) + ".", "Not passed yet – you were " + (EXAM_PASS - score) + " short.", "span")));
      verdict.appendChild(h("p", { class: "verdict-sub" },
        bi("Øv dine fejl, og prøv igen. Grænsen er 20 rigtige.", "Practise your mistakes and try again. The pass mark is 20 correct.", "span")));
    } else {
      verdict.appendChild(h("p", { class: "verdict-text" }, bi("Ikke bestået endnu", "Not passed yet", "span")));
    }
    card.appendChild(verdict);
    main.appendChild(card);

    // Actions. Mistakes first when there are any.
    var actions = h("div", { class: "btn-row result-actions" });
    if (wrong.length) {
      actions.appendChild(h("button", {
        type: "button",
        class: "btn btn-primary",
        title: "Practise my mistakes",
        onclick: function () { startRun(D, { mode: "normal", fixedList: shuffle(wrong) }); }
      }, bi("Øv dine fejl", "Practise my mistakes", "span")));
    }
    if (isExam) {
      actions.appendChild(h("a", {
        class: wrong.length ? "btn btn-secondary" : "btn btn-primary",
        href: "quiz.html?mode=exam",
        title: "New exam simulation"
      }, bi("Ny prøvesimulering", "New exam simulation", "span")));
      actions.appendChild(h("a", { class: "btn btn-quiet", href: "index.html" }, bi("Til I dag", "To today", "span")));
    } else {
      actions.appendChild(h("button", {
        type: "button",
        class: "btn btn-secondary",
        title: "Retry same settings",
        onclick: function () { startRun(D, cfg); }
      }, bi("Prøv igen med samme indstillinger", "Retry same settings", "span")));
      actions.appendChild(h("a", { class: "btn btn-secondary", href: "quiz.html", title: "New quiz" }, bi("Ny quiz", "New quiz", "span")));
    }
    main.appendChild(actions);

    // Review: every question (correct ones only when the switch is on).
    function drawReview() {
      reviewArea.textContent = "";
      list.forEach(function (q, k) {
        if (isRight(q) && !showAll) return;
        var item = h("div", { class: "review-item", id: "r-" + (k + 1) },
          h("p", { class: "review-no" }, "Spørgsmål " + (k + 1)),
          MBP.ui.questionCard(q, { review: { chosen: answers.get(q.id) || null } }).el);
        reviewArea.appendChild(item);
      });
    }

    // Shows a question's review (turning on the correct ones first if needed).
    function focusReview(k) {
      if (isRight(list[k]) && !showAll) {
        showAll = true;
        toggle.checked = true;
        drawReview();
      }
      var el = document.getElementById("r-" + (k + 1));
      if (el) el.scrollIntoView({ block: "start", behavior: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }

    toggle.addEventListener("change", function () {
      showAll = toggle.checked;
      drawReview();
    });
    main.appendChild(h("h2", null, bi("Gennemgang", "Review", "span")));
    main.appendChild(h("label", { class: "filter", for: "show-correct" }, toggle,
      bi("Vis også rigtige svar", "Also show correct answers", "span")));
    main.appendChild(reviewArea);
    drawReview();
  }
})();
