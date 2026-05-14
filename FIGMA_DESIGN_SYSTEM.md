# Mundial 2026 — Figma Design System Rules
> For use with the Figma MCP (Model Context Protocol) integration.  
> Last updated: 2026-05-14

---

## 1. DESIGN TOKENS

### Color System — OKLCh Palette

All colors live in `:root` inside `assets/shared.css`. The system uses **OKLCh** for perceptually uniform accent variants.

```css
/* Neutrals */
--bg:        #0a0a0d;
--surface:   #12121a;
--surface-2: #1a1a24;
--surface-3: #24242f;
--line:        rgba(255,255,255,0.08);
--line-strong: rgba(255,255,255,0.16);
--text:      #ececf0;
--text-dim:  #9a9aa8;
--text-faint:#5a5a68;

/* Accent (overridden per page via data-accent) */
--accent:     oklch(0.78 0.15 85);
--accent-dim: oklch(0.78 0.15 85 / 0.15);
--accent-soft:oklch(0.78 0.15 85 / 0.35);
--accent-ink: oklch(0.15 0.04 85);

/* Spacing unit */
--unit: 8px;
--container: 1400px;

/* Radii */
--radius:    14px;
--radius-sm:  8px;
--radius-lg: 22px;
```

### Per-Page Accent Map

| Page | `data-accent` | Hue | Token |
|------|--------------|-----|-------|
| inicio.html | tricolor | MX green / CA red / US blue | oklch(0.65 0.18 145) |
| selecciones.html | magenta | 350° | oklch(0.68 0.22 350) |
| jugadores.html | emerald | 155° | oklch(0.72 0.17 155) |
| historia.html | amber | 60° | oklch(0.74 0.16 60) |
| fanfest.html | sun | 95° | oklch(0.87 0.17 95) |
| finales.html | carmine | 20° | oklch(0.63 0.22 20) |
| goleadores.html | cyan | 210° | oklch(0.78 0.14 210) |
| mascotas.html | coral | 35° | oklch(0.72 0.18 35) |
| balones.html | gold | 85° | oklch(0.80 0.14 85) |
| oraculo.html | violet | 300° | oklch(0.68 0.22 300) |
| revelaciones.html | emerald | 155° | (same as jugadores) |

### Typography Tokens

```css
--f-display: "Fraunces", "Times New Roman", serif;
--f-sans:    "Inter", system-ui, sans-serif;
--f-mono:    "JetBrains Mono", ui-monospace, monospace;
```

**Scale (clamp-based):**
```
hero-title  → clamp(56px, 10vw, 168px)  / lh 0.88
h1          → clamp(40px,  5vw,  72px)  / lh 0.96
h2          → clamp(32px, 3.5vw, 48px)  / lh 1.02
h3          → clamp(22px,  2vw,  28px)  / lh 1.15
eyebrow     → 11px / ls 0.20em / uppercase / mono
lead        → 17px / lh 1.55 / sans
body        → 15px / lh 1.60 / sans
mono-label  → 12px / ls 0.04em / mono
```

---

## 2. COMPONENT LIBRARY

### Atomic Components

| Component | Class | File |
|-----------|-------|------|
| Chip/tag | `.chip` | shared.css |
| Button primary | `.btn.primary` | shared.css |
| Button ghost | `.btn` | shared.css |
| Nav bar | `.m26-nav` | shared.css |
| Footer | `.m26-footer` | shared.css |
| Eyebrow label | `.eyebrow` | shared.css |

### Layout Components

| Component | Class | Cols | File |
|-----------|-------|------|------|
| Bento hero | `.b.b-hero` | 8/12 | per page |
| Bento side | `.b.b-side` | 4/12 | per page |
| Bento half | `.b.b-half` | 6/12 | per page |
| Bento third | `.b.b-third` | 4/12 | per page |
| Editorial grid | `.editorial-grid` | 3 cols | inicio.html |
| Mosaic | `.mosaic` | 12 auto-rows | fanfest.html |
| Player grid | `.p-grid` | 3 cols | jugadores.html |

### Composite Components

- **Player Card** (`.p-card`) — photo + number bg + stats
- **Featured Card** (`.featured`) — large 2-col layout
- **Timeline Card** (`.t-card`) — left-right alternating
- **Mosaic Tile** (`.tile`) — video / quote / stat / pattern variants
- **Lightbox** (`.plb`) — full-screen overlay, 2-col grid

---

## 3. FRAMEWORKS & LIBRARIES

