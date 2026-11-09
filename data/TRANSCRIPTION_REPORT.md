# Transcription report: medborgerskabsprøven 2016-12 to 2026-06

Output: `data/questions.json`, 500 questions (20 exams × 25). Each question has `id`, `exam`, `number`, `section`, `question_da`, `options` (keys A–C, Danish text), `correct`, `image_note`, `answer_source`, `uncertain`, `notes`.

## Summary

- Every exam has 25 questions, numbered 1–25 with no gaps or duplicates.
- Every question has exactly one `correct` letter, and that letter is one of its option keys.
- 137 questions have 2 options and 363 have 3.
- All 500 answer keys match an independent parse of the answer-key PDFs (`pdftotext -layout`, one row per question number).
- 8 answer keys were also checked by eye on the rendered PNG (2016-12, 2017-06, 2017-11, 2018-11, 2022-06, 2024-11, 2025-11, 2026-06). They all match the transcription. The other 12 keys were checked only through the text layer, which is clean row by row.
- All question and option texts were checked against the PDF text layer (whitespace-normalised). Mismatches were fixed in the source, for example curly apostrophes in "1990’erne" and "FN’s" (2022-06, 2023-11, 2024-05, 2025-05, 2025-11, 2026-06). One question had a question mark that the PDF does not print (2023-11 Q25); it was removed to match the PDF.
- Spot checks on the rendered exam pages: one random question page per exam, about 4–5 questions each, compared with the transcription. All matched. For the 8 exams where the random page was the instruction page, a second page was checked (2019-11, 2020-11, 2021-06, 2023-05, 2023-11, 2024-05, 2025-11, 2026-06). All matched.
- The Danish text was copied as printed, including æ, ø and å. There is no translation.

## Format of each exam

| Exam | Questions | 2-option | 3-option | Uncertain items |
|---|---|---|---|---|
| 2016-12 | 25 | 7 | 18 | 0 |
| 2017-06 | 25 | 10 | 15 | 0 |
| 2017-11 | 25 | 6 | 19 | 1 (Q23, key) |
| 2018-06 | 25 | 6 | 19 | 0 |
| 2018-11 | 25 | 4 | 21 | 1 (Q8, printed option label) |
| 2019-06 | 25 | 3 | 22 | 0 |
| 2019-11 | 25 | 7 | 18 | 0 |
| 2020-06 | 25 | 8 | 17 | 0 |
| 2020-11 | 25 | 7 | 18 | 0 |
| 2021-06 | 25 | 12 | 13 | 0 |
| 2021-11 | 25 | 6 | 19 | 0 |
| 2022-06 | 25 | 8 | 17 | 0 |
| 2022-11 | 25 | 9 | 16 | 0 |
| 2023-05 | 25 | 7 | 18 | 0 |
| 2023-11 | 25 | 7 | 18 | 0 |
| 2024-05 | 25 | 3 | 22 | 0 |
| 2024-11 | 25 | 7 | 18 | 2 (Q3 printed label, Q8 key) |
| 2025-05 | 25 | 7 | 18 | 0 |
| 2025-11 | 25 | 6 | 19 | 1 (Q2, key not verified) |
| 2026-06 | 25 | 7 | 18 | 0 |

**Sections:** none of the 20 exams has a section heading. Some exams from 2017-06 onwards print the title "Spørgsmål til Medborgerskabsprøven" above the instructions, and 2025-11 and 2026-06 print "Vejledning". Neither is a section over a group of questions, so `section` is `""` everywhere. The example heading "Spørgsmål om aktuelle emner" does not occur in any of the 20 PDFs.

**Images:** the exam PDFs contain only the Styrelsen logo, placed on page 1 (2025-05, 2025-11, 2026-06 each carry one small image). No question refers to a picture, so `image_note` is `null` for all 500 questions. I did not find any map, flag or photo questions.

**Format changes:**
- 2016-12 to 2025-05: text-layer options are written "A: …", and the answer key is a plain table in the PDF.
- 2025-11 and 2026-06: the exam text uses ☐/☒ checkbox glyphs. Options keep the same labels, but the glyphs are not part of the option text and are not included in `text_da`. The key is in the same table format as earlier exams.
- Some questions wrap over two lines in the PDF (e.g. 2016-12 Q21, 2018-06 Q9). In `question_da` the line break is replaced by a single space.
- Options are printed without the trailing period in some exams (e.g. "Ja", "Nej") and with it in others ("Ja."). Each was copied exactly as printed.

## Uncertain items (`uncertain: true`)

1. **2017-11 Q23** ("Hvilke områder mistede Danmark i 1864?"). Key says **B: Skåne, Halland og Blekinge**. Historically, Denmark lost Slesvig and Holsten in 1864 (option C). Skåne, Halland and Blekinge were ceded in 1658. The transcription follows the key, `correct: ["B"]`. Please check this against the PDF before the site goes live. The 2020-06 Q20 and 2021-11 Q22 keys for the same kind of question say C (Slesvig), which supports the historical answer.
2. **2018-11 Q8** ("Hvad hedder Danmarks forfatning?"). The PDF prints the option labels A, B, B: "A: Grundloven / B: Danske Lov / B: Kongeloven". The third option is recorded as C. The answer A (Grundloven) is unaffected.
3. **2024-11 Q3** ("Hvor gammel skal man være for at blive gift i Danmark?"). The PDF prints "A: Mindst 16 år / B: Mindst 18 år / B: Mindst 20 år". Recorded as B / C. Key reads "B – Mindst 18 år", so `correct: ["B"]`.
4. **2024-11 Q8** ("Hvilket af følgende partier har været med i regeringen siden 2022?"). Key says **B: Venstre**. My understanding is that Venstre was in opposition after the 2022 election, and the government since then was Socialdemokratiet, Moderaterne and Radikale Venstre. None of the three options is clearly a government party since 2022. I kept the key's answer, but this item needs checking against the PDF and the official answer sheet.
5. **2025-11 Q2** ("Hvor gammel skal man mindst være for at få kørekort til almindelig bil?"). Key says **A: 17 år**. My understanding is that the minimum age for a car licence (category B) is 18, with learner lessons possible from 17. I did not verify this against Færdselsstyrelsen. The key is followed as written.

## Notable answers I did not change

- 2024-05 Q20 (share of women in Folketinget) has key C "Cirka 45 procent". I did not verify the figure, so no item was flagged.
- 2019-11 Q13 (share of 3–5-year-olds in daycare) has key A "Næsten alle". Plausible, not verified.

## What was not checked

- I could not verify facts against external sources. The keys were taken as printed, except where an answer conflicts with what I know, and those cases are listed above.
- The 12 answer keys listed above as checked only through the text layer were not viewed as images. The row-by-row layout parse is clean for all of them.
- The exam questions were compared with the PDF text layer and the rendered PNG for the spot-check pages, not every question was compared with the PNG.
