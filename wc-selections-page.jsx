const { useState, useEffect } = React;

// Wikipedia article titles for each national team (men's senior)
const WIKI_TITLES = {
  mexico:        'Mexico_national_football_team',
  southafrica:   'South_Africa_national_football_team',
  southkorea:    'South_Korea_national_football_team',
  czechrepublic: 'Czech_Republic_national_football_team',
  canada:        "Canada_men's_national_soccer_team",
  bosnia:        'Bosnia_and_Herzegovina_national_football_team',
  qatar:         'Qatar_national_football_team',
  switzerland:   'Switzerland_national_football_team',
  brazil:        'Brazil_national_football_team',
  morocco:       'Morocco_national_football_team',
  haiti:         'Haiti_national_football_team',
  scotland:      'Scotland_national_football_team',
  usa:           "United_States_men's_national_soccer_team",
  paraguay:      'Paraguay_national_football_team',
  australia:     'Australia_national_football_team',
  turkey:        'Turkey_national_football_team',
  germany:       'Germany_national_football_team',
  curacao:       'Curaçao_national_football_team',
  cotedivoire:   'Ivory_Coast_national_football_team',
  ecuador:       'Ecuador_national_football_team',
  netherlands:   'Netherlands_national_football_team',
  japan:         'Japan_national_football_team',
  sweden:        'Sweden_national_football_team',
  tunisia:       'Tunisia_national_football_team',
  belgium:       'Belgium_national_football_team',
  egypt:         'Egypt_national_football_team',
  iran:          'Iran_national_football_team',
  newzealand:    'New_Zealand_national_football_team',
  spain:         'Spain_national_football_team',
  capeverde:     'Cape_Verde_national_football_team',
  saudiarabia:   'Saudi_Arabia_national_football_team',
  uruguay:       'Uruguay_national_football_team',
  france:        'France_national_football_team',
  senegal:       'Senegal_national_football_team',
  iraq:          'Iraq_national_football_team',
  norway:        'Norway_national_football_team',
  argentina:     'Argentina_national_football_team',
  algeria:       'Algeria_national_football_team',
  austria:       'Austria_national_football_team',
  jordan:        'Jordan_national_football_team',
  portugal:      'Portugal_national_football_team',
  rdcongo:       'DR_Congo_national_football_team',
  uzbekistan:    'Uzbekistan_national_football_team',
  colombia:      'Colombia_national_football_team',
  england:       'England_national_football_team',
  croatia:       'Croatia_national_football_team',
  ghana:         'Ghana_national_football_team',
  panama:        'Panama_national_football_team',
};

// ============================================================
// TEAM GEOGRAPHIC POSITIONS (lat, lng)
// ============================================================
const TEAM_GEO = {
  mexico:        [ 23.6, -102.5],
  southafrica:   [-29.0,   25.0],
  southkorea:    [ 36.5,  128.0],
  czechrepublic: [ 49.8,   15.5],
  canada:        [ 56.1,  -96.3],
  bosnia:        [ 44.0,   17.7],
  qatar:         [ 25.3,   51.2],
  switzerland:   [ 46.8,    8.2],
  brazil:        [-14.2,  -51.9],
  morocco:       [ 31.8,   -7.1],
  haiti:         [ 19.0,  -72.3],
  scotland:      [ 56.8,   -3.5],
  usa:           [ 38.0,  -97.0],
  paraguay:      [-23.4,  -58.4],
  australia:     [-25.3,  133.8],
  turkey:        [ 39.0,   35.2],
  germany:       [ 51.2,   10.5],
  curacao:       [ 12.2,  -68.9],
  cotedivoire:   [  7.5,   -5.5],
  ecuador:       [ -1.8,  -78.2],
  netherlands:   [ 52.1,    5.3],
  japan:         [ 36.2,  138.3],
  sweden:        [ 60.1,   18.6],
  tunisia:       [ 33.9,    9.5],
  belgium:       [ 50.5,    4.5],
  egypt:         [ 26.8,   30.8],
  iran:          [ 32.4,   53.7],
  newzealand:    [-40.9,  174.9],
  spain:         [ 40.5,   -3.7],
  capeverde:     [ 15.1,  -23.6],
  saudiarabia:   [ 23.9,   45.1],
  uruguay:       [-32.5,  -55.8],
  france:        [ 46.2,    2.2],
  senegal:       [ 14.5,  -14.5],
  iraq:          [ 33.2,   43.7],
  norway:        [ 60.5,    8.5],
  argentina:     [-38.4,  -63.6],
  algeria:       [ 28.0,    1.7],
  austria:       [ 47.5,   14.6],
  jordan:        [ 30.6,   36.2],
  portugal:      [ 39.4,   -8.2],
  rdcongo:       [ -4.0,   21.8],
  uzbekistan:    [ 41.4,   64.6],
  colombia:      [  4.6,  -74.3],
  england:       [ 52.4,   -1.2],
  croatia:       [ 45.1,   15.2],
  ghana:         [  8.0,   -1.0],
  panama:        [  8.5,  -80.8],
};

