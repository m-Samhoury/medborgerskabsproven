#!/usr/bin/env node
// Checks the "Mere fra bogen" data in data/bundle-book.js (MBP_RAW_BOOK.more).
// Run from the repo root:  node tools/check_book_more.js   (or node book-expansion/check_bundle_more.js)
// Exits 1 on any failure.
//  1 the bundle loads and has a "more" object
//  2 bundle.more is exactly data/book_more.json, and holds the same excerpts as book-expansion/01-content-plan.json
//    when that file exists (so no excerpt text was changed on the way). The plan file is keyed by the old
//    topic ids; after the fact-sheet reorganisation (tools/reorg_sheets.py) the keys moved, so that comparison
//    is of the multiset of items (each item as JSON), not of the keyed object.
//  3 every key is a cluster id, fact-group id or topic id; every item has title_da, page, lines, excerpt_da
//  4 every question's cluster_id has at least one excerpt (the feedback block shows for 500 of 500)
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var fails = [];
function fail(msg) { fails.push(msg); }

var sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle-book.js"), "utf8"), sandbox);
var raw = sandbox.window.MBP_RAW_BOOK;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle-core.js"), "utf8"), sandbox);
raw = Object.assign({}, raw, sandbox.window.MBP_RAW);
if (!raw) { console.error("FAIL: data/bundle-book.js does not set window.MBP_RAW_BOOK"); process.exit(1); }
var more = raw.more;
if (!more || typeof more !== "object" || Array.isArray(more)) {
  console.error("FAIL: MBP_RAW_BOOK.more is missing – run python3 tools/build_data.py");
  process.exit(1);
}

// JSON round trip so objects from the vm context compare like plain objects.
var moreJson = JSON.stringify(more);
function sameAs(file) {
  var p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return null;
  return JSON.stringify(JSON.parse(fs.readFileSync(p, "utf8"))) === moreJson;
}
var asData = sameAs(path.join("data", "book_more.json"));
if (asData === null) fail("data/book_more.json is missing");
else if (!asData) fail("bundle.more differs from data/book_more.json");
function items_of(obj) {
  var out = [];
  Object.keys(obj).forEach(function (k) { obj[k].forEach(function (x) { out.push(JSON.stringify(x)); }); });
  return out.sort();
}
var asPlan = null;
var planPath = path.join(ROOT, "book-expansion", "01-content-plan.json");
if (fs.existsSync(planPath)) {
  asPlan = JSON.stringify(items_of(JSON.parse(fs.readFileSync(planPath, "utf8")))) ===
    JSON.stringify(items_of(more));
  if (!asPlan) fail("bundle.more has different excerpts from book-expansion/01-content-plan.json");
}

var ids = new Set();
raw.clusters.forEach(function (c) { ids.add(c.id); });
raw.groups.forEach(function (g) { ids.add(g.id); });
raw.topics.forEach(function (t) { ids.add(t.id); });

var items = 0;
Object.keys(more).forEach(function (key) {
  if (!ids.has(key)) fail("unknown key in more: " + key);
  var list = more[key];
  if (!Array.isArray(list) || !list.length) { fail("empty or not a list: " + key); return; }
  list.forEach(function (x, i) {
    items++;
    var where = key + "[" + i + "]";
    if (typeof x.title_da !== "string" || !x.title_da) fail(where + ": title_da");
    if (!Number.isInteger(x.page) || x.page < 1 || x.page > 156) fail(where + ": page");
    if (typeof x.lines !== "string" || !/^\d+(-\d+)?$/.test(x.lines)) fail(where + ": lines");
    if (typeof x.excerpt_da !== "string" || !x.excerpt_da) fail(where + ": excerpt_da");
  });
});

var missing = raw.questions.filter(function (q) { return !(more[q.cluster_id] && more[q.cluster_id].length); });
missing.forEach(function (q) { fail("question " + q.id + " (cluster " + q.cluster_id + ") has no excerpt"); });

var withMore = raw.questions.length - missing.length;
console.log("more: " + Object.keys(more).length + " keys, " + items + " excerpts; questions with feedback block: " +
  withMore + " / " + raw.questions.length + "; same as data/book_more.json: " + asData +
  (asPlan === null ? "" : "; same as 01-content-plan.json: " + asPlan));
if (fails.length) {
  fails.slice(0, 50).forEach(function (m) { console.error("FAIL: " + m); });
  console.error(fails.length + " failure(s)");
  process.exit(1);
}
console.log("ALL OK");
