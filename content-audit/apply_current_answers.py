#!/usr/bin/env python3
"""Switch past-exam questions whose official answer is outdated to the current answer (læremateriale 2026).

Questions: the current answer is marked correct, with no note. The original key, options and
question text are kept in original_* fields, and `changed` holds the book reference and the reason.
Learning content (clusters, topic notes, fact groups): the current answer is the fact, and a
change_note says what the exam's answer was.

Run once from the repo root, then python3 tools/build_data.py. It checks the old text first,
so it refuses to run twice.
"""
import copy
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"

MEP = [{"page": 83, "lines": "61-62"}, {"page": 100, "lines": "20-21"}]
NYTAAR = [{"page": 65, "lines": "39-41"}, {"page": 130, "lines": "38-41"}]
ROLLE = [{"page": 65, "lines": "22-26"}]
KVINDER = [{"page": 59, "lines": "45-46"}, {"page": 83, "lines": "14-20"}]
REGERING = [{"page": 75, "lines": "25-27"}, {"page": 75, "lines": "36-45"}]
INDV = [{"page": 106, "lines": "36-37"}]
HANDEL = [{"page": 32, "lines": "53-61"}]
ALKOHOL = [{"page": 44, "lines": "45-47"}, {"page": 55, "lines": "52-55"}]


def opts(*rows):
    return [{"key": k, "text_da": da, "text_en": en} for k, da, en in rows]


# id -> (expected old options [(key, text_da)], new options, new correct key, book, reason, question override)
Q = {}

Q["2017-06-q14"] = (
    [("A", "16 år."), ("B", "18 år."), ("C", "20 år.")], None, "B", ALKOHOL,
    "Wine now requires 18 (16 only for ordinary beer); the 2017 key said 16.", None)

for qid, dot in (("2017-06-q20", "."), ("2017-11-q6", ""), ("2018-11-q5", "")):
    Q[qid] = (
        [("A", "13" + dot), ("B", "23" + dot), ("C", "33" + dot)],
        opts(("A", "13" + dot, "13"), ("B", "15" + dot, "15"), ("C", "23" + dot, "23")), "B", MEP,
        "Denmark elects 15 MEPs (since 2024); the key said 13. 15 was not an option, so it replaces 33.", None)

for qid in ("2018-06-q7", "2020-06-q22", "2021-11-q4", "2022-11-q4"):
    Q[qid] = (
        [("A", "Dronningen"), ("B", "Statsministeren")],
        opts(("A", "Dronningen", "The Queen"), ("B", "Kongen", "The King")), "B", NYTAAR,
        "The King (Frederik 10.) gives the 31 December speech; the key said the Queen. 'Kongen' was not an "
        "option, so it replaces the only distractor (the old key stays as the wrong option).", None)

ROLE_Q = ("Hvilken rolle har kongen blandt andet?", "Which role does the King have, among other things?")
for qid, first in (("2018-11-q9", ("Hun repræsenterer den danske regering i EU", "Han repræsenterer den danske regering i EU", "He represents the Danish government in the EU")),
                   ("2020-11-q19", ("Hun udpeger Folketingets formand", "Han udpeger Folketingets formand", "He appoints the Speaker of the Folketing")),
                   ("2022-06-q18", ("Hun repræsenterer den danske regering i EU", "Han repræsenterer den danske regering i EU", "He represents the Danish government in the EU"))):
    Q[qid] = (
        [("A", first[0]), ("B", "Hun underskriver nye love sammen med en minister"),
         ("C", "Hun holder åbningstalen ved Folketingets åbning i oktober")],
        opts(("A", first[1], first[2]),
             ("B", "Han underskriver nye love sammen med en minister", "He signs new laws together with a minister"),
             ("C", "Han holder åbningstalen ved Folketingets åbning i oktober",
              "He gives the opening speech when the Folketing opens in October")),
        "B", ROLLE,
        "The monarch is now a king (Frederik 10.), not the Queen; the question and options are rewritten "
        "for the King. The key (signs laws with a minister) is unchanged.", ROLE_Q)

