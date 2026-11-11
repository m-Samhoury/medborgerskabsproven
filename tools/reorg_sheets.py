#!/usr/bin/env python3
"""One-off re-keying of the site data from the 10 made-up topics to the book's 26 fakta-ark.

Kept in the repo for the record (see REORG_PLAN.md and IMPLEMENTATION_PLAN.md).

  python3 tools/reorg_sheets.py          Phase 1: re-key clusters, fact groups, topics, book_more.
  python3 tools/reorg_sheets.py intros   Phase 2: fill topics.json intro[] from the book (Danish).

The first command refuses to run twice: once topics.json has 26 entries it exits.
Run `python3 tools/build_data.py` after either command.
"""
import json
import pathlib
import re
import sys
from collections import OrderedDict

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
BOOK_EXPANSION = ROOT / "book-expansion"

# (sheet number, id, title_da, title_en, first page) - first page from the book's contents, page 4.
SHEETS = [
    (1, "skole", "Skole", "School", 5),
    (2, "uddannelse", "Uddannelse", "Education", 11),
    (3, "dagtilbud", "Dagtilbud", "Childcare and early years", 17),
    (4, "arbejdsmarked", "Det danske arbejdsmarked", "The Danish labour market", 21),
    (5, "erhvervsliv", "Dansk erhvervsliv", "Danish business and industry", 30),
    (6, "velfaerd", "Det danske velfærdssamfund", "The Danish welfare society", 34),
    (7, "familieliv", "Familieliv", "Family life", 40),
    (8, "foreningsliv", "Forenings- og fritidsliv", "Associations and leisure", 46),
    (9, "sundhed", "Sundhed og sygdom", "Health and illness", 52),
    (10, "ligestilling", "Ligestilling", "Equality", 57),
    (11, "grundloven", "Demokrati og grundloven", "Democracy and the Constitution", 61),
    (12, "retssamfund", "Det danske retssamfund", "The Danish justice system", 67),
    (13, "folketing", "Folketing og regering", "Parliament and government", 71),
    (14, "selvstyre", "Det lokale selvstyre", "Local self-government", 76),
    (15, "valg", "Folkestyret i praksis – valg og partier", "Democracy in practice – elections and parties", 81),
    (16, "rettigheder", "Borgernes rettigheder og pligter", "Citizens' rights and duties", 88),
    (17, "religion", "Religion og kirke", "Religion and church", 92),
    (18, "omverdenen", "Danmark og omverdenen", "Denmark and the wider world", 96),
    (19, "geografi", "Danmarks geografi og befolkning", "Denmark's geography and population", 104),
    (20, "historie-foer-1945", "Danmarks historie før 1945", "Danish history before 1945", 107),
    (21, "historie-efter-1945", "Danmarks historie efter 1945", "Danish history after 1945", 115),
    (22, "kultur", "Dansk kultur", "Danish culture", 122),
    (23, "traditioner", "Traditioner og mærkedage", "Traditions and special days", 127),
    (24, "forsvar", "Danmarks forsvars- og sikkerhedspolitik", "Denmark's defence and security policy", 132),
    (25, "diskrimination", "Diskrimination, antisemitisme, hadforbrydelser og ekstremisme",
     "Discrimination, antisemitism, hate crime and extremism", 138),
    (26, "klima", "Klima", "Climate", 142),
]
GLOSSARY_FIRST_PAGE = 147  # pages 147-156 are the Ordliste: not a sheet
LAST_PAGE = 146            # sheet 26 ends here

# Emoji kept in topics.json "icon" (some places may still read it).
ICON = {
    "skole": "🏫", "uddannelse": "🎓", "dagtilbud": "🧸", "arbejdsmarked": "🤝", "erhvervsliv": "🏭",
    "velfaerd": "☂️", "familieliv": "👪", "foreningsliv": "⚽", "sundhed": "🩺", "ligestilling": "⚖️",
    "grundloven": "👑", "retssamfund": "⚖️", "folketing": "🏛️", "selvstyre": "🏢", "valg": "🗳️",
    "rettigheder": "✋", "religion": "⛪", "omverdenen": "🌍", "geografi": "🗺️", "historie-foer-1945": "📜",
    "historie-efter-1945": "📺", "kultur": "🎨", "traditioner": "🎉", "forsvar": "🛡️",
    "diskrimination": "🚫", "klima": "🌡️",
}

