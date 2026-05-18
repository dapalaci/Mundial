const { useState, useEffect, useCallback } = React;

// ============================================================
// WORLD CUP HISTORY DATA
// ============================================================
const WC_HISTORY = [
  { year: 1930, host: 'Uruguay',      champion: 'Uruguay',   runnerUp: 'Argentina',      color: '#0038A8', logo: 'assets/world-cup-1930-footylogos.svg',
    image: 'https://images.unsplash.com/photo-1615236490988-ec5970e3e78e?w=900&h=500&fit=crop&q=80',
    desc: 'El primer Mundial de la historia se celebró en Uruguay, con solo 13 equipos participantes. Uruguay ganó la final 4-2 ante Argentina en el Estadio Centenario de Montevideo ante 93,000 espectadores.' },

  { year: 1934, host: 'Italia',        champion: 'Italia',    runnerUp: 'Checoslovaquia', color: '#009246', logo: 'assets/world-cup-1934-footylogos.svg',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&h=500&fit=crop&q=80',
    desc: 'Italia organizó y ganó su primer título en un torneo marcado por la propaganda fascista de Mussolini. Fue el primer Mundial con fase clasificatoria y el primero transmitido por radio.' },

  { year: 1938, host: 'Francia',       champion: 'Italia',    runnerUp: 'Hungría',        color: '#002654', logo: 'assets/world-cup-1938-footylogos.svg',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&h=500&fit=crop&q=80',
    desc: 'Italia revalidó su título en Francia, convirtiéndose en el primer bicampeón. El torneo se jugó bajo la sombra de la inminente Segunda Guerra Mundial, que suspendería el Mundial hasta 1950.' },

  { year: 1950, host: 'Brasil',        champion: 'Uruguay',   runnerUp: 'Brasil',         color: '#006B2D', logo: 'assets/world-cup-1950-footylogos.svg',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=900&h=500&fit=crop&q=80',
    desc: 'El "Maracanazo": Uruguay derrotó a Brasil 2-1 en la final disputada ante 200,000 personas en el Maracanã. Es considerada la mayor sorpresa en la historia del fútbol.' },

  { year: 1954, host: 'Suiza',         champion: 'Alemania',  runnerUp: 'Hungría',        color: '#D52B1E', logo: 'assets/world-cup-1954-footylogos.svg',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=900&h=500&fit=crop&q=80',
    desc: 'El "Milagro de Berna": Alemania venció 3-2 a la favorita Hungría en la final. Hungría llegó invicta en 4 años y lideraba 2-0. Esta victoria fue clave para la reconstrucción moral de Alemania.' },

  { year: 1958, host: 'Suecia',        champion: 'Brasil',    runnerUp: 'Suecia',         color: '#006AA7', logo: 'assets/world-cup-1958-footylogos.svg',
    image: 'assets/Pele-scores-the-3-1-goal-past-Swedens-Orvar-Bergmark-at-Swed (1).jpeg',
    photo: 'Pelé marca el 3-1 ante el portero sueco Orvar Bergmark en la Final del Mundial de Suecia 1958',
    desc: 'Un joven Pelé de 17 años deslumbró al mundo. Brasil ganó su primer título con un fútbol revolucionario, venciendo 5-2 a Suecia en la final. Nació la leyenda del "jogo bonito".' },

  { year: 1962, host: 'Chile',         champion: 'Brasil',    runnerUp: 'Checoslovaquia', color: '#D52B1E', logo: 'assets/world-cup-1962-footylogos.svg',
    image: 'assets/1962-World-Cup-Brazil-v-Czechoslovakia-Vava-of-Brazil-scores (1).jpeg',
    photo: 'Vavá de Brasil marca ante Checoslovaquia en la Final del Mundial de Chile 1962',
    desc: 'Brasil revalidó su título sin Pelé, lesionado en la fase de grupos. Garrincha se convirtió en la estrella del torneo. El Mundial se celebró pese a un devastador terremoto en 1960.' },

  { year: 1966, host: 'Inglaterra',    champion: 'Inglaterra',runnerUp: 'Alemania',       color: '#C8102E', logo: 'assets/world-cup-1966-footylogos.svg',
    image: 'assets/Sport-Football-pic-30th-July-1966-1966-World-Cup-Final-at-We (1).jpeg',
    photo: 'La Final del Mundial de 1966 en Wembley entre Inglaterra y Alemania Occidental, 30 de julio de 1966',
    desc: 'Inglaterra ganó su único título con el polémico "gol fantasma" de Geoff Hurst en la prórroga. Hurst anotó un hat-trick en la final, hazaña única en una final mundialista.' },

  { year: 1970, host: 'México',        champion: 'Brasil',    runnerUp: 'Italia',         color: '#006847', logo: 'assets/world-cup-1970-footballlogos-org.svg',
    image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=900&h=500&fit=crop&q=80',
    desc: 'Considerado el mejor Mundial de la historia. Brasil de Pelé, Jairzinho, Rivelino y Tostão jugó el fútbol más bello jamás visto. Ganaron la final 4-1 ante Italia y se quedaron con la Copa Jules Rimet.' },

  { year: 1974, host: 'Alemania',      champion: 'Alemania',  runnerUp: 'Países Bajos',   color: '#1A1A1A', logo: 'assets/world-cup-1974-footballlogos-org.svg',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&h=500&fit=crop&q=80',
    desc: 'La "Naranja Mecánica" de Johan Cruyff revolucionó el fútbol con el "fútbol total", pero Alemania ganó la final 2-1. Beckenbauer levantó la copa como capitán en Múnich.' },

  { year: 1978, host: 'Argentina',     champion: 'Argentina', runnerUp: 'Países Bajos',   color: '#75AADB', logo: 'assets/world-cup-1978-footballlogos-org.svg',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=900&h=500&fit=crop&q=80',
    desc: 'Argentina ganó su primer Mundial como local en medio de una dictadura militar. Mario Kempes fue la estrella con 6 goles. El confeti del Monumental se convirtió en imagen icónica.' },

  { year: 1982, host: 'España',        champion: 'Italia',    runnerUp: 'Alemania',       color: '#AA151B', logo: 'assets/world-cup-1982-footballlogos-org.svg',
    image: 'assets/Marco-Tardeill-celebrates-scoring-for-Italy-against-West-Ger (1).jpeg',
    photo: 'Marco Tardelli celebra con el famoso "grito Tardelli" su gol ante Alemania Occidental en la Final de España 1982',
    desc: 'Italia, liderada por Paolo Rossi (Bota de Oro con 6 goles), ganó su tercer título tras eliminar a Brasil y Alemania. El torneo amplió su formato a 24 equipos por primera vez.' },

  { year: 1986, host: 'México',        champion: 'Argentina', runnerUp: 'Alemania',       color: '#006847', logo: 'assets/world-cup-1986-footballlogos-org.svg',
    image: 'assets/79647699 (1).jpeg',
    photo: 'Diego Maradona lidera a Argentina en el Mundial de México 1986',
    desc: 'El Mundial de Maradona. La "Mano de Dios" y el "Gol del Siglo" contra Inglaterra son los momentos más memorables. Argentina ganó su segundo título con Diego como figura indiscutible.' },

  { year: 1990, host: 'Italia',        champion: 'Alemania',  runnerUp: 'Argentina',      color: '#009246', logo: 'assets/world-cup-1990-footballlogos-org.svg',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&h=500&fit=crop&q=80',
    desc: 'Conocido como "Italia 90" y sus "Noches Mágicas". Alemania se vengó de Argentina en la final más aburrida (1-0 con penal). Camerún de Roger Milla fue la gran sorpresa del torneo.' },

  { year: 1994, host: 'Estados Unidos',champion: 'Brasil',    runnerUp: 'Italia',         color: '#002868', logo: 'assets/world-cup-1994-footballlogos-org.svg',
    image: 'assets/Italy-s-Roberto-Baggio-hangs-his-head-as-Brazil-s-Taffarel-c (1).jpeg',
    photo: 'Roberto Baggio cabizbajo tras fallar el penal decisivo ante Brasil en la Final de EE.UU. 1994',
    desc: 'La primera final decidida por penales: Brasil venció a Italia. La imagen de Roberto Baggio fallando el penal decisivo es icónica. Romário fue el mejor jugador del torneo.' },

  { year: 1998, host: 'Francia',       champion: 'Francia',   runnerUp: 'Brasil',         color: '#002654', logo: 'assets/world-cup-1998-footballlogos-org.svg',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=500&fit=crop&q=80',
    desc: 'Francia ganó su primer título como local con Zidane anotando dos cabezazos en la final (3-0 a Brasil). El misterio de la convulsión de Ronaldo antes de la final sigue sin resolverse.' },

  { year: 2002, host: 'Corea/Japón',   champion: 'Brasil',    runnerUp: 'Alemania',       color: '#C60C30', logo: 'assets/world-cup-2002-footballlogos-org.svg',
    image: 'assets/Ronaldo-scored-in-the-2002-FIFA-World-Cup-final (1).jpeg',
    photo: 'Ronaldo celebra su gol en la Final del Mundial de Corea/Japón 2002 ante Alemania',
    desc: 'El primer Mundial en Asia y coorganizado por dos países. Ronaldo se redimió con 8 goles y Brasil ganó su quinto título (2-0 a Alemania). Corea del Sur llegó a semifinales en una hazaña histórica.' },

  { year: 2006, host: 'Alemania',      champion: 'Italia',    runnerUp: 'Francia',        color: '#1A1A1A', logo: 'assets/world-cup-2006-footballlogos-org.svg',
    image: 'assets/FIFAPLS_100EXTHL_2006ITAvFRA_TMB (1).jpeg',
    photo: 'Italia vs Francia en la Final del Mundial de Alemania 2006',
    desc: 'La final recordada por el cabezazo de Zidane a Materazzi. Italia ganó por penales tras el 1-1. Fue el adiós de Zidane y el nacimiento de las Fan Fests oficiales.' },

  { year: 2010, host: 'Sudáfrica',     champion: 'España',    runnerUp: 'Países Bajos',   color: '#AA151B', logo: 'assets/world-cup-2010-footballlogos-org.svg',
    image: 'assets/Andres-Iniesta-celebrates-scoring-for-Spain-in-the-South-Afr (1).jpeg',
    photo: 'Andrés Iniesta celebra el gol de la victoria de España en la Final de Sudáfrica 2010 ante Países Bajos',
    desc: 'El primer Mundial africano. España ganó su primer título con el gol de Iniesta en la prórroga de la final. El tiki-taka español conquistó el mundo al son de las vuvuzelas.' },

  { year: 2014, host: 'Brasil',        champion: 'Alemania',  runnerUp: 'Argentina',      color: '#006B2D', logo: 'assets/world-cup-2014-footballlogos-org.svg',
    image: 'assets/Mario-Gotze-of-Germany-scores-his-team-s-first-goal-past-Ser (1).jpeg',
    photo: 'Mario Götze marca el gol de la victoria para Alemania ante Argentina en la Final de Brasil 2014',
    desc: 'El histórico 7-1 de Alemania a Brasil en semifinales, el "Mineirazo". Alemania ganó la final 1-0 con gol de Götze en la prórroga ante Argentina. James Rodríguez fue Bota de Oro.' },

  { year: 2018, host: 'Rusia',         champion: 'Francia',   runnerUp: 'Croacia',        color: '#002654', logo: 'assets/world-cup-2018-footballlogos-org.svg',
    image: 'assets/France-v-Croatia-2018-FIFA-World-Cup-Russia-Final (1).jpeg',
    photo: 'Francia vs Croacia en la Final del Mundial de Rusia 2018 — Francia campeón 4-2',
    desc: 'Francia ganó su segundo título con una generación dorada liderada por Mbappé. Croacia, con solo 4 millones de habitantes, llegó a su primera final. El VAR se usó por primera vez.' },

  { year: 2022, host: 'Catar',         champion: 'Argentina', runnerUp: 'Francia',        color: '#8D1B3D', logo: 'assets/world-cup-2022-footballlogos-org.svg',
    image: 'assets/Argentina-v-France-Final-FIFA-World-Cup-Qatar-2022 (1).jpeg',
    photo: 'Argentina vs Francia en la mejor Final de la historia del fútbol — Mundial de Catar 2022',
    desc: 'La mejor final de la historia: Argentina 3-3 Francia (4-2 en penales). Messi ganó su anhelado Mundial a los 35 años. Mbappé anotó un hat-trick en la final. El primer Mundial invernal.' },
];

