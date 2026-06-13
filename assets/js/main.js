/* Crown Link Products Corporation — main.js
   Handles: mobile nav, sticky header state, scroll-triggered reveals,
   contact form ?product= pre-fill. Respects prefers-reduced-motion. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav toggle ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    // Close the menu when a nav link is chosen
    header.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll-triggered section reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      // Stagger siblings within the same parent for grid reveals
      revealEls.forEach(function (el) {
        var siblings = el.parentElement
          ? Array.prototype.filter.call(el.parentElement.children, function (c) {
              return c.classList && c.classList.contains("reveal");
            })
          : [el];
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (Math.max(idx, 0) % 8) * 70 + "ms";
      });
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Contact page: pre-fill product of interest ---------- */
  var productField = document.getElementById("product");
  if (productField) {
    var params = new URLSearchParams(window.location.search);
    var product = params.get("product");
    if (product) {
      productField.value = decodeURIComponent(product.replace(/\+/g, " "));
      var form = document.getElementById("rfq-form");
      if (form) {
        window.setTimeout(function () {
          form.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
          });
          productField.focus({ preventScroll: true });
        }, 120);
      }
    }
  }

  /* ---------- Sticky quote CTA body padding flag (mobile bar) ---------- */
  if (document.querySelector(".quote-fab")) {
    document.body.classList.add("has-fab");
  }
})();


/* Product image toggle: render <-> GD&T drawing */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.pm-btn');
  if (!btn || btn.classList.contains('is-on')) return;
  var media = btn.closest('.product-media');
  if (!media) return;
  media.querySelectorAll('.pm-btn').forEach(function (b) {
    var on = b === btn;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  var showDraw = btn.dataset.view === 'draw';
  media.querySelector('.pm-photo').hidden = showDraw;
  media.querySelector('.pm-draw').hidden = !showDraw;
});
