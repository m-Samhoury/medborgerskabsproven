# PLAN.md – Build plan for the Medborgerskabsprøven study site

**Who this is for:** the builder (Haiku). **What you do:** build a static website from the data files that already exist, run the acceptance checks, then publish it.
**What you do NOT do:** you make no content decisions. You must not write, change, reword, translate, or "fix" any Danish or English study text. Every fact, question, answer, explanation and translation comes from `data/*.json`. The only text you write yourself is the fixed UI text listed in §6, word for word.

The user takes the Danish *medborgerskabsprøve* on **25 November 2026**. The real exam has 25 questions, and you pass with 20 correct. The user will memorise what the site shows, so a rendering bug that shows the wrong answer is the worst possible failure.

---

## 1. Hard rules

1. Use plain HTML, CSS and vanilla JavaScript (ES2020). Do not use a framework, a bundler, npm, a build step, TypeScript, CDN libraries or web fonts. Use only system fonts.
2. GitHub Pages serves the site from the **repo root** on branch `main`. Every link and `fetch` uses a **relative path** (`data/clusters.json`, `exams/…pdf`). Never start a path with `/`, because the site lives under `/medborgerskabsproven/`.
3. Data is loaded with `fetch()` from `data/*.json`. **Never edit the four JSON files or `data/VERIFICATION.md`.**
4. The site must work on a phone at 360 px wide, with no horizontal scrolling.
5. Wrap every `localStorage` read and write in `try/catch`. If storage fails, the site must still work and just won't remember progress.
6. Danish text comes first. The English translation sits directly underneath it in smaller, muted text, inside an element with class `en`. A global toggle hides all `.en` elements.
7. **The correct answer is the option whose `key` equals `question.correct[0]`.** Never use the option's position, because options are shuffled. Never use `official_correct` for scoring.
8. Insert all data text with `textContent` or `createTextNode`, never with `innerHTML`. The data contains characters like `<` and `&`.

---

## 2. File list (create exactly these)

```
index.html          home: countdown, progress, links
study.html          study material per topic + fact-group tables
learn.html          assisted learning (explanation cards + practice + spaced repetition)
quiz.html           quiz + exam mode + review
exams.html          list of the 20 original PDFs + answer keys
css/style.css       all styles (light + dark)
js/data.js          loading + indexing of the JSON files
js/store.js         localStorage wrapper + progress model
js/ui.js            shared rendering helpers (bilingual text, question card, nav, EN toggle)
js/home.js          logic for index.html
js/study.js         logic for study.html
js/learn.js         logic for learn.html
js/quiz.js          logic for quiz.html
js/exams.js         logic for exams.html
README.md           short project description (text given in §9)
.gitignore          contents given in §9
.nojekyll           empty file (so Pages serves files as-is)
```

These already exist. Do not modify them: `data/questions.json`, `data/clusters.json`, `data/topics.json`, `data/fact_groups.json`, `data/VERIFICATION.md`, `data/TRANSCRIPTION_REPORT.md`, `exams/*.pdf`, `exams/INDEX.md`.

Load scripts at the end of `<body>` in this order: `js/data.js`, `js/store.js`, `js/ui.js`, then the page script. Use classic scripts that attach to `window.MBP`. Do not use ES modules, because they need CORS and break on `file://`. You will test over a local HTTP server anyway (§8).

---

## 3. Data you consume (read-only)

### 3.1 `data/questions.json`: array of 500

```jsonc
{
  "id": "2017-11-q23",          // unique; format YYYY-MM-qN
  "exam": "2017-11",            // 20 distinct values, 2016-12 … 2026-06
  "number": 23,                 // 1..25 within the exam
  "question_da": "Hvilke områder mistede Danmark i 1864?",
  "question_en": "Which areas did Denmark lose in 1864?",
  "options": [                  // 2 or 3 options, keys A/B/C
    {"key": "A", "text_da": "Island og Norge", "text_en": "Iceland and Norway"},
    {"key": "B", "text_da": "Skåne, Halland og Blekinge", "text_en": "Skåne, Halland and Blekinge"},
    {"key": "C", "text_da": "Slesvig og Holsten", "text_en": "Slesvig and Holsten (Schleswig and Holstein)"}
  ],
  "correct": ["C"],             // ALWAYS exactly one key. This is the truth.
  "official_correct": ["B"],    // ONLY on 2017-11-q23. The official key's misprint. Display only (§5.4).
  "cluster_id": "his-1864",     // every question has one
  // ignore: section, image_note, answer_source, uncertain, notes
}
```

