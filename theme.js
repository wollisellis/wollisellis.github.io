(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var labels = document.querySelectorAll("[data-theme-label]");
    for (var i = 0; i < labels.length; i++) {
      labels[i].textContent = theme === "dark" ? "Light" : "Dark";
    }
  }

  // Runs in <head> before first paint, so there is no flash.
  var current = stored() || systemTheme();
  root.setAttribute("data-theme", current);

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme"));
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        try { localStorage.setItem(KEY, next); } catch (e) {}
        apply(next);
      });
    }
  });

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (!stored()) { apply(e.matches ? "dark" : "light"); }
    };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); }
  }
})();
