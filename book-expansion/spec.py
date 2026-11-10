"""The content decisions: which extra book passages go into the "Mere fra bogen" popup, and where.

Each entry: (target_id, title_da, page, lines, start, end, why)
- target_id: a cluster id, a fact-group id (fg-...) or a topic id (topic-level "Mere fra bogen").
- page/lines: physical lines in bookdump/pages/page-NNN.txt (same convention as the "book" refs).
- start/end (optional): the excerpt starts at the first occurrence of `start` and ends after the
  first following occurrence of `end` inside the cleaned text of those lines (to cut at sentence
  boundaries). None = from the first / to the last word of the cited lines.
- why: the reason it helps the learner (goes into 01-content-plan.md, not into the JSON).
build.py turns this into 01-content-plan.json; check_excerpts.py verifies every excerpt against the book.
"""

S = []


def E(target, title, page, lines, start=None, end=None, why=""):
    S.append(dict(target=target, title_da=title, page=page, lines=lines, start=start, end=end, why=why))


# =====================================================================================
# 1  DEMOKRATI, GRUNDLOV OG RETSSTAT  (fakta-ark 11, 12, 13, 14, 15, 16, 25)
# =====================================================================================
E("dem-rettigheder", "Boligens ukrænkelighed", 64, "13-20",
  why="A fourth constitutional right next to the three the exam asks about; good distractor knowledge.")
E("dem-rettigheder", "Religionsfrihed og folkekirkens særstilling", 64, "27-33",
  why="Explains what religious freedom means and why the folkekirke still has a special position.")
E("dem-rettigheder", "Frihed under ansvar", 139, "20-26",
  why="The limit on the freedoms: they may not be used to discriminate (links to fakta-ark 25).")

E("dem-kommunerne-boern", "Kommunernes andre opgaver", 77, "57-67", start="Kommunerne har også",
  why="Shows the full list of municipal tasks, so the learner can tell kommune from region/stat.")
E("dem-kommunerne-boern", "Ret til en plads i dagtilbud", 18, "19-24",
  why="Same responsibility seen from the childcare chapter: kommunen is responsible, parents pay part.")
E("dem-kommunerne-boern", "Kommunalbestyrelsen bestemmer", 79, "43-46",
  why="Who decides how many nurseries and schools there are.")

E("dem-2-og-2", "Hjemmestyre og selvstyre", 105, "12-24", start="Færøerne og Grønland regulerer",
  why="Why the Faroes and Greenland elect members at all: they are in the rigsfællesskab and their people are Danish citizens.")
E("dem-2-og-2", "Partierne fra Færøerne og Grønland", 85, "42-53",
  why="Names the four parties the 2+2 members came from in 2026.")

E("dem-forening", "Foreningsfriheden", 63, "53-56",
  why="The constitutional wording behind the fact: no permission is needed.")
E("dem-forening", "Foreninger med voldeligt formål", 64, "6-11",
  why="The one limit on freedom of association - a likely trap.")
E("dem-forening", "Frihed til at melde sig ind i et parti", 86, "17-23", start="Foreningsfriheden betyder",
  why="Applies the same freedom to political parties and gives the party-membership figure.")

E("dem-179", "Folketingets opgaver", 72, "39-45", start="I Folketinget diskuteres",
  why="What the 179 members actually do: laws, choosing the government, controlling ministers.")
E("dem-179", "Folketingets udvalg", 73, "40-48",
  why="Committees and the three readings of every bill.")

E("dem-grundlov-1953", "Valgretsalderen er sat ned", 63, "19-23", end="stemme og blive valgt.",
  why="How democracy was strengthened between 1849 and today (1915, voting age 30 -> 18).")
E("dem-grundlov-1953", "16 folkeafstemninger siden 1953", 75, "50-55",
  why="Connects 1953 to referendums; a frequent number in the exam.")

E("dem-kommuner-98", "Kommunalbestyrelsens størrelse", 79, "25-30",
  why="Size of the municipal councils (19-31, Copenhagen up to 55).")
E("dem-kommuner-98", "Kommunerne udskriver skat", 79, "48-51",
  why="Municipalities can levy taxes; regions cannot (see dem-borgmester).")

E("dem-statsborger-stemme", "Valgbar", 83, "6-10",
  why="The same conditions make you eligible to stand for the Folketing.")
E("dem-statsborger-stemme", "Valg til Europa-Parlamentet", 83, "57-62", start="Man har valgret",
  why="Contrast: for the EP you need EU citizenship, not Danish.")

E("dem-anke", "Offentlig adgang til retssalen", 69, "42-46",
  why="Other court rules that the exam can ask about.")
E("dem-anke", "Ordet 'anke'", 148, "29",
  why="Glossary line: anke = klage over.")

E("dem-betinget", "Ingen dødsstraf", 70, "9-10", end="dødsstraf i Danmark.",
  why="The ordinary punishments and the absence of the death penalty.")
E("dem-betinget", "Betingelser og samfundstjeneste", 70, "18-24", start="Disse betingelser",
  why="What the conditions can be and who usually gets a suspended sentence.")

E("dem-straffeattest", "Hvad står på straffeattesten", 70, "43-50",
  why="What goes on the record and when it is deleted (2-5 years).")
E("dem-straffeattest", "Arbejdsgivere og straffeattest", 70, "52-55",
  why="Why it matters in practice, and that you get it from the police.")

E("dem-folketingsvalg", "Valgkortet", 84, "9-20", start="Nogle dage inden valget",
  why="How an election works in practice (polling card, ID if you forget it).")
E("dem-folketingsvalg", "Brevstemme", 84, "31-34",
  why="Voting before election day.")

E("dem-grundlov-1849", "Fra enevælde til grundlov", 112, "26-31",
  why="Why the constitution came: dissatisfaction with absolute monarchy.")
E("dem-grundlov-1849", "Frederik 7. og Rigsdagen", 112, "42-47",
  why="The king who gave up absolute power, and the first parliament (Folketing + Landsting).")

E("dem-valgdeltagelse", "Fire valg - fire niveauer", 82, "27-43",
  why="The four elections in Denmark; turnout differs between them.")

E("dem-borgmester", "Regionsrådsformand", 80, "29-34",
  why="The regional counterpart of the mayor, and how regions are financed.")
E("dem-borgmester", "Borgerservice", 77, "14-22",
  why="Where citizens meet the municipality in practice.")

E("dem-regioner-5", "De fem regioner - og Region Østdanmark", 80, "9-23",
  why="Lists the regions and the 2027 merger into Region Østdanmark (new in the 2026 book).")
E("dem-regioner-5", "Regionsrådet", 83, "46-49",
  why="41 members per regional council; regions mainly run hospitals.")

E("dem-1915", "Hvem kunne ikke stemme i 1849", 112, "49-53",
  why="Women, the poor and men under 30 got the vote with the 1915 change.")
E("dem-1915", "Første kvindelige minister", 59, "53-55",
  why="Nina Bang 1924 and Helle Thorning-Schmidt 2011 - the next milestones.")

E("dem-doemmende", "Politi og domstole", 68, "6-12",
  why="The police investigate, the courts decide.")
