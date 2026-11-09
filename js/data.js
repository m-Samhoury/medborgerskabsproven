// Loads and indexes the four data files. Read-only: the JSON is never edited.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  function getJson(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error(path + " " + r.status);
      return r.json();
    });
  }

  MBP.load = function () {
    if (MBP.data) return Promise.resolve(MBP.data);
    return Promise.all([
      getJson("data/questions.json"),
      getJson("data/clusters.json"),
      getJson("data/topics.json"),
      getJson("data/fact_groups.json")
    ]).then(function (parts) {
      var questions = parts[0];
      var clusters = parts[1];
      var topics = parts[2].slice().sort(function (a, b) { return a.order - b.order; });
      var groups = parts[3];
      MBP.data = {
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
      return MBP.data;
    });
  };
})();
