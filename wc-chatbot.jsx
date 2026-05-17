const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// API LAYER
// ============================================================
const FD_BASE = 'https://api.football-data.org/v4';
const CORS_PROXY = 'https://corsproxy.io/?url=';

async function fdFetch(path, apiKey) {
  const url = CORS_PROXY + encodeURIComponent(`${FD_BASE}${path}`);
  const res = await fetch(url, { headers: { 'X-Auth-Token': apiKey } });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function fdValidate(apiKey) {
  const url = CORS_PROXY + encodeURIComponent(`${FD_BASE}/competitions/WC`);
  const res = await fetch(url, { headers: { 'X-Auth-Token': apiKey } });
  return res;
}

// ============================================================
// INTENT & ENTITY DETECTION
// ============================================================
const INTENT_MAP = [
  { id: 'scorers',  kw: ['goleador', 'máximo gol', 'scorer', 'quien mete', 'más goles', 'bota de oro'] },
  { id: 'standings', kw: ['tabla', 'clasificación', 'posicion', 'standing', 'puntos', 'lider', 'primero', 'grupo', 'grupos', 'group'] },
  { id: 'upcoming', kw: ['próximo', 'cuando juega', 'fixture', 'calendario', 'horario', 'siguiente partido'] },
  { id: 'results',  kw: ['resultado', 'ganó', 'perdió', 'marcador', 'terminó', 'jugó', 'ayer', 'ganaron'] },
  { id: 'live',     kw: ['en vivo', 'live', 'jugando ahora', 'directo', 'ahorita'] },
  { id: 'teams',    kw: ['equipo', 'selección', 'participan', 'cuantos paises', 'quienes van', 'lista de'] },
  { id: 'help',     kw: ['ayuda', 'help', 'que sabes', 'que puedes', 'opciones', 'comandos'] },
];

const TEAM_ALIASES = {
  argentina: 'Argentina', brasil: 'Brasil', brazil: 'Brasil',
  españa: 'España', spain: 'España', espana: 'España',
  francia: 'Francia', france: 'Francia',
  alemania: 'Alemania', germany: 'Alemania',
  inglaterra: 'Inglaterra', england: 'Inglaterra',
  portugal: 'Portugal', mexico: 'México', méxico: 'México',
  colombia: 'Colombia', uruguay: 'Uruguay',
  noruega: 'Noruega', norway: 'Noruega',
  italia: 'Italia', italy: 'Italia',
  holanda: 'Países Bajos', netherlands: 'Países Bajos', paises: 'Países Bajos',
  belgica: 'Bélgica', belgium: 'Bélgica', bélgica: 'Bélgica',
  croacia: 'Croacia', croatia: 'Croacia',
  marruecos: 'Marruecos', morocco: 'Marruecos',
  senegal: 'Senegal', japon: 'Japón', japan: 'Japón', japón: 'Japón',
  eeuu: 'Estados Unidos', usa: 'Estados Unidos', 'estados unidos': 'Estados Unidos',
  canada: 'Canadá', canadá: 'Canadá',
};

const PLAYER_ALIASES = {
  messi: { n:'Lionel Messi', t:'Argentina', num:10, pos:'Delantero', bio:'8 Balones de Oro · Campeón del Mundo 2022 · 838 goles en carrera · Inter Miami CF. El más grande de la historia para muchos.' },
  'mbappé': { n:'Kylian Mbappé', t:'Francia', num:9, pos:'Delantero', bio:'Campeón del Mundo 2018 · Hat-trick en la final 2022 · Real Madrid · 38 km/h velocidad máxima. La gran estrella de Francia.' },
  mbappe: { n:'Kylian Mbappé', t:'Francia', num:9, pos:'Delantero', bio:'Campeón del Mundo 2018 · Hat-trick en la final de Catar 2022 · Real Madrid CF · Donó su salario del Mundial a una ONG.' },
  'vinícius': { n:'Vinícius Jr.', t:'Brasil', num:7, pos:'Extremo', bio:'The Best FIFA 2024 · 2 Champions League · Real Madrid · Fichado a los 16 años por €45M desde las favelas de São Gonçalo.' },
  vinicius: { n:'Vinícius Jr.', t:'Brasil', num:7, pos:'Extremo', bio:'The Best FIFA 2024 · El mejor jugador del mundo en 2024 · Real Madrid · Activista contra el racismo.' },
  bellingham: { n:'Jude Bellingham', t:'Inglaterra', num:5, pos:'Mediocampista', bio:'Real Madrid · 21 años · Jugador más caro de la historia del Real Madrid en su momento · Nacido en Stourbridge.' },
  haaland: { n:'Erling Haaland', t:'Noruega', num:9, pos:'Delantero', bio:'52 goles en su primera Premier League (récord) · Champions League 2023 · Manchester City · Hijo de Alf-Inge Haaland.' },
  pedri: { n:'Pedri', t:'España', num:8, pos:'Mediocampista', bio:'Golden Boy 2021 · Eurocopa 2024 · FC Barcelona · Comprado por €5M · El sucesor de Iniesta según Xavi.' },
  yamal: { n:'Lamine Yamal', t:'España', num:19, pos:'Extremo', bio:'Golden Boy 2024 · Eurocopa 2024 · Cumplió 17 el día de la final de la Euro · Jugador más joven en debutar con España.' },
  lamine: { n:'Lamine Yamal', t:'España', num:19, pos:'Extremo', bio:'Lamine Yamal Nasraoui Ebana · FC Barcelona · Considerado el nuevo crack de la generación dorada española.' },
  kane: { n:'Harry Kane', t:'Inglaterra', num:9, pos:'Delantero', bio:'Máximo goleador histórico de Inglaterra · Bayern Munich · 2 Botas de Oro Premier · Finalista del Euro 2021.' },
  lewandowski: { n:'Robert Lewandowski', t:'Polonia', num:9, pos:'Delantero', bio:'FC Barcelona · 5 Botas de Oro · 91 goles en un año en Bundesliga · 2 veces The Best FIFA · Leyenda polaca.' },
  salah: { n:'Mohamed Salah', t:'Egipto', num:11, pos:'Extremo', bio:'Liverpool · 3 Botas de Oro Premier · Champions League 2019 · Ícono del fútbol africano y árabe.' },
  'de bruyne': { n:'Kevin De Bruyne', t:'Bélgica', num:17, pos:'Mediocampista', bio:'Manchester City · Mejor MC de la Premier · 6 Premier Leagues · Champions 2023 · El cerebro de la generación dorada belga.' },
  modric: { n:'Luka Modrić', t:'Croacia', num:10, pos:'Mediocampista', bio:'Balón de Oro 2018 · 6 Champions con Real Madrid · Capitán de Croacia · Finalista Mundial 2018.' },
  'modrić': { n:'Luka Modrić', t:'Croacia', num:10, pos:'Mediocampista', bio:'Balón de Oro 2018 · La leyenda viviente de Croacia · Real Madrid · Finalista del Mundial 2018.' },
  ronaldo: { n:'Cristiano Ronaldo', t:'Portugal', num:7, pos:'Delantero', bio:'5 Balones de Oro · Al Nassr · Máximo goleador de la historia del fútbol · 5 Champions League · Ídolo de Madeira.' },
  valverde: { n:'Federico Valverde', t:'Uruguay', num:8, pos:'Mediocampista', bio:'Real Madrid · La figura emergente de Uruguay · Conocido como "El Pajarito" · Champions League 2022.' },
  'luis díaz': { n:'Luis Díaz', t:'Colombia', num:7, pos:'Extremo', bio:'Liverpool FC · Nacido en Barrancas, La Guajira · Ex FC Porto · Su padre fue secuestrado y liberado en 2023 · Ídolo de la afición colombiana.' },
  'luis diaz': { n:'Luis Díaz', t:'Colombia', num:7, pos:'Extremo', bio:'Liverpool FC · Velocidad devastadora por la banda izquierda · Copa América 2021 subcampeón · El mejor colombiano de su generación.' },
  lucho: { n:'Luis Díaz', t:'Colombia', num:7, pos:'Extremo', bio:'Liverpool FC · Apodado "Lucho" · Ídolo de Colombia · Fichado por €45M desde FC Porto en enero 2022.' },
  wirtz: { n:'Florian Wirtz', t:'Alemania', num:10, pos:'Extremo', bio:'Bayer Leverkusen / Bayern · El gran talento alemán de su generación · Comparado con Müller y Özil.' },
  musiala: { n:'Jamal Musiala', t:'Alemania', num:10, pos:'Mediocampista', bio:'Bayern Munich · Nacido en Stuttgart, criado en Inglaterra · Elegido figura de la Eurocopa 2024 para Alemania.' },
};

function detectIntent(text) {
  const l = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Player
  const playerKey = Object.keys(PLAYER_ALIASES).find(k =>
    l.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, ''))
  );
  if (playerKey) return { id: 'player', key: playerKey };

  // Team
  const teamKey = Object.keys(TEAM_ALIASES).find(k =>
    l.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, ''))
  );
  if (teamKey) return { id: 'team', name: TEAM_ALIASES[teamKey] };

  // Intent
  for (const { id, kw } of INTENT_MAP) {
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (kw.some(k => l.includes(norm(k)))) return { id };
  }

  return { id: 'unknown' };
}

