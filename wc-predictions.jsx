const { useState, useEffect, useRef } = React;

// ============================================================
// PLAYER LIST FOR PREDICTIONS
// ============================================================
const PRED_PLAYERS = [
  'Lionel Messi', 'Kylian Mbappé', 'Vinícius Jr.', 'Jude Bellingham',
  'Erling Haaland', 'Pedri', 'Lamine Yamal', 'Harry Kane',
  'Robert Lewandowski', 'Darwin Núñez', 'Bukayo Saka', 'Mohamed Salah',
  'Son Heung-min', 'Romelu Lukaku', 'Nico Williams', 'Rodrygo',
  'Phil Foden', 'Rodri', 'Kevin De Bruyne', 'Bruno Fernandes',
  'Federico Valverde', 'Florian Wirtz', 'Jamal Musiala', 'Dani Olmo',
  'Antoine Griezmann', 'Virgil van Dijk', 'Raphinha', 'Dominik Szoboszlai',
  'Rúben Dias', 'Achraf Hakimi', 'Nicolò Barella', 'Kai Havertz',
];

// ============================================================
// PREDICTION CATEGORIES
// ============================================================
const PRED_FIELDS = [
  {
    id: 'goleador', label: 'Goleador', type: 'player',
    hint: '¿Quién marcará más goles?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 7l1.5 4h4l-3 2.5 1 4L12 15l-3.5 2.5 1-4L6.5 11h4z"/>
      </svg>
    ),
  },
  {
    id: 'figura', label: 'Figura del Torneo', type: 'player',
    hint: '¿El mejor jugador del Mundial?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: 'revelacionJugador', label: 'Jugador Revelación', type: 'player',
    hint: '¿Quién sorprenderá al mundo?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: 'revelacionEquipo', label: 'Equipo Revelación', type: 'team',
    hint: '¿Qué selección dará la sorpresa?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'campeon', label: 'Campeón', type: 'team',
    hint: '¿Quién levantará la Copa del Mundo?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
  },
  {
    id: 'subcampeon', label: 'Subcampeón', type: 'team',
    hint: '¿Quién llegará a la final?',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
];

