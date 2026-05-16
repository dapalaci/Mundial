const { useState, useEffect } = React;

// ============================================================
// WORLD CUP BALLS DATA
// ============================================================
const BALLS_DATA = [
  { year: 1970, name: 'Telstar', host: 'México', desc: 'El primer balón oficial del Mundial y el más icónico de la historia. Su diseño de 32 paneles en blanco y negro fue creado para ser visible en televisores en blanco y negro. Fabricado por Adidas, marcó el inicio de una tradición.', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&h=400&fit=crop&q=80', color: '#1A1A1A' },
  { year: 1974, name: 'Telstar Durlast', host: 'Alemania', desc: 'Evolución del Telstar original con un recubrimiento Durlast totalmente impermeable. Mantuvo el diseño clásico blanco y negro que se convirtió en el símbolo universal del fútbol.', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&h=400&fit=crop&q=80', color: '#1A1A1A' },
  { year: 1978, name: 'Tango', host: 'Argentina', desc: 'Revolucionó el diseño con 20 paneles idénticos que creaban la ilusión óptica de 12 círculos. Su estética inspirada en el tango argentino influyó en el diseño de balones durante las siguientes dos décadas.', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&h=400&fit=crop&q=80', color: '#75AADB' },
  { year: 1982, name: 'Tango España', host: 'España', desc: 'Primer balón con costuras selladas resistentes al agua. Aunque visualmente similar al Tango, incorporó innovaciones técnicas que mejoraron su rendimiento bajo la lluvia.', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', color: '#AA151B' },
  { year: 1986, name: 'Azteca', host: 'México', desc: 'El primer balón completamente sintético en la historia del Mundial. Decorado con motivos aztecas, fue el balón con el que Maradona marcó la "Mano de Dios" y el "Gol del Siglo".', image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&h=400&fit=crop&q=80', color: '#006847' },
  { year: 1990, name: 'Etrusco Unico', host: 'Italia', desc: 'Inspirado en la antigua historia etrusca de Italia, presentaba cabezas de león como elemento decorativo. Incorporó una capa interna de espuma de poliuretano para mayor impermeabilidad.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop&q=80', color: '#009246' },
  { year: 1994, name: 'Questra', host: 'Estados Unidos', desc: 'Su nombre proviene de la búsqueda de las estrellas. Utilizó una capa de espuma de polietileno que le dio mayor velocidad y suavidad al toque, perfecto para el juego estadounidense.', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=600&h=400&fit=crop&q=80', color: '#002868' },
  { year: 1998, name: 'Tricolore', host: 'Francia', desc: 'El primer balón multicolor del Mundial, decorado con gallos azules, blancos y rojos en honor a la bandera francesa. Incorporó microburbujas de gas para mayor durabilidad y uniformidad.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&q=80', color: '#002654' },
  { year: 2002, name: 'Fevernova', host: 'Corea/Japón', desc: 'Rompió con el diseño Tango que dominó 24 años. Su exterior con motivos asiáticos en dorado, rojo y gris reflejaba la cultura oriental. Mejoró la precisión de los disparos.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&q=80', color: '#C60C30' },
  { year: 2006, name: '+Teamgeist', host: 'Alemania', desc: 'Revolución total: solo 14 paneles en lugar de 32, unidos térmicamente sin costuras. Esto creó una superficie más suave y esférica, mejorando la trayectoria y el control del balón.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&q=80', color: '#1A1A1A' },
  { year: 2010, name: 'Jabulani', host: 'Sudáfrica', desc: 'Nombre que significa "celebrar" en zulú. Con solo 8 paneles 3D, fue el balón más esférico jamás creado. Generó controversia entre porteros por su trayectoria impredecible en disparos lejanos.', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop&q=80', color: '#FFD700' },
  { year: 2014, name: 'Brazuca', host: 'Brasil', desc: 'Nombrado por votación popular en Brasil, significa "brasileño" en argot. Con 6 paneles idénticos unidos térmicamente, ofreció excelente agarre y aerodinámica. Fue muy elogiado por los jugadores.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop&q=80', color: '#006B2D' },
  { year: 2018, name: 'Telstar 18', host: 'Rusia', desc: 'Homenaje al icónico Telstar de 1970 con un diseño actualizado en píxeles grises. Fue el primer balón del Mundial con chip NFC integrado, que permitía acceder a contenido exclusivo.', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop&q=80', color: '#C8102E' },
  { year: 2022, name: 'Al Rihla', host: 'Catar', desc: 'Significa "El Viaje" en árabe. Inspirado en la cultura, arquitectura y barcos catarís. Fue el balón más rápido en la historia del Mundial gracias a su texturizado Speedshell y paneles de poliuretano.', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop&q=80', color: '#8D1B3D' },
  { year: 2026, name: 'Por revelar', host: 'USA/México/Canadá', desc: 'El balón oficial del Mundial 2026 aún no ha sido revelado. Se espera que Adidas presente un diseño que honre la diversidad cultural de los tres países anfitriones y la expansión a 48 equipos.', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&h=400&fit=crop&q=80', color: '#00C4B3' },
];

// ============================================================
// BALLS PAGE
// ============================================================
function WCBallsPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(320px, 45vh, 440px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1614632537190-23e4146777db?w=1200&h=600&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(26,26,46,0.8), rgba(15,52,96,0.7))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Historia</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(42px, 8vw, 72px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Balones del Mundial</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>De 1970 a 2026 — La evolución del balón oficial</p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)', maxWidth: 900, margin: '0 auto' }}>
        {BALLS_DATA.map((ball, i) => (
          <BallCard key={ball.year} ball={ball} tweaks={tweaks} index={i} isLast={i === BALLS_DATA.length - 1} />
        ))}
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>
          ← Volver al inicio
        </button>
      </section>
    </div>
  );
}

function BallCard({ ball, tweaks, index, isLast }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 12 : 0;

  return (
    <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', marginBottom: isLast ? 0 : 40, position: 'relative' }}>
      {/* Timeline line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 48 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: ball.color, border: `3px solid ${dark ? '#1a1a28' : '#fafafa'}`, boxShadow: `0 0 0 2px ${ball.color}44`, zIndex: 2 }}></div>
        {!isLast && <div style={{ width: 2, flex: 1, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginTop: -1 }}></div>}
      </div>

      {/* Card */}
      <div style={{
        flex: 1, borderRadius: radius, overflow: 'hidden',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
      }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Image */}
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <img src={ball.image} alt={ball.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.05)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${ball.color}aa, ${ball.color}44)`, mixBlendMode: 'multiply' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}></div>
          <div style={{ position: 'absolute', bottom: 14, left: 16, zIndex: 2 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 36, color: '#fff', lineHeight: 1 }}>{ball.year}</span>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '4px 12px' }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, color: '#fff' }}>{ball.host}</span>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 22, color: dark ? '#fff' : '#111', textTransform: 'uppercase', margin: '0 0 8px', letterSpacing: 0.5 }}>{ball.name}</h3>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)', lineHeight: 1.6, margin: 0 }}>{ball.desc}</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WCBallsPage });