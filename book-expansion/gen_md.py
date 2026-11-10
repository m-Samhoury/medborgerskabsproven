#!/usr/bin/env python3
"""Write 01-content-plan.md from spec.py, 01-content-plan.json and data/*.json."""
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from spec import S  # noqa: E402

DATA = HERE.parent / "data"
plan = json.loads((HERE / "01-content-plan.json").read_text(encoding="utf-8"))
clusters = json.loads((DATA / "clusters.json").read_text(encoding="utf-8"))
topics = json.loads((DATA / "topics.json").read_text(encoding="utf-8"))
groups = json.loads((DATA / "fact_groups.json").read_text(encoding="utf-8"))
questions = json.loads((DATA / "questions.json").read_text(encoding="utf-8"))
cby = {c["id"]: c for c in clusters}
gby = {g["id"]: g for g in groups}
why = {}
for e in S:
    why.setdefault(e["target"], []).append(e["why"])


def topic_of(key):
    if key in cby:
        return cby[key]["topic_id"]
    if key in gby:
        return gby[key]["topic_ids"][0]
    return key


def refs(rs):
    return ", ".join(f"s. {r['page']} l. {r['lines']}" for r in rs) or "–"


def items(key):
    out = []
    for x, w in zip(plan[key], why[key]):
        out.append(f"- **{x['title_da']}** — s. {x['page']}, l. {x['lines']} ({len(x['excerpt_da'].split())} ord). "
                   f"*Hvorfor:* {w}")
        out.append(f"  > {x['excerpt_da']}")
    return out


counts = {}
for k, v in plan.items():
    t = topic_of(k)
    c = counts.setdefault(t, {"cluster": 0, "group": 0, "topic": 0})
    c["cluster" if k in cby else "group" if k in gby else "topic"] += len(v)
total = sum(len(v) for v in plan.values())

md = []
A = md.append
A("# Mere fra bogen – indholdsplan (trin 1 af 3)")
A("")
A("Kilde: *Læremateriale til medborgerskabsprøven*, august 2026 (`bookdump/`, uændret). "
  "Sidetal = PDF-side = trykt side. Linjer = fysiske linjer i `bookdump/pages/page-NNN.txt` "
  "(samme konvention som de eksisterende `book`-referencer).")
A("")
A("Denne fil er en **indholdsplan**. Den beslutter, *hvilke* ekstra bogafsnit der skal vises, og *hvor*. "
  "Den maskinlæsbare version er `01-content-plan.json`. Alle uddrag er bevist ordrette med "
  "`check_excerpts.py` (resultat: `check-result.txt`).")
A("")
A("## 0. Tal")
A("")
A(f"- **{total} uddrag** fordelt på **{len(plan)} mål**: "
  f"{sum(len(v) for k, v in plan.items() if k in cby)} på clusters, "
  f"{sum(len(v) for k, v in plan.items() if k in gby)} på faktagrupper, "
  f"{sum(len(v) for k, v in plan.items() if k not in cby and k not in gby)} på emne-niveau («Mere fra bogen» nederst på emnet).")
A(f"- Clusters med mindst ét uddrag: {sum(1 for c in clusters if c['id'] in plan)} af {len(clusters)}.")
A(f"- **Spørgsmål med udvidelse efter svar** (via `cluster_id`): "
  f"{sum(1 for q in questions if q['cluster_id'] in plan)} af {len(questions)}. Se afsnit 5.2.")
A(f"- Faktagrupper med uddrag: {sum(1 for g in groups if g['id'] in plan)} af {len(groups)}. Emner med emne-niveau-uddrag: "
  f"{sum(1 for t in topics if t['id'] in plan)} af {len(topics)}.")
A("- Længde: alle uddrag er højst 150 ord (de fleste 20–80).")
A("")
A("| Emne | på clusters | på grupper | emne-niveau | i alt |")
A("|---|---:|---:|---:|---:|")
for t in topics:
    c = counts.get(t["id"], {"cluster": 0, "group": 0, "topic": 0})
    A(f"| {t['title_da']} (`{t['id']}`) | {c['cluster']} | {c['group']} | {c['topic']} | {sum(c.values())} |")
