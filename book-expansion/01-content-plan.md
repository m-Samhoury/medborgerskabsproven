# Mere fra bogen – indholdsplan (trin 1 af 3)

Kilde: *Læremateriale til medborgerskabsprøven*, august 2026 (`bookdump/`, uændret). Sidetal = PDF-side = trykt side. Linjer = fysiske linjer i `bookdump/pages/page-NNN.txt` (samme konvention som de eksisterende `book`-referencer).

Denne fil er en **indholdsplan**. Den beslutter, *hvilke* ekstra bogafsnit der skal vises, og *hvor*. Den maskinlæsbare version er `01-content-plan.json`. Alle uddrag er bevist ordrette med `check_excerpts.py` (resultat: `check-result.txt`).

## 0. Tal

- **372 uddrag** fordelt på **193 mål**: 298 på clusters, 26 på faktagrupper, 48 på emne-niveau («Mere fra bogen» nederst på emnet).
- Clusters med mindst ét uddrag: 168 af 168.
- **Spørgsmål med udvidelse efter svar** (via `cluster_id`): 500 af 500. Se afsnit 5.2.
- Faktagrupper med uddrag: 15 af 15. Emner med emne-niveau-uddrag: 10 af 10.
- Længde: alle uddrag er højst 150 ord (de fleste 20–80).

| Emne | på clusters | på grupper | emne-niveau | i alt |
|---|---:|---:|---:|---:|
| Demokrati, grundlov og retsstat (`demokrati`) | 69 | 7 | 6 | 82 |
| Kongehus og rigsfællesskab (`kongehus`) | 13 | 0 | 1 | 14 |
| Historie (`historie`) | 36 | 3 | 8 | 47 |
| Geografi og befolkning (`geografi`) | 27 | 3 | 2 | 32 |
| Arbejdsmarked og erhverv (`arbejde`) | 35 | 3 | 4 | 42 |
| Velfærd, sundhed og familie (`velfaerd`) | 29 | 3 | 8 | 40 |
| Uddannelse og børn (`uddannelse`) | 25 | 1 | 4 | 30 |
| Kultur og kendte danskere (`kultur`) | 19 | 2 | 3 | 24 |
| Højtider, traditioner og religion (`traditioner`) | 14 | 2 | 5 | 21 |
| Danmark i verden og forsvar (`verden`) | 31 | 2 | 7 | 40 |
| **I alt** | 298 | 26 | 48 | **372** |

En faktagruppe tælles under sit første emne (`topic_ids[0]`).

## 1. Bogens opbygning og koblingen til sitets 10 emner

Bogen har en indledning (s. 3–4), **26 fakta-ark** og en **ordliste** (s. 147–155). Hvert fakta-ark har en titelside, en kort indledning, en punktliste «Dette fakta-ark handler om» og derefter afsnit med VERSALER-overskrifter. Ord med `*` er forklaret i ordlisten. Margenen har «FAKTA-ARK n:» og arkets titel, og der er fotos med billedtekster.

| Fakta-ark | Sider | Sitets emne(r) |
|---|---|---|
| 1 Skole | 5–10 | uddannelse |
| 2 Uddannelse | 11–16 | uddannelse |
| 3 Dagtilbud | 17–20 | uddannelse |
| 4 Det danske arbejdsmarked | 21–29 | arbejde |
| 5 Dansk erhvervsliv | 30–33 | arbejde (samhandel → verden) |
| 6 Det danske velfærdssamfund | 34–39 | velfaerd (skat/moms → demokrati) |
| 7 Familieliv | 40–45 | velfaerd (aldersgrænser også uddannelse) |
| 8 Forenings- og fritidsliv | 46–51 | demokrati (foreninger), velfaerd (biblioteker), kultur (Grundtvig) |
| 9 Sundhed og sygdom | 52–56 | velfaerd |
| 10 Ligestilling | 57–60 | arbejde (ligeløn), demokrati (stemmeret), historie (første kvindelige SM) |
| 11 Demokrati og grundloven | 61–66 | demokrati, kongehus (monarkiet) |
| 12 Det danske retssamfund | 67–70 | demokrati |
| 13 Folketing og regering | 71–75 | demokrati |
| 14 Det lokale selvstyre | 76–80 | demokrati (også uddannelse/velfaerd via ansvar) |
| 15 Folkestyret i praksis – valg og partier | 81–87 | demokrati, verden (EP-valg) |
| 16 Borgernes rettigheder og pligter | 88–91 | demokrati, verden (værnepligt) |
| 17 Religion og kirke | 92–95 | traditioner, historie (reformationen) |
| 18 Danmark og omverdenen | 96–103 | verden |
| 19 Danmarks geografi og befolkning | 104–106 | geografi, kongehus (rigsfællesskab) |
| 20 Danmarks historie før 1945 | 107–114 | historie |
| 21 Danmarks historie efter 1945 | 115–121 | historie, verden (NATO), velfaerd (levetid) |
| 22 Dansk kultur | 122–126 | kultur |
| 23 Traditioner og mærkedage | 127–131 | traditioner, kongehus (nytårstale) |
| 24 Danmarks forsvars- og sikkerhedspolitik | 132–137 | verden, kongehus (Thule/Grønland) |
| 25 Diskrimination, antisemitisme, hadforbrydelser og ekstremisme | 138–141 | historie (terror 2015), demokrati (emne-niveau) |
| 26 Klima | 142–146 | arbejde (vindenergi), geografi (landbrug), verden (emne-niveau) |
| Ordliste | 147–155 | korte ordforklaringer som ekstra uddrag (fx «anke», «forfatning», «besættelse») |

Omvendt: **demokrati** = ark 11–16 (+25); **kongehus** = ark 11 (monarki), 19 (rigsfællesskab), 23 (nytår), 24 (Grønland); **historie** = ark 20–21 (+10, 17, 25); **geografi** = ark 19 (+26); **arbejde** = ark 4–5 (+10, 26); **velfaerd** = ark 6–9 (+10, 21); **uddannelse** = ark 1–3 (+7); **kultur** = ark 22 (+8); **traditioner** = ark 17, 23; **verden** = ark 18, 24 (+5, 15, 16, 21, 26).

## 2. Udvidelser pr. emne, cluster og faktagruppe

Princip: et uddrag skal give **noget nyt** i forhold til «Læs mere i bogen»-uddraget, som faktaet allerede viser (kontekst, årsag/følge, nabofakta, en typisk distraktor eller den aktuelle 2026-status). Intet uddrag ligger inden i faktaets egen «læs mere»-reference (tjekket af scriptet). Samme uddrag må gå igen på flere clusters, når de handler om det samme (fx de tre besættelses-clusters).

Formatet nedenfor: **Overskrift (title_da)** — side, linjer (antal ord). *Hvorfor* (til planlæggeren, vises ikke). Derefter uddraget ordret.

### 1. Demokrati, grundlov og retsstat (`demokrati`)

#### `dem-rettigheder` – Grundloven sikrer blandt andet forsamlingsfrihed, ytringsfrihed og religionsfrihed.
Stillet 9×. Viser allerede (læs mere): s. 63 l. 24-56, s. 89 l. 39-49.

- **Boligens ukrænkelighed** — s. 64, l. 13-20 (27 ord). *Hvorfor:* A fourth constitutional right next to the three the exam asks about; good distractor knowledge.
  > Grundloven beskytter også boligens ukrænkelighed. Det betyder bl.a., at politiet som udgangspunkt ikke må gå ind i folks hjem, uden at det er godkendt af en dommer.
- **Religionsfrihed og folkekirkens særstilling** — s. 64, l. 27-33 (79 ord). *Hvorfor:* Explains what religious freedom means and why the folkekirke still has a special position.
  > Grundloven sikrer også religionsfriheden. Religionsfriheden betyder, at man selv kan vælge religion, og at man har ret til at dyrke sin religion, så længe man respekterer nogle grundlæggende regler. Det fremgår dog også af grundloven, at den danske folkekirke har en særstilling*, og at den understøttes* af staten. Det betyder dog ikke, at staten ikke må understøtte andre religioner, hvis man ønsker det, fx ved at stille en grund til rådighed* for en kirke, et tempel eller en moske.
- **Frihed under ansvar** — s. 139, l. 20-26 (80 ord). *Hvorfor:* The limit on the freedoms: they may not be used to discriminate (links to fakta-ark 25).
  > Den enkeltes frihed er altså en grundlæggende værdi i Danmark. Men for at sikre, at friheden ikke bruges til at skade andre, har staten også ret til at begrænse friheden. Man taler om, at ”frihed skal bruges under ansvar”. Derfor er det ulovligt at misbruge friheden for eksempel til at diskriminere andre. Der er tale om diskrimination, hvis man gør forskel på mennesker, behandler dem dårligere, på grund af deres religion, politiske holdning, hudfarve, køn, etnicitet, seksuelle orientering, alder mv.

#### `dem-kommunerne-boern` – Kommunerne har ansvaret for vuggestuer, børnehaver og folkeskoler.
Stillet 8×. Viser allerede (læs mere): s. 77 l. 45-57.

- **Kommunernes andre opgaver** — s. 77, l. 57-67 (75 ord). *Hvorfor:* Shows the full list of municipal tasks, so the learner can tell kommune from region/stat.
  > Kommunerne har også vigtige opgaver i forbindelse med fx beskæftigelse, integration, veje, afhentning af affald, miljø samt fritids- og kulturtilbud. Desuden har kommunerne ansvaret for en række sociale ydelser og tilbud som fx hjælp til ældre borgere, der har svært ved at klare sig selv, samt hjælp til mennesker med handicap eller visse former for psykisk sygdom. Hos kommunens borgerservice kan man få at vide, hvor man skal henvende sig i forbindelse med forskellige spørgsmål.
- **Ret til en plads i dagtilbud** — s. 18, l. 19-24 (77 ord). *Hvorfor:* Same responsibility seen from the childcare chapter: kommunen is responsible, parents pay part.
  > Alle børn har ret til en plads i et dagtilbud. Det er kommunerne, der er ansvarlige for dagtilbuddene, men det er forskelligt fra kommune til kommune, hvilke tilbud der er. De mest almindelige er vuggestue, børnehave og dagpleje. Kommunen betaler en del af udgiften, mens forældrene betaler den resterende del. Men hvis fx forældrenes indtægt er lav, eller der er tale om en enlig forsørger, er der mulighed for at søge om yderligere økonomisk tilskud fra kommunen.
- **Kommunalbestyrelsen bestemmer** — s. 79, l. 43-46 (34 ord). *Hvorfor:* Who decides how many nurseries and schools there are.
  > Den enkelte kommunalbestyrelse beslutter herefter, hvor mange penge der skal bruges til de velfærdsydelser, som kommunalbestyrelsen har ansvaret for. Fx kan kommunalbestyrelsen bestemme, hvor mange vuggestuer, børnehaver og folkeskoler der skal være i kommunen.

#### `dem-2-og-2` – Færøerne vælger 2 medlemmer og Grønland vælger 2 medlemmer til Folketinget.
Stillet 7×. Viser allerede (læs mere): s. 72 l. 29-32, s. 83 l. 12-14.

- **Hjemmestyre og selvstyre** — s. 105, l. 12-24 (54 ord). *Hvorfor:* Why the Faroes and Greenland elect members at all: they are in the rigsfællesskab and their people are Danish citizens.
  > Færøerne og Grønland regulerer* i høj grad deres samfund selv inden for rammerne af den færøske hjemmestyreordning og den grønlandske selvstyreordning. Færøerne og Grønland har deres egne demokratiske forsamlinger*. Samtidig er færinger og grønlændere danske statsborgere og vælger repræsentanter til Folketinget i Danmark. Der vælges to medlemmer på Færøerne og to medlemmer i Grønland.
- **Partierne fra Færøerne og Grønland** — s. 85, l. 42-53 (29 ord). *Hvorfor:* Names the four parties the 2+2 members came from in 2026.
  > Samt to medlemmer valgt på Færøerne fra hvert sit parti: • Sambandsflokkurin • Javnaðarflokkurin Og to medlemmer valgt i Grønland fra hvert sit parti: • Inuit Ataqatigiit • Nalaraq

#### `dem-forening` – Alle må danne en forening – også hvis man ikke er dansk statsborger. Foreningsfrihed står i grundloven.
Stillet 6×. Viser allerede (læs mere): s. 47 l. 33-37.

- **Foreningsfriheden** — s. 63, l. 53-56 (45 ord). *Hvorfor:* The constitutional wording behind the fact: no permission is needed.
  > Foreningsfriheden sikrer retten til at danne foreninger med lovligt formål. Det kan fx være foreninger med idrætslige, politiske, kulturelle eller sociale formål. Der skal ikke indhentes tilladelse fra myndighederne til at oprette en forening. Foreningsfriheden er en væsentlig del af demokratiet i det danske samfund.
- **Foreninger med voldeligt formål** — s. 64, l. 6-11 (31 ord). *Hvorfor:* The one limit on freedom of association - a likely trap.
  > Foreningsfriheden er dog begrænset. Grundloven siger, at foreninger, der har et voldeligt* formål, kan opløses. Det er domstolene, der afgør, om en forening skal opløses, fordi foreningen har et voldeligt formål.
- **Frihed til at melde sig ind i et parti** — s. 86, l. 17-23 (32 ord). *Hvorfor:* Applies the same freedom to political parties and gives the party-membership figure.
  > Foreningsfriheden betyder, at ingen myndighed kan blande sig i, at man melder sig ind i et parti, eller hvilket parti man er medlem af. Ca. 106.000 er medlem af et politisk parti.

#### `dem-179` – Folketinget har 179 medlemmer.
Stillet 5×. Viser allerede (læs mere): s. 72 l. 29, s. 83 l. 12-14.

- **Folketingets opgaver** — s. 72, l. 39-45 (57 ord). *Hvorfor:* What the 179 members actually do: laws, choosing the government, controlling ministers.
  > I Folketinget diskuteres og vedtages de forslag, som bliver til landets love. Folketinget har også andre opgaver end lovgivning. Det er Folketinget, der bestemmer, hvem der skal danne regering efter et valg. Desuden er det en vigtig opgave for Folketinget at kontrollere regeringen. Folketingsmedlemmer kan fx kræve, at en minister svarer på spørgsmål om en bestemt sag.
- **Folketingets udvalg** — s. 73, l. 40-48 (81 ord). *Hvorfor:* Committees and the three readings of every bill.
  > Medlemmerne af Folketinget mødes ikke kun i folketingssalen. De er også medlemmer af Folketingets faste udvalg, der i opdeling nogenlunde svarer til de forskellige ministerier. Der er fx udvalg, der arbejder med beskæftigelse, forsvar og fødevarer. I udvalgene behandles de fremsatte lovforslag, og udvalgene stiller ofte en lang række spørgsmål til den pågældende minister. Der skal være tre behandlinger af alle lovforslag i Folketinget, før det kan vedtages, og forslagene diskuteres og gennemarbejdes i udvalgene mellem de tre behandlinger i Folketinget.

#### `dem-grundlov-1953` – Grundloven blev sidst ændret i 1953.
Stillet 5×. Viser allerede (læs mere): s. 62 l. 45-47.

- **Valgretsalderen er sat ned** — s. 63, l. 19-23 (69 ord). *Hvorfor:* How democracy was strengthened between 1849 and today (1915, voting age 30 -> 18).
  > Siden grundloven blev vedtaget i 1849, er demokratiet på flere punkter blevet styrket. Fx fik kvinderne stemmeret til Folketinget med ændringen af grundloven i 1915. Valgretsalderen er også blevet sat ned flere gange. I 1849 skulle mændene være 30 år for at stemme til Folketinget, mens man kun skulle være 25 år for at blive valgt. I dag skal man være 18 år for at stemme og blive valgt.
- **16 folkeafstemninger siden 1953** — s. 75, l. 50-55 (70 ord). *Hvorfor:* Connects 1953 to referendums; a frequent number in the exam.
  > Danmark er et repræsentativt demokrati. Det betyder, at folket vælger de politikere, de er mest enige med, til Folketinget. Det er altså politikerne, der som folkets repræsentanter tager sig af lovgivningen. Det er sjældent, at et lovforslag lægges ud til folkeafstemning. Faktisk har der kun været afholdt 16 folkeafstemninger, siden den nuværende grundlov blev vedtaget i 1953. Over halvdelen (ni ud af 16) har handlet om Danmarks forhold til EU.

#### `dem-kommuner-98` – Der er 98 kommuner i Danmark.
Stillet 5×. Viser allerede (læs mere): s. 77 l. 40, s. 83 l. 37.

- **Kommunalbestyrelsens størrelse** — s. 79, l. 25-30 (58 ord). *Hvorfor:* Size of the municipal councils (19-31, Copenhagen up to 55).
  > Kommunalbestyrelsen bestemmer selv inden for nogle bestemte rammer, hvor mange medlemmer der skal være i kommunalbestyrelsen. Der er mellem 19 og 31 medlemmer af kommunalbestyrelsen afhængigt af, hvad kommunalbestyrelsen har besluttet. I de mindste kommuner er der dog ned til ni medlemmer og i København op til 55 medlemmer. Det skal være et ulige antal medlemmer af kommunalbestyrelsen.
- **Kommunerne udskriver skat** — s. 79, l. 48-51 (45 ord). *Hvorfor:* Municipalities can levy taxes; regions cannot (see dem-borgmester).
  > Kommunerne har ret til at udskrive* skatter. Dermed er de selv med til at skaffe en del af pengene til at løse deres opgaver. Staten giver også penge til kommunerne efter nogle særlige regler. De 98 kommuner har en interesseorganisation, der hedder Kommunernes Landsforening (KL).

#### `dem-statsborger-stemme` – Man skal være dansk statsborger for at stemme til folketingsvalg.
Stillet 5×. Viser allerede (læs mere): s. 82 l. 61-66, s. 83 l. 29-33.

- **Valgbar** — s. 83, l. 6-10 (19 ord). *Hvorfor:* The same conditions make you eligible to stand for the Folketing.
  > Hvis man opfylder betingelserne* for at have stemmeret, er man normalt også valgbar, dvs., man kan vælges til Folketinget.
- **Valg til Europa-Parlamentet** — s. 83, l. 57-62 (44 ord). *Hvorfor:* Contrast: for the EP you need EU citizenship, not Danish.
  > Man har valgret til Europa-Parlamentsvalget i Danmark, hvis man er statsborger i et EU-land og er fyldt 18 år. Man kan som EU-borger stemme i det EU-land, hvor man bor, eller i det EU-land, hvor man er statsborger. Danmark vælger 15 medlemmer til Europa-Parlamentet.

#### `dem-anke` – En dom fra byretten kan ankes til landsretten.
Stillet 5×. Viser allerede (læs mere): s. 69 l. 29-40.

- **Offentlig adgang til retssalen** — s. 69, l. 42-46 (59 ord). *Hvorfor:* Other court rules that the exam can ask about.
  > Der er normalt offentlig adgang til retssalen, når en sag behandles. Dog kan visse sager behandles bag lukkede døre. Dommeren kan også bestemme, at en person ikke må få adgang til retslokalet, fx hvis personen er beruset*. Dommeren kan også nægte en person adgang til retssalen, hvis det er nødvendigt for at få en sand forklaring af et vidne.
- **Ordet 'anke'** — s. 148, l. 29 (5 ord). *Hvorfor:* Glossary line: anke = klage over.
  > • anke – klage over.

#### `dem-betinget` – En betinget dom betyder, at man ikke skal i fængsel, hvis man overholder betingelserne (fx ikke begår ny kriminalitet).
Stillet 5×. Viser allerede (læs mere): s. 70 l. 10-18.

- **Ingen dødsstraf** — s. 70, l. 9-10 (22 ord). *Hvorfor:* The ordinary punishments and the absence of the death penalty.
  > De almindelige straffe i Danmark er bøde eller fængsel. Den hårdeste straf er fængsel på livstid. Der er ikke dødsstraf i Danmark.
- **Betingelser og samfundstjeneste** — s. 70, l. 18-24 (58 ord). *Hvorfor:* What the conditions can be and who usually gets a suspended sentence.
  > Disse betingelser fastsættes af domstolene. En af betingelserne er, at den dømte i en periode, eksempelvis et eller to år, ikke begår ny kriminalitet. En anden betingelse kan være, at den dømte skal udføre samfundstjeneste uden at få løn for det. Betinget fængselsstraf bruges ofte for personer, der ikke før har været straffet, og for mindre alvorlige forbrydelser.

#### `dem-folketingsvalg` – Der skal være folketingsvalg mindst hvert 4. år.
Stillet 5×. Viser allerede (læs mere): s. 82 l. 59-61.

- **Valgkortet** — s. 84, l. 9-20 (80 ord). *Hvorfor:* How an election works in practice (polling card, ID if you forget it).
  > Nogle dage inden valget får man et valgkort med posten. Valgkortet er et bevis på, at man har ret til at stemme. På valgkortet står der oplysninger om, hvor og hvornår man skal stemme. Valgstedet kan fx være en lokal skole eller et rådhus. Hvis man har ret til at stemme og ikke har fået et valgkort, kan man kontakte kommunen. Man kan dog godt stemme, hvis man ikke har sit valgkort med. I det tilfælde skal man medbringe legitimation.
- **Brevstemme** — s. 84, l. 31-34 (46 ord). *Hvorfor:* Voting before election day.
  > Man kan også stemme inden valget, hvis man foretrækker det, fx fordi man er bortrejst på selve valgdagen. Det kaldes at brevstemme. Man kan brevstemme alle steder i landet og ikke bare i den kommune, hvor man bor – samt ved alle danske repræsentationer i udlandet.

#### `dem-grundlov-1849` – Danmarks første grundlov er fra 1849 (5. juni 1849).
Stillet 5×. Viser allerede (læs mere): s. 62 l. 45, s. 112 l. 44.

- **Fra enevælde til grundlov** — s. 112, l. 26-31 (59 ord). *Hvorfor:* Why the constitution came: dissatisfaction with absolute monarchy.
  > Fra slutningen af 1700-tallet og op gennem første halvdel af 1800-tallet bredte tankerne om frihed til den enkelte borger og lighed mellem mennesker sig. I Danmark voksede utilfredsheden med, at kongen var enevældig. Man ønskede i stedet en demokratisk forfatning, der begrænsede kongens magt. Forfatningen skulle sikre, at befolkningen fik indflydelse* på de beslutninger, der blev taget i landet.
- **Frederik 7. og Rigsdagen** — s. 112, l. 42-47 (71 ord). *Hvorfor:* The king who gave up absolute power, and the first parliament (Folketing + Landsting).
  > Kong Frederik 7. gav i 1848 efter for kravet om demokrati. Han afgav sin enevældige magt og erklærede sig som konstitutionel konge. Det førte til Danmarks første frie forfatning, Danmarks Riges Grundlov af 5. juni 1849. Grundloven betød, at Danmark fik to lovgivende forsamlinger: Folketinget og Landstinget, der sammen blev kaldt for Rigsdagen. Befolkningen kunne stemme om, hvem der skulle sidde i Rigsdagen, og fik dermed indflydelse på lovgivningen i Danmark.

#### `dem-straffeattest` – En straffeattest er et dokument, der viser, om man har været straffet.
Stillet 5×. Viser allerede (læs mere): s. 70 l. 32-37.

- **Hvad står på straffeattesten** — s. 70, l. 43-50 (74 ord). *Hvorfor:* What goes on the record and when it is deleted (2-5 years).
  > Overtrædelse af straffeloven, lovgivningen om euforiserende stoffer*, lovgivningen om eksplosivstoffer*, overtrædelse af et meddelt tilhold efter lov om tilhold*, opholdsforbud og bortvisning (altså hvis man overtræder et meddelt tilhold, opholdsforbud eller bortvisning) samt visse overtrædelser af færdselsloven kommer med på den private straffeattest. Hvis man bliver straffet i udlandet, kan det også blive noteret på straffeattesten. Oplysninger på den private straffeattest slettes igen efter to-fem år afhængigt* af, hvilken straf der er tale* om.
- **Arbejdsgivere og straffeattest** — s. 70, l. 52-55 (45 ord). *Hvorfor:* Why it matters in practice, and that you get it from the police.
  > Arbejdsgivere beder nogle gange om at se en straffeattest, før de ansætter en person. Arbejdsgiveren kan i nogle tilfælde nægte at ansætte personer, der er blevet straffet, eller som ikke vil vise deres straffeattest. Man kan henvende sig til politiet for at få sin straffeattest.

#### `dem-valgdeltagelse` – Ca. 80-90 procent af vælgerne stemmer ved folketingsvalg.
Stillet 4×. Viser allerede (læs mere): s. 82 l. 45-54, s. 100 l. 21-24.

- **Fire valg - fire niveauer** — s. 82, l. 27-43 (84 ord). *Hvorfor:* The four elections in Denmark; turnout differs between them.
  > Frie og hemmelige valg er noget af det vigtigste i et demokrati. Der afholdes fire valg i Danmark til politiske organer. Det svarer til fire politiske niveauer: 1. Det lokale niveau: Kommunalbestyrelsen 2. Det regionale niveau: Regionsrådet 3. Det nationale niveau: Folketinget 4. EU-niveauet: Europa-Parlamentet Desuden afholdes der nogle gange folkeafstemninger om nogle helt konkrete ting, fx om valgretsalderen, eller hvis Danmark skal overlade suverænitet, dvs. dansk selvbestemmelse, til et internationalt organ. Det vigtigste eksempel på afgivelse af suverænitet er Danmarks medlemskab af EU.

#### `dem-borgmester` – Borgmesteren er den øverste politiske leder af en kommune.
Stillet 4×. Viser allerede (læs mere): s. 79 l. 10-12.

- **Regionsrådsformand** — s. 80, l. 29-34 (68 ord). *Hvorfor:* The regional counterpart of the mayor, and how regions are financed.
  > Regionerne har ikke ret til at udskrive skatter, men får deres penge direkte fra staten. Hver region ledes af et regionsråd med en regionsrådsformand i spidsen. Der er valg til regionsrådene hvert fjerde år. Mange af de partier, der stiller op til regionsrådsvalget, stiller også op til Folketinget. Regionsrådsformanden vælges af regionsrådet. Regionsrådene har hver mellem 25 og 47 medlemmer. Regionerne har en interesseorganisation, der hedder Danske Regioner.
- **Borgerservice** — s. 77, l. 14-22 (50 ord). *Hvorfor:* Where citizens meet the municipality in practice.
  > Når en borger skal i kontakt med det offentlige, henvender han eller hun sig ofte til kommunens borgerservice. Her kan man få svar på spørgsmål, hvis man fx skal flytte eller have pension. Og man kan som regel få ordnet praktiske ting, fx hvis man skal have pas eller kørekort.

#### `dem-regioner-5` – Danmark er delt i 5 regioner.
Stillet 4×. Viser allerede (læs mere): s. 80 l. 9, s. 83 l. 47.

- **De fem regioner - og Region Østdanmark** — s. 80, l. 9-23 (64 ord). *Hvorfor:* Lists the regions and the 2027 merger into Region Østdanmark (new in the 2026 book).
  > Danmark er opdelt i fem regioner. Det er: • Region Hovedstaden (København og omegn, Nordsjælland og Bornholm) • Region Sjælland (Vestsjælland, Midtsjælland, Sydsjælland og Lolland-Falster) • Region Syddanmark (Fyn samt Syd- og Sønderjylland) • Region Midtjylland (Øst-, Midt- og Vestjylland) • Region Nordjylland (Nordjylland) Region Hovedstaden og Region Sjælland bliver lagt sammen den 1. januar 2027. Den nye, sammenlagte region skal hedde Region Østdanmark.
- **Regionsrådet** — s. 83, l. 46-49 (44 ord). *Hvorfor:* 41 members per regional council; regions mainly run hospitals.
  > Valg til regionsrådet foregår samtidig med valget til kommunalbestyrelsen. Der er fem regioner i Danmark, og hver region har et regionsråd. Der er 41 medlemmer i hvert regionsråd. Omkring 50 procent af de valgte er kvinder. Regionsrådene tager sig først og fremmest af sygehusene.

#### `dem-1915` – I 1915 fik kvinder stemmeret til Folketinget (grundlovsændringen 1915).
Stillet 4×. Viser allerede (læs mere): s. 59 l. 37-43, s. 63 l. 19-21.

- **Hvem kunne ikke stemme i 1849** — s. 112, l. 49-53 (58 ord). *Hvorfor:* Women, the poor and men under 30 got the vote with the 1915 change.
  > Grundloven fra 1849 betød dog ikke, at alle borgere fik politisk indflydelse. Fx kunne kvinder, fattige og mænd under 30 år ikke stemme til Rigsdagen. Det fik de først mulighed for senere, i forbindelse med at grundloven blev ændret i 1915. Men sammenlignet med de fleste andre staters forfatninger på den tid var den danske grundlov meget demokratisk.
- **Første kvindelige minister** — s. 59, l. 53-55 (25 ord). *Hvorfor:* Nina Bang 1924 and Helle Thorning-Schmidt 2011 - the next milestones.
  > Den første kvindelige minister i Danmark var Nina Bang, som blev undervisningsminister i 1924, og i 2011 fik Danmark sin første kvindelige statsminister, Helle Thorning-Schmidt.

#### `dem-doemmende` – Den dømmende magt ligger hos domstolene.
Stillet 4×. Viser allerede (læs mere): s. 66 l. 34-36.

- **Politi og domstole** — s. 68, l. 6-12 (50 ord). *Hvorfor:* The police investigate, the courts decide.
  > Man har som borger pligt til at overholde landets love, og nogle love kan man straffes for at overtræde. Politiet undersøger sager, hvor der er mistanke om, at en person har gjort noget strafbart*. Men det er domstolene, der afgør, om en person skal straffes for at have overtrådt lovgivningen.
- **Børn under 15 kan ikke straffes** — s. 69, l. 9-20 (88 ord). *Hvorfor:* Fines without a court case, and the age of criminal responsibility.
  > Det er domstolene, der vurderer, om en person, der bliver tiltalt for noget strafbart, er skyldig og skal straffes. Nogle sager skal ikke for en domstol, hvis den mistænkte selv accepterer at blive straffet med en bøde. Det ses blandt andet ved overtrædelser af færdselslovgivningen*. Børn under 15 år kan ikke straffes og kan altså ikke blive dømt til at betale bøder eller komme i fængsel. Myndighederne kan dog beslutte, at den unge skal anbringes uden for hjemmet, eller pålægge* den unge at deltage i nogle bestemte aktiviteter.

#### `dem-kommunalvalg` – Der er valg til kommunalbestyrelser og regionsråd hvert 4. år.
Stillet 3×. Viser allerede (læs mere): s. 77 l. 24-27, s. 83 l. 25.