E("dem-doemmende", "Børn under 15 kan ikke straffes", 69, "9-20",
  why="Fines without a court case, and the age of criminal responsibility.")

E("dem-kommunalvalg", "Udlændinge kan stemme til kommunalvalg", 83, "29-35",
  why="Key trap: no Danish citizenship needed for local and regional elections (4 years' residence).")
E("dem-kommunalvalg", "Lokale partier", 83, "41-44", start="I kommunerne er der",
  why="Local parties that only stand in one municipality.")

E("dem-lovgivende", "Fra lovforslag til lov", 66, "18-25", start="De fleste lovforslag",
  why="Who proposes, who adopts, who signs a law.")
E("dem-lovgivende", "Tre behandlinger", 73, "45-48",
  why="Every bill gets three readings in the Folketing.")

E("dem-kvinder-folketing", "Kvinder i kommunalbestyrelser", 83, "41-42", end="af de valgte er kvinder.",
  why="Compare: about 36 % women in municipal councils.")
E("dem-kvinder-folketing", "Kvinder i regionsråd", 83, "46-48",
  why="Compare: about 50 % women in regional councils.")
E("dem-kvinder-folketing", "Samme politiske rettigheder", 59, "48-51",
  why="Women and men have the same political rights.")

E("dem-regionerne-sygehuse", "Frit sygehusvalg", 54, "35-41", end="er behandlingen på et privat sygehus gratis.",
  why="Free choice of hospital and the one-month rule for private hospitals.")
E("dem-regionerne-sygehuse", "Regionernes økonomi", 80, "29-31", end="regionsrådsformand i spidsen.",
  why="Regions get their money from the state, not from taxes of their own.")

E("dem-parti", "Enhver kan melde sig ind", 85, "18-21", start="Enhver kan",
  why="Anyone can join a party, and you can stand outside the parties.")
E("dem-parti", "Partierne vælger kandidater", 86, "29-38",
  why="Party members choose the candidates.")

E("dem-domstole-uafhaengige", "Idéen med magtens tredeling", 66, "42-54",
  why="Why power is divided; courts can also test laws against the constitution.")

E("dem-folkeafstemning-grundlov", "Folkeafstemninger om suverænitet", 82, "40-43",
  why="Other referendums: voting age and giving sovereignty to an international body.")
E("dem-folkeafstemning-grundlov", "Repræsentativt demokrati", 75, "50-55", end="sjældent, at et lovforslag lægges ud til folkeafstemning.",
  why="Why referendums are rare in Denmark.")

E("dem-moms", "Skat efter indkomst", 39, "20-26",
  why="Denmark is a high-tax country; the more you earn, the larger the share you pay.")
E("dem-moms", "Afgifter og andre skatter", 39, "31-36", start="Disse afgifter",
  why="Why there are extra duties, and other sources of state income.")

E("dem-1849-ikke-kvinder", "Rigsdagen i 1849", 112, "42-47", start="Grundloven betød",
  why="What the 1849 constitution did give: two chambers elected by part of the population.")
E("dem-1849-ikke-kvinder", "Et centralt princip i dag", 59, "29-31",
  why="Today no one may be hindered from voting because of gender.")

E("dem-regering", "Statsministeren og ministrene", 74, "40-46",
  why="Who chooses the ministers and how many there are.")
E("dem-regering", "Koalitions- og mindretalsregering", 75, "6-23",
  why="Explains the words used about the current four-party minority government.")

E("dem-stoerste-parti-2022", "Partierne i Folketinget efter valget i 2026", 85, "27-40",
  why="The 2026 book lists the parties by votes; Socialdemokratiet is still first.")

E("dem-demonstration", "Politiet kan stille krav", 87, "23-29", start="Politiet kan nogle gange",
  why="What the police can and cannot do about a demonstration.")
E("dem-demonstration", "Underskrifter og protester", 87, "17-19",
  why="Collecting signatures is more common than demonstrating.")

E("dem-anholdt-24t", "Politiets regler ved anholdelse", 68, "40-47",
  why="The rules that protect the arrested person.")

E("dem-forfatning", "Grundloven er den øverste lov", 62, "30-32", start="Grundloven indeholder",
  why="What the constitution contains and that other laws may not conflict with it.")
E("dem-forfatning", "Ordet 'forfatning'", 150, "17-18",
  why="Glossary definition.")

E("dem-hemmelig-stemme", "Stemmesedlen", 84, "22-29",
  why="How you vote on the ballot, including a blank vote.")
E("dem-hemmelig-stemme", "Frie og hemmelige valg", 151, "11-12",
  why="Glossary definition.")

E("dem-udskriver-valg", "Parlamentarisme", 72, "47-57",
  why="Why a government that loses a majority may call an election.")

E("dem-regeringsdannelse", "Parlamentarisme", 72, "47-57",
  why="A government cannot be appointed with a majority against it.")
E("dem-regeringsdannelse", "Regeringen præsenteres for kongen", 75, "36-45", end="(Radikale Venstre).",
  why="The 3 June 2026 government and its four party leaders (photo caption).")

# =====================================================================================
# 2  KONGEHUS OG RIGSFÆLLESSKAB  (fakta-ark 11, 19, 24)
# =====================================================================================
E("kon-rigsfaellesskab", "Hjemmestyre og selvstyre", 105, "12-20", start="Færøerne og Grønland regulerer",
  why="Home rule (Faroes) vs. self-government (Greenland), each with its own parliament.")
E("kon-rigsfaellesskab", "Fælles og ikke fælles", 153, "35-38",
  why="Glossary: what the three parts share (the monarch) and what they don't (flags).")
E("kon-rigsfaellesskab", "Grønland og USA", 137, "21-23",
  why="Current affairs in the 2026 book: the US wish to take over Greenland was rejected.")

E("kon-nytaarstale", "Kongen rejser og repræsenterer Danmark", 65, "28-33",
  why="The king's other official roles (state visits).")

E("kon-arv", "Et monarki", 65, "9-10",
  why="Definition of monarchy.")
E("kon-arv", "Enevælden 1660-1849", 65, "43-47",
  why="Hereditary monarchy since 1660; the last absolute king was Frederik 7.")

E("kon-rolle", "Statsbesøg", 65, "28-33",
  why="What the king does instead of politics.")
E("kon-rolle", "Ministrene gennemfører loven", 74, "30-34",
  why="After the king signs, the ministers carry the law out.")

E("kon-konge", "Kongefamilien", 65, "35-37",
  why="Queen Mary and the four children.")

E("kon-kronprins", "Det ældste barn arver", 65, "20",
  why="Why Christian is next: the eldest child inherits.")

E("kon-thule", "Grønlands strategiske betydning", 136, "9-18",
  why="Why the US base is in Greenland.")
E("kon-thule", "Arktis i fokus", 137, "14-19",
  why="The Arctic today: USA, Russia and China are interested.")
E("kon-thule", "Mere forsvar omkring Grønland", 137, "25-28",
  why="2025 decision to strengthen defence around Greenland.")