A(f"| **I alt** | {sum(c['cluster'] for c in counts.values())} | {sum(c['group'] for c in counts.values())} | "
  f"{sum(c['topic'] for c in counts.values())} | **{total}** |")
A("")
A("En faktagruppe tælles under sit første emne (`topic_ids[0]`).")
A("")

A("## 1. Bogens opbygning og koblingen til sitets 10 emner")
A("")
A("Bogen har en indledning (s. 3–4), **26 fakta-ark** og en **ordliste** (s. 147–155). Hvert fakta-ark har en "
  "titelside, en kort indledning, en punktliste «Dette fakta-ark handler om» og derefter afsnit med VERSALER-overskrifter. "
  "Ord med `*` er forklaret i ordlisten. Margenen har «FAKTA-ARK n:» og arkets titel, og der er fotos med billedtekster.")
A("")
A("| Fakta-ark | Sider | Sitets emne(r) |")
A("|---|---|---|")
for row in [
    ("1 Skole", "5–10", "uddannelse"),
    ("2 Uddannelse", "11–16", "uddannelse"),
    ("3 Dagtilbud", "17–20", "uddannelse"),
    ("4 Det danske arbejdsmarked", "21–29", "arbejde"),
    ("5 Dansk erhvervsliv", "30–33", "arbejde (samhandel → verden)"),
    ("6 Det danske velfærdssamfund", "34–39", "velfaerd (skat/moms → demokrati)"),
    ("7 Familieliv", "40–45", "velfaerd (aldersgrænser også uddannelse)"),
    ("8 Forenings- og fritidsliv", "46–51", "demokrati (foreninger), velfaerd (biblioteker), kultur (Grundtvig)"),
    ("9 Sundhed og sygdom", "52–56", "velfaerd"),
    ("10 Ligestilling", "57–60", "arbejde (ligeløn), demokrati (stemmeret), historie (første kvindelige SM)"),
    ("11 Demokrati og grundloven", "61–66", "demokrati, kongehus (monarkiet)"),
    ("12 Det danske retssamfund", "67–70", "demokrati"),
    ("13 Folketing og regering", "71–75", "demokrati"),
    ("14 Det lokale selvstyre", "76–80", "demokrati (også uddannelse/velfaerd via ansvar)"),
    ("15 Folkestyret i praksis – valg og partier", "81–87", "demokrati, verden (EP-valg)"),
    ("16 Borgernes rettigheder og pligter", "88–91", "demokrati, verden (værnepligt)"),
    ("17 Religion og kirke", "92–95", "traditioner, historie (reformationen)"),
    ("18 Danmark og omverdenen", "96–103", "verden"),
    ("19 Danmarks geografi og befolkning", "104–106", "geografi, kongehus (rigsfællesskab)"),
    ("20 Danmarks historie før 1945", "107–114", "historie"),
    ("21 Danmarks historie efter 1945", "115–121", "historie, verden (NATO), velfaerd (levetid)"),
    ("22 Dansk kultur", "122–126", "kultur"),
    ("23 Traditioner og mærkedage", "127–131", "traditioner, kongehus (nytårstale)"),
    ("24 Danmarks forsvars- og sikkerhedspolitik", "132–137", "verden, kongehus (Thule/Grønland)"),
    ("25 Diskrimination, antisemitisme, hadforbrydelser og ekstremisme", "138–141", "historie (terror 2015), demokrati (emne-niveau)"),
    ("26 Klima", "142–146", "arbejde (vindenergi), geografi (landbrug), verden (emne-niveau)"),
    ("Ordliste", "147–155", "korte ordforklaringer som ekstra uddrag (fx «anke», «forfatning», «besættelse»)"),
]:
    A(f"| {row[0]} | {row[1]} | {row[2]} |")
