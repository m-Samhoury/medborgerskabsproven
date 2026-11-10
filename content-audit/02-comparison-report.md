# Sammenligning: sitet mod det officielle læremateriale (trin 2 af 3)

Kilde: *Læremateriale til medborgerskabsprøven – demokrati og hverdagsliv i Danmark*, **august 2026** (redaktion afsluttet juni 2026), 156 sider, https://danskogproever.dk/media/4vbfd0ac/laeremateriale-til-medborgerskabsproeven.pdf. Bogen er behandlet som sandheden. Prøvespørgsmål er historiske: hvor bogen nu siger noget andet end prøvens facit, er posten markeret **OUTDATED** (facit var rigtigt dengang), ikke WRONG.

## Sidetal og linjenumre

- **Trykt sidetal = PDF-sideindeks. Offset = 0.** Hver side har sidehovedet `NN / 156`, og indholdsfortegnelsen (PDF 4) peger på de samme sider som PDF-indekset (fx Fakta-ark 1 starter på PDF 5 / trykt 05). Forside = PDF 1, kolofon = PDF 2.
- **Linjenumre** er de fysiske linjenumre (1-baseret) i den rå sidefil `bookdump/pages/page-NNN.txt` (uændret `pdftotext -layout`-output, inkl. tomme linjer og sidehoved). Citér som *PDF 63 / trykt 63, l. 12–32* = `bookdump/pages/page-063.txt`, linje 12-32. Et interval kan omfatte tomme linjer eller margentekst, der ligger mellem de relevante tekstlinjer.
- **Kanonisk kilde: `bookdump/`** (original-PDF, rå sidefiler, `full-text.txt`, billeder, README med proveniens). `content-audit/book-text.md` er fjernet som overflødig, så der kun findes én linjenummerering.

## Metode og dækning

- Alle **767 poster** i `01-site-content.md` er klassificeret: 500 spørgsmål, 168 clusters, 34 intro-afsnit, 10 current-fact-noter, 15 faktagrupper, 40 hårdkodede fakta.
- Alle 500 spørgsmåls rigtige svar blev tjekket maskinelt mod deres cluster-svar (0 uoverensstemmelser). Spørgsmål arver derfor clusterens bog-reference og dom; undtagelser er markeret på spørgsmålsniveau (fx 'Dronningen'-spørgsmål).
- Hele bogen (PDF 1-156) er læst; hver cluster er slået op på bogens sider. Kun kategorien 'NOT IN BOOK' betyder *kan ikke verificeres* – ikke forkert.
- Billeder i 200 spørgsmål (answer_source=image) er ikke tjekket mod de oprindelige prøve-PDF'er; kun datafilernes tekst er sammenlignet.
- De 36 hårdkodede poster (H:1-10, 12-27, 29-36, 39-40) er app-/meta-oplysninger (bestået-grænse, datoer, antal, UI-tekster) uden bogindhold og står derfor som 'NOT IN BOOK (meta)'.

## Resumé

| Kategori | Antal | Spørgsmål | Clusters | Intro | Noter (F) | Faktagrupper | Hårdkodet |
|---|---:|---:|---:|---:|---:|---:|---:|
| **WRONG** | **4** | 0 | 1 | 2 | 0 | 1 | 0 |
| **OUTDATED** | **25** | 16 | 7 | 0 | 2 | 0 | 0 |
| **DIFFERS** | **19** | 4 | 8 | 4 | 0 | 3 | 0 |
| **NOT IN BOOK** | **50** | 6 | 4 | 1 | 2 | 1 | 36 |
| **OK** | **669** | 474 | 148 | 27 | 6 | 10 | 4 |
| **I alt** | **767** | 500 | 168 | 34 | 10 | 15 | 40 |

(Heraf er 36 'NOT IN BOOK' rene meta-poster (H); 14 er indholdsfakta uden dækning i bogen.)

### De vigtigste fejl (efter alvorlighed)

1. **Aldersgrænse for vin (og 'øl og vin') er forkert – 16 år i stedet for 18.** Bogen: 16 år gælder kun almindelig øl; vin, spiritus og alt over 6 % kræver 18 år (PDF 44 l.45-47; PDF 55 l.52-55). Sitet siger 16 år til 'øl og vin' i `I:velfaerd:2`, `G:fg-aldre` (+ mnemonic) og `C:vel-oel-vin-16` (Q:2017-06-q14 var rigtigt i 2017 → OUTDATED). Mest sandsynlige fejl man ville lære forkert til prøven.

2. **'Danmark handler mest med Tyskland' er forældet/forkert.** Bogen (2025-tal): USA er største handelspartner samlet (14,1 %), Tyskland 12,7 %; Tyskland er kun størst for import (PDF 32 l.53-61). Berører `I:verden:1` (WRONG) og `C:ver-tyskland-handel` (OUTDATED). Q:2026-06-q18 er stadig rigtigt blandt svarmulighederne.

3. **'Byret → landsret → Højesteret' som fast stige.** Bogen: en sag anket fra byret til landsret kan som regel *ikke* ankes videre til Højesteret; kun sager startet i landsretten kan (PDF 69 l.37-40). Sitets trap-note (`C:dem-anke`), `I:demokrati:3` og `G:fg-magt` siger det modsatte/vildledende.

4. **Kørekort: 'ledsager indtil 18 år' er forkert.** Bogen: 17-årige må køre alene kl. 5-20; ledsager (>24 år, kørekort ≥5 år) kun kl. 20-5; fra 18 uden ledsager (PDF 45 l.29-33). Berører `C:vel-koerekort-17` (WRONG) og `G:fg-aldre`.

5. **Tal der er ændret siden prøverne (sitet har delvis rettet, men forkert eller ufuldstændigt):** Indvandrere/efterkommere: bogen **17 %**, sitet siger 'ca. 16 %' (PDF 106 l.36-37) → `C:geo-indvandrere`, `F:geografi:1`. Kvinder i Folketinget: bogen **48-49 %**, sitet 'ca. 45 %' (PDF 59 l.45-46; PDF 83 l.14-20) → `C:dem-kvinder-folketing`, `F:demokrati:2`. Regeringen: Venstre er ikke længere med (PDF 75 l.25-45) → `C:dem-regering`. Dronningen → Kongen (`C:kon-nytaarstale`, `C:kon-rolle`). MEP-antal 13 → 15 (`C:ver-mep-antal`).

**Øvrige bemærkelsesværdige punkter:** `C:arb-akasse-procent` / `I:arbejde:2` / `G:fg-tal` – 'ca. 70 % i a-kasse' står ikke i bogen (bogen: 68 % i *fagforening*). `C:arb-beskaeftigelse` – bogen: 73 % af 16-66-årige (ikke 15-64). Børnepasning: bogen siger vuggestue/dagpleje fra ca. 6 mdr., skolestart 'omkring seks år', 'de fleste' (ikke 'næsten alle') børn 3-5 år passes uden for hjemmet. Region Hovedstaden + Region Sjælland slås sammen 1.1.2027 til Region Østdanmark (PDF 80 l.22-23) – prøven 25.11.2026 er før ændringen, men tilføj en note. `C:vel-faedreorlov`/`F:velfaerd:1`: '2 uger'/'11 uger' står ikke i bogen. Store Bededag og Kristi himmelfart-rækker står ikke i bogen.

**Bekræftet korrekt:** 2017-11 spm. 23-rettelsen (svar C, Slesvig og Holsten; PDF 113 l.9-11 vs. PDF 111 l.20-22) og den nuværende regering S+SF+M+RV fra 3. juni 2026 (PDF 75 l.25-45).

---

# Fund (alle poster der ikke er OK)

Sorteret: WRONG → OUTDATED → DIFFERS → NOT IN BOOK. Spørgsmål nederst i hver kategori. Format pr. post: ID · fil:linje · **Sitet siger** · **Bogen siger** · **Bogreference** (PDF-side, trykt side, linjer) · **Forslag**.

## WRONG (4)

#### I:velfaerd:2 · `data/topics.json:308` · WRONG
- **Sitet siger:** ...16 år for at købe øl og vin.
- **Bogen siger:** «Unge skal være fyldt 16 år, før de må købe almindelig øl. Unge skal være fyldt 18 år, før de må købe meget stærk øl, vin, spiritus og cigaretter … 18 år for at købe alkohol over seks procent»
- **Bogreference:** PDF 44 / trykt 44, l. 45-47; PDF 55 / trykt 55, l. 52-55; PDF 45 / trykt 45, l. 29-33; PDF 41 / trykt 41, l. 63-64; PDF 45 / trykt 45, l. 18-19
- **Forslag/note:** Rettes: 'Man skal være 16 år for at købe almindelig øl (under 6 %), men 18 år for vin, spiritus og stærk øl og cigaretter.' (Øvrige aldre i afsnittet er korrekte.)

#### G:fg-aldre · `data/fact_groups.json:487` · WRONG
- **Sitet siger:** 16 år | Købe øl og vin; 17 år | Kørekort til bil (med ledsager til 18 år); mnemonic: 'øl/vin 16, kørekort 17'
- **Bogen siger:** «Unge skal være fyldt 16 år, før de må købe almindelig øl … 18 år … vin, spiritus og cigaretter … 17-årige [skal] køre med en ledsager [kun] fra klokken 20 til klokken 5»
- **Bogreference:** PDF 44 / trykt 44, l. 45-47; PDF 55 / trykt 55, l. 52-55; PDF 45 / trykt 45, l. 29-33; PDF 18 / trykt 18, l. 38; PDF 6 / trykt 6, l. 29-31
- **Forslag/note:** Ret: '16 år: almindelig øl (under 6 %); 18 år: vin, spiritus, stærk øl'; '17 år: kørekort – ledsager kun kl. 20-5 (ledsager >24 år, kørekort ≥5 år)'; '0-3 år vuggestue' → 'fra ca. 6 mdr.'; skolestart 'omkring seks år'. Mnemonic 'Undtagelser: øl/vin 16' er forkert for vin.

#### C:vel-koerekort-17 · `data/clusters.json:6863` · WRONG
- **Sitet siger:** Man kan få kørekort til almindelig bil fra 17 år (indtil 18 år skal man køre med en ledsager). (svar: 17 år)
- **Bogen siger:** «Når man fylder 17 år, kan man tage kørekort … og køre uden ledsager mellem klokken 5 om morgenen og klokken 20 om aftenen. Fra klokken 20 til klokken 5 skal 17-årige køre med en ledsager … Fra man er fyldt 18 år, har man lov til at køre bil uden en ledsager hele døgnet»
- **Bogreference:** PDF 45 / trykt 45, l. 29-33
- **Forslag/note:** Svaret 17 år er rigtigt. Men fact'ens 'indtil 18 år skal man køre med en ledsager' er forkert/for bredt: 17-årige må køre alene kl. 5-20; ledsager (over 24 år, kørekort i ≥5 år) kræves kun kl. 20-5. Ret fact.

#### I:verden:1 · `data/topics.json:486` · WRONG
- **Sitet siger:** Danmark handler mest med Tyskland.
- **Bogen siger:** «Tyskland er det land, som Danmark importerer mest fra, og USA er det land, som Danmark eksporterer mest til … I 2025 … USA (14,1 procent), Tyskland (12,7 procent)»
- **Bogreference:** PDF 32 / trykt 32, l. 53-61; PDF 101 / trykt 101, l. 9; PDF 133 / trykt 133, l. 6-11; PDF 98 / trykt 98, l. 6; PDF 75 / trykt 75, l. 53-55
- **Forslag/note:** Ret 'Danmark handler mest med Tyskland' til: 'USA er Danmarks største handelspartner samlet (2025); Tyskland er størst for import.' Resten af afsnittet er korrekt.

## OUTDATED (25)

#### F:demokrati:2 · `data/topics.json:44` · OUTDATED
- **Sitet siger:** Kvinder i Folketinget: ca. 40 % i 2018-2020 og ca. 45 % efter valget i 2022.
- **Bogen siger:** «86 ud af 179 medlemmer (48 procent) … efter … valg i 2026 er 49 procent af de valgte medlemmer af Folketinget kvinder»
- **Bogreference:** PDF 59 / trykt 59, l. 45-46; PDF 83 / trykt 83, l. 14-20
- **Forslag/note:** Opdatér til: 'ca. 48-49 % efter valget i 2026' (bogen angiver 48 % [S59] og 49 % [S83]).

#### C:dem-kvinder-folketing · `data/clusters.json:4287` · OUTDATED
- **Sitet siger:** Ca. 45 % af Folketingets medlemmer var kvinder efter valget i 2022 (i 2018–2020 ca. 40 %). (svar: Ca. 40-45 %)
- **Bogen siger:** «86 ud af 179 medlemmer (48 procent) … Efter det sidste Folketingsvalg i 2026 er 49 procent af de valgte medlemmer af Folketinget kvinder»
- **Bogreference:** PDF 59 / trykt 59, l. 45-46; PDF 83 / trykt 83, l. 14-20
- **Forslag/note:** Svaret 'ca. 40-45 %' var rigtigt ved prøverne (2018-2024), men er nu ca. 48-49 %. Opdatér fact og current-note med tallet (bogen angiver både 48 % [S59] og 49 % [S83] – bogen er selv uens). Se også F:demokrati:2.

#### C:dem-regering · `data/clusters.json:5448` · OUTDATED
- **Sitet siger:** Fra december 2022 til juni 2026 var regeringen S + V + M (SVM-regeringen). Siden 3. juni 2026 er regeringen S + SF + M + Radikale Venstre (Mette Frederiksen III). (svar: Venstre (SVM-regeringen 2022–2026). Konservative var IKKE med.)
- **Bogen siger:** «den nuværende regering, der består af fire partier Socialdemokratiet, SF, Moderaterne og Radikale Venstre … 3. juni 2026»
- **Bogreference:** PDF 75 / trykt 75, l. 25-27, l. 36-45
- **Forslag/note:** Svaret 'Venstre' var rigtigt ved prøverne 2024-11/2025-05 (SVM-regeringen), men Venstre er ikke med i regeringen i dag (siden 3.6.2026). Site-noten (current_note) er korrekt og bekræftet af bogen. Gør Q/A tydeligt tidsbundet ('dengang'); 'Er Konservative med nu? Nej' er stadig rigtigt.