# Fact groups whose main sheet is set by hand (see the comments).
FG_MAIN_OVERRIDE = {
    # override: famous Danes belong to Dansk kultur
    "fg-kendte": "kultur",
}

# Expected main sheets for the 15 fact groups (REORG_PLAN.md / IMPLEMENTATION_PLAN.md 1.3).
FG_EXPECTED = {
    "fg-farvande": "geografi", "fg-aarstal": "historie-foer-1945", "fg-hvem-styrer": "selvstyre",
    "fg-magt": "grundloven", "fg-aldre": "familieliv", "fg-tal": "valg", "fg-valg": "valg",
    "fg-byer": "geografi", "fg-kendte": "kultur", "fg-virksomheder": "erhvervsliv",
    "fg-hoejtider": "traditioner", "fg-gratis": "sundhed", "fg-ja-nej": "sundhed",
    "fg-organisationer": "forsvar", "fg-boernepasning": "dagtilbud",
}

# Where each "changed since the exam" box goes: (old topic, box index) -> sheet (IMPLEMENTATION_PLAN 1.4).
CURRENT_FACTS_TABLE = {
    ("demokrati", 0): "folketing",
    ("demokrati", 1): "valg",
    ("kongehus", 0): "grundloven",
    ("historie", 0): "historie-foer-1945",
    ("geografi", 0): "geografi",
    ("velfaerd", 0): "familieliv",
    ("velfaerd", 1): "historie-efter-1945",
    ("velfaerd", 2): "sundhed",
    ("velfaerd", 3): "sundhed",
    ("traditioner", 0): "traditioner",
    ("verden", 0): "valg",
    ("verden", 1): "erhvervsliv",
}

OLD_TOPIC_IDS = ["demokrati", "kongehus", "historie", "geografi", "arbejde", "velfaerd",
                 "uddannelse", "kultur", "traditioner", "verden"]

SHEET_IDS = [s[1] for s in SHEETS]
SHEET_BY_ID = {s[1]: s for s in SHEETS}


def sheet_of(page):
    """The sheet id a book page belongs to, or None for the glossary (and pages before sheet 1)."""
    if page >= GLOSSARY_FIRST_PAGE or page < SHEETS[0][4]:
        return None
    found = None
    for number, sid, _, _, first in SHEETS:
        if first <= page:
            found = sid
    return found


def weights(refs):
    """Sheet id -> number of cited book lines, in order of first appearance. Glossary refs are skipped."""
    w = OrderedDict()
    for ref in refs:
        sid = sheet_of(ref["page"])
        if sid is None:
            continue
        a, _, b = ref["lines"].partition("-")
        n = int(b or a) - int(a) + 1
        w[sid] = w.get(sid, 0) + n
    return w


def main_sheet(refs):
    """The sheet with the most cited lines; on a tie, the one cited first."""
    w = weights(refs)
    best, best_n = None, -1
    for sid, n in w.items():
        if n > best_n:
            best, best_n = sid, n
    return best


def first_line(item):
    return int(re.match(r"\d+", item["lines"]).group(0))


def assert_ids_ok(name, ids):
    for sid in ids:
        assert sid in SHEET_BY_ID, f"{name}: {sid} is not a sheet id"


def load(name):
    with open(DATA / name, encoding="utf-8") as f:
        return json.load(f)


def save(name, obj):
    with open(DATA / name, "w", encoding="utf-8", newline="\n") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
        f.write("\n")