# =====================================================================================
# 3  HISTORIE  (fakta-ark 20, 21)
# =====================================================================================
E("his-foerste-kvindelige-sm", "Statsministre siden 1982", 119, "16-19", end="begravelse.",
  why="Photo caption listing five prime ministers with years - helps place Helle Thorning-Schmidt.")
E("his-foerste-kvindelige-sm", "Kvinder i politik i dag", 59, "45-46",
  why="Today almost half of the Folketing are women.")

E("his-foerste-kvindelige-sm-aar", "Statsministre siden 1982", 119, "16-19", end="begravelse.",
  why="Same caption: the years of each prime minister.")
E("his-foerste-kvindelige-sm-aar", "Kvinder i politik i dag", 59, "45-46",
  why="Today almost half of the Folketing are women.")

E("his-reformation", "Kristendommen kommer til Danmark", 109, "40-46",
  why="Before 1536 the church was Catholic for 5-600 years.")
E("his-reformation", "Kongen overtager kirkens jord", 110, "44-60",
  why="Consequences of the Reformation: the king's power, the Bible in Danish.")
E("his-reformation", "Stat og kirke er ikke adskilt", 93, "37-41",
  why="The link from 1536 to today's folkekirke.")

for cid in ("his-besat-aar", "his-besat-krig", "his-besat-land"):
    E(cid, "Samarbejde og modstand 1940-45", 114, "21-30", start="Regeringen besluttede",
      why="What happened between 9 April 1940 and 5 May 1945.")
E("his-besat-land", "Ordet 'besættelse'", 148, "41-48",
  why="Glossary entry that uses exactly this example: 'I 1940 besatte Tyskland Danmark.'")
E("his-besat-krig", "Fra neutralitet til NATO", 116, "17-19", end="blev besat af Tyskland.",
  why="Denmark had tried to stay neutral - which is why it joined NATO after the war.")

E("his-1864", "Et lille land", 113, "11-20", start="Nu blev Danmark",
  why="What 1864 meant: a smaller country that had to use its land better.")
E("his-1864", "Engang en stormagt", 108, "12-22",
  why="400 years ago the Danish king ruled Norway, Iceland and parts of Sweden and Germany.")

E("his-tyrkiet", "Indvandring fra 1980'erne", 119, "26-39", end="første gang i 1998.",
  why="What happened after the guest workers: more immigrants and the debate in the 1990s.")
E("his-tyrkiet", "Stramninger af udlændingepolitikken", 119, "39-48", start="Diskussionen fortsatte",
  why="Includes the citizenship conditions - directly relevant for test-takers.")

E("his-jernbaner", "Industrialisering og arbejderklassen", 113, "28-38", start="Og efter 1870",
  why="What the railways led to: factories, the working class and Socialdemokratiet.")

E("his-venstre-1870", "De gamle partier", 113, "40-46",
  why="Venstre 1870, Højre -> Konservative 1915-16, Radikale Venstre 1905.")

E("his-1814-norge", "Engang en stormagt", 108, "12-22",
  why="Norway was part of the Danish king's realm.")
E("his-1814-norge", "Norden i dag", 102, "31-35",
  why="Today Denmark and Norway cooperate in Nordisk Råd.")

E("his-befrielse", "Lys i vinduerne", 129, "38-42", start="Da meddelelsen",
  why="The tradition behind 4/5 May - candles in the windows.")
E("his-befrielse", "Modstandsbevægelsen", 114, "27-30",
  why="The last year and a half of the occupation; liberated by British troops.")

E("his-terror-2015", "Hadforbrydelser", 139, "58-62",
  why="Why attacks on minorities are punished especially hard.")
E("his-terror-2015", "Den jødiske minoritet", 140, "20-25",
  why="Jews in Denmark are particularly exposed to hate crimes.")

E("his-aeldste-parti", "De gamle partier", 113, "40-46",
  why="Founding dates: Venstre 1870, Konservative 1915-16, Radikale 1905.")
E("his-aeldste-parti", "SF dannes", 116, "32-34", start="Danmarks Kommunistiske Parti",
  why="SF founded 1958-59 - another party-age fact.")

E("his-1658", "Christian 4.", 111, "24-31",
  why="The famous king of the same period: Rundetårn, Børsen, Rosenborg.")
E("his-1658", "Enevælden indføres", 111, "37-53",
  why="The loss of Skåne led to absolute monarchy in 1660-61.")

E("his-marshall", "Marshall-planen og landbruget", 116, "31-39", start="Og så skulle",
  why="Why the US gave the money and what it changed in Denmark.")

E("his-roedstroemper", "Ungdomsoprøret", 117, "40-45",
  why="The youth revolt the women's movement grew out of.")
E("his-roedstroemper", "Fri abort og ligeløn", 118, "25-34", start="En meget vigtig sejr",
  why="The two big victories: free abortion 1973, equal pay 1976.")

E("his-1960erne", "Velfærdsstaten bygges", 117, "21-27",
  why="The welfare state was built in the 1960s and 70s.")
E("his-1960erne", "Kvinder på arbejdsmarkedet", 117, "29-35",
  why="Women at work and guest workers from Turkey, ex-Yugoslavia, Pakistan.")

E("his-s-regering-1929-82", "Borgerlig regering fra 1982", 118, "60-65", start="Men i",
  why="What came after: Schlüter's government and the years since 1982.")
E("his-s-regering-1929-82", "Statsministre siden 1982", 119, "16-19", end="begravelse.",
  why="Names and years of the prime ministers.")

E("his-landboreformer", "Gårdene flyttes ud", 112, "6-21",
  why="The visible result in the landscape - and that farmers still had no political rights.")

# =====================================================================================
# 4  GEOGRAFI OG BEFOLKNING  (fakta-ark 19, 26)
# =====================================================================================
E("geo-hoejeste-punkt", "Et fladt land", 106, "25-27", start="En stor del af landet",
  why="Fields, forest and the rocks on Bornholm.")
E("geo-hoejeste-punkt", "Jylland og over 400 øer", 105, "39-41",
  why="Basic geography: peninsula, islands, Sjælland the biggest, 7,300 km coast.")

E("geo-lillebaelt", "Danmarks andre farvande", 105, "43-45",
  why="Nordsøen/Vesterhavet, Skagerrak, Kattegat - Kattegat is the usual distractor.")
E("geo-lillebaelt", "Broerne", 105, "55-61",
  why="Which bridge crosses which water.")
E("geo-storebaelt", "Danmarks andre farvande", 105, "43-45",
  why="The other waters, so the learner can rule out distractors.")
E("geo-storebaelt", "Betaling på broerne", 39, "9-10",
  why="Storebæltsbroen and Øresundsbroen are the only toll bridges.")
E("geo-oresund", "Danmarks andre farvande", 105, "43-45",
  why="The other waters, so the learner can rule out distractors.")
E("geo-oresund", "Betaling på broerne", 39, "9-10",
  why="Øresundsbroen is a toll bridge.")
E("geo-lillebaeltsbro", "Broerne", 105, "55-61",
  why="All three main connections in one list.")

