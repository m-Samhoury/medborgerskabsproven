# Auto-play: choosable question and answer times

## Goal
Auto-play on the Test page (`quiz.html`, `js/quiz.js`, shipped in c3eafa3, see `AUTO_PLAN.md`) is fixed at 30 s per question and 10 s per answer. Let the user pick both times on the setup screen:

- **Question shown:** 10, 20 or 30 seconds (default **30**)
- **Answer shown:** 5, 10 or 15 seconds (default **10**)

The pickers only show when "Auto-gennemgang / Auto-play" is the selected mode. The run, "Kør igen" and the countdown use the chosen values.

Read these before you start: `renderSetup`, `startRun` and `showAuto` in `js/quiz.js`, `countdown()` in `js/ui.js`, the `/* Setup (§5.4.1) */` block, `.seg`/`.seg-opt` and `.timer` rules in `css/style.css`, and the `bookPopSize`/`setBookPopSize` pair in `js/store.js`.

## Decisions (already made, don't revisit)
1. **Control:** the existing segmented control (`.seg` / `.seg-opt` with hidden radios), exactly like "Antal spørgsmål". The options show plain numbers. The unit goes in the legend.
2. **Layout:** the length picker and the two time pickers sit together in one wrapping row (`.pick-row`), directly above the "Kun ofte stillede" switch row. On desktop they read as one line of three segmented controls with the switch row right under them. On a 375 px phone they stack (legend + control, three times), then the switch row. No new card or border.
3. **Remember the choice per viewer:** yes. New key `mbp.v1.autoTiming` in `localStorage`, JSON `{"q":20,"a":5}`, written whenever either picker changes. It's a per-device convenience like `bookPopSize`, so it is **not** added to `snapshot()` / `apply()` (sync) and **not** cleared by `reset()`.
4. **URL parameters:** **no.** `?mode=auto` still only preselects the mode. Nothing links to auto-play with times, and the stored choice already covers repeat use. Don't add `qsec`/`asec` parameters.
5. **Low state (amber + pulse):** keep "last 5 s", but only when the phase is longer than 5 s: `low = total > 5 && remaining <= 5`. A 5 s answer phase would otherwise pulse from its first second, which is noise, not a warning. All other durations (10, 15, 20, 30) behave exactly as now.
6. **Segment geometry:** no change. `build(n)` in `countdown()` already handles any `n`: `gapDeg = n > 12 ? 3.2 : 6`, so 5 and 10 segments get 6° gaps (66°/30° arcs) and 15, 20, 30 get 3.2° gaps (20.8°/14.8°/8.8° arcs). Every arc is below 180°, so the large-arc flag `0` stays correct. `set()` already rebuilds when `total` changes. Just verify it visually (check 9).
7. **Mode card copy:** the card no longer states fixed times, because they're now chosen.

## 1. `js/store.js`
Add a key next to the others:
```js
var AUTO_TIMING_KEY = "mbp.v1.autoTiming";
```
Add two methods after `setBookPopSize` (same style):
```js
    // Auto-play times the viewer last chose, {q, a} in seconds, or null. quiz.js checks the values.
    autoTiming: function () {
      try {
        var t = JSON.parse(readStorage(AUTO_TIMING_KEY) || "null");
        return t && typeof t.q === "number" && typeof t.a === "number" ? { q: t.q, a: t.a } : null;
      } catch (e) {
        return null;
      }
    },

    setAutoTiming: function (t) {
      writeStorage(AUTO_TIMING_KEY, JSON.stringify({ q: t.q, a: t.a }));
    },
```
Don't touch `reset`, `snapshot` or `apply`.

## 2. `js/quiz.js`

### Constants
Replace
```js
  // Auto-play: seconds to think, then seconds with the answer shown.
  var AUTO = { q: 30, a: 10 };
```
with
```js
  // Auto-play: seconds to think, then seconds with the answer shown. Defaults and the choices on the setup screen.
  var AUTO = { q: 30, a: 10 };
  var AUTO_Q_CHOICES = [10, 20, 30];
  var AUTO_A_CHOICES = [5, 10, 15];

  // The stored auto-play times, falling back to the defaults for anything missing or not one of the choices.
  function autoTiming() {
    var t = MBP.store.autoTiming() || {};
    return {
      q: AUTO_Q_CHOICES.indexOf(t.q) !== -1 ? t.q : AUTO.q,
      a: AUTO_A_CHOICES.indexOf(t.a) !== -1 ? t.a : AUTO.a
    };
  }
```

