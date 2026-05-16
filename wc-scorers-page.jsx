const { useState, useEffect } = React;

// ============================================================
// TOP SCORERS DATA
// ============================================================
const TOP_SCORERS = [
  { rank: 1, name: 'Miroslav Klose', country: 'Alemania', goals: 16, tournaments: '2002, 2006, 2010, 2014', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=340&fit=crop&q=75', flag: '🇩🇪', color: '#1A1A1A' },
  { rank: 2, name: 'Ronaldo Nazário', country: 'Brasil', goals: 15, tournaments: '1998, 2002, 2006', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&h=340&fit=crop&q=75', flag: '🇧🇷', color: '#006B2D' },
  { rank: 3, name: 'Gerd Müller', country: 'Alemania', goals: 14, tournaments: '1970, 1974', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=340&fit=crop&q=75', flag: '🇩🇪', color: '#DD0000' },
  { rank: 4, name: 'Just Fontaine', country: 'Francia', goals: 13, tournaments: '1958', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=340&fit=crop&q=75', flag: '🇫🇷', color: '#002654' },
  { rank: 5, name: 'Pelé', country: 'Brasil', goals: 12, tournaments: '1958, 1962, 1966, 1970', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=500&h=340&fit=crop&q=75', flag: '🇧🇷', color: '#D4AC0D' },
  { rank: 6, name: 'Sándor Kocsis', country: 'Hungría', goals: 11, tournaments: '1954', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=500&h=340&fit=crop&q=75', flag: '🇭🇺', color: '#436F4D' },
  { rank: 7, name: 'Jürgen Klinsmann', country: 'Alemania', goals: 11, tournaments: '1990, 1994, 1998', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=340&fit=crop&q=75', flag: '🇩🇪', color: '#1A1A1A' },
  { rank: 8, name: 'Helmut Rahn', country: 'Alemania', goals: 10, tournaments: '1954, 1958', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=340&fit=crop&q=75', flag: '🇩🇪', color: '#DD0000' },
  { rank: 9, name: 'Gabriel Batistuta', country: 'Argentina', goals: 10, tournaments: '1994, 1998, 2002', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=500&h=340&fit=crop&q=75', flag: '🇦🇷', color: '#75AADB' },
  { rank: 10, name: 'Gary Lineker', country: 'Inglaterra', goals: 10, tournaments: '1986, 1990', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=340&fit=crop&q=75', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#C8102E' },
  { rank: 11, name: 'Teófilo Cubillas', country: 'Perú', goals: 10, tournaments: '1970, 1978', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&h=340&fit=crop&q=75', flag: '🇵🇪', color: '#D91023' },
  { rank: 12, name: 'Thomas Müller', country: 'Alemania', goals: 10, tournaments: '2010, 2014, 2018', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=340&fit=crop&q=75', flag: '🇩🇪', color: '#1A1A1A' },
  { rank: 13, name: 'Lionel Messi', country: 'Argentina', goals: 13, tournaments: '2006, 2010, 2014, 2018, 2022', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=340&fit=crop&q=75', flag: '🇦🇷', color: '#75AADB' },
  { rank: 14, name: 'Kylian Mbappé', country: 'Francia', goals: 12, tournaments: '2018, 2022', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=340&fit=crop&q=75', flag: '🇫🇷', color: '#002654' },
];

// ============================================================
// SCORERS PAGE
// ============================================================
function WCScorersPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: 'clamp(280px, 40vh, 400px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=500&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(20,10,5,0.85), rgba(80,30,10,0.6))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Récords</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 68px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Goleadores Históricos</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 30vw, 350px), 1fr))', gap: 16 }}>
          {TOP_SCORERS.map((s, i) => <ScorerCard key={i} scorer={s} tweaks={tweaks} />)}
        </div>
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>← Volver al inicio</button>
      </section>
    </div>
  );
}

function ScorerCard({ scorer, tweaks }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 12 : 0;
  return (
    <div style={{ borderRadius: r, overflow: 'hidden', border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, background: dark ? 'rgba(255,255,255,0.03)' : '#fff', transform: hover ? 'translateY(-3px)' : 'translateY(0)', transition: 'all 0.3s ease', boxShadow: hover ? '0 10px 28px rgba(0,0,0,0.14)' : 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
        <img src={scorer.image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${scorer.color}cc, ${scorer.color}55)`, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}></div>
        <div style={{ position: 'absolute', top: 12, left: 14, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, color: 'rgba(255,255,255,0.12)', lineHeight: 1 }}>#{scorer.rank}</div>
        <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 28 }}>{scorer.flag}</div>
        <div style={{ position: 'absolute', bottom: 12, left: 14, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '4px 14px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: '#fff' }}>{scorer.goals} <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.7 }}>goles</span></span>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.1 }}>{scorer.name}</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', marginTop: 4 }}>{scorer.country}</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginTop: 6 }}>Mundiales: {scorer.tournaments}</div>
      </div>
    </div>
  );
}

Object.assign(window, { WCScorersPage });