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
