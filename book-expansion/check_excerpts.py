#!/usr/bin/env python3
"""Prove that every excerpt in 01-content-plan.json is verbatim book text.

Run from anywhere:  python3 book-expansion/check_excerpts.py
Writes book-expansion/check-result.txt and exits 1 on any failure.

Checks per excerpt
 1 EXACT     - the excerpt (whitespace-normalised) is a substring of the cited lines as cleaned by
               bookclean.clean (margin labels/captions dropped, print hyphenation joined).
 2 RAW       - independent of the cleaner's joining rules: with all whitespace, hyphens and soft
               hyphens removed, the excerpt is a contiguous substring of the RAW cited lines once the
               dropped margin/caption fragments (listed in the report) are taken out, and it is a
               character subsequence of the raw cited lines as they are. So no word is added or
               changed; the only text left out is listed.
 3 LENGTH    - at most 150 words.
 4 TARGET    - the key is a real cluster id, fact-group id or topic id.
 5 NOT-DUP   - the cited range is not inside a "read more" range the same item already shows.
Also: duplicate excerpts within one target, and coverage: which clusters have no expansion, and
which of the 500 questions (data/questions.json, via its cluster_id) would show no expansion in
the feedback after answering.
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from bookclean import body_segments, clean, norm, parse_lines, raw_lines  # noqa: E402

DATA = HERE.parent / "data"
# Clusters deliberately without an expansion (see 01-content-plan.md, section 4).
NO_EXPANSION = set()


def canon(s):
    return re.sub(r"[\s\-­]", "", s)


def is_subsequence(small, big):
    it = iter(big)
    return all(ch in it for ch in small)


def main():
    plan = json.loads((HERE / "01-content-plan.json").read_text(encoding="utf-8"))
    clusters = json.loads((DATA / "clusters.json").read_text(encoding="utf-8"))
    topics = json.loads((DATA / "topics.json").read_text(encoding="utf-8"))
    groups = json.loads((DATA / "fact_groups.json").read_text(encoding="utf-8"))
    own_refs = {c["id"]: c.get("book", []) for c in clusters}
    own_refs.update({g["id"]: g.get("book", []) for g in groups})
    for t in topics:
        own_refs[t["id"]] = [r for i in t["intro"] + t.get("current_facts", []) for r in i.get("book", [])]
    kinds = {**{c["id"]: "cluster" for c in clusters}, **{g["id"]: "group" for g in groups},
             **{t["id"]: "topic" for t in topics}}

    report, fails, n = [], 0, 0
    for key, items in plan.items():
        seen = set()
        for x in items:
            n += 1
            page, lines, text = x["page"], x["lines"], x["excerpt_da"]
            errs = []
            if key not in kinds:
                errs.append("TARGET unknown id")
            # 1 EXACT
            if norm(text) not in norm(clean(page, lines)):
                errs.append("EXACT not a substring of the cleaned cited lines")
            # 2 RAW
            a, b = parse_lines(lines)
            raw = "".join(raw_lines(page)[a - 1:b])
            _, dropped = body_segments(page, lines)
            raw_wo = canon(raw)
            for frag in dropped:
                raw_wo = raw_wo.replace(canon(frag), "", 1)
            if canon(text) not in raw_wo:
                errs.append("RAW not contained in raw lines minus dropped fragments")
            if not is_subsequence(canon(text), canon(raw)):
                errs.append("RAW not a character subsequence of the raw lines")
            # 3 LENGTH
            words = len(text.split())
            if words > 150:
                errs.append(f"LENGTH {words} words")
            # 5 NOT-DUP
            for r in own_refs.get(key, []):
                if r["page"] == page:
                    ra, rb = parse_lines(r["lines"])
                    if ra <= a and b <= rb:
                        errs.append(f"NOT-DUP inside own read-more ref {r['page']}:{r['lines']}")
            if text in seen:
                errs.append("duplicate excerpt in the same target")
            seen.add(text)
            status = "FAIL " + "; ".join(errs) if errs else "OK"
            fails += bool(errs)
            report.append(f"{status:4} | {key} | p{page} l{lines} | {words} w | {x['title_da']}")
            if dropped:
                report.append(f"       left out (margin/caption/header): {dropped}")

    covered = set(plan)
    missing = [c["id"] for c in clusters if c["id"] not in covered and c["id"] not in NO_EXPANSION]
    per_kind = {}
    for key, items in plan.items():
        per_kind[kinds.get(key, "?")] = per_kind.get(kinds.get(key, "?"), 0) + len(items)
    questions = json.loads((DATA / "questions.json").read_text(encoding="utf-8"))
    q_missing = [q["id"] for q in questions if q["cluster_id"] not in covered]
    head = [
        "book-expansion excerpt check",
        f"excerpts: {n}   targets: {len(plan)}   failures: {fails}",
        f"by target kind: {per_kind}",
        f"clusters with an expansion: {sum(1 for c in clusters if c['id'] in covered)}/{len(clusters)}"
        f"   deliberately none: {sorted(NO_EXPANSION)}   missing: {missing}",
        f"questions with expansion content (via cluster_id): {len(questions) - len(q_missing)}/{len(questions)}"
        f"   without: {q_missing}",
        "",
    ]
    if missing or q_missing:
        fails += 1
    out = "\n".join(head + report) + "\n"
    (HERE / "check-result.txt").write_text(out, encoding="utf-8")
    print("\n".join(head[:5]))
    print("ALL OK" if not fails else f"{fails} FAILURE(S) - see check-result.txt")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