// ============================================================
// RESPONSE BUILDERS
// ============================================================
function fmtDate(utcStr) {
  const d = new Date(utcStr);
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function fmtScorers(data) {
  if (!data?.scorers?.length) return 'Aún no hay goleadores registrados en el torneo.';
  return 'Tabla de goleadores:\n\n' + data.scorers.slice(0, 8).map((s, i) =>
    `${i + 1}. ${s.player.name} (${s.team.shortName || s.team.name}) — ${s.goals} gol${s.goals !== 1 ? 'es' : ''}`
  ).join('\n');
}

function fmtStandings(data) {
  if (!data?.standings?.length) return 'La fase de grupos aún no ha comenzado.';
  const groups = data.standings.filter(s => s.type === 'TOTAL');
  if (!groups.length) return 'No hay datos de clasificación disponibles todavía.';
  const g = groups[0];
  return `Grupo ${g.group?.replace('GROUP_', '') || ''}:\n\n` +
    g.table.map((t, i) =>
      `${i + 1}. ${t.team.shortName || t.team.name.slice(0, 12)} — ${t.points}pts | ${t.playedGames}J ${t.won}G ${t.draw}E ${t.lost}P | ${t.goalsFor}:${t.goalsAgainst}`
    ).join('\n');
}

function fmtMatches(data, mode) {
  if (!data?.matches?.length) {
    if (mode === 'live') return 'No hay partidos en vivo ahora mismo.';
    if (mode === 'upcoming') return 'No hay partidos próximos programados todavía.';
    return 'No hay resultados disponibles aún.';
  }
  const ms = data.matches.slice(0, 6);
  if (mode === 'upcoming') return 'Próximos partidos:\n\n' + ms.map(m =>
    `${fmtDate(m.utcDate)}\n  ${m.homeTeam.shortName || m.homeTeam.name} vs ${m.awayTeam.shortName || m.awayTeam.name}`
  ).join('\n');
  if (mode === 'results') return 'Últimos resultados:\n\n' + ms.map(m => {
    const s = m.score?.fullTime;
    return `${m.homeTeam.shortName || m.homeTeam.name} ${s ? `${s.home}–${s.away}` : '?–?'} ${m.awayTeam.shortName || m.awayTeam.name}`;
  }).join('\n');
  return ms.map(m => {
    const s = m.score?.fullTime;
    return `${m.homeTeam.shortName} ${s ? `${s.home}–${s.away}` : 'vs'} ${m.awayTeam.shortName}`;
  }).join('\n');
}

// ============================================================
// STATIC FALLBACKS (no API key)
// ============================================================
const STATIC_RESPONSES = {
  scorers: () => 'Candidatos a goleador del Mundial 2026:\n\n• Erling Haaland (Noruega)\n• Kylian Mbappé (Francia)\n• Lionel Messi (Argentina)\n• Harry Kane (Inglaterra)\n• Vinícius Jr. (Brasil)\n• Robert Lewandowski (Polonia)\n\nConecta tu API key para ver el ranking real en tiempo real.',
  standings: () => 'El Mundial 2026 comienza el 11 de junio con 48 selecciones en 12 grupos.\n\nConecta tu API key de football-data.org para ver las clasificaciones en vivo.',
  upcoming: () => 'El torneo FIFA World Cup 2026 comienza el 11 de junio de 2026.\n\nConecta tu API key para ver el calendario completo con fechas y horarios.',
  results: () => 'Los partidos del Mundial 2026 inician el 11 de junio.\n\nConecta tu API key para ver resultados en tiempo real.',
  live: () => 'No hay partidos en vivo en este momento.\n\nEl Mundial 2026 comienza el 11 de junio de 2026.',
  teams: () => {
    const teams = typeof ALL_TEAMS !== 'undefined' ? ALL_TEAMS : [];
    if (!teams.length) return '48 selecciones participarán en el Mundial 2026.';
    const byGroup = {};
    teams.forEach(t => { if (!byGroup[t.group]) byGroup[t.group] = []; byGroup[t.group].push(t); });
    return `48 selecciones en 12 grupos:\n\n` + Object.entries(byGroup).slice(0, 4).map(([g, ts]) =>
      `Grupo ${g}: ${ts.map(t => t.flag + ' ' + t.name).join(', ')}`
    ).join('\n') + '\n\n...y 8 grupos más.';
  },
};

// ============================================================
// SUB-COMPONENTS
// ============================================================
function ApiSetup({ onSave, dark, accent, radius }) {
  const [key, setKey] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const inputBg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const borderC = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const handleConnect = async () => {
    const k = key.trim();
    if (!k) { setErr('Introduce tu API key'); return; }
    setBusy(true); setErr('');
    try {
      const res = await fdValidate(k);
      if (res.ok) { onSave(k); }
      else { setErr(`Error ${res.status}. Verifica tu key en football-data.org`); }
    } catch { setErr('Error de red. Revisa tu conexión.'); }
    setBusy(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px', gap: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
          </svg>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 19, color: fg, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Conectar Football Data
        </div>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: fgM, margin: '8px 0 0', lineHeight: 1.55 }}>
          Regístrate gratis en{' '}
          <a href="https://www.football-data.org/client/register" target="_blank" rel="noopener"
            style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>
            football-data.org
          </a>
          {' '}para obtener tu API key y acceder a datos en vivo.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text" value={key} onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConnect()}
          placeholder="Pega tu API key..."
          style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 13, padding: '11px 14px',
            background: inputBg, border: `1.5px solid ${err ? '#E8344E' : borderC}`,
            borderRadius: radius, color: fg, outline: 'none',
          }}
        />
        {err && <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: '#E8344E' }}>{err}</div>}
        <button onClick={handleConnect} disabled={busy} style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15,
          textTransform: 'uppercase', letterSpacing: 1, padding: '12px',
          borderRadius: radius, background: busy ? accent + '88' : accent,
          color: '#0A0A14', border: 'none', cursor: busy ? 'wait' : 'pointer',
        }}>
          {busy ? 'Verificando...' : 'Conectar'}
        </button>
        <button onClick={() => onSave('DEMO')} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 12, color: fgM,
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          textDecoration: 'underline',
        }}>
          Usar sin API key (datos estáticos)
        </button>
      </div>
    </div>
  );
}

