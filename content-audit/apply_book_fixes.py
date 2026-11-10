#!/usr/bin/env python3
"""Step 3 of the content audit: correct data/*.json against the August 2026 book.

Reads content-audit/02-comparison-report.md (reference table) for the book references,
applies the text fixes listed below, and writes data/*.json back in their own format.
Run once from the repo root:  python3 content-audit/apply_book_fixes.py
then:                         python3 tools/build_data.py
Every change is listed in content-audit/03-changes.md.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
REPORT = ROOT / "content-audit" / "02-comparison-report.md"


def load(name):
    return json.loads((DATA / f"{name}.json").read_text(encoding="utf-8"))


def save(name, obj):
    (DATA / f"{name}.json").write_text(json.dumps(obj, ensure_ascii=False, indent=1), encoding="utf-8")


def parse_refs(text):
    """'63:24-56; 89:39-49' or '85:23-25, 85:55-59' -> [{"page": 63, "lines": "24-56"}, ...]."""
    out = []
    for part in re.split(r"[;,]", text):
        part = part.strip()
        m = re.fullmatch(r"(\d+):(\d+(?:-\d+)?)", part)
        if not m:
            continue
        ref = {"page": int(m.group(1)), "lines": m.group(2)}
        if ref not in out:
            out.append(ref)
    return out


def refs(*specs):
    out = []
    for s in specs:
        for r in parse_refs(s):
            if r not in out:
                out.append(r)
    return out


# ---------- Reference table from the report ----------
TABLE = {}
for line in REPORT.read_text(encoding="utf-8").splitlines():
    m = re.match(r"\| ([CIFGHQ]:[^|]+?) \| ([A-Z ()a-z]+?) \| [^|]* \| ([^|]*) \|$", line)
    if m:
        TABLE[m.group(1).strip()] = parse_refs(m.group(3))

# References the report gives in a form that needs a fix-up, or that I re-checked in bookdump/pages.
OVERRIDE = {
    "G:fg-hoejtider": refs("128:36-43; 129:10-11; 129:20-25; 129:36-42; 129:45-55; 129:58-66; 130:32-43"),
    "G:fg-aldre": refs("44:45-47; 55:52-55; 45:29-33; 45:18-21; 18:38; 19:9; 6:29-31"),
    "G:fg-tal": TABLE.get("G:fg-tal", []) + refs("22:58-59; 24:60-63"),
    "I:velfaerd:2": refs("41:63-64; 45:18-19; 44:45-47; 55:52-55; 45:29-33"),
    "I:arbejde:2": refs("24:57-63; 25:42-46; 28:60-63"),
    "I:uddannelse:1": refs("18:12-14; 18:38; 18:54-56; 19:9; 77:45-57"),
    "C:dem-anke": refs("69:29-40"),
    "C:arb-akasse-procent": refs("28:60-63; 24:60-63"),
    "C:geo-region-hovedstaden": refs("80:9-11; 80:22-23; 106:38-41"),
    "F:geografi:1": refs("106:36-41; 80:22-23"),
    "C:vel-oel-vin-16": refs("44:45-47; 55:52-55"),
}


def ref_for(item_id):
    if item_id in OVERRIDE:
        return OVERRIDE[item_id]
    return TABLE.get(item_id, [])


# ---------- Clusters ----------
CLUSTER_FIX = {
    # WRONG
    "vel-koerekort-17": {
        "fact_da": "Man kan få kørekort til almindelig bil, når man fylder 17 år. 17-årige må køre alene mellem kl. 5 og kl. 20. Fra kl. 20 til kl. 5 skal de have en ledsager over 24 år, der har haft kørekort i mindst fem år. Fra 18 år må man køre alene hele døgnet.",
        "fact_en": "You can get a driving licence for an ordinary car when you turn 17. 17-year-olds may drive alone between 5 am and 8 pm. From 8 pm to 5 am they must have an accompanying adult over 24 who has held a licence for at least five years. From 18 you may drive alone at any time.",
    },
    # OUTDATED
    "vel-oel-vin-16": {
        "fact_da": "Man skal være 16 år for at købe almindelig øl. Vin, spiritus og meget stærk øl (alkohol over 6 %) kræver 18 år – ligesom cigaretter.",
        "fact_en": "You must be 16 to buy ordinary beer. Wine, spirits and very strong beer (over 6% alcohol) require 18 – like cigarettes.",
        "answer_da": "16 år (prøvens svar i 2017) – i dag: almindelig øl 16 år, vin 18 år",
        "answer_en": "16 (the 2017 exam answer) – today: ordinary beer 16, wine 18",
        "trap_note_da": "Almindelig øl = 16. Vin, spiritus og stærk øl = 18. Cigaretter = 18. Kørekort = 17. Prøven fra 2017 spurgte om 'vin og øl' – dengang var svaret 16 år.",
        "trap_note_en": "Ordinary beer = 16. Wine, spirits and strong beer = 18. Cigarettes = 18. Driving licence = 17. The 2017 exam asked about 'wine and beer' – then the answer was 16.",
        "current_note_da": "Læremateriale 2026: 16 år gælder kun almindelig øl. Vin, spiritus og alt over 6 % alkohol kræver 18 år.",
        "current_note_en": "Book 2026: 16 applies only to ordinary beer. Wine, spirits and anything over 6% alcohol require 18.",
    },
    "dem-kvinder-folketing": {
        "fact_da": "Efter valget i 2026 er 48-49 % af Folketingets medlemmer kvinder (86 af 179). Prøverne sagde ca. 40 % (2018-2020) og ca. 45 % (2024).",
        "fact_en": "After the 2026 election 48–49% of the members of the Folketing are women (86 of 179). The exams said about 40% (2018–2020) and about 45% (2024).",
        "answer_da": "Ca. 40-45 % (prøvernes svar) – i dag 48-49 %",
        "answer_en": "About 40–45% (the exam answers) – today 48–49%",
        "trap_note_da": "Vælg det tal, der ligger tættest på 40-50 %. Ældre prøver: 'ca. 40 %'. Prøven 2024: 'cirka 45 procent'. I dag: 48-49 %.",
        "trap_note_en": "Pick the figure closest to 40–50%. Older exams: 'about 40%'. The 2024 exam: 'about 45 per cent'. Today: 48–49%.",
        "current_note_da": "Læremateriale 2026: 86 af 179 medlemmer (48 %) er kvinder, og efter valget i 2026 er 49 % af de valgte kvinder. Ingen af prøvens forkerte svar (20 %, 25 %, 35 %, 60 %) er tæt på.",
        "current_note_en": "Book 2026: 86 of 179 members (48%) are women, and after the 2026 election 49% of those elected are women. None of the exam's wrong answers (20%, 25%, 35%, 60%) is close.",
    },
    "dem-regering": {
        "answer_da": "Venstre (SVM-regeringen 2022–2026, prøvernes svar). I dag er Venstre ikke med. Konservative var IKKE med.",
        "answer_en": "Venstre (the SVM government 2022–2026, the exam answer). Venstre is not in it today. The Conservatives were NOT in it.",
    },
    "geo-indvandrere": {
        "fact_da": "Ca. 17 procent af befolkningen (ca. 1 million) er indvandrere eller efterkommere (læremateriale 2026).",
        "fact_en": "About 17 per cent of the population (about 1 million) are immigrants or descendants (book 2026).",
        "answer_da": "12-13 % (prøvens svar i 2018) – i dag ca. 17 %",
        "answer_en": "12–13% (the 2018 exam answer) – today about 17%",
        "trap_note_da": "Hvis valgmulighederne er 5-6 %, 12-13 % og 19-20 %, så vælg 12-13 % (det var svaret i 2018). Hvis der står ca. 17 %, så vælg det.",
        "trap_note_en": "If the options are 5–6%, 12–13% and 19–20%, choose 12–13% (the answer in 2018). If about 17% is offered, choose that.",
        "current_note_da": "Andelen er steget: i 2018 ca. 12-13 %, i dag ca. 17 % (læremateriale 2026).",
        "current_note_en": "The share has risen: about 12–13% in 2018, about 17% today (book 2026).",
    },
    "ver-tyskland-handel": {
        "fact_da": "USA er Danmarks største handelspartner samlet (14,1 % af samhandlen i 2025), Tyskland er nr. 2 (12,7 %). Tyskland er det land, Danmark importerer mest fra; USA er det land, Danmark eksporterer mest til.",
        "fact_en": "The USA is Denmark's largest trading partner overall (14.1% of trade in 2025), Germany is second (12.7%). Germany is the country Denmark imports most from; the USA is the country Denmark exports most to.",
        "answer_da": "Tyskland (prøvens svar 2026) – læremateriale 2026: USA samlet, Tyskland størst for import",
        "answer_en": "Germany (the 2026 exam answer) – book 2026: the USA overall, Germany largest for imports",
        "trap_note_da": "Står USA som mulighed, er USA rigtigt (samlet handel 2025). Prøven fra juni 2026 havde kun Kina, Tyskland og Storbritannien – dér er Tyskland rigtigt.",
        "trap_note_en": "If the USA is an option, the USA is right (total trade 2025). The June 2026 exam only had China, Germany and the UK – there Germany is right.",
        "current_note_da": "Læremateriale 2026: I 2025 var USA største handelspartner (14,1 %) foran Tyskland (12,7 %). Tyskland er stadig størst for import.",
        "current_note_en": "Book 2026: In 2025 the USA was the largest trading partner (14.1%) ahead of Germany (12.7%). Germany is still largest for imports.",
    },
    # DIFFERS
    "dem-anke": {
        "trap_note_da": "Byret → landsret. En sag, der er anket fra byretten til landsretten, kan som regel IKKE ankes videre til Højesteret. Kun sager, der starter i landsretten, kan som regel ankes til Højesteret.",
        "trap_note_en": "District Court → High Court. A case appealed from the District Court to the High Court can usually NOT be appealed further to the Supreme Court. Only cases that start in the High Court can usually be appealed to the Supreme Court.",
    },
    "his-1864": {
        "fact_da": "I 1864 mistede Danmark Slesvig og Holsten efter en krig mod Det Tyske Forbund.",
        "fact_en": "In 1864 Denmark lost Slesvig and Holsten (Schleswig and Holstein) after a war against the German Confederation.",
    },
    "his-tyrkiet": {
        "fact_da": "Fra 1960'erne blev der hentet arbejdskraft i udlandet (gæstearbejdere). De fleste kom fra Tyrkiet, ex-Jugoslavien eller Pakistan.",
        "fact_en": "From the 1960s labour was brought in from abroad (guest workers). Most came from Turkey, former Yugoslavia or Pakistan.",
    },
    "arb-tillidsrepraesentant": {
        "fact_da": "Tillidsrepræsentanten vælges af fagforeningens medlemmer blandt medarbejderne – på et møde (klubmøde), hvor arbejdsgiveren ikke er med.",
        "fact_en": "The union representative (tillidsrepræsentant) is elected by the union members among the employees – at a meeting (club meeting) without the employer.",
    },
    "arb-beskaeftigelse": {
        "fact_da": "Ca. 73 % af borgerne mellem 16 og 66 år har et lønmodtagerarbejde – altså ca. tre ud af fire.",
        "fact_en": "About 73% of residents aged 16 to 66 have a job as an employee – so about three out of four.",
        "current_note_da": "Læremateriale 2026 bruger aldersgruppen 16-66 år (ca. 73 %). Prøven spurgte om 15-64-årige – svaret er stadig 'cirka tre ud af fire'.",
        "current_note_en": "Book 2026 uses the age group 16–66 (about 73%). The exam asked about 15–64-year-olds – the answer is still 'about three out of four'.",
    },
    "udd-boernehave-vuggestue": {
        "fact_da": "Vuggestue er for børn fra ca. 6 måneder til ca. 3 år. Børnehave er for børn fra ca. 3 til 6 år.",
        "fact_en": "A nursery (vuggestue) is for children from about 6 months to about 3. A kindergarten (børnehave) is for children from about 3 to 6.",
    },
    "udd-skolestart": {
        "fact_da": "Børn starter i børnehaveklassen (0. klasse), når de er omkring 6 år. Prøvens svar er '5-6 år'.",
        "fact_en": "Children start the reception class (year 0) when they are about 6. The exam answer is '5–6 years'.",
    },
    "udd-boern-passes": {
        "fact_da": "De fleste børn mellem 3 og 5 år bliver passet uden for hjemmet.",
        "fact_en": "Most children aged 3 to 5 are looked after outside the home.",
        "current_note_da": "Læremateriale 2026 siger 'de fleste'. Prøven fra 2019 havde svaret 'Næsten alle' – det er facit dér.",
        "current_note_en": "Book 2026 says 'most'. The 2019 exam had the answer 'Almost all' – that is the key there.",
    },
    # NOT IN BOOK (soften)
    "arb-akasse-procent": {
        "fact_da": "Prøvens svar: ca. 70 % af lønmodtagerne er medlem af en a-kasse. Læremateriale 2026 siger kun, at de fleste er medlem af en a-kasse – og at 68 % er medlem af en fagforening.",
        "fact_en": "The exam answer: about 70% of employees are members of an a-kasse. Book 2026 only says that most are members of an a-kasse – and that 68% are members of a trade union.",
    },
    "geo-region-hovedstaden": {
        "fact_da": "Region Hovedstaden er den største region. Prøven i 2018 sagde ca. 1,7 millioner indbyggere; i dag er det ca. 1,9 millioner.",
        "fact_en": "The Capital Region is the largest region. The 2018 exam said about 1.7 million inhabitants; today it is about 1.9 million.",
    },
    "vel-faedreorlov": {
        "fact_da": "Fædre har ret til orlov: barnets far har også ret til at gå på barsel. (Prøven fra 2017: 2 uger lige efter fødslen. Siden 2022 har hver forælder 11 øremærkede uger.)",
        "fact_en": "Fathers have the right to leave: the child's father also has the right to parental leave. (The 2017 exam: 2 weeks just after the birth. Since 2022 each parent has 11 earmarked weeks.)",
    },
}

# NOT IN BOOK: a short note shown as "Ikke i læremateriale 2026".
CLUSTER_NOBOOK = {
    "dem-stoerste-parti-2022": (
        "Læremateriale 2026 nævner kun valget i 2026 (Socialdemokratiet fik flest stemmer), ikke valget i 2022.",
        "Book 2026 only mentions the 2026 election (the Social Democrats got the most votes), not the 2022 election."),
    "geo-region-hovedstaden": (
        "Indbyggertallet står ikke i læremateriale 2026. Bogen siger, at ca. 2 millioner bor i hovedstadsområdet, og at Region Hovedstaden og Region Sjælland lægges sammen til Region Østdanmark den 1. januar 2027.",
        "The population figure is not in book 2026. The book says about 2 million live in the capital area, and that the Capital Region and Region Zealand merge into Region Østdanmark on 1 January 2027."),
    "arb-akasse-procent": (
        "Tallet 70 % står ikke i læremateriale 2026. Forveksl det ikke med de 68 %, der er medlem af en fagforening.",
        "The 70% figure is not in book 2026. Do not confuse it with the 68% who are members of a trade union."),
    "vel-faedreorlov": (
        "'2 uger' og '11 øremærkede uger' står ikke i læremateriale 2026. Bogen siger kun, at barnets far også har ret til at gå på barsel.",
        "'2 weeks' and '11 earmarked weeks' are not in book 2026. The book only says that the child's father also has the right to parental leave."),
}

# ---------- Topic intro paragraphs (1-based) ----------
INTRO_FIX = {
    ("demokrati", 3): {
        "old": "En dom fra byretten kan ankes til landsretten og derefter til Højesteret.",
        "new": "En dom fra byretten kan normalt ankes til landsretten. En sag, der er anket til landsretten, kan som regel ikke ankes videre til Højesteret – kun sager, der starter i landsretten, kan som regel ankes til Højesteret.",
        "old_en": "A ruling from the District Court can be appealed to the High Court and then to the Supreme Court.",
        "new_en": "A ruling from the District Court can normally be appealed to the High Court. A case appealed to the High Court can usually not be appealed further to the Supreme Court – only cases that start in the High Court can usually be appealed to the Supreme Court.",
    },
    ("arbejde", 2): {
        "old": "skal man være medlem af en a-kasse – ca. 70 % af lønmodtagerne er med.",
        "new": "skal man være medlem af en a-kasse – det er de fleste (prøverne sagde ca. 70 %). Ca. 68 % af lønmodtagerne er medlem af en fagforening.",
        "old_en": "you must be a member of an a-kasse – about 70% of employees are.",
        "new_en": "you must be a member of an a-kasse – most are (the exams said about 70%). About 68% of employees are members of a trade union.",
        "nobook": ("Tallet 70 % for a-kasse står ikke i læremateriale 2026.", "The 70% figure for a-kasse is not in book 2026."),
    },
    ("arbejde", 3): {
        "old": "Ca. 3 ud af 4 mellem 15 og 64 år har et arbejde.",
        "new": "Ca. 73 % af de 16-66-årige har et lønmodtagerarbejde (ca. 3 ud af 4).",
        "old_en": "About 3 out of 4 people aged 15 to 64 have a job.",
        "new_en": "About 73% of 16–66-year-olds have a job as an employee (about 3 out of 4).",
    },
    ("velfaerd", 2): {
        "old": "Man skal være 18 år for at købe cigaretter og 16 år for at købe øl og vin. Man kan få kørekort fra 17 år.",
        "new": "Man skal være 18 år for at købe cigaretter, vin, spiritus og stærk øl (over 6 %), men kun 16 år for at købe almindelig øl. Man kan få kørekort fra 17 år: 17-årige må køre alene kl. 5-20, men skal have en ledsager kl. 20-5.",
        "old_en": "You must be 18 to buy cigarettes and 16 to buy beer and wine. You can get a driving licence from 17.",
        "new_en": "You must be 18 to buy cigarettes, wine, spirits and strong beer (over 6%), but only 16 to buy ordinary beer. You can get a driving licence from 17: 17-year-olds may drive alone 5 am–8 pm, but need an accompanying adult 8 pm–5 am.",
    },
    ("uddannelse", 1): {
        "old": "vuggestue (0-3 år) og derefter i børnehave (3-6 år). Næsten alle børn mellem 3 og 5 år",
        "new": "vuggestue (fra ca. 6 måneder til ca. 3 år) og derefter i børnehave (ca. 3-6 år). De fleste børn mellem 3 og 5 år",
        "old_en": "a nursery (0–3) and then to kindergarten (3–6). Almost all children aged 3 to 5",
        "new_en": "a nursery (from about 6 months to about 3) and then to kindergarten (about 3–6). Most children aged 3 to 5",
    },
    ("uddannelse", 2): {
        "old": "Børn begynder i 0. klasse, når de er 5-6 år.",
        "new": "Børn begynder i børnehaveklassen (0. klasse), når de er omkring 6 år (prøvens svar: 5-6 år).",
        "old_en": "Children start year 0 at 5–6.",
        "new_en": "Children start the reception class (year 0) at about 6 (the exam answer: 5–6).",
    },
    ("verden", 1): {
        "old": "Danmark handler mest med Tyskland.",
        "new": "USA er Danmarks største handelspartner samlet (14,1 % i 2025) foran Tyskland (12,7 %). Danmark importerer mest fra Tyskland og eksporterer mest til USA.",
        "old_en": "Denmark trades most with Germany.",
        "new_en": "The USA is Denmark's largest trading partner overall (14.1% in 2025) ahead of Germany (12.7%). Denmark imports most from Germany and exports most to the USA.",
    },
}

# ---------- Current-fact notes (1-based) ----------
NOTE_FIX = {
    ("demokrati", 2): {
        "da": "Kvinder i Folketinget: ca. 40 % i 2018-2020 og ca. 45 % efter valget i 2022 (prøvernes svar). Læremateriale 2026: 48-49 % efter valget i 2026 (86 af 179).",
        "en": "Women in the Folketing: about 40% in 2018–2020 and about 45% after the 2022 election (the exam answers). Book 2026: 48–49% after the 2026 election (86 of 179).",
    },
    ("geografi", 1): {
        "da": "Region Hovedstaden: prøven i 2018 sagde ca. 1,7 millioner – i dag ca. 1,9 millioner. Region Hovedstaden og Region Sjælland lægges sammen til Region Østdanmark den 1. januar 2027. Indvandrere og efterkommere: prøven i 2018 sagde 12-13 % – i dag ca. 17 % (læremateriale 2026).",
        "en": "Capital Region: the 2018 exam said about 1.7 million – today about 1.9 million. The Capital Region and Region Zealand merge into Region Østdanmark on 1 January 2027. Immigrants and descendants: the 2018 exam said 12–13% – today about 17% (book 2026).",
        "nobook": ("Indbyggertallet 1,9 millioner står ikke i læremateriale 2026 (bogen: ca. 2 millioner i hovedstadsområdet).",
                   "The 1.9 million figure is not in book 2026 (the book: about 2 million in the capital area)."),
    },
    ("velfaerd", 1): {
        "nobook": ("'11 øremærkede uger' og '2 uger omkring fødslen' står ikke i læremateriale 2026. Bogen siger kun, at barnets far også har ret til at gå på barsel.",
                   "'11 earmarked weeks' and '2 weeks around the birth' are not in book 2026. The book only says that the child's father also has the right to parental leave."),
    },
    ("traditioner", 1): {
        "nobook": ("Store Bededag nævnes ikke i læremateriale 2026.", "Store Bededag is not mentioned in book 2026."),
    },
}

# ---------- Fact groups: (group, first cell) -> new cells ----------
ROW_FIX = {
    ("fg-aldre", "0-3 år"): (["Ca. 6 mdr.-3 år", "Vuggestue (eller dagpleje)"], ["About 6 months–3", "Nursery (or childminder)"]),
    ("fg-aldre", "5-6 år"): (["Ca. 6 år", "Skolestart (børnehaveklassen; prøven: 5-6 år)"], ["About 6", "Start school (reception class; the exam: 5–6)"]),
    ("fg-aldre", "16 år"): (["16 år", "Købe almindelig øl"], ["16", "Buy ordinary beer"]),
    ("fg-aldre", "17 år"): (["17 år", "Kørekort til bil (ledsager kun kl. 20-5 indtil 18 år)"], ["17", "Driving licence for a car (accompanying adult only 8 pm–5 am until 18)"]),
    ("fg-aldre", "18 år"): (["18 år", "Myndig, gift, SU, stemmeret, cigaretter, vin, spiritus og stærk øl"], ["18", "Legal adult, marriage, SU, right to vote, cigarettes, wine, spirits and strong beer"]),
    ("fg-magt", "Domstolene"): (["Domstolene", "Byret → landsret (anke). Kun sager, der starter i landsretten, kan normalt ankes til Højesteret"], ["The courts", "District Court → High Court (appeal). Only cases that start in the High Court can normally be appealed to the Supreme Court"]),
    ("fg-tal", "ca. 70 %"): (["68 %", "Lønmodtagere i en fagforening (prøven spurgte om a-kasse: ca. 70 %)"], ["68%", "Employees in a trade union (the exam asked about a-kasse: about 70%)"]),
    ("fg-tal", "3 ud af 4"): (["ca. 73 %", "16-66-årige med lønmodtagerarbejde (ca. 3 ud af 4)"], ["about 73%", "16–66-year-olds with a job as an employee (about 3 out of 4)"]),
    ("fg-boernepasning", "Dagpleje (i et privat hjem)"): (["Dagpleje (i et privat hjem)", "Ca. 6 mdr.-3 år"], ["Childminder (in a private home)", "About 6 months–3"]),
    ("fg-boernepasning", "Vuggestue"): (["Vuggestue", "Ca. 6 mdr.-3 år (fx 2 år)"], ["Nursery", "About 6 months–3 (e.g. age 2)"]),
    ("fg-boernepasning", "0. klasse (skolestart)"): (["0. klasse (skolestart)", "Omkring 6 år (prøven: 5-6 år)"], ["Year 0 (start of school)", "About 6 (the exam: 5–6)"]),
    ("fg-hoejtider", "Kristi himmelfart"): (["Kristi himmelfart", "En torsdag, 40. dag efter påske", "Kristen helligdag (ikke i læremateriale 2026)"], ["Ascension Day", "A Thursday, the 40th day after Easter", "Christian holy day (not in book 2026)"]),
    ("fg-hoejtider", "Store Bededag"): (["Store Bededag", "–", "Afskaffet som helligdag fra 2024 (ikke i læremateriale 2026)"], ["Store Bededag", "–", "Abolished as a public holiday from 2024 (not in book 2026)"]),
}
MNEMONIC_FIX = {
    "fg-aldre": ("Næsten alt er 18 – også vin og spiritus. Undtagelser: almindelig øl 16, kørekort 17.",
                 "Almost everything is 18 – wine and spirits too. Exceptions: ordinary beer 16, driving licence 17."),
    "fg-magt": ("Love laves af Folketinget og regeringen – domstolene dømmer. Anke: byret → landsret, som regel ikke videre til Højesteret.",
                "Laws are made by the Folketing and the government – the courts judge. Appeal: District Court → High Court, usually not on to the Supreme Court."),
    "fg-boernepasning": ("Vugge = baby (vuggestue, ca. ½-3 år). Børnehave = 3-6. Skole fra ca. 6. Karakterer og efterskole fra 8. klasse.",
                         "Vugge = cradle (nursery, about ½–3). Kindergarten = 3–6. School from about 6. Grades and efterskole from year 8."),
}
GROUP_NOBOOK = {
    "fg-hoejtider": ("Kristi himmelfart og Store Bededag står ikke i læremateriale 2026.",
                     "Ascension Day and Store Bededag are not in book 2026."),
}

# ---------- Questions: a note under the answer key (the key itself is never changed) ----------
def qnote(da, en):
    return {"da": da, "en": en}

WOMEN = qnote("Bogen (aug. 2026) siger nu: 48-49 % af Folketingets medlemmer er kvinder (86 af 179 efter valget i 2026). Prøvens facit var rigtigt, da prøven blev holdt.",
              "The book (Aug 2026) now says: 48–49% of the members of the Folketing are women (86 of 179 after the 2026 election). The exam key was right when the exam was held.")
REGERING = qnote("Bogen (aug. 2026) siger nu: Siden 3. juni 2026 består regeringen af Socialdemokratiet, SF, Moderaterne og Radikale Venstre. Venstre er ikke længere med. Facit 'Venstre' var rigtigt, da prøven blev holdt (SVM-regeringen 2022-2026).",
                 "The book (Aug 2026) now says: Since 3 June 2026 the government has been the Social Democrats, SF, the Moderates and the Social Liberals. Venstre is no longer in it. The key 'Venstre' was right when the exam was held (the SVM government 2022–2026).")
NYTAAR = qnote("Bogen (aug. 2026) siger nu: Kongen holder nytårstale den 31. december (Frederik 10. har været konge siden 2024). Facit 'Dronningen' var rigtigt, da prøven blev holdt.",
               "The book (Aug 2026) now says: The King gives the New Year's speech on 31 December (Frederik 10. has been king since 2024). The key 'the Queen' was right when the exam was held.")
ROLLE = qnote("Bogen (aug. 2026) siger nu: Kong Frederik 10. underskriver landets love sammen med ministrene. Spørgsmålet siger 'dronningen', fordi Margrethe 2. var regent dengang.",
              "The book (Aug 2026) now says: King Frederik 10. signs the laws together with the ministers. The question says 'the Queen' because Margrethe 2. was on the throne then.")
INDV = qnote("Bogen (aug. 2026) siger nu: ca. 17 % (ca. 1 million) er indvandrere eller efterkommere. Facit 12-13 % var rigtigt i 2018.",
             "The book (Aug 2026) now says: about 17% (about 1 million) are immigrants or descendants. The key 12–13% was right in 2018.")
VIN = qnote("Bogen (aug. 2026) siger nu: 16 år for almindelig øl, men 18 år for vin, spiritus og stærk øl (over 6 %). Facit '16 år' var rigtigt i 2017.",
            "The book (Aug 2026) now says: 16 for ordinary beer, but 18 for wine, spirits and strong beer (over 6%). The key '16' was right in 2017.")
MEP = qnote("Bogen (aug. 2026) siger nu: Danmark vælger 15 medlemmer til Europa-Parlamentet. Facit 13 var rigtigt, da prøven blev holdt.",
            "The book (Aug 2026) now says: Denmark elects 15 members of the European Parliament. The key 13 was right when the exam was held.")
HANDEL = qnote("Bogen (aug. 2026) siger nu: USA er Danmarks største handelspartner samlet (14,1 % i 2025), Tyskland nr. 2 (12,7 %). USA er ikke en svarmulighed her, så Tyskland er stadig det rigtige valg.",
               "The book (Aug 2026) now says: the USA is Denmark's largest trading partner overall (14.1% in 2025), Germany second (12.7%). The USA is not an option here, so Germany is still the right choice.")
ARBEJDE = qnote("Bogen (aug. 2026) siger: ca. 73 % af de 16-66-årige har et lønmodtagerarbejde – altså stadig ca. tre ud af fire.",
                "The book (Aug 2026) says: about 73% of 16–66-year-olds have a job as an employee – so still about three out of four.")
SKOLE = qnote("Bogen (aug. 2026) siger: børnene starter i børnehaveklassen, når de er omkring seks år. Facit '5-6 år' er stadig det bedste svar her.",
              "The book (Aug 2026) says: children start the reception class when they are about six. The key '5–6' is still the best answer here.")
PASSES = qnote("Bogen (aug. 2026) siger: 'De fleste' børn mellem tre og fem år passes uden for hjemmet. Prøvens facit er 'Næsten alle'.",
               "The book (Aug 2026) says: 'most' children aged three to five are looked after outside the home. The exam key is 'Almost all'.")
VALG2022 = qnote("Læremateriale 2026 nævner ikke valget i 2022 – kun valget i 2026, hvor Socialdemokratiet også fik flest stemmer.",
                 "Book 2026 does not mention the 2022 election – only the 2026 election, where the Social Democrats also got the most votes.")
REGION = qnote("Indbyggertallet for Region Hovedstaden står ikke i læremateriale 2026. Bogen siger, at ca. 2 millioner bor i hovedstadsområdet.",
               "The Capital Region's population is not in book 2026. The book says about 2 million live in the capital area.")
AKASSE = qnote("Tallet står ikke i læremateriale 2026. Bogen siger kun, at de fleste er medlem af en a-kasse, og at 68 % er medlem af en fagforening.",
               "The figure is not in book 2026. The book only says that most are members of an a-kasse, and that 68% are members of a trade union.")
ORLOV = qnote("'2 uger' står ikke i læremateriale 2026. Bogen siger kun, at barnets far også har ret til at gå på barsel.",
              "'2 weeks' is not in book 2026. The book only says that the child's father also has the right to parental leave.")

QUESTION_NOTE = {
    "2018-11-q12": ("outdated", WOMEN), "2020-11-q10": ("outdated", WOMEN), "2024-05-q20": ("outdated", WOMEN),
    "2024-11-q8": ("outdated", REGERING),
    "2018-06-q7": ("outdated", NYTAAR), "2020-06-q22": ("outdated", NYTAAR), "2021-11-q4": ("outdated", NYTAAR), "2022-11-q4": ("outdated", NYTAAR),
    "2018-11-q9": ("outdated", ROLLE), "2020-11-q19": ("outdated", ROLLE), "2022-06-q18": ("outdated", ROLLE),
    "2018-11-q1": ("outdated", INDV),
    "2017-06-q14": ("outdated", VIN),
    "2017-06-q20": ("outdated", MEP), "2017-11-q6": ("outdated", MEP), "2018-11-q5": ("outdated", MEP),
    "2026-06-q18": ("outdated", HANDEL),
    "2025-11-q3": ("differs", ARBEJDE),
    "2018-11-q20": ("differs", SKOLE), "2021-06-q18": ("differs", SKOLE),
    "2019-11-q13": ("differs", PASSES),
    "2023-11-q7": ("nobook", VALG2022), "2025-05-q19": ("nobook", VALG2022),
    "2018-11-q2": ("nobook", REGION),
    "2017-11-q11": ("nobook", AKASSE), "2018-11-q19": ("nobook", AKASSE),
    "2017-11-q19": ("nobook", ORLOV),
}


def main():
    clusters = load("clusters")
    topics = load("topics")
    groups = load("fact_groups")
    questions = load("questions")

    # Clusters: text fixes, NOT IN BOOK notes, book references.
    seen = set()
    for c in clusters:
        fix = CLUSTER_FIX.get(c["id"])
        if fix:
            for k, v in fix.items():
                assert k in c, (c["id"], k)
                c[k] = v
            seen.add(c["id"])
        nb = CLUSTER_NOBOOK.get(c["id"])
        if nb:
            c["nobook_note_da"], c["nobook_note_en"] = nb
        c["book"] = ref_for("C:" + c["id"])
    assert seen == set(CLUSTER_FIX), set(CLUSTER_FIX) - seen

    # Topics: intro paragraphs and current-fact notes.
    done = set()
    for t in topics:
        for i, p in enumerate(t["intro"], 1):
            fix = INTRO_FIX.get((t["id"], i))
            if fix:
                assert fix["old"] in p["da"], (t["id"], i)
                assert fix["old_en"] in p["en"], (t["id"], i, "en")
                p["da"] = p["da"].replace(fix["old"], fix["new"])
                p["en"] = p["en"].replace(fix["old_en"], fix["new_en"])
                if "nobook" in fix:
                    p["nobook_da"], p["nobook_en"] = fix["nobook"]
                done.add(("I", t["id"], i))
            p["book"] = ref_for("I:%s:%d" % (t["id"], i))
        for i, f in enumerate(t["current_facts"], 1):
            fix = NOTE_FIX.get((t["id"], i))
            if fix:
                if "da" in fix:
                    f["da"], f["en"] = fix["da"], fix["en"]
                if "nobook" in fix:
                    f["nobook_da"], f["nobook_en"] = fix["nobook"]
                done.add(("F", t["id"], i))
            f["book"] = ref_for("F:%s:%d" % (t["id"], i))
    assert len(done) == len(INTRO_FIX) + len(NOTE_FIX), done

    # Fact groups.
    hit = set()
    for g in groups:
        for r in g["rows"]:
            fix = ROW_FIX.get((g["id"], r["cells_da"][0]))
            if fix:
                r["cells_da"], r["cells_en"] = list(fix[0]), list(fix[1])
                hit.add((g["id"], fix[0][0]))
        if g["id"] in MNEMONIC_FIX:
            g["mnemonic_da"], g["mnemonic_en"] = MNEMONIC_FIX[g["id"]]
        if g["id"] in GROUP_NOBOOK:
            g["nobook_da"], g["nobook_en"] = GROUP_NOBOOK[g["id"]]
        g["book"] = ref_for("G:" + g["id"])
    assert len(hit) == len(ROW_FIX), set(k for k in ROW_FIX) - hit

    # Questions: a note only. Options and the answer key stay as published.
    qids = set()
    for q in questions:
        n = QUESTION_NOTE.get(q["id"])
        if n:
            q["book_status"] = n[0]
            q["book_note_da"], q["book_note_en"] = n[1]["da"], n[1]["en"]
            qids.add(q["id"])
    assert qids == set(QUESTION_NOTE), set(QUESTION_NOTE) - qids

    save("clusters", clusters)
    save("topics", topics)
    save("fact_groups", groups)
    save("questions", questions)

    missing = [c["id"] for c in clusters if not c["book"]]
    print("clusters without a reference:", missing)
    print("intro paragraphs without a reference:",
          [(t["id"], i) for t in topics for i, p in enumerate(t["intro"], 1) if not p["book"]])


if __name__ == "__main__":
    main()