### 3.2 `data/clusters.json`: array of 168, already sorted by `times_asked` descending

```jsonc
{
  "id": "dem-demonstration",
  "topic_id": "demokrati",
  "fact_da": "…", "fact_en": "…",                  // the one fact to learn
  "question_ids": ["2016-12-q7", "2023-11-q23"],
  "times_asked": 2,                                  // number of distinct exams
  "exams": ["2016-12", "2023-11"],
  "last_asked": "2023-11",
  "frequent": false,                                 // true when times_asked >= 4  → "⭐ Ofte stillet"
  "canonical_question_da": "…", "canonical_question_en": "…",
  "answer_da": "…", "answer_en": "…",
  "variants": [                                      // distinct wordings; covers all question_ids
    {"question_da": "…", "question_en": "…", "answer_da": "Ja", "answer_en": "Yes", "question_ids": ["2016-12-q7"]}
  ],
  "trap_note_da": "…", "trap_note_en": "…",          // may be "" (then don't render)
  "current_note_da": "…", "current_note_en": "…"     // may be "" ; non-empty = fact changed since an exam
}
```

### 3.3 `data/topics.json`: array of 10, in display order (`order` 1..10)

```jsonc
{
  "id": "demokrati", "order": 1, "icon": "🏛️",
  "title_da": "…", "title_en": "…",
  "intro": [{"da": "…", "en": "…"}],          // study paragraphs
  "current_facts": [{"da": "…", "en": "…"}],  // "Ændret siden prøven" boxes; may be []
  "cluster_ids": ["…"],                        // already sorted by times_asked desc; render in THIS order
  "fact_group_ids": ["fg-…"],                  // tables to show on this topic's page
  "question_count": 123
}
```

### 3.4 `data/fact_groups.json`: array of 15

```jsonc
{
  "id": "fg-farvande", "topic_ids": ["geografi"],
  "title_da": "…", "title_en": "…",
  "columns_da": ["Farvand","Mellem","Bro"], "columns_en": ["Water","Between","Bridge"],
  "rows": [{"cells_da": ["…","…","…"], "cells_en": ["…","…","…"]}],
  "mnemonic_da": "…", "mnemonic_en": "…",
  "cluster_ids": ["geo-lillebaelt", "…"]
}
```

### 3.5 `js/data.js`: what it exposes

```js
MBP.load = async () => {           // fetch all four in parallel, cache in MBP.data
  // MBP.data = { questions, clusters, topics, groups,
  //              qById: Map, cById: Map, tById: Map, gById: Map, exams: [sorted unique exam strings] }
}
```

If any fetch fails, replace `<main>` with this exact text: `Kunne ikke indlæse data. Åbn siden via en webserver. / Could not load data. Open the page through a web server.`

---

## 4. Shared behaviour

### 4.1 Layout (every page)

- `<header>` contains the site title "Medborgerskabsprøven" with the small subtitle "Studieside · Study site", the nav, and the EN toggle.
- Nav links, in this order: `Hjem` (index.html), `Læs` (study.html), `Lær` (learn.html), `Quiz` (quiz.html), `Prøver` (exams.html). Mark the current page with `aria-current="page"`. On phones (<640 px) the nav is a horizontally laid-out row that wraps. Do not add a hamburger menu.
- `<main id="main">` holds the page content, max width 760 px, centred.
- `<footer>` holds one line: `Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.`
- Put a skip link `Spring til indhold` as the first element in `<body>`.

### 4.2 English toggle

