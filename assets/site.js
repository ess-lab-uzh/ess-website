// Small interactive bits of the site. No external libraries: uses the
// Bootstrap that Quarto already includes.

document.addEventListener("DOMContentLoaded", function () {

  // ---------------------------------------------------------------------
  // Home photo: shows the first photo; arrows switch to the next one.
  // Automatic switching is OFF unless the hero has data-interval="<seconds>"
  // (e.g. data-interval="30"). Visitors who prefer reduced motion never
  // get automatic switching.
  // ---------------------------------------------------------------------
  document.querySelectorAll(".hero").forEach(function (hero) {
    var slides = hero.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;
    var i = 0;
    function show(n) {
      slides[i].classList.remove("active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active");
    }
    var prev = hero.querySelector(".hero-prev");
    var next = hero.querySelector(".hero-next");
    var timer = null;
    var seconds = parseFloat(hero.getAttribute("data-interval") || "0");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function restart() {
      if (timer) clearInterval(timer);
      if (seconds > 0 && !reduce) timer = setInterval(function () { show(i + 1); }, seconds * 1000);
    }
    if (prev) prev.addEventListener("click", function () { show(i - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(i + 1); restart(); });
    restart();
  });

  // ---------------------------------------------------------------------
  // Project pop-ups: previous / next buttons and arrow keys
  // ---------------------------------------------------------------------
  var modals = Array.prototype.slice.call(document.querySelectorAll(".project-modal"));
  if (!modals.length || typeof bootstrap === "undefined") return;
  // Pop-ups must sit directly in <body>, otherwise the dark background
  // is drawn on top of them.
  modals.forEach(function (m) { document.body.appendChild(m); });

  function go(current, step) {
    var idx = modals.indexOf(current);
    var target = modals[(idx + step + modals.length) % modals.length];
    current.addEventListener("hidden.bs.modal", function once() {
      current.removeEventListener("hidden.bs.modal", once);
      bootstrap.Modal.getOrCreateInstance(target).show();
    });
    bootstrap.Modal.getOrCreateInstance(current).hide();
  }

  modals.forEach(function (m) {
    var p = m.querySelector(".project-prev");
    var n = m.querySelector(".project-next");
    if (p) p.addEventListener("click", function () { go(m, -1); });
    if (n) n.addEventListener("click", function () { go(m, +1); });
    m.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(m, -1);
      if (e.key === "ArrowRight") go(m, +1);
    });
  });
});
