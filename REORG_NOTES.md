# Fact-sheet reorganisation: notes

## Baseline (Phase 0, on main before any change)
- `python3 tools/build_data.py`: wrote data/bundle-core.js (500 questions, 168 clusters, 10 topics, 15 groups); data/bundle-book.js (285 book excerpts, 372 more-from-the-book excerpts)
- `node tools/check_book_en.js`: English: 935 of 935 book texts translated; stale keys: 0; bundle matches: true. ALL OK
- `node tools/check_book_more.js`: more: 193 keys, 372 excerpts; questions with feedback block: 500 / 500; ALL OK

## Phase 1: data re-keyed to 26 sheets
- `tools/reorg_sheets.py` written and run once. Output:
  - clusters: 127 with one sheet, 40 with two, 1 with three (as expected)
  - fact groups: main sheets as in the plan; `fg-kendte` overridden to `kultur`. `topic_ids` are ordered main first, then the other sheets with >= 5 lines, most-cited first. Note: this gives `fg-aarstal` 6 sheets, `fg-tal` 5 and `fg-ja-nej` 5 (the rule as written in the plan; see open points).
  - book_more: 48 topic-keyed excerpts re-keyed to 21 sheets, count unchanged (204 keys, 372 excerpts)
  - old topics saved to `book-expansion/old_topics.json` (needed for Phase 2)
- `tools/check_book_more.js` rule 2 changed to compare the multiset of items with `01-content-plan.json` (as the plan says); the content-plan file itself is untouched.
- `tools/check_sheets.js` added. Rule 8 (intros) is skipped until the intros exist (Phase 2).
- The script refuses to run twice (it checks topics.json for 26 entries).
- The JSON files keep the original one-space indentation.
- Per-sheet counts (own/shared) and question counts are printed by `check_sheets.js`.
- `check_book_en.js` now fails with 23 stale keys (old intro passages). Expected; Phase 2 fixes it.

## Phase 2: intros from the book, with English
- `python3 tools/reorg_sheets.py intros` fills `intro` in `data/topics.json` with `bookclean.clean()` text (Danish, word for word). The English is in the same file (`intro[].en`). It keeps existing English when the Danish is unchanged, so the command can be rerun.
- The English was written by hand (plain English, Danish terms kept with a short gloss) and applied with a scratch script. It's stored in `topics.json`, not in the repo.
- Book popover strings: `data/book_en.json` has 968 of 968 strings translated and 0 stale keys (25 old intro passages dropped). 54 popover strings were the same text as an intro paragraph and reuse that English. 4 were new (`12-16`/`13-15` excerpts, the Statsmagten passage, two passages with an internal line break).
- `tools/build_data.py` `excerpt()` now also drops a margin label beside a body line (the same rule as `bookclean.SECOND_COL`). Before this, 12 popover quotes contained words like `SKOLE` or `KLIMA`. The change touched only those 12 excerpts; they are retranslated.

### Line ranges: changes from the plan table (IMPLEMENTATION_PLAN.md 2.1)
Checked against `bookdump/pages/page-NNN.txt`:
- **Sheet 4 (page 22)**: the contents box is 13 bullets, not 4. It is split by the printed chapter label "DET DANSKE ARBEJDSMARKED" (a margin label on line 16): bullets 8–11 and 17–25. The box is one paragraph, `lines 7-25`. The opening text is paragraphs on lines 28–59 (the end of page 22). There is no heading on page 22 after line 28; the next heading, FLEXICURITY, is at the top of page 23, so the text stops at the page end.
- **Sheet 19 (page 105)**: the plan says there is no box. The page does have one: "Dette afsnit handler om:" on line 27 with bullets 28–29. It is handled like the others.
- **Sheet 21 (page 116)**: the box heading is on line 7 (the plan says 6) and the bullet wraps over lines 8–9 (plan: 7–8). No opening text, as planned.
- **Sheet 6 (page 35)**: the opening text has a bullet list in the running text (lines 23–27). It is kept inside that paragraph, one bullet per line, so the `•` count matches the English.
- **Sheet 23 and 24**: the opening text is lines 6–12 (the plan said 6–17). Lines 13–17 are blank or margin labels, so nothing changes.
- **Sheet 5**: the box is split by a margin label (lines 13–17). Bullets 11–20 are read as one box.

### Intros (Danish), as printed by `python3 tools/reorg_sheets.py intros`
Each paragraph shows its `book` line range. The `\n` in the sheet data is shown as a new line here.
Sheet  page  opening text   box heading   bullets
    1     6  6-18          19            20-22
    2    12  6-17          18            19-21
    3    18  6-26          27            28-31
    4    22  none          7             8-11, 17-25
    5    31  6-6           10            11-20
    6    35  6-37          38            39-40
    7    41  6-19          20            21-25
    8    47  6-18          19            20-25
    9    53  6-18          19            20-24
   10    58  6-17          18            19-21
   11    62  6-34          35            36-38
   12    68  6-17          18            19-20
   13    72  6-12          13            14-21
   14    77  6-29          30            31-33
   15    82  6-17          18            19-20
   16    89  6-22          23            24-25
   17    93  6-23          24            25-26
   18    97  6-19          20            21-24
   19   105  6-26          27            28-29
   20   108  6-24          25            26-26
   21   116  none          7             8-9
   22   123  6-12          13            14-14
   23   128  6-12          18            19-19
   24   133  6-12          18            19-19
   25   139  6-28          29            30-33
   26   143  6-22          23            24-25

