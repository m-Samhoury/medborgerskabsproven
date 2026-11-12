"""One-off: give every fact-group table row its own book references (data/fact_groups.json).

Each row lists cluster ids (their book refs are used) and/or explicit "page:lines" keys.
"more" lists indices into the group's "Mere fra bogen" excerpts (data/book_more.json) that belong to that row;
the group's other excerpts stay in a "Mere fra bogen" block under the table.
The group's own "book" becomes the union of its rows' refs.
"""
import json
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"

ROWS = {
    "fg-farvande": [["geo-lillebaelt", "geo-lillebaeltsbro"], ["geo-storebaelt"], ["geo-oresund"], ["105:43-61"]],
    "fg-aarstal": [["his-reformation"], ["111:20-22"], ["his-landboreformer"], ["110:34-42"], ["his-jernbaner"],
                   ["dem-1849-ikke-kvinder"], ["113:9-11"], ["his-venstre-1870"], ["dem-1915"], ["his-besat-aar"],
                   ["his-befrielse", "ver-fn-1945"], ["ver-nato-1949"], ["116:28-31"], ["dem-grundlov-1953"],
                   ["117:33-35"], ["98:6"], ["118:23-25"], ["ver-bosnien"], ["ver-irak"], ["59:53-55"],
                   ["140:40-45"], ["65:12-19"]],
    "fg-hvem-styrer": [["77:40-57", "79:10-12"], ["80:9-30"], ["66:9-40"]],
    "fg-magt": [["66:9-40"], ["66:9-40"], ["66:9-40"], ["69:29-40"], ["dem-anholdt-24t"]],
    "fg-aldre": [["18:38"], ["19:9"], ["6:29-31"], ["44:45-47"], ["45:29-33"],
                 ["45:18-21", "vel-gift-18", "44:45-47"], ["55:9-20"]],
    "fg-tal": [["72:29"], ["dem-2-og-2"], ["ver-mep-antal"], ["dem-kommuner-98"], ["dem-regioner-5"],
               ["dem-folketingsvalg", "dem-kommunalvalg"], ["ver-ep-valg-5-aar"], ["6:6-10"], ["8:50-52"],
               ["27:9-10"], ["27:43-47"], ["64:22-25"], ["106:24-25"], ["105:36-37"], ["106:36"], ["146:9-10"],
               ["82:45-54"], ["24:60-63"], ["22:58-59"], ["120:34-36"], ["vel-abort"]],
    "fg-valg": [["82:59-66", "82:45-54"], ["83:23-33"], ["83:55-62", "ver-ep-valgt-af", "100:21-24"]],
    "fg-byer": [["106:38-47"], ["geo-aarhus"], ["geo-odense"], ["geo-aalborg"], ["geo-esbjerg"], ["geo-grenen"],
                ["105:63-66"]],
    "fg-kendte": [["kul-hca-levede"], ["kul-blixen"], ["kul-holberg"], ["kul-kierkegaard"], ["kul-grundtvig"],
                  ["kul-kroeyer"], ["kul-carl-nielsen"], ["kul-arne-jacobsen"], ["kul-yahya-hassan"],
                  ["kul-bier-vinterberg"], ["kul-bier-vinterberg"], ["kul-aqua"], ["59:53-55"]],
    "fg-virksomheder": [["arb-vestas"], ["arb-novo"], ["arb-lego"], ["31:41-44"], ["33:9-10"], ["32:40-45"]],
    "fg-hoejtider": [["128:36-43"], ["129:10-11"], ["his-besat-aar"], ["129:36-42"], [], ["129:20-25"],
                     ["129:45-55"], ["129:58-66"], ["130:32-43"], ["kon-nytaarstale"], []],
    "fg-gratis": [["38:23-24"], ["54:20-21"], ["55:9-20", "vel-tandlaege"], ["55:9-20"], ["55:33-38"],
                  ["51:9-12"], ["12:55"], ["10:23-24"], ["24:57-58"]],
    "fg-ja-nej": [["63:46-51"], ["63:46-51"], ["70:10-18"], ["70:10-18"], ["82:61-66"], ["82:61-66"], ["44:41"],
                  ["59:33-35"], ["27:34-38"], ["27:34-38"], ["105:12-14"], ["55:9-20"], ["55:9-20"]],
    "fg-organisationer": [["101:9-10", "ver-bosnien"], ["133:6-11"], ["98:6", "ver-eu-handel", "75:53-55"]],
    "fg-boernepasning": [["udd-dagpleje"], ["18:38-56"], ["19:9"], ["6:29-31"], ["6:6-10"],
                         ["8:39-41", "8:50-52"], ["10:30-31"], ["45:20-21"]],
}

# Row index -> indices into the group's "Mere fra bogen" excerpts.
MORE = {
    "fg-farvande": {3: [0]},
    "fg-aarstal": {3: [0], 5: [1], 15: [2]},
    "fg-magt": {1: [0]},
    "fg-tal": {2: [1]},
    "fg-virksomheder": {3: [0]},
    "fg-gratis": {1: [1]},
}


def main():
    clusters = {c["id"]: c for c in json.loads((DATA / "clusters.json").read_text())}
    groups = json.loads((DATA / "fact_groups.json").read_text())
    for g in groups:
        spec = ROWS[g["id"]]
        assert len(spec) == len(g["rows"]), g["id"]
        union = []
        for i, (row, tokens) in enumerate(zip(g["rows"], spec)):
            refs = []
            for tok in tokens:
                if ":" in tok:
                    p, l = tok.split(":")
                    new = [{"page": int(p), "lines": l}]
                else:
                    new = clusters[tok]["book"]
                for r in new:
                    if r not in refs:
                        refs.append(r)
            row["book"] = refs
            more = MORE.get(g["id"], {}).get(i)
            if more:
                row["more"] = more
            else:
                row.pop("more", None)
            for r in refs:
                if r not in union:
                    union.append(r)
        g["book"] = union
    (DATA / "fact_groups.json").write_text(json.dumps(groups, ensure_ascii=False, indent=1) + "\n")
    print("rows with refs:", sum(1 for g in groups for r in g["rows"] if r["book"]),
          "of", sum(len(g["rows"]) for g in groups))


main()