E("geo-aarhus", "Byer fra vikingetiden", 109, "26-28", start="Der opstod flere byer",
  why="Aarhus, Odense and Aalborg grew up in the Viking Age.")
E("geo-aarhus", "ARoS i Aarhus", 126, "6-12",
  why="A cultural landmark in Aarhus mentioned in the book.")
E("geo-odense", "H.C. Andersen fra Odense", 123, "36-37", start="H.C. Andersen blev født", end="da han var 14 år.",
  why="Links Odense to H.C. Andersen.")
E("geo-odense", "Byer fra vikingetiden", 109, "26-28", start="Der opstod flere byer",
  why="Odense is one of the old Viking-Age towns.")
E("geo-aalborg", "Byer fra vikingetiden", 109, "26-28", start="Der opstod flere byer",
  why="Aalborg is one of the old Viking-Age towns.")
E("geo-esbjerg", "Vestligste punkt", 106, "18-19",
  why="Blåvands Huk, near Esbjerg in West Jutland.")

E("geo-sydligste", "Vestligste og østligste punkt", 106, "18-22",
  why="Completes the four extreme points of Denmark.")
E("geo-grenen", "Vestligste og østligste punkt", 106, "18-22",
  why="Completes the four extreme points of Denmark.")
E("geo-grenen", "Skagensmalerne", 123, "56-64", start="I 1880’erne",
  why="Skagen is also known for the painters (P.S. Krøyer).")

E("geo-landbrug", "Grøn trepart", 146, "14-22",
  why="The 2024 plan: 15 % of farmland to become nature.")
E("geo-landbrug", "CO2-afgift på landbruget", 146, "24-26",
  why="First country with a CO2 tax on farming.")

E("geo-indbyggere", "Byer og hovedstadsområdet", 106, "37-41", start="De fleste mennesker",
  why="Where the six million live; about a third in the capital area.")
E("geo-indbyggere", "Flere ældre", 120, "28-32",
  why="Population trend: more elderly, fewer births.")

E("geo-areal", "Jylland og over 400 øer", 105, "39-41",
  why="What the 43,000 km² consist of.")
E("geo-areal", "Engang en stormagt", 108, "12-22",
  why="400 years ago the realm was much larger.")

E("geo-indvandrere", "Indvandring fra 1980'erne", 119, "26-31", end="det danske sprog.",
  why="Historical background for the immigrant share.")
E("geo-indvandrere", "Oplevet diskrimination", 139, "45-56",
  why="What studies show about discrimination of people with non-Western background.")

E("geo-region-hovedstaden", "Hvad regionerne laver", 80, "25-27",
  why="What a region is responsible for.")

# =====================================================================================
# 5  ARBEJDSMARKED OG ERHVERV  (fakta-ark 4, 5, 10, 26)
# =====================================================================================
E("arb-tillidsrepraesentant", "Tillidsrepræsentantens rolle", 25, "48-57",
  why="What the representative does - and that no one may force union membership.")
E("arb-tillidsrepraesentant", "Fyring og tillidsrepræsentant", 28, "35-39",
  why="The employer often has to talk to the representative before a dismissal.")

E("arb-vestas", "Vindmølleindustrien", 32, "36-38",
  why="History: Gedser-møllen and Tvind-møllen.")
E("arb-vestas", "Grøn produktion", 32, "40-42", start="I det",
  why="Denmark's strong 'green' position.")

E("arb-novo", "Høreapparater og vedvarende energi", 32, "31-34",
  why="Other world-leading Danish industries (hearing aids).")
E("arb-novo", "Andre internationale virksomheder", 32, "44-45",
  why="Rockwool, Grundfos, Danfoss, Velux - likely distractors.")

E("arb-37-timer", "Skifteholdsarbejde og overenskomst", 27, "13-23",
  why="Working hours are agreed in collective bargaining, not by law.")
E("arb-37-timer", "Ingen lovbestemt mindsteløn", 23, "49-51", end="Det afhænger af de kollektive overenskomster.",
  why="Folketinget decides neither weekly hours nor a minimum wage.")

E("arb-akasse-dagpenge", "A-kassen og staten", 29, "10-14", start="Arbejdsløshedskasserne",
  why="The state co-finances; you can join an a-kasse without a union.")
E("arb-akasse-dagpenge", "Pligter som ledig", 29, "20-27", end="aktivt skal søge job.",
  why="To get dagpenge you must be available and actively seek work.")
E("arb-akasse-dagpenge", "Uden a-kasse: kontanthjælp", 29, "37-43",
  why="What happens if you are not insured.")

E("arb-overenskomst", "Den danske model", 22, "28-33",
  why="Most rules are agreed by the parties, a system going back to 1899.")
E("arb-overenskomst", "Fredspligt, strejke og lockout", 22, "39-56",
  why="The words strike, lockout and fredspligt.")
E("arb-overenskomst", "Når staten griber ind", 24, "14-38",
  why="Holidays by law, and Folketinget ending the 2021 nurses' strike.")

E("arb-ferie", "Hvornår man holder ferie", 27, "53-58",
  why="Three weeks in a row between 1 May and 30 September.")
E("arb-ferie", "Ferie er bestemt ved lov", 24, "14-20",
  why="One of the few labour rules set by law.")

E("arb-lego", "Små og mellemstore virksomheder", 32, "9-23", end="kendt i hele verden.",
  why="Danish industry has traditionally been small and medium-sized companies.")
E("arb-lego", "Andre internationale virksomheder", 32, "44-45",
  why="Other famous companies and their products.")

E("arb-gravid", "Ved jobsamtalen", 26, "43-55",
  why="The employer may not ask about pregnancy, health history or religion.")
E("arb-gravid", "Forbud mod forskelsbehandling", 58, "41-44",
  why="The general ban on discrimination when hiring.")

E("arb-fagforening-pris", "Hvor mange er medlem", 24, "60-63",
  why="68 % are members today; it was 5 out of 6 in 1990.")
E("arb-fagforening-pris", "Tre store fagforeninger", 25, "23-34",
  why="HK, FOA and 3F and who they represent.")

E("arb-samarbejdsudvalg", "Arbejdsmiljørepræsentanten", 28, "12-25",
  why="The other workplace representative, also protected against dismissal.")
E("arb-samarbejdsudvalg", "Uformel medbestemmelse", 28, "27-30",
  why="Much influence in Danish workplaces is informal.")

E("arb-deltid", "Hvad er deltid", 27, "25-32",
  why="Definition; more women than men work part-time.")

E("arb-landmaend", "Andelsbevægelsen, Arla og Danish Crown", 31, "35-44",
  why="Organic farming and the cooperative dairies and slaughterhouses.")
E("arb-landmaend", "Landbruget fylder", 146, "9-12",
  why="Farming covers 60 % of Denmark's area.")

E("arb-vindenergi", "Vedvarende energi", 144, "50-52", start="Vedvarende",
  why="Renewables covered 50 % of energy use in 2025 (6 % in 1990).")
E("arb-vindenergi", "Energiøer", 144, "59-62", end="Jyllands vestkyst.",
  why="Next step: two energy islands in the 2030s.")

