#!/usr/bin/env node
// Lists the distinct Danish book strings that need an English translation in data/book_en.json.
// The strings are: every section-1 passage in MBP_RAW.book, and every title_da and excerpt_da in MBP_RAW.more.
// Run from the repo root:
//   node tools/list_book_da.js                       every distinct string, as a JSON array
//   node tools/list_book_da.js --batch 3 --size 25   batch 3 (1-based) of that list
//   node tools/list_book_da.js --missing             only the strings without a translation yet
// Batches are slices of the full list, so batch N means the same strings whether or not earlier ones are translated.
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");

function load(file) {
  var p = path.join(ROOT, file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
}

// Every distinct Danish string, in bundle order (book passages first, then the "more" items).
function distinctStrings() {
  var sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle.js"), "utf8"), sandbox);
  var raw = sandbox.window.MBP_RAW;
  if (!raw || !raw.book || !raw.more) throw new Error("data/bundle.js has no book data – run python3 tools/build_data.py");
  var seen = new Set();
  var out = [];
  function add(s) {
    if (typeof s !== "string" || !s || seen.has(s)) return;
    seen.add(s);
    out.push(s);
  }
  Object.keys(raw.book).forEach(function (k) { add(raw.book[k]); });
  Object.keys(raw.more).forEach(function (k) {
    raw.more[k].forEach(function (x) { add(x.title_da); add(x.excerpt_da); });
  });
  return out;
}

// data/book_en.json: Danish text -> English text.
function translations() {
  return load(path.join("data", "book_en.json"));
}

if (require.main !== module) {
  module.exports = { distinctStrings: distinctStrings, translations: translations };
} else {
  var args = process.argv.slice(2);
  function opt(name) {
    var i = args.indexOf(name);
    return i === -1 ? null : args[i + 1];
  }
  var all = distinctStrings();
  var list = all;
  var batch = opt("--batch");
  if (batch) {
    var size = Number(opt("--size") || 25);
    var n = Number(batch);
    list = all.slice((n - 1) * size, n * size);
    console.error("batch " + n + ": strings " + ((n - 1) * size + 1) + "–" + Math.min(n * size, all.length) +
      " of " + all.length);
  }
  if (args.indexOf("--missing") !== -1) {
    var done = translations();
    list = list.filter(function (s) { return !done[s]; });
    console.error(list.length + " without a translation");
  }
  console.log(JSON.stringify(list, null, 2));
}
