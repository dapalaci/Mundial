# Mundial 26 — Diseño de Nuevas Funcionalidades

**Fecha:** 2026-05-11  
**Estado:** Aprobado

---

## Resumen

Tres funcionalidades nuevas para el sitio estático Mundial 26 (Vercel):

1. **Chatbot Asistente** — responde preguntas sobre el Mundial usando Gemini 2.0 Flash
2. **Módulo "En Vivo"** — resultados y fixture del Mundial 2026 vía football-data.org
3. **Comparativa Mbappé** — visualización interactiva de pestañas en su ficha de jugador

---

## Arquitectura General

El sitio es estático (HTML + JS vanilla) desplegado en Vercel. Las features 1 y 2 requieren Vercel Serverless Functions para mantener las API keys fuera del cliente.

```
Browser ──fetch──▶ /api/chat.js     ──▶ Gemini 2.0 Flash API  (gratis, ai.google.dev)
Browser ──fetch──▶ /api/fixtures.js ──▶ football-data.org API (gratis, 10 req/min)
jugadores.html ──usa──▶ datos inline de goleadores.html (sin API)
```

**Variables de entorno (Vercel Dashboard + `.env.local` en desarrollo):**
- `GEMINI_API_KEY`
- `FOOTBALL_DATA_API_KEY`

---

## Feature 1 — Chatbot Asistente

### Objetivo
Permitir que el usuario haga preguntas en lenguaje natural sobre el Mundial 2026 y obtenga respuestas precisas basadas en los datos del sitio.

**Ejemplos de preguntas soportadas:**
- ¿Cuántos goles le faltan a Mbappé para ser el máximo goleador histórico?
- ¿En qué ciudades de México, Canadá o Estados Unidos se jugará?
- ¿Qué jugadores han jugado más Mundiales?
- ¿Quién tiene el récord de goles en un solo Mundial?
- ¿Cuándo es la final y dónde se juega?

### Componentes

**`api/chat.js` — Vercel Serverless Function**
- Recibe `{ messages: [{role, content}] }` del cliente
- Construye un system prompt con todos los datos del Mundial:
  - Array completo de goleadores históricos (20 jugadores con stats por edición)
  - Ciudades sede y estadios (16 sedes: 11 USA, 3 México, 2 Canadá)
  - Selecciones clasificadas y grupos
  - Fechas clave, formato del torneo (104 partidos, 48 selecciones)
  - Récords históricos y datos de jugadores insignia
- Llama a Gemini 2.0 Flash con historial (últimos 6 mensajes)
- Responde en el idioma que detecta en la pregunta del usuario (ES/EN)
- Rate limiting implícito del tier gratuito de Gemini: 15 RPM, 1M tokens/día

**`inicio.html` — Sección chatbot**
- Nueva sección visible en la home, visualmente integrada con el diseño existente
- Chips de preguntas sugeridas clickeables (4-6 preguntas predefinidas)
- Área de chat con historial de mensajes
- Input + botón de envío
- Estado de carga (spinner) mientras espera respuesta de Gemini

**`assets/shared.js` — Burbuja flotante**
- Botón FAB ⚽ en esquina inferior-derecha, presente en todas las páginas excepto `inicio.html`
- Al hacer clic expande un panel de chat compacto (max 400px ancho)
- Reutiliza la misma llamada a `/api/chat.js`
- Estado persiste durante la sesión (no se pierde el historial al navegar si usa sessionStorage)

### Flujo de datos
```
Usuario escribe pregunta
  → JS acumula historial de mensajes
  → fetch POST /api/chat.js { messages }
  → Vercel Function añade system prompt con datos del Mundial
  → Gemini Flash genera respuesta
  → Vercel Function devuelve { reply: string }
  → JS renderiza respuesta en el chat
```

---

## Feature 2 — Módulo "En Vivo"

### Objetivo
Mostrar el calendario de partidos del Mundial 2026, con resultados en tiempo real durante el torneo (11 Jun – 19 Jul 2026).

### Componentes

**`api/fixtures.js` — Vercel Serverless Function**
- Llama a `football-data.org` endpoint de competición FIFA World Cup 2026
- Filtros: próximos partidos del día + últimos resultados
- Cache de respuesta: 60 segundos (header `Cache-Control: s-maxage=60`) para no exceder el límite gratuito de 10 req/min
- Devuelve datos normalizados: `{ matches: [{ homeTeam, awayTeam, score, status, date, venue }] }`

