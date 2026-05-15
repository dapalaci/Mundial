// Opening-week schedule for WC 2026 — used as fallback when football-data.org
// free tier returns 403 (competition not yet unlocked).
// Groups and matchups match the project's editorial data in selecciones.html.
// tla values match the 2-letter flag CSS codes used throughout the project (selecciones.html)
const STATIC_OPENING_FIXTURES = [
  {
    id: 's1', status: 'SCHEDULED', date: '2026-06-11T23:00:00Z',
    stage: 'GROUP_STAGE', group: 'GROUP_H',
    homeTeam: { name: 'México',          tla: 'mx', crest: null },
    awayTeam: { name: 'Bélgica',         tla: 'be', crest: null },
    score: { home: null, away: null }, minute: null, venue: 'Estadio Azteca'
  },
  {
    id: 's2', status: 'SCHEDULED', date: '2026-06-12T01:00:00Z',
    stage: 'GROUP_STAGE', group: 'GROUP_A',
    homeTeam: { name: 'Argentina',       tla: 'ar', crest: null },
    awayTeam: { name: 'Costa de Marfil', tla: 'ci', crest: null },
    score: { home: null, away: null }, minute: null, venue: 'MetLife Stadium'
  },
  {
    id: 's3', status: 'SCHEDULED', date: '2026-06-12T23:00:00Z',
    stage: 'GROUP_STAGE', group: 'GROUP_G',
    homeTeam: { name: 'Estados Unidos',  tla: 'us', crest: null },
    awayTeam: { name: 'Países Bajos',    tla: 'nl', crest: null },
    score: { home: null, away: null }, minute: null, venue: 'AT&T Stadium'
  },
  {
    id: 's4', status: 'SCHEDULED', date: '2026-06-13T01:00:00Z',
    stage: 'GROUP_STAGE', group: 'GROUP_B',
    homeTeam: { name: 'España',          tla: 'es', crest: null },
    awayTeam: { name: 'Suiza',           tla: 'ch', crest: null },
    score: { home: null, away: null }, minute: null, venue: 'Rose Bowl'
  },
  {
    id: 's5', status: 'SCHEDULED', date: '2026-06-13T23:00:00Z',
    stage: 'GROUP_STAGE', group: 'GROUP_C',
    homeTeam: { name: 'Inglaterra',      tla: 'en', crest: null },
    awayTeam: { name: 'Marruecos',       tla: 'ma', crest: null },
    score: { home: null, away: null }, minute: null, venue: 'SoFi Stadium'
  },
];

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
      // WC 2026 not yet available on free tier — serve static opening-week schedule
      return res.status(200).json({ matches: STATIC_OPENING_FIXTURES, updated: new Date().toISOString() });
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

    const out = matches.length ? matches : STATIC_OPENING_FIXTURES;
    res.status(200).json({ matches: out, updated: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno.' });
  }
}