| Layer | Choice |
|-------|--------|
| UI framework | **None** — Vanilla HTML |
| Styling | **Vanilla CSS** (custom properties + grid) |
| JavaScript | **Vanilla JS** — no framework |
| Build system | **None** — files served directly |
| Deployment | **Vercel** (vercel.json, edge functions) |
| AI backend | **Gemini 2.0 Flash** via `/api/chat.js` |
| Testing | **Playwright** |

> **Figma rule:** All components must be implementable in plain HTML/CSS. No JSX, no component framework. Style in `<style>` blocks or `assets/shared.css`.

---

## 4. ASSET MANAGEMENT

```
assets/
├── shared.css / shared.js       ← global system
├── balon 1930.png … 2026.png    ← 23 match balls (~2MB ea)
├── seccion-*.png                ← section hero images (600×450)
├── goleador-*.webp              ← player headshots
├── hero-trophy-ball.png         ← landing hero
├── mascots-2026.png
└── mbappe.jpg
```

**No CDN** — all assets local. Reference pattern: `src="assets/filename.ext"`

**Image treatment in CSS:**
```css
filter: saturate(0.85) contrast(1.05) brightness(0.92);
```

---

## 5. ICON SYSTEM

No icon library. Use in order of preference:
1. **Inline SVG** — for interactive/animated icons
2. **Unicode** — `✦` `✕` `●` `⚽` for decorative marks
3. **CSS shapes** — clip-path, border tricks for simple shapes
4. **CSS `::before`/`::after`** — for pseudo-element decorations

---

## 6. STYLING APPROACH

- **Methodology:** Semantic class names, no BEM
- **Cascade:** `:root` tokens → `[data-accent]` page override → component classes → inline overrides
- **No utility classes** (no Tailwind, no atomic CSS)
- **Grid:** CSS Grid throughout (12-col bento, 3-col editorial, auto mosaic)
- **Glassmorphism pattern:**
  ```css
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  backdrop-filter: blur(20px);
  border: 1px solid var(--line);
  ```

### Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| 1100px | Collapse mosaic to 6 cols, team grid to 3 |
| 900px | Stack bento, collapse editorial to 1 col |
| 800px | Stack player grid, compare grids |
| 640px | Full-width mosaic tiles |
| 680px | Mobile lightbox |

---

## 7. PROJECT STRUCTURE

```
mundial/
├── assets/          ← shared.css, shared.js, images
├── api/             ← Vercel edge functions (chat.js, fixtures.js)
├── tests/           ← Playwright E2E
├── inicio.html      ← Home (tricolor)
├── selecciones.html ← Teams (magenta)
├── jugadores.html   ← Star players (emerald)
├── historia.html    ← Timeline (amber)
├── fanfest.html     ← Fan Fest (sun)
├── finales.html     ← Finals history (carmine)
├── goleadores.html  ← Top scorers (cyan)
├── mascotas.html    ← Mascots (coral)
├── balones.html     ← Match balls (gold)
├── momentos.html    ← Historic moments (carmine)
├── oraculo.html     ← AI Oracle (violet)
└── revelaciones.html← Surprise teams (emerald)
```

Each page = one HTML file with its own `<style>` block + inline `<script>`. Shared system injected via `assets/shared.css` + `assets/shared.js`.

---

## 8. FIGMA → CODE MAPPING RULES

When translating Figma designs to this codebase:

1. **Frames → Section/div** with `class="wrap"` and `max-width: var(--container)`
2. **Auto Layout (horizontal)** → `display: flex; gap: Xpx`
3. **Auto Layout (vertical)** → `display: flex; flex-direction: column; gap: Xpx`
4. **Grid layout** → CSS Grid with `grid-template-columns: repeat(12,1fr); gap: 20px`
5. **Colors** → always map to the nearest `var(--token)`, never hardcode hex
6. **Corner radius** → use `var(--radius)` (14px), `var(--radius-sm)` (8px), or `var(--radius-lg)` (22px)
7. **Typography** → map to the scale table above, use `clamp()` for responsive sizes
8. **Shadows** → `box-shadow: 0 4px 16px rgba(0,0,0,0.4)` or `drop-shadow`
9. **Blur layers** → `backdrop-filter: blur(20px)` with `will-change: transform` on parent
10. **Gradients** → prefer `oklch()` colors for vibrant, uniform gradients

---

## 9. RECOMMENDED CREATIVE EFFECTS