def phase1():
    topics = load("topics.json")
    if len(topics) == 26:
        sys.exit("topics.json already has 26 entries: this one-off has run. Nothing changed.")
    clusters = load("clusters.json")
    groups = load("fact_groups.json")
    more = load("book_more.json")

    # Keep the old topics for the intros and the dropped-pointer list.
    with open(BOOK_EXPANSION / "old_topics.json", "w", encoding="utf-8", newline="\n") as f:
        json.dump(topics, f, ensure_ascii=False, indent=1)
        f.write("\n")

    # 1.2 clusters
    shared_two = shared_three = single = 0
    new_clusters = []
    for c in clusters:
        w = weights(c["book"])
        assert w, f"cluster {c['id']} has no sheet refs"
        main = main_sheet(c["book"])
        assert main is not None, c["id"]
        ids = [main] + [s for s in w if s != main]
        n = len(ids)
        single += n == 1
        shared_two += n == 2
        shared_three += n == 3
        out = OrderedDict()
        for k, v in c.items():
            if k == "topic_id":
                out["topic_id"] = main
                out["topic_ids"] = ids
            elif k == "topic_ids":
                continue
            else:
                out[k] = v
        new_clusters.append(out)
    assert (single, shared_two, shared_three) == (127, 40, 1), (single, shared_two, shared_three)
    assert single + shared_two + shared_three == 168
    print(f"clusters: {single} with one sheet, {shared_two} with two, {shared_three} with three")

    # 1.3 fact groups
    new_groups = []
    for g in groups:
        w = weights(g["book"])
        main = FG_MAIN_OVERRIDE.get(g["id"], main_sheet(g["book"]))
        others = [s for s, n in sorted(w.items(), key=lambda kv: -kv[1]) if n >= 5 and s != main]
        ids = [main] + others
        if g["id"] in FG_EXPECTED:
            assert FG_EXPECTED[g["id"]] == main, (g["id"], main)
        print(f"fact group {g['id']}: {ids}  (lines {dict(w)})")
        out = OrderedDict()
        for k, v in g.items():
            if k != "topic_ids":
                out[k] = v
            if k == "id":
                out["topic_ids"] = ids
        new_groups.append(out)

    # 1.4 topics
    old_by_id = {t["id"]: t for t in topics}
    cluster_by_id = {c["id"]: c for c in new_clusters}
    new_topics = []
    for i, (number, sid, title_da, title_en, first) in enumerate(SHEETS):
        last = SHEETS[i + 1][4] - 1 if i + 1 < len(SHEETS) else LAST_PAGE
        cids = [c["id"] for c in new_clusters if sid in c["topic_ids"]]
        cids.sort(key=lambda cid: (-cluster_by_id[cid]["times_asked"], cid))
        fgids = [g["id"] for g in new_groups if sid in g["topic_ids"]]
        qcount = sum(len(cluster_by_id[cid]["question_ids"]) for cid in cids)
        cur = []
        for (old, idx), target in CURRENT_FACTS_TABLE.items():
            if target != sid:
                continue
            box = old_by_id[old]["current_facts"][idx]
            assert main_sheet(box["book"]) == sid, (old, idx, main_sheet(box["book"]), sid)
            cur.append(box)
        t = OrderedDict([
            ("id", sid), ("order", number), ("sheet", number), ("icon", ICON[sid]),
            ("title_da", title_da), ("title_en", title_en), ("pages", [first, last]),
            ("intro", []), ("current_facts", cur), ("cluster_ids", cids),
            ("fact_group_ids", fgids), ("question_count", qcount),
        ])
        new_topics.append(t)
    total = sum(len(t["cluster_ids"]) for t in new_topics)
    assert total == 210, total
    assert len(new_topics) == 26
    # Every old current_facts box must be used exactly once.
    old_boxes = sum(len(t["current_facts"]) for t in topics)
    new_boxes = sum(len(t["current_facts"]) for t in new_topics)
    assert old_boxes == new_boxes == len(CURRENT_FACTS_TABLE), (old_boxes, new_boxes)

    # 1.5 book_more: pull out the old topic-keyed lists first, then re-insert by page.
    moved = []
    for key in OLD_TOPIC_IDS:
        if key in more:
            moved.extend(more.pop(key))
    count_before = len(moved)
    for x in moved:
        sid = sheet_of(x["page"])
        assert sid is not None, x
        more.setdefault(sid, []).append(x)
    touched = set(sheet_of(x["page"]) for x in moved)
    for sid in touched:
        more[sid].sort(key=lambda x: (x["page"], first_line(x)))
    assert sum(len(v) for k, v in more.items() if k in touched) >= count_before
    print(f"book_more: {count_before} topic-keyed excerpts re-keyed to {len(touched)} sheets")

    save("clusters.json", new_clusters)
    save("fact_groups.json", new_groups)
    save("topics.json", new_topics)
    save("book_more.json", more)
    for t in new_topics:
        print(f"{t['sheet']:>2} {t['id']:<22} own/shared "
              f"{sum(1 for c in new_clusters if c['topic_id'] == t['id'])}/"
              f"{sum(1 for c in new_clusters if t['id'] in c['topic_ids']) - sum(1 for c in new_clusters if c['topic_id'] == t['id'])}"
              f"  q={t['question_count']}  pages={t['pages']}")


