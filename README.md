# Mærket – studieside til medborgerskabsprøven

**🌐 Open the study site: [m-samhoury.github.io/medborgerskabsproven](https://m-samhoury.github.io/medborgerskabsproven/)**

**Mærket** ("the stamp") is a study site for the Danish citizenship test (medborgerskabsprøven). Each topic is a stamp in a stamp album, and your progress is the stamps you collect.

The content is built from all 20 official exams, December 2016 to June 2026. All text is Danish, with an English line under it.

## Sections

The nav has five sections, in this order:

- **I dag / Today** – the countdown to the exam (25 Nov 2026) and today's stamps, then two buttons: **Lær / Learn** (choose a topic) and **Test** (choose a topic or all), and a link to the 15 most-asked questions.
- **Læs / Read** – the facts topic by topic, most-asked first (⭐ = asked in 4+ exams), with overview tables of easily confused facts.
- **Øv / Practise** – short explanation cards, then practice with spaced repetition (Leitner boxes).
- **Test** – a quiz by topic, "most-asked only", or a real 25-question exam simulation (pass at 20/25). Your latest results are shown at the bottom of the page.
- **Prøver / Past exams** – the 20 original exams and their answer keys as PDFs, with your best score for each.

## Display options

- **Theme button** (the round icon in the header, next to EN): switches between **Lys (light)** and **Mørk (dark)**. On your first visit it starts from your device's light or dark setting, without saving it. Your first click saves your choice, and it is remembered in this browser only.
- **EN toggle**: shows or hides the English line under each Danish text. The choice is remembered in this browser only.

## Progress and storage

Your progress is stored in your browser, in `localStorage`. There are no accounts. If you turn on **sync between devices** (on I dag), the same progress is also saved in the site owner's S3 bucket, under a random sync code. Nothing else leaves the browser, and the theme and EN settings are never synced. The keys are:

- `mbp.v1.progress` – the spaced-repetition boxes and the stamp progress
- `mbp.v1.activity` – the daily activity and the latest results
- `mbp.v1.seenMastered` – which "mastered" stamps you have already seen
- `mbp.v1.resetAt` – when progress was last reset (used by sync)
- `mbp.v1.syncCode` – the sync code on this device, if sync is on
- `mbp.v1.syncLast` – when this device last synced
- `mbp.v1.showEnglish` – the EN toggle
- `mbp.v1.theme` – the theme button: `light` or `dark` (missing = the device's setting at first visit)

You can share a sync code as text or as a QR code. A phone camera opens the QR code as a link to the site, which offers to restore the progress there. Sync lives in a **share/scan button** in the header, next to the theme button, on every page. It opens a popup with two tabs: **Del** shows this device's code and QR code, and **Scan** opens the camera (the back camera on a phone, the webcam on a laptop) to read another device's QR code, or takes a typed code.

Progress is per browser and per device unless sync is on. Clearing site data removes it from this device; with sync on, the copy in the bucket stays. **Nulstil fremgang** (on I dag) resets progress, activity and mastered stamps, on every synced device. It keeps the EN and theme settings. How the sync server is set up is in [sync/README.md](sync/README.md).

## Data

- **Exams**: 20 official exams, 2016-12 to 2026-06, with an answer key for each. The PDFs are in `exams/`. Sources and notes are in `exams/INDEX.md`.
- **500 questions** in `data/questions.json`
- **168 clusters** (groups of questions about the same fact) in `data/clusters.json`
- **10 topics** in `data/topics.json`
- **15 fact groups** (the overview tables) in `data/fact_groups.json`
- Checks and corrections: `data/VERIFICATION.md` and `data/TRANSCRIPTION_REPORT.md`

**Note on the November 2017 answer key:** the official key for question 23 (1864 territorial losses) is misprinted. It says B (Skåne, Halland og Blekinge). Those areas were lost in 1658. In 1864 Denmark lost Slesvig og Holsten, which is option C. The site uses C. Question 23 is flagged in the explanation after you answer it, and on the Prøver page for 2017-11.

## Run it

No server is needed. Open `index.html` directly in a browser. The data is read from `data/bundle-core.js` (and `data/bundle-book.js` on the pages that show book material), so it also works from `file://`. Fonts are loaded from Google Fonts, so you need an internet connection for them.

To serve it locally instead:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Update the content

Edit the files in `data/*.json`, then regenerate the bundle the site reads:

```bash
python3 tools/build_data.py
```

Editing the JSON files alone does nothing until the bundle is rebuilt.

## Project structure

```
index.html        I dag (today)
top15.html        The 15 most-asked questions (from I dag)
study.html        Læs (read)
learn.html        Øv (practise)
quiz.html         Test
exams.html        Prøver (past exams)
css/style.css     All styles. Colour tokens are at the top, with the light and dark values.
js/data.js        Loads the data (from data/bundle-core.js and data/bundle-book.js; fetches the JSON only as a fallback)
js/store.js       Progress, EN and theme settings, all in localStorage
js/sync.js        Sync between devices (off while SYNC_URL is empty; see sync/README.md)
sync/             The sync server: AWS Lambda code (sync/lambda) and the owner's setup steps (sync/README.md)
js/ui.js          Shared rendering and the header (EN and theme buttons)
js/syncui.js     The share/scan button and popup in the header (on every page)
js/icons.js       Inline SVG icons and topic illustrations
js/home.js        Page script: I dag
js/top15.js       Page script: the 15 most-asked questions
js/study.js       Page script: Læs
js/learn.js       Page script: Øv
js/quiz.js        Page script: Test
js/exams.js       Page script: Prøver
data/             Question, cluster, topic and fact-group data, plus the generated bundle-core.js and bundle-book.js
exams/            The 20 official exam PDFs and answer keys, with INDEX.md
tools/build_data.py  Builds data/bundle-core.js and data/bundle-book.js from data/*.json
PLAN.md           Original build plan
```