### `renderSetup`
1. After the `lenInputs` block, build the two pickers' radios, preselected from `autoTiming()`:
```js
    // Auto-play times: question 10/20/30 s, answer 5/10/15 s. Remembered per viewer.
    var timing = autoTiming();
    var qSecInputs = AUTO_Q_CHOICES.map(function (sec) {
      var input = h("input", { type: "radio", name: "qsec", value: String(sec), class: "sr" });
      input.checked = sec === timing.q;
      return input;
    });
    var aSecInputs = AUTO_A_CHOICES.map(function (sec) {
      var input = h("input", { type: "radio", name: "asec", value: String(sec), class: "sr" });
      input.checked = sec === timing.a;
      return input;
    });
```
2. Next to `selectedLength()`, add:
```js
    function selectedTiming() {
      return {
        q: Number(qSecInputs.find(function (i) { return i.checked; }).value),
        a: Number(aSecInputs.find(function (i) { return i.checked; }).value)
      };
    }
```
3. Build the two fieldsets (put this after the `lenInputs.forEach(... refresh)` line, before `quizOpts.appendChild`):
```js
    function secPicker(cls, legendDa, legendEn, values, inputs) {
      return h("fieldset", { class: "time-picker " + cls },
        h("legend", null, bi(legendDa, legendEn, "span")),
        h("div", { class: "seg" }, values.map(function (sec, i) {
          return h("label", { class: "seg-opt" }, inputs[i], String(sec));
        })));
    }
    var qPicker = secPicker("q-picker", "Spørgsmål vises (sek.)", "Question shown (sec)", AUTO_Q_CHOICES, qSecInputs);
    var aPicker = secPicker("a-picker", "Svaret vises (sek.)", "Answer shown (sec)", AUTO_A_CHOICES, aSecInputs);
    qSecInputs.concat(aSecInputs).forEach(function (input) {
      input.addEventListener("change", function () { MBP.store.setAutoTiming(selectedTiming()); });
    });
```
4. Replace the current `quizOpts.appendChild(h("fieldset", { class: "len-picker" }, ...))` call so the length picker and the two time pickers share one row:
```js
    quizOpts.appendChild(h("div", { class: "pick-row" },
      h("fieldset", { class: "len-picker" },
        h("legend", null, bi("Antal spørgsmål", "Number of questions", "span")),
        h("div", { class: "seg" }, lenValues.map(function (value, i) {
          var text = value === "all" ? "Alle" : value;
          return h("label", { class: "seg-opt", title: value === "all" ? "All" : null }, lenInputs[i], text);
        }))),
      qPicker,
      aPicker));
```
   The length picker's markup inside is unchanged, it only gets the wrapper.
5. In `refresh()`, right after `quizOpts.hidden = exam;`, add:
```js
      qPicker.hidden = !auto;
      aPicker.hidden = !auto;
```
   (`quizOpts` is already hidden in exam mode, so the time pickers show only for auto.)
6. The auto mode card's text becomes:
```js
            bi(
              "Spørgsmålene kører af sig selv: først tid til at tænke, så vises svaret. Du vælger tiderne.",
              "Questions play by themselves: time to think first, then the answer shows. You choose the times.",
              "span")
```
7. In the submit handler, add the times to the cfg only for auto:
```js
      var timing = selectedTiming();
      startRun(D, {
        mode: exam ? "exam" : auto ? "auto" : "normal",
        topics: selectedTopics(),
        length: exam ? EXAM_LENGTH : selectedLength(),
        frequent: freqBox.checked,
        questionSec: auto ? timing.q : undefined,
        answerSec: auto ? timing.a : undefined
      });
```
   Also call `MBP.store.setAutoTiming(timing)` there when `auto` is true (it's harmless if it's already saved, and it stores the defaults on a first run).

### `showAuto`
1. At the top of `showAuto`, add:
```js
      var qSec = cfg.questionSec || AUTO.q;
      var aSec = cfg.answerSec || AUTO.a;
```
2. Replace `var phaseLen = AUTO.q;` with `var phaseLen = qSec;`, and in `startPhase` replace `kind === "question" ? AUTO.q : AUTO.a` with `kind === "question" ? qSec : aSec`.
3. Update the comment above `showAuto` to say "cfg.questionSec seconds (default 30) ... cfg.answerSec seconds (default 10)".
4. "Kør igen" already calls `startRun(D, cfg)`, so it reuses the times. No change.

Nothing else in `showAuto` changes. There must still be only one `AUTO.q` / `AUTO.a` use left, as defaults.

## 3. `js/ui.js` (`countdown`)
In `set()`, replace
```js
      el.classList.toggle("low", remaining <= 5);
```
with
```js
      // Last 5 s pulse amber, but not in a phase that is only 5 s long (it would pulse from the start).
      el.classList.toggle("low", total > 5 && remaining <= 5);
```
Update the header comment line "the last 5 s pulse and turn amber" to "the last 5 s pulse and turn amber (phases longer than 5 s)". No other change. `build()` stays as it is (see decision 6).

