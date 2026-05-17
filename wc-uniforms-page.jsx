const { useState, useEffect, useCallback } = React;

// ============================================================
// DATA — 48 teams, celebrity/star player + jersey info
// ============================================================
const UNIFORMS_DATA = [
  // Group A
  { id: 'usa',        group: 'A', brand: 'Nike',         celebName: 'Christian Pulisic',    role: 'Extremo · AC Milan',           celebImg: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Christian_Pulisic_USMNT_v_Belgium_Mar_28_2026-73_%28cropped%29.jpg' },
  { id: 'mexico',     group: 'A', brand: 'Adidas',        celebName: 'Javier Hernández',     role: 'Delantero · LA Galaxy',        celebImg: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Hertha_BSC_vs._West_Ham_United_20190731_%28139%29.jpg' },
  { id: 'canada',     group: 'A', brand: 'Nike',         celebName: 'Alphonso Davies',      role: 'Lateral · Bayern Munich',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Alphonso_Davies_in_2022.jpg' },
  { id: 'argentina',  group: 'A', brand: 'Adidas',        celebName: 'Lionel Messi',         role: 'Delantero · Inter Miami',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg' },
  // Group B
  { id: 'france',     group: 'B', brand: 'Nike',         celebName: 'Kylian Mbappé',        role: 'Delantero · Real Madrid',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg' },
  { id: 'england',    group: 'B', brand: 'Nike',         celebName: 'Jude Bellingham',      role: 'Mediocampista · Real Madrid',  celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg' },
  { id: 'germany',    group: 'B', brand: 'Adidas',        celebName: 'Thomas Müller',        role: 'Delantero · Bayern Munich',    celebImg: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_19.jpg' },
  { id: 'netherlands',group: 'B', brand: 'Nike',         celebName: 'Virgil van Dijk',      role: 'Defensa · Liverpool',          celebImg: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg' },
  // Group C
  { id: 'brazil',     group: 'C', brand: 'Nike',         celebName: 'Vinicius Jr.',         role: 'Extremo · Real Madrid',        celebImg: null },
  { id: 'spain',      group: 'C', brand: 'Adidas',        celebName: 'Lamine Yamal',         role: 'Extremo · FC Barcelona',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Lamine_Yamal_in_2025.jpg' },
  { id: 'portugal',   group: 'C', brand: 'Nike',         celebName: 'Cristiano Ronaldo',    role: 'Delantero · Al-Nassr',         celebImg: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg' },
  { id: 'japan',      group: 'C', brand: 'Adidas',        celebName: 'Takumi Minamino',      role: 'Mediocampista · Monaco',       celebImg: null },
  // Group D
  { id: 'italy',      group: 'D', brand: 'Puma',         celebName: 'G. Donnarumma',        role: 'Portero · PSG',                celebImg: null },
  { id: 'belgium',    group: 'D', brand: 'Adidas',        celebName: 'Kevin De Bruyne',      role: 'Mediocampista · Man. City',    celebImg: null },
  { id: 'croatia',    group: 'D', brand: 'Nike',         celebName: 'Luka Modrić',          role: 'Mediocampista · Real Madrid',  celebImg: null },
  { id: 'morocco',    group: 'D', brand: 'Puma',         celebName: 'Achraf Hakimi',        role: 'Lateral · PSG',                celebImg: null },
  // Group E
  { id: 'uruguay',    group: 'E', brand: 'Puma',         celebName: 'Luis Suárez',          role: 'Delantero · River Plate',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Luis_Su%C3%A1rez_2026_%28cropped%29.jpg' },
  { id: 'colombia',   group: 'E', brand: 'Adidas',        celebName: 'Luis Díaz',            role: 'Extremo · Liverpool',          celebImg: null },
  { id: 'senegal',    group: 'E', brand: 'Puma',         celebName: 'Sadio Mané',           role: 'Extremo · Al-Nassr',           celebImg: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Sadio_Mane_Al-Nassr.jpg' },
  { id: 'ecuador',    group: 'E', brand: 'Marathon',     celebName: 'Enner Valencia',       role: 'Delantero · Internacional',    celebImg: null },
  // Group F
  { id: 'denmark',    group: 'F', brand: 'Hummel',       celebName: 'Christian Eriksen',    role: 'Mediocampista · Man. United',  celebImg: null },
  { id: 'switzerland',group: 'F', brand: 'Puma',         celebName: 'Xherdan Shaqiri',      role: 'Extremo · Chicago Fire',       celebImg: null },
  { id: 'serbia',     group: 'F', brand: 'Puma',         celebName: 'Dušan Vlahović',       role: 'Delantero · Juventus',         celebImg: null },
  { id: 'australia',  group: 'F', brand: 'Nike',         celebName: 'Mathew Ryan',          role: 'Portero · AZ Alkmaar',         celebImg: null },
  // Group G
  { id: 'southkorea', group: 'G', brand: 'Nike',         celebName: 'Son Heung-min',        role: 'Delantero · Tottenham',        celebImg: null },
  { id: 'iran',       group: 'G', brand: 'Meyba',        celebName: 'Mehdi Taremi',         role: 'Delantero · Inter Milan',      celebImg: null },
  { id: 'cameroon',   group: 'G', brand: 'One All Sports',celebName: 'André Onana',         role: 'Portero · Man. United',        celebImg: null },
  { id: 'nigeria',    group: 'G', brand: 'Nike',         celebName: 'Victor Osimhen',       role: 'Delantero · Galatasaray',      celebImg: null },
  // Group H
  { id: 'poland',     group: 'H', brand: 'Nike',         celebName: 'R. Lewandowski',       role: 'Delantero · FC Barcelona',     celebImg: null },
  { id: 'turkey',     group: 'H', brand: 'Nike',         celebName: 'Hakan Çalhanoğlu',     role: 'Mediocampista · Inter Milan',  celebImg: null },
  { id: 'scotland',   group: 'H', brand: 'Adidas',        celebName: 'Andrew Robertson',     role: 'Lateral · Liverpool',          celebImg: null },
  { id: 'costarica',  group: 'H', brand: 'New Balance',  celebName: 'Keylor Navas',         role: 'Portero · Independiente',      celebImg: null },
  // Group I
  { id: 'austria',    group: 'I', brand: 'Puma',         celebName: 'David Alaba',          role: 'Defensa · Real Madrid',        celebImg: null },
  { id: 'ukraine',    group: 'I', brand: 'Nike',         celebName: 'O. Zinchenko',         role: 'Lateral · Arsenal',            celebImg: null },
  { id: 'wales',      group: 'I', brand: 'Adidas',        celebName: 'Gareth Bale',          role: 'Extremo · Leyenda',            celebImg: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/2022_FIFA_World_Cup_United_States_1%E2%80%931_Wales_-_%2832%29_%28cropped%29.jpg' },
  { id: 'saudiarabia',group: 'I', brand: 'Adidas',        celebName: 'Salem Al-Dawsari',     role: 'Extremo · Al-Hilal',           celebImg: null },
  // Group J
  { id: 'chile',      group: 'J', brand: 'Adidas',        celebName: 'Alexis Sánchez',       role: 'Delantero · Udinese',          celebImg: null },
  { id: 'paraguay',   group: 'J', brand: 'Umbro',        celebName: 'Miguel Almirón',       role: 'Mediocampista · Newcastle',    celebImg: null },
  { id: 'ghana',      group: 'J', brand: 'Nike',         celebName: 'Thomas Partey',        role: 'Mediocampista · Arsenal',      celebImg: null },
  { id: 'tunisia',    group: 'J', brand: 'Kappa',        celebName: 'Wahbi Khazri',         role: 'Delantero · Montpellier',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Wahbi_Khazri.jpg' },
  // Group K
  { id: 'sweden',     group: 'K', brand: 'Adidas',        celebName: 'Zlatan Ibrahimović',   role: 'Delantero · Leyenda',          celebImg: null },
  { id: 'norway',     group: 'K', brand: 'Nike',         celebName: 'Erling Haaland',       role: 'Delantero · Man. City',        celebImg: null },
  { id: 'newzealand', group: 'K', brand: 'Nike',         celebName: 'Chris Wood',           role: 'Delantero · Nottm Forest',     celebImg: null },
  { id: 'jamaica',    group: 'K', brand: 'Castore',      celebName: 'Leon Bailey',          role: 'Extremo · Aston Villa',        celebImg: null },
  // Group L
  { id: 'egypt',      group: 'L', brand: 'Nike',         celebName: 'Mohamed Salah',        role: 'Extremo · Liverpool',          celebImg: null },
  { id: 'algeria',    group: 'L', brand: 'Puma',         celebName: 'Riyad Mahrez',         role: 'Extremo · Al-Ahli',            celebImg: null },
  { id: 'peru',       group: 'L', brand: 'Umbro',        celebName: 'Paolo Guerrero',       role: 'Delantero · Leyenda',          celebImg: null },
  { id: 'qatar',      group: 'L', brand: 'Nike',         celebName: 'Almoez Ali',           role: 'Delantero · Al-Duhail',        celebImg: null },
];

// Gradient palette per brand for fallback cards
const BRAND_COLORS = {
  'Nike':          { a: '#111', b: '#333' },
  'Adidas':        { a: '#1a1a2e', b: '#16213e' },
  'Puma':          { a: '#1a0a0a', b: '#2d1515' },
  'Hummel':        { a: '#0a1a2e', b: '#0f2944' },
  'New Balance':   { a: '#0d0d1a', b: '#1a1a33' },
  'Umbro':         { a: '#001a0d', b: '#003319' },
  'Marathon':      { a: '#0d0d00', b: '#1a1a00' },
  'Meyba':         { a: '#1a001a', b: '#2d002d' },
  'Castore':       { a: '#00001a', b: '#00002d' },
  'Kappa':         { a: '#1a001a', b: '#330033' },
  'One All Sports':{ a: '#001a00', b: '#003300' },
};

// ============================================================
// UNIFORM CARD
// ============================================================
function UniformCard({ team, uniformData, tweaks }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 16 : 0;
  const dark = tweaks.darkMode;

  const ud = uniformData || {};
  const initials = (ud.celebName || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  // Use team's gradient colors for background tint
  const gradColors = BRAND_COLORS[ud.brand] || { a: '#111', b: '#222' };

  return (
    <div
      className="wc-gallery-card"
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '3/4',
        transform: hover ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.4)' : '0 2px 16px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Background: team image from carousel */}
      {team?.image ? (
        <img
          src={team.image.replace('w=400&h=530', 'w=600&h=800')}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${gradColors.a}, ${gradColors.b})` }} />
      )}

      {/* Color overlay using team gradient */}
      <div style={{ position: 'absolute', inset: 0, background: team?.gradient || 'linear-gradient(145deg, #111, #333)', mixBlendMode: 'multiply', opacity: 0.55 }} />

      {/* Bottom dark gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />

      {/* Top badges */}
      <div style={{ position: 'absolute', top: 12, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 14px', zIndex: 5 }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.55)',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
          padding: '4px 10px', borderRadius: tweaks.roundedCards ? 999 : 2,
        }}>Grupo {ud.group}</span>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
          padding: '4px 10px', borderRadius: tweaks.roundedCards ? 999 : 2,
        }}>{ud.brand}</span>
      </div>

      {/* Flag emoji watermark */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 80, opacity: hover ? 0.06 : 0.1, pointerEvents: 'none',
        transition: 'opacity 0.3s ease', userSelect: 'none',
      }}>
        {team?.flag || '⚽'}
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px', zIndex: 5 }}>
        {/* Celebrity row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          {/* Celebrity photo or initials */}
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.25)',
            background: `linear-gradient(135deg, ${team?.gradient?.match(/#[0-9a-fA-F]{3,6}/g)?.[0] || '#333'}, ${team?.gradient?.match(/#[0-9a-fA-F]{3,6}/g)?.[1] || '#555'})`,
          }}>
            {ud.celebImg ? (
              <img src={ud.celebImg} alt={ud.celebName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff',
              }}>{initials}</div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14,
              color: '#fff', textTransform: 'uppercase', lineHeight: 1.1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{ud.celebName}</div>
            <div style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500,
              color: 'rgba(255,255,255,0.45)', marginTop: 2, lineHeight: 1.2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{ud.role}</div>
          </div>
        </div>

        {/* Country name */}
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 3vw, 26px)', color: '#fff',
          textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -0.5,
        }}>{team?.name || ud.id}</div>

        {/* Hover detail */}
        <div style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)',
          marginTop: 4, opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(4px)',
          transition: 'all 0.25s ease', lineHeight: 1.4,
        }}>
          Uniforme oficial · Mundial 2026
        </div>
      </div>
    </div>
  );
}

// ============================================================
// UNIFORMS PAGE
// ============================================================
function WCUniformsPage({ tweaks, onBack }) {
  const [activeGroup, setActiveGroup] = useState('all');
  const [search, setSearch] = useState('');
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
  const radius = tweaks.roundedCards ? 12 : 0;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const groups = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const uniformMap = Object.fromEntries(UNIFORMS_DATA.map(u => [u.id, u]));

  const filtered = ALL_TEAMS.filter(team => {
    if (activeGroup !== 'all' && team.group !== activeGroup) return false;
    if (search) {
      const q = search.toLowerCase();
      const ud = uniformMap[team.id];
      return (
        team.name.toLowerCase().includes(q) ||
        team.code.toLowerCase().includes(q) ||
        (ud?.celebName || '').toLowerCase().includes(q) ||
        (ud?.brand || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', height: 'clamp(220px, 30vh, 320px)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'linear-gradient(145deg, #0A0F2E 0%, #1A0A1A 50%, #0A0A12 100%)',
      }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)' }} />

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

        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 3vw, 36px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            Catálogo Oficial · 48 Selecciones
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(42px, 9vw, 80px)', color: '#fff', margin: 0,
            textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: -1,
          }}>
            Uniformes<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Mundial 2026</span>
          </h1>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: dark ? 'rgba(10,10,18,0.92)' : 'rgba(250,250,250,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        padding: '12px clamp(20px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        {/* Group tabs */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer',
                padding: '6px 14px', border: 'none',
                borderRadius: tweaks.roundedCards ? 999 : 4,
                background: activeGroup === g
                  ? (tweaks.accentColor || '#00C4B3')
                  : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                color: activeGroup === g ? '#fff' : fgMuted,
                transition: 'all 0.2s ease',
              }}
            >
              {g === 'all' ? 'Todos' : `Gr. ${g}`}
            </button>
          ))}
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="Buscar país, marca o jugador..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: tweaks.roundedCards ? 999 : 4,
            padding: '8px 16px', color: fg, outline: 'none',
            width: 'clamp(160px, 20vw, 260px)',
          }}
        />
      </section>

      {/* ===== COUNT ===== */}
      <div style={{ padding: 'clamp(16px, 2vw, 24px) clamp(20px, 4vw, 48px) 0' }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2 }}>
          {filtered.length} {filtered.length === 1 ? 'uniforme' : 'uniformes'}
        </span>
      </div>

      {/* ===== GRID ===== */}
      <section style={{ padding: 'clamp(16px, 2vw, 24px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(160px, 18vw, 220px), 1fr))',
          gap: 'clamp(10px, 1.5vw, 16px)',
        }}>
          {filtered.map(team => (
            <UniformCard
              key={team.id}
              team={team}
              uniformData={uniformMap[team.id]}
              tweaks={tweaks}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: fgMuted, fontFamily: "'Barlow', sans-serif", fontSize: 14 }}>
            No hay resultados para "{search}"
          </div>
        )}
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: dark ? '#fff' : '#111', background: 'none',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease',
        }}>
          Ver todas las secciones
        </button>
      </section>
    </div>
  );
}

Object.assign(window, { WCUniformsPage });
