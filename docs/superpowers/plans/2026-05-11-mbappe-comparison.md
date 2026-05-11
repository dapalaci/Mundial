# Comparativa Mbappé — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-tab comparison widget inside the Mbappé player lightbox in `jugadores.html`, showing "Carrera al récord" (horizontal bars racing to Klose's 16) and "Por edad vs. leyendas" (vertical bars comparing goals at age 27).

**Architecture:** Pure JS + CSS, no external libraries. The data constants are declared inline in `jugadores.html`. The widget is injected into the existing `openPlayerLB()` function only when `p.name === 'Kylian Mbappé'`. Bars are rendered as `<div>` elements with CSS `width` set by JS as a percentage.

**Tech Stack:** Vanilla JS, CSS custom properties, existing design system (`--accent`, `--surface-2`, `--f-display`, `--f-mono`).

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `jugadores.html` | MODIFY | Add comparison CSS + data constants + tab HTML injection in `openPlayerLB()` |

---

## Task 1 — Comparison Data + CSS

**Files:**
- Modify: `jugadores.html` (CSS in `<style>` block + data constants before `openPlayerLB`)

- [ ] **Step 1: Add comparison CSS at the end of the `<style>` block in `jugadores.html`**

Find `</style>` in `<head>` and insert before it:

```css
/* ── Mbappé comparison widget ── */
.cmp-tabs {
  display: flex; gap: 0; margin: 28px 0 0;
  border-bottom: 1px solid var(--line);
}
.cmp-tab {
  padding: 8px 16px; font-family: var(--f-mono); font-size: 10px;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-faint);
  background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent;
  margin-bottom: -1px; transition: all .15s;
}
.cmp-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
.cmp-panels { margin-top: 20px; }
.cmp-panel { display: none; }
.cmp-panel.active { display: block; }

/* Horizontal bars (Carrera al récord) */
.cmp-bar-row {
  display: grid; grid-template-columns: 110px 1fr 28px;
  align-items: center; gap: 10px; margin-bottom: 10px;
}
.cmp-bar-label {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.08em;
  color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cmp-bar-label.highlight { color: var(--accent); font-weight: 600; }
.cmp-bar-track {
  height: 10px; background: var(--surface-3); border-radius: 5px; overflow: visible;
  position: relative;
}
.cmp-bar-fill {
  height: 100%; background: var(--surface-2); border-radius: 5px;
  transition: width .5s ease;
}
.cmp-bar-fill.highlight { background: var(--accent); }
.cmp-bar-dashed {
  position: absolute; top: 0; height: 100%;
  background: repeating-linear-gradient(
    90deg, color-mix(in oklch, var(--accent) 50%, transparent) 0,
    color-mix(in oklch, var(--accent) 50%, transparent) 4px, transparent 4px, transparent 8px
  );
  border-radius: 0 5px 5px 0; opacity: 0.7;
}
.cmp-bar-val {
  font-family: var(--f-display); font-size: 14px; letter-spacing: -0.02em;
  color: var(--text-dim); text-align: right;
  font-variation-settings: "opsz" 144;
}
.cmp-bar-val.highlight { color: var(--accent); }
.cmp-note {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.1em;
  color: var(--accent); margin-top: 14px; padding: 10px 12px;
  background: color-mix(in oklch, var(--accent) 8%, var(--surface));
  border-radius: 8px; border-left: 2px solid var(--accent); line-height: 1.5;
}

/* Vertical bars (Por edad) — heights are fixed px, grid just aligns bottoms */
.cmp-age-grid {
  display: flex; align-items: flex-end; gap: 10px; padding-bottom: 4px;
}
.cmp-age-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.cmp-age-bar {
  width: 100%; background: var(--surface-3); border-radius: 4px 4px 0 0;
  transition: height .5s ease; min-height: 4px;
}
.cmp-age-bar.highlight { background: var(--accent); }
.cmp-age-bar.projected {
  background: repeating-linear-gradient(
    180deg, color-mix(in oklch, var(--accent) 45%, transparent) 0,
    color-mix(in oklch, var(--accent) 45%, transparent) 4px, transparent 4px, transparent 8px
  );
  border: 1px dashed color-mix(in oklch, var(--accent) 60%, transparent);
  border-bottom: none;
}
.cmp-age-name {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: 0.06em;
  color: var(--text-faint); text-align: center; line-height: 1.3;
}
.cmp-age-name.highlight { color: var(--accent); }
.cmp-age-val {
  font-family: var(--f-display); font-size: 18px; letter-spacing: -0.02em;
  color: var(--text-dim); font-variation-settings: "opsz" 144;
}
.cmp-age-val.highlight { color: var(--accent); }
```