- **Udlændinge kan stemme til kommunalvalg** — s. 83, l. 29-35 (83 ord). *Hvorfor:* Key trap: no Danish citizenship needed for local and regional elections (4 years' residence).
  > Man behøver ikke have dansk statsborgerskab for at stemme til kommunal- og regionalvalg. Personer, som er statsborgere i et andet EU-land, Norge eller Island, har også stemmeret til kommunal- og regionalvalg, hvis de har fast bopæl i Danmark. Desuden har andre udlændinge, der har boet fast i Danmark i de sidste fire år inden valgdagen, stemmeret til kommune og region. Hvis man opfylder betingelserne for at have stemmeret, er man som udgangspunkt også valgbar, dvs. at man kan vælges til kommunalbestyrelse eller regionsråd.
- **Lokale partier** — s. 83, l. 41-44 (21 ord). *Hvorfor:* Local parties that only stand in one municipality.
  > I kommunerne er der ofte også opstillet* lokale partier, som ikke opstiller til Folketinget, men kun opstiller i en bestemt kommune.

#### `dem-lovgivende` – Den lovgivende magt har regeringen og Folketinget. De laver lovene.
Stillet 3×. Viser allerede (læs mere): s. 66 l. 12-18.

- **Fra lovforslag til lov** — s. 66, l. 18-25 (33 ord). *Hvorfor:* Who proposes, who adopts, who signs a law.
  > De fleste lovforslag fremsættes* af regeringen, og det er Folketinget, der vedtager dem. Lovforslaget skal derefter underskrives af kongen og en minister. Når lovforslaget er underskrevet bliver det til lov, der skal offentliggøres.
- **Tre behandlinger** — s. 73, l. 45-48 (45 ord). *Hvorfor:* Every bill gets three readings in the Folketing.
  > I udvalgene behandles de fremsatte lovforslag, og udvalgene stiller ofte en lang række spørgsmål til den pågældende minister. Der skal være tre behandlinger af alle lovforslag i Folketinget, før det kan vedtages, og forslagene diskuteres og gennemarbejdes i udvalgene mellem de tre behandlinger i Folketinget.

#### `dem-kvinder-folketing` – Efter valget i 2026 er 48-49 % af Folketingets medlemmer kvinder (86 af 179) – altså ca. halvdelen.
Stillet 3×. Viser allerede (læs mere): s. 59 l. 45-46, s. 83 l. 14-20.

- **Kvinder i kommunalbestyrelser** — s. 83, l. 41-42 (28 ord). *Hvorfor:* Compare: about 36 % women in municipal councils.
  > I de mindste kommuner er der dog ned til ni medlemmer og i København er der op til 55 medlemmer. Omkring 36 procent af de valgte er kvinder.
- **Kvinder i regionsråd** — s. 83, l. 46-48 (36 ord). *Hvorfor:* Compare: about 50 % women in regional councils.
  > Valg til regionsrådet foregår samtidig med valget til kommunalbestyrelsen. Der er fem regioner i Danmark, og hver region har et regionsråd. Der er 41 medlemmer i hvert regionsråd. Omkring 50 procent af de valgte er kvinder.
- **Samme politiske rettigheder** — s. 59, l. 48-51 (43 ord). *Hvorfor:* Women and men have the same political rights.
  > Kvinder og mænd har således samme politiske rettigheder og kan stemme og stille op til folketingsvalg og kommunalvalg på samme vilkår*. Kvinder og mænd har også samme ret til at deltage i den offentlige debat og til at være medlem af politiske partier.

#### `dem-regionerne-sygehuse` – Regionerne har ansvaret for de offentlige sygehuse.
Stillet 3×. Viser allerede (læs mere): s. 80 l. 25-27, s. 54 l. 19-20.

- **Frit sygehusvalg** — s. 54, l. 35-41 (77 ord). *Hvorfor:* Free choice of hospital and the one-month rule for private hospitals.
  > I Danmark har man frit sygehusvalg. Det vil sige, at man normalt selv kan vælge, hvilket offentligt sygehus man vil behandles på. Hvis man vælger et sygehus uden for den region, hvor man bor, kan man dog få afslag, hvis der ikke er plads. Man kan også blive henvist til et privat sygehus, hvis man skal vente mere end en måned på behandling på et offentligt sygehus. I det tilfælde er behandlingen på et privat sygehus gratis.
- **Regionernes økonomi** — s. 80, l. 29-31 (26 ord). *Hvorfor:* Regions get their money from the state, not from taxes of their own.
  > Regionerne har ikke ret til at udskrive skatter, men får deres penge direkte fra staten. Hver region ledes af et regionsråd med en regionsrådsformand i spidsen.

#### `dem-parti` – Folketingets medlemmer behøver ikke være medlem af et politisk parti.
Stillet 3×. Viser allerede (læs mere): s. 85 l. 23-25, s. 85 l. 55-59.

- **Enhver kan melde sig ind** — s. 85, l. 18-21 (35 ord). *Hvorfor:* Anyone can join a party, and you can stand outside the parties.
  > Enhver kan melde sig ind i et politisk parti. I en valgkamp foregår den politiske kamp først og fremmest mellem partiernes kandidater. Ved folketingsvalg kan man dog også stille op som kandidat uden for partierne.
- **Partierne vælger kandidater** — s. 86, l. 29-38 (50 ord). *Hvorfor:* Party members choose the candidates.
  > De politiske partier er foreninger med en demokratisk opbygning. De er i dag organiseret som lokale (fx kommunale) vælgerforeninger, og en af partimedlemmernes vigtigste opgaver er at bestemme, hvem der skal være kandidater til de forskellige slags valg. De politiske partier har forskellige regler for, hvordan valget af kandidater foregår.

#### `dem-domstole-uafhaengige` – Domstolene er uafhængige. Politikere og regeringen kan ikke bestemme, hvordan en dommer dømmer.
Stillet 2×. Viser allerede (læs mere): s. 66 l. 34-40, s. 69 l. 22-27.

- **Idéen med magtens tredeling** — s. 66, l. 42-54 (42 ord). *Hvorfor:* Why power is divided; courts can also test laws against the constitution.
  > Idéen med denne opdeling af magten er bl.a., at Folketinget kan kontrollere regeringen, og at domstolene kan vurdere, om en afgørelse, som en offentlig myndighed har truffet, er lovlig eller ej. Desuden kan domstolene vurdere, om en lov er forenelig med grundloven.

#### `dem-folkeafstemning-grundlov` – Hvis grundloven skal ændres, skal der være en folkeafstemning.
Stillet 2×. Viser allerede (læs mere): s. 63 l. 6-13.

- **Folkeafstemninger om suverænitet** — s. 82, l. 40-43 (39 ord). *Hvorfor:* Other referendums: voting age and giving sovereignty to an international body.
  > Desuden afholdes der nogle gange folkeafstemninger om nogle helt konkrete ting, fx om valgretsalderen, eller hvis Danmark skal overlade suverænitet, dvs. dansk selvbestemmelse, til et internationalt organ. Det vigtigste eksempel på afgivelse af suverænitet er Danmarks medlemskab af EU.
- **Repræsentativt demokrati** — s. 75, l. 50-55 (41 ord). *Hvorfor:* Why referendums are rare in Denmark.
  > Danmark er et repræsentativt demokrati. Det betyder, at folket vælger de politikere, de er mest enige med, til Folketinget. Det er altså politikerne, der som folkets repræsentanter tager sig af lovgivningen. Det er sjældent, at et lovforslag lægges ud til folkeafstemning.

#### `dem-moms` – Moms er en afgift på blandt andet varer, man køber i butikkerne.
Stillet 2×. Viser allerede (læs mere): s. 39 l. 28-31.

- **Skat efter indkomst** — s. 39, l. 20-26 (83 ord). *Hvorfor:* Denmark is a high-tax country; the more you earn, the larger the share you pay.
  > Der er store udgifter forbundet med et velfærdssamfund som det danske, og der er derfor behov for mange indtægter til det offentlige. Danmark er da også et af de lande i verden, hvor borgerne betaler mest i skat. Pengene til velfærden kommer bl.a. fra den skat, borgerne betaler af deres løn. Men skatten er ikke lige stor for alle. Princippet for skatten i Danmark er, at jo mere man får i løn, jo større del af sin løn skal man betale i skat.
- **Afgifter og andre skatter** — s. 39, l. 31-36 (32 ord). *Hvorfor:* Why there are extra duties, and other sources of state income.
  > Disse afgifter er også begrundet med hensyn til miljø og sundhed. Desuden får velfærdsstaten betydelige indtægter fra selskabsskatter, ejendomsskatter og på afkastet på danskernes pensionsopsparing, der er blandt de største i verden.

#### `dem-1849-ikke-kvinder` – Grundloven fra 1849 gav IKKE kvinder stemmeret. Kun en del af mændene fik stemmeret i 1849.
Stillet 2×. Viser allerede (læs mere): s. 59 l. 33-35, s. 112 l. 49-51, s. 63 l. 21-23.

- **Rigsdagen i 1849** — s. 112, l. 42-47 (35 ord). *Hvorfor:* What the 1849 constitution did give: two chambers elected by part of the population.
  > Grundloven betød, at Danmark fik to lovgivende forsamlinger: Folketinget og Landstinget, der sammen blev kaldt for Rigsdagen. Befolkningen kunne stemme om, hvem der skulle sidde i Rigsdagen, og fik dermed indflydelse på lovgivningen i Danmark.
- **Et centralt princip i dag** — s. 59, l. 29-31 (38 ord). *Hvorfor:* Today no one may be hindered from voting because of gender.
  > Det er et helt centralt princip i det danske demokrati, at borgere ikke må forhindres i at stemme til valg eller at stille op til valg på grund af fx deres køn, etniske baggrund, seksuelle orientering eller religion.

#### `dem-regering` – Fra december 2022 til juni 2026 var regeringen S + V + M (SVM-regeringen). Siden 3. juni 2026 er regeringen S + SF + M + Radikale Venstre (Mette Frederiksen III).
Stillet 2×. Viser allerede (læs mere): s. 75 l. 25-27, s. 75 l. 36-45.

- **Statsministeren og ministrene** — s. 74, l. 40-46 (86 ord). *Hvorfor:* Who chooses the ministers and how many there are.
  > Statsministeren leder regeringen, som normalt består af ca. 20 ministre. Som regel er ministrene medlemmer af Folketinget, men de behøver ikke at være det. Det er alene statsministeren, som bestemmer, hvem der skal være minister, og hvor mange ministre der skal være i en regering. Normalt har hver minister et ministerium, som han eller hun leder og har det øverste ansvar for. Der er fx ministerier for skat, kultur, forsvar og undervisning og sundhed. Én person kan dog godt være minister for mere end ét ministerium.
- **Koalitions- og mindretalsregering** — s. 75, l. 6-23 (88 ord). *Hvorfor:* Explains the words used about the current four-party minority government.
  > Regeringspartierne er de politiske partier, der har ministre i regeringen. Nogle gange ligger regeringsmagten hos ét parti, men som regel har flere partier regeringsmagten sammen. Når flere partier sammen har regeringsmagten, kaldes det en koalitionsregering. Hvis regeringspartierne sammen har flertal i Folketinget, taler man om en flertalsregering. Hvis regeringspartierne ikke har flertal i Folketinget, kaldes regeringen en mindretalsregering. En mindretalsregering er afhængig* af støtte fra andre partier i Folketinget, hvis den skal have sine lovforslag vedtaget. De partier uden for regeringen, der støtter en mindretalsregering, kaldes ofte støttepartier.

#### `dem-stoerste-parti-2022` – Socialdemokratiet fik flest stemmer ved folketingsvalget i 2022.
Stillet 2×. Viser allerede (læs mere): s. 85 l. 27-29.

- **Partierne i Folketinget efter valget i 2026** — s. 85, l. 27-40 (49 ord). *Hvorfor:* The 2026 book lists the parties by votes; Socialdemokratiet is still first.
  > Ved folketingsvalget i 2026 blev følgende partier repræsenteret i Folketinget. Partierne er oplistet efter, hvor mange stemmer de fik: • Socialdemokratiet • SF • Venstre • Liberal Alliance • Dansk Folkeparti • Moderaterne • Det Konservative Folkeparti • Enhedslisten • Radikale Venstre • Danmarksdemokraterne • Alternativet • Borgernes Parti

#### `dem-demonstration` – Man skal give politiet besked (underrette), før man holder en demonstration – men man skal IKKE have politiets tilladelse.
Stillet 2×. Viser allerede (læs mere): s. 63 l. 46-51, s. 87 l. 21-23.

- **Politiet kan stille krav** — s. 87, l. 23-29 (54 ord). *Hvorfor:* What the police can and cannot do about a demonstration.
  > Politiet kan nogle gange kræve, at en demonstration bliver afholdt et andet sted. Det kunne fx være, hvis politiet mener, at der er fare for, at demonstrationen vil udvikle sig voldeligt. Politiet kan også stille krav til, hvordan demonstrationen skal foregå. Det er kun under helt særlige omstændigheder, at politiet kan forbyde en demonstration.
- **Underskrifter og protester** — s. 87, l. 17-19 (25 ord). *Hvorfor:* Collecting signatures is more common than demonstrating.
  > Mange græsrodsbevægelser benytter sig af protester for at påvirke politikerne. Det kan nogle gange være gennem demonstrationer, men det mest almindelige er indsamling af underskrifter.

#### `dem-anholdt-24t` – En anholdt person skal stilles for en dommer inden 24 timer.
Stillet 2×. Viser allerede (læs mere): s. 64 l. 22-25, s. 68 l. 53-59.

- **Politiets regler ved anholdelse** — s. 68, l. 40-47 (48 ord). *Hvorfor:* The rules that protect the arrested person.
  > Politiet skal følge en række regler, når de anholder eller afhører en person. Disse regler er til for at beskytte borgeren. Politiet må fx ikke bruge vold eller true med vold under afhøringen. Politiet skal også informere den anholdte person om, hvad han eller hun er mistænkt for.

#### `dem-forfatning` – Danmarks forfatning hedder Grundloven.
Stillet 2×. Viser allerede (læs mere): s. 62 l. 29-30.

- **Grundloven er den øverste lov** — s. 62, l. 30-32 (26 ord). *Hvorfor:* What the constitution contains and that other laws may not conflict with it.
  > Grundloven indeholder de vigtigste regler om Danmarks styreform, og grundloven sikrer borgerne en række fundamentale rettigheder. De øvrige love i Danmark må ikke stride mod grundloven.
- **Ordet 'forfatning'** — s. 150, l. 17-18 (23 ord). *Hvorfor:* Glossary definition.
  > • forfatning – grundlæggende (basale) regler for, hvordan en stat skal styres og organiseres. Normalt bliver disse regler skrevet ned i en grundlov.

#### `dem-hemmelig-stemme` – Afstemningen er hemmelig. Andre må ikke se, hvad man stemmer.
Stillet 1×. Viser allerede (læs mere): s. 84 l. 9-10, s. 62 l. 13.

- **Stemmesedlen** — s. 84, l. 22-29 (96 ord). *Hvorfor:* How you vote on the ballot, including a blank vote.
  > På valgdagen tager man sit valgkort med til valgstedet. Når man kommer til valgstedet, afleverer man sit valgkort og får en stemmeseddel med navnene på alle dem, der stiller op til valget, og som man kan stemme på i ens kommune og region. Navnene er ordnet efter, hvilket parti kandidaterne tilhører. Man stemmer ved at sætte et kryds enten ud for et parti eller ud for en bestemt person (en kandidat) på stemmesedlen. Enkelte vælger også at stemme blankt, ofte som protest. Det vil sige, at man ikke sætter noget kryds, men blot afleverer sin stemmeseddel.
- **Frie og hemmelige valg** — s. 151, l. 11-12 (23 ord). *Hvorfor:* Glossary definition.
  > • hemmelige/frie og hemmelige valg – alle kan stille op til valget, og ingen kan se, hvem eller hvilket parti man stemmer på.

#### `dem-udskriver-valg` – Statsministeren bestemmer, hvornår der skal være folketingsvalg (udskriver valg).
Stillet 1×. Viser allerede (læs mere): s. 82 l. 59-61.

- **Parlamentarisme** — s. 72, l. 47-57 (68 ord). *Hvorfor:* Why a government that loses a majority may call an election.
  > Det danske demokrati er et parlamentarisk demokrati. Det betyder, at Folketinget bestemmer, hvem der skal have regeringsmagten, idet en regering ikke kan udnævnes*, hvis den har et flertal i Folketinget imod sig. Og hvis en siddende regering får et flertal i Folketinget imod sig i en sag, som den selv tillægger* stor betydning (som fx finansloven), kan det ske, at regeringen går af eller vælger at udskrive valg.

#### `dem-regeringsdannelse` – Efter et valg er det Folketinget (flertallet), der bestemmer, hvem der danner regering.
Stillet 1×. Viser allerede (læs mere): s. 72 l. 42-43, s. 65 l. 23-26.

- **Parlamentarisme** — s. 72, l. 47-57 (68 ord). *Hvorfor:* A government cannot be appointed with a majority against it.
  > Det danske demokrati er et parlamentarisk demokrati. Det betyder, at Folketinget bestemmer, hvem der skal have regeringsmagten, idet en regering ikke kan udnævnes*, hvis den har et flertal i Folketinget imod sig. Og hvis en siddende regering får et flertal i Folketinget imod sig i en sag, som den selv tillægger* stor betydning (som fx finansloven), kan det ske, at regeringen går af eller vælger at udskrive valg.
- **Regeringen præsenteres for kongen** — s. 75, l. 36-45 (43 ord). *Hvorfor:* The 3 June 2026 government and its four party leaders (photo caption).
  > 3. juni 2026. En ny regering træder ud på Amalienborg Slotsplads efter at være blevet præsenteret for kongen. I forreste række partiformændene for de fire regeringspartier: (fra venstre) Lars Løkke Rasmussen (Moderaterne), Mette Frederiksen (Socialdemokratiet), Pia Olsen Dyhr (SF) Martin Lidegaard (Radikale Venstre).

#### Faktagruppe `fg-hvem-styrer` – Hvem står for hvad? Kommune, region, stat
Viser allerede (læs mere): s. 77 l. 40-57, s. 80 l. 9-30, s. 79 l. 10-12.

- **Tanken med lokalt selvstyre** — s. 77, l. 6-12 (47 ord). *Hvorfor:* Tasks solved as close to the citizens as possible.
  > Der er en lang tradition for lokalt selvstyre i Danmark. Det er kommunalbestyrelserne og regionsrådene, der står for det lokale selvstyre. Det er tanken med det lokale selvstyre, at de offentlige opgaver, der har med borgernes dagligdag at gøre, skal løses så tæt på borgerne som muligt.
- **Aftalen med KL** — s. 79, l. 32-41 (39 ord). *Hvorfor:* How the government steers municipal budgets.
  > Hvert år laver regeringen en aftale med kommunernes interesseorganisation KL (Kommunernes Landsforening) om, hvor mange penge kommunerne tilsammen må bruge. Dermed kan regeringen påvirke den samlede kommunale økonomi. Kommunerne aftaler herefter indbyrdes, hvordan beløbet fordeles til de enkelte kommuner.

#### Faktagruppe `fg-magt` – Magtens tredeling og domstolene
Viser allerede (læs mere): s. 66 l. 9-40, s. 69 l. 29-40, s. 68 l. 53-59.

- **Regeringen har den udøvende magt** — s. 74, l. 22-28 (71 ord). *Hvorfor:* The government also leads the country politically.
  > Regeringen udgør som nævnt en del af den lovgivende magt. Regeringen har også den udøvende magt. Det betyder, at det er regeringen sammen med de andre offentlige myndigheder, der gennemfører og administrerer den lovgivning, som er vedtaget i Folketinget. Det sker gennem ministerierne. Men regeringen tager sig ikke kun af administrative opgaver. Regeringen udgør den politiske ledelse af landet, og det er fx regeringen, der kommer med langt de fleste lovforslag.

#### Faktagruppe `fg-tal` – Tal, du skal kunne
Viser allerede (læs mere): s. 72 l. 29, s. 83 l. 61-62, s. 77 l. 40, s. 80 l. 9, s. 82 l. 59, s. 83 l. 57, s. 6 l. 6-10, s. 8 l. 50-52, s. 27 l. 9-10, s. 27 l. 43-47, s. 64 l. 22-25, s. 106 l. 24-25, s. 105 l. 36-37, s. 106 l. 36, s. 146 l. 9-10, s. 82 l. 45-54, s. 120 l. 34-36, s. 118 l. 27-28, s. 22 l. 58-59, s. 24 l. 60-63.

- **Jylland og over 400 øer** — s. 105, l. 39-41 (32 ord). *Hvorfor:* More numbers: 400 islands, 7,300 km of coast.
  > Danmark består af halvøen Jylland og over 400 større og mindre øer. Den største ø er Sjælland. De mange øer betyder, at Danmark har en meget lang kystlinje – omkring 7.300 km.
- **720 medlemmer** — s. 100, l. 20-21 (18 ord). *Hvorfor:* 15 of 720 MEPs.
  > Der afholdes valg hvert femte år. Europa-Parlamentet har i alt 720 medlemmer, hvoraf 15 er valgt i Danmark.

#### Faktagruppe `fg-valg` – Valg: hvor tit og hvem må stemme
Viser allerede (læs mere): s. 82 l. 59-66, s. 83 l. 23-33, s. 83 l. 55-62, s. 84 l. 6-10, s. 100 l. 21-24.

- **Fire valg - fire niveauer** — s. 82, l. 27-43 (84 ord). *Hvorfor:* Overview of all elections.
  > Frie og hemmelige valg er noget af det vigtigste i et demokrati. Der afholdes fire valg i Danmark til politiske organer. Det svarer til fire politiske niveauer: 1. Det lokale niveau: Kommunalbestyrelsen 2. Det regionale niveau: Regionsrådet 3. Det nationale niveau: Folketinget 4. EU-niveauet: Europa-Parlamentet Desuden afholdes der nogle gange folkeafstemninger om nogle helt konkrete ting, fx om valgretsalderen, eller hvis Danmark skal overlade suverænitet, dvs. dansk selvbestemmelse, til et internationalt organ. Det vigtigste eksempel på afgivelse af suverænitet er Danmarks medlemskab af EU.

#### Faktagruppe `fg-ja-nej` – Ja/nej-fælder: ét ord ændrer svaret
Viser allerede (læs mere): s. 63 l. 46-51, s. 70 l. 10-18, s. 82 l. 61-66, s. 44 l. 41, s. 59 l. 33-35, s. 27 l. 34-38, s. 105 l. 12-14, s. 55 l. 9-20.

- **Glemt valgkort** — s. 84, l. 19-20 (19 ord). *Hvorfor:* You can vote without the polling card if you bring ID.
  > Man kan dog godt stemme, hvis man ikke har sit valgkort med. I det tilfælde skal man medbringe legitimation.

### 2. Kongehus og rigsfællesskab (`kongehus`)

#### `kon-rigsfaellesskab` – Rigsfællesskabet er Danmark, Grønland og Færøerne. Island, Norge og Åland er IKKE med.
Stillet 8×. Viser allerede (læs mere): s. 105 l. 12-14, s. 102 l. 31-33, s. 153 l. 34-35.

- **Hjemmestyre og selvstyre** — s. 105, l. 12-20 (29 ord). *Hvorfor:* Home rule (Faroes) vs. self-government (Greenland), each with its own parliament.
  > Færøerne og Grønland regulerer* i høj grad deres samfund selv inden for rammerne af den færøske hjemmestyreordning og den grønlandske selvstyreordning. Færøerne og Grønland har deres egne demokratiske forsamlinger*.
- **Fælles og ikke fælles** — s. 153, l. 35-38 (53 ord). *Hvorfor:* Glossary: what the three parts share (the monarch) and what they don't (flags).
  > Grønland. Rigsfællesskabet hører under Kongeriget Danmark, hvor alle tre regioner indgår i et konstitutionelt monarki. Der er noget, de tre dele er fælles om. Fx er de tre dele fælles om dronningen. Der er også mange ting, de tre dele ikke er fælles om. Fx har hver af de tre dele eget flag.
- **Grønland og USA** — s. 137, l. 21-23 (36 ord). *Hvorfor:* Current affairs in the 2026 book: the US wish to take over Greenland was rejected.
  > De seneste år har den amerikanske præsident Donald Trump (født 1946) udtrykt ønske om, at Grønland skal blive en del af USA. Dette ønske er dog blevet afvist af både den grønlandske og den danske regering.

#### `kon-nytaarstale` – Kongen holder nytårstale den 31. december. Statsministeren holder nytårstale den 1. januar.
Stillet 4×. Viser allerede (læs mere): s. 65 l. 39-41, s. 130 l. 32-42.

- **Kongen rejser og repræsenterer Danmark** — s. 65, l. 28-33 (71 ord). *Hvorfor:* The king's other official roles (state visits).
  > Kongen rejser ofte rundt og besøger forskellige dele af Danmark. Han rejser også på statsbesøg i andre lande. Dvs., at han besøger andre landes konger, dronninger eller præsidenter. På den måde repræsenterer kongen Danmark i udlandet og er med til at skabe opmærksomhed om Danmark. Der er også politikere, erhvervsfolk og embedsmænd med på statsbesøg for bl.a. at lave handelsaftaler. Det kan fx være med til at øge* den danske eksport.

#### `kon-arv` – Kongen eller dronningen arver tronen. Danmark er et arvemonarki.
Stillet 4×. Viser allerede (læs mere): s. 65 l. 12-20, s. 111 l. 43-46.

- **Et monarki** — s. 65, l. 9-10 (19 ord). *Hvorfor:* Definition of monarchy.
  > Danmark er et monarki. Det betyder, at det danske statsoverhoved er en monark, dvs. en konge eller en dronning.
- **Enevælden 1660-1849** — s. 65, l. 43-47 (53 ord). *Hvorfor:* Hereditary monarchy since 1660; the last absolute king was Frederik 7.
  > Danmarks første frie forfatning blev underskrevet i 1849. Inden havde man haft næsten 200 år med enevælde siden 1660-61. Enevælden var en styreform, hvor kongen havde magten alene. Danmarks sidste enevældige konge var Frederik 7. Han blev konge i 1848 og afgav samme år sin enevældige magt. Den nuværende grundlov er fra 1953.

#### `kon-rolle` – Kongen underskriver nye love sammen med en minister.
Stillet 3×. Viser allerede (læs mere): s. 65 l. 22-26, s. 66 l. 21-25.

- **Statsbesøg** — s. 65, l. 28-33 (71 ord). *Hvorfor:* What the king does instead of politics.
  > Kongen rejser ofte rundt og besøger forskellige dele af Danmark. Han rejser også på statsbesøg i andre lande. Dvs., at han besøger andre landes konger, dronninger eller præsidenter. På den måde repræsenterer kongen Danmark i udlandet og er med til at skabe opmærksomhed om Danmark. Der er også politikere, erhvervsfolk og embedsmænd med på statsbesøg for bl.a. at lave handelsaftaler. Det kan fx være med til at øge* den danske eksport.
- **Ministrene gennemfører loven** — s. 74, l. 30-34 (51 ord). *Hvorfor:* After the king signs, the ministers carry the law out.
  > Når et lovforslag bliver vedtaget af Folketinget og underskrevet af Kongen og den relevante minister, er det ministrene sammen med embedsmændene i ministerierne og andre offentlige myndigheder, der skal sørge for, at loven bliver gennemført. Men det er de enkelte ministre, der er ansvarlige for, hvad der foregår i deres ministerium.

#### `kon-konge` – Danmarks konge er Frederik 10. (siden 14. januar 2024).
Stillet 2×. Viser allerede (læs mere): s. 65 l. 12-19.

- **Kongefamilien** — s. 65, l. 35-37 (32 ord). *Hvorfor:* Queen Mary and the four children.
  > Kong Frederik 10. har siden 2004 været gift med dronning Mary, som oprindeligt kommer fra Australien. Sammen har de fire børn (kronprins Christian, prinsesse Isabella samt tvillingerne prins Vincent og prinsesse Josephine).

#### `kon-kronprins` – Danmarks kronprins hedder Christian.
Stillet 1×. Viser allerede (læs mere): s. 65 l. 19, s. 65 l. 36.

- **Det ældste barn arver** — s. 65, l. 20 (11 ord). *Hvorfor:* Why Christian is next: the eldest child inherits.
  > Når monarken dør, er det det ældste barn, som arver tronen.

#### `kon-thule` – USA's luftbase Thule ligger i Grønland (i dag hedder den Pituffik).
Stillet 1×. Viser allerede (læs mere): s. 136 l. 20-25.

- **Grønlands strategiske betydning** — s. 136, l. 9-18 (63 ord). *Hvorfor:* Why the US base is in Greenland.
  > Grønland, som er en del af det danske Rigsfællesskab, havde en stor betydning under den Kolde Krig. Grønland ligger tæt på både USA og det daværende Sovjetunionen, og man skulle flyve hen over Grønland for at tage den korteste rute mellem USA, Europa og Sovjetunionen. Den korteste vej for raketter i tilfælde af krig mellem USA og Rusland/Sovjetunionen går også hen over Grønland.
- **Arktis i fokus** — s. 137, l. 14-19 (71 ord). *Hvorfor:* The Arctic today: USA, Russia and China are interested.
  > Det arktiske område er derfor stadig i fokus for dansk sikkerhedspolitik. De internationale stormagter USA, Rusland og Kina er dog alle interesserede i Arktis. Det er de, fordi landene har interesse i at beskytte deres eget land mod angreb fra andre. Men også fordi landene har økonomiske interesser i for eksempel minedrift og transport af varer med skib. Det kan udfordre Rigsfællesskabets mål om, at Arktis skal være et fredeligt område.
- **Mere forsvar omkring Grønland** — s. 137, l. 25-28 (53 ord). *Hvorfor:* 2025 decision to strengthen defence around Greenland.
  > I 2025 er det derfor også besluttet at styrke det danske forsvars tilstedeværelse omkring Grønland og ikke mindst for at kunne overvåge* området. Der er således besluttet at bruge købe nye skibe, der er særligt egnede sig til at sejle i arktisk klima og droner, der kan overvåge store områder over lange afstande.

### 3. Historie (`historie`)

#### `his-foerste-kvindelige-sm` – Danmarks første kvindelige statsminister var Helle Thorning-Schmidt (fra 2011). Før hende havde der ingen været.
Stillet 9×. Viser allerede (læs mere): s. 59 l. 53-55.

- **Statsministre siden 1982** — s. 119, l. 16-19 (31 ord). *Hvorfor:* Photo caption listing five prime ministers with years - helps place Helle Thorning-Schmidt.
  > Fire tidligere statsministre, Poul Nyrup Rasmussen (1993-2001), Lars Løkke Rasmussen (2009-11 og 2015-19), Helle Thorning Schmidt (2011-15) og Anders Fogh Rasmussen (2001-09) ankommer til en femte statsministers Poul Schlüters (1982-93) begravelse.
- **Kvinder i politik i dag** — s. 59, l. 45-46 (24 ord). *Hvorfor:* Today almost half of the Folketing are women.
  > I dag er det almindeligt med kvindelige ministre og borgmestre, og 86 ud af 179 medlemmer (48 procent) af det danske Folketing er kvinder.

#### `his-reformation` – Reformationen kom til Danmark i 1536. Siden da har Danmark været protestantisk (luthersk).
Stillet 7×. Viser allerede (læs mere): s. 110 l. 37-42, s. 93 l. 33-35.

- **Kristendommen kommer til Danmark** — s. 109, l. 40-46 (82 ord). *Hvorfor:* Before 1536 the church was Catholic for 5-600 years.
  > Kristendommen kom til Danmark under kong Harald Blåtand, som selv blev døbt* omkring 965. I de første 5-600 år, efter at Danmark var blevet kristent, var den danske kirke en del af den romersk-katolske kirke. Biskopper, præster og munke arbejdede for at udbrede kristendommen i landet, og kirken fik større og større magt. Centrum for troen var byens eller landsbyens kirke, og omkring 1250 var der blevet bygget op mod 3.000 kirker i Danmark. Der blev også bygget klostre over hele landet.
- **Kongen overtager kirkens jord** — s. 110, l. 44-60 (58 ord). *Hvorfor:* Consequences of the Reformation: the king's power, the Bible in Danish.
  > Det betød bl.a., at kongen overtog kirkens jord, ca. en tredjedel af landets dyrkede areal. Reformationen styrkede* kongens magt og gav samtidig adelen øget indflydelse på kirkens bekostning. Derudover blev Biblen også oversat til dansk, ligesom gudstjenester* og salmesang fra nu af kun foregik på dansk. I middelalderen havde kirken især brugt latin, som kun få mennesker forstod.
- **Stat og kirke er ikke adskilt** — s. 93, l. 37-41 (57 ord). *Hvorfor:* The link from 1536 to today's folkekirke.
  > Staten understøtter* folkekirken økonomisk. Stat og kirke er altså ikke adskilt i Danmark, som de er i en række andre lande. Selv om den danske folkekirke bliver understøttet af staten, har den ingen politisk magt. Der er tradition for at trække* en tydelig grænse mellem religion og politik. De fleste danskere betragter nemlig religion som en privatsag.

#### `his-besat-aar` – Tyskland besatte Danmark den 9. april 1940.
Stillet 5×. Viser allerede (læs mere): s. 114 l. 20-21.

- **Samarbejde og modstand 1940-45** — s. 114, l. 21-30 (87 ord). *Hvorfor:* What happened between 9 April 1940 and 5 May 1945.
  > Regeringen besluttede at bøje* sig og var tvunget til at samarbejde med den tyske besættelsesmagt. Den folkelige modstand mod den tyske besættelsesmagt blev efterhånden så stor, at samarbejdet med Tyskland brød* sammen i august 1943. Regeringen indgav sin afskedsbegæring*, og den danske hær blev opløst. Krigens sidste halvandet år var præget* af en voksende modstand mod den tyske besættelsesmagt. Tyskerne og deres danske samarbejdspartnere blev angrebet i forskellige aktioner, hvor der blev brugt våben og sprængstoffer*. Danmark blev officielt befriet af britiske tropper den 5. maj 1945.

#### `his-1864` – I 1864 mistede Danmark Slesvig og Holsten efter en krig mod Det Tyske Forbund.
Stillet 5×. Viser allerede (læs mere): s. 113 l. 9-11.

- **Et lille land** — s. 113, l. 11-20 (65 ord). *Hvorfor:* What 1864 meant: a smaller country that had to use its land better.
  > Nu blev Danmark meget mindre. Derfor blev det vigtigt at bruge det, der var tilbage af Danmarks jord, bedst muligt for at skabe vækst. Man gik fx i gang med at opdyrke den jyske hede. Og mange landmænd begyndte at avle dyr i stedet for blot at dyrke korn, fordi de kunne tjene mange flere penge på fx smør, flæsk og æg end på kornprodukter.
- **Engang en stormagt** — s. 108, l. 12-22 (62 ord). *Hvorfor:* 400 years ago the Danish king ruled Norway, Iceland and parts of Sweden and Germany.
  > For 400 år siden var det anderledes. Dengang regerede den danske konge over et rige, der blandt andet omfattede Norge, Island og landområder, der nu hører til Tyskland og Sverige. Befolkningen talte således blandt andet både dansk, norsk, tysk og islandsk. Sammenlignet med tidligere, hvor landet var en stormagt i Norden og området omkring Østersøen, er Danmark i dag en mindre nationalstat.

#### `his-besat-krig` – Danmark var besat af Tyskland under 2. verdenskrig (1940-1945).
Stillet 3×. Viser allerede (læs mere): s. 114 l. 20-21.

- **Samarbejde og modstand 1940-45** — s. 114, l. 21-30 (87 ord). *Hvorfor:* What happened between 9 April 1940 and 5 May 1945.
  > Regeringen besluttede at bøje* sig og var tvunget til at samarbejde med den tyske besættelsesmagt. Den folkelige modstand mod den tyske besættelsesmagt blev efterhånden så stor, at samarbejdet med Tyskland brød* sammen i august 1943. Regeringen indgav sin afskedsbegæring*, og den danske hær blev opløst. Krigens sidste halvandet år var præget* af en voksende modstand mod den tyske besættelsesmagt. Tyskerne og deres danske samarbejdspartnere blev angrebet i forskellige aktioner, hvor der blev brugt våben og sprængstoffer*. Danmark blev officielt befriet af britiske tropper den 5. maj 1945.
- **Fra neutralitet til NATO** — s. 116, l. 17-19 (31 ord). *Hvorfor:* Denmark had tried to stay neutral - which is why it joined NATO after the war.
  > Efter 2. Verdenskrig stoppede Danmark sin neutralitetspolitik* og blev i 1949 medlem af forsvarsalliancen NATO. Danmark havde også forsøgt at holde sig neutral under 2. Verdenskrig, men blev besat af Tyskland.

#### `his-tyrkiet` – Fra 1960'erne blev der hentet arbejdskraft i udlandet (gæstearbejdere). De fleste kom fra Tyrkiet, ex-Jugoslavien eller Pakistan.
Stillet 3×. Viser allerede (læs mere): s. 117 l. 29-35.

- **Indvandring fra 1980'erne** — s. 119, l. 26-39 (103 ord). *Hvorfor:* What happened after the guest workers: more immigrants and the debate in the 1990s.
  > I 1980’erne kom der flere og flere indvandrere til Danmark, og i større danske byer var der bydele, hvor mange beboere havde en anden etnisk baggrund end dansk. Samtidig havde mange flygtninge og indvandrere svært ved at finde arbejde og få en uddannelse. Mange danskere følte, at nogle indvandrere havde en meget anderledes kultur, og at de ikke altid var gode nok til at lære det danske sprog. I løbet af 1990’erne fyldte diskussionen om indvandrere mere og mere i den offentlige debat. Ønsket om ændringer i udlændinge- og integrationspolitikken betød, at Dansk Folkeparti blev valgt ind i Folketinget første gang i 1998.
- **Stramninger af udlændingepolitikken** — s. 119, l. 39-48 (93 ord). *Hvorfor:* Includes the citizenship conditions - directly relevant for test-takers.
  > Diskussionen fortsatte ind i det nye årtusinde og forskellige danske regeringer strammede udlændingepolitikken. Stramningerne betød blandt andet • at det blev sværere at få udenlandsk familie til landet (familiesammenføring) • at nytilkomne uden arbejde ikke kunne få fuld kontanthjælp men fik et lavere beløb • at man skulle have boet længere tid i Danmark for at kunne få dansk indfødsret (statsborgerskab) og have haft arbejde det meste af tiden, ikke begå alvorlig kriminalitet, lære det danske sprog og have viden om dansk historie, samfund, kultur og om danske værdier som demokrati og ligestilling.

#### `his-besat-land` – Det var Tyskland, der besatte Danmark den 9. april 1940.
Stillet 3×. Viser allerede (læs mere): s. 114 l. 20-21.

- **Samarbejde og modstand 1940-45** — s. 114, l. 21-30 (87 ord). *Hvorfor:* What happened between 9 April 1940 and 5 May 1945.
  > Regeringen besluttede at bøje* sig og var tvunget til at samarbejde med den tyske besættelsesmagt. Den folkelige modstand mod den tyske besættelsesmagt blev efterhånden så stor, at samarbejdet med Tyskland brød* sammen i august 1943. Regeringen indgav sin afskedsbegæring*, og den danske hær blev opløst. Krigens sidste halvandet år var præget* af en voksende modstand mod den tyske besættelsesmagt. Tyskerne og deres danske samarbejdspartnere blev angrebet i forskellige aktioner, hvor der blev brugt våben og sprængstoffer*. Danmark blev officielt befriet af britiske tropper den 5. maj 1945.
- **Ordet 'besættelse'** — s. 148, l. 41-48 (33 ord). *Hvorfor:* Glossary entry that uses exactly this example: 'I 1940 besatte Tyskland Danmark.'
  > • besættelse – det, at et land går ind i et andet land med soldater og overtager det og derefter bestemmer over det land, det har taget (besat). I 1940 besatte Tyskland Danmark.

#### `his-foerste-kvindelige-sm-aar` – Danmark fik sin første kvindelige statsminister i 2011.
Stillet 3×. Viser allerede (læs mere): s. 59 l. 54-55.

- **Statsministre siden 1982** — s. 119, l. 16-19 (31 ord). *Hvorfor:* Same caption: the years of each prime minister.
  > Fire tidligere statsministre, Poul Nyrup Rasmussen (1993-2001), Lars Løkke Rasmussen (2009-11 og 2015-19), Helle Thorning Schmidt (2011-15) og Anders Fogh Rasmussen (2001-09) ankommer til en femte statsministers Poul Schlüters (1982-93) begravelse.
- **Kvinder i politik i dag** — s. 59, l. 45-46 (24 ord). *Hvorfor:* Today almost half of the Folketing are women.
  > I dag er det almindeligt med kvindelige ministre og borgmestre, og 86 ud af 179 medlemmer (48 procent) af det danske Folketing er kvinder.

#### `his-jernbaner` – De første jernbaner i Danmark åbnede i 1840'erne (1800-tallet). Den første gik fra København til Roskilde i 1847.
Stillet 2×. Viser allerede (læs mere): s. 113 l. 27-28.

- **Industrialisering og arbejderklassen** — s. 113, l. 28-38 (57 ord). *Hvorfor:* What the railways led to: factories, the working class and Socialdemokratiet.
  > Og efter 1870 begyndte industrialiseringen også at gå meget hurtigere. De mange nye fabrikker, som normalt lå i byerne, havde brug for meget arbejdskraft. Det betød bl.a., at mange fattige landarbejdere flyttede til byerne for at arbejde. Der opstod dermed en ny befolknings-gruppe: arbejderklassen. Og i løbet af 1870'erne blev der også dannet et politisk arbejderparti, Socialdemokratiet.

#### `his-venstre-1870` – Venstre blev dannet omkring 1870. Det er et af de ældste partier.
Stillet 2×. Viser allerede (læs mere): s. 113 l. 41-42.

- **De gamle partier** — s. 113, l. 40-46 (80 ord). *Hvorfor:* Venstre 1870, Højre -> Konservative 1915-16, Radikale Venstre 1905.
  > Flere af Folketingets nuværende partier opstod i slutningen af 1800-tallet og begyndelsen af 1900-tallet. De fleste bønder samlede sig om partiet Venstre, der blev dannet i 1870, mens godsejerne, de mere velstillede mennesker i byerne og ansatte i politiet, hæren og embedsmænd typisk stemte på Højre, som i 1915-16 blev til Det Konservative Folkeparti. I 1905 meldte en del af Venstres medlemmer sig ud og dannede Det Radikale Venstre, som især husmænd* og akademikere i de større byer stemte på.

#### `his-1814-norge` – Norge var i union med Danmark i over 400 år frem til 1814.
Stillet 2×. Viser allerede (læs mere): s. 110 l. 30-34.

- **Engang en stormagt** — s. 108, l. 12-22 (62 ord). *Hvorfor:* Norway was part of the Danish king's realm.
  > For 400 år siden var det anderledes. Dengang regerede den danske konge over et rige, der blandt andet omfattede Norge, Island og landområder, der nu hører til Tyskland og Sverige. Befolkningen talte således blandt andet både dansk, norsk, tysk og islandsk. Sammenlignet med tidligere, hvor landet var en stormagt i Norden og området omkring Østersøen, er Danmark i dag en mindre nationalstat.
- **Norden i dag** — s. 102, l. 31-35 (53 ord). *Hvorfor:* Today Denmark and Norway cooperate in Nordisk Råd.
  > Norden omfatter landene Danmark, Norge, Sverige, Finland og Island samt de selvstyrende områder Færøerne, Grønland (under Danmark) og Ålandsøerne (under Finland). Danmark samarbejder med de andre nordiske lande. Der samarbejdes bl.a. på det retlige, det kulturelle, det sociale og det økonomiske område. Det nordiske samarbejde foregår bl.a. i Nordisk Råd og Nordisk Ministerråd.

#### `his-befrielse` – Danmark blev befriet den 5. maj 1945. Den 5. maj markeres befrielsen hvert år.
Stillet 2×. Viser allerede (læs mere): s. 114 l. 30, s. 129 l. 36-38.

- **Lys i vinduerne** — s. 129, l. 38-42 (42 ord). *Hvorfor:* The tradition behind 4/5 May - candles in the windows.
  > Da meddelelsen om den tyske kapitulation* kom den 4. maj om aftenen, fjernede* mange mennesker de mørklægningsgardiner*, man skulle bruge under krigen. Og man lod lyset skinne ud gennem alle vinduer. Mange mindes stadig denne aften ved at sætte stearinlys i vinduerne.
- **Modstandsbevægelsen** — s. 114, l. 27-30 (42 ord). *Hvorfor:* The last year and a half of the occupation; liberated by British troops.
  > Krigens sidste halvandet år var præget* af en voksende modstand mod den tyske besættelsesmagt. Tyskerne og deres danske samarbejdspartnere blev angrebet i forskellige aktioner, hvor der blev brugt våben og sprængstoffer*. Danmark blev officielt befriet af britiske tropper den 5. maj 1945.

#### `his-terror-2015` – I 2015 var der et terrorangreb ved Københavns Synagoge (og ved kulturhuset Krudttønden).
Stillet 2×. Viser allerede (læs mere): s. 140 l. 40-45.

- **Hadforbrydelser** — s. 139, l. 58-62 (48 ord). *Hvorfor:* Why attacks on minorities are punished especially hard.
  > Lovene, som forbyder diskrimination, er lavet for at beskytte religiøse, etniske og seksuelle minoriteter mod overgreb og usaglig forskelsbehandling. Og forbrydelser mod minoriteter kan man straffe særlig hårdt, hvis de bliver begået på grund af ofrets etniske oprindelse, religion, seksuelle orientering eller lignende. Sådanne forbrydelser kaldes også hadforbrydelser.
- **Den jødiske minoritet** — s. 140, l. 20-25 (68 ord). *Hvorfor:* Jews in Denmark are particularly exposed to hate crimes.
  > Den jødiske minoritet i Danmark er en gruppe, der er særligt udsat for hadforbrydelser. I perioden 2022-24 registrerede politiet 430 hadforbrydelser mod jøder. Det er et højt tal i betragtning af, at der bor i alt 6-8.000 jøder i Danmark. Næsten hver tredje af de hadforbrydelser, der blev anmeldt i Danmark på grund af ofrets religion, og hver femte af alle hadforbrydelser i Danmark, blev begået mod jøder.

#### `his-aeldste-parti` – Det Konservative Folkeparti er ældre end Dansk Folkeparti.
Stillet 1×. Viser allerede (læs mere): s. 113 l. 40-44, s. 119 l. 37-39.

- **De gamle partier** — s. 113, l. 40-46 (80 ord). *Hvorfor:* Founding dates: Venstre 1870, Konservative 1915-16, Radikale 1905.
  > Flere af Folketingets nuværende partier opstod i slutningen af 1800-tallet og begyndelsen af 1900-tallet. De fleste bønder samlede sig om partiet Venstre, der blev dannet i 1870, mens godsejerne, de mere velstillede mennesker i byerne og ansatte i politiet, hæren og embedsmænd typisk stemte på Højre, som i 1915-16 blev til Det Konservative Folkeparti. I 1905 meldte en del af Venstres medlemmer sig ud og dannede Det Radikale Venstre, som især husmænd* og akademikere i de større byer stemte på.
- **SF dannes** — s. 116, l. 32-34 (27 ord). *Hvorfor:* SF founded 1958-59 - another party-age fact.
  > Danmarks Kommunistiske Parti fik dog aldrig langvarig succes blandt vælgerne, og i 1958-59 meldte en stor gruppe af partiets medlemmer sig ud og dannede Socialistisk Folkeparti (SF).

#### `his-1658` – I 1658 mistede Danmark Skåne (og Halland og Blekinge) til Sverige.
Stillet 1×. Viser allerede (læs mere): s. 111 l. 20-22.

- **Christian 4.** — s. 111, l. 24-31 (49 ord). *Hvorfor:* The famous king of the same period: Rundetårn, Børsen, Rosenborg.
  > Christian 4. er en af de mest kendte konger gennem Danmarks historie. Han var konge i næsten 60 år fra 1588 til 1648. Han er bl.a. kendt for sin store byggelyst. Børsen, Rundetårn og slottet Rosenborg – alle tre i København – hører til Christian 4.s mest kendte bygningsværker.
- **Enevælden indføres** — s. 111, l. 37-53 (104 ord). *Hvorfor:* The loss of Skåne led to absolute monarchy in 1660-61.
  > De mange nederlag og tabet af Skåne, Halland og Blekinge førte til en politisk krise i Danmark. Resultatet af krisen blev, at landet fik en ny styreform i 1660-61. Før den tid var Danmark et valgkongedømme, dvs., at kongen blev valgt af adelen. I stedet for et valgkongedømme fik man i 1660 et arveligt monarki. Kongemagten skulle nu automatisk gå i arv inden for kongehuset. Således var det kongens ældste søn, som arvede titlen som konge. Kongen blev også enevældig. Det skete i 1661. Det betød, at kongen fik hele magten i landet. Han kunne regere uafhængigt af adelen. Enevælden varede frem til 1848.

#### `his-marshall` – Med Marshall-planen fik Danmark økonomisk hjælp fra USA omkring 1950.
Stillet 1×. Viser allerede (læs mere): s. 116 l. 28-31.

- **Marshall-planen og landbruget** — s. 116, l. 31-39 (90 ord). *Hvorfor:* Why the US gave the money and what it changed in Denmark.
  > Og så skulle USA's plan forhindre* kommunismens udbredelse til flere lande. Danmarks Kommunistiske Parti fik dog aldrig langvarig succes blandt vælgerne, og i 1958-59 meldte en stor gruppe af partiets medlemmer sig ud og dannede Socialistisk Folkeparti (SF). Den økonomiske hjælp fra USA var med til at modernisere det danske landbrug efter 2. Verdenskrig. Man fik traktorer, mejetærskere og andre maskiner i stedet for heste. Derfor blev en stor del af arbejdskraften* på landet unødvendig, så mange flyttede fra landet ind til byerne i 1950’erne for at finde arbejde der.

#### `his-roedstroemper` – Rødstrømpebevægelsen var en del af kvindebevægelsen i 1970'erne.
Stillet 1×. Viser allerede (læs mere): s. 118 l. 23-25, s. 153 l. 40-41.

- **Ungdomsoprøret** — s. 117, l. 40-45 (70 ord). *Hvorfor:* The youth revolt the women's movement grew out of.
  > Fra slutningen af 1960’erne gjorde mange unge mennesker oprør* mod samfundets normer og værdier, som de mente var gammeldags. De syntes for eksempel, at en familie kunne være anderledes end en ”kernefamilie” med mor, far og børn, og nye måder at leve sammen på blev mere accepteret: Par kunne bo sammen uden at være gift, og nogle lavede kollektiver, hvor mange voksne og børn boede sammen og havde fælles økonomi.
- **Fri abort og ligeløn** — s. 118, l. 25-34 (122 ord). *Hvorfor:* The two big victories: free abortion 1973, equal pay 1976.
  > En meget vigtig sejr for kvindebevægelsen var, da der i 1973 blev indført fri abort, så kvinder nu selv kunne vælge, om de ville afbryde en graviditet (frem til 12. uge af graviditeten). Den fri abort gælder stadigvæk, og i 2025 er grænsen for den fri abort blevet hævet fra den 12.til den 18. graviditetsuge. En anden vigtig sejr var, da Folketinget i 1976 vedtog en lov om ligeløn, der gav mænd og kvinder ret til den samme løn for det samme arbejde. Før havde det været lovligt, at kvinder tjente mindre end deres mandlige kollegaer. For eksempel tjente kvinder, der lavede sko i 1971, 549 kroner om ugen, mens mænd tjente 630 kroner om ugen, selvom de udførte det samme arbejde.

#### `his-1960erne` – 1960'erne var en tid med høj økonomisk vækst i Danmark.
Stillet 1×. Viser allerede (læs mere): s. 117 l. 9-19.

- **Velfærdsstaten bygges** — s. 117, l. 21-27 (79 ord). *Hvorfor:* The welfare state was built in the 1960s and 70s.
  > Den offentlige sektor velfærd blev også udbygget. Det var især i 1960’erne og 1970’erne, at den danske stat blev til den velfærdsstat, som vi kender i dag. Blandt andet kom der ”Folkepension”, det vil sige pension til alle ældre, og der blev bygget flere vuggestuer, børnehaver og plejehjem. Der var også mange flere, der kunne uddanne sig efter folkeskolen, det vil sige, at de kom på gymnasiet, erhvervsskoler og handelsskoler og uddannede sig fx til sygeplejersker, lærere eller ingeniører.
- **Kvinder på arbejdsmarkedet** — s. 117, l. 29-35 (79 ord). *Hvorfor:* Women at work and guest workers from Turkey, ex-Yugoslavia, Pakistan.
  > Mange kvinder kom i samme periode ud på arbejdsmarkedet. I midten af 1900tallet havde langt de fleste gifte kvinder passet hjem og børn, mens mændene gik på arbejde uden for hjemmet. Fra 1960’erne fik flere kvinder uddannelse og arbejde, mens mange flere børn blev passet i en af de mange nye vuggestuer, børnehaver og fritidshjem. Der blev også hentet arbejdskraft* i udlandet, og mange udlændinge kom til Danmark for at arbejde. De fleste kom fra Tyrkiet, ex-Jugoslavien eller Pakistan.

#### `his-s-regering-1929-82` – Socialdemokratiet sad i regering flest år mellem 1929 og 1982.
Stillet 1×. Viser allerede (læs mere): s. 118 l. 58-61.

- **Borgerlig regering fra 1982** — s. 118, l. 60-65 (57 ord). *Hvorfor:* What came after: Schlüter's government and the years since 1982.
  > Men i 1982 fik Danmark en borgerlig regering, som sad i over ti år (frem til 1993). Siden 1982 har der i alt været 17 år med en socialdemokratisk statsminister og 24 år med en borgerlig statsminister. Vigtige politiske emner gennem 1980’erne var Danmarks økonomiske problemer med underskud på de offentlige budgetter og Danmarks handel med udlandet.
- **Statsministre siden 1982** — s. 119, l. 16-19 (31 ord). *Hvorfor:* Names and years of the prime ministers.
  > Fire tidligere statsministre, Poul Nyrup Rasmussen (1993-2001), Lars Løkke Rasmussen (2009-11 og 2015-19), Helle Thorning Schmidt (2011-15) og Anders Fogh Rasmussen (2001-09) ankommer til en femte statsministers Poul Schlüters (1982-93) begravelse.

#### `his-landboreformer` – Landboreformerne i 1700-tallet gav bønderne frihed til selv at vælge, hvor de ville bo og arbejde (stavnsbåndet blev ophævet i 1788).
Stillet 1×. Viser allerede (læs mere): s. 111 l. 55-62.

- **Gårdene flyttes ud** — s. 112, l. 6-21 (89 ord). *Hvorfor:* The visible result in the landscape - and that farmers still had no political rights.
  > Landboreformerne fik også betydning for, hvor bøndernes gårde lå. Før landboreformerne boede bønderne sammen i landsbyer og dyrkede i fællesskab jorden omkring landsbyen. Nu blev den enkelte gård ofte flyttet fra landsbyen ud på selve den mark, som bonden dyrkede. Dette er stadig synligt i det danske landskab, hvor mange gårde ligger for sig selv midt på den jord, som hører til gården. De nye, selvstændige gårdmænd fik større økonomisk frihed, men de havde som resten af befolkningen ingen politiske rettigheder. Det var stadig kongen, der bestemte det hele.

#### Faktagruppe `fg-aarstal` – Vigtige årstal
Viser allerede (læs mere): s. 110 l. 34-42, s. 111 l. 20-22, s. 111 l. 55-62, s. 113 l. 9-11, s. 113 l. 27, s. 113 l. 41-42, s. 114 l. 20-21, s. 114 l. 30, s. 116 l. 28-31, s. 117 l. 33-35, s. 118 l. 23-25, s. 59 l. 37-43, s. 65 l. 12-19, s. 133 l. 37-40, s. 134 l. 31-43, s. 140 l. 40-45.

- **Kalmarunionen** — s. 110, l. 30-34 (72 ord). *Hvorfor:* 1397-1523 and the union with Norway until 1814.
  > I 1397 blev Danmark, Norge og Sverige samlet i en union. Den fik navnet Kalmarunionen, fordi den blev indgået i den svenske by Kalmar. Af afgørende betydning for dannelsen af denne union var Margrete 1., der havde magten i de tre riger frem til sin død i 1412. De tre lande var samlet i Kalmarunionen frem til 1523. Danmark og Norge fortsatte med at være i union sammen helt frem til 1814.
- **Enevælden 1660-1849** — s. 65, l. 43-47 (53 ord). *Hvorfor:* 1660-61 and 1848-49 in one passage.
  > Danmarks første frie forfatning blev underskrevet i 1849. Inden havde man haft næsten 200 år med enevælde siden 1660-61. Enevælden var en styreform, hvor kongen havde magten alene. Danmarks sidste enevældige konge var Frederik 7. Han blev konge i 1848 og afgav samme år sin enevældige magt. Den nuværende grundlov er fra 1953.
- **Ja til EF i 1973** — s. 118, l. 39-41 (35 ord). *Hvorfor:* 1973 joining the EC.
  > I 1973 blev Danmark medlem af EF (EU). Det skete efter en folkeafstemning, hvor danskerne skulle stemme ja eller nej til, om Danmark skulle være medlem. Et flertal på 63,4 procent stemte ja til EF.

### 4. Geografi og befolkning (`geografi`)

#### `geo-hoejeste-punkt` – Danmarks højeste naturlige punkt (Møllehøj) er ca. 170 meter højt.
Stillet 6×. Viser allerede (læs mere): s. 106 l. 24-25.

- **Et fladt land** — s. 106, l. 25-27 (30 ord). *Hvorfor:* Fields, forest and the rocks on Bornholm.
  > En stor del af landet er dækket* af marker, og nogle steder er der skov. Et af de få steder, hvor der er klipper i Danmark, er på øen Bornholm.
- **Jylland og over 400 øer** — s. 105, l. 39-41 (32 ord). *Hvorfor:* Basic geography: peninsula, islands, Sjælland the biggest, 7,300 km coast.
  > Danmark består af halvøen Jylland og over 400 større og mindre øer. Den største ø er Sjælland. De mange øer betyder, at Danmark har en meget lang kystlinje – omkring 7.300 km.

#### `geo-lillebaelt` – Lillebælt er farvandet mellem Jylland og Fyn.
Stillet 5×. Viser allerede (læs mere): s. 105 l. 47.

- **Danmarks andre farvande** — s. 105, l. 43-45 (36 ord). *Hvorfor:* Nordsøen/Vesterhavet, Skagerrak, Kattegat - Kattegat is the usual distractor.
  > Det største farvand* omkring Danmark er Nordsøen, som i Danmark også kaldes for Vesterhavet, fordi det ligger vest for Danmark. Nord for Danmark ligger Skagerrak. Sydøst for Skagerrak og nord for Sjælland og Fyn ligger Kattegat.
- **Broerne** — s. 105, l. 55-61 (43 ord). *Hvorfor:* Which bridge crosses which water.
  > Der er mange broer og tunneller i Danmark. Nogle af de vigtigste er: • Lillebæltsbroerne, der forbinder Jylland og Fyn over farvandet Lillebælt • Storebæltsforbindelsen, der forbinder Fyn og Sjælland over farvandet Storebælt • Øresundsforbindelsen, der forbinder Danmark og Sverige over farvandet Øresund

#### `geo-oresund` – Øresund er farvandet mellem Sjælland (København) og Sverige.
Stillet 4×. Viser allerede (læs mere): s. 105 l. 48-49.

- **Danmarks andre farvande** — s. 105, l. 43-45 (36 ord). *Hvorfor:* The other waters, so the learner can rule out distractors.
  > Det største farvand* omkring Danmark er Nordsøen, som i Danmark også kaldes for Vesterhavet, fordi det ligger vest for Danmark. Nord for Danmark ligger Skagerrak. Sydøst for Skagerrak og nord for Sjælland og Fyn ligger Kattegat.
- **Betaling på broerne** — s. 39, l. 9-10 (25 ord). *Hvorfor:* Øresundsbroen is a toll bridge.
  > Det er gratis at køre på veje og broer i Danmark. På to broer, Øresundsbroen og Storebæltsbroen, skal man dog betale for at køre over.

#### `geo-storebaelt` – Storebælt er farvandet mellem Fyn og Sjælland.
Stillet 4×. Viser allerede (læs mere): s. 105 l. 47-48.

- **Danmarks andre farvande** — s. 105, l. 43-45 (36 ord). *Hvorfor:* The other waters, so the learner can rule out distractors.
  > Det største farvand* omkring Danmark er Nordsøen, som i Danmark også kaldes for Vesterhavet, fordi det ligger vest for Danmark. Nord for Danmark ligger Skagerrak. Sydøst for Skagerrak og nord for Sjælland og Fyn ligger Kattegat.
- **Betaling på broerne** — s. 39, l. 9-10 (25 ord). *Hvorfor:* Storebæltsbroen and Øresundsbroen are the only toll bridges.
  > Det er gratis at køre på veje og broer i Danmark. På to broer, Øresundsbroen og Storebæltsbroen, skal man dog betale for at køre over.

#### `geo-aarhus` – Aarhus er Danmarks næststørste by. Den ligger i Jylland (Østjylland).
Stillet 4×. Viser allerede (læs mere): s. 106 l. 43-44.

- **Byer fra vikingetiden** — s. 109, l. 26-28 (22 ord). *Hvorfor:* Aarhus, Odense and Aalborg grew up in the Viking Age.
  > Der opstod flere byer (Odense, Aalborg og Aarhus), og de store, runde vikingeborge, fx Trelleborg og Fyrkat, er også fra denne tid.
- **ARoS i Aarhus** — s. 126, l. 6-12 (49 ord). *Hvorfor:* A cultural landmark in Aarhus mentioned in the book.
  > En anden kunstner er dansk-islandske Olafur Eliasson (født 1967). Et af hans mest kendte værker er ’Your rainbow panorama’ (Din regnbueudsigt) (2011) oven på kunstmuseet ARoS i Aarhus, som er en 150 meter lang cirkelformet gangbro i glas, hvor man kan se ud over Aarhus i alle regnbuens farver.

#### `geo-esbjerg` – Esbjerg er Danmarks femtestørste by. Den ligger i Vestjylland.
Stillet 3×. Viser allerede (læs mere): s. 106 l. 46-47.

- **Vestligste punkt** — s. 106, l. 18-19 (18 ord). *Hvorfor:* Blåvands Huk, near Esbjerg in West Jutland.
  > Det vestligste punkt i Danmark er Blåvands Huk i Vestjylland. Blåvands Huk ligger ud til farvandet Nordsøen (Vesterhavet).

#### `geo-sydligste` – Danmarks sydligste punkt er Gedser Odde på øen Falster.
Stillet 3×. Viser allerede (læs mere): s. 105 l. 65-66.

- **Vestligste og østligste punkt** — s. 106, l. 18-22 (34 ord). *Hvorfor:* Completes the four extreme points of Denmark.
  > Det vestligste punkt i Danmark er Blåvands Huk i Vestjylland. Blåvands Huk ligger ud til farvandet Nordsøen (Vesterhavet). Det østligste punkt i Danmark udgøres af øgruppen Ertholmene, som ligger øst for Bornholm i Østersøen.

#### `geo-landbrug` – Ca. 60 procent af Danmarks areal er landbrug.
Stillet 2×. Viser allerede (læs mere): s. 146 l. 9-10.

- **Grøn trepart** — s. 146, l. 14-22 (94 ord). *Hvorfor:* The 2024 plan: 15 % of farmland to become nature.
  > Derfor har regeringen, kommunerne og en række fagforeninger, miljøorganisationer og organisationer fra erhvervslivet indgået et samarbejde ved navn "Den Grønne Trepart". Parterne bag Den Grønne Trepart aftalte i 2024 en stor og samlet plan for at skabe mere natur i Danmark samt renere vand i søer, åer og i havet. Og for at omstille landbruget, så det forurener mindre. Det er aftalt, at cirka 15 procent af Danmarks landbrugsjord, som er større end Fyn og Bornholm tilsammen, skal være natur, ved at der plantes ny skov, laves nye moser, sumpe, åer og anden natur.
- **CO2-afgift på landbruget** — s. 146, l. 24-26 (41 ord). *Hvorfor:* First country with a CO2 tax on farming.
  > Med aftalen indfører Danmark også som det første land i verden en direkte afgift på landbrugets udledning af CO2 – den såkaldte "CO2-afgift" – så landmænd skal betale for udledning af CO2 fra deres køer, grise, får, høns og øvrige dyr.

#### `geo-aalborg` – Aalborg er Danmarks fjerdestørste by. Den ligger i Nordjylland.
Stillet 2×. Viser allerede (læs mere): s. 106 l. 45-46.

- **Byer fra vikingetiden** — s. 109, l. 26-28 (22 ord). *Hvorfor:* Aalborg is one of the old Viking-Age towns.
  > Der opstod flere byer (Odense, Aalborg og Aarhus), og de store, runde vikingeborge, fx Trelleborg og Fyrkat, er også fra denne tid.

#### `geo-grenen` – Grenen ved Skagen er Danmarks nordligste punkt.
Stillet 2×. Viser allerede (læs mere): s. 105 l. 63-64.

- **Vestligste og østligste punkt** — s. 106, l. 18-22 (34 ord). *Hvorfor:* Completes the four extreme points of Denmark.
  > Det vestligste punkt i Danmark er Blåvands Huk i Vestjylland. Blåvands Huk ligger ud til farvandet Nordsøen (Vesterhavet). Det østligste punkt i Danmark udgøres af øgruppen Ertholmene, som ligger øst for Bornholm i Østersøen.
- **Skagensmalerne** — s. 123, l. 56-64 (43 ord). *Hvorfor:* Skagen is also known for the painters (P.S. Krøyer).
  > I 1880’erne og 1890’erne var han med i en gruppe af kunstnere, som boede i Skagen i Nordjylland for at arbejde. De malerier, som han malede i Skagen, er meget berømte i Danmark, og en række af dem kan ses på Skagens Museum.

#### `geo-odense` – Odense er Danmarks tredjestørste by. Den ligger på Fyn.
Stillet 2×. Viser allerede (læs mere): s. 106 l. 44-45.

- **H.C. Andersen fra Odense** — s. 123, l. 36-37 (21 ord). *Hvorfor:* Links Odense to H.C. Andersen.
  > H.C. Andersen blev født i Odense som søn af en fattig skomager. Han flyttede til København, da han var 14 år.
- **Byer fra vikingetiden** — s. 109, l. 26-28 (22 ord). *Hvorfor:* Odense is one of the old Viking-Age towns.
  > Der opstod flere byer (Odense, Aalborg og Aarhus), og de store, runde vikingeborge, fx Trelleborg og Fyrkat, er også fra denne tid.

#### `geo-lillebaeltsbro` – Lillebæltsbroen forbinder Fyn og Jylland.
Stillet 1×. Viser allerede (læs mere): s. 105 l. 57.

- **Broerne** — s. 105, l. 55-61 (43 ord). *Hvorfor:* All three main connections in one list.
  > Der er mange broer og tunneller i Danmark. Nogle af de vigtigste er: • Lillebæltsbroerne, der forbinder Jylland og Fyn over farvandet Lillebælt • Storebæltsforbindelsen, der forbinder Fyn og Sjælland over farvandet Storebælt • Øresundsforbindelsen, der forbinder Danmark og Sverige over farvandet Øresund

#### `geo-indbyggere` – Danmark har ca. 6 millioner indbyggere.
Stillet 1×. Viser allerede (læs mere): s. 106 l. 36, s. 108 l. 6-10.

- **Byer og hovedstadsområdet** — s. 106, l. 37-41 (45 ord). *Hvorfor:* Where the six million live; about a third in the capital area.
  > De fleste mennesker bor i byerne. Hovedstaden København er den største by og ligger på Sjælland. I dag bor cirka to millioner mennesker (cirka en tredjedel af Danmarks befolkning) i hovedstadsområdet, det vil sige i selve København og i de kommuner, der ligger omkring København.
- **Flere ældre** — s. 120, l. 28-32 (67 ord). *Hvorfor:* Population trend: more elderly, fewer births.
  > Et af de største problemer for Danmark og de fleste andre europæiske lande er, at der bliver mange flere ældre i forhold til antallet af dem, der er i den alder (15 til 64 år), hvor man typisk arbejder og betaler skat. Det skyldes for det første at befolkningen lever længere, så vi bliver ældre og ældre, men også, at der bliver født færre børn end før.

#### `geo-areal` – Danmark (uden Grønland og Færøerne) er ca. 43.000 km².
Stillet 1×. Viser allerede (læs mere): s. 105 l. 36-37.

- **Jylland og over 400 øer** — s. 105, l. 39-41 (32 ord). *Hvorfor:* What the 43,000 km² consist of.
  > Danmark består af halvøen Jylland og over 400 større og mindre øer. Den største ø er Sjælland. De mange øer betyder, at Danmark har en meget lang kystlinje – omkring 7.300 km.
- **Engang en stormagt** — s. 108, l. 12-22 (62 ord). *Hvorfor:* 400 years ago the realm was much larger.
  > For 400 år siden var det anderledes. Dengang regerede den danske konge over et rige, der blandt andet omfattede Norge, Island og landområder, der nu hører til Tyskland og Sverige. Befolkningen talte således blandt andet både dansk, norsk, tysk og islandsk. Sammenlignet med tidligere, hvor landet var en stormagt i Norden og området omkring Østersøen, er Danmark i dag en mindre nationalstat.

#### `geo-indvandrere` – Ca. 17 procent af befolkningen (ca. 1 million) er indvandrere eller efterkommere (læremateriale 2026).
Stillet 1×. Viser allerede (læs mere): s. 106 l. 36-37.

- **Indvandring fra 1980'erne** — s. 119, l. 26-31 (68 ord). *Hvorfor:* Historical background for the immigrant share.
  > I 1980’erne kom der flere og flere indvandrere til Danmark, og i større danske byer var der bydele, hvor mange beboere havde en anden etnisk baggrund end dansk. Samtidig havde mange flygtninge og indvandrere svært ved at finde arbejde og få en uddannelse. Mange danskere følte, at nogle indvandrere havde en meget anderledes kultur, og at de ikke altid var gode nok til at lære det danske sprog.
- **Oplevet diskrimination** — s. 139, l. 45-56 (77 ord). *Hvorfor:* What studies show about discrimination of people with non-Western background.
  > Selvom idealer om lighed og demokrati har en lang tradition i Danmark, oplever nogle alligevel diskrimination. Undersøgelser viser, at næsten halvdelen af alle med ikke-vestlig indvandrerbaggrund i Danmark har oplevet at blive diskrimineret på en eller anden måde på grund af deres etniske oprindelse. Og studier viser, at ansøgere med visse udenlandske navne har sværere ved at få en lejebolig eller komme til jobsamtale, også selvom de er lige så kvalificerede som ansøgerne med typisk danske navne.

#### `geo-region-hovedstaden` – Region Hovedstaden er den største region. Prøven i 2018 sagde ca. 1,7 millioner indbyggere; i dag er det ca. 1,9 millioner.
Stillet 1×. Viser allerede (læs mere): s. 80 l. 9-11, s. 80 l. 22-23, s. 106 l. 38-41.

- **Hvad regionerne laver** — s. 80, l. 25-27 (14 ord). *Hvorfor:* What a region is responsible for.
  > Regionerne har bl.a. ansvar for sundhedsområdet. Det er regionerne, der driver* de offentlige sygehuse.

#### Faktagruppe `fg-farvande` – Farvandene mellem landsdelene
Viser allerede (læs mere): s. 105 l. 43-61.

- **Hvor Skagerrak og Kattegat mødes** — s. 105, l. 63-64 (26 ord). *Hvorfor:* Kattegat and Skagerrak meet at Grenen.
  > Det nordligste punkt i Danmark kaldes for Grenen, og det ligger nordøst for byen Skagen i Nordjylland. Ved Grenen mødes de to farvande Skagerrak og Kattegat.
- **Betaling på broerne** — s. 39, l. 9-10 (25 ord). *Hvorfor:* Toll on Storebælt and Øresund.
  > Det er gratis at køre på veje og broer i Danmark. På to broer, Øresundsbroen og Storebæltsbroen, skal man dog betale for at køre over.

#### Faktagruppe `fg-byer` – De største byer og verdenshjørnerne
Viser allerede (læs mere): s. 106 l. 38-47, s. 105 l. 63-66.

- **Vestligste og østligste punkt** — s. 106, l. 18-22 (34 ord). *Hvorfor:* The other two extreme points.
  > Det vestligste punkt i Danmark er Blåvands Huk i Vestjylland. Blåvands Huk ligger ud til farvandet Nordsøen (Vesterhavet). Det østligste punkt i Danmark udgøres af øgruppen Ertholmene, som ligger øst for Bornholm i Østersøen.

### 5. Arbejdsmarked og erhverv (`arbejde`)

#### `arb-tillidsrepraesentant` – Tillidsrepræsentanten vælges af fagforeningens medlemmer blandt medarbejderne – på et møde (klubmøde), hvor arbejdsgiveren ikke er med.
Stillet 7×. Viser allerede (læs mere): s. 25 l. 42-46, s. 25 l. 58-63.

- **Tillidsrepræsentantens rolle** — s. 25, l. 48-57 (59 ord). *Hvorfor:* What the representative does - and that no one may force union membership.
  > Tillidsrepræsentanter repræsenterer de ansatte over for ledelsen, fx i forbindelse med lønforhandlinger. De ansatte kan også få råd og vejledning af tillidsrepræsentanten, fx om overarbejde eller forholdet til ledelsen. En tillidsrepræsentant – eller kollegerne på arbejdspladsen – kan ifølge loven ikke tvinge* folk til at være medlem af en bestemt fagforening eller til at være medlem af en fagforening.
- **Fyring og tillidsrepræsentant** — s. 28, l. 35-39 (59 ord). *Hvorfor:* The employer often has to talk to the representative before a dismissal.
  > En arbejdsgiver skal i de fleste tilfælde have en saglig* og reel grund til at fyre en ansat, fx at man ikke er egnet til jobbet, at der er samarbejdsproblemer, eller at der er forhold i virksomheden, der kræver fyring, fx besparelser. Hvis der er en tillidsrepræsentant på arbejdspladsen, skal arbejdsgiveren ofte tale med ham eller hende om fyringen*.

#### `arb-vestas` – Vestas producerer vindmøller.
Stillet 7×. Viser allerede (læs mere): s. 32 l. 40-41.

- **Vindmølleindustrien** — s. 32, l. 36-38 (32 ord). *Hvorfor:* History: Gedser-møllen and Tvind-møllen.
  > Danmark er hjemlandet for den moderne vindmølleindustri, hvor den såkaldte Gedser-mølle (fra 1957) og Tvind-møllen (bygget 1975-78) gav inspiration til en hel folkebevægelse af små vindmøllefabrikanter fra slutningen af 1970’erne og frem.
- **Grøn produktion** — s. 32, l. 40-42 (19 ord). *Hvorfor:* Denmark's strong 'green' position.
  > I det hele taget har Danmark en stærk position, når det gælder ”grøn” produktion, herunder energibesparelser, affaldshåndtering, genbrug mv.

#### `arb-novo` – Novo Nordisk producerer medicin (fx insulin).
Stillet 6×. Viser allerede (læs mere): s. 32 l. 27-29.

- **Høreapparater og vedvarende energi** — s. 32, l. 31-34 (46 ord). *Hvorfor:* Other world-leading Danish industries (hearing aids).
  > Danmark fremstiller også over en tredjedel af verdens høreapparater. De tre største danske producenter GN Store Nord (GN Resound), William Demant (Oticon) og Widex udgør tre af de fem største høreapparat-producenter i verden. Danmark er et af verdens førende lande inden for vedvarende energi og energibesparelser.
- **Andre internationale virksomheder** — s. 32, l. 44-45 (15 ord). *Hvorfor:* Rockwool, Grundfos, Danfoss, Velux - likely distractors.
  > Selv internationale virksomheder omfatter bl.a. Rockwool (isolering), Grundfos (pumper mv.), Danfoss (termostater) og Velux (vinduer).

#### `arb-37-timer` – Den normale arbejdstid ved fuldtid er 37 timer om ugen.
Stillet 6×. Viser allerede (læs mere): s. 27 l. 9-10, s. 27 l. 28.

- **Skifteholdsarbejde og overenskomst** — s. 27, l. 13-23 (23 ord). *Hvorfor:* Working hours are agreed in collective bargaining, not by law.
  > Ved skifteholdsarbejde og fast natarbejde er arbejdstiden ofte lidt lavere. Arbejdstidens længde aftales ved de kollektive forhandlinger mellem de ansattes og arbejdsgivernes organisationer.
- **Ingen lovbestemt mindsteløn** — s. 23, l. 49-51 (32 ord). *Hvorfor:* Folketinget decides neither weekly hours nor a minimum wage.
  > Det er altså ikke Folketinget, der bestemmer fx den ugentlige arbejdstid. Folketinget bestemmer heller ikke, at der skal være en lovbestemt mindsteløn på det danske arbejdsmarked. Det afhænger af de kollektive overenskomster.

#### `arb-akasse-dagpenge` – Man skal være medlem af en a-kasse for at få dagpenge, hvis man bliver arbejdsløs.
Stillet 5×. Viser allerede (læs mere): s. 23 l. 18-21, s. 28 l. 60-63.

- **A-kassen og staten** — s. 29, l. 10-14 (60 ord). *Hvorfor:* The state co-finances; you can join an a-kasse without a union.
  > Arbejdsløshedskasserne støttes økonomisk af staten, så en del af dagpengene betales ikke blot af kontingentet, men også af offentlige midler, dvs. via skatterne. De fleste a-kasser er knyttet til en fagforening, men man kan godt være medlem af en arbejdsløshedskasse, selv om man ikke er medlem af en fagforening. Der er også a-kasser, der ikke er knyttet til bestemte fagforeninger.
- **Pligter som ledig** — s. 29, l. 20-27 (64 ord). *Hvorfor:* To get dagpenge you must be available and actively seek work.
  > Hvis man er medlem af en arbejdsløshedskasse, har man normalt ret til dagpenge i en periode, hvis man mister sit arbejde. Man skal dog opfylde et krav om at have arbejdet forud for ledighed, og man skal stå til rådighed for arbejdsmarkedet. Det betyder blandt andet, at man skal sige ja, hvis man bliver tilbudt et arbejde, og at man aktivt skal søge job.
- **Uden a-kasse: kontanthjælp** — s. 29, l. 37-43 (88 ord). *Hvorfor:* What happens if you are not insured.
  > Hvis man mister sit arbejde, men ikke er medlem af en a-kasse, kan man få økonomisk hjælp fra kommunen. Det kan for eksempel være kontanthjælp. Det kræver dog, at man lever op til nogle betingelser – fx at man ikke kan forsøge sig selv eller blive forsørget af sin ægtefælle. Disse ydelser er normalt lavere end dagpenge. Og ligesom med dagpenge får man en ”Min Plan”, og man har pligt til at stå til rådighed for arbejdsmarkedet og pligt til at deltage i den indsats, som kommunen tilbyder.

#### `arb-overenskomst` – En kollektiv overenskomst er en aftale mellem fagforeninger og arbejdsgivere (fx DA og LO/FH) om løn, arbejdstid og ferie.
Stillet 5×. Viser allerede (læs mere): s. 22 l. 35-37, s. 23 l. 34-44.

- **Den danske model** — s. 22, l. 28-33 (59 ord). *Hvorfor:* Most rules are agreed by the parties, a system going back to 1899.
  > I nogle lande er der tradition for, at det mest er parlamentet og regeringen, som bestemmer, hvordan arbejdsmarkedet skal fungere. Men sådan er det ikke i Danmark. Her er det kun få regler om ansættelsesforhold, som er bestemt i lovgivningen. De fleste regler er aftalt mellem arbejdsmarkedets parter – fagforeningerne og arbejdsgiverorganisationerne. Dette system går helt tilbage til 1899.
- **Fredspligt, strejke og lockout** — s. 22, l. 39-56 (131 ord). *Hvorfor:* The words strike, lockout and fredspligt.
  > Begge parter skal rette sig efter overenskomsten, og der er ”fredspligt” – ingen strejker eller lockout, så længe overenskomsten gælder. Der findes et helt særligt system uden for de almindelige domstole til at afgøre overtrædelser (Arbejdsretten og faglige voldgiftsretter*). Hvis de ikke kan blive enige om at aftale en overenskomst, har de to parter forskellige muligheder: Fagforeningerne kan fx organisere strejker. Det betyder, at medlemmer standser arbejdet, indtil der er indgået en overenskomst. Arbejdsgiverne kan fx lave lockout. Det betyder, at de ansatte, der er medlem af en fagforening, ikke må komme på arbejde, før der er indgået en overenskomst. Arbejdsgiverne udbetaler ikke løn til de ansatte, der strejker, eller til ansatte, der er ramt af lockout. Oftest bliver parterne dog enige om en overenskomst uden at anvende strejke eller lockout.
- **Når staten griber ind** — s. 24, l. 14-38 (110 ord). *Hvorfor:* Holidays by law, and Folketinget ending the 2021 nurses' strike.
  > Det sker dog, at staten gennem lovgivning bestemmer forholdene på arbejdsmarkedet. Fx er fem ugers ferie bestemt ved lov. Det sker også, at staten skrider ind, hvis arbejdsgiverne og de ansattes organisationer ikke kan blive enige, når de forhandler nye overenskomster. Når de to parter ikke kan blive enige, kan det medføre langvarige strejker eller lockout. Der har i Danmark været flere tilfælde, hvor Folketinget har stoppet en strejke eller en lockout ved at vedtage en lov, der bestemmer overenskomsten. Det skete for eksempel i 2021, hvor mange sygeplejersker strejkede, og hvor Folketinget til sidst, efter at strejken havde varet i over to måneder, bestemte, hvilken aftale der skulle gælde.

#### `arb-ferie` – Lønmodtagere har normalt ret til 5-6 ugers ferie om året.
Stillet 4×. Viser allerede (læs mere): s. 27 l. 43-47.

- **Hvornår man holder ferie** — s. 27, l. 53-58 (58 ord). *Hvorfor:* Three weeks in a row between 1 May and 30 September.
  > Normalt aftaler man med arbejdsgiveren, hvornår man skal holde ferie. Normalt har man ret til at holde tre ugers ferie i sammenhæng i perioden mellem den 1. maj og den 30. september. Når man får et nyt arbejde, kan man holde den ferie, man har optjent hos en tidligere arbejdsgiver, hvis man ikke har nået at afholde den.
- **Ferie er bestemt ved lov** — s. 24, l. 14-20 (19 ord). *Hvorfor:* One of the few labour rules set by law.
  > Det sker dog, at staten gennem lovgivning bestemmer forholdene på arbejdsmarkedet. Fx er fem ugers ferie bestemt ved lov.

#### `arb-lego` – LEGO fremstiller legetøj (byggeklodser).
Stillet 4×. Viser allerede (læs mere): s. 32 l. 23-25.

- **Små og mellemstore virksomheder** — s. 32, l. 9-23 (63 ord). *Hvorfor:* Danish industry has traditionally been small and medium-sized companies.
  > Dansk industri har traditionelt været præget af mange små og mellemstore virksomheder. Danmark har ikke haft særligt mange store industrivirksomheder, sammenlignet med de fleste andre lande i Vesteuropa. De små og mellemstore virksomheder har været gode til at finde nicher* og hurtige til at omstille sig. Men de store virksomheder er blevet større. Danmark har mange virksomheder, der er kendt i hele verden.
- **Andre internationale virksomheder** — s. 32, l. 44-45 (15 ord). *Hvorfor:* Other famous companies and their products.
  > Selv internationale virksomheder omfatter bl.a. Rockwool (isolering), Grundfos (pumper mv.), Danfoss (termostater) og Velux (vinduer).

#### `arb-gravid` – En arbejdsgiver må ikke fyre en kvinde, fordi hun er gravid.
Stillet 4×. Viser allerede (læs mere): s. 28 l. 43-44.

- **Ved jobsamtalen** — s. 26, l. 43-55 (97 ord). *Hvorfor:* The employer may not ask about pregnancy, health history or religion.
  > Når man søger et job, må arbejdsgiveren ikke spørge til ens helbred og antal af sygedage i tidligere job, eller om man er gravid eller planlægger at få børn. Arbejdsgiveren må dog gerne spørge til helbreds-forhold, der har betydning for det arbejde, man skal lave. Arbejdsgiveren må fx godt spørge, om man har haft dårlig ryg, hvis man søger et job i bygge- og anlægsbranchen. Den person, som søger jobbet, har omvendt pligt til at oplyse om helbredsforhold, der kan have betydning for jobbet. Arbejdsgiveren må heller ikke spørge om folks religion, når de søger et job.
- **Forbud mod forskelsbehandling** — s. 58, l. 41-44 (45 ord). *Hvorfor:* The general ban on discrimination when hiring.
  > En arbejdsgiver må derfor ikke som udgangspunkt afvise at ansætte personer på grund af fx køn, handicap eller etnisk baggrund. I særlige tilfælde må arbejdsgiveren stille krav* til påklædningen, fx at man har noget bestemt tøj på af hensyn til hygiejne og sikkerhed på arbejdspladsen.

#### `arb-fagforening-pris` – Det koster penge (kontingent) at være medlem af en fagforening.
Stillet 4×. Viser allerede (læs mere): s. 24 l. 57-58.

- **Hvor mange er medlem** — s. 24, l. 60-63 (54 ord). *Hvorfor:* 68 % are members today; it was 5 out of 6 in 1990.
  > I Danmark er der en lang tradition for, at en stor del af de ansatte er medlem af en fagforening. I Danmark er nu omkring to ud af tre (68 procent) lønmodtagere medlem af en fagforening. Andelen var i 1990 helt oppe omkring fem ud af seks, så det er gået en del tilbage.
- **Tre store fagforeninger** — s. 25, l. 23-34 (60 ord). *Hvorfor:* HK, FOA and 3F and who they represent.
  > Fagforeningen HK repræsenterer primært personer, der arbejder med handel eller kontor. Det kan fx være butiksansatte, laboranter, sekretærer, receptionister og klinikassistenter. FOA repræsenterer primært personer ansat i hjemmeplejen, SOSU-assistenter, brandmænd, kantinepersonale m.fl. 3F repræsenterer typisk ansatte i industrien og ansatte, der arbejder med transport og byggeri – fx svejsere, chauffører, murere og tømrere– men også rengøringsassistenter og andre ufaglærte arbejdere.

#### `arb-samarbejdsudvalg` – Et samarbejdsudvalg er et samarbejde i en virksomhed mellem ledelsen og de ansatte.
Stillet 4×. Viser allerede (læs mere): s. 27 l. 63, s. 28 l. 10.

- **Arbejdsmiljørepræsentanten** — s. 28, l. 12-25 (65 ord). *Hvorfor:* The other workplace representative, also protected against dismissal.
  > På større arbejdspladser skal man desuden vælge en arbejdsmiljørepræsentant, der i samarbejde med ledelsen tager sig af arbejdsmiljøet, dvs. de ansattes fysiske og psykiske sikkerhed og sundhed på arbejdspladsen. Arbejdsmiljørepræsentanten vælges af medarbejderne på et møde, hvor ledelsen ikke deltager. Ligesom tillidsrepræsentanter er arbejdsmiljørepræsentanter beskyttet i deres ansættelse. Det betyder, at arbejdsgiveren ikke kan fyre en arbejdsmiljørepræsentant, fordi arbejdsgiveren og arbejdsmiljørepræsentanten er uenige om arbejdsmiljøet.
- **Uformel medbestemmelse** — s. 28, l. 27-30 (40 ord). *Hvorfor:* Much influence in Danish workplaces is informal.
  > Meget medbestemmelse på arbejdspladser i Danmark foregår uformelt*. Hvis medarbejderne har noget, de er utilfredse med eller vil foreslå, taler de normalt med deres nærmeste chef om det. Dette er mere udbredt i Danmark end i de fleste andre lande.

#### `arb-deltid` – En medarbejder har ikke altid krav på deltid – og arbejdsgiveren kan heller ikke bare forlange, at man går på deltid.
Stillet 3×. Viser allerede (læs mere): s. 27 l. 34-38.

- **Hvad er deltid** — s. 27, l. 25-32 (44 ord). *Hvorfor:* Definition; more women than men work part-time.
  > Det kaldes ”nedsat tid” eller ”deltid”, hvis man arbejder mindre end den almindelige arbejdstid på normalt 37 timer om ugen. På nogle områder er det almindeligt at have deltidsarbejde, fx blandt sygeplejersker eller butiksansatte. Der er flere kvinder end mænd, der arbejder på deltid.

#### `arb-landmaend` – Antallet af landmænd er faldet meget siden 1960.
Stillet 2×. Viser allerede (læs mere): s. 31 l. 28-33.

- **Andelsbevægelsen, Arla og Danish Crown** — s. 31, l. 35-44 (81 ord). *Hvorfor:* Organic farming and the cooperative dairies and slaughterhouses.
  > I dag er landbrugene meget store og højeffektive. Omkring 11 procent af landbrugsarealet drives økologisk. Danmark har fortsat en stor fødevareindustri. Fra 1880’erne oprettede landmændene talrige små selvstændige mejerier og slagterier. Det var andelsselskaber, ejet af landmændene. I andelsselskaberne har hver landmand én stemme, uanset hvor meget mælk eller hvor mange dyr, de leverede. De allerfleste mejerier og slagterier er nu lagt sammen i store koncerner, hhv. Arla og Danish Crown. De eksporterer til hele verden. Men de er stadig andelsselskaber.
- **Landbruget fylder** — s. 146, l. 9-12 (47 ord). *Hvorfor:* Farming covers 60 % of Denmark's area.
  > En del af udslippet af drivhusgasser kommer også fra landbruget, som udgør 60 procent af Danmarks areal. Det gør Danmark til et af de lande i verden, hvor den største andel af jorden er landbrugsjord. Omstilling af landbruget har derfor stor betydning for Danmarks indsats for klimaet.

#### `arb-vindenergi` – Vindenergi er den grønne energi, Danmark producerer mest af. Den dækker den største del af Danmarks el-forbrug.
Stillet 2×. Viser allerede (læs mere): s. 144 l. 54-57.

- **Vedvarende energi** — s. 144, l. 50-52 (16 ord). *Hvorfor:* Renewables covered 50 % of energy use in 2025 (6 % in 1990).
  > Vedvarende energi dækkede i 2025 50 procent af energiforbruget i Danmark mod seks procent i 1990.
- **Energiøer** — s. 144, l. 59-62 (44 ord). *Hvorfor:* Next step: two energy islands in the 2030s.
  > Danmark arbejder videre på at udvikle vindenergien. Som det første land i verden har Danmark besluttet at bygge to energiøer som skal opføres i 2030'erne. Den ene energiø skal ligge ved Bornholm. Den anden skal ligge i Nordsøen cirka 80 km fra Jyllands vestkyst.

#### `arb-fagforening-fyre` – En arbejdsgiver må ikke fyre en ansat, fordi han eller hun melder sig ind i en fagforening.
Stillet 2×. Viser allerede (læs mere): s. 25 l. 11-13, s. 28 l. 46-48.

- **Medlemskab er frivilligt** — s. 25, l. 6-11 (39 ord). *Hvorfor:* Neither employer nor colleagues may force you into a union.
  > Men det er ikke et krav at være medlem af en fagforening. Det er frivilligt. Hverken arbejdsgiveren eller kollegerne må tvinge en ansat til at være medlem af en fagforening eller til at være medlem af en bestemt fagforening.
- **Heller ikke en bestemt fagforening** — s. 28, l. 47-55 (33 ord). *Hvorfor:* Same protection for not being in the same union as colleagues.
  > En ansat må heller ikke fyres, fordi han eller hun ikke er medlem af den samme fagforening som kollegerne på en arbejdsplads, ligesom arbejdsgiveren heller ikke kan forlange medlemskab af en bestemt fagforening.

#### `arb-akasse-procent` – Prøvens svar: ca. 70 % af lønmodtagerne er medlem af en a-kasse. Læremateriale 2026 siger kun, at de fleste er medlem af en a-kasse – og at 68 % er medlem af en fagforening.
Stillet 2×. Viser allerede (læs mere): s. 28 l. 60-63, s. 24 l. 60-63.

- **A-kassen og staten** — s. 29, l. 10-14 (60 ord). *Hvorfor:* How the a-kasse is financed, and that it is separate from the union.
  > Arbejdsløshedskasserne støttes økonomisk af staten, så en del af dagpengene betales ikke blot af kontingentet, men også af offentlige midler, dvs. via skatterne. De fleste a-kasser er knyttet til en fagforening, men man kan godt være medlem af en arbejdsløshedskasse, selv om man ikke er medlem af en fagforening. Der er også a-kasser, der ikke er knyttet til bestemte fagforeninger.

#### `arb-beskaeftigelse` – Ca. 73 % af borgerne mellem 16 og 66 år har et lønmodtagerarbejde – altså ca. tre ud af fire.
Stillet 1×. Viser allerede (læs mere): s. 22 l. 58-59, s. 120 l. 28-30.

- **Reformer for flere i arbejde** — s. 120, l. 37-43 (87 ord). *Hvorfor:* Why politicians want more people in work.
  > Desuden starter de fleste i dag arbejdslivet i en senere alder, fordi de uddanner sig i flere år end tidligere. Derfor er der de sidste cirka 35 år lavet en række politiske reformer, der skal få flere ud på arbejdsmarkedet. For eksempel skal man være ældre end tidligere for at gå på pension, og perioden, hvor man kan få økonomisk hjælp fra arbejdsløshedskassen (a-kassen), hvis man bliver arbejdsløs, er blevet kortere. Og så er skatten på arbejdsindkomst blevet sænket for at gøre det mere attraktivt at arbejde.

#### `arb-ligeloen` – Kvinder har ifølge loven ret til samme løn som mænd for samme arbejde.
Stillet 1×. Viser allerede (læs mere): s. 58 l. 57, s. 118 l. 30-32.

- **Før ligelønsloven** — s. 118, l. 30-34 (67 ord). *Hvorfor:* Equal pay came with the 1976 law; a concrete example from 1971.
  > En anden vigtig sejr var, da Folketinget i 1976 vedtog en lov om ligeløn, der gav mænd og kvinder ret til den samme løn for det samme arbejde. Før havde det været lovligt, at kvinder tjente mindre end deres mandlige kollegaer. For eksempel tjente kvinder, der lavede sko i 1971, 549 kroner om ugen, mens mænd tjente 630 kroner om ugen, selvom de udførte det samme arbejde.
- **Ligebehandling efter ansættelse** — s. 58, l. 46-55 (57 ord). *Hvorfor:* Equal treatment also covers pay, dismissal and promotion.
  > Reglerne for ligebehandling gælder også, når man er blevet ansat på en arbejdsplads. Arbejdsgiveren må fx ikke fyre en person på grund af personens etniske baggrund* eller give en person mindre i løn på grund af køn. En arbejdsgiver må heller ikke undlade at forfremme* en person på grund af fx personens seksuelle orientering, handicap eller alder.

#### Faktagruppe `fg-virksomheder` – Danske virksomheder og deres produkter
Viser allerede (læs mere): s. 32 l. 23-29, s. 32 l. 40-45, s. 31 l. 41-44, s. 33 l. 9-10.

- **Arla og Danish Crown** — s. 31, l. 40-44 (44 ord). *Hvorfor:* Cooperative food companies.
  > I andelsselskaberne har hver landmand én stemme, uanset hvor meget mælk eller hvor mange dyr, de leverede. De allerfleste mejerier og slagterier er nu lagt sammen i store koncerner, hhv. Arla og Danish Crown. De eksporterer til hele verden. Men de er stadig andelsselskaber.
- **Høreapparater** — s. 32, l. 31-34 (46 ord). *Hvorfor:* Danish world-leading hearing-aid makers.
  > Danmark fremstiller også over en tredjedel af verdens høreapparater. De tre største danske producenter GN Store Nord (GN Resound), William Demant (Oticon) og Widex udgør tre af de fem største høreapparat-producenter i verden. Danmark er et af verdens førende lande inden for vedvarende energi og energibesparelser.
- **ISS og serviceydelser** — s. 33, l. 27-31 (43 ord). *Hvorfor:* Danish service companies.
  > En række danske virksomheder står også stærkt, når det gælder serviceydelser. ISS har omkring en halv million medarbejdere beskæftiget verden over med rengøring, ejendomsservice, sikkerhed mm. Men også en stribe danske arkitektfirmaer er verdenskendte, ligesom mange ingeniørfirmaer beskæftiger sig med rådgivning verden over.

### 6. Velfærd, sundhed og familie (`velfaerd`)

#### `vel-bibliotek` – Det er gratis at låne bøger på folkebibliotekerne.
Stillet 5×. Viser allerede (læs mere): s. 38 l. 46-47, s. 51 l. 9-12.

- **Lånerkort og online-tjenester** — s. 51, l. 18-30 (89 ord). *Hvorfor:* How to borrow (health card or library card) and eReolen/Filmstriben.
  > Hvis man vil låne noget, skal man enten bruge sit sundhedskort eller et lånerkort, man kan få på biblioteket. De fleste materialer er på dansk, men man kan også låne bøger og spil på andre sprog. Hvis ens lokale bibliotek ikke har de materialer, man har brug for, kan biblioteket som regel bestille dem hjem fra et andet bibliotek. Desuden har bibliotekerne en række online-tjenester, som er gratis for borgerne. Det gælder fx 'eReolen' eller 'Filmstriben', hvor borgerne kan låne og streame* lydbøger, e-bøger, podcasts, film og tv-serier hjemmefra.
- **Lektiecaféer og arrangementer** — s. 51, l. 37-39 (30 ord). *Hvorfor:* Libraries also run homework cafés.
  > Mange biblioteker har lektiecaféer, hvor frivillige, fx pensionerede lærere eller studerende, kommer og hjælper børnene med at læse lektier. Bibliotekerne arrangerer udstillinger, viser film og børneteater og inviterer til foredrag.

#### `vel-gift-18` – Man skal være mindst 18 år for at blive gift i Danmark.
Stillet 5×. Viser allerede (læs mere): s. 41 l. 63-64.

- **Regler om ægteskab** — s. 41, l. 45-63 (89 ord). *Hvorfor:* One spouse at a time, free choice, no forced marriage.
  > Der gælder nogle regler om ægteskab i Danmark. En af reglerne er, at det ikke er tilladt at være gift med mere end én person ad gangen. Når man bliver gift, skriver man derfor under på, at man ikke er gift i forvejen. Man kan selv vælge, om man vil gifte sig med en person af det modsatte køn eller en person af sit eget køn. En anden regel er, at man ikke må tvinge* en person til at gifte sig mod personens vilje. Begge parter skal ønske ægteskabet.
- **Hvor man kan blive gift** — s. 42, l. 12-17 (50 ord). *Hvorfor:* Town hall, folkekirke or recognised religious communities.
  > Man kan blive gift på rådhuset, i den danske folkekirke eller i anerkendte trossamfund*. Hvis man vil have en religiøs vielse uden for den danske folkekirke, der samtidigt er borgerligt gyldig (det vil sige gyldigt i følge dansk lov), skal præsten (eller den religiøse leder) i trossamfundet have en bemyndigelse*.

#### `vel-vaccine` – Vaccinationer til børn (fx MFR mod mæslinger, fåresyge og røde hunde, og HPV) er gratis.
Stillet 4×. Viser allerede (læs mere): s. 55 l. 33-38.

- **Sundhedsplejerske og børneundersøgelser** — s. 55, l. 25-31 (70 ord). *Hvorfor:* Free health visitor and seven free child check-ups (5 weeks-5 years).
  > Forældre med et nyfødt barn får lige efter fødslen besøg af en sundhedsplejerske i hjemmet. Sundhedsplejersken kan give råd og vejledning til forældrene om barnet. Det er gratis at få besøg af en sundhedsplejerske. Fra et barn er fem uger, til det er fem år, kan det desuden få syv forebyggende børneundersøgelser hos lægen. Undersøgelserne foregår efter et bestemt program. Formålet er at følge, hvordan barnet udvikler sig og trives.

#### `vel-tandlaege` – Tandlæge er det eneste af læge/hospital/tandlæge, som voksne normalt selv betaler en del af. Børn og unge får gratis tandpleje (per 2026: til man fylder 22).
Stillet 4×. Viser allerede (læs mere): s. 55 l. 9-20, s. 53 l. 10-13.

- **Hjælp til tandlægeregningen** — s. 36, l. 12-14 (24 ord). *Hvorfor:* People with very low income can get help from the municipality.
  > På nogle områder kan folk med særlig lav indkomst få hjælp hos kommunen til at betale en konkret udgift, fx en del af tandlægeregningen.

#### `vel-myndig-18` – Man bliver myndig, når man fylder 18 år.
Stillet 4×. Viser allerede (læs mere): s. 45 l. 18-19.

- **Ordet 'forældremyndighed'** — s. 150, l. 26-27 (26 ord). *Hvorfor:* Parental authority lasts until the child turns 18.
  > • forældremyndighed – det, at man som forældre har ret til at bestemme over et barn, indtil barnet bliver myndigt, den dag det fylder 18 år.
- **At flytte hjemmefra** — s. 45, l. 12-13 (22 ord). *Hvorfor:* Most young people move out at 18-20.
  > Mange unge flytter hjemmefra, når de er 18-20 år, for at bo alene, sammen med en kæreste eller sammen med andre unge.

#### `vel-slaa-boern` – Det er forbudt at slå børn i Danmark.
Stillet 3×. Viser allerede (læs mere): s. 44 l. 41, s. 118 l. 20-21.

- **Pligt til at anmelde** — s. 45, l. 23-27 (68 ord). *Hvorfor:* Anyone who knows of violence against children must tell the municipality.
  > Selv om det er forbudt at slå børn og unge eller at have seksuel omgang med børn, sker det indimellem, at et barn bliver udsat for vold eller for seksuelle overgreb. Hvis man har kendskab til vold eller andre overgreb mod børn og unge under 18 år, har man pligt til at kontakte kommunen og anmelde det. Kommunen skal så undersøge sagen og hjælpe barnet eller den unge.
- **Børns ret til at sige deres mening** — s. 44, l. 32-37 (58 ord). *Hvorfor:* Children's other rights.
  > Børn og unge har ligesom voksne rettigheder. Børn har generelt ret til at sige deres mening om forhold, der handler om deres eget liv. Hvis deres forældre skal skilles, har børn fx ret til at give udtryk for, om de vil bo hos deres far eller mor. Der er også regler for, hvordan børn og unge skal behandles.

#### `vel-barsel-stoette` – Man kan normalt få økonomisk støtte (barselsdagpenge) under barsels- og fædreorlov.
Stillet 3×. Viser allerede (læs mere): s. 44 l. 6-13.

- **Graviditet og fødsel** — s. 43, l. 28-40 (138 ord). *Hvorfor:* Free check-ups with doctor and midwife; most give birth in hospital.
  > Gravide har ret til en række undersøgelser hos læge og jordemoder. Formålet med undersøgelserne er at sikre, at kvinden og barnet har det godt under graviditeten. Hvis der opstår problemer under graviditeten, kan man få hjælp på et sygehus eller et sundhedscenter, hvor der er tilknyttet* en jordemor. Jordemoderen kan desuden fortælle om, hvilke tilbud om fødselsforberedelse der er. Til fødselsforberedelse lærer man fx om, hvad der sker med kroppen under graviditeten, og om hvordan barnet udvikler sig. Desuden lærer man, hvordan man kan gøre fødslen lettere. I Danmark føder de fleste på et sygehus, men man kan også føde hjemme. Hvis man føder på et sygehus, er det almindeligt, at partneren, et familiemedlem eller en nær* ven er med til fødslen. Efter fødslen kan man få vejledning på sygehuset, fx om pleje af barnet eller om amning.

#### `vel-faedreorlov` – Fædre har ret til orlov: barnets far har også ret til at gå på barsel. (Prøven fra 2017: 2 uger lige efter fødslen. Siden 2022 har hver forælder 11 øremærkede uger.)
Stillet 3×. Viser allerede (læs mere): s. 44 l. 6-10.

- **Begge arbejder** — s. 42, l. 19-20 (21 ord). *Hvorfor:* In most families both parents work and share the housework.
  > I de fleste familier i Danmark har både manden og kvinden et job, og de deles normalt om opgaverne i hjemmet.
- **Sundhedsplejersken kommer** — s. 43, l. 42-44 (34 ord). *Hvorfor:* Free health-visitor visits after the birth.
  > Forældre til nyfødte børn får besøg af en sundhedsplejerske i hjemmet. Sundhedsplejersken undersøger barnet, følger dets udvikling og vejleder og rådgiver forældrene, så de får den bedst mulige start med barnet. Besøgene er gratis.

#### `vel-sundhed-skat` – De fleste udgifter til sundhedsvæsenet betales via skatter og afgifter.
Stillet 2×. Viser allerede (læs mere): s. 53 l. 6-11, s. 35 l. 63-64.

- **Velfærdssamfundets aftale** — s. 35, l. 6-13 (52 ord). *Hvorfor:* The deal: those who can work pay tax; the state helps those who cannot.
  > Velfærdssamfundet* i Danmark bygger på en slags gensidig aftale mellem borgerne og staten. På den ene side bidrager* borgerne ved, at de borgere, der kan, arbejder og betaler skat. På den anden side spænder* det offentlige et sikkerhedsnet ud under borgerne, som sikrer hjælp til dem, der ikke kan klare sig selv.
- **Princippet** — s. 35, l. 33-35 (36 ord). *Hvorfor:* Everyone who can contributes; everyone in need can get help.
  > Princippet i det danske velfærdssamfund er med andre ord, at alle, der kan, skal bidrage til velfærden, og at alle, der har behov for det, kan få hjælp fra det offentlige uanset deres tilknytning til arbejdsmarkedet.

#### `vel-cigaretter-18` – Man skal være mindst 18 år for at købe cigaretter.
Stillet 2×. Viser allerede (læs mere): s. 55 l. 54, s. 44 l. 46-47.

- **Legitimation** — s. 55, l. 58-59 (21 ord). *Hvorfor:* Shops may ask for ID.
  > Butikkerne kan kræve at se legitimation for at kontrollere, om en person er gammel nok til at købe alkohol og cigaretter.
- **Rygeloven** — s. 55, l. 61-62 (25 ord). *Hvorfor:* Smoking is banned indoors in public places.
  > Der er også vedtaget en rygelov, som betyder, at det er forbudt at ryge indendørs på offentlige* steder: For eksempel i busser, sportshaller og biografer.

#### `vel-samme-koen` – I Danmark kan man gifte sig med en person af samme køn.
Stillet 2×. Viser allerede (læs mere): s. 41 l. 57-59, s. 42 l. 27-28.

- **Ægteskabet er ligeværdigt** — s. 60, l. 16-23 (100 ord). *Hvorfor:* Equality inside marriage.
  > Uanset om man er mand eller kvinde, har man i Danmark ret til selv at bestemme, hvem man vil giftes med. Ægteskabet er et ligeværdigt partnerskab, og mænd og kvinder har derfor lige rettigheder i et ægteskab. Både mænd og kvinder bestemmer over sig selv, selvom de er gift. Det betyder for eksempel, at enhver selv må bestemme, hvad man laver i løbet af en dag, hvilket tøj man har på, og hvem man mødes med. Man har dog også forpligtelser over for hinanden i et ægteskab. Begge ægtefæller har for eksempel pligt til at forsørge hinanden og deres børn.
- **Adoption** — s. 60, l. 42-43 (26 ord). *Hvorfor:* Same-sex couples may adopt on equal terms.
  > Par af samme køn har ret til at gifte sig, og de har ret til at adoptere børn på samme vilkår som par af forskelligt køn.

#### `vel-laege` – Det er normalt gratis for voksne at gå til lægen.
Stillet 2×. Viser allerede (læs mere): s. 38 l. 23-24, s. 53 l. 45-46.

- **Det gule sundhedskort** — s. 38, l. 24-28 (50 ord). *Hvorfor:* Health card, sikringsgruppe 1 and referral to specialists.
  > Og alle, som er tilmeldt Det Centrale Personregister (CPR), får et sundhedskort (”det gule kort”). Næsten alle er i dag medlem af sikringsgruppe 1, hvor man er tilmeldt en bestemt almen praktiserende læge (egen læge) og skal have henvisning til speciallæge (undtagen øre- og øjenlæge), hvis lægehjælpen skal være gratis.
- **Recept og håndkøbsmedicin** — s. 53, l. 58-60 (37 ord). *Hvorfor:* Prescription vs. over-the-counter medicine.
  > Medicin køber man normalt på et apotek. Noget medicin kan man kun købe, hvis man har fået en recept af sin læge. Det kaldes receptpligtig medicin. Anden medicin kan man købe uden recept. Det kaldes for håndkøbsmedicin.

#### `vel-abort` – Siden 1. juni 2025 er grænsen for fri abort 18 uger (før: 12 uger).
Stillet 1×. Viser allerede (læs mere): s. 44 l. 18-19, s. 118 l. 25-28.

- **Kvinden bestemmer** — s. 44, l. 19-27 (102 ord). *Hvorfor:* No permission from the father; under 18 needs parents; it is free.
  > Det er kvinden, der selv bestemmer, om hun vil have en abort. Kvinden skal altså ikke have en tilladelse fra barnets far for at få en abort. I de fleste forhold vil en abort være en beslutning, som kvinden og manden tager sammen. Hvis kvinden er under 18 år, skal hun dog have tilladelse fra sine forældre. I særlige tilfælde kan hun søge om abort uden denne tilladelse. Hvis en kvinde ønsker en abort, skal hun kontakte sin læge, som vil henvise til et sygehus eller en klinik, hvor aborten vil blive foretaget. Det koster ikke noget at få foretaget en abort.

#### `vel-koerekort-17` – Man kan få kørekort til almindelig bil, når man fylder 17 år. 17-årige må køre alene mellem kl. 5 og kl. 20. Fra kl. 20 til kl. 5 skal de have en ledsager over 24 år, der har haft kørekort i mindst fem år. Fra 18 år må man køre alene hele døgnet.
Stillet 1×. Viser allerede (læs mere): s. 45 l. 29-33.

- **Kørekort hos borgerservice** — s. 77, l. 20-22 (17 ord). *Hvorfor:* Where you get a driving licence or passport.
  > Og man kan som regel få ordnet praktiske ting, fx hvis man skal have pas eller kørekort.

#### `vel-levetid` – Middellevetiden for mænd var ca. 80 år i 2024.
Stillet 1×. Viser allerede (læs mere): s. 120 l. 34-36.

- **Flere ældre, færre børn** — s. 120, l. 28-37 (119 ord). *Hvorfor:* Life expectancy for women and the fall in births.
  > Et af de største problemer for Danmark og de fleste andre europæiske lande er, at der bliver mange flere ældre i forhold til antallet af dem, der er i den alder (15 til 64 år), hvor man typisk arbejder og betaler skat. Det skyldes for det første at befolkningen lever længere, så vi bliver ældre og ældre, men også, at der bliver født færre børn end før. I 2024-25 kunne kvinder i Danmark forvente at leve 83,9 år mod 76,6 år i 1973-74. Mænd kunne forvente at leve i 80,3 år mod 70,8 år i 1973-74. I samme periode faldt fødselstallet, det vil sige, at hver kvinde i gennemsnit fødte færre børn (1,5 i 2025 og 1,9 i 1973).

#### `vel-boligstoette` – Boligstøtte er hjælp til at betale husleje.
Stillet 1×. Viser allerede (læs mere): s. 38 l. 9-11.

- **Hvad boligstøtten afhænger af** — s. 38, l. 10-18 (32 ord). *Hvorfor:* Income, rent and size of the home; pensioners get more.
  > Den afhænger blandt andet af, hvor meget boligens beboere tjener, størrelsen på huslejen og boligens størrelse. Der gælder særlige regler for pensionister. Pensionister med lav indkomst kan ofte få en højere boligstøtte.

#### `vel-foraeldremyndighed` – Når forældrene er gift, har både faren og moren forældremyndigheden.
Stillet 1×. Viser allerede (læs mere): s. 42 l. 30-31.

- **Hvad fælles forældremyndighed betyder** — s. 42, l. 31-39 (88 ord). *Hvorfor:* Name, school, religion - decided together; unmarried parents can make a declaration.
  > Fælles forældremyndighed betyder, at forældrene skal tage vigtige beslutninger om barnet i fællesskab. Det kan fx være, hvad barnet skal hedde, barnets opdragelse, hvor det skal gå i skole, hvilken religion det skal have, eller hvor det skal passes, hvis forældrene arbejder. Mange par vælger at bo sammen – og eventuelt få børn – uden at være gift. Hvis de får børn, har de bl.a. fælles forældremyndighed, hvis de i forbindelse med barnets fødsel afgiver en erklæring om, at de sammen vil varetage omsorgen og ansvaret for barnet.
- **Efter en skilsmisse** — s. 43, l. 6-18 (98 ord). *Hvorfor:* Familieretshuset helps if parents cannot agree.
  > Hvis et ægtepar med børn bliver skilt, er det forældrene selv, der aftaler, hvordan de vil dele ansvaret for børnene. Forældrene kan fx aftale, hvem af forældrene barnet skal bo hos, og hvor meget barnet skal være hos den anden forælder. Hvis de ikke kan blive enige, kan de få hjælp og rådgivning i Familieretshuset*. Kan forældrene fortsat ikke blive enige, kan Familieretshuset eller domstolene træffe en afgørelse om samvær, forældremyndighed og barnets bopæl. Dette gælder også for forældre, der aldrig har været gift med hinanden. Mange børn, hvis forældre ikke bor sammen, bor hos forældrene på skift.

#### `vel-oel-vin-16` – Man skal være 16 år for at købe almindelig øl. Vin, spiritus og meget stærk øl (alkohol over 6 %) kræver 18 år – ligesom cigaretter.
Stillet 1×. Viser allerede (læs mere): s. 44 l. 45-47, s. 55 l. 52-55.

- **Nattelivszoner** — s. 55, l. 55-56 (16 ord). *Hvorfor:* 18 years to buy alcohol after 22 in nightlife zones.
  > I nattelivs-zoner skal man også være fyldt 18 år for at købe alkohol efter klokken 22.
- **Livsstilssygdomme** — s. 55, l. 43-46 (40 ord). *Hvorfor:* Why the age limits exist.
  > I Danmark er der vedtaget en række love, som skal gøre folk sundere og forebygge* de såkaldte livsstilssygdomme. Livsstilssygdomme er sygdomme, som hænger sammen med den måde, man lever på, fx at man ryger, drikker eller spiser for fed mad.

#### Faktagruppe `fg-aldre` – Aldersgrænser
Viser allerede (læs mere): s. 44 l. 45-47, s. 55 l. 52-55, s. 45 l. 29-33, s. 45 l. 18-21, s. 18 l. 38, s. 19 l. 9, s. 6 l. 29-31.

- **Regler for børn og unge** — s. 44, l. 39-53 (89 ord). *Hvorfor:* The full list of age rules in the book in one place.
  > Nogle af de vigtigste regler er: • Det er forbudt at slå børn • Børn under 13 år må normalt ikke have lønnet arbejde uden for hjemmet • Det er forbudt at have sex med unge under 15 år • Børn under 15 år kan ikke straffes • Unge skal være fyldt 16 år, før de må købe almindelig øl • Unge skal være fyldt 18 år, før de må købe meget stærk øl, vin, spiritus og cigaretter • Unge skal være 17 år for at kunne få kørekort.

#### Faktagruppe `fg-gratis` – Gratis eller betale?
Viser allerede (læs mere): s. 38 l. 23-24, s. 54 l. 20-21, s. 55 l. 9-20, s. 55 l. 33-38, s. 51 l. 9-12, s. 12 l. 55, s. 10 l. 23-24, s. 24 l. 57-58.

- **Lige adgang til ydelser** — s. 36, l. 6-14 (67 ord). *Hvorfor:* Most services are free for all; some only for low incomes.
  > Borgere i Danmark har lige adgang til de fleste offentlige ydelser*. Alle uanset indkomst har fx mulighed for at få gratis lægehjælp. Nogle ydelser gives kun til personer uden indkomst eller formue, fx kontanthjælp, eller til personer med en lav indkomst, fx boligstøtte. På nogle områder kan folk med særlig lav indkomst få hjælp hos kommunen til at betale en konkret udgift, fx en del af tandlægeregningen.
- **Gratis på sygehuset** — s. 54, l. 46-55 (61 ord). *Hvorfor:* Food, bedding and towels are free in public hospitals.
  > Sygehuset sørger for, at patienterne får mad, kommer i bad, får rent tøj på og bliver hjulpet med det, de har brug for. Maden er gratis for patienterne på de offentlige sygehuse. Sygehuset sørger også for, at patienterne har fx sengetøj og håndklæder, så man ikke skal have det med hjemmefra. Dette er også gratis for patienterne på de offentlige sygehuse.

### 7. Uddannelse og børn (`uddannelse`)

#### `udd-undervisningspligt` – Der er 10 års undervisningspligt i Danmark (0.–9. klasse).
Stillet 8×. Viser allerede (læs mere): s. 6 l. 6-10, s. 6 l. 29-33.

- **Folkeskolens trin og 10. klasse** — s. 7, l. 14-22 (104 ord). *Hvorfor:* Indskoling, mellemtrin, udskoling; 10th grade is voluntary.
  > En folkeskole har som regel tre trin: Indskolingen, som går fra børnehaveklassen til 3. klasse. Mellemtrinnet, som går fra 4. til 6. klasse. Udskolingen, som går fra 7. til 9. klasse. Efter 9. klasse kan man vælge at fortsætte i 10. klasse, inden man går videre i uddannelsessystemet, eller direkte ud på arbejdsmarkedet. 10. klasse er frivillig, men cirka halvdelen af alle elever tilmelder sig 10. klasse. Nogle elever tager 10. klasse på deres egen skole, hvis den har en 10. klasse. Andre vælger at tage 10. klasse på en efterskole eller fri fagskole, hvor man bor og går i skole med andre unge.
- **Fag og formål** — s. 6, l. 33-43 (100 ord). *Hvorfor:* The subjects and the democratic purpose of the school.
  > Efter børnehaveklassen følger 1. – 9. klasse. Undervisningen i folkeskolen skal sikre, at børnene lærer nok til at kunne fortsætte på en ungdomsuddannelse. Der undervises i bl.a. dansk, engelsk, tysk, fransk, matematik, fysik, kemi, historie, samfundsfag, kristendomskundskab, musik, idræt (sport) og madkundskab (madlavning). Et andet vigtigt formål med undervisningen i folkeskolen er at sikre, at børnene lærer at tænke kritisk og selvstændigt og dermed forberedes til at være borgere i et demokratisk samfund. Børnene lærer derfor at give udtryk for deres mening. Børnene kan også lave elevråd og på den måde få indflydelse*, når der skal tages beslutninger på skolen.

#### `udd-karakter-12` – Danmark bruger 7-trinsskalaen. Den højeste karakter er 12.
Stillet 6×. Viser allerede (læs mere): s. 8 l. 50-52.

- **Karakterer og prøver** — s. 8, l. 39-44 (74 ord). *Hvorfor:* When grades start and when exams are taken.
  > Fra 0. klasse (børnehaveklassen) til 7. klasse får børnene ikke karakterer i folkeskolen. Men fra folkeskolens 8. klasse får eleverne karakterer i en række fag mindst to gange om året. Skolen kan i nogle tilfælde give eleverne standpunktskarakterer i 6. og 7. klasse sammen med anden feedback. Efter 9. klasse aflægger eleverne prøve i mange fag. Efter 10. klasse kan eleverne også aflægge prøve i flere fag. Prøverne kan være både mundtlige og skriftlige.

#### `udd-gymnasium-gratis` – Undervisningen på de offentlige gymnasier er gratis.
Stillet 5×. Viser allerede (læs mere): s. 12 l. 55.

- **De fire gymnasiale uddannelser** — s. 12, l. 53-61 (54 ord). *Hvorfor:* stx, hhx, htx, hf.
  > De gymnasiale uddannelser forbereder især de unge til videregående uddannelser, og undervisningen foregår normalt på gymnasier og erhvervsskoler. På de offentlige gymnasier er undervisningen gratis. Der er fire forskellige gymnasiale uddannelser: • Uddannelsen til almen studentereksamen (stx) • Uddannelsen til merkantil studentereksamen (hhx) • Uddannelsen til teknisk studentereksamen (htx) • Uddannelsen til hf-eksamen (hf)
- **Varighed og adgang** — s. 13, l. 6-12 (38 ord). *Hvorfor:* 3 years (hf 2) and access to higher education.
  > Stx-, hhx- og htx-uddannelserne varer tre år og hf-uddannelsen varer to år. Her kan unge, der har afsluttet grundskolen med 9.-klasseprøven, blive optaget*. Alle fire gymnasiale uddannelser afsluttes med en eksamen, som giver adgang* til en videregående uddannelse.
- **Videregående uddannelse er gratis** — s. 14, l. 34-36 (33 ord). *Hvorfor:* Higher education is free for citizens of Denmark and the EU.
  > De fleste unge, der har taget en gymnasial uddannelse, fortsætter på en videregående uddannelse. Det samme gør nogle unge fra erhvervsuddannelserne. De fleste videregående uddannelser er gratis for borgere i Danmark og EU.

#### `udd-friskole-betale` – Forældre skal normalt betale for, at deres børn går i friskole eller privatskole. Folkeskolen er gratis.
Stillet 4×. Viser allerede (læs mere): s. 6 l. 13-15, s. 10 l. 23-24.

- **Frie grundskoler** — s. 10, l. 16-21 (68 ord). *Hvorfor:* Self-governing schools that must match the folkeskole.
  > Frie grundskoler er selvejende institutioner. Det kan også være skoler, der arbejder med en specifik pædagogik eller undervisningsmetode eller bygger på et bestemt religiøst grundlag. Man kan fx samle timerne i de forskellige fag sådan, at man har dansk i en periode, tysk i en anden periode og matematik i en tredje. Undervisningen i de frie grundskoler skal stå mål med, hvad der i almindelighed kræves i folkeskolen.
- **Offentlig støtte** — s. 10, l. 23-25 (28 ord). *Hvorfor:* Most get public support, and must teach freedom and democracy.
  > De fleste frie grundskoler får økonomisk støtte fra det offentlige. Skoler skal desuden forberede eleverne til at leve i et samfund som det danske med frihed og folkestyre.

#### `udd-boernehave-vuggestue` – Vuggestue er for børn fra ca. 6 måneder til ca. 3 år. Børnehave er for børn fra ca. 3 til 6 år.
Stillet 4×. Viser allerede (læs mere): s. 18 l. 38, s. 19 l. 9.

- **Vuggestuen** — s. 18, l. 38-46 (111 ord). *Hvorfor:* What the staff do in a nursery.
  > Personalet i vuggestuer (pædagogerne) skal bl.a. sikre, at det enkelte barn trives, lærer og udvikler sig, ligesom de skal medvirke til, at børnene får omsorg og en god og tryg opvækst. Personalet skal arbejde med planer for det pædagogiske arbejde i vuggestuen. Herigennem skal børn bl.a. lære at være sammen med hinanden og at tage hensyn. Børnene skal også støttes i at udvikle deres sprog, og det gør man fx ved at tale med dem, synge sange og læse bøger for dem. Pædagogerne hjælper også børnene til at udvikle deres krop fx ved at løbe, danse, tegne og hoppe. Det gør de både indenfor i vuggestuen og udenfor på fx legepladsen.
- **Børnehaven** — s. 19, l. 9-20 (121 ord). *Hvorfor:* Kindergarten: play, language, holidays incl. Eid and Chinese New Year.
  > I børnehaven skal der også arbejdes med planer for det pædagogiske arbejde. Pædagogerne lærer fx børnene, hvordan de leger sammen, og hvordan de kan løse uenigheder med hinanden. Også i børnehaven læser man historier og synger sange, både for at udvikle sprog, men også for at skabe et fællesskab blandt børnene. I mange børnehaver fylder de traditionelle kristne højtider* en del, fx jul og påske. I den forbindelse pyntes institutionen, og børnene er med til at tegne og klippe pynt. Man lærer også om andre traditioner og religiøse højtider end de kristne som fx om Eid* eller om kinesisk nytår. Der er typisk mindre personale i en børnehave end i en vuggestue, fordi børnene er større og kan flere ting selv.

#### `udd-su-18` – Man kan tidligst få SU, når man fylder 18 år.
Stillet 4×. Viser allerede (læs mere): s. 45 l. 18-21.

- **Betingelser for SU** — s. 15, l. 41-47 (85 ord). *Hvorfor:* Study-active, limited earnings; non-citizens can apply for equal status.
  > Staten kan give økonomisk støtte, hvis man studerer på en uddannelse. Denne støtte kaldes i daglig tale SU, som er en forkortelse for Statens Uddannelsesstøtte. Man kan få SU, når man er indskrevet på en uddannelse, som er godkendt til SU, og hvis man opfylder betingelserne for at få SU. For eksempel at man er studieaktiv og ikke tjener for meget ved siden af. Hvis man ikke er dansk statsborger, kan man søge Uddannelses- og Forskningsstyrelsen om at få samme økonomiske støtte som danske statsborgere.

#### `udd-efterskole` – Man kan gå på efterskole i 8., 9. og 10. klasse.
Stillet 2×. Viser allerede (læs mere): s. 10 l. 30-31.

- **Livet på en efterskole** — s. 10, l. 33-42 (105 ord). *Hvorfor:* Boarding school with optional subjects; it costs money.
  > På efterskolerne har eleverne almindelige fag som dansk, engelsk, matematik og idræt. Og så kan de også vælge en række valgfrie fag, som fx kan være drama, musik, billedkunst, IT eller madlavning. De valgfrie fag er forskellige fra skole til skole, og det er ofte kreative eller praktiske fag. Mange unge vælger at gå på efterskole for at prøve noget nyt, få nye klassekammerater og prøve at flytte hjemmefra for en periode og måske tænke over, hvilken ungdomsuddannelse de vil fortsætte på. Det koster penge at gå på en efterskole. Der er dog mulighed for at få økonomisk støtte til et ophold under særlige omstændigheder.

#### `udd-skolestart` – Børn starter i børnehaveklassen (0. klasse), når de er omkring 6 år. Prøvens svar er '5-6 år'.
Stillet 2×. Viser allerede (læs mere): s. 6 l. 29-31.

- **SFO** — s. 19, l. 27-31 (59 ord). *Hvorfor:* After-school care for folkeskole children.
  > SFO er en forkortelse for SkoleFritidsOrdning. SFO er et sted, hvor børn i folkeskolen kan blive passet før eller efter skoletid af pædagoger. I SFO’en er der nogle fælles aktiviteter for alle børnene. Det kan fx være at spille musik og teater, at male, sy eller tegne, men det kan også være sportsaktiviteter som fx svømning, fodbold eller skøjteløb.

#### `udd-folkeskole-flest` – De fleste børn går i kommunale folkeskoler.
Stillet 1×. Viser allerede (læs mere): s. 6 l. 10, s. 10 l. 9, s. 77 l. 49-57.

- **Demokrati i folkeskolen** — s. 7, l. 54-57 (42 ord). *Hvorfor:* The school prepares pupils for life in a democracy.
  > Folkeskolen skal forberede eleverne til at have medansvar, rettigheder og pligter i et samfund med frihed og folkestyre*. Skolen skal derfor være præget* af åndsfrihed*, ligeværd* og demokrati. Det er ofte i fagene historie, dansk og samfundsfag, at eleverne undervises i dette.

#### `udd-karakterer-8-klasse` – Eleverne i folkeskolen får karakterer fra 8. klasse.
Stillet 1×. Viser allerede (læs mere): s. 8 l. 39-41.

- **Meddelelsesbogen** — s. 8, l. 24-29 (62 ord). *Hvorfor:* Feedback before grades start.
  > Hver elev fra børnehaveklassen til og med 9. klassetrin har også en meddelelses-bog, som er lærerens vurdering af, hvordan eleven klarer sig fagligt i et fag. Klasselæreren kan også vurdere, hvordan eleven klarer sig socialt, dvs., hvordan eleven fungerer sammen med de andre elever og med lærerne. I meddelelsesbogen beskriver læreren også, hvad eleven skal have fokus på i det kommende år.
- **Standpunktskarakterer** — s. 8, l. 41-44 (44 ord). *Hvorfor:* Exception: grades can be given in 6th and 7th grade.
  > Skolen kan i nogle tilfælde give eleverne standpunktskarakterer i 6. og 7. klasse sammen med anden feedback. Efter 9. klasse aflægger eleverne prøve i mange fag. Efter 10. klasse kan eleverne også aflægge prøve i flere fag. Prøverne kan være både mundtlige og skriftlige.

#### `udd-boern-passes` – De fleste børn mellem 3 og 5 år bliver passet uden for hjemmet.
Stillet 1×. Viser allerede (læs mere): s. 18 l. 12-14.

- **Et politisk mål siden 1960'erne** — s. 18, l. 6-12 (45 ord). *Hvorfor:* Childcare was built to get women into work.
  > Det har været et politisk mål i Danmark siden 1960’erne at give forældre mulighed for at få deres børn passet uden for hjemmet i vuggestuer og børnehaver, fordi man ønskede at få kvinderne ud på arbejdsmarkedet. I dag arbejder begge forældre normalt uden for hjemmet.
- **Ret til en plads** — s. 18, l. 19-24 (77 ord). *Hvorfor:* Every child has the right to a place; parents pay part.
  > Alle børn har ret til en plads i et dagtilbud. Det er kommunerne, der er ansvarlige for dagtilbuddene, men det er forskelligt fra kommune til kommune, hvilke tilbud der er. De mest almindelige er vuggestue, børnehave og dagpleje. Kommunen betaler en del af udgiften, mens forældrene betaler den resterende del. Men hvis fx forældrenes indtægt er lav, eller der er tale om en enlig forsørger, er der mulighed for at søge om yderligere økonomisk tilskud fra kommunen.

#### `udd-dagpleje` – I en dagpleje bliver barnet passet i et privat hjem af en dagplejer.
Stillet 1×. Viser allerede (læs mere): s. 18 l. 54-57.

- **Krav til dagplejere** — s. 18, l. 56-61 (61 ord). *Hvorfor:* The municipality approves child minders.
  > For at blive godkendt af kommunen som dagplejer skal man overholde bestemte krav* med hensyn til blandt andet mad, hygiejne, sundhed og rengøring. Det er fx ikke tilladt at ryge i de dele af dagplejehjemmet, hvor børnene opholder sig. Dagplejen skal ligesom vuggestuen arbejde med planer for det pædagogiske arbejde, og mange af aktiviteterne kan være de samme som i vuggestuen.

#### `udd-laege-universitet` – Man læser medicin og bliver læge på et universitet.
Stillet 1×. Viser allerede (læs mere): s. 15 l. 25-27.

- **Bachelor og kandidat** — s. 15, l. 29-36 (22 ord). *Hvorfor:* 3 + 2 years; eight universities.
  > En bacheloruddannelse tager typisk omkring tre år, og en efterfølgende kandidatuddannelse tager typisk omkring to år. Der er otte universiteter i Danmark.
- **Professionshøjskoler** — s. 15, l. 9-18 (61 ord). *Hvorfor:* Nurse, teacher, social worker - studied elsewhere (distractors).
  > På professionshøjskoler kan man blandt andet tage en professionsbacheloruddannelse, hvor man uddannes til et bestemt job Det kan fx være som folkeskolelærer, jordemoder, sygeplejerske, socialrådgiver, pædagog, fysioterapeut eller diplomingeniør. Men man kan fx også blive journalist eller komme til at arbejde med kommunikation. En professionsbacheloruddannelse tager normalt tre-fire år. Der Indgår praktik i disse uddannelser. Der er syv professionshøjskoler i Danmark.

#### `udd-elektriker` – Man uddanner sig til elektriker på en erhvervsskole.
Stillet 1×. Viser allerede (læs mere): s. 13 l. 39, s. 14 l. 14.

- **Erhvervsuddannelser** — s. 14, l. 6-11 (25 ord). *Hvorfor:* Jobs reached through vocational education.
  > Uddannelserne fører til job som fx industritekniker, mekaniker, VVS’er, elektriker, social- og sundhedsassistent, pædagogisk assistent, kok, smed, butiksassistent, murer, mediegrafiker, frisør, landmand og meget mere.
- **Grundforløb og hovedforløb** — s. 14, l. 13-23 (92 ord). *Hvorfor:* School + paid apprenticeship, 1½-5½ years.
  > En erhvervsuddannelse består af et grundforløb på en erhvervsskole og et hovedforløb. I hovedforløbet kombinerer man skoleundervisning på en erhvervsskole med praktisk oplæring. Oplæringen får man som regel i en virksomhed. Når man har en uddannelsesaftale med en virksomhed, får man løn både i oplæringen og i skoletiden. En erhvervsuddannelse kan tage mellem 1½ og 5½ år, alt efter hvilken uddannelse der er tale om. Hvis eleverne ikke kan finde en læreplads efter grundforløbet, kan de i de fleste tilfælde få oplæringen på et skoleoplæringscenter. Så får de ikke løn, men skoleoplæringsydelse.

#### `udd-skolebestyrelse` – I en skolebestyrelse sidder der både forældrerepræsentanter og elevrepræsentanter.
Stillet 1×. Viser allerede (læs mere): s. 8 l. 6-10, s. 9 l. 49-52.

- **Skolebestyrelsens opgaver** — s. 9, l. 52-55 (22 ord). *Hvorfor:* What the board decides.
  > Skolebestyrelsen fastsætter blandt andet, hvordan forældresamarbejdet skal foregå. Skolebestyrelsen kan også være med til at bestemme, hvordan pengene til undervisning skal bruges.
- **Ordet 'skolebestyrelse'** — s. 153, l. 50-55 (62 ord). *Hvorfor:* Glossary: parents elect 5-7 parents every 4 years.
  > • skolebestyrelse – forældrene til børnene på en skole vælger hvert 4. år fem til syv forældre til at være i skolens bestyrelse, hvor der også er nogle lærere og nogle børn fra skolen. Skolebestyrelsen bestemmer fx, hvordan undervisningen skal organiseres, hvor mange timer børnene skal have på de forskellige klassetrin (0.-9./10. klasse) og hvor mange forældremøder og udflugter der skal være.

#### Faktagruppe `fg-boernepasning` – Børn: pasning og skole
Viser allerede (læs mere): s. 18 l. 38-56, s. 19 l. 9, s. 6 l. 29-31, s. 6 l. 6-10, s. 8 l. 39-41, s. 10 l. 30-31, s. 45 l. 20-21.

- **SFO og klub** — s. 19, l. 27-31 (59 ord). *Hvorfor:* Care before and after school.
  > SFO er en forkortelse for SkoleFritidsOrdning. SFO er et sted, hvor børn i folkeskolen kan blive passet før eller efter skoletid af pædagoger. I SFO’en er der nogle fælles aktiviteter for alle børnene. Det kan fx være at spille musik og teater, at male, sy eller tegne, men det kan også være sportsaktiviteter som fx svømning, fodbold eller skøjteløb.

### 8. Kultur og kendte danskere (`kultur`)

#### `kul-hca-levede` – H.C. Andersen levede 1805-1875 (i 1800-tallet).
Stillet 5×. Viser allerede (læs mere): s. 123 l. 35.

- **H.C. Andersens liv** — s. 123, l. 36-38 (37 ord). *Hvorfor:* Born in Odense, son of a poor shoemaker; translated into 125 languages.
  > H.C. Andersen blev født i Odense som søn af en fattig skomager. Han flyttede til København, da han var 14 år. Han skrev bl.a. romaner, digte og eventyr. H.C. Andersens eventyr er oversat til ca. 125 sprog.

#### `kul-grimme-aelling` – H.C. Andersen skrev eventyret 'Den Grimme Ælling'.
Stillet 4×. Viser allerede (læs mere): s. 123 l. 38-40.

- **Dyr og planter med menneskestemmer** — s. 123, l. 39-41 (27 ord). *Hvorfor:* What makes the fairy tales special; 'Grantræet' as another example.
  > Disse eventyr viser Andersens særlige evne til at udstyre dyr og planter med menneskelige stemmer og med dyr og planter at fortælle om menneskers fejl og drømme.

#### `kul-druk` – Thomas Vinterberg vandt en Oscar i 2021 for filmen 'Druk'.
Stillet 3×. Viser allerede (læs mere): s. 125 l. 9-11.

- **Handlingen i 'Druk'** — s. 125, l. 10-17 (40 ord). *Hvorfor:* What the film is about.
  > I ’Druk’ forsøger fire gymnasielærere at gøre deres liv mere spændende ved at drikke, så de har alkohol i blodet hele dagen. Det går godt i begyndelsen, men efterhånden kommer det ud af kontrol og ender i en tragisk ulykke.
- **Andre film af Vinterberg** — s. 125, l. 19-22 (38 ord). *Hvorfor:* Festen, Jagten, Kollektivet.
  > Mange af Thomas Vinterbergs film fortæller historier om dilemmaer i familien. Mellem de voksne og mellem forældre og børn. Det kan være om seksuelt misbrug, ’Festen’ (1998), om falske beskyldninger, ’Jagten’ (2012) eller om bristede håb, ’Kollektivet’ (2016).

#### `kul-yahya-hassan` – Yahya Hassan (1995-2020) var digter.
Stillet 3×. Viser allerede (læs mere): s. 126 l. 25-28.

- **Debatten om digtene** — s. 126, l. 27-30 (34 ord). *Hvorfor:* Why the collection caused debate; best-selling poetry ever in Denmark.
  > Hassans digte om at vokse op og være ung som indvandrer i et ghettokvarter* skabte voldsom debat, fordi de pegede på problemer og på sammenstød mellem danske normer og normerne i socialt belastede indvandrermiljøer.

#### `kul-kroeyer` – P.S. Krøyer var kunstmaler (en af Skagensmalerne).
Stillet 3×. Viser allerede (læs mere): s. 123 l. 53-55.

- **Skagensmalerne** — s. 123, l. 56-64 (50 ord). *Hvorfor:* Skagen painters; paintings at Skagens Museum.
  > Han blev uddannet på Kunstakademiet i København. I 1880’erne og 1890’erne var han med i en gruppe af kunstnere, som boede i Skagen i Nordjylland for at arbejde. De malerier, som han malede i Skagen, er meget berømte i Danmark, og en række af dem kan ses på Skagens Museum.

#### `kul-aqua` – Popgruppen Aqua udgav 'Barbie Girl' i 1990'erne.
Stillet 2×. Viser allerede (læs mere): s. 125 l. 36-37.

- **28 millioner cd'er** — s. 125, l. 37-38 (18 ord). *Hvorfor:* One of the best-selling Danish bands.
  > Aqua solgte i alt 28 millioner cd’er og er dermed et af de mest sælgende danske bands nogensinde.
- **Eurovision** — s. 125, l. 28-34 (82 ord). *Hvorfor:* Denmark's three Eurovision wins (1963, 2000, 2013).
  > Danmark har vundet Eurovision Song Contest (Det Europæiske Melodi Grand Prix) tre gange. Første gang var i 1963 med ’Dansevise’, som blev fremført af Grethe Ingmann (1938-90) og Jørgen Ingmann (1925-2015). Anden gang i år 2000 med ’Smuk som et stjerneskud/Fly on the Wings of Love’, skrevet og fremført af duoen Brødrene Olsen, der består af Jørgen Olsen (født 1950) og Niels Olsen (født 1954). Tredje gang var i 2013 med ’Only Teardrops’, som blev sunget af Emmelie de Forest (født 1993).

#### `kul-kierkegaard` – Søren Kierkegaard (1813-1855) var filosof.
Stillet 2×. Viser allerede (læs mere): s. 123 l. 43-44.

- **Retten og pligten til at vælge** — s. 123, l. 44-51 (31 ord). *Hvorfor:* His main idea and 'Enten-eller' (1843).
  > Han understregede menneskers ret og pligt til at træffe valg om deres eget liv. Hvor vigtigt valget er for ham, kan man høre på en af hans kendteste titler, ’Enten-eller’ (1843).

#### `kul-grundtvig` – N.F.S. Grundtvig fik stor betydning for højskolerne i 1800-tallet.
Stillet 2×. Viser allerede (læs mere): s. 50 l. 33-40.

- **Grundtvigs tanker om læring** — s. 50, l. 42-46 (59 ord). *Hvorfor:* Learning for its own sake; no exams at højskoler.
  > Han mente, det var vigtigt, at børn og voksne lærte at tænke selv. De skulle ikke bare lære det, der stod i bøgerne, udenad. Undervisningen skulle gøre eleverne personligt engagerede i det, de læste. De skulle lære for deres egen skyld og ikke kun for at få gode karakterer. Man går derfor heller ikke til eksamen på en højskole.
- **Højskolerne i dag** — s. 50, l. 9-12 (53 ord). *Hvorfor:* About 70 folk high schools today.
  > Højskolen er en del af den danske tradition for, at alle borgere livet igennem skal have mulighed for at lære og få viden om samfundet. Der er omkring 70 forskellige højskoler i Danmark. På en højskole er der fokus på at udvikle sig fagligt og personligt og samtidig lære nye mennesker at kende.

#### `kul-blixen` – Karen Blixen skrev bøger (fx 'Den afrikanske farm').
Stillet 2×. Viser allerede (læs mere): s. 124 l. 21-30.

- **Noveller** — s. 124, l. 32-33 (22 ord). *Hvorfor:* Her other famous genre: 'Syv fantastiske fortællinger'.
  > Karen Blixen er også kendt for en særlig slags historiske noveller, som man kan finde i for eksempel ’Syv fantastiske fortællinger’ (1935).

#### `kul-arne-jacobsen` – Arkitekten Arne Jacobsen tegnede Danmarks Nationalbank og designede stolen Ægget.
Stillet 2×. Viser allerede (læs mere): s. 124 l. 42-57.

- **Dansk kultur i det hele taget** — s. 123, l. 6-10 (15 ord). *Hvorfor:* The fact sheet's opening line, which names architecture.
  > Der er en lang tradition for litteratur, teater, billedkunst, musik, arkitektur og film i Danmark.
- **En anden kunstner: Olafur Eliasson** — s. 126, l. 6-12 (49 ord). *Hvorfor:* Another artist, whose best-known work is a glass walkway on ARoS.
  > En anden kunstner er dansk-islandske Olafur Eliasson (født 1967). Et af hans mest kendte værker er ’Your rainbow panorama’ (Din regnbueudsigt) (2011) oven på kunstmuseet ARoS i Aarhus, som er en 150 meter lang cirkelformet gangbro i glas, hvor man kan se ud over Aarhus i alle regnbuens farver.

#### `kul-holberg` – Ludvig Holberg var forfatter (han skrev komedier i 1700-tallet).
Stillet 2×. Viser allerede (læs mere): s. 123 l. 21-30.

- **Dansk kultur i det hele taget** — s. 123, l. 6-10 (15 ord). *Hvorfor:* The fact sheet's opening line: the arts tradition Holberg started.
  > Der er en lang tradition for litteratur, teater, billedkunst, musik, arkitektur og film i Danmark.
- **En anden kendt forfatter: Tove Ditlevsen** — s. 124, l. 35-40 (73 ord). *Hvorfor:* Another Danish writer from the same fact sheet.
  > En anden kendt forfatter er Tove Ditlevsen (1917-76). Hun voksede op i en fattig familie på Vesterbro i København, og hun drømte allerede som barn om at blive digter, selv om hendes far sagde, at det kunne piger ikke blive. Hun skrev både digte og romaner om at være barn, kvinde og fattig i datidens samfund, og blandt hendes hovedværker er Barndommens Gade (1943) samt bøgerne Barndom (1967), Ungdom (1967) og Gift (1971).

#### `kul-bier-vinterberg` – Susanne Bier og Thomas Vinterberg er filminstruktører.
Stillet 1×. Viser allerede (læs mere): s. 125 l. 9.

- **Susanne Biers Oscar** — s. 125, l. 24-26 (38 ord). *Hvorfor:* Susanne Bier won an Oscar for 'Hævnen'.
  > En anden dansk filminstruktør – Susanne Bier (født 1960) – har også vundet en Oscar for ’Hævnen’ (2010), som sætter fokus på i hvilke situationer i livet, det er henholdsvis rigtigt og forkert at hævne sig på andre.
- **Andre film af Vinterberg** — s. 125, l. 19-22 (38 ord). *Hvorfor:* Festen, Jagten, Kollektivet.
  > Mange af Thomas Vinterbergs film fortæller historier om dilemmaer i familien. Mellem de voksne og mellem forældre og børn. Det kan være om seksuelt misbrug, ’Festen’ (1998), om falske beskyldninger, ’Jagten’ (2012) eller om bristede håb, ’Kollektivet’ (2016).

#### `kul-carl-nielsen` – Carl Nielsen komponerede musik.
Stillet 1×. Viser allerede (læs mere): s. 124 l. 9.

- **Symfonier og sange** — s. 124, l. 9-19 (46 ord). *Hvorfor:* His symphonies and well-known Danish songs.
  > Med korværker og symfonier bidrog han til den internationale koncertsalskultur. Fx symfonien ’Det uudslukkelige’ (1916). Han har også komponeret musik til danske digte, der gjorde dem til vidt udbredte sange som ’Jens Vejmand’, ’Solen er så rød, mor’, ’Den danske sang er en ung blond pige’.

#### Faktagruppe `fg-kendte` – Kendte danskere
Viser allerede (læs mere): s. 123 l. 21, s. 126 l. 30, s. 50 l. 33-40, s. 59 l. 53-55.

- **Tove Ditlevsen** — s. 124, l. 35-40 (73 ord). *Hvorfor:* A famous author not yet in the group table.
  > En anden kendt forfatter er Tove Ditlevsen (1917-76). Hun voksede op i en fattig familie på Vesterbro i København, og hun drømte allerede som barn om at blive digter, selv om hendes far sagde, at det kunne piger ikke blive. Hun skrev både digte og romaner om at være barn, kvinde og fattig i datidens samfund, og blandt hendes hovedværker er Barndommens Gade (1943) samt bøgerne Barndom (1967), Ungdom (1967) og Gift (1971).
- **Olafur Eliasson** — s. 126, l. 6-12 (49 ord). *Hvorfor:* A famous artist not yet in the group table.
  > En anden kunstner er dansk-islandske Olafur Eliasson (født 1967). Et af hans mest kendte værker er ’Your rainbow panorama’ (Din regnbueudsigt) (2011) oven på kunstmuseet ARoS i Aarhus, som er en 150 meter lang cirkelformet gangbro i glas, hvor man kan se ud over Aarhus i alle regnbuens farver.

### 9. Højtider, traditioner og religion (`traditioner`)

#### `tra-grundlovsdag` – Grundlovsdag fejres den 5. juni (grundloven blev underskrevet 5. juni 1849).
Stillet 5×. Viser allerede (læs mere): s. 129 l. 45-55.

- **Frederik 7. og grundloven** — s. 112, l. 42-44 (36 ord). *Hvorfor:* Why 5 June is the date.
  > Kong Frederik 7. gav i 1848 efter for kravet om demokrati. Han afgav sin enevældige magt og erklærede sig som konstitutionel konge. Det førte til Danmarks første frie forfatning, Danmarks Riges Grundlov af 5. juni 1849.

#### `tra-sankthans` – Sankthans fejres i juni (sankthansaften 23. juni) med bål.
Stillet 4×. Viser allerede (læs mere): s. 129 l. 58-66.

- **Johannes Døberen** — s. 149, l. 24-27 (42 ord). *Hvorfor:* Glossary: why the feast is named after Sankt Hans (24 June).
  > • Døberen, Johannes – Johannes (som på dansk kaldes Hans) var fætter til Jesus og født et halvt år før ham, altså den 24. juni. Johannes var den første, der døbte* mennesker. Derfor blev han kaldt Johannes Døber. Han døbte også Jesus.
- **Midsommervisen** — s. 152, l. 6-9 (16 ord). *Hvorfor:* The song sung at the bonfire.
  > • midsommervisen – en bestemt sang, som handler om midsommer (23. juni = midt om sommeren).

#### `tra-fastelavn` – Til fastelavn klæder børn sig ud og slår katten af tønden.
Stillet 4×. Viser allerede (læs mere): s. 128 l. 27-43.

- **Fastetid** — s. 149, l. 59-60 (31 ord). *Hvorfor:* Glossary: what the fasting period is.
  > • fastetid – en periode, hvor man faster, dvs. slet ikke spiser eller ikke spiser det, man plejer at spise, eller hvor det er forbudt at spise bestemte ting, fx kød.

#### `tra-folkekirke-flertal` – Et flertal af befolkningen er medlem af folkekirken.
Stillet 3×. Viser allerede (læs mere): s. 93 l. 43.

- **Dåb, konfirmation, bryllup og begravelse** — s. 93, l. 43-46 (26 ord). *Hvorfor:* How most members use the church.
  > Mange danskere bruger først og fremmest kirken i forbindelse med dåb*, konfirmation*, bryllup og begravelse. En del danskere går også i kirke juleaften den 24. december.
- **Medlemskab** — s. 94, l. 6-13 (63 ord). *Hvorfor:* You join by baptism and can leave freely.
  > Det er frivilligt, om man vil være medlem af folkekirken. Man kan kun blive medlem ved at blive døbt*. De fleste medlemmer er blevet døbt som børn. Men man kan frit melde sig ud, hvis man ønsker det. Og forældrene kan også vælge, at deres barn ikke skal døbes. Hvis børnene så senere ønsker at blive medlem af folkekirken, skal de først døbes.
- **Kirkeskat** — s. 94, l. 19-23 (52 ord). *Hvorfor:* Members pay church tax; some costs are paid by all taxpayers.
  > Medlemmer af folkekirken betaler kirkeskat, der bruges til blandt andet at vedligeholde* kirkerne og kirkegårdene. Hvis man ikke er medlem, betaler man ikke kirkeskat til folkekirken. Men en del af udgifterne til kirken, blandt andet til noget af lønnen til præster og lønnen til biskopper, betales af alle borgere gennem deres skat.

#### `tra-pinse` – Pinse er en kristen højtid 7 uger efter påske.
Stillet 3×. Viser allerede (læs mere): s. 129 l. 20-25.

- **Jødisk påske og pinse** — s. 131, l. 27-31 (60 ord). *Hvorfor:* Jewish Passover and Pentecost - distinguish from the Christian feasts.
  > En af de vigtigste jødiske højtider er den jødiske påske. Den holdes blandt andet til minde om jødernes udvandring fra Ægypten. Der er tradition for, at man spiser lam og usyret brød under den jødiske påske. Under den jødiske pinse fejrer man pagtslutningen på Sinai’s bjerg – hvor Moses modtog de ti bud, og hvor jøderne indgik pagt med Gud.
- **Helligånden** — s. 151, l. 6-10 (29 ord). *Hvorfor:* Glossary: the Holy Spirit.
  > • Helligånden – i kristendommen mener man, at Gud består af tre dele: Faderen (Gud), Sønnen (Jesus Kristus) og Helligånden. Disse tre kaldes også Treenigheden (= tre i én).

#### `tra-paaske` – Påsken ligger om foråret.
Stillet 2×. Viser allerede (læs mere): s. 129 l. 10-11.

- **Påskedagene** — s. 128, l. 48-66 (81 ord). *Hvorfor:* The Easter days and traditions.
  > Påsken er en af de vigtigste højtider i den kristne religion. Den kristne påske markerer, at Jesus blev korsfæstet* og døde, og at han opstod* fra de døde. Påsken markeres med gudstjenester og koncerter i kirkerne. Påskedagene er palmesøndag, skærtorsdag, langfredag, påskedag og 2. påskedag. Alle disse dage er helligdage, hvor de fleste har fri fra arbejde eller skole. I mange familier samles man til påskefrokoster, hvor man spiser en stor frokost og ofte drikker en særlig øl, der kaldes påskebryg.
- **Påskeæg** — s. 129, l. 6-11 (40 ord). *Hvorfor:* Easter eggs; Easter falls in March or April.
  > Fra gammel tid er der også en tradition for, at man giver påskeæg. I dag er påskeæg ofte lavet af chokolade. Påsken ligger hvert år om foråret i enten marts eller april, men altså modsat julen ikke på faste datoer.

#### `tra-begravet` – Man behøver ikke være medlem af folkekirken for at blive begravet på en folkekirkegård.
Stillet 2×. Viser allerede (læs mere): s. 94 l. 26-27.

- **Kirkelig eller borgerlig begravelse** — s. 94, l. 29-36 (64 ord). *Hvorfor:* Who decides; the church also registers births and deaths.
  > Begravelsen kan være kirkelig, hvor der medvirker en præst i folkekirken eller en præst i et andet trossamfund. Eller den kan være borgerlig. En borgerlig begravelse kan fx foregå i kirkens kapel* eller i et medborgerhus. Det er afdødes eller de efterladtes ønsker, der afgør, om begravelsen skal være kirkelig eller borgerlig. Folkekirken har også andre opgaver: fx registrering af fødsler, navngivning og dødsfald.

#### `tra-gift-kirke` – Man kan blive gift i folkekirken, hvis den ene person er medlem.
Stillet 2×. Viser allerede (læs mere): s. 94 l. 25-26.

- **Vielse i andre trossamfund** — s. 94, l. 45-54 (53 ord). *Hvorfor:* Recognised communities can perform legally valid weddings.
  > Man kan søge om anerkendelse* af menigheden eller trossamfundet. Når en menighed eller et trossamfund er godkendt, kan en præst (eller en anden religiøs leder) søge om at få en bemyndigelse* til at foretage vielser. På den måde kan medlemmer af et anerkendt trossamfund få en religiøs vielse, der samtidig er borgerligt gyldig.
- **Hvor man kan blive gift** — s. 42, l. 12-17 (50 ord). *Hvorfor:* Town hall, folkekirke or recognised religious communities.
  > Man kan blive gift på rådhuset, i den danske folkekirke eller i anerkendte trossamfund*. Hvis man vil have en religiøs vielse uden for den danske folkekirke, der samtidigt er borgerligt gyldig (det vil sige gyldigt i følge dansk lov), skal præsten (eller den religiøse leder) i trossamfundet have en bemyndigelse*.

#### Faktagruppe `fg-hoejtider` – Højtider og mærkedage
Viser allerede (læs mere): s. 128 l. 36-43, s. 129 l. 10-11, s. 129 l. 20-25, s. 129 l. 36-42, s. 129 l. 45-55, s. 129 l. 58-66, s. 130 l. 32-43.

- **1. maj** — s. 129, l. 30-33 (38 ord). *Hvorfor:* Workers' day - not a general day off.
  > 1. maj har siden 1889 været arbejdernes internationale demonstrations- og festdag. 1. maj arrangeres af fagforeninger og politiske organisationer. Det er forskelligt fra arbejdsplads til arbejdsplads, om man har fri den dag. Mange skolebørn har fri 1. maj.
- **Jul** — s. 130, l. 17-23 (88 ord). *Hvorfor:* 24-26 December and Christmas traditions.
  > I Danmark har man normalt fri fra arbejde og skole den 24., 25. og 26. december. Disse tre dage kaldes juleaftensdag, juledag og 2. juledag. I mange familier fejrer flere generationer juleaften sammen. Man har juletræ*, spiser en traditionel julemiddag, danser om juletræet, synger julesalmer og julesange og giver hinanden julegaver. I familier, hvor der er børn fra flere ægteskaber, holdes der ofte jul flere gange, så børnene både fejrer jul med deres far og deres mor. Juledag og 2. juledag samles man i mange familier til julefrokost.

### 10. Danmark i verden og forsvar (`verden`)

#### `ver-bosnien` – I 1990'erne var danske soldater udsendt til Bosnien som en del af FN's styrker.
Stillet 4×. Viser allerede (læs mere): s. 133 l. 37-40.

- **Fra fredsbevarende til aktivistisk** — s. 133, l. 22-30 (81 ord). *Hvorfor:* Denmark's foreign-policy shift after the Cold War.
  > I årene efter 2. Verdenskrig og frem til omkring 1990 deltog Danmark i mange af FN’s fredsbevarende missioner. Danmark udsendte soldater for at hjælpe med at løse konflikter og skabe fred rundt om i verden, fx ved at sørge for at våbenhviler blev overholdt og beskytte civilbefolkningen. Efter afslutningen af Den Kolde Krig (cirka 1990) udviklede Danmark lidt efter lidt en ”aktivistisk udenrigspolitik”. Det betød, at Danmark begyndte at deltage mere aktivt i internationale konflikter, også i andet end fredsbevarende missioner.
- **Kosovo 1999** — s. 133, l. 42-45 (44 ord). *Hvorfor:* The next Balkan conflict, where NATO intervened.
  > Også i Kosovo, som dengang var en provins i Serbien, var der borgerkrig i slutningen af 1990’erne. Her blev det albanske befolkningsflertal udsat for overgreb fra regeringen. Efter lange forhandlinger uden resultat greb NATO militært ind i 1999. Danske jagerfly deltog i NATO’s aktioner.

#### `ver-fn-1945` – Danmark blev medlem af FN i 1945.
Stillet 4×. Viser allerede (læs mere): s. 101 l. 9-10, s. 133 l. 6.

- **Hvad FN arbejder for** — s. 101, l. 10-18 (47 ord). *Hvorfor:* 193 states; peace, development, disasters.
  > FN er en sammenslutning af næsten alle stater i verden, i alt 193. FN’s formål er at skabe fred og udvikling i verden. FN arbejder bl.a. for at hjælpe ved store katastrofer (fx sult og naturkatastrofer). FN forsøger også at hjælpe i kampen mod analfabetisme og sygdomme.
- **Ordet 'FN'** — s. 150, l. 9-11 (32 ord). *Hvorfor:* Glossary: founded by 51 countries, Denmark among them.
  > • FN – De Forenede Nationer (UN – United Nations) en verdensorganisation, der blev dannet efter 2. verdenskrig i 1945 af 51 lande, bl.a. Danmark. FN har i dag (2021) 193 medlemslande.

#### `ver-nato-medlem` – Danmark er medlem af NATO.
Stillet 4×. Viser allerede (læs mere): s. 133 l. 6-11.

- **Den Kolde Krig** — s. 116, l. 17-26 (122 ord). *Hvorfor:* Why Denmark joined NATO in 1949.
  > Efter 2. Verdenskrig stoppede Danmark sin neutralitetspolitik* og blev i 1949 medlem af forsvarsalliancen NATO. Danmark havde også forsøgt at holde sig neutral under 2. Verdenskrig, men blev besat af Tyskland. Alliancen bestod af USA, Canada og en række lande i Vesteuropa. Over for NATO stod Warszawa-pagten med Sovjetunionen og en række lande i Østeuropa. Ved at komme med i NATO valgte Danmark side i Den Kolde Krig, mellem de to nye supermagter USA og Sovjetunionen. Den Kolde Krig var blandt andet en kamp om, hvem der havde det største og bedste militær og flest atomvåben. Men det var også en kamp mellem to forskellige politiske ideologier – på den ene side Vestens liberale markedsøkonomi*og på den anden side Sovjets kommunistiske planøkonomi*.
- **Rusland og Ukraine** — s. 135, l. 13-26 (99 ord). *Hvorfor:* Why NATO is again focused on defending its own territory.
  > Ruslands besættelse af halvøen Krim i Ukraine i 2014 samt krigen i Ukraine siden 2022 har skabt bekymring for, om Rusland også vil angribe andre lande. NATO er derfor vendt tilbage til sit oprindelige fokus på at kunne forsvare sit eget territorium* mod angreb fra andre lande. Derfor har Danmark for eksempel besluttet at bruge mange flere penge på forsvaret frem mod 2030, så vi sammen med de andre NATO-lande bedre vil kunne forsvare os mod et angreb. Desuden er det i 2024 besluttet, at der skal indkaldes flere soldater, og at værnepligten forlænges fra fire til 11 måneder.

#### `ver-vaernepligt` – Værnepligt er pligten til at forsvare Danmark (at være soldat).
Stillet 4×. Viser allerede (læs mere): s. 89 l. 36-39.

- **Forsvarets Dag** — s. 90, l. 31-40 (90 ord). *Hvorfor:* Everyone is called in; about half are found fit; lottery numbers.
  > Alle mænd og kvinder i Danmark over 18 år med dansk statsborgerskab har pligt til at være med til at forsvare landet. Det kaldes værnepligt. Derfor bliver alle, der bor i Danmark, automatisk indkaldt til den såkaldte ”Forsvarets Dag”. På ”Forsvarets Dag” skal de unge kvinder og mænd igennem forskellige tests og en helbredsundersøgelse. Det vurderes derefter, om de er egnede til militærtjeneste. Normalt bliver cirka halvdelen af de unge erklæret egnede. Derefter trækker alle et lodnummer, som skal bruges, hvis der ikke er frivillige nok til at aftjene værnepligt.
- **Militærnægter** — s. 90, l. 42-45 (42 ord). *Hvorfor:* Conscientious objectors serve in civil institutions.
  > Hvis man bliver tvunget til at aftjene værnepligt i enten Forsvaret eller Beredskabsstyrelsen, kan man nægte begge tjenester og søge om at aftjene sin værnepligt igennem militærnægterordningen. Så skal man aftjene sin værnepligt ved fx at arbejde i offentlige institutioner eller nødhjælpsorganisationer.
- **Hvor længe** — s. 90, l. 51-53 (29 ord). *Hvorfor:* 11 months in the armed forces, 9 in Beredskabsstyrelsen.
  > Hvis man frivilligt aftjener sin værnepligt, kan man vælge mellem at være i enten Forsvaret eller Beredskabsstyrelsen. Værnepligten varer normalt 11 måneder i Forsvaret og ni måneder i Beredskabsstyrelsen.

#### `ver-nato-1949` – Danmark blev medlem af NATO i 1949.
Stillet 3×. Viser allerede (læs mere): s. 116 l. 17-18, s. 133 l. 10.

- **Den Kolde Krig** — s. 116, l. 18-26 (107 ord). *Hvorfor:* The two blocs and the arms race.
  > Danmark havde også forsøgt at holde sig neutral under 2. Verdenskrig, men blev besat af Tyskland. Alliancen bestod af USA, Canada og en række lande i Vesteuropa. Over for NATO stod Warszawa-pagten med Sovjetunionen og en række lande i Østeuropa. Ved at komme med i NATO valgte Danmark side i Den Kolde Krig, mellem de to nye supermagter USA og Sovjetunionen. Den Kolde Krig var blandt andet en kamp om, hvem der havde det største og bedste militær og flest atomvåben. Men det var også en kamp mellem to forskellige politiske ideologier – på den ene side Vestens liberale markedsøkonomi*og på den anden side Sovjets kommunistiske planøkonomi*.

#### `ver-mep-antal` – Danmark har 15 medlemmer i Europa-Parlamentet (siden valget i 2024).
Stillet 3×. Viser allerede (læs mere): s. 83 l. 61-62, s. 100 l. 20-21.

- **Det Europæiske Råd og Kommissionen** — s. 99, l. 34-45 (65 ord). *Hvorfor:* The other EU institutions and Denmark's representation.
  > EU’s overordnede* politiske retningslinjer* vedtages* i Det Europæiske Råd (EU-topmøder). Her deltager den danske statsminister sammen med stats- og regeringschefer fra de andre EU-lande. Lige som de andre medlemslande i EU, sender Danmark en kommissær til Europa-kommissionen. Europa-Kommissionen er delt op i forskellige politiske områder – fx miljø, økonomi og landbrug. Hvert område ledes af en kommissær, og hvert land i EU har en EU-kommissær.
- **EU-formandskabet** — s. 100, l. 6-12 (45 ord). *Hvorfor:* Denmark held the presidency in 2025.
  > De forskellige lande i EU skiftes også til at have et såkaldt formandskab for Ministerrådet. Dette går på skift hver sjette måned, og landet, der har "EU-formandskabet", leder møderne i rådet og i en lang række udvalg og komiteer. Sidste danske EU-formandskab var i 2025.

#### `ver-fn-medlem` – Danmark er medlem af FN (De Forenede Nationer).
Stillet 2×. Viser allerede (læs mere): s. 101 l. 9-10.

- **Sikkerhedsrådet** — s. 101, l. 34-40 (60 ord). *Hvorfor:* Permanent members, and Denmark's seat in 2025-26.
  > FN har et sikkerhedsråd. FN’s sikkerhedsråd spiller en stor rolle for arbejdet for fred i verden. Frankrig, Kina, Rusland, Storbritannien og USA har en fast plads i sikkerhedsrådet. Sikkerhedsrådet har ti øvrige medlemslande. De bliver valgt for to år ad gangen. Danmark er medlem af Sikkerhedsrådet i perioden 2025-26 og har tidligere været medlem i perioderne 1967-68, 1985-86 og 2005-06.
- **FN's 17 verdensmål** — s. 102, l. 9-21 (80 ord). *Hvorfor:* The Sustainable Development Goals apply to Denmark too.
  > FN’s medlemslande vedtog ved et topmøde i New York i september 2015 de nye verdensmål for bæredygtig udvikling. De 17 verdensmål gælder for alle verdens lande – og dermed også Danmark. Ud over bekæmpelse af fattigdom og social udvikling har verdensmålene også fokus på økonomisk udvikling, ligestilling, klima, fred og sikkerhed. Med verdensmålene har FN’s medlemslande således blandt andet forpligtet sig til at afskaffe ekstrem fattigdom, sikre uddannelse til alle, bedre sundhed, gode jobs og bæredygtig vækst i alle lande.

#### `ver-ep-stemmeprocent` – Stemmeprocenten ved valg til Europa-Parlamentet er lavere end ved folketingsvalg.
Stillet 2×. Viser allerede (læs mere): s. 100 l. 21-24, s. 82 l. 45-54.

- **Hvem kan stemme til Europa-Parlamentet** — s. 83, l. 57-62 (65 ord). *Hvorfor:* EU citizens, 18 years; 15 Danish members.
  > Der er valg til Europa-Parlamentet hvert femte år (2019, 2024, 2029 osv.). Valget foregår inden for samme periode i alle EU-landene. Man har valgret til Europa-Parlamentsvalget i Danmark, hvis man er statsborger i et EU-land og er fyldt 18 år. Man kan som EU-borger stemme i det EU-land, hvor man bor, eller i det EU-land, hvor man er statsborger. Danmark vælger 15 medlemmer til Europa-Parlamentet.

#### `ver-ep-valgt-af` – Medlemmerne af Europa-Parlamentet vælges af befolkningerne i EU-landene.
Stillet 1×. Viser allerede (læs mere): s. 100 l. 14-19.

- **720 medlemmer** — s. 100, l. 20-21 (18 ord). *Hvorfor:* Size of the Parliament.
  > Der afholdes valg hvert femte år. Europa-Parlamentet har i alt 720 medlemmer, hvoraf 15 er valgt i Danmark.
- **EU-Domstolen** — s. 100, l. 26-29 (38 ord). *Hvorfor:* The EU's court.
  > EU har desuden en domstol: EU-Domstolen. Den har omfattende rettigheder både til at tolke* EU’s traktat og til at tage stilling i retssager, der angår EU’s regler. Domstolen har haft stor betydning for den praktiske udformning af EU-samarbejdet.

#### `ver-tyskland-handel` – USA er Danmarks største handelspartner samlet (14,1 % af samhandlen i 2025), Tyskland er nr. 2 (12,7 %). Tyskland er det land, Danmark importerer mest fra; USA er det land, Danmark eksporterer mest til.
Stillet 1×. Viser allerede (læs mere): s. 32 l. 53-61.

- **EF-medlemskabet 1973** — s. 118, l. 39-45 (87 ord). *Hvorfor:* Trade was the main reason the yes-side wanted to join.
  > I 1973 blev Danmark medlem af EF (EU). Det skete efter en folkeafstemning, hvor danskerne skulle stemme ja eller nej til, om Danmark skulle være medlem. Et flertal på 63,4 procent stemte ja til EF. For ja-sigerne var det vigtigt, at Danmark fik bedre muligheder for at handle med andre europæiske lande, og at dansk landbrug kunne få økonomisk støtte fra EF. Nej-sigerne mente, at Danmark opgav noget af sin ret til at bestemme selv, og at medlemskabet ville gå ud over velfærdsstaten og danskernes nationale identitet*.

#### `ver-vaernepligt-koen` – I dag har både mænd og kvinder værnepligt i Danmark.
Stillet 1×. Viser allerede (læs mere): s. 90 l. 31-32, s. 90 l. 55-56.

- **Tal for 2024** — s. 91, l. 7-9 (43 ord). *Hvorfor:* How many men and women served in 2024.
  > I 2024 var der ca. 3.600 mænd, der aftjente værnepligt i Forsvaret, og ca. 1.100 kvinder gjorde frivillig tjeneste. I Beredskabet var der i 2024 ca. 420 mænd, som aftjente værnepligt, og ca. 110 kvinder gjorde frivillig tjeneste – i alt cirka 530.

#### `ver-bistand-afrika` – Størstedelen af den danske udviklingsbistand går til Afrika.
Stillet 1×. Viser allerede (læs mere): s. 103 l. 14-20.

- **Hvorfor Afrika** — s. 103, l. 22-28 (85 ord). *Hvorfor:* Africa is Europe's neighbour and the poorest continent.
  > Det hænger blandt andet sammen med, at Afrika er nabo til Europa, og at det, der sker i Afrika, kan have stor betydning for Europa (og dermed for Danmark). Der er stor forskel mellem de 54 afrikanske lande, men samlet set er Afrika verdens fattigste kontinent, flere steder er der borgerkrige og andre konflikter. Og det er i Afrika, at man mærker nogle af de værste konsekvenser af klimaforandringerne i form af for eksempel oversvømmelser, ekstrem varme, misvækst i landbruget og flere områder med ørken.
- **0,7 procent af BNI** — s. 102, l. 43-47 (49 ord). *Hvorfor:* Size of Danish aid in 2026.
  > Danmark giver hvert år økonomisk støtte til udviklingslande. Det kalder man for udviklingsbistand. Danmark er et af de lande i verden, der betaler mest i udviklingsbistand i forhold til befolkningens størrelse. Bistanden* i 2026 er på cirka 23 milliarder kroner svarende til 0,7 procent af den såkaldte bruttonationalindkomst (BNI).

#### `ver-folkeafstemning-eu` – Siden 1953 har der været flest folkeafstemninger om Danmarks forhold til EU.
Stillet 1×. Viser allerede (læs mere): s. 75 l. 53-55.

- **Maastricht og forbeholdene** — s. 98, l. 55-65 (107 ord). *Hvorfor:* The 1992 no-vote that led to the Danish opt-outs.
  > I 1992 var der en folkeafstemning i Danmark om en ny EU-traktat (Maastrichttraktaten), der skulle give EU mere indflydelse på medlemslandenes forhold. Danskerne skulle blandt andet stemme ja eller nej til, om Danmark skulle være med i et tættere økonomisk samarbejde med de andre EU-lande, og om man skulle have en fælles valuta. Et flertal stemte nej til den nye EU-traktat. De andre EU-lande sagde ja til den nye EU-traktat. Den danske regering besluttede derfor at forhandle med de andre EU-lande om at få nogle danske undtagelser*. Det betød, at Danmark fik nogle forbehold, det vil sige nogle områder, hvor Danmark ikke er med i EU-landenes samarbejde.
- **Forsvarsforbeholdet ophævet 2022** — s. 99, l. 24-28 (60 ord). *Hvorfor:* The latest EU referendum (67 % yes).
  > Tidligere havde Danmark også et forbehold over for EU’s forsvars- og sikkerhedspolitik, så Danmark for eksempel ikke deltog i militære operationer, som er en del af EU-samarbejdet. Dette såkaldte ’forsvars-forbehold’ blev ophævet, som følge af en folkeafstemning den 1. juni 2022. Et flertal på 67 procent stemte ja til at ophæve forbeholdet, mens et mindretal på 33 procent stemte nej.
- **Ja til EF i 1973** — s. 118, l. 39-41 (35 ord). *Hvorfor:* The first EU referendum: 63.4 % yes.
  > I 1973 blev Danmark medlem af EF (EU). Det skete efter en folkeafstemning, hvor danskerne skulle stemme ja eller nej til, om Danmark skulle være medlem. Et flertal på 63,4 procent stemte ja til EF.

#### `ver-vaernepligt-flere` – I 2024 blev det besluttet, at der skal indkaldes flere værnepligtige.
Stillet 1×. Viser allerede (læs mere): s. 91 l. 18-19, s. 135 l. 25-26.

- **Flere værnepligtige** — s. 91, l. 10-19 (72 ord). *Hvorfor:* Numbers over time and the goal of 7,500.
  > Tidligere var behovet for værnepligtige endnu større, og der var derfor flere værnepligtige i Forsvaret end i dag. Fx var det ca. 24.000 i 1970, 10.500 i 1990 men det tal faldt til ca. 4.300 frem mod 2015. De senere år er antallet steget lidt (til 4.700 i 2024). Og det er i 2024 besluttet, at der skal indkaldes endnu flere soldater, således at antallet af værnepligtige soldater skal øges til 7.500.

#### `ver-irak` – I 2003 sendte Danmark soldater til Irak efter en invasion ledet af USA.
Stillet 1×. Viser allerede (læs mere): s. 134 l. 31-43.

- **Afghanistan** — s. 134, l. 10-24 (118 ord). *Hvorfor:* The other big Danish war mission after 2001; 44 soldiers died.
  > Derfor invaderede styrker, ledet af NATO og med mandat fra FN, landet i oktober 2001 og afsatte den islamistiske Taliban-regering, der samarbejdede med Al Qaeda. I 2002 besluttede det danske Folketing at sende danske soldater til Afghanistan for at deltage i krigen. De danske soldater blev sammen med britiske soldater sendt til den sydlige Helmand-provins, der var en af de mest urolige i landet. I alt 44 danske soldater mistede livet. Efter 2014 var de danske udsendte soldaters opgave blevet at træne og støtte afghanerne, så de selv kunne stå for sikkerheden i landet – og siden er de danske soldater blevet trukket helt hjem. Efter 20 år med borgerkrig erobrede Taliban igen magten i Afghanistan i 2021.
- **Angreb med maling i Folketinget** — s. 141, l. 26-31 (54 ord). *Hvorfor:* A political crime linked to the Iraq war.
  > Andre gange bliver forbrydelser begået, fordi gerningsmændene ikke kan lide offerets politiske synspunkter. I 2003 angreb to mænd daværende statsminister Anders Fogh Rasmussen og udenrigsminister Per Stig Møller med maling i Folketinget på grund af Danmarks støtte til USA’s invasion af Irak (Irakkrigen). De to gerningsmænd blev idømt henholdsvis tre og fire måneders fængsel.

#### `ver-nato-forsvar` – I NATO samarbejder landene primært om forsvarspolitik.
Stillet 1×. Viser allerede (læs mere): s. 133 l. 6-12, s. 135 l. 20-21.

- **Efter 11. september 2001** — s. 133, l. 53-57 (50 ord). *Hvorfor:* Fighting terrorism became a NATO task.
  > Et vendepunkt for NATO og alle medlemslandene var terrorangrebet på USA den 11. september 2001. Her slog terrorister omkring 3.000 mennesker ihjel ved at kapre passagerfly og flyve dem ind i blandt andet ’World Trade Center’ i New York. Efter dette terrorangreb blev international bekæmpelse af terrorisme en vigtig opgave.

#### `ver-ep-valg-5-aar` – Der er valg til Europa-Parlamentet hvert 5. år.
Stillet 1×. Viser allerede (læs mere): s. 83 l. 57, s. 100 l. 20.

- **Hvem kan stemme til Europa-Parlamentet** — s. 83, l. 57-62 (65 ord). *Hvorfor:* Next elections 2029; EU citizens over 18 can vote.
  > Der er valg til Europa-Parlamentet hvert femte år (2019, 2024, 2029 osv.). Valget foregår inden for samme periode i alle EU-landene. Man har valgret til Europa-Parlamentsvalget i Danmark, hvis man er statsborger i et EU-land og er fyldt 18 år. Man kan som EU-borger stemme i det EU-land, hvor man bor, eller i det EU-land, hvor man er statsborger. Danmark vælger 15 medlemmer til Europa-Parlamentet.

#### `ver-eu-handel` – EU arbejder blandt andet for fri handel mellem medlemslandene.
Stillet 1×. Viser allerede (læs mere): s. 97 l. 31-34, s. 98 l. 23-24.

- **Euroen og kronen** — s. 98, l. 24-26 (28 ord). *Hvorfor:* Denmark kept the krone.
  > 21 af de 27 EU-lande har en fælles valuta – euroen. Danmark er ikke med i den fælles valuta, men har valgt at beholde den danske valuta (kronen).
- **EU's indflydelse** — s. 98, l. 39-46 (68 ord). *Hvorfor:* EU influence on the economy, agriculture and environment.
  > Fx har EU stor indflydelse på den økonomiske politik i Danmark. Det betyder bl.a., at EU har sat grænser for, hvor store underskud der kan være på det danske statsbudget. EU har også stor indflydelse på mange andre områder som fx landbrugspolitik og miljøpolitik. Men Danmark har også indflydelse på EU’s politik. Danske ministre og embedsmænd deltager i de møder i EU, hvor EU’s politikker og lovgivning fastlægges*.

#### Faktagruppe `fg-organisationer` – Internationale organisationer
Viser allerede (læs mere): s. 101 l. 9-10, s. 133 l. 6-11, s. 98 l. 6, s. 75 l. 53-55, s. 133 l. 37-40.

- **Europarådet** — s. 100, l. 44-51 (65 ord). *Hvorfor:* Not the EU: 47 countries, human-rights convention, Denmark since 1949.
  > Europarådet er en selvstændig organisation, der består af 47 europæiske lande. Danmark har været medlem fra starten i 1949. Europarådet har bl.a. vedtaget* Den Europæiske Menneskerettighedskonvention. Den indeholder en række grundlæggende rettigheder, som i et vist omfang svarer til de rettigheder, man kender fra den danske grundlov, fx ytringsfrihed og forsamlingsfrihed. Den indeholder også andre rettigheder, fx forbud mod tortur og ret til retfærdig rettergang.
- **Nordisk samarbejde** — s. 102, l. 31-35 (53 ord). *Hvorfor:* Norden and its councils.
  > Norden omfatter landene Danmark, Norge, Sverige, Finland og Island samt de selvstyrende områder Færøerne, Grønland (under Danmark) og Ålandsøerne (under Finland). Danmark samarbejder med de andre nordiske lande. Der samarbejdes bl.a. på det retlige, det kulturelle, det sociale og det økonomiske område. Det nordiske samarbejde foregår bl.a. i Nordisk Råd og Nordisk Ministerråd.

## 3. Bogstof uden en cluster: «Mere fra bogen» på emne-niveau

Prøverelevant stof, som ingen cluster dækker. Det vises som én blok nederst på hvert emne i Læs (se afsnit 5).

### Demokrati, grundlov og retsstat (`demokrati`)

- **Et demokrati i hverdagen** — s. 62, l. 6-27 (139 ord). *Hvorfor:* The opening of fakta-ark 11: elections, rights, associations as mini-democracies.
  > Danmark er et demokrati. Det viser sig fx både gennem regler for valg, ved de demokratiske rettigheder og i en demokratisk kultur. Når der er valg, er det borgerne, der vælger politikerne til Folketinget, kommunalbestyrelser, regionsråd og Europa-Parlamentet, og valgene er frie og hemmelige*. Borgerne har også rettigheder, som giver dem frihed til at gøre, hvad de vil, blot de overholder lovene. Myndighederne, som fx politiet eller kommunen, må som udgangspunkt ikke blande sig i, hvad borgerne laver. Borgerne har fx frihed til at danne foreninger og til at have den religion, de vil. Der er desuden mange foreninger i Danmark, der fungerer som et slags minidemokrati, hvor medlemmerne vælger ledelsen – og afsætter den – hvis der opstår uenighed mellem medlemmer og ledelse. Demokratiet er på den måde også med til at præge* samfundet og kulturen mere generelt.
- **Spørgetid** — s. 73, l. 20-29 (51 ord). *Hvorfor:* How the Folketing controls ministers every Wednesday.
  > Hver onsdag er der spørgetid i Folketinget. Her svarer en eller flere ministre på spørgsmål fra medlemmerne af Folketinget, og spørgeren og ministeren diskuterer svaret. På den måde kan folketingsmedlemmerne kontrollere, at ministrene fører* lovene ud i livet på den rigtige måde, eller have en mere generel politisk drøftelse* med ministrene.
- **Interesseorganisationer** — s. 86, l. 43-58 (112 ord). *Hvorfor:* How organisations try to influence politics.
  > Mange borgere er medlem af en interesseorganisation. Det er en sammenslutning* af personer, som har en interesse til fælles, fx en fagforening for rengøringspersonale eller en patientforening for personer med hjerteproblemer. Virksomheder kan også danne interesseorganisationer, fx organisationer for landmænd eller butiksejere. Der kan også være organisationer, der samler sig om en bestemt sag, fx Amnesty International eller Danmarks Naturfredningsforening. En interesseorganisation forsøger at få indflydelse på den politik, der føres på områder, som er vigtige for organisationens medlemmer. De store interesseorganisationer har således tit kontakt til politikere og embedsmænd og forsøger at påvirke politikerne – fx ved at give dem forskellige former for viden om emner, der er vigtige for interesseorganisationen.
- **Medier og politik** — s. 87, l. 34-44 (104 ord). *Hvorfor:* Letters to the editor, petitions, social media.
  > Man kan som borger forsøge at påvirke politikken ved at skrive et læserbrev til en avis. Man kan også henvende sig direkte til aviser eller TV for at gøre opmærksom på en sag og så håbe, at medierne vil tage sagen op. De elektroniske medier giver andre muligheder for at påvirke politikken. Gennem underskriftsindsamlinger via internettet eller i Facebookgrupper kan befolkningen debattere politikerne, partierne eller forskellige konkrete sager. Borgerne kan desuden vise deres utilfredshed med bestemte love eller bestemmelser og på den måde påvirke politikerne. Borgerne bruger også flittigt muligheden for at skrive kommentarer på avisernes hjemmesider eller indlæg på forskellige diskussionsfora på internettet.
- **Love mod diskrimination** — s. 139, l. 36-43 (99 ord). *Hvorfor:* What the anti-discrimination laws forbid (fakta-ark 25, not otherwise covered).
  > Der er en række love, som forbyder diskrimination, fx må man ikke fravælge ansøgere til et job eller nægte folk adgang til offentlige steder på grund af deres etniske oprindelse. Man må heller ikke offentligt sige eller skrive noget, der håner eller truer andre på grund af for eksempel deres race, hudfarve, religion eller seksuelle orientering. Ligesom det også er ulovligt offentligt at støtte eller opfordre til, at andre begår en forbrydelse – fx ved at støtte eller opfordre til vold mod en bestemt gruppe mennesker. Man må heller ikke offentligt udtrykke sin tydelige støtte til et begået terrorangreb.
- **Trusler mod politikere** — s. 141, l. 31-34 (40 ord). *Hvorfor:* Attacks on politicians are treated as especially serious.
  > Domstolene mente, at det var særligt alvorligt, at de havde angrebet repræsentanter for folkestyret. De senere årtier har Politiets Efterretningstjeneste måttet beskytte et stigende antal politikere med livvagter, fordi den vurderer, at flere politikere er truet af angreb eller chikane.

### Kongehus og rigsfællesskab (`kongehus`)

- **Grønland og USA** — s. 137, l. 21-23 (36 ord). *Hvorfor:* The current Greenland question.
  > De seneste år har den amerikanske præsident Donald Trump (født 1946) udtrykt ønske om, at Grønland skal blive en del af USA. Dette ønske er dog blevet afvist af både den grønlandske og den danske regering.

### Historie (`historie`)

- **Vikingetiden og Jellingestenen** — s. 108, l. 42-57 (69 ord). *Hvorfor:* Harald Blåtand, Danmarks dåbsattest.
  > Snart herefter blev større og større dele af Danmark styret af en konge. Kong Harald Blåtand, som døde i 987, rejste en runesten i Jelling. På den står der, at det var ham, Harald Blåtand, der samlede Danmark til ét rige. Denne sten kan man stadigvæk se i Jelling i Jylland. Man kalder stenen for Danmarks dåbsattest*, fordi der også står på stenen, at Harald Blåtand gjorde danskerne kristne.
- **Vikingerne** — s. 109, l. 12-22 (78 ord). *Hvorfor:* Raids, Svend Tveskæg and Knud den Store.
  > Perioden fra ca. 750 til ca. 1050 har fået navn efter vikingerne. Det var krigere fra Skandinavien (Danmark, Norge og Sverige), som sejlede ud på togter* til andre lande, fx England, Irland, Frankrig og Rusland. Og i 1013 lykkedes det den danske konge Svend Tveskæg at erobre England. De næste cirka 30 år – frem mod 1042 – var England regeret af flere danske konger. Den mest betydningsfulde var Knud den Store, der regerede mellem 1018 og 1035.
- **Pesten og Kalmarunionen** — s. 110, l. 24-33 (117 ord). *Hvorfor:* 1350 plague, 1397 Kalmar Union, Margrete 1.
  > I middelalderen blev Europa og Danmark ramt af pest – en sygdom, som slog mange mennesker ihjel. Det skete omkring 1350. Cirka en tredjedel af Danmarks befolkning døde. Det medførte store økonomiske og sociale forandringer i det danske samfund. Kongen fik igen mere magt – bl.a. fordi han ofte overtog den jord, som tilhørte personer, der døde af pesten. I 1397 blev Danmark, Norge og Sverige samlet i en union. Den fik navnet Kalmarunionen, fordi den blev indgået i den svenske by Kalmar. Af afgørende betydning for dannelsen af denne union var Margrete 1., der havde magten i de tre riger frem til sin død i 1412. De tre lande var samlet i Kalmarunionen frem til 1523.
- **Den Kolde Krig** — s. 116, l. 17-26 (122 ord). *Hvorfor:* NATO and the two blocs.
  > Efter 2. Verdenskrig stoppede Danmark sin neutralitetspolitik* og blev i 1949 medlem af forsvarsalliancen NATO. Danmark havde også forsøgt at holde sig neutral under 2. Verdenskrig, men blev besat af Tyskland. Alliancen bestod af USA, Canada og en række lande i Vesteuropa. Over for NATO stod Warszawa-pagten med Sovjetunionen og en række lande i Østeuropa. Ved at komme med i NATO valgte Danmark side i Den Kolde Krig, mellem de to nye supermagter USA og Sovjetunionen. Den Kolde Krig var blandt andet en kamp om, hvem der havde det største og bedste militær og flest atomvåben. Men det var også en kamp mellem to forskellige politiske ideologier – på den ene side Vestens liberale markedsøkonomi*og på den anden side Sovjets kommunistiske planøkonomi*.
- **Oliekrisen** — s. 118, l. 47-56 (59 ord). *Hvorfor:* The 1970s economic crisis.
  > I løbet af 1970’erne blev Danmark, som mange andre vestlige lande, ramt af en økonomisk krise. Krisen kom især fordi priserne på olie steg meget i 1973 og igen i 1979 på grund af krige og politiske problemer i Mellemøsten. Olie blev brugt i industrien og til at varme boliger op, og Danmark producerede dengang kun meget lidt olie.
- **Nej til atomkraft** — s. 119, l. 21-24 (35 ord). *Hvorfor:* 1985 decision against nuclear power.
  > Der var også stærke politiske bevægelser som fredsbevægelsen, der arbejdede mod oprustning* og våbenkapløb* mellem stormagterne, og miljøbevægelsen, der fx var imod atomkraft. I 1985 besluttede Folketinget, at der ikke skulle bygges atomkraftværker i Danmark.
- **Finanskrisen 2008** — s. 120, l. 18-26 (114 ord). *Hvorfor:* The biggest economic setback since WWII.
  > Efter cirka 15 år med god økonomi blev Danmark i 2008 ramt af en international finanskrise. Krisen startede i USA, men spredte sig hurtigt til Europa. I Danmark faldt værdien af landets samlede produktion med fem procent i 2008-09. Det var den største tilbagegang for dansk økonomi siden 2. Verdenskrig. Krisen betød, at flere blev arbejdsløse. Da krisen begyndte, var arbejdsløsheden den laveste i 30 år, og der var et stort overskud på statens budget. Senere kom der underskud, men Danmark fik alligevel ikke lige så store problemer med underskud og gæld som mange andre europæiske lande. Fra omkring 2015 er der igen kommet overskud på statens budget, og arbejdsløsheden i Danmark er faldet.
- **Corona** — s. 121, l. 31-35 (52 ord). *Hvorfor:* Vaccination against covid-19.
  > Et andet vigtigt middel til at bekæmpe sygdommen var at vaccinere befolkningen. Det tog kun cirka et år fra sygdommens begyndelse at udvikle vacciner mod coronavirus, og i december 2020 blev den første dansker vaccineret. Siden da er de fleste (cirka 90 procent af Danmarks befolkning) vaccineret med to eller tre stik.

### Geografi og befolkning (`geografi`)

- **Danmarks naboer** — s. 105, l. 6-10 (26 ord). *Hvorfor:* Norway north, Sweden north-east, Germany and Poland south.
  > Danmark ligger i den nordlige del af Europa. Norge ligger nord for Danmark, og Sverige ligger nordøst for Danmark. Syd for Danmark ligger Tyskland og Polen.
- **Klimaloven** — s. 144, l. 33-38 (78 ord). *Hvorfor:* 70 % reduction by 2030, climate neutral by 2050.
  > I 2019 blev de fleste politiske partier enige om en ny klimalov. I klimaloven står der, at regeringen frem til 2030 skal reducere Danmarks udledning af drivhusgasser med 70 procent i forhold til 1990. Der står også, at Danmark skal være klimaneutral senest i 2050, det vil sige, at man i Danmark ikke må udlede flere drivhusgasser, end man optager. Efter klimaloven blev vedtaget, har Folketinget og regeringen lavet en række aftaler om, hvordan man kan nå målene.

### Arbejdsmarked og erhverv (`arbejde`)

- **Flexicurity** — s. 23, l. 9-23 (117 ord). *Hvorfor:* The Danish model of easy hiring/firing plus security.
  > Sammenlignet med andre lande, er det relativt let at ansætte og fyre folk i Danmark. Det er fx let for arbejdsgiveren at ansætte nye medarbejdere i en periode, hvor der er meget arbejde i virksomheden. Omvendt er det også let at fyre medarbejdere, når der ikke er så meget arbejde. Det gør det meget fleksibelt for arbejdsgiveren at planlægge arbejdet. Til gengæld er de ansatte sikret økonomisk, fordi de kan få økonomisk støtte, hvis de bliver fyret. Normalt kan de som arbejdsløse nemlig få dagpenge (arbejdsløshedsdagpenge), hvis de er medlem af en arbejdsløshedskasse (a-kasse). Hvis de ikke er medlem af en a-kasse, er der mulighed for, at de kan få kontanthjælp ved at henvende sig til kommunen.
- **Ansættelsesbevis** — s. 26, l. 31-41 (91 ord). *Hvorfor:* What the employment contract must contain.
  > I loven står der, at alle, der arbejder mere end tre timer om ugen i over fire uger, skal have et ansættelsesbevis* senest en måned efter, at man er blevet ansat. I ansættelsesbeviset står der fx: • Hvad slags arbejde man skal lave • Hvornår man skal starte • Hvor mange timer man skal arbejde om ugen • Hvad man får i løn og eventuelt tillæg • Om man har ret til ferie med løn • Hvilken overenskomst man er dækket af* • Hvor langt varsel* arbejdsgiveren skal give ved fyring
- **At blive selvstændig** — s. 29, l. 48-62 (104 ord). *Hvorfor:* Registering a business and the duty to keep accounts.
  > Hvis man gerne vil være selvstændig erhvervsdrivende, skal man registrere sig hos Erhvervsstyrelsen via dens hjemmeside og give nogle få oplysninger. Man kan søge råd om, hvordan det er at arbejde som selvstændig hos en vækstkonsulent, der har stor erfaring i at hjælpe folk med at starte en virksomhed. Man kan også henvende sig til den lokale erhvervsrådgiver i kommunen. Endvidere er der kommunale kurser for folk, der gerne vil være selvstændige. På disse kurser kan man lære noget om økonomi, regnskab eller personaleledelse. Som selvstændig erhvervsdrivende har man bl.a. pligt til at føre regnskab, og virksomhedens overskud* eller underskud* skal opgives* til SKAT.
- **Danske medarbejdere tager ansvar** — s. 33, l. 33-43 (67 ord). *Hvorfor:* Danish workplace culture.
  > Dygtige, veluddannede medarbejdere er én vigtig kilde til, at danske firmaer klarer sig godt. God ledelse er en anden. Hertil hører også, at danske virksomheder mere end i de fleste lande er kendetegnet ved at give den enkelte medarbejder ansvar for sit eget arbejdsområde. Det forventes, at medarbejderen ikke blot gør, hvad der bliver sagt, men også selv tager ansvar og initiativ, naturligvis i forståelse med lederen.

### Velfærd, sundhed og familie (`velfaerd`)

- **Folkepension** — s. 37, l. 30-34 (56 ord). *Hvorfor:* State pension from 67 in 2026.
  > Når man bliver ældre, har man mulighed for at få folkepension. Formålet med folkepensionen er, at ældre skal have mulighed for at klare sig selv, når de ikke arbejder mere. Man kan i 2026 få folkepension, fra man er 67 år. Aldersgrænsen for at få folkepension bliver gradvist hævet i takt med, at befolkningen lever længere.
- **Ret til pension** — s. 37, l. 36-43 (97 ord). *Hvorfor:* Citizenship, residence and years lived in Denmark.
  > Man skal som hovedregel være dansk statsborger, have fast bopæl i Danmark og have boet i Danmark i mindst tre år fra det fyldte 15. år til folkepensionsalderen for at få ret til førtidspension eller folkepension. Har man boet i landet i mindre end 40 år, får man pension i forhold til, hvor mange år man har boet her. Der gælder særlige regler for personer, der bor i udlandet eller er EU-statsborgere eller flygtninge. Mange pensionister får udbetalt pension ved siden af folkepensionen. Det skyldes at de, i forbindelse med deres arbejde, har indbetalt til pensionsordninger (arbejdsmarkedspension).
- **Sygedagpenge, fleksjob og førtidspension** — s. 37, l. 23-28 (82 ord). *Hvorfor:* Help if you cannot work.
  > Hvis man er syg i længere tid, er der mulighed for at få sygedagpenge, hvis man har optjent retten til det enten ved at arbejde eller som medlem af en a-kasse. Hvis man ikke er i stand til at forsørge sig selv, fordi ens arbejdsevne er begrænset, kan løsningen fx være fleksjob, hvor man arbejder og tjener en del selv og får resten i offentlig ydelse. Hvis man har en varig og væsentlig nedsat evne til at arbejde, kan man få førtidspension.
- **Børnecheck** — s. 36, l. 26-29 (39 ord). *Hvorfor:* Child benefit; special rules for foreigners.
  > Forældrene kan få en ’børnecheck’ (børne- og ungeydelse), hvis de har børn under 18 år. Forældre, der har særlig høj indkomst, får en mindre ydelse eller slet ingen ydelse, afhængig af deres indkomst. For udlændinge gælder der særlige regler.
- **Skilsmisse** — s. 42, l. 44-62 (108 ord). *Hvorfor:* Separation, divorce and the right to remarry.
  > I Danmark ender cirka 40 procent af alle ægteskaber med en skilsmisse. Hvis man ikke ønsker at fortsætte sit ægteskab, har man ret til at få separation. Separation er en slags prøvetid, hvor man stadig er gift, men normalt bor hver for sig. Efter et halvt års separation, har man ret til skilsmisse. Er ægtefællerne enige herom, kan de dog også blive skilt med det samme uden først at blive separeret. Selv om der er uenighed, kan man i visse situationer også blive skilt med det samme, hvis der fx er tale om utroskab eller vold. Efter en skilsmisse har begge parter ret til at gifte sig igen.
- **Akutmodtagelse** — s. 54, l. 29-33 (61 ord). *Hvorfor:* Call before you go to the emergency department.
  > På nogle sygehuse er der også akutmodtagelse. Man kan henvende sig hos akutmodtagelsen, hvis man har behov for hurtig lægehjælp, der ikke kræver ambulance. Det kan fx være, hvis man har brækket en arm eller forstuvet en fod. Det er gratis at blive behandlet hos akutmodtagelsen på de offentlige sygehuse. Man skal ringe til akutmodtagelsen, inden man møder op på sygehuset.
- **Tolk hos lægen** — s. 54, l. 57-59 (48 ord). *Hvorfor:* Right to an interpreter, sometimes for a fee.
  > Det er vigtigt, at læge og patient forstår hinanden. Hvis man har behov for tolk, når man skal til lægen eller på sygehuset, har man ret til, at der bliver tilkaldt en tolk. I nogle tilfælde skal man betale et gebyr*, for at der bliver tilkaldt en tolk.
- **Klage over forskelsbehandling** — s. 59, l. 18-19 (26 ord). *Hvorfor:* Ligebehandlingsnævnet - free to complain.
  > Hvis man oplever forskelsbehandling på grund af fx køn eller etnisk oprindelse i strid med loven, kan man klage til Ligebehandlingsnævnet. Det er gratis at klage.

### Uddannelse og børn (`uddannelse`)

- **Et videnssamfund** — s. 12, l. 6-13 (58 ord). *Hvorfor:* Why education matters so much in Denmark.
  > Uddannelse er meget vigtig, da de fleste job på det danske arbejdsmarked kræver, at man har en uddannelse. Det danske samfund kaldes ofte et videnssamfund. Det betyder, at stadig flere mennesker har et arbejde, hvor viden er den vigtigste ressource*. Derfor spiller uddannelse en helt afgørende* rolle for unge og voksne. Uddannelse er som regel gratis i Danmark.
- **FGU og STU** — s. 12, l. 35-45 (119 ord). *Hvorfor:* Programmes for young people who are not ready for a youth education.
  > FGU er for unge under 25 år, der ikke er i gang med eller har en ungdomsuddannelse, som ikke har et job, og som har behov for en særlig forberedende indsats for at gennemføre en ungdomsuddannelse eller komme i beskæftigelse. FGU har plads til, at unge er forskellige. Formålet med FGU er at gøre eleverne klar til at tage en ungdomsuddannelse eller et job. STU er for unge under 25 år med særlige behov, der ikke kan tage en ungdomsuddannelse. Formålet er at unge, som er udviklingshæmmede eller har andre særlige behov, bliver så parate som muligt til voksenlivet og måske også til en videre uddannelse eller et job. STU giver ikke i sig selv adgang til andre uddannelser.
- **Livslang læring og AMU** — s. 16, l. 9-25 (131 ord). *Hvorfor:* Adult and continuing education.
  > Der er en lang tradition for efteruddannelse i Danmark. Man taler ofte om, at livslang læring (læring gennem hele livet) er vigtig. Personer, der allerede har en uddannelse og erhvervserfaring, har mange muligheder for at videreuddanne sig. De kan fx tage en diplomuddannelse, som er en uddannelse på deltid*, hvor det faglige niveau svarer til en bacheloruddannelse. Uddannelsen tager typisk to til tre år på deltid, og man betaler for at gå på uddannelsen. Mange skoler, der tilbyder videregående uddannelser, har kurser, hvor det er muligt at læse ét fag ad gangen. Voksne kan også tage korte AMU-kurser. AMU står for arbejdsmarkedsuddannelser og er korterevarende kursusforløb primært rettet mod faglærte og ufaglærte. Der er mange forskellige arbejdsmarkedsuddannelser inden for handel, administration og ledelse, sundhed, bygge/ anlæg, jordbrug, køkken/restaurant, metalindustri, transport m.m.
- **Skole-hjem-samtaler** — s. 9, l. 9-21 (89 ord). *Hvorfor:* How parents and school cooperate.
  > På de fleste skoler inviteres forældrene mindst én gang om året til en samtale med barnets lærere. Det hedder skole-hjem-samtaler. I de ældste klasser er eleverne som regel med til samtalen. Til skole-hjemsamtalen snakker barnets lærer eller lærere med forældrene og evt. barnet om • Hvordan barnet har det socialt i klassen • Hvordan barnets faglige niveau er • Meddelelsesbogen og hvad der skal være fokus på i de næste måneder • Hvordan forældrene evt. kan hjælpe, hvis der er problemer En skole-hjem-samtale varer som regel omkring 15 minutter.

### Kultur og kendte danskere (`kultur`)

- **Tove Ditlevsen** — s. 124, l. 35-40 (73 ord). *Hvorfor:* Author missing from the cluster list.
  > En anden kendt forfatter er Tove Ditlevsen (1917-76). Hun voksede op i en fattig familie på Vesterbro i København, og hun drømte allerede som barn om at blive digter, selv om hendes far sagde, at det kunne piger ikke blive. Hun skrev både digte og romaner om at være barn, kvinde og fattig i datidens samfund, og blandt hendes hovedværker er Barndommens Gade (1943) samt bøgerne Barndom (1967), Ungdom (1967) og Gift (1971).
- **Olafur Eliasson** — s. 126, l. 6-12 (49 ord). *Hvorfor:* Artist missing from the cluster list.
  > En anden kunstner er dansk-islandske Olafur Eliasson (født 1967). Et af hans mest kendte værker er ’Your rainbow panorama’ (Din regnbueudsigt) (2011) oven på kunstmuseet ARoS i Aarhus, som er en 150 meter lang cirkelformet gangbro i glas, hvor man kan se ud over Aarhus i alle regnbuens farver.
- **Eurovision** — s. 125, l. 28-34 (82 ord). *Hvorfor:* Denmark's three wins.
  > Danmark har vundet Eurovision Song Contest (Det Europæiske Melodi Grand Prix) tre gange. Første gang var i 1963 med ’Dansevise’, som blev fremført af Grethe Ingmann (1938-90) og Jørgen Ingmann (1925-2015). Anden gang i år 2000 med ’Smuk som et stjerneskud/Fly on the Wings of Love’, skrevet og fremført af duoen Brødrene Olsen, der består af Jørgen Olsen (født 1950) og Niels Olsen (født 1954). Tredje gang var i 2013 med ’Only Teardrops’, som blev sunget af Emmelie de Forest (født 1993).

### Højtider, traditioner og religion (`traditioner`)

- **Religionsfrihed** — s. 93, l. 6-12 (53 ord). *Hvorfor:* You can choose, change or have no religion; since 1849.
  > I Danmark kan man selv vælge religion, og man har ret til at dyrke sin religion, så længe man respekterer nogle grundlæggende regler. Man kan også frit vælge at skifte religion. Og man kan vælge slet ikke at have en religion. Der er religionsfrihed i Danmark. Den blev stadfæstet med grundloven i 1849.
- **435 anerkendte trossamfund** — s. 95, l. 6-12 (36 ord). *Hvorfor:* The variety of recognised religious communities.
  > Der findes 435 anerkendte trossamfund og menigheder i Danmark. De er meget forskellige i størrelse og omfatter mange forskellige religioner. Langt de fleste er kristne, men der er også fx muslimske, buddhistiske, hinduistiske og jødiske trossamfund.
- **Ramadan og Eid** — s. 131, l. 11-22 (78 ord). *Hvorfor:* Muslim holidays marked in Danish institutions.
  > I takt med at flere folk i Danmark er muslimer, markerer flere institutioner på forskellig vis fejringen af Eid, dvs. festen, der markerer afslutningen på muslimernes fastemåned Ramadan. Ramadan holdes til minde om den måned, hvor profeten Muhammad ifølge Koranen fik sin første åbenbaring fra Allah via ærkeenglen Gabriel. I fastemåneden er der mange muslimer, der hverken spiser eller drikker, mens solen er på himlen. Når Ramadanen er forbi, fejres det med en fest, som hedder Eid al-Fitr.
- **Kinesisk nytår** — s. 131, l. 36-40 (49 ord). *Hvorfor:* Another holiday that has come to Denmark.
  > Af andre mærkedage, som er kommet til Danmark via den øgede kulturelle udveksling, kan nævnes kinesisk nytår. Kinesisk nytår er den vigtigste traditionelle kinesiske helligdag. Det kinesiske nytår starter på den første dag i den første måned i den kinesiske kalender og slutter med lanternefestival på den 15. dag.
- **Jul** — s. 130, l. 9-23 (116 ord). *Hvorfor:* Christmas Eve service and family traditions.
  > Julen markerer i den kristne tradition Jesu fødsel. Juleaftensdag, den 24. december, holdes der julegudstjenester, og den dag er der mange børn og voksne, der går i kirke. I Danmark har man normalt fri fra arbejde og skole den 24., 25. og 26. december. Disse tre dage kaldes juleaftensdag, juledag og 2. juledag. I mange familier fejrer flere generationer juleaften sammen. Man har juletræ*, spiser en traditionel julemiddag, danser om juletræet, synger julesalmer og julesange og giver hinanden julegaver. I familier, hvor der er børn fra flere ægteskaber, holdes der ofte jul flere gange, så børnene både fejrer jul med deres far og deres mor. Juledag og 2. juledag samles man i mange familier til julefrokost.

### Danmark i verden og forsvar (`verden`)

- **EU-medlemskabet 1973** — s. 98, l. 6-12 (44 ord). *Hvorfor:* How Denmark joined the EC.
  > Danmark blev medlem af EU, eller EF, som det hed dengang, i 1973. Det skete efter en folkeafstemning, hvor danskerne skulle stemme ja eller nej til, om Danmark skulle være medlem. Dengang var der ligesom nu både modstandere og tilhængere af medlemskabet i befolkningen.
- **De danske forbehold i dag** — s. 99, l. 6-22 (78 ord). *Hvorfor:* The euro and justice opt-outs that remain.
  > Danmarks forbehold handler blandt andet om: • Den fælles valuta, euroen. Dette forbehold betyder, at Danmark ikke har euroen som valuta. • Retligt samarbejde. Dette forbehold betyder, at Danmark ikke deltager i det fælles EU-samarbejde om fx nye fælles EU-regler om politi, strafferet, asyl, indvandring, skilsmisser og forældremyndighed. Danmark kan selv bestemme, om man vil afskaffe* et eller flere af forbeholdene. Forbeholdene vil kunne fjernes efter en ny folkeafstemning, hvor den danske befolkning stemmer for at afskaffe dem.
- **Europarådet** — s. 100, l. 44-51 (65 ord). *Hvorfor:* Human-rights convention - not an EU body.
  > Europarådet er en selvstændig organisation, der består af 47 europæiske lande. Danmark har været medlem fra starten i 1949. Europarådet har bl.a. vedtaget* Den Europæiske Menneskerettighedskonvention. Den indeholder en række grundlæggende rettigheder, som i et vist omfang svarer til de rettigheder, man kender fra den danske grundlov, fx ytringsfrihed og forsamlingsfrihed. Den indeholder også andre rettigheder, fx forbud mod tortur og ret til retfærdig rettergang.
- **Global opvarmning** — s. 143, l. 43-47 (60 ord). *Hvorfor:* Temperature rise since 1850-1900 and the UN forecast.
  > Siden perioden 1850-1900 er temperaturen steget globalt med mere end én grad. Historisk er det en stor ændring på lidt over 100 år. Særligt de seneste årtier er det gået stærkt, og udviklingen ser ud til at fortsætte. FN forudser, at klimaet vil blive 1,4 til 4,4 grader varmere i slutningen af dette århundrede, end det var i perioden 1850-1900.
- **Paris-aftalen** — s. 144, l. 16-22 (84 ord). *Hvorfor:* International cooperation on climate.
  > Problemet kan derfor kun løses, hvis mange andre lande også reducerer deres udledning, og derfor er et internationalt samarbejde nødvendigt. Verdens lande – ikke mindst i FN – har haft fokus på at løse problemet. Og man har lavet mange internationale aftaler, bl.a. Paris-aftalen i 2015, hvor næsten alle verdens lande har skrevet under på, at de vil være med til at reducere den globale udledning af drivhusgasser over de kommende årtier. Desuden har man aftaler inden for EU med højere ambitioner end Paris-aftalen.
- **Arktis og Grønland** — s. 137, l. 14-19 (71 ord). *Hvorfor:* Security interests in the Arctic.
  > Det arktiske område er derfor stadig i fokus for dansk sikkerhedspolitik. De internationale stormagter USA, Rusland og Kina er dog alle interesserede i Arktis. Det er de, fordi landene har interesse i at beskytte deres eget land mod angreb fra andre. Men også fordi landene har økonomiske interesser i for eksempel minedrift og transport af varer med skib. Det kan udfordre Rigsfællesskabets mål om, at Arktis skal være et fredeligt område.
- **Støtte til Ukraine** — s. 135, l. 28-32 (60 ord). *Hvorfor:* The West's response to Russia's attack.
  > Som reaktion på det russiske angreb på Ukraine har Vesten støttet Ukraine med våben og træning, så landet kan forsvare sig mod det russiske angreb. Og Vesten har også forsøgt at svække den russiske økonomi ved at forbyde salg af en række varer til Rusland samt forbyde køb af russisk olie. Mange vestlige virksomheder har trukket sig ud af Rusland.

## 4. Bevidst udeladt – og hvorfor

- **Holberg og Arne Jacobsen:** «Læs mere» viser allerede bogens fulde tekst om personen (s. 123 l. 21–30 og s. 124 l. 42–57). Så alle spørgsmål får en udvidelse efter svar, får de arkets indledning og en anden person fra samme ark (Tove Ditlevsen og Olafur Eliasson).
- **Titelsider, indholdsfortegnelse, kolofon og indledning** (s. 1–4) og hvert arks «Dette fakta-ark handler om»-liste: ingen fakta.
- **Margentekst og sidehoved** («FAKTA-ARK n:», arkets titel, «LÆREMATERIALE TIL MEDBORGERSKABSPRØVEN», «NN / 156»): fjernet inde i uddragene; `check-result.txt` lister præcis, hvad der er udeladt for hvert uddrag.
- **Fotos og billedtekster**: udeladt, undtagen to billedtekster med selvstændige fakta: s. 119 l. 16–19 (statsministre med årstal) og s. 75 l. 36–45 (regeringen 3. juni 2026).
- **Gentagelser i bogen**: fx s. 98 l. 33–37 (= l. 14–21), s. 83 l. 37–42 (= s. 79 l. 25–30), s. 51 l. 32–35 (= s. 38 l. 53–57), s. 36 l. 34–47 (skole/SU, findes i ark 1–2), s. 135 l. 25–26 (= s. 91 l. 17–19), s. 74 l. 22–25 og s. 72 l. 36–38 (lovgivende magt, = s. 66). Kun den bedste version er brugt.
- **Detaljer langt fra prøven**: specialundervisning og lærerteams (s. 8 l. 12–37), FVU/OBU/avu-detaljer (s. 16 l. 27–57), erhvervsakademi-detaljer (s. 14 l. 47–57), a-kassens «Min Plan» (s. 29 l. 24–35), folketingsudvalg i detaljer (s. 73 l. 54–64), arbejdsmiljø i detaljer (s. 26 l. 6–26), asatro og guder (s. 108 l. 59–s. 109 l. 10), middelalderens stænder (s. 110 l. 12–22), coronarestriktioner (s. 121 l. 9–29), energiøernes teknik og opvarmning/elbiler (s. 145), Afrika-strategien (s. 103 l. 30–39), Arla-ejerskab (s. 31 l. 46–56), ikke-kristne højtider ud over Eid/kinesisk nytår/jødisk påske og pinse (s. 131 l. 45–52).
- **Statistik om hadforbrydelser og konkrete straffesager** (s. 139 l. 64–s. 140 l. 14, s. 141 l. 6–24): tal og citater, der hurtigt forældes, og s. 141 l. 10–12 citerer en hadefuld udtalelse ordret – det skal ikke dukke op i en læringspopup uden kontekst. Den generelle forklaring (s. 139 l. 36–43 og l. 58–62) er med.
- **Ordlisten** generelt: kun opslag, der præcist forklarer et prøveord, er med (anke, forfatning, besættelse, frie og hemmelige valg, forældremyndighed, skolebestyrelse, FN, rigsfællesskab, Johannes Døberen, midsommervisen, fastetid, Helligånden).
- **Bogens egne uoverensstemmelser** er ikke rettet: kvinder i Folketinget er 48 % (s. 59) og 49 % (s. 83); stemmeprocent ved folketingsvalg «cirka 85» (s. 82) og «84» i 2026 (s. 100). Uddragene citerer bogen ordret; sitet skriver allerede «48–49 %».

## 5. Regler for næste session (UI og data)

### 5.1 Anbefaling: samme ikon, ny sektion i den samme popover

**Anbefalet:** ingen ny knap. Det eksisterende bog-ikon («Læs mere i bogen») åbner den samme popover, som nu får to sektioner, når der er udvidelser:

1. **Sektion 1 – uændret:** de nuværende `book`-referencer (citat, «Åbn side N i bogen»).
2. **Sektion 2 – ny:** overskrift `bi("Mere fra bogen", "More from the book")`, adskilt af en tynd skillelinje. For hvert uddrag: `title_da` som lille overskrift (h3/h4 i popoveren), citatlinjen «Læremateriale 2026 · side N, linje X–Y» (genbrug `refLabel`), `excerpt_da` i `blockquote.book-quote` og linket «Åbn side N i bogen» (genbrug den eksisterende linkkode). Til sidst ét link til den officielle kilde, som i dag.

Hvorfor ikke et separat ikon: (a) faktalinjen har allerede ét ikon, og to små ikoner side om side er svære at ramme på mobil (44 px trykområde hver); (b) brugeren har lært, at bogen = ét ikon; (c) popoveren har allerede scroll, fokusstyring, Esc og placering – alt genbruges; (d) kilden til faktaet står øverst, og konteksten kommer bagefter, så popoveren læses i den rigtige rækkefølge.

Ikonets tilstand: når et fakta har udvidelser, får knappen en lille prik/badge (CSS, `.book-btn.has-more`) og aria-label «Læs mere i bogen: side … – og N afsnit mere fra bogen». Popover-titlen forbliver «Læs mere i bogen».

### 5.2 Efter hvert svar: udvidelsen står inde i feedback-boksen

Brugerens krav: «after I answer each question some info show up about what I answered. make sure that in that info there is also the expansion part that is related around it.» Udvidelsen skal derfor stå **inde i den eksisterende forklaringsboks**, som vises efter hvert svar. Den skal stå der, uanset om svaret var rigtigt, forkert eller ubesvaret. Det er ikke nok, at den kun kan åbnes fra bog-ikonet eller står et andet sted på siden.

**Én komponent for alle sider.** Alle steder, hvor man svarer på et prøvespørgsmål, bruger `MBP.ui.questionCard` (`js/ui.js`). Den kalder `showExplanation(verdict)`, som lægger `explainPanel(q, verdict, next)` (`js/ui.js`, `function explainPanel`) ind i `div.explain-inner` under svarmulighederne. Ingen side har sin egen feedback, så ændringen laves ét sted: i `explainPanel`.

| Side | Kald | Hvornår feedbacken vises | verdict |
|---|---|---|---|
| Test, normal (`quiz.html`) | `js/quiz.js` `questionCard(q, {onAnswer, next})` i den normale quiz-løkke | Straks efter hvert svar | `true` / `false` |
| Test, prøvetilstand | `js/quiz.js` `showExam`: `questionCard(q, {feedback: false})` | Ikke under prøven (uændret). Efter aflevering i gennemgangen: `drawReview` → `questionCard(q, {review: {chosen}})` → `showExplanation` | `true` / `false` / `null` (ubesvaret) |
| Øv (`learn.html`) | `js/learn.js` `questionCard(q, {onAnswer, next})` | Straks efter hvert svar | `true` / `false` |
| Top 15 (`top15.html`) | Ingen `questionCard`; man svarer ikke | Ingen feedback-boks. Spørgsmål og svar vises med `withBook` (`js/top15.js`), så udvidelsen står i bog-popoveren (5.3) | – |

**Præcis placering i `explainPanel`.** `kids` bygges i denne rækkefølge; den nye blok indsættes som punkt 6:

1. verdict-linjen («Rigtigt» / «Ikke helt – svaret er …» / «Ikke besvaret – svaret er …»)
2. `div.fact`: faktaet med bog-ikonet (`withBook(…, c.book)`)
3. evt. «Bogen siger nu» / nobook-noten
4. `noteBoxes(c, true)`
5. evt. rettenøgle-noten (`q.official_correct`)
6. **NY: blokken «Mere fra bogen»**
7. «Stillet i N prøver: …» (`p.freq`)
8. «Næste»-knappen (`next`), som stadig er sidst og får fokus som i dag

- Blokken: `h("details", {class: "book-more book-more-feedback", open: true}, h("summary", …, bi("Mere fra bogen (N)", "More from the book (N)")), …uddrag)`. Hvert uddrag vises som i popoverens sektion 2 (5.1): `title_da`, citatlinjen via `refLabel`, `excerpt_da` i `blockquote.book-quote` og «Åbn side N i bogen». Punktlister og `*`-noten følger 5.4.
- Den er **åben som standard**, så teksten står synligt i feedbacken efter hvert svar. Brugeren kan folde den sammen. Valget huskes pr. enhed i `localStorage` (`mbp.bookMoreOpen`, læs/skriv i try/catch) og gælder for de næste svar.
- Ingen betingelse på `verdict`: blokken vises ens for `true`, `false` og `null`.
- Udvælgelse: `var more = (D.more && D.more[q.cluster_id]) || [];`. Det er alle uddrag for spørgsmålets cluster i JSON-rækkefølge. Hvert af de 500 spørgsmål har et `cluster_id`, og hver cluster har mindst ét uddrag, så **500 af 500** spørgsmål får blokken. `check_excerpts.py` tjekker det og fejler, hvis et spørgsmål mangler.
- Kun cluster-uddrag, ikke faktagruppe- eller emne-niveau: de handler om emnet bredt, ikke om spørgsmålet. Hvis `more` er tom (fremtidige data), udelades blokken.
- Ingen dobbeltvisning: i `explainPanel` kaldes `withBook(…, c.book)` **uden** `more`. Bog-ikonet i feedbacken viser kun sektion 1, fordi sektion 2 allerede står inline lige under.
- Bog-popoveren i Øv-lektionskortet og i Øv-opsummeringen (`withBook` i `js/learn.js`) får sektion 2 som i 5.3. Det er ikke feedback efter svar, så popoveren er nok der.
- Tjekliste til implementeringen: svar rigtigt og forkert i Test; aflever en prøve med et ubesvaret spørgsmål og se gennemgangen; svar i Øv; tjek et Holberg-spørgsmål (fx `2019-06-q25`) og et Arne Jacobsen-spørgsmål (fx `2017-06-q15`). Blokken skal stå mellem noterne og «Stillet i …» i alle tilfælde.

### 5.3 Placering pr. side

| Side / sted | Udvidelser? | Hvordan |
|---|---|---|
| Læs (`study.html`) – faktarækker (`factRow`) | Ja | Samme popover, sektion 2 med `more[cluster.id]`. |
| Læs – emne-intro-afsnit (`t.intro`) | Nej | Intro-afsnit beholder kun «læs mere». Udvidelser på emne-niveau vises i blokken nederst. |
| Læs – «Ændret siden prøven»-noter og øvrige noter | Nej | Uændret. |
| Læs – faktagrupper (`groupBlock`, `fg-book`-knappen) | Ja | Samme popover, sektion 2 med `more[group.id]`. |
| Læs – nederst i hvert emne (før `endBar`) | Ja (emne-niveau) | Ny blok: `<details class="book-more">` med `<summary>` «Mere fra bogen (N)» / «More from the book». Indholdet vises inline (ikke popover), fordi der er op til 8 uddrag. Lukket som standard. |
| Øv (`learn.html`) – lektionskort | Ja | Samme popover (via `withBook`). |
| Øv – opsummering «Det skal du se på igen» | Ja | Samme popover. |
| Feedback efter svar (`explainPanel` i `ui.js`): Test, prøve-gennemgang og Øv | Ja, **inline i boksen** | Blokken «Mere fra bogen» står åben inde i feedbacken efter hvert svar (5.2). Bog-ikonet her viser kun sektion 1. |
| Top 15 (`top15.html`) | Ja | Samme popover (cluster-id er kendt). |
| Selve prøvespørgsmålet før svar | Nej | Ingen bog-knap før man har svaret (som i dag). |

Teknisk: `withBook(el, refs)` får et valgfrit tredje argument `more` (liste fra `01-content-plan.json`). Alle popover-steder i tabellen med «Ja» sender `MBP.data.more[id] || []`; `explainPanel` sender intet og viser i stedet blokken fra 5.2. Hvis `refs` er tom, men `more` ikke er, vises knappen alligevel.

### 5.4 Data

- Kopiér `book-expansion/01-content-plan.json` til `data/book_more.json` (samme indhold). `tools/build_data.py` lægger den i bundlen som `more` (nøgle → liste). Brug `excerpt_da` som den er – genskab den **ikke** fra side/linjer.
- Kør `python3 book-expansion/check_excerpts.py` som en del af build-tjekket; den skal sige `ALL OK`.
- Nøglerne er cluster-id, faktagruppe-id (`fg-…`) eller emne-id (`demokrati`, `historie`, …). Rækkefølgen i listen er visningsrækkefølgen.
- `excerpt_da` er én linje. Punktlister står som `• punkt • punkt`: del på ` • ` og vis som `<ul>` (teksten før første `•` er indledningen). Ordliste-uddrag starter med `• ord – forklaring` og bliver ét punkt.
- Bogens `*` (ord forklaret i ordlisten) bevares ordret. Tilføj én gang nederst i sektion 2 en lille note: «* = forklaret i bogens ordliste, s. 147–155» / «* = explained in the book's glossary».
- Kun dansk tekst i uddragene (som i dag). Sektionsoverskrifter er tosprogede via `bi()`; `title_da` vises kun på dansk.

### 5.5 Billeder og figurer

- **Ingen billeder i popoverne.** Fotos er krediteret fotografer (Ritzau Scanpix m.fl.) og tilføjer ikke prøvefakta.
- To figurer er nyttige og kan få et **link**, ikke en indlejret kopi: kommunekortet med de fem regioner i farver (`bookdump/images/img-078-081.jpg`, side 78) og EU-kortet (`img-097-094.jpg`, side 97, «Grafik: EU»). Valgfrit: under `dem-regioner-5` og i emne-blokken for `verden` et ekstra link «Se kortet i bogen (side 78/97)» til `BOOK_PDF#page=78` / `#page=97`. Ikke i JSON'en; tag det kun med, hvis det er nemt.

### 5.6 Popoverens størrelse

Popoveren beholder sin maks-højde (360 px) og scroller indeni. Det største fakta, `dem-rettigheder`, får ca. 300 ord «læs mere» + ca. 190 ord udvidelse; faktagruppen `fg-aarstal` har allerede ca. 635 ord og får 160 mere. Det er acceptabelt med scroll; vis ikke uddragene sammenklappede i popoveren.

## 6. Filer i `book-expansion/`

- `01-content-plan.md` – denne fil (genereret af `gen_md.py`).
- `01-content-plan.json` – `{id: [{title_da, page, lines, excerpt_da}]}` (genereret af `build.py`).
- `spec.py` – beslutningerne (mål, overskrift, side, linjer, evt. start/slut-ankre, begrundelse).
- `bookclean.py` – læser `bookdump/pages` og fjerner margentekst/sidehoved; samler orddeling over linjeskift.
- `build.py` – spec → JSON. `gen_md.py` – JSON + spec → denne fil.
- `check_excerpts.py` → `check-result.txt` – beviser, at hvert uddrag er ordret bogtekst (to uafhængige tjek: renset tekst og rå sidefil), højst 150 ord, rigtigt id og ikke en kopi af faktaets egen «læs mere».
- Genbygning: `python3 book-expansion/build.py && python3 book-expansion/gen_md.py && python3 book-expansion/check_excerpts.py`.

