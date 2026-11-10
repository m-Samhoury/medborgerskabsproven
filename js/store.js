// Progress storage (Leitner boxes). Every localStorage access is wrapped in try/catch.
// If storage is unavailable, progress is kept in memory for this page view only.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});
  var KEY = "mbp.v1.progress";
  var LANG_KEY = "mbp.v1.showEnglish";
  var THEME_KEY = "mbp.v1.theme";
  var ACTIVITY_KEY = "mbp.v1.activity";
  var SEEN_KEY = "mbp.v1.seenMastered";
  var BOOK_MORE_KEY = "mbp.v1.bookMoreOpen";
  var BOOK_EN_KEY = "mbp.v1.bookEnOpen";
  var BOOK_POP_SIZE_KEY = "mbp.v1.bookPopSize";
  var RESET_KEY = "mbp.v1.resetAt";
  var GOAL = 25;
  var KEEP_DAYS = 60;
  var INTERVALS = [0, 10 * 60 * 1000, 24 * 3600 * 1000, 3 * 24 * 3600 * 1000, 7 * 24 * 3600 * 1000, 14 * 24 * 3600 * 1000];

  var cache = null;
  // Counts local data writes. Sync uses it to tell whether anything changed while a request was in flight.
  var dataVersion = 0;

  // Local date key YYYY-MM-DD for a Date.
  function dayKey(d) {
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  // Parses a JSON object from storage; anything broken reads as empty.
  function readJson(key) {
    try {
      var parsed = JSON.parse(readStorage(key) || "null");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  // Daily activity map, keyed by local date. Only the last KEEP_DAYS days are kept.
  function activity() {
    return readJson(ACTIVITY_KEY);
  }

  // Adds one answer to today's activity. Returns true once, when the daily goal is reached.
  function recordActivity(isCorrect) {
    var act = activity();
    var today = new Date();
    var key = dayKey(today);
    var day = act[key] || { answers: 0, right: 0, goalShown: false };
    day.answers++;
    if (isCorrect) day.right++;
    act[key] = day;

    var cutoff = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (KEEP_DAYS - 1));
    var cutKey = dayKey(cutoff);
    Object.keys(act).forEach(function (k) {
      if (k < cutKey) delete act[k];
    });

    var reached = day.answers >= GOAL && !day.goalShown;
    if (reached) day.goalShown = true;
    writeStorage(ACTIVITY_KEY, JSON.stringify(act));
    changed();
    return reached;
  }

  // Reads a list of ids from storage; anything broken reads as empty.
  function readList(key) {
    try {
      var parsed = JSON.parse(readStorage(key) || "null");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

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

  // Every local data write goes through here, so sync (when it is on) can send the change.
  function changed() {
    dataVersion++;
    if (MBP.sync) MBP.sync.changed();
  }

  function save() {
    writeStorage(KEY, JSON.stringify(progress()));
    changed();
  }

  // Milliseconds of the last reset on any device, or 0 if never reset.
  function resetAt() {
    var n = Number(readStorage(RESET_KEY));
    return isFinite(n) && n > 0 ? n : 0;
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
      return recordActivity(isCorrect);
    },

    // Today's answers and right answers.
    today: function () {
      var day = activity()[dayKey(new Date())] || {};
      return { answers: day.answers || 0, right: day.right || 0 };
    },

    // The whole activity map, for the week strip.
    activity: activity,

    // Days in a row with answers, counting back from today (or from yesterday if today is still empty).
    streak: function () {
      var act = activity();
      var d = new Date();
      var n = 0;
      function active(day) {
        var e = act[dayKey(day)];
        return !!e && e.answers > 0;
      }
      if (!active(d)) d.setDate(d.getDate() - 1);
      while (active(d)) {
        n++;
        d.setDate(d.getDate() - 1);
      }
      return n;
    },

    hasAnyProgress: function () {
      return Object.keys(progress().questions).length > 0;
    },

    isMasteredSeen: function (topicId) {
      return readList(SEEN_KEY).indexOf(topicId) !== -1;
    },

    markMasteredSeen: function (topicId) {
      var list = readList(SEEN_KEY);
      if (list.indexOf(topicId) === -1) list.push(topicId);
      writeStorage(SEEN_KEY, JSON.stringify(list));
      changed();
    },

    // Best score among the saved runs of one past exam, or null if it was never run.
    bestScore: function (examId) {
      var best = null;
      progress().quizzes.forEach(function (q) {
        if (q.examId === examId && (best === null || q.score > best)) best = q.score;
      });
      return best;
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

    // "light" or "dark" when the reader chose one; anything else means auto (follow the OS).
    theme: function () {
      var t = readStorage(THEME_KEY);
      return t === "light" || t === "dark" ? t : "auto";
    },

    // Auto removes the key, so the page follows the OS again.
    setTheme: function (t) {
      if (t === "light" || t === "dark") writeStorage(THEME_KEY, t);
      else removeStorage(THEME_KEY);
    },

    // Whether "Mere fra bogen" in the feedback after an answer is open. Open unless the reader closed it.
    bookMoreOpen: function () {
      return readStorage(BOOK_MORE_KEY) !== "0";
    },

    setBookMoreOpen: function (on) {
      writeStorage(BOOK_MORE_KEY, on ? "1" : "0");
    },

    // Whether the English translations under the book passages are shown. Off unless the reader turned it on.
    bookEnOpen: function () {
      return readStorage(BOOK_EN_KEY) === "1";
    },

    setBookEnOpen: function (on) {
      writeStorage(BOOK_EN_KEY, on ? "1" : "0");
    },

    // The size the reader gave the book popover, {w, h} in px, or null for the default size.
    bookPopSize: function () {
      try {
        var s = JSON.parse(readStorage(BOOK_POP_SIZE_KEY) || "null");
        return s && s.w > 0 && s.h > 0 ? { w: s.w, h: s.h } : null;
      } catch (e) {
        return null;
      }
    },

    setBookPopSize: function (size) {
      if (size) writeStorage(BOOK_POP_SIZE_KEY, JSON.stringify(size));
      else removeStorage(BOOK_POP_SIZE_KEY);
    },

    reset: function () {
      cache = emptyProgress();
      removeStorage(KEY);
      removeStorage(ACTIVITY_KEY);
      removeStorage(SEEN_KEY);
      // The reset time lets other devices see that old data must go too.
      writeStorage(RESET_KEY, String(Date.now()));
      changed();
    },

    // Local data version, for sync.
    version: function () {
      return dataVersion;
    },

    // The whole synced state, in the shape the server stores (see SYNC_PLAN.md).
    snapshot: function () {
      return {
        v: 1,
        resetAt: resetAt(),
        progress: progress(),
        activity: activity(),
        seenMastered: readList(SEEN_KEY)
      };
    },

    // Replaces the synced state with a server snapshot. Does not count as a local change.
    apply: function (snap) {
      writeStorage(KEY, JSON.stringify(snap.progress));
      writeStorage(ACTIVITY_KEY, JSON.stringify(snap.activity));
      writeStorage(SEEN_KEY, JSON.stringify(snap.seenMastered));
      writeStorage(RESET_KEY, String(snap.resetAt));
      cache = null;
    }
  };
})();