// ============================================================
// CUSTOM SEARCHABLE DROPDOWN
// ============================================================
function PredSelect({ options, value, onChange, placeholder, dark, radius, accent }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const isTeam = options.length > 0 && typeof options[0] === 'object';

  const getLabel = (o) => isTeam ? `${o.flag} ${o.name}` : o;
  const getValue = (o) => isTeam ? o.name : o;

  const filtered = options.filter(o =>
    (isTeam ? o.name : o).toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = value
    ? (isTeam
        ? (() => { const t = options.find(o => o.name === value); return t ? `${t.flag} ${t.name}` : value; })()
        : value)
    : null;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 14px',
          borderRadius: open ? `${radius}px ${radius}px 0 0` : radius,
          background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          border: `1.5px solid ${open ? accent : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
          borderBottomColor: open ? 'transparent' : undefined,
          cursor: 'pointer', transition: 'border-color 0.2s', userSelect: 'none',
        }}>
        <span style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 14,
          color: selectedLabel ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'),
          fontWeight: selectedLabel ? 500 : 400,
        }}>
          {selectedLabel || placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 500,
          background: dark ? '#16162A' : '#fff',
          border: `1.5px solid ${accent}`, borderTop: 'none',
          borderRadius: `0 0 ${radius}px ${radius}px`,
          boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', maxHeight: 240,
        }}>
          <div style={{ padding: '8px 12px', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`, flexShrink: 0 }}>
            <input
              ref={inputRef}
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              style={{ width: '100%', background: 'none', border: 'none', outline: 'none', fontFamily: "'Barlow', sans-serif", fontSize: 13, color: dark ? '#fff' : '#111' }}
            />
          </div>
          <div style={{ overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <div style={{ padding: '10px 14px', fontFamily: "'Barlow', sans-serif", fontSize: 13, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                Sin resultados
              </div>
            )}
            {filtered.map((opt, i) => {
              const v = getValue(opt);
              const l = getLabel(opt);
              const isSelected = v === value;
              return (
                <div
                  key={i}
                  onClick={() => { onChange(v); setOpen(false); setSearch(''); }}
                  style={{
                    padding: '9px 14px', cursor: 'pointer',
                    fontFamily: "'Barlow', sans-serif", fontSize: 13,
                    color: isSelected ? accent : (dark ? '#fff' : '#111'),
                    background: isSelected ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)') : 'transparent',
                    fontWeight: isSelected ? 600 : 400,
                    borderBottom: i < filtered.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSelected ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)') : 'transparent'; }}
                >
                  {l}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN PREDICTIONS SECTION
// ============================================================
function WCPredictions({ tweaks }) {
  const dark = tweaks.darkMode;
  const accent = tweaks.accentColor;
  const radius = tweaks.roundedCards ? 14 : 2;
  const bg = dark ? '#0D0D1A' : '#F0F0F5';
  const cardBg = dark ? '#12121F' : '#fff';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';

  const [preds, setPreds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wc26_predictions') || '{}'); }
    catch { return {}; }
  });
  const [saved, setSaved] = useState(() => !!localStorage.getItem('wc26_predictions_saved'));
  const [editing, setEditing] = useState(false);

  const teamOptions = typeof ALL_TEAMS !== 'undefined' ? ALL_TEAMS : [];
  const isComplete = PRED_FIELDS.every(f => preds[f.id]);
  const showForm = !saved || editing;

  const update = (id, val) => setPreds(prev => ({ ...prev, [id]: val }));

  const handleSave = () => {
    localStorage.setItem('wc26_predictions', JSON.stringify(preds));
    localStorage.setItem('wc26_predictions_saved', '1');
    setSaved(true);
    setEditing(false);
  };

  const getTeamLabel = (name) => {
    const t = teamOptions.find(t => t.name === name);
    return t ? `${t.flag} ${t.name}` : (name || '—');
  };

  return (
    <section style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)' }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: accent, marginBottom: 10 }}>
          Mundial 2026
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 42px)', color: fg, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Haz tus Predicciones
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: fgM, margin: 0 }}>
              ¿Quién ganará la Copa del Mundo 2026? Tus pronósticos, antes del 11 de junio.
            </p>
          </div>
          {saved && !editing && (
            <button onClick={() => setEditing(true)} style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 1,
              padding: '9px 20px', borderRadius: tweaks.roundedCards ? 999 : 4,
              background: 'none', border: `1.5px solid ${border}`,
              color: fgM, cursor: 'pointer',
            }}>
              Editar pronóstico
            </button>
          )}
        </div>
      </div>

      {showForm ? (
        <>
          {/* 2-col grid of prediction cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14, marginBottom: 28 }}>
            {PRED_FIELDS.map(field => (
              <div key={field.id} style={{
                background: cardBg, borderRadius: radius, padding: '20px 20px 18px',
                border: `1.5px solid ${preds[field.id] ? accent + '55' : border}`,
                transition: 'border-color 0.3s ease',
              }}>
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: tweaks.roundedCards ? 10 : 4, background: preds[field.id] ? accent + '22' : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'), display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                    {field.icon(preds[field.id] ? accent : (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'))}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: fg, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.1 }}>
                      {field.label}
                    </div>
                    <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: fgM, marginTop: 2 }}>
                      {field.hint}
                    </div>
                  </div>
                </div>
                <PredSelect
                  options={field.type === 'player' ? PRED_PLAYERS : teamOptions}
                  value={preds[field.id] || ''}
                  onChange={v => update(field.id, v)}
                  placeholder="Seleccionar..."
                  dark={dark}
                  radius={tweaks.roundedCards ? 8 : 2}
                  accent={accent}
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={handleSave}
              disabled={!isComplete}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16,
                textTransform: 'uppercase', letterSpacing: 1.5,
                padding: '14px 40px', borderRadius: tweaks.roundedCards ? 999 : 4,
                background: isComplete ? accent : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'),
                color: isComplete ? '#0A0A14' : fgM,
                border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: isComplete ? `0 4px 20px ${accent}55` : 'none',
              }}>
              Guardar Pronóstico
            </button>
            {!isComplete && (
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: fgM }}>
                {PRED_FIELDS.filter(f => !preds[f.id]).length} campo{PRED_FIELDS.filter(f => !preds[f.id]).length !== 1 ? 's' : ''} sin completar
              </span>
            )}
            {saved && editing && (
              <button onClick={() => setEditing(false)} style={{
                fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500,
                padding: '10px 20px', borderRadius: tweaks.roundedCards ? 999 : 4,
                background: 'none', border: `1px solid ${border}`, color: fgM, cursor: 'pointer',
              }}>
                Cancelar
              </button>
            )}
          </div>
        </>
      ) : (
        /* Summary card */
        <div style={{ borderRadius: radius, overflow: 'hidden', border: `1px solid ${border}` }}>
          {/* Summary header */}
          <div style={{ background: accent, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: '#0A0A14', textTransform: 'uppercase', letterSpacing: 1 }}>
                Tu Pronóstico
              </div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(0,0,0,0.55)', marginTop: 2 }}>
                Copa del Mundo 2026 · Guardado
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.12)', borderRadius: 999, padding: '6px 14px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A14" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: '#0A0A14' }}>Guardado</span>
            </div>
          </div>

          {/* Summary grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', background: cardBg }}>
            {PRED_FIELDS.map((field, i) => (
              <div key={field.id} style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${border}`,
                borderRight: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: tweaks.roundedCards ? 10 : 4, background: accent + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {field.icon(accent)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: fgM, marginBottom: 3 }}>
                    {field.label}
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: fg, lineHeight: 1.1 }}>
                    {field.type === 'team' ? getTeamLabel(preds[field.id]) : (preds[field.id] || '—')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { WCPredictions });
