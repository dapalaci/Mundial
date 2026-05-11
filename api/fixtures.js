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