#### C:kon-nytaarstale · `data/clusters.json:3450` · OUTDATED
- **Sitet siger:** Kongen holder nytårstale den 31. december. Statsministeren holder nytårstale den 1. januar. (svar: Kongen (i ældre prøver: Dronningen))
- **Bogen siger:** «hvert år på nytårsaften den 31. december holder kongen en nytårstale … Nytårsdag, 1. januar, holder statsministeren en nytårstale»
- **Bogreference:** PDF 65 / trykt 65, l. 39-41; PDF 130 / trykt 130, l. 32-42
- **Forslag/note:** Svaret 'Dronningen' var rigtigt ved prøverne 2018-06 til 2022-11 (Margrethe 2.), men i dag er det Kongen. Site-fact og current-note siger allerede 'Kongen'; marker de ældre spørgsmål som historiske.

#### F:geografi:1 · `data/topics.json:214` · OUTDATED
- **Sitet siger:** Region Hovedstaden: prøven i 2018 sagde ca. 1,7 millioner – i dag ca. 1,9 millioner. Indvandrere og efterkommere: prøven i 2018 sagde 12-13 % – i dag ca. 16 %.
- **Bogen siger:** «cirka en million (17 procent) indvandrere eller efterkommere»
- **Bogreference:** PDF 106 / trykt 106, l. 36-37
- **Forslag/note:** Bogen siger 17 % (ikke 16 %). Region Hovedstadens indbyggertal (1,9 mio.) står ikke i bogen. Region Hovedstaden fusionerer 1.1.2027.

#### C:geo-indvandrere · `data/clusters.json:7747` · OUTDATED
- **Sitet siger:** Ca. 16 procent af befolkningen er indvandrere og efterkommere (per 2026). (svar: 12-13 % (prøvens svar i 2018) – i dag ca. 16 %)
- **Bogen siger:** «cirka en million (17 procent) indvandrere eller efterkommere»
- **Bogreference:** PDF 106 / trykt 106, l. 36-37
- **Forslag/note:** Prøvesvaret 12-13 % var rigtigt i 2018, men bogen siger nu 17 % (site siger 'ca. 16 %' per 2026 – det matcher ikke bogen). Ret fact, answer og current-note til 17 % (ca. 1 million).

#### C:vel-oel-vin-16 · `data/clusters.json:7985` · OUTDATED
- **Sitet siger:** Man skal være 16 år for at købe øl og vin (med under 16,5 % alkohol). Stærkere alkohol: 18 år. (svar: 16 år)
- **Bogen siger:** «Unge skal være fyldt 16 år, før de må købe almindelig øl. Unge skal være fyldt 18 år, før de må købe meget stærk øl, vin, spiritus og cigaretter … 18 år for at købe alkohol over seks procent»
- **Bogreference:** PDF 44 / trykt 44, l. 45-47; PDF 55 / trykt 55, l. 52-55
- **Forslag/note:** Svaret '16 år til øl og vin' var rigtigt ved prøven 2017-06, men bogen siger nu: 16 år kun til almindelig øl; VIN, spiritus og alt over 6 % kræver 18 år. Fact'ens '16 år til vin (under 16,5 %)' er forkert i dag. Ret fact/trap-note: 'Øl (≤6 %) = 16, vin og spiritus = 18, cigaretter = 18.'

#### C:ver-mep-antal · `data/clusters.json:4863` · OUTDATED
- **Sitet siger:** Danmark har 15 medlemmer i Europa-Parlamentet (siden valget i 2024). (svar: 15 i dag (prøvens svar 2017-2018: 13))
- **Bogen siger:** «Danmark vælger 15 medlemmer til Europa-Parlamentet … 720 medlemmer, hvoraf 15 er valgt i Danmark»
- **Bogreference:** PDF 83 / trykt 83, l. 61-62; PDF 100 / trykt 100, l. 20-21
- **Forslag/note:** Prøvesvaret 13 (2017-2018) var rigtigt dengang; bogen siger nu 15. Site-fact og current-note er korrekte; historikken (13→14→15) står ikke i bogen.

#### C:ver-tyskland-handel · `data/clusters.json:6659` · OUTDATED
- **Sitet siger:** Danmark handler mest med Tyskland (import og eksport). (svar: Tyskland)
- **Bogen siger:** «Tyskland er det land, som Danmark importerer mest fra, og USA er det land, som Danmark eksporterer mest til … I 2025 … USA (14,1 procent), Tyskland (12,7 procent)»
- **Bogreference:** PDF 32 / trykt 32, l. 53-61
- **Forslag/note:** Prøven 2026-06 (svar: Tyskland) var rigtig efter tidligere materiale, men bogen (aug. 2026) viser at USA nu er Danmarks største handelspartner samlet (14,1 % mod 12,7 %). Tyskland er kun størst for IMPORT. Ret fact/svar: 'USA (samlet handel, 2025); Tyskland størst import'. Høj alvorlighed – site underviser forkert fact.

### Spørgsmål med status OUTDATED (16)

| ID | fil:linje | Sitet siger (spørgsmål → facit) | Bogreference | Note |
|---|---|---|---|---|
| Q:2018-11-q12 | `data/questions.json:3514` | Hvor mange af medlemmerne af Folketinget er kvinder? → Ca. 40 % | PDF 59 / trykt 59, l. 45-46; PDF 83 / trykt 83, l. 14-20 | Svaret var rigtigt dengang; bogen: 48-49 % kvinder i dag. |
| Q:2020-11-q10 | `data/questions.json:6643` | Hvor stor en andel af Folketingets medlemmer er kvinder? → Ca. 40 % | PDF 59 / trykt 59, l. 45-46; PDF 83 / trykt 83, l. 14-20 | Svaret var rigtigt dengang; bogen: 48-49 % kvinder i dag. |
| Q:2024-05-q20 | `data/questions.json:12468` | Hvor stor en andel af Folketingets medlemmer er kvinder? → Cirka 45 procent | PDF 59 / trykt 59, l. 45-46; PDF 83 / trykt 83, l. 14-20 | Svaret var rigtigt dengang; bogen: 48-49 % kvinder i dag. |
| Q:2024-11-q8 | `data/questions.json:12877` | Hvilket af følgende partier har været med i regeringen siden 2022? → Venstre | PDF 75 / trykt 75, l. 25-27, l. 36-45 | Svaret 'Venstre' var rigtigt (SVM-regeringen 2022-2026); Venstre er ikke med i regeringen siden 3.6.2026. |
| Q:2018-06-q7 | `data/questions.json:2559` | Hvem holder sin nytårstale den 31. december? → Dronningen | PDF 65 / trykt 65, l. 39-41; PDF 130 / trykt 130, l. 32-42 | Svaret 'Dronningen' var rigtigt da prøven blev afholdt (Margrethe 2.); i dag er kongen Frederik 10. (S65 l.12-19). |
| Q:2020-06-q22 | `data/questions.json:6229` | Hvem holder sin nytårstale den 31. december? → Dronningen | PDF 65 / trykt 65, l. 39-41; PDF 130 / trykt 130, l. 32-42 | Svaret 'Dronningen' var rigtigt da prøven blev afholdt (Margrethe 2.); i dag er kongen Frederik 10. (S65 l.12-19). |
| Q:2021-11-q4 | `data/questions.json:8000` | Hvem holder sin nytårstale den 31. december? → Dronningen | PDF 65 / trykt 65, l. 39-41; PDF 130 / trykt 130, l. 32-42 | Svaret 'Dronningen' var rigtigt da prøven blev afholdt (Margrethe 2.); i dag er kongen Frederik 10. (S65 l.12-19). |
| Q:2022-11-q4 | `data/questions.json:9580` | Hvem holder sin nytårstale den 31. december? → Dronningen | PDF 65 / trykt 65, l. 39-41; PDF 130 / trykt 130, l. 32-42 | Svaret 'Dronningen' var rigtigt da prøven blev afholdt (Margrethe 2.); i dag er kongen Frederik 10. (S65 l.12-19). |
| Q:2018-11-q9 | `data/questions.json:3415` | Hvilken rolle har dronningen blandt andet? → Hun underskriver nye love sammen med en minister | PDF 65 / trykt 65, l. 22-26; PDF 66 / trykt 66, l. 21-25 | Spørgsmålet siger 'dronningen'; indholdet (underskriver love sammen med en minister) gælder stadig kongen, men ordlyden er forældet. |
| Q:2020-11-q19 | `data/questions.json:6920` | Hvilken rolle har dronningen blandt andet? → Hun underskriver nye love sammen med en minister | PDF 65 / trykt 65, l. 22-26; PDF 66 / trykt 66, l. 21-25 | Spørgsmålet siger 'dronningen'; indholdet (underskriver love sammen med en minister) gælder stadig kongen, men ordlyden er forældet. |
| Q:2022-06-q18 | `data/questions.json:9232` | Hvilken rolle har Dronningen blandt andet? → Hun underskriver nye love sammen med en minister | PDF 65 / trykt 65, l. 22-26; PDF 66 / trykt 66, l. 21-25 | Spørgsmålet siger 'dronningen'; indholdet (underskriver love sammen med en minister) gælder stadig kongen, men ordlyden er forældet. |
| Q:2018-11-q1 | `data/questions.json:3161` | Hvor stor en andel af befolkningen i Danmark er indvandrere og efterkommere? → 12-13 % | PDF 106 / trykt 106, l. 36-37 | 12-13 % var rigtigt i 2018; bogen: 17 %. Bemærk at 17 % ligger mellem svarmulighederne 12-13 % og 19-20 %. |
| Q:2017-06-q14 | `data/questions.json:1202` | Hvor gamle skal unge være, før de må købe vin og øl? → 16 år. | PDF 44 / trykt 44, l. 45-47; PDF 55 / trykt 55, l. 52-55 | '16 år' til vin og øl var rigtigt i 2017; bogen: 16 år kun til almindelig øl, 18 år til vin. |
| Q:2017-06-q20 | `data/questions.json:1385` | Hvor mange medlemmer vælger Danmark til Europa-Parlamentet? → 13. | PDF 83 / trykt 83, l. 61-62; PDF 100 / trykt 100, l. 20-21 | Svaret 13 var rigtigt dengang; bogen: 15 medlemmer. |
| Q:2017-11-q6 | `data/questions.json:1728` | Hvor mange medlemmer har Danmark i Europa-Parlamentet? → 13 | PDF 83 / trykt 83, l. 61-62; PDF 100 / trykt 100, l. 20-21 | Svaret 13 var rigtigt dengang; bogen: 15 medlemmer. |
| Q:2018-11-q5 | `data/questions.json:3288` | Hvor mange medlemmer har Danmark i Europa-Parlamentet? → 13 | PDF 83 / trykt 83, l. 61-62; PDF 100 / trykt 100, l. 20-21 | Svaret 13 var rigtigt dengang; bogen: 15 medlemmer. |

## DIFFERS (19)

#### I:demokrati:3 · `data/topics.json:18` · DIFFERS
- **Sitet siger:** En dom fra byretten kan ankes til landsretten og derefter til Højesteret.
- **Bogen siger:** «Når en sag er anket til landsretten … kan sagen som regel ikke ankes til Danmarks øverste domstol, Højesteret. Hvis en sag er startet … i landsretten, kan den derimod som regel ankes til Højesteret»
- **Bogreference:** PDF 66 / trykt 66, l. 9-40; PDF 69 / trykt 69, l. 32-40
- **Forslag/note:** Rettes: 'En dom fra byretten kan ankes til landsretten. Kun sager, der starter i landsretten, kan normalt ankes til Højesteret.'

#### G:fg-magt · `data/fact_groups.json:410` · DIFFERS
- **Sitet siger:** Domstolene | Byret → Landsret → Højesteret
- **Bogen siger:** «Når en sag er anket til landsretten … kan sagen som regel ikke ankes til … Højesteret»
- **Bogreference:** PDF 66 / trykt 66, l. 9-40; PDF 69 / trykt 69, l. 29-40; PDF 68 / trykt 68, l. 53-59
- **Forslag/note:** Rækken 'Domstolene: Byret → Landsret → Højesteret' antyder en fast stige; bogen: kun sager startet i landsretten kan normalt ankes til Højesteret. Tilføj nuance.

#### G:fg-tal · `data/fact_groups.json:588` · DIFFERS
- **Sitet siger:** ca. 70 % | Lønmodtagere i a-kasse; 3 ud af 4 | 15-64-årige med arbejde
- **Bogen siger:** «(se de enkelte clusters)»
- **Bogreference:** PDF 72 / trykt 72, l. 29; PDF 83 / trykt 83, l. 61-62; PDF 77 / trykt 77, l. 40; PDF 80 / trykt 80, l. 9; PDF 82 / trykt 82, l. 59; PDF 83 / trykt 83, l. 57; PDF 6 / trykt 6, l. 6-10; PDF 8 / trykt 8, l. 50-52; PDF 27 / trykt 27, l. 9-10; PDF 27 / trykt 27, l. 43-47; PDF 64 / trykt 64, l. 22-25; PDF 106 / trykt 106, l. 24-25; PDF 105 / trykt 105, l. 36-37; PDF 106 / trykt 106, l. 36; PDF 146 / trykt 146, l. 9-10; PDF 82 / trykt 82, l. 45-54; PDF 120 / trykt 120, l. 34-36; PDF 118 / trykt 118, l. 27-28
- **Forslag/note:** Rækken 'ca. 70 % lønmodtagere i a-kasse' står ikke i bogen (kun 68 % fagforening, S24 l.61); rækken '3 ud af 4 af 15-64-årige' afviger fra bogens 73 % af 16-66-årige (S22 l.58-59). Øvrige rækker bekræftet. 'Siden 1. juni 2025' (abort) står ikke i bogen.

