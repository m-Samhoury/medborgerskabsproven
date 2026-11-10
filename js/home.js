// Home (I dag): the countdown panel, the two main buttons (Lær and Test), the link to the 15 most-asked questions, sync between devices and reset.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;

  MBP.ui.initShell();
  MBP.ui.start(init);

  // Whole days from today to 25 November 2026 (same as local midnight arithmetic, but DST-proof).
  function daysToExam(now) {
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    var exam = Date.UTC(2026, 10, 25);
    return Math.round((exam - today) / 86400000);
  }

  function init(D) {
    var main = document.getElementById("main");
    main.textContent = "";

    var days = daysToExam(new Date());
    var total = D.clusters.length;
    var mastered = D.clusters.filter(function (c) { return MBP.store.isMastered(c.id); }).length;
    var open = total - mastered;
    var perDay = days > 0 ? Math.ceil(open / days) : open;
    var today = MBP.store.today();
    var streak = MBP.store.streak();
    var allMastered = mastered >= total;
    var pending = takeSyncLink();

    main.appendChild(h("div", { class: "home" },
      todayPanel(days, streak, today, allMastered, perDay, total),
      mainActions(),
      top15Link(),
      syncRow(pending),
      resetButton()));
  }

  // Sync between devices, above the reset row. Renders nothing while sync is off.
  // pending: a code from a sync link (#sync=...) that the reader has not answered yet.
  function syncRow(pending) {
    if (!MBP.sync.enabled()) return null;
    var box = h("div", { class: "sync-row" });
    renderSync(box, { pending: pending, restore: !!pending });
    return box;
  }

  // Fills the sync block. opts (all optional): pending = code from a sync link, restore = show the restore form,
  // msg = result of a failed restore ("notfound" or "error"), qrOpen = show the QR code.
  function renderSync(box, opts) {
    opts = opts || {};
    box.textContent = "";
    if (MBP.sync.code()) {
      connectedView(box, opts.qrOpen);
      if (opts.msg) box.appendChild(h("p", { class: "sync-msg", role: "status" }, syncMessage(opts.msg)));
    } else if (opts.restore) {
      box.appendChild(restoreForm(box, opts.msg));
    } else {
      offerView(box);
    }
    if (opts.pending) linkPanel(box, opts.pending);
  }

  // No code yet: a quiet button that reveals the two choices.
  function offerView(box) {
    var toggle = h("button", { type: "button", class: "btn btn-quiet sync-toggle" },
      bi("Synkroniser mellem enheder", "Sync between devices", "span"));
    toggle.addEventListener("click", function () {
      box.textContent = "";
      box.appendChild(choicesView(box));
    });
    box.appendChild(toggle);
  }

  // Share (make a code and show it) or restore (type a code, or scan one).
  function choicesView(box) {
    var share = h("button", { type: "button", class: "btn btn-primary" }, bi("Del min fremgang", "Share my progress", "span"));
    var restore = h("button", { type: "button", class: "btn btn-secondary" }, bi("Hent fremgang", "Restore progress", "span"));
    share.addEventListener("click", function () {
      share.disabled = true;
      MBP.sync.create().then(function () {
        renderSync(box, { qrOpen: true });
      });
    });
    restore.addEventListener("click", function () {
      renderSync(box, { restore: true });
    });
    return h("div", { class: "sync-choices" }, share, restore);
  }

  // Type a code from another device. msgKey is the result of a failed restore, shown at once.
  function restoreForm(box, msgKey) {
    var msg = h("p", { class: "sync-msg", role: "status" });
    if (msgKey) msg.appendChild(syncMessage(msgKey));
    var input = h("input", {
      type: "text",
      class: "sync-input",
      placeholder: "XXXX-XXXX-XXXX-XXXX",
      autocapitalize: "characters",
      autocomplete: "off",
      spellcheck: "false",
      "aria-label": "Sync code"
    });
    var connect = h("button", { type: "button", class: "btn btn-primary" }, bi("Forbind", "Connect", "span"));

    connect.addEventListener("click", function () {
      connect.disabled = true;
      msg.textContent = "";
      MBP.sync.join(input.value).then(function (result) {
        if (result === "ok") {
          location.reload();
          return;
        }
        connect.disabled = false;
        msg.appendChild(syncMessage(result));
      });
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") connect.click();
    });

    return h("div", { class: "sync-form" },
      h("p", { class: "sync-help" }, bi("Skriv koden, eller scan QR-koden med kameraet på din telefon.", "Type the code, or scan the QR code with your phone's camera.", "span")),
      input,
      h("div", { class: "sync-actions" }, connect),
      msg);
  }

  // The error line for a failed join.
  function syncMessage(result) {
    if (result === "notfound") return bi("Koden findes ikke.", "That code doesn't exist.", "span");
    return bi("Ingen forbindelse. Prøv igen.", "No connection. Try again.", "span");
  }

  // Confirm for a sync link: merge this device's progress with the code's progress.
  function linkPanel(box, code) {
    var current = MBP.sync.code();
    var shown = format(code);
    MBP.ui.confirmInline(box.firstChild, {
      da: "Hent fremgang fra koden " + shown + "? Fremgangen på denne enhed bliver lagt sammen med den." + (current ? " Denne enhed skifter fra sin nuværende kode." : ""),
      en: "Restore progress from code " + shown + "? Progress on this device is merged with it." + (current ? " This device switches from its current code." : ""),
      actionDa: "Hent",
      actionEn: "Restore",
      cancelDa: "Annullér",
      cancelEn: "Cancel",
      onAction: function () {
        MBP.sync.join(code).then(function (result) {
          if (result === "ok") location.reload();
          else renderSync(box, { restore: true, msg: result });
        });
      }
    });
  }

  // Has a code: the status, the code, a QR code (hidden until asked for), copy and disconnect.
  function connectedView(box, qrOpen) {
    var last = MBP.sync.lastSync();
    var lastText = last ? clock(last) : null;
    var status = h("div", { class: "sync-status" },
      bi("Synkroniseret", "Synced", "p"),
      bi("Sidst: " + (lastText || "aldrig"), "Last: " + (lastText || "never"), "p"));
    var copy = h("button", { type: "button", class: "btn btn-secondary btn-small" }, bi("Kopiér kode", "Copy code", "span"));
    var disconnect = h("button", { type: "button", class: "btn btn-quiet btn-small" }, bi("Afbryd", "Disconnect", "span"));
    var qrToggle = h("button", { type: "button", class: "btn btn-quiet btn-small" });
    var qrBox = h("div", { class: "sync-qr", hidden: qrOpen ? null : true },
      h("div", { class: "sync-qr-card" }, qrSvg(syncLink(MBP.sync.code()))),
      bi("Scan med telefonens kamera for at hente fremgangen.", "Scan with your phone's camera to restore the progress.", "p"));

    function setQr(open) {
      qrBox.hidden = !open;
      qrToggle.textContent = "";
      qrToggle.appendChild(open ? bi("Skjul QR-kode", "Hide QR code", "span") : bi("Vis QR-kode", "Show QR code", "span"));
      qrToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setQr(!!qrOpen);
    qrToggle.addEventListener("click", function () {
      setQr(qrBox.hidden);
    });

    copy.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(MBP.sync.code()).then(function () {
        MBP.ui.toast("Koden er kopieret.", "Code copied.");
      }, function () {});
    });
    disconnect.addEventListener("click", function () {
      MBP.ui.confirmInline(disconnect, {
        da: "Afbryd synkronisering på denne enhed? Din fremgang bliver her.",
        en: "Disconnect sync on this device? Your progress stays here.",
        actionDa: "Afbryd",
        actionEn: "Disconnect",
        cancelDa: "Annullér",
        cancelEn: "Cancel",
        onAction: function () {
          MBP.sync.disconnect();
          renderSync(box);
        }
      });
    });

    box.appendChild(status);
    box.appendChild(h("code", { class: "sync-code" }, MBP.sync.code()));
    box.appendChild(h("div", { class: "sync-actions" }, copy, qrToggle, disconnect));
    box.appendChild(qrBox);
  }

  // The link a phone camera opens. The code is in the hash, which browsers never send to the server.
  function syncLink(c) {
    return location.origin + location.pathname.replace(/[^/]*$/, "") + "index.html#sync=" + c.replace(/-/g, "");
  }

  // A sync link opened in this browser: returns its code (without dashes) or null. Always removes the hash.
  function takeSyncLink() {
    if (location.hash.indexOf("#sync=") !== 0) return null;
    var raw = location.hash.slice("#sync=".length).toUpperCase().replace(/-/g, "");
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (e) {
      /* history not available: the hash stays until the next navigation */
    }
    if (!MBP.sync.enabled() || !/^[A-Z2-9]{16}$/.test(raw)) return null;
    if (MBP.sync.code().replace(/-/g, "") === raw) return null;
    return raw;
  }

  // QR code as an inline SVG: black modules on white, with a 4-module quiet zone. Built with DOM calls, not markup.
  var SVG_NS = "http://www.w3.org/2000/svg";
  function qrSvg(text) {
    var qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    var n = qr.getModuleCount();
    var quiet = 4;
    var size = n + quiet * 2;
    var d = "";
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(r, c)) d += "M" + (c + quiet) + " " + (r + quiet) + "h1v1h-1z";
      }
    }
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("width", "200");
    svg.setAttribute("height", "200");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "QR-kode til synkronisering");
    var bg = document.createElementNS(SVG_NS, "rect");
    bg.setAttribute("width", String(size));
    bg.setAttribute("height", String(size));
    bg.setAttribute("fill", "#ffffff");
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "#000000");
    path.setAttribute("shape-rendering", "crispEdges");
    svg.appendChild(bg);
    svg.appendChild(path);
    return svg;
  }

  // XXXX-XXXX-XXXX-XXXX for display.
  function format(c) {
    return c.replace(/(.{4})(?=.)/g, "$1-");
  }

  // HH:MM in local time.
  function clock(ms) {
    var d = new Date(ms);
    var m = d.getMinutes();
    return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (m < 10 ? "0" : "") + m;
  }

  // The blue "today" panel: countdown, week strip, summary and the main button.
  function todayPanel(days, streak, today, allMastered, perDay, total) {
    var label;
    var number = null;
    if (days > 1) {
      number = String(days);
      label = bi("dage til prøven", "days to the test", "h1");
    } else if (days === 1) {
      number = "1";
      label = bi("dag til prøven", "day to the test", "h1");
    } else if (days === 0) {
      label = bi("I dag! Held og lykke!", "Today! Good luck!", "h1");
    } else {
      label = bi("Prøven er overstået.", "The exam is over.", "h1");
    }

    var summaryDa = (streak === 1 ? "1 dag i træk" : streak + " dage i træk") + ", " + (today.answers >= 25 ? today.answers + " svar i dag – dagens mål er nået" : today.answers + " af 25 svar i dag");
    var summaryEn = (streak === 1 ? "1 day in a row" : streak + " days in a row") + ", " + (today.answers >= 25 ? today.answers + " answers today – daily goal reached" : today.answers + " of 25 answers today");
    var summaryTail = today.answers >= 25 ? MBP.icon("check", 18) : null;

    var cta;
    if (allMastered) {
      cta = h("a", { class: "btn btn-stack cta", href: "quiz.html?mode=exam" },
        bi("Tag en prøvesimulering", "Take an exam simulation", "span"));
    } else if (!MBP.store.hasAnyProgress()) {
      cta = h("a", { class: "btn btn-stack cta", href: "learn.html?topic=all" },
        bi("Start med dagens mærker", "Start with today's stamps", "span"));
    } else {
      cta = h("a", { class: "btn btn-stack cta", href: "learn.html?topic=all" },
        bi("Saml dagens mærker", "Collect today's stamps", "span"));
    }

    var courseNote = null;
    if (days > 0 && !allMastered) {
      courseNote = bi(
        "Dagens kurs er 10 emner. For at nå alle " + total + " inden prøven: ca. " + perDay + " om dagen.",
        "Today's course is 10 items. To cover all " + total + " before the test: about " + perDay + " a day.",
        "p");
    }

    var waves = '<svg class="waves" viewBox="0 0 180 60" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M0 10c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 30c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/><path d="M0 50c15-12 30 12 45 0s30 12 45 0 30 12 45 0 30 12 45 0"/></svg>';
    var wavesEl = document.createElement("div");
    wavesEl.innerHTML = waves;

    return h("section", { class: "today" },
      wavesEl.firstChild,
      number ? h("div", { class: "days" }, number) : null,
      label,
      bi(
        "Onsdag 25. november 2026",
        "Wednesday 25 November 2026",
        "p"),
      MBP.ui.weekStamps(),
      h("p", { class: "summary" }, bi(summaryDa, summaryEn, "span"), summaryTail),
      cta,
      courseNote ? h("p", { class: "cta-note" }, courseNote) : null);
  }

  // The two main buttons under the panel: learn and test.
  function mainActions() {
    return h("div", { class: "quick" },
      h("a", { class: "btn btn-secondary", href: "learn.html", title: "Learn – choose a topic" },
        MBP.icon("practise", 22),
        h("span", { class: "btn-text" },
          bi("Lær", "Learn", "span"),
          h("span", { class: "hint" }, bi("Vælg et emne", "Choose a topic", "span")))),
      h("a", { class: "btn btn-secondary", href: "quiz.html?mode=quiz", title: "Test – choose a topic or all" },
        MBP.icon("test", 22),
        h("span", { class: "btn-text" },
          bi("Test", "Test", "span"),
          h("span", { class: "hint" }, bi("Vælg emne eller alle", "Choose a topic or all", "span")))));
  }

  // Quiet link to the 15 most-asked questions, on their own page.
  function top15Link() {
    return h("a", { class: "btn btn-quiet top15-link", href: "top15.html", title: "The 15 most-asked questions" },
      MBP.icon("star", 20), bi("De 15 mest stillede spørgsmål", "The 15 most-asked questions", "span"));
  }

  // Reset progress, behind an inline confirm.
  function resetButton() {
    var btn = h("button", {
      type: "button",
      class: "btn btn-quiet reset",
      title: "Reset progress"
    }, "Nulstil fremgang");
    btn.addEventListener("click", function () {
      MBP.ui.confirmInline(btn, {
        da: "Nulstil al fremgang? Det kan ikke fortrydes.",
        en: "Reset all progress? This cannot be undone.",
        actionDa: "Nulstil",
        actionEn: "Reset",
        cancelDa: "Annullér",
        cancelEn: "Cancel",
        onAction: function () {
          MBP.store.reset();
          location.reload();
        }
      });
    });
    return h("div", { class: "reset-row" }, btn);
  }
})();
