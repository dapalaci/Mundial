const { useState, useEffect } = React;

// ============================================================
// WORLD CUP FINALS DATA
// ============================================================
const FINALS_DATA = [
  { year: 1930, match: 'Uruguay 4 – 2 Argentina', venue: 'Estadio Centenario, Montevideo', attendance: '93,000', scorers: 'Dorado, Cea, Iriarte, Castro — Peucelle, Stábile', image: 'assets/historia-1930.webp', color: '#0038A8' },
  { year: 1934, match: 'Italia 2 – 1 Checoslovaquia', venue: 'Estadio Nacional, Roma', attendance: '55,000', scorers: 'Orsi, Schiavio — Puč', extra: 'Prórroga', image: 'assets/historia-1934.webp', color: '#009246' },
  { year: 1938, match: 'Italia 4 – 2 Hungría', venue: 'Stade Olympique, París', attendance: '45,000', scorers: 'Colaussi (2), Piola (2) — Titkos, Sárosi', image: 'assets/historia-1938.webp', color: '#002654' },
  { year: 1950, match: 'Uruguay 2 – 1 Brasil', venue: 'Maracanã, Río de Janeiro', attendance: '199,854', scorers: 'Schiaffino, Ghiggia — Friaça', extra: 'Fase final (no hubo final única)', image: 'assets/historia-1950.webp', color: '#006B2D' },
  { year: 1954, match: 'Alemania 3 – 2 Hungría', venue: 'Wankdorfstadion, Berna', attendance: '62,500', scorers: 'Morlock, Rahn (2) — Puskás, Czibor', extra: 'Milagro de Berna', image: 'assets/historia-1954.webp', color: '#D52B1E' },
  { year: 1958, match: 'Brasil 5 – 2 Suecia', venue: 'Råsunda, Estocolmo', attendance: '51,800', scorers: 'Vavá (2), Pelé (2), Zagallo — Liedholm, Simonsson', image: 'assets/Pele-scores-the-3-1-goal-past-Swedens-Orvar-Bergmark-at-Swed (1).jpeg', color: '#006AA7' },
  { year: 1962, match: 'Brasil 3 – 1 Checoslovaquia', venue: 'Estadio Nacional, Santiago', attendance: '68,679', scorers: 'Amarildo, Zito, Vavá — Masopust', image: 'assets/1962-World-Cup-Brazil-v-Czechoslovakia-Vava-of-Brazil-scores (1).jpeg', color: '#D52B1E' },
  { year: 1966, match: 'Inglaterra 4 – 2 Alemania', venue: 'Wembley, Londres', attendance: '96,924', scorers: 'Hurst (3), Peters — Haller, Weber', extra: 'Prórroga · Gol fantasma', image: 'assets/Sport-Football-pic-30th-July-1966-1966-World-Cup-Final-at-We (1).jpeg', color: '#C8102E' },
  { year: 1970, match: 'Brasil 4 – 1 Italia', venue: 'Estadio Azteca, CDMX', attendance: '107,412', scorers: 'Pelé, Gérson, Jairzinho, Carlos Alberto — Boninsegna', image: 'assets/historia-1970.webp', color: '#006847' },
  { year: 1974, match: 'Alemania 2 – 1 Países Bajos', venue: 'Olympiastadion, Múnich', attendance: '75,200', scorers: 'Breitner, Müller — Neeskens (pen)', image: 'assets/historia-1974.webp', color: '#1A1A1A' },
  { year: 1978, match: 'Argentina 3 – 1 Países Bajos', venue: 'Monumental, Buenos Aires', attendance: '71,483', scorers: 'Kempes (2), Bertoni — Nanninga', extra: 'Prórroga', image: 'assets/historia-1978.webp', color: '#75AADB' },
  { year: 1982, match: 'Italia 3 – 1 Alemania', venue: 'Santiago Bernabéu, Madrid', attendance: '90,000', scorers: 'Rossi, Tardelli, Altobelli — Breitner', image: 'assets/Marco-Tardeill-celebrates-scoring-for-Italy-against-West-Ger (1).jpeg', color: '#AA151B' },
  { year: 1986, match: 'Argentina 3 – 2 Alemania', venue: 'Estadio Azteca, CDMX', attendance: '114,600', scorers: 'Brown, Valdano, Burruchaga — Rummenigge, Völler', image: 'assets/79647699 (1).jpeg', color: '#75AADB' },
  { year: 1990, match: 'Alemania 1 – 0 Argentina', venue: 'Olímpico, Roma', attendance: '73,603', scorers: 'Brehme (pen)', image: 'assets/historia-1990.webp', color: '#1A1A1A' },
  { year: 1994, match: 'Brasil 0 – 0 Italia', venue: 'Rose Bowl, Pasadena', attendance: '94,194', scorers: 'Brasil gana 3-2 en penales', extra: 'Penales · Baggio falla', image: 'assets/Italy-s-Roberto-Baggio-hangs-his-head-as-Brazil-s-Taffarel-c (1).jpeg', color: '#002868' },
  { year: 1998, match: 'Francia 3 – 0 Brasil', venue: 'Stade de France, París', attendance: '80,000', scorers: 'Zidane (2), Petit', image: 'assets/historia-1998.webp', color: '#002654' },
  { year: 2002, match: 'Brasil 2 – 0 Alemania', venue: 'Yokohama, Japón', attendance: '69,029', scorers: 'Ronaldo (2)', image: 'assets/Ronaldo-scored-in-the-2002-FIFA-World-Cup-final (1).jpeg', color: '#C60C30' },
  { year: 2006, match: 'Italia 1 – 1 Francia', venue: 'Olympiastadion, Berlín', attendance: '69,000', scorers: 'Materazzi — Zidane (pen) · Italia gana 5-3 en penales', extra: 'Cabezazo de Zidane', image: 'assets/FIFAPLS_100EXTHL_2006ITAvFRA_TMB (1).jpeg', color: '#1A1A1A' },
  { year: 2010, match: 'España 1 – 0 Países Bajos', venue: 'Soccer City, Johannesburgo', attendance: '84,490', scorers: 'Iniesta (116\')', extra: 'Prórroga', image: 'assets/Andres-Iniesta-celebrates-scoring-for-Spain-in-the-South-Afr (1).jpeg', color: '#007A33' },
  { year: 2014, match: 'Alemania 1 – 0 Argentina', venue: 'Maracanã, Río de Janeiro', attendance: '74,738', scorers: 'Götze (113\')', extra: 'Prórroga', image: 'assets/Mario-Gotze-of-Germany-scores-his-team-s-first-goal-past-Ser (1).jpeg', color: '#006B2D' },
  { year: 2018, match: 'Francia 4 – 2 Croacia', venue: 'Luzhnikí, Moscú', attendance: '78,011', scorers: 'Griezmann (pen), Griezmann, Pogba, Mbappé — Mandžukić (ag), Perišić', image: 'assets/France-v-Croatia-2018-FIFA-World-Cup-Russia-Final (1).jpeg', color: '#C8102E' },
  { year: 2022, match: 'Argentina 3 – 3 Francia', venue: 'Lusail, Catar', attendance: '88,966', scorers: 'Messi (2), Di María — Mbappé (3) · Argentina gana 4-2 en penales', extra: 'La mejor final de la historia', image: 'assets/Argentina-v-France-Final-FIFA-World-Cup-Qatar-2022 (1).jpeg', color: '#8D1B3D' },
];