for qid in ("2018-11-q12", "2020-11-q10"):
    Q[qid] = (
        [("A", "Ca. 20 %"), ("B", "Ca. 40 %"), ("C", "Ca. 60 %")],
        opts(("A", "Ca. 40 %", "About 40%"), ("B", "Ca. 50 %", "About 50%"), ("C", "Ca. 60 %", "About 60%")), "B", KVINDER,
        "48-49 % of the Folketing are women after the 2026 election; the key said about 40 %. "
        "'About 50 %' replaces 20 %.", None)
Q["2024-05-q20"] = (
    [("A", "Cirka 25 procent"), ("B", "Cirka 35 procent"), ("C", "Cirka 45 procent")],
    opts(("A", "Cirka 35 procent", "About 35 per cent"), ("B", "Cirka 45 procent", "About 45 per cent"),
         ("C", "Cirka 50 procent", "About 50 per cent")), "C", KVINDER,
    "48-49 % of the Folketing are women after the 2026 election; the key said about 45 %. "
    "'About 50 %' replaces 25 %.", None)

Q["2024-11-q8"] = (
    [("A", "Dansk Folkeparti"), ("B", "Venstre"), ("C", "Det Konservative Folkeparti")],
    opts(("A", "Socialdemokratiet", "The Social Democrats (Socialdemokratiet)"),
         ("B", "Venstre", "Venstre (the Liberal Party)"),
         ("C", "Det Konservative Folkeparti", "The Conservative People's Party")), "A", REGERING,
    "Since 3 June 2026 the government is S, SF, M and RV; Venstre (the key) left. Socialdemokratiet has "
    "been in government throughout and replaces Dansk Folkeparti.", None)

Q["2018-11-q1"] = (
    [("A", "5-6 %"), ("B", "12-13 %"), ("C", "19-20 %")],
    opts(("A", "12-13 %", "12–13%"), ("B", "16-17 %", "16–17%"), ("C", "19-20 %", "19–20%")), "B", INDV,
    "About 17 % are immigrants or descendants; the key said 12-13 %. '16-17 %' replaces 5-6 %.", None)

Q["2026-06-q18"] = (
    [("A", "Kina"), ("B", "Tyskland"), ("C", "Storbritannien")],
    opts(("A", "USA", "USA"), ("B", "Tyskland", "Germany"), ("C", "Storbritannien", "Great Britain")), "A", HANDEL,
    "The USA was Denmark's largest trading partner in 2025 (14.1 %, Germany 12.7 %); the key said Germany. "
    "USA replaces China (4.8 %, the smallest of the three in the book).", None)


# ---------- clusters: current answer as the fact, plus a change note ----------