- [ ] **Step 2: Add comparison data constants just before `openPlayerLB` in `jugadores.html`**

Find the line `/* ── Player lightbox ── */` (around line 702) and insert the two constants before it:

```javascript
/* ── Mbappé comparison data ── */
const RECORD_DATA = [
  { name: "Klose",   goals: 16, highlight: false },
  { name: "Ronaldo", goals: 15, highlight: false },
  { name: "G. Müller", goals: 14, highlight: false },
  { name: "Messi",   goals: 13, highlight: false },
  { name: "Fontaine",goals: 13, highlight: false },
  { name: "Pelé",    goals: 12, highlight: false },
  { name: "Mbappé",  goals: 12, highlight: true  },
];
const RECORD_MAX = 16;

// Goals accumulated by each player by age 27
const AGE27_DATA = [
  { name: "Mbappé",  age: 27, goals: 12, highlight: true,  projected: false },
  { name: "Ronaldo", age: 26, goals: 12, highlight: false, projected: false },
  { name: "Pelé",    age: 25, goals:  8, highlight: false, projected: false },
  { name: "Maradona",age: 26, goals:  7, highlight: false, projected: false },
  { name: "Messi",   age: 27, goals:  5, highlight: false, projected: false },
  { name: "Klose",   age: 24, goals:  5, highlight: false, projected: false },
];
const MBAPPE_PROJ_MIN = 16; // goals needed to beat Klose's record
```

- [ ] **Step 3: Commit**

```bash
git add jugadores.html
git commit -m "feat: add Mbappé comparison CSS and data constants to jugadores.html"
```

---

## Task 2 — Inject Comparison Tabs into `openPlayerLB()`

**Files:**
- Modify: `jugadores.html` (`openPlayerLB` function, lines ~702–748)

- [ ] **Step 1: Modify `openPlayerLB()` to inject comparison tabs for Mbappé**

Find the closing part of `openPlayerLB()` where `el.innerHTML = ...` ends (around line 744):

```javascript
      (facts ? '<div class="plb-section-title">' + (lang==="en"?"Curiosities":"Curiosidades") + '</div><div class="plb-facts">' + facts + '</div>' : '') +
    '</div>';
```

Replace that closing string with:

```javascript
      (facts ? '<div class="plb-section-title">' + (lang==="en"?"Curiosities":"Curiosidades") + '</div><div class="plb-facts">' + facts + '</div>' : '') +
      (p.name === 'Kylian Mbappé' ? _mbappeCmpHTML(lang) : '') +
    '</div>';
```

- [ ] **Step 2: Add `_mbappeCmpHTML()` render function just before `openPlayerLB()`**

Find the line `/* ── Player lightbox ── */` and add the function after the data constants (before `function openPlayerLB`):