// ============================================================
// SELECTION CARD
// ============================================================
function SelectionCard({ team, tweaks, shieldSrc, onClick }) {
  const [hover, setHover] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 16 : 4;
  const accent = tweaks.accentColor || '#00C4B3';

  return (
    <div
      onClick={() => onClick && onClick(team)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        background: dark
          ? 'linear-gradient(145deg, #12122a, #1a1a2e)'
          : 'linear-gradient(145deg, #f0f0f8, #e4e4f0)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
        transform: hover ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hover
          ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${accent}44`
          : '0 2px 12px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px 16px',
        gap: 10,
        userSelect: 'none',
      }}
    >
      {/* Group badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
        textTransform: 'uppercase', color: accent,
        background: `${accent}18`, borderRadius: 4,
        padding: '2px 7px',
      }}>
        GR. {team.group}
      </div>

      {/* Shield image */}
      <div style={{
        width: 72, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {shieldSrc && !imgFailed ? (
          <img
            src={shieldSrc}
            alt={team.name}
            onError={() => setImgFailed(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              filter: hover ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' : 'none',
              transition: 'filter 0.3s ease',
            }}
          />
        ) : (
          <div style={{ fontSize: 52, lineHeight: 1 }}>{team.flag || '⚽'}</div>
        )}
      </div>

      {/* Team name */}
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: 13,
        textTransform: 'uppercase', letterSpacing: 0.5,
        color: dark ? '#fff' : '#111',
        textAlign: 'center', lineHeight: 1.2,
      }}>
        {team.name}
      </div>

      {/* Ranking */}
      {team.ranking && (
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 11, fontWeight: 500,
          color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        }}>
          FIFA #{team.ranking}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SELECTIONS PAGE
// ============================================================
function WCSelectionsPage({ tweaks, onBack, onTeamClick }) {
  const [activeGroup, setActiveGroup] = useState('all');
  const [shields, setShields] = useState({});
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
  const accent = tweaks.accentColor || '#00C4B3';

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  // Batch-fetch all shields from Wikipedia pageimages API (one request, up to 50 titles)
  useEffect(() => {
    const ids = ALL_TEAMS.map(t => t.id).filter(id => WIKI_TITLES[id]);
    const titlesParam = ids.map(id => encodeURIComponent(WIKI_TITLES[id])).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${titlesParam}&format=json&pithumbsize=200&origin=*`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const pages = data.query?.pages || {};
        // Build a map: normalized title → thumbnail src
        const titleToSrc = {};
        Object.values(pages).forEach(p => {
          if (p.thumbnail?.source) titleToSrc[p.title.replace(/ /g, '_')] = p.thumbnail.source;
        });
        // Map back to team ids
        const result = {};
        ids.forEach(id => {
          const title = WIKI_TITLES[id].replace(/%27/g, "'");
          const normalized = title.replace(/ /g, '_');
          // Try direct match and also check redirects via page title
          const src = titleToSrc[normalized] ||
            Object.entries(titleToSrc).find(([k]) => k.toLowerCase() === normalized.toLowerCase())?.[1];
          if (src) result[id] = src;
        });
        setShields(result);
      })
      .catch(() => {});
  }, []);

  const groups = ['all', ...Array.from(new Set(ALL_TEAMS.map(t => t.group))).sort()];
  const filtered = activeGroup === 'all'
    ? ALL_TEAMS
    : ALL_TEAMS.filter(t => t.group === activeGroup);

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO — MAPA MUNDIAL SVG ===== */}
      <section style={{ position: 'relative', height: 'clamp(240px, 42vh, 460px)', overflow: 'hidden', background: '#070d1a' }}>

        {/* SVG World Map */}
        <svg viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          aria-hidden="true">
          <defs>
            <radialGradient id="wmOcean" cx="50%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#0d2045"/>
              <stop offset="100%" stopColor="#070d1a"/>
            </radialGradient>
            <style>{`@keyframes wmPulse{0%,100%{r:8;opacity:.55}50%{r:20;opacity:0}} .wm-ring{animation:wmPulse 2.8s ease-out infinite}`}</style>
          </defs>

          <rect width="1000" height="480" fill="url(#wmOcean)"/>

          {/* Graticule */}
          {[-60,-30,0,30,60].map(lat => <line key={`lt${lat}`} x1="0" y1={(90-lat)/180*480} x2="1000" y2={(90-lat)/180*480} stroke="rgba(100,160,255,0.07)" strokeWidth="0.7"/>)}
          {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lng => <line key={`lg${lng}`} x1={(lng+180)/360*1000} y1="0" x2={(lng+180)/360*1000} y2="480" stroke="rgba(100,160,255,0.07)" strokeWidth="0.7"/>)}
          <line x1="0" y1="240" x2="1000" y2="240" stroke="rgba(100,160,255,0.14)" strokeWidth="1"/>

          {/* Continents — simplified Mercator polygons */}
          {[
            "M244,192 L286,221 L278,173 L306,128 L328,123 L353,115 L319,93 L244,67 L222,48 L69,51 L33,96 L139,96 L167,147 L208,187 Z",
            "M286,227 L328,213 L403,253 L381,301 L353,328 L311,387 L297,352 L278,280 L283,240 Z",
            "M475,150 L490,105 L540,52 L585,52 L610,70 L600,118 L575,132 L540,150 L510,155 Z",
            "M483,144 L589,157 L642,213 L611,261 L597,293 L586,317 L550,331 L544,317 L533,283 L494,227 L453,200 L464,165 Z",
            "M572,139 L639,128 L658,181 L717,219 L789,237 L869,160 L886,107 L944,93 L1000,80 L1000,0 L778,48 L667,61 L603,115 Z",
            "M817,296 L861,269 L897,267 L906,341 L819,331 Z",
          ].map((d, i) => (
            <path key={i} d={d} fill="rgba(30,70,130,0.4)" stroke="rgba(80,140,255,0.22)" strokeWidth="0.9" strokeLinejoin="round"/>
          ))}

          {/* 48 team markers — balón trionda style */}
          {ALL_TEAMS.map((team, idx) => {
            const geo = TEAM_GEO[team.id];
            if (!geo) return null;
            const [lat, lng] = geo;
            const cx = (lng + 180) / 360 * 1000;
            const cy = (90 - lat) / 180 * 480;
            const m = team.gradient.match(/#[0-9A-Fa-f]{6}/);
            const color = m ? m[0] : accent;
            const delay = `${(idx % 10) * 0.28}s`;
            return (
              <g key={team.id}>
                <circle className="wm-ring" cx={cx} cy={cy} r="8" fill="none" stroke={color} strokeWidth="1.8" style={{ animationDelay: delay }}/>
                <circle cx={cx} cy={cy} r="4.5" fill={color} stroke="rgba(255,255,255,0.85)" strokeWidth="0.9"/>
                <circle cx={cx} cy={cy} r="1.8" fill="rgba(0,0,0,0.45)"/>
              </g>
            );
          })}
        </svg>

        {/* Readability gradients */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,13,26,0.9) 0%, rgba(7,13,26,0.55) 40%, rgba(7,13,26,0.1) 100%)' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,13,26,0.95) 0%, transparent 55%)' }}/>

        {/* Back button */}
        <button onClick={onBack} className="wc-back-btn" style={{
          position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px',
          color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
          backdropFilter: 'blur(8px)', transition: 'all 0.25s ease',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Volver
        </button>

        {/* Title */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:5, padding:'0 clamp(20px, 4vw, 48px) clamp(20px, 3vw, 32px)' }}>
          <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:4, color:'rgba(255,255,255,0.4)', marginBottom:8 }}>
            FIFA World Cup 2026 · 48 Naciones · 6 Confederaciones
          </div>
          <h1 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:900, fontSize:'clamp(40px, 8vw, 72px)', color:'#fff', margin:0, textTransform:'uppercase', lineHeight:0.92, letterSpacing:-1 }}>
            Selecciones
          </h1>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: dark ? 'rgba(10,10,18,0.92)' : 'rgba(250,250,250,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        padding: '10px clamp(20px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
      }}>
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer',
              padding: '6px 14px', border: 'none',
              borderRadius: tweaks.roundedCards ? 999 : 4,
              background: activeGroup === g ? accent : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
              color: activeGroup === g ? '#fff' : fgMuted,
              transition: 'all 0.2s ease',
            }}
          >
            {g === 'all' ? 'Todas' : `Gr. ${g}`}
          </button>
        ))}
      </section>

      {/* ===== COUNT ===== */}
      <div style={{ padding: 'clamp(14px, 1.5vw, 20px) clamp(20px, 4vw, 48px) 0' }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2 }}>
          {filtered.length} selecciones
        </span>
      </div>

      {/* ===== GRID ===== */}
      <section style={{ padding: 'clamp(14px, 1.5vw, 20px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 14vw, 180px), 1fr))',
          gap: 'clamp(10px, 1.2vw, 14px)',
        }}>
          {filtered.map(team => (
            <SelectionCard
              key={team.id}
              team={team}
              tweaks={tweaks}
              shieldSrc={shields[team.id] || null}
              onClick={onTeamClick}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

Object.assign(window, { WCSelectionsPage });
