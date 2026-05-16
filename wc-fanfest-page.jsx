const { useState, useEffect } = React;

// ============================================================
// FAN FEST DATA
// ============================================================
const FANFEST_DATA = [
  {
    year: 2006, host: 'Alemania', title: 'El nacimiento del Fan Fest',
    desc: 'Alemania 2006 fue el primer Mundial en implementar las FIFA Fan Fests oficiales. Pantallas gigantes se instalaron en las principales ciudades alemanas, incluyendo Berlín, Múnich, y Hamburgo. La Fan Mile de Berlín atrajo a más de 1 millón de personas durante la final. Este concepto revolucionó la forma de vivir el Mundial fuera del estadio.',
    stats: { attendance: '18 millones', cities: 12, screens: 12 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700&h=460&fit=crop&q=80', caption: 'Fan Fest Berlín 2006' },
      { src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&h=460&fit=crop&q=80', caption: 'Ambiente en las calles de Alemania' },
      { src: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=700&h=460&fit=crop&q=80', caption: 'Celebración multitudinaria' },
    ],
    videos: [
      { id: 'fxdkqFAyUjk', title: 'FIFA Fan Fest Alemania 2006' },
    ],
    color: '#1A1A1A',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=500&fit=crop&q=80',
  },
  {
    year: 2010, host: 'Sudáfrica', title: 'África vibra con el fútbol',
    desc: 'El primer Mundial africano trajo las Fan Fests a un nuevo continente. Las vuvuzelas se convirtieron en el sonido icónico mientras millones celebraban en las calles de Johannesburgo, Ciudad del Cabo y Durban. El ambiente fue eléctrico, con música, danza y una fusión cultural sin precedentes.',
    stats: { attendance: '6 millones', cities: 10, screens: 20 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=700&h=460&fit=crop&q=80', caption: 'Fan Fest Johannesburgo' },
      { src: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=700&h=460&fit=crop&q=80', caption: 'Cultura africana y fútbol' },
      { src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700&h=460&fit=crop&q=80', caption: 'Celebración sin límites' },
    ],
    videos: [
      { id: 'LGzmtIQMsE4', title: 'FIFA Fan Fest Sudáfrica 2010' },
    ],
    color: '#007A33',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop&q=80',
  },
  {
    year: 2014, host: 'Brasil', title: 'La fiesta más grande del mundo',
    desc: 'Brasil llevó las Fan Fests a otro nivel con la pasión sudamericana. Copacabana se convirtió en el epicentro con una pantalla gigante frente al mar. Más de 5 millones de personas visitaron solo la Fan Fest de Río de Janeiro. La música, el samba y el carnaval se fusionaron con el fútbol.',
    stats: { attendance: '20 millones', cities: 12, screens: 30 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=700&h=460&fit=crop&q=80', caption: 'Fan Fest Copacabana' },
      { src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=700&h=460&fit=crop&q=80', caption: 'Samba y fútbol en Río' },
      { src: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=700&h=460&fit=crop&q=80', caption: 'Fiesta brasileña' },
    ],
    videos: [
      { id: 'hNQCHufTz7s', title: 'FIFA Fan Fest Brasil 2014 Highlights' },
    ],
    color: '#006B2D',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop&q=80',
  },
  {
    year: 2018, host: 'Rusia', title: 'Rusia sorprende al mundo',
    desc: 'Las Fan Fests rusas sorprendieron por su hospitalidad y grandeza. La Plaza Roja y el Parque Gorki en Moscú fueron escenarios de celebraciones épicas. Con más de 7.7 millones de visitantes en total, Rusia demostró que el fútbol puede unir culturas de formas inesperadas.',
    stats: { attendance: '7.7 millones', cities: 11, screens: 25 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=700&h=460&fit=crop&q=80', caption: 'Fan Fest Moscú' },
      { src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700&h=460&fit=crop&q=80', caption: 'Aficionados de todo el mundo' },
      { src: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=700&h=460&fit=crop&q=80', caption: 'Celebración en la Plaza Roja' },
    ],
    videos: [
      { id: 'ZjcP_x8k3Pk', title: 'FIFA Fan Fest Rusia 2018' },
    ],
    color: '#C8102E',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=500&fit=crop&q=80',
  },
  {
    year: 2022, host: 'Catar', title: 'Innovación en el desierto',
    desc: 'Catar redefinió el concepto de Fan Fest con la mega Fan Zone en el Al Bidda Park de Doha, con capacidad para 40,000 personas. Fue el primer Fan Fest en un país del Golfo, con shows de artistas internacionales, hologramas y tecnología inmersiva. La cercanía entre estadios permitió vivir múltiples experiencias en un solo día.',
    stats: { attendance: '3 millones', cities: 1, screens: 8 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&h=460&fit=crop&q=80', caption: 'Fan Fest Doha' },
      { src: 'https://images.unsplash.com/photo-1586724237569-9c5b1fb0f040?w=700&h=460&fit=crop&q=80', caption: 'Tecnología e innovación' },
      { src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700&h=460&fit=crop&q=80', caption: 'Fiesta en el desierto' },
    ],
    videos: [
      { id: 'MXxDLxUFxEA', title: 'FIFA Fan Festival Qatar 2022' },
    ],
    color: '#8D1B3D',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=500&fit=crop&q=80',
  },
  {
    year: 2026, host: 'USA/México/Canadá', title: 'El Fan Fest más grande de la historia',
    desc: 'El Mundial 2026 promete el Fan Fest más grande y distribuido de la historia, con sedes en tres países y 16 ciudades. Se planean Fan Zones en Times Square (NYC), Zócalo (CDMX), Santa Monica Beach (LA), CN Tower (Toronto) y muchas más. Con tecnología AR/VR, conciertos masivos y activaciones interactivas, será la celebración definitiva del fútbol.',
    stats: { attendance: 'Estimado: 30+ millones', cities: 16, screens: 50 },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=700&h=460&fit=crop&q=80', caption: 'Nueva York — Times Square' },
      { src: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=700&h=460&fit=crop&q=80', caption: 'Ciudad de México — Zócalo' },
      { src: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=700&h=460&fit=crop&q=80', caption: 'Toronto — CN Tower' },
    ],
    videos: [
      { id: 'RwD70UD6JdA', title: 'FIFA World Cup 2026 Preview' },
    ],
    color: '#00C4B3',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&h=500&fit=crop&q=80',
  },
];

// ============================================================
// FAN FEST PAGE
// ============================================================
function WCFanFestPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(320px, 45vh, 440px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(27,40,56,0.8), rgba(58,107,120,0.6))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Experiencia</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(42px, 8vw, 72px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>FIFA Fan Fest</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>La fiesta del fútbol fuera del estadio — De 2006 a 2026</p>
        </div>
      </section>

      {/* Fan Fest entries */}
      <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vw, 56px)' }}>
          {FANFEST_DATA.map((ff, i) => (
            <FanFestEntry key={ff.year} data={ff} tweaks={tweaks} isReversed={i % 2 !== 0} />
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

function FanFestEntry({ data, tweaks, isReversed }) {
  const [hover, setHover] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 12 : 0;
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  return (
    <div style={{ borderRadius: radius, overflow: 'hidden', border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, background: dark ? 'rgba(255,255,255,0.02)' : '#fff' }}>
      {/* Header image */}
      <div style={{ position: 'relative', height: 'clamp(200px, 30vw, 320px)', overflow: 'hidden' }}>
        <img src={data.image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${data.color}cc, ${data.color}66)`, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}></div>
        <div style={{ position: 'absolute', bottom: 20, left: 24, zIndex: 2 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 6vw, 56px)', color: '#fff', lineHeight: 1 }}>{data.year}</div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{data.host}</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '6px 14px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>{data.title}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        {/* Description */}
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 700 }}>{data.desc}</p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', flexWrap: 'wrap', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: fg, lineHeight: 1 }}>{data.stats.attendance}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500, color: fgM, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Asistencia total</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: fg, lineHeight: 1 }}>{data.stats.cities}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500, color: fgM, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Ciudades</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: fg, lineHeight: 1 }}>{data.stats.screens}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500, color: fgM, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Pantallas</div>
          </div>
        </div>

        {/* Gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginBottom: 20 }}>
          {data.gallery.map((photo, i) => (
            <div key={i} style={{ borderRadius: radius > 0 ? 8 : 0, overflow: 'hidden', position: 'relative', aspectRatio: '16/10' }}>
              <img src={photo.src} alt={photo.caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 10px 8px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Videos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {data.videos.map((v, i) => (
            <div key={i} style={{ borderRadius: radius > 0 ? 8 : 0, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#000', cursor: 'pointer' }}
              onClick={() => setPlayingVideo(playingVideo === v.id ? null : v.id)}>
              {playingVideo === v.id ? (
                <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`} style={{ width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#111"><polygon points="6,3 20,12 6,21"></polygon></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 12px 10px', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: '#fff' }}>{v.title}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WCFanFestPage });