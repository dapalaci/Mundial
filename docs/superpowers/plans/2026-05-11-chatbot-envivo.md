# Chatbot Asistente + Módulo En Vivo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Gemini-powered chat assistant and live World Cup fixtures module to the Mundial 26 static site.

**Architecture:** Two Vercel Serverless Functions (`api/chat.js`, `api/fixtures.js`) act as secure proxies for Gemini 2.0 Flash and football-data.org. Both use Node 18 built-in `fetch` — no npm packages needed. The chatbot appears as an inline section on `inicio.html` and as a floating FAB on all other pages (via `assets/shared.js`). The En Vivo widget replaces the static "Últimos amistosos" bento card on `inicio.html`.

**Tech Stack:** Vercel Serverless Functions (Node 18, ESM), Gemini 2.0 Flash REST API, football-data.org REST API v4, vanilla JS, CSS custom properties.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `api/chat.js` | CREATE | Gemini proxy + World Cup knowledge system prompt |
| `api/fixtures.js` | CREATE | football-data.org proxy, 60s CDN cache |
| `vercel.json` | CREATE | Pin Node runtime for API functions |
| `.env.local` | CREATE (don't commit) | Local dev API keys |
| `.gitignore` | MODIFY | Add `.env.local` |
| `inicio.html` | MODIFY | Add chatbot section CSS+HTML+JS; replace static matches card |
| `assets/shared.js` | MODIFY | Inject floating chat bubble on all non-home pages |

---

## Task 0 — Project Setup

**Files:**
- Create: `vercel.json`
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "functions": {
    "api/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

- [ ] **Step 2: Create `.env.local`** (template for local dev — never commit)

```
GEMINI_API_KEY=your_key_here
FOOTBALL_DATA_API_KEY=your_key_here
```

Get `GEMINI_API_KEY` free at https://aistudio.google.com/app/apikey  
Get `FOOTBALL_DATA_API_KEY` free at https://www.football-data.org/client/register

- [ ] **Step 3: Add `.env.local` to `.gitignore`**

Open `.gitignore` and add at the end:

```
# Environment variables — never commit
.env.local
.env*.local
```

- [ ] **Step 4: Verify `.gitignore` is working**

```bash
git status
```

Expected: `.env.local` should NOT appear in untracked files.

- [ ] **Step 5: Commit setup files**

```bash
git add vercel.json .gitignore
git commit -m "chore: add vercel.json and gitignore env files"
```

---

## Task 1 — `api/chat.js` — Gemini Proxy

**Files:**
- Create: `api/chat.js`

- [ ] **Step 1: Create the API directory and function**

```bash
mkdir api
```

Create `api/chat.js` with the full content below:

```javascript
const WC_KNOWLEDGE = `
## Copa del Mundo FIFA 2026

### Datos del torneo
- Edición: XXIII | Fechas: 11 jun – 19 jul 2026
- Anfitriones: Estados Unidos (principal), México, Canadá
- Equipos: 48 selecciones | Partidos: 104 | Grupos: 12 de 4 equipos
- Final: 19 jul 2026, MetLife Stadium, East Rutherford, Nueva Jersey

### Sedes (16 estadios)
Estados Unidos (11): MetLife Stadium NJ (FINAL), Rose Bowl LA, AT&T Stadium Dallas,
Levi's Stadium SF, Hard Rock Stadium Miami, Lumen Field Seattle,
Mercedes-Benz Stadium Atlanta, NRG Stadium Houston, Arrowhead Stadium KC,
Lincoln Financial Field Filadelfia, Gillette Stadium Boston/Foxborough
México (3): Estadio Azteca CDMX, Estadio Akron Guadalajara, Estadio BBVA Monterrey
Canadá (2): BMO Field Toronto, BC Place Vancouver

### Máximos goleadores históricos
1. Miroslav Klose (Alemania) — 16g en 24p, 4 Mundiales (2002,2006,2010,2014) — RÉCORD ABSOLUTO
2. Ronaldo Nazário (Brasil) — 15g en 19p, 4 Mundiales (1994,1998,2002,2006)
3. Gerd Müller (Alemania Occ.) — 14g en 13p, 2 Mundiales (1970,1974)
4. Lionel Messi (Argentina) — 13g en 26p, 5 Mundiales (2006-2022), campeón 2022
4. Just Fontaine (Francia) — 13g en 6p, 1 Mundial 1958 — récord por edición
6. Pelé (Brasil) — 12g en 14p, 4 Mundiales — único con 3 títulos (1958,1962,1970)
6. Kylian Mbappé (Francia) — 12g en 14p, 2 Mundiales (2018:4g, 2022:8g)
   → LE FALTAN 4 GOLES para superar el récord de Klose (16)
   → Hat-trick en la final de Qatar 2022 | Bota de Oro 2022
   → 27 años en 2026; puede jugar 2026, 2030 y posiblemente 2034
8. Jürgen Klinsmann (Alemania) — 11g, 3 Mundiales (1990,1994,1998)
8. Sándor Kocsis (Hungría) — 11g en 5p, 1 Mundial 1954
10. Helmut Rahn, Gary Lineker, Batistuta, Cubillas, Lato, T.Müller — 10g cada uno
18. Diego Maradona (Argentina) — 8g, 4 Mundiales, campeón 1986
18. Harry Kane (Inglaterra) — 8g, 2 Mundiales, Bota de Oro 2018

### Botas de Oro por edición
1930 Stábile(ARG)8 | 1934 Nejedlý(TCH)5 | 1938 Leônidas(BRA)7 | 1950 Ademir(BRA)8
1954 Kocsis(HUN)11 | 1958 Fontaine(FRA)13 | 1966 Eusébio(POR)9 | 1970 G.Müller(ALE)10
1974 Lato(POL)7 | 1978 Kempes(ARG)6 | 1982 Rossi(ITA)6 | 1986 Lineker(ING)6
1990 Schillaci(ITA)6 | 1994 Salenko/Stoichkov 6 | 1998 Šuker(CRO)6 | 2002 Ronaldo(BRA)8
2006 Klose(ALE)5 | 2010 T.Müller(ALE)5 | 2014 James Rodríguez(COL)6
2018 Kane(ING)6 | 2022 Mbappé(FRA)8

### Jugadores con más Mundiales disputados
5 Mundiales: Antonio Carbajal (México, 1950-1966), Lothar Matthäus (Alemania, 1982-1998)
4 Mundiales: Pelé, Uwe Seeler, Żmuda, Maradona, Cafu, Ronaldo, Maldini, Messi, T.Müller

### Récords especiales
- Más goles en un partido: Oleg Salenko 5 (Rusia 6-1 Camerún, 1994)
- Gol más rápido: Hakan Şükür 11s (Turquía vs Corea del Sur, 2002)
- Más joven en marcar: Pelé 17 años (1958)
- Único campeón como jugador Y entrenador: Franz Beckenbauer (1974 jugador, 1990 entrenador)
- Países con más títulos: Brasil 5, Alemania 4, Italia 4, Argentina 3, Francia 2

### Selecciones favoritas 2026 (según el Oráculo del sitio)
Argentina 22.4%, Francia 18.1%, Brasil 14.2%, España 11.3%, Inglaterra 9.0%
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: 'messages requerido' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key no configurada' });

  const SYSTEM = `Eres el asistente oficial del sitio web "Mundial 26". Responde preguntas sobre la Copa del Mundo 2026 y la historia del fútbol mundialista. Sé conciso (máximo 3 párrafos cortos), preciso y entusiasta. Responde SIEMPRE en el mismo idioma que el usuario (español o inglés). Pon los números clave en **negrita**.\n\n${WC_KNOWLEDGE}`;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
      })
    });

    if (r.status === 429)
      return res.status(429).json({ error: 'Demasiadas consultas, espera unos segundos.' });
    if (!r.ok) {
      console.error('Gemini error', r.status, await r.text());
      return res.status(502).json({ error: 'Error del asistente.' });
    }

    const data = await r.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sin respuesta.';
    res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno.' });
  }
}
```

- [ ] **Step 2: Smoke test locally with `vercel dev`**

```bash
vercel dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"¿Cuántos goles le faltan a Mbappé para el récord?"}]}'
```

Expected response:
```json
{"reply":"A Kylian Mbappé le faltan **4 goles** para superar el récord de Miroslav Klose..."}
```

- [ ] **Step 3: Commit**

```bash
git add api/chat.js
git commit -m "feat: add Gemini chat API function with World Cup knowledge base"
```

---

## Task 2 — Chatbot CSS + HTML in `inicio.html`

**Files:**
- Modify: `inicio.html` (add CSS inside `<style>`, add HTML section before `</main>`)

- [ ] **Step 1: Add CSS at the end of the `<style>` block in `inicio.html`**

Find the closing `</style>` tag in `<head>` and insert just before it:

```css
/* ── Chatbot section ── */
.chat-section { margin: 80px 0; }
.chat-hdr h2 {
  font-family: var(--f-display); font-size: clamp(40px,5vw,72px);
  letter-spacing: -0.03em; line-height: 0.95; margin: 12px 0 16px;
  font-variation-settings: "opsz" 144;
}
.chat-hdr h2 em { color: var(--accent); font-style: italic; }
.chat-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.chat-chips .chip {
  cursor: pointer; background: var(--surface-2); font-family: var(--f-mono);
  font-size: 11px; letter-spacing: 0.08em; padding: 8px 16px; border-radius: 999px;
  color: var(--text-dim); border: 1px solid var(--line); transition: all .15s;
}
.chat-chips .chip:hover { background: var(--accent); color: var(--accent-ink); border-color: transparent; }
.chat-box {
  background: var(--surface); border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg); overflow: hidden; max-width: 760px;
}
.chat-messages {
  min-height: 80px; max-height: 320px; overflow-y: auto;
  padding: 24px 24px 16px; display: flex; flex-direction: column; gap: 14px;
}
.chat-msg { display: flex; gap: 10px; align-items: flex-start; }
.chat-msg.user { flex-direction: row-reverse; }
.chat-msg .bubble {
  max-width: 75%; padding: 10px 16px; border-radius: 14px;
  font-size: 14px; line-height: 1.6;
}
.chat-msg.user .bubble { background: var(--accent); color: var(--accent-ink); border-radius: 14px 14px 4px 14px; }
.chat-msg.bot .bubble { background: var(--surface-2); border: 1px solid var(--line); border-radius: 14px 14px 14px 4px; }
.chat-msg .bubble strong { font-weight: 600; }
.chat-loading { display: flex; gap: 5px; padding: 12px 16px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 14px; width: fit-content; }
.chat-loading span { width: 6px; height: 6px; background: var(--text-faint); border-radius: 50%; animation: chat-bounce .9s infinite; }
.chat-loading span:nth-child(2) { animation-delay: .15s; }
.chat-loading span:nth-child(3) { animation-delay: .30s; }
@keyframes chat-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
.chat-input-row { display: flex; gap: 10px; padding: 14px 16px; border-top: 1px solid var(--line); background: var(--surface); }
.chat-input {
  flex: 1; background: var(--surface-2); border: 1px solid var(--line); border-radius: 10px;
  padding: 10px 16px; font-size: 14px; color: var(--text); font-family: var(--f-body); outline: none; transition: border-color .15s;
}
.chat-input:focus { border-color: var(--accent); }
.chat-send {
  padding: 10px 20px; background: var(--accent); color: var(--accent-ink); border: none;
  border-radius: 10px; font-family: var(--f-mono); font-size: 12px; letter-spacing: 0.08em; cursor: pointer; transition: opacity .15s;
}
.chat-send:disabled { opacity: 0.5; cursor: default; }
```

- [ ] **Step 2: Add HTML section before `</main>` in `inicio.html`**

Find `</main>` and insert just before it:

```html
<!-- ── Chatbot Asistente ── -->
<section class="wrap chat-section" id="chatbot">
  <div class="chat-hdr">
    <span class="eyebrow" data-i18n-es="● Asistente del torneo" data-i18n-en="● Tournament assistant">● Asistente del torneo</span>
    <h2 data-i18n-es="Pregunta lo que <em>quieras</em>" data-i18n-en="Ask us <em>anything</em>">Pregunta lo que <em>quieras</em></h2>
    <p class="body" style="max-width:52ch;color:var(--text-dim);" data-i18n-es="Goles, récords, sedes, jugadores — respuestas en segundos." data-i18n-en="Goals, records, venues, players — answers in seconds.">Goles, récords, sedes, jugadores — respuestas en segundos.</p>
  </div>
  <div class="chat-chips">
    <button class="chip" onclick="chatAsk('¿Cuántos goles le faltan a Mbappé para el récord?')">¿Cuántos goles le faltan a Mbappé para el récord?</button>
    <button class="chip" onclick="chatAsk('¿En qué ciudades se juega el Mundial 2026?')">¿En qué ciudades se juega?</button>
    <button class="chip" onclick="chatAsk('¿Quién ha jugado más Mundiales?')">¿Quién ha jugado más Mundiales?</button>
    <button class="chip" onclick="chatAsk('¿Cuándo y dónde es la final?')">¿Cuándo y dónde es la final?</button>
    <button class="chip" onclick="chatAsk('¿Quién tiene el récord de goles en un solo Mundial?')">Récord en un solo Mundial</button>
  </div>
  <div class="chat-box">
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input-row">
      <input id="chat-input" class="chat-input" type="text" autocomplete="off"
        placeholder="Escribe tu pregunta sobre el Mundial..."
        onkeydown="if(event.key==='Enter') chatSend()" />
      <button class="chat-send" id="chat-send" onclick="chatSend()">PREGUNTAR →</button>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Visual check in browser**