E("arb-fagforening-fyre", "Medlemskab er frivilligt", 25, "6-11", end="bestemt fagforening.",
  why="Neither employer nor colleagues may force you into a union.")
E("arb-fagforening-fyre", "Heller ikke en bestemt fagforening", 28, "47-55", start="En ansat",
  why="Same protection for not being in the same union as colleagues.")

E("arb-akasse-procent", "A-kassen og staten", 29, "10-14", start="Arbejdsløshedskasserne",
  why="How the a-kasse is financed, and that it is separate from the union.")

E("arb-beskaeftigelse", "Reformer for flere i arbejde", 120, "37-43", start="Desuden starter",
  why="Why politicians want more people in work.")

E("arb-ligeloen", "Før ligelønsloven", 118, "30-34",
  why="Equal pay came with the 1976 law; a concrete example from 1971.")
E("arb-ligeloen", "Ligebehandling efter ansættelse", 58, "46-55",
  why="Equal treatment also covers pay, dismissal and promotion.")

# =====================================================================================
# 6  VELFÆRD, SUNDHED OG FAMILIE  (fakta-ark 6, 7, 8, 9, 10)
# =====================================================================================
E("vel-bibliotek", "Lånerkort og online-tjenester", 51, "18-30",
  why="How to borrow (health card or library card) and eReolen/Filmstriben.")
E("vel-bibliotek", "Lektiecaféer og arrangementer", 51, "37-39",
  why="Libraries also run homework cafés.")

E("vel-gift-18", "Regler om ægteskab", 41, "45-63", end="ønske ægteskabet.",
  why="One spouse at a time, free choice, no forced marriage.")
E("vel-gift-18", "Hvor man kan blive gift", 42, "12-17",
  why="Town hall, folkekirke or recognised religious communities.")

E("vel-vaccine", "Sundhedsplejerske og børneundersøgelser", 55, "25-31",
  why="Free health visitor and seven free child check-ups (5 weeks-5 years).")

E("vel-tandlaege", "Hjælp til tandlægeregningen", 36, "12-14", start="På nogle områder",
  why="People with very low income can get help from the municipality.")

E("vel-myndig-18", "Ordet 'forældremyndighed'", 150, "26-27",
  why="Parental authority lasts until the child turns 18.")
E("vel-myndig-18", "At flytte hjemmefra", 45, "12-13",
  why="Most young people move out at 18-20.")

E("vel-slaa-boern", "Pligt til at anmelde", 45, "23-27",
  why="Anyone who knows of violence against children must tell the municipality.")
E("vel-slaa-boern", "Børns ret til at sige deres mening", 44, "32-37",
  why="Children's other rights.")

E("vel-barsel-stoette", "Graviditet og fødsel", 43, "28-40",
  why="Free check-ups with doctor and midwife; most give birth in hospital.")

E("vel-faedreorlov", "Begge arbejder", 42, "19-20",
  why="In most families both parents work and share the housework.")
E("vel-faedreorlov", "Sundhedsplejersken kommer", 43, "42-44",
  why="Free health-visitor visits after the birth.")

E("vel-sundhed-skat", "Velfærdssamfundets aftale", 35, "6-13",
  why="The deal: those who can work pay tax; the state helps those who cannot.")
E("vel-sundhed-skat", "Princippet", 35, "33-35",
  why="Everyone who can contributes; everyone in need can get help.")

E("vel-cigaretter-18", "Legitimation", 55, "58-59",
  why="Shops may ask for ID.")
E("vel-cigaretter-18", "Rygeloven", 55, "61-62", end="biografer.",
  why="Smoking is banned indoors in public places.")

E("vel-samme-koen", "Ægteskabet er ligeværdigt", 60, "16-23",
  why="Equality inside marriage.")
E("vel-samme-koen", "Adoption", 60, "42-43",
  why="Same-sex couples may adopt on equal terms.")

E("vel-laege", "Det gule sundhedskort", 38, "24-28", start="Og alle",
  why="Health card, sikringsgruppe 1 and referral to specialists.")
E("vel-laege", "Recept og håndkøbsmedicin", 53, "58-60",
  why="Prescription vs. over-the-counter medicine.")

E("vel-abort", "Kvinden bestemmer", 44, "19-27", start="Det er kvinden",
  why="No permission from the father; under 18 needs parents; it is free.")

E("vel-koerekort-17", "Kørekort hos borgerservice", 77, "20-22", start="Og man kan som regel",
  why="Where you get a driving licence or passport.")

E("vel-levetid", "Flere ældre, færre børn", 120, "28-37", end="1,9 i 1973).",
  why="Life expectancy for women and the fall in births.")

E("vel-boligstoette", "Hvad boligstøtten afhænger af", 38, "10-18", start="Den afhænger",
  why="Income, rent and size of the home; pensioners get more.")

E("vel-foraeldremyndighed", "Hvad fælles forældremyndighed betyder", 42, "31-39", start="Fælles forældremyndighed betyder",
  why="Name, school, religion - decided together; unmarried parents can make a declaration.")
E("vel-foraeldremyndighed", "Efter en skilsmisse", 43, "6-18",
  why="Familieretshuset helps if parents cannot agree.")

E("vel-oel-vin-16", "Nattelivszoner", 55, "55-56", start="I nattelivs-zoner",
  why="18 years to buy alcohol after 22 in nightlife zones.")
E("vel-oel-vin-16", "Livsstilssygdomme", 55, "43-46",
  why="Why the age limits exist.")

# =====================================================================================
# 7  UDDANNELSE OG BØRN  (fakta-ark 1, 2, 3)
# =====================================================================================
E("udd-undervisningspligt", "Folkeskolens trin og 10. klasse", 7, "14-22", end="går i skole med andre unge.",
  why="Indskoling, mellemtrin, udskoling; 10th grade is voluntary.")
E("udd-undervisningspligt", "Fag og formål", 6, "33-43",
  why="The subjects and the democratic purpose of the school.")

E("udd-karakter-12", "Karakterer og prøver", 8, "39-44",
  why="When grades start and when exams are taken.")

E("udd-gymnasium-gratis", "De fire gymnasiale uddannelser", 12, "53-61", start="De gymnasiale uddannelser",
  why="stx, hhx, htx, hf.")
E("udd-gymnasium-gratis", "Varighed og adgang", 13, "6-12",
  why="3 years (hf 2) and access to higher education.")
E("udd-gymnasium-gratis", "Videregående uddannelse er gratis", 14, "34-36",
  why="Higher education is free for citizens of Denmark and the EU.")

E("udd-friskole-betale", "Frie grundskoler", 10, "16-21",
  why="Self-governing schools that must match the folkeskole.")
E("udd-friskole-betale", "Offentlig støtte", 10, "23-25", start="De fleste frie",
  why="Most get public support, and must teach freedom and democracy.")

E("udd-boernehave-vuggestue", "Vuggestuen", 18, "38-46", start="Personalet",
  why="What the staff do in a nursery.")
E("udd-boernehave-vuggestue", "Børnehaven", 19, "9-20", start="I børnehaven",
  why="Kindergarten: play, language, holidays incl. Eid and Chinese New Year.")