## 4. `css/style.css`
In the `/* Setup (§5.4.1) */` block, after `.quiz-opts[hidden] { display: none; }`, add:
```css
/* Length and auto-play time pickers share one row; they wrap and stack on phones. */
.pick-row { display: flex; flex-wrap: wrap; align-items: flex-end; column-gap: var(--s-6); }
.pick-row > fieldset { flex: 0 0 auto; }
.quiz-setup fieldset[hidden] { display: none; }
```
The switch row needs **no** new rule. Its existing `.filter` margin (`var(--s-3) 0`) right after the pickers is the spacing we want, so the pickers and the switch read as one group.

Expected results:
- 375 px (content ≈ 343 px): each fieldset is ≈ 200–230 px wide, so two can't share a line. They stack: Antal, Spørgsmål vises, Svaret vises, then the switch row.
- 560–759 px: two per line, the third wraps. That's fine.
- ≥ 760 px: all three on one line. If the three don't fit in the main column at 1280 px, drop `column-gap` to `var(--s-5)`. Don't shrink `.seg-opt` (44 px tap height and 64 px min width stay).

## Don't
- Don't change exam or quiz behaviour, the timer look, the data or other pages.
- Don't add URL parameters, sync fields or a debug hook.
- Don't push.

## Acceptance checks
Start the preview with the `site` launch config (`preview_start {name: "site"}`, `python3 -m http.server 8000`) and open `http://localhost:8000/quiz.html`. Run every check at **375 px** (`resize_window` preset `mobile`) and **desktop**, in **light and dark** (theme toggle), unless it says otherwise. Reset the viewport to `desktop` when done.

1. **Show/hide.** Exam selected: no topic, length or time pickers, only the switch row. Quiz selected: topics and length, no time pickers. Auto selected: topics, length, "Spørgsmål vises (sek.)" with 10/20/30 and "Svaret vises (sek.)" with 5/10/15, then the switch row right under them. Switch exam → auto → quiz → auto and confirm each time (`document.querySelector('.q-picker').hidden` matches).
2. **Defaults.** In a fresh profile (`localStorage.removeItem('mbp.v1.autoTiming')`, reload), 30 and 10 are selected.
3. **Layout.** 375 px: the three pickers stack, nothing overflows (`document.documentElement.scrollWidth === innerWidth`), the tap targets are ≥ 44 px high. Desktop: the three pickers sit on one line and the switch row sits directly under them. Take a screenshot of each.
4. **Remember.** Pick 20 and 5, reload `quiz.html?mode=auto`: 20 and 5 are still selected, and `localStorage['mbp.v1.autoTiming']` is `{"q":20,"a":5}`. Put a bad value in (`localStorage.setItem('mbp.v1.autoTiming','{"q":7,"a":"x"}')`), reload: 30 and 10 show and there are no errors. `MBP.store.snapshot()` has no timing field.
5. **Each combination drives the timer.** For each question time (10, 20, 30) and each answer time (5, 10, 15) (at least these pairs: 10/5, 20/10, 30/15, plus 10/15 and 30/5), start auto with 10 questions and check:
   - On question 1 the number shows the question time and `document.querySelectorAll('.timer .tick').length` equals it, all yellow.
   - Wait for the 10/5 pair (and one more pair of your choice) to run its full phases: one segment drops per second, the answer appears at 0, the inner circle turns green, the count restarts at the answer time with that many segments, and question 2 appears at 0. For the other pairs, use "Spring over" to jump into the answer phase and check the answer segment count and number there.
6. **Low state.** Question phase of 10, 20 and 30 s, and answer phase of 10 and 15 s: the `low` class (amber + pulse, red number in the question phase) appears at 5 and not before. Answer phase of **5 s**: `low` never appears (check `document.querySelector('.timer').classList.contains('low')` every second, or watch the screenshots).
7. **Kør igen.** Finish a short run (10 questions, 10/5, skip through with →). On the end screen "Kør igen" starts a new run with the same times.
8. **Other modes unaffected.** Start one exam and one quiz run. They behave as before, and quiz mode still records progress.
9. **Segment look.** Take screenshots (dark, desktop) of the timer at 5, 15 and 30 segments: even gaps, no overlapping or missing arcs.
10. **Console.** `read_console_messages` with `onlyErrors: true` is empty after all of the above.

## Commit
Make one local commit on `main` with the message:

```
Auto-play: choose question time (10/20/30 s) and answer time (5/10/15 s)

Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>
```

Commit only `js/quiz.js`, `js/ui.js`, `js/store.js`, `css/style.css` and `AUTO_TIMING_PLAN.md`. Don't add the other untracked plan files, `tools/timer-designs.html` or `book-expansion/__pycache__/`. **Do not push**: the parent session handles publishing.
