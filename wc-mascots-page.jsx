const { useState, useEffect } = React;

// ============================================================
// WORLD CUP MASCOTS DATA
// ============================================================
const MASCOTS_DATA = [
  { year: 1966, name: 'World Cup Willie', host: 'Inglaterra', animal: 'León', desc: 'El primer mascota oficial de un Mundial. Un león vestido con la bandera del Reino Unido que se convirtió en un fenómeno de merchandising. Diseñado por Reg Hoye, Willie estableció la tradición de tener mascotas en las Copas del Mundo.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&q=80', color: '#C8102E' },
  { year: 1970, name: 'Juanito', host: 'México', animal: 'Niño con sombrero', desc: 'Un niño con un gran sombrero de charro, representando la cultura mexicana. Aunque no fue tan comercializado como Willie, Juanito capturó el espíritu alegre y festivo de México como anfitrión.', image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&h=400&fit=crop&q=80', color: '#006847' },
  { year: 1974, name: 'Tip y Tap', host: 'Alemania', animal: 'Dos niños', desc: 'Primera vez que un Mundial tuvo dos mascotas: dos niños alemanes con las letras "WM" (Weltmeisterschaft). Representaban la unión y la amistad a través del deporte en plena Guerra Fría.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&q=80', color: '#DD0000' },
  { year: 1978, name: 'Gauchito', host: 'Argentina', animal: 'Niño gaucho', desc: 'Un jovial gauchito argentino con pañuelo, sombrero y fusta. Representaba la tradición gauchesca del campo argentino y se convirtió en símbolo de la primera Copa del Mundo ganada por Argentina.', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop&q=80', color: '#75AADB' },
  { year: 1982, name: 'Naranjito', host: 'España', animal: 'Naranja', desc: 'Una simpática naranja con cara sonriente vestida con el uniforme de la selección española. Naranjito se convirtió en un ícono cultural en España, protagonizando su propia serie de televisión animada.', image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=600&h=400&fit=crop&q=80', color: '#F4A100' },
  { year: 1986, name: 'Pique', host: 'México', animal: 'Chile jalapeño', desc: 'Un chile jalapeño con bigote y sombrero charro. Pique representaba el picante carácter mexicano. Este fue el Mundial de Maradona y el famoso "Gol del Siglo" contra Inglaterra.', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&h=400&fit=crop&q=80', color: '#CE1126' },
  { year: 1990, name: 'Ciao', host: 'Italia', animal: 'Figura abstracta', desc: 'La mascota más abstracta en la historia del Mundial: una figura estilizada hecha de cubos en los colores de la bandera italiana. Su diseño moderno fue controversial pero innovador para la época.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop&q=80', color: '#009246' },
  { year: 1994, name: 'Striker', host: 'Estados Unidos', animal: 'Perro', desc: 'Un perro de raza mestiza con el uniforme de Estados Unidos. Striker fue diseñado para atraer al público estadounidense al fútbol. Tenía una personalidad energética acorde con el espíritu americano.', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=600&h=400&fit=crop&q=80', color: '#002868' },
  { year: 1998, name: 'Footix', host: 'Francia', animal: 'Gallo', desc: 'Un gallo azul, símbolo nacional de Francia. Footix fue enormemente popular y se produjeron más de 3 millones de peluches. Su nombre combina "football" con el sufijo galo "-ix" (como Astérix).', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&q=80', color: '#002654' },
  { year: 2002, name: 'Spheriks', host: 'Corea/Japón', animal: 'Seres fantásticos', desc: 'Tres criaturas futuristas naranjas llamadas Ato, Kaz y Nik. Eran "seres de la atmósfera" que jugaban fútbol, representando la tecnología y la innovación de Corea y Japón.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&q=80', color: '#FF6600' },
  { year: 2006, name: 'Goleo VI y Pille', host: 'Alemania', animal: 'León y balón', desc: 'Un león parlante con su balón parlante llamado Pille. Goleo VI fue controvertido cuando la empresa que fabricaba los peluches quebró antes del torneo, pero el dúo se ganó el cariño del público.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&q=80', color: '#1A1A1A' },
  { year: 2010, name: 'Zakumi', host: 'Sudáfrica', animal: 'Leopardo', desc: 'Un leopardo verde y amarillo con pelo verde. "Za" por Sudáfrica y "kumi" por diez en varias lenguas africanas. Representaba la juventud, la alegría y el orgullo sudafricano en el primer Mundial africano.', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop&q=80', color: '#007A33' },
  { year: 2014, name: 'Fuleco', host: 'Brasil', animal: 'Armadillo', desc: 'Un armadillo de tres bandas brasileño, especie en peligro de extinción. Su nombre combina "fútbol" y "ecología". Fuleco buscaba concienciar sobre la conservación de la biodiversidad brasileña.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop&q=80', color: '#006B2D' },
  { year: 2018, name: 'Zabivaka', host: 'Rusia', animal: 'Lobo', desc: 'Un carismático lobo siberiano con gafas deportivas naranjas. "Zabivaka" significa "el que anota" en ruso. Fue elegido por votación popular entre más de 1 millón de votos de aficionados rusos.', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop&q=80', color: '#C8102E' },
  { year: 2022, name: "La'eeb", host: 'Catar', animal: 'Keffiyeh animada', desc: "Un personaje inspirado en la keffiyeh, el pañuelo tradicional árabe. La'eeb significa 'jugador súper habilidoso' en árabe. Era un ser del 'verso de las mascotas', un mundo paralelo donde viven todas las mascotas mundialistas.", image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop&q=80', color: '#8D1B3D' },
  { year: 2026, name: 'Por revelar', host: 'USA/México/Canadá', animal: 'Próximamente', desc: 'La mascota oficial del Mundial 2026 aún no ha sido revelada. Se espera que represente la diversidad cultural de los tres países anfitriones y el espíritu de unión del torneo más grande de la historia.', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&h=400&fit=crop&q=80', color: '#00C4B3' },
];

// ============================================================
// MASCOTS PAGE
// ============================================================
function WCMascotsPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(320px, 45vh, 440px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=600&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(45,19,44,0.8), rgba(199,44,65,0.6))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Historia</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(42px, 8vw, 72px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Mascotas del Mundial</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>De 1966 a 2026 — Los personajes que dieron vida a cada torneo</p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 30vw, 360px), 1fr))', gap: 'clamp(12px, 1.5vw, 20px)' }}>
          {MASCOTS_DATA.map((m, i) => (
            <MascotCard key={m.year} mascot={m} tweaks={tweaks} />
          ))}
        </div>
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>
          ← Volver al inicio
        </button>
      </section>
    </div>
  );
}

function MascotCard({ mascot, tweaks }) {
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 12 : 0;

  return (
    <div style={{
      borderRadius: radius, overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
      transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      transition: 'all 0.3s ease',
      boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.15)' : 'none',
      cursor: 'pointer',
    }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setExpanded(!expanded)}>
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img src={mascot.image} alt={mascot.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${mascot.color}bb, ${mascot.color}55)`, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}></div>
        {/* Year + host */}
        <div style={{ position: 'absolute', bottom: 14, left: 16, zIndex: 2 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#fff', lineHeight: 1 }}>{mascot.year}</span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', marginLeft: 10 }}>{mascot.host}</span>
        </div>
        {/* Animal badge */}
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '4px 12px' }}>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>{mascot.animal}</span>
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: 18 }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#111', textTransform: 'uppercase', margin: '0 0 8px' }}>{mascot.name}</h3>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0, display: expanded ? 'block' : '-webkit-box', WebkitLineClamp: expanded ? 'none' : 3, WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden' }}>
          {mascot.desc}
        </p>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)', marginTop: 8, display: 'inline-block' }}>
          {expanded ? 'Leer menos ↑' : 'Leer más ↓'}
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { WCMascotsPage });