#### C:dem-anke · `data/clusters.json:1639` · DIFFERS
- **Sitet siger:** En dom fra byretten kan ankes til landsretten. (svar: Landsretten)
- **Bogen siger:** «Når der er givet en dom i byretten, kan man normalt anke dommen til landsretten … Når en sag er anket til landsretten, og landsretten har truffet en beslutning, kan sagen som regel ikke ankes til … Højesteret. Hvis en sag er startet med behandling i landsretten, kan den derimod som regel ankes til Højesteret»
- **Bogreference:** PDF 69 / trykt 69, l. 32-40
- **Forslag/note:** Svaret 'landsretten' er rigtigt. Men trap-noten 'byret → landsret → Højesteret, ét trin op ad gangen' er vildledende: bogen siger at en sag, der er anket fra byret til landsret, som regel IKKE kan ankes videre til Højesteret. Ret trap-noten (og I:demokrati:3 / G:fg-magt).

#### C:his-1864 · `data/clusters.json:1903` · DIFFERS
- **Sitet siger:** I 1864 mistede Danmark Slesvig og Holsten efter krigen mod Preussen og Østrig. (svar: Slesvig (og Holsten))
- **Bogen siger:** «I forbindelse med en krig mellem Det Tyske Forbund og Danmark i 1864 mistede Danmark de to hertugdømmer Slesvig og Holsten»
- **Bogreference:** PDF 113 / trykt 113, l. 9-11
- **Forslag/note:** Fact siger 'krigen mod Preussen og Østrig'; bogen siger 'Det Tyske Forbund'. Svaret (Slesvig/Holsten) er rigtigt. Foreslå: 'efter krigen mod Det Tyske Forbund (ledet af Preussen og Østrig)'. Korrektionen af nøgle-fejlen 2017-11 spm. 23 (C = Slesvig og Holsten) bekræftes af bogen (S113 l.9-11 vs. S111 l.20-22: Skåne/Halland/Blekinge = 1658).

#### C:his-tyrkiet · `data/clusters.json:3959` · DIFFERS
- **Sitet siger:** I slutningen af 1960'erne kom der mange indvandrere (gæstearbejdere) fra Tyrkiet. (svar: Tyrkiet)
- **Bogen siger:** «Der blev også hentet arbejdskraft i udlandet … De fleste kom fra Tyrkiet, ex-Jugoslavien eller Pakistan»
- **Bogreference:** PDF 117 / trykt 117, l. 29-35
- **Forslag/note:** Bogen nævner Tyrkiet blandt tre lande og dateres 'fra 1960'erne' – ikke 'slutningen af 1960'erne'. Svaret Tyrkiet er rimeligt, men fact bør lyde: 'Fra 1960'erne kom mange fra Tyrkiet, ex-Jugoslavien og Pakistan.'

#### I:arbejde:3 · `data/topics.json:259` · DIFFERS
- **Sitet siger:** Ca. 3 ud af 4 mellem 15 og 64 år har et arbejde.
- **Bogen siger:** «Cirka 73 procent af borgerne i Danmark mellem 16 og 66 år har et lønmodtagerarbejde»
- **Bogreference:** PDF 22 / trykt 22, l. 58-59; PDF 28 / trykt 28, l. 41-44; PDF 25 / trykt 25, l. 11-13; PDF 58 / trykt 58, l. 57; PDF 27 / trykt 27, l. 34-38
- **Forslag/note:** Ret til: 'Ca. 73 % af de 16-66-årige har et lønmodtagerarbejde' (bogen). Resten af afsnittet er korrekt.

#### C:arb-tillidsrepraesentant · `data/clusters.json:476` · DIFFERS
- **Sitet siger:** Tillidsrepræsentanten vælges af medarbejderne (de ansatte). (svar: Medarbejderne)
- **Bogen siger:** «Medlemmerne af en fagforening vælger en eller flere tillidsrepræsentanter … Tillidsrepræsentanter vælges blandt medarbejderne på et møde, hvor arbejdsgiveren ikke er med»
- **Bogreference:** PDF 25 / trykt 25, l. 42-46; PDF 25 / trykt 25, l. 58-63
- **Forslag/note:** Bogen: valgt af fagforeningens medlemmer på arbejdspladsen (klubmøde), uden arbejdsgiveren. Svaret 'medarbejderne' er rigtigt i spørgsmålet, men fact bør præcisere 'fagforeningens medlemmer blandt medarbejderne'.

#### C:arb-beskaeftigelse · `data/clusters.json:6727` · DIFFERS
- **Sitet siger:** Ca. tre ud af fire danskere mellem 15 og 64 år har et arbejde. (svar: Cirka tre ud af fire)
- **Bogen siger:** «Cirka 73 procent af borgerne i Danmark mellem 16 og 66 år har et lønmodtagerarbejde»
- **Bogreference:** PDF 22 / trykt 22, l. 58-59; PDF 120 / trykt 120, l. 28-30
- **Forslag/note:** Bogen: ca. 73 % af de 16-66-årige har lønmodtagerarbejde (≈ tre ud af fire). Site: 15-64 år og 'har et arbejde'. Tilpas aldersgruppen/ordlyden eller henvis til S22.

#### I:uddannelse:1 · `data/topics.json:365` · DIFFERS
- **Sitet siger:** vuggestue (0-3 år) ... Næsten alle børn mellem 3 og 5 år bliver passet uden for hjemmet.
- **Bogen siger:** «De fleste børn mellem tre og fem år passes uden for hjemmet … En vuggestue er for børn fra cirka seks måneder og op til cirka tre år»
- **Bogreference:** PDF 18 / trykt 18, l. 12-14; PDF 18 / trykt 18, l. 38-56; PDF 19 / trykt 19, l. 9; PDF 77 / trykt 77, l. 45-57
- **Forslag/note:** Ret 'Næsten alle børn' til 'de fleste børn' og 'vuggestue (0-3 år)' til 'fra ca. 6 måneder til ca. 3 år'.

#### I:uddannelse:2 · `data/topics.json:369` · DIFFERS
- **Sitet siger:** Børn begynder i 0. klasse, når de er 5-6 år.
- **Bogen siger:** «Børnene starter i børnehaveklassen, når de er omkring seks år gamle»
- **Bogreference:** PDF 6 / trykt 6, l. 6-10; PDF 6 / trykt 6, l. 29-31; PDF 10 / trykt 10, l. 23-24; PDF 8 / trykt 8, l. 6-10; PDF 10 / trykt 10, l. 30-31
- **Forslag/note:** Tilføj bogens 'omkring seks år' (site: '5-6 år'). Resten er korrekt.

#### G:fg-boernepasning · `data/fact_groups.json:1788` · DIFFERS
- **Sitet siger:** Dagpleje 0-3 år; Vuggestue 0-3 år; 0. klasse 5-6 år
- **Bogen siger:** «En vuggestue er for børn fra cirka seks måneder og op til cirka tre år … dagpleje typisk fra ca. seks måneder til ca. tre år … omkring seks år»
- **Bogreference:** PDF 18 / trykt 18, l. 38-56; PDF 19 / trykt 19, l. 9; PDF 6 / trykt 6, l. 29-31; PDF 6 / trykt 6, l. 6-10; PDF 8 / trykt 8, l. 39-41; PDF 10 / trykt 10, l. 30-31; PDF 45 / trykt 45, l. 20-21
- **Forslag/note:** Ret 0-3 år → 'fra ca. 6 måneder til ca. 3 år' (dagpleje og vuggestue); skolestart 'omkring seks år'.

#### C:udd-boernehave-vuggestue · `data/clusters.json:2621` · DIFFERS
- **Sitet siger:** Børn på 0-3 år går i vuggestue. Børn på 3-6 år går i børnehave. (svar: Børnehave (4 år). Vuggestue (2 år).)
- **Bogen siger:** «En vuggestue er for børn fra cirka seks måneder og op til cirka tre år … En børnehave er for børn fra ca. tre år og op til seks år»
- **Bogreference:** PDF 18 / trykt 18, l. 38; PDF 19 / trykt 19, l. 9
- **Forslag/note:** Fact siger vuggestue '0-3 år'; bogen siger fra ca. 6 måneder til ca. 3 år (børnehave 3-6). Svarene (4 år = børnehave, 2 år = vuggestue) er rigtige.

#### C:udd-skolestart · `data/clusters.json:6247` · DIFFERS
- **Sitet siger:** Børn begynder normalt i skole (0. klasse), når de er 5-6 år. (svar: 5-6 år)
- **Bogen siger:** «Børnene starter i børnehaveklassen, når de er omkring seks år gamle»
- **Bogreference:** PDF 6 / trykt 6, l. 29-31
- **Forslag/note:** Bogen: 'omkring seks år'; site/prøve: '5-6 år'. Svaret er fortsat det eneste mulige i prøven, men tilføj bogens formulering.

#### C:udd-boern-passes · `data/clusters.json:7509` · DIFFERS
- **Sitet siger:** Næsten alle børn mellem 3 og 5 år bliver passet uden for hjemmet. (svar: Næsten alle)
- **Bogen siger:** «De fleste børn mellem tre og fem år passes uden for hjemmet»
- **Bogreference:** PDF 18 / trykt 18, l. 12-14
- **Forslag/note:** Prøvesvaret 'Næsten alle' (2019) vs. bogens 'de fleste'. Rettes til 'de fleste' eller marker som prøvens formulering.

### Spørgsmål med status DIFFERS (4)

| ID | fil:linje | Sitet siger (spørgsmål → facit) | Bogreference | Note |
|---|---|---|---|---|
| Q:2025-11-q3 | `data/questions.json:14302` | Hvor mange borgere i Danmark mellem 15 og 64 år har et arbejde? → Cirka tre ud af fire | PDF 22 / trykt 22, l. 58-59; PDF 120 / trykt 120, l. 28-30 | Bogen: ca. 73 % af de 16-66-årige har lønmodtagerarbejde (≈ tre ud af fire). Site: 15-64 år og 'har et arbejde'. Tilpas aldersgruppen/ordlyden eller henvis til S22. |
| Q:2018-11-q20 | `data/questions.json:3773` | Hvor gamle er børn normalt, når de begynder i skolen? → 5-6 år | PDF 6 / trykt 6, l. 29-31 | Bogen: 'omkring seks år'; site/prøve: '5-6 år'. Svaret er fortsat det eneste mulige i prøven, men tilføj bogens formulering. |
| Q:2021-06-q18 | `data/questions.json:7667` | Hvor gamle er børn normalt, når de begynder i 0. klasse i skolen? → 5-6 år | PDF 6 / trykt 6, l. 29-31 | Bogen: 'omkring seks år'; site/prøve: '5-6 år'. Svaret er fortsat det eneste mulige i prøven, men tilføj bogens formulering. |
| Q:2019-11-q13 | `data/questions.json:5157` | Hvor mange børn mellem tre og fem år passes uden for hjemmet? → Næsten alle | PDF 18 / trykt 18, l. 12-14 | Prøvesvaret 'Næsten alle' (2019) vs. bogens 'de fleste'. Rettes til 'de fleste' eller marker som prøvens formulering. |

## NOT IN BOOK (50)

#### G:fg-hoejtider · `data/fact_groups.json:1274` · NOT IN BOOK
- **Sitet siger:** Kristi himmelfart | En torsdag, 40. dag efter påske; Store Bededag | – | Afskaffet som helligdag fra 2024
- **Bogen siger:** «Fastelavn … Påske … Pinse … 5. maj … grundlovsdag … sankthans … nytår»
- **Bogreference:** PDF 128 / trykt 128, l. 27 – PDF 130 / trykt 130, l. 43
- **Forslag/note:** Rækkerne 'Kristi himmelfart (40. dag efter påske)' og 'Store Bededag – afskaffet 2024' står ikke i bogen. Øvrige rækker bekræftet (fastelavn S128 l.36-43; påske S129 l.10-11; pinse S129 l.20-25; 5. maj S129 l.36-42; grundlovsdag S129 l.45-55; sankthans S129 l.58-66; nytår S130 l.32-43).

#### C:dem-stoerste-parti-2022 · `data/clusters.json:5493` · NOT IN BOOK
- **Sitet siger:** Socialdemokratiet fik flest stemmer ved folketingsvalget i 2022. (svar: Socialdemokratiet)
- **Bogen siger:** «Ved folketingsvalget i 2026 … Partierne er oplistet efter, hvor mange stemmer de fik: Socialdemokratiet, SF, Venstre …»
- **Bogreference:** PDF 85 / trykt 85, l. 27-29
- **Forslag/note:** Bogen nævner kun valget i 2026 (S størst, S85 l.29) – ikke 2022. Current-noten om 2026 er bekræftet.

#### C:geo-region-hovedstaden · `data/clusters.json:7781` · NOT IN BOOK
- **Sitet siger:** Region Hovedstaden er den største region med ca. 1,9 millioner indbyggere (per 2026). (svar: Ca. 1,7 millioner (prøvens svar i 2018) – i dag ca. 1,9 millioner)
- **Bogen siger:** «Region Hovedstaden (København og omegn, Nordsjælland og Bornholm) … cirka to millioner mennesker … i hovedstadsområdet»
- **Bogreference:** PDF 80 / trykt 80, l. 9-11; PDF 106 / trykt 106, l. 38-41
- **Forslag/note:** Bogen oplyser ikke indbyggertal for Region Hovedstaden (kun ca. 2 mio. i 'hovedstadsområdet'). '1,9 mio. per 2026' kan ikke verificeres. Bemærk: Region Hovedstaden og Region Sjælland lægges sammen 1.1.2027 (S80 l.22-23).

#### I:arbejde:2 · `data/topics.json:255` · NOT IN BOOK
- **Sitet siger:** ...for at få dagpenge ... skal man være medlem af en a-kasse – ca. 70 % af lønmodtagerne er med.
- **Bogen siger:** «omkring to ud af tre (68 procent) lønmodtagere medlem af en fagforening … de fleste er medlem af en a-kasse»
- **Bogreference:** PDF 24 / trykt 24, l. 57-62; PDF 25 / trykt 25, l. 42-46; PDF 28 / trykt 28, l. 60-63
- **Forslag/note:** 'ca. 70 % af lønmodtagerne er med i a-kasse' står ikke i bogen; bogen giver 68 % for FAGFORENING. Verificér eller fjern. 'Medarbejderne vælger tillidsrepræsentant': se C:arb-tillidsrepraesentant.

