# Medborgerskabsprøven study site – content inventory (step 1 of 3)

Read-only inventory of every fact the study site presents, copied verbatim (Danish kept exactly as written, English as on the site). Nothing has been translated, corrected or summarised. Line numbers are 1-based and refer to the file named next to each item.

Generated from the repo at the state of the `main` branch (last commit `0777a99`). Generator: `/private/tmp/claude-501/-Users-moustafasamhoury-StudioProjects-medborgerskabsproven/4353bc0d-c471-498c-9a5a-b571fbc25885/scratchpad/gen_audit.py`.

## How the site gets its content

- `data/bundle.js` is a generated copy of `data/questions.json`, `data/clusters.json`, `data/topics.json` and `data/fact_groups.json` (built by `tools/build_data.py`). It is not audited separately; the four JSON files are the source.
- `js/data.js` loads the bundle (or the JSON as fallback). It holds no facts itself.
- The pages (`index.html`, `study.html` = Læs, `learn.html` = Øv, `quiz.html` = Test, `exams.html` = Prøver, `top15.html` = 15 mest stillede) render the four data files. Each topic's facts appear in `study.html`, `learn.html` and `quiz.html`.
- Some facts are hard-coded in the HTML/JS (dates, pass mark, the 2017-11 answer-key error, the footer). They are listed in section B.

## Source files read

Parsed completely by script (every record and every text field):

- `data/questions.json` – 500 questions, 25 per exam, 20 exams (2016-12 to 2026-06)
- `data/clusters.json` – 168 clusters (one fact each, with canonical Q/A, variants, notes)
- `data/topics.json` – 10 topics (intro paragraphs and current-facts notes)
- `data/fact_groups.json` – 15 fact groups (overview tables and mnemonics)

Read directly (text or targeted lines):

- `index.html` (footer line 54, same footer on `study.html`, `learn.html`, `quiz.html`, `exams.html`, `top15.html`)
- `js/data.js`, `js/top15.js` (full), `js/exams.js` (full), `js/home.js` (lines 1–140 read via `cat`/`Read`; hard-coded text listed in section B)
- `js/quiz.js`, `js/learn.js`, `js/ui.js`, `js/store.js`, `js/study.js`, `js/icons.js` – scanned for hard-coded facts (numbers, dates, pass marks, notes). Pure UI labels (buttons, headings, toasts) are not transcribed because they contain no facts; the factual lines found are in section B.
- `exams/INDEX.md` (full)
- `README.md` (lines 1–60, which contain the claims about the content)
- `data/bundle.js` (head only, to confirm it is generated from the JSON)

Not read / not user-facing:

- `exams/*.pdf` (20 exam PDFs and 20 answer-key PDFs). They are linked from `exams.html` but are binary files. Their content is represented in `data/questions.json`. Each question's `correct` field is the site's answer key, and it is not checked against the PDFs here. This is what step 2 must check.
- `data/VERIFICATION.md`, `data/TRANSCRIPTION_REPORT.md`, `PLAN.md`, `BUILD_PLAN.md`, `FIX_PLAN.md`, `HANDOVER.md`, `HOME_DECLUTTER_PLAN.md`, `REDESIGN_PLAN.md`, `STAMP_STRETCH_FIX_PLAN.md`, `tools/build_data.py`, `css/style.css`. They are developer documents or code, not text the user sees (the build script was read only for the bundle format).

## Item types and ID scheme

- `Q:<question id>` – one question from `data/questions.json` (e.g. `2016-12-q1`). Includes all options, the correct key, notes and the cluster it belongs to.
- `C:<cluster id>` – one cluster from `data/clusters.json` (one fact), with canonical question/answer, variants, trap note and current note. Its questions are listed under it.
- `G:<group id>` – one fact group (overview table + mnemonic) from `data/fact_groups.json`.
- `I:<topic id>:<n>` – one intro paragraph of a topic (`data/topics.json` `intro`).
- `F:<topic id>:<n>` – one current-fact note of a topic (`data/topics.json` `current_facts`, shown as "Ændret siden prøven").
- `H:<n>` – one hard-coded fact in the HTML/JS/README (section B).

Topics are listed in the order the site uses (`order` in `data/topics.json`). Within each topic: intro paragraphs, current facts, fact groups, then clusters in `data/clusters.json` order (most-asked first, as the site sorts them), each followed by its questions.

---

# A. Content from the data files, by topic

## 1. Demokrati, grundlov og retsstat / Democracy, Constitution and the rule of law  (`topic:demokrati`, `data/topics.json:3`)

### Intro paragraphs (`I:demokrati:n`)

- **I:demokrati:1** · `data/topics.json:10` (EN `:11`)
  - DA: Danmark er et demokrati og et konstitutionelt monarki. Grundloven er Danmarks forfatning. Den første grundlov er fra 5. juni 1849, og den blev sidst ændret i 1953. Hvis grundloven skal ændres, skal der være en folkeafstemning.
  - EN: Denmark is a democracy and a constitutional monarchy. Grundloven (the Constitution) is Denmark's constitution. The first Constitution is from 5 June 1849, and it was last changed in 1953. If the Constitution is to be changed, there must be a referendum.
- **I:demokrati:2** · `data/topics.json:14` (EN `:15`)
  - DA: Grundloven sikrer frihedsrettigheder: ytringsfrihed (sige hvad man mener), forsamlingsfrihed (mødes og demonstrere), foreningsfrihed og religionsfrihed. Retten til våben, arbejde, ferie eller at stifte familie står IKKE i grundloven. Alle – også udlændinge – må danne en forening. Før en demonstration giver man politiet besked, men man skal ikke have tilladelse.
  - EN: The Constitution guarantees civil liberties: freedom of expression (saying what you think), freedom of assembly (meeting and demonstrating), freedom of association and freedom of religion. The right to weapons, a job, holidays or to start a family is NOT in the Constitution. Everyone – foreigners too – may form an association. Before a demonstration you notify the police, but you do not need permission.
- **I:demokrati:3** · `data/topics.json:18` (EN `:19`)
  - DA: Magten er delt i tre: Folketinget og regeringen laver lovene (lovgivende magt), regeringen styrer landet (udøvende magt), og domstolene dømmer (dømmende magt). Domstolene er uafhængige – politikerne kan ikke bestemme, hvordan en dommer dømmer. En dom fra byretten kan ankes til landsretten og derefter til Højesteret.
  - EN: Power is divided in three: the Folketing and the government make the laws (legislative power), the government runs the country (executive power), and the courts judge (judicial power). The courts are independent – politicians cannot decide how a judge rules. A ruling from the District Court can be appealed to the High Court and then to the Supreme Court.
- **I:demokrati:4** · `data/topics.json:22` (EN `:23`)
  - DA: Folketinget har 179 medlemmer: 175 fra Danmark, 2 fra Færøerne og 2 fra Grønland. Medlemmerne behøver ikke være med i et parti. Der skal være valg mindst hvert 4. år, og statsministeren bestemmer, hvornår valget skal være. Kun danske statsborgere kan stemme til folketingsvalg, og afstemningen er hemmelig. Ca. 80-90 % stemmer. Efter et valg bestemmer Folketinget, hvem der danner regering.
  - EN: The Folketing has 179 members: 175 from Denmark, 2 from the Faroe Islands and 2 from Greenland. Members do not have to belong to a party. There must be an election at least every 4 years, and the prime minister decides when it is held. Only Danish citizens can vote in general elections, and voting is secret. About 80–90% vote. After an election the Folketing decides who forms the government.
- **I:demokrati:5** · `data/topics.json:26` (EN `:27`)
  - DA: Kvinder fik stemmeret i 1915 – ikke i 1849. I 2011 fik Danmark sin første kvindelige statsminister, Helle Thorning-Schmidt.
  - EN: Women got the vote in 1915 – not in 1849. In 2011 Denmark got its first female prime minister, Helle Thorning-Schmidt.
- **I:demokrati:6** · `data/topics.json:30` (EN `:31`)
  - DA: Danmark har 98 kommuner og 5 regioner. Borgmesteren er den øverste politiske leder i kommunen. Kommunerne står for vuggestuer, børnehaver og folkeskoler. Regionerne står for sygehusene. Der er valg til kommuner og regioner hvert 4. år.
  - EN: Denmark has 98 municipalities and 5 regions. The mayor is the top political leader of the municipality. The municipalities run nurseries, kindergartens and folkeskoler. The regions run the hospitals. There are municipal and regional elections every 4 years.
- **I:demokrati:7** · `data/topics.json:34` (EN `:35`)
  - DA: Hvis politiet anholder en person, skal personen stilles for en dommer inden 24 timer. En betinget dom betyder, at man ikke skal i fængsel, hvis man overholder betingelserne. En straffeattest viser, om man har været straffet. Moms er en afgift på varer, man køber.
  - EN: If the police arrest someone, the person must be brought before a judge within 24 hours. A suspended sentence means you do not go to prison if you keep the conditions. A criminal record certificate shows whether you have been convicted. Moms (VAT) is a tax on goods you buy.

### Current facts – "Ændret siden prøven" (`F:demokrati:n`)

- **F:demokrati:1** · `data/topics.json:40` (EN `:41`)
  - DA: Per 2026: Der var folketingsvalg 24. marts 2026. Socialdemokratiet blev igen største parti. Siden 3. juni 2026 er regeringen Socialdemokratiet, SF, Moderaterne og Radikale Venstre (Mette Frederiksen III). Fra 2022 til 2026 var det SVM-regeringen (S, Venstre, Moderaterne) – det er den, prøverne fra 2024-2025 spørger om.
  - EN: Per 2026: There was a general election on 24 March 2026. The Social Democrats were again the largest party. Since 3 June 2026 the government has been the Social Democrats, SF, the Moderates and the Social Liberals (Mette Frederiksen III). From 2022 to 2026 it was the SVM government (S, Venstre, the Moderates) – that is the one the 2024–2025 exams ask about.
- **F:demokrati:2** · `data/topics.json:44` (EN `:45`)
  - DA: Kvinder i Folketinget: ca. 40 % i 2018-2020 og ca. 45 % efter valget i 2022.
  - EN: Women in the Folketing: about 40% in 2018–2020 and about 45% after the 2022 election.

### Overview tables / fact groups (`G:…`)

#### G:fg-aarstal · `data/fact_groups.json:79` (also used under: historie, verden)

- Title DA: Vigtige årstal
- Title EN: Key years
- Columns DA: År | Hvad skete der?
- Columns EN: Year | What happened?
- Rows (DA / EN, one per row):
  - DA: 1536 | Reformationen – Danmark bliver protestantisk
    EN: 1536 | The Reformation – Denmark becomes Protestant
  - DA: 1658 | Danmark mister Skåne, Halland og Blekinge til Sverige
    EN: 1658 | Denmark loses Skåne, Halland and Blekinge to Sweden
  - DA: 1700-tallet (1788) | Landboreformerne – stavnsbåndet ophæves 1788
    EN: 1700s (1788) | The agricultural reforms – stavnsbåndet abolished in 1788
  - DA: 1814 | Unionen med Norge (over 400 år) slutter
    EN: 1814 | The union with Norway (over 400 years) ends
  - DA: 1840'erne (1847) | De første jernbaner
    EN: 1840s (1847) | The first railways
  - DA: 1849 | Første grundlov (5. juni) – kvinder får IKKE stemmeret
    EN: 1849 | First Constitution (5 June) – women do NOT get the vote
  - DA: 1864 | Danmark mister Slesvig og Holsten
    EN: 1864 | Denmark loses Slesvig and Holsten
  - DA: ca. 1870 | Venstre dannes
    EN: about 1870 | Venstre is founded
  - DA: 1915 | Kvinder får stemmeret
    EN: 1915 | Women get the vote
  - DA: 1940 | 9. april: Tyskland besætter Danmark (2. verdenskrig)
    EN: 1940 | 9 April: Germany occupies Denmark (Second World War)
  - DA: 1945 | 5. maj: befrielsen. Danmark med i FN
    EN: 1945 | 5 May: liberation. Denmark joins the UN
  - DA: 1949 | Danmark med i NATO
    EN: 1949 | Denmark joins NATO
  - DA: ca. 1950 | Marshall-planen: hjælp fra USA
    EN: about 1950 | The Marshall Plan: aid from the USA
  - DA: 1953 | Grundloven sidst ændret
    EN: 1953 | The Constitution last changed
  - DA: 1960'erne | Høj økonomisk vækst; gæstearbejdere fra bl.a. Tyrkiet
    EN: 1960s | High economic growth; guest workers from Turkey, among others
  - DA: 1973 | Danmark med i EF (i dag EU)
    EN: 1973 | Denmark joins the EC (today the EU)
  - DA: 1970'erne | Rødstrømpebevægelsen (kvindebevægelsen)
    EN: 1970s | The Redstocking movement (women's movement)
  - DA: 1990'erne | Danske FN-soldater i Bosnien
    EN: 1990s | Danish UN soldiers in Bosnia
  - DA: 2003 | Danske soldater til Irak
    EN: 2003 | Danish soldiers to Iraq
  - DA: 2011 | Første kvindelige statsminister: Helle Thorning-Schmidt
    EN: 2011 | First female prime minister: Helle Thorning-Schmidt
  - DA: 2015 | Terrorangreb ved Københavns Synagoge
    EN: 2015 | Terrorist attack at Copenhagen Synagogue
  - DA: 2024 | Frederik 10. bliver konge (14. januar)
    EN: 2024 | Frederik 10. becomes king (14 January)
- Mnemonic DA: Tab: 1658 Skåne, 1814 Norge, 1864 Slesvig. Grundlov: 1849 start, 1915 kvinder, 1953 sidst. Krig: 40 ind, 45 ud. Alliancer: FN 45, NATO 49, EF 73.
- Mnemonic EN: Losses: 1658 Skåne, 1814 Norway, 1864 Slesvig. Constitution: 1849 start, 1915 women, 1953 last. War: '40 in, '45 out. Alliances: UN '45, NATO '49, EC '73.
- Cluster links: his-reformation, his-1658, his-1814-norge, his-1864, dem-grundlov-1849, dem-1915, dem-grundlov-1953, his-besat-aar, his-befrielse, ver-fn-1945, ver-nato-1949

#### G:fg-hvem-styrer · `data/fact_groups.json:334` (also used under: velfaerd, uddannelse)

- Title DA: Hvem står for hvad? Kommune, region, stat
- Title EN: Who runs what? Municipality, region, state
- Columns DA: Niveau | Antal | Leder | Ansvar (eksempler)
- Columns EN: Level | Number | Leader | Responsible for (examples)
- Rows (DA / EN, one per row):
  - DA: Kommune | 98 | Borgmester (kommunalbestyrelse) | Vuggestuer, børnehaver, dagpleje, folkeskoler, biblioteker
    EN: Municipality (kommune) | 98 | Mayor (municipal council) | Nurseries, kindergartens, childminders, folkeskoler, libraries
  - DA: Region | 5 | Regionsrådsformand (regionsråd) | Sygehuse (hospitaler)
    EN: Region | 5 | Chair of the regional council | Hospitals
  - DA: Stat | 1 | Regeringen og Folketinget | Politiet, forsvaret, love, gymnasier, universiteter
    EN: State | 1 | The government and the Folketing | Police, defence, laws, gymnasier, universities
- Mnemonic DA: Kommunen = de små børn og skolen (tæt på dig). Regionen = sygehuset. Staten = politi og forsvar. Valg til kommune og region: hvert 4. år.
- Mnemonic EN: The municipality = small children and school (close to you). The region = the hospital. The state = police and defence. Municipal and regional elections: every 4 years.
- Cluster links: dem-kommunerne-boern, dem-regionerne-sygehuse, dem-kommuner-98, dem-regioner-5, dem-borgmester, dem-kommunalvalg

#### G:fg-magt · `data/fact_groups.json:410`

- Title DA: Magtens tredeling og domstolene
- Title EN: Separation of powers and the courts
- Columns DA: Magt | Hvem
- Columns EN: Power | Who
- Rows (DA / EN, one per row):
  - DA: Lovgivende magt | Regeringen og Folketinget
    EN: Legislative power | The government and the Folketing
  - DA: Udøvende magt | Regeringen
    EN: Executive power | The government
  - DA: Dømmende magt | Domstolene (uafhængige af politikerne)
    EN: Judicial power | The courts (independent of the politicians)
  - DA: Domstolene | Byret → Landsret → Højesteret
    EN: The courts | District Court → High Court → Supreme Court
  - DA: Anholdt | Skal for en dommer inden 24 timer
    EN: Arrested | Must be brought before a judge within 24 hours
- Mnemonic DA: Love laves af Folketinget og regeringen – domstolene dømmer. Anke: ét trin op (byret → landsret).
- Mnemonic EN: Laws are made by the Folketing and the government – the courts judge. Appeal: one step up (District Court → High Court).
- Cluster links: dem-lovgivende, dem-doemmende, dem-anke, dem-domstole-uafhaengige, dem-anholdt-24t

#### G:fg-tal · `data/fact_groups.json:588` (also used under: geografi, arbejde, uddannelse, verden)

- Title DA: Tal, du skal kunne
- Title EN: Numbers you must know
- Columns DA: Tal | Hvad
- Columns EN: Number | What
- Rows (DA / EN, one per row):
  - DA: 179 | Medlemmer af Folketinget (175 + 2 Færøerne + 2 Grønland)
    EN: 179 | Members of the Folketing (175 + 2 Faroe Islands + 2 Greenland)
  - DA: 2 + 2 | Folketingsmedlemmer fra Færøerne og fra Grønland
    EN: 2 + 2 | Folketing members from the Faroe Islands and from Greenland
  - DA: 15 | Danske medlemmer af Europa-Parlamentet (per 2026; gamle prøver: 13)
    EN: 15 | Danish members of the European Parliament (per 2026; old exams: 13)
  - DA: 98 | Kommuner
    EN: 98 | Municipalities
  - DA: 5 | Regioner
    EN: 5 | Regions
  - DA: 4 år | Folketingsvalg (mindst), kommunal- og regionsvalg
    EN: 4 years | General elections (at least), municipal and regional elections
  - DA: 5 år | Valg til Europa-Parlamentet
    EN: 5 years | European Parliament elections
  - DA: 10 år | Undervisningspligt
    EN: 10 years | Compulsory education
  - DA: 12 | Højeste karakter (7-trinsskalaen)
    EN: 12 | Highest grade (7-point scale)
  - DA: 37 timer | Normal arbejdsuge
    EN: 37 hours | Normal working week
  - DA: 5-6 uger | Ferie om året
    EN: 5–6 weeks | Holiday per year
  - DA: 24 timer | Anholdt → for en dommer
    EN: 24 hours | Arrested → before a judge
  - DA: ca. 170 m | Højeste punkt (Møllehøj)
    EN: about 170 m | Highest point (Møllehøj)
  - DA: ca. 43.000 km² | Danmarks areal
    EN: about 43,000 km² | Denmark's area
  - DA: ca. 6 mio. | Indbyggere
    EN: about 6 million | Inhabitants
  - DA: ca. 60 % | Landbrugsjord af arealet
    EN: about 60% | Farmland as a share of the area
  - DA: 80-90 % | Valgdeltagelse ved folketingsvalg
    EN: 80–90% | Turnout in general elections
  - DA: ca. 70 % | Lønmodtagere i a-kasse
    EN: about 70% | Employees in an a-kasse
  - DA: 3 ud af 4 | 15-64-årige med arbejde
    EN: 3 out of 4 | 15–64-year-olds with a job
  - DA: ca. 80 år | Middellevetid for mænd (2024)
    EN: about 80 years | Life expectancy for men (2024)
  - DA: 18 uger | Grænse for fri abort (siden 1. juni 2025)
    EN: 18 weeks | Limit for abortion on request (since 1 June 2025)
- Mnemonic DA: 179 i Folketinget, 98 kommuner, 5 regioner, 10 års skole, 37 timers arbejde, 170 meter højt.
- Mnemonic EN: 179 in the Folketing, 98 municipalities, 5 regions, 10 years of school, 37 hours of work, 170 metres high.
- Cluster links: dem-179, dem-2-og-2, ver-mep-antal, dem-kommuner-98, dem-regioner-5, udd-undervisningspligt, arb-37-timer, arb-ferie, geo-hoejeste-punkt

#### G:fg-valg · `data/fact_groups.json:833` (also used under: verden)

- Title DA: Valg: hvor tit og hvem må stemme
- Title EN: Elections: how often and who may vote
- Columns DA: Valg | Hvor tit | Hvem stemmer | Stemmeprocent
- Columns EN: Election | How often | Who votes | Turnout
- Rows (DA / EN, one per row):
  - DA: Folketingsvalg | Mindst hvert 4. år (statsministeren udskriver) | Kun danske statsborgere (18+) | 80-90 % (højt)
    EN: General election | At least every 4 years (the PM calls it) | Only Danish citizens (18+) | 80–90% (high)
  - DA: Kommunal- og regionsvalg | Hvert 4. år | Også udlændinge på visse betingelser | –
    EN: Municipal and regional | Every 4 years | Also foreigners under certain conditions | –
  - DA: Europa-Parlamentet | Hvert 5. år | Befolkningerne i EU-landene | Lavere end folketingsvalg
    EN: European Parliament | Every 5 years | The populations of the EU countries | Lower than general elections
- Mnemonic DA: Folketing og kommune: 4. EU: 5. Afstemningen er altid hemmelig.
- Mnemonic EN: Folketing and municipality: 4. EU: 5. Voting is always secret.
- Cluster links: dem-folketingsvalg, dem-kommunalvalg, ver-ep-valg-5-aar, dem-statsborger-stemme, dem-valgdeltagelse, ver-ep-stemmeprocent, dem-hemmelig-stemme, dem-udskriver-valg

#### G:fg-hoejtider · `data/fact_groups.json:1274` (also used under: historie, traditioner)

- Title DA: Højtider og mærkedage
- Title EN: Holidays and special days
- Columns DA: Dag | Hvornår | Hvad gør man / hvad markeres
- Columns EN: Day | When | What happens / what is marked
- Rows (DA / EN, one per row):
  - DA: Fastelavn | Februar/marts (før påske) | Børn klæder sig ud og slår katten af tønden
    EN: Fastelavn | February/March (before Easter) | Children dress up and hit the cat out of the barrel
  - DA: Påske | Om foråret | Kristen højtid
    EN: Easter | In spring | Christian holiday
  - DA: 9. april | 1940 | Besættelsen
    EN: 9 April | 1940 | The occupation
  - DA: 5. maj | 1945 | Befrielsen
    EN: 5 May | 1945 | The liberation
  - DA: Kristi himmelfart | En torsdag, 40. dag efter påske | Kristen helligdag
    EN: Ascension Day | A Thursday, the 40th day after Easter | Christian holy day
  - DA: Pinse | 7 uger efter påske | Kristen højtid
    EN: Whitsun (Pinse) | 7 weeks after Easter | Christian holiday
  - DA: Grundlovsdag | 5. juni | Grundloven fra 1849
    EN: Constitution Day | 5 June | The 1849 Constitution
  - DA: Sankthans | 23. juni (juni) | Bål om aftenen
    EN: Sankthans (Midsummer) | 23 June (June) | Bonfire in the evening
  - DA: Nytårsaften | 31. december | Kongens nytårstale
    EN: New Year's Eve | 31 December | The King's New Year's speech
  - DA: Nytårsdag | 1. januar | Statsministerens nytårstale
    EN: New Year's Day | 1 January | The prime minister's New Year's speech
  - DA: Store Bededag | – | Afskaffet som helligdag fra 2024
    EN: Store Bededag | – | Abolished as a public holiday from 2024
- Mnemonic DA: 5. maj = fri (befrielsen). 5. juni = grundloven. Bål = juni. Tønde = fastelavn.
- Mnemonic EN: 5 May = freedom (liberation). 5 June = the Constitution. Bonfire = June. Barrel = Fastelavn.
- Cluster links: tra-fastelavn, tra-paaske, tra-pinse, tra-grundlovsdag, tra-sankthans, his-befrielse, kon-nytaarstale

#### G:fg-ja-nej · `data/fact_groups.json:1561` (also used under: arbejde)

- Title DA: Ja/nej-fælder: ét ord ændrer svaret
- Title EN: Yes/no traps: one word changes the answer
- Columns DA: Spørgsmål | Svar
- Columns EN: Question | Answer
- Rows (DA / EN, one per row):
  - DA: Skal man UNDERRETTE politiet før en demonstration? | Ja
    EN: Must you NOTIFY the police before a demonstration? | Yes
  - DA: Skal politiet give TILLADELSE til en demonstration? | Nej
    EN: Must the police give PERMISSION for a demonstration? | No
  - DA: Betinget straf: skal man DIREKTE i fængsel? | Nej
    EN: Suspended sentence: do you go STRAIGHT to prison? | No
  - DA: Betinget straf: kan man UNDGÅ fængsel? | Ja
    EN: Suspended sentence: can you AVOID prison? | Yes
  - DA: Skal man være statsborger for at stemme til folketingsvalg? | Ja
    EN: Must you be a citizen to vote in general elections? | Yes
  - DA: Kan udlændinge stemme til folketingsvalg? | Nej
    EN: Can foreigners vote in general elections? | No
  - DA: Er det FORBUDT at slå børn? | Ja
    EN: Is it FORBIDDEN to hit children? | Yes
  - DA: Fik kvinder stemmeret i 1849? | Nej (først 1915)
    EN: Did women get the vote in 1849? | No (only in 1915)
  - DA: Har medarbejderen altid krav på deltid? | Nej
    EN: Does the employee always have a right to part-time? | No
  - DA: Kan arbejdsgiveren forlange deltid? | Nej
    EN: Can the employer demand part-time? | No
  - DA: Hvem er IKKE med i rigsfællesskabet? | Island (eller Åland)
    EN: Who is NOT part of the Danish Realm? | Iceland (or Åland)
  - DA: Tandlæge over 21 år: betaler man en del? | Ja
    EN: Dentist over 21: do you pay part? | Yes
  - DA: Tandlæge under 20 år: gratis? | Ja
    EN: Dentist under 20: free? | Yes
- Mnemonic DA: Læs hvert ord: 'ikke', 'tilladelse', 'direkte', 'forbudt', 'altid'.
- Mnemonic EN: Read every word: 'not', 'permission', 'straight', 'forbidden', 'always'.
- Cluster links: dem-demonstration, dem-betinget, dem-statsborger-stemme, vel-slaa-boern, dem-1849-ikke-kvinder, arb-deltid, kon-rigsfaellesskab, vel-tandlaege

### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:dem-rettigheder · `data/clusters.json:77` · asked 9× (2018-06, 2018-11, 2020-06, 2020-11, 2021-11, 2022-06, 2022-11, 2024-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Grundloven sikrer blandt andet forsamlingsfrihed, ytringsfrihed og religionsfrihed.  (`clusters.json:79`)
- Fact EN: The Constitution guarantees, among other things, freedom of assembly, freedom of expression and freedom of religion.  (`clusters.json:80`)
- Canonical question DA: Hvilken rettighed er sikret i den danske grundlov?  (`:106`)
- Canonical question EN: Which right is guaranteed in the Danish Constitution?  (`:107`)
- Canonical answer DA: Retten til at forsamles / ytre sig / selv vælge religion  (`:108`)
- Canonical answer EN: The right of assembly / to express yourself / to choose your own religion  (`:109`)
- Variants:
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:112`)
    Q EN: Which right is guaranteed in the Danish Constitution?
    A DA: Retten til at mødes til en demonstration
    A EN: The right to meet for a demonstration
    Question ids: 2018-06-q8
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:112`)
    Q EN: Which right is guaranteed in the Danish Constitution?
    A DA: Retten til at forsamles
    A EN: The right of assembly
    Question ids: 2018-11-q10, 2020-06-q24
  - Q DA: Hvilken rettighed er sikret i grundloven?  (`:131`)
    Q EN: Which right is guaranteed in the Constitution?
    A DA: Retten til at ytre sig
    A EN: The right to express yourself (freedom of expression)
    Question ids: 2020-11-q22
  - Q DA: Hvilken rettighed er beskyttet af den danske grundlov?  (`:140`)
    Q EN: Which right is protected by the Danish Constitution?
    A DA: Retten til at forsamles
    A EN: The right of assembly
    Question ids: 2021-11-q2
  - Q DA: Hvilken rettighed er beskyttet af grundloven?  (`:149`)
    Q EN: Which right is protected by the Constitution?
    A DA: Retten til selv at vælge religion
    A EN: The right to choose your own religion
    Question ids: 2022-06-q8, 2024-05-q3, 2024-11-q2
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:112`)
    Q EN: Which right is guaranteed in the Danish Constitution?
    A DA: Retten til at sige hvad man mener
    A EN: The right to say what you think
    Question ids: 2022-11-q19
- Trap note DA: De forkerte svar er altid: våben, stifte familie, have et arbejde, holde ferie. De står IKKE i grundloven.  (`:169`)
- Trap note EN: The wrong answers are always: weapons, starting a family, having a job, taking holidays. They are NOT in the Constitution.
- Current note DA: (empty)  (`:171`)
- Current note EN: (empty)

- **Q:2018-06-q8** · `data/questions.json:2587` · exam 2018-06 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:2591`)
  - Q EN: Which right is guaranteed in the Danish Constitution?  (`:2616`)
  - Option A DA: Retten til at stifte familie  (`:2595`) · EN: The right to start a family
  - Option B DA: Retten til at købe og bruge våben  (`:2600`) · EN: The right to buy and use weapons
  - Option C DA: Retten til at mødes til en demonstration  (`:2605`) · EN: The right to meet for a demonstration
  - Correct (`:2609`): C
  - Correct text: C) Retten til at mødes til en demonstration / The right to meet for a demonstration
  - image_note: null
- **Q:2018-11-q10** · `data/questions.json:3448` · exam 2018-11 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:3452`)
  - Q EN: Which right is guaranteed in the Danish Constitution?  (`:3477`)
  - Option A DA: Retten til at bære våben  (`:3456`) · EN: The right to bear arms
  - Option B DA: Retten til at stifte familie  (`:3461`) · EN: The right to start a family
  - Option C DA: Retten til at forsamles  (`:3466`) · EN: The right of assembly
  - Correct (`:3470`): C
  - Correct text: C) Retten til at forsamles / The right of assembly
  - image_note: null
- **Q:2020-06-q24** · `data/questions.json:6290` · exam 2020-06 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:6294`)
  - Q EN: Which right is guaranteed in the Danish Constitution?  (`:6319`)
  - Option A DA: Retten til at bære våben  (`:6298`) · EN: The right to bear arms
  - Option B DA: Retten til at stifte familie  (`:6303`) · EN: The right to start a family
  - Option C DA: Retten til at forsamles  (`:6308`) · EN: The right of assembly
  - Correct (`:6312`): C
  - Correct text: C) Retten til at forsamles / The right of assembly
  - image_note: null
- **Q:2020-11-q22** · `data/questions.json:7019` · exam 2020-11 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er sikret i grundloven?  (`:7023`)
  - Q EN: Which right is guaranteed in the Constitution?  (`:7048`)
  - Option A DA: Retten til at stifte familie  (`:7027`) · EN: The right to start a family
  - Option B DA: Retten til at bære våben  (`:7032`) · EN: The right to bear arms
  - Option C DA: Retten til at ytre sig  (`:7037`) · EN: The right to express yourself (freedom of expression)
  - Correct (`:7041`): C
  - Correct text: C) Retten til at ytre sig / The right to express yourself (freedom of expression)
  - image_note: null
- **Q:2021-11-q2** · `data/questions.json:7934` · exam 2021-11 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er beskyttet af den danske grundlov?  (`:7938`)
  - Q EN: Which right is protected by the Danish Constitution?  (`:7963`)
  - Option A DA: Retten til at holde ferie  (`:7942`) · EN: The right to take holidays
  - Option B DA: Retten til at eje våben  (`:7947`) · EN: The right to own weapons
  - Option C DA: Retten til at forsamles  (`:7952`) · EN: The right of assembly
  - Correct (`:7956`): C
  - Correct text: C) Retten til at forsamles / The right of assembly
  - image_note: null
- **Q:2022-06-q8** · `data/questions.json:8917` · exam 2022-06 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er beskyttet af grundloven?  (`:8921`)
  - Q EN: Which right is protected by the Constitution?  (`:8946`)
  - Option A DA: Retten til bære våben  (`:8925`) · EN: The right to bear arms
  - Option B DA: Retten til at have et arbejde  (`:8930`) · EN: The right to have a job
  - Option C DA: Retten til selv at vælge religion  (`:8935`) · EN: The right to choose your own religion
  - Correct (`:8939`): C
  - Correct text: C) Retten til selv at vælge religion / The right to choose your own religion
  - image_note: null
- **Q:2022-11-q19** · `data/questions.json:10050` · exam 2022-11 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er sikret i den danske grundlov?  (`:10054`)
  - Q EN: Which right is guaranteed in the Danish Constitution?  (`:10079`)
  - Option A DA: Retten til at stifte familie  (`:10058`) · EN: The right to start a family
  - Option B DA: Retten til at købe og bruge våben  (`:10063`) · EN: The right to buy and use weapons
  - Option C DA: Retten til at sige hvad man mener  (`:10068`) · EN: The right to say what you think
  - Correct (`:10072`): C
  - Correct text: C) Retten til at sige hvad man mener / The right to say what you think
  - image_note: null
- **Q:2024-05-q3** · `data/questions.json:11912` · exam 2024-05 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er beskyttet af grundloven?  (`:11916`)
  - Q EN: Which right is protected by the Constitution?  (`:11941`)
  - Option A DA: Retten til at bære våben  (`:11920`) · EN: The right to bear arms
  - Option B DA: Retten til at have et arbejde  (`:11925`) · EN: The right to have a job
  - Option C DA: Retten til selv at vælge religion  (`:11930`) · EN: The right to choose your own religion
  - Correct (`:11934`): C
  - Correct text: C) Retten til selv at vælge religion / The right to choose your own religion
  - image_note: null
- **Q:2024-11-q2** · `data/questions.json:12689` · exam 2024-11 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed er beskyttet af grundloven?  (`:12693`)
  - Q EN: Which right is protected by the Constitution?  (`:12718`)
  - Option A DA: Retten til at eje våben  (`:12697`) · EN: The right to own weapons
  - Option B DA: Retten til at have et arbejde  (`:12702`) · EN: The right to have a job
  - Option C DA: Retten til selv at vælge religion  (`:12707`) · EN: The right to choose your own religion
  - Correct (`:12711`): C
  - Correct text: C) Retten til selv at vælge religion / The right to choose your own religion
  - image_note: null

#### C:dem-kommunerne-boern · `data/clusters.json:175` · asked 8× (2016-12, 2017-06, 2017-11, 2019-11, 2020-11, 2021-06, 2023-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Kommunerne har ansvaret for vuggestuer, børnehaver og folkeskoler.  (`clusters.json:177`)
- Fact EN: The municipalities are responsible for nurseries, kindergartens and folkeskoler (public schools).  (`clusters.json:178`)
- Canonical question DA: Hvem står for driften af de offentlige børnehaver og vuggestuer?  (`:202`)
- Canonical question EN: Who runs the public kindergartens and nurseries?  (`:203`)
- Canonical answer DA: Kommunerne  (`:204`)
- Canonical answer EN: The municipalities  (`:205`)
- Variants:
  - Q DA: Hvem har ansvaret for de offentlige vuggestuer?  (`:208`)
    Q EN: Who is responsible for the public nurseries (vuggestuer, for children aged 0–3)?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2016-12-q11
  - Q DA: Hvilken instans står normalt for driften af de offentlige børnehaver og vuggestuer?  (`:217`)
    Q EN: Which authority normally runs the public kindergartens and nurseries?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2017-06-q13
  - Q DA: Hvem har normalt ansvaret for de offentlige børnehaver?  (`:226`)
    Q EN: Who is normally responsible for the public kindergartens?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2017-11-q8
  - Q DA: Hvem står for driften af de offentlige vuggestuer?  (`:235`)
    Q EN: Who runs the public nurseries?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2019-11-q11
  - Q DA: Hvem står for driften af folkeskolerne?  (`:244`)
    Q EN: Who runs the public primary and lower-secondary schools (folkeskolerne)?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2020-11-q12
  - Q DA: Hvem står normalt for driften af de offentlige børnehaver og vuggestuer?  (`:253`)
    Q EN: Who normally runs the public kindergartens and nurseries?
    A DA: Kommunerne
    A EN: The municipalities (kommunerne)
    Question ids: 2021-06-q17
  - Q DA: Hvilket af følgende områder har kommunerne ansvaret for?  (`:262`)
    Q EN: Which of the following areas are the municipalities responsible for?
    A DA: Børnehaver
    A EN: Kindergartens
    Question ids: 2023-11-q10, 2026-06-q3
- Trap note DA: Kommunen = børn og skole. Regionen = sygehuse. Staten = fx politiet. 'Hvilket område har kommunerne ansvaret for?' = Børnehaver.  (`:272`)
- Trap note EN: Municipality = children and school. Region = hospitals. State = e.g. the police. 'Which area are the municipalities responsible for?' = Kindergartens.
- Current note DA: (empty)  (`:274`)
- Current note EN: (empty)

- **Q:2016-12-q11** · `data/questions.json:313` · exam 2016-12 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har ansvaret for de offentlige vuggestuer?  (`:317`)
  - Q EN: Who is responsible for the public nurseries (vuggestuer, for children aged 0–3)?  (`:342`)
  - Option A DA: Kommunerne.  (`:321`) · EN: The municipalities (kommunerne)
  - Option B DA: Regionerne.  (`:326`) · EN: The regions (regionerne)
  - Option C DA: Staten.  (`:331`) · EN: The state
  - Correct (`:335`): A
  - Correct text: A) Kommunerne. / The municipalities (kommunerne)
  - image_note: null
- **Q:2017-06-q13** · `data/questions.json:1169` · exam 2017-06 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken instans står normalt for driften af de offentlige børnehaver og vuggestuer?  (`:1173`)
  - Q EN: Which authority normally runs the public kindergartens and nurseries?  (`:1198`)
  - Option A DA: Staten.  (`:1177`) · EN: The state
  - Option B DA: Regionerne.  (`:1182`) · EN: The regions (regionerne)
  - Option C DA: Kommunerne.  (`:1187`) · EN: The municipalities (kommunerne)
  - Correct (`:1191`): C
  - Correct text: C) Kommunerne. / The municipalities (kommunerne)
  - image_note: null
- **Q:2017-11-q8** · `data/questions.json:1789` · exam 2017-11 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har normalt ansvaret for de offentlige børnehaver?  (`:1793`)
  - Q EN: Who is normally responsible for the public kindergartens?  (`:1818`)
  - Option A DA: Staten  (`:1797`) · EN: The state
  - Option B DA: Regionerne  (`:1802`) · EN: The regions (regionerne)
  - Option C DA: Kommunerne  (`:1807`) · EN: The municipalities (kommunerne)
  - Correct (`:1811`): C
  - Correct text: C) Kommunerne / The municipalities (kommunerne)
  - image_note: null
- **Q:2019-11-q11** · `data/questions.json:5091` · exam 2019-11 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem står for driften af de offentlige vuggestuer?  (`:5095`)
  - Q EN: Who runs the public nurseries?  (`:5120`)
  - Option A DA: Staten  (`:5099`) · EN: The state
  - Option B DA: Regionerne  (`:5104`) · EN: The regions (regionerne)
  - Option C DA: Kommunerne  (`:5109`) · EN: The municipalities (kommunerne)
  - Correct (`:5113`): C
  - Correct text: C) Kommunerne / The municipalities (kommunerne)
  - image_note: null
- **Q:2020-11-q12** · `data/questions.json:6704` · exam 2020-11 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem står for driften af folkeskolerne?  (`:6708`)
  - Q EN: Who runs the public primary and lower-secondary schools (folkeskolerne)?  (`:6728`)
  - Option A DA: Staten  (`:6712`) · EN: The state
  - Option B DA: Kommunerne  (`:6717`) · EN: The municipalities (kommunerne)
  - Correct (`:6721`): B
  - Correct text: B) Kommunerne / The municipalities (kommunerne)
  - image_note: null
- **Q:2021-06-q17** · `data/questions.json:7634` · exam 2021-06 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem står normalt for driften af de offentlige børnehaver og vuggestuer?  (`:7638`)
  - Q EN: Who normally runs the public kindergartens and nurseries?  (`:7663`)
  - Option A DA: Staten  (`:7642`) · EN: The state
  - Option B DA: Regionerne  (`:7647`) · EN: The regions (regionerne)
  - Option C DA: Kommunerne  (`:7652`) · EN: The municipalities (kommunerne)
  - Correct (`:7656`): C
  - Correct text: C) Kommunerne / The municipalities (kommunerne)
  - image_note: null
- **Q:2023-11-q10** · `data/questions.json:11338` · exam 2023-11 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende områder har kommunerne ansvaret for?  (`:11342`)
  - Q EN: Which of the following areas are the municipalities responsible for?  (`:11367`)
  - Option A DA: Børnehaver  (`:11346`) · EN: Kindergartens
  - Option B DA: Sygehuse  (`:11351`) · EN: Hospitals
  - Option C DA: Politiet  (`:11356`) · EN: The police
  - Correct (`:11360`): A
  - Correct text: A) Børnehaver / Kindergartens
  - image_note: null
- **Q:2026-06-q3** · `data/questions.json:15092` · exam 2026-06 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende områder har kommunerne ansvaret for?  (`:15096`)
  - Q EN: Which of the following areas are the municipalities responsible for?  (`:15121`)
  - Option A DA: Sygehuse  (`:15100`) · EN: Hospitals
  - Option B DA: Børnehaver  (`:15105`) · EN: Kindergartens
  - Option C DA: Politiet  (`:15110`) · EN: The police
  - Correct (`:15114`): B
  - Correct text: B) Børnehaver / Kindergartens
  - image_note: null

#### C:dem-2-og-2 · `data/clusters.json:536` · asked 7× (2018-06, 2020-06, 2020-11, 2021-11, 2022-11, 2023-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Færøerne vælger 2 medlemmer og Grønland vælger 2 medlemmer til Folketinget.  (`clusters.json:538`)
- Fact EN: The Faroe Islands elect 2 members and Greenland elects 2 members to the Folketing.  (`clusters.json:539`)
- Canonical question DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne / i Grønland?  (`:561`)
- Canonical question EN: How many members of the Folketing are elected in the Faroe Islands / in Greenland?  (`:562`)
- Canonical answer DA: 2 (to)  (`:563`)
- Canonical answer EN: 2 (two)  (`:564`)
- Variants:
  - Q DA: Hvor mange medlemmer af Folketinget er valgt i Grønland?  (`:567`)
    Q EN: How many members of the Folketing are elected in Greenland?
    A DA: 2
    A EN: 2
    Question ids: 2018-06-q23, 2020-11-q21, 2022-11-q6
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:578`)
    Q EN: How many members of the Folketing are elected in the Faroe Islands?
    A DA: 2
    A EN: 2
    Question ids: 2020-06-q23, 2021-11-q18, 2023-05-q4
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:578`)
    Q EN: How many members of the Folketing are elected in the Faroe Islands?
    A DA: To
    A EN: Two
    Question ids: 2024-11-q9
- Trap note DA: Svaret er 2 for BÅDE Færøerne og Grønland. Det kan stå som tal (2) eller ord (To).  (`:598`)
- Trap note EN: The answer is 2 for BOTH the Faroe Islands and Greenland. It may be written as a number (2) or a word (To).
- Current note DA: (empty)  (`:600`)
- Current note EN: (empty)

- **Q:2018-06-q23** · `data/questions.json:3067` · exam 2018-06 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt i Grønland?  (`:3071`)
  - Q EN: How many members of the Folketing are elected in Greenland?  (`:3096`)
  - Option A DA: 2  (`:3075`) · EN: 2
  - Option B DA: 4  (`:3080`) · EN: 4
  - Option C DA: 6  (`:3085`) · EN: 6
  - Correct (`:3089`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2020-06-q23** · `data/questions.json:6257` · exam 2020-06 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:6261`)
  - Q EN: How many members of the Folketing are elected in the Faroe Islands?  (`:6286`)
  - Option A DA: 2  (`:6265`) · EN: 2
  - Option B DA: 4  (`:6270`) · EN: 4
  - Option C DA: 6  (`:6275`) · EN: 6
  - Correct (`:6279`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2020-11-q21** · `data/questions.json:6986` · exam 2020-11 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt i Grønland?  (`:6990`)
  - Q EN: How many members of the Folketing are elected in Greenland?  (`:7015`)
  - Option A DA: 2  (`:6994`) · EN: 2
  - Option B DA: 4  (`:6999`) · EN: 4
  - Option C DA: 6  (`:7004`) · EN: 6
  - Correct (`:7008`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2021-11-q18** · `data/questions.json:8437` · exam 2021-11 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:8441`)
  - Q EN: How many members of the Folketing are elected in the Faroe Islands?  (`:8466`)
  - Option A DA: 2  (`:8445`) · EN: 2
  - Option B DA: 4  (`:8450`) · EN: 4
  - Option C DA: 6  (`:8455`) · EN: 6
  - Correct (`:8459`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2022-11-q6** · `data/questions.json:9636` · exam 2022-11 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt i Grønland?  (`:9640`)
  - Q EN: How many members of the Folketing are elected in Greenland?  (`:9665`)
  - Option A DA: 2  (`:9644`) · EN: 2
  - Option B DA: 4  (`:9649`) · EN: 4
  - Option C DA: 6  (`:9654`) · EN: 6
  - Correct (`:9658`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2023-05-q4** · `data/questions.json:10360` · exam 2023-05 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:10364`)
  - Q EN: How many members of the Folketing are elected in the Faroe Islands?  (`:10389`)
  - Option A DA: 2  (`:10368`) · EN: 2
  - Option B DA: 4  (`:10373`) · EN: 4
  - Option C DA: 6  (`:10378`) · EN: 6
  - Correct (`:10382`): A
  - Correct text: A) 2 / 2
  - image_note: null
- **Q:2024-11-q9** · `data/questions.json:12910` · exam 2024-11 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer af Folketinget er valgt på Færøerne?  (`:12914`)
  - Q EN: How many members of the Folketing are elected in the Faroe Islands?  (`:12939`)
  - Option A DA: To  (`:12918`) · EN: Two
  - Option B DA: Fem  (`:12923`) · EN: Five
  - Option C DA: Otte  (`:12928`) · EN: Eight
  - Correct (`:12932`): A
  - Correct text: A) To / Two
  - image_note: null

#### C:dem-forening · `data/clusters.json:910` · asked 6× (2016-12, 2019-06, 2019-11, 2021-06, 2022-06, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Alle må danne en forening – også hvis man ikke er dansk statsborger. Foreningsfrihed står i grundloven.  (`clusters.json:912`)
- Fact EN: Everyone may form an association – also if you are not a Danish citizen. Freedom of association is in the Constitution.  (`clusters.json:913`)
- Canonical question DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:933`)
- Canonical question EN: May you form an association if you are not a Danish citizen?  (`:934`)
- Canonical answer DA: Ja  (`:935`)
- Canonical answer EN: Yes  (`:936`)
- Variants:
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:939`)
    Q EN: May you form an association if you are not a Danish citizen?
    A DA: Ja
    A EN: Yes
    Question ids: 2016-12-q9, 2019-11-q9, 2021-06-q4, 2022-06-q23, 2024-11-q4
  - Q DA: Har man ifølge Grundloven ret til at danne foreninger i Danmark?  (`:952`)
    Q EN: According to the Constitution, do you have the right to form associations in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2019-06-q7
- Trap note DA: (empty)  (`:961`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:963`)
- Current note EN: (empty)

- **Q:2016-12-q9** · `data/questions.json:252` · exam 2016-12 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:256`)
  - Q EN: May you form an association if you are not a Danish citizen?  (`:276`)
  - Option A DA: Ja.  (`:260`) · EN: Yes
  - Option B DA: Nej.  (`:265`) · EN: No
  - Correct (`:269`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2019-06-q7** · `data/questions.json:4164` · exam 2019-06 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Har man ifølge Grundloven ret til at danne foreninger i Danmark?  (`:4168`)
  - Q EN: According to the Constitution, do you have the right to form associations in Denmark?  (`:4188`)
  - Option A DA: Ja  (`:4172`) · EN: Yes
  - Option B DA: Nej  (`:4177`) · EN: No
  - Correct (`:4181`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2019-11-q9** · `data/questions.json:5030` · exam 2019-11 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:5034`)
  - Q EN: May you form an association if you are not a Danish citizen?  (`:5054`)
  - Option A DA: Ja  (`:5038`) · EN: Yes
  - Option B DA: Nej  (`:5043`) · EN: No
  - Correct (`:5047`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-06-q4** · `data/questions.json:7235` · exam 2021-06 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:7239`)
  - Q EN: May you form an association if you are not a Danish citizen?  (`:7259`)
  - Option A DA: Ja  (`:7243`) · EN: Yes
  - Option B DA: Nej  (`:7248`) · EN: No
  - Correct (`:7252`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-06-q23** · `data/questions.json:9397` · exam 2022-06 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:9401`)
  - Q EN: May you form an association if you are not a Danish citizen?  (`:9421`)
  - Option A DA: Ja  (`:9405`) · EN: Yes
  - Option B DA: Nej  (`:9410`) · EN: No
  - Correct (`:9414`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-11-q4** · `data/questions.json:12755` · exam 2024-11 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Må man danne en forening, hvis man ikke er dansk statsborger?  (`:12759`)
  - Q EN: May you form an association if you are not a Danish citizen?  (`:12779`)
  - Option A DA: Ja  (`:12763`) · EN: Yes
  - Option B DA: Nej  (`:12768`) · EN: No
  - Correct (`:12772`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:dem-179 · `data/clusters.json:1113` · asked 5× (2017-11, 2020-11, 2022-11, 2023-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Folketinget har 179 medlemmer.  (`clusters.json:1115`)
- Fact EN: The Folketing has 179 members.  (`clusters.json:1116`)
- Canonical question DA: Hvor mange medlemmer har Folketinget?  (`:1134`)
- Canonical question EN: How many members does the Folketing have?  (`:1135`)
- Canonical answer DA: 179  (`:1136`)
- Canonical answer EN: 179  (`:1137`)
- Variants:
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:1140`)
    Q EN: How many members does the Folketing have?
    A DA: 179
    A EN: 179
    Question ids: 2017-11-q15, 2020-11-q6, 2022-11-q13, 2023-11-q13, 2026-06-q15
- Trap note DA: 179 = 175 fra Danmark + 2 fra Færøerne + 2 fra Grønland.  (`:1153`)
- Trap note EN: 179 = 175 from Denmark + 2 from the Faroe Islands + 2 from Greenland.
- Current note DA: (empty)  (`:1155`)
- Current note EN: (empty)

- **Q:2017-11-q15** · `data/questions.json:2020` · exam 2017-11 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:2024`)
  - Q EN: How many members does the Folketing have?  (`:2049`)
  - Option A DA: 59  (`:2028`) · EN: 59
  - Option B DA: 119  (`:2033`) · EN: 119
  - Option C DA: 179  (`:2038`) · EN: 179
  - Correct (`:2042`): C
  - Correct text: C) 179 / 179
  - image_note: null
- **Q:2020-11-q6** · `data/questions.json:6516` · exam 2020-11 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:6520`)
  - Q EN: How many members does the Folketing have?  (`:6545`)
  - Option A DA: 69  (`:6524`) · EN: 69
  - Option B DA: 129  (`:6529`) · EN: 129
  - Option C DA: 179  (`:6534`) · EN: 179
  - Correct (`:6538`): C
  - Correct text: C) 179 / 179
  - image_note: null
- **Q:2022-11-q13** · `data/questions.json:9862` · exam 2022-11 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:9866`)
  - Q EN: How many members does the Folketing have?  (`:9891`)
  - Option A DA: 69  (`:9870`) · EN: 69
  - Option B DA: 129  (`:9875`) · EN: 129
  - Option C DA: 179  (`:9880`) · EN: 179
  - Correct (`:9884`): C
  - Correct text: C) 179 / 179
  - image_note: null
- **Q:2023-11-q13** · `data/questions.json:11437` · exam 2023-11 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:11441`)
  - Q EN: How many members does the Folketing have?  (`:11466`)
  - Option A DA: 87  (`:11445`) · EN: 87
  - Option B DA: 179  (`:11450`) · EN: 179
  - Option C DA: 265  (`:11455`) · EN: 265
  - Correct (`:11459`): B
  - Correct text: B) 179 / 179
  - image_note: null
- **Q:2026-06-q15** · `data/questions.json:15473` · exam 2026-06 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Folketinget?  (`:15477`)
  - Q EN: How many members does the Folketing have?  (`:15502`)
  - Option A DA: 87  (`:15481`) · EN: 87
  - Option B DA: 179  (`:15486`) · EN: 179
  - Option C DA: 265  (`:15491`) · EN: 265
  - Correct (`:15495`): B
  - Correct text: B) 179 / 179
  - image_note: null

#### C:dem-grundlov-1953 · `data/clusters.json:1159` · asked 5× (2017-11, 2020-06, 2023-05, 2024-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Grundloven blev sidst ændret i 1953.  (`clusters.json:1161`)
- Fact EN: The Constitution was last changed in 1953.  (`clusters.json:1162`)
- Canonical question DA: Hvornår er grundloven sidst blevet ændret?  (`:1180`)
- Canonical question EN: When was the Constitution last changed?  (`:1181`)
- Canonical answer DA: 1953  (`:1182`)
- Canonical answer EN: 1953  (`:1183`)
- Variants:
  - Q DA: Hvornår er grundloven senest blevet ændret?  (`:1186`)
    Q EN: When was the Constitution last changed?
    A DA: 1953
    A EN: 1953
    Question ids: 2017-11-q13
  - Q DA: Hvornår er grundloven sidst blevet ændret?  (`:1195`)
    Q EN: When was the Constitution last changed?
    A DA: 1953
    A EN: 1953
    Question ids: 2020-06-q17, 2024-11-q17, 2026-06-q4
  - Q DA: Hvornår blev grundloven sidst ændret?  (`:1206`)
    Q EN: When was the Constitution last changed?
    A DA: 1953
    A EN: 1953
    Question ids: 2023-05-q5
- Trap note DA: Lad dig ikke snyde af 1849 (første grundlov) eller 1915 (kvinders stemmeret).  (`:1215`)
- Trap note EN: Don't be fooled by 1849 (first Constitution) or 1915 (women's vote).
- Current note DA: (empty)  (`:1217`)
- Current note EN: (empty)

- **Q:2017-11-q13** · `data/questions.json:1954` · exam 2017-11 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår er grundloven senest blevet ændret?  (`:1958`)
  - Q EN: When was the Constitution last changed?  (`:1983`)
  - Option A DA: 1853  (`:1962`) · EN: 1853
  - Option B DA: 1903  (`:1967`) · EN: 1903
  - Option C DA: 1953  (`:1972`) · EN: 1953
  - Correct (`:1976`): C
  - Correct text: C) 1953 / 1953
  - image_note: null
- **Q:2020-06-q17** · `data/questions.json:6074` · exam 2020-06 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er grundloven sidst blevet ændret?  (`:6078`)
  - Q EN: When was the Constitution last changed?  (`:6103`)
  - Option A DA: 1849  (`:6082`) · EN: 1849
  - Option B DA: 1915  (`:6087`) · EN: 1915
  - Option C DA: 1953  (`:6092`) · EN: 1953
  - Correct (`:6096`): C
  - Correct text: C) 1953 / 1953
  - image_note: null
- **Q:2023-05-q5** · `data/questions.json:10393` · exam 2023-05 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev grundloven sidst ændret?  (`:10397`)
  - Q EN: When was the Constitution last changed?  (`:10422`)
  - Option A DA: 1855  (`:10401`) · EN: 1855
  - Option B DA: 1907  (`:10406`) · EN: 1907
  - Option C DA: 1953  (`:10411`) · EN: 1953
  - Correct (`:10415`): C
  - Correct text: C) 1953 / 1953
  - image_note: null
- **Q:2024-11-q17** · `data/questions.json:13169` · exam 2024-11 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår er grundloven sidst blevet ændret?  (`:13173`)
  - Q EN: When was the Constitution last changed?  (`:13198`)
  - Option A DA: 1866  (`:13177`) · EN: 1866
  - Option B DA: 1915  (`:13182`) · EN: 1915
  - Option C DA: 1953  (`:13187`) · EN: 1953
  - Correct (`:13191`): C
  - Correct text: C) 1953 / 1953
  - image_note: null
- **Q:2026-06-q4** · `data/questions.json:15125` · exam 2026-06 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår er grundloven sidst blevet ændret?  (`:15129`)
  - Q EN: When was the Constitution last changed?  (`:15154`)
  - Option A DA: 1866  (`:15133`) · EN: 1866
  - Option B DA: 1915  (`:15138`) · EN: 1915
  - Option C DA: 1953  (`:15143`) · EN: 1953
  - Correct (`:15147`): C
  - Correct text: C) 1953 / 1953
  - image_note: null

#### C:dem-kommuner-98 · `data/clusters.json:1321` · asked 5× (2018-06, 2021-06, 2022-11, 2024-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Der er 98 kommuner i Danmark.  (`clusters.json:1323`)
- Fact EN: There are 98 municipalities in Denmark.  (`clusters.json:1324`)
- Canonical question DA: Hvor mange kommuner er der i Danmark?  (`:1342`)
- Canonical question EN: How many municipalities are there in Denmark?  (`:1343`)
- Canonical answer DA: 98  (`:1344`)
- Canonical answer EN: 98  (`:1345`)
- Variants:
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:1348`)
    Q EN: How many municipalities (kommuner) are there in Denmark?
    A DA: 98
    A EN: 98
    Question ids: 2018-06-q21, 2021-06-q24, 2022-11-q10, 2024-05-q5, 2025-11-q6
- Trap note DA: 98 kommuner, men kun 5 regioner.  (`:1361`)
- Trap note EN: 98 municipalities, but only 5 regions.
- Current note DA: (empty)  (`:1363`)
- Current note EN: (empty)

- **Q:2018-06-q21** · `data/questions.json:3001` · exam 2018-06 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:3005`)
  - Q EN: How many municipalities (kommuner) are there in Denmark?  (`:3030`)
  - Option A DA: 68  (`:3009`) · EN: 68
  - Option B DA: 98  (`:3014`) · EN: 98
  - Option C DA: 128  (`:3019`) · EN: 128
  - Correct (`:3023`): B
  - Correct text: B) 98 / 98
  - image_note: null
- **Q:2021-06-q24** · `data/questions.json:7845` · exam 2021-06 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:7849`)
  - Q EN: How many municipalities (kommuner) are there in Denmark?  (`:7874`)
  - Option A DA: 68  (`:7853`) · EN: 68
  - Option B DA: 98  (`:7858`) · EN: 98
  - Option C DA: 128  (`:7863`) · EN: 128
  - Correct (`:7867`): B
  - Correct text: B) 98 / 98
  - image_note: null
- **Q:2022-11-q10** · `data/questions.json:9768` · exam 2022-11 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:9772`)
  - Q EN: How many municipalities (kommuner) are there in Denmark?  (`:9797`)
  - Option A DA: 18  (`:9776`) · EN: 18
  - Option B DA: 98  (`:9781`) · EN: 98
  - Option C DA: 178  (`:9786`) · EN: 178
  - Correct (`:9790`): B
  - Correct text: B) 98 / 98
  - image_note: null
- **Q:2024-05-q5** · `data/questions.json:11978` · exam 2024-05 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:11982`)
  - Q EN: How many municipalities (kommuner) are there in Denmark?  (`:12007`)
  - Option A DA: 37  (`:11986`) · EN: 37
  - Option B DA: 98  (`:11991`) · EN: 98
  - Option C DA: 165  (`:11996`) · EN: 165
  - Correct (`:12000`): B
  - Correct text: B) 98 / 98
  - image_note: null
- **Q:2025-11-q6** · `data/questions.json:14396` · exam 2025-11 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange kommuner er der i Danmark?  (`:14400`)
  - Q EN: How many municipalities (kommuner) are there in Denmark?  (`:14425`)
  - Option A DA: 19  (`:14404`) · EN: 19
  - Option B DA: 41  (`:14409`) · EN: 41
  - Option C DA: 98  (`:14414`) · EN: 98
  - Correct (`:14418`): C
  - Correct text: C) 98 / 98
  - image_note: null

#### C:dem-statsborger-stemme · `data/clusters.json:1367` · asked 5× (2017-06, 2020-11, 2021-11, 2023-11, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Man skal være dansk statsborger for at stemme til folketingsvalg.  (`clusters.json:1369`)
- Fact EN: You must be a Danish citizen to vote in general elections.  (`clusters.json:1370`)
- Canonical question DA: Skal man være dansk statsborger for at stemme til folketingsvalg?  (`:1388`)
- Canonical question EN: Must you be a Danish citizen to vote in general elections?  (`:1389`)
- Canonical answer DA: Ja  (`:1390`)
- Canonical answer EN: Yes  (`:1391`)
- Variants:
  - Q DA: Kan udlændinge stemme til folketingsvalg i Danmark?  (`:1394`)
    Q EN: Can foreigners vote in general elections in Denmark?
    A DA: Nej
    A EN: No
    Question ids: 2017-06-q24
  - Q DA: Skal man være dansk statsborger for at kunne stemme til folketingsvalg i Danmark?  (`:1403`)
    Q EN: Must you be a Danish citizen to be able to vote in general elections in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-11-q9
  - Q DA: Skal man være dansk statsborger for at stemme til folketingsvalg?  (`:1412`)
    Q EN: Must you be a Danish citizen to vote in general elections?
    A DA: Ja
    A EN: Yes
    Question ids: 2021-11-q6, 2023-11-q1, 2025-11-q18
- Trap note DA: Modsat spørgsmål: 'Kan udlændinge stemme til folketingsvalg?' = Nej. (Til kommunal- og regionsvalg kan udlændinge stemme på visse betingelser.)  (`:1423`)
- Trap note EN: Opposite question: 'Can foreigners vote in general elections?' = No. (Foreigners can vote in municipal and regional elections under certain conditions.)
- Current note DA: (empty)  (`:1425`)
- Current note EN: (empty)

- **Q:2017-06-q24** · `data/questions.json:1512` · exam 2017-06 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Kan udlændinge stemme til folketingsvalg i Danmark?  (`:1516`)
  - Q EN: Can foreigners vote in general elections in Denmark?  (`:1536`)
  - Option A DA: Ja.  (`:1520`) · EN: Yes
  - Option B DA: Nej.  (`:1525`) · EN: No
  - Correct (`:1529`): B
  - Correct text: B) Nej. / No
  - image_note: null
- **Q:2020-11-q9** · `data/questions.json:6615` · exam 2020-11 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal man være dansk statsborger for at kunne stemme til folketingsvalg i Danmark?  (`:6619`)
  - Q EN: Must you be a Danish citizen to be able to vote in general elections in Denmark?  (`:6639`)
  - Option A DA: Ja  (`:6623`) · EN: Yes
  - Option B DA: Nej  (`:6628`) · EN: No
  - Correct (`:6632`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-11-q6** · `data/questions.json:8061` · exam 2021-11 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal man være dansk statsborger for at stemme til folketingsvalg?  (`:8065`)
  - Q EN: Must you be a Danish citizen to vote in general elections?  (`:8085`)
  - Option A DA: Ja  (`:8069`) · EN: Yes
  - Option B DA: Nej  (`:8074`) · EN: No
  - Correct (`:8078`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2023-11-q1** · `data/questions.json:11056` · exam 2023-11 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal man være dansk statsborger for at stemme til folketingsvalg?  (`:11060`)
  - Q EN: Must you be a Danish citizen to vote in general elections?  (`:11080`)
  - Option A DA: Ja  (`:11064`) · EN: Yes
  - Option B DA: Nej  (`:11069`) · EN: No
  - Correct (`:11073`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2025-11-q18** · `data/questions.json:14782` · exam 2025-11 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal man være dansk statsborger for at stemme til folketingsvalg?  (`:14786`)
  - Q EN: Must you be a Danish citizen to vote in general elections?  (`:14806`)
  - Option A DA: Ja  (`:14790`) · EN: Yes
  - Option B DA: Nej  (`:14795`) · EN: No
  - Correct (`:14799`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:dem-anke · `data/clusters.json:1639` · asked 5× (2016-12, 2019-11, 2022-06, 2023-11, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: En dom fra byretten kan ankes til landsretten.  (`clusters.json:1641`)
- Fact EN: A ruling from the District Court (byretten) can be appealed to the High Court (landsretten).  (`clusters.json:1642`)
- Canonical question DA: Hvortil kan man anke en afgørelse fra byretten?  (`:1660`)
- Canonical question EN: Where can you appeal a decision from the District Court?  (`:1661`)
- Canonical answer DA: Landsretten  (`:1662`)
- Canonical answer EN: The High Court (landsretten)  (`:1663`)
- Variants:
  - Q DA: Mange retssager afgøres i Byretten. Hvor kan man anke en afgørelse herfra, som man er uenig i?  (`:1666`)
    Q EN: Many court cases are decided in the District Court (Byretten). Where can you appeal a decision from there that you disagree with?
    A DA: Landsretten
    A EN: The High Court (Landsretten)
    Question ids: 2016-12-q21
  - Q DA: Hvortil kan man anke en afgørelse fra Byretten?  (`:1675`)
    Q EN: Where can you appeal a decision from the District Court?
    A DA: Til Landsretten
    A EN: To the High Court (Landsretten)
    Question ids: 2019-11-q21
  - Q DA: Hvortil kan man anke en afgørelse fra byretten?  (`:1684`)
    Q EN: Where can you appeal a decision from the District Court?
    A DA: Landsretten
    A EN: The High Court (Landsretten)
    Question ids: 2022-06-q4
  - Q DA: Hvortil kan man normalt anke en afgørelse fra byretten?  (`:1693`)
    Q EN: Where can you normally appeal a decision from the District Court?
    A DA: Landsretten
    A EN: The High Court (Landsretten)
    Question ids: 2023-11-q15
  - Q DA: Hvortil kan man normalt anke (appellere) en afgørelse fra byretten?  (`:1702`)
    Q EN: Where can you normally appeal a decision from the District Court?
    A DA: Landsretten
    A EN: The High Court (Landsretten)
    Question ids: 2025-05-q12
- Trap note DA: Rækkefølgen er: byret → landsret → Højesteret. Man går ét trin op ad gangen.  (`:1711`)
- Trap note EN: The order is: District Court → High Court → Supreme Court. You go up one step at a time.
- Current note DA: (empty)  (`:1713`)
- Current note EN: (empty)

- **Q:2016-12-q21** · `data/questions.json:638` · exam 2016-12 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Mange retssager afgøres i Byretten. Hvor kan man anke en afgørelse herfra, som man er uenig i?  (`:642`)
  - Q EN: Many court cases are decided in the District Court (Byretten). Where can you appeal a decision from there that you disagree with?  (`:662`)
  - Option A DA: Landsretten.  (`:646`) · EN: The High Court (Landsretten)
  - Option B DA: Højesteret.  (`:651`) · EN: The Supreme Court (Højesteret)
  - Correct (`:655`): A
  - Correct text: A) Landsretten. / The High Court (Landsretten)
  - image_note: null
- **Q:2019-11-q21** · `data/questions.json:5411` · exam 2019-11 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvortil kan man anke en afgørelse fra Byretten?  (`:5415`)
  - Q EN: Where can you appeal a decision from the District Court?  (`:5435`)
  - Option A DA: Til Landsretten  (`:5419`) · EN: To the High Court (Landsretten)
  - Option B DA: Til Højesteret  (`:5424`) · EN: To the Supreme Court
  - Correct (`:5428`): A
  - Correct text: A) Til Landsretten / To the High Court (Landsretten)
  - image_note: null
- **Q:2022-06-q4** · `data/questions.json:8790` · exam 2022-06 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvortil kan man anke en afgørelse fra byretten?  (`:8794`)
  - Q EN: Where can you appeal a decision from the District Court?  (`:8814`)
  - Option A DA: Landsretten  (`:8798`) · EN: The High Court (Landsretten)
  - Option B DA: Højesteret  (`:8803`) · EN: The Supreme Court (Højesteret)
  - Correct (`:8807`): A
  - Correct text: A) Landsretten / The High Court (Landsretten)
  - image_note: null
- **Q:2023-11-q15** · `data/questions.json:11503` · exam 2023-11 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvortil kan man normalt anke en afgørelse fra byretten?  (`:11507`)
  - Q EN: Where can you normally appeal a decision from the District Court?  (`:11527`)
  - Option A DA: Landsretten  (`:11511`) · EN: The High Court (Landsretten)
  - Option B DA: Højesteret  (`:11516`) · EN: The Supreme Court (Højesteret)
  - Correct (`:11520`): A
  - Correct text: A) Landsretten / The High Court (Landsretten)
  - image_note: null
- **Q:2025-05-q12** · `data/questions.json:13789` · exam 2025-05 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvortil kan man normalt anke (appellere) en afgørelse fra byretten?  (`:13793`)
  - Q EN: Where can you normally appeal a decision from the District Court?  (`:13813`)
  - Option A DA: Landsretten  (`:13797`) · EN: The High Court (Landsretten)
  - Option B DA: Højesteret  (`:13802`) · EN: The Supreme Court (Højesteret)
  - Correct (`:13806`): A
  - Correct text: A) Landsretten / The High Court (Landsretten)
  - image_note: null

#### C:dem-betinget · `data/clusters.json:1717` · asked 5× (2017-11, 2020-06, 2021-11, 2023-05, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: En betinget dom betyder, at man ikke skal i fængsel, hvis man overholder betingelserne (fx ikke begår ny kriminalitet).  (`clusters.json:1719`)
- Fact EN: A suspended sentence means you do not go to prison if you keep the conditions (e.g. commit no new crime).  (`clusters.json:1720`)
- Canonical question DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:1738`)
- Canonical question EN: Does a suspended prison sentence mean that you go straight to prison?  (`:1739`)
- Canonical answer DA: Nej  (`:1740`)
- Canonical answer EN: No  (`:1741`)
- Variants:
  - Q DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:1744`)
    Q EN: Does a suspended prison sentence (betinget fængselsstraf) mean that you go straight to prison?
    A DA: Nej
    A EN: No
    Question ids: 2017-11-q25, 2021-11-q13, 2023-05-q2, 2025-05-q11
  - Q DA: Betyder en betinget fængselsstraf, at man kan undgå at komme i fængsel?  (`:1756`)
    Q EN: Does a suspended prison sentence mean that you can avoid going to prison?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-06-q21
- Trap note DA: Samme fakta – modsat spørgsmål! 'Skal man direkte i fængsel?' = Nej. 'Kan man undgå at komme i fængsel?' = Ja.  (`:1765`)
- Trap note EN: Same fact – opposite question! 'Do you go straight to prison?' = No. 'Can you avoid going to prison?' = Yes.
- Current note DA: (empty)  (`:1767`)
- Current note EN: (empty)

- **Q:2017-11-q25** · `data/questions.json:2338` · exam 2017-11 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:2342`)
  - Q EN: Does a suspended prison sentence (betinget fængselsstraf) mean that you go straight to prison?  (`:2362`)
  - Option A DA: Ja  (`:2346`) · EN: Yes
  - Option B DA: Nej  (`:2351`) · EN: No
  - Correct (`:2355`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2020-06-q21** · `data/questions.json:6201` · exam 2020-06 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Betyder en betinget fængselsstraf, at man kan undgå at komme i fængsel?  (`:6205`)
  - Q EN: Does a suspended prison sentence mean that you can avoid going to prison?  (`:6225`)
  - Option A DA: Ja  (`:6209`) · EN: Yes
  - Option B DA: Nej  (`:6214`) · EN: No
  - Correct (`:6218`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-11-q13** · `data/questions.json:8277` · exam 2021-11 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:8281`)
  - Q EN: Does a suspended prison sentence (betinget fængselsstraf) mean that you go straight to prison?  (`:8301`)
  - Option A DA: Ja  (`:8285`) · EN: Yes
  - Option B DA: Nej  (`:8290`) · EN: No
  - Correct (`:8294`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2023-05-q2** · `data/questions.json:10299` · exam 2023-05 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:10303`)
  - Q EN: Does a suspended prison sentence (betinget fængselsstraf) mean that you go straight to prison?  (`:10323`)
  - Option A DA: Ja  (`:10307`) · EN: Yes
  - Option B DA: Nej  (`:10312`) · EN: No
  - Correct (`:10316`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2025-05-q11** · `data/questions.json:13761` · exam 2025-05 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Betyder en betinget fængselsstraf, at man skal direkte i fængsel?  (`:13765`)
  - Q EN: Does a suspended prison sentence (betinget fængselsstraf) mean that you go straight to prison?  (`:13785`)
  - Option A DA: Ja  (`:13769`) · EN: Yes
  - Option B DA: Nej  (`:13774`) · EN: No
  - Correct (`:13778`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-folketingsvalg · `data/clusters.json:1833` · asked 5× (2017-06, 2019-06, 2020-06, 2020-11, 2024-05) · frequent: yes · last asked: 2024-05

- Fact DA: Der skal være folketingsvalg mindst hvert 4. år.  (`clusters.json:1835`)
- Fact EN: There must be a general election at least every 4 years.  (`clusters.json:1836`)
- Canonical question DA: Hvor ofte skal der ifølge grundloven afholdes folketingsvalg?  (`:1854`)
- Canonical question EN: According to the Constitution, how often must general elections be held?  (`:1855`)
- Canonical answer DA: Mindst hvert 4. år  (`:1856`)
- Canonical answer EN: At least every 4 years  (`:1857`)
- Variants:
  - Q DA: Hvor ofte skal der ifølge grundloven afholdes Folketingsvalg?  (`:1860`)
    Q EN: According to the Constitution, how often must general elections be held?
    A DA: Mindst hvert 4. år
    A EN: At least every 4 years
    Question ids: 2017-06-q10, 2020-11-q13
  - Q DA: Hvor tit er der valg til Folketinget?  (`:1870`)
    Q EN: How often are there general elections to the Folketing?
    A DA: Mindst hvert fjerde år
    A EN: At least every four years
    Question ids: 2019-06-q9
  - Q DA: Hvor ofte skal der ifølge grundloven afholdes folketingsvalg?  (`:1879`)
    Q EN: According to the Constitution, how often must general elections be held?
    A DA: Mindst hvert fjerde år
    A EN: At least every four years
    Question ids: 2020-06-q7
  - Q DA: Hvor ofte skal der være valg til Folketinget?  (`:1888`)
    Q EN: How often must there be general elections to the Folketing?
    A DA: Hvert fjerde år
    A EN: Every four years
    Question ids: 2024-05-q19
- Trap note DA: Folketing og kommune/region: hvert 4. år. Europa-Parlamentet: hvert 5. år.  (`:1897`)
- Trap note EN: Folketing and municipality/region: every 4 years. European Parliament: every 5 years.
- Current note DA: (empty)  (`:1899`)
- Current note EN: (empty)

- **Q:2017-06-q10** · `data/questions.json:1080` · exam 2017-06 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor ofte skal der ifølge grundloven afholdes Folketingsvalg?  (`:1084`)
  - Q EN: According to the Constitution, how often must general elections be held?  (`:1109`)
  - Option A DA: Mindst hvert 3. år.  (`:1088`) · EN: At least every 3 years
  - Option B DA: Mindst hvert 4. år.  (`:1093`) · EN: At least every 4 years
  - Option C DA: Mindst hvert 5. år.  (`:1098`) · EN: At least every 5 years
  - Correct (`:1102`): B
  - Correct text: B) Mindst hvert 4. år. / At least every 4 years
  - image_note: null
- **Q:2019-06-q9** · `data/questions.json:4225` · exam 2019-06 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor tit er der valg til Folketinget?  (`:4229`)
  - Q EN: How often are there general elections to the Folketing?  (`:4254`)
  - Option A DA: Mindst hvert andet år  (`:4233`) · EN: At least every two years
  - Option B DA: Mindst hvert tredje år  (`:4238`) · EN: At least every three years
  - Option C DA: Mindst hvert fjerde år  (`:4243`) · EN: At least every four years
  - Correct (`:4247`): C
  - Correct text: C) Mindst hvert fjerde år / At least every four years
  - image_note: null
- **Q:2020-06-q7** · `data/questions.json:5759` · exam 2020-06 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ofte skal der ifølge grundloven afholdes folketingsvalg?  (`:5763`)
  - Q EN: According to the Constitution, how often must general elections be held?  (`:5788`)
  - Option A DA: Mindst hvert andet år  (`:5767`) · EN: At least every two years
  - Option B DA: Mindst hvert tredje år  (`:5772`) · EN: At least every three years
  - Option C DA: Mindst hvert fjerde år  (`:5777`) · EN: At least every four years
  - Correct (`:5781`): C
  - Correct text: C) Mindst hvert fjerde år / At least every four years
  - image_note: null
- **Q:2020-11-q13** · `data/questions.json:6732` · exam 2020-11 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ofte skal der ifølge grundloven afholdes folketingsvalg?  (`:6736`)
  - Q EN: According to the Constitution, how often must general elections be held?  (`:6761`)
  - Option A DA: Mindst hvert 2. år  (`:6740`) · EN: At least every 2 years
  - Option B DA: Mindst hvert 4. år  (`:6745`) · EN: At least every 4 years
  - Option C DA: Mindst hvert 6. år  (`:6750`) · EN: At least every 6 years
  - Correct (`:6754`): B
  - Correct text: B) Mindst hvert 4. år / At least every 4 years
  - image_note: null
- **Q:2024-05-q19** · `data/questions.json:12435` · exam 2024-05 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ofte skal der være valg til Folketinget?  (`:12439`)
  - Q EN: How often must there be general elections to the Folketing?  (`:12464`)
  - Option A DA: Hvert fjerde år  (`:12443`) · EN: Every four years
  - Option B DA: Hvert femte år  (`:12448`) · EN: Every five years
  - Option C DA: Hvert sjette år  (`:12453`) · EN: Every six years
  - Correct (`:12457`): A
  - Correct text: A) Hvert fjerde år / Every four years
  - image_note: null

#### C:dem-grundlov-1849 · `data/clusters.json:1973` · asked 5× (2017-06, 2019-06, 2019-11, 2021-06, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: Danmarks første grundlov er fra 1849 (5. juni 1849).  (`clusters.json:1975`)
- Fact EN: Denmark's first Constitution is from 1849 (5 June 1849).  (`clusters.json:1976`)
- Canonical question DA: Hvornår er Danmarks Riges Grundlov fra?  (`:1994`)
- Canonical question EN: When is the Constitution of the Kingdom of Denmark from?  (`:1995`)
- Canonical answer DA: 1849  (`:1996`)
- Canonical answer EN: 1849  (`:1997`)
- Variants:
  - Q DA: Hvornår er Danmarks Riges Grundlov fra?  (`:2000`)
    Q EN: When is the Constitution of the Kingdom of Denmark from?
    A DA: 1849
    A EN: 1849
    Question ids: 2017-06-q3, 2019-06-q12
  - Q DA: Hvornår er den første grundlov fra?  (`:2010`)
    Q EN: When is the first Constitution from?
    A DA: 1800-tallet
    A EN: The 1800s
    Question ids: 2019-11-q1
  - Q DA: Hvornår blev Danmarks Riges Grundlov indført?  (`:2019`)
    Q EN: When was the Constitution of the Kingdom of Denmark introduced?
    A DA: 1849
    A EN: 1849
    Question ids: 2021-06-q7
  - Q DA: Hvornår trådte Danmarks Riges Grundlov i kraft?  (`:2028`)
    Q EN: When did the Constitution of the Kingdom of Denmark come into force?
    A DA: 1849
    A EN: 1849
    Question ids: 2022-11-q25
- Trap note DA: Spørgsmålet kan spørge om århundredet: 1849 = 1800-tallet. 1849 = første grundlov, 1953 = sidst ændret.  (`:2037`)
- Trap note EN: The question may ask for the century: 1849 = the 1800s. 1849 = first Constitution, 1953 = last changed.
- Current note DA: (empty)  (`:2039`)
- Current note EN: (empty)

- **Q:2017-06-q3** · `data/questions.json:854` · exam 2017-06 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår er Danmarks Riges Grundlov fra?  (`:858`)
  - Q EN: When is the Constitution of the Kingdom of Denmark from?  (`:883`)
  - Option A DA: 1661.  (`:862`) · EN: 1661
  - Option B DA: 1788.  (`:867`) · EN: 1788
  - Option C DA: 1849.  (`:872`) · EN: 1849
  - Correct (`:876`): C
  - Correct text: C) 1849. / 1849
  - image_note: null
- **Q:2019-06-q12** · `data/questions.json:4324` · exam 2019-06 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er Danmarks Riges Grundlov fra?  (`:4328`)
  - Q EN: When is the Constitution of the Kingdom of Denmark from?  (`:4353`)
  - Option A DA: 1649  (`:4332`) · EN: 1649
  - Option B DA: 1749  (`:4337`) · EN: 1749
  - Option C DA: 1849  (`:4342`) · EN: 1849
  - Correct (`:4346`): C
  - Correct text: C) 1849 / 1849
  - image_note: null
- **Q:2019-11-q1** · `data/questions.json:4776` · exam 2019-11 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er den første grundlov fra?  (`:4780`)
  - Q EN: When is the first Constitution from?  (`:4805`)
  - Option A DA: 1600-tallet  (`:4784`) · EN: The 1600s
  - Option B DA: 1700-tallet  (`:4789`) · EN: The 1700s
  - Option C DA: 1800-tallet  (`:4794`) · EN: The 1800s
  - Correct (`:4798`): C
  - Correct text: C) 1800-tallet / The 1800s
  - image_note: null
- **Q:2021-06-q7** · `data/questions.json:7324` · exam 2021-06 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev Danmarks Riges Grundlov indført?  (`:7328`)
  - Q EN: When was the Constitution of the Kingdom of Denmark introduced?  (`:7353`)
  - Option A DA: 1661  (`:7332`) · EN: 1661
  - Option B DA: 1788  (`:7337`) · EN: 1788
  - Option C DA: 1849  (`:7342`) · EN: 1849
  - Correct (`:7346`): C
  - Correct text: C) 1849 / 1849
  - image_note: null
- **Q:2022-11-q25** · `data/questions.json:10233` · exam 2022-11 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår trådte Danmarks Riges Grundlov i kraft?  (`:10237`)
  - Q EN: When did the Constitution of the Kingdom of Denmark come into force?  (`:10262`)
  - Option A DA: 1849  (`:10241`) · EN: 1849
  - Option B DA: 1923  (`:10246`) · EN: 1923
  - Option C DA: 1958  (`:10251`) · EN: 1958
  - Correct (`:10255`): A
  - Correct text: A) 1849 / 1849
  - image_note: null

#### C:dem-straffeattest · `data/clusters.json:2043` · asked 5× (2016-12, 2018-06, 2019-11, 2021-06, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: En straffeattest er et dokument, der viser, om man har været straffet.  (`clusters.json:2045`)
- Fact EN: A straffeattest (criminal record certificate) is a document that shows whether you have been convicted.  (`clusters.json:2046`)
- Canonical question DA: Hvad er en straffeattest?  (`:2064`)
- Canonical question EN: What is a straffeattest?  (`:2065`)
- Canonical answer DA: Et dokument, der viser, om man har været straffet  (`:2066`)
- Canonical answer EN: A document that shows whether you have been convicted  (`:2067`)
- Variants:
  - Q DA: Hvad er en straffeattest?  (`:2070`)
    Q EN: What is a criminal record certificate (straffeattest)?
    A DA: Et dokument, der viser, om man har været straffet
    A EN: A document that shows whether you have been convicted of a crime
    Question ids: 2016-12-q17, 2018-06-q22, 2019-11-q17
  - Q DA: Hvad er en straffeattest?  (`:2070`)
    Q EN: What is a criminal record certificate (straffeattest)?
    A DA: Et dokument, der viser, om man har været straffet for visse forbrydelser
    A EN: A document that shows whether you have been convicted of certain crimes
    Question ids: 2021-06-q9
  - Q DA: Hvad er en straffeattest?  (`:2070`)
    Q EN: What is a criminal record certificate (straffeattest)?
    A DA: Et dokument, der viser, om man har været straffet for forbrydelser
    A EN: A document that shows whether you have been convicted of crimes
    Question ids: 2022-11-q16
- Trap note DA: Det er ikke noget, man viser politiet ved anholdelse, og ikke en ansøgning om statsborgerskab.  (`:2099`)
- Trap note EN: It is not something you show the police when arrested, and not an application for citizenship.
- Current note DA: (empty)  (`:2101`)
- Current note EN: (empty)

- **Q:2016-12-q17** · `data/questions.json:506` · exam 2016-12 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er en straffeattest?  (`:510`)
  - Q EN: What is a criminal record certificate (straffeattest)?  (`:535`)
  - Option A DA: Et dokument, man skal vise til politiet, hvis man bliver anholdt.  (`:514`) · EN: A document you must show the police if you are arrested
  - Option B DA: Et dokument, man skal udfylde, hvis man ønsker at blive dansk statsborger.  (`:519`) · EN: A document you must fill in if you want to become a Danish citizen
  - Option C DA: Et dokument, der viser, om man har været straffet.  (`:524`) · EN: A document that shows whether you have been convicted of a crime
  - Correct (`:528`): C
  - Correct text: C) Et dokument, der viser, om man har været straffet. / A document that shows whether you have been convicted of a crime
  - image_note: null
- **Q:2018-06-q22** · `data/questions.json:3034` · exam 2018-06 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en straffeattest?  (`:3038`)
  - Q EN: What is a criminal record certificate (straffeattest)?  (`:3063`)
  - Option A DA: Et dokument, man skal udfylde, hvis man ønsker at blive dansk statsborger  (`:3042`) · EN: A document you must fill in if you want to become a Danish citizen
  - Option B DA: Et dokument, man skal vise til politiet, hvis man bliver anholdt  (`:3047`) · EN: A document you must show the police if you are arrested
  - Option C DA: Et dokument, der viser, om man har været straffet  (`:3052`) · EN: A document that shows whether you have been convicted of a crime
  - Correct (`:3056`): C
  - Correct text: C) Et dokument, der viser, om man har været straffet / A document that shows whether you have been convicted of a crime
  - image_note: null
- **Q:2019-11-q17** · `data/questions.json:5284` · exam 2019-11 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en straffeattest?  (`:5288`)
  - Q EN: What is a criminal record certificate (straffeattest)?  (`:5308`)
  - Option A DA: Et dokument, man skal vise til politiet, hvis man bliver anholdt  (`:5292`) · EN: A document you must show the police if you are arrested
  - Option B DA: Et dokument, der viser, om man har været straffet  (`:5297`) · EN: A document that shows whether you have been convicted of a crime
  - Correct (`:5301`): B
  - Correct text: B) Et dokument, der viser, om man har været straffet / A document that shows whether you have been convicted of a crime
  - image_note: null
- **Q:2021-06-q9** · `data/questions.json:7385` · exam 2021-06 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en straffeattest?  (`:7389`)
  - Q EN: What is a criminal record certificate (straffeattest)?  (`:7409`)
  - Option A DA: Et dokument, man skal vise til politiet, hvis man bliver anholdt  (`:7393`) · EN: A document you must show the police if you are arrested
  - Option B DA: Et dokument, der viser, om man har været straffet for visse forbrydelser  (`:7398`) · EN: A document that shows whether you have been convicted of certain crimes
  - Correct (`:7402`): B
  - Correct text: B) Et dokument, der viser, om man har været straffet for visse forbrydelser / A document that shows whether you have been convicted of certain crimes
  - image_note: null
- **Q:2022-11-q16** · `data/questions.json:9961` · exam 2022-11 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en straffeattest?  (`:9965`)
  - Q EN: What is a criminal record certificate (straffeattest)?  (`:9985`)
  - Option A DA: Et dokument, man skal vise til politiet, hvis man bliver anholdt  (`:9969`) · EN: A document you must show the police if you are arrested
  - Option B DA: Et dokument, der viser, om man har været straffet for forbrydelser  (`:9974`) · EN: A document that shows whether you have been convicted of crimes
  - Correct (`:9978`): B
  - Correct text: B) Et dokument, der viser, om man har været straffet for forbrydelser / A document that shows whether you have been convicted of crimes
  - image_note: null

#### C:dem-valgdeltagelse · `data/clusters.json:2495` · asked 4× (2022-06, 2022-11, 2024-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Ca. 80-90 procent af vælgerne stemmer ved folketingsvalg.  (`clusters.json:2497`)
- Fact EN: About 80–90 per cent of voters vote in general elections.  (`clusters.json:2498`)
- Canonical question DA: Hvor stor en del af borgerne med stemmeret stemmer normalt ved folketingsvalg?  (`:2514`)
- Canonical question EN: What share of citizens with the right to vote normally vote in a general election?  (`:2515`)
- Canonical answer DA: 80-90 procent  (`:2516`)
- Canonical answer EN: 80–90 per cent  (`:2517`)
- Variants:
  - Q DA: Hvor stor en del af borgerne med stemmeret stemmer normalt, når der er folketingsvalg?  (`:2520`)
    Q EN: What share of citizens with the right to vote normally vote in a general election?
    A DA: 80-90 procent
    A EN: 80–90 per cent
    Question ids: 2022-06-q2
  - Q DA: Hvor mange stemmer normalt ved valg til Folketinget?  (`:2529`)
    Q EN: How many people normally vote in general elections to the Folketing?
    A DA: 80-90 procent
    A EN: 80–90 per cent
    Question ids: 2022-11-q12
  - Q DA: Hvor stor en del af borgere med stemmeret stemmer normalt, når der er folketingsvalg?  (`:2538`)
    Q EN: What share of citizens with the right to vote normally vote in a general election?
    A DA: 80-90 procent
    A EN: 80–90 per cent
    Question ids: 2024-05-q21
  - Q DA: Hvor mange stemmer normalt ved valg til Folketinget?  (`:2529`)
    Q EN: How many people normally vote in general elections to the Folketing?
    A DA: Cirka 80-90 procent
    A EN: About 80–90 per cent
    Question ids: 2025-11-q21
- Trap note DA: Valgdeltagelsen er høj ved folketingsvalg – men lavere ved valg til Europa-Parlamentet.  (`:2556`)
- Trap note EN: Turnout is high in general elections – but lower in European Parliament elections.
- Current note DA: (empty)  (`:2558`)
- Current note EN: (empty)

- **Q:2022-06-q2** · `data/questions.json:8729` · exam 2022-06 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor stor en del af borgerne med stemmeret stemmer normalt, når der er folketingsvalg?  (`:8733`)
  - Q EN: What share of citizens with the right to vote normally vote in a general election?  (`:8758`)
  - Option A DA: 40-50 procent  (`:8737`) · EN: 40–50 per cent
  - Option B DA: 60-70 procent  (`:8742`) · EN: 60–70 per cent
  - Option C DA: 80-90 procent  (`:8747`) · EN: 80–90 per cent
  - Correct (`:8751`): C
  - Correct text: C) 80-90 procent / 80–90 per cent
  - image_note: null
- **Q:2022-11-q12** · `data/questions.json:9829` · exam 2022-11 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange stemmer normalt ved valg til Folketinget?  (`:9833`)
  - Q EN: How many people normally vote in general elections to the Folketing?  (`:9858`)
  - Option A DA: 40-50 procent  (`:9837`) · EN: 40–50 per cent
  - Option B DA: 60-70 procent  (`:9842`) · EN: 60–70 per cent
  - Option C DA: 80-90 procent  (`:9847`) · EN: 80–90 per cent
  - Correct (`:9851`): C
  - Correct text: C) 80-90 procent / 80–90 per cent
  - image_note: null
- **Q:2024-05-q21** · `data/questions.json:12501` · exam 2024-05 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor stor en del af borgere med stemmeret stemmer normalt, når der er folketingsvalg?  (`:12505`)
  - Q EN: What share of citizens with the right to vote normally vote in a general election?  (`:12530`)
  - Option A DA: 40-50 procent  (`:12509`) · EN: 40–50 per cent
  - Option B DA: 60-70 procent  (`:12514`) · EN: 60–70 per cent
  - Option C DA: 80-90 procent  (`:12519`) · EN: 80–90 per cent
  - Correct (`:12523`): C
  - Correct text: C) 80-90 procent / 80–90 per cent
  - image_note: null
- **Q:2025-11-q21** · `data/questions.json:14866` · exam 2025-11 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange stemmer normalt ved valg til Folketinget?  (`:14870`)
  - Q EN: How many people normally vote in general elections to the Folketing?  (`:14895`)
  - Option A DA: Cirka 40-50 procent  (`:14874`) · EN: About 40–50 per cent
  - Option B DA: Cirka 60-70 procent  (`:14879`) · EN: About 60–70 per cent
  - Option C DA: Cirka 80-90 procent  (`:14884`) · EN: About 80–90 per cent
  - Correct (`:14888`): C
  - Correct text: C) Cirka 80-90 procent / About 80–90 per cent
  - image_note: null

#### C:dem-borgmester · `data/clusters.json:3042` · asked 4× (2017-11, 2021-06, 2022-06, 2024-05) · frequent: yes · last asked: 2024-05

- Fact DA: Borgmesteren er den øverste politiske leder af en kommune.  (`clusters.json:3044`)
- Fact EN: The mayor (borgmester) is the top political leader of a municipality.  (`clusters.json:3045`)
- Canonical question DA: Hvem er den øverste politiske leder af en kommune?  (`:3061`)
- Canonical question EN: Who is the top political leader of a municipality?  (`:3062`)
- Canonical answer DA: En borgmester  (`:3063`)
- Canonical answer EN: A mayor  (`:3064`)
- Variants:
  - Q DA: Hvem er den øverste politiske leder af en kommune?  (`:3067`)
    Q EN: Who is the top political leader of a municipality (kommune)?
    A DA: En borgmester
    A EN: A mayor (borgmester)
    Question ids: 2017-11-q20, 2021-06-q23, 2022-06-q24, 2024-05-q10
- Trap note DA: Kommunaldirektøren er en ansat embedsmand – ikke en politiker.  (`:3079`)
- Trap note EN: The municipal chief executive is an employed civil servant – not a politician.
- Current note DA: (empty)  (`:3081`)
- Current note EN: (empty)

- **Q:2017-11-q20** · `data/questions.json:2175` · exam 2017-11 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem er den øverste politiske leder af en kommune?  (`:2179`)
  - Q EN: Who is the top political leader of a municipality (kommune)?  (`:2204`)
  - Option A DA: En major  (`:2183`) · EN: A major (military rank)
  - Option B DA: En borgmester  (`:2188`) · EN: A mayor (borgmester)
  - Option C DA: En kommunaldirektør  (`:2193`) · EN: A municipal chief executive (kommunaldirektør, a civil servant)
  - Correct (`:2197`): B
  - Correct text: B) En borgmester / A mayor (borgmester)
  - image_note: null
- **Q:2021-06-q23** · `data/questions.json:7817` · exam 2021-06 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem er den øverste politiske leder af en kommune?  (`:7821`)
  - Q EN: Who is the top political leader of a municipality (kommune)?  (`:7841`)
  - Option A DA: En borgmester  (`:7825`) · EN: A mayor (borgmester)
  - Option B DA: En kommunaldirektør  (`:7830`) · EN: A municipal chief executive (kommunaldirektør, a civil servant)
  - Correct (`:7834`): A
  - Correct text: A) En borgmester / A mayor (borgmester)
  - image_note: null
- **Q:2022-06-q24** · `data/questions.json:9425` · exam 2022-06 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem er den øverste politiske leder af en kommune?  (`:9429`)
  - Q EN: Who is the top political leader of a municipality (kommune)?  (`:9449`)
  - Option A DA: En borgmester  (`:9433`) · EN: A mayor (borgmester)
  - Option B DA: En kommunaldirektør  (`:9438`) · EN: A municipal chief executive (kommunaldirektør, a civil servant)
  - Correct (`:9442`): A
  - Correct text: A) En borgmester / A mayor (borgmester)
  - image_note: null
- **Q:2024-05-q10** · `data/questions.json:12143` · exam 2024-05 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem er den øverste politiske leder af en kommune?  (`:12147`)
  - Q EN: Who is the top political leader of a municipality (kommune)?  (`:12167`)
  - Option A DA: En kommunaldirektør  (`:12151`) · EN: A municipal chief executive (kommunaldirektør, a civil servant)
  - Option B DA: En borgmester  (`:12156`) · EN: A mayor (borgmester)
  - Correct (`:12160`): B
  - Correct text: B) En borgmester / A mayor (borgmester)
  - image_note: null

#### C:dem-regioner-5 · `data/clusters.json:3128` · asked 4× (2017-06, 2020-06, 2021-11, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: Danmark er delt i 5 regioner.  (`clusters.json:3130`)
- Fact EN: Denmark is divided into 5 regions.  (`clusters.json:3131`)
- Canonical question DA: Hvor mange regioner er Danmark opdelt i?  (`:3147`)
- Canonical question EN: How many regions is Denmark divided into?  (`:3148`)
- Canonical answer DA: 5  (`:3149`)
- Canonical answer EN: 5  (`:3150`)
- Variants:
  - Q DA: Hvor mange regioner er Danmark opdelt i?  (`:3153`)
    Q EN: How many regions is Denmark divided into?
    A DA: 5
    A EN: 5
    Question ids: 2017-06-q4, 2021-11-q20
  - Q DA: Hvor mange regioner er der i Danmark?  (`:3163`)
    Q EN: How many regions are there in Denmark?
    A DA: 5
    A EN: 5
    Question ids: 2020-06-q2, 2023-11-q22
- Trap note DA: (empty)  (`:3173`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3175`)
- Current note EN: (empty)

- **Q:2017-06-q4** · `data/questions.json:887` · exam 2017-06 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange regioner er Danmark opdelt i?  (`:891`)
  - Q EN: How many regions is Denmark divided into?  (`:916`)
  - Option A DA: 5.  (`:895`) · EN: 5
  - Option B DA: 7.  (`:900`) · EN: 7
  - Option C DA: 9.  (`:905`) · EN: 9
  - Correct (`:909`): A
  - Correct text: A) 5. / 5
  - image_note: null
- **Q:2020-06-q2** · `data/questions.json:5599` · exam 2020-06 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange regioner er der i Danmark?  (`:5603`)
  - Q EN: How many regions are there in Denmark?  (`:5628`)
  - Option A DA: 3  (`:5607`) · EN: 3
  - Option B DA: 5  (`:5612`) · EN: 5
  - Option C DA: 7  (`:5617`) · EN: 7
  - Correct (`:5621`): B
  - Correct text: B) 5 / 5
  - image_note: null
- **Q:2021-11-q20** · `data/questions.json:8503` · exam 2021-11 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange regioner er Danmark opdelt i?  (`:8507`)
  - Q EN: How many regions is Denmark divided into?  (`:8532`)
  - Option A DA: 3  (`:8511`) · EN: 3
  - Option B DA: 5  (`:8516`) · EN: 5
  - Option C DA: 7  (`:8521`) · EN: 7
  - Correct (`:8525`): B
  - Correct text: B) 5 / 5
  - image_note: null
- **Q:2023-11-q22** · `data/questions.json:11724` · exam 2023-11 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange regioner er der i Danmark?  (`:11728`)
  - Q EN: How many regions are there in Denmark?  (`:11753`)
  - Option A DA: 5  (`:11732`) · EN: 5
  - Option B DA: 15  (`:11737`) · EN: 15
  - Option C DA: 25  (`:11742`) · EN: 25
  - Correct (`:11746`): A
  - Correct text: A) 5 / 5
  - image_note: null

#### C:dem-1915 · `data/clusters.json:3391` · asked 4× (2017-11, 2018-06, 2021-06, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: I 1915 fik kvinder stemmeret til Folketinget (grundlovsændringen 1915).  (`clusters.json:3393`)
- Fact EN: In 1915 women got the right to vote for the Folketing (the 1915 change to the Constitution).  (`clusters.json:3394`)
- Canonical question DA: Hvornår fik kvinder stemmeret til Folketinget?  (`:3410`)
- Canonical question EN: When did women get the right to vote for the Folketing?  (`:3411`)
- Canonical answer DA: I 1915 – retten til at stemme til den lovgivende forsamling  (`:3412`)
- Canonical answer EN: In 1915 – the right to vote for the legislative assembly  (`:3413`)
- Variants:
  - Q DA: Hvilken rettighed fik kvinder i 1915?  (`:3416`)
    Q EN: Which right did women get in 1915?
    A DA: Retten til at stemme til den lovgivende forsamling
    A EN: The right to vote for the legislative assembly
    Question ids: 2017-11-q9
  - Q DA: Hvornår fik kvinder stemmeret til Folketinget?  (`:3425`)
    Q EN: When did women get the right to vote in elections to the Folketing?
    A DA: I 1915
    A EN: In 1915
    Question ids: 2018-06-q16
  - Q DA: Hvilken rettighed fik kvinder i forbindelse med grundlovsændringen i 1915?  (`:3434`)
    Q EN: Which right did women get with the change to the Constitution in 1915?
    A DA: Retten til at stemme til den lovgivende forsamling
    A EN: The right to vote for the legislative assembly
    Question ids: 2021-06-q3, 2022-11-q1
- Trap note DA: 1915 handler om stemmeret – ikke om abort eller skilsmisse.  (`:3444`)
- Trap note EN: 1915 is about the right to vote – not about abortion or divorce.
- Current note DA: (empty)  (`:3446`)
- Current note EN: (empty)

- **Q:2017-11-q9** · `data/questions.json:1822` · exam 2017-11 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed fik kvinder i 1915?  (`:1826`)
  - Q EN: Which right did women get in 1915?  (`:1851`)
  - Option A DA: Retten til at stemme til den lovgivende forsamling  (`:1830`) · EN: The right to vote for the legislative assembly
  - Option B DA: Retten til at få en abort til og med 12. graviditetsuge  (`:1835`) · EN: The right to an abortion up to and including week 12 of pregnancy
  - Option C DA: Retten til at blive skilt fra en voldelig ægtemand  (`:1840`) · EN: The right to divorce a violent husband
  - Correct (`:1844`): A
  - Correct text: A) Retten til at stemme til den lovgivende forsamling / The right to vote for the legislative assembly
  - image_note: null
- **Q:2018-06-q16** · `data/questions.json:2846` · exam 2018-06 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår fik kvinder stemmeret til Folketinget?  (`:2850`)
  - Q EN: When did women get the right to vote in elections to the Folketing?  (`:2875`)
  - Option A DA: I 1915  (`:2854`) · EN: In 1915
  - Option B DA: I 1945  (`:2859`) · EN: In 1945
  - Option C DA: I 1975  (`:2864`) · EN: In 1975
  - Correct (`:2868`): A
  - Correct text: A) I 1915 / In 1915
  - image_note: null
- **Q:2021-06-q3** · `data/questions.json:7202` · exam 2021-06 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed fik kvinder i forbindelse med grundlovsændringen i 1915?  (`:7206`)
  - Q EN: Which right did women get with the change to the Constitution in 1915?  (`:7231`)
  - Option A DA: Retten til at stemme til den lovgivende forsamling  (`:7210`) · EN: The right to vote for the legislative assembly
  - Option B DA: Retten til at få en abort til og med 12. graviditetsuge  (`:7215`) · EN: The right to an abortion up to and including week 12 of pregnancy
  - Option C DA: Retten til at blive skilt fra en voldelig ægtemand  (`:7220`) · EN: The right to divorce a violent husband
  - Correct (`:7224`): A
  - Correct text: A) Retten til at stemme til den lovgivende forsamling / The right to vote for the legislative assembly
  - image_note: null
- **Q:2022-11-q1** · `data/questions.json:9486` · exam 2022-11 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rettighed fik kvinder i forbindelse med grundlovsændringen i 1915?  (`:9490`)
  - Q EN: Which right did women get with the change to the Constitution in 1915?  (`:9515`)
  - Option A DA: Retten til at stemme til den lovgivende forsamling  (`:9494`) · EN: The right to vote for the legislative assembly
  - Option B DA: Retten til at få en abort til og med 12. graviditetsuge  (`:9499`) · EN: The right to an abortion up to and including week 12 of pregnancy
  - Option C DA: Retten til at blive skilt fra en voldelig ægtemand  (`:9504`) · EN: The right to divorce a violent husband
  - Correct (`:9508`): A
  - Correct text: A) Retten til at stemme til den lovgivende forsamling / The right to vote for the legislative assembly
  - image_note: null

#### C:dem-doemmende · `data/clusters.json:3611` · asked 4× (2016-12, 2018-06, 2019-11, 2021-11) · frequent: yes · last asked: 2021-11

- Fact DA: Den dømmende magt ligger hos domstolene.  (`clusters.json:3613`)
- Fact EN: The judicial power lies with the courts.  (`clusters.json:3614`)
- Canonical question DA: Hvem har den dømmende magt?  (`:3630`)
- Canonical question EN: Who holds the judicial power?  (`:3631`)
- Canonical answer DA: Domstolene  (`:3632`)
- Canonical answer EN: The courts  (`:3633`)
- Variants:
  - Q DA: Hvem har den dømmende magt?  (`:3636`)
    Q EN: Who holds the judicial power?
    A DA: Domstolene
    A EN: The courts
    Question ids: 2016-12-q10, 2018-06-q19, 2019-11-q10, 2021-11-q10
- Trap note DA: Magtens tredeling: lovgivende = Folketinget og regeringen, udøvende = regeringen, dømmende = domstolene.  (`:3648`)
- Trap note EN: Separation of powers: legislative = the Folketing and the government, executive = the government, judicial = the courts.
- Current note DA: (empty)  (`:3650`)
- Current note EN: (empty)

- **Q:2016-12-q10** · `data/questions.json:280` · exam 2016-12 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har den dømmende magt?  (`:284`)
  - Q EN: Who holds the judicial power?  (`:309`)
  - Option A DA: Regeringen.  (`:288`) · EN: The government
  - Option B DA: Domstolene.  (`:293`) · EN: The courts
  - Option C DA: Folketinget.  (`:298`) · EN: The Folketing (parliament)
  - Correct (`:302`): B
  - Correct text: B) Domstolene. / The courts
  - image_note: null
- **Q:2018-06-q19** · `data/questions.json:2940` · exam 2018-06 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har den dømmende magt?  (`:2944`)
  - Q EN: Who holds the judicial power?  (`:2969`)
  - Option A DA: Folketinget  (`:2948`) · EN: The Folketing (parliament)
  - Option B DA: Regeringen  (`:2953`) · EN: The government
  - Option C DA: Domstolene  (`:2958`) · EN: The courts
  - Correct (`:2962`): C
  - Correct text: C) Domstolene / The courts
  - image_note: null
- **Q:2019-11-q10** · `data/questions.json:5058` · exam 2019-11 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har den dømmende magt?  (`:5062`)
  - Q EN: Who holds the judicial power?  (`:5087`)
  - Option A DA: Regeringen  (`:5066`) · EN: The government
  - Option B DA: Folketinget  (`:5071`) · EN: The Folketing (parliament)
  - Option C DA: Domstolene  (`:5076`) · EN: The courts
  - Correct (`:5080`): C
  - Correct text: C) Domstolene / The courts
  - image_note: null
- **Q:2021-11-q10** · `data/questions.json:8178` · exam 2021-11 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har den dømmende magt?  (`:8182`)
  - Q EN: Who holds the judicial power?  (`:8207`)
  - Option A DA: Folketinget  (`:8186`) · EN: The Folketing (parliament)
  - Option B DA: Regeringen  (`:8191`) · EN: The government
  - Option C DA: Domstolene  (`:8196`) · EN: The courts
  - Correct (`:8200`): C
  - Correct text: C) Domstolene / The courts
  - image_note: null

#### C:dem-kommunalvalg · `data/clusters.json:4191` · asked 3× (2018-06, 2021-11, 2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Der er valg til kommunalbestyrelser og regionsråd hvert 4. år.  (`clusters.json:4193`)
- Fact EN: There are elections to municipal and regional councils every 4 years.  (`clusters.json:4194`)
- Canonical question DA: Hvor tit er der valg til kommunalbestyrelser og regionsråd?  (`:4208`)
- Canonical question EN: How often are there elections to municipal and regional councils?  (`:4209`)
- Canonical answer DA: Hvert 4. år  (`:4210`)
- Canonical answer EN: Every 4 years  (`:4211`)
- Variants:
  - Q DA: Hvor tit er der valg til kommunalbestyrelser og regionsråd?  (`:4214`)
    Q EN: How often are there elections to municipal councils and regional councils?
    A DA: Hvert fjerde år
    A EN: Every four years
    Question ids: 2018-06-q1, 2024-11-q25
  - Q DA: Hvor ofte er der valg til kommunalbestyrelser og regionsråd?  (`:4224`)
    Q EN: How often are there elections to municipal councils and regional councils?
    A DA: Hvert 4. år
    A EN: Every 4th year
    Question ids: 2021-11-q12
- Trap note DA: (empty)  (`:4233`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4235`)
- Current note EN: (empty)

- **Q:2018-06-q1** · `data/questions.json:2366` · exam 2018-06 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor tit er der valg til kommunalbestyrelser og regionsråd?  (`:2370`)
  - Q EN: How often are there elections to municipal councils and regional councils?  (`:2395`)
  - Option A DA: Hvert tredje år  (`:2374`) · EN: Every three years
  - Option B DA: Hvert fjerde år  (`:2379`) · EN: Every four years
  - Option C DA: Hvert femte år  (`:2384`) · EN: Every five years
  - Correct (`:2388`): B
  - Correct text: B) Hvert fjerde år / Every four years
  - image_note: null
- **Q:2021-11-q12** · `data/questions.json:8244` · exam 2021-11 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ofte er der valg til kommunalbestyrelser og regionsråd?  (`:8248`)
  - Q EN: How often are there elections to municipal councils and regional councils?  (`:8273`)
  - Option A DA: Hvert 3. år  (`:8252`) · EN: Every 3rd year
  - Option B DA: Hvert 4. år  (`:8257`) · EN: Every 4th year
  - Option C DA: Hvert 5. år  (`:8262`) · EN: Every 5th year
  - Correct (`:8266`): B
  - Correct text: B) Hvert 4. år / Every 4th year
  - image_note: null
- **Q:2024-11-q25** · `data/questions.json:13413` · exam 2024-11 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor tit er der valg til kommunalbestyrelser og regionsråd?  (`:13417`)
  - Q EN: How often are there elections to municipal councils and regional councils?  (`:13442`)
  - Option A DA: Hvert tredje år  (`:13421`) · EN: Every three years
  - Option B DA: Hvert fjerde år  (`:13426`) · EN: Every four years
  - Option C DA: Hvert femte år  (`:13431`) · EN: Every five years
  - Correct (`:13435`): B
  - Correct text: B) Hvert fjerde år / Every four years
  - image_note: null

#### C:dem-lovgivende · `data/clusters.json:4239` · asked 3× (2017-11, 2020-06, 2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Den lovgivende magt har regeringen og Folketinget. De laver lovene.  (`clusters.json:4241`)
- Fact EN: The legislative power is held by the government and the Folketing. They make the laws.  (`clusters.json:4242`)
- Canonical question DA: Hvem har den lovgivende magt?  (`:4256`)
- Canonical question EN: Who holds the legislative power?  (`:4257`)
- Canonical answer DA: Regeringen og Folketinget  (`:4258`)
- Canonical answer EN: The government and the Folketing  (`:4259`)
- Variants:
  - Q DA: Hvem har den lovgivende magt?  (`:4262`)
    Q EN: Who holds the legislative power?
    A DA: Regeringen og Folketinget
    A EN: The government and the Folketing
    Question ids: 2017-11-q7, 2020-06-q15
  - Q DA: Hvem laver lovene i Danmark?  (`:4272`)
    Q EN: Who makes the laws in Denmark?
    A DA: Regeringen og Folketinget
    A EN: The government and the Folketing
    Question ids: 2024-11-q19
- Trap note DA: Domstolene laver IKKE love – de dømmer efter lovene. 'Hvem laver lovene?' er samme spørgsmål.  (`:4281`)
- Trap note EN: The courts do NOT make laws – they judge according to the laws. 'Who makes the laws?' is the same question.
- Current note DA: (empty)  (`:4283`)
- Current note EN: (empty)

- **Q:2017-11-q7** · `data/questions.json:1761` · exam 2017-11 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har den lovgivende magt?  (`:1765`)
  - Q EN: Who holds the legislative power?  (`:1785`)
  - Option A DA: Regeringen og Folketinget  (`:1769`) · EN: The government and the Folketing
  - Option B DA: Folketinget og domstolen  (`:1774`) · EN: The Folketing and the court
  - Correct (`:1778`): A
  - Correct text: A) Regeringen og Folketinget / The government and the Folketing
  - image_note: null
- **Q:2020-06-q15** · `data/questions.json:6013` · exam 2020-06 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har den lovgivende magt?  (`:6017`)
  - Q EN: Who holds the legislative power?  (`:6037`)
  - Option A DA: Folketinget og domstolene  (`:6021`) · EN: The Folketing and the courts
  - Option B DA: Regeringen og Folketinget  (`:6026`) · EN: The government and the Folketing
  - Correct (`:6030`): B
  - Correct text: B) Regeringen og Folketinget / The government and the Folketing
  - image_note: null
- **Q:2024-11-q19** · `data/questions.json:13230` · exam 2024-11 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem laver lovene i Danmark?  (`:13234`)
  - Q EN: Who makes the laws in Denmark?  (`:13254`)
  - Option A DA: Folketinget og domstolene  (`:13238`) · EN: The Folketing and the courts
  - Option B DA: Regeringen og Folketinget  (`:13243`) · EN: The government and the Folketing
  - Correct (`:13247`): B
  - Correct text: B) Regeringen og Folketinget / The government and the Folketing
  - image_note: null

#### C:dem-kvinder-folketing · `data/clusters.json:4287` · asked 3× (2018-11, 2020-11, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: Ca. 45 % af Folketingets medlemmer var kvinder efter valget i 2022 (i 2018–2020 ca. 40 %).  (`clusters.json:4289`)
- Fact EN: About 45% of the members of the Folketing were women after the 2022 election (about 40% in 2018–2020).  (`clusters.json:4290`)
- Canonical question DA: Hvor stor en andel af Folketingets medlemmer er kvinder?  (`:4304`)
- Canonical question EN: What share of the members of the Folketing are women?  (`:4305`)
- Canonical answer DA: Ca. 40-45 %  (`:4306`)
- Canonical answer EN: About 40–45%  (`:4307`)
- Variants:
  - Q DA: Hvor mange af medlemmerne af Folketinget er kvinder?  (`:4310`)
    Q EN: How many of the members of the Folketing are women?
    A DA: Ca. 40 %
    A EN: About 40%
    Question ids: 2018-11-q12
  - Q DA: Hvor stor en andel af Folketingets medlemmer er kvinder?  (`:4319`)
    Q EN: What share of the members of the Folketing are women?
    A DA: Ca. 40 %
    A EN: About 40%
    Question ids: 2020-11-q10
  - Q DA: Hvor stor en andel af Folketingets medlemmer er kvinder?  (`:4319`)
    Q EN: What share of the members of the Folketing are women?
    A DA: Cirka 45 procent
    A EN: About 45 per cent
    Question ids: 2024-05-q20
- Trap note DA: Vælg det tal, der ligger tættest på 40-45 %. Ældre prøver: 'ca. 40 %'. Prøven 2024: 'cirka 45 procent'.  (`:4337`)
- Trap note EN: Pick the figure closest to 40–45%. Older exams: 'about 40%'. The 2024 exam: 'about 45 per cent'.
- Current note DA: Tallet ændrer sig ved hvert valg. Der var folketingsvalg 24. marts 2026. Ingen af prøvens forkerte svar (20 %, 25 %, 35 %, 60 %) er tæt på.  (`:4339`)
- Current note EN: The figure changes with each election. There was a general election on 24 March 2026. None of the exam's wrong answers (20%, 25%, 35%, 60%) is close.

- **Q:2018-11-q12** · `data/questions.json:3514` · exam 2018-11 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange af medlemmerne af Folketinget er kvinder?  (`:3518`)
  - Q EN: How many of the members of the Folketing are women?  (`:3543`)
  - Option A DA: Ca. 20 %  (`:3522`) · EN: About 20%
  - Option B DA: Ca. 40 %  (`:3527`) · EN: About 40%
  - Option C DA: Ca. 60 %  (`:3532`) · EN: About 60%
  - Correct (`:3536`): B
  - Correct text: B) Ca. 40 % / About 40%
  - image_note: null
- **Q:2020-11-q10** · `data/questions.json:6643` · exam 2020-11 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor stor en andel af Folketingets medlemmer er kvinder?  (`:6647`)
  - Q EN: What share of the members of the Folketing are women?  (`:6672`)
  - Option A DA: Ca. 20 %  (`:6651`) · EN: About 20%
  - Option B DA: Ca. 40 %  (`:6656`) · EN: About 40%
  - Option C DA: Ca. 60 %  (`:6661`) · EN: About 60%
  - Correct (`:6665`): B
  - Correct text: B) Ca. 40 % / About 40%
  - image_note: null
- **Q:2024-05-q20** · `data/questions.json:12468` · exam 2024-05 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor stor en andel af Folketingets medlemmer er kvinder?  (`:12472`)
  - Q EN: What share of the members of the Folketing are women?  (`:12497`)
  - Option A DA: Cirka 25 procent  (`:12476`) · EN: About 25 per cent
  - Option B DA: Cirka 35 procent  (`:12481`) · EN: About 35 per cent
  - Option C DA: Cirka 45 procent  (`:12486`) · EN: About 45 per cent
  - Correct (`:12490`): C
  - Correct text: C) Cirka 45 procent / About 45 per cent
  - image_note: null

#### C:dem-regionerne-sygehuse · `data/clusters.json:4343` · asked 3× (2018-11, 2021-11, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: Regionerne har ansvaret for de offentlige sygehuse.  (`clusters.json:4345`)
- Fact EN: The regions are responsible for the public hospitals.  (`clusters.json:4346`)
- Canonical question DA: Hvem står for driften af de offentlige sygehuse?  (`:4360`)
- Canonical question EN: Who runs the public hospitals?  (`:4361`)
- Canonical answer DA: Regionerne  (`:4362`)
- Canonical answer EN: The regions  (`:4363`)
- Variants:
  - Q DA: Hvem har ansvaret for de offentlige sygehuse?  (`:4366`)
    Q EN: Who is responsible for the public hospitals?
    A DA: Regionerne
    A EN: The regions (regionerne)
    Question ids: 2018-11-q13
  - Q DA: Hvem står for driften af de offentlige sygehuse?  (`:4375`)
    Q EN: Who runs the public hospitals?
    A DA: Regionerne
    A EN: The regions (regionerne)
    Question ids: 2021-11-q21, 2024-05-q4
- Trap note DA: Sygehuse = regionerne. Børnehaver = kommunerne. Bland dem ikke sammen.  (`:4385`)
- Trap note EN: Hospitals = the regions. Kindergartens = the municipalities. Don't mix them up.
- Current note DA: (empty)  (`:4387`)
- Current note EN: (empty)

- **Q:2018-11-q13** · `data/questions.json:3547` · exam 2018-11 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har ansvaret for de offentlige sygehuse?  (`:3551`)
  - Q EN: Who is responsible for the public hospitals?  (`:3576`)
  - Option A DA: Kommunerne  (`:3555`) · EN: The municipalities (kommunerne)
  - Option B DA: Regionerne  (`:3560`) · EN: The regions (regionerne)
  - Option C DA: Staten  (`:3565`) · EN: The state
  - Correct (`:3569`): B
  - Correct text: B) Regionerne / The regions (regionerne)
  - image_note: null
- **Q:2021-11-q21** · `data/questions.json:8536` · exam 2021-11 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem står for driften af de offentlige sygehuse?  (`:8540`)
  - Q EN: Who runs the public hospitals?  (`:8565`)
  - Option A DA: Kommunerne  (`:8544`) · EN: The municipalities (kommunerne)
  - Option B DA: Regionerne  (`:8549`) · EN: The regions (regionerne)
  - Option C DA: Staten  (`:8554`) · EN: The state
  - Correct (`:8558`): B
  - Correct text: B) Regionerne / The regions (regionerne)
  - image_note: null
- **Q:2024-05-q4** · `data/questions.json:11945` · exam 2024-05 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem står for driften af de offentlige sygehuse?  (`:11949`)
  - Q EN: Who runs the public hospitals?  (`:11974`)
  - Option A DA: Kommunerne  (`:11953`) · EN: The municipalities (kommunerne)
  - Option B DA: Regionerne  (`:11958`) · EN: The regions (regionerne)
  - Option C DA: Staten  (`:11963`) · EN: The state
  - Correct (`:11967`): B
  - Correct text: B) Regionerne / The regions (regionerne)
  - image_note: null

#### C:dem-parti · `data/clusters.json:4663` · asked 3× (2016-12, 2019-11, 2021-06) · frequent: no · last asked: 2021-06

- Fact DA: Folketingets medlemmer behøver ikke være medlem af et politisk parti.  (`clusters.json:4665`)
- Fact EN: Members of the Folketing do not have to be members of a political party.  (`clusters.json:4666`)
- Canonical question DA: Skal Folketingets medlemmer være medlem af et politisk parti?  (`:4680`)
- Canonical question EN: Must members of the Folketing be members of a political party?  (`:4681`)
- Canonical answer DA: Nej  (`:4682`)
- Canonical answer EN: No  (`:4683`)
- Variants:
  - Q DA: Skal Folketingets medlemmer være medlem af et politisk parti?  (`:4686`)
    Q EN: Must members of the Folketing (the Danish parliament) be members of a political party?
    A DA: Nej
    A EN: No
    Question ids: 2016-12-q15, 2019-11-q15
  - Q DA: Skal Folketingets medlemmer tilhøre et politisk parti?  (`:4696`)
    Q EN: Must members of the Folketing belong to a political party?
    A DA: Nej
    A EN: No
    Question ids: 2021-06-q1
- Trap note DA: Man kan stille op og sidde i Folketinget uden for partierne (løsgænger).  (`:4705`)
- Trap note EN: You can stand for election and sit in the Folketing without a party (as an independent).
- Current note DA: (empty)  (`:4707`)
- Current note EN: (empty)

- **Q:2016-12-q15** · `data/questions.json:445` · exam 2016-12 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal Folketingets medlemmer være medlem af et politisk parti?  (`:449`)
  - Q EN: Must members of the Folketing (the Danish parliament) be members of a political party?  (`:469`)
  - Option A DA: Ja.  (`:453`) · EN: Yes
  - Option B DA: Nej.  (`:458`) · EN: No
  - Correct (`:462`): B
  - Correct text: B) Nej. / No
  - image_note: null
- **Q:2019-11-q15** · `data/questions.json:5223` · exam 2019-11 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal Folketingets medlemmer være medlem af et politisk parti?  (`:5227`)
  - Q EN: Must members of the Folketing (the Danish parliament) be members of a political party?  (`:5247`)
  - Option A DA: Ja  (`:5231`) · EN: Yes
  - Option B DA: Nej  (`:5236`) · EN: No
  - Correct (`:5240`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2021-06-q1** · `data/questions.json:7141` · exam 2021-06 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal Folketingets medlemmer tilhøre et politisk parti?  (`:7145`)
  - Q EN: Must members of the Folketing belong to a political party?  (`:7165`)
  - Option A DA: Ja  (`:7149`) · EN: Yes
  - Option B DA: Nej  (`:7154`) · EN: No
  - Correct (`:7158`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-domstole-uafhaengige · `data/clusters.json:5120` · asked 2× (2019-06, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Domstolene er uafhængige. Politikere og regeringen kan ikke bestemme, hvordan en dommer dømmer.  (`clusters.json:5122`)
- Fact EN: The courts are independent. Politicians and the government cannot decide how a judge rules.  (`clusters.json:5123`)
- Canonical question DA: Kan politikerne bestemme, hvordan domstolene skal afgøre en konkret retssag?  (`:5135`)
- Canonical question EN: Can politicians decide how the courts decide a specific case?  (`:5136`)
- Canonical answer DA: Nej  (`:5137`)
- Canonical answer EN: No  (`:5138`)
- Variants:
  - Q DA: Kan politikerne bestemme, hvordan domstolene skal afgøre en konkret retssag?  (`:5141`)
    Q EN: Can politicians decide how the courts must decide a specific court case?
    A DA: Nej
    A EN: No
    Question ids: 2019-06-q14
  - Q DA: Kan regeringen bestemme, hvordan en dommer skal dømme i en konkret retssag?  (`:5150`)
    Q EN: Can the government decide how a judge must rule in a specific court case?
    A DA: Nej
    A EN: No
    Question ids: 2025-11-q20
- Trap note DA: Det kan stå 'politikerne' eller 'regeringen' – svaret er Nej begge gange.  (`:5159`)
- Trap note EN: It may say 'politicians' or 'the government' – the answer is No both times.
- Current note DA: (empty)  (`:5161`)
- Current note EN: (empty)

- **Q:2019-06-q14** · `data/questions.json:4390` · exam 2019-06 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan politikerne bestemme, hvordan domstolene skal afgøre en konkret retssag?  (`:4394`)
  - Q EN: Can politicians decide how the courts must decide a specific court case?  (`:4414`)
  - Option A DA: Ja  (`:4398`) · EN: Yes
  - Option B DA: Nej  (`:4403`) · EN: No
  - Correct (`:4407`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2025-11-q20** · `data/questions.json:14838` · exam 2025-11 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Kan regeringen bestemme, hvordan en dommer skal dømme i en konkret retssag?  (`:14842`)
  - Q EN: Can the government decide how a judge must rule in a specific court case?  (`:14862`)
  - Option A DA: Ja  (`:14846`) · EN: Yes
  - Option B DA: Nej  (`:14851`) · EN: No
  - Correct (`:14855`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-folkeafstemning-grundlov · `data/clusters.json:5165` · asked 2× (2023-11, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Hvis grundloven skal ændres, skal der være en folkeafstemning.  (`clusters.json:5167`)
- Fact EN: If the Constitution is to be changed, there must be a referendum.  (`clusters.json:5168`)
- Canonical question DA: Skal der være en folkeafstemning, hvis grundloven skal ændres?  (`:5180`)
- Canonical question EN: Must there be a referendum if the Constitution is to be changed?  (`:5181`)
- Canonical answer DA: Ja  (`:5182`)
- Canonical answer EN: Yes  (`:5183`)
- Variants:
  - Q DA: Skal der være en folkeafstemning, hvis den danske grundlov skal ændres?  (`:5186`)
    Q EN: Must there be a referendum if the Danish Constitution is to be changed?
    A DA: Ja
    A EN: Yes
    Question ids: 2023-11-q9, 2025-11-q5
- Trap note DA: (empty)  (`:5196`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5198`)
- Current note EN: (empty)

- **Q:2023-11-q9** · `data/questions.json:11310` · exam 2023-11 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal der være en folkeafstemning, hvis den danske grundlov skal ændres?  (`:11314`)
  - Q EN: Must there be a referendum if the Danish Constitution is to be changed?  (`:11334`)
  - Option A DA: Ja  (`:11318`) · EN: Yes
  - Option B DA: Nej  (`:11323`) · EN: No
  - Correct (`:11327`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2025-11-q5** · `data/questions.json:14368` · exam 2025-11 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal der være en folkeafstemning, hvis den danske grundlov skal ændres?  (`:14372`)
  - Q EN: Must there be a referendum if the Danish Constitution is to be changed?  (`:14392`)
  - Option A DA: Ja  (`:14376`) · EN: Yes
  - Option B DA: Nej  (`:14381`) · EN: No
  - Correct (`:14385`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:dem-moms · `data/clusters.json:5202` · asked 2× (2024-11, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Moms er en afgift på blandt andet varer, man køber i butikkerne.  (`clusters.json:5204`)
- Fact EN: Moms (VAT) is a tax on, among other things, goods you buy in shops.  (`clusters.json:5205`)
- Canonical question DA: Hvad er moms?  (`:5217`)
- Canonical question EN: What is moms?  (`:5218`)
- Canonical answer DA: En afgift på varer, man køber i butikkerne  (`:5219`)
- Canonical answer EN: A tax on goods you buy in shops  (`:5220`)
- Variants:
  - Q DA: Hvad er moms?  (`:5223`)
    Q EN: What is moms (VAT)?
    A DA: En afgift på blandt andet varer man køber i butikkerne
    A EN: A tax on, among other things, goods you buy in shops
    Question ids: 2024-11-q21, 2025-11-q13
- Trap note DA: Skat af indkomst er IKKE moms. Moms er 25 % i Danmark.  (`:5233`)
- Trap note EN: Tax on income is NOT moms. Moms is 25% in Denmark.
- Current note DA: (empty)  (`:5235`)
- Current note EN: (empty)

- **Q:2024-11-q21** · `data/questions.json:13286` · exam 2024-11 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er moms?  (`:13290`)
  - Q EN: What is moms (VAT)?  (`:13315`)
  - Option A DA: En skat man betaler af sin indkomst  (`:13294`) · EN: A tax you pay on your income
  - Option B DA: En afgift på blandt andet varer man køber i butikkerne  (`:13299`) · EN: A tax on, among other things, goods you buy in shops
  - Option C DA: Et gebyr man betaler for at kunne se DR's tv- og radiokanaler  (`:13304`) · EN: A fee you pay to be able to watch DR's TV and radio channels
  - Correct (`:13308`): B
  - Correct text: B) En afgift på blandt andet varer man køber i butikkerne / A tax on, among other things, goods you buy in shops
  - image_note: null
- **Q:2025-11-q13** · `data/questions.json:14627` · exam 2025-11 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er moms?  (`:14631`)
  - Q EN: What is moms (VAT)?  (`:14656`)
  - Option A DA: En skat man betaler af sin indkomst  (`:14635`) · EN: A tax you pay on your income
  - Option B DA: En afgift på blandt andet varer man køber i butikkerne  (`:14640`) · EN: A tax on, among other things, goods you buy in shops
  - Option C DA: Et gebyr man betaler for at bruge DR's tv- og radiokanaler  (`:14645`) · EN: A fee you pay to use DR's TV and radio channels
  - Correct (`:14649`): B
  - Correct text: B) En afgift på blandt andet varer man køber i butikkerne / A tax on, among other things, goods you buy in shops
  - image_note: null

#### C:dem-1849-ikke-kvinder · `data/clusters.json:5403` · asked 2× (2023-05, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Grundloven fra 1849 gav IKKE kvinder stemmeret. Kun en del af mændene fik stemmeret i 1849.  (`clusters.json:5405`)
- Fact EN: The 1849 Constitution did NOT give women the vote. Only some of the men got the vote in 1849.  (`clusters.json:5406`)
- Canonical question DA: Fik kvinder stemmeret til Folketinget med grundloven fra 1849?  (`:5418`)
- Canonical question EN: Did women get the right to vote for the Folketing with the 1849 Constitution?  (`:5419`)
- Canonical answer DA: Nej  (`:5420`)
- Canonical answer EN: No  (`:5421`)
- Variants:
  - Q DA: Fik kvinder stemmeret til Folketinget med grundloven fra 1849?  (`:5424`)
    Q EN: Did women get the right to vote for the Folketing with the Constitution of 1849?
    A DA: Nej
    A EN: No
    Question ids: 2023-05-q22
  - Q DA: Fik alle mænd og kvinder over 18 år stemmeret til Folketinget med Grundloven i 1849?  (`:5433`)
    Q EN: Did all men and women over 18 get the right to vote for the Folketing with the Constitution of 1849?
    A DA: Nej
    A EN: No
    Question ids: 2025-05-q5
- Trap note DA: Kvinder fik stemmeret i 1915, ikke i 1849. Også 'alle mænd og kvinder over 18 år i 1849?' = Nej.  (`:5442`)
- Trap note EN: Women got the vote in 1915, not in 1849. 'All men and women over 18 in 1849?' is also No.
- Current note DA: (empty)  (`:5444`)
- Current note EN: (empty)

- **Q:2023-05-q22** · `data/questions.json:10934` · exam 2023-05 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Fik kvinder stemmeret til Folketinget med grundloven fra 1849?  (`:10938`)
  - Q EN: Did women get the right to vote for the Folketing with the Constitution of 1849?  (`:10958`)
  - Option A DA: Ja  (`:10942`) · EN: Yes
  - Option B DA: Nej  (`:10947`) · EN: No
  - Correct (`:10951`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2025-05-q5** · `data/questions.json:13573` · exam 2025-05 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Fik alle mænd og kvinder over 18 år stemmeret til Folketinget med Grundloven i 1849?  (`:13577`)
  - Q EN: Did all men and women over 18 get the right to vote for the Folketing with the Constitution of 1849?  (`:13597`)
  - Option A DA: Ja  (`:13581`) · EN: Yes
  - Option B DA: Nej  (`:13586`) · EN: No
  - Correct (`:13590`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-regering · `data/clusters.json:5448` · asked 2× (2024-11, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Fra december 2022 til juni 2026 var regeringen S + V + M (SVM-regeringen). Siden 3. juni 2026 er regeringen S + SF + M + Radikale Venstre (Mette Frederiksen III).  (`clusters.json:5450`)
- Fact EN: From December 2022 to June 2026 the government was S + V + M (the SVM government). Since 3 June 2026 the government has been S + SF + M + the Social Liberals (Mette Frederiksen III).  (`clusters.json:5451`)
- Canonical question DA: Hvilket parti har været med i regeringen siden 2022?  (`:5463`)
- Canonical question EN: Which party has been in the government since 2022?  (`:5464`)
- Canonical answer DA: Venstre (SVM-regeringen 2022–2026). Konservative var IKKE med.  (`:5465`)
- Canonical answer EN: Venstre (the SVM government 2022–2026). The Conservatives were NOT in it.  (`:5466`)
- Variants:
  - Q DA: Hvilket af følgende partier har været med i regeringen siden 2022?  (`:5469`)
    Q EN: Which of the following parties has been in the government since 2022?
    A DA: Venstre
    A EN: Venstre (the Liberal Party)
    Question ids: 2024-11-q8
  - Q DA: Er Det Konservative Folkeparti med i den nuværende regering?  (`:5478`)
    Q EN: Is the Conservative People's Party (Det Konservative Folkeparti) in the current government?
    A DA: Nej
    A EN: No
    Question ids: 2025-05-q18
- Trap note DA: Prøverne fra 2024-2025 spørger om SVM-regeringen: Venstre = Ja, Konservative = Nej, Dansk Folkeparti = Nej.  (`:5487`)
- Trap note EN: The 2024–2025 exams ask about the SVM government: Venstre = Yes, the Conservatives = No, the Danish People's Party = No.
- Current note DA: Efter valget 24. marts 2026 dannede Mette Frederiksen en ny regering den 3. juni 2026: Socialdemokratiet, SF, Moderaterne og Radikale Venstre. Venstre er ikke længere med. Konservative er stadig ikke med. Tjek stm.dk før prøven.  (`:5489`)
- Current note EN: After the election on 24 March 2026, Mette Frederiksen formed a new government on 3 June 2026: the Social Democrats, SF, the Moderates and the Social Liberals. Venstre is no longer in it. The Conservatives are still not in it. Check stm.dk before the exam.

- **Q:2024-11-q8** · `data/questions.json:12877` · exam 2024-11 nr. 8 · section '' · answer_source: image · uncertain: false · notes: 'Key B (Venstre) is correct: SVM government (Socialdemokratiet, Venstre, Moderaterne) since Dec 2022. Verified.'
  - Q DA: Hvilket af følgende partier har været med i regeringen siden 2022?  (`:12881`)
  - Q EN: Which of the following parties has been in the government since 2022?  (`:12906`)
  - Option A DA: Dansk Folkeparti  (`:12885`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option B DA: Venstre  (`:12890`) · EN: Venstre (the Liberal Party)
  - Option C DA: Det Konservative Folkeparti  (`:12895`) · EN: The Conservative People's Party
  - Correct (`:12899`): B
  - Correct text: B) Venstre / Venstre (the Liberal Party)
  - image_note: null
- **Q:2025-05-q18** · `data/questions.json:13977` · exam 2025-05 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er Det Konservative Folkeparti med i den nuværende regering?  (`:13981`)
  - Q EN: Is the Conservative People's Party (Det Konservative Folkeparti) in the current government?  (`:14001`)
  - Option A DA: Ja  (`:13985`) · EN: Yes
  - Option B DA: Nej  (`:13990`) · EN: No
  - Correct (`:13994`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-stoerste-parti-2022 · `data/clusters.json:5493` · asked 2× (2023-11, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Socialdemokratiet fik flest stemmer ved folketingsvalget i 2022.  (`clusters.json:5495`)
- Fact EN: The Social Democrats got the most votes in the 2022 general election.  (`clusters.json:5496`)
- Canonical question DA: Hvilket parti fik flest stemmer ved folketingsvalget i 2022?  (`:5508`)
- Canonical question EN: Which party got the most votes in the 2022 general election?  (`:5509`)
- Canonical answer DA: Socialdemokratiet  (`:5510`)
- Canonical answer EN: The Social Democrats  (`:5511`)
- Variants:
  - Q DA: Hvilket parti fik flest stemmer ved folketingsvalget i 2022?  (`:5514`)
    Q EN: Which party got the most votes in the 2022 general election?
    A DA: Socialdemokratiet
    A EN: The Social Democrats (Socialdemokratiet)
    Question ids: 2023-11-q7, 2025-05-q19
- Trap note DA: (empty)  (`:5524`)
- Trap note EN: (empty)
- Current note DA: Socialdemokratiet blev også største parti ved valget 24. marts 2026.  (`:5526`)
- Current note EN: The Social Democrats were also the largest party in the election on 24 March 2026.

- **Q:2023-11-q7** · `data/questions.json:11244` · exam 2023-11 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket parti fik flest stemmer ved folketingsvalget i 2022?  (`:11248`)
  - Q EN: Which party got the most votes in the 2022 general election?  (`:11273`)
  - Option A DA: Socialdemokratiet  (`:11252`) · EN: The Social Democrats (Socialdemokratiet)
  - Option B DA: Dansk Folkeparti  (`:11257`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option C DA: Venstre  (`:11262`) · EN: Venstre (the Liberal Party)
  - Correct (`:11266`): A
  - Correct text: A) Socialdemokratiet / The Social Democrats (Socialdemokratiet)
  - image_note: null
- **Q:2025-05-q19** · `data/questions.json:14005` · exam 2025-05 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket parti fik flest stemmer ved folketingsvalget i 2022?  (`:14009`)
  - Q EN: Which party got the most votes in the 2022 general election?  (`:14034`)
  - Option A DA: Socialdemokratiet  (`:14013`) · EN: The Social Democrats (Socialdemokratiet)
  - Option B DA: Dansk Folkeparti  (`:14018`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option C DA: Venstre  (`:14023`) · EN: Venstre (the Liberal Party)
  - Correct (`:14027`): A
  - Correct text: A) Socialdemokratiet / The Social Democrats (Socialdemokratiet)
  - image_note: null

#### C:dem-demonstration · `data/clusters.json:5919` · asked 2× (2016-12, 2023-11) · frequent: no · last asked: 2023-11

- Fact DA: Man skal give politiet besked (underrette), før man holder en demonstration – men man skal IKKE have politiets tilladelse.  (`clusters.json:5921`)
- Fact EN: You must notify the police before you hold a demonstration – but you do NOT need police permission.  (`clusters.json:5922`)
- Canonical question DA: Skal man underrette politiet, før man holder en demonstration?  (`:5934`)
- Canonical question EN: Must you notify the police before you hold a demonstration?  (`:5935`)
- Canonical answer DA: Underrette (give besked) = Ja. Tilladelse = Nej.  (`:5936`)
- Canonical answer EN: Notify = Yes. Permission = No.  (`:5937`)
- Variants:
  - Q DA: Skal man underrette politiet, før man holder en demonstration?  (`:5940`)
    Q EN: Must you notify the police before you hold a demonstration?
    A DA: Ja
    A EN: Yes
    Question ids: 2016-12-q7
  - Q DA: Skal politiet normalt give tilladelse til, at man afholder en demonstration?  (`:5949`)
    Q EN: Must the police normally give permission for you to hold a demonstration?
    A DA: Nej
    A EN: No
    Question ids: 2023-11-q23
- Trap note DA: Ét ord ændrer svaret! 'underrette politiet' = Ja. 'politiet skal give tilladelse' = Nej.  (`:5958`)
- Trap note EN: One word changes the answer! 'notify the police' = Yes. 'the police must give permission' = No.
- Current note DA: (empty)  (`:5960`)
- Current note EN: (empty)

- **Q:2016-12-q7** · `data/questions.json:196` · exam 2016-12 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal man underrette politiet, før man holder en demonstration?  (`:200`)
  - Q EN: Must you notify the police before you hold a demonstration?  (`:220`)
  - Option A DA: Ja.  (`:204`) · EN: Yes
  - Option B DA: Nej.  (`:209`) · EN: No
  - Correct (`:213`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2023-11-q23** · `data/questions.json:11757` · exam 2023-11 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal politiet normalt give tilladelse til, at man afholder en demonstration?  (`:11761`)
  - Q EN: Must the police normally give permission for you to hold a demonstration?  (`:11781`)
  - Option A DA: Ja  (`:11765`) · EN: Yes
  - Option B DA: Nej  (`:11770`) · EN: No
  - Correct (`:11774`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-anholdt-24t · `data/clusters.json:6509` · asked 2× (2018-06, 2018-11) · frequent: no · last asked: 2018-11

- Fact DA: En anholdt person skal stilles for en dommer inden 24 timer.  (`clusters.json:6511`)
- Fact EN: An arrested person must be brought before a judge within 24 hours.  (`clusters.json:6512`)
- Canonical question DA: Hvor længe kan politiet tilbageholde en anholdt, før personen skal stilles for en dommer?  (`:6524`)
- Canonical question EN: How long can the police hold an arrested person before they must be brought before a judge?  (`:6525`)
- Canonical answer DA: 24 timer  (`:6526`)
- Canonical answer EN: 24 hours  (`:6527`)
- Variants:
  - Q DA: Hvor længe kan politiet tilbageholde en person, der er anholdt, før personen skal stilles for en dommer?  (`:6530`)
    Q EN: How long can the police hold an arrested person before the person must be brought before a judge?
    A DA: 24 timer
    A EN: 24 hours
    Question ids: 2018-06-q9
  - Q DA: Hvor længe kan politiet tilbageholde en borger, der er anholdt, før borgeren skal stilles for en dommer?  (`:6539`)
    Q EN: How long can the police hold an arrested citizen before the citizen must be brought before a judge?
    A DA: 24 timer
    A EN: 24 hours
    Question ids: 2018-11-q15
- Trap note DA: (empty)  (`:6548`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6550`)
- Current note EN: (empty)

- **Q:2018-06-q9** · `data/questions.json:2620` · exam 2018-06 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor længe kan politiet tilbageholde en person, der er anholdt, før personen skal stilles for en dommer?  (`:2624`)
  - Q EN: How long can the police hold an arrested person before the person must be brought before a judge?  (`:2649`)
  - Option A DA: 72 timer  (`:2628`) · EN: 72 hours
  - Option B DA: 48 timer  (`:2633`) · EN: 48 hours
  - Option C DA: 24 timer  (`:2638`) · EN: 24 hours
  - Correct (`:2642`): C
  - Correct text: C) 24 timer / 24 hours
  - image_note: null
- **Q:2018-11-q15** · `data/questions.json:3613` · exam 2018-11 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor længe kan politiet tilbageholde en borger, der er anholdt, før borgeren skal stilles for en dommer?  (`:3617`)
  - Q EN: How long can the police hold an arrested citizen before the citizen must be brought before a judge?  (`:3642`)
  - Option A DA: 24 timer  (`:3621`) · EN: 24 hours
  - Option B DA: 48 timer  (`:3626`) · EN: 48 hours
  - Option C DA: 72 timer  (`:3631`) · EN: 72 hours
  - Correct (`:3635`): A
  - Correct text: A) 24 timer / 24 hours
  - image_note: null

#### C:dem-forfatning · `data/clusters.json:6554` · asked 2× (2018-06, 2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Danmarks forfatning hedder Grundloven.  (`clusters.json:6556`)
- Fact EN: Denmark's constitution is called Grundloven (the Constitution).  (`clusters.json:6557`)
- Canonical question DA: Hvad hedder Danmarks forfatning?  (`:6569`)
- Canonical question EN: What is Denmark's constitution called?  (`:6570`)
- Canonical answer DA: Grundloven  (`:6571`)
- Canonical answer EN: Grundloven (the Constitution)  (`:6572`)
- Variants:
  - Q DA: Hvad hedder Danmarks forfatning?  (`:6575`)
    Q EN: What is Denmark's constitution called?
    A DA: Grundloven
    A EN: The Constitution (Grundloven)
    Question ids: 2018-06-q15, 2018-11-q8
- Trap note DA: Kongeloven (1665) og Danske Lov (1683) er gamle love fra enevælden – ikke forfatningen i dag.  (`:6585`)
- Trap note EN: Kongeloven (1665) and Danske Lov (1683) are old laws from the age of absolute monarchy – not today's constitution.
- Current note DA: (empty)  (`:6587`)
- Current note EN: (empty)

- **Q:2018-06-q15** · `data/questions.json:2813` · exam 2018-06 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks forfatning?  (`:2817`)
  - Q EN: What is Denmark's constitution called?  (`:2842`)
  - Option A DA: Valgloven  (`:2821`) · EN: The Elections Act
  - Option B DA: Grundloven  (`:2826`) · EN: The Constitution (Grundloven)
  - Option C DA: Kongeloven  (`:2831`) · EN: Kongeloven (the Royal Law of 1665)
  - Correct (`:2835`): B
  - Correct text: B) Grundloven / The Constitution (Grundloven)
  - image_note: null
- **Q:2018-11-q8** · `data/questions.json:3382` · exam 2018-11 nr. 8 · section '' · answer_source: image · uncertain: false · notes: 'PDF misprints option labels A,B,B; third recorded as C. Answer A unaffected. Verified.'
  - Q DA: Hvad hedder Danmarks forfatning?  (`:3386`)
  - Q EN: What is Denmark's constitution called?  (`:3411`)
  - Option A DA: Grundloven  (`:3390`) · EN: The Constitution (Grundloven)
  - Option B DA: Danske Lov  (`:3395`) · EN: Danske Lov (the Danish Code of 1683)
  - Option C DA: Kongeloven  (`:3400`) · EN: Kongeloven (the Royal Law of 1665)
  - Correct (`:3404`): A
  - Correct text: A) Grundloven / The Constitution (Grundloven)
  - image_note: null

#### C:dem-hemmelig-stemme · `data/clusters.json:7033` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Afstemningen er hemmelig. Andre må ikke se, hvad man stemmer.  (`clusters.json:7035`)
- Fact EN: Voting is secret. Others may not see how you vote.  (`clusters.json:7036`)
- Canonical question DA: Må andre se, hvad man stemmer til folketingsvalg?  (`:7046`)
- Canonical question EN: May other people see how you vote in a general election?  (`:7047`)
- Canonical answer DA: Nej  (`:7048`)
- Canonical answer EN: No  (`:7049`)
- Variants:
  - Q DA: Må andre se, hvad man stemmer til folketingsvalg?  (`:7052`)
    Q EN: May other people see how you vote in a general election?
    A DA: Nej
    A EN: No
    Question ids: 2024-11-q20
- Trap note DA: (empty)  (`:7061`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7063`)
- Current note EN: (empty)

- **Q:2024-11-q20** · `data/questions.json:13258` · exam 2024-11 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Må andre se, hvad man stemmer til folketingsvalg?  (`:13262`)
  - Q EN: May other people see how you vote in a general election?  (`:13282`)
  - Option A DA: Ja  (`:13266`) · EN: Yes
  - Option B DA: Nej  (`:13271`) · EN: No
  - Correct (`:13275`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:dem-udskriver-valg · `data/clusters.json:7883` · asked 1× (2017-11) · frequent: no · last asked: 2017-11

- Fact DA: Statsministeren bestemmer, hvornår der skal være folketingsvalg (udskriver valg).  (`clusters.json:7885`)
- Fact EN: The prime minister decides when a general election is held (calls the election).  (`clusters.json:7886`)
- Canonical question DA: Hvem bestemmer, hvornår der skal udskrives valg til Folketinget?  (`:7896`)
- Canonical question EN: Who decides when a general election is called?  (`:7897`)
- Canonical answer DA: Statsministeren  (`:7898`)
- Canonical answer EN: The prime minister  (`:7899`)
- Variants:
  - Q DA: Hvem bestemmer, hvornår der skal udskrives valg til Folketinget?  (`:7902`)
    Q EN: Who decides when a general election to the Folketing is called?
    A DA: Statsministeren
    A EN: The prime minister
    Question ids: 2017-11-q22
- Trap note DA: Ikke Folketingets formand. Valget skal dog holdes mindst hvert 4. år.  (`:7911`)
- Trap note EN: Not the Speaker of the Folketing. But the election must be held at least every 4 years.
- Current note DA: (empty)  (`:7913`)
- Current note EN: (empty)

- **Q:2017-11-q22** · `data/questions.json:2241` · exam 2017-11 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem bestemmer, hvornår der skal udskrives valg til Folketinget?  (`:2245`)
  - Q EN: Who decides when a general election to the Folketing is called?  (`:2265`)
  - Option A DA: Folketingets formand  (`:2249`) · EN: The Speaker of the Folketing
  - Option B DA: Statsministeren  (`:2254`) · EN: The prime minister
  - Correct (`:2258`): B
  - Correct text: B) Statsministeren / The prime minister
  - image_note: null

#### C:dem-regeringsdannelse · `data/clusters.json:8053` · asked 1× (2016-12) · frequent: no · last asked: 2016-12

- Fact DA: Efter et valg er det Folketinget (flertallet), der bestemmer, hvem der danner regering.  (`clusters.json:8055`)
- Fact EN: After an election it is the Folketing (the majority) that decides who forms the government.  (`clusters.json:8056`)
- Canonical question DA: Hvem bestemmer, hvem der skal danne regering efter et valg?  (`:8066`)
- Canonical question EN: Who decides who will form the government after an election?  (`:8067`)
- Canonical answer DA: Folketinget  (`:8068`)
- Canonical answer EN: The Folketing  (`:8069`)
- Variants:
  - Q DA: Hvem bestemmer, hvem der skal danne regering efter et valg?  (`:8072`)
    Q EN: Who decides who will form the government after an election?
    A DA: Folketinget
    A EN: The Folketing (parliament)
    Question ids: 2016-12-q1
- Trap note DA: Ikke monarken og ikke domstolene. Ingen regering kan sidde, hvis et flertal i Folketinget er imod den.  (`:8081`)
- Trap note EN: Not the monarch and not the courts. No government can stay if a majority in the Folketing is against it.
- Current note DA: (empty)  (`:8083`)
- Current note EN: (empty)

- **Q:2016-12-q1** · `data/questions.json:3` · exam 2016-12 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem bestemmer, hvem der skal danne regering efter et valg?  (`:7`)
  - Q EN: Who decides who will form the government after an election?  (`:32`)
  - Option A DA: Dronningen.  (`:11`) · EN: The Queen
  - Option B DA: Folketinget.  (`:16`) · EN: The Folketing (parliament)
  - Option C DA: Domstolene.  (`:21`) · EN: The courts
  - Correct (`:25`): B
  - Correct text: B) Folketinget. / The Folketing (parliament)
  - image_note: null


## 2. Kongehus og rigsfællesskab / The monarchy and the Danish Realm  (`topic:kongehus`, `data/topics.json:97`)

### Intro paragraphs (`I:kongehus:n`)

- **I:kongehus:1** · `data/topics.json:104` (EN `:105`)
  - DA: Danmark er et arvemonarki: den nye konge eller dronning arver tronen. Ingen vælger monarken. Siden 14. januar 2024 er Frederik 10. konge. Kronprinsen hedder Christian.
  - EN: Denmark is a hereditary monarchy: the new king or queen inherits the throne. Nobody elects the monarch. Since 14 January 2024 Frederik 10. has been king. The crown prince is called Christian.
- **I:kongehus:2** · `data/topics.json:108` (EN `:109`)
  - DA: Kongen underskriver nye love sammen med en minister. Kongen holder nytårstale den 31. december. Statsministeren holder nytårstale den 1. januar og åbningstalen, når Folketinget åbner i oktober.
  - EN: The King signs new laws together with a minister. The King gives a New Year's speech on 31 December. The prime minister gives a New Year's speech on 1 January and the opening speech when the Folketing opens in October.
- **I:kongehus:3** · `data/topics.json:112` (EN `:113`)
  - DA: Rigsfællesskabet består af Danmark, Grønland og Færøerne. Island, Norge og Åland er ikke med. Grønland og Færøerne vælger hver 2 medlemmer til Folketinget. USA har en luftbase i Grønland (Thule, i dag Pituffik).
  - EN: The Danish Realm consists of Denmark, Greenland and the Faroe Islands. Iceland, Norway and Åland are not part of it. Greenland and the Faroe Islands each elect 2 members to the Folketing. The USA has an air base in Greenland (Thule, today Pituffik).

### Current facts – "Ændret siden prøven" (`F:kongehus:n`)

- **F:kongehus:1** · `data/topics.json:118` (EN `:119`)
  - DA: Prøver fra 2018-2022 siger 'Dronningen' (Margrethe 2.). I dag er svaret 'Kongen' (Frederik 10.). Hvis kun 'Dronningen' står som mulighed i en gammel prøve, er det det rigtige svar dér.
  - EN: Exams from 2018–2022 say 'the Queen' (Margrethe 2.). Today the answer is 'the King' (Frederik 10.). If only 'the Queen' is offered in an old exam, that is the right answer there.

### Overview tables / fact groups (`G:…`)

- (none)
### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:kon-rigsfaellesskab · `data/clusters.json:278` · asked 8× (2017-11, 2019-06, 2020-06, 2021-06, 2022-06, 2023-11, 2024-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Rigsfællesskabet er Danmark, Grønland og Færøerne. Island, Norge og Åland er IKKE med.  (`clusters.json:280`)
- Fact EN: The Danish Realm (rigsfællesskabet) is Denmark, Greenland and the Faroe Islands. Iceland, Norway and Åland are NOT part of it.  (`clusters.json:281`)
- Canonical question DA: Hvilke lande er med i rigsfællesskabet?  (`:305`)
- Canonical question EN: Which countries are part of the Danish Realm?  (`:306`)
- Canonical answer DA: Danmark, Grønland og Færøerne  (`:307`)
- Canonical answer EN: Denmark, Greenland and the Faroe Islands  (`:308`)
- Variants:
  - Q DA: Hvilke lande er der i det danske rigsfællesskab?  (`:311`)
    Q EN: Which countries are in the Danish Realm (rigsfællesskabet)?
    A DA: Danmark, Grønland og Færøerne
    A EN: Denmark, Greenland and the Faroe Islands
    Question ids: 2017-11-q4
  - Q DA: Hvilken af følgende ø-grupper er med i det danske rigsfællesskab?  (`:320`)
    Q EN: Which of the following island groups is part of the Danish Realm?
    A DA: Færøerne
    A EN: The Faroe Islands
    Question ids: 2019-06-q5
  - Q DA: Hvilket af følgende landområder er ikke med i det danske rigsfællesskab?  (`:329`)
    Q EN: Which of the following territories is NOT part of the Danish Realm?
    A DA: Åland
    A EN: Åland
    Question ids: 2020-06-q14
  - Q DA: Hvilke lande er med i rigsfællesskabet?  (`:338`)
    Q EN: Which countries are part of the Danish Realm (rigsfællesskabet)?
    A DA: Danmark, Grønland og Færøerne
    A EN: Denmark, Greenland and the Faroe Islands
    Question ids: 2021-06-q15
  - Q DA: Hvem er ikke med i det danske rigsfællesskab?  (`:347`)
    Q EN: Who is NOT part of the Danish Realm?
    A DA: Island
    A EN: Iceland
    Question ids: 2022-06-q21, 2024-05-q1
  - Q DA: Hvilket af følgende lande er ikke med i det danske rigsfællesskab?  (`:357`)
    Q EN: Which of the following countries is NOT part of the Danish Realm?
    A DA: Island
    A EN: Iceland
    Question ids: 2023-11-q20
  - Q DA: Hvilket land er ikke med i det danske rigsfællesskab?  (`:366`)
    Q EN: Which country is NOT part of the Danish Realm?
    A DA: Island
    A EN: Iceland
    Question ids: 2025-11-q9
- Trap note DA: Læs spørgsmålet: 'Hvem er IKKE med?' – svaret er Island (eller Åland). 'Hvilken ø-gruppe ER med?' – svaret er Færøerne.  (`:375`)
- Trap note EN: Read the question: 'Who is NOT part of it?' – the answer is Iceland (or Åland). 'Which island group IS part of it?' – the answer is the Faroe Islands.
- Current note DA: (empty)  (`:377`)
- Current note EN: (empty)

- **Q:2017-11-q4** · `data/questions.json:1667` · exam 2017-11 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilke lande er der i det danske rigsfællesskab?  (`:1671`)
  - Q EN: Which countries are in the Danish Realm (rigsfællesskabet)?  (`:1691`)
  - Option A DA: Danmark, Grønland og Færøerne  (`:1675`) · EN: Denmark, Greenland and the Faroe Islands
  - Option B DA: Danmark, Island og Norge  (`:1680`) · EN: Denmark, Iceland and Norway
  - Correct (`:1684`): A
  - Correct text: A) Danmark, Grønland og Færøerne / Denmark, Greenland and the Faroe Islands
  - image_note: null
- **Q:2019-06-q5** · `data/questions.json:4098` · exam 2019-06 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende ø-grupper er med i det danske rigsfællesskab?  (`:4102`)
  - Q EN: Which of the following island groups is part of the Danish Realm?  (`:4127`)
  - Option A DA: Færøerne  (`:4106`) · EN: The Faroe Islands
  - Option B DA: Ålandsøerne  (`:4111`) · EN: The Åland Islands
  - Option C DA: Shetlandsøerne  (`:4116`) · EN: The Shetland Islands
  - Correct (`:4120`): A
  - Correct text: A) Færøerne / The Faroe Islands
  - image_note: null
- **Q:2020-06-q14** · `data/questions.json:5980` · exam 2020-06 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende landområder er ikke med i det danske rigsfællesskab?  (`:5984`)
  - Q EN: Which of the following territories is NOT part of the Danish Realm?  (`:6009`)
  - Option A DA: Færøerne  (`:5988`) · EN: The Faroe Islands
  - Option B DA: Grønland  (`:5993`) · EN: Greenland
  - Option C DA: Åland  (`:5998`) · EN: Åland
  - Correct (`:6002`): C
  - Correct text: C) Åland / Åland
  - image_note: null
- **Q:2021-06-q15** · `data/questions.json:7573` · exam 2021-06 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilke lande er med i rigsfællesskabet?  (`:7577`)
  - Q EN: Which countries are part of the Danish Realm (rigsfællesskabet)?  (`:7597`)
  - Option A DA: Danmark, Grønland og Færøerne  (`:7581`) · EN: Denmark, Greenland and the Faroe Islands
  - Option B DA: Danmark, Island og Norge  (`:7586`) · EN: Denmark, Iceland and Norway
  - Correct (`:7590`): A
  - Correct text: A) Danmark, Grønland og Færøerne / Denmark, Greenland and the Faroe Islands
  - image_note: null
- **Q:2022-06-q21** · `data/questions.json:9331` · exam 2022-06 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem er ikke med i det danske rigsfællesskab?  (`:9335`)
  - Q EN: Who is NOT part of the Danish Realm?  (`:9360`)
  - Option A DA: Island  (`:9339`) · EN: Iceland
  - Option B DA: Færøerne  (`:9344`) · EN: The Faroe Islands
  - Option C DA: Grønland  (`:9349`) · EN: Greenland
  - Correct (`:9353`): A
  - Correct text: A) Island / Iceland
  - image_note: null
- **Q:2023-11-q20** · `data/questions.json:11658` · exam 2023-11 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende lande er ikke med i det danske rigsfællesskab?  (`:11662`)
  - Q EN: Which of the following countries is NOT part of the Danish Realm?  (`:11687`)
  - Option A DA: Færøerne  (`:11666`) · EN: The Faroe Islands
  - Option B DA: Grønland  (`:11671`) · EN: Greenland
  - Option C DA: Island  (`:11676`) · EN: Iceland
  - Correct (`:11680`): C
  - Correct text: C) Island / Iceland
  - image_note: null
- **Q:2024-05-q1** · `data/questions.json:11846` · exam 2024-05 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem er ikke med i det danske rigsfællesskab?  (`:11850`)
  - Q EN: Who is NOT part of the Danish Realm?  (`:11875`)
  - Option A DA: Island  (`:11854`) · EN: Iceland
  - Option B DA: Færøerne  (`:11859`) · EN: The Faroe Islands
  - Option C DA: Grønland  (`:11864`) · EN: Greenland
  - Correct (`:11868`): A
  - Correct text: A) Island / Iceland
  - image_note: null
- **Q:2025-11-q9** · `data/questions.json:14495` · exam 2025-11 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket land er ikke med i det danske rigsfællesskab?  (`:14499`)
  - Q EN: Which country is NOT part of the Danish Realm?  (`:14524`)
  - Option A DA: Island  (`:14503`) · EN: Iceland
  - Option B DA: Færøerne  (`:14508`) · EN: The Faroe Islands
  - Option C DA: Grønland  (`:14513`) · EN: Greenland
  - Correct (`:14517`): A
  - Correct text: A) Island / Iceland
  - image_note: null

#### C:kon-nytaarstale · `data/clusters.json:3450` · asked 4× (2018-06, 2020-06, 2021-11, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: Kongen holder nytårstale den 31. december. Statsministeren holder nytårstale den 1. januar.  (`clusters.json:3452`)
- Fact EN: The King gives the New Year's speech on 31 December. The prime minister gives a New Year's speech on 1 January.  (`clusters.json:3453`)
- Canonical question DA: Hvem holder sin nytårstale den 31. december?  (`:3469`)
- Canonical question EN: Who gives their New Year's speech on 31 December?  (`:3470`)
- Canonical answer DA: Kongen (i ældre prøver: Dronningen)  (`:3471`)
- Canonical answer EN: The King (in older exams: the Queen)  (`:3472`)
- Variants:
  - Q DA: Hvem holder sin nytårstale den 31. december?  (`:3475`)
    Q EN: Who gives their New Year's speech on 31 December?
    A DA: Dronningen
    A EN: The Queen
    Question ids: 2018-06-q7, 2020-06-q22, 2021-11-q4, 2022-11-q4
- Trap note DA: 31. december = monarken (i dag Kongen). 1. januar = statsministeren. Står der 'Dronningen' som mulighed, er det det rigtige svar i den gamle prøve.  (`:3487`)
- Trap note EN: 31 December = the monarch (today the King). 1 January = the prime minister. If 'the Queen' is an option, it is the right answer in the old exam.
- Current note DA: Per 2026 er Frederik 10. konge (siden 14. januar 2024). Ældre prøver siger 'Dronningen' – i dag er svaret 'Kongen'.  (`:3489`)
- Current note EN: Per 2026 Frederik 10. is king (since 14 January 2024). Older exams say 'the Queen' – today the answer is 'the King'.

- **Q:2018-06-q7** · `data/questions.json:2559` · exam 2018-06 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem holder sin nytårstale den 31. december?  (`:2563`)
  - Q EN: Who gives their New Year's speech on 31 December?  (`:2583`)
  - Option A DA: Dronningen  (`:2567`) · EN: The Queen
  - Option B DA: Statsministeren  (`:2572`) · EN: The prime minister
  - Correct (`:2576`): A
  - Correct text: A) Dronningen / The Queen
  - image_note: null
- **Q:2020-06-q22** · `data/questions.json:6229` · exam 2020-06 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem holder sin nytårstale den 31. december?  (`:6233`)
  - Q EN: Who gives their New Year's speech on 31 December?  (`:6253`)
  - Option A DA: Dronningen  (`:6237`) · EN: The Queen
  - Option B DA: Statsministeren  (`:6242`) · EN: The prime minister
  - Correct (`:6246`): A
  - Correct text: A) Dronningen / The Queen
  - image_note: null
- **Q:2021-11-q4** · `data/questions.json:8000` · exam 2021-11 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem holder sin nytårstale den 31. december?  (`:8004`)
  - Q EN: Who gives their New Year's speech on 31 December?  (`:8024`)
  - Option A DA: Dronningen  (`:8008`) · EN: The Queen
  - Option B DA: Statsministeren  (`:8013`) · EN: The prime minister
  - Correct (`:8017`): A
  - Correct text: A) Dronningen / The Queen
  - image_note: null
- **Q:2022-11-q4** · `data/questions.json:9580` · exam 2022-11 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem holder sin nytårstale den 31. december?  (`:9584`)
  - Q EN: Who gives their New Year's speech on 31 December?  (`:9604`)
  - Option A DA: Dronningen  (`:9588`) · EN: The Queen
  - Option B DA: Statsministeren  (`:9593`) · EN: The prime minister
  - Correct (`:9597`): A
  - Correct text: A) Dronningen / The Queen
  - image_note: null

#### C:kon-arv · `data/clusters.json:3560` · asked 4× (2017-11, 2019-06, 2021-06, 2022-06) · frequent: yes · last asked: 2022-06

- Fact DA: Kongen eller dronningen arver tronen. Danmark er et arvemonarki.  (`clusters.json:3562`)
- Fact EN: The king or queen inherits the throne. Denmark is a hereditary monarchy.  (`clusters.json:3563`)
- Canonical question DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:3579`)
- Canonical question EN: How is it decided who will be king or queen in Denmark?  (`:3580`)
- Canonical answer DA: Den nye konge eller dronning arver tronen  (`:3581`)
- Canonical answer EN: The new king or queen inherits the throne  (`:3582`)
- Variants:
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:3585`)
    Q EN: How is it decided who will be king or queen in Denmark?
    A DA: Den nye konge eller dronning arver tronen
    A EN: The new king or queen inherits the throne
    Question ids: 2017-11-q14, 2021-06-q16, 2022-06-q7
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:3585`)
    Q EN: How is it decided who will be king or queen in Denmark?
    A DA: Den kommende konge eller dronning arver tronen
    A EN: The future king or queen inherits the throne
    Question ids: 2019-06-q11
- Trap note DA: Ingen vælger kongen – hverken Folketinget, regeringen eller en folkeafstemning.  (`:3605`)
- Trap note EN: Nobody elects the king – not the Folketing, the government or a referendum.
- Current note DA: (empty)  (`:3607`)
- Current note EN: (empty)

- **Q:2017-11-q14** · `data/questions.json:1987` · exam 2017-11 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:1991`)
  - Q EN: How is it decided who will be king or queen in Denmark?  (`:2016`)
  - Option A DA: Folketinget vælger den bedst kvalificerede  (`:1995`) · EN: The Folketing chooses the best-qualified person
  - Option B DA: Den nye konge eller dronning arver tronen  (`:2000`) · EN: The new king or queen inherits the throne
  - Option C DA: Det bliver afgjort gennem en folkeafstemning  (`:2005`) · EN: It is decided by a referendum
  - Correct (`:2009`): B
  - Correct text: B) Den nye konge eller dronning arver tronen / The new king or queen inherits the throne
  - image_note: null
- **Q:2019-06-q11** · `data/questions.json:4291` · exam 2019-06 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:4295`)
  - Q EN: How is it decided who will be king or queen in Denmark?  (`:4320`)
  - Option A DA: Folketinget vælger den bedst kvalificerede  (`:4299`) · EN: The Folketing chooses the best-qualified person
  - Option B DA: Det bliver afgjort gennem en folkeafstemning  (`:4304`) · EN: It is decided by a referendum
  - Option C DA: Den kommende konge eller dronning arver tronen  (`:4309`) · EN: The future king or queen inherits the throne
  - Correct (`:4313`): C
  - Correct text: C) Den kommende konge eller dronning arver tronen / The future king or queen inherits the throne
  - image_note: null
- **Q:2021-06-q16** · `data/questions.json:7601` · exam 2021-06 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:7605`)
  - Q EN: How is it decided who will be king or queen in Denmark?  (`:7630`)
  - Option A DA: Folketinget vælger den bedst kvalificerede  (`:7609`) · EN: The Folketing chooses the best-qualified person
  - Option B DA: Den nye konge eller dronning arver tronen  (`:7614`) · EN: The new king or queen inherits the throne
  - Option C DA: Det bliver afgjort gennem en folkeafstemning  (`:7619`) · EN: It is decided by a referendum
  - Correct (`:7623`): B
  - Correct text: B) Den nye konge eller dronning arver tronen / The new king or queen inherits the throne
  - image_note: null
- **Q:2022-06-q7** · `data/questions.json:8884` · exam 2022-06 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvordan bliver det afgjort, hvem der skal være konge eller dronning i Danmark?  (`:8888`)
  - Q EN: How is it decided who will be king or queen in Denmark?  (`:8913`)
  - Option A DA: Den nye konge eller dronning arver tronen  (`:8892`) · EN: The new king or queen inherits the throne
  - Option B DA: Den nye konge eller dronning vælges af Folketinget  (`:8897`) · EN: The new king or queen is elected by the Folketing
  - Option C DA: Den nye konge eller dronning udpeges af regeringen  (`:8902`) · EN: The new king or queen is appointed by the government
  - Correct (`:8906`): A
  - Correct text: A) Den nye konge eller dronning arver tronen / The new king or queen inherits the throne
  - image_note: null

#### C:kon-rolle · `data/clusters.json:4511` · asked 3× (2018-11, 2020-11, 2022-06) · frequent: no · last asked: 2022-06

- Fact DA: Kongen underskriver nye love sammen med en minister.  (`clusters.json:4513`)
- Fact EN: The King signs new laws together with a minister.  (`clusters.json:4514`)
- Canonical question DA: Hvilken rolle har monarken blandt andet?  (`:4528`)
- Canonical question EN: Which role does the monarch have, among other things?  (`:4529`)
- Canonical answer DA: Underskriver nye love sammen med en minister  (`:4530`)
- Canonical answer EN: Signs new laws together with a minister  (`:4531`)
- Variants:
  - Q DA: Hvilken rolle har dronningen blandt andet?  (`:4534`)
    Q EN: Which role does the Queen have, among other things?
    A DA: Hun underskriver nye love sammen med en minister
    A EN: She signs new laws together with a minister
    Question ids: 2018-11-q9, 2020-11-q19, 2022-06-q18
- Trap note DA: Monarken holder IKKE åbningstalen i Folketinget i oktober – det gør statsministeren. Monarken repræsenterer ikke regeringen i EU.  (`:4545`)
- Trap note EN: The monarch does NOT give the opening speech in the Folketing in October – the prime minister does. The monarch does not represent the government in the EU.
- Current note DA: Per 2026 er Frederik 10. konge (siden 14. januar 2024). Ældre prøver siger 'Dronningen' – i dag er svaret 'Kongen'.  (`:4547`)
- Current note EN: Per 2026 Frederik 10. is king (since 14 January 2024). Older exams say 'the Queen' – today the answer is 'the King'.

- **Q:2018-11-q9** · `data/questions.json:3415` · exam 2018-11 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rolle har dronningen blandt andet?  (`:3419`)
  - Q EN: Which role does the Queen have, among other things?  (`:3444`)
  - Option A DA: Hun repræsenterer den danske regering i EU  (`:3423`) · EN: She represents the Danish government in the EU
  - Option B DA: Hun underskriver nye love sammen med en minister  (`:3428`) · EN: She signs new laws together with a minister
  - Option C DA: Hun holder åbningstalen ved Folketingets åbning i oktober  (`:3433`) · EN: She gives the opening speech when the Folketing opens in October
  - Correct (`:3437`): B
  - Correct text: B) Hun underskriver nye love sammen med en minister / She signs new laws together with a minister
  - image_note: null
- **Q:2020-11-q19** · `data/questions.json:6920` · exam 2020-11 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken rolle har dronningen blandt andet?  (`:6924`)
  - Q EN: Which role does the Queen have, among other things?  (`:6949`)
  - Option A DA: Hun udpeger Folketingets formand  (`:6928`) · EN: She appoints the Speaker of the Folketing
  - Option B DA: Hun underskriver nye love sammen med en minister  (`:6933`) · EN: She signs new laws together with a minister
  - Option C DA: Hun holder åbningstalen ved Folketingets åbning i oktober  (`:6938`) · EN: She gives the opening speech when the Folketing opens in October
  - Correct (`:6942`): B
  - Correct text: B) Hun underskriver nye love sammen med en minister / She signs new laws together with a minister
  - image_note: null
- **Q:2022-06-q18** · `data/questions.json:9232` · exam 2022-06 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken rolle har Dronningen blandt andet?  (`:9236`)
  - Q EN: Which role does the Queen have, among other things?  (`:9261`)
  - Option A DA: Hun repræsenterer den danske regering i EU  (`:9240`) · EN: She represents the Danish government in the EU
  - Option B DA: Hun underskriver nye love sammen med en minister  (`:9245`) · EN: She signs new laws together with a minister
  - Option C DA: Hun holder åbningstalen ved Folketingets åbning i oktober  (`:9250`) · EN: She gives the opening speech when the Folketing opens in October
  - Correct (`:9254`): B
  - Correct text: B) Hun underskriver nye love sammen med en minister / She signs new laws together with a minister
  - image_note: null

#### C:kon-konge · `data/clusters.json:5038` · asked 2× (2025-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Danmarks konge er Frederik 10. (siden 14. januar 2024).  (`clusters.json:5040`)
- Fact EN: Denmark's king is Frederik 10. (Frederik X), since 14 January 2024.  (`clusters.json:5041`)
- Canonical question DA: Hvem er Danmarks konge?  (`:5053`)
- Canonical question EN: Who is Denmark's king?  (`:5054`)
- Canonical answer DA: Frederik 10.  (`:5055`)
- Canonical answer EN: Frederik 10. (Frederik X)  (`:5056`)
- Variants:
  - Q DA: Hvem er Danmarks konge?  (`:5059`)
    Q EN: Who is Denmark's king?
    A DA: Frederik 10
    A EN: Frederik 10. (Frederik X)
    Question ids: 2025-05-q20, 2026-06-q16
- Trap note DA: Husk tallet 10. Frederik 7. underskrev grundloven i 1849 – han er en distraktor.  (`:5069`)
- Trap note EN: Remember the number 10. Frederik 7. signed the Constitution in 1849 – he is a distractor.
- Current note DA: (empty)  (`:5071`)
- Current note EN: (empty)

- **Q:2025-05-q20** · `data/questions.json:14038` · exam 2025-05 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem er Danmarks konge?  (`:14042`)
  - Q EN: Who is Denmark's king?  (`:14067`)
  - Option A DA: Frederik 4.  (`:14046`) · EN: Frederik 4. (Frederik IV)
  - Option B DA: Frederik 7.  (`:14051`) · EN: Frederik 7. (Frederik VII)
  - Option C DA: Frederik 10.  (`:14056`) · EN: Frederik 10. (Frederik X)
  - Correct (`:14060`): C
  - Correct text: C) Frederik 10. / Frederik 10. (Frederik X)
  - image_note: null
- **Q:2026-06-q16** · `data/questions.json:15506` · exam 2026-06 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem er Danmarks konge?  (`:15510`)
  - Q EN: Who is Denmark's king?  (`:15535`)
  - Option A DA: Frederik 4.  (`:15514`) · EN: Frederik 4. (Frederik IV)
  - Option B DA: Frederik 7.  (`:15519`) · EN: Frederik 7. (Frederik VII)
  - Option C DA: Frederik 10.  (`:15524`) · EN: Frederik 10. (Frederik X)
  - Correct (`:15528`): C
  - Correct text: C) Frederik 10. / Frederik 10. (Frederik X)
  - image_note: null

#### C:kon-kronprins · `data/clusters.json:6795` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Danmarks kronprins hedder Christian.  (`clusters.json:6797`)
- Fact EN: Denmark's crown prince is called Christian.  (`clusters.json:6798`)
- Canonical question DA: Hvad hedder Danmarks kronprins?  (`:6808`)
- Canonical question EN: What is the name of Denmark's crown prince?  (`:6809`)
- Canonical answer DA: Christian  (`:6810`)
- Canonical answer EN: Christian  (`:6811`)
- Variants:
  - Q DA: Hvad hedder Danmarks kronprins?  (`:6814`)
    Q EN: What is the name of Denmark's crown prince?
    A DA: Christian
    A EN: Christian
    Question ids: 2025-11-q24
- Trap note DA: Frederik er kongen, ikke kronprinsen (han var kronprins før 2024).  (`:6823`)
- Trap note EN: Frederik is the king, not the crown prince (he was crown prince before 2024).
- Current note DA: (empty)  (`:6825`)
- Current note EN: (empty)

- **Q:2025-11-q24** · `data/questions.json:14965` · exam 2025-11 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks kronprins?  (`:14969`)
  - Q EN: What is the name of Denmark's crown prince?  (`:14994`)
  - Option A DA: Christian  (`:14973`) · EN: Christian
  - Option B DA: Nikolaj  (`:14978`) · EN: Nikolaj
  - Option C DA: Frederik  (`:14983`) · EN: Frederik
  - Correct (`:14987`): A
  - Correct text: A) Christian / Christian
  - image_note: null

#### C:kon-thule · `data/clusters.json:7441` · asked 1× (2022-06) · frequent: no · last asked: 2022-06

- Fact DA: USA's luftbase Thule ligger i Grønland (i dag hedder den Pituffik).  (`clusters.json:7443`)
- Fact EN: The US air base Thule is in Greenland (today it is called Pituffik).  (`clusters.json:7444`)
- Canonical question DA: Hvor har USA luftbasen Thulebasen?  (`:7454`)
- Canonical question EN: Where does the USA have the Thule air base?  (`:7455`)
- Canonical answer DA: Grønland  (`:7456`)
- Canonical answer EN: Greenland  (`:7457`)
- Variants:
  - Q DA: Hvor har USA luftbasen Thulebasen?  (`:7460`)
    Q EN: Where does the USA have the Thule air base (Thulebasen)?
    A DA: Grønland
    A EN: Greenland
    Question ids: 2022-06-q11
- Trap note DA: (empty)  (`:7469`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7471`)
- Current note EN: (empty)

- **Q:2022-06-q11** · `data/questions.json:9011` · exam 2022-06 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor har USA luftbasen Thulebasen?  (`:9015`)
  - Q EN: Where does the USA have the Thule air base (Thulebasen)?  (`:9040`)
  - Option A DA: Bornholm  (`:9019`) · EN: Bornholm
  - Option B DA: Grønland  (`:9024`) · EN: Greenland
  - Option C DA: Færøerne  (`:9029`) · EN: The Faroe Islands
  - Correct (`:9033`): B
  - Correct text: B) Grønland / Greenland
  - image_note: null


## 3. Historie / History  (`topic:historie`, `data/topics.json:135`)

### Intro paragraphs (`I:historie:n`)

- **I:historie:1** · `data/topics.json:142` (EN `:143`)
  - DA: I 1536 kom reformationen til Danmark, og Danmark blev protestantisk. I 1658 mistede Danmark Skåne, Halland og Blekinge til Sverige. I 1700-tallet gav landboreformerne bønderne frihed til selv at vælge, hvor de ville bo og arbejde. I 1814 sluttede unionen med Norge efter over 400 år.
  - EN: In 1536 the Reformation came to Denmark, and Denmark became Protestant. In 1658 Denmark lost Skåne, Halland and Blekinge to Sweden. In the 1700s the agricultural reforms gave farmers the freedom to choose where to live and work. In 1814 the union with Norway ended after more than 400 years.
- **I:historie:2** · `data/topics.json:146` (EN `:147`)
  - DA: I 1840'erne kom de første jernbaner. I 1849 fik Danmark sin første grundlov. I 1864 mistede Danmark Slesvig og Holsten efter en krig. Partiet Venstre blev dannet omkring 1870.
  - EN: In the 1840s the first railways came. In 1849 Denmark got its first Constitution. In 1864 Denmark lost Slesvig and Holsten after a war. The party Venstre was founded around 1870.
- **I:historie:3** · `data/topics.json:150` (EN `:151`)
  - DA: Under 2. verdenskrig blev Danmark besat af Tyskland den 9. april 1940. Danmark blev befriet den 5. maj 1945. Efter krigen fik Danmark hjælp fra USA gennem Marshall-planen. Socialdemokratiet sad i regering flest år mellem 1929 og 1982.
  - EN: During the Second World War Denmark was occupied by Germany on 9 April 1940. Denmark was liberated on 5 May 1945. After the war Denmark got aid from the USA through the Marshall Plan. The Social Democrats were in government for the most years between 1929 and 1982.
- **I:historie:4** · `data/topics.json:154` (EN `:155`)
  - DA: 1960'erne var en tid med høj økonomisk vækst, og mange gæstearbejdere kom fra Tyrkiet. I 1970'erne kæmpede rødstrømperne (kvindebevægelsen) for kvinders rettigheder. I 2011 blev Helle Thorning-Schmidt den første kvindelige statsminister. I 2015 var der et terrorangreb ved Københavns Synagoge.
  - EN: The 1960s were a time of high economic growth, and many guest workers came from Turkey. In the 1970s the Redstockings (the women's movement) fought for women's rights. In 2011 Helle Thorning-Schmidt became the first female prime minister. In 2015 there was a terrorist attack at Copenhagen Synagogue.

### Current facts – "Ændret siden prøven" (`F:historie:n`)

- **F:historie:1** · `data/topics.json:160` (EN `:161`)
  - DA: OBS: Den officielle rettenøgle til prøven fra november 2017 (spørgsmål 23) siger fejlagtigt 'Skåne, Halland og Blekinge' for 1864. Det rigtige svar er Slesvig og Holsten. Skåne blev mistet i 1658.
  - EN: NOTE: The official answer key for the November 2017 exam (question 23) wrongly says 'Skåne, Halland and Blekinge' for 1864. The right answer is Slesvig and Holsten. Skåne was lost in 1658.

### Overview tables / fact groups (`G:…`)

- G:fg-aarstal – full entry above under topic demokrati (also used here)
- G:fg-hoejtider – full entry above under topic demokrati (also used here)
### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:his-foerste-kvindelige-sm · `data/clusters.json:3` · asked 9× (2017-06, 2018-06, 2018-11, 2020-06, 2021-06, 2021-11, 2023-05, 2024-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Danmarks første kvindelige statsminister var Helle Thorning-Schmidt (fra 2011). Før hende havde der ingen været.  (`clusters.json:5`)
- Fact EN: Denmark's first female prime minister was Helle Thorning-Schmidt (from 2011). Before her there had been none.  (`clusters.json:6`)
- Canonical question DA: Hvem var Danmarks første kvindelige statsminister?  (`:32`)
- Canonical question EN: Who was Denmark's first female prime minister?  (`:33`)
- Canonical answer DA: Helle Thorning-Schmidt  (`:34`)
- Canonical answer EN: Helle Thorning-Schmidt  (`:35`)
- Variants:
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:38`)
    Q EN: Who was Denmark's first female prime minister?
    A DA: Helle Thorning-Schmidt
    A EN: Helle Thorning-Schmidt
    Question ids: 2017-06-q21, 2018-11-q23, 2021-06-q2, 2023-05-q17, 2024-05-q2, 2025-11-q4
  - Q DA: Hvor mange kvindelige statsministre har der været i Danmark før Helle Thorning-Schmidt?  (`:52`)
    Q EN: How many female prime ministers had Denmark had before Helle Thorning-Schmidt?
    A DA: Ingen
    A EN: None
    Question ids: 2018-06-q11
  - Q DA: Hvad hedder Danmarks første kvindelige statsminister?  (`:61`)
    Q EN: What is the name of Denmark's first female prime minister?
    A DA: Helle Thorning-Schmidt
    A EN: Helle Thorning-Schmidt
    Question ids: 2020-06-q12, 2021-11-q23
- Trap note DA: Mette Frederiksen er statsminister nu (siden 2019) – men hun var den ANDEN. 'Hvor mange før Helle Thorning-Schmidt?' = Ingen.  (`:71`)
- Trap note EN: Mette Frederiksen is prime minister now (since 2019) – but she was the SECOND. 'How many before Helle Thorning-Schmidt?' = None.
- Current note DA: (empty)  (`:73`)
- Current note EN: (empty)

- **Q:2017-06-q21** · `data/questions.json:1418` · exam 2017-06 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:1422`)
  - Q EN: Who was Denmark's first female prime minister?  (`:1447`)
  - Option A DA: Mette Frederiksen.  (`:1426`) · EN: Mette Frederiksen
  - Option B DA: Helle Thorning-Schmidt.  (`:1431`) · EN: Helle Thorning-Schmidt
  - Option C DA: Margrethe Vestager.  (`:1436`) · EN: Margrethe Vestager
  - Correct (`:1440`): B
  - Correct text: B) Helle Thorning-Schmidt. / Helle Thorning-Schmidt
  - image_note: null
- **Q:2018-06-q11** · `data/questions.json:2686` · exam 2018-06 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange kvindelige statsministre har der været i Danmark før Helle Thorning-Schmidt?  (`:2690`)
  - Q EN: How many female prime ministers had Denmark had before Helle Thorning-Schmidt?  (`:2715`)
  - Option A DA: Ingen  (`:2694`) · EN: None
  - Option B DA: En  (`:2699`) · EN: One
  - Option C DA: To  (`:2704`) · EN: Two
  - Correct (`:2708`): A
  - Correct text: A) Ingen / None
  - image_note: null
- **Q:2018-11-q23** · `data/questions.json:3872` · exam 2018-11 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:3876`)
  - Q EN: Who was Denmark's first female prime minister?  (`:3901`)
  - Option A DA: Mette Frederiksen  (`:3880`) · EN: Mette Frederiksen
  - Option B DA: Pia Kjærsgaard  (`:3885`) · EN: Pia Kjærsgaard
  - Option C DA: Helle Thorning-Schmidt  (`:3890`) · EN: Helle Thorning-Schmidt
  - Correct (`:3894`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2020-06-q12** · `data/questions.json:5914` · exam 2020-06 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks første kvindelige statsminister?  (`:5918`)
  - Q EN: What is the name of Denmark's first female prime minister?  (`:5943`)
  - Option A DA: Pia Kjærsgaard  (`:5922`) · EN: Pia Kjærsgaard
  - Option B DA: Mette Frederiksen  (`:5927`) · EN: Mette Frederiksen
  - Option C DA: Helle Thorning-Schmidt  (`:5932`) · EN: Helle Thorning-Schmidt
  - Correct (`:5936`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2021-06-q2** · `data/questions.json:7169` · exam 2021-06 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:7173`)
  - Q EN: Who was Denmark's first female prime minister?  (`:7198`)
  - Option A DA: Pia Olsen Dyhr  (`:7177`) · EN: Pia Olsen Dyhr
  - Option B DA: Sofie Carsten Nielsen  (`:7182`) · EN: Sofie Carsten Nielsen
  - Option C DA: Helle Thorning-Schmidt  (`:7187`) · EN: Helle Thorning-Schmidt
  - Correct (`:7191`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2021-11-q23** · `data/questions.json:8602` · exam 2021-11 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks første kvindelige statsminister?  (`:8606`)
  - Q EN: What is the name of Denmark's first female prime minister?  (`:8631`)
  - Option A DA: Pia Kjærsgaard  (`:8610`) · EN: Pia Kjærsgaard
  - Option B DA: Mette Frederiksen  (`:8615`) · EN: Mette Frederiksen
  - Option C DA: Helle Thorning-Schmidt  (`:8620`) · EN: Helle Thorning-Schmidt
  - Correct (`:8624`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2023-05-q17** · `data/questions.json:10779` · exam 2023-05 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:10783`)
  - Q EN: Who was Denmark's first female prime minister?  (`:10808`)
  - Option A DA: Pia Kjærsgaard  (`:10787`) · EN: Pia Kjærsgaard
  - Option B DA: Mette Frederiksen  (`:10792`) · EN: Mette Frederiksen
  - Option C DA: Helle Thorning-Schmidt  (`:10797`) · EN: Helle Thorning-Schmidt
  - Correct (`:10801`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2024-05-q2** · `data/questions.json:11879` · exam 2024-05 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:11883`)
  - Q EN: Who was Denmark's first female prime minister?  (`:11908`)
  - Option A DA: Margrethe Vestager  (`:11887`) · EN: Margrethe Vestager
  - Option B DA: Mette Frederiksen  (`:11892`) · EN: Mette Frederiksen
  - Option C DA: Helle Thorning-Schmidt  (`:11897`) · EN: Helle Thorning-Schmidt
  - Correct (`:11901`): C
  - Correct text: C) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null
- **Q:2025-11-q4** · `data/questions.json:14335` · exam 2025-11 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem var Danmarks første kvindelige statsminister?  (`:14339`)
  - Q EN: Who was Denmark's first female prime minister?  (`:14364`)
  - Option A DA: Pia Kjærsgaard  (`:14343`) · EN: Pia Kjærsgaard
  - Option B DA: Helle Thorning-Schmidt  (`:14348`) · EN: Helle Thorning-Schmidt
  - Option C DA: Mette Frederiksen  (`:14353`) · EN: Mette Frederiksen
  - Correct (`:14357`): B
  - Correct text: B) Helle Thorning-Schmidt / Helle Thorning-Schmidt
  - image_note: null

#### C:his-reformation · `data/clusters.json:604` · asked 7× (2016-12, 2018-11, 2019-11, 2020-11, 2021-11, 2023-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Reformationen kom til Danmark i 1536. Siden da har Danmark været protestantisk (luthersk).  (`clusters.json:606`)
- Fact EN: The Reformation came to Denmark in 1536. Since then Denmark has been Protestant (Lutheran).  (`clusters.json:607`)
- Canonical question DA: Hvornår blev reformationen (protestantismen) indført i Danmark?  (`:629`)
- Canonical question EN: When was the Reformation (Protestantism) introduced in Denmark?  (`:630`)
- Canonical answer DA: 1536 – i 1500-tallet  (`:631`)
- Canonical answer EN: 1536 – in the 1500s  (`:632`)
- Variants:
  - Q DA: Hvilket år blev reformationen gennemført i Danmark?  (`:635`)
    Q EN: In which year was the Reformation carried out in Denmark?
    A DA: 1536
    A EN: 1536
    Question ids: 2016-12-q16
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:644`)
    Q EN: When was Protestantism introduced in Denmark?
    A DA: I 1500-tallet
    A EN: In the 1500s
    Question ids: 2018-11-q21, 2020-11-q5, 2021-11-q3
  - Q DA: Hvornår blev Reformationen gennemført i Danmark?  (`:655`)
    Q EN: When was the Reformation carried out in Denmark?
    A DA: I 1500-tallet
    A EN: In the 1500s
    Question ids: 2019-11-q16
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:644`)
    Q EN: When was Protestantism introduced in Denmark?
    A DA: 1500-tallet
    A EN: The 1500s
    Question ids: 2023-05-q21
  - Q DA: Hvornår blev Reformationen og dermed den protestantiske kristendom indført i Danmark?  (`:673`)
    Q EN: When was the Reformation, and with it Protestant Christianity, introduced in Denmark?
    A DA: 1500-tallet
    A EN: The 1500s
    Question ids: 2024-11-q15
- Trap note DA: Spørgsmålet kan sige 'reformationen' eller 'protestantismen' og spørge om året (1536) eller århundredet (1500-tallet).  (`:682`)
- Trap note EN: The question may say 'the Reformation' or 'Protestantism' and ask for the year (1536) or the century (the 1500s).
- Current note DA: (empty)  (`:684`)
- Current note EN: (empty)

- **Q:2016-12-q16** · `data/questions.json:473` · exam 2016-12 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket år blev reformationen gennemført i Danmark?  (`:477`)
  - Q EN: In which year was the Reformation carried out in Denmark?  (`:502`)
  - Option A DA: 1066.  (`:481`) · EN: 1066
  - Option B DA: 1397.  (`:486`) · EN: 1397
  - Option C DA: 1536.  (`:491`) · EN: 1536
  - Correct (`:495`): C
  - Correct text: C) 1536. / 1536
  - image_note: null
- **Q:2018-11-q21** · `data/questions.json:3806` · exam 2018-11 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:3810`)
  - Q EN: When was Protestantism introduced in Denmark?  (`:3835`)
  - Option A DA: I 1100-tallet  (`:3814`) · EN: In the 1100s
  - Option B DA: I 1300-tallet  (`:3819`) · EN: In the 1300s
  - Option C DA: I 1500-tallet  (`:3824`) · EN: In the 1500s
  - Correct (`:3828`): C
  - Correct text: C) I 1500-tallet / In the 1500s
  - image_note: null
- **Q:2019-11-q16** · `data/questions.json:5251` · exam 2019-11 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev Reformationen gennemført i Danmark?  (`:5255`)
  - Q EN: When was the Reformation carried out in Denmark?  (`:5280`)
  - Option A DA: I 1100-tallet  (`:5259`) · EN: In the 1100s
  - Option B DA: I 1300-tallet  (`:5264`) · EN: In the 1300s
  - Option C DA: I 1500-tallet  (`:5269`) · EN: In the 1500s
  - Correct (`:5273`): C
  - Correct text: C) I 1500-tallet / In the 1500s
  - image_note: null
- **Q:2020-11-q5** · `data/questions.json:6483` · exam 2020-11 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:6487`)
  - Q EN: When was Protestantism introduced in Denmark?  (`:6512`)
  - Option A DA: I 1100-tallet  (`:6491`) · EN: In the 1100s
  - Option B DA: I 1300-tallet  (`:6496`) · EN: In the 1300s
  - Option C DA: I 1500-tallet  (`:6501`) · EN: In the 1500s
  - Correct (`:6505`): C
  - Correct text: C) I 1500-tallet / In the 1500s
  - image_note: null
- **Q:2021-11-q3** · `data/questions.json:7967` · exam 2021-11 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:7971`)
  - Q EN: When was Protestantism introduced in Denmark?  (`:7996`)
  - Option A DA: I 1100-tallet  (`:7975`) · EN: In the 1100s
  - Option B DA: I 1300-tallet  (`:7980`) · EN: In the 1300s
  - Option C DA: I 1500-tallet  (`:7985`) · EN: In the 1500s
  - Correct (`:7989`): C
  - Correct text: C) I 1500-tallet / In the 1500s
  - image_note: null
- **Q:2023-05-q21** · `data/questions.json:10901` · exam 2023-05 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev protestantismen indført i Danmark?  (`:10905`)
  - Q EN: When was Protestantism introduced in Denmark?  (`:10930`)
  - Option A DA: 1100-tallet  (`:10909`) · EN: The 1100s
  - Option B DA: 1300-tallet  (`:10914`) · EN: The 1300s
  - Option C DA: 1500-tallet  (`:10919`) · EN: The 1500s
  - Correct (`:10923`): C
  - Correct text: C) 1500-tallet / The 1500s
  - image_note: null
- **Q:2024-11-q15** · `data/questions.json:13108` · exam 2024-11 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår blev Reformationen og dermed den protestantiske kristendom indført i Danmark?  (`:13112`)
  - Q EN: When was the Reformation, and with it Protestant Christianity, introduced in Denmark?  (`:13137`)
  - Option A DA: 900-tallet  (`:13116`) · EN: The 900s
  - Option B DA: 1200-tallet  (`:13121`) · EN: The 1200s
  - Option C DA: 1500-tallet  (`:13126`) · EN: The 1500s
  - Correct (`:13130`): C
  - Correct text: C) 1500-tallet / The 1500s
  - image_note: null

#### C:his-besat-aar · `data/clusters.json:1429` · asked 5× (2016-12, 2019-11, 2021-06, 2023-11, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Tyskland besatte Danmark den 9. april 1940.  (`clusters.json:1431`)
- Fact EN: Germany occupied Denmark on 9 April 1940.  (`clusters.json:1432`)
- Canonical question DA: Hvornår blev Danmark besat af tyske tropper?  (`:1450`)
- Canonical question EN: When was Denmark occupied by German troops?  (`:1451`)
- Canonical answer DA: April 1940 (9. april 1940)  (`:1452`)
- Canonical answer EN: April 1940 (9 April 1940)  (`:1453`)
- Variants:
  - Q DA: Hvornår blev Danmark under 2. Verdenskrig besat af tyske tropper?  (`:1456`)
    Q EN: When was Denmark occupied by German troops during the Second World War?
    A DA: April 1940
    A EN: April 1940
    Question ids: 2016-12-q23
  - Q DA: Hvornår blev Danmark under 2. Verdenskrig besat af tyske tropper?  (`:1456`)
    Q EN: When was Denmark occupied by German troops during the Second World War?
    A DA: I 1940
    A EN: In 1940
    Question ids: 2019-11-q23
  - Q DA: Hvornår blev Danmark besat af tyske tropper under 2. Verdenskrig?  (`:1474`)
    Q EN: When was Denmark occupied by German troops during the Second World War?
    A DA: April 1940
    A EN: April 1940
    Question ids: 2021-06-q14
  - Q DA: Hvilket år blev Danmark besat af tyske tropper?  (`:1483`)
    Q EN: In which year was Denmark occupied by German troops?
    A DA: 1940
    A EN: 1940
    Question ids: 2023-11-q18, 2025-11-q11
- Trap note DA: 1940 = besat. 1945 = befriet (5. maj).  (`:1493`)
- Trap note EN: 1940 = occupied. 1945 = liberated (5 May).
- Current note DA: (empty)  (`:1495`)
- Current note EN: (empty)

- **Q:2016-12-q23** · `data/questions.json:694` · exam 2016-12 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår blev Danmark under 2. Verdenskrig besat af tyske tropper?  (`:698`)
  - Q EN: When was Denmark occupied by German troops during the Second World War?  (`:723`)
  - Option A DA: April 1937.  (`:702`) · EN: April 1937
  - Option B DA: April 1940.  (`:707`) · EN: April 1940
  - Option C DA: April 1945.  (`:712`) · EN: April 1945
  - Correct (`:716`): B
  - Correct text: B) April 1940. / April 1940
  - image_note: null
- **Q:2019-11-q23** · `data/questions.json:5467` · exam 2019-11 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev Danmark under 2. Verdenskrig besat af tyske tropper?  (`:5471`)
  - Q EN: When was Denmark occupied by German troops during the Second World War?  (`:5496`)
  - Option A DA: I 1937  (`:5475`) · EN: In 1937
  - Option B DA: I 1940  (`:5480`) · EN: In 1940
  - Option C DA: I 1945  (`:5485`) · EN: In 1945
  - Correct (`:5489`): B
  - Correct text: B) I 1940 / In 1940
  - image_note: null
- **Q:2021-06-q14** · `data/questions.json:7540` · exam 2021-06 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev Danmark besat af tyske tropper under 2. Verdenskrig?  (`:7544`)
  - Q EN: When was Denmark occupied by German troops during the Second World War?  (`:7569`)
  - Option A DA: April 1937  (`:7548`) · EN: April 1937
  - Option B DA: April 1940  (`:7553`) · EN: April 1940
  - Option C DA: April 1945  (`:7558`) · EN: April 1945
  - Correct (`:7562`): B
  - Correct text: B) April 1940 / April 1940
  - image_note: null
- **Q:2023-11-q18** · `data/questions.json:11592` · exam 2023-11 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket år blev Danmark besat af tyske tropper?  (`:11596`)
  - Q EN: In which year was Denmark occupied by German troops?  (`:11621`)
  - Option A DA: 1935  (`:11600`) · EN: 1935
  - Option B DA: 1940  (`:11605`) · EN: 1940
  - Option C DA: 1945  (`:11610`) · EN: 1945
  - Correct (`:11614`): B
  - Correct text: B) 1940 / 1940
  - image_note: null
- **Q:2025-11-q11** · `data/questions.json:14561` · exam 2025-11 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket år blev Danmark besat af tyske tropper?  (`:14565`)
  - Q EN: In which year was Denmark occupied by German troops?  (`:14590`)
  - Option A DA: 1932  (`:14569`) · EN: 1932
  - Option B DA: 1940  (`:14574`) · EN: 1940
  - Option C DA: 1944  (`:14579`) · EN: 1944
  - Correct (`:14583`): B
  - Correct text: B) 1940 / 1940
  - image_note: null

#### C:his-1864 · `data/clusters.json:1903` · asked 5× (2017-11, 2020-06, 2021-11, 2022-06, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: I 1864 mistede Danmark Slesvig og Holsten efter krigen mod Preussen og Østrig.  (`clusters.json:1905`)
- Fact EN: In 1864 Denmark lost Slesvig and Holsten (Schleswig and Holstein) after the war against Prussia and Austria.  (`clusters.json:1906`)
- Canonical question DA: Hvilket område mistede Danmark i 1864?  (`:1924`)
- Canonical question EN: Which area did Denmark lose in 1864?  (`:1925`)
- Canonical answer DA: Slesvig (og Holsten)  (`:1926`)
- Canonical answer EN: Slesvig (and Holsten)  (`:1927`)
- Variants:
  - Q DA: Hvilke områder mistede Danmark i 1864?  (`:1930`)
    Q EN: Which areas did Denmark lose in 1864?
    A DA: Slesvig og Holsten
    A EN: Slesvig and Holsten (Schleswig and Holstein)
    Question ids: 2017-11-q23
  - Q DA: Hvilket område mistede Danmark blandt andet i 1864?  (`:1939`)
    Q EN: Which area, among others, did Denmark lose in 1864?
    A DA: Slesvig
    A EN: Slesvig (Schleswig)
    Question ids: 2020-06-q20, 2022-06-q25
  - Q DA: Hvilket område mistede Danmark i 1864?  (`:1949`)
    Q EN: Which area did Denmark lose in 1864?
    A DA: Slesvig
    A EN: Slesvig (Schleswig)
    Question ids: 2021-11-q22
  - Q DA: Hvilket af følgende områder mistede Danmark i 1864?  (`:1958`)
    Q EN: Which of the following areas did Denmark lose in 1864?
    A DA: Slesvig
    A EN: Slesvig (Schleswig)
    Question ids: 2023-11-q12
- Trap note DA: 1864 = Slesvig. 1658 = Skåne. 1814 = Norge. OBS: Den officielle rettenøgle fra november 2017 siger fejlagtigt 'Skåne, Halland og Blekinge' – det rigtige svar er Slesvig og Holsten.  (`:1967`)
- Trap note EN: 1864 = Slesvig. 1658 = Skåne. 1814 = Norway. NOTE: The official answer key from November 2017 wrongly says 'Skåne, Halland and Blekinge' – the right answer is Slesvig and Holsten.
- Current note DA: (empty)  (`:1969`)
- Current note EN: (empty)

- **Q:2017-11-q23** · `data/questions.json:2269` · exam 2017-11 nr. 23 · section '' · answer_source: image · uncertain: false · notes: 'OFFICIAL KEY ERROR: the retteark prints B (Skåne, Halland og Blekinge – lost in 1658). Historically correct answer is C (Slesvig og Holsten, lost 1864), consistent with 2020-06 Q20, 2021-11 Q22, 2022-06 Q25, 2023-11 Q12. Verified by orchestrator against rendered key.'
  - Q DA: Hvilke områder mistede Danmark i 1864?  (`:2273`)
  - Q EN: Which areas did Denmark lose in 1864?  (`:2301`)
  - Option A DA: Island og Norge  (`:2277`) · EN: Iceland and Norway
  - Option B DA: Skåne, Halland og Blekinge  (`:2282`) · EN: Skåne, Halland and Blekinge
  - Option C DA: Slesvig og Holsten  (`:2287`) · EN: Slesvig and Holsten (Schleswig and Holstein)
  - Correct (`:2291`): C
  - Correct text: C) Slesvig og Holsten / Slesvig and Holsten (Schleswig and Holstein)
  - image_note: null
- **Q:2020-06-q20** · `data/questions.json:6168` · exam 2020-06 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket område mistede Danmark blandt andet i 1864?  (`:6172`)
  - Q EN: Which area, among others, did Denmark lose in 1864?  (`:6197`)
  - Option A DA: Norge  (`:6176`) · EN: Norway
  - Option B DA: Skåne  (`:6181`) · EN: Skåne (Scania)
  - Option C DA: Slesvig  (`:6186`) · EN: Slesvig (Schleswig)
  - Correct (`:6190`): C
  - Correct text: C) Slesvig / Slesvig (Schleswig)
  - image_note: null
- **Q:2021-11-q22** · `data/questions.json:8569` · exam 2021-11 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket område mistede Danmark i 1864?  (`:8573`)
  - Q EN: Which area did Denmark lose in 1864?  (`:8598`)
  - Option A DA: Norge  (`:8577`) · EN: Norway
  - Option B DA: Skåne  (`:8582`) · EN: Skåne (Scania)
  - Option C DA: Slesvig  (`:8587`) · EN: Slesvig (Schleswig)
  - Correct (`:8591`): C
  - Correct text: C) Slesvig / Slesvig (Schleswig)
  - image_note: null
- **Q:2022-06-q25** · `data/questions.json:9453` · exam 2022-06 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket område mistede Danmark blandt andet i 1864?  (`:9457`)
  - Q EN: Which area, among others, did Denmark lose in 1864?  (`:9482`)
  - Option A DA: Norge  (`:9461`) · EN: Norway
  - Option B DA: Skåne  (`:9466`) · EN: Skåne (Scania)
  - Option C DA: Slesvig  (`:9471`) · EN: Slesvig (Schleswig)
  - Correct (`:9475`): C
  - Correct text: C) Slesvig / Slesvig (Schleswig)
  - image_note: null
- **Q:2023-11-q12** · `data/questions.json:11404` · exam 2023-11 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende områder mistede Danmark i 1864?  (`:11408`)
  - Q EN: Which of the following areas did Denmark lose in 1864?  (`:11433`)
  - Option A DA: Norge  (`:11412`) · EN: Norway
  - Option B DA: Skåne  (`:11417`) · EN: Skåne (Scania)
  - Option C DA: Slesvig  (`:11422`) · EN: Slesvig (Schleswig)
  - Correct (`:11426`): C
  - Correct text: C) Slesvig / Slesvig (Schleswig)
  - image_note: null

#### C:his-besat-krig · `data/clusters.json:3919` · asked 3× (2022-11, 2024-11, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Danmark var besat af Tyskland under 2. verdenskrig (1940-1945).  (`clusters.json:3921`)
- Fact EN: Denmark was occupied by Germany during the Second World War (1940–1945).  (`clusters.json:3922`)
- Canonical question DA: Under hvilken krig var Danmark besat af tyske tropper?  (`:3936`)
- Canonical question EN: During which war was Denmark occupied by German troops?  (`:3937`)
- Canonical answer DA: 2. verdenskrig  (`:3938`)
- Canonical answer EN: The Second World War  (`:3939`)
- Variants:
  - Q DA: Under hvilken krig var Danmark besat af tyske tropper?  (`:3942`)
    Q EN: During which war was Denmark occupied by German troops?
    A DA: 2. Verdenskrig
    A EN: The Second World War
    Question ids: 2022-11-q5, 2024-11-q6, 2026-06-q11
- Trap note DA: Danmark var neutralt og IKKE besat under 1. verdenskrig.  (`:3953`)
- Trap note EN: Denmark was neutral and NOT occupied during the First World War.
- Current note DA: (empty)  (`:3955`)
- Current note EN: (empty)

- **Q:2022-11-q5** · `data/questions.json:9608` · exam 2022-11 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Under hvilken krig var Danmark besat af tyske tropper?  (`:9612`)
  - Q EN: During which war was Denmark occupied by German troops?  (`:9632`)
  - Option A DA: 1. Verdenskrig  (`:9616`) · EN: The First World War
  - Option B DA: 2. Verdenskrig  (`:9621`) · EN: The Second World War
  - Correct (`:9625`): B
  - Correct text: B) 2. Verdenskrig / The Second World War
  - image_note: null
- **Q:2024-11-q6** · `data/questions.json:12816` · exam 2024-11 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Under hvilken krig var Danmark besat af tyske tropper?  (`:12820`)
  - Q EN: During which war was Denmark occupied by German troops?  (`:12840`)
  - Option A DA: 1. Verdenskrig  (`:12824`) · EN: The First World War
  - Option B DA: 2. Verdenskrig  (`:12829`) · EN: The Second World War
  - Correct (`:12833`): B
  - Correct text: B) 2. Verdenskrig / The Second World War
  - image_note: null
- **Q:2026-06-q11** · `data/questions.json:15351` · exam 2026-06 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Under hvilken krig var Danmark besat af tyske tropper?  (`:15355`)
  - Q EN: During which war was Denmark occupied by German troops?  (`:15375`)
  - Option A DA: 1. Verdenskrig  (`:15359`) · EN: The First World War
  - Option B DA: 2. Verdenskrig  (`:15364`) · EN: The Second World War
  - Correct (`:15368`): B
  - Correct text: B) 2. Verdenskrig / The Second World War
  - image_note: null

#### C:his-tyrkiet · `data/clusters.json:3959` · asked 3× (2024-05, 2025-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: I slutningen af 1960'erne kom der mange indvandrere (gæstearbejdere) fra Tyrkiet.  (`clusters.json:3961`)
- Fact EN: At the end of the 1960s many immigrants (guest workers) came from Turkey.  (`clusters.json:3962`)
- Canonical question DA: Fra hvilket land kom der særligt mange indvandrere i slutningen af 1960'erne?  (`:3976`)
- Canonical question EN: From which country did especially many immigrants come at the end of the 1960s?  (`:3977`)
- Canonical answer DA: Tyrkiet  (`:3978`)
- Canonical answer EN: Turkey  (`:3979`)
- Variants:
  - Q DA: Fra hvilket land kom der særligt mange indvandrere til Danmark i slutningen af 1960’erne?  (`:3982`)
    Q EN: From which country did especially many immigrants come to Denmark at the end of the 1960s?
    A DA: Tyrkiet
    A EN: Turkey
    Question ids: 2024-05-q6, 2025-05-q13, 2026-06-q5
- Trap note DA: Ikke Syrien (flygtninge kom især efter 2011) og ikke Rumænien.  (`:3993`)
- Trap note EN: Not Syria (refugees came mainly after 2011) and not Romania.
- Current note DA: (empty)  (`:3995`)
- Current note EN: (empty)

- **Q:2024-05-q6** · `data/questions.json:12011` · exam 2024-05 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Fra hvilket land kom der særligt mange indvandrere til Danmark i slutningen af 1960’erne?  (`:12015`)
  - Q EN: From which country did especially many immigrants come to Denmark at the end of the 1960s?  (`:12040`)
  - Option A DA: Rumænien  (`:12019`) · EN: Romania
  - Option B DA: Syrien  (`:12024`) · EN: Syria
  - Option C DA: Tyrkiet  (`:12029`) · EN: Turkey
  - Correct (`:12033`): C
  - Correct text: C) Tyrkiet / Turkey
  - image_note: null
- **Q:2025-05-q13** · `data/questions.json:13817` · exam 2025-05 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Fra hvilket land kom der særligt mange indvandrere til Danmark i slutningen af 1960’erne?  (`:13821`)
  - Q EN: From which country did especially many immigrants come to Denmark at the end of the 1960s?  (`:13846`)
  - Option A DA: Syrien  (`:13825`) · EN: Syria
  - Option B DA: Tyrkiet  (`:13830`) · EN: Turkey
  - Option C DA: Rumænien  (`:13835`) · EN: Romania
  - Correct (`:13839`): B
  - Correct text: B) Tyrkiet / Turkey
  - image_note: null
- **Q:2026-06-q5** · `data/questions.json:15158` · exam 2026-06 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Fra hvilket land kom der særligt mange indvandrere til Danmark i slutningen af 1960’erne?  (`:15162`)
  - Q EN: From which country did especially many immigrants come to Denmark at the end of the 1960s?  (`:15187`)
  - Option A DA: Rumænien  (`:15166`) · EN: Romania
  - Option B DA: Tyrkiet  (`:15171`) · EN: Turkey
  - Option C DA: Syrien  (`:15176`) · EN: Syria
  - Correct (`:15180`): B
  - Correct text: B) Tyrkiet / Turkey
  - image_note: null

#### C:his-besat-land · `data/clusters.json:4471` · asked 3× (2017-11, 2020-11, 2022-06) · frequent: no · last asked: 2022-06

- Fact DA: Det var Tyskland, der besatte Danmark den 9. april 1940.  (`clusters.json:4473`)
- Fact EN: It was Germany that occupied Denmark on 9 April 1940.  (`clusters.json:4474`)
- Canonical question DA: Hvilket land blev Danmark besat af den 9. april 1940?  (`:4488`)
- Canonical question EN: Which country occupied Denmark on 9 April 1940?  (`:4489`)
- Canonical answer DA: Tyskland  (`:4490`)
- Canonical answer EN: Germany  (`:4491`)
- Variants:
  - Q DA: Hvilket land blev Danmark besat af den 9. april 1940?  (`:4494`)
    Q EN: Which country occupied Denmark on 9 April 1940?
    A DA: Tyskland
    A EN: Germany
    Question ids: 2017-11-q10, 2020-11-q4, 2022-06-q9
- Trap note DA: (empty)  (`:4505`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4507`)
- Current note EN: (empty)

- **Q:2017-11-q10** · `data/questions.json:1855` · exam 2017-11 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket land blev Danmark besat af den 9. april 1940?  (`:1859`)
  - Q EN: Which country occupied Denmark on 9 April 1940?  (`:1884`)
  - Option A DA: England  (`:1863`) · EN: England
  - Option B DA: Tyskland  (`:1868`) · EN: Germany
  - Option C DA: Sverige  (`:1873`) · EN: Sweden
  - Correct (`:1877`): B
  - Correct text: B) Tyskland / Germany
  - image_note: null
- **Q:2020-11-q4** · `data/questions.json:6450` · exam 2020-11 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket land blev Danmark besat af den 9. april 1940?  (`:6454`)
  - Q EN: Which country occupied Denmark on 9 April 1940?  (`:6479`)
  - Option A DA: Frankrig  (`:6458`) · EN: France
  - Option B DA: Sverige  (`:6463`) · EN: Sweden
  - Option C DA: Tyskland  (`:6468`) · EN: Germany
  - Correct (`:6472`): C
  - Correct text: C) Tyskland / Germany
  - image_note: null
- **Q:2022-06-q9** · `data/questions.json:8950` · exam 2022-06 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket land blev Danmark besat af den 9. april 1940?  (`:8954`)
  - Q EN: Which country occupied Denmark on 9 April 1940?  (`:8979`)
  - Option A DA: Frankrig  (`:8958`) · EN: France
  - Option B DA: Sverige  (`:8963`) · EN: Sweden
  - Option C DA: Tyskland  (`:8968`) · EN: Germany
  - Correct (`:8972`): C
  - Correct text: C) Tyskland / Germany
  - image_note: null

#### C:his-foerste-kvindelige-sm-aar · `data/clusters.json:4711` · asked 3× (2016-12, 2019-11, 2020-11) · frequent: no · last asked: 2020-11

- Fact DA: Danmark fik sin første kvindelige statsminister i 2011.  (`clusters.json:4713`)
- Fact EN: Denmark got its first female prime minister in 2011.  (`clusters.json:4714`)
- Canonical question DA: Hvornår fik Danmark for første gang en kvindelig statsminister?  (`:4728`)
- Canonical question EN: When did Denmark first get a female prime minister?  (`:4729`)
- Canonical answer DA: 2011  (`:4730`)
- Canonical answer EN: 2011  (`:4731`)
- Variants:
  - Q DA: Hvornår fik Danmark for første gang en kvindelig statsminister?  (`:4734`)
    Q EN: When did Denmark get a female prime minister for the first time?
    A DA: 2011
    A EN: 2011
    Question ids: 2016-12-q24, 2019-11-q24, 2020-11-q18
- Trap note DA: (empty)  (`:4745`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4747`)
- Current note EN: (empty)

- **Q:2016-12-q24** · `data/questions.json:727` · exam 2016-12 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår fik Danmark for første gang en kvindelig statsminister?  (`:731`)
  - Q EN: When did Denmark get a female prime minister for the first time?  (`:756`)
  - Option A DA: 1991.  (`:735`) · EN: 1991
  - Option B DA: 2001.  (`:740`) · EN: 2001
  - Option C DA: 2011.  (`:745`) · EN: 2011
  - Correct (`:749`): C
  - Correct text: C) 2011. / 2011
  - image_note: null
- **Q:2019-11-q24** · `data/questions.json:5500` · exam 2019-11 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår fik Danmark for første gang en kvindelig statsminister?  (`:5504`)
  - Q EN: When did Denmark get a female prime minister for the first time?  (`:5529`)
  - Option A DA: 1991  (`:5508`) · EN: 1991
  - Option B DA: 2001  (`:5513`) · EN: 2001
  - Option C DA: 2011  (`:5518`) · EN: 2011
  - Correct (`:5522`): C
  - Correct text: C) 2011 / 2011
  - image_note: null
- **Q:2020-11-q18** · `data/questions.json:6887` · exam 2020-11 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår fik Danmark for første gang en kvindelig statsminister?  (`:6891`)
  - Q EN: When did Denmark get a female prime minister for the first time?  (`:6916`)
  - Option A DA: 1924  (`:6895`) · EN: 1924
  - Option B DA: 1968  (`:6900`) · EN: 1968
  - Option C DA: 2011  (`:6905`) · EN: 2011
  - Correct (`:6909`): C
  - Correct text: C) 2011 / 2011
  - image_note: null

#### C:his-jernbaner · `data/clusters.json:4956` · asked 2× (2023-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: De første jernbaner i Danmark åbnede i 1840'erne (1800-tallet). Den første gik fra København til Roskilde i 1847.  (`clusters.json:4958`)
- Fact EN: The first railways in Denmark opened in the 1840s (the 1800s). The first ran from Copenhagen to Roskilde in 1847.  (`clusters.json:4959`)
- Canonical question DA: Hvornår blev de første jernbaner i Danmark bygget?  (`:4971`)
- Canonical question EN: When were the first railways in Denmark built?  (`:4972`)
- Canonical answer DA: I 1800-tallet (1840'erne)  (`:4973`)
- Canonical answer EN: In the 1800s (the 1840s)  (`:4974`)
- Variants:
  - Q DA: Hvornår blev de første jernbaner i Danmark bygget?  (`:4977`)
    Q EN: When were the first railways in Denmark built?
    A DA: I 1800-tallet
    A EN: In the 1800s
    Question ids: 2023-05-q9
  - Q DA: Hvad åbnede i Danmark i 1840'erne?  (`:4986`)
    Q EN: What opened in Denmark in the 1840s?
    A DA: De første jernbaner
    A EN: The first railways
    Question ids: 2026-06-q12
- Trap note DA: (empty)  (`:4995`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4997`)
- Current note EN: (empty)

- **Q:2023-05-q9** · `data/questions.json:10525` · exam 2023-05 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev de første jernbaner i Danmark bygget?  (`:10529`)
  - Q EN: When were the first railways in Denmark built?  (`:10554`)
  - Option A DA: I 1700-tallet  (`:10533`) · EN: In the 1700s
  - Option B DA: I 1800-tallet  (`:10538`) · EN: In the 1800s
  - Option C DA: I 1900-tallet  (`:10543`) · EN: In the 1900s
  - Correct (`:10547`): B
  - Correct text: B) I 1800-tallet / In the 1800s
  - image_note: null
- **Q:2026-06-q12** · `data/questions.json:15379` · exam 2026-06 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad åbnede i Danmark i 1840'erne?  (`:15383`)
  - Q EN: What opened in Denmark in the 1840s?  (`:15408`)
  - Option A DA: De første motorveje  (`:15387`) · EN: The first motorways
  - Option B DA: De første jernbaner  (`:15392`) · EN: The first railways
  - Option C DA: De første lufthavne  (`:15397`) · EN: The first airports
  - Correct (`:15401`): B
  - Correct text: B) De første jernbaner / The first railways
  - image_note: null

#### C:his-venstre-1870 · `data/clusters.json:5001` · asked 2× (2025-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Venstre blev dannet omkring 1870. Det er et af de ældste partier.  (`clusters.json:5003`)
- Fact EN: Venstre was founded around 1870. It is one of the oldest parties.  (`clusters.json:5004`)
- Canonical question DA: Hvilket politisk parti blev dannet omkring 1870?  (`:5016`)
- Canonical question EN: Which political party was founded around 1870?  (`:5017`)
- Canonical answer DA: Venstre  (`:5018`)
- Canonical answer EN: Venstre (the Liberal Party)  (`:5019`)
- Variants:
  - Q DA: Hvilket politisk parti blev dannet omkring 1870?  (`:5022`)
    Q EN: Which political party was founded around 1870?
    A DA: Venstre
    A EN: Venstre (the Liberal Party)
    Question ids: 2025-05-q22, 2026-06-q13
- Trap note DA: Dansk Folkeparti (1995) og SF (1959) er meget yngre.  (`:5032`)
- Trap note EN: The Danish People's Party (1995) and SF (1959) are much younger.
- Current note DA: (empty)  (`:5034`)
- Current note EN: (empty)

- **Q:2025-05-q22** · `data/questions.json:14104` · exam 2025-05 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket politisk parti blev dannet omkring 1870?  (`:14108`)
  - Q EN: Which political party was founded around 1870?  (`:14133`)
  - Option A DA: Dansk Folkeparti  (`:14112`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option B DA: Socialistisk Folkeparti  (`:14117`) · EN: The Socialist People's Party (SF)
  - Option C DA: Venstre  (`:14122`) · EN: Venstre (the Liberal Party)
  - Correct (`:14126`): C
  - Correct text: C) Venstre / Venstre (the Liberal Party)
  - image_note: null
- **Q:2026-06-q13** · `data/questions.json:15412` · exam 2026-06 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket politisk parti blev dannet omkring 1870?  (`:15416`)
  - Q EN: Which political party was founded around 1870?  (`:15441`)
  - Option A DA: Dansk Folkeparti  (`:15420`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option B DA: Socialistisk Folkeparti  (`:15425`) · EN: The Socialist People's Party (SF)
  - Option C DA: Venstre  (`:15430`) · EN: Venstre (the Liberal Party)
  - Correct (`:15434`): C
  - Correct text: C) Venstre / Venstre (the Liberal Party)
  - image_note: null

#### C:his-1814-norge · `data/clusters.json:5239` · asked 2× (2024-05, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Norge var i union med Danmark i over 400 år frem til 1814.  (`clusters.json:5241`)
- Fact EN: Norway was in a union with Denmark for over 400 years until 1814.  (`clusters.json:5242`)
- Canonical question DA: Hvilket land var i union med Danmark over 400 år frem til 1814?  (`:5254`)
- Canonical question EN: Which country was in a union with Denmark for over 400 years until 1814?  (`:5255`)
- Canonical answer DA: Norge  (`:5256`)
- Canonical answer EN: Norway  (`:5257`)
- Variants:
  - Q DA: Hvilket af følgende lande var i union med Danmark over 400 år frem til 1814?  (`:5260`)
    Q EN: Which of the following countries was in a union with Denmark for over 400 years until 1814?
    A DA: Norge
    A EN: Norway
    Question ids: 2024-05-q8, 2025-11-q10
- Trap note DA: Ikke Sverige og ikke Finland.  (`:5270`)
- Trap note EN: Not Sweden and not Finland.
- Current note DA: (empty)  (`:5272`)
- Current note EN: (empty)

- **Q:2024-05-q8** · `data/questions.json:12077` · exam 2024-05 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende lande var i union med Danmark over 400 år frem til 1814?  (`:12081`)
  - Q EN: Which of the following countries was in a union with Denmark for over 400 years until 1814?  (`:12106`)
  - Option A DA: Sverige  (`:12085`) · EN: Sweden
  - Option B DA: Finland  (`:12090`) · EN: Finland
  - Option C DA: Norge  (`:12095`) · EN: Norway
  - Correct (`:12099`): C
  - Correct text: C) Norge / Norway
  - image_note: null
- **Q:2025-11-q10** · `data/questions.json:14528` · exam 2025-11 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende lande var i union med Danmark over 400 år frem til 1814?  (`:14532`)
  - Q EN: Which of the following countries was in a union with Denmark for over 400 years until 1814?  (`:14557`)
  - Option A DA: Sverige  (`:14536`) · EN: Sweden
  - Option B DA: Norge  (`:14541`) · EN: Norway
  - Option C DA: Finland  (`:14546`) · EN: Finland
  - Correct (`:14550`): B
  - Correct text: B) Norge / Norway
  - image_note: null

#### C:his-befrielse · `data/clusters.json:5620` · asked 2× (2017-06, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Danmark blev befriet den 5. maj 1945. Den 5. maj markeres befrielsen hvert år.  (`clusters.json:5622`)
- Fact EN: Denmark was liberated on 5 May 1945. The liberation is marked every year on 5 May.  (`clusters.json:5623`)
- Canonical question DA: Hvad markeres hvert år den 5. maj?  (`:5635`)
- Canonical question EN: What is marked every year on 5 May?  (`:5636`)
- Canonical answer DA: Befrielsen efter 2. verdenskrig (1945)  (`:5637`)
- Canonical answer EN: The liberation after the Second World War (1945)  (`:5638`)
- Variants:
  - Q DA: Hvad markeres hvert år den 5. maj?  (`:5641`)
    Q EN: What is marked every year on 5 May?
    A DA: Befrielsen af Danmark efter Anden Verdenskrig
    A EN: The liberation of Denmark after the Second World War
    Question ids: 2017-06-q7
  - Q DA: Hvilket år blev Danmark befriet fra den tyske besættelse?  (`:5650`)
    Q EN: In which year was Denmark liberated from the German occupation?
    A DA: 1945
    A EN: 1945
    Question ids: 2025-05-q7
- Trap note DA: 5. maj = befrielsen. 5. juni = grundlovsdag. Genforeningen med Sønderjylland var i 1920.  (`:5659`)
- Trap note EN: 5 May = the liberation. 5 June = Constitution Day. The reunification with Southern Jutland was in 1920.
- Current note DA: (empty)  (`:5661`)
- Current note EN: (empty)

- **Q:2017-06-q7** · `data/questions.json:981` · exam 2017-06 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad markeres hvert år den 5. maj?  (`:985`)
  - Q EN: What is marked every year on 5 May?  (`:1010`)
  - Option A DA: Genforeningen af Sønderjylland med Danmark.  (`:989`) · EN: The reunification of Southern Jutland with Denmark
  - Option B DA: Indførelsen af Danmarks Riges Grundlov.  (`:994`) · EN: The introduction of the Constitution of the Kingdom of Denmark
  - Option C DA: Befrielsen af Danmark efter Anden Verdenskrig.  (`:999`) · EN: The liberation of Denmark after the Second World War
  - Correct (`:1003`): C
  - Correct text: C) Befrielsen af Danmark efter Anden Verdenskrig. / The liberation of Denmark after the Second World War
  - image_note: null
- **Q:2025-05-q7** · `data/questions.json:13634` · exam 2025-05 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket år blev Danmark befriet fra den tyske besættelse?  (`:13638`)
  - Q EN: In which year was Denmark liberated from the German occupation?  (`:13663`)
  - Option A DA: 1940  (`:13642`) · EN: 1940
  - Option B DA: 1943  (`:13647`) · EN: 1943
  - Option C DA: 1945  (`:13652`) · EN: 1945
  - Correct (`:13656`): C
  - Correct text: C) 1945 / 1945
  - image_note: null

#### C:his-terror-2015 · `data/clusters.json:5792` · asked 2× (2021-11, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: I 2015 var der et terrorangreb ved Københavns Synagoge (og ved kulturhuset Krudttønden).  (`clusters.json:5794`)
- Fact EN: In 2015 there was a terrorist attack at Copenhagen Synagogue (and at the Krudttønden cultural centre).  (`clusters.json:5795`)
- Canonical question DA: Hvor skete der et terrorangreb i 2015?  (`:5807`)
- Canonical question EN: Where did a terrorist attack happen in 2015?  (`:5808`)
- Canonical answer DA: Københavns Synagoge  (`:5809`)
- Canonical answer EN: Copenhagen Synagogue  (`:5810`)
- Variants:
  - Q DA: Ved hvilken bygning blev der begået et terrorangreb i 2015?  (`:5813`)
    Q EN: At which building was a terrorist attack carried out in 2015?
    A DA: Københavns Synagoge
    A EN: Copenhagen Synagogue
    Question ids: 2021-11-q19
  - Q DA: Hvor skete der et terrorangreb i 2015?  (`:5822`)
    Q EN: Where did a terrorist attack happen in 2015?
    A DA: Københavns Synagoge
    A EN: Copenhagen Synagogue
    Question ids: 2024-05-q18
- Trap note DA: (empty)  (`:5831`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5833`)
- Current note EN: (empty)

- **Q:2021-11-q19** · `data/questions.json:8470` · exam 2021-11 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Ved hvilken bygning blev der begået et terrorangreb i 2015?  (`:8474`)
  - Q EN: At which building was a terrorist attack carried out in 2015?  (`:8499`)
  - Option A DA: Københavns Hovedbanegård  (`:8478`) · EN: Copenhagen Central Station
  - Option B DA: Københavns Synagoge  (`:8483`) · EN: Copenhagen Synagogue
  - Option C DA: Københavns Lufthavn  (`:8488`) · EN: Copenhagen Airport
  - Correct (`:8492`): B
  - Correct text: B) Københavns Synagoge / Copenhagen Synagogue
  - image_note: null
- **Q:2024-05-q18** · `data/questions.json:12402` · exam 2024-05 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor skete der et terrorangreb i 2015?  (`:12406`)
  - Q EN: Where did a terrorist attack happen in 2015?  (`:12431`)
  - Option A DA: Christiansborg  (`:12410`) · EN: Christiansborg (the parliament building)
  - Option B DA: Københavns Lufthavn  (`:12415`) · EN: Copenhagen Airport
  - Option C DA: Københavns Synagoge  (`:12420`) · EN: Copenhagen Synagogue
  - Correct (`:12424`): C
  - Correct text: C) Københavns Synagoge / Copenhagen Synagogue
  - image_note: null

#### C:his-aeldste-parti · `data/clusters.json:6761` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Det Konservative Folkeparti er ældre end Dansk Folkeparti.  (`clusters.json:6763`)
- Fact EN: The Conservative People's Party is older than the Danish People's Party.  (`clusters.json:6764`)
- Canonical question DA: Hvilket parti er ældst – Dansk Folkeparti eller Det Konservative Folkeparti?  (`:6774`)
- Canonical question EN: Which party is the oldest – the Danish People's Party or the Conservative People's Party?  (`:6775`)
- Canonical answer DA: Det Konservative Folkeparti  (`:6776`)
- Canonical answer EN: The Conservative People's Party  (`:6777`)
- Variants:
  - Q DA: Hvilket parti er ældst?  (`:6780`)
    Q EN: Which party is the oldest?
    A DA: Det Konservative Folkeparti
    A EN: The Conservative People's Party
    Question ids: 2025-11-q19
- Trap note DA: Dansk Folkeparti blev dannet i 1995 – det er et ungt parti.  (`:6789`)
- Trap note EN: The Danish People's Party was founded in 1995 – it is a young party.
- Current note DA: (empty)  (`:6791`)
- Current note EN: (empty)

- **Q:2025-11-q19** · `data/questions.json:14810` · exam 2025-11 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket parti er ældst?  (`:14814`)
  - Q EN: Which party is the oldest?  (`:14834`)
  - Option A DA: Dansk Folkeparti  (`:14818`) · EN: The Danish People's Party (Dansk Folkeparti)
  - Option B DA: Det Konservative Folkeparti  (`:14823`) · EN: The Conservative People's Party
  - Correct (`:14827`): B
  - Correct text: B) Det Konservative Folkeparti / The Conservative People's Party
  - image_note: null

#### C:his-1658 · `data/clusters.json:7067` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: I 1658 mistede Danmark Skåne (og Halland og Blekinge) til Sverige.  (`clusters.json:7069`)
- Fact EN: In 1658 Denmark lost Skåne (and Halland and Blekinge) to Sweden.  (`clusters.json:7070`)
- Canonical question DA: Hvilket landområde mistede Danmark i 1658?  (`:7080`)
- Canonical question EN: Which territory did Denmark lose in 1658?  (`:7081`)
- Canonical answer DA: Skåne  (`:7082`)
- Canonical answer EN: Skåne (Scania)  (`:7083`)
- Variants:
  - Q DA: Hvilket landområde mistede Danmark i 1658?  (`:7086`)
    Q EN: Which territory did Denmark lose in 1658?
    A DA: Skåne
    A EN: Skåne (Scania)
    Question ids: 2024-11-q14
- Trap note DA: 1658 = Skåne. 1864 = Slesvig.  (`:7095`)
- Trap note EN: 1658 = Skåne. 1864 = Slesvig.
- Current note DA: (empty)  (`:7097`)
- Current note EN: (empty)

- **Q:2024-11-q14** · `data/questions.json:13075` · exam 2024-11 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket landområde mistede Danmark i 1658?  (`:13079`)
  - Q EN: Which territory did Denmark lose in 1658?  (`:13104`)
  - Option A DA: Shetlands-øerne  (`:13083`) · EN: The Shetland Islands
  - Option B DA: Slesvig  (`:13088`) · EN: Slesvig (Schleswig)
  - Option C DA: Skåne  (`:13093`) · EN: Skåne (Scania)
  - Correct (`:13097`): C
  - Correct text: C) Skåne / Skåne (Scania)
  - image_note: null

#### C:his-marshall · `data/clusters.json:7101` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Med Marshall-planen fik Danmark økonomisk hjælp fra USA omkring 1950.  (`clusters.json:7103`)
- Fact EN: Through the Marshall Plan Denmark got economic aid from the USA around 1950.  (`clusters.json:7104`)
- Canonical question DA: Hvem fik Danmark økonomisk hjælp af med Marshall-planen?  (`:7114`)
- Canonical question EN: From whom did Denmark get economic aid through the Marshall Plan?  (`:7115`)
- Canonical answer DA: USA  (`:7116`)
- Canonical answer EN: The USA  (`:7117`)
- Variants:
  - Q DA: Hvem fik Danmark økonomisk hjælp af i tiden omkring 1950 med Marshall-planen?  (`:7120`)
    Q EN: From whom did Denmark get economic aid around 1950 through the Marshall Plan?
    A DA: USA
    A EN: The USA
    Question ids: 2024-11-q7
- Trap note DA: (empty)  (`:7129`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7131`)
- Current note EN: (empty)

- **Q:2024-11-q7** · `data/questions.json:12844` · exam 2024-11 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem fik Danmark økonomisk hjælp af i tiden omkring 1950 med Marshall-planen?  (`:12848`)
  - Q EN: From whom did Denmark get economic aid around 1950 through the Marshall Plan?  (`:12873`)
  - Option A DA: Storbritannien  (`:12852`) · EN: Great Britain
  - Option B DA: Canada  (`:12857`) · EN: Canada
  - Option C DA: USA  (`:12862`) · EN: The USA
  - Correct (`:12866`): C
  - Correct text: C) USA / The USA
  - image_note: null

#### C:his-roedstroemper · `data/clusters.json:7135` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Rødstrømpebevægelsen var en del af kvindebevægelsen i 1970'erne.  (`clusters.json:7137`)
- Fact EN: The Redstocking movement was part of the women's movement in the 1970s.  (`clusters.json:7138`)
- Canonical question DA: Hvad var rødstrømpe-bevægelsen en del af?  (`:7148`)
- Canonical question EN: What was the Redstocking movement part of?  (`:7149`)
- Canonical answer DA: Kvindebevægelsen i 1970'erne  (`:7150`)
- Canonical answer EN: The women's movement in the 1970s  (`:7151`)
- Variants:
  - Q DA: Hvad var rødstrømpe-bevægelsen en del af?  (`:7154`)
    Q EN: What was the Redstocking movement (rødstrømpebevægelsen) part of?
    A DA: Kvindebevægelsen i 1970'erne
    A EN: The women's movement in the 1970s
    Question ids: 2024-11-q5
- Trap note DA: (empty)  (`:7163`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7165`)
- Current note EN: (empty)

- **Q:2024-11-q5** · `data/questions.json:12783` · exam 2024-11 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad var rødstrømpe-bevægelsen en del af?  (`:12787`)
  - Q EN: What was the Redstocking movement (rødstrømpebevægelsen) part of?  (`:12812`)
  - Option A DA: Arbejderbevægelsen i 1930'erne  (`:12791`) · EN: The labour movement in the 1930s
  - Option B DA: Kvindebevægelsen i 1970'erne  (`:12796`) · EN: The women's movement in the 1970s
  - Option C DA: Miljøbevægelsen i 1990'erne  (`:12801`) · EN: The environmental movement in the 1990s
  - Correct (`:12805`): B
  - Correct text: B) Kvindebevægelsen i 1970'erne / The women's movement in the 1970s
  - image_note: null

#### C:his-1960erne · `data/clusters.json:7237` · asked 1× (2024-05) · frequent: no · last asked: 2024-05

- Fact DA: 1960'erne var en tid med høj økonomisk vækst i Danmark.  (`clusters.json:7239`)
- Fact EN: The 1960s were a time of high economic growth in Denmark.  (`clusters.json:7240`)
- Canonical question DA: Hvad kendetegnede blandt andet 1960'erne?  (`:7250`)
- Canonical question EN: What characterised the 1960s, among other things?  (`:7251`)
- Canonical answer DA: Danmark havde høj økonomisk vækst  (`:7252`)
- Canonical answer EN: Denmark had high economic growth  (`:7253`)
- Variants:
  - Q DA: Hvad kendetegnede blandt andet 1960’erne?  (`:7256`)
    Q EN: What, among other things, characterised the 1960s?
    A DA: Danmark havde høj økonomisk vækst
    A EN: Denmark had high economic growth
    Question ids: 2024-05-q7
- Trap note DA: (empty)  (`:7265`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7267`)
- Current note EN: (empty)

- **Q:2024-05-q7** · `data/questions.json:12044` · exam 2024-05 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad kendetegnede blandt andet 1960’erne?  (`:12048`)
  - Q EN: What, among other things, characterised the 1960s?  (`:12073`)
  - Option A DA: Danmark blev besat af tyske tropper  (`:12052`) · EN: Denmark was occupied by German troops
  - Option B DA: Danmark havde høj økonomisk vækst  (`:12057`) · EN: Denmark had high economic growth
  - Option C DA: Danmark havde kolonier i Afrika og Caribien  (`:12062`) · EN: Denmark had colonies in Africa and the Caribbean
  - Correct (`:12066`): B
  - Correct text: B) Danmark havde høj økonomisk vækst / Denmark had high economic growth
  - image_note: null

#### C:his-s-regering-1929-82 · `data/clusters.json:7271` · asked 1× (2024-05) · frequent: no · last asked: 2024-05

- Fact DA: Socialdemokratiet sad i regering flest år mellem 1929 og 1982.  (`clusters.json:7273`)
- Fact EN: The Social Democrats were in government for the most years between 1929 and 1982.  (`clusters.json:7274`)
- Canonical question DA: Hvilket parti sad i regering flest år mellem 1929 og 1982?  (`:7284`)
- Canonical question EN: Which party was in government the most years between 1929 and 1982?  (`:7285`)
- Canonical answer DA: Socialdemokratiet  (`:7286`)
- Canonical answer EN: The Social Democrats  (`:7287`)
- Variants:
  - Q DA: Hvilket parti sad i regering flest år mellem 1929 og 1982?  (`:7290`)
    Q EN: Which party was in government for the most years between 1929 and 1982?
    A DA: Socialdemokratiet
    A EN: The Social Democrats (Socialdemokratiet)
    Question ids: 2024-05-q9
- Trap note DA: (empty)  (`:7299`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7301`)
- Current note EN: (empty)

- **Q:2024-05-q9** · `data/questions.json:12110` · exam 2024-05 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket parti sad i regering flest år mellem 1929 og 1982?  (`:12114`)
  - Q EN: Which party was in government for the most years between 1929 and 1982?  (`:12139`)
  - Option A DA: Socialdemokratiet  (`:12118`) · EN: The Social Democrats (Socialdemokratiet)
  - Option B DA: Venstre  (`:12123`) · EN: Venstre (the Liberal Party)
  - Option C DA: Det Konservative Folkeparti  (`:12128`) · EN: The Conservative People's Party
  - Correct (`:12132`): A
  - Correct text: A) Socialdemokratiet / The Social Democrats (Socialdemokratiet)
  - image_note: null

#### C:his-landboreformer · `data/clusters.json:7917` · asked 1× (2017-06) · frequent: no · last asked: 2017-06

- Fact DA: Landboreformerne i 1700-tallet gav bønderne frihed til selv at vælge, hvor de ville bo og arbejde (stavnsbåndet blev ophævet i 1788).  (`clusters.json:7919`)
- Fact EN: The agricultural reforms of the 1700s gave farmers the freedom to choose where to live and work (stavnsbåndet, the bond to the estate, was abolished in 1788).  (`clusters.json:7920`)
- Canonical question DA: Hvilke reformer i 1700-tallet gav bønderne frihed til at vælge, hvor de ville bo og arbejde?  (`:7930`)
- Canonical question EN: Which reforms in the 1700s gave farmers the freedom to choose where to live and work?  (`:7931`)
- Canonical answer DA: Landboreformerne  (`:7932`)
- Canonical answer EN: The agricultural reforms (landboreformerne)  (`:7933`)
- Variants:
  - Q DA: I 1700-tallet blev der gennemført nogle reformer. De betød blandt andet, at bønderne selv kunne bestemme, hvor de ville arbejde og bo. Hvilke reformer er der tale om?  (`:7936`)
    Q EN: In the 1700s some reforms were carried out. Among other things they meant that farmers could decide for themselves where to work and live. Which reforms are these?
    A DA: Landboreformer
    A EN: The agricultural reforms (landboreformerne)
    Question ids: 2017-06-q6
- Trap note DA: (empty)  (`:7945`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7947`)
- Current note EN: (empty)

- **Q:2017-06-q6** · `data/questions.json:948` · exam 2017-06 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: I 1700-tallet blev der gennemført nogle reformer. De betød blandt andet, at bønderne selv kunne bestemme, hvor de ville arbejde og bo. Hvilke reformer er der tale om?  (`:952`)
  - Q EN: In the 1700s some reforms were carried out. Among other things they meant that farmers could decide for themselves where to work and live. Which reforms are these?  (`:977`)
  - Option A DA: Landboreformer.  (`:956`) · EN: The agricultural reforms (landboreformerne)
  - Option B DA: Velfærdsreformer.  (`:961`) · EN: Welfare reforms
  - Option C DA: Kommunalreformer.  (`:966`) · EN: Local-government reforms
  - Correct (`:970`): A
  - Correct text: A) Landboreformer. / The agricultural reforms (landboreformerne)
  - image_note: null


## 4. Geografi og befolkning / Geography and population  (`topic:geografi`, `data/topics.json:193`)

### Intro paragraphs (`I:geografi:n`)

- **I:geografi:1** · `data/topics.json:200` (EN `:201`)
  - DA: Danmark består af Jylland og mange øer. De største øer er Sjælland og Fyn. Mellem Jylland og Fyn ligger Lillebælt. Mellem Fyn og Sjælland ligger Storebælt. Mellem Sjælland (København) og Sverige ligger Øresund. Broerne har samme navne: Lillebæltsbroen, Storebæltsbroen og Øresundsbroen.
  - EN: Denmark consists of Jutland and many islands. The largest islands are Zealand and Funen. Between Jutland and Funen lies Lillebælt (the Little Belt). Between Funen and Zealand lies Storebælt (the Great Belt). Between Zealand (Copenhagen) and Sweden lies Øresund (the Sound). The bridges have the same names: the Little Belt Bridge, the Great Belt Bridge and the Øresund Bridge.
- **I:geografi:2** · `data/topics.json:204` (EN `:205`)
  - DA: Danmark er fladt. Det højeste naturlige punkt, Møllehøj, er ca. 170 meter. Danmark er ca. 43.000 km², og ca. 60 % af arealet er landbrug. Det nordligste punkt er Grenen ved Skagen. Det sydligste punkt er Gedser Odde på Falster.
  - EN: Denmark is flat. The highest natural point, Møllehøj, is about 170 metres. Denmark is about 43,000 km², and about 60% of the area is farmland. The northernmost point is Grenen near Skagen. The southernmost point is Gedser Odde on Falster.
- **I:geografi:3** · `data/topics.json:208` (EN `:209`)
  - DA: Danmark har ca. 6 millioner indbyggere. De største byer er København, Aarhus (Østjylland), Odense (Fyn), Aalborg (Nordjylland) og Esbjerg (Vestjylland). Region Hovedstaden er den største region.
  - EN: Denmark has about 6 million inhabitants. The largest cities are Copenhagen, Aarhus (East Jutland), Odense (Funen), Aalborg (North Jutland) and Esbjerg (West Jutland). The Capital Region is the largest region.

### Current facts – "Ændret siden prøven" (`F:geografi:n`)

- **F:geografi:1** · `data/topics.json:214` (EN `:215`)
  - DA: Region Hovedstaden: prøven i 2018 sagde ca. 1,7 millioner – i dag ca. 1,9 millioner. Indvandrere og efterkommere: prøven i 2018 sagde 12-13 % – i dag ca. 16 %.
  - EN: Capital Region: the 2018 exam said about 1.7 million – today about 1.9 million. Immigrants and descendants: the 2018 exam said 12–13% – today about 16%.

### Overview tables / fact groups (`G:…`)

#### G:fg-farvande · `data/fact_groups.json:3`

- Title DA: Farvandene mellem landsdelene
- Title EN: The waters between the parts of Denmark
- Columns DA: Farvand | Mellem | Bro
- Columns EN: Water | Between | Bridge
- Rows (DA / EN, one per row):
  - DA: Lillebælt | Jylland – Fyn | Lillebæltsbroen
    EN: Lillebælt (Little Belt) | Jutland – Funen | Little Belt Bridge
  - DA: Storebælt | Fyn – Sjælland | Storebæltsbroen (1998)
    EN: Storebælt (Great Belt) | Funen – Zealand | Great Belt Bridge (1998)
  - DA: Øresund | Sjælland (København) – Sverige | Øresundsbroen (2000)
    EN: Øresund (the Sound) | Zealand (Copenhagen) – Sweden | Øresund Bridge (2000)
  - DA: Kattegat | Jylland – Sverige (nord for Sjælland) | –
    EN: Kattegat | Jutland – Sweden (north of Zealand) | –
- Mnemonic DA: Fra vest mod øst: LILLE før STORE før ØRE. Jylland → (Lille) → Fyn → (Store) → Sjælland → (Øre) → Sverige. Kattegat er kun en distraktor.
- Mnemonic EN: West to east: LITTLE before GREAT before the SOUND. Jutland → (Little) → Funen → (Great) → Zealand → (Sound) → Sweden. Kattegat is only a distractor.
- Cluster links: geo-lillebaelt, geo-storebaelt, geo-oresund, geo-lillebaeltsbro

- G:fg-tal – full entry above under topic demokrati (also used here)
#### G:fg-byer · `data/fact_groups.json:910`

- Title DA: De største byer og verdenshjørnerne
- Title EN: The largest cities and the extreme points
- Columns DA: Nr. | By / punkt | Hvor
- Columns EN: No. | City / point | Where
- Rows (DA / EN, one per row):
  - DA: 1 | København | Sjælland (hovedstaden)
    EN: 1 | Copenhagen | Zealand (the capital)
  - DA: 2 | Aarhus | Østjylland
    EN: 2 | Aarhus | East Jutland
  - DA: 3 | Odense | Fyn
    EN: 3 | Odense | Funen
  - DA: 4 | Aalborg | Nordjylland
    EN: 4 | Aalborg | North Jutland
  - DA: 5 | Esbjerg | Vestjylland
    EN: 5 | Esbjerg | West Jutland
  - DA: Nord | Grenen | Ved Skagen
    EN: North | Grenen | Near Skagen
  - DA: Syd | Gedser Odde | Falster
    EN: South | Gedser Odde | Falster
- Mnemonic DA: K-A-O-A-E: 'Kongen Arver Og Alle Elsker' = København, Aarhus, Odense, Aalborg, Esbjerg. Nord = Skagen, syd = Gedser.
- Mnemonic EN: K-A-O-A-E: 'Kongen Arver Og Alle Elsker' (the King inherits and everyone loves him) = Copenhagen (København), Aarhus, Odense, Aalborg, Esbjerg. North = Skagen, south = Gedser.
- Cluster links: geo-aarhus, geo-odense, geo-aalborg, geo-esbjerg, geo-grenen, geo-sydligste

### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:geo-hoejeste-punkt · `data/clusters.json:756` · asked 6× (2017-11, 2019-06, 2020-06, 2022-11, 2024-05, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Danmarks højeste naturlige punkt (Møllehøj) er ca. 170 meter højt.  (`clusters.json:758`)
- Fact EN: Denmark's highest natural point (Møllehøj) is about 170 metres high.  (`clusters.json:759`)
- Canonical question DA: Hvor højt er Danmarks højeste naturlige punkt?  (`:779`)
- Canonical question EN: How high is Denmark's highest natural point?  (`:780`)
- Canonical answer DA: Ca. 170 meter  (`:781`)
- Canonical answer EN: About 170 metres  (`:782`)
- Variants:
  - Q DA: Hvor højt er Danmarks højeste geografiske punkt?  (`:785`)
    Q EN: How high is Denmark's highest geographical point?
    A DA: Ca. 170 meter
    A EN: About 170 metres
    Question ids: 2017-11-q3
  - Q DA: Hvor højt er Danmarks højeste geografiske punkt?  (`:785`)
    Q EN: How high is Denmark's highest geographical point?
    A DA: Godt 170 meter
    A EN: Just over 170 metres
    Question ids: 2019-06-q1
  - Q DA: Hvor højt er det højeste naturlige punkt i det danske landskab?  (`:803`)
    Q EN: How high is the highest natural point in the Danish landscape?
    A DA: Ca. 170 meter
    A EN: About 170 metres
    Question ids: 2020-06-q13
  - Q DA: Hvor højt er Danmarks højeste naturlige punkt?  (`:812`)
    Q EN: How high is Denmark's highest natural point?
    A DA: Cirka 170 meter
    A EN: About 170 metres
    Question ids: 2022-11-q15, 2024-05-q12
  - Q DA: Hvor højt er Danmarks højeste naturlige punkt, Møllehøj?  (`:822`)
    Q EN: How high is Denmark's highest natural point, Møllehøj?
    A DA: Ca. 170 meter
    A EN: About 170 metres
    Question ids: 2026-06-q6
- Trap note DA: Svaret er altid ca. 170 m (også skrevet 'godt 170 meter'). Danmark er et fladt land.  (`:831`)
- Trap note EN: The answer is always about 170 m (also written 'just over 170 metres'). Denmark is a flat country.
- Current note DA: (empty)  (`:833`)
- Current note EN: (empty)

- **Q:2017-11-q3** · `data/questions.json:1634` · exam 2017-11 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor højt er Danmarks højeste geografiske punkt?  (`:1638`)
  - Q EN: How high is Denmark's highest geographical point?  (`:1663`)
  - Option A DA: Ca. 590 meter  (`:1642`) · EN: About 590 metres
  - Option B DA: Ca. 380 meter  (`:1647`) · EN: About 380 metres
  - Option C DA: Ca. 170 meter  (`:1652`) · EN: About 170 metres
  - Correct (`:1656`): C
  - Correct text: C) Ca. 170 meter / About 170 metres
  - image_note: null
- **Q:2019-06-q1** · `data/questions.json:3966` · exam 2019-06 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor højt er Danmarks højeste geografiske punkt?  (`:3970`)
  - Q EN: How high is Denmark's highest geographical point?  (`:3995`)
  - Option A DA: Godt 380 meter  (`:3974`) · EN: Just over 380 metres
  - Option B DA: Godt 170 meter  (`:3979`) · EN: Just over 170 metres
  - Option C DA: Godt 60 meter  (`:3984`) · EN: Just over 60 metres
  - Correct (`:3988`): B
  - Correct text: B) Godt 170 meter / Just over 170 metres
  - image_note: null
- **Q:2020-06-q13** · `data/questions.json:5947` · exam 2020-06 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor højt er det højeste naturlige punkt i det danske landskab?  (`:5951`)
  - Q EN: How high is the highest natural point in the Danish landscape?  (`:5976`)
  - Option A DA: Ca. 170 meter  (`:5955`) · EN: About 170 metres
  - Option B DA: Ca. 360 meter  (`:5960`) · EN: About 360 metres
  - Option C DA: Ca. 550 meter  (`:5965`) · EN: About 550 metres
  - Correct (`:5969`): A
  - Correct text: A) Ca. 170 meter / About 170 metres
  - image_note: null
- **Q:2022-11-q15** · `data/questions.json:9928` · exam 2022-11 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor højt er Danmarks højeste naturlige punkt?  (`:9932`)
  - Q EN: How high is Denmark's highest natural point?  (`:9957`)
  - Option A DA: Cirka 170 meter  (`:9936`) · EN: About 170 metres
  - Option B DA: Cirka 460 meter  (`:9941`) · EN: About 460 metres
  - Option C DA: Cirka 750 meter  (`:9946`) · EN: About 750 metres
  - Correct (`:9950`): A
  - Correct text: A) Cirka 170 meter / About 170 metres
  - image_note: null
- **Q:2024-05-q12** · `data/questions.json:12204` · exam 2024-05 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor højt er Danmarks højeste naturlige punkt?  (`:12208`)
  - Q EN: How high is Denmark's highest natural point?  (`:12233`)
  - Option A DA: Cirka 170 meter  (`:12212`) · EN: About 170 metres
  - Option B DA: Cirka 460 meter  (`:12217`) · EN: About 460 metres
  - Option C DA: Cirka 750 meter  (`:12222`) · EN: About 750 metres
  - Correct (`:12226`): A
  - Correct text: A) Cirka 170 meter / About 170 metres
  - image_note: null
- **Q:2026-06-q6** · `data/questions.json:15191` · exam 2026-06 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor højt er Danmarks højeste naturlige punkt, Møllehøj?  (`:15195`)
  - Q EN: How high is Denmark's highest natural point, Møllehøj?  (`:15220`)
  - Option A DA: Ca. 170 meter  (`:15199`) · EN: About 170 metres
  - Option B DA: Ca. 460 meter  (`:15204`) · EN: About 460 metres
  - Option C DA: Ca. 750 meter  (`:15209`) · EN: About 750 metres
  - Correct (`:15213`): A
  - Correct text: A) Ca. 170 meter / About 170 metres
  - image_note: null

#### C:geo-lillebaelt · `data/clusters.json:2213` · asked 5× (2016-12, 2018-11, 2019-11, 2021-06, 2022-06) · frequent: yes · last asked: 2022-06

- Fact DA: Lillebælt er farvandet mellem Jylland og Fyn.  (`clusters.json:2215`)
- Fact EN: Lillebælt (the Little Belt) is the water between Jutland and Funen.  (`clusters.json:2216`)
- Canonical question DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:2234`)
- Canonical question EN: What is the name of the waters between Jutland and Funen?  (`:2235`)
- Canonical answer DA: Lillebælt  (`:2236`)
- Canonical answer EN: Lillebælt (the Little Belt)  (`:2237`)
- Variants:
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:2240`)
    Q EN: What is the name of the waters between Jutland and Funen?
    A DA: Lillebælt
    A EN: Lillebælt (the Little Belt)
    Question ids: 2016-12-q5, 2018-11-q3, 2019-11-q5, 2021-06-q5, 2022-06-q20
- Trap note DA: Lille-bælt = den lille, vestlige: Jylland–Fyn. Store-bælt er østligere: Fyn–Sjælland. Øresund: Sjælland–Sverige.  (`:2253`)
- Trap note EN: Lille-bælt = the small, western one: Jutland–Funen. Store-bælt is further east: Funen–Zealand. Øresund: Zealand–Sweden.
- Current note DA: (empty)  (`:2255`)
- Current note EN: (empty)

- **Q:2016-12-q5** · `data/questions.json:135` · exam 2016-12 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:139`)
  - Q EN: What is the name of the waters between Jutland and Funen?  (`:164`)
  - Option A DA: Øresund.  (`:143`) · EN: Øresund (the Sound)
  - Option B DA: Storebælt.  (`:148`) · EN: Storebælt (the Great Belt)
  - Option C DA: Lillebælt.  (`:153`) · EN: Lillebælt (the Little Belt)
  - Correct (`:157`): C
  - Correct text: C) Lillebælt. / Lillebælt (the Little Belt)
  - image_note: null
- **Q:2018-11-q3** · `data/questions.json:3227` · exam 2018-11 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:3231`)
  - Q EN: What is the name of the waters between Jutland and Funen?  (`:3256`)
  - Option A DA: Øresund  (`:3235`) · EN: Øresund (the Sound)
  - Option B DA: Kattegat  (`:3240`) · EN: Kattegat
  - Option C DA: Lillebælt  (`:3245`) · EN: Lillebælt (the Little Belt)
  - Correct (`:3249`): C
  - Correct text: C) Lillebælt / Lillebælt (the Little Belt)
  - image_note: null
- **Q:2019-11-q5** · `data/questions.json:4908` · exam 2019-11 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:4912`)
  - Q EN: What is the name of the waters between Jutland and Funen?  (`:4937`)
  - Option A DA: Storebælt  (`:4916`) · EN: Storebælt (the Great Belt)
  - Option B DA: Øresund  (`:4921`) · EN: Øresund (the Sound)
  - Option C DA: Lillebælt  (`:4926`) · EN: Lillebælt (the Little Belt)
  - Correct (`:4930`): C
  - Correct text: C) Lillebælt / Lillebælt (the Little Belt)
  - image_note: null
- **Q:2021-06-q5** · `data/questions.json:7263` · exam 2021-06 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:7267`)
  - Q EN: What is the name of the waters between Jutland and Funen?  (`:7292`)
  - Option A DA: Storebælt  (`:7271`) · EN: Storebælt (the Great Belt)
  - Option B DA: Øresund  (`:7276`) · EN: Øresund (the Sound)
  - Option C DA: Lillebælt  (`:7281`) · EN: Lillebælt (the Little Belt)
  - Correct (`:7285`): C
  - Correct text: C) Lillebælt / Lillebælt (the Little Belt)
  - image_note: null
- **Q:2022-06-q20** · `data/questions.json:9298` · exam 2022-06 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Jylland og Fyn?  (`:9302`)
  - Q EN: What is the name of the waters between Jutland and Funen?  (`:9327`)
  - Option A DA: Storebælt  (`:9306`) · EN: Storebælt (the Great Belt)
  - Option B DA: Øresund  (`:9311`) · EN: Øresund (the Sound)
  - Option C DA: Lillebælt  (`:9316`) · EN: Lillebælt (the Little Belt)
  - Correct (`:9320`): C
  - Correct text: C) Lillebælt / Lillebælt (the Little Belt)
  - image_note: null

#### C:geo-oresund · `data/clusters.json:2562` · asked 4× (2018-06, 2020-11, 2023-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Øresund er farvandet mellem Sjælland (København) og Sverige.  (`clusters.json:2564`)
- Fact EN: Øresund (the Sound) is the water between Zealand (Copenhagen) and Sweden.  (`clusters.json:2565`)
- Canonical question DA: Hvad hedder farvandet mellem Sjælland og Sverige?  (`:2581`)
- Canonical question EN: What is the name of the waters between Zealand and Sweden?  (`:2582`)
- Canonical answer DA: Øresund  (`:2583`)
- Canonical answer EN: Øresund (the Sound)  (`:2584`)
- Variants:
  - Q DA: Hvad hedder farvandet mellem Sjælland og Sverige?  (`:2587`)
    Q EN: What is the name of the waters between Zealand and Sweden?
    A DA: Øresund
    A EN: Øresund (the Sound)
    Question ids: 2018-06-q3
  - Q DA: Hvad hedder farvandet mellem København og Sverige?  (`:2596`)
    Q EN: What is the name of the waters between Copenhagen and Sweden?
    A DA: Øresund
    A EN: Øresund (the Sound)
    Question ids: 2020-11-q2, 2023-05-q12
  - Q DA: Hvilket farvand ligger mellem Sjælland og Sverige?  (`:2606`)
    Q EN: Which waters lie between Zealand and Sweden?
    A DA: Øresund
    A EN: Øresund (the Sound)
    Question ids: 2025-11-q16
- Trap note DA: Spørgsmålet kan sige 'København og Sverige' – det er stadig Øresund. Kattegat ligger nord for, mellem Jylland og Sverige.  (`:2615`)
- Trap note EN: The question may say 'Copenhagen and Sweden' – it is still Øresund. Kattegat lies further north, between Jutland and Sweden.
- Current note DA: (empty)  (`:2617`)
- Current note EN: (empty)

- **Q:2018-06-q3** · `data/questions.json:2432` · exam 2018-06 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Sjælland og Sverige?  (`:2436`)
  - Q EN: What is the name of the waters between Zealand and Sweden?  (`:2461`)
  - Option A DA: Øresund  (`:2440`) · EN: Øresund (the Sound)
  - Option B DA: Kattegat  (`:2445`) · EN: Kattegat
  - Option C DA: Lillebælt  (`:2450`) · EN: Lillebælt (the Little Belt)
  - Correct (`:2454`): A
  - Correct text: A) Øresund / Øresund (the Sound)
  - image_note: null
- **Q:2020-11-q2** · `data/questions.json:6384` · exam 2020-11 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem København og Sverige?  (`:6388`)
  - Q EN: What is the name of the waters between Copenhagen and Sweden?  (`:6413`)
  - Option A DA: Øresund  (`:6392`) · EN: Øresund (the Sound)
  - Option B DA: Kattegat  (`:6397`) · EN: Kattegat
  - Option C DA: Lillebælt  (`:6402`) · EN: Lillebælt (the Little Belt)
  - Correct (`:6406`): A
  - Correct text: A) Øresund / Øresund (the Sound)
  - image_note: null
- **Q:2023-05-q12** · `data/questions.json:10624` · exam 2023-05 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem København og Sverige?  (`:10628`)
  - Q EN: What is the name of the waters between Copenhagen and Sweden?  (`:10653`)
  - Option A DA: Lillebælt  (`:10632`) · EN: Lillebælt (the Little Belt)
  - Option B DA: Kattegat  (`:10637`) · EN: Kattegat
  - Option C DA: Øresund  (`:10642`) · EN: Øresund (the Sound)
  - Correct (`:10646`): C
  - Correct text: C) Øresund / Øresund (the Sound)
  - image_note: null
- **Q:2025-11-q16** · `data/questions.json:14716` · exam 2025-11 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket farvand ligger mellem Sjælland og Sverige?  (`:14720`)
  - Q EN: Which waters lie between Zealand and Sweden?  (`:14745`)
  - Option A DA: Storebælt  (`:14724`) · EN: Storebælt (the Great Belt)
  - Option B DA: Lillebælt  (`:14729`) · EN: Lillebælt (the Little Belt)
  - Option C DA: Øresund  (`:14734`) · EN: Øresund (the Sound)
  - Correct (`:14738`): C
  - Correct text: C) Øresund / Øresund (the Sound)
  - image_note: null

#### C:geo-storebaelt · `data/clusters.json:2747` · asked 4× (2019-06, 2020-06, 2021-11, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: Storebælt er farvandet mellem Fyn og Sjælland.  (`clusters.json:2749`)
- Fact EN: Storebælt (the Great Belt) is the water between Funen and Zealand.  (`clusters.json:2750`)
- Canonical question DA: Hvad hedder farvandet mellem Fyn og Sjælland?  (`:2766`)
- Canonical question EN: What is the name of the waters between Funen and Zealand?  (`:2767`)
- Canonical answer DA: Storebælt  (`:2768`)
- Canonical answer EN: Storebælt (the Great Belt)  (`:2769`)
- Variants:
  - Q DA: Hvad hedder farvandet mellem Fyn og Sjælland?  (`:2772`)
    Q EN: What is the name of the waters between Funen and Zealand?
    A DA: Storebælt
    A EN: Storebælt (the Great Belt)
    Question ids: 2019-06-q13, 2020-06-q5, 2021-11-q5
  - Q DA: Hvad hedder farvandet mellem Sjælland og Fyn?  (`:2783`)
    Q EN: What is the name of the waters between Zealand and Funen?
    A DA: Storebælt
    A EN: Storebælt (the Great Belt)
    Question ids: 2025-05-q16
- Trap note DA: Rækkefølgen kan være 'Fyn og Sjælland' eller 'Sjælland og Fyn' – svaret er det samme: Storebælt.  (`:2792`)
- Trap note EN: The order may be 'Funen and Zealand' or 'Zealand and Funen' – the answer is the same: Storebælt.
- Current note DA: (empty)  (`:2794`)
- Current note EN: (empty)

- **Q:2019-06-q13** · `data/questions.json:4357` · exam 2019-06 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Fyn og Sjælland?  (`:4361`)
  - Q EN: What is the name of the waters between Funen and Zealand?  (`:4386`)
  - Option A DA: Storebælt  (`:4365`) · EN: Storebælt (the Great Belt)
  - Option B DA: Kattegat  (`:4370`) · EN: Kattegat
  - Option C DA: Øresund  (`:4375`) · EN: Øresund (the Sound)
  - Correct (`:4379`): A
  - Correct text: A) Storebælt / Storebælt (the Great Belt)
  - image_note: null
- **Q:2020-06-q5** · `data/questions.json:5698` · exam 2020-06 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Fyn og Sjælland?  (`:5702`)
  - Q EN: What is the name of the waters between Funen and Zealand?  (`:5727`)
  - Option A DA: Storebælt  (`:5706`) · EN: Storebælt (the Great Belt)
  - Option B DA: Øresund  (`:5711`) · EN: Øresund (the Sound)
  - Option C DA: Lillebælt  (`:5716`) · EN: Lillebælt (the Little Belt)
  - Correct (`:5720`): A
  - Correct text: A) Storebælt / Storebælt (the Great Belt)
  - image_note: null
- **Q:2021-11-q5** · `data/questions.json:8028` · exam 2021-11 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Fyn og Sjælland?  (`:8032`)
  - Q EN: What is the name of the waters between Funen and Zealand?  (`:8057`)
  - Option A DA: Storebælt  (`:8036`) · EN: Storebælt (the Great Belt)
  - Option B DA: Øresund  (`:8041`) · EN: Øresund (the Sound)
  - Option C DA: Lillebælt  (`:8046`) · EN: Lillebælt (the Little Belt)
  - Correct (`:8050`): A
  - Correct text: A) Storebælt / Storebælt (the Great Belt)
  - image_note: null
- **Q:2025-05-q16** · `data/questions.json:13911` · exam 2025-05 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder farvandet mellem Sjælland og Fyn?  (`:13915`)
  - Q EN: What is the name of the waters between Zealand and Funen?  (`:13940`)
  - Option A DA: Storebælt  (`:13919`) · EN: Storebælt (the Great Belt)
  - Option B DA: Lillebælt  (`:13924`) · EN: Lillebælt (the Little Belt)
  - Option C DA: Øresund  (`:13929`) · EN: Øresund (the Sound)
  - Correct (`:13933`): A
  - Correct text: A) Storebælt / Storebælt (the Great Belt)
  - image_note: null

#### C:geo-aarhus · `data/clusters.json:2916` · asked 4× (2017-06, 2020-11, 2023-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Aarhus er Danmarks næststørste by. Den ligger i Jylland (Østjylland).  (`clusters.json:2918`)
- Fact EN: Aarhus is Denmark's second-largest city. It is in Jutland (East Jutland).  (`clusters.json:2919`)
- Canonical question DA: Hvad hedder Danmarks næststørste by, og hvor ligger den?  (`:2935`)
- Canonical question EN: What is Denmark's second-largest city, and where is it?  (`:2936`)
- Canonical answer DA: Aarhus – i Jylland  (`:2937`)
- Canonical answer EN: Aarhus – in Jutland  (`:2938`)
- Variants:
  - Q DA: Hvor i Danmark ligger Aarhus?  (`:2941`)
    Q EN: Where in Denmark is Aarhus?
    A DA: I Jylland
    A EN: In Jutland
    Question ids: 2017-06-q2
  - Q DA: Hvor ligger Danmarks andenstørste by, Aarhus?  (`:2950`)
    Q EN: Where is Denmark's second-largest city, Aarhus?
    A DA: I Jylland
    A EN: In Jutland
    Question ids: 2020-11-q1
  - Q DA: Hvad hedder Danmarks næststørste by?  (`:2959`)
    Q EN: What is Denmark's second-largest city called?
    A DA: Aarhus
    A EN: Aarhus
    Question ids: 2023-05-q10
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:2968`)
    Q EN: Which of the following towns has the most inhabitants?
    A DA: Aarhus
    A EN: Aarhus
    Question ids: 2024-11-q11
- Trap note DA: Rækkefølgen: 1 København, 2 Aarhus, 3 Odense, 4 Aalborg, 5 Esbjerg. Aarhus er større end Odense og Aalborg.  (`:2977`)
- Trap note EN: The order: 1 Copenhagen, 2 Aarhus, 3 Odense, 4 Aalborg, 5 Esbjerg. Aarhus is bigger than Odense and Aalborg.
- Current note DA: (empty)  (`:2979`)
- Current note EN: (empty)

- **Q:2017-06-q2** · `data/questions.json:821` · exam 2017-06 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor i Danmark ligger Aarhus?  (`:825`)
  - Q EN: Where in Denmark is Aarhus?  (`:850`)
  - Option A DA: På Sjælland.  (`:829`) · EN: On Zealand
  - Option B DA: I Jylland.  (`:834`) · EN: In Jutland
  - Option C DA: På Fyn.  (`:839`) · EN: On Funen
  - Correct (`:843`): B
  - Correct text: B) I Jylland. / In Jutland
  - image_note: null
- **Q:2020-11-q1** · `data/questions.json:6351` · exam 2020-11 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ligger Danmarks andenstørste by, Aarhus?  (`:6355`)
  - Q EN: Where is Denmark's second-largest city, Aarhus?  (`:6380`)
  - Option A DA: På Sjælland  (`:6359`) · EN: On Zealand
  - Option B DA: I Jylland  (`:6364`) · EN: In Jutland
  - Option C DA: På Fyn  (`:6369`) · EN: On Funen
  - Correct (`:6373`): B
  - Correct text: B) I Jylland / In Jutland
  - image_note: null
- **Q:2023-05-q10** · `data/questions.json:10558` · exam 2023-05 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks næststørste by?  (`:10562`)
  - Q EN: What is Denmark's second-largest city called?  (`:10587`)
  - Option A DA: Aalborg  (`:10566`) · EN: Aalborg
  - Option B DA: Odense  (`:10571`) · EN: Odense
  - Option C DA: Aarhus  (`:10576`) · EN: Aarhus
  - Correct (`:10580`): C
  - Correct text: C) Aarhus / Aarhus
  - image_note: null
- **Q:2024-11-q11** · `data/questions.json:12976` · exam 2024-11 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:12980`)
  - Q EN: Which of the following towns has the most inhabitants?  (`:13005`)
  - Option A DA: Odense  (`:12984`) · EN: Odense
  - Option B DA: Aalborg  (`:12989`) · EN: Aalborg
  - Option C DA: Aarhus  (`:12994`) · EN: Aarhus
  - Correct (`:12998`): C
  - Correct text: C) Aarhus / Aarhus
  - image_note: null

#### C:geo-esbjerg · `data/clusters.json:3823` · asked 3× (2023-05, 2024-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Esbjerg er Danmarks femtestørste by. Den ligger i Vestjylland.  (`clusters.json:3825`)
- Fact EN: Esbjerg is Denmark's fifth-largest city. It is in West Jutland.  (`clusters.json:3826`)
- Canonical question DA: Hvor ligger Danmarks femtestørste by, Esbjerg?  (`:3840`)
- Canonical question EN: Where is Denmark's fifth-largest city, Esbjerg?  (`:3841`)
- Canonical answer DA: I Vestjylland  (`:3842`)
- Canonical answer EN: In West Jutland  (`:3843`)
- Variants:
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:3846`)
    Q EN: Which of the following towns has the most inhabitants?
    A DA: Esbjerg
    A EN: Esbjerg
    Question ids: 2023-05-q3
  - Q DA: Hvor ligger Danmarks femtestørste by, Esbjerg?  (`:3855`)
    Q EN: Where is Denmark's fifth-largest city, Esbjerg?
    A DA: I Vestjylland
    A EN: In West Jutland
    Question ids: 2024-05-q13, 2026-06-q7
- Trap note DA: Esbjerg er større end Thisted og Hjørring – men mindre end Aalborg.  (`:3865`)
- Trap note EN: Esbjerg is bigger than Thisted and Hjørring – but smaller than Aalborg.
- Current note DA: (empty)  (`:3867`)
- Current note EN: (empty)

- **Q:2023-05-q3** · `data/questions.json:10327` · exam 2023-05 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:10331`)
  - Q EN: Which of the following towns has the most inhabitants?  (`:10356`)
  - Option A DA: Esbjerg  (`:10335`) · EN: Esbjerg
  - Option B DA: Thisted  (`:10340`) · EN: Thisted
  - Option C DA: Hjørring  (`:10345`) · EN: Hjørring
  - Correct (`:10349`): A
  - Correct text: A) Esbjerg / Esbjerg
  - image_note: null
- **Q:2024-05-q13** · `data/questions.json:12237` · exam 2024-05 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ligger Danmarks femtestørste by, Esbjerg?  (`:12241`)
  - Q EN: Where is Denmark's fifth-largest city, Esbjerg?  (`:12266`)
  - Option A DA: I Nordjylland  (`:12245`) · EN: In North Jutland
  - Option B DA: I Østjylland  (`:12250`) · EN: In East Jutland
  - Option C DA: I Vestjylland  (`:12255`) · EN: In West Jutland
  - Correct (`:12259`): C
  - Correct text: C) I Vestjylland / In West Jutland
  - image_note: null
- **Q:2026-06-q7** · `data/questions.json:15224` · exam 2026-06 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor ligger Danmarks femtestørste by, Esbjerg?  (`:15228`)
  - Q EN: Where is Denmark's fifth-largest city, Esbjerg?  (`:15253`)
  - Option A DA: I Nordjylland  (`:15232`) · EN: In North Jutland
  - Option B DA: I Østjylland  (`:15237`) · EN: In East Jutland
  - Option C DA: I Vestjylland  (`:15242`) · EN: In West Jutland
  - Correct (`:15246`): C
  - Correct text: C) I Vestjylland / In West Jutland
  - image_note: null

#### C:geo-sydligste · `data/clusters.json:3871` · asked 3× (2022-11, 2024-11, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Danmarks sydligste punkt er Gedser Odde på øen Falster.  (`clusters.json:3873`)
- Fact EN: Denmark's southernmost point is Gedser Odde on the island of Falster.  (`clusters.json:3874`)
- Canonical question DA: På hvilken ø ligger Danmarks sydligste punkt?  (`:3888`)
- Canonical question EN: On which island is Denmark's southernmost point?  (`:3889`)
- Canonical answer DA: Falster (Gedser Odde)  (`:3890`)
- Canonical answer EN: Falster (Gedser Odde)  (`:3891`)
- Variants:
  - Q DA: På hvilken ø ligger Danmarks sydligste punkt?  (`:3894`)
    Q EN: On which island is Denmark's southernmost point?
    A DA: Falster
    A EN: Falster
    Question ids: 2022-11-q7, 2024-11-q10
  - Q DA: Hvad er 'Gedser Odde', som ligger på øen Falster?  (`:3904`)
    Q EN: What is 'Gedser Odde', which is on the island of Falster?
    A DA: Danmarks sydligste punkt
    A EN: Denmark's southernmost point
    Question ids: 2026-06-q8
- Trap note DA: Spørgsmålet kan også være: 'Hvad er Gedser Odde?' – svar: Danmarks sydligste punkt.  (`:3913`)
- Trap note EN: The question can also be: 'What is Gedser Odde?' – answer: Denmark's southernmost point.
- Current note DA: (empty)  (`:3915`)
- Current note EN: (empty)

- **Q:2022-11-q7** · `data/questions.json:9669` · exam 2022-11 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: På hvilken ø ligger Danmarks sydligste punkt?  (`:9673`)
  - Q EN: On which island is Denmark's southernmost point?  (`:9698`)
  - Option A DA: Læsø  (`:9677`) · EN: Læsø
  - Option B DA: Samsø  (`:9682`) · EN: Samsø
  - Option C DA: Falster  (`:9687`) · EN: Falster
  - Correct (`:9691`): C
  - Correct text: C) Falster / Falster
  - image_note: null
- **Q:2024-11-q10** · `data/questions.json:12943` · exam 2024-11 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: På hvilken ø ligger Danmarks sydligste punkt?  (`:12947`)
  - Q EN: On which island is Denmark's southernmost point?  (`:12972`)
  - Option A DA: Læsø  (`:12951`) · EN: Læsø
  - Option B DA: Fyn  (`:12956`) · EN: Funen (Fyn)
  - Option C DA: Falster  (`:12961`) · EN: Falster
  - Correct (`:12965`): C
  - Correct text: C) Falster / Falster
  - image_note: null
- **Q:2026-06-q8** · `data/questions.json:15257` · exam 2026-06 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er 'Gedser Odde', som ligger på øen Falster?  (`:15261`)
  - Q EN: What is 'Gedser Odde', which is on the island of Falster?  (`:15286`)
  - Option A DA: Danmarks nordligste punkt  (`:15265`) · EN: Denmark's northernmost point
  - Option B DA: Danmarks østligste punkt  (`:15270`) · EN: Denmark's easternmost point
  - Option C DA: Danmarks sydligste punkt  (`:15275`) · EN: Denmark's southernmost point
  - Correct (`:15279`): C
  - Correct text: C) Danmarks sydligste punkt / Denmark's southernmost point
  - image_note: null

#### C:geo-landbrug · `data/clusters.json:4911` · asked 2× (2025-11, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Ca. 60 procent af Danmarks areal er landbrug.  (`clusters.json:4913`)
- Fact EN: About 60 per cent of Denmark's area is farmland.  (`clusters.json:4914`)
- Canonical question DA: Hvor stor en del af Danmarks areal er landbrug?  (`:4926`)
- Canonical question EN: How much of Denmark's area is farmland?  (`:4927`)
- Canonical answer DA: Ca. 60 procent  (`:4928`)
- Canonical answer EN: About 60 per cent  (`:4929`)
- Variants:
  - Q DA: Hvor meget af Danmarks areal er landbrug?  (`:4932`)
    Q EN: How much of Denmark's area is farmland?
    A DA: Cirka 60 procent
    A EN: About 60 per cent
    Question ids: 2025-11-q17
  - Q DA: Hvor stor en andel af Danmarks areal er landbrugsjord?  (`:4941`)
    Q EN: What share of Denmark's area is farmland?
    A DA: Cirka 60 procent
    A EN: About 60 per cent
    Question ids: 2026-06-q19
- Trap note DA: (empty)  (`:4950`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4952`)
- Current note EN: (empty)

- **Q:2025-11-q17** · `data/questions.json:14749` · exam 2025-11 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor meget af Danmarks areal er landbrug?  (`:14753`)
  - Q EN: How much of Denmark's area is farmland?  (`:14778`)
  - Option A DA: Cirka 10 procent  (`:14757`) · EN: About 10 per cent
  - Option B DA: Cirka 35 procent  (`:14762`) · EN: About 35 per cent
  - Option C DA: Cirka 60 procent  (`:14767`) · EN: About 60 per cent
  - Correct (`:14771`): C
  - Correct text: C) Cirka 60 procent / About 60 per cent
  - image_note: null
- **Q:2026-06-q19** · `data/questions.json:15600` · exam 2026-06 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor stor en andel af Danmarks areal er landbrugsjord?  (`:15604`)
  - Q EN: What share of Denmark's area is farmland?  (`:15629`)
  - Option A DA: Cirka 20 procent  (`:15608`) · EN: About 20 per cent
  - Option B DA: Cirka 40 procent  (`:15613`) · EN: About 40 per cent
  - Option C DA: Cirka 60 procent  (`:15618`) · EN: About 60 per cent
  - Correct (`:15622`): C
  - Correct text: C) Cirka 60 procent / About 60 per cent
  - image_note: null

#### C:geo-aalborg · `data/clusters.json:5530` · asked 2× (2022-11, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Aalborg er Danmarks fjerdestørste by. Den ligger i Nordjylland.  (`clusters.json:5532`)
- Fact EN: Aalborg is Denmark's fourth-largest city. It is in North Jutland.  (`clusters.json:5533`)
- Canonical question DA: Hvor ligger Danmarks fjerdestørste by, Aalborg?  (`:5545`)
- Canonical question EN: Where is Denmark's fourth-largest city, Aalborg?  (`:5546`)
- Canonical answer DA: I Nordjylland  (`:5547`)
- Canonical answer EN: In North Jutland  (`:5548`)
- Variants:
  - Q DA: Hvor ligger Danmarks fjerdestørste by, Aalborg?  (`:5551`)
    Q EN: Where is Denmark's fourth-largest city, Aalborg?
    A DA: I Nordjylland
    A EN: In North Jutland
    Question ids: 2022-11-q24
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:5560`)
    Q EN: Which of the following towns has the most inhabitants?
    A DA: Aalborg
    A EN: Aalborg
    Question ids: 2025-05-q17
- Trap note DA: Aalborg er større end Esbjerg og Randers.  (`:5569`)
- Trap note EN: Aalborg is bigger than Esbjerg and Randers.
- Current note DA: (empty)  (`:5571`)
- Current note EN: (empty)

- **Q:2022-11-q24** · `data/questions.json:10200` · exam 2022-11 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ligger Danmarks fjerdestørste by, Aalborg?  (`:10204`)
  - Q EN: Where is Denmark's fourth-largest city, Aalborg?  (`:10229`)
  - Option A DA: I Vestjylland  (`:10208`) · EN: In West Jutland
  - Option B DA: I Sønderjylland  (`:10213`) · EN: In Southern Jutland
  - Option C DA: I Nordjylland  (`:10218`) · EN: In North Jutland
  - Correct (`:10222`): C
  - Correct text: C) I Nordjylland / In North Jutland
  - image_note: null
- **Q:2025-05-q17** · `data/questions.json:13944` · exam 2025-05 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende byer har flest indbyggere?  (`:13948`)
  - Q EN: Which of the following towns has the most inhabitants?  (`:13973`)
  - Option A DA: Esbjerg  (`:13952`) · EN: Esbjerg
  - Option B DA: Randers  (`:13957`) · EN: Randers
  - Option C DA: Aalborg  (`:13962`) · EN: Aalborg
  - Correct (`:13966`): C
  - Correct text: C) Aalborg / Aalborg
  - image_note: null

#### C:geo-grenen · `data/clusters.json:5575` · asked 2× (2021-11, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Grenen ved Skagen er Danmarks nordligste punkt.  (`clusters.json:5577`)
- Fact EN: Grenen, near Skagen, is Denmark's northernmost point.  (`clusters.json:5578`)
- Canonical question DA: Hvad er Grenen ved Skagen?  (`:5590`)
- Canonical question EN: What is Grenen near Skagen?  (`:5591`)
- Canonical answer DA: Danmarks nordligste punkt  (`:5592`)
- Canonical answer EN: Denmark's northernmost point  (`:5593`)
- Variants:
  - Q DA: Ved hvilken by i Jylland ligger Danmarks nordligste punkt Grenen?  (`:5596`)
    Q EN: Near which town in Jutland is Denmark's northernmost point, Grenen?
    A DA: Skagen
    A EN: Skagen
    Question ids: 2021-11-q15
  - Q DA: Hvad er Grenen, som ligger ved byen Skagen?  (`:5605`)
    Q EN: What is Grenen, which is near the town of Skagen?
    A DA: Danmarks nordligste punkt
    A EN: Denmark's northernmost point
    Question ids: 2025-05-q15
- Trap note DA: Nord = Grenen/Skagen. Syd = Gedser Odde på Falster.  (`:5614`)
- Trap note EN: North = Grenen/Skagen. South = Gedser Odde on Falster.
- Current note DA: (empty)  (`:5616`)
- Current note EN: (empty)

- **Q:2021-11-q15** · `data/questions.json:8338` · exam 2021-11 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Ved hvilken by i Jylland ligger Danmarks nordligste punkt Grenen?  (`:8342`)
  - Q EN: Near which town in Jutland is Denmark's northernmost point, Grenen?  (`:8367`)
  - Option A DA: Skagen  (`:8346`) · EN: Skagen
  - Option B DA: Aarhus  (`:8351`) · EN: Aarhus
  - Option C DA: Aalborg  (`:8356`) · EN: Aalborg
  - Correct (`:8360`): A
  - Correct text: A) Skagen / Skagen
  - image_note: null
- **Q:2025-05-q15** · `data/questions.json:13878` · exam 2025-05 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Grenen, som ligger ved byen Skagen?  (`:13882`)
  - Q EN: What is Grenen, which is near the town of Skagen?  (`:13907`)
  - Option A DA: Danmarks sydligste punkt  (`:13886`) · EN: Denmark's southernmost point
  - Option B DA: Danmarks østligste punkt  (`:13891`) · EN: Denmark's easternmost point
  - Option C DA: Danmarks nordligste punkt  (`:13896`) · EN: Denmark's northernmost point
  - Correct (`:13900`): C
  - Correct text: C) Danmarks nordligste punkt / Denmark's northernmost point
  - image_note: null

#### C:geo-odense · `data/clusters.json:5964` · asked 2× (2020-06, 2023-11) · frequent: no · last asked: 2023-11

- Fact DA: Odense er Danmarks tredjestørste by. Den ligger på Fyn.  (`clusters.json:5966`)
- Fact EN: Odense is Denmark's third-largest city. It is on Funen.  (`clusters.json:5967`)
- Canonical question DA: Hvad hedder Danmarks tredjestørste by, og hvor ligger den?  (`:5979`)
- Canonical question EN: What is Denmark's third-largest city, and where is it?  (`:5980`)
- Canonical answer DA: Odense – på Fyn  (`:5981`)
- Canonical answer EN: Odense – on Funen  (`:5982`)
- Variants:
  - Q DA: Hvor ligger Danmarks tredjestørste by, Odense?  (`:5985`)
    Q EN: Where is Denmark's third-largest city, Odense?
    A DA: På Fyn
    A EN: On Funen
    Question ids: 2020-06-q1
  - Q DA: Hvad hedder Danmarks tredjestørste by?  (`:5994`)
    Q EN: What is Denmark's third-largest city called?
    A DA: Odense
    A EN: Odense
    Question ids: 2023-11-q4
- Trap note DA: Odense er den eneste af de 5 største byer, der ikke ligger i Jylland eller på Sjælland (København).  (`:6003`)
- Trap note EN: Odense is the only one of the 5 largest cities that is not in Jutland or on Zealand (Copenhagen).
- Current note DA: (empty)  (`:6005`)
- Current note EN: (empty)

- **Q:2020-06-q1** · `data/questions.json:5566` · exam 2020-06 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor ligger Danmarks tredjestørste by, Odense?  (`:5570`)
  - Q EN: Where is Denmark's third-largest city, Odense?  (`:5595`)
  - Option A DA: På Sjælland  (`:5574`) · EN: On Zealand
  - Option B DA: I Jylland  (`:5579`) · EN: In Jutland
  - Option C DA: På Fyn  (`:5584`) · EN: On Funen
  - Correct (`:5588`): C
  - Correct text: C) På Fyn / On Funen
  - image_note: null
- **Q:2023-11-q4** · `data/questions.json:11150` · exam 2023-11 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad hedder Danmarks tredjestørste by?  (`:11154`)
  - Q EN: What is Denmark's third-largest city called?  (`:11179`)
  - Option A DA: Esbjerg  (`:11158`) · EN: Esbjerg
  - Option B DA: Aalborg  (`:11163`) · EN: Aalborg
  - Option C DA: Odense  (`:11168`) · EN: Odense
  - Correct (`:11172`): C
  - Correct text: C) Odense / Odense
  - image_note: null

#### C:geo-lillebaeltsbro · `data/clusters.json:7339` · asked 1× (2023-11) · frequent: no · last asked: 2023-11

- Fact DA: Lillebæltsbroen forbinder Fyn og Jylland.  (`clusters.json:7341`)
- Fact EN: The Little Belt Bridge connects Funen and Jutland.  (`clusters.json:7342`)
- Canonical question DA: Hvilke landsdele forbinder Lillebæltsbroen?  (`:7352`)
- Canonical question EN: Which parts of the country does the Little Belt Bridge connect?  (`:7353`)
- Canonical answer DA: Fyn og Jylland  (`:7354`)
- Canonical answer EN: Funen and Jutland  (`:7355`)
- Variants:
  - Q DA: Hvilke landsdele forbinder Lillebæltsbroen?  (`:7358`)
    Q EN: Which parts of the country does the Little Belt Bridge (Lillebæltsbroen) connect?
    A DA: Fyn og Jylland
    A EN: Funen and Jutland
    Question ids: 2023-11-q5
- Trap note DA: Broen har samme navn som farvandet: Lillebæltsbroen = Fyn–Jylland, Storebæltsbroen = Fyn–Sjælland.  (`:7367`)
- Trap note EN: The bridge has the same name as the water: Little Belt Bridge = Funen–Jutland, Great Belt Bridge = Funen–Zealand.
- Current note DA: (empty)  (`:7369`)
- Current note EN: (empty)

- **Q:2023-11-q5** · `data/questions.json:11183` · exam 2023-11 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilke landsdele forbinder Lillebæltsbroen?  (`:11187`)
  - Q EN: Which parts of the country does the Little Belt Bridge (Lillebæltsbroen) connect?  (`:11212`)
  - Option A DA: Fyn og Sjælland  (`:11191`) · EN: Funen and Zealand
  - Option B DA: Fyn og Langeland  (`:11196`) · EN: Funen and Langeland
  - Option C DA: Fyn og Jylland  (`:11201`) · EN: Funen and Jutland
  - Correct (`:11205`): C
  - Correct text: C) Fyn og Jylland / Funen and Jutland
  - image_note: null

#### C:geo-indbyggere · `data/clusters.json:7373` · asked 1× (2023-05) · frequent: no · last asked: 2023-05

- Fact DA: Danmark har ca. 6 millioner indbyggere.  (`clusters.json:7375`)
- Fact EN: Denmark has about 6 million inhabitants.  (`clusters.json:7376`)
- Canonical question DA: Hvor mange indbyggere har Danmark?  (`:7386`)
- Canonical question EN: How many inhabitants does Denmark have?  (`:7387`)
- Canonical answer DA: Ca. seks millioner  (`:7388`)
- Canonical answer EN: About six million  (`:7389`)
- Variants:
  - Q DA: Hvor mange indbyggere har Danmark?  (`:7392`)
    Q EN: How many inhabitants does Denmark have?
    A DA: Cirka seks millioner
    A EN: About six million
    Question ids: 2023-05-q14
- Trap note DA: (empty)  (`:7401`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7403`)
- Current note EN: (empty)

- **Q:2023-05-q14** · `data/questions.json:10690` · exam 2023-05 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange indbyggere har Danmark?  (`:10694`)
  - Q EN: How many inhabitants does Denmark have?  (`:10719`)
  - Option A DA: Cirka seks millioner  (`:10698`) · EN: About six million
  - Option B DA: Cirka otte millioner  (`:10703`) · EN: About eight million
  - Option C DA: Cirka ti millioner  (`:10708`) · EN: About ten million
  - Correct (`:10712`): A
  - Correct text: A) Cirka seks millioner / About six million
  - image_note: null

#### C:geo-areal · `data/clusters.json:7713` · asked 1× (2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Danmark (uden Grønland og Færøerne) er ca. 43.000 km².  (`clusters.json:7715`)
- Fact EN: Denmark (without Greenland and the Faroe Islands) is about 43,000 km².  (`clusters.json:7716`)
- Canonical question DA: Hvad er Danmarks areal (uden Grønland og Færøerne)?  (`:7726`)
- Canonical question EN: What is Denmark's area (without Greenland and the Faroe Islands)?  (`:7727`)
- Canonical answer DA: Ca. 43.000 km²  (`:7728`)
- Canonical answer EN: About 43,000 km²  (`:7729`)
- Variants:
  - Q DA: Hvad er Danmarks areal (uden Grønland og Færøerne)?  (`:7732`)
    Q EN: What is Denmark's area (without Greenland and the Faroe Islands)?
    A DA: Ca. 43.000 km²
    A EN: About 43,000 km²
    Question ids: 2018-11-q6
- Trap note DA: (empty)  (`:7741`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7743`)
- Current note EN: (empty)

- **Q:2018-11-q6** · `data/questions.json:3321` · exam 2018-11 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er Danmarks areal (uden Grønland og Færøerne)?  (`:3325`)
  - Q EN: What is Denmark's area (without Greenland and the Faroe Islands)?  (`:3350`)
  - Option A DA: Ca. 4.300 km²  (`:3329`) · EN: About 4,300 km²
  - Option B DA: Ca. 43.000 km²  (`:3334`) · EN: About 43,000 km²
  - Option C DA: Ca. 430.000 km²  (`:3339`) · EN: About 430,000 km²
  - Correct (`:3343`): B
  - Correct text: B) Ca. 43.000 km² / About 43,000 km²
  - image_note: null

#### C:geo-indvandrere · `data/clusters.json:7747` · asked 1× (2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Ca. 16 procent af befolkningen er indvandrere og efterkommere (per 2026).  (`clusters.json:7749`)
- Fact EN: About 16 per cent of the population are immigrants and their descendants (per 2026).  (`clusters.json:7750`)
- Canonical question DA: Hvor stor en andel af befolkningen er indvandrere og efterkommere?  (`:7760`)
- Canonical question EN: What share of the population are immigrants and descendants?  (`:7761`)
- Canonical answer DA: 12-13 % (prøvens svar i 2018) – i dag ca. 16 %  (`:7762`)
- Canonical answer EN: 12–13% (the 2018 exam answer) – today about 16%  (`:7763`)
- Variants:
  - Q DA: Hvor stor en andel af befolkningen i Danmark er indvandrere og efterkommere?  (`:7766`)
    Q EN: What share of the population in Denmark are immigrants and their descendants?
    A DA: 12-13 %
    A EN: 12–13%
    Question ids: 2018-11-q1
- Trap note DA: Hvis valgmulighederne er 5-6 %, 12-13 % og 19-20 %, så vælg 12-13 % (det var svaret i 2018). Hvis der står ca. 16 %, så vælg det.  (`:7775`)
- Trap note EN: If the options are 5–6%, 12–13% and 19–20%, choose 12–13% (the answer in 2018). If about 16% is offered, choose that.
- Current note DA: Andelen er steget: i 2018 ca. 12-13 %, i dag ca. 16 %.  (`:7777`)
- Current note EN: The share has risen: about 12–13% in 2018, about 16% today.

- **Q:2018-11-q1** · `data/questions.json:3161` · exam 2018-11 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor stor en andel af befolkningen i Danmark er indvandrere og efterkommere?  (`:3165`)
  - Q EN: What share of the population in Denmark are immigrants and their descendants?  (`:3190`)
  - Option A DA: 5-6 %  (`:3169`) · EN: 5–6%
  - Option B DA: 12-13 %  (`:3174`) · EN: 12–13%
  - Option C DA: 19-20 %  (`:3179`) · EN: 19–20%
  - Correct (`:3183`): B
  - Correct text: B) 12-13 % / 12–13%
  - image_note: null

#### C:geo-region-hovedstaden · `data/clusters.json:7781` · asked 1× (2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Region Hovedstaden er den største region med ca. 1,9 millioner indbyggere (per 2026).  (`clusters.json:7783`)
- Fact EN: The Capital Region is the largest region, with about 1.9 million inhabitants (per 2026).  (`clusters.json:7784`)
- Canonical question DA: Hvor mange mennesker bor der i Region Hovedstaden?  (`:7794`)
- Canonical question EN: How many people live in the Capital Region?  (`:7795`)
- Canonical answer DA: Ca. 1,7 millioner (prøvens svar i 2018) – i dag ca. 1,9 millioner  (`:7796`)
- Canonical answer EN: About 1.7 million (the 2018 exam answer) – today about 1.9 million  (`:7797`)
- Variants:
  - Q DA: Hvor mange mennesker bor der i Region Hovedstaden?  (`:7800`)
    Q EN: How many people live in the Capital Region (Region Hovedstaden)?
    A DA: Ca. 1,7 millioner
    A EN: About 1.7 million
    Question ids: 2018-11-q2
- Trap note DA: Vælg det tal, der er tættest på 1,7–1,9 millioner. 2,8 og 3,9 millioner er alt for meget.  (`:7809`)
- Trap note EN: Pick the figure closest to 1.7–1.9 million. 2.8 and 3.9 million are far too high.
- Current note DA: Prøven fra 2018 sagde ca. 1,7 millioner. I dag (per 2026) bor der ca. 1,9 millioner.  (`:7811`)
- Current note EN: The 2018 exam said about 1.7 million. Today (per 2026) about 1.9 million live there.

- **Q:2018-11-q2** · `data/questions.json:3194` · exam 2018-11 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange mennesker bor der i Region Hovedstaden?  (`:3198`)
  - Q EN: How many people live in the Capital Region (Region Hovedstaden)?  (`:3223`)
  - Option A DA: Ca. 1,7 millioner  (`:3202`) · EN: About 1.7 million
  - Option B DA: Ca. 2,8 millioner  (`:3207`) · EN: About 2.8 million
  - Option C DA: Ca. 3,9 millioner  (`:3212`) · EN: About 3.9 million
  - Correct (`:3216`): A
  - Correct text: A) Ca. 1,7 millioner / About 1.7 million
  - image_note: null


## 5. Arbejdsmarked og erhverv / Labour market and business  (`topic:arbejde`, `data/topics.json:244`)

### Intro paragraphs (`I:arbejde:n`)

- **I:arbejde:1** · `data/topics.json:251` (EN `:252`)
  - DA: På det danske arbejdsmarked laver fagforeninger og arbejdsgivere aftaler, der hedder kollektive overenskomster. De handler om løn, arbejdstid og ferie. Den normale arbejdsuge er 37 timer, og man har ret til 5-6 ugers ferie om året.
  - EN: On the Danish labour market, trade unions and employers make agreements called collective agreements. They cover pay, working hours and holidays. The normal working week is 37 hours, and you are entitled to 5–6 weeks of holiday a year.
- **I:arbejde:2** · `data/topics.json:255` (EN `:256`)
  - DA: Det koster penge at være med i en fagforening. Medarbejderne vælger selv deres tillidsrepræsentant. I et samarbejdsudvalg mødes ledelsen og de ansatte. For at få dagpenge, hvis man bliver arbejdsløs, skal man være medlem af en a-kasse – ca. 70 % af lønmodtagerne er med.
  - EN: It costs money to be in a trade union. The employees elect their own union representative. In a cooperation committee, management and employees meet. To get unemployment benefit if you lose your job, you must be a member of an a-kasse – about 70% of employees are.
- **I:arbejde:3** · `data/topics.json:259` (EN `:260`)
  - DA: En arbejdsgiver må ikke fyre en kvinde, fordi hun er gravid, eller en ansat, fordi han eller hun melder sig ind i en fagforening. Kvinder har ret til samme løn som mænd for samme arbejde. Man har ikke altid krav på deltid, og arbejdsgiveren kan heller ikke bare forlange det. Ca. 3 ud af 4 mellem 15 og 64 år har et arbejde.
  - EN: An employer may not fire a woman because she is pregnant, or an employee because he or she joins a trade union. Women have the right to the same pay as men for the same work. You do not always have a right to part-time work, and the employer cannot just demand it either. About 3 out of 4 people aged 15 to 64 have a job.
- **I:arbejde:4** · `data/topics.json:263` (EN `:264`)
  - DA: Kendte danske virksomheder: Vestas laver vindmøller, Novo Nordisk laver medicin, og LEGO laver legetøj. Vindenergi er den grønne energi, Danmark producerer mest af. Antallet af landmænd er faldet meget siden 1960.
  - EN: Well-known Danish companies: Vestas makes wind turbines, Novo Nordisk makes medicine, and LEGO makes toys. Wind energy is the green energy Denmark produces most of. The number of farmers has fallen a lot since 1960.

### Current facts – "Ændret siden prøven" (`F:arbejde:n`)

- (none)

### Overview tables / fact groups (`G:…`)

- G:fg-tal – full entry above under topic demokrati (also used here)
#### G:fg-virksomheder · `data/fact_groups.json:1189`

- Title DA: Danske virksomheder og deres produkter
- Title EN: Danish companies and their products
- Columns DA: Virksomhed | Laver
- Columns EN: Company | Makes
- Rows (DA / EN, one per row):
  - DA: Vestas | Vindmøller
    EN: Vestas | Wind turbines
  - DA: Novo Nordisk | Medicin (fx insulin)
    EN: Novo Nordisk | Medicine (e.g. insulin)
  - DA: LEGO | Legetøj / byggeklodser
    EN: LEGO | Toys / building bricks
  - DA: Arla | Mejeriprodukter (mælk, ost)
    EN: Arla | Dairy products (milk, cheese)
  - DA: Mærsk | Skibsfart (containerskibe)
    EN: Mærsk | Shipping (container ships)
  - DA: Velux | Ovenlysvinduer
    EN: Velux | Roof windows
- Mnemonic DA: VEStas = VEnt (vind). NOVO = medicin. LEGO = leg.
- Mnemonic EN: VEStas = wind. NOVO = medicine. LEGO = play (leg godt = 'play well').
- Cluster links: arb-vestas, arb-novo, arb-lego

#### G:fg-gratis · `data/fact_groups.json:1439` (also used under: velfaerd, uddannelse)

- Title DA: Gratis eller betale?
- Title EN: Free or pay?
- Columns DA: Ydelse | Gratis?
- Columns EN: Service | Free?
- Rows (DA / EN, one per row):
  - DA: Læge (voksne) | Ja
    EN: Doctor (adults) | Yes
  - DA: Hospital | Ja
    EN: Hospital | Yes
  - DA: Tandlæge (voksne) | Nej – man betaler en del selv
    EN: Dentist (adults) | No – you pay part yourself
  - DA: Tandlæge (børn og unge) | Ja (per 2026: til man fylder 22)
    EN: Dentist (children and young people) | Yes (per 2026: until you turn 22)
  - DA: Børnevacciner (MFR, HPV, stivkrampe) | Ja
    EN: Child vaccines (MMR, HPV, tetanus) | Yes
  - DA: Folkebibliotek – låne bøger | Ja
    EN: Public library – borrowing books | Yes
  - DA: Offentligt gymnasium | Ja
    EN: Public gymnasium | Yes
  - DA: Friskole / privatskole | Nej – forældre betaler en del
    EN: Free school / private school | No – parents pay part
  - DA: Fagforening | Nej – man betaler kontingent
    EN: Trade union | No – you pay a fee
- Mnemonic DA: Sundhed betales via skat – men tandlægen for voksne og fagforening/privatskole koster penge.
- Mnemonic EN: Health is paid through taxes – but the dentist for adults and trade unions/private schools cost money.
- Cluster links: vel-laege, vel-tandlaege, vel-vaccine, vel-bibliotek, udd-gymnasium-gratis, udd-friskole-betale, arb-fagforening-pris, vel-sundhed-skat

- G:fg-ja-nej – full entry above under topic demokrati (also used here)
### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:arb-tillidsrepraesentant · `data/clusters.json:476` · asked 7× (2016-12, 2018-06, 2018-11, 2019-11, 2020-11, 2021-11, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Tillidsrepræsentanten vælges af medarbejderne (de ansatte).  (`clusters.json:478`)
- Fact EN: The union representative (tillidsrepræsentant) is elected by the employees.  (`clusters.json:479`)
- Canonical question DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:501`)
- Canonical question EN: Who elects a union representative at a workplace?  (`:502`)
- Canonical answer DA: Medarbejderne  (`:503`)
- Canonical answer EN: The employees  (`:504`)
- Variants:
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:507`)
    Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?
    A DA: Medarbejderne
    A EN: The employees
    Question ids: 2016-12-q3, 2018-06-q6, 2018-11-q22, 2020-11-q14, 2021-11-q17, 2024-11-q1
  - Q DA: Af hvem bliver tillidsrepræsentanten på en arbejdsplads valgt?  (`:521`)
    Q EN: By whom is the union representative at a workplace elected?
    A DA: Medarbejderne
    A EN: The employees
    Question ids: 2019-11-q3
- Trap note DA: Kun medarbejderne – IKKE arbejdsgiveren og IKKE 'medarbejderne og arbejdsgiveren i fællesskab'.  (`:530`)
- Trap note EN: Only the employees – NOT the employer and NOT 'the employees and the employer together'.
- Current note DA: (empty)  (`:532`)
- Current note EN: (empty)

- **Q:2016-12-q3** · `data/questions.json:69` · exam 2016-12 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:73`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:98`)
  - Option A DA: Medarbejderne.  (`:77`) · EN: The employees
  - Option B DA: Medarbejderne og arbejdsgiveren i forening.  (`:82`) · EN: The employees and the employer jointly
  - Option C DA: Arbejdsgiveren.  (`:87`) · EN: The employer
  - Correct (`:91`): A
  - Correct text: A) Medarbejderne. / The employees
  - image_note: null
- **Q:2018-06-q6** · `data/questions.json:2526` · exam 2018-06 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:2530`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:2555`)
  - Option A DA: Medarbejderne og arbejdsgiveren i fællesskab  (`:2534`) · EN: The employees and the employer together
  - Option B DA: Arbejdsgiveren  (`:2539`) · EN: The employer
  - Option C DA: Medarbejderne  (`:2544`) · EN: The employees
  - Correct (`:2548`): C
  - Correct text: C) Medarbejderne / The employees
  - image_note: null
- **Q:2018-11-q22** · `data/questions.json:3839` · exam 2018-11 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:3843`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:3868`)
  - Option A DA: Medarbejderne  (`:3847`) · EN: The employees
  - Option B DA: Medarbejderne og arbejdsgiveren i forening  (`:3852`) · EN: The employees and the employer jointly
  - Option C DA: Arbejdsgiveren  (`:3857`) · EN: The employer
  - Correct (`:3861`): A
  - Correct text: A) Medarbejderne / The employees
  - image_note: null
- **Q:2019-11-q3** · `data/questions.json:4842` · exam 2019-11 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Af hvem bliver tillidsrepræsentanten på en arbejdsplads valgt?  (`:4846`)
  - Q EN: By whom is the union representative at a workplace elected?  (`:4871`)
  - Option A DA: Medarbejderne og arbejdsgiveren i fællesskab  (`:4850`) · EN: The employees and the employer together
  - Option B DA: Medarbejderne  (`:4855`) · EN: The employees
  - Option C DA: Arbejdsgiveren  (`:4860`) · EN: The employer
  - Correct (`:4864`): B
  - Correct text: B) Medarbejderne / The employees
  - image_note: null
- **Q:2020-11-q14** · `data/questions.json:6765` · exam 2020-11 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:6769`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:6789`)
  - Option A DA: Arbejdsgiveren  (`:6773`) · EN: The employer
  - Option B DA: Medarbejderne  (`:6778`) · EN: The employees
  - Correct (`:6782`): B
  - Correct text: B) Medarbejderne / The employees
  - image_note: null
- **Q:2021-11-q17** · `data/questions.json:8404` · exam 2021-11 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:8408`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:8433`)
  - Option A DA: Medarbejderne og arbejdsgiveren i fællesskab  (`:8412`) · EN: The employees and the employer together
  - Option B DA: Arbejdsgiveren  (`:8417`) · EN: The employer
  - Option C DA: Medarbejderne  (`:8422`) · EN: The employees
  - Correct (`:8426`): C
  - Correct text: C) Medarbejderne / The employees
  - image_note: null
- **Q:2024-11-q1** · `data/questions.json:12656` · exam 2024-11 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem vælger en tillidsrepræsentant på en arbejdsplads?  (`:12660`)
  - Q EN: Who elects a union representative (tillidsrepræsentant) at a workplace?  (`:12685`)
  - Option A DA: Medarbejderne og arbejdsgiveren i fællesskab  (`:12664`) · EN: The employees and the employer together
  - Option B DA: Arbejdsgiveren  (`:12669`) · EN: The employer
  - Option C DA: Medarbejderne  (`:12674`) · EN: The employees
  - Correct (`:12678`): C
  - Correct text: C) Medarbejderne / The employees
  - image_note: null

#### C:arb-vestas · `data/clusters.json:688` · asked 7× (2016-12, 2018-06, 2019-06, 2019-11, 2020-11, 2021-11, 2023-05) · frequent: yes · last asked: 2023-05

- Fact DA: Vestas producerer vindmøller.  (`clusters.json:690`)
- Fact EN: Vestas makes wind turbines.  (`clusters.json:691`)
- Canonical question DA: Hvilken virksomhed producerer vindmøller?  (`:713`)
- Canonical question EN: Which company makes wind turbines?  (`:714`)
- Canonical answer DA: Vestas  (`:715`)
- Canonical answer EN: Vestas  (`:716`)
- Variants:
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:719`)
    Q EN: Which of the following companies makes wind turbines?
    A DA: Vestas
    A EN: Vestas
    Question ids: 2016-12-q12, 2018-06-q24, 2020-11-q17, 2021-11-q11, 2023-05-q6
  - Q DA: Hvad fremstiller den danske virksomhed Vestas?  (`:732`)
    Q EN: What does the Danish company Vestas make?
    A DA: Vindmøller
    A EN: Wind turbines
    Question ids: 2019-06-q22
  - Q DA: Hvilken virksomhed producerer vindmøller?  (`:741`)
    Q EN: Which company makes wind turbines?
    A DA: Vestas
    A EN: Vestas
    Question ids: 2019-11-q12
- Trap note DA: Spørgsmålet kan også være omvendt: 'Hvad fremstiller Vestas?' = Vindmøller.  (`:750`)
- Trap note EN: The question can also be reversed: 'What does Vestas make?' = Wind turbines.
- Current note DA: (empty)  (`:752`)
- Current note EN: (empty)

- **Q:2016-12-q12** · `data/questions.json:346` · exam 2016-12 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:350`)
  - Q EN: Which of the following companies makes wind turbines?  (`:375`)
  - Option A DA: Novo Nordisk.  (`:354`) · EN: Novo Nordisk
  - Option B DA: Vestas.  (`:359`) · EN: Vestas
  - Option C DA: Mærsk.  (`:364`) · EN: Mærsk
  - Correct (`:368`): B
  - Correct text: B) Vestas. / Vestas
  - image_note: null
- **Q:2018-06-q24** · `data/questions.json:3100` · exam 2018-06 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:3104`)
  - Q EN: Which of the following companies makes wind turbines?  (`:3129`)
  - Option A DA: Novo Nordisk  (`:3108`) · EN: Novo Nordisk
  - Option B DA: Vestas  (`:3113`) · EN: Vestas
  - Option C DA: Arla  (`:3118`) · EN: Arla
  - Correct (`:3122`): B
  - Correct text: B) Vestas / Vestas
  - image_note: null
- **Q:2019-06-q22** · `data/questions.json:4644` · exam 2019-06 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad fremstiller den danske virksomhed Vestas?  (`:4648`)
  - Q EN: What does the Danish company Vestas make?  (`:4673`)
  - Option A DA: Medicin  (`:4652`) · EN: Medicine
  - Option B DA: Vindmøller  (`:4657`) · EN: Wind turbines
  - Option C DA: Mejeriprodukter  (`:4662`) · EN: Dairy products
  - Correct (`:4666`): B
  - Correct text: B) Vindmøller / Wind turbines
  - image_note: null
- **Q:2019-11-q12** · `data/questions.json:5124` · exam 2019-11 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken virksomhed producerer vindmøller?  (`:5128`)
  - Q EN: Which company makes wind turbines?  (`:5153`)
  - Option A DA: Novo Nordisk  (`:5132`) · EN: Novo Nordisk
  - Option B DA: Vestas  (`:5137`) · EN: Vestas
  - Option C DA: Velux  (`:5142`) · EN: Velux
  - Correct (`:5146`): B
  - Correct text: B) Vestas / Vestas
  - image_note: null
- **Q:2020-11-q17** · `data/questions.json:6854` · exam 2020-11 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:6858`)
  - Q EN: Which of the following companies makes wind turbines?  (`:6883`)
  - Option A DA: Novo Nordisk  (`:6862`) · EN: Novo Nordisk
  - Option B DA: Vestas  (`:6867`) · EN: Vestas
  - Option C DA: Arla  (`:6872`) · EN: Arla
  - Correct (`:6876`): B
  - Correct text: B) Vestas / Vestas
  - image_note: null
- **Q:2021-11-q11** · `data/questions.json:8211` · exam 2021-11 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:8215`)
  - Q EN: Which of the following companies makes wind turbines?  (`:8240`)
  - Option A DA: Vestas  (`:8219`) · EN: Vestas
  - Option B DA: Novo Nordisk  (`:8224`) · EN: Novo Nordisk
  - Option C DA: Arla  (`:8229`) · EN: Arla
  - Correct (`:8233`): A
  - Correct text: A) Vestas / Vestas
  - image_note: null
- **Q:2023-05-q6** · `data/questions.json:10426` · exam 2023-05 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer vindmøller?  (`:10430`)
  - Q EN: Which of the following companies makes wind turbines?  (`:10455`)
  - Option A DA: Novo Nordisk  (`:10434`) · EN: Novo Nordisk
  - Option B DA: Arla  (`:10439`) · EN: Arla
  - Option C DA: Vestas  (`:10444`) · EN: Vestas
  - Correct (`:10448`): C
  - Correct text: C) Vestas / Vestas
  - image_note: null

#### C:arb-novo · `data/clusters.json:837` · asked 6× (2017-06, 2018-11, 2020-06, 2021-06, 2022-11, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: Novo Nordisk producerer medicin (fx insulin).  (`clusters.json:839`)
- Fact EN: Novo Nordisk makes medicine (e.g. insulin).  (`clusters.json:840`)
- Canonical question DA: Hvad producerer Novo Nordisk?  (`:860`)
- Canonical question EN: What does Novo Nordisk make?  (`:861`)
- Canonical answer DA: Medicin  (`:862`)
- Canonical answer EN: Medicine  (`:863`)
- Variants:
  - Q DA: Hvad er det danske firma Novo Nordisk særlig kendt for at producere?  (`:866`)
    Q EN: What is the Danish company Novo Nordisk especially known for producing?
    A DA: Medicin
    A EN: Medicine
    Question ids: 2017-06-q17, 2021-06-q12
  - Q DA: Hvilken af følgende virksomheder producerer medicin?  (`:876`)
    Q EN: Which of the following companies makes medicine?
    A DA: Novo Nordisk
    A EN: Novo Nordisk
    Question ids: 2018-11-q11
  - Q DA: Hvilket af følgende firmaer producerer medicin?  (`:885`)
    Q EN: Which of the following companies makes medicine?
    A DA: Novo Nordisk
    A EN: Novo Nordisk
    Question ids: 2020-06-q11, 2022-11-q8
  - Q DA: Hvad producerer virksomheden Novo Nordisk primært?  (`:895`)
    Q EN: What does the company Novo Nordisk mainly produce?
    A DA: Medicin
    A EN: Medicine
    Question ids: 2025-05-q9
- Trap note DA: Spørgsmålet kan også være omvendt: 'Hvilken virksomhed producerer medicin?' = Novo Nordisk.  (`:904`)
- Trap note EN: The question can also be reversed: 'Which company makes medicine?' = Novo Nordisk.
- Current note DA: (empty)  (`:906`)
- Current note EN: (empty)

- **Q:2017-06-q17** · `data/questions.json:1296` · exam 2017-06 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er det danske firma Novo Nordisk særlig kendt for at producere?  (`:1300`)
  - Q EN: What is the Danish company Novo Nordisk especially known for producing?  (`:1325`)
  - Option A DA: Høreapparater.  (`:1304`) · EN: Hearing aids
  - Option B DA: Vindmøller.  (`:1309`) · EN: Wind turbines
  - Option C DA: Medicin.  (`:1314`) · EN: Medicine
  - Correct (`:1318`): C
  - Correct text: C) Medicin. / Medicine
  - image_note: null
- **Q:2018-11-q11** · `data/questions.json:3481` · exam 2018-11 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende virksomheder producerer medicin?  (`:3485`)
  - Q EN: Which of the following companies makes medicine?  (`:3510`)
  - Option A DA: Novo Nordisk  (`:3489`) · EN: Novo Nordisk
  - Option B DA: Mærsk  (`:3494`) · EN: Mærsk
  - Option C DA: Vestas  (`:3499`) · EN: Vestas
  - Correct (`:3503`): A
  - Correct text: A) Novo Nordisk / Novo Nordisk
  - image_note: null
- **Q:2020-06-q11** · `data/questions.json:5881` · exam 2020-06 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende firmaer producerer medicin?  (`:5885`)
  - Q EN: Which of the following companies makes medicine?  (`:5910`)
  - Option A DA: Vestas  (`:5889`) · EN: Vestas
  - Option B DA: Novo Nordisk  (`:5894`) · EN: Novo Nordisk
  - Option C DA: Arla  (`:5899`) · EN: Arla
  - Correct (`:5903`): B
  - Correct text: B) Novo Nordisk / Novo Nordisk
  - image_note: null
- **Q:2021-06-q12** · `data/questions.json:7479` · exam 2021-06 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er det danske firma Novo Nordisk særlig kendt for at producere?  (`:7483`)
  - Q EN: What is the Danish company Novo Nordisk especially known for producing?  (`:7508`)
  - Option A DA: Legetøj  (`:7487`) · EN: Toys
  - Option B DA: Vindmøller  (`:7492`) · EN: Wind turbines
  - Option C DA: Medicin  (`:7497`) · EN: Medicine
  - Correct (`:7501`): C
  - Correct text: C) Medicin / Medicine
  - image_note: null
- **Q:2022-11-q8** · `data/questions.json:9702` · exam 2022-11 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende firmaer producerer medicin?  (`:9706`)
  - Q EN: Which of the following companies makes medicine?  (`:9731`)
  - Option A DA: Vestas  (`:9710`) · EN: Vestas
  - Option B DA: Novo Nordisk  (`:9715`) · EN: Novo Nordisk
  - Option C DA: Arla  (`:9720`) · EN: Arla
  - Correct (`:9724`): B
  - Correct text: B) Novo Nordisk / Novo Nordisk
  - image_note: null
- **Q:2025-05-q9** · `data/questions.json:13700` · exam 2025-05 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad producerer virksomheden Novo Nordisk primært?  (`:13704`)
  - Q EN: What does the company Novo Nordisk mainly produce?  (`:13729`)
  - Option A DA: Vindmøller  (`:13708`) · EN: Wind turbines
  - Option B DA: Legetøj  (`:13713`) · EN: Toys
  - Option C DA: Medicin  (`:13718`) · EN: Medicine
  - Correct (`:13722`): C
  - Correct text: C) Medicin / Medicine
  - image_note: null

#### C:arb-37-timer · `data/clusters.json:967` · asked 6× (2016-12, 2018-06, 2019-11, 2020-11, 2022-11, 2024-05) · frequent: yes · last asked: 2024-05

- Fact DA: Den normale arbejdstid ved fuldtid er 37 timer om ugen.  (`clusters.json:969`)
- Fact EN: Normal full-time working hours are 37 hours a week.  (`clusters.json:970`)
- Canonical question DA: Hvad er den mest almindelige arbejdstid ved fuldtidsarbejde?  (`:990`)
- Canonical question EN: What are the most common full-time working hours?  (`:991`)
- Canonical answer DA: 37 timer om ugen  (`:992`)
- Canonical answer EN: 37 hours a week  (`:993`)
- Variants:
  - Q DA: Hvad er normalt den almindelige ugentlige arbejdstid ved et fuldtidsarbejde?  (`:996`)
    Q EN: What are the normal weekly working hours in a full-time job?
    A DA: 37 timer om ugen
    A EN: 37 hours a week
    Question ids: 2016-12-q13
  - Q DA: Hvad er den mest almindelige arbejdstid normalt ved fuldtidsarbejde?  (`:1005`)
    Q EN: What are the most common working hours in full-time work?
    A DA: ca. 37 timer
    A EN: About 37 hours
    Question ids: 2018-06-q5
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuldtid?  (`:1014`)
    Q EN: What are the most common working hours if you are employed full-time?
    A DA: 37 timer om ugen
    A EN: 37 hours a week
    Question ids: 2019-11-q7, 2020-11-q16
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuld tid?  (`:1024`)
    Q EN: What are the most common working hours if you are employed full-time?
    A DA: 37 timer om ugen
    A EN: 37 hours a week
    Question ids: 2022-11-q3, 2024-05-q24
- Trap note DA: (empty)  (`:1034`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:1036`)
- Current note EN: (empty)

- **Q:2016-12-q13** · `data/questions.json:379` · exam 2016-12 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er normalt den almindelige ugentlige arbejdstid ved et fuldtidsarbejde?  (`:383`)
  - Q EN: What are the normal weekly working hours in a full-time job?  (`:408`)
  - Option A DA: 27 timer om ugen.  (`:387`) · EN: 27 hours a week
  - Option B DA: 37 timer om ugen.  (`:392`) · EN: 37 hours a week
  - Option C DA: 47 timer om ugen.  (`:397`) · EN: 47 hours a week
  - Correct (`:401`): B
  - Correct text: B) 37 timer om ugen. / 37 hours a week
  - image_note: null
- **Q:2018-06-q5** · `data/questions.json:2493` · exam 2018-06 nr. 5 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den mest almindelige arbejdstid normalt ved fuldtidsarbejde?  (`:2497`)
  - Q EN: What are the most common working hours in full-time work?  (`:2522`)
  - Option A DA: ca. 33 timer  (`:2501`) · EN: About 33 hours
  - Option B DA: ca. 37 timer  (`:2506`) · EN: About 37 hours
  - Option C DA: ca. 41 timer  (`:2511`) · EN: About 41 hours
  - Correct (`:2515`): B
  - Correct text: B) ca. 37 timer / About 37 hours
  - image_note: null
- **Q:2019-11-q7** · `data/questions.json:4969` · exam 2019-11 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuldtid?  (`:4973`)
  - Q EN: What are the most common working hours if you are employed full-time?  (`:4998`)
  - Option A DA: 37 timer om ugen  (`:4977`) · EN: 37 hours a week
  - Option B DA: 40 timer om ugen  (`:4982`) · EN: 40 hours a week
  - Option C DA: 43 timer om ugen  (`:4987`) · EN: 43 hours a week
  - Correct (`:4991`): A
  - Correct text: A) 37 timer om ugen / 37 hours a week
  - image_note: null
- **Q:2020-11-q16** · `data/questions.json:6821` · exam 2020-11 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuldtid?  (`:6825`)
  - Q EN: What are the most common working hours if you are employed full-time?  (`:6850`)
  - Option A DA: 37 timer om ugen  (`:6829`) · EN: 37 hours a week
  - Option B DA: 42 timer om ugen  (`:6834`) · EN: 42 hours a week
  - Option C DA: 48 timer om ugen  (`:6839`) · EN: 48 hours a week
  - Correct (`:6843`): A
  - Correct text: A) 37 timer om ugen / 37 hours a week
  - image_note: null
- **Q:2022-11-q3** · `data/questions.json:9547` · exam 2022-11 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuld tid?  (`:9551`)
  - Q EN: What are the most common working hours if you are employed full-time?  (`:9576`)
  - Option A DA: 32 timer om ugen  (`:9555`) · EN: 32 hours a week
  - Option B DA: 37 timer om ugen  (`:9560`) · EN: 37 hours a week
  - Option C DA: 42 timer om ugen  (`:9565`) · EN: 42 hours a week
  - Correct (`:9569`): B
  - Correct text: B) 37 timer om ugen / 37 hours a week
  - image_note: null
- **Q:2024-05-q24** · `data/questions.json:12595` · exam 2024-05 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den mest almindelige arbejdstid, hvis man er ansat på fuld tid?  (`:12599`)
  - Q EN: What are the most common working hours if you are employed full-time?  (`:12624`)
  - Option A DA: 32 timer om ugen  (`:12603`) · EN: 32 hours a week
  - Option B DA: 37 timer om ugen  (`:12608`) · EN: 37 hours a week
  - Option C DA: 43 timer om ugen  (`:12613`) · EN: 43 hours a week
  - Correct (`:12617`): B
  - Correct text: B) 37 timer om ugen / 37 hours a week
  - image_note: null

#### C:arb-akasse-dagpenge · `data/clusters.json:1499` · asked 5× (2017-11, 2021-11, 2022-06, 2023-05, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: Man skal være medlem af en a-kasse for at få dagpenge, hvis man bliver arbejdsløs.  (`clusters.json:1501`)
- Fact EN: You must be a member of an a-kasse (unemployment insurance fund) to get dagpenge (unemployment benefit) if you become unemployed.  (`clusters.json:1502`)
- Canonical question DA: Kan man få dagpenge ved arbejdsløshed uden at være medlem af en a-kasse?  (`:1520`)
- Canonical question EN: Can you get unemployment benefit without being a member of an a-kasse?  (`:1521`)
- Canonical answer DA: Nej  (`:1522`)
- Canonical answer EN: No  (`:1523`)
- Variants:
  - Q DA: Kan man få dagpenge ved arbejdsløshed uden at være medlem af en arbejdsløshedskasse?  (`:1526`)
    Q EN: Can you get unemployment benefit (dagpenge) without being a member of an unemployment insurance fund (a-kasse)?
    A DA: Nej
    A EN: No
    Question ids: 2017-11-q18, 2022-06-q14
  - Q DA: Kan man få arbejdsløshedsdagpenge uden at være medlem af en arbejdsløshedskasse (A-kasse)?  (`:1536`)
    Q EN: Can you get unemployment benefit (dagpenge) without being a member of an unemployment insurance fund (a-kasse)?
    A DA: Nej
    A EN: No
    Question ids: 2021-11-q1
  - Q DA: Kan man få arbejdsløshedsdagpenge, hvis man ikke er medlem af en arbejdsløshedskasse (a-kasse)?  (`:1545`)
    Q EN: Can you get unemployment benefit if you are not a member of an unemployment insurance fund (a-kasse)?
    A DA: Nej
    A EN: No
    Question ids: 2023-05-q25
  - Q DA: Hvad skal man være medlem af en a-kasse for at kunne få?  (`:1554`)
    Q EN: What must you be a member of an a-kasse to be able to get?
    A DA: Arbejdsløshedsdagpenge
    A EN: Unemployment benefit (dagpenge)
    Question ids: 2025-05-q3
- Trap note DA: Omvendt spørgsmål: 'Hvad skal man være medlem af en a-kasse for at få?' = Arbejdsløshedsdagpenge (ikke kontanthjælp, ikke førtidspension).  (`:1563`)
- Trap note EN: Reverse question: 'What must you be a member of an a-kasse to get?' = Unemployment benefit (not social assistance, not early pension).
- Current note DA: (empty)  (`:1565`)
- Current note EN: (empty)

- **Q:2017-11-q18** · `data/questions.json:2114` · exam 2017-11 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Kan man få dagpenge ved arbejdsløshed uden at være medlem af en arbejdsløshedskasse?  (`:2118`)
  - Q EN: Can you get unemployment benefit (dagpenge) without being a member of an unemployment insurance fund (a-kasse)?  (`:2138`)
  - Option A DA: Nej  (`:2122`) · EN: No
  - Option B DA: Ja  (`:2127`) · EN: Yes
  - Correct (`:2131`): A
  - Correct text: A) Nej / No
  - image_note: null
- **Q:2021-11-q1** · `data/questions.json:7906` · exam 2021-11 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan man få arbejdsløshedsdagpenge uden at være medlem af en arbejdsløshedskasse (A-kasse)?  (`:7910`)
  - Q EN: Can you get unemployment benefit (dagpenge) without being a member of an unemployment insurance fund (a-kasse)?  (`:7930`)
  - Option A DA: Ja  (`:7914`) · EN: Yes
  - Option B DA: Nej  (`:7919`) · EN: No
  - Correct (`:7923`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2022-06-q14** · `data/questions.json:9105` · exam 2022-06 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Kan man få dagpenge ved arbejdsløshed uden at være medlem af en arbejdsløshedskasse?  (`:9109`)
  - Q EN: Can you get unemployment benefit (dagpenge) without being a member of an unemployment insurance fund (a-kasse)?  (`:9129`)
  - Option A DA: Ja  (`:9113`) · EN: Yes
  - Option B DA: Nej  (`:9118`) · EN: No
  - Correct (`:9122`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2023-05-q25** · `data/questions.json:11028` · exam 2023-05 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan man få arbejdsløshedsdagpenge, hvis man ikke er medlem af en arbejdsløshedskasse (a-kasse)?  (`:11032`)
  - Q EN: Can you get unemployment benefit if you are not a member of an unemployment insurance fund (a-kasse)?  (`:11052`)
  - Option A DA: Ja  (`:11036`) · EN: Yes
  - Option B DA: Nej  (`:11041`) · EN: No
  - Correct (`:11045`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2025-05-q3** · `data/questions.json:13507` · exam 2025-05 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad skal man være medlem af en a-kasse for at kunne få?  (`:13511`)
  - Q EN: What must you be a member of an a-kasse to be able to get?  (`:13536`)
  - Option A DA: Arbejdsløshedsdagpenge  (`:13515`) · EN: Unemployment benefit (dagpenge)
  - Option B DA: Kontanthjælp  (`:13520`) · EN: Social assistance (kontanthjælp)
  - Option C DA: Førtidspension  (`:13525`) · EN: Early retirement / disability pension (førtidspension)
  - Correct (`:13529`): A
  - Correct text: A) Arbejdsløshedsdagpenge / Unemployment benefit (dagpenge)
  - image_note: null

#### C:arb-overenskomst · `data/clusters.json:1569` · asked 5× (2017-06, 2017-11, 2019-06, 2020-11, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: En kollektiv overenskomst er en aftale mellem fagforeninger og arbejdsgivere (fx DA og LO/FH) om løn, arbejdstid og ferie.  (`clusters.json:1571`)
- Fact EN: A collective agreement is an agreement between trade unions and employers (e.g. DA and LO/FH) on pay, working hours and holidays.  (`clusters.json:1572`)
- Canonical question DA: Hvad er en kollektiv overenskomst?  (`:1590`)
- Canonical question EN: What is a collective agreement?  (`:1591`)
- Canonical answer DA: En aftale mellem fagforeninger og arbejdsgivere  (`:1592`)
- Canonical answer EN: An agreement between trade unions and employers  (`:1593`)
- Variants:
  - Q DA: DA og LO indgår aftaler for store dele af arbejdsmarkedet. Aftalerne drejer sig om fx løn, arbejdstid og ferie. Hvad hedder disse aftaler?  (`:1596`)
    Q EN: DA (the employers' confederation) and LO (the trade-union confederation) make agreements for large parts of the labour market. The agreements cover e.g. pay, working hours and holidays. What are these agreements called?
    A DA: Kollektive overenskomster
    A EN: Collective agreements
    Question ids: 2017-06-q5
  - Q DA: Hvad er en kollektiv overenskomst?  (`:1605`)
    Q EN: What is a collective agreement (kollektiv overenskomst)?
    A DA: En aftale mellem fagforeninger og arbejdsgivere
    A EN: An agreement between trade unions and employers
    Question ids: 2017-11-q24, 2019-06-q8
  - Q DA: Hvad er en kollektiv overenskomst for privat ansatte?  (`:1615`)
    Q EN: What is a collective agreement for private-sector employees?
    A DA: En aftale mellem fagforeninger og arbejdsgiverorganisationer
    A EN: An agreement between trade unions and employers' organisations
    Question ids: 2020-11-q24
  - Q DA: Hvad bestemmer overenskomster på arbejdsmarkedet blandt andet?  (`:1624`)
    Q EN: What, among other things, do collective agreements on the labour market decide?
    A DA: Arbejdstid
    A EN: Working hours
    Question ids: 2025-05-q1
- Trap note DA: Overenskomster bestemmer fx arbejdstid og løn – IKKE skatter. Staten er ikke part.  (`:1633`)
- Trap note EN: Collective agreements decide e.g. working hours and pay – NOT taxes. The state is not a party.
- Current note DA: (empty)  (`:1635`)
- Current note EN: (empty)

- **Q:2017-06-q5** · `data/questions.json:920` · exam 2017-06 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: DA og LO indgår aftaler for store dele af arbejdsmarkedet. Aftalerne drejer sig om fx løn, arbejdstid og ferie. Hvad hedder disse aftaler?  (`:924`)
  - Q EN: DA (the employers' confederation) and LO (the trade-union confederation) make agreements for large parts of the labour market. The agreements cover e.g. pay, working hours and holidays. What are these agreements called?  (`:944`)
  - Option A DA: Arbejdspladsvurderinger.  (`:928`) · EN: Workplace assessments (APV)
  - Option B DA: Kollektive overenskomster.  (`:933`) · EN: Collective agreements
  - Correct (`:937`): B
  - Correct text: B) Kollektive overenskomster. / Collective agreements
  - image_note: null
- **Q:2017-11-q24** · `data/questions.json:2305` · exam 2017-11 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er en kollektiv overenskomst?  (`:2309`)
  - Q EN: What is a collective agreement (kollektiv overenskomst)?  (`:2334`)
  - Option A DA: En aftale mellem fagforeninger og arbejdsgivere  (`:2313`) · EN: An agreement between trade unions and employers
  - Option B DA: En aftale mellem staten, regionerne og kommunerne  (`:2318`) · EN: An agreement between the state, the regions and the municipalities
  - Option C DA: En aftale mellem virksomheder og kommunalbestyrelser  (`:2323`) · EN: An agreement between companies and municipal councils
  - Correct (`:2327`): A
  - Correct text: A) En aftale mellem fagforeninger og arbejdsgivere / An agreement between trade unions and employers
  - image_note: null
- **Q:2019-06-q8** · `data/questions.json:4192` · exam 2019-06 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en kollektiv overenskomst?  (`:4196`)
  - Q EN: What is a collective agreement (kollektiv overenskomst)?  (`:4221`)
  - Option A DA: En aftale mellem fagforeninger og arbejdsgivere  (`:4200`) · EN: An agreement between trade unions and employers
  - Option B DA: En aftale mellem staten, regionerne og kommunerne  (`:4205`) · EN: An agreement between the state, the regions and the municipalities
  - Option C DA: En aftale mellem virksomheder og kommunalbestyrelser  (`:4210`) · EN: An agreement between companies and municipal councils
  - Correct (`:4214`): A
  - Correct text: A) En aftale mellem fagforeninger og arbejdsgivere / An agreement between trade unions and employers
  - image_note: null
- **Q:2020-11-q24** · `data/questions.json:7080` · exam 2020-11 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er en kollektiv overenskomst for privat ansatte?  (`:7084`)
  - Q EN: What is a collective agreement for private-sector employees?  (`:7109`)
  - Option A DA: En aftale mellem virksomheder og kommunalbestyrelser  (`:7088`) · EN: An agreement between companies and municipal councils
  - Option B DA: En aftale mellem staten, regionerne og kommunerne  (`:7093`) · EN: An agreement between the state, the regions and the municipalities
  - Option C DA: En aftale mellem fagforeninger og arbejdsgiverorganisationer  (`:7098`) · EN: An agreement between trade unions and employers' organisations
  - Correct (`:7102`): C
  - Correct text: C) En aftale mellem fagforeninger og arbejdsgiverorganisationer / An agreement between trade unions and employers' organisations
  - image_note: null
- **Q:2025-05-q1** · `data/questions.json:13446` · exam 2025-05 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad bestemmer overenskomster på arbejdsmarkedet blandt andet?  (`:13450`)
  - Q EN: What, among other things, do collective agreements on the labour market decide?  (`:13470`)
  - Option A DA: Skatter  (`:13454`) · EN: Taxes
  - Option B DA: Arbejdstid  (`:13459`) · EN: Working hours
  - Correct (`:13463`): B
  - Correct text: B) Arbejdstid / Working hours
  - image_note: null

#### C:arb-ferie · `data/clusters.json:2259` · asked 4× (2019-06, 2023-05, 2025-05, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Lønmodtagere har normalt ret til 5-6 ugers ferie om året.  (`clusters.json:2261`)
- Fact EN: Employees are normally entitled to 5–6 weeks of holiday a year.  (`clusters.json:2262`)
- Canonical question DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager?  (`:2278`)
- Canonical question EN: How many weeks of holiday is an employee normally entitled to?  (`:2279`)
- Canonical answer DA: 5-6 uger  (`:2280`)
- Canonical answer EN: 5–6 weeks  (`:2281`)
- Variants:
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager i Danmark?  (`:2284`)
    Q EN: How many weeks of holiday is an employee in Denmark normally entitled to?
    A DA: 5-6 ugers ferie
    A EN: 5–6 weeks' holiday
    Question ids: 2019-06-q24
  - Q DA: Hvor mange ugers ferie har lønmodtagere på det danske arbejdsmarked normalt ret til?  (`:2293`)
    Q EN: How many weeks of holiday are employees on the Danish labour market normally entitled to?
    A DA: 5-6 uger om året
    A EN: 5–6 weeks a year
    Question ids: 2023-05-q23
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager?  (`:2302`)
    Q EN: How many weeks of holiday is an employee normally entitled to?
    A DA: 5-6 uger om året
    A EN: 5–6 weeks a year
    Question ids: 2025-05-q2
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager?  (`:2302`)
    Q EN: How many weeks of holiday is an employee normally entitled to?
    A DA: 5-6 uger
    A EN: 5–6 weeks
    Question ids: 2026-06-q9
- Trap note DA: (empty)  (`:2320`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:2322`)
- Current note EN: (empty)

- **Q:2019-06-q24** · `data/questions.json:4710` · exam 2019-06 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager i Danmark?  (`:4714`)
  - Q EN: How many weeks of holiday is an employee in Denmark normally entitled to?  (`:4739`)
  - Option A DA: 1-2 ugers ferie  (`:4718`) · EN: 1–2 weeks' holiday
  - Option B DA: 3-4 ugers ferie  (`:4723`) · EN: 3–4 weeks' holiday
  - Option C DA: 5-6 ugers ferie  (`:4728`) · EN: 5–6 weeks' holiday
  - Correct (`:4732`): C
  - Correct text: C) 5-6 ugers ferie / 5–6 weeks' holiday
  - image_note: null
- **Q:2023-05-q23** · `data/questions.json:10962` · exam 2023-05 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange ugers ferie har lønmodtagere på det danske arbejdsmarked normalt ret til?  (`:10966`)
  - Q EN: How many weeks of holiday are employees on the Danish labour market normally entitled to?  (`:10991`)
  - Option A DA: 1-2 uger om året  (`:10970`) · EN: 1–2 weeks a year
  - Option B DA: 3-4 uger om året  (`:10975`) · EN: 3–4 weeks a year
  - Option C DA: 5-6 uger om året  (`:10980`) · EN: 5–6 weeks a year
  - Correct (`:10984`): C
  - Correct text: C) 5-6 uger om året / 5–6 weeks a year
  - image_note: null
- **Q:2025-05-q2** · `data/questions.json:13474` · exam 2025-05 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager?  (`:13478`)
  - Q EN: How many weeks of holiday is an employee normally entitled to?  (`:13503`)
  - Option A DA: 1-2 uger om året  (`:13482`) · EN: 1–2 weeks a year
  - Option B DA: 3-4 uger om året  (`:13487`) · EN: 3–4 weeks a year
  - Option C DA: 5-6 uger om året  (`:13492`) · EN: 5–6 weeks a year
  - Correct (`:13496`): C
  - Correct text: C) 5-6 uger om året / 5–6 weeks a year
  - image_note: null
- **Q:2026-06-q9** · `data/questions.json:15290` · exam 2026-06 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange ugers ferie har man normalt ret til som lønmodtager?  (`:15294`)
  - Q EN: How many weeks of holiday is an employee normally entitled to?  (`:15319`)
  - Option A DA: 3-4 uger  (`:15298`) · EN: 3–4 weeks
  - Option B DA: 5-6 uger  (`:15303`) · EN: 5–6 weeks
  - Option C DA: 7-8 uger  (`:15308`) · EN: 7–8 weeks
  - Correct (`:15312`): B
  - Correct text: B) 5-6 uger / 5–6 weeks
  - image_note: null

#### C:arb-lego · `data/clusters.json:2326` · asked 4× (2017-11, 2022-06, 2023-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: LEGO fremstiller legetøj (byggeklodser).  (`clusters.json:2328`)
- Fact EN: LEGO makes toys (building bricks).  (`clusters.json:2329`)
- Canonical question DA: Hvad fremstiller den danske virksomhed LEGO?  (`:2345`)
- Canonical question EN: What does the Danish company LEGO make?  (`:2346`)
- Canonical answer DA: Legetøj / byggeklodser  (`:2347`)
- Canonical answer EN: Toys / building bricks  (`:2348`)
- Variants:
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:2351`)
    Q EN: What does the Danish company LEGO make?
    A DA: Byggeklodser
    A EN: Building bricks
    Question ids: 2017-11-q17, 2022-06-q19
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:2351`)
    Q EN: What does the Danish company LEGO make?
    A DA: Legetøj
    A EN: Toys
    Question ids: 2023-11-q17, 2026-06-q25
- Trap note DA: Svaret kan stå som 'Byggeklodser' eller 'Legetøj'. 'Insulin' er en fælde (det er Novo Nordisk).  (`:2371`)
- Trap note EN: The answer may be 'Building bricks' or 'Toys'. 'Insulin' is a trap (that is Novo Nordisk).
- Current note DA: (empty)  (`:2373`)
- Current note EN: (empty)

- **Q:2017-11-q17** · `data/questions.json:2081` · exam 2017-11 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:2085`)
  - Q EN: What does the Danish company LEGO make?  (`:2110`)
  - Option A DA: Insulin  (`:2089`) · EN: Insulin
  - Option B DA: Vindmøller  (`:2094`) · EN: Wind turbines
  - Option C DA: Byggeklodser  (`:2099`) · EN: Building bricks
  - Correct (`:2103`): C
  - Correct text: C) Byggeklodser / Building bricks
  - image_note: null
- **Q:2022-06-q19** · `data/questions.json:9265` · exam 2022-06 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:9269`)
  - Q EN: What does the Danish company LEGO make?  (`:9294`)
  - Option A DA: Insulin  (`:9273`) · EN: Insulin
  - Option B DA: Vindmøller  (`:9278`) · EN: Wind turbines
  - Option C DA: Byggeklodser  (`:9283`) · EN: Building bricks
  - Correct (`:9287`): C
  - Correct text: C) Byggeklodser / Building bricks
  - image_note: null
- **Q:2023-11-q17** · `data/questions.json:11559` · exam 2023-11 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:11563`)
  - Q EN: What does the Danish company LEGO make?  (`:11588`)
  - Option A DA: Insulin  (`:11567`) · EN: Insulin
  - Option B DA: Vindmøller  (`:11572`) · EN: Wind turbines
  - Option C DA: Legetøj  (`:11577`) · EN: Toys
  - Correct (`:11581`): C
  - Correct text: C) Legetøj / Toys
  - image_note: null
- **Q:2026-06-q25** · `data/questions.json:15788` · exam 2026-06 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad fremstiller den danske virksomhed LEGO?  (`:15792`)
  - Q EN: What does the Danish company LEGO make?  (`:15817`)
  - Option A DA: Insulin  (`:15796`) · EN: Insulin
  - Option B DA: Legetøj  (`:15801`) · EN: Toys
  - Option C DA: Vindmøller  (`:15806`) · EN: Wind turbines
  - Correct (`:15810`): B
  - Correct text: B) Legetøj / Toys
  - image_note: null

#### C:arb-gravid · `data/clusters.json:3085` · asked 4× (2017-06, 2020-06, 2021-06, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: En arbejdsgiver må ikke fyre en kvinde, fordi hun er gravid.  (`clusters.json:3087`)
- Fact EN: An employer may not fire a woman because she is pregnant.  (`clusters.json:3088`)
- Canonical question DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:3104`)
- Canonical question EN: May an employer fire a woman because she is pregnant?  (`:3105`)
- Canonical answer DA: Nej  (`:3106`)
- Canonical answer EN: No  (`:3107`)
- Variants:
  - Q DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:3110`)
    Q EN: May an employer fire a woman because she is pregnant?
    A DA: Nej
    A EN: No
    Question ids: 2017-06-q16, 2020-06-q9, 2021-06-q25, 2023-11-q6
- Trap note DA: (empty)  (`:3122`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3124`)
- Current note EN: (empty)

- **Q:2017-06-q16** · `data/questions.json:1268` · exam 2017-06 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:1272`)
  - Q EN: May an employer fire a woman because she is pregnant?  (`:1292`)
  - Option A DA: Ja.  (`:1276`) · EN: Yes
  - Option B DA: Nej.  (`:1281`) · EN: No
  - Correct (`:1285`): B
  - Correct text: B) Nej. / No
  - image_note: null
- **Q:2020-06-q9** · `data/questions.json:5820` · exam 2020-06 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:5824`)
  - Q EN: May an employer fire a woman because she is pregnant?  (`:5844`)
  - Option A DA: Ja  (`:5828`) · EN: Yes
  - Option B DA: Nej  (`:5833`) · EN: No
  - Correct (`:5837`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2021-06-q25** · `data/questions.json:7878` · exam 2021-06 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:7882`)
  - Q EN: May an employer fire a woman because she is pregnant?  (`:7902`)
  - Option A DA: Ja  (`:7886`) · EN: Yes
  - Option B DA: Nej  (`:7891`) · EN: No
  - Correct (`:7895`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2023-11-q6** · `data/questions.json:11216` · exam 2023-11 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en kvinde, fordi hun er gravid?  (`:11220`)
  - Q EN: May an employer fire a woman because she is pregnant?  (`:11240`)
  - Option A DA: Ja  (`:11224`) · EN: Yes
  - Option B DA: Nej  (`:11229`) · EN: No
  - Correct (`:11233`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:arb-fagforening-pris · `data/clusters.json:3713` · asked 4× (2016-12, 2018-11, 2019-11, 2021-06) · frequent: yes · last asked: 2021-06

- Fact DA: Det koster penge (kontingent) at være medlem af en fagforening.  (`clusters.json:3715`)
- Fact EN: It costs money (a membership fee) to be a member of a trade union.  (`clusters.json:3716`)
- Canonical question DA: Er det gratis at være medlem af en fagforening?  (`:3732`)
- Canonical question EN: Is it free to be a member of a trade union?  (`:3733`)
- Canonical answer DA: Nej  (`:3734`)
- Canonical answer EN: No  (`:3735`)
- Variants:
  - Q DA: Er det gratis at være medlem af en fagforening?  (`:3738`)
    Q EN: Is it free to be a member of a trade union?
    A DA: Nej
    A EN: No
    Question ids: 2016-12-q6, 2018-11-q7
  - Q DA: Er det normalt gratis at være medlem af en fagforening?  (`:3748`)
    Q EN: Is it normally free to be a member of a trade union?
    A DA: Nej
    A EN: No
    Question ids: 2019-11-q6, 2021-06-q6
- Trap note DA: Svaret er Nej, også når der står 'normalt'.  (`:3758`)
- Trap note EN: The answer is No, also when it says 'normally'.
- Current note DA: (empty)  (`:3760`)
- Current note EN: (empty)

- **Q:2016-12-q6** · `data/questions.json:168` · exam 2016-12 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det gratis at være medlem af en fagforening?  (`:172`)
  - Q EN: Is it free to be a member of a trade union?  (`:192`)
  - Option A DA: Ja.  (`:176`) · EN: Yes
  - Option B DA: Nej.  (`:181`) · EN: No
  - Correct (`:185`): B
  - Correct text: B) Nej. / No
  - image_note: null
- **Q:2018-11-q7** · `data/questions.json:3354` · exam 2018-11 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det gratis at være medlem af en fagforening?  (`:3358`)
  - Q EN: Is it free to be a member of a trade union?  (`:3378`)
  - Option A DA: Ja  (`:3362`) · EN: Yes
  - Option B DA: Nej  (`:3367`) · EN: No
  - Correct (`:3371`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2019-11-q6** · `data/questions.json:4941` · exam 2019-11 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det normalt gratis at være medlem af en fagforening?  (`:4945`)
  - Q EN: Is it normally free to be a member of a trade union?  (`:4965`)
  - Option A DA: Ja  (`:4949`) · EN: Yes
  - Option B DA: Nej  (`:4954`) · EN: No
  - Correct (`:4958`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2021-06-q6** · `data/questions.json:7296` · exam 2021-06 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det normalt gratis at være medlem af en fagforening?  (`:7300`)
  - Q EN: Is it normally free to be a member of a trade union?  (`:7320`)
  - Option A DA: Nej  (`:7304`) · EN: No
  - Option B DA: Ja  (`:7309`) · EN: Yes
  - Correct (`:7313`): A
  - Correct text: A) Nej / No
  - image_note: null

#### C:arb-samarbejdsudvalg · `data/clusters.json:3764` · asked 4× (2017-06, 2017-11, 2018-06, 2020-06) · frequent: yes · last asked: 2020-06

- Fact DA: Et samarbejdsudvalg er et samarbejde i en virksomhed mellem ledelsen og de ansatte.  (`clusters.json:3766`)
- Fact EN: A cooperation committee (samarbejdsudvalg) is cooperation in a company between management and employees.  (`clusters.json:3767`)
- Canonical question DA: Hvad er et samarbejdsudvalg?  (`:3783`)
- Canonical question EN: What is a cooperation committee?  (`:3784`)
- Canonical answer DA: Et samarbejde mellem ledelsen og de ansatte  (`:3785`)
- Canonical answer EN: Cooperation between management and employees  (`:3786`)
- Variants:
  - Q DA: Hvad er et samarbejdsudvalg?  (`:3789`)
    Q EN: What is a samarbejdsudvalg (cooperation committee)?
    A DA: Et samarbejde i en virksomhed mellem ledelsen og de ansatte
    A EN: Cooperation in a company between management and employees
    Question ids: 2017-06-q12, 2017-11-q16
  - Q DA: Hvem er medlem af et samarbejdsudvalg?  (`:3799`)
    Q EN: Who are the members of a cooperation committee (samarbejdsudvalg)?
    A DA: Repræsentanter for medarbejdere og ledelse
    A EN: Representatives of employees and management
    Question ids: 2018-06-q14
  - Q DA: Hvad er et samarbejdsudvalg på en arbejdsplads?  (`:3808`)
    Q EN: What is a cooperation committee (samarbejdsudvalg) at a workplace?
    A DA: Et samarbejde mellem ledelsen og de ansatte
    A EN: Cooperation between management and employees
    Question ids: 2020-06-q8
- Trap note DA: (empty)  (`:3817`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3819`)
- Current note EN: (empty)

- **Q:2017-06-q12** · `data/questions.json:1141` · exam 2017-06 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er et samarbejdsudvalg?  (`:1145`)
  - Q EN: What is a samarbejdsudvalg (cooperation committee)?  (`:1165`)
  - Option A DA: Et samarbejde i en virksomhed mellem ledelsen og de ansatte.  (`:1149`) · EN: Cooperation in a company between management and employees
  - Option B DA: Et samarbejde mellem ledere i det offentlige og private.  (`:1154`) · EN: Cooperation between managers in the public and private sectors
  - Correct (`:1158`): A
  - Correct text: A) Et samarbejde i en virksomhed mellem ledelsen og de ansatte. / Cooperation in a company between management and employees
  - image_note: null
- **Q:2017-11-q16** · `data/questions.json:2053` · exam 2017-11 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er et samarbejdsudvalg?  (`:2057`)
  - Q EN: What is a samarbejdsudvalg (cooperation committee)?  (`:2077`)
  - Option A DA: Et samarbejde i en virksomhed mellem ledelsen og de ansatte  (`:2061`) · EN: Cooperation in a company between management and employees
  - Option B DA: Et samarbejde mellem ledere i det offentlige og private  (`:2066`) · EN: Cooperation between managers in the public and private sectors
  - Correct (`:2070`): A
  - Correct text: A) Et samarbejde i en virksomhed mellem ledelsen og de ansatte / Cooperation in a company between management and employees
  - image_note: null
- **Q:2018-06-q14** · `data/questions.json:2780` · exam 2018-06 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem er medlem af et samarbejdsudvalg?  (`:2784`)
  - Q EN: Who are the members of a cooperation committee (samarbejdsudvalg)?  (`:2809`)
  - Option A DA: Repræsentanter for medarbejdere og ledelse  (`:2788`) · EN: Representatives of employees and management
  - Option B DA: Repræsentanter for staten og kommunerne  (`:2793`) · EN: Representatives of the state and the municipalities
  - Option C DA: Repræsentanter for kommunerne og virksomhederne  (`:2798`) · EN: Representatives of the municipalities and the companies
  - Correct (`:2802`): A
  - Correct text: A) Repræsentanter for medarbejdere og ledelse / Representatives of employees and management
  - image_note: null
- **Q:2020-06-q8** · `data/questions.json:5792` · exam 2020-06 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er et samarbejdsudvalg på en arbejdsplads?  (`:5796`)
  - Q EN: What is a cooperation committee (samarbejdsudvalg) at a workplace?  (`:5816`)
  - Option A DA: Et samarbejde mellem medlemmer af forskellige fagforeninger  (`:5800`) · EN: Cooperation between members of different trade unions
  - Option B DA: Et samarbejde mellem ledelsen og de ansatte  (`:5805`) · EN: Cooperation between management and employees
  - Correct (`:5809`): B
  - Correct text: B) Et samarbejde mellem ledelsen og de ansatte / Cooperation between management and employees
  - image_note: null

#### C:arb-deltid · `data/clusters.json:4607` · asked 3× (2017-06, 2018-11, 2021-11) · frequent: no · last asked: 2021-11

- Fact DA: En medarbejder har ikke altid krav på deltid – og arbejdsgiveren kan heller ikke bare forlange, at man går på deltid.  (`clusters.json:4609`)
- Fact EN: An employee does not always have the right to part-time work – and the employer cannot just demand that you go part-time.  (`clusters.json:4610`)
- Canonical question DA: Har en medarbejder altid krav på at arbejde på deltid?  (`:4624`)
- Canonical question EN: Does an employee always have the right to work part-time?  (`:4625`)
- Canonical answer DA: Nej  (`:4626`)
- Canonical answer EN: No  (`:4627`)
- Variants:
  - Q DA: Har en medarbejder altid krav på at arbejde på deltid?  (`:4630`)
    Q EN: Does an employee always have the right to work part-time?
    A DA: Nej
    A EN: No
    Question ids: 2017-06-q19
  - Q DA: Kan arbejdsgiveren forlange, at medarbejderne skal gå på deltid?  (`:4639`)
    Q EN: Can the employer demand that employees go part-time?
    A DA: Nej
    A EN: No
    Question ids: 2018-11-q18
  - Q DA: Har en medarbejder altid krav på at arbejde deltid?  (`:4648`)
    Q EN: Does an employee always have the right to work part-time?
    A DA: Nej
    A EN: No
    Question ids: 2021-11-q8
- Trap note DA: Begge spørgsmål har svaret Nej: 'Har medarbejderen altid krav på deltid?' = Nej. 'Kan arbejdsgiveren forlange deltid?' = Nej.  (`:4657`)
- Trap note EN: Both questions have the answer No: 'Does the employee always have a right to part-time?' = No. 'Can the employer demand part-time?' = No.
- Current note DA: (empty)  (`:4659`)
- Current note EN: (empty)

- **Q:2017-06-q19** · `data/questions.json:1357` · exam 2017-06 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Har en medarbejder altid krav på at arbejde på deltid?  (`:1361`)
  - Q EN: Does an employee always have the right to work part-time?  (`:1381`)
  - Option A DA: Ja.  (`:1365`) · EN: Yes
  - Option B DA: Nej.  (`:1370`) · EN: No
  - Correct (`:1374`): B
  - Correct text: B) Nej. / No
  - image_note: null
- **Q:2018-11-q18** · `data/questions.json:3712` · exam 2018-11 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Kan arbejdsgiveren forlange, at medarbejderne skal gå på deltid?  (`:3716`)
  - Q EN: Can the employer demand that employees go part-time?  (`:3736`)
  - Option A DA: Ja  (`:3720`) · EN: Yes
  - Option B DA: Nej  (`:3725`) · EN: No
  - Correct (`:3729`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2021-11-q8** · `data/questions.json:8122` · exam 2021-11 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Har en medarbejder altid krav på at arbejde deltid?  (`:8126`)
  - Q EN: Does an employee always have the right to work part-time?  (`:8146`)
  - Option A DA: Ja  (`:8130`) · EN: Yes
  - Option B DA: Nej  (`:8135`) · EN: No
  - Correct (`:8139`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:arb-landmaend · `data/clusters.json:5366` · asked 2× (2023-05, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Antallet af landmænd er faldet meget siden 1960.  (`clusters.json:5368`)
- Fact EN: The number of farmers has fallen a lot since 1960.  (`clusters.json:5369`)
- Canonical question DA: Hvordan har antallet af landmænd udviklet sig siden 1960?  (`:5381`)
- Canonical question EN: How has the number of farmers changed since 1960?  (`:5382`)
- Canonical answer DA: Antallet er faldet  (`:5383`)
- Canonical answer EN: The number has fallen  (`:5384`)
- Variants:
  - Q DA: Hvordan har antallet af landmænd i Danmark udviklet sig siden 1960?  (`:5387`)
    Q EN: How has the number of farmers in Denmark changed since 1960?
    A DA: Antallet er faldet
    A EN: The number has fallen
    Question ids: 2023-05-q16, 2025-05-q10
- Trap note DA: (empty)  (`:5397`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5399`)
- Current note EN: (empty)

- **Q:2023-05-q16** · `data/questions.json:10751` · exam 2023-05 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan har antallet af landmænd i Danmark udviklet sig siden 1960?  (`:10755`)
  - Q EN: How has the number of farmers in Denmark changed since 1960?  (`:10775`)
  - Option A DA: Antallet er steget  (`:10759`) · EN: The number has risen
  - Option B DA: Antallet er faldet  (`:10764`) · EN: The number has fallen
  - Correct (`:10768`): B
  - Correct text: B) Antallet er faldet / The number has fallen
  - image_note: null
- **Q:2025-05-q10** · `data/questions.json:13733` · exam 2025-05 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan har antallet af landmænd i Danmark udviklet sig siden 1960?  (`:13737`)
  - Q EN: How has the number of farmers in Denmark changed since 1960?  (`:13757`)
  - Option A DA: Antallet er steget  (`:13741`) · EN: The number has risen
  - Option B DA: Antallet er faldet  (`:13746`) · EN: The number has fallen
  - Correct (`:13750`): B
  - Correct text: B) Antallet er faldet / The number has fallen
  - image_note: null

#### C:arb-vindenergi · `data/clusters.json:5747` · asked 2× (2022-11, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: Vindenergi er den grønne energi, Danmark producerer mest af. Den dækker den største del af Danmarks el-forbrug.  (`clusters.json:5749`)
- Fact EN: Wind energy is the green energy Denmark produces most of. It covers the largest share of Denmark's electricity consumption.  (`clusters.json:5750`)
- Canonical question DA: Hvilken type grøn energi producerer Danmark mest af?  (`:5762`)
- Canonical question EN: Which type of green energy does Denmark produce most of?  (`:5763`)
- Canonical answer DA: Vindenergi  (`:5764`)
- Canonical answer EN: Wind energy  (`:5765`)
- Variants:
  - Q DA: Hvilken type grøn energi producerer Danmark mest af?  (`:5768`)
    Q EN: Which type of green energy does Denmark produce the most of?
    A DA: Vindenergi
    A EN: Wind energy
    Question ids: 2022-11-q14
  - Q DA: Hvilken type vedvarende energi producerer den største andel af Danmarks el-forbrug?  (`:5777`)
    Q EN: Which type of renewable energy produces the largest share of Denmark's electricity consumption?
    A DA: Vindenergi
    A EN: Wind energy
    Question ids: 2024-05-q11
- Trap note DA: (empty)  (`:5786`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5788`)
- Current note EN: (empty)

- **Q:2022-11-q14** · `data/questions.json:9895` · exam 2022-11 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken type grøn energi producerer Danmark mest af?  (`:9899`)
  - Q EN: Which type of green energy does Denmark produce the most of?  (`:9924`)
  - Option A DA: Bølgeenergi  (`:9903`) · EN: Wave energy
  - Option B DA: Vindenergi  (`:9908`) · EN: Wind energy
  - Option C DA: Solenergi  (`:9913`) · EN: Solar energy
  - Correct (`:9917`): B
  - Correct text: B) Vindenergi / Wind energy
  - image_note: null
- **Q:2024-05-q11** · `data/questions.json:12171` · exam 2024-05 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken type vedvarende energi producerer den største andel af Danmarks el-forbrug?  (`:12175`)
  - Q EN: Which type of renewable energy produces the largest share of Denmark's electricity consumption?  (`:12200`)
  - Option A DA: Vindenergi  (`:12179`) · EN: Wind energy
  - Option B DA: Solenergi  (`:12184`) · EN: Solar energy
  - Option C DA: Bølgeenergi  (`:12189`) · EN: Wave energy
  - Correct (`:12193`): A
  - Correct text: A) Vindenergi / Wind energy
  - image_note: null

#### C:arb-fagforening-fyre · `data/clusters.json:6091` · asked 2× (2021-06, 2022-11) · frequent: no · last asked: 2022-11

- Fact DA: En arbejdsgiver må ikke fyre en ansat, fordi han eller hun melder sig ind i en fagforening.  (`clusters.json:6093`)
- Fact EN: An employer may not fire an employee because he or she joins a trade union.  (`clusters.json:6094`)
- Canonical question DA: Må en arbejdsgiver fyre en ansat, fordi han eller hun melder sig ind i en fagforening?  (`:6106`)
- Canonical question EN: May an employer fire an employee for joining a trade union?  (`:6107`)
- Canonical answer DA: Nej  (`:6108`)
- Canonical answer EN: No  (`:6109`)
- Variants:
  - Q DA: Må en arbejdsgiver fyre en ansat, fordi han eller hun melder sig ind i en fagforening?  (`:6112`)
    Q EN: May an employer fire an employee because he or she joins a trade union?
    A DA: Nej
    A EN: No
    Question ids: 2021-06-q22, 2022-11-q21
- Trap note DA: (empty)  (`:6122`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6124`)
- Current note EN: (empty)

- **Q:2021-06-q22** · `data/questions.json:7789` · exam 2021-06 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en ansat, fordi han eller hun melder sig ind i en fagforening?  (`:7793`)
  - Q EN: May an employer fire an employee because he or she joins a trade union?  (`:7813`)
  - Option A DA: Ja  (`:7797`) · EN: Yes
  - Option B DA: Nej  (`:7802`) · EN: No
  - Correct (`:7806`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2022-11-q21** · `data/questions.json:10111` · exam 2022-11 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Må en arbejdsgiver fyre en ansat, fordi han eller hun melder sig ind i en fagforening?  (`:10115`)
  - Q EN: May an employer fire an employee because he or she joins a trade union?  (`:10135`)
  - Option A DA: Ja  (`:10119`) · EN: Yes
  - Option B DA: Nej  (`:10124`) · EN: No
  - Correct (`:10128`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:arb-akasse-procent · `data/clusters.json:6472` · asked 2× (2017-11, 2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Ca. 70 % af lønmodtagerne er medlem af en a-kasse (prøvens svar).  (`clusters.json:6474`)
- Fact EN: About 70% of employees are members of an a-kasse (the exam answer).  (`clusters.json:6475`)
- Canonical question DA: Hvor mange procent af lønmodtagerne er medlem af en a-kasse?  (`:6487`)
- Canonical question EN: What percentage of employees are members of an a-kasse?  (`:6488`)
- Canonical answer DA: Ca. 70 %  (`:6489`)
- Canonical answer EN: About 70%  (`:6490`)
- Variants:
  - Q DA: Hvor mange procent af lønmodtagerne i Danmark er medlem af en a-kasse?  (`:6493`)
    Q EN: What percentage of employees in Denmark are members of an a-kasse (unemployment insurance fund)?
    A DA: Ca. 70 %
    A EN: About 70%
    Question ids: 2017-11-q11, 2018-11-q19
- Trap note DA: (empty)  (`:6503`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6505`)
- Current note EN: (empty)

- **Q:2017-11-q11** · `data/questions.json:1888` · exam 2017-11 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange procent af lønmodtagerne i Danmark er medlem af en a-kasse?  (`:1892`)
  - Q EN: What percentage of employees in Denmark are members of an a-kasse (unemployment insurance fund)?  (`:1917`)
  - Option A DA: Ca. 30 %  (`:1896`) · EN: About 30%
  - Option B DA: Ca. 50 %  (`:1901`) · EN: About 50%
  - Option C DA: Ca. 70 %  (`:1906`) · EN: About 70%
  - Correct (`:1910`): C
  - Correct text: C) Ca. 70 % / About 70%
  - image_note: null
- **Q:2018-11-q19** · `data/questions.json:3740` · exam 2018-11 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange procent af lønmodtagerne i Danmark er medlem af en a-kasse?  (`:3744`)
  - Q EN: What percentage of employees in Denmark are members of an a-kasse (unemployment insurance fund)?  (`:3769`)
  - Option A DA: Ca. 30 %  (`:3748`) · EN: About 30%
  - Option B DA: Ca. 50 %  (`:3753`) · EN: About 50%
  - Option C DA: Ca. 70 %  (`:3758`) · EN: About 70%
  - Correct (`:3762`): C
  - Correct text: C) Ca. 70 % / About 70%
  - image_note: null

#### C:arb-beskaeftigelse · `data/clusters.json:6727` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Ca. tre ud af fire danskere mellem 15 og 64 år har et arbejde.  (`clusters.json:6729`)
- Fact EN: About three out of four Danes aged 15 to 64 have a job.  (`clusters.json:6730`)
- Canonical question DA: Hvor mange borgere mellem 15 og 64 år har et arbejde?  (`:6740`)
- Canonical question EN: How many citizens aged 15 to 64 have a job?  (`:6741`)
- Canonical answer DA: Cirka tre ud af fire  (`:6742`)
- Canonical answer EN: About three out of four  (`:6743`)
- Variants:
  - Q DA: Hvor mange borgere i Danmark mellem 15 og 64 år har et arbejde?  (`:6746`)
    Q EN: How many citizens in Denmark aged 15 to 64 have a job?
    A DA: Cirka tre ud af fire
    A EN: About three out of four
    Question ids: 2025-11-q3
- Trap note DA: (empty)  (`:6755`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6757`)
- Current note EN: (empty)

- **Q:2025-11-q3** · `data/questions.json:14302` · exam 2025-11 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange borgere i Danmark mellem 15 og 64 år har et arbejde?  (`:14306`)
  - Q EN: How many citizens in Denmark aged 15 to 64 have a job?  (`:14331`)
  - Option A DA: Cirka to ud af fem  (`:14310`) · EN: About two out of five
  - Option B DA: Cirka to ud af tre  (`:14315`) · EN: About two out of three
  - Option C DA: Cirka tre ud af fire  (`:14320`) · EN: About three out of four
  - Correct (`:14324`): C
  - Correct text: C) Cirka tre ud af fire / About three out of four
  - image_note: null

#### C:arb-ligeloen · `data/clusters.json:7475` · asked 1× (2020-11) · frequent: no · last asked: 2020-11

- Fact DA: Kvinder har ifølge loven ret til samme løn som mænd for samme arbejde.  (`clusters.json:7477`)
- Fact EN: By law women have the right to the same pay as men for the same work.  (`clusters.json:7478`)
- Canonical question DA: Har kvinder ret til samme løn som mænd for samme arbejde?  (`:7488`)
- Canonical question EN: Do women have the right to the same pay as men for the same work?  (`:7489`)
- Canonical answer DA: Ja  (`:7490`)
- Canonical answer EN: Yes  (`:7491`)
- Variants:
  - Q DA: Har kvinder ifølge dansk lov ret til samme løn som mænd for samme arbejde?  (`:7494`)
    Q EN: According to Danish law, do women have the right to the same pay as men for the same work?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-11-q23
- Trap note DA: (empty)  (`:7503`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7505`)
- Current note EN: (empty)

- **Q:2020-11-q23** · `data/questions.json:7052` · exam 2020-11 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Har kvinder ifølge dansk lov ret til samme løn som mænd for samme arbejde?  (`:7056`)
  - Q EN: According to Danish law, do women have the right to the same pay as men for the same work?  (`:7076`)
  - Option A DA: Ja  (`:7060`) · EN: Yes
  - Option B DA: Nej  (`:7065`) · EN: No
  - Correct (`:7069`): A
  - Correct text: A) Ja / Yes
  - image_note: null


## 6. Velfærd, sundhed og familie / Welfare, health and family  (`topic:velfaerd`, `data/topics.json:297`)

### Intro paragraphs (`I:velfaerd:n`)

- **I:velfaerd:1** · `data/topics.json:304` (EN `:305`)
  - DA: Sundhedsvæsenet betales mest via skatter. Det er gratis at gå til læge og på hospitalet. Voksne betaler selv en del hos tandlægen, men børn og unge får gratis tandpleje. Vacciner til børn (fx MFR og HPV) er gratis. Det er gratis at låne bøger på biblioteket.
  - EN: The health service is paid mostly through taxes. Seeing a doctor and going to hospital is free. Adults pay part of the cost at the dentist, but children and young people get free dental care. Vaccines for children (e.g. MMR and HPV) are free. Borrowing books at the library is free.
- **I:velfaerd:2** · `data/topics.json:308` (EN `:309`)
  - DA: Man bliver myndig som 18-årig, og man skal være mindst 18 år for at blive gift. Man kan gifte sig med en person af samme køn. Man skal være 18 år for at købe cigaretter og 16 år for at købe øl og vin. Man kan få kørekort fra 17 år.
  - EN: You become a legal adult at 18, and you must be at least 18 to marry. You can marry a person of the same sex. You must be 18 to buy cigarettes and 16 to buy beer and wine. You can get a driving licence from 17.
- **I:velfaerd:3** · `data/topics.json:312` (EN `:313`)
  - DA: Når forældrene er gift, har begge forældremyndigheden. Det er forbudt at slå børn. Begge forældre kan få orlov og økonomisk støtte, når de får et barn. Boligstøtte er hjælp til at betale husleje. Mænd lever i gennemsnit ca. 80 år.
  - EN: When the parents are married, both have custody. It is forbidden to hit children. Both parents can get leave and financial support when they have a child. Housing benefit is help to pay rent. Men live about 80 years on average.

### Current facts – "Ændret siden prøven" (`F:velfaerd:n`)

- **F:velfaerd:1** · `data/topics.json:318` (EN `:319`)
  - DA: Orlov: Siden august 2022 har hver forælder 11 øremærkede uger. Faren har stadig ret til 2 uger omkring fødslen (svaret i prøven fra 2017).
  - EN: Leave: Since August 2022 each parent has 11 earmarked weeks. The father still has the right to 2 weeks around the birth (the answer in the 2017 exam).
- **F:velfaerd:2** · `data/topics.json:322` (EN `:323`)
  - DA: Abort: Siden 1. juni 2025 er grænsen for fri abort 18 uger (før 12 uger).
  - EN: Abortion: Since 1 June 2025 the limit for abortion on request is 18 weeks (before: 12 weeks).
- **F:velfaerd:3** · `data/topics.json:326` (EN `:327`)
  - DA: Tandlæge: Per 2026 er tandpleje gratis, til man fylder 22.
  - EN: Dentist: Per 2026 dental care is free until you turn 22.

### Overview tables / fact groups (`G:…`)

- G:fg-hvem-styrer – full entry above under topic demokrati (also used here)
#### G:fg-aldre · `data/fact_groups.json:487` (also used under: uddannelse)

- Title DA: Aldersgrænser
- Title EN: Age limits
- Columns DA: Alder | Hvad
- Columns EN: Age | What
- Rows (DA / EN, one per row):
  - DA: 0-3 år | Vuggestue (eller dagpleje)
    EN: 0–3 | Nursery (or childminder)
  - DA: 3-6 år | Børnehave
    EN: 3–6 | Kindergarten
  - DA: 5-6 år | Skolestart (0. klasse)
    EN: 5–6 | Start school (year 0)
  - DA: 16 år | Købe øl og vin
    EN: 16 | Buy beer and wine
  - DA: 17 år | Kørekort til bil (med ledsager til 18 år)
    EN: 17 | Driving licence for a car (with an accompanying adult until 18)
  - DA: 18 år | Myndig, gift, SU, cigaretter, stemmeret
    EN: 18 | Legal adult, marriage, SU, cigarettes, right to vote
  - DA: Under 22 år | Gratis tandlæge (per 2026)
    EN: Under 22 | Free dentist (per 2026)
- Mnemonic DA: Næsten alt er 18. Undtagelser: øl/vin 16, kørekort 17.
- Mnemonic EN: Almost everything is 18. Exceptions: beer/wine 16, driving licence 17.
- Cluster links: vel-myndig-18, vel-gift-18, udd-su-18, vel-cigaretter-18, vel-oel-vin-16, vel-koerekort-17, udd-skolestart, udd-boernehave-vuggestue

- G:fg-gratis – full entry above under topic arbejde (also used here)
### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:vel-bibliotek · `data/clusters.json:1275` · asked 5× (2018-06, 2020-11, 2022-06, 2024-05, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Det er gratis at låne bøger på folkebibliotekerne.  (`clusters.json:1277`)
- Fact EN: It is free to borrow books at the public libraries.  (`clusters.json:1278`)
- Canonical question DA: Er det gratis at låne bøger på folkebibliotekerne?  (`:1296`)
- Canonical question EN: Is it free to borrow books at the public libraries?  (`:1297`)
- Canonical answer DA: Ja  (`:1298`)
- Canonical answer EN: Yes  (`:1299`)
- Variants:
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:1302`)
    Q EN: Is it free to borrow books at the country's public libraries?
    A DA: Ja
    A EN: Yes
    Question ids: 2018-06-q18, 2020-11-q15, 2022-06-q3, 2024-05-q23, 2026-06-q24
- Trap note DA: (empty)  (`:1315`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:1317`)
- Current note EN: (empty)

- **Q:2018-06-q18** · `data/questions.json:2912` · exam 2018-06 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:2916`)
  - Q EN: Is it free to borrow books at the country's public libraries?  (`:2936`)
  - Option A DA: Ja  (`:2920`) · EN: Yes
  - Option B DA: Nej  (`:2925`) · EN: No
  - Correct (`:2929`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2020-11-q15** · `data/questions.json:6793` · exam 2020-11 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:6797`)
  - Q EN: Is it free to borrow books at the country's public libraries?  (`:6817`)
  - Option A DA: Ja  (`:6801`) · EN: Yes
  - Option B DA: Nej  (`:6806`) · EN: No
  - Correct (`:6810`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-06-q3** · `data/questions.json:8762` · exam 2022-06 nr. 3 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:8766`)
  - Q EN: Is it free to borrow books at the country's public libraries?  (`:8786`)
  - Option A DA: Ja  (`:8770`) · EN: Yes
  - Option B DA: Nej  (`:8775`) · EN: No
  - Correct (`:8779`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-05-q23** · `data/questions.json:12567` · exam 2024-05 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:12571`)
  - Q EN: Is it free to borrow books at the country's public libraries?  (`:12591`)
  - Option A DA: Ja  (`:12575`) · EN: Yes
  - Option B DA: Nej  (`:12580`) · EN: No
  - Correct (`:12584`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2026-06-q24** · `data/questions.json:15760` · exam 2026-06 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det gratis at låne bøger på landets folkebiblioteker?  (`:15764`)
  - Q EN: Is it free to borrow books at the country's public libraries?  (`:15784`)
  - Option A DA: Ja  (`:15768`) · EN: Yes
  - Option B DA: Nej  (`:15773`) · EN: No
  - Correct (`:15777`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-gift-18 · `data/clusters.json:1771` · asked 5× (2018-06, 2019-06, 2021-06, 2023-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Man skal være mindst 18 år for at blive gift i Danmark.  (`clusters.json:1773`)
- Fact EN: You must be at least 18 to get married in Denmark.  (`clusters.json:1774`)
- Canonical question DA: Hvor gammel skal man være for at blive gift i Danmark?  (`:1792`)
- Canonical question EN: How old must you be to get married in Denmark?  (`:1793`)
- Canonical answer DA: Mindst 18 år  (`:1794`)
- Canonical answer EN: At least 18  (`:1795`)
- Variants:
  - Q DA: Hvor gammel skal man normalt være for at blive gift i Danmark?  (`:1798`)
    Q EN: How old must you normally be to get married in Denmark?
    A DA: Mindst 18 år
    A EN: At least 18 years old
    Question ids: 2018-06-q17
  - Q DA: Hvor gammel skal man normalt være for at blive gift i Danmark?  (`:1798`)
    Q EN: How old must you normally be to get married in Denmark?
    A DA: 18 år
    A EN: 18 years
    Question ids: 2019-06-q18
  - Q DA: Hvor gammel skal man være for at blive gift i Danmark?  (`:1816`)
    Q EN: How old must you be to get married in Denmark?
    A DA: Mindst 18 år
    A EN: At least 18 years old
    Question ids: 2021-06-q11, 2023-05-q24, 2024-11-q3
- Trap note DA: (empty)  (`:1827`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:1829`)
- Current note EN: (empty)

- **Q:2018-06-q17** · `data/questions.json:2879` · exam 2018-06 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man normalt være for at blive gift i Danmark?  (`:2883`)
  - Q EN: How old must you normally be to get married in Denmark?  (`:2908`)
  - Option A DA: Mindst 15 år  (`:2887`) · EN: At least 15 years old
  - Option B DA: Mindst 18 år  (`:2892`) · EN: At least 18 years old
  - Option C DA: Mindst 21 år  (`:2897`) · EN: At least 21 years old
  - Correct (`:2901`): B
  - Correct text: B) Mindst 18 år / At least 18 years old
  - image_note: null
- **Q:2019-06-q18** · `data/questions.json:4517` · exam 2019-06 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man normalt være for at blive gift i Danmark?  (`:4521`)
  - Q EN: How old must you normally be to get married in Denmark?  (`:4546`)
  - Option A DA: 15 år  (`:4525`) · EN: 15 years
  - Option B DA: 18 år  (`:4530`) · EN: 18 years
  - Option C DA: 21 år  (`:4535`) · EN: 21 years
  - Correct (`:4539`): B
  - Correct text: B) 18 år / 18 years
  - image_note: null
- **Q:2021-06-q11** · `data/questions.json:7446` · exam 2021-06 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man være for at blive gift i Danmark?  (`:7450`)
  - Q EN: How old must you be to get married in Denmark?  (`:7475`)
  - Option A DA: Mindst 15 år  (`:7454`) · EN: At least 15 years old
  - Option B DA: Mindst 18 år  (`:7459`) · EN: At least 18 years old
  - Option C DA: Mindst 21 år  (`:7464`) · EN: At least 21 years old
  - Correct (`:7468`): B
  - Correct text: B) Mindst 18 år / At least 18 years old
  - image_note: null
- **Q:2023-05-q24** · `data/questions.json:10995` · exam 2023-05 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man være for at blive gift i Danmark?  (`:10999`)
  - Q EN: How old must you be to get married in Denmark?  (`:11024`)
  - Option A DA: Mindst 15 år  (`:11003`) · EN: At least 15 years old
  - Option B DA: Mindst 18 år  (`:11008`) · EN: At least 18 years old
  - Option C DA: Mindst 21 år  (`:11013`) · EN: At least 21 years old
  - Correct (`:11017`): B
  - Correct text: B) Mindst 18 år / At least 18 years old
  - image_note: null
- **Q:2024-11-q3** · `data/questions.json:12722` · exam 2024-11 nr. 3 · section '' · answer_source: image · uncertain: false · notes: 'PDF misprints option labels A,B,B; key text "B – Mindst 18 år" confirms. Verified.'
  - Q DA: Hvor gammel skal man være for at blive gift i Danmark?  (`:12726`)
  - Q EN: How old must you be to get married in Denmark?  (`:12751`)
  - Option A DA: Mindst 16 år  (`:12730`) · EN: At least 16 years old
  - Option B DA: Mindst 18 år  (`:12735`) · EN: At least 18 years old
  - Option C DA: Mindst 20 år  (`:12740`) · EN: At least 20 years old
  - Correct (`:12744`): B
  - Correct text: B) Mindst 18 år / At least 18 years old
  - image_note: null

#### C:vel-vaccine · `data/clusters.json:2428` · asked 4× (2017-06, 2020-06, 2022-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Vaccinationer til børn (fx MFR mod mæslinger, fåresyge og røde hunde, og HPV) er gratis.  (`clusters.json:2430`)
- Fact EN: Vaccinations for children (e.g. MMR against measles, mumps and rubella, and HPV) are free.  (`clusters.json:2431`)
- Canonical question DA: Er vaccinationer mod børnesygdomme gratis?  (`:2447`)
- Canonical question EN: Are vaccinations against childhood diseases free?  (`:2448`)
- Canonical answer DA: Ja  (`:2449`)
- Canonical answer EN: Yes  (`:2450`)
- Variants:
  - Q DA: Er vaccinationer mod børnesygdomme gratis?  (`:2453`)
    Q EN: Are vaccinations against childhood diseases free?
    A DA: Ja
    A EN: Yes
    Question ids: 2017-06-q11
  - Q DA: Er vaccinationer mod børnesygdommene mæslinger, fåresyge og røde hunde, MFR-vaccinen, gratis?  (`:2462`)
    Q EN: Are vaccinations against the childhood diseases measles, mumps and rubella (the MMR vaccine, MFR in Danish) free?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-06-q6
  - Q DA: Er vaccinationer til børn mod sygdommene mæslinger, fåresyge og røde hunde gratis?  (`:2471`)
    Q EN: Are vaccinations for children against measles, mumps and rubella free?
    A DA: Ja
    A EN: Yes
    Question ids: 2022-11-q22
  - Q DA: Er det gratis at få vaccineret sine børn mod stivkrampe, mæslinger og HPV?  (`:2480`)
    Q EN: Is it free to have your children vaccinated against tetanus, measles and HPV?
    A DA: Ja
    A EN: Yes
    Question ids: 2026-06-q10
- Trap note DA: (empty)  (`:2489`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:2491`)
- Current note EN: (empty)

- **Q:2017-06-q11** · `data/questions.json:1113` · exam 2017-06 nr. 11 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er vaccinationer mod børnesygdomme gratis?  (`:1117`)
  - Q EN: Are vaccinations against childhood diseases free?  (`:1137`)
  - Option A DA: Ja.  (`:1121`) · EN: Yes
  - Option B DA: Nej.  (`:1126`) · EN: No
  - Correct (`:1130`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2020-06-q6** · `data/questions.json:5731` · exam 2020-06 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er vaccinationer mod børnesygdommene mæslinger, fåresyge og røde hunde, MFR-vaccinen, gratis?  (`:5735`)
  - Q EN: Are vaccinations against the childhood diseases measles, mumps and rubella (the MMR vaccine, MFR in Danish) free?  (`:5755`)
  - Option A DA: Ja  (`:5739`) · EN: Yes
  - Option B DA: Nej  (`:5744`) · EN: No
  - Correct (`:5748`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-11-q22** · `data/questions.json:10139` · exam 2022-11 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er vaccinationer til børn mod sygdommene mæslinger, fåresyge og røde hunde gratis?  (`:10143`)
  - Q EN: Are vaccinations for children against measles, mumps and rubella free?  (`:10163`)
  - Option A DA: Ja  (`:10147`) · EN: Yes
  - Option B DA: Nej  (`:10152`) · EN: No
  - Correct (`:10156`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2026-06-q10** · `data/questions.json:15323` · exam 2026-06 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det gratis at få vaccineret sine børn mod stivkrampe, mæslinger og HPV?  (`:15327`)
  - Q EN: Is it free to have your children vaccinated against tetanus, measles and HPV?  (`:15347`)
  - Option A DA: Ja  (`:15331`) · EN: Yes
  - Option B DA: Nej  (`:15336`) · EN: No
  - Correct (`:15340`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-tandlaege · `data/clusters.json:2983` · asked 4× (2017-11, 2019-06, 2023-05, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Tandlæge er det eneste af læge/hospital/tandlæge, som voksne normalt selv betaler en del af. Børn og unge får gratis tandpleje (per 2026: til man fylder 22).  (`clusters.json:2985`)
- Fact EN: The dentist is the only one of doctor/hospital/dentist that adults normally pay part of themselves. Children and young people get free dental care (per 2026: until they turn 22).  (`clusters.json:2986`)
- Canonical question DA: Hvad er normalt ikke gratis for voksne i Danmark?  (`:3002`)
- Canonical question EN: What is normally NOT free for adults in Denmark?  (`:3003`)
- Canonical answer DA: At gå til tandlæge  (`:3004`)
- Canonical answer EN: Going to the dentist  (`:3005`)
- Variants:
  - Q DA: Hvad er normalt ikke gratis for voksne i Danmark?  (`:3008`)
    Q EN: What is normally NOT free for adults in Denmark?
    A DA: At gå til tandlæge
    A EN: Going to the dentist
    Question ids: 2017-11-q2, 2019-06-q10
  - Q DA: Skal personer over 21 år normalt selv betale en del af regningen, når de går til tandlægen?  (`:3018`)
    Q EN: Do people over 21 normally have to pay part of the bill themselves when they go to the dentist?
    A DA: Ja
    A EN: Yes
    Question ids: 2023-05-q18
  - Q DA: Er det normalt gratis at gå til tandlægen, når man er under 20 år?  (`:3027`)
    Q EN: Is it normally free to go to the dentist when you are under 20?
    A DA: Ja
    A EN: Yes
    Question ids: 2024-11-q18
- Trap note DA: Tre varianter: 'Hvad er IKKE gratis for voksne?' = tandlæge. 'Skal personer over 21 betale en del hos tandlægen?' = Ja. 'Er tandlæge gratis under 20 år?' = Ja.  (`:3036`)
- Trap note EN: Three variants: 'What is NOT free for adults?' = the dentist. 'Do people over 21 pay part at the dentist?' = Yes. 'Is the dentist free under 20?' = Yes.
- Current note DA: Gratis tandpleje er udvidet: per 2026 er den gratis, til man fylder 22.  (`:3038`)
- Current note EN: Free dental care has been extended: per 2026 it is free until you turn 22.

- **Q:2017-11-q2** · `data/questions.json:1601` · exam 2017-11 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er normalt ikke gratis for voksne i Danmark?  (`:1605`)
  - Q EN: What is normally NOT free for adults in Denmark?  (`:1630`)
  - Option A DA: At gå til læge  (`:1609`) · EN: Seeing a doctor
  - Option B DA: At komme på hospitalet  (`:1614`) · EN: Going to hospital
  - Option C DA: At gå til tandlæge  (`:1619`) · EN: Going to the dentist
  - Correct (`:1623`): C
  - Correct text: C) At gå til tandlæge / Going to the dentist
  - image_note: null
- **Q:2019-06-q10** · `data/questions.json:4258` · exam 2019-06 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er normalt ikke gratis for voksne i Danmark?  (`:4262`)
  - Q EN: What is normally NOT free for adults in Denmark?  (`:4287`)
  - Option A DA: At gå til læge  (`:4266`) · EN: Seeing a doctor
  - Option B DA: At komme på hospitalet  (`:4271`) · EN: Going to hospital
  - Option C DA: At gå til tandlæge  (`:4276`) · EN: Going to the dentist
  - Correct (`:4280`): C
  - Correct text: C) At gå til tandlæge / Going to the dentist
  - image_note: null
- **Q:2023-05-q18** · `data/questions.json:10812` · exam 2023-05 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal personer over 21 år normalt selv betale en del af regningen, når de går til tandlægen?  (`:10816`)
  - Q EN: Do people over 21 normally have to pay part of the bill themselves when they go to the dentist?  (`:10836`)
  - Option A DA: Ja  (`:10820`) · EN: Yes
  - Option B DA: Nej  (`:10825`) · EN: No
  - Correct (`:10829`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-11-q18** · `data/questions.json:13202` · exam 2024-11 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det normalt gratis at gå til tandlægen, når man er under 20 år?  (`:13206`)
  - Q EN: Is it normally free to go to the dentist when you are under 20?  (`:13226`)
  - Option A DA: Ja  (`:13210`) · EN: Yes
  - Option B DA: Nej  (`:13215`) · EN: No
  - Correct (`:13219`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-myndig-18 · `data/clusters.json:3179` · asked 4× (2016-12, 2019-11, 2021-11, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: Man bliver myndig, når man fylder 18 år.  (`clusters.json:3181`)
- Fact EN: You come of age (become a legal adult) when you turn 18.  (`clusters.json:3182`)
- Canonical question DA: Hvornår er man ifølge loven myndig i Danmark?  (`:3198`)
- Canonical question EN: According to the law, when do you come of age in Denmark?  (`:3199`)
- Canonical answer DA: Når man fylder 18 år  (`:3200`)
- Canonical answer EN: When you turn 18  (`:3201`)
- Variants:
  - Q DA: Hvornår er man ifølge loven myndig i Danmark?  (`:3204`)
    Q EN: According to the law, when do you come of age (become legally an adult) in Denmark?
    A DA: Når man er 18 år
    A EN: When you are 18
    Question ids: 2016-12-q4
  - Q DA: Hvornår bliver man ifølge loven myndig?  (`:3213`)
    Q EN: According to the law, when do you come of age?
    A DA: Når man fylder 18 år
    A EN: When you turn 18
    Question ids: 2019-11-q4
  - Q DA: Hvornår er man ifølge loven myndig i Danmark?  (`:3204`)
    Q EN: According to the law, when do you come of age (become legally an adult) in Denmark?
    A DA: Når man fylder 18 år
    A EN: When you turn 18
    Question ids: 2021-11-q25, 2023-11-q19
- Trap note DA: (empty)  (`:3232`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3234`)
- Current note EN: (empty)

- **Q:2016-12-q4** · `data/questions.json:102` · exam 2016-12 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår er man ifølge loven myndig i Danmark?  (`:106`)
  - Q EN: According to the law, when do you come of age (become legally an adult) in Denmark?  (`:131`)
  - Option A DA: Når man er 15 år.  (`:110`) · EN: When you are 15
  - Option B DA: Når man er 18 år.  (`:115`) · EN: When you are 18
  - Option C DA: Når man er 21 år.  (`:120`) · EN: When you are 21
  - Correct (`:124`): B
  - Correct text: B) Når man er 18 år. / When you are 18
  - image_note: null
- **Q:2019-11-q4** · `data/questions.json:4875` · exam 2019-11 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår bliver man ifølge loven myndig?  (`:4879`)
  - Q EN: According to the law, when do you come of age?  (`:4904`)
  - Option A DA: Når man fylder 15 år  (`:4883`) · EN: When you turn 15
  - Option B DA: Når man fylder 18 år  (`:4888`) · EN: When you turn 18
  - Option C DA: Når man fylder 21 år  (`:4893`) · EN: When you turn 21
  - Correct (`:4897`): B
  - Correct text: B) Når man fylder 18 år / When you turn 18
  - image_note: null
- **Q:2021-11-q25** · `data/questions.json:8668` · exam 2021-11 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er man ifølge loven myndig i Danmark?  (`:8672`)
  - Q EN: According to the law, when do you come of age (become legally an adult) in Denmark?  (`:8697`)
  - Option A DA: Når man fylder 15 år  (`:8676`) · EN: When you turn 15
  - Option B DA: Når man fylder 18 år  (`:8681`) · EN: When you turn 18
  - Option C DA: Når man fylder 21 år  (`:8686`) · EN: When you turn 21
  - Correct (`:8690`): B
  - Correct text: B) Når man fylder 18 år / When you turn 18
  - image_note: null
- **Q:2023-11-q19** · `data/questions.json:11625` · exam 2023-11 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er man ifølge loven myndig i Danmark?  (`:11629`)
  - Q EN: According to the law, when do you come of age (become legally an adult) in Denmark?  (`:11654`)
  - Option A DA: Når man fylder 15 år  (`:11633`) · EN: When you turn 15
  - Option B DA: Når man fylder 18 år  (`:11638`) · EN: When you turn 18
  - Option C DA: Når man fylder 21 år  (`:11643`) · EN: When you turn 21
  - Correct (`:11647`): B
  - Correct text: B) Når man fylder 18 år / When you turn 18
  - image_note: null

#### C:vel-slaa-boern · `data/clusters.json:4431` · asked 3× (2018-06, 2020-11, 2022-11) · frequent: no · last asked: 2022-11

- Fact DA: Det er forbudt at slå børn i Danmark.  (`clusters.json:4433`)
- Fact EN: It is forbidden to hit children in Denmark.  (`clusters.json:4434`)
- Canonical question DA: Er det forbudt at slå børn i Danmark?  (`:4448`)
- Canonical question EN: Is it forbidden to hit children in Denmark?  (`:4449`)
- Canonical answer DA: Ja  (`:4450`)
- Canonical answer EN: Yes  (`:4451`)
- Variants:
  - Q DA: Er det forbudt at slå børn i Danmark?  (`:4454`)
    Q EN: Is it forbidden to hit children in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2018-06-q25, 2020-11-q25, 2022-11-q11
- Trap note DA: Pas på: spørgsmålet er 'Er det FORBUDT?' – svaret er Ja.  (`:4465`)
- Trap note EN: Careful: the question is 'Is it FORBIDDEN?' – the answer is Yes.
- Current note DA: (empty)  (`:4467`)
- Current note EN: (empty)

- **Q:2018-06-q25** · `data/questions.json:3133` · exam 2018-06 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det forbudt at slå børn i Danmark?  (`:3137`)
  - Q EN: Is it forbidden to hit children in Denmark?  (`:3157`)
  - Option A DA: Ja  (`:3141`) · EN: Yes
  - Option B DA: Nej  (`:3146`) · EN: No
  - Correct (`:3150`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2020-11-q25** · `data/questions.json:7113` · exam 2020-11 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det forbudt at slå børn i Danmark?  (`:7117`)
  - Q EN: Is it forbidden to hit children in Denmark?  (`:7137`)
  - Option A DA: Ja  (`:7121`) · EN: Yes
  - Option B DA: Nej  (`:7126`) · EN: No
  - Correct (`:7130`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-11-q11** · `data/questions.json:9801` · exam 2022-11 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det forbudt at slå børn i Danmark?  (`:9805`)
  - Q EN: Is it forbidden to hit children in Denmark?  (`:9825`)
  - Option A DA: Ja  (`:9809`) · EN: Yes
  - Option B DA: Nej  (`:9814`) · EN: No
  - Correct (`:9818`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-barsel-stoette · `data/clusters.json:4551` · asked 3× (2017-06, 2021-06, 2022-06) · frequent: no · last asked: 2022-06

- Fact DA: Man kan normalt få økonomisk støtte (barselsdagpenge) under barsels- og fædreorlov.  (`clusters.json:4553`)
- Fact EN: You can normally get financial support (maternity/parental benefit) during maternity and paternity leave.  (`clusters.json:4554`)
- Canonical question DA: Har man mulighed for at få økonomisk støtte under barselsorlov?  (`:4568`)
- Canonical question EN: Can you get financial support during maternity leave?  (`:4569`)
- Canonical answer DA: Ja  (`:4570`)
- Canonical answer EN: Yes  (`:4571`)
- Variants:
  - Q DA: Har kvinder normalt mulighed for at få økonomisk støtte under barselsorlov?  (`:4574`)
    Q EN: Can women normally get financial support during maternity leave?
    A DA: Ja
    A EN: Yes
    Question ids: 2017-06-q18
  - Q DA: Har man normalt mulighed for at få økonomisk støtte under barsels- og fædreorlov?  (`:4583`)
    Q EN: Can you normally get financial support during maternity and paternity leave?
    A DA: Ja
    A EN: Yes
    Question ids: 2021-06-q21
  - Q DA: Har man mulighed for at få økonomisk støtte under barselsorlov?  (`:4592`)
    Q EN: Can you get financial support during maternity/parental leave (barselsorlov)?
    A DA: Ja
    A EN: Yes
    Question ids: 2022-06-q1
- Trap note DA: (empty)  (`:4601`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4603`)
- Current note EN: (empty)

- **Q:2017-06-q18** · `data/questions.json:1329` · exam 2017-06 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Har kvinder normalt mulighed for at få økonomisk støtte under barselsorlov?  (`:1333`)
  - Q EN: Can women normally get financial support during maternity leave?  (`:1353`)
  - Option A DA: Ja.  (`:1337`) · EN: Yes
  - Option B DA: Nej.  (`:1342`) · EN: No
  - Correct (`:1346`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2021-06-q21** · `data/questions.json:7761` · exam 2021-06 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Har man normalt mulighed for at få økonomisk støtte under barsels- og fædreorlov?  (`:7765`)
  - Q EN: Can you normally get financial support during maternity and paternity leave?  (`:7785`)
  - Option A DA: Ja  (`:7769`) · EN: Yes
  - Option B DA: Nej  (`:7774`) · EN: No
  - Correct (`:7778`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-06-q1** · `data/questions.json:8701` · exam 2022-06 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Har man mulighed for at få økonomisk støtte under barselsorlov?  (`:8705`)
  - Q EN: Can you get financial support during maternity/parental leave (barselsorlov)?  (`:8725`)
  - Option A DA: Ja  (`:8709`) · EN: Yes
  - Option B DA: Nej  (`:8714`) · EN: No
  - Correct (`:8718`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-faedreorlov · `data/clusters.json:4751` · asked 3× (2017-06, 2017-11, 2020-06) · frequent: no · last asked: 2020-06

- Fact DA: Fædre har ret til orlov. Faren har ret til 2 uger lige efter fødslen, og siden 2022 har hver forælder 11 øremærkede uger.  (`clusters.json:4753`)
- Fact EN: Fathers have the right to leave. The father has the right to 2 weeks just after the birth, and since 2022 each parent has 11 earmarked weeks.  (`clusters.json:4754`)
- Canonical question DA: Har fædre ret til fædreorlov efter barnets fødsel?  (`:4768`)
- Canonical question EN: Do fathers have the right to paternity leave after the birth?  (`:4769`)
- Canonical answer DA: Ja  (`:4770`)
- Canonical answer EN: Yes  (`:4771`)
- Variants:
  - Q DA: Har mænd normalt ret til at tage fædreorlov, når de er blevet fædre?  (`:4774`)
    Q EN: Do men normally have the right to take paternity leave when they have become fathers?
    A DA: Ja
    A EN: Yes
    Question ids: 2017-06-q25
  - Q DA: Hvor mange ugers fædreorlov har fædre ret til efter fødslen?  (`:4783`)
    Q EN: How many weeks of paternity leave do fathers have the right to after the birth?
    A DA: 2 uger
    A EN: 2 weeks
    Question ids: 2017-11-q19
  - Q DA: Har fædre ret til fædreorlov efter barns fødsel?  (`:4792`)
    Q EN: Do fathers have the right to paternity leave after a child's birth?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-06-q18
- Trap note DA: Prøven 2017 spurgte 'Hvor mange ugers fædreorlov efter fødslen?' – svaret var 2 uger (de 2 uger omkring fødslen).  (`:4801`)
- Trap note EN: The 2017 exam asked 'How many weeks of paternity leave after the birth?' – the answer was 2 weeks (the 2 weeks around the birth).
- Current note DA: Siden august 2022 har hver forælder 11 øremærkede ugers orlov. Faren har stadig ret til 2 uger omkring fødslen.  (`:4803`)
- Current note EN: Since August 2022 each parent has 11 earmarked weeks of leave. The father still has the right to 2 weeks around the birth.

- **Q:2017-06-q25** · `data/questions.json:1540` · exam 2017-06 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Har mænd normalt ret til at tage fædreorlov, når de er blevet fædre?  (`:1544`)
  - Q EN: Do men normally have the right to take paternity leave when they have become fathers?  (`:1564`)
  - Option A DA: Ja.  (`:1548`) · EN: Yes
  - Option B DA: Nej.  (`:1553`) · EN: No
  - Correct (`:1557`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2017-11-q19** · `data/questions.json:2142` · exam 2017-11 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange ugers fædreorlov har fædre ret til efter fødslen?  (`:2146`)
  - Q EN: How many weeks of paternity leave do fathers have the right to after the birth?  (`:2171`)
  - Option A DA: Ingen  (`:2150`) · EN: None
  - Option B DA: 2 uger  (`:2155`) · EN: 2 weeks
  - Option C DA: 4 uger  (`:2160`) · EN: 4 weeks
  - Correct (`:2164`): B
  - Correct text: B) 2 uger / 2 weeks
  - image_note: null
- **Q:2020-06-q18** · `data/questions.json:6107` · exam 2020-06 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Har fædre ret til fædreorlov efter barns fødsel?  (`:6111`)
  - Q EN: Do fathers have the right to paternity leave after a child's birth?  (`:6131`)
  - Option A DA: Ja  (`:6115`) · EN: Yes
  - Option B DA: Nej  (`:6120`) · EN: No
  - Correct (`:6124`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-sundhed-skat · `data/clusters.json:5075` · asked 2× (2025-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: De fleste udgifter til sundhedsvæsenet betales via skatter og afgifter.  (`clusters.json:5077`)
- Fact EN: Most of the costs of the health service are paid through taxes and duties.  (`clusters.json:5078`)
- Canonical question DA: Hvordan bliver de fleste udgifter til sundhedsvæsenet betalt?  (`:5090`)
- Canonical question EN: How are most of the costs of the health service paid?  (`:5091`)
- Canonical answer DA: Via skatter og afgifter  (`:5092`)
- Canonical answer EN: Through taxes and duties  (`:5093`)
- Variants:
  - Q DA: Hvordan bliver de fleste udgifter til sundhedsvæsenet betalt?  (`:5096`)
    Q EN: How are most of the costs of the health service paid?
    A DA: Skatter og afgifter
    A EN: Taxes and duties
    Question ids: 2025-05-q4
  - Q DA: Hvordan bliver de fleste udgifter til sundhedsvæsenet betalt?  (`:5096`)
    Q EN: How are most of the costs of the health service paid?
    A DA: Via skatter og afgifter
    A EN: Through taxes and duties
    Question ids: 2026-06-q2
- Trap note DA: (empty)  (`:5114`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5116`)
- Current note EN: (empty)

- **Q:2025-05-q4** · `data/questions.json:13540` · exam 2025-05 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan bliver de fleste udgifter til sundhedsvæsenet betalt?  (`:13544`)
  - Q EN: How are most of the costs of the health service paid?  (`:13569`)
  - Option A DA: Skatter og afgifter  (`:13548`) · EN: Taxes and duties
  - Option B DA: Direkte egenbetaling  (`:13553`) · EN: Direct payment by the patient
  - Option C DA: Private forsikringer  (`:13558`) · EN: Private insurance
  - Correct (`:13562`): A
  - Correct text: A) Skatter og afgifter / Taxes and duties
  - image_note: null
- **Q:2026-06-q2** · `data/questions.json:15059` · exam 2026-06 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvordan bliver de fleste udgifter til sundhedsvæsenet betalt?  (`:15063`)
  - Q EN: How are most of the costs of the health service paid?  (`:15088`)
  - Option A DA: Via skatter og afgifter  (`:15067`) · EN: Through taxes and duties
  - Option B DA: Via direkte egenbetaling  (`:15072`) · EN: Through direct payment by the patient
  - Option C DA: Via private forsikringer  (`:15077`) · EN: Through private insurance
  - Correct (`:15081`): A
  - Correct text: A) Via skatter og afgifter / Through taxes and duties
  - image_note: null

#### C:vel-cigaretter-18 · `data/clusters.json:5837` · asked 2× (2023-05, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: Man skal være mindst 18 år for at købe cigaretter.  (`clusters.json:5839`)
- Fact EN: You must be at least 18 to buy cigarettes.  (`clusters.json:5840`)
- Canonical question DA: Hvor gammel skal man mindst være for at købe cigaretter?  (`:5852`)
- Canonical question EN: What is the minimum age for buying cigarettes?  (`:5853`)
- Canonical answer DA: 18 år  (`:5854`)
- Canonical answer EN: 18 years  (`:5855`)
- Variants:
  - Q DA: Hvor gammel skal man mindst være for at købe cigaretter i Danmark?  (`:5858`)
    Q EN: What is the minimum age for buying cigarettes in Denmark?
    A DA: 18 år
    A EN: 18 years
    Question ids: 2023-05-q20, 2024-05-q15
- Trap note DA: (empty)  (`:5868`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5870`)
- Current note EN: (empty)

- **Q:2023-05-q20** · `data/questions.json:10868` · exam 2023-05 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man mindst være for at købe cigaretter i Danmark?  (`:10872`)
  - Q EN: What is the minimum age for buying cigarettes in Denmark?  (`:10897`)
  - Option A DA: 15 år  (`:10876`) · EN: 15 years
  - Option B DA: 18 år  (`:10881`) · EN: 18 years
  - Option C DA: 21 år  (`:10886`) · EN: 21 years
  - Correct (`:10890`): B
  - Correct text: B) 18 år / 18 years
  - image_note: null
- **Q:2024-05-q15** · `data/questions.json:12303` · exam 2024-05 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man mindst være for at købe cigaretter i Danmark?  (`:12307`)
  - Q EN: What is the minimum age for buying cigarettes in Denmark?  (`:12332`)
  - Option A DA: 16 år  (`:12311`) · EN: 16 years
  - Option B DA: 18 år  (`:12316`) · EN: 18 years
  - Option C DA: 20 år  (`:12321`) · EN: 20 years
  - Correct (`:12325`): B
  - Correct text: B) 18 år / 18 years
  - image_note: null

#### C:vel-samme-koen · `data/clusters.json:5874` · asked 2× (2022-11, 2024-05) · frequent: no · last asked: 2024-05

- Fact DA: I Danmark kan man gifte sig med en person af samme køn.  (`clusters.json:5876`)
- Fact EN: In Denmark you can marry a person of the same sex.  (`clusters.json:5877`)
- Canonical question DA: Kan man gifte sig med en person af samme køn i Danmark?  (`:5889`)
- Canonical question EN: Can you marry a person of the same sex in Denmark?  (`:5890`)
- Canonical answer DA: Ja  (`:5891`)
- Canonical answer EN: Yes  (`:5892`)
- Variants:
  - Q DA: Kan man gifte sig med en person af det samme køn i Danmark?  (`:5895`)
    Q EN: Can you marry a person of the same sex in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2022-11-q20
  - Q DA: Kan man gifte sig med en person af samme køn i Danmark?  (`:5904`)
    Q EN: Can you marry a person of the same sex in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2024-05-q25
- Trap note DA: (empty)  (`:5913`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5915`)
- Current note EN: (empty)

- **Q:2022-11-q20** · `data/questions.json:10083` · exam 2022-11 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan man gifte sig med en person af det samme køn i Danmark?  (`:10087`)
  - Q EN: Can you marry a person of the same sex in Denmark?  (`:10107`)
  - Option A DA: Ja  (`:10091`) · EN: Yes
  - Option B DA: Nej  (`:10096`) · EN: No
  - Correct (`:10100`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-05-q25** · `data/questions.json:12628` · exam 2024-05 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan man gifte sig med en person af samme køn i Danmark?  (`:12632`)
  - Q EN: Can you marry a person of the same sex in Denmark?  (`:12652`)
  - Option A DA: Ja  (`:12636`) · EN: Yes
  - Option B DA: Nej  (`:12641`) · EN: No
  - Correct (`:12645`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-laege · `data/clusters.json:6382` · asked 2× (2016-12, 2019-11) · frequent: no · last asked: 2019-11

- Fact DA: Det er normalt gratis for voksne at gå til lægen.  (`clusters.json:6384`)
- Fact EN: It is normally free for adults to see a doctor.  (`clusters.json:6385`)
- Canonical question DA: Er det normalt gratis for voksne borgere at gå til læge?  (`:6397`)
- Canonical question EN: Is it normally free for adult citizens to see a doctor?  (`:6398`)
- Canonical answer DA: Ja  (`:6399`)
- Canonical answer EN: Yes  (`:6400`)
- Variants:
  - Q DA: Er det normalt gratis for voksne borgere at gå til læge i Danmark?  (`:6403`)
    Q EN: Is it normally free for adult citizens to see a doctor in Denmark?
    A DA: Ja
    A EN: Yes
    Question ids: 2016-12-q8
  - Q DA: Er det normalt gratis for voksne borgere at gå til læge?  (`:6412`)
    Q EN: Is it normally free for adult citizens to see a doctor?
    A DA: Ja
    A EN: Yes
    Question ids: 2019-11-q8
- Trap note DA: (empty)  (`:6421`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6423`)
- Current note EN: (empty)

- **Q:2016-12-q8** · `data/questions.json:224` · exam 2016-12 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er det normalt gratis for voksne borgere at gå til læge i Danmark?  (`:228`)
  - Q EN: Is it normally free for adult citizens to see a doctor in Denmark?  (`:248`)
  - Option A DA: Ja.  (`:232`) · EN: Yes
  - Option B DA: Nej.  (`:237`) · EN: No
  - Correct (`:241`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2019-11-q8** · `data/questions.json:5002` · exam 2019-11 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er det normalt gratis for voksne borgere at gå til læge?  (`:5006`)
  - Q EN: Is it normally free for adult citizens to see a doctor?  (`:5026`)
  - Option A DA: Ja  (`:5010`) · EN: Yes
  - Option B DA: Nej  (`:5015`) · EN: No
  - Correct (`:5019`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:vel-abort · `data/clusters.json:6829` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Siden 1. juni 2025 er grænsen for fri abort 18 uger (før: 12 uger).  (`clusters.json:6831`)
- Fact EN: Since 1 June 2025 the limit for abortion on request is 18 weeks (before: 12 weeks).  (`clusters.json:6832`)
- Canonical question DA: Hvordan blev grænsen for fri abort ændret i 2025?  (`:6842`)
- Canonical question EN: How was the limit for abortion on request changed in 2025?  (`:6843`)
- Canonical answer DA: Den blev sat op fra 12 til 18 uger  (`:6844`)
- Canonical answer EN: It was raised from 12 to 18 weeks  (`:6845`)
- Variants:
  - Q DA: Hvordan blev grænsen for fri abort ændret i 2025?  (`:6848`)
    Q EN: How was the limit for free (on-request) abortion changed in 2025?
    A DA: Den blev sat op fra 12 til 18 uger
    A EN: It was raised from 12 to 18 weeks
    Question ids: 2025-11-q15
- Trap note DA: (empty)  (`:6857`)
- Trap note EN: (empty)
- Current note DA: Ældre prøver nævner '12. graviditetsuge' som forkert svar til 1915-spørgsmålet. I dag er grænsen 18 uger.  (`:6859`)
- Current note EN: Older exams mention 'week 12 of pregnancy' as a wrong answer to the 1915 question. Today the limit is 18 weeks.

- **Q:2025-11-q15** · `data/questions.json:14688` · exam 2025-11 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvordan blev grænsen for fri abort ændret i 2025?  (`:14692`)
  - Q EN: How was the limit for free (on-request) abortion changed in 2025?  (`:14712`)
  - Option A DA: Den blev sat op fra 12 til 18 uger  (`:14696`) · EN: It was raised from 12 to 18 weeks
  - Option B DA: Den blev sat ned fra 12 til 9 uger  (`:14701`) · EN: It was lowered from 12 to 9 weeks
  - Correct (`:14705`): A
  - Correct text: A) Den blev sat op fra 12 til 18 uger / It was raised from 12 to 18 weeks
  - image_note: null

#### C:vel-koerekort-17 · `data/clusters.json:6863` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Man kan få kørekort til almindelig bil fra 17 år (indtil 18 år skal man køre med en ledsager).  (`clusters.json:6865`)
- Fact EN: You can get a driving licence for an ordinary car from 17 (until 18 you must drive with an accompanying adult).  (`clusters.json:6866`)
- Canonical question DA: Hvor gammel skal man mindst være for at få kørekort til almindelig bil?  (`:6876`)
- Canonical question EN: What is the minimum age for a driving licence for an ordinary car?  (`:6877`)
- Canonical answer DA: 17 år  (`:6878`)
- Canonical answer EN: 17 years  (`:6879`)
- Variants:
  - Q DA: Hvor gammel skal man mindst være for at få kørekort til almindelig bil?  (`:6882`)
    Q EN: What is the minimum age for getting a driving licence for an ordinary car?
    A DA: 17 år
    A EN: 17 years
    Question ids: 2025-11-q2
- Trap note DA: (empty)  (`:6891`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6893`)
- Current note EN: (empty)

- **Q:2025-11-q2** · `data/questions.json:14269` · exam 2025-11 nr. 2 · section '' · answer_source: image · uncertain: false · notes: 'Key A (17 år) is correct: driving licence category B from 17 with an accompanying driver. Verified.'
  - Q DA: Hvor gammel skal man mindst være for at få kørekort til almindelig bil?  (`:14273`)
  - Q EN: What is the minimum age for getting a driving licence for an ordinary car?  (`:14298`)
  - Option A DA: 17 år  (`:14277`) · EN: 17 years
  - Option B DA: 19 år  (`:14282`) · EN: 19 years
  - Option C DA: 21 år  (`:14287`) · EN: 21 years
  - Correct (`:14291`): A
  - Correct text: A) 17 år / 17 years
  - image_note: null

#### C:vel-levetid · `data/clusters.json:6897` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Middellevetiden for mænd var ca. 80 år i 2024.  (`clusters.json:6899`)
- Fact EN: The average life expectancy for men was about 80 years in 2024.  (`clusters.json:6900`)
- Canonical question DA: Hvad var middellevetiden for mænd i 2024?  (`:6910`)
- Canonical question EN: What was the average life expectancy for men in 2024?  (`:6911`)
- Canonical answer DA: Cirka 80 år  (`:6912`)
- Canonical answer EN: About 80 years  (`:6913`)
- Variants:
  - Q DA: Hvad var middel-levetiden for mænd i 2024?  (`:6916`)
    Q EN: What was the average life expectancy for men in 2024?
    A DA: Cirka 80 år
    A EN: About 80 years
    Question ids: 2025-11-q12
- Trap note DA: (empty)  (`:6925`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6927`)
- Current note EN: (empty)

- **Q:2025-11-q12** · `data/questions.json:14594` · exam 2025-11 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad var middel-levetiden for mænd i 2024?  (`:14598`)
  - Q EN: What was the average life expectancy for men in 2024?  (`:14623`)
  - Option A DA: Cirka 70 år  (`:14602`) · EN: About 70 years
  - Option B DA: Cirka 75 år  (`:14607`) · EN: About 75 years
  - Option C DA: Cirka 80 år  (`:14612`) · EN: About 80 years
  - Correct (`:14616`): C
  - Correct text: C) Cirka 80 år / About 80 years
  - image_note: null

#### C:vel-boligstoette · `data/clusters.json:7611` · asked 1× (2019-06) · frequent: no · last asked: 2019-06

- Fact DA: Boligstøtte er hjælp til at betale husleje.  (`clusters.json:7613`)
- Fact EN: Boligstøtte (housing benefit) is help to pay rent.  (`clusters.json:7614`)
- Canonical question DA: Hvad er boligstøtte?  (`:7624`)
- Canonical question EN: What is boligstøtte?  (`:7625`)
- Canonical answer DA: Hjælp til at betale husleje  (`:7626`)
- Canonical answer EN: Help to pay rent  (`:7627`)
- Variants:
  - Q DA: Hvad er boligstøtte?  (`:7630`)
    Q EN: What is boligstøtte (housing benefit)?
    A DA: Hjælp til at betale husleje
    A EN: Help to pay rent
    Question ids: 2019-06-q23
- Trap note DA: (empty)  (`:7639`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7641`)
- Current note EN: (empty)

- **Q:2019-06-q23** · `data/questions.json:4677` · exam 2019-06 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er boligstøtte?  (`:4681`)
  - Q EN: What is boligstøtte (housing benefit)?  (`:4706`)
  - Option A DA: Hjælp til at betale husleje  (`:4685`) · EN: Help to pay rent
  - Option B DA: Hjælp til at renovere sin bolig  (`:4690`) · EN: Help to renovate your home
  - Option C DA: Hjælp til at finde en billig lejlighed  (`:4695`) · EN: Help to find a cheap flat
  - Correct (`:4699`): A
  - Correct text: A) Hjælp til at betale husleje / Help to pay rent
  - image_note: null

#### C:vel-foraeldremyndighed · `data/clusters.json:7645` · asked 1× (2019-06) · frequent: no · last asked: 2019-06

- Fact DA: Når forældrene er gift, har både faren og moren forældremyndigheden.  (`clusters.json:7647`)
- Fact EN: When the parents are married, both the father and the mother have custody.  (`clusters.json:7648`)
- Canonical question DA: Hvem har forældremyndigheden, når forældrene er gift?  (`:7658`)
- Canonical question EN: Who has custody when the parents are married?  (`:7659`)
- Canonical answer DA: Både faren og moren  (`:7660`)
- Canonical answer EN: Both the father and the mother  (`:7661`)
- Variants:
  - Q DA: Hvem har normalt forældremyndigheden over et fælles barn, når forældrene er gift med hinanden?  (`:7664`)
    Q EN: Who normally has custody (forældremyndighed) of a shared child when the parents are married to each other?
    A DA: Både faren og moren
    A EN: Both the father and the mother
    Question ids: 2019-06-q15
- Trap note DA: (empty)  (`:7673`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7675`)
- Current note EN: (empty)

- **Q:2019-06-q15** · `data/questions.json:4418` · exam 2019-06 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har normalt forældremyndigheden over et fælles barn, når forældrene er gift med hinanden?  (`:4422`)
  - Q EN: Who normally has custody (forældremyndighed) of a shared child when the parents are married to each other?  (`:4447`)
  - Option A DA: Faren  (`:4426`) · EN: The father
  - Option B DA: Moren  (`:4431`) · EN: The mother
  - Option C DA: Både faren og moren  (`:4436`) · EN: Both the father and the mother
  - Correct (`:4440`): C
  - Correct text: C) Både faren og moren / Both the father and the mother
  - image_note: null

#### C:vel-oel-vin-16 · `data/clusters.json:7985` · asked 1× (2017-06) · frequent: no · last asked: 2017-06

- Fact DA: Man skal være 16 år for at købe øl og vin (med under 16,5 % alkohol). Stærkere alkohol: 18 år.  (`clusters.json:7987`)
- Fact EN: You must be 16 to buy beer and wine (with under 16.5% alcohol). Stronger alcohol: 18.  (`clusters.json:7988`)
- Canonical question DA: Hvor gamle skal unge være, før de må købe vin og øl?  (`:7998`)
- Canonical question EN: How old must young people be before they may buy wine and beer?  (`:7999`)
- Canonical answer DA: 16 år  (`:8000`)
- Canonical answer EN: 16 years  (`:8001`)
- Variants:
  - Q DA: Hvor gamle skal unge være, før de må købe vin og øl?  (`:8004`)
    Q EN: How old must young people be before they may buy wine and beer?
    A DA: 16 år
    A EN: 16 years
    Question ids: 2017-06-q14
- Trap note DA: Øl og vin = 16. Cigaretter = 18. Kørekort = 17.  (`:8013`)
- Trap note EN: Beer and wine = 16. Cigarettes = 18. Driving licence = 17.
- Current note DA: (empty)  (`:8015`)
- Current note EN: (empty)

- **Q:2017-06-q14** · `data/questions.json:1202` · exam 2017-06 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor gamle skal unge være, før de må købe vin og øl?  (`:1206`)
  - Q EN: How old must young people be before they may buy wine and beer?  (`:1231`)
  - Option A DA: 16 år.  (`:1210`) · EN: 16 years
  - Option B DA: 18 år.  (`:1215`) · EN: 18 years
  - Option C DA: 20 år.  (`:1220`) · EN: 20 years
  - Correct (`:1224`): A
  - Correct text: A) 16 år. / 16 years
  - image_note: null


## 7. Uddannelse og børn / Education and children  (`topic:uddannelse`, `data/topics.json:358`)

### Intro paragraphs (`I:uddannelse:n`)

- **I:uddannelse:1** · `data/topics.json:365` (EN `:366`)
  - DA: Små børn går i dagpleje (i et privat hjem) eller vuggestue (0-3 år) og derefter i børnehave (3-6 år). Næsten alle børn mellem 3 og 5 år bliver passet uden for hjemmet. Kommunerne står for daginstitutionerne.
  - EN: Small children go to a childminder (in a private home) or a nursery (0–3) and then to kindergarten (3–6). Almost all children aged 3 to 5 are looked after outside the home. The municipalities run day care.
- **I:uddannelse:2** · `data/topics.json:369` (EN `:370`)
  - DA: Der er 10 års undervisningspligt. Børn begynder i 0. klasse, når de er 5-6 år. De fleste går i kommunale folkeskoler, som er gratis. Friskoler og privatskoler koster penge for forældrene. I skolebestyrelsen sidder både forældre og elever. Man kan gå på efterskole i 8., 9. og 10. klasse.
  - EN: There are 10 years of compulsory education. Children start year 0 at 5–6. Most go to municipal folkeskoler, which are free. Free schools and private schools cost money for the parents. The school board includes both parents and pupils. You can attend an efterskole in years 8, 9 and 10.
- **I:uddannelse:3** · `data/topics.json:373` (EN `:374`)
  - DA: Karaktererne gives efter 7-trinsskalaen, og 12 er den højeste karakter. Eleverne får karakterer fra 8. klasse. Det offentlige gymnasium er gratis, og man kan få SU fra 18 år. Elektrikere uddannes på en erhvervsskole, og læger på et universitet.
  - EN: Grades are given on the 7-point scale, and 12 is the highest grade. Pupils get grades from year 8. The public gymnasium is free, and you can get SU from 18. Electricians train at a vocational school, and doctors at a university.

### Current facts – "Ændret siden prøven" (`F:uddannelse:n`)

- (none)

### Overview tables / fact groups (`G:…`)

- G:fg-hvem-styrer – full entry above under topic demokrati (also used here)
- G:fg-aldre – full entry above under topic velfaerd (also used here)
- G:fg-tal – full entry above under topic demokrati (also used here)
- G:fg-gratis – full entry above under topic arbejde (also used here)
#### G:fg-boernepasning · `data/fact_groups.json:1788`

- Title DA: Børn: pasning og skole
- Title EN: Children: day care and school
- Columns DA: Hvad | Alder / klasse
- Columns EN: What | Age / year
- Rows (DA / EN, one per row):
  - DA: Dagpleje (i et privat hjem) | 0-3 år
    EN: Childminder (in a private home) | 0–3
  - DA: Vuggestue | 0-3 år (fx 2 år)
    EN: Nursery | 0–3 (e.g. age 2)
  - DA: Børnehave | 3-6 år (fx 4 år)
    EN: Kindergarten | 3–6 (e.g. age 4)
  - DA: 0. klasse (skolestart) | 5-6 år
    EN: Year 0 (start of school) | 5–6
  - DA: Undervisningspligt | 10 år (0.-9. klasse)
    EN: Compulsory education | 10 years (years 0–9)
  - DA: Karakterer (7-trinsskalaen, højest 12) | Fra 8. klasse
    EN: Grades (7-point scale, highest 12) | From year 8
  - DA: Efterskole | 8., 9. og 10. klasse
    EN: Efterskole | Years 8, 9 and 10
  - DA: SU | Fra 18 år
    EN: SU (education grant) | From 18
- Mnemonic DA: Vugge = baby (vuggestue, 0-3). Børnehave = 3-6. Skole fra 6. Karakterer og efterskole fra 8. klasse.
- Mnemonic EN: Vugge = cradle (nursery, 0–3). Kindergarten = 3–6. School from 6. Grades and efterskole from year 8.
- Cluster links: udd-boernehave-vuggestue, udd-dagpleje, udd-skolestart, udd-undervisningspligt, udd-karakter-12, udd-karakterer-8-klasse, udd-efterskole, udd-su-18

### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:udd-undervisningspligt · `data/clusters.json:381` · asked 8× (2016-12, 2017-06, 2018-11, 2019-11, 2020-11, 2022-06, 2023-11, 2024-11) · frequent: yes · last asked: 2024-11

- Fact DA: Der er 10 års undervisningspligt i Danmark (0.–9. klasse).  (`clusters.json:383`)
- Fact EN: There are 10 years of compulsory education in Denmark (years 0–9).  (`clusters.json:384`)
- Canonical question DA: Hvor mange års undervisningspligt har danske børn?  (`:408`)
- Canonical question EN: How many years of compulsory education do Danish children have?  (`:409`)
- Canonical answer DA: 10 år  (`:410`)
- Canonical answer EN: 10 years  (`:411`)
- Variants:
  - Q DA: Hvor mange års undervisningspligt har danske børn?  (`:414`)
    Q EN: How many years of compulsory education do Danish children have?
    A DA: 10 år
    A EN: 10 years
    Question ids: 2016-12-q18, 2019-11-q18
  - Q DA: Hvor mange års undervisningspligt er der i Danmark?  (`:424`)
    Q EN: How many years of compulsory education are there in Denmark?
    A DA: 10 år
    A EN: 10 years
    Question ids: 2017-06-q8, 2020-11-q3
  - Q DA: Hvor mange års undervisningspligt har danske børn?  (`:414`)
    Q EN: How many years of compulsory education do Danish children have?
    A DA: 10
    A EN: 10
    Question ids: 2018-11-q14
  - Q DA: Hvor mange års undervisning skal børn i Danmark mindst have?  (`:443`)
    Q EN: What is the minimum number of years of education children in Denmark must have?
    A DA: 10 år
    A EN: 10 years
    Question ids: 2022-06-q22
  - Q DA: Hvor mange år går børn normalt i folkeskolen?  (`:452`)
    Q EN: How many years do children normally go to the folkeskole?
    A DA: 10 år
    A EN: 10 years
    Question ids: 2023-11-q14
  - Q DA: Hvor mange års undervisning skal børn i Danmark normalt have?  (`:461`)
    Q EN: How many years of education must children in Denmark normally have?
    A DA: Mindst 10 år
    A EN: At least 10 years
    Question ids: 2024-11-q22
- Trap note DA: Det hedder undervisningspligt – ikke skolepligt. 'Hvor mange år går børn normalt i folkeskolen?' = også 10 år.  (`:470`)
- Trap note EN: It is called compulsory education (undervisningspligt) – not compulsory school. 'How many years do children normally go to folkeskole?' = also 10 years.
- Current note DA: (empty)  (`:472`)
- Current note EN: (empty)

- **Q:2016-12-q18** · `data/questions.json:539` · exam 2016-12 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisningspligt har danske børn?  (`:543`)
  - Q EN: How many years of compulsory education do Danish children have?  (`:568`)
  - Option A DA: 7 år.  (`:547`) · EN: 7 years
  - Option B DA: 10 år.  (`:552`) · EN: 10 years
  - Option C DA: 13 år.  (`:557`) · EN: 13 years
  - Correct (`:561`): B
  - Correct text: B) 10 år. / 10 years
  - image_note: null
- **Q:2017-06-q8** · `data/questions.json:1014` · exam 2017-06 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisningspligt er der i Danmark?  (`:1018`)
  - Q EN: How many years of compulsory education are there in Denmark?  (`:1043`)
  - Option A DA: 7 år.  (`:1022`) · EN: 7 years
  - Option B DA: 10 år.  (`:1027`) · EN: 10 years
  - Option C DA: 12 år.  (`:1032`) · EN: 12 years
  - Correct (`:1036`): B
  - Correct text: B) 10 år. / 10 years
  - image_note: null
- **Q:2018-11-q14** · `data/questions.json:3580` · exam 2018-11 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisningspligt har danske børn?  (`:3584`)
  - Q EN: How many years of compulsory education do Danish children have?  (`:3609`)
  - Option A DA: 10  (`:3588`) · EN: 10
  - Option B DA: 12  (`:3593`) · EN: 12
  - Option C DA: 13  (`:3598`) · EN: 13
  - Correct (`:3602`): A
  - Correct text: A) 10 / 10
  - image_note: null
- **Q:2019-11-q18** · `data/questions.json:5312` · exam 2019-11 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisningspligt har danske børn?  (`:5316`)
  - Q EN: How many years of compulsory education do Danish children have?  (`:5341`)
  - Option A DA: 7 år  (`:5320`) · EN: 7 years
  - Option B DA: 10 år  (`:5325`) · EN: 10 years
  - Option C DA: 13 år  (`:5330`) · EN: 13 years
  - Correct (`:5334`): B
  - Correct text: B) 10 år / 10 years
  - image_note: null
- **Q:2020-11-q3** · `data/questions.json:6417` · exam 2020-11 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisningspligt er der i Danmark?  (`:6421`)
  - Q EN: How many years of compulsory education are there in Denmark?  (`:6446`)
  - Option A DA: 7 år  (`:6425`) · EN: 7 years
  - Option B DA: 10 år  (`:6430`) · EN: 10 years
  - Option C DA: 13 år  (`:6435`) · EN: 13 years
  - Correct (`:6439`): B
  - Correct text: B) 10 år / 10 years
  - image_note: null
- **Q:2022-06-q22** · `data/questions.json:9364` · exam 2022-06 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisning skal børn i Danmark mindst have?  (`:9368`)
  - Q EN: What is the minimum number of years of education children in Denmark must have?  (`:9393`)
  - Option A DA: 7 år  (`:9372`) · EN: 7 years
  - Option B DA: 10 år  (`:9377`) · EN: 10 years
  - Option C DA: 13 år  (`:9382`) · EN: 13 years
  - Correct (`:9386`): B
  - Correct text: B) 10 år / 10 years
  - image_note: null
- **Q:2023-11-q14** · `data/questions.json:11470` · exam 2023-11 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange år går børn normalt i folkeskolen?  (`:11474`)
  - Q EN: How many years do children normally go to the folkeskole?  (`:11499`)
  - Option A DA: 10 år  (`:11478`) · EN: 10 years
  - Option B DA: 12 år  (`:11483`) · EN: 12 years
  - Option C DA: 14 år  (`:11488`) · EN: 14 years
  - Correct (`:11492`): A
  - Correct text: A) 10 år / 10 years
  - image_note: null
- **Q:2024-11-q22** · `data/questions.json:13319` · exam 2024-11 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange års undervisning skal børn i Danmark normalt have?  (`:13323`)
  - Q EN: How many years of education must children in Denmark normally have?  (`:13348`)
  - Option A DA: Mindst 10 år  (`:13327`) · EN: At least 10 years
  - Option B DA: Mindst 12 år  (`:13332`) · EN: At least 12 years
  - Option C DA: Mindst 14 år  (`:13337`) · EN: At least 14 years
  - Correct (`:13341`): A
  - Correct text: A) Mindst 10 år / At least 10 years
  - image_note: null

#### C:udd-karakter-12 · `data/clusters.json:1040` · asked 6× (2016-12, 2017-11, 2018-06, 2019-11, 2022-06, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: Danmark bruger 7-trinsskalaen. Den højeste karakter er 12.  (`clusters.json:1042`)
- Fact EN: Denmark uses the 7-point grading scale. The highest grade is 12.  (`clusters.json:1043`)
- Canonical question DA: Hvad er den højeste karakter på 7-trins-skalaen?  (`:1063`)
- Canonical question EN: What is the highest grade on the 7-point scale?  (`:1064`)
- Canonical answer DA: 12  (`:1065`)
- Canonical answer EN: 12  (`:1066`)
- Variants:
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen?  (`:1069`)
    Q EN: What is the highest grade on the 7-point grading scale?
    A DA: 12
    A EN: 12
    Question ids: 2016-12-q19, 2019-11-q19, 2022-06-q16
  - Q DA: Hvad hedder den karakterskala, der anvendes i det danske uddannelsessystem?  (`:1080`)
    Q EN: What is the grading scale used in the Danish education system called?
    A DA: 7-trinsskalaen
    A EN: The 7-point scale
    Question ids: 2017-11-q5
  - Q DA: Hvad er den højeste karakter på 7-trinsskalaen?  (`:1089`)
    Q EN: What is the highest grade on the 7-point scale?
    A DA: 12
    A EN: 12
    Question ids: 2018-06-q13
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen, som man bruger i det danske uddannelsessystem?  (`:1098`)
    Q EN: What is the highest grade on the 7-point scale used in the Danish education system?
    A DA: 12
    A EN: 12
    Question ids: 2023-11-q8
- Trap note DA: Skalaen hedder '7-trins' (fordi der er 7 karakterer: -3, 00, 02, 4, 7, 10, 12), men den højeste karakter er 12 – ikke 7.  (`:1107`)
- Trap note EN: The scale is called '7-point' (because there are 7 grades: -3, 00, 02, 4, 7, 10, 12), but the highest grade is 12 – not 7.
- Current note DA: (empty)  (`:1109`)
- Current note EN: (empty)

- **Q:2016-12-q19** · `data/questions.json:572` · exam 2016-12 nr. 19 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen?  (`:576`)
  - Q EN: What is the highest grade on the 7-point grading scale?  (`:601`)
  - Option A DA: 7.  (`:580`) · EN: 7
  - Option B DA: 10.  (`:585`) · EN: 10
  - Option C DA: 12.  (`:590`) · EN: 12
  - Correct (`:594`): C
  - Correct text: C) 12. / 12
  - image_note: null
- **Q:2017-11-q5** · `data/questions.json:1695` · exam 2017-11 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad hedder den karakterskala, der anvendes i det danske uddannelsessystem?  (`:1699`)
  - Q EN: What is the grading scale used in the Danish education system called?  (`:1724`)
  - Option A DA: 13-trinsskalaen  (`:1703`) · EN: The 13-point scale
  - Option B DA: 10-trinsskalaen  (`:1708`) · EN: The 10-point scale
  - Option C DA: 7-trinsskalaen  (`:1713`) · EN: The 7-point scale
  - Correct (`:1717`): C
  - Correct text: C) 7-trinsskalaen / The 7-point scale
  - image_note: null
- **Q:2018-06-q13** · `data/questions.json:2747` · exam 2018-06 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den højeste karakter på 7-trinsskalaen?  (`:2751`)
  - Q EN: What is the highest grade on the 7-point scale?  (`:2776`)
  - Option A DA: 7  (`:2755`) · EN: 7
  - Option B DA: 10  (`:2760`) · EN: 10
  - Option C DA: 12  (`:2765`) · EN: 12
  - Correct (`:2769`): C
  - Correct text: C) 12 / 12
  - image_note: null
- **Q:2019-11-q19** · `data/questions.json:5345` · exam 2019-11 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen?  (`:5349`)
  - Q EN: What is the highest grade on the 7-point grading scale?  (`:5374`)
  - Option A DA: 7  (`:5353`) · EN: 7
  - Option B DA: 10  (`:5358`) · EN: 10
  - Option C DA: 12  (`:5363`) · EN: 12
  - Correct (`:5367`): C
  - Correct text: C) 12 / 12
  - image_note: null
- **Q:2022-06-q16** · `data/questions.json:9166` · exam 2022-06 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen?  (`:9170`)
  - Q EN: What is the highest grade on the 7-point grading scale?  (`:9195`)
  - Option A DA: 7  (`:9174`) · EN: 7
  - Option B DA: 10  (`:9179`) · EN: 10
  - Option C DA: 12  (`:9184`) · EN: 12
  - Correct (`:9188`): C
  - Correct text: C) 12 / 12
  - image_note: null
- **Q:2023-11-q8** · `data/questions.json:11277` · exam 2023-11 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er den højeste karakter på 7-trins-skalaen, som man bruger i det danske uddannelsessystem?  (`:11281`)
  - Q EN: What is the highest grade on the 7-point scale used in the Danish education system?  (`:11306`)
  - Option A DA: 7  (`:11285`) · EN: 7
  - Option B DA: 10  (`:11290`) · EN: 10
  - Option C DA: 12  (`:11295`) · EN: 12
  - Correct (`:11299`): C
  - Correct text: C) 12 / 12
  - image_note: null

#### C:udd-gymnasium-gratis · `data/clusters.json:2167` · asked 5× (2016-12, 2019-06, 2019-11, 2021-06, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: Undervisningen på de offentlige gymnasier er gratis.  (`clusters.json:2169`)
- Fact EN: Teaching at the public upper-secondary schools (gymnasier) is free.  (`clusters.json:2170`)
- Canonical question DA: Er undervisningen gratis på de offentlige gymnasier?  (`:2188`)
- Canonical question EN: Is teaching free at the public gymnasier?  (`:2189`)
- Canonical answer DA: Ja  (`:2190`)
- Canonical answer EN: Yes  (`:2191`)
- Variants:
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:2194`)
    Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?
    A DA: Ja
    A EN: Yes
    Question ids: 2016-12-q22, 2019-06-q20, 2019-11-q22, 2021-06-q8, 2022-11-q18
- Trap note DA: (empty)  (`:2207`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:2209`)
- Current note EN: (empty)

- **Q:2016-12-q22** · `data/questions.json:666` · exam 2016-12 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:670`)
  - Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?  (`:690`)
  - Option A DA: Ja.  (`:674`) · EN: Yes
  - Option B DA: Nej.  (`:679`) · EN: No
  - Correct (`:683`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2019-06-q20** · `data/questions.json:4583` · exam 2019-06 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:4587`)
  - Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?  (`:4607`)
  - Option A DA: Ja  (`:4591`) · EN: Yes
  - Option B DA: Nej  (`:4596`) · EN: No
  - Correct (`:4600`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2019-11-q22** · `data/questions.json:5439` · exam 2019-11 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:5443`)
  - Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?  (`:5463`)
  - Option A DA: Ja  (`:5447`) · EN: Yes
  - Option B DA: Nej  (`:5452`) · EN: No
  - Correct (`:5456`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-06-q8** · `data/questions.json:7357` · exam 2021-06 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:7361`)
  - Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?  (`:7381`)
  - Option A DA: Nej  (`:7365`) · EN: No
  - Option B DA: Ja  (`:7370`) · EN: Yes
  - Correct (`:7374`): B
  - Correct text: B) Ja / Yes
  - image_note: null
- **Q:2022-11-q18** · `data/questions.json:10022` · exam 2022-11 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er undervisningen gratis på de offentlige gymnasier?  (`:10026`)
  - Q EN: Is teaching free at the public upper-secondary schools (gymnasier)?  (`:10046`)
  - Option A DA: Ja  (`:10030`) · EN: Yes
  - Option B DA: Nej  (`:10035`) · EN: No
  - Correct (`:10039`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:udd-friskole-betale · `data/clusters.json:2377` · asked 4× (2020-06, 2021-11, 2024-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Forældre skal normalt betale for, at deres børn går i friskole eller privatskole. Folkeskolen er gratis.  (`clusters.json:2379`)
- Fact EN: Parents normally have to pay for their children to attend a free school or private school. The folkeskole is free.  (`clusters.json:2380`)
- Canonical question DA: Skal forældre normalt betale for, at deres børn går i friskole eller privatskole?  (`:2396`)
- Canonical question EN: Do parents normally have to pay for friskole or private school?  (`:2397`)
- Canonical answer DA: Ja  (`:2398`)
- Canonical answer EN: Yes  (`:2399`)
- Variants:
  - Q DA: Skal forældrene normalt betale noget for, at deres børn går i en friskole eller privatskole?  (`:2402`)
    Q EN: Do parents normally have to pay something for their children to attend a free school (friskole) or private school?
    A DA: Ja
    A EN: Yes
    Question ids: 2020-06-q25
  - Q DA: Skal forældre normalt betale for, at deres børn går i en friskole eller privatskole?  (`:2411`)
    Q EN: Do parents normally have to pay for their children to attend a free school (friskole) or private school?
    A DA: Ja
    A EN: Yes
    Question ids: 2021-11-q9, 2024-11-q23, 2026-06-q17
- Trap note DA: (empty)  (`:2422`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:2424`)
- Current note EN: (empty)

- **Q:2020-06-q25** · `data/questions.json:6323` · exam 2020-06 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal forældrene normalt betale noget for, at deres børn går i en friskole eller privatskole?  (`:6327`)
  - Q EN: Do parents normally have to pay something for their children to attend a free school (friskole) or private school?  (`:6347`)
  - Option A DA: Ja  (`:6331`) · EN: Yes
  - Option B DA: Nej  (`:6336`) · EN: No
  - Correct (`:6340`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-11-q9** · `data/questions.json:8150` · exam 2021-11 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Skal forældre normalt betale for, at deres børn går i en friskole eller privatskole?  (`:8154`)
  - Q EN: Do parents normally have to pay for their children to attend a free school (friskole) or private school?  (`:8174`)
  - Option A DA: Ja  (`:8158`) · EN: Yes
  - Option B DA: Nej  (`:8163`) · EN: No
  - Correct (`:8167`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-11-q23** · `data/questions.json:13352` · exam 2024-11 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal forældre normalt betale for, at deres børn går i en friskole eller privatskole?  (`:13356`)
  - Q EN: Do parents normally have to pay for their children to attend a free school (friskole) or private school?  (`:13376`)
  - Option A DA: Ja  (`:13360`) · EN: Yes
  - Option B DA: Nej  (`:13365`) · EN: No
  - Correct (`:13369`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2026-06-q17** · `data/questions.json:15539` · exam 2026-06 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal forældre normalt betale for, at deres børn går i en friskole eller privatskole?  (`:15543`)
  - Q EN: Do parents normally have to pay for their children to attend a free school (friskole) or private school?  (`:15563`)
  - Option A DA: Ja  (`:15547`) · EN: Yes
  - Option B DA: Nej  (`:15552`) · EN: No
  - Correct (`:15556`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:udd-boernehave-vuggestue · `data/clusters.json:2621` · asked 4× (2022-11, 2023-11, 2025-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: Børn på 0-3 år går i vuggestue. Børn på 3-6 år går i børnehave.  (`clusters.json:2623`)
- Fact EN: Children aged 0–3 go to a nursery (vuggestue). Children aged 3–6 go to a kindergarten (børnehave).  (`clusters.json:2624`)
- Canonical question DA: Hvilken daginstitution går børn normalt i, når de er fire år?  (`:2640`)
- Canonical question EN: Which day-care institution do children normally attend when they are four?  (`:2641`)
- Canonical answer DA: Børnehave (4 år). Vuggestue (2 år).  (`:2642`)
- Canonical answer EN: Kindergarten (age 4). Nursery (age 2).  (`:2643`)
- Variants:
  - Q DA: I hvilken type daginstitution går børn typisk, når de er fire år?  (`:2646`)
    Q EN: Which type of day-care institution do children typically attend when they are four?
    A DA: Børnehave
    A EN: Kindergarten (børnehave)
    Question ids: 2022-11-q2
  - Q DA: I hvilken type institution går børn typisk, når de er fire år  (`:2655`)
    Q EN: Which type of institution do children typically attend when they are four?
    A DA: Børnehave
    A EN: Kindergarten (børnehave)
    Question ids: 2023-11-q25
  - Q DA: Hvilken daginstitution går børn normalt i, når de er fire år?  (`:2664`)
    Q EN: Which day-care institution do children normally attend when they are four?
    A DA: Børnehave
    A EN: Kindergarten (børnehave)
    Question ids: 2025-05-q14
  - Q DA: Hvilken slags daginstitution går børn normalt i, når de er to år?  (`:2673`)
    Q EN: Which kind of day-care institution do children normally attend when they are two?
    A DA: Vuggestue
    A EN: Nursery (vuggestue)
    Question ids: 2025-11-q14
- Trap note DA: Læs alderen! 4 år = børnehave. 2 år = vuggestue.  (`:2682`)
- Trap note EN: Read the age! Age 4 = kindergarten. Age 2 = nursery.
- Current note DA: (empty)  (`:2684`)
- Current note EN: (empty)

- **Q:2022-11-q2** · `data/questions.json:9519` · exam 2022-11 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: I hvilken type daginstitution går børn typisk, når de er fire år?  (`:9523`)
  - Q EN: Which type of day-care institution do children typically attend when they are four?  (`:9543`)
  - Option A DA: Vuggestue  (`:9527`) · EN: Nursery (vuggestue)
  - Option B DA: Børnehave  (`:9532`) · EN: Kindergarten (børnehave)
  - Correct (`:9536`): B
  - Correct text: B) Børnehave / Kindergarten (børnehave)
  - image_note: null
- **Q:2023-11-q25** · `data/questions.json:11818` · exam 2023-11 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: I hvilken type institution går børn typisk, når de er fire år  (`:11822`)
  - Q EN: Which type of institution do children typically attend when they are four?  (`:11842`)
  - Option A DA: Vuggestue  (`:11826`) · EN: Nursery (vuggestue)
  - Option B DA: Børnehave  (`:11831`) · EN: Kindergarten (børnehave)
  - Correct (`:11835`): B
  - Correct text: B) Børnehave / Kindergarten (børnehave)
  - image_note: null
- **Q:2025-05-q14** · `data/questions.json:13850` · exam 2025-05 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken daginstitution går børn normalt i, når de er fire år?  (`:13854`)
  - Q EN: Which day-care institution do children normally attend when they are four?  (`:13874`)
  - Option A DA: Vuggestue  (`:13858`) · EN: Nursery (vuggestue)
  - Option B DA: Børnehave  (`:13863`) · EN: Kindergarten (børnehave)
  - Correct (`:13867`): B
  - Correct text: B) Børnehave / Kindergarten (børnehave)
  - image_note: null
- **Q:2025-11-q14** · `data/questions.json:14660` · exam 2025-11 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken slags daginstitution går børn normalt i, når de er to år?  (`:14664`)
  - Q EN: Which kind of day-care institution do children normally attend when they are two?  (`:14684`)
  - Option A DA: Vuggestue  (`:14668`) · EN: Nursery (vuggestue)
  - Option B DA: Børnehave  (`:14673`) · EN: Kindergarten (børnehave)
  - Correct (`:14677`): A
  - Correct text: A) Vuggestue / Nursery (vuggestue)
  - image_note: null

#### C:udd-su-18 · `data/clusters.json:3654` · asked 4× (2017-06, 2019-06, 2020-06, 2021-11) · frequent: yes · last asked: 2021-11

- Fact DA: Man kan tidligst få SU, når man fylder 18 år.  (`clusters.json:3656`)
- Fact EN: The earliest you can get SU (the State Education Grant) is when you turn 18.  (`clusters.json:3657`)
- Canonical question DA: Hvornår kan man tidligst få SU?  (`:3673`)
- Canonical question EN: What is the earliest you can get SU?  (`:3674`)
- Canonical answer DA: Når man fylder 18 år  (`:3675`)
- Canonical answer EN: When you turn 18  (`:3676`)
- Variants:
  - Q DA: Hvornår kan man tidligst få SU (Statens Uddannelsesstøtte)?  (`:3679`)
    Q EN: What is the earliest you can get SU (the State Education Grant)?
    A DA: Når man fylder 18 år
    A EN: When you turn 18
    Question ids: 2017-06-q9
  - Q DA: Hvor gammel skal man være for at kunne få statens uddannelsesstøtte (SU)?  (`:3688`)
    Q EN: How old must you be to get the State Education Grant (SU)?
    A DA: 18 år
    A EN: 18 years
    Question ids: 2019-06-q3
  - Q DA: Hvornår kan man som hjemmeboende tidligst få SU (Statens Uddannelsesstøtte)?  (`:3697`)
    Q EN: If you live with your parents, what is the earliest you can get SU (the State Education Grant)?
    A DA: Når man fylder 18 år
    A EN: When you turn 18
    Question ids: 2020-06-q4, 2021-11-q7
- Trap note DA: (empty)  (`:3707`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3709`)
- Current note EN: (empty)

- **Q:2017-06-q9** · `data/questions.json:1047` · exam 2017-06 nr. 9 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår kan man tidligst få SU (Statens Uddannelsesstøtte)?  (`:1051`)
  - Q EN: What is the earliest you can get SU (the State Education Grant)?  (`:1076`)
  - Option A DA: Når man fylder 15 år.  (`:1055`) · EN: When you turn 15
  - Option B DA: Når man fylder 18 år.  (`:1060`) · EN: When you turn 18
  - Option C DA: Når man fylder 21 år.  (`:1065`) · EN: When you turn 21
  - Correct (`:1069`): B
  - Correct text: B) Når man fylder 18 år. / When you turn 18
  - image_note: null
- **Q:2019-06-q3** · `data/questions.json:4032` · exam 2019-06 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gammel skal man være for at kunne få statens uddannelsesstøtte (SU)?  (`:4036`)
  - Q EN: How old must you be to get the State Education Grant (SU)?  (`:4061`)
  - Option A DA: 6 år  (`:4040`) · EN: 6 years
  - Option B DA: 12 år  (`:4045`) · EN: 12 years
  - Option C DA: 18 år  (`:4050`) · EN: 18 years
  - Correct (`:4054`): C
  - Correct text: C) 18 år / 18 years
  - image_note: null
- **Q:2020-06-q4** · `data/questions.json:5665` · exam 2020-06 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår kan man som hjemmeboende tidligst få SU (Statens Uddannelsesstøtte)?  (`:5669`)
  - Q EN: If you live with your parents, what is the earliest you can get SU (the State Education Grant)?  (`:5694`)
  - Option A DA: Når man fylder 14 år  (`:5673`) · EN: When you turn 14
  - Option B DA: Når man fylder 16 år  (`:5678`) · EN: When you turn 16
  - Option C DA: Når man fylder 18 år  (`:5683`) · EN: When you turn 18
  - Correct (`:5687`): C
  - Correct text: C) Når man fylder 18 år / When you turn 18
  - image_note: null
- **Q:2021-11-q7** · `data/questions.json:8089` · exam 2021-11 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår kan man som hjemmeboende tidligst få SU (Statens Uddannelsesstøtte)?  (`:8093`)
  - Q EN: If you live with your parents, what is the earliest you can get SU (the State Education Grant)?  (`:8118`)
  - Option A DA: Når man fylder 14 år  (`:8097`) · EN: When you turn 14
  - Option B DA: Når man fylder 16 år  (`:8102`) · EN: When you turn 16
  - Option C DA: Når man fylder 18 år  (`:8107`) · EN: When you turn 18
  - Correct (`:8111`): C
  - Correct text: C) Når man fylder 18 år / When you turn 18
  - image_note: null

#### C:udd-efterskole · `data/clusters.json:5321` · asked 2× (2024-05, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Man kan gå på efterskole i 8., 9. og 10. klasse.  (`clusters.json:5323`)
- Fact EN: You can attend an efterskole in years 8, 9 and 10.  (`clusters.json:5324`)
- Canonical question DA: På hvilke klassetrin kan man gå på efterskole?  (`:5336`)
- Canonical question EN: In which school years can you attend an efterskole?  (`:5337`)
- Canonical answer DA: 8., 9. og 10. klasse  (`:5338`)
- Canonical answer EN: Years 8, 9 and 10  (`:5339`)
- Variants:
  - Q DA: På hvilke klassetrin kan man vælge at gå på efterskole?  (`:5342`)
    Q EN: In which school years can you choose to attend an efterskole (boarding school for teenagers)?
    A DA: 8., 9. og 10. klasse
    A EN: Years 8, 9 and 10
    Question ids: 2024-05-q14
  - Q DA: På hvilke klassetrin kan man gå på efterskole?  (`:5351`)
    Q EN: In which school years can you attend an efterskole?
    A DA: 8., 9. og 10. klasse
    A EN: Years 8, 9 and 10
    Question ids: 2025-11-q1
- Trap note DA: (empty)  (`:5360`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5362`)
- Current note EN: (empty)

- **Q:2024-05-q14** · `data/questions.json:12270` · exam 2024-05 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: På hvilke klassetrin kan man vælge at gå på efterskole?  (`:12274`)
  - Q EN: In which school years can you choose to attend an efterskole (boarding school for teenagers)?  (`:12299`)
  - Option A DA: 0., 1. og 2. klasse  (`:12278`) · EN: Years 0, 1 and 2
  - Option B DA: 4., 5. og 6. klasse  (`:12283`) · EN: Years 4, 5 and 6
  - Option C DA: 8., 9. og 10. klasse  (`:12288`) · EN: Years 8, 9 and 10
  - Correct (`:12292`): C
  - Correct text: C) 8., 9. og 10. klasse / Years 8, 9 and 10
  - image_note: null
- **Q:2025-11-q1** · `data/questions.json:14236` · exam 2025-11 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: På hvilke klassetrin kan man gå på efterskole?  (`:14240`)
  - Q EN: In which school years can you attend an efterskole?  (`:14265`)
  - Option A DA: 0., 1. og 2. klasse  (`:14244`) · EN: Years 0, 1 and 2
  - Option B DA: 4., 5. og 6. klasse  (`:14249`) · EN: Years 4, 5 and 6
  - Option C DA: 8., 9. og 10. klasse  (`:14254`) · EN: Years 8, 9 and 10
  - Correct (`:14258`): C
  - Correct text: C) 8., 9. og 10. klasse / Years 8, 9 and 10
  - image_note: null

#### C:udd-skolestart · `data/clusters.json:6247` · asked 2× (2018-11, 2021-06) · frequent: no · last asked: 2021-06

- Fact DA: Børn begynder normalt i skole (0. klasse), når de er 5-6 år.  (`clusters.json:6249`)
- Fact EN: Children normally start school (year 0) when they are 5–6.  (`clusters.json:6250`)
- Canonical question DA: Hvor gamle er børn normalt, når de begynder i skolen?  (`:6262`)
- Canonical question EN: How old are children normally when they start school?  (`:6263`)
- Canonical answer DA: 5-6 år  (`:6264`)
- Canonical answer EN: 5–6 years old  (`:6265`)
- Variants:
  - Q DA: Hvor gamle er børn normalt, når de begynder i skolen?  (`:6268`)
    Q EN: How old are children normally when they start school?
    A DA: 5-6 år
    A EN: 5–6 years old
    Question ids: 2018-11-q20
  - Q DA: Hvor gamle er børn normalt, når de begynder i 0. klasse i skolen?  (`:6277`)
    Q EN: How old are children normally when they start in year 0 (0. klasse, the reception class) at school?
    A DA: 5-6 år
    A EN: 5–6 years old
    Question ids: 2021-06-q18
- Trap note DA: (empty)  (`:6286`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6288`)
- Current note EN: (empty)

- **Q:2018-11-q20** · `data/questions.json:3773` · exam 2018-11 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor gamle er børn normalt, når de begynder i skolen?  (`:3777`)
  - Q EN: How old are children normally when they start school?  (`:3802`)
  - Option A DA: 3-4 år  (`:3781`) · EN: 3–4 years old
  - Option B DA: 5-6 år  (`:3786`) · EN: 5–6 years old
  - Option C DA: 7-8 år  (`:3791`) · EN: 7–8 years old
  - Correct (`:3795`): B
  - Correct text: B) 5-6 år / 5–6 years old
  - image_note: null
- **Q:2021-06-q18** · `data/questions.json:7667` · exam 2021-06 nr. 18 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor gamle er børn normalt, når de begynder i 0. klasse i skolen?  (`:7671`)
  - Q EN: How old are children normally when they start in year 0 (0. klasse, the reception class) at school?  (`:7696`)
  - Option A DA: 3-4 år  (`:7675`) · EN: 3–4 years old
  - Option B DA: 5-6 år  (`:7680`) · EN: 5–6 years old
  - Option C DA: 7-8 år  (`:7685`) · EN: 7–8 years old
  - Correct (`:7689`): B
  - Correct text: B) 5-6 år / 5–6 years old
  - image_note: null

#### C:udd-folkeskole-flest · `data/clusters.json:6591` · asked 1× (2026-06) · frequent: no · last asked: 2026-06

- Fact DA: De fleste børn går i kommunale folkeskoler.  (`clusters.json:6593`)
- Fact EN: Most children go to municipal folkeskoler (public schools).  (`clusters.json:6594`)
- Canonical question DA: Hvor går de fleste børn i skole?  (`:6604`)
- Canonical question EN: Where do most children go to school?  (`:6605`)
- Canonical answer DA: Kommunale folkeskoler  (`:6606`)
- Canonical answer EN: Municipal folkeskoler  (`:6607`)
- Variants:
  - Q DA: Hvor går de fleste børn i skole?  (`:6610`)
    Q EN: Where do most children go to school?
    A DA: Kommunale folkeskoler
    A EN: Municipal folkeskoler (public schools)
    Question ids: 2026-06-q1
- Trap note DA: (empty)  (`:6619`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6621`)
- Current note EN: (empty)

- **Q:2026-06-q1** · `data/questions.json:15031` · exam 2026-06 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor går de fleste børn i skole?  (`:15035`)
  - Q EN: Where do most children go to school?  (`:15055`)
  - Option A DA: Kommunale folkeskoler  (`:15039`) · EN: Municipal folkeskoler (public schools)
  - Option B DA: Private grundskoler  (`:15044`) · EN: Private primary schools
  - Correct (`:15048`): A
  - Correct text: A) Kommunale folkeskoler / Municipal folkeskoler (public schools)
  - image_note: null

#### C:udd-karakterer-8-klasse · `data/clusters.json:7407` · asked 1× (2023-05) · frequent: no · last asked: 2023-05

- Fact DA: Eleverne i folkeskolen får karakterer fra 8. klasse.  (`clusters.json:7409`)
- Fact EN: Pupils in the folkeskole get grades from year 8.  (`clusters.json:7410`)
- Canonical question DA: Hvornår begynder eleverne i folkeskolen at få karakterer?  (`:7420`)
- Canonical question EN: When do pupils in the folkeskole start getting grades?  (`:7421`)
- Canonical answer DA: 8. klasse  (`:7422`)
- Canonical answer EN: Year 8  (`:7423`)
- Variants:
  - Q DA: Hvornår begynder eleverne i den danske folkeskole at få karakterer efter 7-trins-skalaen?  (`:7426`)
    Q EN: When do pupils in the Danish folkeskole start getting grades on the 7-point scale?
    A DA: 8. klasse
    A EN: Year 8
    Question ids: 2023-05-q7
- Trap note DA: (empty)  (`:7435`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7437`)
- Current note EN: (empty)

- **Q:2023-05-q7** · `data/questions.json:10459` · exam 2023-05 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår begynder eleverne i den danske folkeskole at få karakterer efter 7-trins-skalaen?  (`:10463`)
  - Q EN: When do pupils in the Danish folkeskole start getting grades on the 7-point scale?  (`:10488`)
  - Option A DA: 0. klasse  (`:10467`) · EN: Year 0 (reception class)
  - Option B DA: 4. klasse  (`:10472`) · EN: Year 4
  - Option C DA: 8. klasse  (`:10477`) · EN: Year 8
  - Correct (`:10481`): C
  - Correct text: C) 8. klasse / Year 8
  - image_note: null

#### C:udd-boern-passes · `data/clusters.json:7509` · asked 1× (2019-11) · frequent: no · last asked: 2019-11

- Fact DA: Næsten alle børn mellem 3 og 5 år bliver passet uden for hjemmet.  (`clusters.json:7511`)
- Fact EN: Almost all children aged 3 to 5 are looked after outside the home.  (`clusters.json:7512`)
- Canonical question DA: Hvor mange børn mellem tre og fem år passes uden for hjemmet?  (`:7522`)
- Canonical question EN: How many children aged three to five are looked after outside the home?  (`:7523`)
- Canonical answer DA: Næsten alle  (`:7524`)
- Canonical answer EN: Almost all  (`:7525`)
- Variants:
  - Q DA: Hvor mange børn mellem tre og fem år passes uden for hjemmet?  (`:7528`)
    Q EN: How many children aged three to five are looked after outside the home?
    A DA: Næsten alle
    A EN: Almost all
    Question ids: 2019-11-q13
- Trap note DA: (empty)  (`:7537`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7539`)
- Current note EN: (empty)

- **Q:2019-11-q13** · `data/questions.json:5157` · exam 2019-11 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor mange børn mellem tre og fem år passes uden for hjemmet?  (`:5161`)
  - Q EN: How many children aged three to five are looked after outside the home?  (`:5186`)
  - Option A DA: Næsten alle  (`:5165`) · EN: Almost all
  - Option B DA: Ca. tre fjerdedele  (`:5170`) · EN: About three quarters
  - Option C DA: Ca. halvdelen  (`:5175`) · EN: About half
  - Correct (`:5179`): A
  - Correct text: A) Næsten alle / Almost all
  - image_note: null

#### C:udd-dagpleje · `data/clusters.json:7543` · asked 1× (2019-06) · frequent: no · last asked: 2019-06

- Fact DA: I en dagpleje bliver barnet passet i et privat hjem af en dagplejer.  (`clusters.json:7545`)
- Fact EN: In dagpleje the child is looked after in a private home by a childminder.  (`clusters.json:7546`)
- Canonical question DA: I hvilken pasningsordning bliver barnet passet i et privat hjem?  (`:7556`)
- Canonical question EN: In which childcare arrangement is the child looked after in a private home?  (`:7557`)
- Canonical answer DA: I en dagpleje  (`:7558`)
- Canonical answer EN: With a childminder (dagpleje)  (`:7559`)
- Variants:
  - Q DA: I hvilken pasningsordning bliver barnet passet i et privat hjem?  (`:7562`)
    Q EN: In which childcare arrangement is the child looked after in a private home?
    A DA: I en dagpleje
    A EN: With a childminder (dagpleje)
    Question ids: 2019-06-q19
- Trap note DA: (empty)  (`:7571`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7573`)
- Current note EN: (empty)

- **Q:2019-06-q19** · `data/questions.json:4550` · exam 2019-06 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: I hvilken pasningsordning bliver barnet passet i et privat hjem?  (`:4554`)
  - Q EN: In which childcare arrangement is the child looked after in a private home?  (`:4579`)
  - Option A DA: I en udflytterbørnehave  (`:4558`) · EN: In an outdoor kindergarten outside town (udflytterbørnehave)
  - Option B DA: I en dagpleje  (`:4563`) · EN: With a childminder (dagpleje)
  - Option C DA: I en SFO  (`:4568`) · EN: In an after-school club (SFO)
  - Correct (`:4572`): B
  - Correct text: B) I en dagpleje / With a childminder (dagpleje)
  - image_note: null

#### C:udd-laege-universitet · `data/clusters.json:7577` · asked 1× (2019-06) · frequent: no · last asked: 2019-06

- Fact DA: Man læser medicin og bliver læge på et universitet.  (`clusters.json:7579`)
- Fact EN: You study medicine and become a doctor at a university.  (`clusters.json:7580`)
- Canonical question DA: Hvor kan man læse medicin og uddanne sig til læge?  (`:7590`)
- Canonical question EN: Where can you study medicine and train to be a doctor?  (`:7591`)
- Canonical answer DA: På et universitet  (`:7592`)
- Canonical answer EN: At a university  (`:7593`)
- Variants:
  - Q DA: Hvor kan man læse medicin og uddanne sig til læge?  (`:7596`)
    Q EN: Where can you study medicine and train to be a doctor?
    A DA: På et universitet
    A EN: At a university
    Question ids: 2019-06-q21
- Trap note DA: (empty)  (`:7605`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7607`)
- Current note EN: (empty)

- **Q:2019-06-q21** · `data/questions.json:4611` · exam 2019-06 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor kan man læse medicin og uddanne sig til læge?  (`:4615`)
  - Q EN: Where can you study medicine and train to be a doctor?  (`:4640`)
  - Option A DA: På et erhvervsakademi  (`:4619`) · EN: At a business academy (erhvervsakademi)
  - Option B DA: På en professionshøjskole  (`:4624`) · EN: At a university college (professionshøjskole)
  - Option C DA: På et universitet  (`:4629`) · EN: At a university
  - Correct (`:4633`): C
  - Correct text: C) På et universitet / At a university
  - image_note: null

#### C:udd-elektriker · `data/clusters.json:7849` · asked 1× (2018-06) · frequent: no · last asked: 2018-06

- Fact DA: Man uddanner sig til elektriker på en erhvervsskole.  (`clusters.json:7851`)
- Fact EN: You train as an electrician at a vocational school (erhvervsskole).  (`clusters.json:7852`)
- Canonical question DA: Hvor kan man få en uddannelse til elektriker?  (`:7862`)
- Canonical question EN: Where can you train to be an electrician?  (`:7863`)
- Canonical answer DA: På en erhvervsskole  (`:7864`)
- Canonical answer EN: At a vocational school  (`:7865`)
- Variants:
  - Q DA: Hvor kan man få en uddannelse til elektriker?  (`:7868`)
    Q EN: Where can you train to be an electrician?
    A DA: På en erhvervsskole
    A EN: At a vocational school (erhvervsskole)
    Question ids: 2018-06-q2
- Trap note DA: (empty)  (`:7877`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7879`)
- Current note EN: (empty)

- **Q:2018-06-q2** · `data/questions.json:2399` · exam 2018-06 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor kan man få en uddannelse til elektriker?  (`:2403`)
  - Q EN: Where can you train to be an electrician?  (`:2428`)
  - Option A DA: På et gymnasium  (`:2407`) · EN: At an upper-secondary school (gymnasium)
  - Option B DA: På en handelsskole  (`:2412`) · EN: At a business school (handelsskole)
  - Option C DA: På en erhvervsskole  (`:2417`) · EN: At a vocational school (erhvervsskole)
  - Correct (`:2421`): C
  - Correct text: C) På en erhvervsskole / At a vocational school (erhvervsskole)
  - image_note: null

#### C:udd-skolebestyrelse · `data/clusters.json:7951` · asked 1× (2017-06) · frequent: no · last asked: 2017-06

- Fact DA: I en skolebestyrelse sidder der både forældrerepræsentanter og elevrepræsentanter.  (`clusters.json:7953`)
- Fact EN: A school board has both parent representatives and pupil representatives.  (`clusters.json:7954`)
- Canonical question DA: Sidder der også elevrepræsentanter i en skolebestyrelse?  (`:7964`)
- Canonical question EN: Are there also pupil representatives on a school board?  (`:7965`)
- Canonical answer DA: Ja  (`:7966`)
- Canonical answer EN: Yes  (`:7967`)
- Variants:
  - Q DA: Der sidder forældrerepræsentanter i en skolebestyrelse. Sidder der også elevrepræsentanter?  (`:7970`)
    Q EN: There are parent representatives on a school board. Are there also pupil representatives?
    A DA: Ja
    A EN: Yes
    Question ids: 2017-06-q22
- Trap note DA: (empty)  (`:7979`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7981`)
- Current note EN: (empty)

- **Q:2017-06-q22** · `data/questions.json:1451` · exam 2017-06 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Der sidder forældrerepræsentanter i en skolebestyrelse. Sidder der også elevrepræsentanter?  (`:1455`)
  - Q EN: There are parent representatives on a school board. Are there also pupil representatives?  (`:1475`)
  - Option A DA: Ja.  (`:1459`) · EN: Yes
  - Option B DA: Nej.  (`:1464`) · EN: No
  - Correct (`:1468`): A
  - Correct text: A) Ja. / Yes
  - image_note: null


## 8. Kultur og kendte danskere / Culture and famous Danes  (`topic:kultur`, `data/topics.json:405`)

### Intro paragraphs (`I:kultur:n`)

- **I:kultur:1** · `data/topics.json:412` (EN `:413`)
  - DA: H.C. Andersen (1805-1875) skrev eventyr, fx Den Grimme Ælling. Karen Blixen og Ludvig Holberg var også forfattere, og Yahya Hassan (1995-2020) var digter. Søren Kierkegaard (1813-1855) var filosof. N.F.S. Grundtvig fik stor betydning for højskolerne i 1800-tallet.
  - EN: H.C. Andersen (1805–1875) wrote fairy tales, e.g. The Ugly Duckling. Karen Blixen and Ludvig Holberg were also authors, and Yahya Hassan (1995–2020) was a poet. Søren Kierkegaard (1813–1855) was a philosopher. N.F.S. Grundtvig was very important for the folk high schools in the 1800s.
- **I:kultur:2** · `data/topics.json:416` (EN `:417`)
  - DA: P.S. Krøyer var kunstmaler, og Carl Nielsen komponerede musik. Arkitekten Arne Jacobsen tegnede Nationalbanken og stolen Ægget. Thomas Vinterberg og Susanne Bier er filminstruktører – Vinterberg vandt en Oscar i 2021 for Druk. Popgruppen Aqua udgav Barbie Girl i 1990'erne.
  - EN: P.S. Krøyer was a painter, and Carl Nielsen composed music. The architect Arne Jacobsen designed the National Bank and the Egg chair. Thomas Vinterberg and Susanne Bier are film directors – Vinterberg won an Oscar in 2021 for Druk. The pop group Aqua released Barbie Girl in the 1990s.

### Current facts – "Ændret siden prøven" (`F:kultur:n`)

- (none)

### Overview tables / fact groups (`G:…`)

#### G:fg-kendte · `data/fact_groups.json:1024`

- Title DA: Kendte danskere
- Title EN: Famous Danes
- Columns DA: Person | Kendt for
- Columns EN: Person | Known for
- Rows (DA / EN, one per row):
  - DA: H.C. Andersen (1805-1875) | Forfatter – eventyr, fx Den Grimme Ælling
    EN: H.C. Andersen (1805–1875) | Author – fairy tales, e.g. The Ugly Duckling
  - DA: Karen Blixen | Forfatter – skrev bøger (Den afrikanske farm)
    EN: Karen Blixen | Author – wrote books (Out of Africa)
  - DA: Ludvig Holberg | Forfatter – komedier (1700-tallet)
    EN: Ludvig Holberg | Author – comedies (1700s)
  - DA: Søren Kierkegaard (1813-1855) | Filosof
    EN: Søren Kierkegaard (1813–1855) | Philosopher
  - DA: N.F.S. Grundtvig | Højskolerne (1800-tallet)
    EN: N.F.S. Grundtvig | The folk high schools (1800s)
  - DA: P.S. Krøyer | Kunstmaler (Skagensmaler)
    EN: P.S. Krøyer | Painter (Skagen Painter)
  - DA: Carl Nielsen | Komponist (musik)
    EN: Carl Nielsen | Composer (music)
  - DA: Arne Jacobsen | Arkitekt/designer – Nationalbanken, stolen Ægget
    EN: Arne Jacobsen | Architect/designer – the National Bank, the Egg chair
  - DA: Yahya Hassan (1995-2020) | Digter
    EN: Yahya Hassan (1995–2020) | Poet
  - DA: Thomas Vinterberg | Filminstruktør – Oscar 2021 for Druk
    EN: Thomas Vinterberg | Film director – Oscar 2021 for Druk
  - DA: Susanne Bier | Filminstruktør – Oscar for Hævnen
    EN: Susanne Bier | Film director – Oscar for Hævnen (In a Better World)
  - DA: Aqua | Popgruppe – Barbie Girl (1990'erne)
    EN: Aqua | Pop group – Barbie Girl (1990s)
  - DA: Helle Thorning-Schmidt | Første kvindelige statsminister (2011)
    EN: Helle Thorning-Schmidt | First female prime minister (2011)
- Mnemonic DA: Skrev: Andersen, Blixen, Holberg (+ digteren Yahya Hassan). Tænkte: Kierkegaard. Skolede: Grundtvig. Malede: Krøyer. Komponerede: Nielsen. Tegnede: Jacobsen. Filmede: Vinterberg og Bier.
- Mnemonic EN: Wrote: Andersen, Blixen, Holberg (+ the poet Yahya Hassan). Thought: Kierkegaard. Schooled: Grundtvig. Painted: Krøyer. Composed: Nielsen. Designed: Jacobsen. Filmed: Vinterberg and Bier.
- Cluster links: kul-hca-levede, kul-grimme-aelling, kul-blixen, kul-holberg, kul-kierkegaard, kul-grundtvig, kul-kroeyer, kul-carl-nielsen, kul-arne-jacobsen, kul-yahya-hassan, kul-druk, kul-bier-vinterberg, kul-aqua

### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:kul-hca-levede · `data/clusters.json:2105` · asked 5× (2016-12, 2018-11, 2019-11, 2021-06, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: H.C. Andersen levede 1805-1875 (i 1800-tallet).  (`clusters.json:2107`)
- Fact EN: H.C. Andersen lived 1805–1875 (in the 1800s).  (`clusters.json:2108`)
- Canonical question DA: Hvornår levede forfatteren H.C. Andersen?  (`:2126`)
- Canonical question EN: When did the author H.C. Andersen live?  (`:2127`)
- Canonical answer DA: 1805-1875 – i 1800-tallet  (`:2128`)
- Canonical answer EN: 1805–1875 – in the 1800s  (`:2129`)
- Variants:
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:2132`)
    Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?
    A DA: 1805-1875
    A EN: 1805–1875
    Question ids: 2016-12-q20, 2019-11-q20, 2021-06-q10
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:2132`)
    Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?
    A DA: 1800-tallet
    A EN: The 1800s
    Question ids: 2018-11-q17
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:2132`)
    Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?
    A DA: I 1800-tallet
    A EN: In the 1800s
    Question ids: 2022-11-q17
- Trap note DA: Spørgsmålet kan bede om årstallene (1805-1875) eller århundredet (1800-tallet).  (`:2161`)
- Trap note EN: The question may ask for the years (1805–1875) or the century (the 1800s).
- Current note DA: (empty)  (`:2163`)
- Current note EN: (empty)

- **Q:2016-12-q20** · `data/questions.json:605` · exam 2016-12 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:609`)
  - Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?  (`:634`)
  - Option A DA: 1805-1875.  (`:613`) · EN: 1805–1875
  - Option B DA: 1855-1925.  (`:618`) · EN: 1855–1925
  - Option C DA: 1905-1975.  (`:623`) · EN: 1905–1975
  - Correct (`:627`): A
  - Correct text: A) 1805-1875. / 1805–1875
  - image_note: null
- **Q:2018-11-q17** · `data/questions.json:3679` · exam 2018-11 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:3683`)
  - Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?  (`:3708`)
  - Option A DA: 1700-tallet  (`:3687`) · EN: The 1700s
  - Option B DA: 1800-tallet  (`:3692`) · EN: The 1800s
  - Option C DA: 1900-tallet  (`:3697`) · EN: The 1900s
  - Correct (`:3701`): B
  - Correct text: B) 1800-tallet / The 1800s
  - image_note: null
- **Q:2019-11-q20** · `data/questions.json:5378` · exam 2019-11 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:5382`)
  - Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?  (`:5407`)
  - Option A DA: 1805-1875  (`:5386`) · EN: 1805–1875
  - Option B DA: 1855-1925  (`:5391`) · EN: 1855–1925
  - Option C DA: 1905-1975  (`:5396`) · EN: 1905–1975
  - Correct (`:5400`): A
  - Correct text: A) 1805-1875 / 1805–1875
  - image_note: null
- **Q:2021-06-q10** · `data/questions.json:7413` · exam 2021-06 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:7417`)
  - Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?  (`:7442`)
  - Option A DA: 1805-1875  (`:7421`) · EN: 1805–1875
  - Option B DA: 1855-1925  (`:7426`) · EN: 1855–1925
  - Option C DA: 1905-1975  (`:7431`) · EN: 1905–1975
  - Correct (`:7435`): A
  - Correct text: A) 1805-1875 / 1805–1875
  - image_note: null
- **Q:2022-11-q17** · `data/questions.json:9989` · exam 2022-11 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår levede forfatteren H.C. Andersen?  (`:9993`)
  - Q EN: When did the author H.C. Andersen (Hans Christian Andersen) live?  (`:10018`)
  - Option A DA: I 1700-tallet  (`:9997`) · EN: In the 1700s
  - Option B DA: I 1800-tallet  (`:10002`) · EN: In the 1800s
  - Option C DA: I 1900-tallet  (`:10007`) · EN: In the 1900s
  - Correct (`:10011`): B
  - Correct text: B) I 1800-tallet / In the 1800s
  - image_note: null

#### C:kul-grimme-aelling · `data/clusters.json:2798` · asked 4× (2018-06, 2020-11, 2022-06, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: H.C. Andersen skrev eventyret 'Den Grimme Ælling'.  (`clusters.json:2800`)
- Fact EN: H.C. Andersen wrote the fairy tale 'The Ugly Duckling'.  (`clusters.json:2801`)
- Canonical question DA: Hvem har skrevet eventyret Den Grimme Ælling?  (`:2817`)
- Canonical question EN: Who wrote the fairy tale The Ugly Duckling?  (`:2818`)
- Canonical answer DA: H.C. Andersen  (`:2819`)
- Canonical answer EN: H.C. Andersen  (`:2820`)
- Variants:
  - Q DA: Hvilken forfatter har skrevet eventyret ’Den Grimme Ælling’  (`:2823`)
    Q EN: Which author wrote the fairy tale 'The Ugly Duckling' (Den Grimme Ælling)?
    A DA: H.C. Andersen
    A EN: H.C. Andersen (Hans Christian Andersen)
    Question ids: 2018-06-q10
  - Q DA: Hvilken forfatter har skrevet eventyret Den Grimme Ælling?  (`:2832`)
    Q EN: Which author wrote the fairy tale The Ugly Duckling?
    A DA: H.C. Andersen
    A EN: H.C. Andersen (Hans Christian Andersen)
    Question ids: 2020-11-q20, 2022-06-q15
  - Q DA: Hvem har skrevet fortællingen Den Grimme Ælling?  (`:2842`)
    Q EN: Who wrote the story The Ugly Duckling?
    A DA: H.C. Andersen
    A EN: H.C. Andersen (Hans Christian Andersen)
    Question ids: 2025-05-q24
- Trap note DA: Ikke Karen Blixen og ikke Benny Andersen (to andre forfattere).  (`:2851`)
- Trap note EN: Not Karen Blixen and not Benny Andersen (two other writers).
- Current note DA: (empty)  (`:2853`)
- Current note EN: (empty)

- **Q:2018-06-q10** · `data/questions.json:2653` · exam 2018-06 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken forfatter har skrevet eventyret ’Den Grimme Ælling’  (`:2657`)
  - Q EN: Which author wrote the fairy tale 'The Ugly Duckling' (Den Grimme Ælling)?  (`:2682`)
  - Option A DA: Karen Blixen  (`:2661`) · EN: Karen Blixen
  - Option B DA: H.C. Andersen  (`:2666`) · EN: H.C. Andersen (Hans Christian Andersen)
  - Option C DA: Benny Andersen  (`:2671`) · EN: Benny Andersen
  - Correct (`:2675`): B
  - Correct text: B) H.C. Andersen / H.C. Andersen (Hans Christian Andersen)
  - image_note: null
- **Q:2020-11-q20** · `data/questions.json:6953` · exam 2020-11 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken forfatter har skrevet eventyret Den Grimme Ælling?  (`:6957`)
  - Q EN: Which author wrote the fairy tale The Ugly Duckling?  (`:6982`)
  - Option A DA: Karen Blixen  (`:6961`) · EN: Karen Blixen
  - Option B DA: H.C. Andersen  (`:6966`) · EN: H.C. Andersen (Hans Christian Andersen)
  - Option C DA: Benny Andersen  (`:6971`) · EN: Benny Andersen
  - Correct (`:6975`): B
  - Correct text: B) H.C. Andersen / H.C. Andersen (Hans Christian Andersen)
  - image_note: null
- **Q:2022-06-q15** · `data/questions.json:9133` · exam 2022-06 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken forfatter har skrevet eventyret Den Grimme Ælling?  (`:9137`)
  - Q EN: Which author wrote the fairy tale The Ugly Duckling?  (`:9162`)
  - Option A DA: Karen Blixen  (`:9141`) · EN: Karen Blixen
  - Option B DA: H.C. Andersen  (`:9146`) · EN: H.C. Andersen (Hans Christian Andersen)
  - Option C DA: Benny Andersen  (`:9151`) · EN: Benny Andersen
  - Correct (`:9155`): B
  - Correct text: B) H.C. Andersen / H.C. Andersen (Hans Christian Andersen)
  - image_note: null
- **Q:2025-05-q24** · `data/questions.json:14170` · exam 2025-05 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem har skrevet fortællingen Den Grimme Ælling?  (`:14174`)
  - Q EN: Who wrote the story The Ugly Duckling?  (`:14199`)
  - Option A DA: H.C. Andersen  (`:14178`) · EN: H.C. Andersen (Hans Christian Andersen)
  - Option B DA: Karen Blixen  (`:14183`) · EN: Karen Blixen
  - Option C DA: Ludvig Holberg  (`:14188`) · EN: Ludvig Holberg
  - Correct (`:14192`): A
  - Correct text: A) H.C. Andersen / H.C. Andersen (Hans Christian Andersen)
  - image_note: null

#### C:kul-druk · `data/clusters.json:3999` · asked 3× (2022-06, 2024-05, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Thomas Vinterberg vandt en Oscar i 2021 for filmen 'Druk'.  (`clusters.json:4001`)
- Fact EN: Thomas Vinterberg won an Oscar in 2021 for the film 'Druk' (Another Round).  (`clusters.json:4002`)
- Canonical question DA: For hvilken film vandt Thomas Vinterberg en Oscar i 2021?  (`:4016`)
- Canonical question EN: For which film did Thomas Vinterberg win an Oscar in 2021?  (`:4017`)
- Canonical answer DA: Druk  (`:4018`)
- Canonical answer EN: Druk (Another Round)  (`:4019`)
- Variants:
  - Q DA: For hvilken film vandt Thomas Vinterberg en Oscar i 2021?  (`:4022`)
    Q EN: For which film did Thomas Vinterberg win an Oscar in 2021?
    A DA: Druk
    A EN: Druk (Another Round)
    Question ids: 2022-06-q17, 2024-05-q22, 2026-06-q20
- Trap note DA: 'Hævnen' er Susanne Biers Oscar-film (2011) – ikke Vinterbergs.  (`:4033`)
- Trap note EN: 'Hævnen' (In a Better World) is Susanne Bier's Oscar film (2011) – not Vinterberg's.
- Current note DA: (empty)  (`:4035`)
- Current note EN: (empty)

- **Q:2022-06-q17** · `data/questions.json:9199` · exam 2022-06 nr. 17 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: For hvilken film vandt Thomas Vinterberg en Oscar i 2021?  (`:9203`)
  - Q EN: For which film did Thomas Vinterberg win an Oscar in 2021?  (`:9228`)
  - Option A DA: Druk  (`:9207`) · EN: Druk (Another Round)
  - Option B DA: Pelle Erobreren  (`:9212`) · EN: Pelle Erobreren (Pelle the Conqueror)
  - Option C DA: Kundskabens Træ  (`:9217`) · EN: Kundskabens Træ (The Tree of Knowledge)
  - Correct (`:9221`): A
  - Correct text: A) Druk / Druk (Another Round)
  - image_note: null
- **Q:2024-05-q22** · `data/questions.json:12534` · exam 2024-05 nr. 22 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: For hvilken film vandt Thomas Vinterberg en Oscar i 2021?  (`:12538`)
  - Q EN: For which film did Thomas Vinterberg win an Oscar in 2021?  (`:12563`)
  - Option A DA: Druk  (`:12542`) · EN: Druk (Another Round)
  - Option B DA: Hævnen  (`:12547`) · EN: Hævnen (In a Better World)
  - Option C DA: Nattevagten  (`:12552`) · EN: Nattevagten (Nightwatch)
  - Correct (`:12556`): A
  - Correct text: A) Druk / Druk (Another Round)
  - image_note: null
- **Q:2026-06-q20** · `data/questions.json:15633` · exam 2026-06 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: For hvilken film vandt Thomas Vinterberg en Oscar i 2021?  (`:15637`)
  - Q EN: For which film did Thomas Vinterberg win an Oscar in 2021?  (`:15662`)
  - Option A DA: Druk  (`:15641`) · EN: Druk (Another Round)
  - Option B DA: Hævnen  (`:15646`) · EN: Hævnen (In a Better World)
  - Option C DA: Nattevagten  (`:15651`) · EN: Nattevagten (Nightwatch)
  - Correct (`:15655`): A
  - Correct text: A) Druk / Druk (Another Round)
  - image_note: null

#### C:kul-yahya-hassan · `data/clusters.json:4087` · asked 3× (2022-06, 2023-11, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Yahya Hassan (1995-2020) var digter.  (`clusters.json:4089`)
- Fact EN: Yahya Hassan (1995–2020) was a poet.  (`clusters.json:4090`)
- Canonical question DA: Hvad var Yahya Hassan særligt kendt for?  (`:4104`)
- Canonical question EN: What was Yahya Hassan especially known for?  (`:4105`)
- Canonical answer DA: Han var digter  (`:4106`)
- Canonical answer EN: He was a poet  (`:4107`)
- Variants:
  - Q DA: Hvad var Yahya Hassan særligt kendt for?  (`:4110`)
    Q EN: What was Yahya Hassan especially known for?
    A DA: Han var digter
    A EN: He was a poet
    Question ids: 2022-06-q6, 2023-11-q24
  - Q DA: Hvad var Yahya Hassan (1995-2020) særligt kendt for?  (`:4120`)
    Q EN: What was Yahya Hassan (1995–2020) especially known for?
    A DA: Han var digter
    A EN: He was a poet
    Question ids: 2025-11-q8
- Trap note DA: (empty)  (`:4129`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4131`)
- Current note EN: (empty)

- **Q:2022-06-q6** · `data/questions.json:8851` · exam 2022-06 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad var Yahya Hassan særligt kendt for?  (`:8855`)
  - Q EN: What was Yahya Hassan especially known for?  (`:8880`)
  - Option A DA: Han var digter  (`:8859`) · EN: He was a poet
  - Option B DA: Han var fodboldspiller  (`:8864`) · EN: He was a footballer
  - Option C DA: Han var skuespiller  (`:8869`) · EN: He was an actor
  - Correct (`:8873`): A
  - Correct text: A) Han var digter / He was a poet
  - image_note: null
- **Q:2023-11-q24** · `data/questions.json:11785` · exam 2023-11 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad var Yahya Hassan særligt kendt for?  (`:11789`)
  - Q EN: What was Yahya Hassan especially known for?  (`:11814`)
  - Option A DA: Han var skuespiller  (`:11793`) · EN: He was an actor
  - Option B DA: Han var fodboldspiller  (`:11798`) · EN: He was a footballer
  - Option C DA: Han var digter  (`:11803`) · EN: He was a poet
  - Correct (`:11807`): C
  - Correct text: C) Han var digter / He was a poet
  - image_note: null
- **Q:2025-11-q8** · `data/questions.json:14462` · exam 2025-11 nr. 8 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad var Yahya Hassan (1995-2020) særligt kendt for?  (`:14466`)
  - Q EN: What was Yahya Hassan (1995–2020) especially known for?  (`:14491`)
  - Option A DA: Han var musiker  (`:14470`) · EN: He was a musician
  - Option B DA: Han var digter  (`:14475`) · EN: He was a poet
  - Option C DA: Han var fodboldspiller  (`:14480`) · EN: He was a footballer
  - Correct (`:14484`): B
  - Correct text: B) Han var digter / He was a poet
  - image_note: null

#### C:kul-kroeyer · `data/clusters.json:4391` · asked 3× (2017-11, 2021-11, 2023-05) · frequent: no · last asked: 2023-05

- Fact DA: P.S. Krøyer var kunstmaler (en af Skagensmalerne).  (`clusters.json:4393`)
- Fact EN: P.S. Krøyer was a painter (one of the Skagen Painters).  (`clusters.json:4394`)
- Canonical question DA: Hvad er P.S. Krøyer særlig kendt for?  (`:4408`)
- Canonical question EN: What is P.S. Krøyer especially known for?  (`:4409`)
- Canonical answer DA: Han var kunstmaler  (`:4410`)
- Canonical answer EN: He was a painter  (`:4411`)
- Variants:
  - Q DA: Hvad er P.S. Krøyer særlig kendt for?  (`:4414`)
    Q EN: What is P.S. Krøyer especially known for?
    A DA: Han var kunstmaler
    A EN: He was a painter
    Question ids: 2017-11-q21, 2021-11-q14, 2023-05-q8
- Trap note DA: (empty)  (`:4425`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4427`)
- Current note EN: (empty)

- **Q:2017-11-q21** · `data/questions.json:2208` · exam 2017-11 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er P.S. Krøyer særlig kendt for?  (`:2212`)
  - Q EN: What is P.S. Krøyer especially known for?  (`:2237`)
  - Option A DA: Han var forfatter  (`:2216`) · EN: He was an author
  - Option B DA: Han var komponist  (`:2221`) · EN: He was a composer
  - Option C DA: Han var kunstmaler  (`:2226`) · EN: He was a painter
  - Correct (`:2230`): C
  - Correct text: C) Han var kunstmaler / He was a painter
  - image_note: null
- **Q:2021-11-q14** · `data/questions.json:8305` · exam 2021-11 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er P.S. Krøyer særlig kendt for?  (`:8309`)
  - Q EN: What is P.S. Krøyer especially known for?  (`:8334`)
  - Option A DA: Han var videnskabsmand  (`:8313`) · EN: He was a scientist
  - Option B DA: Han var politiker  (`:8318`) · EN: He was a politician
  - Option C DA: Han var kunstmaler  (`:8323`) · EN: He was a painter
  - Correct (`:8327`): C
  - Correct text: C) Han var kunstmaler / He was a painter
  - image_note: null
- **Q:2023-05-q8** · `data/questions.json:10492` · exam 2023-05 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er P.S. Krøyer særlig kendt for?  (`:10496`)
  - Q EN: What is P.S. Krøyer especially known for?  (`:10521`)
  - Option A DA: Han var kunstmaler  (`:10500`) · EN: He was a painter
  - Option B DA: Han var politiker  (`:10505`) · EN: He was a politician
  - Option C DA: Han var videnskabsmand  (`:10510`) · EN: He was a scientist
  - Correct (`:10514`): A
  - Correct text: A) Han var kunstmaler / He was a painter
  - image_note: null

#### C:kul-aqua · `data/clusters.json:5276` · asked 2× (2023-11, 2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Popgruppen Aqua udgav 'Barbie Girl' i 1990'erne.  (`clusters.json:5278`)
- Fact EN: The pop group Aqua released 'Barbie Girl' in the 1990s.  (`clusters.json:5279`)
- Canonical question DA: Hvilken popgruppe udgav nummeret 'Barbie Girl' i 1990'erne?  (`:5291`)
- Canonical question EN: Which pop group released 'Barbie Girl' in the 1990s?  (`:5292`)
- Canonical answer DA: Aqua  (`:5293`)
- Canonical answer EN: Aqua  (`:5294`)
- Variants:
  - Q DA: Hvilken popgruppe udgav nummeret 'Barbie Girl' i 1990'erne?  (`:5297`)
    Q EN: Which pop group released the song 'Barbie Girl' in the 1990s?
    A DA: Aqua
    A EN: Aqua
    Question ids: 2023-11-q3
  - Q DA: Hvilken popgruppe udgav nummeret Barbie Girl i 1990’erne?  (`:5306`)
    Q EN: Which pop group released the song Barbie Girl in the 1990s?
    A DA: Aqua
    A EN: Aqua
    Question ids: 2025-11-q7
- Trap note DA: (empty)  (`:5315`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5317`)
- Current note EN: (empty)

- **Q:2023-11-q3** · `data/questions.json:11117` · exam 2023-11 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken popgruppe udgav nummeret 'Barbie Girl' i 1990'erne?  (`:11121`)
  - Q EN: Which pop group released the song 'Barbie Girl' in the 1990s?  (`:11146`)
  - Option A DA: Gasolin  (`:11125`) · EN: Gasolin'
  - Option B DA: Aqua  (`:11130`) · EN: Aqua
  - Option C DA: Nik & Jay  (`:11135`) · EN: Nik & Jay
  - Correct (`:11139`): B
  - Correct text: B) Aqua / Aqua
  - image_note: null
- **Q:2025-11-q7** · `data/questions.json:14429` · exam 2025-11 nr. 7 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken popgruppe udgav nummeret Barbie Girl i 1990’erne?  (`:14433`)
  - Q EN: Which pop group released the song Barbie Girl in the 1990s?  (`:14458`)
  - Option A DA: Gasolin  (`:14437`) · EN: Gasolin'
  - Option B DA: Me & My  (`:14442`) · EN: Me & My
  - Option C DA: Aqua  (`:14447`) · EN: Aqua
  - Correct (`:14451`): C
  - Correct text: C) Aqua / Aqua
  - image_note: null

#### C:kul-kierkegaard · `data/clusters.json:5665` · asked 2× (2022-11, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Søren Kierkegaard (1813-1855) var filosof.  (`clusters.json:5667`)
- Fact EN: Søren Kierkegaard (1813–1855) was a philosopher.  (`clusters.json:5668`)
- Canonical question DA: Hvad er Søren Kierkegaard særligt kendt for?  (`:5680`)
- Canonical question EN: What is Søren Kierkegaard especially known for?  (`:5681`)
- Canonical answer DA: Han var filosof  (`:5682`)
- Canonical answer EN: He was a philosopher  (`:5683`)
- Variants:
  - Q DA: Hvad var Søren Kierkegaard (1813-1855) særligt kendt for?  (`:5686`)
    Q EN: What was Søren Kierkegaard (1813–1855) especially known for?
    A DA: Han var filosof
    A EN: He was a philosopher
    Question ids: 2022-11-q23
  - Q DA: Hvad er Søren Kierkegaard (1813-55) særligt kendt for?  (`:5695`)
    Q EN: What is Søren Kierkegaard (1813–55) especially known for?
    A DA: Han var filosof
    A EN: He was a philosopher
    Question ids: 2025-05-q23
- Trap note DA: (empty)  (`:5704`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:5706`)
- Current note EN: (empty)

- **Q:2022-11-q23** · `data/questions.json:10167` · exam 2022-11 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad var Søren Kierkegaard (1813-1855) særligt kendt for?  (`:10171`)
  - Q EN: What was Søren Kierkegaard (1813–1855) especially known for?  (`:10196`)
  - Option A DA: Han var kunstmaler  (`:10175`) · EN: He was a painter
  - Option B DA: Han var politiker  (`:10180`) · EN: He was a politician
  - Option C DA: Han var filosof  (`:10185`) · EN: He was a philosopher
  - Correct (`:10189`): C
  - Correct text: C) Han var filosof / He was a philosopher
  - image_note: null
- **Q:2025-05-q23** · `data/questions.json:14137` · exam 2025-05 nr. 23 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Søren Kierkegaard (1813-55) særligt kendt for?  (`:14141`)
  - Q EN: What is Søren Kierkegaard (1813–55) especially known for?  (`:14166`)
  - Option A DA: Han var kunstmaler  (`:14145`) · EN: He was a painter
  - Option B DA: Han var filosof  (`:14150`) · EN: He was a philosopher
  - Option C DA: Han var fysiker  (`:14155`) · EN: He was a physicist
  - Correct (`:14159`): B
  - Correct text: B) Han var filosof / He was a philosopher
  - image_note: null

#### C:kul-grundtvig · `data/clusters.json:5710` · asked 2× (2023-05, 2024-11) · frequent: no · last asked: 2024-11

- Fact DA: N.F.S. Grundtvig fik stor betydning for højskolerne i 1800-tallet.  (`clusters.json:5712`)
- Fact EN: N.F.S. Grundtvig was very important for the folk high schools in the 1800s.  (`clusters.json:5713`)
- Canonical question DA: Hvem fik især betydning for højskolerne i 1800-tallet?  (`:5725`)
- Canonical question EN: Who was especially important for the folk high schools in the 1800s?  (`:5726`)
- Canonical answer DA: N.F.S. Grundtvig  (`:5727`)
- Canonical answer EN: N.F.S. Grundtvig  (`:5728`)
- Variants:
  - Q DA: Hvem fik især betydning for højskolerne i 1800-tallet?  (`:5731`)
    Q EN: Who was especially important for the folk high schools (højskolerne) in the 1800s?
    A DA: N.F.S. Grundtvig
    A EN: N.F.S. Grundtvig
    Question ids: 2023-05-q1, 2024-11-q13
- Trap note DA: Højskole = Grundtvig. Kierkegaard = filosof. Holberg = forfatter. Krøyer = maler.  (`:5741`)
- Trap note EN: Folk high school = Grundtvig. Kierkegaard = philosopher. Holberg = author. Krøyer = painter.
- Current note DA: (empty)  (`:5743`)
- Current note EN: (empty)

- **Q:2023-05-q1** · `data/questions.json:10266` · exam 2023-05 nr. 1 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvem fik især betydning for højskolerne i 1800-tallet?  (`:10270`)
  - Q EN: Who was especially important for the folk high schools (højskolerne) in the 1800s?  (`:10295`)
  - Option A DA: Ludvig Holberg  (`:10274`) · EN: Ludvig Holberg
  - Option B DA: Søren Kierkegaard  (`:10279`) · EN: Søren Kierkegaard
  - Option C DA: N.F.S. Grundtvig  (`:10284`) · EN: N.F.S. Grundtvig
  - Correct (`:10288`): C
  - Correct text: C) N.F.S. Grundtvig / N.F.S. Grundtvig
  - image_note: null
- **Q:2024-11-q13** · `data/questions.json:13042` · exam 2024-11 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem fik især betydning for højskolerne i 1800-tallet?  (`:13046`)
  - Q EN: Who was especially important for the folk high schools (højskolerne) in the 1800s?  (`:13071`)
  - Option A DA: N.F.S. Grundtvig  (`:13050`) · EN: N.F.S. Grundtvig
  - Option B DA: Søren Kierkegaard  (`:13055`) · EN: Søren Kierkegaard
  - Option C DA: P.S. Krøyer  (`:13060`) · EN: P.S. Krøyer
  - Correct (`:13064`): A
  - Correct text: A) N.F.S. Grundtvig / N.F.S. Grundtvig
  - image_note: null

#### C:kul-blixen · `data/clusters.json:6009` · asked 2× (2021-06, 2023-05) · frequent: no · last asked: 2023-05

- Fact DA: Karen Blixen skrev bøger (fx 'Den afrikanske farm').  (`clusters.json:6011`)
- Fact EN: Karen Blixen wrote books (e.g. 'Out of Africa').  (`clusters.json:6012`)
- Canonical question DA: Hvad er Karen Blixen især kendt for?  (`:6024`)
- Canonical question EN: What is Karen Blixen especially known for?  (`:6025`)
- Canonical answer DA: Hun skrev bøger  (`:6026`)
- Canonical answer EN: She wrote books  (`:6027`)
- Variants:
  - Q DA: Hvad er Karen Blixen især kendt for?  (`:6030`)
    Q EN: What is Karen Blixen especially known for?
    A DA: Hun skrev bøger
    A EN: She wrote books
    Question ids: 2021-06-q20, 2023-05-q13
- Trap note DA: (empty)  (`:6040`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6042`)
- Current note EN: (empty)

- **Q:2021-06-q20** · `data/questions.json:7728` · exam 2021-06 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Karen Blixen især kendt for?  (`:7732`)
  - Q EN: What is Karen Blixen especially known for?  (`:7757`)
  - Option A DA: Hun skrev bøger  (`:7736`) · EN: She wrote books
  - Option B DA: Hun lavede billedkunst  (`:7741`) · EN: She made visual art
  - Option C DA: Hun spillede teater  (`:7746`) · EN: She acted in the theatre
  - Correct (`:7750`): A
  - Correct text: A) Hun skrev bøger / She wrote books
  - image_note: null
- **Q:2023-05-q13** · `data/questions.json:10657` · exam 2023-05 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Karen Blixen især kendt for?  (`:10661`)
  - Q EN: What is Karen Blixen especially known for?  (`:10686`)
  - Option A DA: Hun lavede film  (`:10665`) · EN: She made films
  - Option B DA: Hun skrev bøger  (`:10670`) · EN: She wrote books
  - Option C DA: Hun spillede teater  (`:10675`) · EN: She acted in the theatre
  - Correct (`:10679`): B
  - Correct text: B) Hun skrev bøger / She wrote books
  - image_note: null

#### C:kul-arne-jacobsen · `data/clusters.json:6292` · asked 2× (2017-06, 2020-06) · frequent: no · last asked: 2020-06

- Fact DA: Arkitekten Arne Jacobsen tegnede Danmarks Nationalbank og designede stolen Ægget.  (`clusters.json:6294`)
- Fact EN: The architect Arne Jacobsen designed Danmarks Nationalbank and the chair 'the Egg'.  (`clusters.json:6295`)
- Canonical question DA: Hvilken arkitekt tegnede Nationalbanken og stolen Ægget?  (`:6307`)
- Canonical question EN: Which architect designed the National Bank and the Egg chair?  (`:6308`)
- Canonical answer DA: Arne Jacobsen  (`:6309`)
- Canonical answer EN: Arne Jacobsen  (`:6310`)
- Variants:
  - Q DA: Hvilken arkitekt har tegnet Danmarks Nationalbank i København?  (`:6313`)
    Q EN: Which architect designed Danmarks Nationalbank (the central bank) in Copenhagen?
    A DA: Arne Jacobsen
    A EN: Arne Jacobsen
    Question ids: 2017-06-q15
  - Q DA: Hvilken dansk arkitekt har designet lænestolen Ægget?  (`:6322`)
    Q EN: Which Danish architect designed the armchair 'the Egg' (Ægget)?
    A DA: Arne Jacobsen
    A EN: Arne Jacobsen
    Question ids: 2020-06-q10
- Trap note DA: Jørn Utzon tegnede operahuset i Sydney – han er en distraktor her.  (`:6331`)
- Trap note EN: Jørn Utzon designed the Sydney Opera House – he is a distractor here.
- Current note DA: (empty)  (`:6333`)
- Current note EN: (empty)

- **Q:2017-06-q15** · `data/questions.json:1235` · exam 2017-06 nr. 15 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken arkitekt har tegnet Danmarks Nationalbank i København?  (`:1239`)
  - Q EN: Which architect designed Danmarks Nationalbank (the central bank) in Copenhagen?  (`:1264`)
  - Option A DA: Jørn Utzon.  (`:1243`) · EN: Jørn Utzon
  - Option B DA: Arne Jacobsen.  (`:1248`) · EN: Arne Jacobsen
  - Option C DA: Henning Larsen.  (`:1253`) · EN: Henning Larsen
  - Correct (`:1257`): B
  - Correct text: B) Arne Jacobsen. / Arne Jacobsen
  - image_note: null
- **Q:2020-06-q10** · `data/questions.json:5848` · exam 2020-06 nr. 10 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken dansk arkitekt har designet lænestolen Ægget?  (`:5852`)
  - Q EN: Which Danish architect designed the armchair 'the Egg' (Ægget)?  (`:5877`)
  - Option A DA: Arne Jacobsen  (`:5856`) · EN: Arne Jacobsen
  - Option B DA: Bjarke Ingels  (`:5861`) · EN: Bjarke Ingels
  - Option C DA: Jan Gehl  (`:5866`) · EN: Jan Gehl
  - Correct (`:5870`): A
  - Correct text: A) Arne Jacobsen / Arne Jacobsen
  - image_note: null

#### C:kul-holberg · `data/clusters.json:6337` · asked 2× (2019-06, 2020-06) · frequent: no · last asked: 2020-06

- Fact DA: Ludvig Holberg var forfatter (han skrev komedier i 1700-tallet).  (`clusters.json:6339`)
- Fact EN: Ludvig Holberg was an author (he wrote comedies in the 1700s).  (`clusters.json:6340`)
- Canonical question DA: Hvad er Ludvig Holberg kendt for?  (`:6352`)
- Canonical question EN: What is Ludvig Holberg known for?  (`:6353`)
- Canonical answer DA: Han var forfatter  (`:6354`)
- Canonical answer EN: He was an author  (`:6355`)
- Variants:
  - Q DA: Hvad er Ludvig Holberg særlig kendt for?  (`:6358`)
    Q EN: What is Ludvig Holberg especially known for?
    A DA: Han var forfatter
    A EN: He was an author
    Question ids: 2019-06-q25
  - Q DA: Hvad er Ludvig Holberg kendt for?  (`:6367`)
    Q EN: What is Ludvig Holberg known for?
    A DA: Han var forfatter
    A EN: He was an author
    Question ids: 2020-06-q19
- Trap note DA: (empty)  (`:6376`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6378`)
- Current note EN: (empty)

- **Q:2019-06-q25** · `data/questions.json:4743` · exam 2019-06 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Ludvig Holberg særlig kendt for?  (`:4747`)
  - Q EN: What is Ludvig Holberg especially known for?  (`:4772`)
  - Option A DA: Han var forfatter  (`:4751`) · EN: He was an author
  - Option B DA: Han var komponist  (`:4756`) · EN: He was a composer
  - Option C DA: Han var kunstmaler  (`:4761`) · EN: He was a painter
  - Correct (`:4765`): A
  - Correct text: A) Han var forfatter / He was an author
  - image_note: null
- **Q:2020-06-q19** · `data/questions.json:6135` · exam 2020-06 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er Ludvig Holberg kendt for?  (`:6139`)
  - Q EN: What is Ludvig Holberg known for?  (`:6164`)
  - Option A DA: Han var maler  (`:6143`) · EN: He was a painter
  - Option B DA: Han var forfatter  (`:6148`) · EN: He was an author
  - Option C DA: Han var komponist  (`:6153`) · EN: He was a composer
  - Correct (`:6157`): B
  - Correct text: B) Han var forfatter / He was an author
  - image_note: null

#### C:kul-bier-vinterberg · `data/clusters.json:7169` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: Susanne Bier og Thomas Vinterberg er filminstruktører.  (`clusters.json:7171`)
- Fact EN: Susanne Bier and Thomas Vinterberg are film directors.  (`clusters.json:7172`)
- Canonical question DA: Hvad er Susanne Bier og Thomas Vinterberg særlig kendte for?  (`:7182`)
- Canonical question EN: What are Susanne Bier and Thomas Vinterberg especially known for?  (`:7183`)
- Canonical answer DA: De er filminstruktører  (`:7184`)
- Canonical answer EN: They are film directors  (`:7185`)
- Variants:
  - Q DA: Hvad er Susanne Bier og Thomas Vinterberg særlig kendte for?  (`:7188`)
    Q EN: What are Susanne Bier and Thomas Vinterberg especially known for?
    A DA: De er filminstruktører
    A EN: They are film directors
    Question ids: 2024-11-q12
- Trap note DA: (empty)  (`:7197`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7199`)
- Current note EN: (empty)

- **Q:2024-11-q12** · `data/questions.json:13009` · exam 2024-11 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er Susanne Bier og Thomas Vinterberg særlig kendte for?  (`:13013`)
  - Q EN: What are Susanne Bier and Thomas Vinterberg especially known for?  (`:13038`)
  - Option A DA: De er filminstruktører  (`:13017`) · EN: They are film directors
  - Option B DA: De er kunstmalere  (`:13022`) · EN: They are painters
  - Option C DA: De er forfattere  (`:13027`) · EN: They are authors
  - Correct (`:13031`): A
  - Correct text: A) De er filminstruktører / They are film directors
  - image_note: null

#### C:kul-carl-nielsen · `data/clusters.json:7815` · asked 1× (2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Carl Nielsen komponerede musik.  (`clusters.json:7817`)
- Fact EN: Carl Nielsen composed music.  (`clusters.json:7818`)
- Canonical question DA: Hvad er Carl Nielsen særlig kendt for?  (`:7828`)
- Canonical question EN: What is Carl Nielsen especially known for?  (`:7829`)
- Canonical answer DA: Han komponerede musik  (`:7830`)
- Canonical answer EN: He composed music  (`:7831`)
- Variants:
  - Q DA: Hvad er Carl Nielsen særlig kendt for?  (`:7834`)
    Q EN: What is Carl Nielsen especially known for?
    A DA: Han komponerede musik
    A EN: He composed music
    Question ids: 2018-11-q24
- Trap note DA: (empty)  (`:7843`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7845`)
- Current note EN: (empty)

- **Q:2018-11-q24** · `data/questions.json:3905` · exam 2018-11 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad er Carl Nielsen særlig kendt for?  (`:3909`)
  - Q EN: What is Carl Nielsen especially known for?  (`:3934`)
  - Option A DA: Han komponerede musik  (`:3913`) · EN: He composed music
  - Option B DA: Han lavede billedkunst  (`:3918`) · EN: He made visual art
  - Option C DA: Han skrev eventyr  (`:3923`) · EN: He wrote fairy tales
  - Correct (`:3927`): A
  - Correct text: A) Han komponerede musik / He composed music
  - image_note: null


## 9. Højtider, traditioner og religion / Holidays, traditions and religion  (`topic:traditioner`, `data/topics.json:442`)

### Intro paragraphs (`I:traditioner:n`)

- **I:traditioner:1** · `data/topics.json:449` (EN `:450`)
  - DA: Til fastelavn klæder børn sig ud og slår katten af tønden. Påske ligger om foråret, og pinse er 7 uger efter påske. Grundlovsdag er den 5. juni. Til sankthans i juni tænder man bål om aftenen.
  - EN: At Fastelavn children dress up and hit the cat out of the barrel. Easter is in spring, and Whitsun is 7 weeks after Easter. Constitution Day is 5 June. At Sankthans in June people light a bonfire in the evening.
- **I:traditioner:2** · `data/topics.json:453` (EN `:454`)
  - DA: Et flertal af befolkningen er medlem af folkekirken. Man kan blive gift i folkekirken, hvis den ene er medlem. Man behøver ikke være medlem for at blive begravet på en af folkekirkens kirkegårde.
  - EN: A majority of the population are members of the National Church. You can marry in the National Church if one of you is a member. You do not need to be a member to be buried in one of its churchyards.

### Current facts – "Ændret siden prøven" (`F:traditioner:n`)

- **F:traditioner:1** · `data/topics.json:459` (EN `:460`)
  - DA: Store Bededag er afskaffet som helligdag fra 2024. Den står kun som forkert svar i gamle prøver.
  - EN: Store Bededag was abolished as a public holiday from 2024. It only appears as a wrong answer in old exams.

### Overview tables / fact groups (`G:…`)

- G:fg-hoejtider – full entry above under topic demokrati (also used here)
### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:tra-grundlovsdag · `data/clusters.json:1221` · asked 5× (2020-06, 2021-11, 2023-11, 2025-11, 2026-06) · frequent: yes · last asked: 2026-06

- Fact DA: Grundlovsdag fejres den 5. juni (grundloven blev underskrevet 5. juni 1849).  (`clusters.json:1223`)
- Fact EN: Constitution Day is celebrated on 5 June (the Constitution was signed on 5 June 1849).  (`clusters.json:1224`)
- Canonical question DA: Hvad fejres hvert år den 5. juni?  (`:1242`)
- Canonical question EN: What is celebrated every year on 5 June?  (`:1243`)
- Canonical answer DA: Grundlovsdag  (`:1244`)
- Canonical answer EN: Constitution Day  (`:1245`)
- Variants:
  - Q DA: Hvad fejres hvert år den 5. juni?  (`:1248`)
    Q EN: What is celebrated every year on 5 June?
    A DA: Grundlovsdag
    A EN: Constitution Day (Grundlovsdag)
    Question ids: 2020-06-q3, 2021-11-q24, 2023-11-q11, 2026-06-q21
  - Q DA: På hvilken dato er det grundlovsdag?  (`:1260`)
    Q EN: On which date is Constitution Day (grundlovsdag)?
    A DA: 5. juni
    A EN: 5 June
    Question ids: 2025-11-q25
- Trap note DA: Omvendt: 'På hvilken dato er grundlovsdag?' = 5. juni. Ikke 5. maj (befrielsen).  (`:1269`)
- Trap note EN: Reverse: 'On which date is Constitution Day?' = 5 June. Not 5 May (the liberation).
- Current note DA: (empty)  (`:1271`)
- Current note EN: (empty)

- **Q:2020-06-q3** · `data/questions.json:5632` · exam 2020-06 nr. 3 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad fejres hvert år den 5. juni?  (`:5636`)
  - Q EN: What is celebrated every year on 5 June?  (`:5661`)
  - Option A DA: Grundlovsdag  (`:5640`) · EN: Constitution Day (Grundlovsdag)
  - Option B DA: Kristi Himmelfartsdag  (`:5645`) · EN: Ascension Day
  - Option C DA: Dronningens fødselsdag  (`:5650`) · EN: The Queen's birthday
  - Correct (`:5654`): A
  - Correct text: A) Grundlovsdag / Constitution Day (Grundlovsdag)
  - image_note: null
- **Q:2021-11-q24** · `data/questions.json:8635` · exam 2021-11 nr. 24 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad fejres hvert år den 5. juni?  (`:8639`)
  - Q EN: What is celebrated every year on 5 June?  (`:8664`)
  - Option A DA: Kristi Himmelfart  (`:8643`) · EN: Ascension Day
  - Option B DA: Grundlovsdag  (`:8648`) · EN: Constitution Day (Grundlovsdag)
  - Option C DA: Fastelavn  (`:8653`) · EN: Fastelavn (Shrovetide carnival)
  - Correct (`:8657`): B
  - Correct text: B) Grundlovsdag / Constitution Day (Grundlovsdag)
  - image_note: null
- **Q:2023-11-q11** · `data/questions.json:11371` · exam 2023-11 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad fejres hvert år den 5. juni?  (`:11375`)
  - Q EN: What is celebrated every year on 5 June?  (`:11400`)
  - Option A DA: Kristi himmelfart  (`:11379`) · EN: Ascension Day
  - Option B DA: Grundlovsdag  (`:11384`) · EN: Constitution Day (Grundlovsdag)
  - Option C DA: Kvindernes internationale kampdag  (`:11389`) · EN: International Women's Day
  - Correct (`:11393`): B
  - Correct text: B) Grundlovsdag / Constitution Day (Grundlovsdag)
  - image_note: null
- **Q:2025-11-q25** · `data/questions.json:14998` · exam 2025-11 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: På hvilken dato er det grundlovsdag?  (`:15002`)
  - Q EN: On which date is Constitution Day (grundlovsdag)?  (`:15027`)
  - Option A DA: 5. april  (`:15006`) · EN: 5 April
  - Option B DA: 5. maj  (`:15011`) · EN: 5 May
  - Option C DA: 5. juni  (`:15016`) · EN: 5 June
  - Correct (`:15020`): C
  - Correct text: C) 5. juni / 5 June
  - image_note: null
- **Q:2026-06-q21** · `data/questions.json:15666` · exam 2026-06 nr. 21 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvad fejres hvert år den 5. juni?  (`:15670`)
  - Q EN: What is celebrated every year on 5 June?  (`:15695`)
  - Option A DA: Kristi Himmelfart  (`:15674`) · EN: Ascension Day
  - Option B DA: Grundlovsdag  (`:15679`) · EN: Constitution Day (Grundlovsdag)
  - Option C DA: Kvindernes Internationale Kampdag  (`:15684`) · EN: International Women's Day
  - Correct (`:15688`): B
  - Correct text: B) Grundlovsdag / Constitution Day (Grundlovsdag)
  - image_note: null

#### C:tra-sankthans · `data/clusters.json:2857` · asked 4× (2017-11, 2020-11, 2022-06, 2025-05) · frequent: yes · last asked: 2025-05

- Fact DA: Sankthans fejres i juni (sankthansaften 23. juni) med bål.  (`clusters.json:2859`)
- Fact EN: Sankthans (Midsummer) is celebrated in June (Midsummer Eve, 23 June) with a bonfire.  (`clusters.json:2860`)
- Canonical question DA: Hvornår er der tradition for at samles om aftenen og tænde bål?  (`:2876`)
- Canonical question EN: When is there a tradition of gathering in the evening and lighting a bonfire?  (`:2877`)
- Canonical answer DA: Til sankthans (i juni)  (`:2878`)
- Canonical answer EN: At Sankthans (in June)  (`:2879`)
- Variants:
  - Q DA: I forbindelse med hvilken mærkedag er der tradition for at brænde bål?  (`:2882`)
    Q EN: On which special day is there a tradition of lighting bonfires?
    A DA: Sankt Hans
    A EN: Sankt Hans (Midsummer)
    Question ids: 2017-11-q12
  - Q DA: Hvornår er der tradition for at samles om aftenen og tænde bål?  (`:2891`)
    Q EN: When is there a tradition of gathering in the evening and lighting a bonfire?
    A DA: Til sankthans
    A EN: At Sankthans (Midsummer)
    Question ids: 2020-11-q7
  - Q DA: I hvilken måned fejres sankthans?  (`:2900`)
    Q EN: In which month is Sankthans (Midsummer) celebrated?
    A DA: I juni
    A EN: In June
    Question ids: 2022-06-q12, 2025-05-q25
- Trap note DA: Bål = sankthans. Udklædning og 'slå katten af tønden' = fastelavn.  (`:2910`)
- Trap note EN: Bonfire = Sankthans. Dressing up and 'hitting the cat out of the barrel' = Fastelavn.
- Current note DA: (empty)  (`:2912`)
- Current note EN: (empty)

- **Q:2017-11-q12** · `data/questions.json:1921` · exam 2017-11 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: I forbindelse med hvilken mærkedag er der tradition for at brænde bål?  (`:1925`)
  - Q EN: On which special day is there a tradition of lighting bonfires?  (`:1950`)
  - Option A DA: Sankt Hans  (`:1929`) · EN: Sankt Hans (Midsummer)
  - Option B DA: Halloween  (`:1934`) · EN: Halloween
  - Option C DA: Fastelavn  (`:1939`) · EN: Fastelavn (Shrovetide carnival)
  - Correct (`:1943`): A
  - Correct text: A) Sankt Hans / Sankt Hans (Midsummer)
  - image_note: null
- **Q:2020-11-q7** · `data/questions.json:6549` · exam 2020-11 nr. 7 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er der tradition for at samles om aftenen og tænde bål?  (`:6553`)
  - Q EN: When is there a tradition of gathering in the evening and lighting a bonfire?  (`:6578`)
  - Option A DA: Til grundlovsdag  (`:6557`) · EN: On Constitution Day
  - Option B DA: Til fastelavn  (`:6562`) · EN: At Fastelavn
  - Option C DA: Til sankthans  (`:6567`) · EN: At Sankthans (Midsummer)
  - Correct (`:6571`): C
  - Correct text: C) Til sankthans / At Sankthans (Midsummer)
  - image_note: null
- **Q:2022-06-q12** · `data/questions.json:9044` · exam 2022-06 nr. 12 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: I hvilken måned fejres sankthans?  (`:9048`)
  - Q EN: In which month is Sankthans (Midsummer) celebrated?  (`:9073`)
  - Option A DA: I april  (`:9052`) · EN: In April
  - Option B DA: I maj  (`:9057`) · EN: In May
  - Option C DA: I juni  (`:9062`) · EN: In June
  - Correct (`:9066`): C
  - Correct text: C) I juni / In June
  - image_note: null
- **Q:2025-05-q25** · `data/questions.json:14203` · exam 2025-05 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: I hvilken måned fejres sankthans?  (`:14207`)
  - Q EN: In which month is Sankthans (Midsummer) celebrated?  (`:14232`)
  - Option A DA: I maj  (`:14211`) · EN: In May
  - Option B DA: I juni  (`:14216`) · EN: In June
  - Option C DA: I juli  (`:14221`) · EN: In July
  - Correct (`:14225`): B
  - Correct text: B) I juni / In June
  - image_note: null

#### C:tra-fastelavn · `data/clusters.json:3493` · asked 4× (2018-11, 2020-06, 2021-11, 2022-11) · frequent: yes · last asked: 2022-11

- Fact DA: Til fastelavn klæder børn sig ud og slår katten af tønden.  (`clusters.json:3495`)
- Fact EN: At Fastelavn children dress up and 'hit the cat out of the barrel' (a barrel with sweets).  (`clusters.json:3496`)
- Canonical question DA: Hvornår klæder børn sig ud og slår katten af tønden?  (`:3512`)
- Canonical question EN: When do children dress up and hit the cat out of the barrel?  (`:3513`)
- Canonical answer DA: Til fastelavn  (`:3514`)
- Canonical answer EN: At Fastelavn  (`:3515`)
- Variants:
  - Q DA: I forbindelse med hvilken mærkedag er der tradition for at klæde sig ud?  (`:3518`)
    Q EN: On which special day is there a tradition of dressing up in costumes?
    A DA: Fastelavn
    A EN: Fastelavn (Shrovetide carnival)
    Question ids: 2018-11-q16
  - Q DA: Hvornår er der tradition for, at børn klæder sig ud og slår katten af tønden?  (`:3527`)
    Q EN: When is there a tradition of children dressing up and 'hitting the cat out of the barrel' (slå katten af tønden)?
    A DA: Til fastelavn
    A EN: At Fastelavn
    Question ids: 2020-06-q16
  - Q DA: I forbindelse med hvilken mærkedag klæder børn sig ud og slår katten af tønden?  (`:3536`)
    Q EN: On which special day do children dress up and 'hit the cat out of the barrel'?
    A DA: Fastelavn
    A EN: Fastelavn (Shrovetide carnival)
    Question ids: 2021-11-q16
  - Q DA: Hvornår er der tradition for, at børn slår katten af tønden?  (`:3545`)
    Q EN: When is there a tradition of children 'hitting the cat out of the barrel'?
    A DA: Fastelavn
    A EN: Fastelavn (Shrovetide carnival)
    Question ids: 2022-11-q9
- Trap note DA: Ikke Halloween, ikke sankthans, ikke pinse.  (`:3554`)
- Trap note EN: Not Halloween, not Sankthans, not Whitsun.
- Current note DA: (empty)  (`:3556`)
- Current note EN: (empty)

- **Q:2018-11-q16** · `data/questions.json:3646` · exam 2018-11 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: I forbindelse med hvilken mærkedag er der tradition for at klæde sig ud?  (`:3650`)
  - Q EN: On which special day is there a tradition of dressing up in costumes?  (`:3675`)
  - Option A DA: Sankt Hans  (`:3654`) · EN: Sankt Hans (Midsummer)
  - Option B DA: Påskedag  (`:3659`) · EN: Easter Day
  - Option C DA: Fastelavn  (`:3664`) · EN: Fastelavn (Shrovetide carnival)
  - Correct (`:3668`): C
  - Correct text: C) Fastelavn / Fastelavn (Shrovetide carnival)
  - image_note: null
- **Q:2020-06-q16** · `data/questions.json:6041` · exam 2020-06 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er der tradition for, at børn klæder sig ud og slår katten af tønden?  (`:6045`)
  - Q EN: When is there a tradition of children dressing up and 'hitting the cat out of the barrel' (slå katten af tønden)?  (`:6070`)
  - Option A DA: Til sankthans  (`:6049`) · EN: At Sankthans (Midsummer)
  - Option B DA: Til fastelavn  (`:6054`) · EN: At Fastelavn
  - Option C DA: Til pinse  (`:6059`) · EN: At Whitsun
  - Correct (`:6063`): B
  - Correct text: B) Til fastelavn / At Fastelavn
  - image_note: null
- **Q:2021-11-q16** · `data/questions.json:8371` · exam 2021-11 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: I forbindelse med hvilken mærkedag klæder børn sig ud og slår katten af tønden?  (`:8375`)
  - Q EN: On which special day do children dress up and 'hit the cat out of the barrel'?  (`:8400`)
  - Option A DA: Sankthans  (`:8379`) · EN: Sankthans (Midsummer)
  - Option B DA: Fastelavn  (`:8384`) · EN: Fastelavn (Shrovetide carnival)
  - Option C DA: Pinse  (`:8389`) · EN: Pinse (Whitsun / Pentecost)
  - Correct (`:8393`): B
  - Correct text: B) Fastelavn / Fastelavn (Shrovetide carnival)
  - image_note: null
- **Q:2022-11-q9** · `data/questions.json:9735` · exam 2022-11 nr. 9 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er der tradition for, at børn slår katten af tønden?  (`:9739`)
  - Q EN: When is there a tradition of children 'hitting the cat out of the barrel'?  (`:9764`)
  - Option A DA: Halloween  (`:9743`) · EN: Halloween
  - Option B DA: Pinse  (`:9748`) · EN: Pinse (Whitsun / Pentecost)
  - Option C DA: Fastelavn  (`:9753`) · EN: Fastelavn (Shrovetide carnival)
  - Correct (`:9757`): C
  - Correct text: C) Fastelavn / Fastelavn (Shrovetide carnival)
  - image_note: null

#### C:tra-folkekirke-flertal · `data/clusters.json:4039` · asked 3× (2023-11, 2024-11, 2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Et flertal af befolkningen er medlem af folkekirken.  (`clusters.json:4041`)
- Fact EN: A majority of the population are members of the National Church.  (`clusters.json:4042`)
- Canonical question DA: Er et flertal af Danmarks befolkning medlem af folkekirken?  (`:4056`)
- Canonical question EN: Are a majority of Denmark's population members of the National Church?  (`:4057`)
- Canonical answer DA: Ja  (`:4058`)
- Canonical answer EN: Yes  (`:4059`)
- Variants:
  - Q DA: Er flertallet af Danmarks befolkning medlem af folkekirken?  (`:4062`)
    Q EN: Are the majority of Denmark's population members of the Danish National Church?
    A DA: Ja
    A EN: Yes
    Question ids: 2023-11-q16
  - Q DA: Er et flertal af Danmarks befolkning medlem af Folkekirken?  (`:4071`)
    Q EN: Are a majority of Denmark's population members of the Danish National Church?
    A DA: Ja
    A EN: Yes
    Question ids: 2024-11-q16, 2026-06-q22
- Trap note DA: (empty)  (`:4081`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:4083`)
- Current note EN: (empty)

- **Q:2023-11-q16** · `data/questions.json:11531` · exam 2023-11 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er flertallet af Danmarks befolkning medlem af folkekirken?  (`:11535`)
  - Q EN: Are the majority of Denmark's population members of the Danish National Church?  (`:11555`)
  - Option A DA: Ja  (`:11539`) · EN: Yes
  - Option B DA: Nej  (`:11544`) · EN: No
  - Correct (`:11548`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2024-11-q16** · `data/questions.json:13141` · exam 2024-11 nr. 16 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er et flertal af Danmarks befolkning medlem af Folkekirken?  (`:13145`)
  - Q EN: Are a majority of Denmark's population members of the Danish National Church?  (`:13165`)
  - Option A DA: Ja  (`:13149`) · EN: Yes
  - Option B DA: Nej  (`:13154`) · EN: No
  - Correct (`:13158`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2026-06-q22** · `data/questions.json:15699` · exam 2026-06 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er et flertal af Danmarks befolkning medlem af Folkekirken?  (`:15703`)
  - Q EN: Are a majority of Denmark's population members of the Danish National Church?  (`:15723`)
  - Option A DA: Ja  (`:15707`) · EN: Yes
  - Option B DA: Nej  (`:15712`) · EN: No
  - Correct (`:15716`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:tra-pinse · `data/clusters.json:4807` · asked 3× (2016-12, 2019-06, 2019-11) · frequent: no · last asked: 2019-11

- Fact DA: Pinse er en kristen højtid 7 uger efter påske.  (`clusters.json:4809`)
- Fact EN: Pinse (Whitsun/Pentecost) is a Christian holiday 7 weeks after Easter.  (`clusters.json:4810`)
- Canonical question DA: Hvilken kristen højtid fejres 7 uger efter påsken?  (`:4824`)
- Canonical question EN: Which Christian holiday is celebrated 7 weeks after Easter?  (`:4825`)
- Canonical answer DA: Pinse  (`:4826`)
- Canonical answer EN: Pinse (Whitsun)  (`:4827`)
- Variants:
  - Q DA: Hvilken kristen højtid fejres 7 uger efter påsken?  (`:4830`)
    Q EN: Which Christian holiday is celebrated 7 weeks after Easter?
    A DA: Pinse
    A EN: Pinse (Whitsun / Pentecost)
    Question ids: 2016-12-q25
  - Q DA: Hvilken af følgende er en kristen helligdag?  (`:4839`)
    Q EN: Which of the following is a Christian holy day?
    A DA: Pinse
    A EN: Pinse (Whitsun / Pentecost)
    Question ids: 2019-06-q16
  - Q DA: Hvilken kristen højtid fejres syv uger efter påsken?  (`:4848`)
    Q EN: Which Christian holiday is celebrated seven weeks after Easter?
    A DA: Pinse
    A EN: Pinse (Whitsun / Pentecost)
    Question ids: 2019-11-q25
- Trap note DA: Grundlovsdag og nytår er ikke kristne helligdage. Store Bededag er afskaffet som helligdag fra 2024.  (`:4857`)
- Trap note EN: Constitution Day and New Year are not Christian holy days. Store Bededag was abolished as a public holiday from 2024.
- Current note DA: (empty)  (`:4859`)
- Current note EN: (empty)

- **Q:2016-12-q25** · `data/questions.json:760` · exam 2016-12 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken kristen højtid fejres 7 uger efter påsken?  (`:764`)
  - Q EN: Which Christian holiday is celebrated 7 weeks after Easter?  (`:789`)
  - Option A DA: St. Bededag.  (`:768`) · EN: Store Bededag (Great Prayer Day)
  - Option B DA: Pinse.  (`:773`) · EN: Pinse (Whitsun / Pentecost)
  - Option C DA: Sankt Hans.  (`:778`) · EN: Sankt Hans (Midsummer)
  - Correct (`:782`): B
  - Correct text: B) Pinse. / Pinse (Whitsun / Pentecost)
  - image_note: null
- **Q:2019-06-q16** · `data/questions.json:4451` · exam 2019-06 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken af følgende er en kristen helligdag?  (`:4455`)
  - Q EN: Which of the following is a Christian holy day?  (`:4480`)
  - Option A DA: Grundlovsdag  (`:4459`) · EN: Constitution Day (Grundlovsdag)
  - Option B DA: Nytår  (`:4464`) · EN: New Year
  - Option C DA: Pinse  (`:4469`) · EN: Pinse (Whitsun / Pentecost)
  - Correct (`:4473`): C
  - Correct text: C) Pinse / Pinse (Whitsun / Pentecost)
  - image_note: null
- **Q:2019-11-q25** · `data/questions.json:5533` · exam 2019-11 nr. 25 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken kristen højtid fejres syv uger efter påsken?  (`:5537`)
  - Q EN: Which Christian holiday is celebrated seven weeks after Easter?  (`:5562`)
  - Option A DA: St. Bededag  (`:5541`) · EN: Store Bededag (Great Prayer Day)
  - Option B DA: Pinse  (`:5546`) · EN: Pinse (Whitsun / Pentecost)
  - Option C DA: Sankt Hans  (`:5551`) · EN: Sankt Hans (Midsummer)
  - Correct (`:5555`): B
  - Correct text: B) Pinse / Pinse (Whitsun / Pentecost)
  - image_note: null

#### C:tra-paaske · `data/clusters.json:6046` · asked 2× (2019-06, 2023-05) · frequent: no · last asked: 2023-05

- Fact DA: Påsken ligger om foråret.  (`clusters.json:6048`)
- Fact EN: Easter is in spring.  (`clusters.json:6049`)
- Canonical question DA: På hvilken årstid ligger påsken?  (`:6061`)
- Canonical question EN: In which season is Easter?  (`:6062`)
- Canonical answer DA: Om foråret  (`:6063`)
- Canonical answer EN: In spring  (`:6064`)
- Variants:
  - Q DA: Hvornår er det påske?  (`:6067`)
    Q EN: When is Easter?
    A DA: Om foråret
    A EN: In spring
    Question ids: 2019-06-q17
  - Q DA: På hvilken årstid ligger påsken?  (`:6076`)
    Q EN: In which season is Easter?
    A DA: Forår
    A EN: Spring
    Question ids: 2023-05-q11
- Trap note DA: (empty)  (`:6085`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6087`)
- Current note EN: (empty)

- **Q:2019-06-q17** · `data/questions.json:4484` · exam 2019-06 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår er det påske?  (`:4488`)
  - Q EN: When is Easter?  (`:4513`)
  - Option A DA: Om foråret  (`:4492`) · EN: In spring
  - Option B DA: Om sommeren  (`:4497`) · EN: In summer
  - Option C DA: Om efteråret  (`:4502`) · EN: In autumn
  - Correct (`:4506`): A
  - Correct text: A) Om foråret / In spring
  - image_note: null
- **Q:2023-05-q11** · `data/questions.json:10591` · exam 2023-05 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: På hvilken årstid ligger påsken?  (`:10595`)
  - Q EN: In which season is Easter?  (`:10620`)
  - Option A DA: Forår  (`:10599`) · EN: Spring
  - Option B DA: Sommer  (`:10604`) · EN: Summer
  - Option C DA: Efterår  (`:10609`) · EN: Autumn
  - Correct (`:10613`): A
  - Correct text: A) Forår / Spring
  - image_note: null

#### C:tra-begravet · `data/clusters.json:6128` · asked 2× (2018-11, 2022-06) · frequent: no · last asked: 2022-06

- Fact DA: Man behøver ikke være medlem af folkekirken for at blive begravet på en folkekirkegård.  (`clusters.json:6130`)
- Fact EN: You do not need to be a member of the National Church to be buried in one of its churchyards.  (`clusters.json:6131`)
- Canonical question DA: Skal man være medlem af folkekirken for at blive begravet på en af folkekirkens kirkegårde?  (`:6143`)
- Canonical question EN: Must you be a member of the National Church to be buried in one of its churchyards?  (`:6144`)
- Canonical answer DA: Nej  (`:6145`)
- Canonical answer EN: No  (`:6146`)
- Variants:
  - Q DA: Skal man være medlem af folkekirken for at blive begravet på en af folkekirkens kirkegårde?  (`:6149`)
    Q EN: Must you be a member of the Danish National Church to be buried in one of its churchyards?
    A DA: Nej
    A EN: No
    Question ids: 2018-11-q25, 2022-06-q10
- Trap note DA: (empty)  (`:6159`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6161`)
- Current note EN: (empty)

- **Q:2018-11-q25** · `data/questions.json:3938` · exam 2018-11 nr. 25 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal man være medlem af folkekirken for at blive begravet på en af folkekirkens kirkegårde?  (`:3942`)
  - Q EN: Must you be a member of the Danish National Church to be buried in one of its churchyards?  (`:3962`)
  - Option A DA: Ja  (`:3946`) · EN: Yes
  - Option B DA: Nej  (`:3951`) · EN: No
  - Correct (`:3955`): B
  - Correct text: B) Nej / No
  - image_note: null
- **Q:2022-06-q10** · `data/questions.json:8983` · exam 2022-06 nr. 10 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Skal man være medlem af folkekirken for at blive begravet på en af folkekirkens kirkegårde?  (`:8987`)
  - Q EN: Must you be a member of the Danish National Church to be buried in one of its churchyards?  (`:9007`)
  - Option A DA: Ja  (`:8991`) · EN: Yes
  - Option B DA: Nej  (`:8996`) · EN: No
  - Correct (`:9000`): B
  - Correct text: B) Nej / No
  - image_note: null

#### C:tra-gift-kirke · `data/clusters.json:6202` · asked 2× (2018-06, 2021-06) · frequent: no · last asked: 2021-06

- Fact DA: Man kan blive gift i folkekirken, hvis den ene person er medlem.  (`clusters.json:6204`)
- Fact EN: You can get married in the National Church if one of the two is a member.  (`clusters.json:6205`)
- Canonical question DA: Kan man blive gift i folkekirken, hvis man ikke er medlem?  (`:6217`)
- Canonical question EN: Can you get married in the National Church if you are not a member?  (`:6218`)
- Canonical answer DA: Ja, hvis den ene person er medlem  (`:6219`)
- Canonical answer EN: Yes, if one of the two is a member  (`:6220`)
- Variants:
  - Q DA: Kan to personer fra to forskellige trossamfund blive gift i folkekirken?  (`:6223`)
    Q EN: Can two people from two different religious communities get married in the Danish National Church (folkekirken)?
    A DA: Ja, hvis den ene person er medlem af folkekirken
    A EN: Yes, if one of the two is a member of the National Church
    Question ids: 2018-06-q20
  - Q DA: Kan man blive gift i folkekirken, hvis man ikke er medlem?  (`:6232`)
    Q EN: Can you get married in the Danish National Church if you are not a member?
    A DA: Ja, hvis den, man skal giftes med, er medlem
    A EN: Yes, if the person you are marrying is a member
    Question ids: 2021-06-q13
- Trap note DA: (empty)  (`:6241`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6243`)
- Current note EN: (empty)

- **Q:2018-06-q20** · `data/questions.json:2973` · exam 2018-06 nr. 20 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan to personer fra to forskellige trossamfund blive gift i folkekirken?  (`:2977`)
  - Q EN: Can two people from two different religious communities get married in the Danish National Church (folkekirken)?  (`:2997`)
  - Option A DA: Nej, begge personer skal være medlem af folkekirken  (`:2981`) · EN: No, both people must be members of the National Church
  - Option B DA: Ja, hvis den ene person er medlem af folkekirken  (`:2986`) · EN: Yes, if one of the two is a member of the National Church
  - Correct (`:2990`): B
  - Correct text: B) Ja, hvis den ene person er medlem af folkekirken / Yes, if one of the two is a member of the National Church
  - image_note: null
- **Q:2021-06-q13** · `data/questions.json:7512` · exam 2021-06 nr. 13 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Kan man blive gift i folkekirken, hvis man ikke er medlem?  (`:7516`)
  - Q EN: Can you get married in the Danish National Church if you are not a member?  (`:7536`)
  - Option A DA: Ja, hvis den, man skal giftes med, er medlem  (`:7520`) · EN: Yes, if the person you are marrying is a member
  - Option B DA: Nej, begge, der skal giftes, skal være medlemmer  (`:7525`) · EN: No, both people getting married must be members
  - Correct (`:7529`): A
  - Correct text: A) Ja, hvis den, man skal giftes med, er medlem / Yes, if the person you are marrying is a member
  - image_note: null


## 10. Danmark i verden og forsvar / Denmark in the world and defence  (`topic:verden`, `data/topics.json:479`)

### Intro paragraphs (`I:verden:n`)

- **I:verden:1** · `data/topics.json:486` (EN `:487`)
  - DA: Danmark blev medlem af FN i 1945 og af NATO i 1949. I NATO samarbejder landene om forsvar. Danmark kom med i EF (i dag EU) i 1973. EU arbejder for fri handel, og de fleste danske folkeafstemninger siden 1953 har handlet om EU. Danmark handler mest med Tyskland.
  - EN: Denmark joined the UN in 1945 and NATO in 1949. In NATO the countries cooperate on defence. Denmark joined the EC (today the EU) in 1973. The EU works for free trade, and most Danish referendums since 1953 have been about the EU. Denmark trades most with Germany.
- **I:verden:2** · `data/topics.json:490` (EN `:491`)
  - DA: Europa-Parlamentet vælges af befolkningerne i EU-landene hvert 5. år. Stemmeprocenten er lavere end ved folketingsvalg.
  - EN: The European Parliament is elected by the populations of the EU countries every 5 years. Turnout is lower than in general elections.
- **I:verden:3** · `data/topics.json:494` (EN `:495`)
  - DA: I 1990'erne var danske soldater i Bosnien for FN. I 2003 sendte Danmark soldater til Irak. Størstedelen af den danske udviklingsbistand går til Afrika. Værnepligt er pligten til at forsvare Danmark. I 2024 blev det besluttet at indkalde flere værnepligtige, og i dag har både mænd og kvinder værnepligt.
  - EN: In the 1990s Danish soldiers were in Bosnia for the UN. In 2003 Denmark sent soldiers to Iraq. Most of Denmark's development aid goes to Africa. Conscription is the duty to defend Denmark. In 2024 it was decided to call up more conscripts, and today both men and women have compulsory military service.

### Current facts – "Ændret siden prøven" (`F:verden:n`)

- **F:verden:1** · `data/topics.json:500` (EN `:501`)
  - DA: Europa-Parlamentet: Danmark har 15 medlemmer siden valget i 2024. Prøverne fra 2017-2018 sagde 13 (det var rigtigt dengang).
  - EN: European Parliament: Denmark has had 15 members since the 2024 election. The 2017–2018 exams said 13 (correct at the time).

### Overview tables / fact groups (`G:…`)

- G:fg-aarstal – full entry above under topic demokrati (also used here)
- G:fg-tal – full entry above under topic demokrati (also used here)
- G:fg-valg – full entry above under topic demokrati (also used here)
#### G:fg-organisationer · `data/fact_groups.json:1722`

- Title DA: Internationale organisationer
- Title EN: International organisations
- Columns DA: Organisation | Med siden | Om hvad
- Columns EN: Organisation | Member since | About what
- Rows (DA / EN, one per row):
  - DA: FN (De Forenede Nationer) | 1945 | Fred og samarbejde i hele verden; FN-soldater i Bosnien i 1990'erne
    EN: UN (United Nations) | 1945 | Peace and cooperation worldwide; UN soldiers in Bosnia in the 1990s
  - DA: NATO | 1949 | Forsvarspolitik
    EN: NATO | 1949 | Defence policy
  - DA: EF/EU | 1973 | Fri handel mellem medlemslandene; flest folkeafstemninger handler om EU
    EN: EC/EU | 1973 | Free trade between member states; most referendums are about the EU
- Mnemonic DA: 4-5 = FN, 4-9 = NATO. FN kom først, så NATO.
- Mnemonic EN: '45 = UN, '49 = NATO. The UN came first, then NATO.
- Cluster links: ver-fn-1945, ver-nato-1949, ver-nato-forsvar, ver-eu-handel, ver-folkeafstemning-eu, ver-bosnien

### Facts (clusters) and their questions (`C:…`, `Q:…`)

#### C:ver-bosnien · `data/clusters.json:2688` · asked 4× (2022-06, 2023-11, 2024-05, 2025-11) · frequent: yes · last asked: 2025-11

- Fact DA: I 1990'erne var danske soldater udsendt til Bosnien som en del af FN's styrker.  (`clusters.json:2690`)
- Fact EN: In the 1990s Danish soldiers were sent to Bosnia as part of the UN's forces.  (`clusters.json:2691`)
- Canonical question DA: Hvor blev danske soldater udsendt til i 1990'erne som en del af FN's styrker?  (`:2707`)
- Canonical question EN: Where were Danish soldiers sent in the 1990s as part of the UN's forces?  (`:2708`)
- Canonical answer DA: Bosnien  (`:2709`)
- Canonical answer EN: Bosnia  (`:2710`)
- Variants:
  - Q DA: Hvor var danske soldater blandt andet udsendt til i 1990’erne som en del af FN’s styrker?  (`:2713`)
    Q EN: Where, among other places, were Danish soldiers sent in the 1990s as part of the UN's forces?
    A DA: Bosnien
    A EN: Bosnia
    Question ids: 2022-06-q5
  - Q DA: Hvor blev danske FN-soldater udsendt til i 1990’erne som en del af FN’s styrker?  (`:2722`)
    Q EN: Where were Danish UN soldiers sent in the 1990s as part of the UN's forces?
    A DA: Bosnien
    A EN: Bosnia
    Question ids: 2023-11-q21
  - Q DA: Hvor blev danske soldater udsendt til i 1990'erne som en del af FN's styrker?  (`:2731`)
    Q EN: Where were Danish soldiers sent in the 1990s as part of the UN's forces?
    A DA: Bosnien
    A EN: Bosnia
    Question ids: 2024-05-q17, 2025-11-q22
- Trap note DA: 1990'erne + FN = Bosnien. 2003 + USA-ledet invasion = Irak.  (`:2741`)
- Trap note EN: 1990s + UN = Bosnia. 2003 + US-led invasion = Iraq.
- Current note DA: (empty)  (`:2743`)
- Current note EN: (empty)

- **Q:2022-06-q5** · `data/questions.json:8818` · exam 2022-06 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor var danske soldater blandt andet udsendt til i 1990’erne som en del af FN’s styrker?  (`:8822`)
  - Q EN: Where, among other places, were Danish soldiers sent in the 1990s as part of the UN's forces?  (`:8847`)
  - Option A DA: Afghanistan  (`:8826`) · EN: Afghanistan
  - Option B DA: Bosnien  (`:8831`) · EN: Bosnia
  - Option C DA: Libyen  (`:8836`) · EN: Libya
  - Correct (`:8840`): B
  - Correct text: B) Bosnien / Bosnia
  - image_note: null
- **Q:2023-11-q21** · `data/questions.json:11691` · exam 2023-11 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor blev danske FN-soldater udsendt til i 1990’erne som en del af FN’s styrker?  (`:11695`)
  - Q EN: Where were Danish UN soldiers sent in the 1990s as part of the UN's forces?  (`:11720`)
  - Option A DA: Libyen  (`:11699`) · EN: Libya
  - Option B DA: Afghanistan  (`:11704`) · EN: Afghanistan
  - Option C DA: Bosnien  (`:11709`) · EN: Bosnia
  - Correct (`:11713`): C
  - Correct text: C) Bosnien / Bosnia
  - image_note: null
- **Q:2024-05-q17** · `data/questions.json:12369` · exam 2024-05 nr. 17 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor blev danske soldater udsendt til i 1990'erne som en del af FN's styrker?  (`:12373`)
  - Q EN: Where were Danish soldiers sent in the 1990s as part of the UN's forces?  (`:12398`)
  - Option A DA: Afghanistan  (`:12377`) · EN: Afghanistan
  - Option B DA: Bosnien  (`:12382`) · EN: Bosnia
  - Option C DA: Libyen  (`:12387`) · EN: Libya
  - Correct (`:12391`): B
  - Correct text: B) Bosnien / Bosnia
  - image_note: null
- **Q:2025-11-q22** · `data/questions.json:14899` · exam 2025-11 nr. 22 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor blev danske soldater udsendt til i 1990’erne som en del af FN’s styrker?  (`:14903`)
  - Q EN: Where were Danish soldiers sent in the 1990s as part of the UN's forces?  (`:14928`)
  - Option A DA: Syrien  (`:14907`) · EN: Syria
  - Option B DA: Bosnien  (`:14912`) · EN: Bosnia
  - Option C DA: Libyen  (`:14917`) · EN: Libya
  - Correct (`:14921`): B
  - Correct text: B) Bosnien / Bosnia
  - image_note: null

#### C:ver-fn-1945 · `data/clusters.json:3238` · asked 4× (2017-11, 2019-11, 2020-11, 2023-11) · frequent: yes · last asked: 2023-11

- Fact DA: Danmark blev medlem af FN i 1945.  (`clusters.json:3240`)
- Fact EN: Denmark joined the UN in 1945.  (`clusters.json:3241`)
- Canonical question DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:3257`)
- Canonical question EN: Which organisation did Denmark join in 1945?  (`:3258`)
- Canonical answer DA: FN (De Forenede Nationer)  (`:3259`)
- Canonical answer EN: The UN (United Nations)  (`:3260`)
- Variants:
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:3263`)
    Q EN: Which organisation did Denmark join in 1945?
    A DA: FN
    A EN: The UN
    Question ids: 2017-11-q1, 2020-11-q8, 2023-11-q2
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:3263`)
    Q EN: Which organisation did Denmark join in 1945?
    A DA: Forenede Nationer (FN)
    A EN: The United Nations (UN)
    Question ids: 2019-11-q2
- Trap note DA: 1945 = FN. 1949 = NATO.  (`:3283`)
- Trap note EN: 1945 = the UN. 1949 = NATO.
- Current note DA: (empty)  (`:3285`)
- Current note EN: (empty)

- **Q:2017-11-q1** · `data/questions.json:1568` · exam 2017-11 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:1572`)
  - Q EN: Which organisation did Denmark join in 1945?  (`:1597`)
  - Option A DA: EU  (`:1576`) · EN: The EU
  - Option B DA: FN  (`:1581`) · EN: The UN
  - Option C DA: NATO  (`:1586`) · EN: NATO
  - Correct (`:1590`): B
  - Correct text: B) FN / The UN
  - image_note: null
- **Q:2019-11-q2** · `data/questions.json:4809` · exam 2019-11 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:4813`)
  - Q EN: Which organisation did Denmark join in 1945?  (`:4838`)
  - Option A DA: Forenede Nationer (FN)  (`:4817`) · EN: The United Nations (UN)
  - Option B DA: Det Europæiske Fællesskab (EF)  (`:4822`) · EN: The European Community (EC)
  - Option C DA: Nordisk Ministerråd  (`:4827`) · EN: The Nordic Council of Ministers
  - Correct (`:4831`): A
  - Correct text: A) Forenede Nationer (FN) / The United Nations (UN)
  - image_note: null
- **Q:2020-11-q8** · `data/questions.json:6582` · exam 2020-11 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:6586`)
  - Q EN: Which organisation did Denmark join in 1945?  (`:6611`)
  - Option A DA: FN  (`:6590`) · EN: The UN
  - Option B DA: NATO  (`:6595`) · EN: NATO
  - Option C DA: EU  (`:6600`) · EN: The EU
  - Correct (`:6604`): A
  - Correct text: A) FN / The UN
  - image_note: null
- **Q:2023-11-q2** · `data/questions.json:11084` · exam 2023-11 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken organisation blev Danmark medlem af i 1945?  (`:11088`)
  - Q EN: Which organisation did Denmark join in 1945?  (`:11113`)
  - Option A DA: FN  (`:11092`) · EN: The UN
  - Option B DA: WTO  (`:11097`) · EN: The WTO
  - Option C DA: EU  (`:11102`) · EN: The EU
  - Correct (`:11106`): A
  - Correct text: A) FN / The UN
  - image_note: null

#### C:ver-nato-medlem · `data/clusters.json:3289` · asked 4× (2017-06, 2018-11, 2021-06, 2023-05) · frequent: yes · last asked: 2023-05

- Fact DA: Danmark er medlem af NATO.  (`clusters.json:3291`)
- Fact EN: Denmark is a member of NATO.  (`clusters.json:3292`)
- Canonical question DA: Er Danmark medlem af NATO?  (`:3308`)
- Canonical question EN: Is Denmark a member of NATO?  (`:3309`)
- Canonical answer DA: Ja  (`:3310`)
- Canonical answer EN: Yes  (`:3311`)
- Variants:
  - Q DA: Er Danmark medlem af NATO?  (`:3314`)
    Q EN: Is Denmark a member of NATO?
    A DA: Ja
    A EN: Yes
    Question ids: 2017-06-q1, 2018-11-q4, 2021-06-q19, 2023-05-q19
- Trap note DA: (empty)  (`:3326`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:3328`)
- Current note EN: (empty)

- **Q:2017-06-q1** · `data/questions.json:793` · exam 2017-06 nr. 1 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af NATO?  (`:797`)
  - Q EN: Is Denmark a member of NATO?  (`:817`)
  - Option A DA: Ja.  (`:801`) · EN: Yes
  - Option B DA: Nej.  (`:806`) · EN: No
  - Correct (`:810`): A
  - Correct text: A) Ja. / Yes
  - image_note: null
- **Q:2018-11-q4** · `data/questions.json:3260` · exam 2018-11 nr. 4 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af NATO?  (`:3264`)
  - Q EN: Is Denmark a member of NATO?  (`:3284`)
  - Option A DA: Ja  (`:3268`) · EN: Yes
  - Option B DA: Nej  (`:3273`) · EN: No
  - Correct (`:3277`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2021-06-q19** · `data/questions.json:7700` · exam 2021-06 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af NATO?  (`:7704`)
  - Q EN: Is Denmark a member of NATO?  (`:7724`)
  - Option A DA: Ja  (`:7708`) · EN: Yes
  - Option B DA: Nej  (`:7713`) · EN: No
  - Correct (`:7717`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2023-05-q19** · `data/questions.json:10840` · exam 2023-05 nr. 19 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af NATO?  (`:10844`)
  - Q EN: Is Denmark a member of NATO?  (`:10864`)
  - Option A DA: Ja  (`:10848`) · EN: Yes
  - Option B DA: Nej  (`:10853`) · EN: No
  - Correct (`:10857`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:ver-vaernepligt · `data/clusters.json:3332` · asked 4× (2018-06, 2019-06, 2020-11, 2023-05) · frequent: yes · last asked: 2023-05

- Fact DA: Værnepligt er pligten til at forsvare Danmark (at være soldat).  (`clusters.json:3334`)
- Fact EN: Værnepligt (conscription) is the duty to defend Denmark (to be a soldier).  (`clusters.json:3335`)
- Canonical question DA: Hvad er værnepligt?  (`:3351`)
- Canonical question EN: What is værnepligt?  (`:3352`)
- Canonical answer DA: Pligten til at forsvare Danmark  (`:3353`)
- Canonical answer EN: The duty to defend Denmark  (`:3354`)
- Variants:
  - Q DA: Hvad er værnepligt?  (`:3357`)
    Q EN: What is værnepligt (conscription / compulsory military service)?
    A DA: Pligten til at være soldat
    A EN: The duty to be a soldier
    Question ids: 2018-06-q4
  - Q DA: Hvad er værnepligt?  (`:3357`)
    Q EN: What is værnepligt (conscription / compulsory military service)?
    A DA: Pligten til at forsvare Danmark
    A EN: The duty to defend Denmark
    Question ids: 2019-06-q6, 2023-05-q15
  - Q DA: Hvad er værnepligt?  (`:3357`)
    Q EN: What is værnepligt (conscription / compulsory military service)?
    A DA: Pligten til at være med til at forsvare Danmark
    A EN: The duty to help defend Denmark
    Question ids: 2020-11-q11
- Trap note DA: Det handler ikke om familie eller skat.  (`:3385`)
- Trap note EN: It is not about family or tax.
- Current note DA: (empty)  (`:3387`)
- Current note EN: (empty)

- **Q:2018-06-q4** · `data/questions.json:2465` · exam 2018-06 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er værnepligt?  (`:2469`)
  - Q EN: What is værnepligt (conscription / compulsory military service)?  (`:2489`)
  - Option A DA: Pligten til at være soldat  (`:2473`) · EN: The duty to be a soldier
  - Option B DA: Pligten til at forsørge sin familie  (`:2478`) · EN: The duty to support your family
  - Correct (`:2482`): A
  - Correct text: A) Pligten til at være soldat / The duty to be a soldier
  - image_note: null
- **Q:2019-06-q6** · `data/questions.json:4131` · exam 2019-06 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er værnepligt?  (`:4135`)
  - Q EN: What is værnepligt (conscription / compulsory military service)?  (`:4160`)
  - Option A DA: Pligten til at betale skat til staten  (`:4139`) · EN: The duty to pay tax to the state
  - Option B DA: Pligten til at forsvare Danmark  (`:4144`) · EN: The duty to defend Denmark
  - Option C DA: Pligten til at passe på sin familie  (`:4149`) · EN: The duty to look after your family
  - Correct (`:4153`): B
  - Correct text: B) Pligten til at forsvare Danmark / The duty to defend Denmark
  - image_note: null
- **Q:2020-11-q11** · `data/questions.json:6676` · exam 2020-11 nr. 11 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er værnepligt?  (`:6680`)
  - Q EN: What is værnepligt (conscription / compulsory military service)?  (`:6700`)
  - Option A DA: Pligten til at være med til at forsvare Danmark  (`:6684`) · EN: The duty to help defend Denmark
  - Option B DA: Pligten til at være med til at forsørge sin familie  (`:6689`) · EN: The duty to help support your family
  - Correct (`:6693`): A
  - Correct text: A) Pligten til at være med til at forsvare Danmark / The duty to help defend Denmark
  - image_note: null
- **Q:2023-05-q15** · `data/questions.json:10723` · exam 2023-05 nr. 15 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er værnepligt?  (`:10727`)
  - Q EN: What is værnepligt (conscription / compulsory military service)?  (`:10747`)
  - Option A DA: Pligten til at forsvare Danmark  (`:10731`) · EN: The duty to defend Denmark
  - Option B DA: Pligten til at forsørge sin familie  (`:10736`) · EN: The duty to support your family
  - Correct (`:10740`): A
  - Correct text: A) Pligten til at forsvare Danmark / The duty to defend Denmark
  - image_note: null

#### C:ver-nato-1949 · `data/clusters.json:4135` · asked 3× (2016-12, 2019-06, 2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Danmark blev medlem af NATO i 1949.  (`clusters.json:4137`)
- Fact EN: Denmark joined NATO in 1949.  (`clusters.json:4138`)
- Canonical question DA: Hvilken organisation blev Danmark medlem af i 1949?  (`:4152`)
- Canonical question EN: Which organisation did Denmark join in 1949?  (`:4153`)
- Canonical answer DA: NATO  (`:4154`)
- Canonical answer EN: NATO  (`:4155`)
- Variants:
  - Q DA: Hvilken organisation blev Danmark medlem af i 1949?  (`:4158`)
    Q EN: Which organisation did Denmark join in 1949?
    A DA: NATO
    A EN: NATO
    Question ids: 2016-12-q2
  - Q DA: Hvilken international organisation blev Danmark medlem af i 1949?  (`:4167`)
    Q EN: Which international organisation did Denmark join in 1949?
    A DA: NATO
    A EN: NATO
    Question ids: 2019-06-q4
  - Q DA: Hvornår blev Danmark medlem af NATO?  (`:4176`)
    Q EN: When did Denmark become a member of NATO?
    A DA: 1949
    A EN: 1949
    Question ids: 2025-05-q8
- Trap note DA: 1945 = FN. 1949 = NATO. 1973 = EF (i dag EU).  (`:4185`)
- Trap note EN: 1945 = the UN. 1949 = NATO. 1973 = the EC (today the EU).
- Current note DA: (empty)  (`:4187`)
- Current note EN: (empty)

- **Q:2016-12-q2** · `data/questions.json:36` · exam 2016-12 nr. 2 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken organisation blev Danmark medlem af i 1949?  (`:40`)
  - Q EN: Which organisation did Denmark join in 1949?  (`:65`)
  - Option A DA: FN.  (`:44`) · EN: The UN
  - Option B DA: NATO.  (`:49`) · EN: NATO
  - Option C DA: EU.  (`:54`) · EN: The EU
  - Correct (`:58`): B
  - Correct text: B) NATO. / NATO
  - image_note: null
- **Q:2019-06-q4** · `data/questions.json:4065` · exam 2019-06 nr. 4 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilken international organisation blev Danmark medlem af i 1949?  (`:4069`)
  - Q EN: Which international organisation did Denmark join in 1949?  (`:4094`)
  - Option A DA: EU  (`:4073`) · EN: The EU
  - Option B DA: WTO  (`:4078`) · EN: The WTO
  - Option C DA: NATO  (`:4083`) · EN: NATO
  - Correct (`:4087`): C
  - Correct text: C) NATO / NATO
  - image_note: null
- **Q:2025-05-q8** · `data/questions.json:13667` · exam 2025-05 nr. 8 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvornår blev Danmark medlem af NATO?  (`:13671`)
  - Q EN: When did Denmark become a member of NATO?  (`:13696`)
  - Option A DA: 1949  (`:13675`) · EN: 1949
  - Option B DA: 1969  (`:13680`) · EN: 1969
  - Option C DA: 1989  (`:13685`) · EN: 1989
  - Correct (`:13689`): A
  - Correct text: A) 1949 / 1949
  - image_note: null

#### C:ver-mep-antal · `data/clusters.json:4863` · asked 3× (2017-06, 2017-11, 2018-11) · frequent: no · last asked: 2018-11

- Fact DA: Danmark har 15 medlemmer i Europa-Parlamentet (siden valget i 2024).  (`clusters.json:4865`)
- Fact EN: Denmark has 15 members of the European Parliament (since the 2024 election).  (`clusters.json:4866`)
- Canonical question DA: Hvor mange medlemmer har Danmark i Europa-Parlamentet?  (`:4880`)
- Canonical question EN: How many members does Denmark have in the European Parliament?  (`:4881`)
- Canonical answer DA: 15 i dag (prøvens svar 2017-2018: 13)  (`:4882`)
- Canonical answer EN: 15 today (the 2017–2018 exam answer: 13)  (`:4883`)
- Variants:
  - Q DA: Hvor mange medlemmer vælger Danmark til Europa-Parlamentet?  (`:4886`)
    Q EN: How many members does Denmark elect to the European Parliament?
    A DA: 13
    A EN: 13
    Question ids: 2017-06-q20
  - Q DA: Hvor mange medlemmer har Danmark i Europa-Parlamentet?  (`:4895`)
    Q EN: How many members does Denmark have in the European Parliament?
    A DA: 13
    A EN: 13
    Question ids: 2017-11-q6, 2018-11-q5
- Trap note DA: Hvis valgmulighederne er 13, 23 og 33, så vælg 13 (det gamle tal). Hvis 15 står der, så vælg 15.  (`:4905`)
- Trap note EN: If the options are 13, 23 and 33, choose 13 (the old figure). If 15 is offered, choose 15.
- Current note DA: Tallet har ændret sig: 13 (2009-2020), 14 (2020-2024 efter Brexit), 15 (siden 2024).  (`:4907`)
- Current note EN: The number has changed: 13 (2009–2020), 14 (2020–2024 after Brexit), 15 (since 2024).

- **Q:2017-06-q20** · `data/questions.json:1385` · exam 2017-06 nr. 20 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer vælger Danmark til Europa-Parlamentet?  (`:1389`)
  - Q EN: How many members does Denmark elect to the European Parliament?  (`:1414`)
  - Option A DA: 13.  (`:1393`) · EN: 13
  - Option B DA: 23.  (`:1398`) · EN: 23
  - Option C DA: 33.  (`:1403`) · EN: 33
  - Correct (`:1407`): A
  - Correct text: A) 13. / 13
  - image_note: null
- **Q:2017-11-q6** · `data/questions.json:1728` · exam 2017-11 nr. 6 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Danmark i Europa-Parlamentet?  (`:1732`)
  - Q EN: How many members does Denmark have in the European Parliament?  (`:1757`)
  - Option A DA: 13  (`:1736`) · EN: 13
  - Option B DA: 23  (`:1741`) · EN: 23
  - Option C DA: 33  (`:1746`) · EN: 33
  - Correct (`:1750`): A
  - Correct text: A) 13 / 13
  - image_note: null
- **Q:2018-11-q5** · `data/questions.json:3288` · exam 2018-11 nr. 5 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvor mange medlemmer har Danmark i Europa-Parlamentet?  (`:3292`)
  - Q EN: How many members does Denmark have in the European Parliament?  (`:3317`)
  - Option A DA: 13  (`:3296`) · EN: 13
  - Option B DA: 23  (`:3301`) · EN: 23
  - Option C DA: 33  (`:3306`) · EN: 33
  - Correct (`:3310`): A
  - Correct text: A) 13 / 13
  - image_note: null

#### C:ver-fn-medlem · `data/clusters.json:6165` · asked 2× (2018-06, 2022-06) · frequent: no · last asked: 2022-06

- Fact DA: Danmark er medlem af FN (De Forenede Nationer).  (`clusters.json:6167`)
- Fact EN: Denmark is a member of the UN (United Nations).  (`clusters.json:6168`)
- Canonical question DA: Er Danmark medlem af FN?  (`:6180`)
- Canonical question EN: Is Denmark a member of the UN?  (`:6181`)
- Canonical answer DA: Ja  (`:6182`)
- Canonical answer EN: Yes  (`:6183`)
- Variants:
  - Q DA: Er Danmark medlem af De Forenede Nationer (FN)?  (`:6186`)
    Q EN: Is Denmark a member of the United Nations (UN)?
    A DA: Ja
    A EN: Yes
    Question ids: 2018-06-q12, 2022-06-q13
- Trap note DA: (empty)  (`:6196`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6198`)
- Current note EN: (empty)

- **Q:2018-06-q12** · `data/questions.json:2719` · exam 2018-06 nr. 12 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af De Forenede Nationer (FN)?  (`:2723`)
  - Q EN: Is Denmark a member of the United Nations (UN)?  (`:2743`)
  - Option A DA: Ja  (`:2727`) · EN: Yes
  - Option B DA: Nej  (`:2732`) · EN: No
  - Correct (`:2736`): A
  - Correct text: A) Ja / Yes
  - image_note: null
- **Q:2022-06-q13** · `data/questions.json:9077` · exam 2022-06 nr. 13 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Er Danmark medlem af De Forenede Nationer (FN)?  (`:9081`)
  - Q EN: Is Denmark a member of the United Nations (UN)?  (`:9101`)
  - Option A DA: Ja  (`:9085`) · EN: Yes
  - Option B DA: Nej  (`:9090`) · EN: No
  - Correct (`:9094`): A
  - Correct text: A) Ja / Yes
  - image_note: null

#### C:ver-ep-stemmeprocent · `data/clusters.json:6427` · asked 2× (2016-12, 2019-11) · frequent: no · last asked: 2019-11

- Fact DA: Stemmeprocenten ved valg til Europa-Parlamentet er lavere end ved folketingsvalg.  (`clusters.json:6429`)
- Fact EN: Turnout in European Parliament elections is lower than in general elections.  (`clusters.json:6430`)
- Canonical question DA: Hvordan er stemmeprocenten ved valg til Europa-Parlamentet?  (`:6442`)
- Canonical question EN: What is turnout like in European Parliament elections?  (`:6443`)
- Canonical answer DA: Lavere end ved folketingsvalg  (`:6444`)
- Canonical answer EN: Lower than in general elections  (`:6445`)
- Variants:
  - Q DA: Hvordan er stemmeprocenten normalt i Danmark ved valg til Europa-Parlamentet?  (`:6448`)
    Q EN: What is voter turnout normally like in Denmark in elections to the European Parliament?
    A DA: Lavere end ved folketingsvalg
    A EN: Lower than in general elections
    Question ids: 2016-12-q14
  - Q DA: Hvordan er stemmeprocenten normalt ved valg til Europa-Parlamentet?  (`:6457`)
    Q EN: What is voter turnout normally like in elections to the European Parliament?
    A DA: Lavere end ved folketingsvalg
    A EN: Lower than in general elections
    Question ids: 2019-11-q14
- Trap note DA: (empty)  (`:6466`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6468`)
- Current note EN: (empty)

- **Q:2016-12-q14** · `data/questions.json:412` · exam 2016-12 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvordan er stemmeprocenten normalt i Danmark ved valg til Europa-Parlamentet?  (`:416`)
  - Q EN: What is voter turnout normally like in Denmark in elections to the European Parliament?  (`:441`)
  - Option A DA: På samme niveau som ved folketingsvalg.  (`:420`) · EN: At the same level as in general elections
  - Option B DA: Højere end ved folketingsvalg.  (`:425`) · EN: Higher than in general elections
  - Option C DA: Lavere end ved folketingsvalg.  (`:430`) · EN: Lower than in general elections
  - Correct (`:434`): C
  - Correct text: C) Lavere end ved folketingsvalg. / Lower than in general elections
  - image_note: null
- **Q:2019-11-q14** · `data/questions.json:5190` · exam 2019-11 nr. 14 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvordan er stemmeprocenten normalt ved valg til Europa-Parlamentet?  (`:5194`)
  - Q EN: What is voter turnout normally like in elections to the European Parliament?  (`:5219`)
  - Option A DA: På samme niveau som ved folketingsvalg  (`:5198`) · EN: At the same level as in general elections
  - Option B DA: Højere end ved folketingsvalg  (`:5203`) · EN: Higher than in general elections
  - Option C DA: Lavere end ved folketingsvalg  (`:5208`) · EN: Lower than in general elections
  - Correct (`:5212`): C
  - Correct text: C) Lavere end ved folketingsvalg / Lower than in general elections
  - image_note: null

#### C:ver-ep-valgt-af · `data/clusters.json:6625` · asked 1× (2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Medlemmerne af Europa-Parlamentet vælges af befolkningerne i EU-landene.  (`clusters.json:6627`)
- Fact EN: The members of the European Parliament are elected by the populations of the EU countries.  (`clusters.json:6628`)
- Canonical question DA: Hvem er medlemmerne af Europa-Parlamentet valgt af?  (`:6638`)
- Canonical question EN: Who elects the members of the European Parliament?  (`:6639`)
- Canonical answer DA: Befolkningerne i EU-landene  (`:6640`)
- Canonical answer EN: The populations of the EU countries  (`:6641`)
- Variants:
  - Q DA: Hvem er medlemmerne af Europa-Parlamentet valgt af?  (`:6644`)
    Q EN: Who elects the members of the European Parliament?
    A DA: Befolkningerne i EU-landene
    A EN: The populations of the EU countries
    Question ids: 2026-06-q14
- Trap note DA: (empty)  (`:6653`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6655`)
- Current note EN: (empty)

- **Q:2026-06-q14** · `data/questions.json:15445` · exam 2026-06 nr. 14 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem er medlemmerne af Europa-Parlamentet valgt af?  (`:15449`)
  - Q EN: Who elects the members of the European Parliament?  (`:15469`)
  - Option A DA: Befolkningerne i EU-landene  (`:15453`) · EN: The populations of the EU countries
  - Option B DA: Regeringerne i EU-landene  (`:15458`) · EN: The governments of the EU countries
  - Correct (`:15462`): A
  - Correct text: A) Befolkningerne i EU-landene / The populations of the EU countries
  - image_note: null

#### C:ver-tyskland-handel · `data/clusters.json:6659` · asked 1× (2026-06) · frequent: no · last asked: 2026-06

- Fact DA: Danmark handler mest med Tyskland (import og eksport).  (`clusters.json:6661`)
- Fact EN: Denmark trades most with Germany (imports and exports).  (`clusters.json:6662`)
- Canonical question DA: Hvilket land har Danmark størst samhandel med?  (`:6672`)
- Canonical question EN: Which country does Denmark trade most with?  (`:6673`)
- Canonical answer DA: Tyskland  (`:6674`)
- Canonical answer EN: Germany  (`:6675`)
- Variants:
  - Q DA: Hvilket af følgende lande har Danmark størst samhandel (import og eksport) med?  (`:6678`)
    Q EN: Which of the following countries does Denmark trade most with (imports and exports)?
    A DA: Tyskland
    A EN: Germany
    Question ids: 2026-06-q18
- Trap note DA: (empty)  (`:6687`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6689`)
- Current note EN: (empty)

- **Q:2026-06-q18** · `data/questions.json:15567` · exam 2026-06 nr. 18 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket af følgende lande har Danmark størst samhandel (import og eksport) med?  (`:15571`)
  - Q EN: Which of the following countries does Denmark trade most with (imports and exports)?  (`:15596`)
  - Option A DA: Kina  (`:15575`) · EN: China
  - Option B DA: Tyskland  (`:15580`) · EN: Germany
  - Option C DA: Storbritannien  (`:15585`) · EN: Great Britain
  - Correct (`:15589`): B
  - Correct text: B) Tyskland / Germany
  - image_note: null

#### C:ver-vaernepligt-koen · `data/clusters.json:6693` · asked 1× (2026-06) · frequent: no · last asked: 2026-06

- Fact DA: I dag har både mænd og kvinder værnepligt i Danmark.  (`clusters.json:6695`)
- Fact EN: Today both men and women have compulsory military service in Denmark.  (`clusters.json:6696`)
- Canonical question DA: Hvem har værnepligt i Danmark?  (`:6706`)
- Canonical question EN: Who has compulsory military service in Denmark?  (`:6707`)
- Canonical answer DA: Både mænd og kvinder  (`:6708`)
- Canonical answer EN: Both men and women  (`:6709`)
- Variants:
  - Q DA: Hvem har værnepligt i Danmark?  (`:6712`)
    Q EN: Who has compulsory military service (værnepligt) in Denmark?
    A DA: Både mænd og kvinder
    A EN: Both men and women
    Question ids: 2026-06-q23
- Trap note DA: Ældre materialer siger 'kun mænd' – det er ændret. Svaret er nu begge køn.  (`:6721`)
- Trap note EN: Older material says 'only men' – that has changed. The answer is now both sexes.
- Current note DA: (empty)  (`:6723`)
- Current note EN: (empty)

- **Q:2026-06-q23** · `data/questions.json:15727` · exam 2026-06 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvem har værnepligt i Danmark?  (`:15731`)
  - Q EN: Who has compulsory military service (værnepligt) in Denmark?  (`:15756`)
  - Option A DA: Kun mænd  (`:15735`) · EN: Only men
  - Option B DA: Kun kvinder  (`:15740`) · EN: Only women
  - Option C DA: Både mænd og kvinder  (`:15745`) · EN: Both men and women
  - Correct (`:15749`): C
  - Correct text: C) Både mænd og kvinder / Both men and women
  - image_note: null

#### C:ver-bistand-afrika · `data/clusters.json:6931` · asked 1× (2025-11) · frequent: no · last asked: 2025-11

- Fact DA: Størstedelen af den danske udviklingsbistand går til Afrika.  (`clusters.json:6933`)
- Fact EN: Most of Denmark's development aid goes to Africa.  (`clusters.json:6934`)
- Canonical question DA: Hvilken verdensdel modtager størstedelen af den danske udviklingsbistand?  (`:6944`)
- Canonical question EN: Which continent receives most Danish development aid?  (`:6945`)
- Canonical answer DA: Afrika  (`:6946`)
- Canonical answer EN: Africa  (`:6947`)
- Variants:
  - Q DA: Hvilken verdensdel modtager størstedelen af den danske udviklingsbistand?  (`:6950`)
    Q EN: Which continent receives most of Denmark's development aid?
    A DA: Afrika
    A EN: Africa
    Question ids: 2025-11-q23
- Trap note DA: (empty)  (`:6959`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6961`)
- Current note EN: (empty)

- **Q:2025-11-q23** · `data/questions.json:14932` · exam 2025-11 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken verdensdel modtager størstedelen af den danske udviklingsbistand?  (`:14936`)
  - Q EN: Which continent receives most of Denmark's development aid?  (`:14961`)
  - Option A DA: Afrika  (`:14940`) · EN: Africa
  - Option B DA: Asien  (`:14945`) · EN: Asia
  - Option C DA: Sydamerika  (`:14950`) · EN: South America
  - Correct (`:14954`): A
  - Correct text: A) Afrika / Africa
  - image_note: null

#### C:ver-folkeafstemning-eu · `data/clusters.json:6965` · asked 1× (2025-05) · frequent: no · last asked: 2025-05

- Fact DA: Siden 1953 har der været flest folkeafstemninger om Danmarks forhold til EU.  (`clusters.json:6967`)
- Fact EN: Since 1953 most referendums have been about Denmark's relationship with the EU.  (`clusters.json:6968`)
- Canonical question DA: Hvad har der været flest folkeafstemninger om siden 1953?  (`:6978`)
- Canonical question EN: What have most referendums been about since 1953?  (`:6979`)
- Canonical answer DA: Danmarks forhold til EU  (`:6980`)
- Canonical answer EN: Denmark's relationship with the EU  (`:6981`)
- Variants:
  - Q DA: Hvad har der været flest folkeafstemninger om i Danmark siden 1953?  (`:6984`)
    Q EN: What have there been the most referendums about in Denmark since 1953?
    A DA: Danmarks forhold til EU
    A EN: Denmark's relationship with the EU
    Question ids: 2025-05-q6
- Trap note DA: (empty)  (`:6993`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:6995`)
- Current note EN: (empty)

- **Q:2025-05-q6** · `data/questions.json:13601` · exam 2025-05 nr. 6 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad har der været flest folkeafstemninger om i Danmark siden 1953?  (`:13605`)
  - Q EN: What have there been the most referendums about in Denmark since 1953?  (`:13630`)
  - Option A DA: Danmarks forhold til EU  (`:13609`) · EN: Denmark's relationship with the EU
  - Option B DA: Valgretsalderen  (`:13614`) · EN: The voting age
  - Option C DA: Grundloven  (`:13619`) · EN: The Constitution (Grundloven)
  - Correct (`:13623`): A
  - Correct text: A) Danmarks forhold til EU / Denmark's relationship with the EU
  - image_note: null

#### C:ver-vaernepligt-flere · `data/clusters.json:6999` · asked 1× (2025-05) · frequent: no · last asked: 2025-05

- Fact DA: I 2024 blev det besluttet, at der skal indkaldes flere værnepligtige.  (`clusters.json:7001`)
- Fact EN: In 2024 it was decided that more conscripts will be called up.  (`clusters.json:7002`)
- Canonical question DA: Hvad blev besluttet om værnepligten i 2024?  (`:7012`)
- Canonical question EN: What was decided about conscription in 2024?  (`:7013`)
- Canonical answer DA: At der skal indkaldes flere værnepligtige  (`:7014`)
- Canonical answer EN: That more conscripts will be called up  (`:7015`)
- Variants:
  - Q DA: Hvad er besluttet omkring værnepligten i 2024?  (`:7018`)
    Q EN: What was decided about conscription in 2024?
    A DA: At der skal indkaldes flere værnepligtige
    A EN: That more conscripts will be called up
    Question ids: 2025-05-q21
- Trap note DA: (empty)  (`:7027`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7029`)
- Current note EN: (empty)

- **Q:2025-05-q21** · `data/questions.json:14071` · exam 2025-05 nr. 21 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvad er besluttet omkring værnepligten i 2024?  (`:14075`)
  - Q EN: What was decided about conscription in 2024?  (`:14100`)
  - Option A DA: At der skal indkaldes flere værnepligtige  (`:14079`) · EN: That more conscripts will be called up
  - Option B DA: At der skal indkaldes samme antal værnepligtige  (`:14084`) · EN: That the same number of conscripts will be called up
  - Option C DA: At der skal indkaldes færre værnepligtige  (`:14089`) · EN: That fewer conscripts will be called up
  - Correct (`:14093`): A
  - Correct text: A) At der skal indkaldes flere værnepligtige / That more conscripts will be called up
  - image_note: null

#### C:ver-irak · `data/clusters.json:7203` · asked 1× (2024-11) · frequent: no · last asked: 2024-11

- Fact DA: I 2003 sendte Danmark soldater til Irak efter en invasion ledet af USA.  (`clusters.json:7205`)
- Fact EN: In 2003 Denmark sent soldiers to Iraq after an invasion led by the USA.  (`clusters.json:7206`)
- Canonical question DA: Hvilket land sendte Danmark soldater til i 2003?  (`:7216`)
- Canonical question EN: To which country did Denmark send soldiers in 2003?  (`:7217`)
- Canonical answer DA: Irak  (`:7218`)
- Canonical answer EN: Iraq  (`:7219`)
- Variants:
  - Q DA: Hvilket land sendte Danmark soldater til i 2003 efter en invasion, der var ledet af USA?  (`:7222`)
    Q EN: To which country did Denmark send soldiers in 2003 after an invasion led by the USA?
    A DA: Irak
    A EN: Iraq
    Question ids: 2024-11-q24
- Trap note DA: (empty)  (`:7231`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7233`)
- Current note EN: (empty)

- **Q:2024-11-q24** · `data/questions.json:13380` · exam 2024-11 nr. 24 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilket land sendte Danmark soldater til i 2003 efter en invasion, der var ledet af USA?  (`:13384`)
  - Q EN: To which country did Denmark send soldiers in 2003 after an invasion led by the USA?  (`:13409`)
  - Option A DA: Syrien  (`:13388`) · EN: Syria
  - Option B DA: Irak  (`:13393`) · EN: Iraq
  - Option C DA: Libyen  (`:13398`) · EN: Libya
  - Correct (`:13402`): B
  - Correct text: B) Irak / Iraq
  - image_note: null

#### C:ver-nato-forsvar · `data/clusters.json:7305` · asked 1× (2024-05) · frequent: no · last asked: 2024-05

- Fact DA: I NATO samarbejder landene primært om forsvarspolitik.  (`clusters.json:7307`)
- Fact EN: In NATO the countries mainly cooperate on defence policy.  (`clusters.json:7308`)
- Canonical question DA: Hvilket område samarbejdes der primært om i NATO?  (`:7318`)
- Canonical question EN: Which area is the main focus of cooperation in NATO?  (`:7319`)
- Canonical answer DA: Forsvarspolitik  (`:7320`)
- Canonical answer EN: Defence policy  (`:7321`)
- Variants:
  - Q DA: Hvilket område samarbejdes der primært om i NATO?  (`:7324`)
    Q EN: Which area is the main focus of cooperation in NATO?
    A DA: Forsvarspolitik
    A EN: Defence policy
    Question ids: 2024-05-q16
- Trap note DA: (empty)  (`:7333`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:7335`)
- Current note EN: (empty)

- **Q:2024-05-q16** · `data/questions.json:12336` · exam 2024-05 nr. 16 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvilket område samarbejdes der primært om i NATO?  (`:12340`)
  - Q EN: Which area is the main focus of cooperation in NATO?  (`:12365`)
  - Option A DA: Handelspolitik  (`:12344`) · EN: Trade policy
  - Option B DA: Flygtningepolitik  (`:12349`) · EN: Refugee policy
  - Option C DA: Forsvarspolitik  (`:12354`) · EN: Defence policy
  - Correct (`:12358`): C
  - Correct text: C) Forsvarspolitik / Defence policy
  - image_note: null

#### C:ver-ep-valg-5-aar · `data/clusters.json:7679` · asked 1× (2019-06) · frequent: no · last asked: 2019-06

- Fact DA: Der er valg til Europa-Parlamentet hvert 5. år.  (`clusters.json:7681`)
- Fact EN: There are elections to the European Parliament every 5 years.  (`clusters.json:7682`)
- Canonical question DA: Hvor tit er der valg til Europa-Parlamentet?  (`:7692`)
- Canonical question EN: How often are there elections to the European Parliament?  (`:7693`)
- Canonical answer DA: Hvert 5. år  (`:7694`)
- Canonical answer EN: Every 5 years  (`:7695`)
- Variants:
  - Q DA: Hvor tit er der valg til Europa-Parlamentet?  (`:7698`)
    Q EN: How often are there elections to the European Parliament?
    A DA: Hvert femte år
    A EN: Every five years
    Question ids: 2019-06-q2
- Trap note DA: Europa-Parlamentet = 5 år. Folketinget og kommunerne = 4 år.  (`:7707`)
- Trap note EN: European Parliament = 5 years. Folketing and municipalities = 4 years.
- Current note DA: (empty)  (`:7709`)
- Current note EN: (empty)

- **Q:2019-06-q2** · `data/questions.json:3999` · exam 2019-06 nr. 2 · section '' · answer_source: text · uncertain: false · notes: ''
  - Q DA: Hvor tit er der valg til Europa-Parlamentet?  (`:4003`)
  - Q EN: How often are there elections to the European Parliament?  (`:4028`)
  - Option A DA: Hvert femte år  (`:4007`) · EN: Every five years
  - Option B DA: Hvert fjerde år  (`:4012`) · EN: Every four years
  - Option C DA: Hvert tredje år  (`:4017`) · EN: Every three years
  - Correct (`:4021`): A
  - Correct text: A) Hvert femte år / Every five years
  - image_note: null

#### C:ver-eu-handel · `data/clusters.json:8019` · asked 1× (2017-06) · frequent: no · last asked: 2017-06

- Fact DA: EU arbejder blandt andet for fri handel mellem medlemslandene.  (`clusters.json:8021`)
- Fact EN: The EU works, among other things, for free trade between its member states.  (`clusters.json:8022`)
- Canonical question DA: Hvilken organisation arbejder for fri handel mellem medlemslandene?  (`:8032`)
- Canonical question EN: Which organisation works for free trade between its member states?  (`:8033`)
- Canonical answer DA: EU  (`:8034`)
- Canonical answer EN: The EU  (`:8035`)
- Variants:
  - Q DA: Hvilken organisation arbejder blandt andet for fri handel mellem medlemslandene?  (`:8038`)
    Q EN: Which organisation works, among other things, for free trade between its member states?
    A DA: EU
    A EN: The EU
    Question ids: 2017-06-q23
- Trap note DA: (empty)  (`:8047`)
- Trap note EN: (empty)
- Current note DA: (empty)  (`:8049`)
- Current note EN: (empty)

- **Q:2017-06-q23** · `data/questions.json:1479` · exam 2017-06 nr. 23 · section '' · answer_source: image · uncertain: false · notes: ''
  - Q DA: Hvilken organisation arbejder blandt andet for fri handel mellem medlemslandene?  (`:1483`)
  - Q EN: Which organisation works, among other things, for free trade between its member states?  (`:1508`)
  - Option A DA: NATO.  (`:1487`) · EN: NATO
  - Option B DA: FN.  (`:1492`) · EN: The UN
  - Option C DA: EU.  (`:1497`) · EN: The EU
  - Correct (`:1501`): C
  - Correct text: C) EU. / The EU
  - image_note: null


---

# B. Hard-coded facts in the HTML / JS / docs

Each entry is the full source line, copied verbatim, with its file and line. Entries marked *(constant)* are values used in code and shown on the site through the text next to them.

- **H:1** · `index.html:54` – footer on index.html; identical footer on study/learn/quiz/exams/top15.html
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:2** · `exams.html:54` – same footer
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:3** · `quiz.html:54` – same footer
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:4** · `study.html:54` – same footer
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:5** · `learn.html:54` – same footer
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:6** · `top15.html:54` – same footer
  - `<p>Data: 20 officielle medborgerskabsprøver 2016–2026 (danskogproever.dk). Fakta per november 2026.</p>`
- **H:7** · `js/exams.js:9` – (constant) pass mark for the best-score marker on Prøver
  - `var PASS = 20;`
- **H:8** · `js/exams.js:10` – (constant) which exam gets the key-error flag
  - `var KEY_ERROR_EXAM = "2017-11";`
- **H:9** · `js/exams.js:29`
  - `main.appendChild(bi("De 20 rigtige prøver", "The 20 real exams", "h1"));`
- **H:10** · `js/exams.js:31`
  - `"Alle officielle prøver fra december 2016 til juni 2026, med rettenøgle. Du kan også øve hver prøve her på siden.",`
- **H:11** · `js/exams.js:41` – answer-key error note (shown on Prøver page)
  - `"Rettenøglen fra november 2017, spørgsmål 23, har en fejl – det rigtige svar er C (Slesvig og Holsten).",`
- **H:12** · `js/exams.js:83` – pill shown next to the 2017-11 exam
  - `left.push(h("span", { class: "pill-keyerr" }, MBP.icon("flag", 13), "Fejl i svar-arket, spm. 23"));`
- **H:13** · `js/home.js:14` – (constant) exam date 25 Nov 2026
  - `var exam = Date.UTC(2026, 10, 25);`
- **H:14** · `js/home.js:73` – says today's course is 10 items
  - `"Dagens kurs er 10 emner. For at nå alle " + total + " inden prøven: ca. " + perDay + " om dagen.",`
- **H:15** · `js/home.js:87` – exam date shown on the home page
  - `"Onsdag 25. november 2026",`
- **H:16** · `js/home.js:54` – daily goal text (25 answers)
  - `var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dagens mål er nået" : today.answers + " af 25 svar i dag");`
- **H:17** · `js/home.js:54` – daily goal shown as 'af 25 svar'
  - `var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dagens mål er nået" : today.answers + " af 25 svar i dag");`
- **H:18** · `js/store.js:11` – (constant) daily goal of 25 answers
  - `var GOAL = 25;`
- **H:19** · `js/quiz.js:8` – (constant) exam length
  - `var EXAM_LENGTH = 25;`
- **H:20** · `js/quiz.js:9` – (constant) exam pass mark
  - `var EXAM_PASS = 20;`
- **H:21** · `js/quiz.js:10` – (constant) pass percent for normal quiz
  - `var NORMAL_PASS_PERCENT = 80;`
- **H:22** · `js/quiz.js:236` – shown in the exam-simulation setup
  - `"25 spørgsmål som til den rigtige prøve. Du ser svarene til sidst. Bestået ved 20 rigtige.",`
- **H:23** · `js/quiz.js:236` – pass rule text
  - `"25 spørgsmål som til den rigtige prøve. Du ser svarene til sidst. Bestået ved 20 rigtige.",`
- **H:24** · `js/quiz.js:565` – pass rule text in the fail verdict
  - `bi("Øv dine fejl, og prøv igen. Grænsen er 20 rigtige.", "Practise your mistakes and try again. The pass mark is 20 correct.", "span")));`
- **H:25** · `js/quiz.js:249` – defines 'frequent' as asked in 4+ exams
  - `bi("Kun ofte stillede (stillet i 4+ prøver)", "Only frequently asked (asked in 4+ exams)", "span")),`
- **H:26** · `js/quiz.js:113` – daily goal toast
  - `MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers");`
- **H:27** · `js/learn.js:213` – daily goal toast
  - `MBP.ui.toast("Dagens mål er nået: 25 svar", "Today's goal reached: 25 answers");`
- **H:28** · `js/ui.js:310` – answer-key error explanation shown after question 23 of 2017-11
  - `"Den officielle rettenøgle fra 2017 siger fejlagtigt B (Skåne, Halland og Blekinge). Det rigtige svar er Slesvig og Holsten – Skåne blev mistet i 1658.",`
- **H:29** · `js/top15.js:21` – top-15 page intro
  - `"Spørgsmålene, der er kommet flest gange i de 20 prøver.",`
- **H:30** · `README.md:7` – repo README (on GitHub, not in the app)
  - `The content is built from all 20 official exams, December 2016 to June 2026. All text is Danish, with an English line under it.`
- **H:31** · `README.md:13` – repo README
  - `- **I dag / Today** – the countdown to the exam (25 Nov 2026) and today's stamps, then two buttons: **Lær / Learn** (choose a topic) and **Test** (choose a topic or all), and a link to the 15 most-asked questions.`
- **H:32** · `README.md:16` – repo README
  - `- **Test** – a quiz by topic, "most-asked only", or a real 25-question exam simulation (pass at 20/25). Your latest results are shown at the bottom of the page.`
- **H:33** · `README.md:39` – repo README
  - `- **500 questions** in 'data/questions.json'`
- **H:34** · `README.md:40` – repo README
  - `- **168 clusters** (groups of questions about the same fact) in 'data/clusters.json'`
- **H:35** · `README.md:41` – repo README
  - `- **10 topics** in 'data/topics.json'`
- **H:36** · `README.md:42` – repo README
  - `- **15 fact groups** (the overview tables) in 'data/fact_groups.json'`
- **H:37** · `README.md:45` – repo README note (same claim as in the app)
  - `**Note on the November 2017 answer key:** the official key for question 23 (1864 territorial losses) is misprinted. It says B (Skåne, Halland og Blekinge). Those areas were lost in 1658. In 1864 Denmark lost Slesvig og Holsten, which is option C. The site uses C. Question 23 is flagged in the explanation after you answer it, and on the Prøver page for 2017-11.`
- **H:38** · `README.md:45` – repo README note
  - `**Note on the November 2017 answer key:** the official key for question 23 (1864 territorial losses) is misprinted. It says B (Skåne, Halland og Blekinge). Those areas were lost in 1658. In 1864 Denmark lost Slesvig og Holsten, which is option C. The site uses C. Question 23 is flagged in the explanation after you answer it, and on the Prøver page for 2017-11.`
- **H:39** · `exams/INDEX.md:7` – exam index
  - `Question counts were filled in by the transcription step (see data/TRANSCRIPTION_REPORT.md): every exam has 25 questions, with 2 or 3 answer options each.`
- **H:40** · `exams/INDEX.md:5` – exam index
  - `Downloaded 2026-11-09. All 20 sessions from 2016-12 to 2026-06 have both an exam and an answer key. No answer key is missing.`

Note: `js/top15.js` builds the 15 most-asked list from the first 15 entries of `data/clusters.json` (already sorted by `times_asked`, descending). Those 15 clusters appear in section A under their topics: his-foerste-kvindelige-sm, dem-rettigheder, dem-kommunerne-boern, kon-rigsfaellesskab, udd-undervisningspligt, arb-tillidsrepraesentant, dem-2-og-2, his-reformation, arb-vestas, geo-hoejeste-punkt, arb-novo, dem-forening, arb-37-timer, udd-karakter-12, dem-179.

---

# C. Counts per topic and total

| Topic | Intro (I) | Current facts (F) | Fact groups (G) | Clusters (C) | Questions (Q) |
|---|---|---|---|---|---|
| 1 – Demokrati, grundlov og retsstat | 7 | 2 | 7 | 35 | 131 |
| 2 – Kongehus og rigsfællesskab | 3 | 1 | 0 | 7 | 23 |
| 3 – Historie | 4 | 1 | 0 | 20 | 55 |
| 4 – Geografi og befolkning | 3 | 1 | 2 | 16 | 42 |
| 5 – Arbejdsmarked og erhverv | 4 | 0 | 2 | 18 | 69 |
| 6 – Velfærd, sundhed og familie | 3 | 3 | 1 | 18 | 45 |
| 7 – Uddannelse og børn | 3 | 0 | 1 | 15 | 42 |
| 8 – Kultur og kendte danskere | 2 | 0 | 1 | 13 | 32 |
| 9 – Højtider, traditioner og religion | 2 | 1 | 0 | 8 | 25 |
| 10 – Danmark i verden og forsvar | 3 | 1 | 1 | 18 | 36 |
| **Total** | **34** | **10** | **15** | **168** | **500** |

- Data-file items: 34 intro + 10 current facts + 15 fact groups + 168 clusters + 500 questions = **727 items** (sections A).
- Hard-coded facts (section B): **40 items**.
- Grand total: **767 items** (727 data + 40 hard-coded).

Checks run by the generator (all in the output of this file's generation, not in the content):

- questions: 500, clusters: 168, topics: 10, fact groups: 15
- option counts: {3: 363, 2: 137}
- questions whose correct key is not an option: []
- correct-answer count per question: {1: 500}
- questions with unknown cluster_id: []
- clusters whose question_ids differ from questions.cluster_id: []
- clusters where frequent != (times_asked >= 4): []
- topic question_count / cluster_ids mismatches: []
- fact groups listed under more than one topic: {'fg-aarstal': ['demokrati', 'historie', 'verden'], 'fg-hvem-styrer': ['demokrati', 'velfaerd', 'uddannelse'], 'fg-tal': ['demokrati', 'geografi', 'arbejde', 'uddannelse', 'verden'], 'fg-valg': ['demokrati', 'verden'], 'fg-hoejtider': ['demokrati', 'historie', 'traditioner'], 'fg-ja-nej': ['demokrati', 'arbejde'], 'fg-gratis': ['arbejde', 'velfaerd', 'uddannelse'], 'fg-aldre': ['velfaerd', 'uddannelse']}
- fact groups in no topic: []
- answer_source counts: {'image': 200, 'text': 300}
- image_note non-null count: 0
- uncertain true count: 0
- questions with non-empty notes: ['2017-11-q23', '2018-11-q8', '2024-11-q3', '2024-11-q8', '2025-11-q2']
- 2017-11-q23 correct=['C'] options=[('A', 'Island og Norge'), ('B', 'Skåne, Halland og Blekinge'), ('C', 'Slesvig og Holsten')]

Parsing notes: all 500 questions, 168 clusters, 10 topics and 15 fact groups were parsed from their JSON; every text field was written out. Items that could not be located by exact text search (warnings) are listed here: none