Open `inicio.html` in the browser. Scroll to the bottom. You should see the chat section with 5 chip buttons and the input box. It won't work yet (no JS), but it should look good.

- [ ] **Step 4: Commit**

```bash
git add inicio.html
git commit -m "feat: add chatbot section HTML and CSS to inicio.html"
```

---

## Task 3 — Chatbot JS in `inicio.html`

**Files:**
- Modify: `inicio.html` (add JS before `</body>`)

- [ ] **Step 1: Add JS before `</body>` in `inicio.html`**

Find the last `</script>` block and add a new `<script>` block just before `</body>`:

```html
<script>
// ── Chatbot Asistente ──
const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');

function chatRender() {
  const el = document.getElementById('chat-messages');
  if (!el) return;
  el.innerHTML = chatHistory.map(m => `
    <div class="chat-msg ${m.role === 'user' ? 'user' : 'bot'}">
      <div class="bubble">${m.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');
  el.scrollTop = el.scrollHeight;
}

function chatAsk(q) {
  const input = document.getElementById('chat-input');
  if (input) input.value = q;
  chatSend();
}

async function chatSend() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const msgsEl = document.getElementById('chat-messages');
  if (!input || !sendBtn || !msgsEl) return;
  const q = input.value.trim();
  if (!q) return;

  input.value = '';
  sendBtn.disabled = true;

  chatHistory.push({ role: 'user', content: q });
  chatRender();

  const loader = document.createElement('div');
  loader.className = 'chat-msg bot';
  loader.innerHTML = '<div class="chat-loading"><span></span><span></span><span></span></div>';
  msgsEl.appendChild(loader);
  msgsEl.scrollTop = msgsEl.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory.slice(-6) })
    });
    const data = await res.json();
    chatHistory.push({ role: 'assistant', content: data.reply || data.error || 'Sin respuesta.' });
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory.slice(-20)));
  } catch {
    chatHistory.push({ role: 'assistant', content: 'Error de conexión. Inténtalo de nuevo.' });
  }

  chatRender();
  sendBtn.disabled = false;
}

