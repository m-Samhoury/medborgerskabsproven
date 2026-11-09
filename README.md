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

- **Theme button** (the round icon in the header, next to EN): cycles **Auto → Lys (light) → Mørk (dark)**. Auto follows your device's light or dark setting. Your choice is remembered in this browser only.
- **EN toggle**: shows or hides the English line under each Danish text. The choice is remembered in this browser only.

## Progress and storage

Your progress is stored only in your browser, in `localStorage`. Nothing is sent to a server, and there are no accounts. The keys are:

- `mbp.v1.progress` – the spaced-repetition boxes and the stamp progress
- `mbp.v1.activity` – the daily activity and the latest results
- `mbp.v1.seenMastered` – which "mastered" stamps you have already seen
- `mbp.v1.showEnglish` – the EN toggle
- `mbp.v1.theme` – the theme button (missing = Auto)

Progress is per browser and per device. Clearing site data removes it. **Nulstil fremgang** (on I dag) resets progress, activity and mastered stamps. It keeps the EN and theme settings.

## Data

- **Exams**: 20 official exams, 2016-12 to 2026-06, with an answer key for each. The PDFs are in `exams/`. Sources and notes are in `exams/INDEX.md`.
- **500 questions** in `data/questions.json`
- **168 clusters** (groups of questions about the same fact) in `data/clusters.json`
- **10 topics** in `data/topics.json`
- **15 fact groups** (the overview tables) in `data/fact_groups.json`
- Checks and corrections: `data/VERIFICATION.md` and `data/TRANSCRIPTION_REPORT.md`

**Note on the November 2017 answer key:** the official key for question 23 (1864 territorial losses) is misprinted. It says B (Skåne, Halland og Blekinge). Those areas were lost in 1658. In 1864 Denmark lost Slesvig og Holsten, which is option C. The site uses C. Question 23 is flagged in the explanation after you answer it, and on the Prøver page for 2017-11.

## Run it

No server is needed. Open `index.html` directly in a browser. The data is read from `data/bundle.js`, so it also works from `file://`. Fonts are loaded from Google Fonts, so you need an internet connection for them.

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
js/data.js        Loads the data (from data/bundle.js; fetches the JSON only as a fallback)
js/store.js       Progress, EN and theme settings, all in localStorage
js/ui.js          Shared rendering and the header (EN and theme buttons)
js/icons.js       Inline SVG icons and topic illustrations
js/home.js        Page script: I dag
js/top15.js       Page script: the 15 most-asked questions
js/study.js       Page script: Læs
js/learn.js       Page script: Øv
js/quiz.js        Page script: Test
js/exams.js       Page script: Prøver
data/             Question, cluster, topic and fact-group data, plus the generated bundle.js
exams/            The 20 official exam PDFs and answer keys, with INDEX.md
tools/build_data.py  Builds data/bundle.js from data/*.json
PLAN.md           Original build plan
```
