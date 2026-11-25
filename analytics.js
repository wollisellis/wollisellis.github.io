(function () {
  "use strict";
  try {
    // Privacy-first hook. Fill ONE of the two values below (or set window.EW_ANALYTICS before this script).
    var cfg = (window.EW_ANALYTICS = window.EW_ANALYTICS || { goatcounter: "", ga4: "" });
    var gc = typeof cfg.goatcounter === "string" ? cfg.goatcounter.trim() : "";
    var ga = typeof cfg.ga4 === "string" ? cfg.ga4.trim() : "";
    var useGc = /^[a-z0-9-]+$/i.test(gc);
    var useGa = /^G-[A-Z0-9]+$/i.test(ga);
    if (!useGc && !useGa) return;

    function addScript(src, attrs) {
      var s = document.createElement("script");
      s.async = true;
      s.src = src;
      for (var k in attrs || {}) s.setAttribute(k, attrs[k]);
      s.onerror = function () {};
      document.head.appendChild(s);
    }

    if (useGc) {
      addScript("https://gc.zgo.at/count.js", {
        "data-goatcounter": "https://" + gc + ".goatcounter.com/count"
      });
    }
    if (useGa) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", ga, { anonymize_ip: true });
      addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga));
    }

    function labelFor(a) {
      var t = a.getAttribute("data-track");
      if (t) return t;
      var href = a.getAttribute("href") || "";
      return href.replace(/^https?:\/\//, "").replace(/^mailto:/, "mail/").slice(0, 80) || "link";
    }

    document.addEventListener("click", function (ev) {
      try {
        var el = ev.target && ev.target.closest ? ev.target.closest('a[data-track], a[href^="http"], a[download]') : null;
        if (!el) return;
        var label = labelFor(el);
        if (useGc && window.goatcounter && typeof window.goatcounter.count === "function") {
          window.goatcounter.count({ path: "click/" + label, title: label, event: true });
        }
        if (useGa && typeof window.gtag === "function") {
          window.gtag("event", "portfolio_click", { label: label });
        }
      } catch (e) {}
    }, true);
  } catch (e) {}
})();