A("")
A("Omvendt: **demokrati** = ark 11–16 (+25); **kongehus** = ark 11 (monarki), 19 (rigsfællesskab), 23 (nytår), 24 (Grønland); "
  "**historie** = ark 20–21 (+10, 17, 25); **geografi** = ark 19 (+26); **arbejde** = ark 4–5 (+10, 26); "
  "**velfaerd** = ark 6–9 (+10, 21); **uddannelse** = ark 1–3 (+7); **kultur** = ark 22 (+8); "
  "**traditioner** = ark 17, 23; **verden** = ark 18, 24 (+5, 15, 16, 21, 26).")
A("")

A("## 2. Udvidelser pr. emne, cluster og faktagruppe")
A("")
A("Princip: et uddrag skal give **noget nyt** i forhold til «Læs mere i bogen»-uddraget, som faktaet allerede viser "
  "(kontekst, årsag/følge, nabofakta, en typisk distraktor eller den aktuelle 2026-status). Intet uddrag ligger inden i "
  "faktaets egen «læs mere»-reference (tjekket af scriptet). Samme uddrag må gå igen på flere clusters, når de handler "
  "om det samme (fx de tre besættelses-clusters).")
A("")
A("Formatet nedenfor: **Overskrift (title_da)** — side, linjer (antal ord). *Hvorfor* (til planlæggeren, vises ikke). "
  "Derefter uddraget ordret.")
A("")
for t in topics:
    A(f"### {t['order']}. {t['title_da']} (`{t['id']}`)")
    A("")
    for cid in t["cluster_ids"]:
        c = cby[cid]
        A(f"#### `{cid}` – {c['fact_da']}")
        A(f"Stillet {c['times_asked']}×. Viser allerede (læs mere): {refs(c.get('book', []))}.")
        A("")
        if cid in plan:
            md.extend(items(cid))
        else:
            A("- **Ingen udvidelse.** «Læs mere»-uddraget dækker allerede hele bogens tekst om emnet (se afsnit 4).")
        A("")
    gids = [g for g in t["fact_group_ids"] if gby[g]["topic_ids"][0] == t["id"]]
    for gid in gids:
        g = gby[gid]
        A(f"#### Faktagruppe `{gid}` – {g['title_da']}")
        A(f"Viser allerede (læs mere): {refs(g.get('book', []))}.")
        A("")
        if gid in plan:
            md.extend(items(gid))
        else:
            A("- Ingen ekstra – clusterne i gruppen har deres egne udvidelser.")
        A("")

A("## 3. Bogstof uden en cluster: «Mere fra bogen» på emne-niveau")
A("")
A("Prøverelevant stof, som ingen cluster dækker. Det vises som én blok nederst på hvert emne i Læs (se afsnit 5).")
A("")
for t in topics:
    A(f"### {t['title_da']} (`{t['id']}`)")
    A("")
    if t["id"] in plan:
        md.extend(items(t["id"]))
    else:
        A("- Ingen.")
    A("")

