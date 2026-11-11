# Faster page loads – implementation plan

Goal: pages show their content sooner when you move between them. **The UI must look and behave exactly as it does now** (same layout, same text, same controls, same default open/closed states). Only *when* and *how much* work is done changes.

## What was measured (2026-11-11, desktop Mac, local server, warm cache)

| Page | DOM nodes after render | DOMContentLoaded |
|---|---|---|
| index.html (I dag) | 205 | ~50 ms |
| learn.html (Øv) | 324 | ~105 ms |
| quiz.html (Test) | 378 | ~90 ms |
| exams.html (Prøver) | 505 | ~100 ms |
| top15.html | 535 | ~100 ms |
| **study.html (Læs)** | **15,975** | **~1,150 ms** |

A phone is typically 4–6× slower than this Mac, so Læs takes several seconds of "Indlæser …" there.

### Causes, biggest first

1. **Sync blocks the first render on almost every navigation.** `MBP.ui.start` (js/ui.js ~line 980) waits for `MBP.sync.beforeRender()`. In js/sync.js, `FRESH_MS = 10000`, so any page opened more than 10 s after the last sync waits for a network round trip to the Lambda, up to `RENDER_WAIT_MS = 2500` ms, before anything is drawn. With sync on, this hits nearly every page change. Leaving a page already flushes with a keepalive POST (`pagehide`), so the next page does not need to wait.
2. **Læs builds the whole book up front.** study.js renders all 10 topics, every fact, every Q&A, every "Mere fra bogen" excerpt, and every fact-group table *twice* (once inside its topic, once in "Alle oversigtstabeller"). ~4,560 of the nodes sit inside closed `<details>` (`details.qa` 3,556, `details.book-more` 1,004) that the reader has not opened. 835 SVG icons (~2,500 nodes).
3. **Every page parses the full 1.2 MB `data/bundle.js`.** Of that, `en` (403 KB), `more` (163 KB) and `book` (73 KB) are only used by the book button / popover and "Mere fra bogen" blocks. index.html and exams.html never use them.
4. **Every page loads `js/vendor/qrcode.js` (57 KB)**, but it is only used inside the sync popup (`qrSvg` in js/syncui.js ~line 340). js/scan.js already shows the lazy-load pattern for `jsQR`.

## Changes

Do them in this order. Measure after each step (see Verification) and commit each step separately.

### Step 1 – Don't block rendering on sync (js/sync.js)

