# Fact-sheet reorganisation: notes

## Baseline (Phase 0, on main before any change)
- `python3 tools/build_data.py`: wrote data/bundle-core.js (500 questions, 168 clusters, 10 topics, 15 groups); data/bundle-book.js (285 book excerpts, 372 more-from-the-book excerpts)
- `node tools/check_book_en.js`: English: 935 of 935 book texts translated; stale keys: 0; bundle matches: true. ALL OK
- `node tools/check_book_more.js`: more: 193 keys, 372 excerpts; questions with feedback block: 500 / 500; ALL OK

## Phase 1: data re-keyed to 26 sheets
- `tools/reorg_sheets.py` written and run once. Output:
  - clusters: 127 with one sheet, 40 with two, 1 with three (as expected)
  - fact groups: main sheets as in the plan; `fg-kendte` overridden to `kultur`. `topic_ids` are ordered main first, then the other sheets with >= 5 lines, most-cited first. Note: this gives `fg-aarstal` 6 sheets, `fg-tal` 5 and `fg-ja-nej` 5 (the rule as written in the plan; see open points).
  - book_more: 48 topic-keyed excerpts re-keyed to 21 sheets, count unchanged (204 keys, 372 excerpts)
  - old topics saved to `book-expansion/old_topics.json` (needed for Phase 2)
- `tools/check_book_more.js` rule 2 changed to compare the multiset of items with `01-content-plan.json` (as the plan says); the content-plan file itself is untouched.
- `tools/check_sheets.js` added. Rule 8 (intros) is skipped until the intros exist (Phase 2).
- The script refuses to run twice (it checks topics.json for 26 entries).
- The JSON files keep the original one-space indentation.
- Per-sheet counts (own/shared) and question counts are printed by `check_sheets.js`.
- `check_book_en.js` now fails with 23 stale keys (old intro passages). Expected; Phase 2 fixes it.