> Implementable in this vanilla CSS/JS stack. Ordered from quick-win to advanced.

### Tier 1 — Quick Wins (CSS only)

#### A. Grain / Film Noise Overlay
Adds cinematic realism to hero sections — looks stunning over dark gradients.
```css
.hero::after {
  content: "";
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: 0.35;
}
```

#### B. Iridescent / Aurora Gradient
Modern "liquid" background that shifts with CSS custom property animation.
```css
@keyframes aurora {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.aurora-bg {
  background: linear-gradient(135deg,
    oklch(0.45 0.22 145),  /* green */
    oklch(0.45 0.22 250),  /* blue */
    oklch(0.50 0.24 25),   /* red */
    oklch(0.55 0.20 85)    /* gold */
  );
  background-size: 400% 400%;
  animation: aurora 12s ease infinite;
}
```

#### C. Glowing Accent Border (cards on hover)
```css
.card:hover {
  border-color: var(--accent);
  box-shadow:
    0 0 0 1px var(--accent),
    0 0 24px var(--accent-dim),
    0 0 60px var(--accent-dim);
}
```

#### D. Text Gradient Clip (headline effect)
```css
.gradient-text {
  background: linear-gradient(135deg, var(--accent), var(--text));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### E. Frosted Glass Panel (mejorado)
```css
.glass-card {
  background: oklch(0.12 0.02 260 / 0.6);
  backdrop-filter: blur(32px) saturate(1.8);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
}
```

#### F. Shimmer / Skeleton Loading
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--surface-2) 25%,
    var(--surface-3) 50%,
    var(--surface-2) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

### Tier 2 — Interactive Effects (CSS + minimal JS)

#### G. Parallax Depth Layers (scroll-driven)
Nativo CSS con `animation-timeline: scroll()` — sin JS.
```css
@supports (animation-timeline: scroll()) {
  .hero-bg {
    animation: parallax-move linear both;
    animation-timeline: scroll(root);
    animation-range: 0px 600px;
  }
  @keyframes parallax-move {
    from { transform: translateY(0); }
    to   { transform: translateY(120px); }
  }
}
```

#### H. Magnetic Card Tilt (3D perspective on hover)
```javascript
document.querySelectorAll('.p-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `
      perspective(600px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 12}deg)
      translateY(-4px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

#### I. Cursor Spotlight / Glow Follower
```javascript
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
```
```css
body::before {
  content: "";
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    var(--accent-dim) 0%,
    transparent 70%
  );
}
```

#### J. Scroll-Reveal con Intersection Observer
```javascript
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.b, .ed-card, .p-card').forEach(el => io.observe(el));
```
```css
.b, .ed-card, .p-card {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.b.revealed, .ed-card.revealed, .p-card.revealed {
  opacity: 1;
  transform: none;
}
```

---

### Tier 3 — Premium Visual Effects

#### K. SVG Noise + Color Aberration (hero text)
```css
.hero-title {
  filter:
    drop-shadow(0 0 40px var(--accent))
    drop-shadow(0 0 80px var(--accent-dim));
  text-shadow:
    2px 0 0 oklch(0.65 0.22 20 / 0.4),  /* chromatic red */
    -2px 0 0 oklch(0.65 0.22 210 / 0.4); /* chromatic blue */
}
```

#### L. Conic Gradient Trophy / Badge (celebración)
```css
.trophy-badge {
  background: conic-gradient(
    from 180deg at 50% 50%,
    oklch(0.82 0.18 85)  0deg,
    oklch(0.92 0.12 95)  60deg,
    oklch(0.82 0.18 85) 120deg,
    oklch(0.70 0.20 75) 180deg,
    oklch(0.82 0.18 85) 240deg,
    oklch(0.92 0.12 95) 300deg,
    oklch(0.82 0.18 85) 360deg
  );
  border-radius: 50%;
  animation: trophy-spin 8s linear infinite;
}
@keyframes trophy-spin {
  to { filter: hue-rotate(360deg); }
}
```

#### M. Particle / Confetti JS (page de fanfest / finales)
```javascript
function spawnConfetti(container, count = 80) {
  const colors = ['#22c55e','#ef4444','#3b82f6','#f59e0b','#ec4899'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.style.cssText = `
      position:absolute;
      width:${4 + Math.random()*6}px;
      height:${8 + Math.random()*10}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}%;
      top:-20px;
      border-radius:2px;
      opacity:${0.6 + Math.random()*0.4};
      animation: fall ${1.5+Math.random()*2.5}s ${Math.random()*2}s linear forwards;
      transform: rotate(${Math.random()*360}deg);
    `;
    container.appendChild(p);
  }
}
/* @keyframes fall: translateY(100vh) + rotateZ(720deg) */
```