- It is a button in the header with `aria-pressed`. The label is `EN: til` when English is shown and `EN: fra` when it is hidden.
- The state is stored in `localStorage["mbp.v1.showEnglish"]` as `"1"` or `"0"`, default `"1"`.
- Hidden means `document.documentElement.classList.add("hide-en")`, with the CSS rule `.hide-en .en { display: none }`.

### 4.3 `MBP.ui.bi(da, en, tag="p")`

This returns an element: `<tag class="bi"><span class="da">{da}</span><span class="en">{en}</span></tag>`. CSS displays both spans as blocks, and `.en` is smaller and muted. If `en` is empty, leave out the `.en` span. Use this helper for **every** piece of bilingual text.

### 4.4 Question card: `MBP.ui.questionCard(q, opts)`

This one component is used by learn and quiz.

- It shows a small meta line: `Prøve {exam} · spm. {number}`, plus `⭐ Ofte stillet` when the question's cluster has `frequent`.
- It shows the question with `bi(question_da, question_en, "h2")`.
- The options are a `<fieldset>` with a visually hidden `<legend>` (the question text) and one `<button type="button" class="opt">` per option, in **shuffled** order (Fisher–Yates, using `Math.random`). Each button shows `bi(text_da, text_en, "span")`. Never show the letters A/B/C, because the letters differ between exams. The user learns the answer text, not the letter.
- With `opts.feedback === true` (learn, and normal quiz mode), clicking an option locks every option. The correct option gets class `correct` and a ✓. A chosen wrong option gets class `wrong` and a ✗. Then the card renders the **explanation panel** (§4.5) and calls `opts.onAnswer(isCorrect, chosenKey)`.
- With `opts.feedback === false` (exam mode), clicking marks the option `selected` (`aria-pressed="true"`). The user can change the choice until they press Next. There is no explanation.
- Keyboard: the buttons are natural tab stops, and keys `1`/`2`/`3` choose an option in its displayed order.

### 4.5 Explanation panel (after answering, and in review)

Render these from the question's cluster, in this order:

1. `Rigtigt svar / Correct answer:`, then a `bi()` of the correct option's `text_da`/`text_en`.
2. `bi(cluster.fact_da, cluster.fact_en)` in a box with class `fact`.
3. If `trap_note_da` is non-empty: a box with class `trap`, a heading `⚠️ Pas på / Watch out`, and `bi(trap_note_da, trap_note_en)`.
4. If `current_note_da` is non-empty: a box with class `current`, a heading `🔄 Ændret siden prøven / Changed since the exam`, and `bi(current_note_da, current_note_en)`.
5. If the question is `2017-11-q23` (it has `official_correct`): a box with class `keyerror` and exactly this text:
   `Den officielle rettenøgle fra 2017 siger fejlagtigt B (Skåne, Halland og Blekinge). Det rigtige svar er Slesvig og Holsten – Skåne blev mistet i 1658.` / `The official 2017 answer key wrongly says B (Skåne, Halland and Blekinge). The correct answer is Slesvig and Holsten – Skåne was lost in 1658.`
6. A small line: `Stillet i {times_asked} prøver: {exams joined with ", "}`.

### 4.6 Progress model: `js/store.js`

All progress lives under one key, `localStorage["mbp.v1.progress"]`, as JSON:

```jsonc
{
  "clusters": { "<cluster_id>": { "box": 0, "due": 0, "right": 0, "wrong": 0, "seen": 0 } },
  "questions": { "<question_id>": { "right": 0, "wrong": 0 } },
  "quizzes": [ { "date": "2026-11-10T12:00:00Z", "mode": "exam|normal", "score": 21, "total": 25 } ],  // keep last 50
  "studied": { "<topic_id>": true }      // set when the topic page is scrolled to its end or "Markér som læst" is clicked
}
```

`MBP.store.record(questionId, clusterId, isCorrect)` uses a Leitner scheme:
- If correct: `box = min(box + 1, 5)`, `right++`.
- If wrong: `box = 0`, `wrong++`.
- In both cases: `seen++` and `due = Date.now() + [0, 10 min, 1 day, 3 days, 7 days, 14 days][box]` in ms.
- A cluster is **mastered** when `box >= 3`.