```javascript
function _mbappeCmpHTML(lang) {
  const t1 = lang === 'en' ? 'Race to the record' : 'Carrera al récord';
  const t2 = lang === 'en' ? 'By age vs. legends' : 'Por edad vs. leyendas';

  // --- Tab 1: Horizontal bars (race to record) ---
  const barRows = RECORD_DATA.map(d => {
    const solidW = Math.round((d.goals / RECORD_MAX) * 100);
    const hl = d.highlight;
    const dashedLeft = hl ? solidW : null;
    const dashedW    = hl ? Math.round(((RECORD_MAX - d.goals) / RECORD_MAX) * 100) : null;
    return `
      <div class="cmp-bar-row">
        <div class="cmp-bar-label${hl ? ' highlight' : ''}">${d.name}</div>
        <div class="cmp-bar-track">
          <div class="cmp-bar-fill${hl ? ' highlight' : ''}" style="width:${solidW}%"></div>
          ${hl ? `<div class="cmp-bar-dashed" style="left:${dashedLeft}%;width:${dashedW}%"></div>` : ''}
        </div>
        <div class="cmp-bar-val${hl ? ' highlight' : ''}">${d.goals}</div>
      </div>`;
  }).join('');

  const goalsNeeded = RECORD_MAX - RECORD_DATA.find(d => d.highlight).goals;
  const noteText = lang === 'en'
    ? `Le faltan <strong>${goalsNeeded} goals</strong> to surpass Klose's record · Up to 3 World Cups remaining (2026, 2030, 2034)`
    : `Le faltan <strong>${goalsNeeded} goles</strong> para superar el récord de Klose · Tiene hasta 3 Mundiales disponibles (2026, 2030, 2034)`;

  // --- Tab 2: Vertical bars (age 27 comparison) ---
  // Use fixed pixel heights so bars work regardless of parent height
  const BAR_H = 80; // px, max bar height
  const maxGoals = Math.max(...AGE27_DATA.map(d => d.goals), MBAPPE_PROJ_MIN);
  const ageCols = AGE27_DATA.map(d => {
    const barPx  = Math.round((d.goals / maxGoals) * BAR_H);
    const hl = d.highlight;
    const projPx = hl ? Math.round(((MBAPPE_PROJ_MIN - d.goals) / maxGoals) * BAR_H) : 0;
    return `
      <div class="cmp-age-col">
        <div class="cmp-age-val${hl ? ' highlight' : ''}">${d.goals}${hl ? '+' : ''}</div>
        <div style="display:flex;flex-direction:column;align-items:stretch;">
          ${hl && projPx > 0 ? `<div class="cmp-age-bar projected" style="height:${projPx}px"></div>` : ''}
          <div class="cmp-age-bar${hl ? ' highlight' : ''}" style="height:${barPx}px"></div>
        </div>
        <div class="cmp-age-name${hl ? ' highlight' : ''}">${d.name}<br><span style="opacity:.6">${d.age}a</span></div>
      </div>`;
  }).join('');

  const projNote = lang === 'en'
    ? `Dashed bar = projection if Mbappé scores ≥${MBAPPE_PROJ_MIN - 12} goals at 2026 → <strong>new all-time record</strong>`
    : `Barra punteada = proyección si Mbappé marca ≥${MBAPPE_PROJ_MIN - 12} goles en 2026 → <strong>nuevo récord absoluto</strong>`;

  return `
    <div class="cmp-tabs" id="cmp-tabs">
      <button class="cmp-tab active" onclick="_cmpTab(0)">${t1}</button>
      <button class="cmp-tab" onclick="_cmpTab(1)">${t2}</button>
    </div>
    <div class="cmp-panels">
      <div class="cmp-panel active" id="cmp-panel-0">
        ${barRows}
        <div class="cmp-note">${noteText}</div>
      </div>
      <div class="cmp-panel" id="cmp-panel-1">
        <div class="cmp-age-grid">${ageCols}</div>
        <div class="cmp-note">${projNote}</div>
      </div>
    </div>`;
}

function _cmpTab(idx) {
  document.querySelectorAll('.cmp-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.querySelectorAll('.cmp-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
}
```

- [ ] **Step 3: Test locally**

Open `jugadores.html` in the browser (use `vercel dev` or just open the file locally). Click on the Kylian Mbappé card.

Expected:
- The lightbox opens normally with photo, bio, chips, stats, clubs, curiosities
- Below the curiosities section, there are two tabs: "Carrera al récord" and "Por edad vs. leyendas"
- Tab 1 shows 7 horizontal bars. Mbappé's bar (12) is in the accent color (violet). A dashed extension continues from 12 to 16 (Klose's record). Note below says "Le faltan **4 goles**..."
- Clicking Tab 2 shows 6 vertical bars. Mbappé's bar is accent-colored at height 12 with a dashed extension upward. Note says "≥4 goles en 2026 → nuevo récord absoluto"

- [ ] **Step 4: Verify tab switching works**

Click Tab 1 → Tab 2 → Tab 1. Each panel should show/hide correctly. The active tab should have the accent underline.

- [ ] **Step 5: Verify other player lightboxes are unaffected**

Click on Pelé's card, then Messi's card. Their lightboxes should open with NO comparison tabs (only Mbappé gets them).

- [ ] **Step 6: Commit**

```bash
git add jugadores.html
git commit -m "feat: add Mbappé historical comparison tabs in player lightbox"
```

---

## Task 3 — Deploy

- [ ] **Step 1: Deploy to production**

```bash
vercel --prod
```

- [ ] **Step 2: Verify on production**

Open `https://mundial-mu.vercel.app/jugadores.html`. Click on Mbappé. Both comparison tabs should work on production.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: deploy Mbappé comparison feature to production"
```
