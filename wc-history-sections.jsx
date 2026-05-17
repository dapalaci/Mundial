const { useState, useRef, useCallback } = React;

// ============================================================
// SECTION CARDS for landing (3 wide cards like Nike categories)
// ============================================================
function UniformesHeroCard({ tweaks, onClick }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 16 : 0;

  return (
    <div
      style={{
        position: 'relative', borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
        marginTop: 'clamp(10px, 1.5vw, 16px)',
        height: 'clamp(220px, 30vw, 380px)',
        transform: hover ? 'scale(1.008)' : 'scale(1)',
        boxShadow: hover ? '0 24px 60px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {/* Background image */}
      <img
        src="images/uniformes-celebs.png"
        alt="Uniformes oficiales"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      {/* Dark gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(13,27,42,0.72) 0%, rgba(13,27,42,0.1) 50%, rgba(13,27,42,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(20px, 3vw, 36px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        zIndex: 5,
      }}>
        <div>
          <div style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 4,
            color: 'rgba(255,255,255,0.45)', marginBottom: 8,
          }}>
            Catálogo Oficial · 48 Selecciones
          </div>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(32px, 6vw, 64px)', color: '#fff', margin: 0,
            textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: -1,
          }}>
            Uniformes
          </h3>
          <div style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(12px, 1.5vw, 14px)',
            color: 'rgba(255,255,255,0.5)', marginTop: 10,
          }}>
            Camisetas oficiales y las celebridades que las visten
          </div>
        </div>

        {/* CTA pill */}
        <div style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
          letterSpacing: 1, textTransform: 'uppercase',
          background: '#fff', color: '#111',
          padding: '12px 28px', borderRadius: tweaks.roundedCards ? 999 : 4,
          flexShrink: 0, marginLeft: 24,
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Ver colección →
        </div>
      </div>
    </div>
  );
}

function WCHistorySections({ tweaks, onNavigate }) {
  const dark = tweaks.darkMode;
  const fg = dark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;

  const sections = [
    {
      id: 'balones', title: 'Balones', subtitle: 'Historia de los balones oficiales',
      gradient: 'linear-gradient(145deg, #1A1A2E, #16213E, #0F3460)',
      image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=800&h=400&fit=crop&q=80',
      icon: '⚽',
    },
    {
      id: 'mascotas', title: 'Mascotas', subtitle: 'Los personajes icónicos de cada Mundial',
      gradient: 'linear-gradient(145deg, #2D132C, #801336, #C72C41)',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=400&fit=crop&q=80',
      icon: '🎭',
    },
    {
      id: 'fanfest', title: 'Fan Fest', subtitle: 'La gran fiesta del fútbol mundial',
      gradient: 'linear-gradient(145deg, #1B2838, #2A4858, #3A6B78)',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop&q=80',
      icon: '🎉',
    },
  ];

  const sections2 = [
    {
      id: 'goleadores', title: 'Goleadores', subtitle: 'Los máximos artilleros de la historia',
      gradient: 'linear-gradient(145deg, #2C1810, #5C2E1A, #8B4513)',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop&q=80',
      icon: '🥇',
    },
    {
      id: 'historia', title: 'Historia', subtitle: 'Todos los mundiales desde 1930',
      gradient: 'linear-gradient(145deg, #0A0A30, #1A1A50, #2A2A70)',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop&q=80',
      icon: '📜',
    },
    {
      id: 'finales', title: 'Finales', subtitle: 'Cada final, gol a gol',
      gradient: 'linear-gradient(145deg, #1A0A20, #3A1A40, #5A2A60)',
      image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=800&h=400&fit=crop&q=80',
      icon: '🏆',
    },
  ];

  return (
    <section style={{ background: dark ? '#0A0A12' : '#fff', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)' }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: fg, margin: '0 0 clamp(24px, 4vw, 40px) 0', textTransform: 'uppercase', letterSpacing: 1 }}>
        Historia del Mundial
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 28vw, 340px), 1fr))', gap: 'clamp(10px, 1.5vw, 16px)' }}>
        {sections.map(sec => (
          <HistorySectionCard key={sec.id} section={sec} tweaks={tweaks} onClick={() => onNavigate(sec.id)} />
        ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 28vw, 340px), 1fr))', gap: 'clamp(10px, 1.5vw, 16px)', marginTop: 'clamp(10px, 1.5vw, 16px)' }}>
        {sections2.map(sec => (
          <HistorySectionCard key={sec.id} section={sec} tweaks={tweaks} onClick={() => onNavigate(sec.id)} />
        ))}
      </div>

      {/* Uniformes — full width */}
      <UniformesHeroCard tweaks={tweaks} onClick={() => onNavigate('uniformes')} />
    </section>
  );
}

function HistorySectionCard({ section, tweaks, onClick }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;

  return (
    <div style={{
      position: 'relative', borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
      aspectRatio: '4/3',
      transform: hover ? 'scale(1.015)' : 'scale(1)',
      boxShadow: hover ? '0 20px 50px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.1)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}>
      {/* BG image */}
      <img src={section.image} alt="" loading="lazy" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hover ? 'scale(1.08)' : 'scale(1)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: section.gradient, opacity: 0.6, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, zIndex: 2 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#fff', textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.1 }}>
          {section.title}
        </div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
          {section.subtitle}
        </div>
        <div className="wc-pill-cta" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
          background: '#fff', color: '#111',
          fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600,
          padding: '8px 18px', borderRadius: tweaks.roundedCards ? 999 : 4,
          transition: 'all 0.25s ease',
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        }}>
          Explorar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WCHistorySections });