Exam-mode answers are recorded too, at the end of the exam. Provide `MBP.store.reset()`, which index.html calls after `confirm("Nulstil al fremgang? / Reset all progress?")`.

---

## 5. Pages

### 5.1 `index.html`: home

Show these in this order:
1. **Countdown.** Compute `days = ceil((new Date(2026, 10, 25) − today at local midnight) / 86 400 000)`. Show a big number with `dage til prøven / days to the exam` and the line `Prøven: onsdag 25. november 2026 / The exam: Wednesday 25 November 2026`. If `days === 0`, show `I dag! Held og lykke! / Today! Good luck!`. If it is negative, show `Prøven er overstået. / The exam is over.`
2. **Daily target.** Count the clusters that are not mastered, call that `N`. Then `perDay = days > 0 ? ceil(N / days) : N`. Show `Mål i dag: lær {perDay} emner / Today's goal: learn {perDay} items` and a button `Start / Start` that goes to `learn.html?topic=all`.
3. **Progress.** Show `{mastered} af 168 emner mestret / {mastered} of 168 items mastered` with a `<progress>`. Below it, one row per topic in `order`: icon, `title_da` with `title_en` under it, and a mini progress bar for the mastered clusters in that topic over its cluster count. Each row links to `study.html#<topic id>`.
4. **Last quiz results:** the last 5 entries of `quizzes`, as `{date dd.mm.} · {score}/{total} · Bestået/Ikke bestået` (Bestået when score/total ≥ 0.8). If there are none, show `Ingen quizzer endnu. / No quizzes yet.`
5. **Four big link cards:**
   - `📖 Læs stoffet / Study the material`
   - `🧠 Lær med hjælp / Assisted learning`
   - `✅ Tag en quiz / Take a quiz`
   - `🎯 Prøv en rigtig prøve (25 spm.) / Try a real exam (25 qs)`, which goes to `quiz.html?mode=exam`.
6. **Top 15** box, titled `⭐ De 15 mest stillede spørgsmål / The 15 most-asked questions`. It is an ordered list of the first 15 clusters in `clusters.json` order: `canonical_question_da` → **`answer_da`** (`×{times_asked}`), with the `.en` line `canonical_question_en → answer_en`.
7. A small `Nulstil fremgang / Reset progress` button at the bottom.

### 5.2 `study.html`: study material

- At the top, a table of contents: the 10 topics in `order` (icon, `title_da`, `.en` `title_en`, and `({cluster count} emner)`), each linking to `#<topic id>`. After them comes `📊 Alle oversigtstabeller / All overview tables` → `#tabeller`.
- Then a filter row with the checkbox `Vis kun ⭐ ofte stillede / Show only ⭐ frequently asked`, which hides non-frequent cluster items.
- For each topic, a `<section id="{topic.id}">`:
  1. `<h2>`: icon + `title_da`, with `title_en` under it in `.en`.
  2. Each `intro` paragraph as `bi(p.da, p.en)`.
  3. Each `current_facts` item as a `.current` box headed `🔄 Ændret siden prøven / Changed since the exam`.
  4. `<h3>Det skal du huske</h3>` with `.en` `What to remember`, followed by one list item per id in `topic.cluster_ids`, **in that order**. Each item shows:
     - a badge `⭐ Ofte stillet` if `frequent`, plus a muted `×{times_asked}`.
     - `bi(fact_da, fact_en)`.
     - a `<details>` with the summary `Spørgsmål og svar ({variants.length}) / Questions and answers`. Inside, list each variant as `question_da` → **`answer_da`**, with the `.en` line `question_en → answer_en`, and the muted ids (`question_ids` joined).
     - the trap and current boxes, if they are non-empty, as in §4.5.
  5. `<h3>Lær sammen / Learn together</h3>`, then each fact group in `topic.fact_group_ids`, rendered as in the next bullet.
  6. A button `Markér som læst / Mark as read`, which sets `studied[topic.id] = true`, and a link `Øv dette emne → / Practise this topic →` to `learn.html?topic={id}`.