=== 1 skole (page 6)
  [6-10]
    Der er undervisningspligt i Danmark. Alle børn skal have mindst ti års undervisning. De fleste forældre vælger at sætte deres barn i folkeskolen.
  [12-16]
    Forældrene kan dog også vælge, at barnet skal modtage undervisning andre steder end i folkeskolen. De kan fx vælge at sætte barnet i en friskole eller i en privatskole. Her skal forældrene betale direkte til skolen for barnets skolegang. Det skal de ikke, hvis barnet går i folkeskolen. Det er et krav*, at børn på friskoler og privatskoler skal lære det samme som børn i folkeskolen.
  [19-22]
    Dette fakta-ark handler om:
    • Folkeskolen
    • Forældresamarbejde
    • Frie grundskoler

=== 2 uddannelse (page 12)
  [6-13]
    Uddannelse er meget vigtig, da de fleste job på det danske arbejdsmarked kræver, at man har en uddannelse. Det danske samfund kaldes ofte et videnssamfund. Det betyder, at stadig flere mennesker har et arbejde, hvor viden er den vigtigste ressource*. Derfor spiller uddannelse en helt afgørende* rolle for unge og voksne. Uddannelse er som regel gratis i Danmark.
  [18-21]
    Dette fakta-ark handler om:
    • Ungdomsuddannelser
    • Videregående uddannelser
    • Voksen- og efteruddannelse

=== 3 dagtilbud (page 18)
  [6-17]
    Det har været et politisk mål i Danmark siden 1960’erne at give forældre mulighed for at få deres børn passet uden for hjemmet i vuggestuer og børnehaver, fordi man ønskede at få kvinderne ud på arbejdsmarkedet. I dag arbejder begge forældre normalt uden for hjemmet. Langt de fleste mindre børn går derfor i vuggestue, børnehave eller dagpleje. De fleste børn mellem tre og fem år passes uden for hjemmet. Fælles for alle former for pasningstilbud er, at det pædagogiske arbejde skal fremme* børns trivsel*, udvikling og læring.
  [19-24]
    Alle børn har ret til en plads i et dagtilbud. Det er kommunerne, der er ansvarlige for dagtilbuddene, men det er forskelligt fra kommune til kommune, hvilke tilbud der er. De mest almindelige er vuggestue, børnehave og dagpleje. Kommunen betaler en del af udgiften, mens forældrene betaler den resterende del. Men hvis fx forældrenes indtægt er lav, eller der er tale om en enlig forsørger, er der mulighed for at søge om yderligere økonomisk tilskud fra kommunen.
  [27-31]
    Dette fakta-ark handler om:
    • Vuggestue
    • Dagpleje
    • Børnehave
    • SFO og fritidsklub

=== 4 arbejdsmarked (page 22)
  [7-25]
    Dette fakta-ark handler om:
    • Hvordan det danske arbejdsmarked fungerer
    • Flexicurity
    • Kollektive overenskomster
    • Fagforeninger
    • Når man får arbejde
    • Løn
    • Arbejdstid
    • Ferie
    • Barselsorlov, fædreorlov og forældreorlov
    • Demokrati på arbejdspladsen
    • Regler for fyring
    • Hvis man mister sit arbejde
    • At være selvstændig erhvervsdrivende
  [28-33]
    I nogle lande er der tradition for, at det mest er parlamentet og regeringen, som bestemmer, hvordan arbejdsmarkedet skal fungere. Men sådan er det ikke i Danmark. Her er det kun få regler om ansættelsesforhold, som er bestemt i lovgivningen. De fleste regler er aftalt mellem arbejdsmarkedets parter – fagforeningerne og arbejdsgiverorganisationerne. Dette system går helt tilbage til 1899.
  [35-37]
    De to parter mødes og forhandler med hinanden for at indgå kollektive overenskomster*. Det er aftaler om, hvilke regler for løn, arbejdstid m.m. der skal være i aftaleperioden (som oftest varer to eller tre år).
  [39-42]
    Begge parter skal rette sig efter overenskomsten, og der er ”fredspligt” – ingen strejker eller lockout, så længe overenskomsten gælder. Der findes et helt særligt system uden for de almindelige domstole til at afgøre overtrædelser (Arbejdsretten og faglige voldgiftsretter*).
  [44-46]
    Hvis de ikke kan blive enige om at aftale en overenskomst, har de to parter forskellige muligheder: Fagforeningerne kan fx organisere strejker. Det betyder, at medlemmer standser arbejdet, indtil der er indgået en overenskomst.
  [52-56]
    Arbejdsgiverne kan fx lave lockout. Det betyder, at de ansatte, der er medlem af en fagforening, ikke må komme på arbejde, før der er indgået en overenskomst. Arbejdsgiverne udbetaler ikke løn til de ansatte, der strejker, eller til ansatte, der er ramt af lockout. Oftest bliver parterne dog enige om en overenskomst uden at anvende strejke eller lockout.
  [58-59]
    Cirka 73 procent af borgerne i Danmark mellem 16 og 66 år har et lønmodtagerarbejde. Næsten lige mange mænd og kvinder arbejder.

