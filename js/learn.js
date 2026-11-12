// Øv: explanation cards, then practice with spaced repetition (Leitner). Focus mode during a session.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var biQA = MBP.ui.biQA;
  var LESSON_SIZE = 3;
  var SESSION_SIZE = 10;
  var MAX_RETURNS = 2;

  MBP.ui.initShell();
  MBP.ui.start(init);

  function stateOf(c) {
    return MBP.store.progress().clusters[c.id] || { box: 0, due: 0, seen: 0 };
  }

  // Pick a question id from a cluster. Prefers variants the user has never answered right,
  // then avoids a given question id and a given variant when another choice exists.
  function pickItem(c, avoid) {
    avoid = avoid || {};
    var all = [];
    c.variants.forEach(function (v, vi) {
      v.question_ids.forEach(function (id) { all.push({ id: id, vi: vi }); });
    });
    var cands = all;
    if (avoid.qid) {
      var notSameQ = cands.filter(function (x) { return x.id !== avoid.qid; });
      if (notSameQ.length) cands = notSameQ;
    }
    var unseen = cands.filter(function (x) {
      return !c.variants[x.vi].question_ids.some(function (id) { return MBP.store.questionRight(id) > 0; });
    });
    if (unseen.length) cands = unseen;
    if (avoid.vi !== undefined && avoid.vi !== null) {
      var notSameV = cands.filter(function (x) { return x.vi !== avoid.vi; });
      if (notSameV.length) cands = notSameV;
    }
    var pick = cands[Math.floor(Math.random() * cands.length)];
    return { cid: c.id, qid: pick.id, vi: pick.vi };
  }

  // Session selection: due first (earliest due first), then new (most-asked first), then the rest by box.
  function buildSession(pool, any) {
    if (any) return MBP.ui.shuffle(pool).slice(0, SESSION_SIZE);
    var now = Date.now();
    var open = pool.filter(function (c) { return !MBP.store.isMastered(c.id); });
    var due = open
      .filter(function (c) { var s = stateOf(c); return s.seen > 0 && s.due <= now; })
      .sort(function (a, b) { return stateOf(a).due - stateOf(b).due; });
    var fresh = open.filter(function (c) { return stateOf(c).seen === 0; });
    var rest = open
      .filter(function (c) { var s = stateOf(c); return s.seen > 0 && s.due > now; })
      .sort(function (a, b) { return stateOf(a).box - stateOf(b).box; });
    var seen = new Set();
    var out = [];
    due.concat(fresh, rest).forEach(function (c) {
      if (out.length < SESSION_SIZE && !seen.has(c.id)) {
        seen.add(c.id);
        out.push(c);
      }
    });
    return out;
  }

  function chunk(list, size) {
    var out = [];
    for (var i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
    return out;
  }

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";
    var params = new URLSearchParams(location.search);
    var topicParam = params.get("topic");
    if (!topicParam) return renderPicker(main, D);

    var isAll = topicParam === "all";
    var topic = isAll ? null : D.tById.get(topicParam);
    var sheets = isAll ? null : [topicParam]; // the sheet whose label shared clusters get
    if (!isAll && !topic) return renderPicker(main, D);

    var frequent = params.get("frequent") === "1";
    var any = params.get("any") === "1";
    var pool = isAll ? D.clusters.slice() : topic.cluster_ids.map(function (id) { return D.cById.get(id); });
    if (frequent) pool = pool.filter(function (c) { return c.frequent; });

    var content = h("div", { id: "session", class: "session" });
    main.appendChild(content);

    if (pool.length === 0) {
      content.appendChild(bi("Ingen emner her endnu.", "No items here yet.", "p"));
      content.appendChild(h("div", { class: "btn-row" },
        h("a", { class: "btn btn-secondary", href: "learn.html" }, bi("Tilbage til fakta-ark", "Back to fact sheets", "span"))));
      return;
    }

    var clusters = buildSession(pool, any);
    var base = "learn.html?topic=" + topicParam + (frequent ? "&frequent=1" : "");
    if (clusters.length === 0) {
      content.appendChild(bi("Alt i dette fakta-ark er mestret.", "Everything in this fact sheet is mastered.", "h2"));
      if (topic) {
        var progress = MBP.ui.topicProgress(D, topic);
        content.appendChild(MBP.ui.stamp(topic, progress, {}));
      }
      content.appendChild(h("div", { class: "btn-row" },
        h("a", { class: "btn btn-secondary", href: base + "&any=1", title: "Practise anyway" }, bi("Øv alligevel", "Practise anyway", "span")),
        h("a", { class: "btn btn-primary", href: isAll ? "quiz.html" : "quiz.html?topics=" + topicParam, title: "Test this fact sheet" },
          bi("Test fakta-arket", "Test this fact sheet", "span"))));
      return;
    }

    document.body.classList.add("focus-mode");

    var lessons = chunk(clusters, LESSON_SIZE);
    var masteredAtStart = {};
    clusters.forEach(function (c) { masteredAtStart[c.id] = MBP.store.isMastered(c.id); });
    var S = {
      lessons: lessons,
      li: 0,
      queue: [],
      qi: 0,
      itemNo: 0,
      answered: 0,
      queuedTotal: 0,
      right: 0,
      results: [],
      wrongClusters: [],
      returns: {}
    };

    // Items one lesson will add to the queue (a lesson of one cluster gets two questions).
    function plannedItems(lesson) {
      return lesson.length < 2 ? lesson.length * 2 : lesson.length;
    }

    // Run bar: answered out of queued so far. Leaving the session returns to the topic list.
    function paintBar(total) {
      var bar = MBP.ui.runBar(S.answered, total, function () { location.href = "learn.html"; });
      bar.querySelector(".count").title = "Lektion " + (S.li + 1) + " af " + lessons.length + " – Lesson " + (S.li + 1) + " of " + lessons.length;
      var old = content.querySelector(".run-bar");
      if (old) old.replaceWith(bar);
      else content.insertBefore(bar, content.firstChild);
    }

    function renderExplain() {
      content.textContent = "";
      MBP.ui.screenTop();
      paintBar(S.queuedTotal + plannedItems(lessons[S.li]));
      content.appendChild(h("h2", { class: "lesson-head" },
        bi("Lektion " + (S.li + 1) + " af " + lessons.length, "Lesson " + (S.li + 1) + " of " + lessons.length, "span")));
      lessons[S.li].forEach(function (c) {
        var sid = MBP.ui.sheetFor(c, sheets);
        var t = D.tById.get(sid);
        var card = h("section", {
          class: "lesson-card topic-scope",
          style: "--c: var(--t-" + sid + ")"
        },
          h("div", { class: "lesson-top" },
            h("div", { class: "lesson-tags" },
              t ? MBP.ui.topicChip(t) : null,
              c.frequent ? h("span", { class: "pill-freq", title: "Frequently asked – asked in 4+ exams" }, MBP.icon("star", 13), "Ofte stillet") : null),
            MBP.ui.faceValue(c.times_asked)),
          MBP.ui.alsoIn(c, sid, false),
          h("div", { class: "fact" }, MBP.ui.withBook(bi(c.fact_da, c.fact_en, "p"), c.book, MBP.ui.moreFor(c.id))),
          h("div", { class: "rule" }),
          biQA(c.canonical_question_da, c.canonical_question_en, c.answer_da, c.answer_en, "div"),
          MBP.ui.noteBoxes(c));
        content.appendChild(card);
      });
      var ready = h("button", { type: "button", class: "btn btn-primary btn-stack btn-block", onclick: startPractice },
        bi("Jeg er klar – øv nu", "I'm ready – practise now", "span"));
      content.appendChild(ready);
      ready.focus({ preventScroll: true }); // the lesson opens at the top; the keyboard is ready on the button
    }

    function startPractice() {
      var lesson = lessons[S.li];
      S.queue = [];
      S.qi = 0;
      lesson.forEach(function (c) {
        var first = pickItem(c, {});
        S.queue.push(first);
        if (lesson.length < 2) {
          S.queue.push(pickItem(c, { qid: first.qid, vi: first.vi }));
        }
      });
      S.queuedTotal += S.queue.length;
      showItem();
    }

    function showItem() {
      content.textContent = "";
      MBP.ui.screenTop();
      if (S.qi >= S.queue.length) return finishLesson();
      var item = S.queue[S.qi];
      S.itemNo++;
      paintBar(S.queuedTotal);
      var q = D.qById.get(item.qid);
      var card = MBP.ui.questionCard(q, {
        sheets: sheets,
        feedback: true,
        onAnswer: function (ok) { onAnswer(item, ok); },
        next: {
          da: "Næste",
          en: "Next",
          onNext: function () { S.qi++; showItem(); }
        }
      });
      content.appendChild(card.el);
    }

    // Records the answer and queues a return for a wrong one (up to MAX_RETURNS per cluster).
    function onAnswer(item, ok) {
      var c = D.cById.get(item.cid);
      if (MBP.store.record(item.qid, item.cid, ok)) {
        MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers");
      }
      S.answered++;
      S.results.push(ok);
      if (ok) {
        S.right++;
      } else {
        if (S.wrongClusters.indexOf(c) === -1) S.wrongClusters.push(c);
        if ((S.returns[item.cid] || 0) < MAX_RETURNS) {
          S.returns[item.cid] = (S.returns[item.cid] || 0) + 1;
          var again = pickItem(c, { qid: item.qid, vi: item.vi });
          S.queue.splice(Math.min(S.qi + 2, S.queue.length), 0, again);
          S.queuedTotal++;
        }
      }
      paintBar(S.queuedTotal);
    }

    function finishLesson() {
      S.li++;
      if (S.li < lessons.length) return renderExplain();
      renderSummary();
    }

    // Summary: score, dots, new stamps, the week, the wrong answers, then the actions.
    function renderSummary() {
      document.body.classList.remove("focus-mode");
      content.textContent = "";
      MBP.ui.screenTop();
      content.appendChild(h("div", { class: "summary-card" },
        bi(S.right + " af " + S.answered + " rigtige", S.right + " of " + S.answered + " correct", "p"),
        h("div", { class: "dots" }, S.results.map(function (ok) {
          return h("span", { class: ok ? "dot ok" : "dot no" });
        }))));

      var sessionClusters = clusters;
      var newly = sessionClusters.filter(function (c) { return !masteredAtStart[c.id] && MBP.store.isMastered(c.id); });
      var stampsSection = h("section", { class: "new-section" });
      if (newly.length) {
        stampsSection.appendChild(h("div", { class: "new-stamps" }, newly.map(function (c) {
          var t = D.tById.get(c.topic_id);
          return h("span", { class: "new-stamp" },
            MBP.ui.stamp(t, MBP.ui.topicProgress(D, t), { mini: true }),
            MBP.ui.postmark("check", "new-pm"));
        })));
        stampsSection.appendChild(bi("Nye mærker i dag: " + newly.length, "New stamps today: " + newly.length, "p"));
      } else {
        stampsSection.appendChild(bi(
          "Ingen nye mærker endnu – de kommer, når du har svaret rigtigt nogle gange i træk.",
          "No new stamps yet – they come after you answer correctly a few times in a row.",
          "p"));
      }

      // Topics that are now fully mastered for the first time: their stamp, with the Mestret postmark.
      var finished = [];
      sessionClusters.forEach(function (c) {
        (c.topic_ids || [c.topic_id]).forEach(function (tid) {
          var t = D.tById.get(tid);
          if (!t || finished.indexOf(t) !== -1) return;
          var progress = MBP.ui.topicProgress(D, t);
          if (MBP.ui.stampLevel(progress) === 4 && !MBP.store.isMasteredSeen(t.id)) finished.push(t);
        });
      });
      finished.forEach(function (t) {
        stampsSection.appendChild(h("div", { class: "done-stamp" }, MBP.ui.stamp(t, MBP.ui.topicProgress(D, t), {})));
      });
      content.appendChild(stampsSection);

      var today = MBP.store.today();
      content.appendChild(h("div", { class: "week-section" },
        MBP.ui.weekStamps(),
        h("p", { class: "meta" }, bi(today.answers + " svar i dag", today.answers + " answers today", "span"))));

      if (S.wrongClusters.length) {
        content.appendChild(bi("Det skal du se på igen", "Look at these again", "h2"));
        var list = h("ul", { class: "recap" });
        S.wrongClusters.forEach(function (c) {
          var sid = MBP.ui.sheetFor(c, sheets);
          var t = D.tById.get(sid);
          list.appendChild(h("li", null,
            t ? MBP.ui.topicChip(t) : null,
            MBP.ui.withBook(bi(c.fact_da, c.fact_en, "p"), c.book, MBP.ui.moreFor(c.id)),
            MBP.ui.alsoIn(c, sid, true, "study.html"),
            bi("Rigtigt svar: " + c.answer_da, "Correct answer: " + c.answer_en, "p")));
        });
        content.appendChild(list);
      }

      var testHref = isAll ? "quiz.html" : "quiz.html?topics=" + topicParam;
      content.appendChild(h("div", { class: "btn-row summary-actions" },
        h("button", { type: "button", class: "btn btn-primary", title: "Continue", onclick: function () { location.reload(); } },
          bi("Fortsæt", "Continue", "span")),
        h("a", { class: "btn btn-secondary", href: testHref, title: "Test this fact sheet" },
          bi("Test fakta-arket", "Test this fact sheet", "span")),
        h("a", { class: "btn btn-quiet", href: "learn.html" }, bi("Tilbage til fakta-ark", "Back to fact sheets", "span"))));
    }

    renderExplain();
  }

  // Picker: today's stamps, then one stamp per topic with the number due for review.
  function renderPicker(main, D) {
    main.textContent = "";
    main.appendChild(bi("Øv", "Practise", "h1"));
    main.appendChild(bi(
      "Først en kort forklaring, så spørgsmål. Det, du svarer forkert på, kommer igen senere.",
      "First a short explanation, then questions. What you get wrong comes back later.",
      "p"));

    main.appendChild(h("section", { class: "today" },
      h("h2", null, bi("Dagens mærker", "Today's stamps", "span")),
      bi(
        "10 emner fra alle fakta-ark: først dem, der skal gentages, så nye.",
        "10 items from all fact sheets: first the ones due for review, then new ones.",
        "p"),
      h("a", { class: "btn btn-stack cta", href: "learn.html?topic=all" },
        bi("Saml dagens mærker", "Collect today's stamps", "span"))));

    main.appendChild(h("div", { class: "quick" },
      h("a", { class: "btn btn-secondary", href: "learn.html?topic=all&frequent=1", title: "Only frequently asked" },
        MBP.icon("star", 18), bi("Kun ofte stillede", "Only frequently asked", "span"))));

    main.appendChild(bi("Vælg et fakta-ark", "Choose a fact sheet", "h2"));
    var album = h("div", { class: "album" });
    var now = Date.now();
    var clusters = MBP.store.progress().clusters;
    D.topics.forEach(function (t) {
      var progress = MBP.ui.topicProgress(D, t);
      var due = t.cluster_ids.filter(function (id) {
        var s = clusters[id];
        return s && s.seen > 0 && !MBP.store.isMastered(id) && s.due <= now;
      }).length;
      album.appendChild(h("div", { class: "pick-cell" },
        MBP.ui.stamp(t, progress, { href: "learn.html?topic=" + t.id }),
        due > 0 ? bi(due + " klar til gentagelse", due + " due for review", "p") : null));
    });
    main.appendChild(album);
  }
})();
