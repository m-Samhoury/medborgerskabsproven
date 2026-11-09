// Progress storage (Leitner boxes). Every localStorage access is wrapped in try/catch.
// If storage is unavailable, progress is kept in memory for this page view only.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});
  var KEY = "mbp.v1.progress";
  var LANG_KEY = "mbp.v1.showEnglish";
  var INTERVALS = [0, 10 * 60 * 1000, 24 * 3600 * 1000, 3 * 24 * 3600 * 1000, 7 * 24 * 3600 * 1000, 14 * 24 * 3600 * 1000];

  var cache = null;

  function emptyProgress() {
    return { clusters: {}, questions: {}, quizzes: [], studied: {} };
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage blocked: progress is kept in memory only */
    }
  }

  function removeStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
  }

  function progress() {
    if (cache) return cache;
    var parsed = null;
    try {
      var raw = readStorage(KEY);
      parsed = raw ? JSON.parse(raw) : null;
    } catch (e) {
      parsed = null;
    }
    cache = parsed && typeof parsed === "object" ? parsed : emptyProgress();
    cache.clusters = cache.clusters || {};
    cache.questions = cache.questions || {};
    cache.quizzes = cache.quizzes || [];
    cache.studied = cache.studied || {};
    return cache;
  }

  function save() {
    writeStorage(KEY, JSON.stringify(progress()));
  }

  function clusterState(id) {
    var all = progress().clusters;
    if (!all[id]) all[id] = { box: 0, due: 0, right: 0, wrong: 0, seen: 0 };
    return all[id];
  }

  MBP.store = {
    progress: progress,

    clusterState: clusterState,

    isMastered: function (clusterId) {
      var st = progress().clusters[clusterId];
      return !!st && st.box >= 3;
    },

    isSeen: function (clusterId) {
      var st = progress().clusters[clusterId];
      return !!st && st.seen > 0;
    },

    questionRight: function (questionId) {
      var st = progress().questions[questionId];
      return st ? st.right : 0;
    },

    record: function (questionId, clusterId, isCorrect) {
      var p = progress();
      var st = clusterState(clusterId);
      if (isCorrect) {
        st.box = Math.min(st.box + 1, 5);
        st.right++;
      } else {
        st.box = 0;
        st.wrong++;
      }
      st.seen++;
      st.due = Date.now() + INTERVALS[st.box];

      if (!p.questions[questionId]) p.questions[questionId] = { right: 0, wrong: 0 };
      if (isCorrect) p.questions[questionId].right++;
      else p.questions[questionId].wrong++;
      save();
    },

    addQuiz: function (entry) {
      var p = progress();
      p.quizzes.push(entry);
      if (p.quizzes.length > 50) p.quizzes = p.quizzes.slice(-50);
      save();
    },

    isStudied: function (topicId) {
      return !!progress().studied[topicId];
    },

    setStudied: function (topicId) {
      progress().studied[topicId] = true;
      save();
    },

    showEnglish: function () {
      return readStorage(LANG_KEY) !== "0";
    },

    setShowEnglish: function (on) {
      writeStorage(LANG_KEY, on ? "1" : "0");
    },

    reset: function () {
      cache = emptyProgress();
      removeStorage(KEY);
    }
  };
})();
