#!/usr/bin/env node
// Checks the English translations of the book texts (data/book_en.json, shown in the "Læs mere i bogen" popover).
// Run from the repo root:  node tools/check_book_en.js   (exits 1 on any failure)
//  1 every distinct Danish book string (tools/list_book_da.js) has a non-empty English translation
//  2 no stale keys: every key in data/book_en.json is a Danish string that is still used
//  3 structure: the same number of "\n" paragraphs, "•" items and "*" marks as the Danish
//  4 every number in the Danish appears in the English, unchanged
//  5 the English is not the Danish, and for texts of 60 characters or more its length is 0.6–1.8 × the Danish
//    (shorter headings are left out of the length rule: a two-word title can change length a lot)
//  6 bundle.en (data/bundle-book.js) is exactly the used part of data/book_en.json
// EXCEPTIONS: a Danish string → the reason it may break rule 5. Keep it empty unless there is a good reason.
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var list = require("./list_book_da.js");
var EXCEPTIONS = {};

var fails = [];
function fail(msg) { fails.push(msg); }

var used = list.distinctStrings();
var usedSet = new Set(used);
var en = list.translations();
var enFile = path.join(ROOT, "data", "book_en.json");
if (!fs.existsSync(enFile)) fail("data/book_en.json is missing");

// 1 and 3–5 per string
var missing = [];
var translated = 0;
used.forEach(function (da) {
  var tr = en[da];
  if (!tr || typeof tr !== "string" || !tr.trim()) { missing.push(da); return; }
  translated++;
  var where = JSON.stringify(da.slice(0, 50));
  var count = function (s, ch) { return s.split(ch).length - 1; };
  ["\n", "•", "*"].forEach(function (ch) {
    var name = ch === "\n" ? "paragraph" : ch === "•" ? "bullet" : "star";
    if (count(da, ch) !== count(tr, ch)) {
      fail(where + ": " + name + " count " + count(da, ch) + " in Danish, " + count(tr, ch) + " in English");
    }
  });
  (da.match(/\d+/g) || []).forEach(function (n) {
    if (tr.indexOf(n) === -1) fail(where + ": number " + n + " missing from English");
  });
  if (tr.trim() === da.trim()) fail(where + ": English is identical to the Danish");
  if (da.length >= 60 && !EXCEPTIONS[da]) {
    var ratio = tr.length / da.length;
    if (ratio < 0.6 || ratio > 1.8) {
      fail(where + ": length ratio " + ratio.toFixed(2) + " (" + tr.length + " vs " + da.length + " characters)");
    }
  }
});
if (missing.length) fail(missing.length + " string(s) without an English translation (run node tools/list_book_da.js --missing)");

// 2 stale keys
var stale = Object.keys(en).filter(function (k) { return !usedSet.has(k); });
stale.forEach(function (k) { fail("stale key, not used by the book data: " + JSON.stringify(k.slice(0, 60))); });

// 6 bundle.en
var sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data", "bundle-book.js"), "utf8"), sandbox);
var bundleEn = sandbox.window.MBP_RAW_BOOK && sandbox.window.MBP_RAW_BOOK.en;
var subset = {};
used.forEach(function (da) { if (en[da]) subset[da] = en[da]; });
// Same keys and values; the key order does not matter (the builder sorts them, so JSON text can differ).
function sameObject(a, b) {
  var ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
  return ka.length === kb.length && ka.every(function (k, i) { return k === kb[i] && a[k] === b[k]; });
}
var bundleMatches = !!bundleEn && sameObject(bundleEn, subset);
if (!bundleEn) fail("data/bundle-book.js has no \"en\" – run python3 tools/build_data.py");
else if (!bundleMatches) fail("data/bundle-book.js \"en\" differs from data/book_en.json – run python3 tools/build_data.py");

console.log("book en: " + translated + " of " + used.length + " strings translated; " +
  "stale keys: " + stale.length + "; bundle matches: " + bundleMatches);
if (fails.length) {
  fails.slice(0, 60).forEach(function (m) { console.error("FAIL: " + m); });
  if (fails.length > 60) console.error("... and " + (fails.length - 60) + " more");
  console.error(fails.length + " failure(s)");
  process.exit(1);
}
console.log("ALL OK");