A("## 4. Bevidst udeladt – og hvorfor")
A("")
for line in [
    "**Holberg og Arne Jacobsen:** «Læs mere» viser allerede bogens fulde tekst om personen (s. 123 l. 21–30 og "
    "s. 124 l. 42–57). Så alle spørgsmål får en udvidelse efter svar, får de arkets indledning og en anden person fra "
    "samme ark (Tove Ditlevsen og Olafur Eliasson).",
    "**Titelsider, indholdsfortegnelse, kolofon og indledning** (s. 1–4) og hvert arks «Dette fakta-ark handler om»-liste: ingen fakta.",
    "**Margentekst og sidehoved** («FAKTA-ARK n:», arkets titel, «LÆREMATERIALE TIL MEDBORGERSKABSPRØVEN», «NN / 156»): "
    "fjernet inde i uddragene; `check-result.txt` lister præcis, hvad der er udeladt for hvert uddrag.",
    "**Fotos og billedtekster**: udeladt, undtagen to billedtekster med selvstændige fakta: s. 119 l. 16–19 "
    "(statsministre med årstal) og s. 75 l. 36–45 (regeringen 3. juni 2026).",
    "**Gentagelser i bogen**: fx s. 98 l. 33–37 (= l. 14–21), s. 83 l. 37–42 (= s. 79 l. 25–30), s. 51 l. 32–35 "
    "(= s. 38 l. 53–57), s. 36 l. 34–47 (skole/SU, findes i ark 1–2), s. 135 l. 25–26 (= s. 91 l. 17–19), "
    "s. 74 l. 22–25 og s. 72 l. 36–38 (lovgivende magt, = s. 66). Kun den bedste version er brugt.",
    "**Detaljer langt fra prøven**: specialundervisning og lærerteams (s. 8 l. 12–37), FVU/OBU/avu-detaljer "
    "(s. 16 l. 27–57), erhvervsakademi-detaljer (s. 14 l. 47–57), a-kassens «Min Plan» (s. 29 l. 24–35), "
    "folketingsudvalg i detaljer (s. 73 l. 54–64), arbejdsmiljø i detaljer (s. 26 l. 6–26), asatro og guder "
    "(s. 108 l. 59–s. 109 l. 10), middelalderens stænder (s. 110 l. 12–22), coronarestriktioner (s. 121 l. 9–29), "
    "energiøernes teknik og opvarmning/elbiler (s. 145), Afrika-strategien (s. 103 l. 30–39), Arla-ejerskab "
    "(s. 31 l. 46–56), ikke-kristne højtider ud over Eid/kinesisk nytår/jødisk påske og pinse (s. 131 l. 45–52).",
    "**Statistik om hadforbrydelser og konkrete straffesager** (s. 139 l. 64–s. 140 l. 14, s. 141 l. 6–24): "
    "tal og citater, der hurtigt forældes, og s. 141 l. 10–12 citerer en hadefuld udtalelse ordret – det skal ikke "
    "dukke op i en læringspopup uden kontekst. Den generelle forklaring (s. 139 l. 36–43 og l. 58–62) er med.",
    "**Ordlisten** generelt: kun opslag, der præcist forklarer et prøveord, er med (anke, forfatning, besættelse, "
    "frie og hemmelige valg, forældremyndighed, skolebestyrelse, FN, rigsfællesskab, Johannes Døberen, midsommervisen, "
    "fastetid, Helligånden).",
    "**Bogens egne uoverensstemmelser** er ikke rettet: kvinder i Folketinget er 48 % (s. 59) og 49 % (s. 83); "
    "stemmeprocent ved folketingsvalg «cirka 85» (s. 82) og «84» i 2026 (s. 100). Uddragene citerer bogen ordret; "
    "sitet skriver allerede «48–49 %».",
]:
    A(f"- {line}")
A("")

A("## 5. Regler for næste session (UI og data)")
A("")
A("### 5.1 Anbefaling: samme ikon, ny sektion i den samme popover")
A("")
A("**Anbefalet:** ingen ny knap. Det eksisterende bog-ikon («Læs mere i bogen») åbner den samme popover, som nu får "
  "to sektioner, når der er udvidelser:")
A("")
A("1. **Sektion 1 – uændret:** de nuværende `book`-referencer (citat, «Åbn side N i bogen»).")
A("2. **Sektion 2 – ny:** overskrift `bi(\"Mere fra bogen\", \"More from the book\")`, adskilt af en tynd skillelinje. "
  "For hvert uddrag: `title_da` som lille overskrift (h3/h4 i popoveren), citatlinjen "
  "«Læremateriale 2026 · side N, linje X–Y» (genbrug `refLabel`), `excerpt_da` i `blockquote.book-quote` og linket "
  "«Åbn side N i bogen» (genbrug den eksisterende linkkode). Til sidst ét link til den officielle kilde, som i dag.")
A("")
A("Hvorfor ikke et separat ikon: (a) faktalinjen har allerede ét ikon, og to små ikoner side om side er svære at ramme "
  "på mobil (44 px trykområde hver); (b) brugeren har lært, at bogen = ét ikon; (c) popoveren har allerede scroll, "
  "fokusstyring, Esc og placering – alt genbruges; (d) kilden til faktaet står øverst, og konteksten kommer bagefter, "
  "så popoveren læses i den rigtige rækkefølge.")
