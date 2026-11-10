// SVG icons and topic illustrations. Static, trusted markup only (never data text).
(function () {
  "use strict";
  var MBP = (window.MBP = window.MBP || {});
  var NS = "http://www.w3.org/2000/svg";

  var UI = {
    today: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    read: '<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/><path d="M12 6v13.5"/>',
    practise: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
    test: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="m8 12 2.5 2.5L16 9"/>',
    exams: '<path d="M7 3.5h7l4.5 4.5v12.5h-11.5z"/><path d="M14 3.5V8h4.5M9.5 13h6M9.5 16.5h6"/>',
    star: '<path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" fill="currentColor" stroke="none"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    cross: '<path d="M7 7l10 10M17 7 7 17"/>',
    warn: '<path d="M12 3.5 2.5 20h19z" fill="var(--caution)"/><path d="M12 10v4.5M12 17.2v.3"/>',
    changed: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
    remember: '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4 2.5 4H5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    book: '<path d="M5.5 19.5V5A1.5 1.5 0 0 1 7 3.5h11.5v13H7a1.5 1.5 0 0 0-1.5 1.5v.5A1.5 1.5 0 0 0 7 20h11.5"/><path d="M9.5 7.5h5.5M9.5 10.5h4"/>',
    open: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    "theme-auto": '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/>',
    "theme-light": '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M5.1 18.9l1.6-1.6M17.3 6.7l1.6-1.6"/>',
    "theme-dark": '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'
  };

  var ART = {
    demokrati: '<rect x="13" y="22" width="38" height="20" rx="2"/><path d="M22 22h20"/><path d="M25 26V8h14v18" fill="var(--fill)"/><path d="m29 12 6 6m0-6-6 6"/><path d="M21 33h22"/>',
    kongehus: '<path d="M14 37 11 15l10 9 11-14 11 14 10-9-3 22z" fill="var(--fill)"/><path d="M14 42h36"/><circle cx="11" cy="15" r="2.2" fill="currentColor"/><circle cx="32" cy="10" r="2.2" fill="currentColor"/><circle cx="53" cy="15" r="2.2" fill="currentColor"/><circle cx="32" cy="29" r="3"/>',
    historie: '<path d="M15.5 25c-7-1-11-7-10.5-17 3 5 7 8 12.5 8.5" fill="var(--fill)"/><path d="M48.5 25c7-1 11-7 10.5-17-3 5-7 8-12.5 8.5" fill="var(--fill)"/><path d="M14 30C14 15 22 6 32 6s18 9 18 24z" fill="var(--fill)"/><path d="M32 6v24M15 21c8-3 26-3 34 0"/><path d="M12 30h40v5H12z"/><path d="M22 35c0 5 9 5 9 0M33 35c0 5 9 5 9 0"/><path d="M32 35v9"/><circle cx="17" cy="32.5" r="1" fill="currentColor"/><circle cx="47" cy="32.5" r="1" fill="currentColor"/>',
    geografi: '<g transform="translate(3 0)"><path d="M8.4 41.3 4.7 33.4 5.1 26.8 4.9 18.8 8.4 12.2 15.7 7.6 23 3.8 21.9 7 22.2 10.9 20.8 13.8 20.1 17.5 21.5 19.5 25.5 20.8 25.2 24.1 22.2 24.8 20.4 26.1 18.6 28.7 17.5 31.4 16.4 33.4 15.7 37.3 16.8 40 14.9 41.9z" fill="var(--fill)"/><path d="M16.8 34 20.1 32 23 33.4 24.8 36 23 39.3 20.1 40 17.5 38z" fill="var(--fill)"/><path d="M26.6 30.7 28.8 27.4 32.1 26.8 35.4 25.4 37.6 26.1 37.2 30.1 36.1 33.4 34.7 36 32.5 38 29.9 37.3 27.4 34.7z" fill="var(--fill)"/><path d="M25.9 41.9 30.3 41.9 33.2 43.3 32.1 45.2 28.1 44.6 25.9 43.7z" fill="var(--fill)"/><path d="M52.4 37.2 55.4 36.6 56.2 39.2 53.6 40.6z" fill="currentColor"/></g>',
    arbejde: '<path d="M10 46h46"/><path d="M46.4 46 47.2 30h1.2l.8 16" fill="var(--fill)" stroke-width="1.6"/><g transform="translate(47.8 29) rotate(0) scale(0.62)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><g transform="translate(47.8 29) rotate(120) scale(0.62)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><g transform="translate(47.8 29) rotate(240) scale(0.62)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><circle cx="47.8" cy="29" r="1.4" fill="currentColor" stroke="none"/><path d="M29.8 46 31.2 17h1.6l1.4 29z" fill="var(--fill)"/><g transform="translate(32 16) rotate(0) scale(1)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><g transform="translate(32 16) rotate(120) scale(1)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><g transform="translate(32 16) rotate(240) scale(1)"><path d="M0 0c-1.3-4-1.5-9.5-.5-15 .3-.5 .7-.5 1 0 .8 5.5.8 11-.5 15z" fill="currentColor" stroke-width="1"/></g><rect x="31" y="13.6" width="6" height="3.6" rx="1.2" fill="var(--fill)" stroke-width="1.6"/><circle cx="32" cy="16" r="2" fill="currentColor" stroke="none"/>',
    velfaerd: '<path d="M32 43S16 34 16 22a8 8 0 0 1 16-4 8 8 0 0 1 16 4c0 12-16 21-16 21z" fill="var(--fill)"/><path d="M32 23v11M26.5 28.5h11"/>',
    uddannelse: '<path d="M12 21c0-5 9-8 20-8s20 3 20 8c0 3-4 6-7 6H19c-3 0-7-3-7-6z" fill="var(--fill)"/><path d="M19 27h26v6H19z"/><path d="M19 33c3 6 23 6 26 0"/><circle cx="32" cy="30" r="2.4" fill="currentColor"/>',
    kultur: '<path d="M6 46c2-6 9-9 18-9 9-1 18 1 26 3 5 1 8 3 8 6z" fill="var(--fill)"/><circle cx="22" cy="10" r="4.2"/><path d="M18.3 8.5c-2 3-2.5 8-1 12 1 2.5 1 5 0 7"/><path d="M21 14.5c-1.5 4-1.8 9.5-.5 15h7c.3-5-.5-10-3-14.5z" fill="var(--fill)"/><path d="M24.5 17.5c3 3 5 6 6.5 9.5"/><path d="M20.5 29.5c4 4 12 5.5 20 4 4-.8 7-2.5 9.5-4.5 0 3-2 5.5-6 7-9 3.5-20 2-24-2.5z" fill="var(--fill)"/><path d="M50 29c2-3 5-4 8-4-2 2-3 4-3 6 2 1 4 3 4 5-3-1-6-2-8-4z" fill="var(--fill)"/>',
    traditioner: '<g fill="currentColor" stroke="none"><rect x="8" y="8" width="14" height="13"/><rect x="28" y="8" width="28" height="13"/><rect x="8" y="27" width="14" height="13"/><rect x="28" y="27" width="28" height="13"/></g><rect x="8" y="8" width="48" height="32"/>',
    verden: '<circle cx="32" cy="24" r="17" fill="var(--fill)"/><ellipse cx="32" cy="24" rx="7.5" ry="17"/><path d="M15 24h34M18 15h28M18 33h28"/>'
  };

  function svg(viewBox, w, h, strokeWidth, inner) {
    var el = document.createElementNS(NS, "svg");
    el.setAttribute("viewBox", viewBox);
    el.setAttribute("width", String(w));
    el.setAttribute("height", String(h));
    el.setAttribute("fill", "none");
    el.setAttribute("stroke", "currentColor");
    el.setAttribute("stroke-width", String(strokeWidth));
    el.setAttribute("stroke-linecap", "round");
    el.setAttribute("stroke-linejoin", "round");
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("focusable", "false");
    el.innerHTML = inner;
    return el;
  }

  // UI icon, square.
  MBP.icon = function (name, size) {
    return svg("0 0 24 24", size || 20, size || 20, 1.8, UI[name] || "");
  };

  // Topic illustration, 4:3. Small sizes (under 32px wide) get a thicker stroke and no fill.
  MBP.topicArt = function (topicId, width) {
    var w = width || 64;
    var small = w < 32;
    var el = svg("0 0 64 48", w, Math.round(w * 0.75), small ? 3.4 : 2.2, ART[topicId] || "");
    el.style.setProperty("--fill", small ? "transparent" : "color-mix(in srgb, currentColor 22%, transparent)");
    el.setAttribute("class", "topic-art");
    return el;
  };
})();