C = {
    "vel-oel-vin-16": dict(
        answer_da="18 år (kun almindelig øl: 16 år)", answer_en="18 (ordinary beer only: 16)",
        variants=[("18 år", "18 years")],
        trap_note_da="Almindelig øl = 16. Vin, spiritus og stærk øl (over 6 %) = 18. Cigaretter = 18. Kørekort = 17. Spørger man om 'vin og øl', er svaret 18 år.",
        trap_note_en="Ordinary beer = 16. Wine, spirits and strong beer (over 6%) = 18. Cigarettes = 18. Driving licence = 17. If the question asks about 'wine and beer', the answer is 18.",
        change_note_da="Ændret: På prøven i juni 2017 var svaret 16 år. Ifølge læremateriale 2026 er det nu 18 år for vin (16 år gælder kun almindelig øl).",
        change_note_en="Changed: in the June 2017 exam the answer was 16. According to the 2026 book it is now 18 for wine (16 applies only to ordinary beer)."),
    "ver-mep-antal": dict(
        answer_da="15", answer_en="15",
        variants=[("15", "15"), ("15", "15")],
        trap_note_da="Forveksl ikke med Folketingets 179 medlemmer. Europa-Parlamentet har i alt 720 medlemmer, og 15 af dem er valgt i Danmark.",
        trap_note_en="Do not confuse this with the 179 members of the Folketing. The European Parliament has 720 members in all, and 15 of them are elected in Denmark.",
        change_note_da="Ændret: På prøverne i juni 2017, november 2017 og november 2018 var svaret 13. Ifølge læremateriale 2026 er det nu 15.",
        change_note_en="Changed: in the June 2017, November 2017 and November 2018 exams the answer was 13. According to the 2026 book it is now 15."),
    "kon-nytaarstale": dict(
        answer_da="Kongen", answer_en="The King",
        variants=[("Kongen", "The King")],
        trap_note_da="31. december = kongen. 1. januar = statsministeren.",
        trap_note_en="31 December = the King. 1 January = the prime minister.",
        change_note_da="Ændret: På prøverne i juni 2018, juni 2020, november 2021 og november 2022 var svaret Dronningen. Ifølge læremateriale 2026 er det nu Kongen (Frederik 10. har været konge siden 2024).",
        change_note_en="Changed: in the June 2018, June 2020, November 2021 and November 2022 exams the answer was the Queen. According to the 2026 book it is now the King (Frederik 10 has been king since 2024)."),
    "kon-rolle": dict(
        variants=[("Han underskriver nye love sammen med en minister", "He signs new laws together with a minister")],
        variant_questions=[ROLE_Q],
        change_note_da="Ændret: På prøverne i november 2018, november 2020 og juni 2022 spurgte man om dronningen, og svaret var 'Hun underskriver nye love sammen med en minister'. Ifølge læremateriale 2026 er det nu kongen (Frederik 10.), der underskriver landets love sammen med ministrene.",
        change_note_en="Changed: the November 2018, November 2020 and June 2022 exams asked about the Queen, and the answer was 'She signs new laws together with a minister'. According to the 2026 book it is now the King (Frederik 10) who signs the laws together with the ministers."),
    "dem-kvinder-folketing": dict(
        fact_da="Efter valget i 2026 er 48-49 % af Folketingets medlemmer kvinder (86 af 179) – altså ca. halvdelen.",
        fact_en="After the 2026 election, 48–49% of the members of the Folketing are women (86 of 179) – about half.",
        answer_da="Ca. 50 % (48-49 %)", answer_en="About 50% (48–49%)",
        variants=[("Ca. 50 %", "About 50%"), ("Ca. 50 %", "About 50%"), ("Cirka 50 procent", "About 50 per cent")],
        trap_note_da="Vælg det tal, der ligger tættest på 48-49 % – altså ca. 50 %.",
        trap_note_en="Choose the figure closest to 48–49% – that is, about 50%.",
        change_note_da="Ændret: På prøverne i november 2018 og november 2020 var svaret ca. 40 %, og på prøven i maj 2024 ca. 45 %. Ifølge læremateriale 2026 er det nu 48-49 % (86 af 179 efter valget i 2026).",
        change_note_en="Changed: in the November 2018 and November 2020 exams the answer was about 40%, and in the May 2024 exam about 45%. According to the 2026 book it is now 48–49% (86 of 179 after the 2026 election)."),
    "dem-regering": dict(
        answer_da="Socialdemokratiet (og Moderaterne). Venstre og Konservative er ikke med.",
        answer_en="The Social Democrats (and the Moderates). Venstre and the Conservatives are not in it.",
        variants=[("Socialdemokratiet", "The Social Democrats (Socialdemokratiet)"), ("Nej", "No")],
        trap_note_da="Regeringen er Socialdemokratiet, SF, Moderaterne og Radikale Venstre. Venstre, Konservative og Dansk Folkeparti er IKKE med.",
        trap_note_en="The government is the Social Democrats, SF, the Moderates and the Social Liberals. Venstre, the Conservatives and the Danish People's Party are NOT in it.",
        change_note_da="Ændret: På prøven i november 2024 var svaret Venstre (SVM-regeringen 2022-2026). Ifølge læremateriale 2026 består regeringen nu af Socialdemokratiet, SF, Moderaterne og Radikale Venstre – Venstre er ikke længere med.",
        change_note_en="Changed: in the November 2024 exam the answer was Venstre (the SVM government 2022–2026). According to the 2026 book the government now consists of the Social Democrats, SF, the Moderates and the Social Liberals – Venstre is no longer in it."),
    "geo-indvandrere": dict(
        answer_da="Ca. 17 % (ca. 1 million)", answer_en="About 17% (about 1 million)",
        variants=[("16-17 %", "16–17%")],
        trap_note_da="Ca. 1 million af ca. 6 millioner indbyggere – altså ca. 17 %.",
        trap_note_en="About 1 million of about 6 million inhabitants – that is, about 17%.",
        change_note_da="Ændret: På prøven i november 2018 var svaret 12-13 %. Ifølge læremateriale 2026 er det nu ca. 17 % (ca. 1 million).",
        change_note_en="Changed: in the November 2018 exam the answer was 12–13%. According to the 2026 book it is now about 17% (about 1 million)."),
    "ver-tyskland-handel": dict(
        answer_da="USA (Tyskland er nr. 2 og størst for import)", answer_en="The USA (Germany is second, and the largest for imports)",
        variants=[("USA", "USA")],
        trap_note_da="Samlet handel (import og eksport): USA. Import: Tyskland. Eksport: USA.",
        trap_note_en="Total trade (imports and exports): the USA. Imports: Germany. Exports: the USA.",
        change_note_da="Ændret: På prøven i juni 2026 var svaret Tyskland. Ifølge læremateriale 2026 er det nu USA (14,1 % af samhandlen i 2025, Tyskland 12,7 %).",
        change_note_en="Changed: in the June 2026 exam the answer was Germany. According to the 2026 book it is now the USA (14.1% of trade in 2025, Germany 12.7%)."),
}

