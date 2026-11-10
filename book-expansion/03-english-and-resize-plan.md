# Plan: English translations in the book popover + a resizable popover

Status: ready to build. Written 2026-11-10 against commit 26cdea7 (plus the uncommitted working tree).

## Goal

1. Every Danish book passage shown by the "Læs mere i bogen" popover (and by the inline "Mere fra bogen"
   blocks, which reuse the same rendering) gets an accurate English translation directly below it.
2. The translations must not bloat the popover: they are hidden until the reader switches them on with
   one toggle, and the choice is remembered.
3. The popover can be resized by the reader (mouse and touch), and its text reflows to the new size.
4. The direct links ("Åbn side N i bogen" → `BOOK_PDF#page=N`, and "Officiel kilde" → `BOOK_URL#page=N`)
   keep working exactly as now. Do not touch `pageLink()` or `officialLink()` in `js/ui.js`.

## What is shown today (read this first)

`js/ui.js`, section "Læs mere i bogen" (around lines 141–365):

- `refBlock(r)`: section 1 of the popover. Danish text comes from `MBP.data.book["<page>:<lines>"]`
  (built by `tools/build_data.py` from `bookdump/pages`, 285 passages, ~69k chars). Paragraphs are split on `\n`.
- `moreItem(x)`: one "Mere fra bogen" excerpt: `x.title_da` (heading) + `x.excerpt_da` (quote) from
  `data/book_more.json` (372 items, 323 distinct page:lines, ~130k chars). `moreText()` splits the
  text on "•" into an intro paragraph + list items. `moreItem` is used by both the popover
  (`moreSection`) and the inline `<details>` block (`moreBlock`) after answers and at the end of Læs topics.
- `placePop(btn)`: sets inline `width` (max 440px) / `left` / `top` / `max-height` (cap `POP_MAX` = 360).
- `.book-pop` CSS (`css/style.css` ~line 1604): grid `auto minmax(0,1fr)`, body scrolls.
- The site-wide "EN" toggle adds `html.hide-en`, which hides every `.en`. Translations must NOT use the
  class `en`, so the new toggle works independently of that one.

## Part A – Translation data

### A1. File format: `data/book_en.json`

A flat object keyed by the **exact Danish text** (not by page:lines – 4 page:lines keys in
book_more.json carry different texts, and 17 overlap with section 1):

```json
{
  "Boligens ukrænkelighed": "The inviolability of the home",
  "Grundloven beskytter også boligens ukrænkelighed. Det betyder ...": "The Constitution also protects ..."
}
```

Keys to cover (dedupe; one entry per distinct string):
- every value of the bundle's `book` map (section-1 passages, built by `build_data.py`),
- every `excerpt_da` in `data/book_more.json`,
- every `title_da` in `data/book_more.json`.

Because the key is the Danish text itself, a Danish passage that changes later automatically loses its
translation and the checker (A4) reports it.

Write a small helper `tools/list_book_da.js` (node, same vm-loading style as `tools/check_book_more.js`)
that prints all distinct Danish strings still missing from `data/book_en.json` as JSON
(`--batch N --size 25` to get batch N of 25). Use it to drive the translation work in batches.

### A2. Translation rules (accuracy matters most – this is citizenship-test material)

- Translate faithfully and completely. No summarising, no added explanations, no omitted sentences.
  Keep the meaning, tone and level of the Danish; plain modern English.
- Same structure as the Danish:
  - same number of `\n`-separated paragraphs (section-1 texts),
  - same number of "•" markers in the same places (more excerpts) – keep the "•" characters,
  - keep every "*" (glossary mark) right after the English word that corresponds to the starred Danish word,
  - keep quotes as quotes (”…” may become "…").
- Every number, year, date, percentage, page number and amount must appear unchanged
  (e.g. "1849", "18 år", "25 %" → "1849", "18 years", "25%"–style is fine but the digits must match).
- Proper names: keep Danish names of institutions/places/laws and add the established English name in
  parentheses the first time only when there is a well-known one, e.g. "Folketinget (the Danish Parliament)",
  "grundloven" → "the Constitution", "folkekirken" → "the Evangelical Lutheran Church in Denmark (Folkekirken)".
  Persons, party names and place names stay as they are.
