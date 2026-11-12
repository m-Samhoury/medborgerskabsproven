#!/usr/bin/env node
// Checks the fact-sheet data (the book's 26 fakta-ark) in data/bundle-core.js and data/bundle-book.js.
// Run from the repo root:  node tools/check_sheets.js
// Exits 1 on any failure.
//  1 26 topics: order 1..26, sheet 1..26, unique ids, ids as in the reorganisation table
//  2 every cluster: topic_ids is a non-empty list of sheet ids, no repeats, topic_ids[0] === topic_id
//  3 every sheet's cluster_ids is exactly the clusters whose topic_ids contain it, sorted by times_asked desc
//  4 sum of cluster_ids over sheets is 210 = 168 clusters + 42 shared placements; 41 clusters are in 2+ sheets
//  5 every fact group: topic_ids is a non-empty list of sheet ids; each sheet's fact_group_ids matches
//  6 every book_more key is a cluster, group or sheet id
//  7 question_count per sheet is the sum of question_ids over its clusters
//  8 intros (Phase 2): every sheet has >= 1 paragraph with non-empty da and en, the same bullet/star/newline
//    counts, numbers kept, length ratio 0.6-1.8 for paragraphs >= 60 characters, and a book ref
// Prints the per-sheet counts own/shared (own = main sheet).
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var fails = [];
function fail(msg) { fails.push(msg); }

var sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle-core.js"), "utf8"), sandbox);
var D = JSON.parse(JSON.stringify(sandbox.window.MBP_RAW));
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle-book.js"), "utf8"), sandbox);
var MORE = JSON.parse(JSON.stringify(sandbox.window.MBP_RAW_BOOK.more));

var EXPECT_IDS = [
  "skole", "uddannelse", "dagtilbud", "arbejdsmarked", "erhvervsliv", "velfaerd", "familieliv",
  "foreningsliv", "sundhed", "ligestilling", "grundloven", "retssamfund", "folketing", "selvstyre",
  "valg", "rettigheder", "religion", "omverdenen", "geografi", "historie-foer-1945",
  "historie-efter-1945", "kultur", "traditioner", "forsvar", "diskrimination", "klima"
];
var EXPECT_PAGES = [5, 11, 17, 21, 30, 34, 40, 46, 52, 57, 61, 67, 71, 76, 81, 88, 92, 96, 104, 107,
  115, 122, 127, 132, 138, 142];

var topics = D.topics;
var sheetIds = new Set(topics.map(function (t) { return t.id; }));
var tById = {};
topics.forEach(function (t) { tById[t.id] = t; });

// 1
if (topics.length !== 26) fail("expected 26 topics, found " + topics.length);
topics.forEach(function (t, i) {
  if (t.order !== i + 1) fail("topic " + t.id + ": order " + t.order + " != " + (i + 1));
  if (t.sheet !== i + 1) fail("topic " + t.id + ": sheet " + t.sheet + " != " + (i + 1));
  if (t.id !== EXPECT_IDS[i]) fail("topic #" + (i + 1) + " is " + t.id + ", expected " + EXPECT_IDS[i]);
  if (!t.pages || t.pages[0] !== EXPECT_PAGES[i]) fail("topic " + t.id + ": first page " + (t.pages && t.pages[0]));
  if (!t.pages || t.pages[1] !== (i < 25 ? EXPECT_PAGES[i + 1] - 1 : 146)) fail("topic " + t.id + ": last page");
  if (!t.title_da || !t.title_en) fail("topic " + t.id + ": missing title");
});
if (sheetIds.size !== topics.length) fail("topic ids are not unique");

// 2
var clusterIds = new Set();
var multi = 0;
var placements = 0;
D.clusters.forEach(function (c) {
  clusterIds.add(c.id);
  var ids = c.topic_ids;
  if (!Array.isArray(ids) || !ids.length) { fail("cluster " + c.id + ": topic_ids missing"); return; }
  if (new Set(ids).size !== ids.length) fail("cluster " + c.id + ": repeated sheet in topic_ids");
  ids.forEach(function (id) { if (!sheetIds.has(id)) fail("cluster " + c.id + ": unknown sheet " + id); });
  if (ids[0] !== c.topic_id) fail("cluster " + c.id + ": topic_ids[0] !== topic_id");
  if (ids.length > 1) multi++;
  placements += ids.length;
});
if (D.clusters.length !== 168) fail("expected 168 clusters, found " + D.clusters.length);
if (multi !== 41) fail("expected 41 clusters in 2+ sheets, found " + multi);
if (placements !== 210) fail("expected 210 placements, found " + placements);