# ---------- topic "changed since the exam" notes ----------

TOPIC_CF = {
    ("demokrati", 0): (
        "Per 2026: Der var folketingsvalg 24. marts 2026. Socialdemokratiet blev igen største parti.",
        "Ændret: På prøven i november 2024 var svaret Venstre (SVM-regeringen 2022-2026). Ifølge læremateriale 2026 er regeringen nu Socialdemokratiet, SF, Moderaterne og Radikale Venstre (siden 3. juni 2026) – Venstre er ikke længere med. Ved folketingsvalget 24. marts 2026 blev Socialdemokratiet igen største parti.",
        "Changed: in the November 2024 exam the answer was Venstre (the SVM government 2022–2026). According to the 2026 book the government is now the Social Democrats, SF, the Moderates and the Social Liberals (since 3 June 2026) – Venstre is no longer in it. At the general election on 24 March 2026 the Social Democrats were again the largest party."),
    ("demokrati", 1): (
        "Kvinder i Folketinget: ca. 40 %",
        "Ændret: Kvinder i Folketinget – på prøverne i november 2018 og november 2020 var svaret ca. 40 %, og i maj 2024 ca. 45 %. Ifølge læremateriale 2026 er det nu 48-49 % (86 af 179).",
        "Changed: women in the Folketing – in the November 2018 and November 2020 exams the answer was about 40%, and in May 2024 about 45%. According to the 2026 book it is now 48–49% (86 of 179)."),
    ("kongehus", 0): (
        "Prøver fra 2018-2022 siger 'Dronningen'",
        "Ændret: På prøverne fra 2018-2022 var svaret 'Dronningen' (Margrethe 2.). Ifølge læremateriale 2026 er det nu Kongen (Frederik 10.), der holder nytårstale den 31. december og underskriver lovene sammen med ministrene.",
        "Changed: in the 2018–2022 exams the answer was 'the Queen' (Margrethe II). According to the 2026 book it is now the King (Frederik 10) who gives the New Year's speech on 31 December and signs the laws together with the ministers."),
    ("geografi", 0): (
        "Region Hovedstaden: prøven i 2018 sagde ca. 1,7 millioner",
        "Ændret: Indvandrere og efterkommere – på prøven i november 2018 var svaret 12-13 %. Ifølge læremateriale 2026 er det nu ca. 17 %. Region Hovedstaden: prøven i 2018 sagde ca. 1,7 millioner – i dag ca. 1,9 millioner. Region Hovedstaden og Region Sjælland lægges sammen til Region Østdanmark den 1. januar 2027.",
        "Changed: immigrants and descendants – in the November 2018 exam the answer was 12–13%. According to the 2026 book it is now about 17%. Capital Region: the 2018 exam said about 1.7 million – today about 1.9 million. The Capital Region and Region Zealand merge into Region East Denmark on 1 January 2027."),
    ("verden", 0): (
        "Europa-Parlamentet: Danmark har 15 medlemmer",
        "Ændret: Europa-Parlamentet – på prøverne fra 2017-2018 var svaret 13. Ifølge læremateriale 2026 er det nu 15.",
        "Changed: European Parliament – in the 2017–2018 exams the answer was 13. According to the 2026 book it is now 15."),
}