=== 5 erhvervsliv (page 31)
  [6-6]
    Det danske erhvervsliv består af forskellige sektorer.
  [10-20]
    Dette fakta-ark omhandler:
    • Det danske landbrug
    • Dansk industri
    • Dansk søfart
    • Danske serviceydelser
    • Danmarks samhandel med udlandet

=== 6 velfaerd (page 35)
  [6-13]
    Velfærdssamfundet* i Danmark bygger på en slags gensidig aftale mellem borgerne og staten. På den ene side bidrager* borgerne ved, at de borgere, der kan, arbejder og betaler skat. På den anden side spænder* det offentlige et sikkerhedsnet ud under borgerne, som sikrer hjælp til dem, der ikke kan klare sig selv.
  [19-27]
    Staten tager altså et stort ansvar for borgernes velfærd. Dvs., at staten har medansvar for, at borgerne kan føle sig trygge, og at de kan trives. På den måde er staten med til at sikre, at borgerne fx:
    • kan få gratis skolegang og uddannelse
    • kan få hjælp under sygdom
    • kan få hjælp, hvis de mister arbejdet
    • kan få hjælp, hvis de har eller får et handicap
    • kan få hjælp, når de bliver ældre
  [29-31]
    Omvendt har borgerne et ansvar for at bidrage* økonomisk til velfærdsstaten ved at arbejde og betale skat. På den måde kommer der via skattesystemet penge til velfærden.
  [33-35]
    Princippet i det danske velfærdssamfund er med andre ord, at alle, der kan, skal bidrage til velfærden, og at alle, der har behov for det, kan få hjælp fra det offentlige uanset deres tilknytning til arbejdsmarkedet.
  [38-40]
    Dette fakta-ark handler om:
    • Velfærden i mange dele af borgernes liv
    • Pengene til velfærden – hvor kommer de fra?

=== 7 familieliv (page 41)
  [6-10]
    Det er de enkelte familiers ansvar at få livet i familien til at fungere og at give børnene trygge forhold at vokse op i.
  [12-17]
    Men samfundet har en række tilbud, der er med til at skabe gode rammer* for familielivet. Man har fx ret til barselsorlov, og der er tilbud om børnepasning. Samtidig er der nogle regler i samfundet, som beskytter børns, mænds og kvinders rettigheder. De gælder også i hjemmet.
  [20-25]
    Dette fakta-ark handler om:
    • Familielivets mange former
    • Ægteskab og parforhold
    • Skilsmisse
    • Graviditet, fødsel og barselsorlov
    • Børn og unges rettigheder

=== 8 foreningsliv (page 47)
  [6-13]
    I Danmark er der en lang tradition for at danne foreninger. Her mødes mennesker om fælles interesser eller mål. Foreningerne er med til at skabe sociale fællesskaber i det danske samfund. Her mødes nemlig ofte mennesker med forskellig baggrund*. Dvs., at der her kommer mennesker fra forskellige sociale lag*, med forskellige politiske holdninger og forskellig etnisk baggrund.
  [19-25]
    Dette fakta-ark handler om:
    • Foreningslivet i Danmark
    • Idrætsforeninger
    • Frivilligt socialt arbejde
    • Aftenskoler
    • Højskoler
    • Biblioteker

=== 9 sundhed (page 53)
  [6-6]
    Alle borgere kan komme til lægen eller på sygehuset, hvis det er nødvendigt.
  [10-13]
    Langt de fleste behandlinger er gratis, og udgifterne betales via skatterne. Nogle behandlinger skal borgerne dog selv betale en del af, fx tandlægebesøg og besøg hos fysioterapeut. Desuden skal man normalt betale en del af udgifterne til sin medicin.
  [19-24]
    Dette fakta-ark handler om:
    • Sundhedskort, praktiserende læge, medicin og apoteker
    • Sygehuse
    • Tandpleje
    • Børneundersøgelser og vaccinationer
    • Alkohol og cigaretter

=== 10 ligestilling (page 58)
  [6-13]
    Ligebehandling og ligestilling betyder, at alle borgere uanset fx køn, etnisk oprindelse eller religion skal behandles lige. Hvis man bliver forskelsbehandlet, uden der er nogen saglig grund til det, vil der i nogle situationer være tale om ulovlig forskelsbehandling, eksempelvis hvis man fravælges til et bestemt job på grund af sit køn eller religion. Man kan blive straffet for at forskelsbehandle.
  [18-21]
    Dette fakta-ark handler om reglerne for ligebehandling inden for:
    • Arbejdsmarked og uddannelse
    • Det politiske liv
    • Privatlivet