- Then the section `<section id="tabeller">`, `Alle oversigtstabeller / All overview tables`, which renders all 15 fact groups. **Fact-group rendering:** a `<table>` with a `<caption>` of `bi(title_da, title_en)`, a header row with `columns_da[i]` and `.en` `columns_en[i]`, and body rows where each cell is `bi(cells_da[i], cells_en[i], "span")`. Under the table, a `.mnemonic` box headed `💡 Husk / Remember` with `bi(mnemonic_da, mnemonic_en)`. On narrow screens, wrap the table in a `div.table-wrap` with `overflow-x: auto`. That inner box may scroll horizontally, but the page must not.
- When the page opens with a `#hash`, scroll to that section.

### 5.3 `learn.html`: assisted learning

URL parameter: `?topic=<id>` or `?topic=all`. With no parameter, show the topic picker: 10 buttons plus `Alle emner / All topics` and `Kun ⭐ ofte stillede / Only ⭐ frequent`, the last of which means `?topic=all&frequent=1`.

**Pool.** The pool is the clusters of that topic in `topic.cluster_ids` order. For `all`, it is every cluster in `clusters.json` order. With `frequent=1`, keep only the clusters where `frequent` is true.

**Choosing the session (10 clusters max).**
1. Take the clusters that are **due**: they have been seen, are not mastered, and `due <= now`. Sort them by `due` ascending.
2. Then take **new** clusters (`seen === 0`) in pool order. Pool order is most-asked first.
3. Then take the remaining non-mastered clusters, by `box` ascending.
4. Stop at 10. If the pool is completely mastered, show `Alt i dette emne er mestret! 🎉 / Everything in this topic is mastered!` with buttons `Øv alligevel / Practise anyway` (session = 10 random pool clusters) and `Tag en quiz / Take a quiz` (`quiz.html?topics=<id>`).

**Flow.** Split the session into **lessons of 3 clusters**; the last lesson may be smaller.
1. **Explanation step.** Show one card per cluster in the lesson. Each card has the `⭐` badge, `bi(fact_da, fact_en)`, the `canonical_question_da` → **`answer_da`** (with English), and the trap and current boxes. Below the cards is a button `Jeg er klar – øv nu / I'm ready – practise now`.
2. **Practice step.** Build a queue of practice items, **one per cluster in the lesson**. If the lesson has fewer than 2 clusters, add a second item for the same cluster using a different variant, so each lesson has 2–4 practice questions. For each item, pick the question within the cluster in this order: (a) a question id whose variant the user has never answered right, (b) otherwise a random id from `question_ids`. Prefer a different variant from the previous pick for the same cluster.
3. Show the items one at a time with `questionCard(q, {feedback:true})`. After the answer, call `store.record(...)` and show a `Næste / Next` button.
4. **Wrong answer means it comes back.** Insert a new item for the same cluster, choosing a **different** question id from that cluster if there is one, **2 positions later** in the queue (or at the end). Each cluster comes back at most 2 times per lesson.
5. After the queue is empty, go to the next lesson.
6. **Session summary:** `{right} rigtige af {total} / {right} correct of {total}`, the list of clusters answered wrong (fact + correct answer), and the buttons `Fortsæt / Continue` (new session, same parameters) and `Tilbage til emner / Back to topics`.

At the top, show a progress line: `Lektion {i} af {n} · Spørgsmål {k}`.

### 5.4 `quiz.html`: quiz and exam mode

**Setup screen** (shown when there is no `mode=exam` parameter):
- Topics: checkboxes for the 10 topics, plus a first checkbox `Alt / Everything` that checks and unchecks all of them. Default: Alt. The URL parameter `?topics=a,b` pre-checks those topics.
- Length: radio buttons `10`, `25`, `Alle / All`. Default 10.
- Checkbox `Kun ⭐ mest stillede (stillet i 4+ prøver) / Only ⭐ most repeated (asked in 4+ exams)`.
- Checkbox `Prøvetilstand: 25 spørgsmål, ingen svar før til sidst, bestå ved 20/25 / Exam mode: 25 questions, no answers until the end, pass at 20/25`. When it is checked, disable the topic and length controls.
- Show a live count: `{n} spørgsmål tilgængelige / {n} questions available`.
- Button `Start quiz`.

