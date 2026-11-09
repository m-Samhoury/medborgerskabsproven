// Assisted learning: explanation cards, then practice with spaced repetition (Leitner).
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
    if (!isAll && !topic) return renderPicker(main, D);

    var frequent = params.get("frequent") === "1";
    var any = params.get("any") === "1";
    var pool = isAll ? D.clusters.slice() : topic.cluster_ids.map(function (id) { return D.cById.get(id); });
    if (frequent) pool = pool.filter(function (c) { return c.frequent; });

    main.appendChild(isAll
      ? bi("Alle emner", "All topics", "h1")
      : bi(topic.icon + " " + topic.title_da, topic.title_en, "h1"));
    if (frequent) main.appendChild(bi("Kun ⭐ ofte stillede", "Only ⭐ frequent", "p"));

    var content = h("div", { id: "session" });
    main.appendChild(content);

    if (pool.length === 0) {
      content.appendChild(bi("Ingen emner her endnu.", "No items here yet.", "p"));
      return;
    }

    var clusters = buildSession(pool, any);
    if (clusters.length === 0) {
      var masteredText = bi("Alt i dette emne er mestret! 🎉", "Everything in this topic is mastered!", "p");
      var base = "learn.html?topic=" + topicParam + (frequent ? "&frequent=1" : "");
      content.appendChild(masteredText);
      content.appendChild(h("div", { class: "btn-row" },
        h("a", { class: "btn", href: base + "&any=1" }, bi("Øv alligevel", "Practise anyway", "span")),
        h("a", { class: "btn", href: isAll ? "quiz.html" : "quiz.html?topics=" + topicParam },
          bi("Tag en quiz", "Take a quiz", "span"))));
      return;
    }

    var lessons = chunk(clusters, LESSON_SIZE);
    var S = {
      lessons: lessons,
      li: 0,
      queue: [],
      qi: 0,
      itemNo: 0,
      answered: 0,
      right: 0,
      wrongClusters: [],
      returns: {}
    };

    function progressLine() {
      return bi(
        "Lektion " + (S.li + 1) + " af " + lessons.length + " · Spørgsmål " + S.itemNo,
        "Lesson " + (S.li + 1) + " of " + lessons.length + " · Question " + S.itemNo,
        "p");
    }

    function renderExplain() {
      content.textContent = "";
      content.appendChild(h("p", { class: "progress-line" }, progressLine()));
      lessons[S.li].forEach(function (c) {
        var card = h("section", { class: "lesson-card" });
        if (c.frequent) card.appendChild(h("span", { class: "badge" }, "⭐ Ofte stillet"));
        card.appendChild(h("div", { class: "fact" }, bi(c.fact_da, c.fact_en, "p")));
        card.appendChild(h("div", { class: "qa" }, biQA(c.canonical_question_da, c.canonical_question_en, c.answer_da, c.answer_en, "p")));
        MBP.ui.noteBoxes(c).forEach(function (b) { card.appendChild(b); });
        content.appendChild(card);
      });
      var ready = h("button", { type: "button", class: "btn btn-primary btn-block", onclick: startPractice },
        bi("Jeg er klar – øv nu", "I'm ready – practise now", "span"));
      content.appendChild(h("div", { class: "btn-row" }, ready));
      ready.focus();
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
      showItem();
    }

    function showItem() {
      content.textContent = "";
      if (S.qi >= S.queue.length) return finishLesson();
      var item = S.queue[S.qi];
      S.itemNo++;
      content.appendChild(h("p", { class: "progress-line" }, progressLine()));
      var q = D.qById.get(item.qid);
      var card = MBP.ui.questionCard(q, {
        feedback: true,
        onAnswer: function (ok) { onAnswer(item, ok, card); }
      });
      content.appendChild(card.el);
    }

    function onAnswer(item, ok, card) {
      var c = D.cById.get(item.cid);
      MBP.store.record(item.qid, item.cid, ok);
      S.answered++;
      if (ok) {
        S.right++;
      } else {
        if (S.wrongClusters.indexOf(c) === -1) S.wrongClusters.push(c);
        if ((S.returns[item.cid] || 0) < MAX_RETURNS) {
          S.returns[item.cid] = (S.returns[item.cid] || 0) + 1;
          var again = pickItem(c, { qid: item.qid, vi: item.vi });
          S.queue.splice(Math.min(S.qi + 2, S.queue.length), 0, again);
        }
      }
      var next = h("button", {
        type: "button",
        class: "btn btn-primary",
        onclick: function () { S.qi++; showItem(); }
      }, "Næste");
      card.el.appendChild(h("div", { class: "btn-row" }, next));
      next.focus();
    }

    function finishLesson() {
      S.li++;
      if (S.li < lessons.length) return renderExplain();
      renderSummary();
    }

    function renderSummary() {
      content.textContent = "";
      content.appendChild(h("h2", null, bi("Sessionsresultat", "Session summary", "span")));
      content.appendChild(bi(
        S.right + " rigtige af " + S.answered,
        S.right + " correct of " + S.answered,
        "p"));
      if (S.wrongClusters.length) {
        var list = h("ul", { class: "row-list summary-list" });
        S.wrongClusters.forEach(function (c) {
          list.appendChild(h("li", null,
            bi(c.fact_da, c.fact_en, "p"),
            bi("Rigtigt svar: " + c.answer_da, "Correct answer: " + c.answer_en, "p")));
        });
        content.appendChild(list);
      }
      content.appendChild(h("div", { class: "btn-row" },
        h("button", { type: "button", class: "btn btn-primary", onclick: function () { location.reload(); } },
          bi("Fortsæt", "Continue", "span")),
        h("a", { class: "btn", href: "learn.html" }, bi("Tilbage til emner", "Back to topics", "span"))));
    }

    renderExplain();
  }

  function renderPicker(main, D) {
    main.textContent = "";
    main.appendChild(bi("Lær med hjælp", "Assisted learning", "h1"));
    var grid = h("div", { class: "card-grid" });
    D.topics.forEach(function (t) {
      grid.appendChild(h("a", { class: "btn btn-block", href: "learn.html?topic=" + t.id },
        bi(t.icon + " " + t.title_da, t.title_en, "span")));
    });
    grid.appendChild(h("a", { class: "btn btn-block", href: "learn.html?topic=all" },
      bi("Alle emner", "All topics", "span")));
    grid.appendChild(h("a", { class: "btn btn-block", href: "learn.html?topic=all&frequent=1" },
      bi("Kun ⭐ ofte stillede", "Only ⭐ frequent", "span")));
    main.appendChild(grid);
  }
})();