=== 11 grundloven (page 62)
  [6-10]
    Danmark er et demokrati. Det viser sig fx både gennem regler for valg, ved de demokratiske rettigheder og i en demokratisk kultur.
  [12-13]
    Når der er valg, er det borgerne, der vælger politikerne til Folketinget, kommunalbestyrelser, regionsråd og Europa-Parlamentet, og valgene er frie og hemmelige*.
  [19-22]
    Borgerne har også rettigheder, som giver dem frihed til at gøre, hvad de vil, blot de overholder lovene. Myndighederne, som fx politiet eller kommunen, må som udgangspunkt ikke blande sig i, hvad borgerne laver. Borgerne har fx frihed til at danne foreninger og til at have den religion, de vil.
  [24-27]
    Der er desuden mange foreninger i Danmark, der fungerer som et slags minidemokrati, hvor medlemmerne vælger ledelsen – og afsætter den – hvis der opstår uenighed mellem medlemmer og ledelse. Demokratiet er på den måde også med til at præge* samfundet og kulturen mere generelt.
  [29-32]
    Danmarks Riges Grundlov er Danmarks forfatning*. Til daglig kaldes den ofte for grundloven. Grundloven indeholder de vigtigste regler om Danmarks styreform, og grundloven sikrer borgerne en række fundamentale rettigheder. De øvrige love i Danmark må ikke stride mod grundloven.
  [35-38]
    Dette fakta-ark handler om:
    • Grundloven
    • Det danske monarki
    • Statsmagtens tredeling

=== 12 retssamfund (page 68)
  [6-12]
    Man har som borger pligt til at overholde landets love, og nogle love kan man straffes for at overtræde. Politiet undersøger sager, hvor der er mistanke om, at en person har gjort noget strafbart*. Men det er domstolene, der afgør, om en person skal straffes for at have overtrådt lovgivningen.
  [18-20]
    Dette fakta-ark handler om:
    • Politiet
    • Domstole og straf

=== 13 folketing (page 72)
  [6-10]
    Danmarks parlament hedder Folketinget. Folketinget arbejder på Christiansborg i København og udgør sammen med regeringen den lovgivende magt.
  [13-21]
    Dette fakta-ark handler om:
    • Folketinget
    • Regeringen
    • Det repræsentative demokrati

=== 14 selvstyre (page 77)
  [6-12]
    Der er en lang tradition for lokalt selvstyre i Danmark. Det er kommunalbestyrelserne og regionsrådene, der står for det lokale selvstyre. Det er tanken med det lokale selvstyre, at de offentlige opgaver, der har med borgernes dagligdag at gøre, skal løses så tæt på borgerne som muligt.
  [14-22]
    Når en borger skal i kontakt med det offentlige, henvender han eller hun sig ofte til kommunens borgerservice. Her kan man få svar på spørgsmål, hvis man fx skal flytte eller have pension. Og man kan som regel få ordnet praktiske ting, fx hvis man skal have pas eller kørekort.
  [24-27]
    Kommuner og regioner styres af folkevalgte forsamlinger. I kommunerne hedder det kommunalbestyrelser, og i regionerne hedder det regionsråd. Der er valg til kommuner og regionsråd på samme tid. Det foregår hvert fjerde år (2017, 2021, 2025 osv.).
  [30-33]
    Dette fakta-ark handler om:
    • Det lokale selvstyre
    • Kommunerne
    • Regionerne

=== 15 valg (page 82)
  [6-12]
    Frie valg er noget af det vigtigste i et demokrati. Ved at stemme til folketingsvalg har den enkelte borger indflydelse* på, hvem der skal være medlem af Folketinget. Ved kommunal- og regionalvalg har man indflydelse på, hvem der skal være medlem af den lokale kommunalbestyrelse eller det lokale regionsråd.
  [18-20]
    Dette fakta-ark handler om:
    • Valg og partier
    • Politisk aktivitet

=== 16 rettigheder (page 89)
  [6-11]
    Det danske samfund er et demokrati og et velfærdssamfund. Det betyder, at borgerne har en række rettigheder. For det første har borgerne demokratiske rettigheder, som omfatter politiske rettigheder og frihedsrettigheder.
  [13-20]
    For det andet har borgerne i velfærdssamfundet nogle sociale rettigheder, som omfatter retten til en række sociale tilbud og ydelser. Omvendt har borgerne også nogle pligter. Det er bl.a. skattepligt og værnepligt*.
  [23-25]
    Dette fakta-ark handler om:
    • Rettigheder
    • Pligter

=== 17 religion (page 93)
  [6-12]
    I Danmark kan man selv vælge religion, og man har ret til at dyrke sin religion, så længe man respekterer nogle grundlæggende regler. Man kan også frit vælge at skifte religion. Og man kan vælge slet ikke at have en religion. Der er religionsfrihed i Danmark. Den blev stadfæstet med grundloven i 1849.
  [14-21]
    Der findes mange forskellige overbevisninger*. Nogle tror på noget guddommeligt, og andre bygger deres livssyn på andre værdier. Uanset om man er religiøs eller ej, har man som borger i Danmark de samme rettigheder og pligter.
  [24-26]
    Dette kapitel handler om:
    • Den danske folkekirke
    • Andre trossamfund i Danmark

=== 18 omverdenen (page 97)
  [6-14]
    Danmark er medlem af adskillige internationale organisationer. På den måde har Danmark indflydelse på verden uden for Danmark. Samtidig har beslutninger, der tages i de internationale organisationer, indflydelse på rammerne* for det danske samfund. Størst indflydelse har EU – Den Europæiske Union. Men også beslutninger i FN (de Forenede Nationer) har betydning. Desuden samarbejder Danmark med andre lande og selvstyrende områder i Norden.
  [20-24]
    Dette fakta-ark handler om:
    • EU – den Europæiske Union
    • FN – de Forenede Nationer
    • Danmark og Norden
    • Internationalt samarbejde om udvikling