# ---------------------------------------------------------------------------
# Phase 2: intros from the book (Danish, word for word via book-expansion/bookclean.py).
# ---------------------------------------------------------------------------

sys.path.insert(0, str(BOOK_EXPANSION))
import bookclean  # noqa: E402

# Per sheet: the book page, the opening text lines (paragraphs before the contents box), the contents box
# heading line and its bullet line ranges. Checked against bookdump/pages/page-NNN.txt (see REORG_NOTES.md).
# "box_first": the box comes before the opening text (sheet 4), so the opening text is read after the bullets.
# A bullet range of None means: read the bullets up to the first blank line.
INTRO_SPECS = {
    "skole": dict(page=6, open=(6, 18), head=19, bullets=[(20, 22)]),
    "uddannelse": dict(page=12, open=(6, 17), head=18, bullets=[(19, 21)]),
    "dagtilbud": dict(page=18, open=(6, 26), head=27, bullets=[(28, 31)]),
    "arbejdsmarked": dict(page=22, box_first=True, head=7, bullets=[(8, 11), (17, 25)], open_from=28),
    "erhvervsliv": dict(page=31, open=(6, 6), head=10, bullets=[(11, 20)]),
    "velfaerd": dict(page=35, open=(6, 37), head=38, bullets=[(39, 40)]),
    "familieliv": dict(page=41, open=(6, 19), head=20, bullets=[(21, 25)]),
    "foreningsliv": dict(page=47, open=(6, 18), head=19, bullets=[(20, 25)]),
    "sundhed": dict(page=53, open=(6, 18), head=19, bullets=[(20, 24)]),
    "ligestilling": dict(page=58, open=(6, 17), head=18, bullets=[(19, 21)]),
    "grundloven": dict(page=62, open=(6, 34), head=35, bullets=[(36, 38)]),
    "retssamfund": dict(page=68, open=(6, 17), head=18, bullets=[(19, 20)]),
    "folketing": dict(page=72, open=(6, 12), head=13, bullets=[(14, 21)]),
    "selvstyre": dict(page=77, open=(6, 29), head=30, bullets=[(31, 33)]),
    "valg": dict(page=82, open=(6, 17), head=18, bullets=[(19, 20)]),
    "rettigheder": dict(page=89, open=(6, 22), head=23, bullets=[(24, 25)]),
    "religion": dict(page=93, open=(6, 23), head=24, bullets=[(25, 26)]),
    "omverdenen": dict(page=97, open=(6, 19), head=20, bullets=[(21, 24)]),
    "geografi": dict(page=105, open=(6, 26), head=27, bullets=[(28, 29)]),   # book has a box here (heading "Dette afsnit")
    "historie-foer-1945": dict(page=108, open=(6, 24), head=25, bullets=[(26, 26)]),
    "historie-efter-1945": dict(page=116, open=None, head=7, bullets=[(8, 9)]),  # no opening text
    "kultur": dict(page=123, open=(6, 12), head=13, bullets=[(14, 14)]),
    "traditioner": dict(page=128, open=(6, 12), head=18, bullets=[(19, 19)]),
    "forsvar": dict(page=133, open=(6, 12), head=18, bullets=[(19, 19)]),
    "diskrimination": dict(page=139, open=(6, 28), head=29, bullets=[(30, 33)]),
    "klima": dict(page=143, open=(6, 22), head=23, bullets=[(24, 25)]),
}


def _rows(page):
    return bookclean.raw_lines(page)


def _is_blank(row):
    return not row.strip()


def _is_margin(row):
    return bool(bookclean.MARGIN.match(row) or bookclean.HEADER.match(row))


def _one(page, r):
    return bookclean.clean(page, f"{r}-{r}")


def _ends_sentence(text):
    t = text.rstrip().rstrip("*").rstrip()
    return t[-1:] in ".!?:"


def _body_segments(page, a, b):
    """Split rows a..b into paragraphs. A paragraph ends at a blank line after a sentence end; a bullet
    line starts its own segment and its continuation lines belong to it. Returns [(kind, s, e)]."""
    rows = _rows(page)
    segs = []
    cur = None
    gap = False
    prev_text = ""
    for r in range(a, b + 1):
        row = rows[r - 1]
        if _is_blank(row):
            gap = True
            continue
        if _is_margin(row):
            continue
        t = _one(page, r)
        if not t:
            continue
        if t.startswith("•"):
            cur = None
            segs.append(["bullet", r, r])
            gap = False
            prev_text = t
            continue
        if cur is not None and cur[0] == "bullet" and not gap:
            cur[2] = r            # continuation of a bullet
        elif cur is not None and cur[0] == "text" and not (gap and _ends_sentence(prev_text)):
            cur[2] = r            # same paragraph
        else:
            cur = ["text", r, r]
            segs.append(cur)
        prev_text = t
        gap = False
    return segs


