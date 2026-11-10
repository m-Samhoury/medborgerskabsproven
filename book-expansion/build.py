#!/usr/bin/env python3
"""Build 01-content-plan.json from spec.py (excerpts cut from bookdump/pages via bookclean.clean)."""
import json
import pathlib
import sys

from bookclean import clean, norm, parse_lines
from spec import S

HERE = pathlib.Path(__file__).resolve().parent
DATA = HERE.parent / "data"


def cut(entry):
    text = clean(entry["page"], entry["lines"])
    if entry["start"]:
        i = text.find(entry["start"])
        if i < 0:
            raise SystemExit(f"start not found: {entry}")
        text = text[i:]
    if entry["end"]:
        j = text.find(entry["end"])
        if j < 0:
            raise SystemExit(f"end not found: {entry}")
        text = text[:j + len(entry["end"])]
    return norm(text)


def main():
    out = {}
    for e in S:
        out.setdefault(e["target"], []).append({
            "title_da": e["title_da"],
            "page": e["page"],
            "lines": e["lines"],
            "excerpt_da": cut(e),
        })
    (HERE / "01-content-plan.json").write_text(
        json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{sum(len(v) for v in out.values())} excerpts for {len(out)} targets")


if __name__ == "__main__":
    main()
