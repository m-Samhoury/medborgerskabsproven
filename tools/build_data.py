#!/usr/bin/env python3
"""Bundle data/*.json into two files so the site also works from file://.

data/bundle-core.js (window.MBP_RAW): questions, clusters, topics, groups. Every page loads it.

data/bundle-book.js (window.MBP_RAW_BOOK): the book texts and the English translations. Only the
pages that show book material load it (study, learn, quiz, top15). It holds:
- book: the book excerpts that the "read more" icons point to (the "book" fields), copied from
  bookdump/pages/page-NNN.txt, so the popover can quote the book.
- more: data/book_more.json ("Mere fra bogen": extra verbatim book excerpts per cluster,
  fact group or topic id), unchanged.
- en: the English translations of the book texts (data/book_en.json, keyed by the exact Danish text),
  only for the texts that are used; the rest of the file is left out.

Run after every change to data/*.json:  python3 tools/build_data.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
PAGES = ROOT / "bookdump" / "pages"
PARTS = ["questions", "clusters", "topics", "fact_groups"]

# pdftotext -layout puts the running header and the margin headings far to the right.
MARGIN = re.compile(r"^\s{30,}\S")
HEADER = re.compile(r"^\s*\d+ / 156\s*$")
SECOND_COL = re.compile(r"\S {5,}\S")  # same rule as book-expansion/bookclean.py


def book_refs(raw):
    """Every {"page", "lines"} reference in the data."""
    items = list(raw["clusters"]) + list(raw["fact_groups"])
    for g in raw["fact_groups"]:
        items += g["rows"]
    for t in raw["topics"]:
        items += t["intro"] + t["current_facts"]
    for item in items:
        for ref in item.get("book", []):
            yield ref


def excerpt(page, lines):
    """The book text of page `page`, lines "a-b" (1-based, as in bookdump/pages), as plain paragraphs."""
    path = PAGES / f"page-{page:03d}.txt"
    text = path.read_text(encoding="utf-8").replace("­", "").replace("\f", "")
    rows = text.split("\n")
    a, _, b = lines.partition("-")
    a, b = int(a), int(b or a)
    if not 1 <= a <= b <= len(rows):
        raise SystemExit(f"bad book reference: page {page}, lines {lines}")
    # Blank lines end a paragraph, unless the text runs on across a margin gap
    # (a hyphenated word, or a sentence that goes on in lower case).
    paras, cur, gap = [], "", False
    for row in rows[a - 1:b]:
        if HEADER.match(row) or MARGIN.match(row):
            continue
        m = SECOND_COL.search(row)
        if m:
            row = row[:m.start() + 1]  # a margin label beside a body line ("... friskoler     SKOLE")
        row = " ".join(row.split())
        if not row:
            gap = bool(cur)
            continue
        if cur.endswith("-") and row[:1].islower():
            cur = cur[:-1] + row
        elif cur and (row.startswith("•") or (gap and (cur[-1] in ".:!?" or not row[:1].islower()))):
            paras.append(cur)
            cur = row
        else:
            cur = (cur + " " + row).strip()
        gap = False
    if cur:
        paras.append(cur)
    return "\n".join(paras)


def check_more(raw, more):
    """data/book_more.json: every key is a cluster, fact-group or topic id; every item has the four fields."""
    ids = {c["id"] for c in raw["clusters"]} | {g["id"] for g in raw["fact_groups"]} | {t["id"] for t in raw["topics"]}
    for key, items in more.items():
        if key not in ids:
            raise SystemExit(f"book_more.json: unknown id {key}")
        for x in items:
            if set(x) != {"title_da", "page", "lines", "excerpt_da"}:
                raise SystemExit(f"book_more.json: bad item under {key}: {sorted(x)}")


def main():
    raw = {}
    for name in PARTS:
        with open(DATA / f"{name}.json", encoding="utf-8") as f:
            raw[name] = json.load(f)
    with open(DATA / "book_more.json", encoding="utf-8") as f:
        more = json.load(f)
    check_more(raw, more)
    book = {}
    for ref in book_refs(raw):
        key = f"{ref['page']}:{ref['lines']}"
        if key not in book:
            book[key] = excerpt(ref["page"], ref["lines"])
    en_path = DATA / "book_en.json"
    all_en = json.loads(en_path.read_text(encoding="utf-8")) if en_path.exists() else {}
    used = set(book.values())
    for items in more.values():
        for x in items:
            used.update([x["title_da"], x["excerpt_da"]])
    en = {da: all_en[da] for da in sorted(used) if all_en.get(da)}
    core = {
        "questions": raw["questions"],
        "clusters": raw["clusters"],
        "topics": raw["topics"],
        "groups": raw["fact_groups"],
    }
    book_part = {
        "book": dict(sorted(book.items(), key=lambda kv: [int(x) for x in re.findall(r"\d+", kv[0])])),
        "more": more,
        "en": en,
    }
    out_core = DATA / "bundle-core.js"
    out_book = DATA / "bundle-book.js"
    for path, name, part in ((out_core, "MBP_RAW", core), (out_book, "MBP_RAW_BOOK", book_part)):
        payload = json.dumps(part, ensure_ascii=False, separators=(",", ":"))
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write("// GENERATED by tools/build_data.py from data/*.json and bookdump/pages – do not edit\n")
            f.write(f"window.{name} = {payload};\n")
    old = DATA / "bundle.js"
    if old.exists():
        old.unlink()  # replaced by the two files above
    print(f"wrote {out_core.relative_to(ROOT)} ({len(raw['questions'])} questions, "
          f"{len(raw['clusters'])} clusters, {len(raw['topics'])} topics, "
          f"{len(raw['fact_groups'])} groups)")
    print(f"wrote {out_book.relative_to(ROOT)} ({len(book)} book excerpts, "
          f"{sum(len(v) for v in more.values())} more-from-the-book excerpts)")
    print(f"English: {len(en)} of {len(used)} book texts translated")


if __name__ == "__main__":
    main()