=== 19 geografi (page 105)
  [6-10]
    Danmark ligger i den nordlige del af Europa. Norge ligger nord for Danmark, og Sverige ligger nordøst for Danmark. Syd for Danmark ligger Tyskland og Polen.
  [12-20]
    Færøerne og Grønland er med i det danske rigsfællesskab*. Færøerne og Grønland regulerer* i høj grad deres samfund selv inden for rammerne af den færøske hjemmestyreordning og den grønlandske selvstyreordning. Færøerne og Grønland har deres egne demokratiske forsamlinger*.
  [22-24]
    Samtidig er færinger og grønlændere danske statsborgere og vælger repræsentanter til Folketinget i Danmark. Der vælges to medlemmer på Færøerne og to medlemmer i Grønland.
  [27-29]
    Dette afsnit handler om:
    • Danmarks geografi
    • Danmarks befolkning

=== 20 historie-foer-1945 (page 108)
  [6-10]
    Nutidens Danmark dækker et areal på ca. 43.000 km2 og har et befolkningstal på ca. seks millioner.
  [12-22]
    For 400 år siden var det anderledes. Dengang regerede den danske konge over et rige, der blandt andet omfattede Norge, Island og landområder, der nu hører til Tyskland og Sverige. Befolkningen talte således blandt andet både dansk, norsk, tysk og islandsk. Sammenlignet med tidligere, hvor landet var en stormagt i Norden og området omkring Østersøen, er Danmark i dag en mindre nationalstat.
  [25-26]
    Dette fakta-ark handler om:
    • Vigtige perioder, begivenheder og personer i Danmarks historie før 1945

=== 21 historie-efter-1945 (page 116)
  [7-9]
    Dette fakta-ark handler om:
    • Vigtige perioder, begivenheder og personer i Danmarks historie efter 1945

=== 22 kultur (page 123)
  [6-10]
    Der er en lang tradition for litteratur, teater, billedkunst, musik, arkitektur og film i Danmark.
  [13-14]
    Dette fakta-ark handler om:
    • Vigtige skikkelser fra dansk kultur

=== 23 traditioner (page 128)
  [6-12]
    Som i mange andre lande er der i Danmark en række dage i løbet af året, hvor man markerer fx kirkelige højtider eller historiske begivenheder, der har haft stor betydning for Danmark. Ofte hører der særlige traditioner til de enkelte dage. På mange af disse dage har man normalt fri fra arbejde eller skole.
  [18-19]
    Dette fakta-ark handler om:
    • Traditioner og mærkedage

=== 24 forsvar (page 133)
  [6-12]
    I 1945, lige efter 2. Verdenskrig, blev Danmark medlem af FN*. I 1949, i starten af Den Kolde Krig*, blev Danmark medlem af NATO* sammen med blandt andet USA og en række andre vesteuropæiske lande. Medlemskabet af FN og NATO blev efter 2. verdenskrig grundlaget for Danmarks udenrigs- og sikkerhedspolitik.
  [18-19]
    Dette fakta-ark handler om:
    • Danmarks udenrigspolitik siden 2. Verdenskrig

=== 25 diskrimination (page 139)
  [6-14]
    Danmark er bygget på idealer om blandt andet frihed og demokrati. Disse er fastlagt i Danmarks grundlov. Grundloven bestemmer for eksempel, at man kan sige eller skrive, hvad man vil (ytringsfrihed). Grundloven bestemmer også, at man kan vælge den religion, man ønsker (religionsfrihed). Grundloven giver også ret til at danne foreninger og være medlem af foreninger (foreningsfrihed) og til at forsamle sig for eksempel til demonstrationer (forsamlingsfrihed).
  [20-26]
    Den enkeltes frihed er altså en grundlæggende værdi i Danmark. Men for at sikre, at friheden ikke bruges til at skade andre, har staten også ret til at begrænse friheden. Man taler om, at ”frihed skal bruges under ansvar”. Derfor er det ulovligt at misbruge friheden for eksempel til at diskriminere andre. Der er tale om diskrimination, hvis man gør forskel på mennesker, behandler dem dårligere, på grund af deres religion, politiske holdning, hudfarve, køn, etnicitet, seksuelle orientering, alder mv.
  [29-33]
    Dette fakta-ark handler om:
    • Diskrimination
    • Antisemitisme
    • Hadforbrydelser
    • Ekstremisme

=== 26 klima (page 143)
  [6-20]
    Et stort energiforbrug – ved afbrænding af kul, olie og gas (fossile brændsler) – inden for blandt andet produktion og transport har været afgørende for at skabe den store økonomiske vækst de seneste 150 år. Men det har også ført til en stor udledning af CO2 og andre drivhusgasser i atmosfæren. Man taler om drivhusgasser og ’drivhuseffekten’, fordi disse gasser – ligesom et drivhus – på den ene side lukker solens stråler ind, men på den anden side begrænser varmen i at slippe ud igen. Kommer der flere drivhusgasser i atmosfæren, bliver mindre varme lukket ud af atmosfæren igen. Det påvirker klimaet og får temperaturen til at stige, så der sker en global opvarmning. På grund af den globale opvarmning kan der komme flere områder dækket af ørken, flere oversvømmelser og mere ekstrem varme. Det kan betyde, at mennesker får sværere ved at leve i store dele af verden.
  [23-25]
    Dette fakta-ark handler om:
    • Global opvarmning
    • Den danske indsats for grøn omstilling