def _paragraphs(page, a, b):
    """Group segments into paragraphs; bullets in the running text stay inside their paragraph, one per line."""
    out = []
    for kind, s, e in _body_segments(page, a, b):
        if kind == "text" or not out:
            out.append({"lines": [(s, e, kind)]})
        else:
            out[-1]["lines"].append((s, e, kind))
    paras = []
    for p in out:
        da_parts = []
        for s, e, kind in p["lines"]:
            da_parts.append(bookclean.clean(page, f"{s}-{e}"))
        s0, e0 = p["lines"][0][0], p["lines"][-1][1]
        paras.append({"da": "\n".join(da_parts), "en": "", "book": [{"page": page, "lines": f"{s0}-{e0}"}]})
    return paras


def _bullet_groups(page, ranges):
    """Bullet items in the given line ranges: a line starting with • opens an item; other lines continue it."""
    rows = _rows(page)
    items = []
    for a, b in ranges:
        cur = None
        for r in range(a, b + 1):
            row = rows[r - 1]
            if _is_blank(row) or _is_margin(row):
                continue
            t = _one(page, r)
            if not t:
                continue
            if t.startswith("•"):
                cur = [r, r]
                items.append(cur)
            elif cur is not None:
                cur[1] = r
    out = []
    for s, e in items:
        out.append(bookclean.clean(page, f"{s}-{e}"))
    return out, items


def _box(page, spec):
    head = bookclean.clean(page, f"{spec['head']}-{spec['head']}")
    bullets, items = _bullet_groups(page, spec["bullets"])
    lines = [head] + bullets
    first = min([spec["head"]] + [s for s, _ in items])
    last = max([spec["head"]] + [e for _, e in items])
    return {"da": "\n".join(lines), "en": "", "book": [{"page": page, "lines": f"{first}-{last}"}]}, head, bullets


def build_intro(sid):
    spec = INTRO_SPECS[sid]
    page = spec["page"]
    box, head, bullets = _box(page, spec)
    if spec.get("box_first"):
        # Sheet 4: the box comes first, then the paragraphs after its bullets up to the first heading.
        rows = _rows(page)
        start = spec["open_from"]
        end = start
        for r in range(start, len(rows) + 1):
            row = rows[r - 1]
            if _is_margin(row) or _is_blank(row):
                end = r
                continue
            if row.strip().isupper() and len(row.strip()) > 3 and not row.startswith(" "):
                break  # first heading ends the opening text
            end = r
        paras = _paragraphs(page, start, end)
        return [box] + paras
    paras = []
    if spec["open"]:
        paras = _paragraphs(page, spec["open"][0], spec["open"][1])
    return paras + [box]


def print_table():
    print("Sheet  page  opening text   box heading   bullets")
    for number, sid, _, _, _ in SHEETS:
        spec = INTRO_SPECS[sid]
        o = "none" if not spec.get("open") else "%d-%d" % spec["open"]
        print("%5d  %4d  %-12s  %-11s   %s" % (number, spec["page"], o, spec["head"],
                                              ", ".join("%d-%d" % r for r in spec["bullets"])))


def intros():
    topics = load("topics.json")
    if len(topics) != 26:
        sys.exit("run the data step first (phase 1)")
    print_table()
    for t in topics:
        sid = t["id"]
        paras = build_intro(sid)
        assert paras, sid
        # Keep the English that is already there when the Danish paragraph is unchanged.
        old_en = {p["da"]: p["en"] for p in t.get("intro", []) if p.get("en")}
        for p in paras:
            p["en"] = old_en.get(p["da"], "")
        t["intro"] = paras
        print("\n=== %d %s (page %d)" % (t["sheet"], sid, INTRO_SPECS[sid]["page"]))
        for p in paras:
            print("  [%s]" % p["book"][0]["lines"])
            for line in p["da"].split("\n"):
                print("    " + line)
    save("topics.json", topics)
    print("\nwrote intros to data/topics.json (English kept where the Danish is unchanged)")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "intros":
        intros()
    else:
        phase1()