**Building the question list:**
- Eligible questions are those whose cluster's `topic_id` is in the selected topics, AND, if the "most repeated" box is on, whose cluster has `frequent`.
- **Length `Alle`:** every eligible question, shuffled. Selecting Alt + Alle must give exactly 500 questions.
- **Length 10 or 25:** shuffle the eligible clusters and take one random question from each, until you reach the length. If there are fewer clusters than the length, go round again, picking questions not used yet. Never repeat a question id. Cap the length at the number of eligible questions.
- **Exam mode:** all topics, length 25, from **25 distinct clusters**. Weight the cluster draw so that frequent clusters are twice as likely: put each frequent cluster in the draw pool twice, shuffle, and de-duplicate. Then pick one random question per cluster. The "most repeated" checkbox still applies if it is checked.
- Shuffle the option order on every card (§4.4).

**Running:**
- Header line: `Spørgsmål {i} / {n}`, plus `· Prøvetilstand` in exam mode, and a progress bar.
- Normal mode uses `feedback:true` and shows a `Næste` button after each answer. Exam mode uses `feedback:false`, with `Forrige / Previous` and `Næste / Next` buttons and `Aflever / Hand in` on the last question. In exam mode, handing in with unanswered questions asks `confirm("Der er {k} ubesvarede spørgsmål. Aflever alligevel? / {k} unanswered. Hand in anyway?")`. Unanswered questions count as wrong.
- Record each answer with `store.record` (exam mode: all of them at hand-in).

**Result screen:**
- Large `{score} / {n}`.
- Exam mode: `Bestået ✅ / Passed` if score ≥ 20, otherwise `Ikke bestået ❌ – du skal have 20 rigtige / Not passed – you need 20 correct`. Normal mode: show the percentage, and Bestået if ≥ 80 %.
- Append `{date, mode, score, total}` to `quizzes`.
- **Review of mistakes:** for each wrong or unanswered question, show the question card in a locked state. Mark the user's choice ✗ (or `Ikke besvaret / Not answered`) and the correct answer ✓, then the full explanation panel (§4.5).
- A toggle `Vis også rigtige svar / Also show correct answers`, which adds the correct ones to the review.
- Buttons: `Prøv igen med samme indstillinger / Retry same settings`, `Øv mine fejl / Practise my mistakes` (starts a normal quiz with exactly the wrong question ids, shuffled), and `Ny quiz / New quiz`.

### 5.5 `exams.html`: original exams

- Heading `De originale prøver / The original exams`.
- The intro line: `Her er alle 20 officielle prøver med rettenøgle (svar). Bemærk: rettenøglen fra november 2017, spørgsmål 23, har en fejl – det rigtige svar er C (Slesvig og Holsten).` with the `.en` line `All 20 official exams with answer keys. Note: the November 2017 key, question 23, has an error – the correct answer is C (Slesvig and Holsten).`
- A list built from `MBP.data.exams` in **reverse** chronological order, one row per exam:
  - `{Month name in Danish} {year}`, using the months `januar … december`. The value `2016-12` becomes `december 2016`.
  - `📄 Prøve` linking to `exams/{exam}_medborgerskabsproeve.pdf`.
  - `🔑 Svar` linking to `exams/{exam}_medborgerskabsproeve_svar.pdf`. Both links open in a new tab with `rel="noopener"`.
  - `Øv denne prøve / Practise this exam`, linking to `quiz.html?exam={exam}`.
- **`quiz.html?exam=YYYY-MM`** runs that exam's 25 questions in their original order (`number` ascending), in normal feedback mode, with shuffled options. Add this parameter to quiz.js: it skips the setup screen.

---

## 6. Fixed UI text

Use the exact strings quoted in §4–§5. Every bilingual UI string is written `Dansk / English`. Render it as `bi("Dansk", "English")`, so the English part is hidden by the EN toggle. Single-language strings (`Hjem`, `Læs`, `Lær`, `Quiz`, `Prøver`, `Næste`, `Start quiz`, `⭐ Ofte stillet`) stay Danish only.

