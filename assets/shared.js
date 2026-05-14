/* ==========================================================
   MUNDIAL 26 — Shared nav, i18n, Tweaks, footer injection
   ========================================================== */
(function () {
  const PAGES = [
    { id: "inicio",        href: "inicio.html",        es: "Inicio",       en: "Home",       accent: "tricolor", host: "white" },
    { id: "selecciones",   href: "selecciones.html",   es: "Selecciones",  en: "Teams",      accent: "magenta",  host: "mx" },
    { id: "historia",      href: "historia.html",      es: "Historia",     en: "History",    accent: "amber",    host: "ca" },
    { id: "insignia",      href: "jugadores.html",     es: "Insignia",     en: "Stars",      accent: "emerald",  host: "us" },
    { id: "finales",       href: "finales.html",       es: "Finales",      en: "Finals",     accent: "carmine",  host: "mx" },
    { id: "goleadores",    href: "goleadores.html",    es: "Goleadores",   en: "Scorers",    accent: "cyan",     host: "ca" },
    { id: "balones",       href: "balones.html",       es: "Balones",      en: "Match Balls",accent: "gold",     host: "us" },
    { id: "mascotas",      href: "mascotas.html",      es: "Mascotas",     en: "Mascots",    accent: "coral",    host: "mx" },
    { id: "oraculo",       href: "oraculo.html",       es: "Oráculo IA",   en: "AI Oracle",  accent: "violet",   host: "ca" },
    { id: "fanfest",       href: "fanfest.html",       es: "Fan Fest",     en: "Fan Fest",   accent: "sun",      host: "us" },
    { id: "revelaciones",  href: "revelaciones.html",  es: "Revelaciones", en: "Surprises",  accent: "emerald",  host: "mx" },
    { id: "momentos",      href: "momentos.html",      es: "Momentos",     en: "Moments",    accent: "carmine",  host: "ca" },
  ];

  const I18N = {
    brand:     { es: "Mundial",      en: "World Cup" },
    brandItal: { es: "26",           en: "26" },
    tickets:   { es: "Entradas",     en: "Tickets" },
    lang:      { es: "EN",           en: "ES" },
    live:      { es: "EN VIVO",      en: "LIVE" },
    tweaks:    { es: "Ajustes",      en: "Tweaks" },

    tw_title:    { es: "Ajustes",              en: "Tweaks" },
    tw_accent:   { es: "Color de acento",      en: "Accent color" },
    tw_density:  { es: "Densidad",             en: "Density" },
    tw_compact:  { es: "Compacto",             en: "Compact" },
    tw_comfy:    { es: "Normal",               en: "Comfy" },
    tw_spacious: { es: "Amplio",               en: "Spacious" },
    tw_font:     { es: "Tipografía",           en: "Typography" },
    tw_editorial:{ es: "Editorial",            en: "Editorial" },
    tw_sport:    { es: "Deportivo",            en: "Sport" },
    tw_modern:   { es: "Moderno",              en: "Modern" },

    foot_about:   { es: "Sobre el torneo", en: "About the cup" },
    foot_media:   { es: "Prensa y medios", en: "Press & media" },
    foot_privacy: { es: "Privacidad",      en: "Privacy" },
    foot_terms:   { es: "Términos",        en: "Terms" },
    foot_contact: { es: "Contacto",        en: "Contact" },
    foot_tag:     { es: "Cinema del fútbol global — edición 2026", en: "Global football cinema — 2026 edition" },
    foot_credit:  { es: "Sitio conceptual. No afiliado a FIFA™.",  en: "Concept site. Not affiliated with FIFA™." },
  };

  // ----- Lang state -----
  function getLang() {
    return localStorage.getItem("m26:lang") || "es";
  }
  function setLang(l) {
    localStorage.setItem("m26:lang", l);
    document.documentElement.lang = l;
    applyI18n();
  }
  function applyI18n() {
    const l = getLang();
    document.querySelectorAll("[data-i18n-es]").forEach(el => {
      const v = el.getAttribute(l === "en" ? "data-i18n-en" : "data-i18n-es");
      if (v != null) el.innerHTML = v;
    });
    // Also update nav link labels
    document.querySelectorAll(".m26-links a").forEach(a => {
      const id = a.getAttribute("data-page");
      const p = PAGES.find(p => p.id === id);
      if (p) a.textContent = p[l];
    });
    // Header bits
    const br = document.querySelector(".m26-brand .brand-text");
    if (br) br.innerHTML = `${I18N.brand[l]} <em>${I18N.brandItal[l]}</em>`;
    const langBtn = document.querySelector("[data-lang-btn]");
    if (langBtn) langBtn.textContent = I18N.lang[l];
    const ticketBtn = document.querySelector("[data-ticket-btn]");
    if (ticketBtn) ticketBtn.textContent = I18N.tickets[l];
    const tweaksBtn = document.querySelector("[data-tweaks-btn]");
    if (tweaksBtn) tweaksBtn.innerHTML = `<span class="dot"></span>${I18N.tweaks[l]}`;

    // Tweaks panel labels
    const tp = document.getElementById("tweaks-panel");
    if (tp) {
      tp.querySelector("[data-tw-title]").textContent = I18N.tw_title[l];
      tp.querySelector("[data-tw-accent]").textContent = I18N.tw_accent[l];
      tp.querySelector("[data-tw-density]").textContent = I18N.tw_density[l];
      tp.querySelector("[data-tw-compact]").textContent = I18N.tw_compact[l];
      tp.querySelector("[data-tw-comfy]").textContent = I18N.tw_comfy[l];
      tp.querySelector("[data-tw-spacious]").textContent = I18N.tw_spacious[l];
      tp.querySelector("[data-tw-font]").textContent = I18N.tw_font[l];
      tp.querySelector("[data-tw-editorial]").textContent = I18N.tw_editorial[l];
      tp.querySelector("[data-tw-sport]").textContent = I18N.tw_sport[l];
      tp.querySelector("[data-tw-modern]").textContent = I18N.tw_modern[l];
    }

    // Footer bits
    document.querySelectorAll("[data-foot]").forEach(el => {
      const k = el.getAttribute("data-foot");
      if (I18N[k]) el.textContent = I18N[k][l];
    });
  }

  // ----- Nav injection -----
  function buildNav(activeId) {
    const linksHtml = PAGES.map(p => `
      <a data-page="${p.id}" data-host="${p.host}" href="${p.href}" class="${p.id === activeId ? "active" : ""}">
        ${p[getLang()]}
      </a>`).join("");

    const navHtml = `
      <nav class="m26-nav">
        <div class="m26-nav-inner">
          <a href="inicio.html" class="m26-brand">
            <span class="mark" aria-hidden="true"></span>
            <span class="brand-text"></span>
          </a>
          <div class="m26-links" role="navigation">${linksHtml}</div>
          <div class="m26-utils">
            <button class="m26-util-btn" data-lang-btn>EN</button>
            <button class="m26-util-btn" data-tweaks-btn><span class="dot"></span>Tweaks</button>
            <button class="m26-util-btn primary" data-ticket-btn>Entradas</button>
          </div>
        </div>
      </nav>
    `;
    const slot = document.getElementById("m26-nav-slot");
    if (slot) slot.outerHTML = navHtml;
  }

  // ----- Footer injection -----
  function buildFooter() {
    const html = `
      <footer class="m26-footer">
        <div class="wrap">
          <div class="row" style="align-items: flex-start;">
            <div style="max-width:380px;">
              <h4><span data-foot="brand" style="font-style:italic;color:var(--accent)">Mundial 26</span></h4>
              <p class="body" data-foot="foot_tag" style="font-size:14px;">Global football cinema — 2026 edition</p>
            </div>
            <div class="stack gap-2">
              <span class="tiny" data-foot="foot_about">About</span>
              <a href="#">Host cities</a>
              <a href="#">Schedule</a>
              <a href="#">Venues</a>
            </div>
            <div class="stack gap-2">
              <span class="tiny" data-foot="foot_media">Press</span>
              <a href="#">Media kit</a>
              <a href="#">Newsroom</a>
              <a href="#" data-foot="foot_contact">Contact</a>
            </div>
            <div class="stack gap-2">
              <span class="tiny">Legal</span>
              <a href="#" data-foot="foot_privacy">Privacy</a>
              <a href="#" data-foot="foot_terms">Terms</a>
            </div>
          </div>
          <div style="margin-top:48px; padding-top:24px; border-top:1px solid var(--line); display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px;">
            <span class="tiny">© 2026 — <span data-foot="foot_credit">Concept site.</span></span>
            <span class="tiny">VERSION 1.0 / BUILD 26.04.26</span>
          </div>
        </div>
      </footer>
    `;
    const slot = document.getElementById("m26-footer-slot");
    if (slot) slot.outerHTML = html;
  }

  // ----- Tweaks panel -----
  const ACCENTS = ["gold","magenta","amber","emerald","carmine","cyan","coral","violet","sun","tricolor"];
  const ACCENT_SAMPLES = {
    gold:    "oklch(0.80 0.14 85)",
    magenta: "oklch(0.68 0.22 350)",
    amber:   "oklch(0.74 0.16 60)",
    emerald: "oklch(0.72 0.17 155)",
    carmine: "oklch(0.63 0.22 20)",
    cyan:    "oklch(0.78 0.14 210)",
    coral:   "oklch(0.72 0.18 35)",
    violet:  "oklch(0.68 0.22 300)",
    sun:     "oklch(0.87 0.17 95)",
    tricolor: "linear-gradient(90deg, oklch(0.62 0.22 25) 0% 33%, #fff 33% 66%, oklch(0.65 0.18 145) 66% 100%)",
  };

  function buildTweaks() {
    const html = `
      <aside id="tweaks-panel" class="tweaks-panel" aria-hidden="true">
        <h5 data-tw-title>Tweaks</h5>
        <label data-tw-accent>Accent</label>
        <div class="tweaks-swatches" id="tw-swatches">
          ${ACCENTS.map(a => `<button data-accent-val="${a}" style="--sw:${ACCENT_SAMPLES[a]}" aria-label="${a}"></button>`).join("")}
        </div>
        <label data-tw-density>Density</label>
        <div class="tweaks-row" style="grid-template-columns:repeat(3,1fr);" id="tw-density">
          <button data-density-val="compact"  data-tw-compact>Compact</button>
          <button data-density-val="comfy"    data-tw-comfy>Comfy</button>
          <button data-density-val="spacious" data-tw-spacious>Spacious</button>
        </div>
        <label data-tw-font>Typography</label>
        <div class="tweaks-row" style="grid-template-columns:repeat(3,1fr);" id="tw-font">
          <button data-font-val="editorial" data-tw-editorial>Editorial</button>
          <button data-font-val="sport"     data-tw-sport>Sport</button>
          <button data-font-val="modern"    data-tw-modern>Modern</button>
        </div>
      </aside>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
  }

  function applyAccentOverride() {
    const override = localStorage.getItem("m26:accent-override");
    if (override) document.documentElement.setAttribute("data-accent", override);
  }
  function applyDensity() {
    const d = localStorage.getItem("m26:density") || "comfy";
    document.documentElement.setAttribute("data-density", d);
  }
  function applyFontMode() {
    const f = localStorage.getItem("m26:fontmode") || "editorial";
    document.documentElement.setAttribute("data-fontmode", f);
  }
  function syncTweaksUI() {
    const over = localStorage.getItem("m26:accent-override");
    document.querySelectorAll("#tw-swatches button").forEach(b => {
      b.classList.toggle("active", b.dataset.accentVal === over);
    });
    const d = localStorage.getItem("m26:density") || "comfy";
    document.querySelectorAll("#tw-density button").forEach(b => {
      b.classList.toggle("active", b.dataset.densityVal === d);
    });
    const f = localStorage.getItem("m26:fontmode") || "editorial";
    document.querySelectorAll("#tw-font button").forEach(b => {
      b.classList.toggle("active", b.dataset.fontVal === f);
    });
  }

  function wireEvents() {
    // lang toggle
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-lang-btn]");
      if (t) { setLang(getLang() === "es" ? "en" : "es"); return; }

      const tw = e.target.closest("[data-tweaks-btn]");
      if (tw) {
        document.getElementById("tweaks-panel").classList.toggle("open");
        return;
      }

      const sw = e.target.closest("#tw-swatches button");
      if (sw) {
        const v = sw.dataset.accentVal;
        localStorage.setItem("m26:accent-override", v);
        document.documentElement.setAttribute("data-accent", v);
        syncTweaksUI();
        return;
      }
      const dn = e.target.closest("#tw-density button");
      if (dn) {
        localStorage.setItem("m26:density", dn.dataset.densityVal);
        applyDensity(); syncTweaksUI(); return;
      }
      const fn = e.target.closest("#tw-font button");
      if (fn) {
        localStorage.setItem("m26:fontmode", fn.dataset.fontVal);
        applyFontMode(); syncTweaksUI(); return;
      }
    });
  }

  // ----- Init -----
  window.M26 = {
    init(opts = {}) {
      const active = opts.active || "inicio";
      const page = PAGES.find(p => p.id === active);
      if (page && !localStorage.getItem("m26:accent-override")) {
        document.documentElement.setAttribute("data-accent", page.accent);
      } else {
        applyAccentOverride();
      }
      applyDensity();
      applyFontMode();

      document.documentElement.lang = getLang();
      buildNav(active);
      buildFooter();
      buildTweaks();
      applyI18n();
      syncTweaksUI();
      wireEvents();
    },
    setLang, getLang, applyI18n,
  };
})();

// ── Floating chatbot bubble (all pages except inicio.html) ──
(function injectChatBubble() {
  const path = window.location.pathname;
  if (path.endsWith('inicio.html') || path === '/' || path.endsWith('/index.html')) return;

  const style = document.createElement('style');
  style.textContent = `
    .m26-fab{position:fixed;bottom:24px;right:24px;z-index:300;width:52px;height:52px;border-radius:50%;
      background:var(--accent);border:none;font-size:22px;cursor:pointer;
      box-shadow:0 4px 24px color-mix(in oklch,var(--accent) 55%,transparent);
      transition:transform .15s;}
    .m26-fab:hover{transform:scale(1.08);}
    .m26-fab-panel{position:fixed;bottom:88px;right:24px;z-index:300;width:340px;
      background:var(--surface);border:1px solid var(--line-strong);border-radius:16px;
      overflow:hidden;display:none;flex-direction:column;
      box-shadow:0 12px 40px rgba(0,0,0,0.28);}
    .m26-fab-panel.open{display:flex;}
    .m26-fab-hdr{display:flex;justify-content:space-between;align-items:center;
      padding:12px 16px;border-bottom:1px solid var(--line);
      font-family:var(--f-mono);font-size:10px;letter-spacing:.15em;
      color:var(--text-dim);text-transform:uppercase;}
    .m26-fab-hdr button{background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:18px;line-height:1;padding:0;}
    .m26-fab-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;
      display:flex;flex-direction:column;gap:10px;min-height:60px;max-height:260px;}
    .m26-fab-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--line);}
    .m26-fab-input{flex:1;background:var(--surface-2);border:1px solid var(--line);
      border-radius:8px;padding:8px 12px;font-size:13px;color:var(--text);
      font-family:var(--f-body);outline:none;}
    .m26-fab-input:focus{border-color:var(--accent);}
    .m26-fab-send{background:var(--accent);color:var(--accent-ink);border:none;
      border-radius:8px;padding:8px 12px;font-size:14px;cursor:pointer;}
    .m26-fab-msg{display:flex;gap:8px;align-items:flex-start;}
    .m26-fab-msg.user{flex-direction:row-reverse;}
    .m26-fab-msg .bbl{max-width:82%;padding:8px 12px;border-radius:12px;font-size:13px;line-height:1.55;}
    .m26-fab-msg.user .bbl{background:var(--accent);color:var(--accent-ink);border-radius:12px 12px 4px 12px;}
    .m26-fab-msg.bot .bbl{background:var(--surface-2);border:1px solid var(--line);border-radius:12px 12px 12px 4px;}
    .m26-fab-msg .bbl strong{font-weight:600;}
    .m26-fab-dots{display:flex;gap:4px;padding:8px 12px;background:var(--surface-2);
      border:1px solid var(--line);border-radius:12px;width:fit-content;}
    .m26-fab-dots span{width:5px;height:5px;background:var(--text-faint);border-radius:50%;
      animation:m26-bounce .9s infinite;}
    .m26-fab-dots span:nth-child(2){animation-delay:.15s;}
    .m26-fab-dots span:nth-child(3){animation-delay:.3s;}
    @keyframes m26-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
  `;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.className = 'm26-fab-panel';
  panel.id = 'm26-fab-panel';
  panel.innerHTML = `
    <div class="m26-fab-hdr">
      <span>⚽ Asistente Mundial 26</span>
      <button onclick="document.getElementById('m26-fab-panel').classList.remove('open')">✕</button>
    </div>
    <div class="m26-fab-msgs" id="m26-fab-msgs"></div>
    <div class="m26-fab-input-row">
      <input class="m26-fab-input" id="m26-fab-input" type="text"
        placeholder="Pregunta sobre el Mundial..." autocomplete="off" />
      <button class="m26-fab-send" id="m26-fab-send">↑</button>
    </div>
  `;

  const fab = document.createElement('button');
  fab.className = 'm26-fab';
  fab.title = 'Asistente Mundial 26';
  fab.textContent = '⚽';
  fab.onclick = () => panel.classList.toggle('open');

  document.body.appendChild(panel);
  document.body.appendChild(fab);

  const fabHist = JSON.parse(sessionStorage.getItem('fabHistory') || '[]');

  function fabRender() {
    const el = document.getElementById('m26-fab-msgs');
    if (!el) return;
    el.innerHTML = fabHist.map(m => `
      <div class="m26-fab-msg ${m.role === 'user' ? 'user' : 'bot'}">
        <div class="bbl">${m.content
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>')}</div>
      </div>
    `).join('');
    el.scrollTop = el.scrollHeight;
  }

  async function fabSend() {
    const input = document.getElementById('m26-fab-input');
    const btn = document.getElementById('m26-fab-send');
    const msgs = document.getElementById('m26-fab-msgs');
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    btn.disabled = true;
    fabHist.push({ role: 'user', content: q });
    fabRender();
    const loader = document.createElement('div');
    loader.className = 'm26-fab-msg bot';
    loader.innerHTML = '<div class="m26-fab-dots"><span></span><span></span><span></span></div>';
    msgs.appendChild(loader);
    msgs.scrollTop = msgs.scrollHeight;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fabHist.slice(-6) })
      });
      const data = await res.json();
      fabHist.push({ role: 'assistant', content: data.reply || data.error || 'Sin respuesta.' });
      sessionStorage.setItem('fabHistory', JSON.stringify(fabHist.slice(-20)));
    } catch {
      fabHist.push({ role: 'assistant', content: 'Error de conexión.' });
    }
    fabRender();
    btn.disabled = false;
  }

  document.getElementById('m26-fab-send').onclick = fabSend;
  document.getElementById('m26-fab-input').onkeydown = e => { if (e.key === 'Enter') fabSend(); };
  fabRender();
})();

// ── J: Scroll-reveal via IntersectionObserver ──
(function () {
  if (!window.IntersectionObserver) return;
  const SELECTORS = '.b, .ed-card, .p-card, .tile, .card, .t-card, .map-card, .feat-card';
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  function watchEl(el) {
    if (!el.classList.contains('reveal-item')) {
      el.classList.add('reveal-item');
      io.observe(el);
    }
  }
  function scanDOM() {
    document.querySelectorAll(SELECTORS).forEach(watchEl);
  }

  var scanTimer;
  if (window.MutationObserver) {
    new MutationObserver(function () {
      clearTimeout(scanTimer);
      scanTimer = setTimeout(scanDOM, 60);
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(scanDOM, 150); });
  } else {
    setTimeout(scanDOM, 150);
  }
})();

// ── I: Cursor spotlight ──
(function () {
  document.documentElement.style.setProperty('--mx', '-999px');
  document.documentElement.style.setProperty('--my', '-999px');
  document.addEventListener('mousemove', function (e) {
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
  document.addEventListener('mouseleave', function () {
    document.documentElement.style.setProperty('--mx', '-999px');
    document.documentElement.style.setProperty('--my', '-999px');
  });
})();