E("udd-su-18", "Betingelser for SU", 15, "41-47",
  why="Study-active, limited earnings; non-citizens can apply for equal status.")

E("udd-efterskole", "Livet på en efterskole", 10, "33-42",
  why="Boarding school with optional subjects; it costs money.")

E("udd-skolestart", "SFO", 19, "27-31", end="skøjteløb.",
  why="After-school care for folkeskole children.")

E("udd-folkeskole-flest", "Demokrati i folkeskolen", 7, "54-57",
  why="The school prepares pupils for life in a democracy.")

E("udd-karakterer-8-klasse", "Meddelelsesbogen", 8, "24-29",
  why="Feedback before grades start.")
E("udd-karakterer-8-klasse", "Standpunktskarakterer", 8, "41-44", start="Skolen kan",
  why="Exception: grades can be given in 6th and 7th grade.")

E("udd-boern-passes", "Et politisk mål siden 1960'erne", 18, "6-12", end="uden for hjemmet.",
  why="Childcare was built to get women into work.")
E("udd-boern-passes", "Ret til en plads", 18, "19-24",
  why="Every child has the right to a place; parents pay part.")

E("udd-dagpleje", "Krav til dagplejere", 18, "56-61", start="For at blive godkendt",
  why="The municipality approves child minders.")

E("udd-laege-universitet", "Bachelor og kandidat", 15, "29-36", start="En bacheloruddannelse",
  why="3 + 2 years; eight universities.")
E("udd-laege-universitet", "Professionshøjskoler", 15, "9-18",
  why="Nurse, teacher, social worker - studied elsewhere (distractors).")

E("udd-elektriker", "Erhvervsuddannelser", 14, "6-11",
  why="Jobs reached through vocational education.")
E("udd-elektriker", "Grundforløb og hovedforløb", 14, "13-23",
  why="School + paid apprenticeship, 1½-5½ years.")

E("udd-skolebestyrelse", "Skolebestyrelsens opgaver", 9, "52-55", start="Skolebestyrelsen fastsætter",
  why="What the board decides.")
E("udd-skolebestyrelse", "Ordet 'skolebestyrelse'", 153, "50-55",
  why="Glossary: parents elect 5-7 parents every 4 years.")

# =====================================================================================
# 8  KULTUR OG KENDTE DANSKERE  (fakta-ark 22, 8)
# =====================================================================================
E("kul-hca-levede", "H.C. Andersens liv", 123, "36-38", start="H.C. Andersen blev født", end="ca. 125 sprog.",
  why="Born in Odense, son of a poor shoemaker; translated into 125 languages.")
E("kul-grimme-aelling", "Dyr og planter med menneskestemmer", 123, "39-41", start="Disse eventyr",
  why="What makes the fairy tales special; 'Grantræet' as another example.")
E("kul-druk", "Handlingen i 'Druk'", 125, "10-17", start="I ’Druk’",
  why="What the film is about.")
E("kul-druk", "Andre film af Vinterberg", 125, "19-22",
  why="Festen, Jagten, Kollektivet.")
E("kul-yahya-hassan", "Debatten om digtene", 126, "27-30", start="Hassans digte",
  why="Why the collection caused debate; best-selling poetry ever in Denmark.")
E("kul-kroeyer", "Skagensmalerne", 123, "56-64", start="Han blev uddannet",
  why="Skagen painters; paintings at Skagens Museum.")
E("kul-aqua", "28 millioner cd'er", 125, "37-38", start="Aqua solgte",
  why="One of the best-selling Danish bands.")
E("kul-aqua", "Eurovision", 125, "28-34",
  why="Denmark's three Eurovision wins (1963, 2000, 2013).")
E("kul-kierkegaard", "Retten og pligten til at vælge", 123, "44-51", start="Han understregede",
  why="His main idea and 'Enten-eller' (1843).")
E("kul-grundtvig", "Grundtvigs tanker om læring", 50, "42-46",
  why="Learning for its own sake; no exams at højskoler.")
E("kul-grundtvig", "Højskolerne i dag", 50, "9-12",
  why="About 70 folk high schools today.")
E("kul-blixen", "Noveller", 124, "32-33",
  why="Her other famous genre: 'Syv fantastiske fortællinger'.")
E("kul-bier-vinterberg", "Susanne Biers Oscar", 125, "24-26",
  why="Susanne Bier won an Oscar for 'Hævnen'.")
E("kul-bier-vinterberg", "Andre film af Vinterberg", 125, "19-22",
  why="Festen, Jagten, Kollektivet.")
E("kul-carl-nielsen", "Symfonier og sange", 124, "9-19", start="Med korværker",
  why="His symphonies and well-known Danish songs.")
E("kul-holberg", "Dansk kultur i det hele taget", 123, "6-10",
  why="The fact sheet's opening line: the arts tradition Holberg started.")
E("kul-holberg", "En anden kendt forfatter: Tove Ditlevsen", 124, "35-40",
  why="Another Danish writer from the same fact sheet.")
E("kul-arne-jacobsen", "Dansk kultur i det hele taget", 123, "6-10",
  why="The fact sheet's opening line, which names architecture.")
E("kul-arne-jacobsen", "En anden kunstner: Olafur Eliasson", 126, "6-12",
  why="Another artist, whose best-known work is a glass walkway on ARoS.")

# =====================================================================================
# 9  HØJTIDER, TRADITIONER OG RELIGION  (fakta-ark 17, 23)
# =====================================================================================
E("tra-grundlovsdag", "Frederik 7. og grundloven", 112, "42-44", end="5. juni 1849.",
  why="Why 5 June is the date.")
E("tra-sankthans", "Johannes Døberen", 149, "24-27",
  why="Glossary: why the feast is named after Sankt Hans (24 June).")
E("tra-sankthans", "Midsommervisen", 152, "6-9",
  why="The song sung at the bonfire.")
E("tra-fastelavn", "Fastetid", 149, "59-60",
  why="Glossary: what the fasting period is.")
E("tra-folkekirke-flertal", "Dåb, konfirmation, bryllup og begravelse", 93, "43-46", start="Mange danskere",
  why="How most members use the church.")
E("tra-folkekirke-flertal", "Medlemskab", 94, "6-13",
  why="You join by baptism and can leave freely.")
E("tra-folkekirke-flertal", "Kirkeskat", 94, "19-23",
  why="Members pay church tax; some costs are paid by all taxpayers.")
E("tra-pinse", "Jødisk påske og pinse", 131, "27-31",
  why="Jewish Passover and Pentecost - distinguish from the Christian feasts.")
E("tra-pinse", "Helligånden", 151, "6-10",
  why="Glossary: the Holy Spirit.")
E("tra-paaske", "Påskedagene", 128, "48-66",
  why="The Easter days and traditions.")
E("tra-paaske", "Påskeæg", 129, "6-11", end="ikke på faste datoer.",
  why="Easter eggs; Easter falls in March or April.")
E("tra-begravet", "Kirkelig eller borgerlig begravelse", 94, "29-36",
  why="Who decides; the church also registers births and deaths.")