Page `<title>`s:
- `Medborgerskabsprøven – Hjem`
- `– Læs`
- `– Lær`
- `– Quiz`
- `– Prøver`

Set `<html lang="da">`. Every `.en` element gets `lang="en"`.

---

## 7. Design brief

- **Tone:** calm, readable and focused, like a well-made textbook, not a game. Use generous line height (1.6) and a base font size of 18 px on mobile and desktop.
- **Font:** `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Colour tokens** go on `:root`, with dark mode under `@media (prefers-color-scheme: dark)`:

  | token | light | dark |
  |---|---|---|
  | `--bg` | `#fbfaf8` | `#16181b` |
  | `--surface` | `#ffffff` | `#1f2226` |
  | `--text` | `#1d1f22` | `#eceae6` |
  | `--muted` | `#5f6368` | `#a4a7ab` |
  | `--border` | `#e3e1dc` | `#33373c` |
  | `--accent` (Dannebrog red) | `#c8102e` | `#ff5a6e` |
  | `--ok` | `#1e7a3c` | `#5cc98a` |
  | `--bad` | `#b3261e` | `#ff8a80` |
  | `--warn-bg` | `#fff6e0` | `#3a3020` |
  | `--info-bg` | `#eaf2fb` | `#1e2a38` |

- **Use the red accent sparingly:** only for the header underline (3 px), the countdown number, the ⭐ badge, and the primary button. Everything else is neutral.
- `.en` uses `font-size: .86em; color: var(--muted)`, with 2 px of space above.
- **Boxes:** `.fact` has a surface background and a left border in the accent. `.trap` uses `--warn-bg`. `.current` uses `--info-bg`. `.keyerror` uses `--warn-bg` with a `--bad` left border. `.mnemonic` uses a dashed border. All boxes have `border-radius: 10px` and `padding: 12px 14px`.
- **Option buttons:** full width, minimum height 48 px, left-aligned text, 1 px border. Hover and focus get the border colour `--text`. `.correct` gets a `--ok` border and a light green tint. `.wrong` gets a `--bad` border and a light red tint. Never use colour alone: also show the ✓/✗ glyph plus visually hidden text (`Rigtigt`/`Forkert`).
- **Focus:** `:focus-visible` gets `outline: 3px solid var(--accent); outline-offset: 2px`.
- **Motion:** only short colour transitions (150 ms), and they respect `prefers-reduced-motion`.
- **Tables:** zebra rows, a sticky header inside `.table-wrap`, and padding of 8 px.

**Accessibility:** use semantic headings in order (h1 page → h2 section → h3). Use `<button>` for actions and `<a>` for navigation. Give every form control a `<label>`. After a quiz answer, the explanation panel goes in an `aria-live="polite"` region. Text contrast must be ≥ 4.5:1, which the tokens above meet. Everything must be usable with the keyboard alone.

---

## 8. Acceptance checks (run all of them; fix until all pass)

Run a local server from the repo root with `python3 -m http.server 8000`, then open `http://localhost:8000/` in the browser tool.

1. Open each of the 5 pages. The console shows **no errors** (warnings about favicon are OK; add `<link rel="icon" href="data:,">` to avoid them).
2. **Data integrity in the browser:** on quiz.html, run the following in the console. It must print `true true true`:
   ```js
   const D = MBP.data;
   console.log(D.questions.length === 500,
     D.questions.every(q => q.options.some(o => o.key === q.correct[0])),
     new Set(D.clusters.flatMap(c => c.question_ids)).size === 500);
   ```