wrote intros to data/topics.json (English kept where the Danish is unchanged)


### Dropped intro pointers (IMPLEMENTATION_PLAN.md 2.5)
Old hand-written intros (`book-expansion/old_topics.json`), checked against every cluster's `fact_da` and `trap_note_da` and `current_note_da`. Nearly every exam pointer is already in a cluster. Two are not:
1. **verden**: "Danmark kom med i EF (i dag EU) i 1973." Not in any cluster. Nothing else mentions 1973 or EF.
2. **geografi**: "Danmark består af Jylland og mange øer." Background, not an exam point. Not in any cluster.

Everything else checked was covered, for example: "Retten til våben, arbejde, ferie eller at stifte familie står IKKE i grundloven" (`dem-rettigheder`), "Kommunerne står for daginstitutionerne" (`dem-kommunerne-boern`), "prøvens svar: 5-6 år" (`udd-skolestart`), "landsret / Højesteret" (`dem-anke`), "Island, Norge og Åland er ikke med" (`kon-rigsfaellesskab`), and "17-årige må køre alene kl. 5-20" (`vel-koerekort-17`).
Not added anywhere, as the plan asks. The user decides.

### Known limitation (not changed)
- `build_data.py` `excerpt()` still starts a new paragraph (a `\n` in the popover quote) on some blank lines before a capital letter. Examples: "På den måde har\nDanmark" (sheet 18) and "og\nSverige" (sheet 19). Headings are also separated by `\n`, which is the intended behaviour. Fixing the mid-sentence splits would change many popover keys, so I left it as it is. The words are right, and the English keeps the same break.

## Phase 3: colours, short names, illustrations
- `css/style.css`: the 21 new `--t-<sheet>` tokens are aliases of the 10 old ones, as in the plan. The five that already existed (`uddannelse`, `velfaerd`, `geografi`, `kultur`, `traditioner`) are unchanged. The dark theme does not redefine `--t-*`, so the aliases follow automatically.
- `js/ui.js` `SHORT`: the 26 short names from the plan. None needed shortening yet. Stamp and chip fit are checked in Phase 6.
- `js/icons.js` `ART`: the 10 drawings re-keyed (`demokrati→valg`, `kongehus→grundloven`, `historie→historie-foer-1945`, `geografi→geografi`, `arbejde→erhvervsliv`, `velfaerd→sundhed`, `uddannelse→uddannelse`, `kultur→kultur`, `traditioner→traditioner`, `verden→omverdenen`). Their markup is unchanged.
- 16 new drawings: skole, dagtilbud, arbejdsmarked, velfaerd, familieliv, foreningsliv, ligestilling, retssamfund, folketing, selvstyre, rettigheder, religion, historie-efter-1945, forsvar, diskrimination, klima. All are stroke-only with at most one `var(--fill)` area, at the plan's viewBox.
- Deviations from the plan's motifs:
  - **diskrimination**: the plan asked for a raised hand in front of a circle with a diagonal. At 16 px the hand is illegible, so the drawing is the circle with a diagonal (a "not allowed" sign) only. Open point for the user.
  - **arbejdsmarked** (handshake): a simplified clasp between two cuffs. It reads at 64 px; at 16 px it is only a faint shape.
- `MBP.ART` is now exported for `tools/art-preview.html`, which is not linked from the site. It shows every key at 16, 32 and 64 px on light and dark. I checked it in the browser: all 26 read at 64 px, and the 16 px versions are as expected for the plan's rule.