A("")
A("Ikonets tilstand: når et fakta har udvidelser, får knappen en lille prik/badge (CSS, `.book-btn.has-more`) og "
  "aria-label «Læs mere i bogen: side … – og N afsnit mere fra bogen». Popover-titlen forbliver «Læs mere i bogen».")
A("")
A("### 5.2 Efter hvert svar: udvidelsen står inde i feedback-boksen")
A("")
A("Brugerens krav: «after I answer each question some info show up about what I answered. make sure that in that "
  "info there is also the expansion part that is related around it.» Udvidelsen skal derfor stå **inde i den "
  "eksisterende forklaringsboks**, som vises efter hvert svar. Den skal stå der, uanset om svaret var rigtigt, forkert "
  "eller ubesvaret. Det er ikke nok, at den kun kan åbnes fra bog-ikonet eller står et andet sted på siden.")
A("")
A("**Én komponent for alle sider.** Alle steder, hvor man svarer på et prøvespørgsmål, bruger "
  "`MBP.ui.questionCard` (`js/ui.js`). Den kalder `showExplanation(verdict)`, som lægger "
  "`explainPanel(q, verdict, next)` (`js/ui.js`, `function explainPanel`) ind i `div.explain-inner` under "
  "svarmulighederne. Ingen side har sin egen feedback, så ændringen laves ét sted: i `explainPanel`.")
A("")
A("| Side | Kald | Hvornår feedbacken vises | verdict |")
A("|---|---|---|---|")
for row in [
    ("Test, normal (`quiz.html`)", "`js/quiz.js` `questionCard(q, {onAnswer, next})` i den normale quiz-løkke",
     "Straks efter hvert svar", "`true` / `false`"),
    ("Test, prøvetilstand", "`js/quiz.js` `showExam`: `questionCard(q, {feedback: false})`",
     "Ikke under prøven (uændret). Efter aflevering i gennemgangen: `drawReview` → `questionCard(q, {review: {chosen}})` "
     "→ `showExplanation`", "`true` / `false` / `null` (ubesvaret)"),
    ("Øv (`learn.html`)", "`js/learn.js` `questionCard(q, {onAnswer, next})`", "Straks efter hvert svar", "`true` / `false`"),
    ("Top 15 (`top15.html`)", "Ingen `questionCard`; man svarer ikke", "Ingen feedback-boks. Spørgsmål og svar vises "
     "med `withBook` (`js/top15.js`), så udvidelsen står i bog-popoveren (5.3)", "–"),
]:
    A("| " + " | ".join(row) + " |")
A("")
A("**Præcis placering i `explainPanel`.** `kids` bygges i denne rækkefølge; den nye blok indsættes som punkt 6:")
A("")
for i, line in enumerate([
    "verdict-linjen («Rigtigt» / «Ikke helt – svaret er …» / «Ikke besvaret – svaret er …»)",
    "`div.fact`: faktaet med bog-ikonet (`withBook(…, c.book)`)",
    "evt. «Bogen siger nu» / nobook-noten",
    "`noteBoxes(c, true)`",
    "evt. rettenøgle-noten (`q.official_correct`)",
    "**NY: blokken «Mere fra bogen»**",
    "«Stillet i N prøver: …» (`p.freq`)",
    "«Næste»-knappen (`next`), som stadig er sidst og får fokus som i dag",
], 1):
    A(f"{i}. {line}")
