const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// BACK ARROW
// ============================================================
const BackArrow = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// ============================================================
// TEAM PAGE
// ============================================================
function WCTeamPage({ team, teamData, tweaks, onBack }) {
  const roster = TEAM_ROSTERS[team.id] || {};

  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const accent = tweaks.accentColor;
  const colors = roster.colors || { primary: '#333', secondary: '#fff', accent: accent };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', height: 'clamp(380px, 55vh, 520px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* BG: USA uses HoverExpand banner, others use image */}
        {team.id === 'usa' ? (
          <div style={{
            position: 'absolute', inset: 0,
            background: '#060A14',
            display: 'flex', alignItems: 'stretch',
            padding: 'clamp(10px, 1.5vw, 16px)',
            paddingBottom: 'clamp(72px, 10vw, 96px)',
          }}>
            <USABannerExpand tweaks={tweaks} />
          </div>
        ) : (
          <>
            {team.image && (
              <img src={team.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: team.gradient, mixBlendMode: 'multiply', opacity: 0.7 }}></div>
          </>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>

        {/* Shield emblem */}
        {(() => {
          const OVR = { 'gb-sct': 'sc', 'gb-eng': 'en', uy: 'ur', pa: 'pn', za: 'zl' };
          const NO = new Set(['cz','ba','ht','cw','ir','nz','cv','tn','eg','dz','at','cd']);
          const code = OVR[team.flagCode] || team.flagCode;
          if (NO.has(code) || team.id === 'usa') return null;
          return (
            <img
              src={`assets/seleccion-${code}.webp`}
              alt=""
              style={{
                position: 'absolute', right: 'clamp(20px, 5vw, 64px)', bottom: 'clamp(20px, 3vw, 36px)',
                height: 'clamp(80px, 14vh, 130px)', width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                zIndex: 6, opacity: 0.92,
              }}
            />
          );
        })()}

        {/* Back button */}
        <button onClick={onBack} className="wc-back-btn" style={{
          position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px',
          color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          transition: 'all 0.25s ease',
        }}>
          <BackArrow size={16} color="#fff" /> Volver
        </button>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            Selección · Grupo {team.group}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 10vw, 88px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -1 }}>
            {team.name}
          </h1>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{
        background: dark ? '#111118' : '#fff',
        padding: 'clamp(20px, 3vw, 32px) clamp(20px, 4vw, 48px)',
        display: 'flex', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}>
        {[
          { value: team.ranking ? `#${team.ranking}` : '—', label: 'Ranking FIFA' },
          { value: team.titles ?? '—', label: 'Títulos Mundiales' },
          { value: team.group, label: 'Grupo' },
          { value: roster.squad ? Object.values(roster.squad).flat().length : '—', label: 'Convocados' },
        ].map(stat => (
          <div key={stat.label} style={{ minWidth: 100 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: fg, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ===== DESCRIPTION ===== */}
      {roster.description && (
        <section style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)', maxWidth: 800 }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
            {roster.description}
          </p>
        </section>
      )}

      {/* ===== CULTURA Y COSTUMBRES ===== */}
      {roster.culture && (
        <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(40px, 5vw, 60px)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', color: fg, margin: '0 0 24px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Cultura &amp; Costumbres
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚽', label: 'Tradición futbolística', text: roster.culture.tradicion },
              { icon: '🍽️', label: 'Gastronomía', text: roster.culture.gastronomia },
              { icon: '🎵', label: 'Música y Cultura', text: roster.culture.musica },
              { icon: '📌', label: 'Dato curioso', text: roster.culture.dato },
            ].filter(item => item.text).map(item => (
              <div key={item.label} style={{
                background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: radius, padding: '20px 22px',
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{item.label}</div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: fg, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== SQUAD GALLERY ===== */}
      {roster.squad && Object.entries(roster.squad).map(([position, players]) => (
        <section key={position} style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
              {position}
            </h3>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', padding: '3px 10px', borderRadius: 999 }}>
              {players.length}
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 20vw, 185px), 1fr))',
            gap: 'clamp(8px, 1.5vw, 14px)',
          }}>
            {players.map((player, i) => (
              <PlayerPhotoCard key={player.name} player={player} teamColors={colors} tweaks={tweaks} index={i} />
            ))}
          </div>
        </section>
      ))}

      {/* ===== COACHING STAFF ===== */}
      {roster.coach && (
        <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Cuerpo Técnico
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <StaffCard person={roster.coach} teamColors={colors} tweaks={tweaks} isHead={true} />
            {(roster.staff || []).map(s => (
              <StaffCard key={s.name} person={s} teamColors={colors} tweaks={tweaks} isHead={false} />
            ))}
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: dark ? '#fff' : '#111', background: 'none',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease',
        }}>
          ← Ver todas las selecciones
        </button>
      </section>
    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, { WCTeamPage });