function Bubble({ msg, dark, accent, radius, onAction }) {
  const isBot = msg.role === 'bot';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  const botBg = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';

  return (
    <div style={{ display: 'flex', flexDirection: isBot ? 'row' : 'row-reverse', gap: 8, alignItems: 'flex-end', marginBottom: 14 }}>
      {isBot && (
        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 7l1.5 4h4l-3 2.5 1 4L12 15l-3.5 2.5 1-4L6.5 11h4z"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '82%', padding: '10px 14px',
        borderRadius: isBot ? `${radius}px ${radius}px ${radius}px 4px` : `${radius}px ${radius}px 4px ${radius}px`,
        background: isBot ? botBg : accent,
        color: isBot ? fg : '#0A0A14',
      }}>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
          {msg.text}
        </div>
        {msg.actions && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {msg.actions.map((a, i) => (
              <button key={i} onClick={() => onAction(a)}
                style={{
                  fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600,
                  padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
                  background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  color: fg, textTransform: 'uppercase', letterSpacing: 0.8,
                  transition: 'background 0.15s',
                }}>
                {a}
              </button>
            ))}
          </div>
        )}
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: isBot ? fgM : 'rgba(0,0,0,0.35)', marginTop: 4, textAlign: isBot ? 'left' : 'right' }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ dark, accent, radius }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 14 }}>
      <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 7l1.5 4h4l-3 2.5 1 4L12 15l-3.5 2.5 1-4L6.5 11h4z"/>
        </svg>
      </div>
      <div style={{ padding: '12px 16px', borderRadius: `${radius}px ${radius}px ${radius}px 4px`, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: accent, display: 'inline-block', opacity: 0.7, animation: `dotBounce 1s ${i * 0.18}s ease-in-out infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN CHATBOT
// ============================================================
function WCChatbot({ tweaks }) {
  const dark = tweaks.darkMode;
  const accent = tweaks.accentColor;
  const R = tweaks.roundedCards ? 14 : 2;
  const bg = dark ? '#0E0E1C' : '#fff';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('wc26_api_key') || '');
  const [ready, setReady] = useState(() => !!localStorage.getItem('wc26_chatbot_ready'));
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const initialized = useRef(false);
  const sendMessageRef = useRef(null);

  const ts = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const push = useCallback((role, text, extra = {}) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), role, text, time: ts(), ...extra }]);
  }, []);

  const handleAction = useCallback((actionText) => {
    sendMessageRef.current?.(actionText);
  }, []);

  // Welcome message
  useEffect(() => {
    if (open && ready && !initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        push('bot', '¡Hola! Soy tu asistente del Mundial 2026. Puedo consultar datos en tiempo real sobre partidos, goleadores, tablas y más. ¿Qué quieres saber?', {
          actions: ['Goleadores', 'Próximos partidos', 'Resultados', 'Grupos', 'Equipos', 'Partidos en vivo'],
        });
      }, 350);
    }
  }, [open, ready]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (open && ready) setTimeout(() => inputRef.current?.focus(), 300); }, [open, ready]);

  const handleSetup = (key) => {
    if (key !== 'DEMO') localStorage.setItem('wc26_api_key', key);
    localStorage.setItem('wc26_chatbot_ready', '1');
    setApiKey(key);
    setReady(true);
  };

  const resetSetup = () => {
    localStorage.removeItem('wc26_api_key');
    localStorage.removeItem('wc26_chatbot_ready');
    setApiKey(''); setReady(false);
    setMessages([]); initialized.current = false;
  };

  const isDemo = !apiKey || apiKey === 'DEMO';

  const callApi = async (path) => {
    if (isDemo) throw new Error('DEMO');
    return fdFetch(path, apiKey);
  };

  const resolveIntent = async (intent) => {
    try {
      switch (intent.id) {
        case 'scorers': {
          const d = await callApi('/competitions/WC/scorers?limit=10');
          return fmtScorers(d);
        }
        case 'standings': {
          const d = await callApi('/competitions/WC/standings');
          return fmtStandings(d);
        }
        case 'upcoming': {
          const d = await callApi('/competitions/WC/matches?status=SCHEDULED&limit=6');
          return fmtMatches(d, 'upcoming');
        }
        case 'results': {
          const d = await callApi('/competitions/WC/matches?status=FINISHED&limit=6');
          return fmtMatches(d, 'results');
        }
        case 'live': {
          const d = await callApi('/competitions/WC/matches?status=IN_PLAY');
          return fmtMatches(d, 'live');
        }
        case 'teams':
          return STATIC_RESPONSES.teams();
        case 'player': {
          const p = PLAYER_ALIASES[intent.key];
          return `${p.n} · ${p.t}\n#${p.num} · ${p.pos}\n\n${p.bio}`;
        }
        case 'team': {
          const teams = typeof ALL_TEAMS !== 'undefined' ? ALL_TEAMS : [];
          const t = teams.find(t => t.name === intent.name);
          const base = t ? `${t.flag} ${t.name} · Grupo ${t.group}` : intent.name;
          try {
            const d = await callApi(`/competitions/WC/matches?status=SCHEDULED&limit=10`);
            const ms = d.matches?.filter(m =>
              m.homeTeam.name.toLowerCase().includes(intent.name.toLowerCase()) ||
              m.awayTeam.name.toLowerCase().includes(intent.name.toLowerCase())
            );
            if (ms?.length) return `${base}\n\nPróximos partidos:\n${ms.slice(0, 3).map(m =>
              `${fmtDate(m.utcDate)} — ${m.homeTeam.shortName} vs ${m.awayTeam.shortName}`
            ).join('\n')}`;
          } catch {}
          return base + '\n\nConecta tu API key para ver los partidos programados.';
        }
        case 'help':
          return 'Puedo ayudarte con:\n\n• Goleadores del torneo\n• Clasificación por grupos\n• Próximos partidos y horarios\n• Resultados en tiempo real\n• Partidos en vivo\n• Jugadores estrella\n• Información de equipos\n\nSolo pregúntame, por ejemplo:\n"¿Cuándo juega Brasil?" o "¿Quién lleva más goles?"';
        default:
          return 'No entendí esa pregunta. Puedo ayudarte con goleadores, partidos, resultados, clasificaciones, equipos y jugadores. ¿Qué necesitas saber?';
      }
    } catch (err) {
      if (err.message === 'DEMO' || isDemo) {
        if (intent.id === 'player') {
          const p = PLAYER_ALIASES[intent.key];
          return `${p.n} · ${p.t}\n#${p.num} · ${p.pos}\n\n${p.bio}`;
        }
        if (intent.id === 'team') {
          const teams = typeof ALL_TEAMS !== 'undefined' ? ALL_TEAMS : [];
          const t = teams.find(t => t.name === intent.name);
          return t ? `${t.flag} ${t.name} · Grupo ${t.group}\n\nConecta tu API key para ver sus partidos programados.` : intent.name;
        }
        if (intent.id === 'teams') return STATIC_RESPONSES.teams();
        if (intent.id === 'help') return 'Puedo ayudarte con goleadores, partidos, resultados, clasificaciones, equipos y jugadores del Mundial 2026.';
        const fn = STATIC_RESPONSES[intent.id];
        return fn ? fn() : 'Para datos en vivo, conecta tu API key de football-data.org.';
      }
      if (err.message?.includes('429')) return 'Límite de peticiones alcanzado. El plan gratuito permite 10 llamadas por minuto. Intenta en un momento.';
      return `Error al consultar la API (${err.message}). Verifica tu API key.`;
    }
  };

  const sendMessage = async (textOverride) => {
    const text = (textOverride !== undefined ? textOverride : input).trim();
    if (!text || loading) return;
    setInput('');
    push('user', text);
    setLoading(true);
    try {
      const intent = detectIntent(text);
      const reply = await resolveIntent(intent);
      setTimeout(() => { push('bot', reply); setLoading(false); }, 500 + Math.random() * 300);
    } catch {
      setTimeout(() => { push('bot', 'Ocurrió un error inesperado. Intenta de nuevo.'); setLoading(false); }, 500);
    }
  };
  sendMessageRef.current = sendMessage;

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(v => !v)} style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
        width: 56, height: 56, borderRadius: '50%',
        background: accent, border: 'none', cursor: 'pointer',
        boxShadow: `0 4px 20px ${accent}66, 0 2px 8px rgba(0,0,0,0.3)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: open ? 'scale(0.9) rotate(45deg)' : 'scale(1)',
      }}>
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 28, zIndex: 999,
          width: 'min(390px, calc(100vw - 32px))', height: 570,
          borderRadius: R + 4, background: bg,
          border: `1px solid ${border}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>

          {/* Header */}
          <div style={{ padding: '12px 16px', background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 7l1.5 4h4l-3 2.5 1 4L12 15l-3.5 2.5 1-4L6.5 11h4z"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: fg, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1 }}>
                Asistente FIFA 2026
              </div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: fgM, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ready && !isDemo ? '#00C48C' : '#F4A100', display: 'inline-block', flexShrink: 0 }} />
                {ready && !isDemo ? 'En vivo · football-data.org' : 'Modo estático · sin API key'}
              </div>
            </div>
            {ready && (
              <button onClick={resetSetup} style={{ background: 'none', border: 'none', cursor: 'pointer', color: fgM, fontFamily: "'Barlow', sans-serif", fontSize: 11, padding: '4px 8px', borderRadius: 4, flexShrink: 0 }}>
                Config
              </button>
            )}
          </div>

          {/* Body */}
          {!ready ? (
            <ApiSetup onSave={handleSetup} dark={dark} accent={accent} radius={tweaks.roundedCards ? 8 : 2} />
          ) : (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column' }}>
                {messages.length === 0 && (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
                    <div style={{ textAlign: 'center' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.2" strokeLinecap="round" style={{ display: 'block', margin: '0 auto 8px' }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: fgM }}>Cargando asistente...</div>
                    </div>
                  </div>
                )}
                {messages.map(msg => (
                  <Bubble key={msg.id} msg={msg} dark={dark} accent={accent} radius={tweaks.roundedCards ? 12 : 4} onAction={handleAction} />
                ))}
                {loading && <TypingIndicator dark={dark} accent={accent} radius={tweaks.roundedCards ? 12 : 4} />}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '10px 12px', borderTop: `1px solid ${border}`, display: 'flex', gap: 8, flexShrink: 0 }}>
                <input
                  ref={inputRef}
                  type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Pregunta sobre el Mundial 2026..."
                  disabled={loading}
                  style={{
                    flex: 1, fontFamily: "'Barlow', sans-serif", fontSize: 13,
                    padding: '10px 14px', borderRadius: tweaks.roundedCards ? 999 : 4,
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${border}`, color: fg, outline: 'none',
                    opacity: loading ? 0.6 : 1,
                  }}
                />
                <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
                  width: 40, height: 40, flexShrink: 0, borderRadius: tweaks.roundedCards ? 999 : 4,
                  background: input.trim() && !loading ? accent : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'),
                  border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={input.trim() && !loading ? '#0A0A14' : fgM}
                    strokeWidth="2.5" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { WCChatbot });