- Titles (`title_da`) translate to short title-case headings.
- Do not "correct" the book. If the Danish is outdated or odd, translate it as written.
- After writing each batch, re-read every Danish/English pair once and fix any mismatch before saving.

### A3. Build

`tools/build_data.py`:
- load `data/book_en.json` (missing file → `{}`),
- add only the translations whose key is used (book values, excerpt_da, title_da) to the bundle as `"en"`,
- print the count of translated / total strings at the end.

`js/data.js`: pass `raw.en` through `index(...)` as `en: en || {}` (both the bundle path and the
`getJson` fallback path – add `getJson("data/book_en.json").catch(...)` next to the book_more one).

Run `python3 tools/build_data.py` after every change to data/*.json.

### A4. Checker: `tools/check_book_en.js`

Same style as `tools/check_book_more.js`; exits 1 on failure:
1. every Danish key from A1 has a non-empty English value (report the count missing),
2. no unused keys in `data/book_en.json` (stale translations),
3. structure: same `\n` paragraph count, same "•" count, same "*" count,
4. every digit sequence in the Danish (`/\d+/g`) appears in the English,
5. English is not identical to the Danish, and its length is between 0.6× and 1.8× the Danish length
   (flag outliers for re-reading rather than fail? – fail; fix the translation or widen the rule
   for that single key with a written reason in an `EXCEPTIONS` list in the script),
6. bundle `en` equals the used subset of `data/book_en.json`.

Also keep `node tools/check_book_more.js` passing (do not change book_more.json).

## Part B – Showing the English (without bloat)

### B1. One remembered toggle

- `js/store.js`: `bookEnOpen()` / `setBookEnOpen(on)`, key `"mbp.v1.bookEnOpen"`, default **off**
  (mirror `bookMoreOpen`).
- On page load (in the same place the EN toggle state is applied, ~`js/ui.js` line 718) set
  `document.documentElement.classList.toggle("show-book-en", MBP.store.bookEnOpen())`.
- Translations are always rendered into the DOM but hidden by CSS unless `html.show-book-en`.
  Toggling therefore never re-renders, and every open popover / inline block updates at once.

### B2. The toggle control

A small pill button `bookEnToggle()` with `aria-pressed`, label
"Vis engelsk oversættelse" / "Show English translation" (icon optional; use an existing icon from
`js/icons.js`, do not add new ones unless needed). Clicking flips the store value and the html class,
and updates `aria-pressed` on every `.book-en-toggle` in the page.

Place it:
- in the popover header row, between the title and the resize/close buttons (B4), compact (text "EN"
  with `aria-label`/`title` holding the full label) so the header stays one line on a 360px phone;
- at the top of the inline "Mere fra bogen" body (`moreBlock`), full label.

Only render the toggle when at least one passage in that popover/block has a translation.

### B3. Rendering the translation

- New helper `enFor(da)`: `(MBP.data && MBP.data.en && MBP.data.en[da]) || ""`.
- `refBlock`: after the Danish blockquote, if `enFor(text)`, add
  `<blockquote class="book-quote book-quote-en" lang="en">` with the English split on `\n` exactly like the Danish.
- `moreItem`: under the Danish `h4` title add `<p class="book-en-title" lang="en">` with `enFor(title_da)`;
  after the Danish quote add the English blockquote built with `moreText(enFor(excerpt_da))` (same "•" splitting).
- Order inside each item: cite → Danish quote → English quote → page link. The page link stays last and unchanged.
- Add a tiny label at the top of each English quote: "English translation (not from the book)" in
  `--fs-xs`, `--ink-2` – it makes clear the book itself is Danish.

CSS (`css/style.css`, next to the `.book-quote` rules):
```css
.book-quote-en, .book-en-title { display: none; }
html.show-book-en .book-quote-en { display: grid; }
html.show-book-en .book-en-title { display: block; }
.book-quote-en { margin-top: 6px; border-left-color: var(--line); background: transparent; color: var(--ink-2); font-size: 0.9rem; }
```
Use existing tokens only; check light and dark mode.

## Part C – Resizable popover

### C1. Behaviour

- A resize grip in the bottom-right corner of `.book-pop` (a `<button class="book-pop-grip">`,
  ≥ 24×24 visible, 44×44 touch target via padding/::before like `.book-btn`), drawn with CSS (two diagonal lines).
- Drag with Pointer Events (`pointerdown` → `setPointerCapture`, `pointermove`, `pointerup`), so it works
  with mouse, pen and touch. Set `touch-action: none` on the grip.
- Keyboard: when the grip has focus, arrow keys change width/height by 24px (Shift = 96px).
  `aria-label="Ændr størrelse – Resize"`.
- An "expand" button in the header (`book-pop-size`), toggling between the normal size and a large size
  `min(760px, vw − 32) × min(80vh, …)`, `aria-pressed` reflects the state. Useful on phones where dragging is fiddly.
- Limits: min 280×200 px; max = viewport width − 2×16 gutter and viewport height − 32. Clamp `left` so the
  popover never leaves the viewport horizontally when it grows; when width would exceed the room to the
  right, shift `left` leftwards.
- While/after the reader sizes the popover, `placePop` must not override it: keep a `userSize` {w, h}.
  `placePop` uses `userSize.w` instead of the 440 default and sets `height = userSize.h` (no `max-height` cap)
  when a user size exists, still clamped to the viewport.
- Remember the size in the store (`bookPopSize()` / `setBookPopSize({w,h})`, key `"mbp.v1.bookPopSize"`),
  so the next popover opens at the same size (clamped to the current viewport). Saved on `pointerup`/keyup, not on every move.
- Double-click on the grip resets to the default size (clears the stored size).
- The window `resize` listener keeps working: re-run `placePop` with the clamped user size.
- The existing close behaviour must keep working: dragging the grip must not trigger the document
  click-outside handler (the grip is inside the popover, so `pop.contains` already covers it – verify) and
  focus must stay inside the popover.

### C2. Text adjusts automatically

- `.book-pop` already uses `grid-template-rows: auto minmax(0, 1fr)` and the body scrolls; with an explicit
  height the body fills the rest. Replace the fixed `max-height` rule with: no max-height when sized by the
  user (inline style), otherwise the current behaviour.
- Add `container-type: inline-size` to `.book-pop-body`. With `@container (min-width: 620px)`, make each
  `.book-ref` show the Danish and English quotes side by side (`grid-template-columns: 1fr 1fr`) when
  English is on; below 620px they stack (English under Danish). Text wraps naturally; no font scaling.
- `max-width` of quotes: none inside the popover (so wide popovers use the width).

## Part D – Verify

1. `python3 tools/build_data.py`, `node tools/check_book_more.js`, `node tools/check_book_en.js` – all OK.
2. Start the preview (`.claude/launch.json`, config "site") and check in the browser pane:
   - Læs, Øv (lesson card and recap), Test feedback, exam review, Top 15: open book popovers with and
     without "Mere fra bogen"; toggle English on/off; the choice persists after reload.
   - The site-wide EN toggle off (`html.hide-en`) does not hide the book translations when they are switched on.
   - Drag the grip larger/smaller; text reflows; side-by-side layout appears when wide; size remembered on next open;
     double-click grip resets; expand button works; Escape / close button / click outside still close it.
   - Mobile preset (375×812): header fits on one line, grip and expand usable, no horizontal page scroll.
   - Dark mode.
   - Click "Åbn side N i bogen" and "Officiel kilde": same URLs as before (`…#page=N`), open in a new tab.
3. No console errors.

## Order of work

1. B1–B3 + C1–C2 with an empty `data/book_en.json` plus ~10 translated passages, so the UI can be verified early.
2. A1–A4 tooling.
3. Translate everything in batches of ~25 strings (titles can go 100 per batch), running
   `node tools/check_book_en.js` after each batch.
4. Part D.

The working tree already has other uncommitted changes (js/ui.js, css/style.css, js/store.js, …).
Do not commit, stash, reset or switch branches; leave all changes uncommitted for the owner to review.