**`inicio.html` — Sección "En Vivo / Próximos"**
- Reemplaza el tag estático `EN VIVO · 11 JUN 2026` actual
- El cliente hace fetch a `/api/fixtures` al cargar la página
- Comportamiento según estado del torneo:

| Estado | Visualización |
|--------|---------------|
| Antes del 11 Jun 2026 | Próximos partidos del calendario + countdown por partido |
| Durante un partido (`status: IN_PLAY`) | Marcador en tiempo real · indicador `● EN VIVO` animado · polling cada 60s |
| Entre partidos | Últimos resultados + próximos del día |
| Post-torneo | Resultados finales del torneo |

- Filtro visual por país anfitrión: 🇲🇽 México · 🇺🇸 USA · 🇨🇦 Canadá
- Polling activo solo cuando hay partidos `IN_PLAY` (para no desperdiciar llamadas)

---

## Feature 3 — Comparativa Mbappé (pestañas)

### Objetivo
Expandir la ficha de Kylian Mbappé en `jugadores.html` con dos visualizaciones comparativas usando los datos que ya existen en `goleadores.html`.

**Contexto:** Mbappé tiene 12 goles en 2 Mundiales (2018: 4, 2022: 8). Le faltan 4 para igualar el récord de Klose (16). Tiene 27 años en 2026 y potencialmente 1-2 Mundiales más por delante.

### Componentes

**`jugadores.html` — Expansión del lightbox de Mbappé**

Se añade un bloque de comparativa debajo de la info biográfica existente, con dos pestañas:

**Pestaña 1 — "Carrera al récord"**
- Barras horizontales CSS mostrando los top-10 goleadores históricos
- Mbappé destacado en color acento (violeta)
- Tramo punteado de su barra desde 12 hasta 16 (el récord de Klose)
- Etiqueta: "Le faltan N goles · tiene hasta 3 Mundiales disponibles"
- Datos: array `PLAYERS` de `goleadores.html` embebido inline en `jugadores.html`

**Pestaña 2 — "Por edad vs. leyendas"**
- Barras verticales comparando goles acumulados a los 27 años
- Jugadores: Mbappé, Pelé, Messi, Klose, Ronaldo, Maradona (datos ya disponibles)
- Barra de Mbappé con tramo proyectado para 2026 (punteado)
- Nota: "Si marca ≥4 en 2026 → nuevo récord absoluto"

**Implementación:**
- CSS puro + JS vanilla (sin Chart.js ni librerías externas, coherente con el sitio)
- Las barras son `div` con `width` calculado porcentualmente en JS
- Animación de entrada con CSS `transition` al abrir la pestaña

---

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `api/chat.js` | **NUEVO** — Vercel Function para Gemini |
| `api/fixtures.js` | **NUEVO** — Vercel Function para football-data.org |
| `inicio.html` | **MODIFICADO** — sección chatbot + sección En Vivo |
| `jugadores.html` | **MODIFICADO** — comparativa Mbappé con pestañas |
| `assets/shared.js` | **MODIFICADO** — burbuja flotante del chatbot |
| `vercel.json` | **NUEVO/MODIFICADO** — confirmar que `/api/*` se trata como functions |
| `.env.local` | **NUEVO** (no commitear) — keys para desarrollo local |
| `.gitignore` | **MODIFICADO** — añadir `.env.local` |

---

## Consideraciones de Seguridad

- Las API keys nunca se exponen al cliente — solo viven en Vercel Environment Variables y en `.env.local` (no commiteado)
- La Vercel Function actúa como proxy: el cliente nunca llama directamente a Gemini ni a football-data.org
- El `.gitignore` incluye `.env*` para evitar commits accidentales de secrets

## Limitaciones conocidas

- Gemini free tier: 15 RPM. Para un sitio de tráfico bajo es más que suficiente; si hay picos se pueden ver errores 429 que el cliente debe manejar con un mensaje amigable
- football-data.org free tier: 10 req/min. Con caché de 60s en la Vercel Function el límite efectivo es 1 req/min desde el servidor, dentro del tier gratuito
- WebLLM descartado: requiere GPU en el dispositivo del usuario, inviable para sitio público