A("")
for line in [
    "Blokken: `h(\"details\", {class: \"book-more book-more-feedback\", open: true}, h(\"summary\", …, "
    "bi(\"Mere fra bogen (N)\", \"More from the book (N)\")), …uddrag)`. Hvert uddrag vises som i popoverens sektion 2 "
    "(5.1): `title_da`, citatlinjen via `refLabel`, `excerpt_da` i `blockquote.book-quote` og «Åbn side N i bogen». "
    "Punktlister og `*`-noten følger 5.4.",
    "Den er **åben som standard**, så teksten står synligt i feedbacken efter hvert svar. Brugeren kan folde den "
    "sammen. Valget huskes pr. enhed i `localStorage` (`mbp.bookMoreOpen`, læs/skriv i try/catch) og gælder for de "
    "næste svar.",
    "Ingen betingelse på `verdict`: blokken vises ens for `true`, `false` og `null`.",
    "Udvælgelse: `var more = (D.more && D.more[q.cluster_id]) || [];`. Det er alle uddrag for spørgsmålets cluster i "
    "JSON-rækkefølge. Hvert af de 500 spørgsmål har et `cluster_id`, og hver cluster har mindst ét uddrag, så "
    "**500 af 500** spørgsmål får blokken. `check_excerpts.py` tjekker det og fejler, hvis et spørgsmål mangler.",
    "Kun cluster-uddrag, ikke faktagruppe- eller emne-niveau: de handler om emnet bredt, ikke om spørgsmålet. "
    "Hvis `more` er tom (fremtidige data), udelades blokken.",
    "Ingen dobbeltvisning: i `explainPanel` kaldes `withBook(…, c.book)` **uden** `more`. Bog-ikonet i feedbacken "
    "viser kun sektion 1, fordi sektion 2 allerede står inline lige under.",
    "Bog-popoveren i Øv-lektionskortet og i Øv-opsummeringen (`withBook` i `js/learn.js`) får sektion 2 som i 5.3. "
    "Det er ikke feedback efter svar, så popoveren er nok der.",
    "Tjekliste til implementeringen: svar rigtigt og forkert i Test; aflever en prøve med et ubesvaret spørgsmål og "
    "se gennemgangen; svar i Øv; tjek et Holberg-spørgsmål (fx `2019-06-q25`) og et Arne Jacobsen-spørgsmål "
    "(fx `2017-06-q15`). Blokken skal stå mellem noterne og «Stillet i …» i alle tilfælde.",
]:
    A(f"- {line}")
A("")
A("### 5.3 Placering pr. side")
A("")
A("| Side / sted | Udvidelser? | Hvordan |")
A("|---|---|---|")
for row in [
    ("Læs (`study.html`) – faktarækker (`factRow`)", "Ja", "Samme popover, sektion 2 med `more[cluster.id]`."),
    ("Læs – emne-intro-afsnit (`t.intro`)", "Nej", "Intro-afsnit beholder kun «læs mere». Udvidelser på emne-niveau vises i blokken nederst."),
    ("Læs – «Ændret siden prøven»-noter og øvrige noter", "Nej", "Uændret."),
    ("Læs – faktagrupper (`groupBlock`, `fg-book`-knappen)", "Ja", "Samme popover, sektion 2 med `more[group.id]`."),
    ("Læs – nederst i hvert emne (før `endBar`)", "Ja (emne-niveau)", "Ny blok: `<details class=\"book-more\">` med `<summary>` "
     "«Mere fra bogen (N)» / «More from the book». Indholdet vises inline (ikke popover), fordi der er op til 8 uddrag. "
     "Lukket som standard."),
    ("Øv (`learn.html`) – lektionskort", "Ja", "Samme popover (via `withBook`)."),
    ("Øv – opsummering «Det skal du se på igen»", "Ja", "Samme popover."),
    ("Feedback efter svar (`explainPanel` i `ui.js`): Test, prøve-gennemgang og Øv", "Ja, **inline i boksen**",
     "Blokken «Mere fra bogen» står åben inde i feedbacken efter hvert svar (5.2). Bog-ikonet her viser kun sektion 1."),
    ("Top 15 (`top15.html`)", "Ja", "Samme popover (cluster-id er kendt)."),
    ("Selve prøvespørgsmålet før svar", "Nej", "Ingen bog-knap før man har svaret (som i dag)."),
]:
    A(f"| {row[0]} | {row[1]} | {row[2]} |")
A("")
A("Teknisk: `withBook(el, refs)` får et valgfrit tredje argument `more` (liste fra `01-content-plan.json`). "
  "Alle popover-steder i tabellen med «Ja» sender `MBP.data.more[id] || []`; `explainPanel` sender intet og viser i stedet blokken fra 5.2. Hvis `refs` er tom, men `more` ikke er, vises knappen alligevel.")