// ============================================================
// HISTORY MODAL
// ============================================================
function WCHistoryModal({ data, tweaks, onClose }) {
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 16 : 0;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        animation: 'wc-fade-in 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: dark ? '#0f0f1a' : '#fff',
          borderRadius: r + 4,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 840,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)', border: 'none',
            color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            transition: 'background 0.2s ease',
          }}
        >
          ×
        </button>

        {/* Full image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <img
            src={data.image}
            alt={data.photo || `Mundial ${data.year}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)` }} />
          {data.logo && (
            <div style={{ position: 'absolute', top: 16, left: 20, height: 60, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}>
              <img src={data.logo} alt="" style={{ height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 16, left: 20, right: 60 }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
              fontSize: 'clamp(36px, 7vw, 56px)', color: '#fff', lineHeight: 0.95,
              textTransform: 'uppercase', letterSpacing: -1,
            }}>
              {data.year}
            </div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
              {data.host}
            </div>
          </div>
        </div>

        {/* Photo caption */}
        {data.photo && (
          <div style={{
            padding: '10px 20px 0',
            fontFamily: "'Barlow', sans-serif", fontSize: 11,
            fontStyle: 'italic', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
            borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            paddingBottom: 10,
          }}>
            {data.photo}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '20px 20px 28px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: 0.5,
              padding: '6px 14px', borderRadius: tweaks.roundedCards ? 999 : 4,
              background: data.color + '22', color: data.color,
              border: `1px solid ${data.color}44`,
            }}>
              Campeon: {data.champion}
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: 0.5,
              padding: '6px 14px', borderRadius: tweaks.roundedCards ? 999 : 4,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
            }}>
              Finalista: {data.runnerUp}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 15, lineHeight: 1.7,
            color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)',
            margin: 0,
          }}>
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HISTORY PAGE
// ============================================================
function WCHistoryPage({ tweaks, onBack }) {
  const [selected, setSelected] = useState(null);
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(280px, 40vh, 400px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=500&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(10,10,30,0.85), rgba(40,20,60,0.65))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>1930 — 2022</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 68px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Historia de los Mundiales</h1>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)', maxWidth: 900, margin: '0 auto' }}>
        {WC_HISTORY.map((wc, i) => (
          <HistoryEntry
            key={wc.year}
            data={wc}
            tweaks={tweaks}
            isLast={i === WC_HISTORY.length - 1}
            onClick={() => setSelected(wc)}
          />
        ))}
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>← Volver al inicio</button>
      </section>

      {selected && (
        <WCHistoryModal
          data={selected}
          tweaks={tweaks}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function HistoryEntry({ data, tweaks, isLast, onClick }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 12 : 0;
  const hasLocalImg = data.photo != null;

  return (
    <div style={{ display: 'flex', gap: 'clamp(14px, 2.5vw, 28px)', marginBottom: isLast ? 0 : 36 }}>
      {/* Timeline dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 44 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: data.color, border: `3px solid ${dark ? '#0e0e18' : '#fafafa'}`, boxShadow: `0 0 0 2px ${data.color}44`, zIndex: 2 }}></div>
        {!isLast && <div style={{ width: 2, flex: 1, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}></div>}
      </div>

      {/* Card */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: 1, borderRadius: r, overflow: 'hidden', cursor: 'pointer',
          border: `1px solid ${hover ? data.color + '55' : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')}`,
          background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          boxShadow: hover ? `0 12px 32px rgba(0,0,0,0.18), 0 0 0 1px ${data.color}33` : 'none',
        }}
      >
        {/* Image header */}
        <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
          <img
            src={data.image}
            alt=""
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center top',
              transform: hover ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${data.color}aa, ${data.color}44)`, mixBlendMode: 'multiply' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }}></div>

          {data.logo && (
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 12px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}>
              <img src={data.logo} alt={`Logo ${data.year}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}

          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 150 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#fff' }}>{data.year}</span>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', marginLeft: 10 }}>{data.host}</span>
          </div>

          {/* "Ver más" hint */}
          <div style={{
            position: 'absolute', bottom: 12, right: 14,
            fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 1.5,
            color: 'rgba(255,255,255,0.5)',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(4px)',
            transition: 'all 0.25s ease',
          }}>
            {hasLocalImg ? 'Ver foto' : 'Ver más'} →
          </div>
        </div>

        {/* Text content */}
        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, padding: '4px 12px', background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', borderRadius: tweaks.roundedCards ? 999 : 4, color: dark ? '#fff' : '#111' }}>🏆 {data.champion}</span>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, padding: '4px 12px', background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderRadius: tweaks.roundedCards ? 999 : 4, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>🥈 {data.runnerUp}</span>
            {hasLocalImg && (
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, padding: '4px 10px', background: data.color + '18', borderRadius: tweaks.roundedCards ? 999 : 4, color: data.color }}>📷 Foto histórica</span>
            )}
          </div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0 }}>{data.desc}</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WCHistoryPage });