## Phase 4: shared clusters and deep links
- `js/ui.js` `alsoIn(cluster, currentId, linked, hrefPrefix)` (exported): "Også i Fakta-ark N: title" (Danish, sheet names linked when `linked`), English "Also in fact sheet N: title" in the `.en` span. Returns null for single-sheet clusters.
- Læs (`js/study.js`): each fact row has `id="<sheet>--<cluster>"` and `tabindex="-1"`, and shows `alsoIn` (linked) under the fact. `#<sheet>/<cluster>` is routed in `selection()`; `show()` calls `focusFact()`, which switches "Vis kun ofte stillede" off with the toast when the fact is hidden, scrolls the row to the centre, moves focus to it and flashes it (`animationend` or a 1.8 s timer removes the class).
- Lær (`js/ui.js` `questionCard`, `js/learn.js` lesson cards): the note sits under the topic chip as plain text. On the Test review screen the sheet names link. In the "Det skal du se på igen" list the note links. The "finished" stamps loop now covers every sheet in `topic_ids`.
- Test (`js/quiz.js` `eligible()`): a question is eligible if any of its sheets is ticked, so it is never drawn twice.
- Totals: `grep -n "D.topics\|question_count\|cluster_ids.length" js/*.js` shows per-sheet uses only (stamps, list counts, the sheet's own header). Home totals use `D.clusters`. Nothing sums per-sheet numbers into an overall total.
- CSS: `.also-in`, `.fact-row { scroll-margin-top: 88px }` (to be checked on the phone chip bar in Phase 6), `.fact-row.flash` with a reduced-motion variant.

## Phase 5: pages and wording for 26 sheets
- Copy changed as in the plan table (Læs intro line, aria labels, title headers "Fakta-ark N · …", "Øv dette fakta-ark", Lær back/test/empty/picker lines, Hjem "Vælg et fakta-ark", Test "0 spørgsmål – vælg mindst ét fakta-ark" and the legend "Fakta-ark"). "N emner" counts were kept where they count clusters (Læs side counts and topic heads, Hjem "Dagens kurs er 10 emner", Lær "10 emner fra alle fakta-ark").
- Stamps show "Fakta-ark N" above the name (not on the mini stamps). Check fit at 375 px in Phase 6.
- Læs sidebar: the active row is kept in view by setting `side.scrollTop` only (`setActive` in `js/study.js`).
- Chip bar, Test grid, Lær album: the layout is checked in the browser in Phase 6.

## Phase 6: browser checks (done in the built-in preview on http://localhost:8000, then stopped)
Checked at 375 px (phone) and 1280 px (desktop), light and dark. Console errors: none on study, top15, exams, learn.
- **Læs**: all 26 sheets open from the chip bar at 375 px. Each header reads "Fakta-ark N · title", and each has its illustration. No sideways scroll.
- **Deep link** `#velfaerd/vel-laege` (fresh load, 375 px): the fact is centred (top 334 of 812), not under the chip bar (bottom 64). It has focus and the flash class.
- **"Også i" link** on `vel-laege` in sheet 6 opens `#sundhed/vel-laege`, which is centred and focused. Back returns to `#velfaerd/vel-laege`.
- **Frequent-only filter on**: following a link to a non-frequent shared fact (`ver-nato-1949`, sheet 24) switches the filter off, shows the toast "Viser alle spørgsmål / Showing all questions", and shows the fact.
- **Three-sheet cluster** `dem-1849-ikke-kvinder`: seen from sheet 10 (`#ligestilling/…`), it shows two "Også i" links, to `#historie-foer-1945/…` and `#grundloven/…`. Both are the right sheets.
- **Test**: `?topics=ligestilling,grundloven` shows 2 sheets ticked and "74 spørgsmål tilgængelige". That is the expected union of the two sheets' questions (computed from the data). The sheet grid is 3 columns at 375 px with no overflow. Before the fix it had 5 columns and the "Diskrimination" label overflowed; the fix is `repeat(auto-fill, minmax(84px,1fr))` plus `overflow-wrap:anywhere`.
- **Lær picker**: 26 stamps, 2 columns at 375 px, each with "Fakta-ark N". No overflow.
- **Desktop (1280 px)**: the sidebar shows 26 rows in a scrollable panel (max-height 700 px). The active row stays visible inside the sidebar (`scrollTop` only; the page does not move).
- **Light and dark**: both checked (dark by the system setting, light by emulation) on Læs. Colours follow the aliases.
- **Intro boxes**: the contents box's bullets keep their line breaks (a `br` per line in `introBi()`, `js/study.js`). Before this fix they were run together on one line.

Not run in this session (say so; the reasons are in the notes):
- Full 25-question quiz with both sheets of one shared cluster ticked (the no-duplicate check): `eligible()` filters each question once, and the count check above matches, but I did not run the quiz itself.
- A browser profile with old progress on `main`: the progress keys are per cluster (unchanged), and the old topic keys are ignored by the code. I did not run this in a separate profile.
- Lær lesson with a shared cluster: the lesson I opened (`?topic=arbejdsmarked`) had no shared cluster, so the "Også i" line in a lesson card was not seen on screen.

Deviations found in Phase 6:
- The plan says "I dag: the album shows 26 stamps". There is no album on `index.html` (I dag) in this codebase. Only the Lær picker has the album. Nothing was added there.
- The scroll margin is 88 px for `.fact-row`. Measured: the chip bar bottom is 64 px. The fact lands centred, so the margin is not what is doing the work; it's kept as a safety margin.

## Phase 7: report

### Per-sheet cluster counts (own = main sheet, shared = also listed in this sheet)
Output of `node tools/check_sheets.js`. Totals: 168 clusters, 210 placements, 41 clusters in two or more sheets.
       1 skole  own/shared 7/1  questions 25
       2 uddannelse  own/shared 3/0  questions 7
       3 dagtilbud  own/shared 3/0  questions 6
       4 arbejdsmarked  own/shared 11/1  questions 47
       5 erhvervsliv  own/shared 5/0  questions 20
       6 velfaerd  own/shared 3/2  questions 12
       7 familieliv  own/shared 9/3  questions 30
       8 foreningsliv  own/shared 3/0  questions 13
       9 sundhed  own/shared 4/3  questions 18
      10 ligestilling  own/shared 4/2  questions 22
      11 grundloven  own/shared 14/5  questions 58
      12 retssamfund  own/shared 4/1  questions 19
      13 folketing  own/shared 3/2  questions 16
      14 selvstyre  own/shared 8/0  questions 29
      15 valg  own/shared 12/5  questions 56
      16 rettigheder  own/shared 3/1  questions 15
      17 religion  own/shared 3/1  questions 14
      18 omverdenen  own/shared 5/5  questions 27
      19 geografi  own/shared 14/2  questions 48
      20 historie-foer-1945  own/shared 12/4  questions 46
      21 historie-efter-1945  own/shared 11/1  questions 18
      22 kultur  own/shared 12/0  questions 30
      23 traditioner  own/shared 7/0  questions 24
      24 forsvar  own/shared 5/3  questions 19
      25 diskrimination  own/shared 1/0  questions 2
      26 klima  own/shared 2/0  questions 4
    ALL OK

### Changed line ranges (Phase 2 table)
See "Line ranges: changes from the plan table" in the Phase 2 section above: sheet 4 (box is 13 bullets, lines 7–25, opening text 28–59), sheet 19 (it does have a box, "Dette afsnit", lines 27–29), sheet 21 (heading line 7, bullets 8–9), sheet 6 (body bullets kept in the paragraph), sheets 5, 23 and 24 (opening ranges).

### Dropped intro pointers (Phase 2.5)
1. verden: "Danmark kom med i EF (i dag EU) i 1973." (not in any cluster)
2. geografi: "Danmark består af Jylland og mange øer." (background, not an exam point)
Everything else in the old intros was already covered by a cluster's fact or trap note. Nothing was added anywhere.

### Totals checked (Phase 4.4)
- Home totals: `js/home.js` uses `D.clusters` and `D.questions`.
- Per-sheet sums: only per-sheet uses (side counts, sheet heads, the Test stamp grid, the Lær album). No overall total is built from sheet counts.
- Test: `?topics=ligestilling,grundloven` gives 74 questions, which is the expected union computed from the data.
- `grep -n "D.topics\|question_count\|cluster_ids.length" js/*.js` was reviewed; nothing sums across sheets.

### Things that differ from the plan, and why
1. **Sheet 19 has a box.** The plan says it has none; the page has "Dette afsnit handler om:" (lines 27–29). It is handled like the other sheets.
2. **Sheet 4 box is 13 bullets** split by a margin label, and its opening text runs to the page end (the next heading is at the top of page 23).
3. **Sheet 21 heading is line 7** (plan: 6); the bullet wraps over lines 8–9.
4. **`fg-kendte`** is overridden to `kultur` by hand, as planned. The other fact groups use the rule as written. Fact groups now appear in more sheets than the plan expected: `fg-aarstal` in 6, `fg-tal` in 5, `fg-ja-nej` in 5 (see open points).
5. **`tools/build_data.py` `excerpt()`** now also drops margin labels beside body lines (`SECOND_COL`, the same rule as `bookclean.py`). This changed 12 popover quotes, which were retranslated. Not in the plan, but needed: the quotes had words like `SKOLE` and `KLIMA` in them.
6. **`tools/check_book_more.js` rule 2** compares the multiset of items with `01-content-plan.json` (as the plan says). The content-plan file is unchanged.
7. **`tools/check_sheets.js` rule 8** (intros) is skipped while the intros are empty (Phase 1 only) and is on from Phase 2.
8. **`js/study.js` `introBi()`**: intro paragraphs keep their line breaks (the box bullets). Not in the plan: without it the bullets ran together.
9. **The home page (I dag) has no album.** The plan's Phase 5 said "the album shows 26 stamps". Only the Lær picker has the album, and it shows 26.
10. **Phase 6 is partly done** (see its section). The full quiz run with a shared cluster, and the old-progress profile test, were not run.
11. **`Sheet 25 illustration`**: the plan asks for a hand in front of a circle. Drawn as the circle with a diagonal only (see open points).

### Open points for the user
1. **Illustrations**: the 16 new ones are first drafts. Two are weak: `diskrimination` (no hand, see above) and `arbejdsmarked` (handshake; clear at 64 px, a faint shape at 16 px). `tools/art-preview.html` shows them all.
2. **Fact-group placement**: with the rule as written, `fg-aarstal` appears in 6 sheets, `fg-tal` in 5 and `fg-ja-nej` in 5. Decide whether to keep the ≥5-line rule or pick a main sheet by hand.
3. **English intros** are my translation (Haiku), not reviewed by a person. They are in `data/topics.json` (`intro[].en`) and follow the rules in `check_sheets.js`.
4. **Two dropped pointers** (EF 1973; "Danmark består af Jylland og mange øer"): add them somewhere, or leave them out.
5. **Popover paragraph breaks**: some quotes still break mid-sentence on a `\n` where a capital letter starts a line after a blank line (for example "På den måde har / Danmark", sheet 18). Changing this would change about 20 popover keys; left as it is.
6. **Progress**: topic-level progress (`studied`, `seenMastered`) resets, as agreed. Cluster progress carries over.
7. **Phase 6 gaps**: a full quiz with a shared cluster ticked in both sheets, and an old-progress browser profile, were not run in the browser.

### Summary of commits (branch `reorg-fact-sheets`, not pushed, not merged)
- eb5a5fd Re-key data to the book's 26 fact sheets
- d6a3c7f Sheet intros from the book, with English
- ccd4534 Sheet colours, short names and illustrations
- bfb1333 Shared clusters: show in every sheet, with deep links
- d722f34 Pages and wording for 26 fact sheets
- a55eff8 Verify and fix the fact-sheet reorganisation