// ============================================================
// FINALS PAGE
// ============================================================
function WCFinalsPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: 'clamp(280px, 40vh, 400px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=1200&h=500&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(10,5,20,0.88), rgba(60,20,40,0.65))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>1930 — 2022</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 68px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Todas las Finales</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 35vw, 420px), 1fr))', gap: 16 }}>
          {FINALS_DATA.map(f => <FinalCard key={f.year} data={f} tweaks={tweaks} />)}
        </div>
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>← Volver al inicio</button>
      </section>
    </div>
  );
}

function FinalCard({ data, tweaks }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 12 : 0;

  return (
    <div style={{ borderRadius: r, overflow: 'hidden', border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, background: dark ? 'rgba(255,255,255,0.03)' : '#fff', transform: hover ? 'translateY(-3px)' : 'translateY(0)', transition: 'all 0.3s ease', boxShadow: hover ? '0 10px 28px rgba(0,0,0,0.14)' : 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ position: 'relative', height: 150, overflow: 'hidden' }}>
        <img src={data.image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${data.color}cc, ${data.color}55)`, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }}></div>
        <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#fff' }}>{data.year}</span>
          {data.extra && <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', borderRadius: tweaks.roundedCards ? 999 : 2, padding: '3px 10px', color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>{data.extra}</span>}
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.15, marginBottom: 6 }}>{data.match}</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: 8 }}>{data.venue} · {data.attendance} espectadores</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)', lineHeight: 1.5, padding: '8px 12px', background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)', borderRadius: tweaks.roundedCards ? 8 : 2 }}>
          ⚽ {data.scorers}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WCFinalsPage });