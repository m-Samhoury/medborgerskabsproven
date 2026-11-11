// Sync progress between devices (SYNC_PLAN.md). The server merges; this file sends the whole snapshot and applies the merged result.
// Empty SYNC_URL means sync is off: nothing is sent and the home page hides the sync block.
// Every localStorage access is wrapped in try/catch, as in store.js.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  // The Lambda function URL (see sync/README.md). Empty means sync is off and its UI is hidden.
  var SYNC_URL = "https://tkipdm3xcgktor5ykejtnv62ii0cwhbd.lambda-url.eu-north-1.on.aws/";
  var CODE_KEY = "mbp.v1.syncCode";
  var LAST_KEY = "mbp.v1.syncLast";
  var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var CODE_RE = /^[A-Z2-9]{16}$/;
  var DEBOUNCE_MS = 15000;
  var FRESH_MS = 10000;
  var RENDER_WAIT_FIRST_MS = 1200;
  var SESSION_KEY = "mbp.v1.syncSession";

  var inflight = null;
  var dirty = false;
  var timer = null;

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage blocked: the code is kept for this page view only */
    }
  }

  function removeStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
  }

  // Upper-case letters and digits only, no dashes.
  function clean(input) {
    return String(input || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  }

  // XXXX-XXXX-XXXX-XXXX for display.
  function format(c) {
    return c.replace(/(.{4})(?=.)/g, "$1-");
  }

  function enabled() {
    return SYNC_URL !== "";
  }

  // The sync code without dashes, or "" when this device has none.
  function rawCode() {
    return clean(readStorage(CODE_KEY));
  }

  function code() {
    return format(rawCode());
  }

  function lastSync() {
    var n = Number(readStorage(LAST_KEY));
    return isFinite(n) && n > 0 ? n : 0;
  }

  // Sends a snapshot for a code. Resolves { status, data }, or null on a network error. Never rejects.
  function post(c, join, keepalive) {
    var url = SYNC_URL + "?code=" + encodeURIComponent(c) + (join ? "&join=1" : "");
    try {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(MBP.store.snapshot()),
        keepalive: !!keepalive
      }).then(function (res) {
        if (res.status !== 200) return { status: res.status, data: null };
        return res.json().then(function (data) {
          return { status: 200, data: data };
        });
      }).catch(function () {
        return null;
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  // Applies a merged result, but only if no local change happened during the request.
  function finish(res, before) {
    if (!res || res.status !== 200) return false;
    writeStorage(LAST_KEY, String(Date.now()));
    if (MBP.store.version() === before) {
      MBP.store.apply(res.data);
      dirty = false;
    } else {
      schedule(); // local changes came in while the request was in flight: send them too
    }
    return true;
  }

  // Sends this device's snapshot and applies the merged result. One request at a time. Resolves true or false, never throws.
  function syncNow() {
    if (!enabled() || !rawCode()) return Promise.resolve(false);
    if (inflight) return inflight;
    var before = MBP.store.version();
    inflight = post(rawCode(), false, false)
      .then(function (res) {
        return finish(res, before);
      })
      .catch(function () {
        return false;
      })
      .then(function (ok) {
        inflight = null;
        return ok;
      });
    return inflight;
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(syncNow, DEBOUNCE_MS);
  }

  // Called by store.js after every local data write.
  function changed() {
    if (!enabled() || !rawCode()) return;
    dirty = true;
    schedule();
  }

  // Last try before the page goes away: a keepalive POST whose response is ignored.
  function flush() {
    if (!dirty || !enabled() || !rawCode()) return;
    post(rawCode(), false, true);
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  // The first page view of a browser session may wait for the sync, at most 1.2 s. Later page views do not wait:
  // they sync in the background and render at once (the synced progress shows on the next page view).
  function firstViewThisSession() {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return false;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {
      /* storage blocked: every page view counts as the first */
    }
    return true;
  }

  // Before a page renders: sync if there is unsent data or the last sync is old.
  function beforeRender() {
    if (!enabled() || !rawCode()) return Promise.resolve();
    if (!dirty && Date.now() - lastSync() < FRESH_MS) return Promise.resolve();
    if (!firstViewThisSession()) {
      syncNow(); // background: not awaited, no re-render
      return Promise.resolve();
    }
    return Promise.race([syncNow(), wait(RENDER_WAIT_FIRST_MS)]);
  }

  // Makes a new sync code on this device and uploads the current progress under it.
  function create() {
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    var c = "";
    for (var i = 0; i < bytes.length; i++) c += ALPHABET[bytes[i] % ALPHABET.length];
    writeStorage(CODE_KEY, c);
    dirty = true;
    return syncNow();
  }

  // Connects this device to an existing code. Resolves "ok", "notfound" or "error".
  function join(input) {
    var c = clean(input);
    if (!enabled()) return Promise.resolve("error");
    if (!CODE_RE.test(c)) return Promise.resolve("notfound");
    return post(c, true, false).then(function (res) {
      if (!res) return "error";
      if (res.status === 404 || res.status === 400) return "notfound";
      if (res.status !== 200) return "error";
      writeStorage(CODE_KEY, c);
      MBP.store.apply(res.data);
      writeStorage(LAST_KEY, String(Date.now()));
      dirty = false;
      return "ok";
    });
  }

  // Forgets the code on this device. Local progress stays.
  function disconnect() {
    clearTimeout(timer);
    dirty = false;
    removeStorage(CODE_KEY);
    removeStorage(LAST_KEY);
  }

  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flush();
  });

  MBP.sync = {
    enabled: enabled,
    code: code,
    lastSync: lastSync,
    changed: changed,
    beforeRender: beforeRender,
    create: create,
    join: join,
    disconnect: disconnect
  };
})();
