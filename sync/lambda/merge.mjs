// Merges the stored progress snapshot with the one a device sent. Pure (no AWS imports), so it runs in Node tests too.
// The rules are in SYNC_PLAN.md ("Merge rules"). Anything malformed is dropped, so the result is always valid.

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const KEEP_QUIZZES = 50;
const KEEP_DAYS = 60;

// A plain object, or {} for anything else.
function obj(x) {
  return x && typeof x === "object" && !Array.isArray(x) ? x : {};
}

function num(x) {
  return typeof x === "number" && Number.isFinite(x) ? x : 0;
}

// Keeps only the entries of an object map that are objects, each cleaned by fn. "__proto__" is dropped.
function entries(src, fn) {
  const out = {};
  for (const key of Object.keys(obj(src))) {
    const value = src[key];
    if (key === "__proto__" || !value || typeof value !== "object" || Array.isArray(value)) continue;
    out[key] = fn(value);
  }
  return out;
}

// One quiz run, or null when it has no date (the date is its key).
function quiz(q) {
  if (typeof q.date !== "string" || q.date === "") return null;
  const out = {
    date: q.date,
    mode: typeof q.mode === "string" ? q.mode : "",
    score: num(q.score),
    total: num(q.total)
  };
  if (typeof q.examId === "string" || typeof q.examId === "number") out.examId = q.examId;
  return out;
}

// Turns anything into a valid snapshot. Missing or broken parts become empty.
function sanitize(input) {
  const src = obj(input);
  const p = obj(src.progress);
  const studied = {};
  for (const key of Object.keys(obj(p.studied))) {
    if (key !== "__proto__" && p.studied[key] === true) studied[key] = true;
  }
  const activity = entries(src.activity, (e) => ({ answers: num(e.answers), right: num(e.right), goalShown: e.goalShown === true }));
  for (const day of Object.keys(activity)) {
    if (!DAY_RE.test(day)) delete activity[day];
  }
  const quizzes = Array.isArray(p.quizzes) ? p.quizzes.map((q) => quiz(obj(q))).filter(Boolean) : [];
  const seen = Array.isArray(src.seenMastered) ? src.seenMastered.filter((s) => typeof s === "string") : [];
  return {
    v: 1,
    resetAt: num(src.resetAt),
    progress: {
      clusters: entries(p.clusters, (e) => ({ box: num(e.box), due: num(e.due), right: num(e.right), wrong: num(e.wrong), seen: num(e.seen) })),
      questions: entries(p.questions, (e) => ({ right: num(e.right), wrong: num(e.wrong) })),
      quizzes,
      studied
    },
    activity,
    seenMastered: [...new Set(seen)]
  };
}

// Keeps the entry with the higher score. On a tie the incoming entry wins.
function keepBetter(stored, incoming, score) {
  const out = { ...stored };
  for (const id of Object.keys(incoming)) {
    if (!Object.prototype.hasOwnProperty.call(out, id) || score(incoming[id]) >= score(out[id])) out[id] = incoming[id];
  }
  return out;
}

// Quiz runs: union by date, sorted by date, newest KEEP_QUIZZES kept.
function mergeQuizzes(stored, incoming) {
  const byDate = new Map();
  for (const q of [...stored, ...incoming]) {
    if (!byDate.has(q.date)) byDate.set(q.date, q);
  }
  const list = [...byDate.values()].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return list.slice(-KEEP_QUIZZES);
}

// Daily activity: higher answers wins per day; only the KEEP_DAYS newest day keys are kept.
function mergeActivity(stored, incoming) {
  const merged = keepBetter(stored, incoming, (e) => e.answers);
  const days = Object.keys(merged).sort().reverse().slice(0, KEEP_DAYS);
  const out = {};
  for (const day of days) out[day] = merged[day];
  return out;
}

// merge(stored, incoming): stored may be null (first write). Returns a valid snapshot.
export function merge(stored, incoming) {
  const st = sanitize(stored);
  const inc = sanitize(incoming);
  // A reset wins over older data: the newer reset replaces the other side entirely.
  if (inc.resetAt > st.resetAt) return inc;
  if (st.resetAt > inc.resetAt) return st;

  const clusters = keepBetter(st.progress.clusters, inc.progress.clusters, (e) => e.seen);
  const questions = keepBetter(st.progress.questions, inc.progress.questions, (e) => e.right + e.wrong);
  const studied = { ...st.progress.studied, ...inc.progress.studied };
  return {
    v: 1,
    resetAt: st.resetAt,
    progress: {
      clusters,
      questions,
      quizzes: mergeQuizzes(st.progress.quizzes, inc.progress.quizzes),
      studied
    },
    activity: mergeActivity(st.activity, inc.activity),
    seenMastered: [...new Set([...st.seenMastered, ...inc.seenMastered])]
  };
}