- In `beforeRender()`, only wait for the network on the **first page view of a browser session**. Use a `sessionStorage` flag (e.g. `mbp.v1.syncSession`, wrapped in try/catch like the other storage helpers). On later page views in the same session, start `syncNow()` in the background (don't return its promise) and resolve immediately.
- Keep `dirty` handling and the `pagehide`/`visibilitychange` flush unchanged.
- Lower `RENDER_WAIT_MS` from 2500 to 1200 for that first view.
- Do not add any re-render after a background sync (that would change the UI). The synced progress shows on the next page view, as it effectively does today after a timeout.
- Update the `beforeRender` comment and the README "Progress and storage" section only if they describe the wait.

### Step 2 – Læs: build closed content only when it is opened (js/study.js, js/ui.js)

- **Q&A details** (`factRow` in study.js): create the `<details class="qa">` with its `<summary>` only. Build the `.qa-body` div the first time the details fires `toggle` with `open === true`, then append it. Same markup as today once built.
- **"Mere fra bogen" block** (`moreBlock` in ui.js): when the block is created closed (`open` is false), build the `.book-more-body` on the first `toggle` to open. When it is created open (the feedback case with `bookMoreOpen()` true), build it immediately as today. The `toggle` listener that stores the open/closed choice (if present) must keep working.
- Keep the summary text, counts and icons identical, so closed blocks look exactly the same.

### Step 3 – Læs: defer the off-screen sections (js/study.js, css/style.css)

- **"Alle oversigtstabeller"** (`#tabeller`): build the `<section id="tabeller">` with its `<h2>` immediately, but append the group blocks in a `requestIdleCallback` (fallback `setTimeout(…, 0)`) after the first render. If `location.hash` is `#tabeller` or the id of one of `D.groups`, build them synchronously before the hash scroll.
- Add to css/style.css:
  ```css
  .study-content > .topic,
  .study-content > #tabeller { content-visibility: auto; contain-intrinsic-size: auto 1500px; }
  ```
  This skips layout/paint for off-screen topics without changing how they look. Check that the hash scroll (`scrollIntoView`) and `watchTopics` (chip bar / sidebar highlight) still land on the right topic; if a hash jump lands short, call `scrollIntoView()` a second time inside `requestAnimationFrame`.
- Only if study.html is still over ~400 ms after steps 2–3: render the first topic (or the topic named in the hash and all before it) synchronously and the rest in idle-callback chunks, one topic per chunk. `watchTopics` must then look up sections at scroll time instead of once.

### Step 4 – Split the data bundle (tools/build_data.py, js/data.js, *.html)

- `tools/build_data.py` writes two files instead of `data/bundle.js`:
  - `data/bundle-core.js`: `window.MBP_RAW = {questions, clusters, topics, groups}`
  - `data/bundle-book.js`: `window.MBP_RAW_BOOK = {book, more, en}`
  Delete `data/bundle.js` and update the README ("Run it", "Update the content", project structure) to name the two files.
- `js/data.js`: `MBP.load()` reads `MBP_RAW` and, if present, `MBP_RAW_BOOK` (missing → `{}` for book/more/en). Keep the fetch fallback.
- HTML: all six pages load `bundle-core.js`. study, learn, quiz and top15 also load `bundle-book.js` (right after core). index.html and exams.html do not.
- Run `python3 tools/build_data.py` and commit the generated files.
- Check first: grep that home.js, exams.js and the shared code they run (ui.js `initShell`, syncui.js) never call `moreFor`, `withBook`, `enFor`, or read `MBP.data.book/more/en`.

### Step 5 – Load the QR library on demand (js/syncui.js, *.html)

- Remove `<script src="js/vendor/qrcode.js">` from all six HTML files.
- In syncui.js, load `js/vendor/qrcode.js` the first time a QR code is needed, with the same pattern as `loadDecoder` in js/scan.js (script URL worked out from `document.currentScript`, cached promise). Where `qrSvg` is used, show the QR once the script has loaded; on load failure show the same area empty, with the text code still visible.

## Out of scope

- No design, copy, layout or feature changes. No new loading spinners or skeletons.
- No service worker, no build tooling, no minification.
- Fonts stay as they are (already `display=swap`).

## Verification

Serve the site: `python3 -m http.server 8123` from the project folder, open it in the built-in browser.

1. **Timing.** On any page, run this in the browser console (JS tool) before and after each step and record the numbers in the commit message:
   ```js
   const out={};for(const p of ["index.html","learn.html","quiz.html","exams.html","top15.html","study.html"]){const f=document.createElement("iframe");f.style.cssText="position:fixed;width:400px;height:800px;left:-9999px";document.body.appendChild(f);f.src=p;await new Promise(r=>f.onload=r);await new Promise(r=>setTimeout(r,50));const n=f.contentWindow.performance.getEntriesByType("navigation")[0];out[p]={nodes:f.contentDocument.querySelectorAll("*").length,dcl:Math.round(n.domContentLoadedEventEnd)};f.remove()}out
   ```
   Target: study.html DOMContentLoaded under ~400 ms on this Mac; no page slower than before.
2. **Looks identical.** Take screenshots of every page before starting, at phone width (375×812) and desktop width, light theme; compare after the last step. Also study.html in dark theme.
3. **Behaviour on Læs:** open a Q&A, open a "Mere fra bogen", tick "Vis kun ofte stillede", click a chip and a sidebar link, load `study.html#tabeller`, `study.html#<a topic id>` and `study.html#fg-farvande` directly, open a book popover and its EN toggle, scroll to the end of a topic (marks it read).
4. **Other pages:** answer a quiz question and check the feedback "Mere fra bogen" block and book button; Øv cards; top15; Prøver.
5. **Sync popup:** open the share/scan header button on two pages, check the QR appears on the Del tab and the Scan tab still works.
6. Console: no errors on any page.
