// Camera QR scanner (SCAN_PLAN.md): opens the camera inside the page and reads a sync QR code.
// Self-contained: MBP.scan.start(container, onCode, onError) puts the scanner into any container and stops it again.
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});

  // jsQR sits in js/vendor/, next to qrcode.js. Its URL is worked out from this script's own URL.
  var DECODER = ((document.currentScript && document.currentScript.src) || "js/scan.js").replace(/scan\.js([?#].*)?$/, "vendor/jsQR.js");
  var CAMERA = { video: { facingMode: { ideal: "environment" } }, audio: false }; // back camera on phones, the webcam on laptops
  var MAX_SIDE = 640; // longest side of the frame that is read
  var EVERY = 150; // ms between frames
  var CODE = /^[A-HJ-NP-Z2-9]{16}$/; // sync codes: A-Z without I and O, and 2-9
  var loading = null; // one shared load of the decoder

  // A sync code from decoded QR text: a link with #sync=CODE, or a bare code with or without dashes. Otherwise null.
  function codeFrom(text) {
    var s = String(text || "").trim();
    var m = s.match(/#sync=([^&#\s]+)/);
    var raw = (m ? m[1] : s).toUpperCase().replace(/-/g, "");
    return CODE.test(raw) ? raw : null;
  }

  // The camera can be used here: a secure page (https or localhost) and getUserMedia.
  function supported() {
    return !!(window.isSecureContext && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // The text of the first QR code in one frame of pixels, or null.
  function readText(imageData) {
    if (!window.jsQR) return null;
    var found = window.jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
    return found ? found.data : null;
  }

  // Loads jsQR once, the first time a scan starts, so pages that never scan don't pay for it.
  function loadDecoder() {
    if (window.jsQR) return Promise.resolve();
    if (!loading) {
      loading = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = DECODER;
        s.onload = function () {
          if (window.jsQR) resolve();
          else reject(new Error("jsQR"));
        };
        s.onerror = function () {
          loading = null;
          reject(new Error("jsQR"));
        };
        document.head.appendChild(s);
      });
    }
    return loading;
  }

  function stopTracks(stream) {
    stream.getTracks().forEach(function (t) { t.stop(); });
  }

  // Maps a getUserMedia error to the message kind that home.js shows.
  function kindOf(e) {
    var n = e && e.name;
    if (n === "NotAllowedError" || n === "SecurityError") return "denied";
    if (n === "NotFoundError" || n === "OverconstrainedError") return "nocamera";
    if (n === "NotReadableError") return "busy";
    return "error";
  }

  // Shows the camera in container and calls onCode(code) once a sync QR is read.
  // onError(kind) is called if the camera can't be used; kind "cancel" means the user (or leaving the page) stopped it.
  function start(container, onCode, onError) {
    var h = MBP.ui.h;
    var bi = MBP.ui.bi;
    var closed = false;
    var stream = null;
    var timer = 0;
    var warned = false;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var video = h("video", { class: "scan-video" });
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.muted = true;
    video.playsInline = true;

    var hint = h("p", { class: "scan-hint", role: "status" });
    var frame = h("div", { class: "scan-frame" });
    var box = h("div", { class: "scan-box" }, video, frame, hint);
    var stopBtn = h("button", { type: "button", class: "btn btn-secondary btn-small" }, bi("Stop kamera", "Stop camera", "span"));
    var root = h("div", { class: "scan-root" }, box, stopBtn);

    function say(da, en) {
      hint.textContent = "";
      hint.appendChild(bi(da, en, "span"));
    }

    // Stops the camera, the loop and the scanner UI. Safe to call twice.
    function stop() {
      if (closed) return;
      closed = true;
      clearTimeout(timer);
      if (stream) stopTracks(stream);
      stream = null;
      video.srcObject = null;
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", cancel);
      if (root.parentNode) root.parentNode.removeChild(root);
    }

    // The user pressed Stop, or the page was left: the caller hears "cancel" and can show its button again.
    function cancel() {
      if (closed) return;
      stop();
      onError("cancel");
    }

    function fail(kind) {
      if (closed) return;
      stop();
      onError(kind);
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") cancel();
    }

    // Reads one frame. Returns the text of a QR code in it, or null.
    function readFrame() {
      var w = video.videoWidth;
      var ht = video.videoHeight;
      if (!w || !ht) return null;
      var k = Math.min(1, MAX_SIDE / Math.max(w, ht));
      canvas.width = Math.round(w * k);
      canvas.height = Math.round(ht * k);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return readText(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function tick() {
      if (closed) return;
      var text = video.readyState >= 2 ? readFrame() : null;
      if (text) {
        var code = codeFrom(text);
        if (code) {
          stop();
          onCode(code);
          return;
        }
        // A QR code, but not one of ours: say so once and keep looking.
        if (!warned) {
          warned = true;
          say("Det er ikke en Mærket-kode.", "That's not a Mærket code.");
        }
      }
      timer = setTimeout(tick, EVERY);
    }

    container.appendChild(root);
    say("Starter kameraet…", "Starting the camera…");
    stopBtn.addEventListener("click", cancel);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", cancel);

    if (!supported()) {
      fail("unsupported");
      return { stop: stop };
    }

    loadDecoder().then(function () {
      if (closed) return;
      return navigator.mediaDevices.getUserMedia(CAMERA).then(function (s) {
        // Stopped while the camera was being asked for: give the camera straight back.
        if (closed) {
          stopTracks(s);
          return;
        }
        stream = s;
        video.srcObject = s;
        video.play().catch(function () {});
        say("Ret kameraet mod QR-koden.", "Point the camera at the QR code.");
        tick();
      }, function (e) {
        fail(kindOf(e));
      });
    }, function () {
      fail("load");
    });

    return { stop: stop };
  }

  MBP.scan = {
    supported: supported,
    codeFrom: codeFrom,
    start: start,
    // For the tests: the sync code in one frame of pixels, or null.
    _decode: function (imageData) {
      var text = readText(imageData);
      return text ? codeFrom(text) : null;
    }
  };
})();