#### N. Live Score Ticker — Neon Pulse
```css
.ticker-track {
  animation: slide 45s linear infinite;
}
.ticker-item.live {
  color: var(--accent);
  text-shadow: 0 0 8px var(--accent), 0 0 20px var(--accent-dim);
}
.ticker-item.live::before {
  content: "●";
  animation: neon-pulse 1s ease-in-out infinite alternate;
}
@keyframes neon-pulse {
  from { opacity: 1; text-shadow: 0 0 4px var(--accent); }
  to   { opacity: 0.4; text-shadow: 0 0 16px var(--accent); }
}
```

#### O. Morphing Country Flag Background (hero)
```css
@keyframes flag-morph {
  0%   { clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%); opacity: 0.12; }
  33%  { clip-path: polygon(0 0, 66% 0, 66% 100%, 0 100%); opacity: 0.18; }
  66%  { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 0.12; }
  100% { clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%); opacity: 0.12; }
}
.flag-stripe-mx { background: oklch(0.55 0.22 145); animation: flag-morph 6s ease-in-out infinite; }
.flag-stripe-us { background: oklch(0.50 0.22 25);  animation: flag-morph 6s ease-in-out 2s infinite; }
.flag-stripe-ca { background: oklch(0.50 0.22 250); animation: flag-morph 6s ease-in-out 4s infinite; }
```

#### P. Stadium Crowd Noise Visualizer (Web Audio API)
```javascript
// Animación de barras de audio "environment" — sin micrófono
async function fakeAudioViz(containerEl) {
  const bars = Array.from({ length: 32 }, (_, i) => {
    const b = document.createElement('div');
    b.className = 'viz-bar';
    containerEl.appendChild(b);
    return b;
  });
  function tick() {
    bars.forEach(b => {
      const h = 4 + Math.random() * 48;
      b.style.height = h + 'px';
      b.style.opacity = 0.4 + (h / 52) * 0.6;
    });
    requestAnimationFrame(tick);
  }
  tick();
}
```
```css
.viz-bar {
  width: 3px; border-radius: 2px;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent-dim);
  transition: height 0.12s ease, opacity 0.12s ease;
}
```

---

## 10. IMPLEMENTATION PRIORITY ROADMAP

| Priority | Effect | Page | Effort |
|----------|--------|------|--------|
| 🔴 High | Scroll-reveal (J) | Todos | 30 min |
| 🔴 High | Glowing card borders (C) | jugadores, selecciones | 20 min |
| 🔴 High | Cursor spotlight (I) | inicio | 15 min |
| 🟠 Medium | Grain overlay (A) | inicio hero | 10 min |
| 🟠 Medium | Aurora gradient bg (B) | fanfest hero | 20 min |
| 🟠 Medium | 3D card tilt (H) | jugadores | 30 min |
| 🟠 Medium | Text gradient clip (D) | inicio hero title | 10 min |
| 🟡 Low | Neon ticker (N) | inicio ticker | 20 min |
| 🟡 Low | Confetti (M) | finales / fanfest | 45 min |
| 🟡 Low | Audio visualizer (P) | fanfest | 1 hr |
| ⬜ Future | Flag morph (O) | inicio hero | 45 min |
| ⬜ Future | Chromatic aberration (K) | hero titles | 15 min |

---

## 11. FIGMA DESIGN GUIDELINES FOR THIS PROJECT

### Do
- Use **OKLCh** in Figma color variables to match the CSS tokens exactly
- Map card corner radius to 8 / 14 / 22 px (radius-sm / radius / radius-lg)
- Design dark-first; light mode is only on inicio.html
- Use 12-column grid with 20px gaps in Figma frames
- Respect the per-page accent — each section has a unique hue identity
- Keep typography strictly to Fraunces (headings) / Inter (body) / JetBrains Mono (labels)
- Test all designs at 1400px, 1100px, 900px, and 375px viewports

### Don't
- Don't design components that require React/Vue — everything is vanilla HTML
- Don't introduce new font families
- Don't use hardcoded hex values — always reference the token
- Don't add images without a local file at `assets/` — no external URL images
- Don't design layouts that require more than 2 levels of nesting