#### C:arb-akasse-procent · `data/clusters.json:6472` · NOT IN BOOK
- **Sitet siger:** Ca. 70 % af lønmodtagerne er medlem af en a-kasse (prøvens svar). (svar: Ca. 70 %)
- **Bogen siger:** «omkring to ud af tre (68 procent) lønmodtagere medlem af en fagforening … de fleste er medlem af en a-kasse»
- **Bogreference:** PDF 24 / trykt 24, l. 60-63; PDF 28 / trykt 28, l. 63
- **Forslag/note:** Bogen angiver ingen procentandel for a-kasse-medlemskab – kun 68 % for FAGFORENING (S24 l.61-62). Verificér mod anden kilde eller fjern tallet; undgå at forveksle med fagforenings-andelen.

#### F:velfaerd:1 · `data/topics.json:318` · NOT IN BOOK
- **Sitet siger:** (hele elementet – se inventory)
- **Bogen siger:** «Alle kvinder har ret til at holde fri … Barnets far har også ret til at gå på barsel»
- **Bogreference:** PDF 44 / trykt 44, l. 6-13
- **Forslag/note:** Hverken '11 øremærkede uger' eller '2 uger omkring fødslen' står i bogen.

#### C:vel-faedreorlov · `data/clusters.json:4751` · NOT IN BOOK
- **Sitet siger:** Fædre har ret til orlov. Faren har ret til 2 uger lige efter fødslen, og siden 2022 har hver forælder 11 øremærkede uger. (svar: Ja)
- **Bogen siger:** «Alle kvinder har ret til at holde fri fra arbejde i en periode, før og efter at de har født. Barnets far har også ret til at gå på barsel.»
- **Bogreference:** PDF 44 / trykt 44, l. 6-10
- **Forslag/note:** Kun princippet (far har ret til orlov) står i bogen. '2 uger lige efter fødslen' og '11 øremærkede uger siden 2022' står IKKE i bogen – kan ikke verificeres.

#### F:traditioner:1 · `data/topics.json:459` · NOT IN BOOK
- **Sitet siger:** (hele elementet – se inventory)
- **Bogen siger:** «Påskedagene er palmesøndag, skærtorsdag, langfredag, påskedag og 2. påskedag. Alle disse dage er helligdage»
- **Bogreference:** PDF 128 / trykt 128, l. 59-62
- **Forslag/note:** Store Bededag nævnes ikke i bogen; kan hverken bekræftes eller afkræftes (afskaffelse fra 2024 er historisk korrekt men ikke i materialet).

### Meta-poster (app-/UI-tekst, ikke bogindhold): H:1, H:2, H:3, H:4, H:5, H:6, H:7, H:8, H:9, H:10, H:12, H:13, H:14, H:15, H:16, H:17, H:18, H:19, H:20, H:21, H:22, H:23, H:24, H:25, H:26, H:27, H:29, H:30, H:31, H:32, H:33, H:34, H:35, H:36, H:39, H:40

