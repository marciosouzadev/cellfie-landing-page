/* ============================================================
   Cellfie — interações da página
   Sem dependências externas. Não usa cookies.
   Armazena apenas o registro de escolha de privacidade em
   localStorage (dado não pessoal: categorias + data + versão).
   ============================================================ */
(function () {
  "use strict";

  /* Anti-clickjacking (defense-in-depth): o GitHub Pages não envia
     X-Frame-Options e 'frame-ancestors' não vale via <meta>. Se a página
     for carregada dentro de um frame de outra origem, sai do frame.
     Em hospedagem com cabeçalhos, o _headers já cobre isso. */
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location.href;
    }
  } catch (e) {
    document.documentElement.style.display = "none";
  }

  /* Marca que o JavaScript está ativo (habilita menu e aviso) */
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------
     1. Cabeçalho: borda ao rolar
     --------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     2. Menu mobile
     --------------------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu-principal");

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
      if (menu.classList.contains("is-open")) { closeMenu(); } else { openMenu(); }
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
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

  /* ---------------------------------------------------------
     3. Preferências de privacidade / consentimento
     ---------------------------------------------------------
     Categorias possíveis: necessary (sempre), preferences,
     statistics, marketing.
     Estado atual do site: NENHUMA tecnologia opcional em uso,
     portanto todas as categorias opcionais ficam desativadas.
     A função applyConsent() é o ponto único onde tecnologias
     opcionais devem ser ligadas no futuro — e só se a categoria
     correspondente estiver autorizada.
     --------------------------------------------------------- */
  var CONSENT_KEY = "cellfie.consent";
  var CONSENT_VERSION = "2026-09-05"; /* alterar quando as políticas mudarem */
  var OPTIONAL_CATEGORIES = ["preferences", "statistics", "marketing"];

  var banner = document.getElementById("cookie-banner");
  var dialog = document.getElementById("prefs-dialog");

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function safeRemove(key) {
    try { window.localStorage.removeItem(key); } catch (e) {}
  }

  function readConsent() {
    var raw = safeGet(CONSENT_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== CONSENT_VERSION) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(categories) {
    var record = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      categories: { necessary: true }
    };
    OPTIONAL_CATEGORIES.forEach(function (c) {
      record.categories[c] = !!(categories && categories[c]);
    });
    safeSet(CONSENT_KEY, JSON.stringify(record));
    return record;
  }

  /* Aplica (ou não) tecnologias opcionais conforme o consentimento.
     Hoje é intencionalmente vazio: não há nada opcional para carregar.
     Exemplo de uso futuro:
       if (record.categories.statistics) { carregarAnalyticsProprio(); }
  */
  function applyConsent(record) {
    if (!record) return;
    // Nenhuma tecnologia opcional implementada no momento.
    void record;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }
  function showBanner() {
    if (banner) banner.hidden = false;
  }

  function openPrefs() {
    if (!dialog) return;
    syncDialogToState(readConsent());
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }
  function closePrefs() {
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) { dialog.close(); }
    else { dialog.removeAttribute("open"); }
  }

  function syncDialogToState(record) {
    if (!dialog) return;
    OPTIONAL_CATEGORIES.forEach(function (cat) {
      var box = dialog.querySelector('[data-cat="' + cat + '"]');
      var state = dialog.querySelector('[data-state-for="' + cat + '"]');
      var on = !!(record && record.categories && record.categories[cat]);
      if (box) box.checked = on;
      if (state) {
        state.textContent = on ? "Ativado" : "Não utilizado";
        state.classList.toggle("prefs__state--on", on);
      }
    });
  }

  function handleConsent(action) {
    var categories = {};
    if (action === "accept") {
      /* Autoriza todas as categorias opcionais DISPONÍVEIS.
         Como nenhuma está disponível, na prática equivale a "somente necessários"
         hoje — mas o registro fica marcado como aceite. */
      OPTIONAL_CATEGORIES.forEach(function (c) {
        var box = dialog && dialog.querySelector('[data-cat="' + c + '"]');
        categories[c] = !!(box && box.checked && !box.disabled);
      });
    } else if (action === "reject") {
      OPTIONAL_CATEGORIES.forEach(function (c) { categories[c] = false; });
    } else if (action === "revoke") {
      safeRemove(CONSENT_KEY);
      syncDialogToState(null);
      closePrefs();
      showBanner();
      return;
    }
    var record = writeConsent(categories);
    applyConsent(record);
    syncDialogToState(record);
    hideBanner();
    closePrefs();
  }

  /* Liga os botões (banner + modal + rodapé) */
  document.addEventListener("click", function (e) {
    var consentBtn = e.target.closest("[data-consent]");
    if (consentBtn) { handleConsent(consentBtn.getAttribute("data-consent")); return; }
    if (e.target.closest("[data-open-prefs]")) { e.preventDefault(); openPrefs(); return; }
    if (e.target.closest("[data-close-prefs]")) { closePrefs(); return; }
  });

  if (dialog) {
    dialog.addEventListener("cancel", function () { closePrefs(); });
  }

  /* Estado inicial */
  var current = readConsent();
  if (current) {
    applyConsent(current);
    hideBanner();
  } else {
    showBanner();
  }
})();
