const { useState, useEffect, useRef } = React;

// ============================================================
// MATCH SCHEDULE DATA (representative sample)
// ============================================================
const MATCH_DAYS = [
  {
    date: '11 Jun 2026', label: 'Día 1 — Inauguración',
    matches: [
      { time: '17:00', local: 'CDMX', home: 'México', away: 'Jamaica', homeFlag: '🇲🇽', awayFlag: '🇯🇲', venue: 'Estadio Azteca', group: 'A', type: 'Inauguración' },
    ]
  },
  {
    date: '12 Jun 2026', label: 'Día 2',
    matches: [
      { time: '12:00', local: 'ET', home: 'Estados Unidos', away: 'Serbia', homeFlag: '🇺🇸', awayFlag: '🇷🇸', venue: 'SoFi Stadium, LA', group: 'A', type: 'Grupos' },
      { time: '15:00', local: 'ET', home: 'Argentina', away: 'Nigeria', homeFlag: '🇦🇷', awayFlag: '🇳🇬', venue: 'Hard Rock Stadium, Miami', group: 'A', type: 'Grupos' },
      { time: '18:00', local: 'ET', home: 'Francia', away: 'Australia', homeFlag: '🇫🇷', awayFlag: '🇦🇺', venue: 'MetLife Stadium, NY', group: 'B', type: 'Grupos' },
      { time: '21:00', local: 'ET', home: 'Brasil', away: 'Túnez', homeFlag: '🇧🇷', awayFlag: '🇹🇳', venue: 'AT&T Stadium, Dallas', group: 'C', type: 'Grupos' },
    ]
  },
  {
    date: '13 Jun 2026', label: 'Día 3',
    matches: [
      { time: '11:00', local: 'ET', home: 'Inglaterra', away: 'Irán', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇮🇷', venue: 'Lincoln Financial, Filadelfia', group: 'B', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Alemania', away: 'Dinamarca', homeFlag: '🇩🇪', awayFlag: '🇩🇰', venue: 'Mercedes-Benz, Atlanta', group: 'B', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'España', away: 'Chile', homeFlag: '🇪🇸', awayFlag: '🇨🇱', venue: 'Lumen Field, Seattle', group: 'C', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Canadá', away: 'Qatar', homeFlag: '🇨🇦', awayFlag: '🇶🇦', venue: 'BMO Field, Toronto', group: 'A', type: 'Grupos' },
    ]
  },
  {
    date: '14 Jun 2026', label: 'Día 4',
    matches: [
      { time: '12:00', local: 'ET', home: 'Italia', away: 'Ecuador', homeFlag: '🇮🇹', awayFlag: '🇪🇨', venue: 'Gillette Stadium, Boston', group: 'D', type: 'Grupos' },
      { time: '15:00', local: 'ET', home: 'Portugal', away: 'Camerún', homeFlag: '🇵🇹', awayFlag: '🇨🇲', venue: 'NRG Stadium, Houston', group: 'C', type: 'Grupos' },
      { time: '17:00', local: 'CST', home: 'Países Bajos', away: 'Ghana', homeFlag: '🇳🇱', awayFlag: '🇬🇭', venue: 'Arrowhead, Kansas City', group: 'B', type: 'Grupos' },
      { time: '21:00', local: 'ET', home: 'Croacia', away: 'Perú', homeFlag: '🇭🇷', awayFlag: '🇵🇪', venue: 'Hard Rock Stadium, Miami', group: 'D', type: 'Grupos' },
    ]
  },
  {
    date: '15 Jun 2026', label: 'Día 5',
    matches: [
      { time: '11:00', local: 'ET', home: 'Bélgica', away: 'Costa Rica', homeFlag: '🇧🇪', awayFlag: '🇨🇷', venue: 'MetLife Stadium, NY', group: 'D', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Marruecos', away: 'Escocia', homeFlag: '🇲🇦', awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: 'SoFi Stadium, LA', group: 'D', type: 'Grupos' },
      { time: '16:00', local: 'CST', home: 'Uruguay', away: 'Egipto', homeFlag: '🇺🇾', awayFlag: '🇪🇬', venue: 'Estadio BBVA, Monterrey', group: 'E', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Colombia', away: 'Suiza', homeFlag: '🇨🇴', awayFlag: '🇨🇭', venue: 'Mercedes-Benz, Atlanta', group: 'E', type: 'Grupos' },
    ]
  },
  {
    date: '16 Jun 2026', label: 'Día 6',
    matches: [
      { time: '11:00', local: 'ET', home: 'Japón', away: 'Arabia Saudita', homeFlag: '🇯🇵', awayFlag: '🇸🇦', venue: "Levi's Stadium, Santa Clara", group: 'C', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Corea del Sur', away: 'Turquía', homeFlag: '🇰🇷', awayFlag: '🇹🇷', venue: 'AT&T Stadium, Dallas', group: 'G', type: 'Grupos' },
      { time: '16:00', local: 'CST', home: 'México', away: 'Senegal', homeFlag: '🇲🇽', awayFlag: '🇸🇳', venue: 'Estadio Akron, Guadalajara', group: 'A', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Noruega', away: 'Polonia', homeFlag: '🇳🇴', awayFlag: '🇵🇱', venue: 'Lincoln Financial, Filadelfia', group: 'K', type: 'Grupos' },
    ]
  },
  {
    date: '28 Jun 2026', label: 'Octavos de Final — Día 1',
    matches: [
      { time: '13:00', local: 'ET', home: '1° Grupo A', away: '2° Grupo B', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, NY', group: '', type: 'Octavos' },
      { time: '17:00', local: 'ET', home: '1° Grupo C', away: '2° Grupo D', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, LA', group: '', type: 'Octavos' },
      { time: '21:00', local: 'ET', home: '1° Grupo B', away: '2° Grupo A', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Octavos' },
    ]
  },
  {
    date: '29 Jun 2026', label: 'Octavos de Final — Día 2',
    matches: [
      { time: '13:00', local: 'ET', home: '1° Grupo D', away: '2° Grupo C', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Octavos' },
      { time: '17:00', local: 'ET', home: '1° Grupo E', away: '2° Grupo F', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Mercedes-Benz, Atlanta', group: '', type: 'Octavos' },
      { time: '21:00', local: 'ET', home: '1° Grupo F', away: '2° Grupo E', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'NRG Stadium, Houston', group: '', type: 'Octavos' },
    ]
  },
  {
    date: '4 Jul 2026', label: 'Cuartos de Final',
    matches: [
      { time: '14:00', local: 'ET', home: 'Ganador OF1', away: 'Ganador OF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, NY', group: '', type: 'Cuartos' },
      { time: '18:00', local: 'ET', home: 'Ganador OF3', away: 'Ganador OF4', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, LA', group: '', type: 'Cuartos' },
    ]
  },
  {
    date: '5 Jul 2026', label: 'Cuartos de Final',
    matches: [
      { time: '14:00', local: 'ET', home: 'Ganador OF5', away: 'Ganador OF6', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Cuartos' },
      { time: '18:00', local: 'ET', home: 'Ganador OF7', away: 'Ganador OF8', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Cuartos' },
    ]
  },
  {
    date: '14 Jul 2026', label: 'Semifinales',
    matches: [
      { time: '17:00', local: 'ET', home: 'Ganador QF1', away: 'Ganador QF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, NY', group: '', type: 'Semifinal' },
    ]
  },
  {
    date: '15 Jul 2026', label: 'Semifinales',
    matches: [
      { time: '17:00', local: 'ET', home: 'Ganador QF3', away: 'Ganador QF4', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, LA', group: '', type: 'Semifinal' },
    ]
  },
  {
    date: '18 Jul 2026', label: 'Tercer Puesto',
    matches: [
      { time: '16:00', local: 'ET', home: 'Perdedor SF1', away: 'Perdedor SF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Tercer puesto' },
    ]
  },
  {
    date: '19 Jul 2026', label: '🏆 Gran Final',
    matches: [
      { time: '16:00', local: 'ET', home: 'Ganador SF1', away: 'Ganador SF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, East Rutherford', group: '', type: 'FINAL' },
    ]
  },
];

const TIMEZONE_OPTIONS = [
  { label: 'ET (Nueva York)', offset: 0 },
  { label: 'CT (Dallas)', offset: -1 },
  { label: 'PT (Los Ángeles)', offset: -3 },
  { label: 'CDMX', offset: -1 },
  { label: 'Madrid (CEST)', offset: 6 },
  { label: 'Londres (BST)', offset: 5 },
  { label: 'Tokio (JST)', offset: 13 },
  { label: 'Buenos Aires (ART)', offset: 1 },
];

function adjustTime(timeStr, offsetHours) {
  const [h, m] = timeStr.split(':').map(Number);
  let newH = h + offsetHours;
  let dayShift = '';
  if (newH >= 24) { newH -= 24; dayShift = ' (+1)'; }
  if (newH < 0) { newH += 24; dayShift = ' (-1)'; }
  return String(newH).padStart(2, '0') + ':' + String(m).padStart(2, '0') + dayShift;
}

function getTypeColor(type) {
  const map = {
    'Inauguración': '#F4A100',
    'Grupos': '#00C4B3',
    'Octavos': '#6C5CE7',
    'Cuartos': '#E8344E',
    'Semifinal': '#FF6B6B',
    'Tercer puesto': '#A8A8A8',
    'FINAL': '#FFD700',
  };
  return map[type] || '#00C4B3';
}

// ============================================================
// CALENDAR PAGE
// ============================================================
function WCCalendarPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const [tz, setTz] = useState(0);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const types = ['Grupos', 'Octavos', 'Cuartos', 'Semifinal', 'FINAL'];
  const filteredDays = filterType
    ? MATCH_DAYS.map(d => ({ ...d, matches: d.matches.filter(m => m.type === filterType) })).filter(d => d.matches.length > 0)
    : MATCH_DAYS;

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(260px, 38vh, 380px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=1200&h=500&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(5,10,30,0.88), rgba(0,100,90,0.5))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>11 junio — 19 julio 2026</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 68px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Calendario de Partidos</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>104 partidos · 16 ciudades · 3 países</p>
        </div>
      </section>

      {/* Controls */}
      <section style={{ background: dark ? '#111118' : '#fff', padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 4vw, 48px)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, position: 'sticky', top: 64, zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Timezone selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fgM} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <select value={tz} onChange={e => setTz(Number(e.target.value))}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500, padding: '6px 12px', borderRadius: tweaks.roundedCards ? 8 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`, background: dark ? 'rgba(255,255,255,0.05)' : '#fff', color: fg, outline: 'none', cursor: 'pointer' }}>
              {TIMEZONE_OPTIONS.map((t, i) => (
                <option key={i} value={t.offset}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Phase filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setFilterType(null)} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, padding: '5px 14px', border: 'none', cursor: 'pointer', borderRadius: tweaks.roundedCards ? 999 : 4, background: filterType === null ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'), color: filterType === null ? (dark ? '#111' : '#fff') : fgM, letterSpacing: 0.5, transition: 'all 0.2s' }}>Todos</button>
            {types.map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, padding: '5px 14px', border: 'none', cursor: 'pointer', borderRadius: tweaks.roundedCards ? 999 : 4, background: filterType === t ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'), color: filterType === t ? (dark ? '#111' : '#fff') : fgM, letterSpacing: 0.5, transition: 'all 0.2s' }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: 'clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px)', maxWidth: 800, margin: '0 auto' }}>
        {filteredDays.map((day, di) => (
          <div key={di} style={{ marginBottom: 36 }}>
            {/* Day header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 2vw, 20px)', color: fg, textTransform: 'uppercase', letterSpacing: 0.5 }}>{day.label}</div>
              <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}></div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgM }}>{day.date}</div>
            </div>

            {/* Matches */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {day.matches.map((match, mi) => (
                <MatchRow key={mi} match={match} tweaks={tweaks} tzOffset={tz} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>← Volver al inicio</button>
      </section>
    </div>
  );
}

function MatchRow({ match, tweaks, tzOffset }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 10 : 0;
  const typeColor = getTypeColor(match.type);
  const adjustedTime = adjustTime(match.time, tzOffset);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 16px)',
      padding: 'clamp(12px, 1.5vw, 16px)',
      borderRadius: r,
      background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
      transform: hover ? 'translateX(4px)' : 'translateX(0)',
      transition: 'all 0.25s ease',
      cursor: 'default',
    }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

      {/* Time */}
      <div style={{ flexShrink: 0, minWidth: 60, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#111', lineHeight: 1 }}>{adjustedTime}</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 9, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>{TIMEZONE_OPTIONS.find(t => t.offset === tzOffset)?.label.split(' ')[0] || 'ET'}</div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 36, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', flexShrink: 0 }}></div>

      {/* Match info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{match.homeFlag}</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.2 }}>{match.home}</span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 400, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>vs</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.2 }}>{match.away}</span>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{match.awayFlag}</span>
        </div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{match.venue}</div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
        {match.group && (
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: tweaks.roundedCards ? 999 : 2, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', letterSpacing: 1 }}>Gr. {match.group}</span>
        )}
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: tweaks.roundedCards ? 999 : 2, background: typeColor + '22', color: typeColor, letterSpacing: 0.5, textTransform: 'uppercase' }}>{match.type}</span>
      </div>
    </div>
  );
}

Object.assign(window, { WCCalendarPage });