E("tra-gift-kirke", "Vielse i andre trossamfund", 94, "45-54",
  why="Recognised communities can perform legally valid weddings.")
E("tra-gift-kirke", "Hvor man kan blive gift", 42, "12-17",
  why="Town hall, folkekirke or recognised religious communities.")

# =====================================================================================
# 10  DANMARK I VERDEN OG FORSVAR  (fakta-ark 18, 24, 26)
# =====================================================================================
E("ver-bosnien", "Fra fredsbevarende til aktivistisk", 133, "22-30",
  why="Denmark's foreign-policy shift after the Cold War.")
E("ver-bosnien", "Kosovo 1999", 133, "42-45",
  why="The next Balkan conflict, where NATO intervened.")

E("ver-fn-1945", "Hvad FN arbejder for", 101, "10-18", start="FN er en sammenslutning",
  why="193 states; peace, development, disasters.")
E("ver-fn-1945", "Ordet 'FN'", 150, "9-11",
  why="Glossary: founded by 51 countries, Denmark among them.")

E("ver-nato-medlem", "Den Kolde Krig", 116, "17-26",
  why="Why Denmark joined NATO in 1949.")
E("ver-nato-medlem", "Rusland og Ukraine", 135, "13-26",
  why="Why NATO is again focused on defending its own territory.")

E("ver-vaernepligt", "Forsvarets Dag", 90, "31-40",
  why="Everyone is called in; about half are found fit; lottery numbers.")
E("ver-vaernepligt", "Militærnægter", 90, "42-45",
  why="Conscientious objectors serve in civil institutions.")
E("ver-vaernepligt", "Hvor længe", 90, "51-53",
  why="11 months in the armed forces, 9 in Beredskabsstyrelsen.")

E("ver-nato-1949", "Den Kolde Krig", 116, "18-26", start="Danmark havde også",
  why="The two blocs and the arms race.")

E("ver-mep-antal", "Det Europæiske Råd og Kommissionen", 99, "34-45", end="har en EU-kommissær.",
  why="The other EU institutions and Denmark's representation.")
E("ver-mep-antal", "EU-formandskabet", 100, "6-12",
  why="Denmark held the presidency in 2025.")

E("ver-fn-medlem", "Sikkerhedsrådet", 101, "34-40",
  why="Permanent members, and Denmark's seat in 2025-26.")
E("ver-fn-medlem", "FN's 17 verdensmål", 102, "9-21",
  why="The Sustainable Development Goals apply to Denmark too.")

E("ver-ep-stemmeprocent", "Hvem kan stemme til Europa-Parlamentet", 83, "57-62",
  why="EU citizens, 18 years; 15 Danish members.")

E("ver-ep-valgt-af", "720 medlemmer", 100, "20-21", end="valgt i Danmark.",
  why="Size of the Parliament.")
E("ver-ep-valgt-af", "EU-Domstolen", 100, "26-29",
  why="The EU's court.")

E("ver-tyskland-handel", "EF-medlemskabet 1973", 118, "39-45",
  why="Trade was the main reason the yes-side wanted to join.")

E("ver-vaernepligt-koen", "Tal for 2024", 91, "7-9",
  why="How many men and women served in 2024.")

E("ver-bistand-afrika", "Hvorfor Afrika", 103, "22-28",
  why="Africa is Europe's neighbour and the poorest continent.")
E("ver-bistand-afrika", "0,7 procent af BNI", 102, "43-47",
  why="Size of Danish aid in 2026.")

E("ver-folkeafstemning-eu", "Maastricht og forbeholdene", 98, "55-65",
  why="The 1992 no-vote that led to the Danish opt-outs.")
E("ver-folkeafstemning-eu", "Forsvarsforbeholdet ophævet 2022", 99, "24-28",
  why="The latest EU referendum (67 % yes).")
E("ver-folkeafstemning-eu", "Ja til EF i 1973", 118, "39-41", end="stemte ja til EF.",
  why="The first EU referendum: 63.4 % yes.")

E("ver-vaernepligt-flere", "Flere værnepligtige", 91, "10-19", start="Tidligere var",
  why="Numbers over time and the goal of 7,500.")

E("ver-irak", "Afghanistan", 134, "10-24", start="Derfor invaderede",
  why="The other big Danish war mission after 2001; 44 soldiers died.")
E("ver-irak", "Angreb med maling i Folketinget", 141, "26-31", end="fængsel.",
  why="A political crime linked to the Iraq war.")

E("ver-nato-forsvar", "Efter 11. september 2001", 133, "53-57",
  why="Fighting terrorism became a NATO task.")

E("ver-ep-valg-5-aar", "Hvem kan stemme til Europa-Parlamentet", 83, "57-62",
  why="Next elections 2029; EU citizens over 18 can vote.")

E("ver-eu-handel", "Euroen og kronen", 98, "24-26", start="21 af de 27",
  why="Denmark kept the krone.")
E("ver-eu-handel", "EU's indflydelse", 98, "39-46",
  why="EU influence on the economy, agriculture and environment.")

# =====================================================================================
# FACT GROUPS (shown under the group table)
# =====================================================================================
E("fg-farvande", "Hvor Skagerrak og Kattegat mødes", 105, "63-64",
  why="Kattegat and Skagerrak meet at Grenen.")
E("fg-farvande", "Betaling på broerne", 39, "9-10",
  why="Toll on Storebælt and Øresund.")
E("fg-aarstal", "Kalmarunionen", 110, "30-34",
  why="1397-1523 and the union with Norway until 1814.")
E("fg-aarstal", "Enevælden 1660-1849", 65, "43-47",
  why="1660-61 and 1848-49 in one passage.")
E("fg-aarstal", "Ja til EF i 1973", 118, "39-41", end="stemte ja til EF.",
  why="1973 joining the EC.")
E("fg-hvem-styrer", "Tanken med lokalt selvstyre", 77, "6-12",
  why="Tasks solved as close to the citizens as possible.")
E("fg-hvem-styrer", "Aftalen med KL", 79, "32-41",
  why="How the government steers municipal budgets.")
E("fg-magt", "Regeringen har den udøvende magt", 74, "22-28",
  why="The government also leads the country politically.")
E("fg-aldre", "Regler for børn og unge", 44, "39-53",
  why="The full list of age rules in the book in one place.")
E("fg-tal", "Jylland og over 400 øer", 105, "39-41",
  why="More numbers: 400 islands, 7,300 km of coast.")
E("fg-tal", "720 medlemmer", 100, "20-21", end="valgt i Danmark.",
  why="15 of 720 MEPs.")
E("fg-valg", "Fire valg - fire niveauer", 82, "27-43",
  why="Overview of all elections.")
E("fg-byer", "Vestligste og østligste punkt", 106, "18-22",
  why="The other two extreme points.")
E("fg-kendte", "Tove Ditlevsen", 124, "35-40",
  why="A famous author not yet in the group table.")
E("fg-kendte", "Olafur Eliasson", 126, "6-12",
  why="A famous artist not yet in the group table.")