// 3
var byId = {};
D.clusters.forEach(function (c) { byId[c.id] = c; });
var total = 0;
topics.forEach(function (t) {
  var want = D.clusters.filter(function (c) { return c.topic_ids.indexOf(t.id) !== -1; })
    .map(function (c) { return c.id; });
  want.sort(function (a, b) {
    var d = byId[b].times_asked - byId[a].times_asked;
    return d !== 0 ? d : (a < b ? -1 : a > b ? 1 : 0);
  });
  if (JSON.stringify(want) !== JSON.stringify(t.cluster_ids)) fail("sheet " + t.id + ": cluster_ids wrong");
  total += t.cluster_ids.length;
  t.cluster_ids.forEach(function (cid) { if (!byId[cid]) fail("sheet " + t.id + ": unknown cluster " + cid); });
  // 7
  var q = 0;
  t.cluster_ids.forEach(function (cid) { q += byId[cid].question_ids.length; });
  if (q !== t.question_count) fail("sheet " + t.id + ": question_count " + t.question_count + " != " + q);
});
if (total !== 210) fail("sum of sheet cluster_ids is " + total + ", expected 210");

// 5
var groupIds = new Set();
D.groups.forEach(function (g) {
  groupIds.add(g.id);
  if (!Array.isArray(g.topic_ids) || !g.topic_ids.length) { fail("group " + g.id + ": topic_ids missing"); return; }
  g.topic_ids.forEach(function (id) { if (!sheetIds.has(id)) fail("group " + g.id + ": unknown sheet " + id); });
});
topics.forEach(function (t) {
  var want = D.groups.filter(function (g) { return (g.topic_ids || []).indexOf(t.id) !== -1; })
    .map(function (g) { return g.id; });
  if (JSON.stringify(want) !== JSON.stringify(t.fact_group_ids)) fail("sheet " + t.id + ": fact_group_ids wrong");
});

// 6
Object.keys(MORE).forEach(function (k) {
  if (!clusterIds.has(k) && !groupIds.has(k) && !sheetIds.has(k)) fail("book_more key is unknown: " + k);
});

// 8 intros
var NUM = /\d+(?:[.,]\d+)*/g;
function count(s, ch) { return s.split(ch).length - 1; }
// Until the intros are built (Phase 2) every sheet's intro is empty: skip rule 8 then.
var introsBuilt = topics.some(function (t) { return (t.intro || []).length > 0; });
if (!introsBuilt) console.log("intros: not built yet, rule 8 skipped");
topics.forEach(function (t) {
  if (!introsBuilt) return;
  var intro = t.intro || [];
  if (!intro.length) { fail("sheet " + t.id + ": no intro"); return; }
  var hasBox = false;
  intro.forEach(function (p, i) {
    var where = "sheet " + t.id + " intro[" + i + "]";
    if (!p.da) fail(where + ": empty da");
    if (!p.en) fail(where + ": empty en");
    if (p.da.indexOf("•") !== -1 && p.da.indexOf("Dette ") === 0) hasBox = true;
    if (p.da && p.en) {
      ["•", "*", "\n"].forEach(function (ch) {
        if (count(p.da, ch) !== count(p.en, ch)) fail(where + ": '" + ch + "' count differs");
      });
      var nda = (p.da.match(NUM) || []);
      nda.forEach(function (n) { if (p.en.indexOf(n) === -1 && p.en.indexOf(n.replace(/\./g, ",")) === -1) fail(where + ": number " + n + " missing in en"); });
      if (p.da.length >= 60) {
        var r = p.en.length / p.da.length;
        if (r < 0.6 || r > 1.8) fail(where + ": length ratio " + r.toFixed(2));
      }
    }
    if (!p.book || !p.book.length) fail(where + ": no book ref");
    (p.book || []).forEach(function (ref) {
      if (ref.page < t.pages[0] || ref.page > t.pages[1]) fail(where + ": book page " + ref.page + " outside sheet pages");
    });
  });
  if (!hasBox) fail("sheet " + t.id + ": no contents box (a paragraph starting 'Dette ' with a bullet)");
});

// Per-sheet counts
console.log("sheets: 26, clusters: " + D.clusters.length + ", placements: " + total +
  ", clusters in 2+ sheets: " + multi);
topics.forEach(function (t) {
  var own = D.clusters.filter(function (c) { return c.topic_id === t.id; }).length;
  console.log("  " + String(t.sheet).padStart(2) + " " + t.id + "  own/shared " + own + "/" + (t.cluster_ids.length - own) +
    "  questions " + t.question_count);
});

if (fails.length) {
  fails.slice(0, 60).forEach(function (m) { console.error("FAIL: " + m); });
  console.error(fails.length + " failure(s)");
  process.exit(1);
}
console.log("ALL OK");