3. **All 500 reachable:** in the quiz setup, choose Alt + `Alle` and start. The header shows `Spørgsmål 1 / 500`. In the console, `new Set(<your quiz list>.map(q=>q.id)).size === 500` must be true. Expose the current list as `MBP.quiz.list` for this check.
4. **Answer correctness:** answer 10 quiz questions, choosing the option whose text equals the cluster's correct option each time. All 10 must be marked ✓ even though the options are shuffled. Check specifically `2016-12-q5` (Lillebælt), `2023-11-q23` (Nej) and `2020-06-q21` (Ja). You can reach them via `quiz.html?exam=2016-12`, `?exam=2023-11` and `?exam=2020-06`.
5. **2017-11-q23 note:** open `quiz.html?exam=2017-11` and go to question 23. Pick "Slesvig og Holsten": it is marked correct, and the key-error box from §4.5 (5) is visible. The study page, Historie section, also shows the note in the 1864 item's trap box and in the `current_facts` box.
6. **Changed facts are visible:** in study.html, the Kongehus section shows the 🔄 box that mentions Frederik 10. The MEP item (`ver-mep-antal`) shows 15. The abortion item shows 18 uger.
7. **Exam mode:** start it. There are exactly 25 questions from 25 different clusters, no feedback is shown while answering, and handing in shows Bestået/Ikke bestået using the 20/25 rule.
8. **Spaced repetition:** in learn.html, answer one question wrong on purpose. The same cluster comes back later in the same lesson with a different wording where one exists.
9. **EN toggle:** turn it off. No English text is visible on any page. Reload: it stays off.
10. **Storage off:** in the console run `Object.defineProperty(window,'localStorage',{get(){throw new Error('x')}})` then reload. The pages still render, which shows the `try/catch` works. (Or test in a private window.)
11. **Phone:** resize to 375×812. No page has horizontal scrolling (`document.documentElement.scrollWidth <= innerWidth`). Tables scroll inside `.table-wrap` only.
12. **Dark mode:** switch the colour scheme to dark. Text is readable, and the boxes are distinguishable.
13. **Exam links:** exams.html lists 20 exams. Spot-check 3 PDF links: they return 200 from the local server.
14. **Countdown:** index.html shows the correct number of days to 25 Nov 2026.

---

## 9. Publishing

Commit and push only after all checks pass.

`.gitignore`:
```
.DS_Store
*.swp
.idea/
.vscode/
node_modules/
```

`README.md`. Use this text exactly:
```markdown
# Medborgerskabsprøven – studieside

Study site for the Danish citizenship test (medborgerskabsprøven), built from all 20 official exams (Dec 2016 – Jun 2026, 500 questions).

- **Læs / Study** – facts per topic, most-asked first (⭐ = asked in 4+ exams), with overview tables of easily confused facts.
- **Lær / Learn** – short explanation cards, then practice with spaced repetition.
- **Quiz** – by topic, "most repeated only", or a real 25-question exam simulation (pass at 20/25).
- **Prøver / Exams** – the original PDFs and answer keys.

All text is Danish with an English translation underneath (toggle "EN"). Facts are checked per November 2026; see `data/VERIFICATION.md` for corrections to older exams (e.g. the misprinted 2017-11 key, Kong Frederik 10., 15 MEPs, 18-week abortion limit).

Plain HTML/CSS/JS, no build step. Run locally: `python3 -m http.server` and open http://localhost:8000.
```

Commands, run from the repo root:
```bash
git init -b main
git add -A
git commit -m "Medborgerskabsprøven study site

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
gh repo create m-Samhoury/medborgerskabsproven --public --source=. --remote=origin --push
gh api -X POST repos/m-Samhoury/medborgerskabsproven/pages -f "source[branch]=main" -f "source[path]=/"
```
- If the Pages call says it already exists, run `gh api -X PUT repos/m-Samhoury/medborgerskabsproven/pages -f "source[branch]=main" -f "source[path]=/"`.
- Then poll `gh api repos/m-Samhoury/medborgerskabsproven/pages --jq .status` until it shows `built`. That usually takes 1–2 minutes; check about every 30 s, no more than 10 times.
- Open `https://m-samhoury.github.io/medborgerskabsproven/` and repeat checks 1, 3 and 5 on the live site.
- Every later commit message ends with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

**Done** means all 14 checks pass locally, checks 1, 3 and 5 pass on the live URL, and you report that URL.

---

## 10. If something seems wrong in the data

Do **not** change it. Write it down in `BUILD_NOTES.md` with the question or cluster id and what looks wrong, and keep building. The orchestrator decides.