NEW_CF = {
    "verden": {
        "da": "Ændret: Samhandel – på prøven i juni 2026 var svaret Tyskland. Ifølge læremateriale 2026 er det nu USA (14,1 % af samhandlen i 2025, Tyskland 12,7 %).",
        "en": "Changed: trade – in the June 2026 exam the answer was Germany. According to the 2026 book it is now the USA (14.1% of trade in 2025, Germany 12.7%).",
        "book": HANDEL},
    "velfaerd": {
        "da": "Ændret: Vin og øl – på prøven i juni 2017 var svaret 16 år. Ifølge læremateriale 2026 er det nu 18 år for vin (16 år gælder kun almindelig øl).",
        "en": "Changed: wine and beer – in the June 2017 exam the answer was 16. According to the 2026 book it is now 18 for wine (16 applies only to ordinary beer).",
        "book": ALKOHOL},
}

FG_ROW = ("fg-tal", "Danske medlemmer af Europa-Parlamentet (per 2026; gamle prøver: 13)",
          "Danske medlemmer af Europa-Parlamentet (ændret: prøverne 2017-2018 sagde 13)",
          "Danish members of the European Parliament (changed: the 2017–2018 exams said 13)")


def load(name):
    return json.loads((DATA / f"{name}.json").read_text(encoding="utf-8"))


def save(name, obj):
    (DATA / f"{name}.json").write_text(json.dumps(obj, ensure_ascii=False, indent=1), encoding="utf-8")


def main():
    questions = load("questions")
    clusters = load("clusters")
    topics = load("topics")
    groups = load("fact_groups")

    done = set()
    for q in questions:
        spec = Q.get(q["id"])
        if not spec:
            continue
        old, new, key, book, reason, qtext = spec
        have = [(o["key"], o["text_da"]) for o in q["options"]]
        if have != old or "changed" in q:
            raise SystemExit(f"{q['id']}: options are not the expected old ones: {have}")
        q["original_correct"] = q["correct"]
        q["original_options"] = copy.deepcopy(q["options"])
        if new:
            q["options"] = new
        if qtext:
            q["original_question_da"], q["original_question_en"] = q["question_da"], q["question_en"]
            q["question_da"], q["question_en"] = qtext
        q["correct"] = [key]
        q["changed"] = {"book": book, "reason": reason}
        for f in ("book_note_da", "book_note_en", "book_status"):
            q.pop(f, None)
        done.add(q["id"])
    missing = set(Q) - done
    if missing:
        raise SystemExit(f"questions not found: {sorted(missing)}")

    by_id = {c["id"]: c for c in clusters}
    for cid, spec in C.items():
        c = by_id[cid]
        for f in ("fact_da", "fact_en", "answer_da", "answer_en", "trap_note_da", "trap_note_en"):
            if f in spec:
                c[f] = spec[f]
        if len(spec["variants"]) != len(c["variants"]):
            raise SystemExit(f"{cid}: {len(c['variants'])} variants")
        for v, (da, en) in zip(c["variants"], spec["variants"]):
            v["answer_da"], v["answer_en"] = da, en
        for v, (qda, qen) in zip(c["variants"], spec.get("variant_questions", [])):
            v["question_da"], v["question_en"] = qda, qen
        c.pop("current_note_da", None)
        c.pop("current_note_en", None)
        c["change_note_da"] = spec["change_note_da"]
        c["change_note_en"] = spec["change_note_en"]

    t_by_id = {t["id"]: t for t in topics}
    for (tid, i), (prefix, da, en) in TOPIC_CF.items():
        cf = t_by_id[tid]["current_facts"][i]
        if not cf["da"].startswith(prefix):
            raise SystemExit(f"{tid} current_facts[{i}] is not the expected old text")
        cf["da"], cf["en"] = da, en
    for tid, cf in NEW_CF.items():
        t_by_id[tid]["current_facts"].append(cf)

    gid, old_da, new_da, new_en = FG_ROW
    g = next(g for g in groups if g["id"] == gid)
    row = next(r for r in g["rows"] if r["cells_da"][1] == old_da)
    row["cells_da"][1], row["cells_en"][1] = new_da, new_en

    for name, obj in (("questions", questions), ("clusters", clusters), ("topics", topics), ("fact_groups", groups)):
        save(name, obj)
    print(f"{len(done)} questions changed, {len(C)} clusters, {len(TOPIC_CF) + len(NEW_CF)} topic notes, 1 fact-group row")


if __name__ == "__main__":
    main()