| ID | fil:linje | Sitet siger |
|---|---|---|
| H:1 | `index.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:2 | `exams.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:3 | `quiz.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:4 | `study.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:5 | `learn.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:6 | `top15.html:54` | <p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p> |
| H:7 | `js/exams.js:9` | var PASS = 20; |
| H:8 | `js/exams.js:10` | var KEY_ERROR_EXAM = "2017-11"; |
| H:9 | `js/exams.js:29` | main.appendChild(bi("De 20 rigtige prøver", "The 20 real exams", "h1")); |
| H:10 | `js/exams.js:31` | "Alle officielle prøver fra december 2016 til juni 2026, med rettenøgle. Du kan også øve hver prøve her på siden.", |
| H:12 | `js/exams.js:83` | left.push(h("span", { class: "pill-keyerr" }, MBP.icon("flag", 13), "Fejl i svar-arket, spm. 23")); |
| H:13 | `js/home.js:14` | var exam = Date.UTC(2026, 10, 25); |
| H:14 | `js/home.js:73` | "Dagens kurs er 10 emner. For at nå alle " + total + " inden prøven: ca. " + perDay + " om dagen.", |
| H:15 | `js/home.js:87` | "Onsdag 25. november 2026", |
| H:16 | `js/home.js:54` | var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dag |
| H:17 | `js/home.js:54` | var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dag |
| H:18 | `js/store.js:11` | var GOAL = 25; |
| H:19 | `js/quiz.js:8` | var EXAM_LENGTH = 25; |
| H:20 | `js/quiz.js:9` | var EXAM_PASS = 20; |
| H:21 | `js/quiz.js:10` | var NORMAL_PASS_PERCENT = 80; |
| H:22 | `js/quiz.js:236` | "25 spørgsmål som til den rigtige prøve. Du ser svarene til sidst. Bestået ved 20 rigtige.", |
| H:23 | `js/quiz.js:236` | "25 spørgsmål som til den rigtige prøve. Du ser svarene til sidst. Bestået ved 20 rigtige.", |
| H:24 | `js/quiz.js:565` | bi("Øv dine fejl, og prøv igen. Grænsen er 20 rigtige.", "Practise your mistakes and try again. The pass mark is 20 correct.", "span"))); |
| H:25 | `js/quiz.js:249` | bi("Kun ofte stillede (stillet i 4+ prøver)", "Only frequently asked (asked in 4+ exams)", "span")), |
| H:26 | `js/quiz.js:113` | MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers"); |
| H:27 | `js/learn.js:213` | MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers"); |
| H:29 | `js/top15.js:21` | "Spørgsmålene, der er kommet flest gange i de 20 prøver.", |
| H:30 | `README.md:7` | The content is built from all 20 official exams, December 2016 to June 2026. All text is Danish, with an English line under it. |
| H:31 | `README.md:13` | - **I dag / Today** – the countdown to the exam (25 Nov 2026) and today's stamps, then two buttons: **Lær / Learn** (choose a topic) and **T |
| H:32 | `README.md:16` | - **Test** – a quiz by topic, "most-asked only", or a real 25-question exam simulation (pass at 20/25). Your latest results are shown at the |
| H:33 | `README.md:39` | - **500 questions** in 'data/questions.json' |
| H:34 | `README.md:40` | - **168 clusters** (groups of questions about the same fact) in 'data/clusters.json' |
| H:35 | `README.md:41` | - **10 topics** in 'data/topics.json' |
| H:36 | `README.md:42` | - **15 fact groups** (the overview tables) in 'data/fact_groups.json' |
| H:39 | `exams/INDEX.md:7` | Question counts were filled in by the transcription step (see data/TRANSCRIPTION_REPORT.md): every exam has 25 questions, with 2 or 3 answer |
| H:40 | `exams/INDEX.md:5` | Downloaded 2026-11-09. All 20 sessions from 2016-12 to 2026-06 have both an exam and an answer key. No answer key is missing. |

Begrundelse: ingen af disse indeholder en påstand om Danmark, som bogen kan bekræfte (bestået-grænse, antal spørgsmål, datoer, tællere, footer, README-tal). Footeren 'Fakta per november 2026' bør sammenholdes med at bogen er udgivet august 2026 (PDF 1-2). Rettenøgle-fejlen 2017-11 (H:11/12/28/37/38): se OK-posterne.

### Spørgsmål med status NOT IN BOOK (6)

| ID | fil:linje | Sitet siger (spørgsmål → facit) | Bogreference | Note |
|---|---|---|---|---|
| Q:2023-11-q7 | `data/questions.json:11244` | Hvilket parti fik flest stemmer ved folketingsvalget i 2022? → Socialdemokratiet | PDF 85 / trykt 85, l. 27-29 |  |
| Q:2025-05-q19 | `data/questions.json:14005` | Hvilket parti fik flest stemmer ved folketingsvalget i 2022? → Socialdemokratiet | PDF 85 / trykt 85, l. 27-29 |  |
| Q:2018-11-q2 | `data/questions.json:3194` | Hvor mange mennesker bor der i Region Hovedstaden? → Ca. 1,7 millioner | PDF 80 / trykt 80, l. 9-11; PDF 106 / trykt 106, l. 38-41 |  |
| Q:2017-11-q11 | `data/questions.json:1888` | Hvor mange procent af lønmodtagerne i Danmark er medlem af en a-kasse? → Ca. 70 % | PDF 24 / trykt 24, l. 60-63; PDF 28 / trykt 28, l. 63 |  |
| Q:2018-11-q19 | `data/questions.json:3740` | Hvor mange procent af lønmodtagerne i Danmark er medlem af en a-kasse? → Ca. 70 % | PDF 24 / trykt 24, l. 60-63; PDF 28 / trykt 28, l. 63 |  |
| Q:2017-11-q19 | `data/questions.json:2142` | Hvor mange ugers fædreorlov har fædre ret til efter fødslen? → 2 uger | PDF 44 / trykt 44, l. 6-10 |  |

---

# Reference-tabel: alle poster → bogside og linjer

Bruges til 'læs mere i bogen'-ikonet. *Sider* er PDF = trykt sidetal (offset 0). *Linjer* står som `side:linjer` og refererer til `bookdump/pages/page-NNN.txt`. Spørgsmål peger på samme sted som deres cluster (`cluster_id` i `questions.json`). To på hinanden følgende poster på samme linje-række (fx `27:36; 28:2`) kan betyde et interval over en sidegrænse (side 27 l.36 til side 28 l.2).

## Clusters (fakta)

| ID | Status | Sider | Linjer |
|---|---|---|---|
| C:dem-rettigheder | OK | 63, 89 | 63:24-56; 89:39-49 |
| C:dem-kommunerne-boern | OK | 77 | 77:45-57 |
| C:dem-2-og-2 | OK | 72, 83 | 72:29-32; 83:12-14 |
| C:dem-forening | OK | 47 | 47:33-37 |
| C:dem-179 | OK | 72, 83 | 72:29; 83:12-14 |
| C:dem-grundlov-1953 | OK | 62 | 62:45-47 |
| C:dem-kommuner-98 | OK | 77, 83 | 77:40; 83:37 |
| C:dem-statsborger-stemme | OK | 82, 83 | 82:61-66; 83:29-33 |
| C:dem-anke | DIFFERS | 69 | 69:32-40 |
| C:dem-betinget | OK | 70 | 70:10-18 |
| C:dem-folketingsvalg | OK | 82 | 82:59-61 |
| C:dem-grundlov-1849 | OK | 62, 112 | 62:45; 112:44 |
| C:dem-straffeattest | OK | 70 | 70:32-37 |
| C:dem-valgdeltagelse | OK | 82, 100 | 82:45-54; 100:21-24 |
| C:dem-borgmester | OK | 79 | 79:10-12 |
| C:dem-regioner-5 | OK | 80, 83 | 80:9; 83:47 |
| C:dem-1915 | OK | 59, 63 | 59:37-43; 63:19-21 |
| C:dem-doemmende | OK | 66 | 66:34-36 |
| C:dem-kommunalvalg | OK | 77, 83 | 77:24-27; 83:25 |
| C:dem-lovgivende | OK | 66 | 66:12-18 |
| C:dem-kvinder-folketing | OUTDATED | 59, 83 | 59:45-46; 83:14-20 |
| C:dem-regionerne-sygehuse | OK | 54, 80 | 80:25-27; 54:19-20 |
| C:dem-parti | OK | 85 | 85:23-25, 85:55-59 |
| C:dem-domstole-uafhaengige | OK | 66, 69 | 66:34-40; 69:22-27 |
| C:dem-folkeafstemning-grundlov | OK | 63 | 63:6-13 |
| C:dem-moms | OK | 39 | 39:28-31 |
| C:dem-1849-ikke-kvinder | OK | 59, 63, 112 | 59:33-35; 112:49-51; 63:21-23 |
| C:dem-regering | OUTDATED | 75 | 75:25-27, 75:36-45 |
| C:dem-stoerste-parti-2022 | NOT IN BOOK | 85 | 85:27-29 |
| C:dem-demonstration | OK | 63, 87 | 63:46-51; 87:21-23 |
| C:dem-anholdt-24t | OK | 64, 68 | 64:22-25; 68:53-59 |
| C:dem-forfatning | OK | 62 | 62:29-30 |
| C:dem-hemmelig-stemme | OK | 62, 84 | 84:9-10; 62:13 |
| C:dem-udskriver-valg | OK | 82 | 82:59-61 |
| C:dem-regeringsdannelse | OK | 65, 72 | 72:42-43; 65:23-26 |
| C:kon-rigsfaellesskab | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| C:kon-nytaarstale | OUTDATED | 65, 130 | 65:39-41; 130:32-42 |
| C:kon-arv | OK | 65, 111 | 65:12-20; 111:43-46 |
| C:kon-rolle | OK | 65, 66 | 65:22-26; 66:21-25 |
| C:kon-konge | OK | 65 | 65:12-19 |
| C:kon-kronprins | OK | 65 | 65:19; 65:36 |
| C:kon-thule | OK | 136 | 136:20-25 |
| C:his-foerste-kvindelige-sm | OK | 59 | 59:53-55 |
| C:his-reformation | OK | 93, 110 | 110:37-42; 93:33-35 |
| C:his-besat-aar | OK | 114 | 114:20-21 |
| C:his-1864 | DIFFERS | 113 | 113:9-11 |
| C:his-besat-krig | OK | 114 | 114:20-21 |
| C:his-tyrkiet | DIFFERS | 117 | 117:29-35 |
| C:his-besat-land | OK | 114 | 114:20-21 |
| C:his-foerste-kvindelige-sm-aar | OK | 59 | 59:54-55 |
| C:his-jernbaner | OK | 113 | 113:27-28 |
| C:his-venstre-1870 | OK | 113 | 113:41-42 |
| C:his-1814-norge | OK | 110 | 110:30-34 |
| C:his-befrielse | OK | 114, 129 | 114:30; 129:36-38 |
| C:his-terror-2015 | OK | 140 | 140:40-45 |
| C:his-aeldste-parti | OK | 113, 119 | 113:40-44; 119:37-39 |
| C:his-1658 | OK | 111 | 111:20-22 |
| C:his-marshall | OK | 116 | 116:28-31 |
| C:his-roedstroemper | OK | 118, 153 | 118:23-25; 153:40-41 |
| C:his-1960erne | OK | 117 | 117:9-19 |
| C:his-s-regering-1929-82 | OK | 118 | 118:58-61 |
| C:his-landboreformer | OK | 111 | 111:55-62 |
| C:geo-hoejeste-punkt | OK | 106 | 106:24-25 |
| C:geo-lillebaelt | OK | 105 | 105:47 |
| C:geo-oresund | OK | 105 | 105:48-49 |
| C:geo-storebaelt | OK | 105 | 105:47-48 |
| C:geo-aarhus | OK | 106 | 106:43-44 |
| C:geo-esbjerg | OK | 106 | 106:46-47 |
| C:geo-sydligste | OK | 105 | 105:65-66 |
| C:geo-landbrug | OK | 146 | 146:9-10 |
| C:geo-aalborg | OK | 106 | 106:45-46 |
| C:geo-grenen | OK | 105 | 105:63-64 |
| C:geo-odense | OK | 106 | 106:44-45 |
| C:geo-lillebaeltsbro | OK | 105 | 105:57 |
| C:geo-indbyggere | OK | 106, 108 | 106:36; 108:6-10 |
| C:geo-areal | OK | 105 | 105:36-37 |
| C:geo-indvandrere | OUTDATED | 106 | 106:36-37 |
| C:geo-region-hovedstaden | NOT IN BOOK | 80, 106 | 80:9-11; 106:38-41 |
| C:arb-tillidsrepraesentant | DIFFERS | 25 | 25:42-46; 25:58-63 |
| C:arb-vestas | OK | 32 | 32:40-41 |
| C:arb-novo | OK | 32 | 32:27-29 |
| C:arb-37-timer | OK | 27 | 27:9-10; 27:28 |
| C:arb-akasse-dagpenge | OK | 23, 28 | 23:18-21; 28:60-63 |
| C:arb-overenskomst | OK | 22, 23 | 22:35-37; 23:34-44 |
| C:arb-ferie | OK | 27 | 27:43-47 |
| C:arb-lego | OK | 32 | 32:23-25 |
| C:arb-gravid | OK | 28 | 28:43-44 |
| C:arb-fagforening-pris | OK | 24 | 24:57-58 |
| C:arb-samarbejdsudvalg | OK | 27, 28 | 27:63; 28:10 |
| C:arb-deltid | OK | 27 | 27:34-38 |
| C:arb-landmaend | OK | 31 | 31:28-33 |
| C:arb-vindenergi | OK | 144 | 144:54-57 |
| C:arb-fagforening-fyre | OK | 25, 28 | 25:11-13; 28:46-48 |
| C:arb-akasse-procent | NOT IN BOOK | 24, 28 | 24:60-63; 28:63 |
| C:arb-beskaeftigelse | DIFFERS | 22, 120 | 22:58-59; 120:28-30 |
| C:arb-ligeloen | OK | 58, 118 | 58:57; 118:30-32 |
| C:vel-bibliotek | OK | 38, 51 | 38:46-47; 51:9-12 |
| C:vel-gift-18 | OK | 41 | 41:63-64 |
| C:vel-vaccine | OK | 55 | 55:33-38 |
| C:vel-tandlaege | OK | 53, 55 | 55:9-20; 53:10-13 |
| C:vel-myndig-18 | OK | 45 | 45:18-19 |
| C:vel-slaa-boern | OK | 44, 118 | 44:41; 118:20-21 |
| C:vel-barsel-stoette | OK | 44 | 44:6-13 |
| C:vel-faedreorlov | NOT IN BOOK | 44 | 44:6-10 |
| C:vel-sundhed-skat | OK | 35, 53 | 53:6-11; 35:63-64 |
| C:vel-cigaretter-18 | OK | 44, 55 | 55:54; 44:46-47 |
| C:vel-samme-koen | OK | 41, 42 | 41:57-59; 42:27-28 |
| C:vel-laege | OK | 38, 53 | 38:23-24; 53:45-46 |
| C:vel-abort | OK | 44, 118 | 44:18-19; 118:25-28 |
| C:vel-koerekort-17 | WRONG | 45 | 45:29-33 |
| C:vel-levetid | OK | 120 | 120:34-36 |
| C:vel-boligstoette | OK | 38 | 38:9-11 |
| C:vel-foraeldremyndighed | OK | 42 | 42:30-31 |
| C:vel-oel-vin-16 | OUTDATED | 44, 55 | 44:45-47; 55:52-55 |
| C:udd-undervisningspligt | OK | 6 | 6:6-10; 6:29-33 |
| C:udd-karakter-12 | OK | 8 | 8:50-52 |
| C:udd-gymnasium-gratis | OK | 12 | 12:55 |
| C:udd-friskole-betale | OK | 6, 10 | 6:13-15; 10:23-24 |
| C:udd-boernehave-vuggestue | DIFFERS | 18, 19 | 18:38; 19:9 |
| C:udd-su-18 | OK | 45 | 45:18-21 |
| C:udd-efterskole | OK | 10 | 10:30-31 |
| C:udd-skolestart | DIFFERS | 6 | 6:29-31 |
| C:udd-folkeskole-flest | OK | 6, 10, 77 | 6:10; 10:9; 77:49-57 |
| C:udd-karakterer-8-klasse | OK | 8 | 8:39-41 |
| C:udd-boern-passes | DIFFERS | 18 | 18:12-14 |
| C:udd-dagpleje | OK | 18 | 18:54-57 |
| C:udd-laege-universitet | OK | 15 | 15:25-27 |
| C:udd-elektriker | OK | 13, 14 | 13:39; 14:14 |
| C:udd-skolebestyrelse | OK | 8, 9 | 8:6-10; 9:49-52 |
| C:kul-hca-levede | OK | 123 | 123:35 |
| C:kul-grimme-aelling | OK | 123 | 123:38-40 |
| C:kul-druk | OK | 125 | 125:9-11 |
| C:kul-yahya-hassan | OK | 126 | 126:25-28 |
| C:kul-kroeyer | OK | 123 | 123:53-55 |
| C:kul-aqua | OK | 125 | 125:36-37 |
| C:kul-kierkegaard | OK | 123 | 123:43-44 |
| C:kul-grundtvig | OK | 50 | 50:33-40 |
| C:kul-blixen | OK | 124 | 124:21-30 |
| C:kul-arne-jacobsen | OK | 124 | 124:42-57 |
| C:kul-holberg | OK | 123 | 123:21-30 |
| C:kul-bier-vinterberg | OK | 125 | 125:9 |
| C:kul-carl-nielsen | OK | 124 | 124:9 |
| C:tra-grundlovsdag | OK | 129 | 129:45-55 |
| C:tra-sankthans | OK | 129 | 129:58-66 |
| C:tra-fastelavn | OK | 128 | 128:27-43 |
| C:tra-folkekirke-flertal | OK | 93 | 93:43 |
| C:tra-pinse | OK | 129 | 129:20-25 |
| C:tra-paaske | OK | 129 | 129:10-11 |
| C:tra-begravet | OK | 94 | 94:26-27 |
| C:tra-gift-kirke | OK | 94 | 94:25-26 |
| C:ver-bosnien | OK | 133 | 133:37-40 |
| C:ver-fn-1945 | OK | 101, 133 | 101:9-10; 133:6 |
| C:ver-nato-medlem | OK | 133 | 133:6-11 |
| C:ver-vaernepligt | OK | 89 | 89:36-39 |
| C:ver-nato-1949 | OK | 116, 133 | 116:17-18; 133:10 |
| C:ver-mep-antal | OUTDATED | 83, 100 | 83:61-62; 100:20-21 |
| C:ver-fn-medlem | OK | 101 | 101:9-10 |
| C:ver-ep-stemmeprocent | OK | 82, 100 | 100:21-24; 82:45-54 |
| C:ver-ep-valgt-af | OK | 100 | 100:14-19 |
| C:ver-tyskland-handel | OUTDATED | 32 | 32:53-61 |
| C:ver-vaernepligt-koen | OK | 90 | 90:31-32; 90:55-56 |
| C:ver-bistand-afrika | OK | 103 | 103:14-20 |
| C:ver-folkeafstemning-eu | OK | 75 | 75:53-55 |
| C:ver-vaernepligt-flere | OK | 91, 135 | 91:18-19; 135:25-26 |
| C:ver-irak | OK | 134 | 134:31-43 |
| C:ver-nato-forsvar | OK | 133, 135 | 133:6-12; 135:20-21 |
| C:ver-ep-valg-5-aar | OK | 83, 100 | 83:57; 100:20 |
| C:ver-eu-handel | OK | 97, 98 | 97:31-34; 98:23-24 |

## Intro-afsnit

| ID | Status | Sider | Linjer |
|---|---|---|---|
| I:demokrati:1 | OK | 62, 63, 112, 153 | 62:29-49; 63:6-13; 112:42-45; 153:34-37 |
| I:demokrati:2 | OK | 47, 63, 87, 89 | 63:24-56; 47:33-40; 87:21-23; 89:39-49 |
| I:demokrati:3 | DIFFERS | 66, 69 | 66:9-40; 69:32-40 |
| I:demokrati:4 | OK | 72, 82, 83, 84, 85 | 72:29-32; 82:59-66; 83:12-14; 84:6-10; 85:23-25; 72:42-43 |
| I:demokrati:5 | OK | 59, 63 | 59:37-43; 59:53-55; 63:19-21 |
| I:demokrati:6 | OK | 77, 79, 80 | 77:40; 77:45-57; 79:10-12; 80:9, 80:25-27; 77:24-27 |
| I:demokrati:7 | OK | 39, 64, 68, 70 | 64:22-25; 68:53-59; 70:10-18; 70:32-37; 39:28-31 |
| I:kongehus:1 | OK | 65 | 65:6-20; 65:35-37 |
| I:kongehus:2 | OK | 65, 130 | 65:22-26; 65:40-41; 130:32-42 |
| I:kongehus:3 | OK | 102, 105, 136 | 105:12-24; 102:31-33; 136:20-25 |
| I:historie:1 | OK | 110, 111 | 110:34-42; 111:20-22; 111:55-62 |
| I:historie:2 | OK | 112, 113 | 113:9-11; 113:27; 112:44; 113:41-42 |
| I:historie:3 | OK | 114, 116, 118 | 114:20-21; 114:30; 116:28-31; 118:58-60 |
| I:historie:4 | OK | 59, 117, 118, 140 | 117:9-19; 117:33-35; 118:23-25; 59:53-55; 140:40-45 |
| I:geografi:1 | OK | 39, 105 | 105:39-61; 39:9-10 |
| I:geografi:2 | OK | 105, 106, 146 | 106:24-25; 105:36-37; 146:9-10; 105:63-66 |
| I:geografi:3 | OK | 106 | 106:36; 106:43-47 |
| I:arbejde:1 | OK | 22, 27 | 22:35-37; 27:9-10; 27:43-47 |
| I:arbejde:2 | NOT IN BOOK | 24, 25, 28 | 24:57-62; 25:42-46; 28:60-63 |
| I:arbejde:3 | DIFFERS | 22, 25, 27, 28, 58 | 22:58-59; 28:41-44; 25:11-13; 58:57; 27:34-38 |
| I:arbejde:4 | OK | 31, 32, 144 | 32:27-29; 32:40-41; 32:23-25; 144:54-57; 31:31-33 |
| I:velfaerd:1 | OK | 38, 51, 53, 55 | 53:6-13; 38:23-24; 55:9-20; 55:33-38; 51:9-12 |
| I:velfaerd:2 | WRONG | 41, 44, 45, 55 | 44:45-47; 55:52-55; 45:29-33; 41:63-64; 45:18-19 |
| I:velfaerd:3 | OK | 38, 42, 44, 120 | 42:30-31; 44:41; 44:6-13; 38:9-11; 120:34-36 |
| I:uddannelse:1 | DIFFERS | 18, 19, 77 | 18:12-14; 18:38-56; 19:9; 77:45-57 |
| I:uddannelse:2 | DIFFERS | 6, 8, 10 | 6:6-10; 6:29-31; 10:23-24; 8:6-10; 10:30-31 |
| I:uddannelse:3 | OK | 8, 12, 13, 14, 15, 45 | 8:39-52; 12:55; 45:20-21; 13:39; 14:14; 15:25-27 |
| I:kultur:1 | OK | 50, 123, 124, 126 | 123:35-51; 123:21-30; 124:21-30; 126:25-28; 50:33-40 |
| I:kultur:2 | OK | 123, 124, 125 | 123:53-55; 124:9; 124:42-57; 125:9-11; 125:24-26; 125:36-37 |
| I:traditioner:1 | OK | 128, 129 | 128:36-43; 129:10-11; 129:20-22; 129:45-48; 129:58-66 |
| I:traditioner:2 | OK | 93, 94 | 93:43; 94:25-27 |
| I:verden:1 | WRONG | 32, 75, 98, 101, 133 | 32:53-61; 101:9; 133:6-11; 98:6; 75:53-55 |
| I:verden:2 | OK | 83, 100 | 100:14-24; 83:57 |
| I:verden:3 | OK | 89, 90, 91, 103, 133, 134 | 133:37-40; 134:31-43; 103:14-20; 89:36-39; 90:55-56; 91:18-19 |

## Current-fact-noter

| ID | Status | Sider | Linjer |
|---|---|---|---|
| F:demokrati:1 | OK | 75, 85 | 75:25-45; 85:27-29 |
| F:demokrati:2 | OUTDATED | 59, 83 | 59:45-46; 83:14-20 |
| F:kongehus:1 | OK | 65 | 65:12-19 |
| F:historie:1 | OK | 111, 113 | 113:9-11; 111:20-22 |
| F:geografi:1 | OUTDATED | 106 | 106:36-37 |
| F:velfaerd:1 | NOT IN BOOK | 44 | 44:6-13 |
| F:velfaerd:2 | OK | 44, 118 | 44:18-19; 118:25-28 |
| F:velfaerd:3 | OK | 55 | 55:9-20 |
| F:traditioner:1 | NOT IN BOOK | 128 | 128:59-62 |
| F:verden:1 | OK | 83, 100 | 83:61-62; 100:20-21 |

## Faktagrupper

| ID | Status | Sider | Linjer |
|---|---|---|---|
| G:fg-aarstal | OK | 59, 65, 110, 111, 113, 114, 116, 117, 118, 133, 134, 140 | 110:34-42; 111:20-22; 111:55-62; 113:9-11; 113:27; 113:41-42; 114:20-21; 114:30; 116:28-31; 117:33-35; 118:23-25; 59:37-43; 65:12-19; 133:37-40; 134:31-43; 140:40-45 |
| G:fg-hvem-styrer | OK | 77, 79, 80 | 77:40-57; 80:9-30; 79:10-12 |
| G:fg-magt | DIFFERS | 66, 68, 69 | 66:9-40; 69:29-40; 68:53-59 |
| G:fg-tal | DIFFERS | 6, 8, 27, 64, 72, 77, 80, 82, 83, 105, 106, 118, 120, 146 | 72:29; 83:61-62; 77:40; 80:9; 82:59; 83:57; 6:6-10; 8:50-52; 27:9-10; 27:43-47; 64:22-25; 106:24-25; 105:36-37; 106:36; 146:9-10; 82:45-54; 120:34-36; 118:27-28 |
| G:fg-valg | OK | 82, 83, 84, 100 | 82:59-66; 83:23-33; 83:55-62; 84:6-10; 100:21-24 |
| G:fg-hoejtider | NOT IN BOOK | 128, 130 | 128:27; 130:43 |
| G:fg-ja-nej | OK | 27, 44, 55, 59, 63, 70, 82, 105 | 63:46-51; 70:10-18; 82:61-66; 44:41; 59:33-35; 27:34-38; 105:12-14; 55:9-20 |
| G:fg-farvande | OK | 105 | 105:43-61 |
| G:fg-byer | OK | 105, 106 | 106:38-47; 105:63-66 |
| G:fg-virksomheder | OK | 31, 32, 33 | 32:23-29; 32:40-45; 31:41-44; 33:9-10 |
| G:fg-gratis | OK | 10, 12, 24, 38, 51, 54, 55 | 38:23-24; 54:20-21; 55:9-20; 55:33-38; 51:9-12; 12:55; 10:23-24; 24:57-58 |
| G:fg-aldre | WRONG | 6, 18, 44, 45, 55 | 44:45-47; 55:52-55; 45:29-33; 18:38; 6:29-31 |
| G:fg-boernepasning | DIFFERS | 6, 8, 10, 18, 19, 45 | 18:38-56; 19:9; 6:29-31; 6:6-10; 8:39-41; 10:30-31; 45:20-21 |
| G:fg-kendte | OK | 50, 59, 123, 126 | 123:21; 126:30; 50:33-40; 59:53-55 |
| G:fg-organisationer | OK | 75, 98, 101, 133 | 101:9-10; 133:6-11; 98:6; 75:53-55; 133:37-40 |

## Hårdkodede fakta

| ID | Status | Sider | Linjer |
|---|---|---|---|
| H:1 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:2 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:3 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:4 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:5 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:6 | NOT IN BOOK | 1, 2 | 1; 2 |
| H:7 | NOT IN BOOK | – | – |
| H:8 | NOT IN BOOK | – | – |
| H:9 | NOT IN BOOK | – | – |
| H:10 | NOT IN BOOK | – | – |
| H:11 | OK | 111, 113 | 113:9-11; 111:20-22 |
| H:12 | NOT IN BOOK | – | – |
| H:13 | NOT IN BOOK | – | – |
| H:14 | NOT IN BOOK | – | – |
| H:15 | NOT IN BOOK | – | – |
| H:16 | NOT IN BOOK | – | – |
| H:17 | NOT IN BOOK | – | – |
| H:18 | NOT IN BOOK | – | – |
| H:19 | NOT IN BOOK | – | – |
| H:20 | NOT IN BOOK | – | – |
| H:21 | NOT IN BOOK | – | – |
| H:22 | NOT IN BOOK | – | – |
| H:23 | NOT IN BOOK | – | – |
| H:24 | NOT IN BOOK | – | – |
| H:25 | NOT IN BOOK | – | – |
| H:26 | NOT IN BOOK | – | – |
| H:27 | NOT IN BOOK | – | – |
| H:28 | OK | 111, 113 | 113:9-11; 111:20-22 |
| H:29 | NOT IN BOOK | – | – |
| H:30 | NOT IN BOOK | – | – |
| H:31 | NOT IN BOOK | – | – |
| H:32 | NOT IN BOOK | – | – |
| H:33 | NOT IN BOOK | – | – |
| H:34 | NOT IN BOOK | – | – |
| H:35 | NOT IN BOOK | – | – |
| H:36 | NOT IN BOOK | – | – |
| H:37 | OK | 111, 113 | 113:9-11; 111:20-22 |
| H:38 | OK | 111, 113 | 113:9-11; 111:20-22 |
| H:39 | NOT IN BOOK | – | – |
| H:40 | NOT IN BOOK | – | – |

## Spørgsmål

| ID | Status | Sider | Linjer |
|---|---|---|---|
| Q:2018-06-q8 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2018-11-q10 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2020-06-q24 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2020-11-q22 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2021-11-q2 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2022-06-q8 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2022-11-q19 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2024-05-q3 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2024-11-q2 | OK | 63, 89 | 63:24-56; 89:39-49 |
| Q:2016-12-q11 | OK | 77 | 77:45-57 |
| Q:2017-06-q13 | OK | 77 | 77:45-57 |
| Q:2017-11-q8 | OK | 77 | 77:45-57 |
| Q:2019-11-q11 | OK | 77 | 77:45-57 |
| Q:2020-11-q12 | OK | 77 | 77:45-57 |
| Q:2021-06-q17 | OK | 77 | 77:45-57 |
| Q:2023-11-q10 | OK | 77 | 77:45-57 |
| Q:2026-06-q3 | OK | 77 | 77:45-57 |
| Q:2018-06-q23 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2020-06-q23 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2020-11-q21 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2021-11-q18 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2022-11-q6 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2023-05-q4 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2024-11-q9 | OK | 72, 83 | 72:29-32; 83:12-14 |
| Q:2016-12-q9 | OK | 47 | 47:33-37 |
| Q:2019-06-q7 | OK | 47 | 47:33-37 |
| Q:2019-11-q9 | OK | 47 | 47:33-37 |
| Q:2021-06-q4 | OK | 47 | 47:33-37 |
| Q:2022-06-q23 | OK | 47 | 47:33-37 |
| Q:2024-11-q4 | OK | 47 | 47:33-37 |
| Q:2017-11-q15 | OK | 72, 83 | 72:29; 83:12-14 |
| Q:2020-11-q6 | OK | 72, 83 | 72:29; 83:12-14 |
| Q:2022-11-q13 | OK | 72, 83 | 72:29; 83:12-14 |
| Q:2023-11-q13 | OK | 72, 83 | 72:29; 83:12-14 |
| Q:2026-06-q15 | OK | 72, 83 | 72:29; 83:12-14 |
| Q:2017-11-q13 | OK | 62 | 62:45-47 |
| Q:2020-06-q17 | OK | 62 | 62:45-47 |
| Q:2023-05-q5 | OK | 62 | 62:45-47 |
| Q:2024-11-q17 | OK | 62 | 62:45-47 |
| Q:2026-06-q4 | OK | 62 | 62:45-47 |
| Q:2018-06-q21 | OK | 77, 83 | 77:40; 83:37 |
| Q:2021-06-q24 | OK | 77, 83 | 77:40; 83:37 |
| Q:2022-11-q10 | OK | 77, 83 | 77:40; 83:37 |
| Q:2024-05-q5 | OK | 77, 83 | 77:40; 83:37 |
| Q:2025-11-q6 | OK | 77, 83 | 77:40; 83:37 |
| Q:2017-06-q24 | OK | 82, 83 | 82:61-66; 83:29-33 |
| Q:2020-11-q9 | OK | 82, 83 | 82:61-66; 83:29-33 |
| Q:2021-11-q6 | OK | 82, 83 | 82:61-66; 83:29-33 |
| Q:2023-11-q1 | OK | 82, 83 | 82:61-66; 83:29-33 |
| Q:2025-11-q18 | OK | 82, 83 | 82:61-66; 83:29-33 |
| Q:2016-12-q21 | OK | 69 | 69:32-40 |
| Q:2019-11-q21 | OK | 69 | 69:32-40 |
| Q:2022-06-q4 | OK | 69 | 69:32-40 |
| Q:2023-11-q15 | OK | 69 | 69:32-40 |
| Q:2025-05-q12 | OK | 69 | 69:32-40 |
| Q:2017-11-q25 | OK | 70 | 70:10-18 |
| Q:2020-06-q21 | OK | 70 | 70:10-18 |
| Q:2021-11-q13 | OK | 70 | 70:10-18 |
| Q:2023-05-q2 | OK | 70 | 70:10-18 |
| Q:2025-05-q11 | OK | 70 | 70:10-18 |
| Q:2017-06-q10 | OK | 82 | 82:59-61 |
| Q:2019-06-q9 | OK | 82 | 82:59-61 |
| Q:2020-06-q7 | OK | 82 | 82:59-61 |
| Q:2020-11-q13 | OK | 82 | 82:59-61 |
| Q:2024-05-q19 | OK | 82 | 82:59-61 |
| Q:2017-06-q3 | OK | 62, 112 | 62:45; 112:44 |
| Q:2019-06-q12 | OK | 62, 112 | 62:45; 112:44 |
| Q:2019-11-q1 | OK | 62, 112 | 62:45; 112:44 |
| Q:2021-06-q7 | OK | 62, 112 | 62:45; 112:44 |
| Q:2022-11-q25 | OK | 62, 112 | 62:45; 112:44 |
| Q:2016-12-q17 | OK | 70 | 70:32-37 |
| Q:2018-06-q22 | OK | 70 | 70:32-37 |
| Q:2019-11-q17 | OK | 70 | 70:32-37 |
| Q:2021-06-q9 | OK | 70 | 70:32-37 |
| Q:2022-11-q16 | OK | 70 | 70:32-37 |
| Q:2022-06-q2 | OK | 82, 100 | 82:45-54; 100:21-24 |
| Q:2022-11-q12 | OK | 82, 100 | 82:45-54; 100:21-24 |
| Q:2024-05-q21 | OK | 82, 100 | 82:45-54; 100:21-24 |
| Q:2025-11-q21 | OK | 82, 100 | 82:45-54; 100:21-24 |
| Q:2017-11-q20 | OK | 79 | 79:10-12 |
| Q:2021-06-q23 | OK | 79 | 79:10-12 |
| Q:2022-06-q24 | OK | 79 | 79:10-12 |
| Q:2024-05-q10 | OK | 79 | 79:10-12 |
| Q:2017-06-q4 | OK | 80, 83 | 80:9; 83:47 |
| Q:2020-06-q2 | OK | 80, 83 | 80:9; 83:47 |
| Q:2021-11-q20 | OK | 80, 83 | 80:9; 83:47 |
| Q:2023-11-q22 | OK | 80, 83 | 80:9; 83:47 |
| Q:2017-11-q9 | OK | 59, 63 | 59:37-43; 63:19-21 |
| Q:2018-06-q16 | OK | 59, 63 | 59:37-43; 63:19-21 |
| Q:2021-06-q3 | OK | 59, 63 | 59:37-43; 63:19-21 |
| Q:2022-11-q1 | OK | 59, 63 | 59:37-43; 63:19-21 |
| Q:2016-12-q10 | OK | 66 | 66:34-36 |
| Q:2018-06-q19 | OK | 66 | 66:34-36 |
| Q:2019-11-q10 | OK | 66 | 66:34-36 |
| Q:2021-11-q10 | OK | 66 | 66:34-36 |
| Q:2018-06-q1 | OK | 77, 83 | 77:24-27; 83:25 |
| Q:2021-11-q12 | OK | 77, 83 | 77:24-27; 83:25 |
| Q:2024-11-q25 | OK | 77, 83 | 77:24-27; 83:25 |
| Q:2017-11-q7 | OK | 66 | 66:12-18 |
| Q:2020-06-q15 | OK | 66 | 66:12-18 |
| Q:2024-11-q19 | OK | 66 | 66:12-18 |
| Q:2018-11-q12 | OUTDATED | 59, 83 | 59:45-46; 83:14-20 |
| Q:2020-11-q10 | OUTDATED | 59, 83 | 59:45-46; 83:14-20 |
| Q:2024-05-q20 | OUTDATED | 59, 83 | 59:45-46; 83:14-20 |
| Q:2018-11-q13 | OK | 54, 80 | 80:25-27; 54:19-20 |
| Q:2021-11-q21 | OK | 54, 80 | 80:25-27; 54:19-20 |
| Q:2024-05-q4 | OK | 54, 80 | 80:25-27; 54:19-20 |
| Q:2016-12-q15 | OK | 85 | 85:23-25, 85:55-59 |
| Q:2019-11-q15 | OK | 85 | 85:23-25, 85:55-59 |
| Q:2021-06-q1 | OK | 85 | 85:23-25, 85:55-59 |
| Q:2019-06-q14 | OK | 66, 69 | 66:34-40; 69:22-27 |
| Q:2025-11-q20 | OK | 66, 69 | 66:34-40; 69:22-27 |
| Q:2023-11-q9 | OK | 63 | 63:6-13 |
| Q:2025-11-q5 | OK | 63 | 63:6-13 |
| Q:2024-11-q21 | OK | 39 | 39:28-31 |
| Q:2025-11-q13 | OK | 39 | 39:28-31 |
| Q:2023-05-q22 | OK | 59, 63, 112 | 59:33-35; 112:49-51; 63:21-23 |
| Q:2025-05-q5 | OK | 59, 63, 112 | 59:33-35; 112:49-51; 63:21-23 |
| Q:2024-11-q8 | OUTDATED | 75 | 75:25-27, 75:36-45 |
| Q:2025-05-q18 | OK | 75 | 75:25-27, 75:36-45 |
| Q:2023-11-q7 | NOT IN BOOK | 85 | 85:27-29 |
| Q:2025-05-q19 | NOT IN BOOK | 85 | 85:27-29 |
| Q:2016-12-q7 | OK | 63, 87 | 63:46-51; 87:21-23 |
| Q:2023-11-q23 | OK | 63, 87 | 63:46-51; 87:21-23 |
| Q:2018-06-q9 | OK | 64, 68 | 64:22-25; 68:53-59 |
| Q:2018-11-q15 | OK | 64, 68 | 64:22-25; 68:53-59 |
| Q:2018-06-q15 | OK | 62 | 62:29-30 |
| Q:2018-11-q8 | OK | 62 | 62:29-30 |
| Q:2024-11-q20 | OK | 62, 84 | 84:9-10; 62:13 |
| Q:2017-11-q22 | OK | 82 | 82:59-61 |
| Q:2016-12-q1 | OK | 65, 72 | 72:42-43; 65:23-26 |
| Q:2017-11-q4 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2019-06-q5 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2020-06-q14 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2021-06-q15 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2022-06-q21 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2023-11-q20 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2024-05-q1 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2025-11-q9 | OK | 102, 105, 153 | 105:12-14; 102:31-33; 153:34-35 |
| Q:2018-06-q7 | OUTDATED | 65, 130 | 65:39-41; 130:32-42 |
| Q:2020-06-q22 | OUTDATED | 65, 130 | 65:39-41; 130:32-42 |
| Q:2021-11-q4 | OUTDATED | 65, 130 | 65:39-41; 130:32-42 |
| Q:2022-11-q4 | OUTDATED | 65, 130 | 65:39-41; 130:32-42 |
| Q:2017-11-q14 | OK | 65, 111 | 65:12-20; 111:43-46 |
| Q:2019-06-q11 | OK | 65, 111 | 65:12-20; 111:43-46 |
| Q:2021-06-q16 | OK | 65, 111 | 65:12-20; 111:43-46 |
| Q:2022-06-q7 | OK | 65, 111 | 65:12-20; 111:43-46 |
| Q:2018-11-q9 | OUTDATED | 65, 66 | 65:22-26; 66:21-25 |
| Q:2020-11-q19 | OUTDATED | 65, 66 | 65:22-26; 66:21-25 |
| Q:2022-06-q18 | OUTDATED | 65, 66 | 65:22-26; 66:21-25 |
| Q:2025-05-q20 | OK | 65 | 65:12-19 |
| Q:2026-06-q16 | OK | 65 | 65:12-19 |
| Q:2025-11-q24 | OK | 65 | 65:19; 65:36 |
| Q:2022-06-q11 | OK | 136 | 136:20-25 |
| Q:2017-06-q21 | OK | 59 | 59:53-55 |
| Q:2018-06-q11 | OK | 59 | 59:53-55 |
| Q:2018-11-q23 | OK | 59 | 59:53-55 |
| Q:2020-06-q12 | OK | 59 | 59:53-55 |
| Q:2021-06-q2 | OK | 59 | 59:53-55 |
| Q:2021-11-q23 | OK | 59 | 59:53-55 |
| Q:2023-05-q17 | OK | 59 | 59:53-55 |
| Q:2024-05-q2 | OK | 59 | 59:53-55 |
| Q:2025-11-q4 | OK | 59 | 59:53-55 |
| Q:2016-12-q16 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2018-11-q21 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2019-11-q16 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2020-11-q5 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2021-11-q3 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2023-05-q21 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2024-11-q15 | OK | 93, 110 | 110:37-42; 93:33-35 |
| Q:2016-12-q23 | OK | 114 | 114:20-21 |
| Q:2019-11-q23 | OK | 114 | 114:20-21 |
| Q:2021-06-q14 | OK | 114 | 114:20-21 |
| Q:2023-11-q18 | OK | 114 | 114:20-21 |
| Q:2025-11-q11 | OK | 114 | 114:20-21 |
| Q:2017-11-q23 | OK | 113 | 113:9-11 |
| Q:2020-06-q20 | OK | 113 | 113:9-11 |
| Q:2021-11-q22 | OK | 113 | 113:9-11 |
| Q:2022-06-q25 | OK | 113 | 113:9-11 |
| Q:2023-11-q12 | OK | 113 | 113:9-11 |
| Q:2022-11-q5 | OK | 114 | 114:20-21 |
| Q:2024-11-q6 | OK | 114 | 114:20-21 |
| Q:2026-06-q11 | OK | 114 | 114:20-21 |
| Q:2024-05-q6 | OK | 117 | 117:29-35 |
| Q:2025-05-q13 | OK | 117 | 117:29-35 |
| Q:2026-06-q5 | OK | 117 | 117:29-35 |
| Q:2017-11-q10 | OK | 114 | 114:20-21 |
| Q:2020-11-q4 | OK | 114 | 114:20-21 |
| Q:2022-06-q9 | OK | 114 | 114:20-21 |
| Q:2016-12-q24 | OK | 59 | 59:54-55 |
| Q:2019-11-q24 | OK | 59 | 59:54-55 |
| Q:2020-11-q18 | OK | 59 | 59:54-55 |
| Q:2023-05-q9 | OK | 113 | 113:27-28 |
| Q:2026-06-q12 | OK | 113 | 113:27-28 |
| Q:2025-05-q22 | OK | 113 | 113:41-42 |
| Q:2026-06-q13 | OK | 113 | 113:41-42 |
| Q:2024-05-q8 | OK | 110 | 110:30-34 |
| Q:2025-11-q10 | OK | 110 | 110:30-34 |
| Q:2017-06-q7 | OK | 114, 129 | 114:30; 129:36-38 |
| Q:2025-05-q7 | OK | 114, 129 | 114:30; 129:36-38 |
| Q:2021-11-q19 | OK | 140 | 140:40-45 |
| Q:2024-05-q18 | OK | 140 | 140:40-45 |
| Q:2025-11-q19 | OK | 113, 119 | 113:40-44; 119:37-39 |
| Q:2024-11-q14 | OK | 111 | 111:20-22 |
| Q:2024-11-q7 | OK | 116 | 116:28-31 |
| Q:2024-11-q5 | OK | 118, 153 | 118:23-25; 153:40-41 |
| Q:2024-05-q7 | OK | 117 | 117:9-19 |
| Q:2024-05-q9 | OK | 118 | 118:58-61 |
| Q:2017-06-q6 | OK | 111 | 111:55-62 |
| Q:2017-11-q3 | OK | 106 | 106:24-25 |
| Q:2019-06-q1 | OK | 106 | 106:24-25 |
| Q:2020-06-q13 | OK | 106 | 106:24-25 |
| Q:2022-11-q15 | OK | 106 | 106:24-25 |
| Q:2024-05-q12 | OK | 106 | 106:24-25 |
| Q:2026-06-q6 | OK | 106 | 106:24-25 |
| Q:2016-12-q5 | OK | 105 | 105:47 |
| Q:2018-11-q3 | OK | 105 | 105:47 |
| Q:2019-11-q5 | OK | 105 | 105:47 |
| Q:2021-06-q5 | OK | 105 | 105:47 |
| Q:2022-06-q20 | OK | 105 | 105:47 |
| Q:2018-06-q3 | OK | 105 | 105:48-49 |
| Q:2020-11-q2 | OK | 105 | 105:48-49 |
| Q:2023-05-q12 | OK | 105 | 105:48-49 |
| Q:2025-11-q16 | OK | 105 | 105:48-49 |
| Q:2019-06-q13 | OK | 105 | 105:47-48 |
| Q:2020-06-q5 | OK | 105 | 105:47-48 |
| Q:2021-11-q5 | OK | 105 | 105:47-48 |
| Q:2025-05-q16 | OK | 105 | 105:47-48 |
| Q:2017-06-q2 | OK | 106 | 106:43-44 |
| Q:2020-11-q1 | OK | 106 | 106:43-44 |
| Q:2023-05-q10 | OK | 106 | 106:43-44 |
| Q:2024-11-q11 | OK | 106 | 106:43-44 |
| Q:2023-05-q3 | OK | 106 | 106:46-47 |
| Q:2024-05-q13 | OK | 106 | 106:46-47 |
| Q:2026-06-q7 | OK | 106 | 106:46-47 |
| Q:2022-11-q7 | OK | 105 | 105:65-66 |
| Q:2024-11-q10 | OK | 105 | 105:65-66 |
| Q:2026-06-q8 | OK | 105 | 105:65-66 |
| Q:2025-11-q17 | OK | 146 | 146:9-10 |
| Q:2026-06-q19 | OK | 146 | 146:9-10 |
| Q:2022-11-q24 | OK | 106 | 106:45-46 |
| Q:2025-05-q17 | OK | 106 | 106:45-46 |
| Q:2021-11-q15 | OK | 105 | 105:63-64 |
| Q:2025-05-q15 | OK | 105 | 105:63-64 |
| Q:2020-06-q1 | OK | 106 | 106:44-45 |
| Q:2023-11-q4 | OK | 106 | 106:44-45 |
| Q:2023-11-q5 | OK | 105 | 105:57 |
| Q:2023-05-q14 | OK | 106, 108 | 106:36; 108:6-10 |
| Q:2018-11-q6 | OK | 105 | 105:36-37 |
| Q:2018-11-q1 | OUTDATED | 106 | 106:36-37 |
| Q:2018-11-q2 | NOT IN BOOK | 80, 106 | 80:9-11; 106:38-41 |
| Q:2016-12-q3 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2018-06-q6 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2018-11-q22 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2019-11-q3 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2020-11-q14 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2021-11-q17 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2024-11-q1 | OK | 25 | 25:42-46; 25:58-63 |
| Q:2016-12-q12 | OK | 32 | 32:40-41 |
| Q:2018-06-q24 | OK | 32 | 32:40-41 |
| Q:2019-06-q22 | OK | 32 | 32:40-41 |
| Q:2019-11-q12 | OK | 32 | 32:40-41 |
| Q:2020-11-q17 | OK | 32 | 32:40-41 |
| Q:2021-11-q11 | OK | 32 | 32:40-41 |
| Q:2023-05-q6 | OK | 32 | 32:40-41 |
| Q:2017-06-q17 | OK | 32 | 32:27-29 |
| Q:2018-11-q11 | OK | 32 | 32:27-29 |
| Q:2020-06-q11 | OK | 32 | 32:27-29 |
| Q:2021-06-q12 | OK | 32 | 32:27-29 |
| Q:2022-11-q8 | OK | 32 | 32:27-29 |
| Q:2025-05-q9 | OK | 32 | 32:27-29 |
| Q:2016-12-q13 | OK | 27 | 27:9-10; 27:28 |
| Q:2018-06-q5 | OK | 27 | 27:9-10; 27:28 |
| Q:2019-11-q7 | OK | 27 | 27:9-10; 27:28 |
| Q:2020-11-q16 | OK | 27 | 27:9-10; 27:28 |
| Q:2022-11-q3 | OK | 27 | 27:9-10; 27:28 |
| Q:2024-05-q24 | OK | 27 | 27:9-10; 27:28 |
| Q:2017-11-q18 | OK | 23, 28 | 23:18-21; 28:60-63 |
| Q:2021-11-q1 | OK | 23, 28 | 23:18-21; 28:60-63 |
| Q:2022-06-q14 | OK | 23, 28 | 23:18-21; 28:60-63 |
| Q:2023-05-q25 | OK | 23, 28 | 23:18-21; 28:60-63 |
| Q:2025-05-q3 | OK | 23, 28 | 23:18-21; 28:60-63 |
| Q:2017-06-q5 | OK | 22, 23 | 22:35-37; 23:34-44 |
| Q:2017-11-q24 | OK | 22, 23 | 22:35-37; 23:34-44 |
| Q:2019-06-q8 | OK | 22, 23 | 22:35-37; 23:34-44 |
| Q:2020-11-q24 | OK | 22, 23 | 22:35-37; 23:34-44 |
| Q:2025-05-q1 | OK | 22, 23 | 22:35-37; 23:34-44 |
| Q:2019-06-q24 | OK | 27 | 27:43-47 |
| Q:2023-05-q23 | OK | 27 | 27:43-47 |
| Q:2025-05-q2 | OK | 27 | 27:43-47 |
| Q:2026-06-q9 | OK | 27 | 27:43-47 |
| Q:2017-11-q17 | OK | 32 | 32:23-25 |
| Q:2022-06-q19 | OK | 32 | 32:23-25 |
| Q:2023-11-q17 | OK | 32 | 32:23-25 |
| Q:2026-06-q25 | OK | 32 | 32:23-25 |
| Q:2017-06-q16 | OK | 28 | 28:43-44 |
| Q:2020-06-q9 | OK | 28 | 28:43-44 |
| Q:2021-06-q25 | OK | 28 | 28:43-44 |
| Q:2023-11-q6 | OK | 28 | 28:43-44 |
| Q:2016-12-q6 | OK | 24 | 24:57-58 |
| Q:2018-11-q7 | OK | 24 | 24:57-58 |
| Q:2019-11-q6 | OK | 24 | 24:57-58 |
| Q:2021-06-q6 | OK | 24 | 24:57-58 |
| Q:2017-06-q12 | OK | 27, 28 | 27:63; 28:10 |
| Q:2017-11-q16 | OK | 27, 28 | 27:63; 28:10 |
| Q:2018-06-q14 | OK | 27, 28 | 27:63; 28:10 |
| Q:2020-06-q8 | OK | 27, 28 | 27:63; 28:10 |
| Q:2017-06-q19 | OK | 27 | 27:34-38 |
| Q:2018-11-q18 | OK | 27 | 27:34-38 |
| Q:2021-11-q8 | OK | 27 | 27:34-38 |
| Q:2023-05-q16 | OK | 31 | 31:28-33 |
| Q:2025-05-q10 | OK | 31 | 31:28-33 |
| Q:2022-11-q14 | OK | 144 | 144:54-57 |
| Q:2024-05-q11 | OK | 144 | 144:54-57 |
| Q:2021-06-q22 | OK | 25, 28 | 25:11-13; 28:46-48 |
| Q:2022-11-q21 | OK | 25, 28 | 25:11-13; 28:46-48 |
| Q:2017-11-q11 | NOT IN BOOK | 24, 28 | 24:60-63; 28:63 |
| Q:2018-11-q19 | NOT IN BOOK | 24, 28 | 24:60-63; 28:63 |
| Q:2025-11-q3 | DIFFERS | 22, 120 | 22:58-59; 120:28-30 |
| Q:2020-11-q23 | OK | 58, 118 | 58:57; 118:30-32 |
| Q:2018-06-q18 | OK | 38, 51 | 38:46-47; 51:9-12 |
| Q:2020-11-q15 | OK | 38, 51 | 38:46-47; 51:9-12 |
| Q:2022-06-q3 | OK | 38, 51 | 38:46-47; 51:9-12 |
| Q:2024-05-q23 | OK | 38, 51 | 38:46-47; 51:9-12 |
| Q:2026-06-q24 | OK | 38, 51 | 38:46-47; 51:9-12 |
| Q:2018-06-q17 | OK | 41 | 41:63-64 |
| Q:2019-06-q18 | OK | 41 | 41:63-64 |
| Q:2021-06-q11 | OK | 41 | 41:63-64 |
| Q:2023-05-q24 | OK | 41 | 41:63-64 |
| Q:2024-11-q3 | OK | 41 | 41:63-64 |
| Q:2017-06-q11 | OK | 55 | 55:33-38 |
| Q:2020-06-q6 | OK | 55 | 55:33-38 |
| Q:2022-11-q22 | OK | 55 | 55:33-38 |
| Q:2026-06-q10 | OK | 55 | 55:33-38 |
| Q:2017-11-q2 | OK | 53, 55 | 55:9-20; 53:10-13 |
| Q:2019-06-q10 | OK | 53, 55 | 55:9-20; 53:10-13 |
| Q:2023-05-q18 | OK | 53, 55 | 55:9-20; 53:10-13 |
| Q:2024-11-q18 | OK | 53, 55 | 55:9-20; 53:10-13 |
| Q:2016-12-q4 | OK | 45 | 45:18-19 |
| Q:2019-11-q4 | OK | 45 | 45:18-19 |
| Q:2021-11-q25 | OK | 45 | 45:18-19 |
| Q:2023-11-q19 | OK | 45 | 45:18-19 |
| Q:2018-06-q25 | OK | 44, 118 | 44:41; 118:20-21 |
| Q:2020-11-q25 | OK | 44, 118 | 44:41; 118:20-21 |
| Q:2022-11-q11 | OK | 44, 118 | 44:41; 118:20-21 |
| Q:2017-06-q18 | OK | 44 | 44:6-13 |
| Q:2021-06-q21 | OK | 44 | 44:6-13 |
| Q:2022-06-q1 | OK | 44 | 44:6-13 |
| Q:2017-06-q25 | OK | 44 | 44:6-10 |
| Q:2017-11-q19 | NOT IN BOOK | 44 | 44:6-10 |
| Q:2020-06-q18 | OK | 44 | 44:6-10 |
| Q:2025-05-q4 | OK | 35, 53 | 53:6-11; 35:63-64 |
| Q:2026-06-q2 | OK | 35, 53 | 53:6-11; 35:63-64 |
| Q:2023-05-q20 | OK | 44, 55 | 55:54; 44:46-47 |
| Q:2024-05-q15 | OK | 44, 55 | 55:54; 44:46-47 |
| Q:2022-11-q20 | OK | 41, 42 | 41:57-59; 42:27-28 |
| Q:2024-05-q25 | OK | 41, 42 | 41:57-59; 42:27-28 |
| Q:2016-12-q8 | OK | 38, 53 | 38:23-24; 53:45-46 |
| Q:2019-11-q8 | OK | 38, 53 | 38:23-24; 53:45-46 |
| Q:2025-11-q15 | OK | 44, 118 | 44:18-19; 118:25-28 |
| Q:2025-11-q2 | OK | 45 | 45:29-33 |
| Q:2025-11-q12 | OK | 120 | 120:34-36 |
| Q:2019-06-q23 | OK | 38 | 38:9-11 |
| Q:2019-06-q15 | OK | 42 | 42:30-31 |
| Q:2017-06-q14 | OUTDATED | 44, 55 | 44:45-47; 55:52-55 |
| Q:2016-12-q18 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2017-06-q8 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2018-11-q14 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2019-11-q18 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2020-11-q3 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2022-06-q22 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2023-11-q14 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2024-11-q22 | OK | 6 | 6:6-10; 6:29-33 |
| Q:2016-12-q19 | OK | 8 | 8:50-52 |
| Q:2017-11-q5 | OK | 8 | 8:50-52 |
| Q:2018-06-q13 | OK | 8 | 8:50-52 |
| Q:2019-11-q19 | OK | 8 | 8:50-52 |
| Q:2022-06-q16 | OK | 8 | 8:50-52 |
| Q:2023-11-q8 | OK | 8 | 8:50-52 |
| Q:2016-12-q22 | OK | 12 | 12:55 |
| Q:2019-06-q20 | OK | 12 | 12:55 |
| Q:2019-11-q22 | OK | 12 | 12:55 |
| Q:2021-06-q8 | OK | 12 | 12:55 |
| Q:2022-11-q18 | OK | 12 | 12:55 |
| Q:2020-06-q25 | OK | 6, 10 | 6:13-15; 10:23-24 |
| Q:2021-11-q9 | OK | 6, 10 | 6:13-15; 10:23-24 |
| Q:2024-11-q23 | OK | 6, 10 | 6:13-15; 10:23-24 |
| Q:2026-06-q17 | OK | 6, 10 | 6:13-15; 10:23-24 |
| Q:2022-11-q2 | OK | 18, 19 | 18:38; 19:9 |
| Q:2023-11-q25 | OK | 18, 19 | 18:38; 19:9 |
| Q:2025-05-q14 | OK | 18, 19 | 18:38; 19:9 |
| Q:2025-11-q14 | OK | 18, 19 | 18:38; 19:9 |
| Q:2017-06-q9 | OK | 45 | 45:18-21 |
| Q:2019-06-q3 | OK | 45 | 45:18-21 |
| Q:2020-06-q4 | OK | 45 | 45:18-21 |
| Q:2021-11-q7 | OK | 45 | 45:18-21 |
| Q:2024-05-q14 | OK | 10 | 10:30-31 |
| Q:2025-11-q1 | OK | 10 | 10:30-31 |
| Q:2018-11-q20 | DIFFERS | 6 | 6:29-31 |
| Q:2021-06-q18 | DIFFERS | 6 | 6:29-31 |
| Q:2026-06-q1 | OK | 6, 10, 77 | 6:10; 10:9; 77:49-57 |
| Q:2023-05-q7 | OK | 8 | 8:39-41 |
| Q:2019-11-q13 | DIFFERS | 18 | 18:12-14 |
| Q:2019-06-q19 | OK | 18 | 18:54-57 |
| Q:2019-06-q21 | OK | 15 | 15:25-27 |
| Q:2018-06-q2 | OK | 13, 14 | 13:39; 14:14 |
| Q:2017-06-q22 | OK | 8, 9 | 8:6-10; 9:49-52 |
| Q:2016-12-q20 | OK | 123 | 123:35 |
| Q:2018-11-q17 | OK | 123 | 123:35 |
| Q:2019-11-q20 | OK | 123 | 123:35 |
| Q:2021-06-q10 | OK | 123 | 123:35 |
| Q:2022-11-q17 | OK | 123 | 123:35 |
| Q:2018-06-q10 | OK | 123 | 123:38-40 |
| Q:2020-11-q20 | OK | 123 | 123:38-40 |
| Q:2022-06-q15 | OK | 123 | 123:38-40 |
| Q:2025-05-q24 | OK | 123 | 123:38-40 |
| Q:2022-06-q17 | OK | 125 | 125:9-11 |
| Q:2024-05-q22 | OK | 125 | 125:9-11 |
| Q:2026-06-q20 | OK | 125 | 125:9-11 |
| Q:2022-06-q6 | OK | 126 | 126:25-28 |
| Q:2023-11-q24 | OK | 126 | 126:25-28 |
| Q:2025-11-q8 | OK | 126 | 126:25-28 |
| Q:2017-11-q21 | OK | 123 | 123:53-55 |
| Q:2021-11-q14 | OK | 123 | 123:53-55 |
| Q:2023-05-q8 | OK | 123 | 123:53-55 |
| Q:2023-11-q3 | OK | 125 | 125:36-37 |
| Q:2025-11-q7 | OK | 125 | 125:36-37 |
| Q:2022-11-q23 | OK | 123 | 123:43-44 |
| Q:2025-05-q23 | OK | 123 | 123:43-44 |
| Q:2023-05-q1 | OK | 50 | 50:33-40 |
| Q:2024-11-q13 | OK | 50 | 50:33-40 |
| Q:2021-06-q20 | OK | 124 | 124:21-30 |
| Q:2023-05-q13 | OK | 124 | 124:21-30 |
| Q:2017-06-q15 | OK | 124 | 124:42-57 |
| Q:2020-06-q10 | OK | 124 | 124:42-57 |
| Q:2019-06-q25 | OK | 123 | 123:21-30 |
| Q:2020-06-q19 | OK | 123 | 123:21-30 |
| Q:2024-11-q12 | OK | 125 | 125:9 |
| Q:2018-11-q24 | OK | 124 | 124:9 |
| Q:2020-06-q3 | OK | 129 | 129:45-55 |
| Q:2021-11-q24 | OK | 129 | 129:45-55 |
| Q:2023-11-q11 | OK | 129 | 129:45-55 |
| Q:2025-11-q25 | OK | 129 | 129:45-55 |
| Q:2026-06-q21 | OK | 129 | 129:45-55 |
| Q:2017-11-q12 | OK | 129 | 129:58-66 |
| Q:2020-11-q7 | OK | 129 | 129:58-66 |
| Q:2022-06-q12 | OK | 129 | 129:58-66 |
| Q:2025-05-q25 | OK | 129 | 129:58-66 |
| Q:2018-11-q16 | OK | 128 | 128:27-43 |
| Q:2020-06-q16 | OK | 128 | 128:27-43 |
| Q:2021-11-q16 | OK | 128 | 128:27-43 |
| Q:2022-11-q9 | OK | 128 | 128:27-43 |
| Q:2023-11-q16 | OK | 93 | 93:43 |
| Q:2024-11-q16 | OK | 93 | 93:43 |
| Q:2026-06-q22 | OK | 93 | 93:43 |
| Q:2016-12-q25 | OK | 129 | 129:20-25 |
| Q:2019-06-q16 | OK | 129 | 129:20-25 |
| Q:2019-11-q25 | OK | 129 | 129:20-25 |
| Q:2019-06-q17 | OK | 129 | 129:10-11 |
| Q:2023-05-q11 | OK | 129 | 129:10-11 |
| Q:2018-11-q25 | OK | 94 | 94:26-27 |
| Q:2022-06-q10 | OK | 94 | 94:26-27 |
| Q:2018-06-q20 | OK | 94 | 94:25-26 |
| Q:2021-06-q13 | OK | 94 | 94:25-26 |
| Q:2022-06-q5 | OK | 133 | 133:37-40 |
| Q:2023-11-q21 | OK | 133 | 133:37-40 |
| Q:2024-05-q17 | OK | 133 | 133:37-40 |
| Q:2025-11-q22 | OK | 133 | 133:37-40 |
| Q:2017-11-q1 | OK | 101, 133 | 101:9-10; 133:6 |
| Q:2019-11-q2 | OK | 101, 133 | 101:9-10; 133:6 |
| Q:2020-11-q8 | OK | 101, 133 | 101:9-10; 133:6 |
| Q:2023-11-q2 | OK | 101, 133 | 101:9-10; 133:6 |
| Q:2017-06-q1 | OK | 133 | 133:6-11 |
| Q:2018-11-q4 | OK | 133 | 133:6-11 |
| Q:2021-06-q19 | OK | 133 | 133:6-11 |
| Q:2023-05-q19 | OK | 133 | 133:6-11 |
| Q:2018-06-q4 | OK | 89 | 89:36-39 |
| Q:2019-06-q6 | OK | 89 | 89:36-39 |
| Q:2020-11-q11 | OK | 89 | 89:36-39 |
| Q:2023-05-q15 | OK | 89 | 89:36-39 |
| Q:2016-12-q2 | OK | 116, 133 | 116:17-18; 133:10 |
| Q:2019-06-q4 | OK | 116, 133 | 116:17-18; 133:10 |
| Q:2025-05-q8 | OK | 116, 133 | 116:17-18; 133:10 |
| Q:2017-06-q20 | OUTDATED | 83, 100 | 83:61-62; 100:20-21 |
| Q:2017-11-q6 | OUTDATED | 83, 100 | 83:61-62; 100:20-21 |
| Q:2018-11-q5 | OUTDATED | 83, 100 | 83:61-62; 100:20-21 |
| Q:2018-06-q12 | OK | 101 | 101:9-10 |
| Q:2022-06-q13 | OK | 101 | 101:9-10 |
| Q:2016-12-q14 | OK | 82, 100 | 100:21-24; 82:45-54 |
| Q:2019-11-q14 | OK | 82, 100 | 100:21-24; 82:45-54 |
| Q:2026-06-q14 | OK | 100 | 100:14-19 |
| Q:2026-06-q18 | OK | 32 | 32:53-61 |
| Q:2026-06-q23 | OK | 90 | 90:31-32; 90:55-56 |
| Q:2025-11-q23 | OK | 103 | 103:14-20 |
| Q:2025-05-q6 | OK | 75 | 75:53-55 |
| Q:2025-05-q21 | OK | 91, 135 | 91:18-19; 135:25-26 |
| Q:2024-11-q24 | OK | 134 | 134:31-43 |
| Q:2024-05-q16 | OK | 133, 135 | 133:6-12; 135:20-21 |
| Q:2019-06-q2 | OK | 83, 100 | 83:57; 100:20 |
| Q:2017-06-q23 | OK | 97, 98 | 97:31-34; 98:23-24 |

