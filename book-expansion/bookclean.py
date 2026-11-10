"""Shared book-text helpers for book-expansion (read-only use of bookdump/pages).

clean(page, "a-b") returns the body text of physical lines a..b of bookdump/pages/page-NNN.txt:
- drops the running header ("NN / 156") and margin-only lines (30+ leading spaces:
  "FAKTA-ARK n:", chapter labels, "LÆREMATERIALE TIL ...", right-aligned captions);
- drops a second column on a body line (text after a run of 5+ spaces: margin labels
  such as "SKOLE" or photo captions such as "Folketingssalen.");
- joins lines with one space; a line-final "-" followed by a lower-case letter is a
  print hyphenation and is removed ("Folke-" + "tinget" -> "Folketinget"), except before
  "og"/"eller" ("kommunal- og regionalvalg"); soft hyphens (U+00AD) are removed;
- collapses runs of whitespace. Nothing else is changed: no word is altered, added or removed.
"""
import pathlib
import re

PAGES = pathlib.Path(__file__).resolve().parent.parent / "bookdump" / "pages"
MARGIN = re.compile(r"^\s{30,}\S")
HEADER = re.compile(r"^\s*\d+ / 156\s*$")
SECOND_COL = re.compile(r"\S {5,}\S")


def raw_lines(page):
    text = (PAGES / f"page-{page:03d}.txt").read_text(encoding="utf-8")
    return text.replace("­", "").replace("\f", "").split("\n")


def parse_lines(lines):
    a, _, b = str(lines).partition("-")
    return int(a), int(b or a)


def body_segments(page, lines):
    """(kept, dropped): kept body text per line, and every dropped fragment (for the report)."""
    rows = raw_lines(page)
    a, b = parse_lines(lines)
    if not 1 <= a <= b <= len(rows):
        raise ValueError(f"bad range p{page} {lines}")
    kept, dropped = [], []
    for row in rows[a - 1:b]:
        if not row.strip():
            continue
        if HEADER.match(row) or MARGIN.match(row):
            dropped.append(" ".join(row.split()))
            continue
        m = SECOND_COL.search(row)
        if m:
            cut = m.start() + 1
            dropped.append(" ".join(row[cut:].split()))
            row = row[:cut]
        kept.append(" ".join(row.split()))
    return kept, dropped


# Words the PDF splits across two lines without a hyphen (verified by hand against the PDF layout).
SPLIT_WORDS = {
    ("fagfore", "ningerne"), ("fagfore", "ning"), ("Vaccina", "tionerne"), ("syge", "husene"),
    ("befolk", "ningen"), ("disposi", "tioner"), ("integrations", "politikken"), ("biblio", "tekerne"),
    ("daginsti", "tutioner"), ("forældre", "repræsentanter"), ("Jorde", "moderen"),
    ("folkepensions", "alderen"), ("situa", "tioner"), ("klinik", "assistenter"),
    ("sikkerheds", "udstyr"), ("studenter", "eksamen"), ("mørklægnings", "gardiner"),
    ("syge", "plejerske"), ("forretnings", "service"), ("udviklings", "bistand"), ("sam", "arbejde"),
    ("indvand", "rerforeninger"), ("Kalmar", "unionen"), ("Kommunal", "bestyrelsen"), ("b", "ibliotek"),
    ("tandlæge", "regningen"),
}


def join(parts):
    out = ""
    for p in parts:
        last = out.split(" ")[-1] if out else ""
        first = p.split(" ")[0]
        if not out:
            out = p
        elif out.endswith("-") and p[:1].islower() and not re.match(r"(og|eller)\b", p):
            out = out[:-1] + p          # print hyphenation: Folke- + tinget
        elif out.endswith("-") and (p[:1].isupper() or p[:1].isdigit()) and len(last) > 1:
            out = out + p               # compound hyphen kept: Europa- + Kommissionen
        elif (last, first.rstrip(".,:;!?)")) in SPLIT_WORDS:
            out = out + p               # word split without hyphen
        else:
            out = out + " " + p
    return out


def clean(page, lines):
    return join(body_segments(page, lines)[0])


def norm(s):
    return " ".join(s.split())
