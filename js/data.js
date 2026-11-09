// Loads and indexes the four data files. Read-only: the JSON is never edited.
// Normally the data comes from data/bundle.js (window.MBP_RAW), which works from file://.
// fetch() of data/*.json is only a fallback for when the bundle is missing.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  function getJson(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error(path + " " + r.status);
      return r.json();
    });
  }

  function index(questions, clusters, topicsRaw, groups) {
    var topics = topicsRaw.slice().sort(function (a, b) { return a.order - b.order; });
    return {
      questions: questions,
      clusters: clusters,
      topics: topics,
      groups: groups,
      qById: new Map(questions.map(function (q) { return [q.id, q]; })),
      cById: new Map(clusters.map(function (c) { return [c.id, c]; })),
      tById: new Map(topics.map(function (t) { return [t.id, t]; })),
      gById: new Map(groups.map(function (g) { return [g.id, g]; })),
      exams: Array.from(new Set(questions.map(function (q) { return q.exam; }))).sort()
    };
  }

  MBP.load = function () {
    if (MBP.data) return Promise.resolve(MBP.data);
    var raw = window.MBP_RAW;
    if (raw) {
      MBP.data = index(raw.questions, raw.clusters, raw.topics, raw.groups);
      return Promise.resolve(MBP.data);
    }
    return Promise.all([
      getJson("data/questions.json"),
      getJson("data/clusters.json"),
      getJson("data/topics.json"),
      getJson("data/fact_groups.json")
    ]).then(function (parts) {
      MBP.data = index(parts[0], parts[1], parts[2], parts[3]);
      return MBP.data;
    });
  };
})();
