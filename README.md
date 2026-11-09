# Mærket – studieside til medborgerskabsprøven

The site is called **Mærket** ("the stamp"): each topic is a stamp in a stamp album, and progress is the stamps you collect.

Study site for the Danish citizenship test (medborgerskabsprøven), built from all 20 official exams (Dec 2016 – Jun 2026, 500 questions).

- **Læs / Read** – facts per topic, most-asked first (⭐ = asked in 4+ exams), with overview tables of easily confused facts.
- **Øv / Practise** – short explanation cards, then practice with spaced repetition.
- **Test** – by topic, "most repeated only", or a real 25-question exam simulation (pass at 20/25).
- **Prøver / Past exams** – the original PDFs and answer keys.

All text is Danish with an English translation underneath (toggle "EN"). Facts are checked per November 2026; see `data/VERIFICATION.md` for corrections to older exams (e.g. the misprinted 2017-11 key, Kong Frederik 10., 15 MEPs, 18-week abortion limit).

Plain HTML/CSS/JS. No server is needed: double-click `index.html` or open it directly in a browser. The data is loaded from `data/bundle.js`, which is generated from the JSON files.

After editing any `data/*.json` file, regenerate the bundle:

```bash
python3 tools/build_data.py
```

To serve the site locally instead, run `python3 -m http.server` and open http://localhost:8000.
