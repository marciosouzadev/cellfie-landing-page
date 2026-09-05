/* Cellfie — interações da página (sem dependências externas) */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu-principal");

  /* Sombra/borda do cabeçalho ao rolar */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Menu mobile */
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    menu.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (e.target.closest(".nav") || e.target.closest(".nav__toggle")) return;
      closeMenu();
    });

    var mq = window.matchMedia("(min-width: 841px)");
    var syncMq = function () { if (mq.matches) closeMenu(); };
    if (mq.addEventListener) { mq.addEventListener("change", syncMq); }
    else if (mq.addListener) { mq.addListener(syncMq); }
  }
})();