A("")
A("### 5.4 Data")
A("")
for line in [
    "Kopiér `book-expansion/01-content-plan.json` til `data/book_more.json` (samme indhold). `tools/build_data.py` "
    "lægger den i bundlen som `more` (nøgle → liste). Brug `excerpt_da` som den er – genskab den **ikke** fra side/linjer.",
    "Kør `python3 book-expansion/check_excerpts.py` som en del af build-tjekket; den skal sige `ALL OK`.",
    "Nøglerne er cluster-id, faktagruppe-id (`fg-…`) eller emne-id (`demokrati`, `historie`, …). Rækkefølgen i listen er visningsrækkefølgen.",
    "`excerpt_da` er én linje. Punktlister står som `• punkt • punkt`: del på ` • ` og vis som `<ul>` "
    "(teksten før første `•` er indledningen). Ordliste-uddrag starter med `• ord – forklaring` og bliver ét punkt.",
    "Bogens `*` (ord forklaret i ordlisten) bevares ordret. Tilføj én gang nederst i sektion 2 en lille note: "
    "«* = forklaret i bogens ordliste, s. 147–155» / «* = explained in the book's glossary».",
    "Kun dansk tekst i uddragene (som i dag). Sektionsoverskrifter er tosprogede via `bi()`; `title_da` vises kun på dansk.",
]:
    A(f"- {line}")
A("")
A("### 5.5 Billeder og figurer")
A("")
for line in [
    "**Ingen billeder i popoverne.** Fotos er krediteret fotografer (Ritzau Scanpix m.fl.) og tilføjer ikke prøvefakta.",
    "To figurer er nyttige og kan få et **link**, ikke en indlejret kopi: kommunekortet med de fem regioner i farver "
    "(`bookdump/images/img-078-081.jpg`, side 78) og EU-kortet (`img-097-094.jpg`, side 97, «Grafik: EU»). "
    "Valgfrit: under `dem-regioner-5` og i emne-blokken for `verden` et ekstra link «Se kortet i bogen (side 78/97)» "
    "til `BOOK_PDF#page=78` / `#page=97`. Ikke i JSON'en; tag det kun med, hvis det er nemt.",
]:
    A(f"- {line}")
A("")
A("### 5.6 Popoverens størrelse")
A("")
A("Popoveren beholder sin maks-højde (360 px) og scroller indeni. Det største fakta, `dem-rettigheder`, får ca. "
  "300 ord «læs mere» + ca. 190 ord udvidelse; faktagruppen `fg-aarstal` har allerede ca. 635 ord og får 160 mere. "
  "Det er acceptabelt med scroll; vis ikke uddragene sammenklappede i popoveren.")
A("")

A("## 6. Filer i `book-expansion/`")
A("")
for line in [
    "`01-content-plan.md` – denne fil (genereret af `gen_md.py`).",
    "`01-content-plan.json` – `{id: [{title_da, page, lines, excerpt_da}]}` (genereret af `build.py`).",
    "`spec.py` – beslutningerne (mål, overskrift, side, linjer, evt. start/slut-ankre, begrundelse).",
    "`bookclean.py` – læser `bookdump/pages` og fjerner margentekst/sidehoved; samler orddeling over linjeskift.",
    "`build.py` – spec → JSON. `gen_md.py` – JSON + spec → denne fil.",
    "`check_excerpts.py` → `check-result.txt` – beviser, at hvert uddrag er ordret bogtekst (to uafhængige tjek: "
    "renset tekst og rå sidefil), højst 150 ord, rigtigt id og ikke en kopi af faktaets egen «læs mere».",
    "Genbygning: `python3 book-expansion/build.py && python3 book-expansion/gen_md.py && python3 book-expansion/check_excerpts.py`.",
]:
    A(f"- {line}")
A("")

(HERE / "01-content-plan.md").write_text("\n".join(md) + "\n", encoding="utf-8")
print(f"wrote 01-content-plan.md ({len(md)} lines)")