chatRender();
</script>
```

- [ ] **Step 2: Test in browser with `vercel dev` running**

Open `http://localhost:3000/inicio.html`. Scroll to the chatbot section. Click the chip "¿Cuántos goles le faltan a Mbappé para el récord?".

Expected: loading dots appear, then a response from Gemini citing **4 goles** and el récord de **Klose (16)**.

- [ ] **Step 3: Test follow-up question (context retention)**

After the first answer, type "¿Y cuántos mundiales le quedan?" in the input and press Enter.

Expected: Gemini responds in context (mentions Mbappé's age of 27, that he could play 2030 and 2034).

- [ ] **Step 4: Test error handling**

Temporarily set `GEMINI_API_KEY=invalid` in `.env.local` and restart `vercel dev`. Send a question.

Expected: The UI shows "Error del asistente." message gracefully without crashing.

Restore the correct key afterward.

- [ ] **Step 5: Commit**

```bash
git add inicio.html
git commit -m "feat: add chatbot JS logic with history and Gemini integration"
```

---

## Task 4 — Floating Bubble in `assets/shared.js`

**Files:**
- Modify: `assets/shared.js`

- [ ] **Step 1: Add `injectChatBubble()` function at the end of `assets/shared.js`**

Append the following to the end of `assets/shared.js`:

```javascript
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
```

- [ ] **Step 2: Test on a non-home page with `vercel dev` running**

Open `http://localhost:3000/goleadores.html`. You should see a ⚽ FAB button in the bottom-right corner. Click it — the panel should expand. Ask a question.

Expected: The chatbot panel opens, shows the loading dots, and returns a Gemini response.

- [ ] **Step 3: Verify the bubble does NOT appear on `inicio.html`**

Open `http://localhost:3000/inicio.html`. There should be NO ⚽ FAB button (only the inline section).

- [ ] **Step 4: Commit**

```bash
git add assets/shared.js
git commit -m "feat: add floating chatbot bubble to all non-home pages via shared.js"
```

---

## Task 5 — `api/fixtures.js` — football-data.org Proxy

**Files:**
- Create: `api/fixtures.js`

- [ ] **Step 1: Create `api/fixtures.js`**

```javascript
export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key no configurada' });

  // Cache at CDN edge for 60s — stays well under the 10 req/min free tier limit
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    const r = await fetch('https://api.football-data.org/v4/competitions/WC/matches?limit=20', {
      headers: { 'X-Auth-Token': apiKey, 'Accept': 'application/json' }
    });

    if (r.status === 403) {
      // WC 2026 not yet available on free tier — return empty gracefully
      return res.status(200).json({ matches: [], message: 'fixture_unavailable' });
    }

    if (!r.ok) {
      console.error('football-data error', r.status);
      return res.status(502).json({ error: 'Error al obtener partidos.' });
    }

    const raw = await r.json();

    const matches = (raw.matches || []).map(m => ({
      id: m.id,
      status: m.status,           // SCHEDULED | IN_PLAY | PAUSED | FINISHED
      date: m.utcDate,
      stage: m.stage,
      group: m.group || null,
      homeTeam: {
        name: m.homeTeam?.shortName || m.homeTeam?.name || 'TBD',
        tla: m.homeTeam?.tla || '???',
        crest: m.homeTeam?.crest || null
      },
      awayTeam: {
        name: m.awayTeam?.shortName || m.awayTeam?.name || 'TBD',
        tla: m.awayTeam?.tla || '???',
        crest: m.awayTeam?.crest || null
      },
      score: {
        home: m.score?.fullTime?.home ?? m.score?.regularTime?.home ?? null,
        away: m.score?.fullTime?.away ?? m.score?.regularTime?.away ?? null
      },
      minute: m.minute || null,
      venue: m.venue || null
    }));

    res.status(200).json({ matches, updated: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno.' });
  }
}
```

- [ ] **Step 2: Smoke test**

```bash
curl http://localhost:3000/api/fixtures
```

Expected (before WC 2026 starts):
```json
{"matches":[...],"updated":"2026-05-11T..."}
```
or if the competition isn't available yet on free tier:
```json
{"matches":[],"message":"fixture_unavailable"}
```

- [ ] **Step 3: Commit**

```bash
git add api/fixtures.js
git commit -m "feat: add football-data.org fixtures API function with 60s CDN cache"
```

---

## Task 6 — En Vivo Section in `inicio.html`

**Files:**
- Modify: `inicio.html` (replace static matches card, add CSS + JS)

- [ ] **Step 1: Add En Vivo CSS in the `<style>` block**

Find the `</style>` tag and add before it:

```css
/* ── En Vivo ── */
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.envivo-live-dot { animation: pulse 1.5s ease-in-out infinite; color: var(--accent); }
```

- [ ] **Step 2: Replace the static "Últimos amistosos" bento card**

Find this block in `inicio.html` (around line 558):

```html
<!-- Live matches ticker -->
<div class="b b-half" data-host="us">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
    <span class="eyebrow"
      data-i18n-es="Últimos amistosos" data-i18n-en="Recent friendlies">Últimos amistosos</span>
    <span class="mono" style="color:var(--text-faint);">QUALIFIERS</span>
  </div>
```

Replace the entire `<div class="b b-half" data-host="us">...</div>` block (ends before `<!-- Featured player -->`) with:

```html
<!-- En Vivo module -->
<div class="b b-half" data-host="us" id="envivo-card">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <span class="eyebrow" id="envivo-label"
      data-i18n-es="Próximos partidos" data-i18n-en="Upcoming matches">Próximos partidos</span>
    <span id="envivo-badge" class="mono" style="color:var(--text-faint);">MUNDIAL 2026</span>
  </div>
  <div id="envivo-matches">
    <div class="match" style="opacity:.35;">
      <div class="flag-side">
        <div class="ph" style="width:24px;height:16px;background:var(--surface-3);border-radius:3px;"></div>
        <span class="team" style="width:60px;height:14px;background:var(--surface-3);display:block;border-radius:4px;"></span>
      </div>
      <div><div class="score">– : –</div><div class="date">···</div></div>
      <div class="flag-side away">
        <span class="team" style="width:60px;height:14px;background:var(--surface-3);display:block;border-radius:4px;"></span>
        <div class="ph" style="width:24px;height:16px;background:var(--surface-3);border-radius:3px;"></div>
      </div>
    </div>
  </div>
  <div id="envivo-updated" class="mono" style="margin-top:14px;font-size:9px;color:var(--text-faint);"></div>
</div>
```

- [ ] **Step 3: Add En Vivo JS before `</body>` in `inicio.html`**

Add a new `<script>` block just before `</body>`:

```html
<script>
// ── En Vivo ──
let _enVivoPolling = null;

function _enVivoFmt(utcStr) {
  const d = new Date(utcStr);
  const now = new Date();
  if (Math.abs(d - now) < 90000) return 'AHORA';
  return d.toLocaleDateString('es-MX', {
    day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }).toUpperCase();
}

function _enVivoRender(matches) {
  const el = document.getElementById('envivo-matches');
  const label = document.getElementById('envivo-label');
  const badge = document.getElementById('envivo-badge');
  if (!el) return;

  const live     = matches.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED');
  const upcoming = matches.filter(m => m.status === 'SCHEDULED').slice(0, 3);
  const finished = matches.filter(m => m.status === 'FINISHED').slice(-3);

  if (live.length) {
    badge.innerHTML = '<span class="envivo-live-dot">●</span> EN VIVO';
    label.textContent = 'En curso';
  } else if (upcoming.length) {
    badge.textContent = 'MUNDIAL 2026';
    label.textContent = 'Próximos partidos';
  } else {
    badge.textContent = 'MUNDIAL 2026';
    label.textContent = 'Últimos resultados';
  }

  const toShow = live.length ? live.slice(0,3) : upcoming.length ? upcoming : finished;

  if (!toShow.length) {
    el.innerHTML = '<p style="font-size:13px;color:var(--text-faint);padding:8px 0;">Partidos no disponibles aún.</p>';
    return;
  }

  el.innerHTML = toShow.map(m => {
    const isLive = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    const isDone = m.status === 'FINISHED';
    const scoreBlock = isLive
      ? `<div class="score live">${m.score.home ?? 0}–${m.score.away ?? 0}</div><div class="date">${m.minute ? m.minute+"'" : 'EN VIVO'}</div>`
      : isDone
      ? `<div class="score">${m.score.home ?? '?'}–${m.score.away ?? '?'}</div><div class="date">${_enVivoFmt(m.date)}</div>`
      : `<div class="score" style="font-size:14px;color:var(--text-faint)">VS</div><div class="date">${_enVivoFmt(m.date)}</div>`;

    const flagH = m.homeTeam.crest
      ? `<img src="${m.homeTeam.crest}" style="width:24px;height:16px;object-fit:contain;" alt="">`
      : `<div class="ph flag flag-${m.homeTeam.tla.toLowerCase()} mini-flag"></div>`;
    const flagA = m.awayTeam.crest
      ? `<img src="${m.awayTeam.crest}" style="width:24px;height:16px;object-fit:contain;" alt="">`
      : `<div class="ph flag flag-${m.awayTeam.tla.toLowerCase()} mini-flag"></div>`;

    return `<div class="match">
      <div class="flag-side">${flagH}<span class="team">${m.homeTeam.name}</span></div>
      <div>${scoreBlock}</div>
      <div class="flag-side away"><span class="team">${m.awayTeam.name}</span>${flagA}</div>
    </div>`;
  }).join('');
}

async function _enVivoFetch() {
  try {
    const res = await fetch('/api/fixtures');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.matches) return;
    _enVivoRender(data.matches);
    const upd = document.getElementById('envivo-updated');
    if (upd && data.updated)
      upd.textContent = 'Act. ' + new Date(data.updated).toLocaleTimeString('es-MX');
    const hasLive = data.matches.some(m => m.status === 'IN_PLAY' || m.status === 'PAUSED');
    if (hasLive && !_enVivoPolling)
      _enVivoPolling = setInterval(_enVivoFetch, 60000);
    else if (!hasLive && _enVivoPolling) {
      clearInterval(_enVivoPolling);
      _enVivoPolling = null;
    }
  } catch (e) {
    console.warn('envivo fetch error:', e);
  }
}

_enVivoFetch();
</script>
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:3000/inicio.html`. The bento card that previously showed "Últimos amistosos" should now show either:
- If `FOOTBALL_DATA_API_KEY` is valid: real upcoming fixtures from football-data.org
- If not yet available: "Partidos no disponibles aún." text gracefully

- [ ] **Step 5: Commit**

```bash
git add inicio.html
git commit -m "feat: replace static match ticker with live En Vivo widget in inicio.html"
```

---

## Task 7 — Deploy to Production

- [ ] **Step 1: Add env vars to Vercel dashboard**

```bash
vercel env add GEMINI_API_KEY production
vercel env add FOOTBALL_DATA_API_KEY production
```

Or go to https://vercel.com/dashboard → Project → Settings → Environment Variables.

- [ ] **Step 2: Deploy to production**

```bash
vercel --prod
```

Expected output: `✅ Production deployment ready at https://mundial-mu.vercel.app`

- [ ] **Step 3: Smoke test production chatbot**

```bash
curl -X POST https://mundial-mu.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"¿Cuántos goles le faltan a Mbappé?"}]}'
```

Expected: `{"reply":"A Kylian Mbappé le faltan **4 goles** para..."}` 

- [ ] **Step 4: Smoke test production fixtures**

```bash
curl https://mundial-mu.vercel.app/api/fixtures
```

Expected: `{"matches":[...],"updated":"..."}` or `{"matches":[],"message":"fixture_unavailable"}`

- [ ] **Step 5: Verify floating bubble on goleadores.html**

Open `https://mundial-mu.vercel.app/goleadores.html`. The ⚽ FAB should appear, open on click, and chat should work.

- [ ] **Step 6: Commit final**

```bash
git add -A
git commit -m "feat: deploy chatbot and En Vivo module to production"
```