E("fg-virksomheder", "Arla og Danish Crown", 31, "40-44",
  why="Cooperative food companies.")
E("fg-virksomheder", "Høreapparater", 32, "31-34",
  why="Danish world-leading hearing-aid makers.")
E("fg-virksomheder", "ISS og serviceydelser", 33, "27-31",
  why="Danish service companies.")
E("fg-hoejtider", "1. maj", 129, "30-33",
  why="Workers' day - not a general day off.")
E("fg-hoejtider", "Jul", 130, "17-23",
  why="24-26 December and Christmas traditions.")
E("fg-gratis", "Lige adgang til ydelser", 36, "6-14",
  why="Most services are free for all; some only for low incomes.")
E("fg-gratis", "Gratis på sygehuset", 54, "46-55",
  why="Food, bedding and towels are free in public hospitals.")
E("fg-ja-nej", "Glemt valgkort", 84, "19-20", start="Man kan dog godt stemme",
  why="You can vote without the polling card if you bring ID.")
E("fg-organisationer", "Europarådet", 100, "44-51",
  why="Not the EU: 47 countries, human-rights convention, Denmark since 1949.")
E("fg-organisationer", "Nordisk samarbejde", 102, "31-35",
  why="Norden and its councils.")
E("fg-boernepasning", "SFO og klub", 19, "27-31", end="skøjteløb.",
  why="Care before and after school.")

# =====================================================================================
# TOPIC LEVEL ("Mere fra bogen" at the end of the topic page)
# =====================================================================================
E("demokrati", "Et demokrati i hverdagen", 62, "6-27",
  why="The opening of fakta-ark 11: elections, rights, associations as mini-democracies.")
E("demokrati", "Spørgetid", 73, "20-29",
  why="How the Folketing controls ministers every Wednesday.")
E("demokrati", "Interesseorganisationer", 86, "43-58",
  why="How organisations try to influence politics.")
E("demokrati", "Medier og politik", 87, "34-44",
  why="Letters to the editor, petitions, social media.")
E("demokrati", "Love mod diskrimination", 139, "36-43",
  why="What the anti-discrimination laws forbid (fakta-ark 25, not otherwise covered).")
E("demokrati", "Trusler mod politikere", 141, "31-34", start="Domstolene mente",
  why="Attacks on politicians are treated as especially serious.")

E("kongehus", "Grønland og USA", 137, "21-23",
  why="The current Greenland question.")

E("historie", "Vikingetiden og Jellingestenen", 108, "42-57",
  why="Harald Blåtand, Danmarks dåbsattest.")
E("historie", "Vikingerne", 109, "12-22",
  why="Raids, Svend Tveskæg and Knud den Store.")
E("historie", "Pesten og Kalmarunionen", 110, "24-33",
  why="1350 plague, 1397 Kalmar Union, Margrete 1.")
E("historie", "Den Kolde Krig", 116, "17-26",
  why="NATO and the two blocs.")
E("historie", "Oliekrisen", 118, "47-56",
  why="The 1970s economic crisis.")
E("historie", "Nej til atomkraft", 119, "21-24",
  why="1985 decision against nuclear power.")
E("historie", "Finanskrisen 2008", 120, "18-26",
  why="The biggest economic setback since WWII.")
E("historie", "Corona", 121, "31-35",
  why="Vaccination against covid-19.")

E("geografi", "Danmarks naboer", 105, "6-10",
  why="Norway north, Sweden north-east, Germany and Poland south.")
E("geografi", "Klimaloven", 144, "33-38",
  why="70 % reduction by 2030, climate neutral by 2050.")

E("arbejde", "Flexicurity", 23, "9-23", end="til kommunen.",
  why="The Danish model of easy hiring/firing plus security.")
E("arbejde", "Ansættelsesbevis", 26, "31-41",
  why="What the employment contract must contain.")
E("arbejde", "At blive selvstændig", 29, "48-62",
  why="Registering a business and the duty to keep accounts.")
E("arbejde", "Danske medarbejdere tager ansvar", 33, "33-43",
  why="Danish workplace culture.")

E("velfaerd", "Folkepension", 37, "30-34",
  why="State pension from 67 in 2026.")
E("velfaerd", "Ret til pension", 37, "36-43",
  why="Citizenship, residence and years lived in Denmark.")
E("velfaerd", "Sygedagpenge, fleksjob og førtidspension", 37, "23-28",
  why="Help if you cannot work.")
E("velfaerd", "Børnecheck", 36, "26-29",
  why="Child benefit; special rules for foreigners.")
E("velfaerd", "Skilsmisse", 42, "44-62",
  why="Separation, divorce and the right to remarry.")
E("velfaerd", "Akutmodtagelse", 54, "29-33",
  why="Call before you go to the emergency department.")
E("velfaerd", "Tolk hos lægen", 54, "57-59",
  why="Right to an interpreter, sometimes for a fee.")
E("velfaerd", "Klage over forskelsbehandling", 59, "18-19",
  why="Ligebehandlingsnævnet - free to complain.")

E("uddannelse", "Et videnssamfund", 12, "6-13", end="som regel gratis i Danmark.",
  why="Why education matters so much in Denmark.")
E("uddannelse", "FGU og STU", 12, "35-45",
  why="Programmes for young people who are not ready for a youth education.")
E("uddannelse", "Livslang læring og AMU", 16, "9-25",
  why="Adult and continuing education.")
E("uddannelse", "Skole-hjem-samtaler", 9, "9-21",
  why="How parents and school cooperate.")

E("kultur", "Tove Ditlevsen", 124, "35-40",
  why="Author missing from the cluster list.")
E("kultur", "Olafur Eliasson", 126, "6-12",
  why="Artist missing from the cluster list.")
E("kultur", "Eurovision", 125, "28-34",
  why="Denmark's three wins.")

E("traditioner", "Religionsfrihed", 93, "6-12",
  why="You can choose, change or have no religion; since 1849.")
E("traditioner", "435 anerkendte trossamfund", 95, "6-12",
  why="The variety of recognised religious communities.")
E("traditioner", "Ramadan og Eid", 131, "11-22",
  why="Muslim holidays marked in Danish institutions.")
E("traditioner", "Kinesisk nytår", 131, "36-40",
  why="Another holiday that has come to Denmark.")
E("traditioner", "Jul", 130, "9-23",
  why="Christmas Eve service and family traditions.")

E("verden", "EU-medlemskabet 1973", 98, "6-12",
  why="How Denmark joined the EC.")
E("verden", "De danske forbehold i dag", 99, "6-22",
  why="The euro and justice opt-outs that remain.")
E("verden", "Europarådet", 100, "44-51",
  why="Human-rights convention - not an EU body.")
E("verden", "Global opvarmning", 143, "43-47",
  why="Temperature rise since 1850-1900 and the UN forecast.")
E("verden", "Paris-aftalen", 144, "16-22",
  why="International cooperation on climate.")
E("verden", "Arktis og Grønland", 137, "14-19",
  why="Security interests in the Arctic.")
E("verden", "Støtte til Ukraine", 135, "28-32",
  why="The West's response to Russia's attack.")

