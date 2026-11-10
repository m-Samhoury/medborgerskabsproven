// Share and scan from the header (SYNC_POPUP_PLAN.md). A button next to the theme button opens a popup with two tabs:
// Share (this device's code and QR code) and Scan (the camera, or a typed code). Mounts itself on every page.
// Sync logic lives in js/sync.js and the camera in js/scan.js; this file only builds the UI.
(function () {
  "use strict";
  var MBP = window.MBP;
  var h = MBP.ui.h;
  var bi = MBP.ui.bi;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var WIDE = "(min-width: 760px)";
  var TABS = ["share", "scan"];

  var btn = null;
  var pop = null;
  var tabs = {};
  var panels = {};
  var tab = "share"; // the last tab used on this page view
  var scanner = null; // { stop } from MBP.scan.start while the camera runs
  var sharePanel, scanSlot, scanInput, scanConnect, scanRetry, scanMsg, switchLine;

  // Stops the camera if it is running. Safe to call when it is not.
  function stopScan() {
    if (!scanner) return;
    var s = scanner;
    scanner = null;
    s.stop();
  }

  // The header button: its label says whether this device is synced, and a dot marks it.
  function updateButton() {
    var on = !!MBP.sync.code();
    var da = "Del og hent fremgang" + (on ? " (synkroniseret)" : "");
    var en = "Share and restore progress" + (on ? " (synced)" : "");
    btn.setAttribute("aria-label", da + " – " + en);
    btn.setAttribute("title", da + " – " + en);
    btn.classList.toggle("is-synced", on);
  }

  // Places the popup under the header: at the button's right edge on wide screens, a full-width sheet on phones.
  function place() {
    var r = btn.getBoundingClientRect();
    var header = document.querySelector(".site-header");
    var wide = window.matchMedia(WIDE).matches;
    var top = (wide || !header ? r.bottom : header.getBoundingClientRect().bottom) + 8;
    pop.style.top = top + "px";
    pop.style.maxHeight = Math.max(160, window.innerHeight - top - 16) + "px";
    pop.style.left = wide ? "auto" : "";
    pop.style.right = wide ? Math.max(16, Math.round(window.innerWidth - r.right)) + "px" : "";
  }

  // No code yet: say what sharing does, and offer to make one.
  function createView() {
    var make = h("button", { type: "button", class: "btn btn-primary" }, bi("Opret kode", "Create code", "span"));
    make.addEventListener("click", function () {
      make.disabled = true;
      MBP.sync.create().then(function () {
        updateButton();
        renderShare();
      });
    });
    return h("div", { class: "sync-share" },
      bi("Del din fremgang med en anden enhed. Den anden enhed scanner QR-koden.", "Share your progress with another device. The other device scans the QR code.", "p"),
      make);
  }

  // Has a code: the QR code, the code, the status, copy and disconnect.
  function connectedView() {
    var code = MBP.sync.code();
    var last = MBP.sync.lastSync();
    var lastText = last ? clock(last) : null;
    var copy = h("button", { type: "button", class: "btn btn-secondary btn-small" }, bi("Kopiér kode", "Copy code", "span"));
    var disconnect = h("button", { type: "button", class: "btn btn-quiet btn-small" }, bi("Afbryd", "Disconnect", "span"));

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
          updateButton();
          renderShare();
        }
      });
    });

    return h("div", { class: "sync-share" },
      bi("Scan med telefonens kamera for at hente fremgangen.", "Scan with your phone's camera to restore the progress.", "p"),
      h("div", { class: "sync-qr" }, h("div", { class: "sync-qr-card" }, qrSvg(syncLink(code)))),
      h("code", { class: "sync-code" }, code),
      bi("Synkroniseret · sidst " + (lastText || "aldrig"), "Synced · last " + (lastText || "never"), "p"),
      h("div", { class: "sync-actions" }, copy),
      h("div", { class: "sync-foot" }, disconnect));
  }

  function renderShare() {
    sharePanel.textContent = "";
    sharePanel.appendChild(MBP.sync.code() ? connectedView() : createView());
  }

  // The Scan tab: the camera (when this browser can use it), then the code box to type into.
  function buildScan() {
    scanSlot = h("div", { class: "scan-slot" });
    switchLine = h("p", { class: "sync-help", hidden: true }, bi("Denne enhed skifter fra sin nuværende kode.", "This device switches from its current code.", "span"));
    scanInput = h("input", {
      type: "text",
      class: "sync-input",
      placeholder: "XXXX-XXXX-XXXX-XXXX",
      autocapitalize: "characters",
      autocomplete: "off",
      spellcheck: "false",
      "aria-label": "Sync code"
    });
    scanConnect = h("button", { type: "button", class: "btn btn-primary" }, bi("Forbind", "Connect", "span"));
    scanRetry = h("button", { type: "button", class: "btn btn-secondary btn-small", hidden: true }, bi("Prøv igen", "Try again", "span"));
    scanMsg = h("p", { class: "sync-msg", role: "status" });

    scanInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") scanConnect.click();
    });
    scanConnect.addEventListener("click", function () {
      stopScan();
      scanConnect.disabled = true;
      scanMsg.textContent = "";
      MBP.sync.join(scanInput.value).then(function (result) {
        if (result === "ok") {
          location.reload();
          return;
        }
        scanConnect.disabled = false;
        scanRetry.hidden = !MBP.scan.supported();
        scanMsg.appendChild(syncMessage(result));
      });
    });
    scanRetry.addEventListener("click", startScan);

    return h("div", { class: "sync-scan" },
      scanSlot,
      h("p", { class: "sync-help" }, bi("Ret kameraet mod QR-koden, eller skriv koden fra din anden enhed.", "Point the camera at the QR code, or type the code from your other device.", "span")),
      switchLine,
      scanInput,
      h("div", { class: "sync-actions" }, scanConnect, scanRetry),
      scanMsg);
  }

  // Starts the camera in the scan slot. A code read from it fills the box; Connect stays a press away.
  function startScan() {
    stopScan();
    scanMsg.textContent = "";
    scanRetry.hidden = true;
    if (!MBP.scan.supported()) return;
    scanner = MBP.scan.start(scanSlot, onCode, onScanError);
  }

  function onCode(code) {
    scanner = null;
    scanInput.value = format(code);
    scanMsg.textContent = "";
    scanMsg.appendChild(bi("Kode fundet. Tryk Forbind.", "Code found. Press Connect.", "span"));
    scanConnect.focus();
  }

  // The camera could not be used, or was stopped: offer to try again, with the reason unless it was stopped on purpose.
  function onScanError(kind) {
    scanner = null;
    scanMsg.textContent = "";
    if (kind === "cancel") scanMsg.appendChild(bi("Kameraet er stoppet.", "The camera is stopped.", "span"));
    else scanMsg.appendChild(scanMessage(kind));
    scanRetry.hidden = false;
  }

  // Shows one tab. quiet = do not start the camera (used when a sync link opens the popup).
  function select(name, quiet) {
    tab = name;
    TABS.forEach(function (n) {
      var on = n === name;
      tabs[n].setAttribute("aria-selected", on ? "true" : "false");
      tabs[n].tabIndex = on ? 0 : -1;
      panels[n].hidden = !on;
    });
    if (name === "share") {
      stopScan();
      renderShare();
      return;
    }
    switchLine.hidden = !MBP.sync.code();
    if (!quiet && !scanner) startScan();
  }

  function open(name, presetCode) {
    if (presetCode) {
      scanInput.value = format(presetCode);
      scanMsg.textContent = "";
      scanMsg.appendChild(bi("Tryk Forbind for at hente fremgangen.", "Press Connect to restore the progress.", "span"));
    }
    place();
    pop.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", place);
    select(name, !!presetCode);
    tabs[name].focus();
  }

  // Hides the popup and stops the camera. refocus = return focus to the header button.
  function close(refocus) {
    if (pop.hidden) return;
    stopScan();
    pop.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("resize", place);
    if (refocus) btn.focus();
  }

  function onKey(e) {
    if (e.key === "Escape" && !e.defaultPrevented) close(true); // a confirm inside the popup handles its own Escape
  }

  function onPointerDown(e) {
    if (pop.contains(e.target) || btn.contains(e.target)) return;
    close(false);
  }

  // Arrow keys, Home and End move between the two tabs.
  function onTabKey(e) {
    var next = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") next = tab === "share" ? "scan" : "share";
    else if (e.key === "Home") next = "share";
    else if (e.key === "End") next = "scan";
    if (!next) return;
    e.preventDefault();
    select(next, false);
    tabs[next].focus();
  }

  // The popup: a header with the title and close, the tab switch, and one panel per tab.
  function buildPopup() {
    var closeBtn = h("button", { type: "button", class: "sync-close", "aria-label": "Luk – Close", title: "Luk – Close" }, MBP.icon("close", 20));
    closeBtn.addEventListener("click", function () { close(true); });

    TABS.forEach(function (n) {
      var da = n === "share" ? "Del" : "Scan";
      var en = n === "share" ? "Share" : "Scan";
      tabs[n] = h("button", {
        type: "button",
        role: "tab",
        id: "sync-tab-" + n,
        class: "sync-tab",
        "aria-controls": "sync-panel-" + n
      }, bi(da, en, "span"));
      tabs[n].addEventListener("click", function () { select(n, false); });
    });
    var tablist = h("div", { class: "sync-tabs", role: "tablist", "aria-label": "Synkronisering – Sync" }, tabs.share, tabs.scan);
    tablist.addEventListener("keydown", onTabKey);

    sharePanel = h("div", { class: "sync-panel", role: "tabpanel", id: "sync-panel-share", "aria-labelledby": "sync-tab-share", tabindex: "0" });
    panels.scan = h("div", { class: "sync-panel", role: "tabpanel", id: "sync-panel-scan", "aria-labelledby": "sync-tab-scan", tabindex: "0", hidden: true }, buildScan());
    panels.share = sharePanel;

    pop = h("div", { class: "sync-pop", role: "dialog", "aria-labelledby": "sync-pop-title", hidden: true },
      h("div", { class: "sync-pop-head" },
        h("h2", { id: "sync-pop-title", class: "sync-pop-title" }, bi("Synkronisering", "Sync", "span")),
        closeBtn),
      tablist,
      sharePanel,
      panels.scan);
    document.body.appendChild(pop);
  }

  // The header button, right before the theme button.
  function buildButton(themeBtn) {
    btn = h("button", { type: "button", id: "sync-toggle", class: "sync-toggle-btn", "aria-haspopup": "dialog", "aria-expanded": "false" },
      MBP.icon("sync", 20));
    themeBtn.parentNode.insertBefore(btn, themeBtn);
    btn.addEventListener("click", function () {
      if (pop.hidden) open(tab, null);
      else close(true);
    });
    updateButton();
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

  // Mounts the button and popup. With sync off there is nothing to show.
  function mount() {
    var pending = takeSyncLink();
    var themeBtn = document.getElementById("theme-toggle");
    if (!MBP.sync.enabled() || !themeBtn) return;
    buildPopup();
    buildButton(themeBtn);
    renderShare();
    if (pending) open("scan", pending);
  }

  // The link a phone camera opens. The code is in the hash, which browsers never send to the server.
  function syncLink(c) {
    return location.origin + location.pathname.replace(/[^/]*$/, "") + "index.html#sync=" + c.replace(/-/g, "");
  }

  // The error line for a failed join.
  function syncMessage(result) {
    if (result === "notfound") return bi("Koden findes ikke.", "That code doesn't exist.", "span");
    return bi("Ingen forbindelse. Prøv igen.", "No connection. Try again.", "span");
  }

  // The error line for a failed camera scan.
  function scanMessage(kind) {
    if (kind === "denied") return bi("Kameraet er blokeret. Giv adgang i browserens indstillinger, eller skriv koden.", "The camera is blocked. Allow it in the browser settings, or type the code.", "span");
    if (kind === "nocamera") return bi("Der er intet kamera. Skriv koden.", "No camera found. Type the code.", "span");
    if (kind === "busy") return bi("Kameraet bruges af en anden app.", "Another app is using the camera.", "span");
    return bi("Kameraet kunne ikke startes. Skriv koden.", "The camera couldn't start. Type the code.", "span");
  }

  // QR code as an inline SVG: black modules on white, with a 4-module quiet zone. Built with DOM calls, not markup.
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

  mount();

  MBP.syncUi = {
    open: function () { if (btn) open(tab, null); }
  };
})();
