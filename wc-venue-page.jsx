const { useState, useEffect, useRef } = React;

// ============================================================
// VENUE DATA — stadiums + country gallery photos
// ============================================================
const VENUE_DETAILS = {
  usa: {
    description: 'Estados Unidos albergará la mayoría de los partidos del Mundial 2026, incluyendo la Final. Con 11 ciudades sede repartidas por todo el país, los aficionados podrán disfrutar de la diversidad cultural y geográfica americana.',
    galleryPhotos: [
      { src: 'assets/New-York-New-Jersey-3840-x-2160-2.jpeg', caption: 'Skyline de Nueva York' },
      { src: 'assets/Los-Angeles-3840-x-2160-2.jpeg', caption: 'Los Ángeles al atardecer' },
      { src: 'assets/Miami-3840-x-2160-2.jpeg', caption: 'Miami Beach' },
      { src: 'assets/San-Francisco-Bay-Area-3840-x-2160-1.png', caption: 'Golden Gate, San Francisco' },
      { src: 'assets/Kansas-City-3840-x-2160-2.jpeg', caption: 'Kansas City, Missouri' },
      { src: 'assets/Seattle-3840-x-2160-1.jpeg', caption: 'Seattle de noche' },
    ],
    stadiums: [
      { name: 'MetLife Stadium', city: 'East Rutherford, NJ', capacity: '82,500', matches: 'Final, Semifinal', image: 'assets/NEW-JERSEY-UNITED-STATES-JULY-13-A-view-of-the-stadium-as-Ch (1).jpeg', highlight: true },
      { name: 'SoFi Stadium', city: 'Los Ángeles, CA', capacity: '70,240', matches: 'Semifinal, Cuartos', image: 'assets/Los-Angeles-3840-x-2160-2.jpeg', highlight: false },
      { name: 'Hard Rock Stadium', city: 'Miami, FL', capacity: '64,767', matches: 'Tercero, Cuartos', image: 'assets/Miami-3840-x-2160-2.jpeg', highlight: false },
      { name: 'AT&T Stadium', city: 'Dallas, TX', capacity: '80,000', matches: 'Cuartos, Fase de Grupos', image: 'assets/FWC-26-Stadiums-AT-T-Dallas (1).jpeg', highlight: false },
      { name: 'NRG Stadium', city: 'Houston, TX', capacity: '72,220', matches: 'Fase de Grupos', image: 'assets/FWC-2026-Stadium-Houston-NRG-stadium (1).jpeg', highlight: false },
      { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', capacity: '71,000', matches: 'Fase de Grupos', image: null, highlight: false },
      { name: 'Lincoln Financial Field', city: 'Filadelfia, PA', capacity: '69,176', matches: 'Fase de Grupos', image: 'assets/Philadelphia-3840-x-2160-1.jpeg', highlight: false },
      { name: 'Lumen Field', city: 'Seattle, WA', capacity: '69,000', matches: 'Fase de Grupos', image: 'assets/Seattle-3840-x-2160-1.jpeg', highlight: false },
      { name: "Levi's Stadium", city: 'Santa Clara, CA', capacity: '68,500', matches: 'Fase de Grupos', image: "assets/FWWC-Stadiums (1).jpeg", highlight: false },
      { name: 'GEHA Field at Arrowhead', city: 'Kansas City, MO', capacity: '76,416', matches: 'Fase de Grupos', image: 'assets/FWWC-2023-Arrowhead-Stadium (1).jpeg', highlight: false },
      { name: 'Gillette Stadium', city: 'Foxborough, MA', capacity: '65,878', matches: 'Fase de Grupos', image: 'assets/FWC-stadiums-Boston-Gillette (1).jpeg', highlight: false },
    ],
  },
  mexico: {
    description: 'México será sede del Mundial por tercera vez en su historia, tras 1970 y 1986. Tres ciudades emblemáticas acogerán partidos, incluyendo el legendario Estadio Azteca — el único estadio que habrá albergado tres Copas del Mundo.',
    galleryPhotos: [
      { src: 'assets/Mexico-City-3840-x-2160-1.jpeg', caption: 'Ciudad de México' },
      { src: 'assets/MEXICO-CITY-MEXICO-MAY-30-Aerial-view-of-Azteca-stadium-prio (1).jpeg', caption: 'Estadio Azteca, CDMX' },
      { src: 'assets/FIFA-World-Cup-Stadium-Estadio-Akron (1).jpeg', caption: 'Estadio Akron, Guadalajara' },
      { src: 'assets/FIFA-World-Cup-Stadium-Estadio-BBVA (1).jpeg', caption: 'Estadio BBVA, Monterrey' },
      { src: 'https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w=700&h=460&fit=crop&q=80', caption: 'Cultura y tradición mexicana' },
      { src: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=700&h=460&fit=crop&q=80', caption: 'Gastronomía mexicana' },
    ],
    stadiums: [
      { name: 'Estadio Azteca', city: 'Ciudad de México', capacity: '87,523', matches: 'Partido Inaugural, Fase de Grupos', image: 'assets/MEXICO-CITY-MEXICO-MAY-30-Aerial-view-of-Azteca-stadium-prio (1).jpeg', highlight: true },
      { name: 'Estadio Akron', city: 'Guadalajara', capacity: '49,850', matches: 'Fase de Grupos', image: 'assets/FIFA-World-Cup-Stadium-Estadio-Akron (1).jpeg', highlight: false },
      { name: 'Estadio BBVA', city: 'Monterrey', capacity: '53,500', matches: 'Fase de Grupos', image: 'assets/FIFA-World-Cup-Stadium-Estadio-BBVA (1).jpeg', highlight: false },
    ],
  },
  canada: {
    description: 'Canadá será sede de un Mundial de fútbol por primera vez en su historia. Toronto y Vancouver, dos de las ciudades más vibrantes del país, acogerán partidos de fase de grupos en estadios de primer nivel.',
    galleryPhotos: [
      { src: 'assets/Northern-Lights-FWC-26 (1).jpeg', caption: 'Luces del Norte, Canadá' },
      { src: 'assets/Toronto-3840-x-2160-2.jpeg', caption: 'Toronto skyline' },
      { src: 'assets/Vancouver-3840-x-2160-2.jpeg', caption: 'Vancouver y las montañas' },
      { src: 'assets/FIFA-2026-World-Cup-stadium-BMO-Field (1).jpeg', caption: 'BMO Field, Toronto' },
      { src: 'https://images.unsplash.com/photo-1507992781348-310259076fe0?w=700&h=460&fit=crop&q=80', caption: 'Naturaleza canadiense' },
      { src: 'https://images.unsplash.com/photo-1542704792-e30dac463c90?w=700&h=460&fit=crop&q=80', caption: 'Otoño en Canadá' },
    ],
    stadiums: [
      { name: 'BMO Field', city: 'Toronto', capacity: '45,736', matches: 'Fase de Grupos', image: 'assets/FIFA-2026-World-Cup-stadium-BMO-Field (1).jpeg', highlight: true },
      { name: 'BC Place', city: 'Vancouver', capacity: '54,500', matches: 'Fase de Grupos', image: 'assets/Vancouver-3840-x-2160-2.jpeg', highlight: false },
    ],
  },
};

// ============================================================
// BACK ARROW (reuse from team page)
// ============================================================
const VenueBackArrow = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// ============================================================
// GALLERY PHOTO CARD
// ============================================================
function GalleryPhotoCard({ photo, tweaks, index, onPhotoClick }) {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;
  const isLarge = index === 0 || index === 3;

  return (
    <div className="wc-gallery-card" style={{
      position: 'relative', borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
      gridColumn: isLarge ? 'span 2' : 'span 1',
      minHeight: isLarge ? 280 : 200,
      transform: hover ? 'scale(1.01)' : 'scale(1)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: hover ? '0 16px 40px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.08)',
    }}
      onClick={() => onPhotoClick && onPhotoClick(photo)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>

      {/* Skeleton */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, background: tweaks.darkMode ? '#1a1a28' : '#e8e8e8', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
      )}

      <img src={photo.src} alt={photo.caption} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hover ? 'scale(1.06)' : 'scale(1)',
          opacity: loaded ? 1 : 0,
        }} />

      {/* Caption overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 16px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
      }}>
        <span style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500,
          color: '#fff', letterSpacing: 0.3,
        }}>
          {photo.caption}
        </span>
      </div>

      {/* Zoom icon on hover */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 32, height: 32, borderRadius: '50%',
        background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hover ? 1 : 0, transition: 'opacity 0.3s ease',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// STADIUM CARD
// ============================================================
function StadiumCard({ stadium, tweaks, venueGradient }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 12 : 0;

  return (
    <div style={{
      borderRadius: radius, overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
      cursor: 'default',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>

      {/* Stadium image */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        {stadium.image ? (
          <>
            <img src={stadium.image} alt={stadium.name} loading="lazy" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: venueGradient, opacity: 0.35, mixBlendMode: 'multiply' }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}></div>
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', inset: 0, background: venueGradient }}></div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="1.5">
                <ellipse cx="50" cy="50" rx="45" ry="25"></ellipse>
                <ellipse cx="50" cy="45" rx="45" ry="25"></ellipse>
                <path d="M5 45 v5 M95 45 v5"></path>
                <ellipse cx="50" cy="50" rx="30" ry="15" strokeDasharray="4 3"></ellipse>
                <rect x="35" y="42" width="30" height="16" rx="2" strokeDasharray="3 2"></rect>
              </svg>
            </div>
          </>
        )}

        {/* Capacity badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: '#fff' }}>
            {stadium.capacity}
          </span>
        </div>

        {/* Highlight badge */}
        {stadium.highlight && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: '#F4D03F', color: '#111',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10,
            textTransform: 'uppercase', letterSpacing: 1.5,
            padding: '4px 10px', borderRadius: tweaks.roundedCards ? 999 : 2,
          }}>
            ★ Destacado
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: 18 }}>
        <h4 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: 18, color: dark ? '#fff' : '#111',
          textTransform: 'uppercase', margin: '0 0 4px', lineHeight: 1.2,
        }}>
          {stadium.name}
        </h4>
        <div style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
          marginBottom: 10,
        }}>
          {stadium.city}
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '5px 12px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
          }}>
            {stadium.matches}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PHOTO LIGHTBOX
// ============================================================
function PhotoLightbox({ photo, onClose }) {
  if (!photo) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}></div>
      <div className="wc-modal-content" onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 900, width: '100%' }}>
        <img src={photo.src} alt={photo.caption} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>{photo.caption}</span>
        </div>
        <button onClick={onClose} style={{
          position: 'absolute', top: -48, right: 0,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 999, width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// VENUE PAGE (full page detail)
// ============================================================
function WCVenuePage({ venue, tweaks, onBack }) {
  const details = VENUE_DETAILS[venue.id];
  if (!details) return null;

  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', height: 'clamp(380px, 55vh, 520px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {(venue.bannerImage || venue.image) && (
          <img src={venue.bannerImage || venue.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: venue.gradient, mixBlendMode: 'multiply', opacity: 0.7 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>

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
          <VenueBackArrow size={16} color="#fff" /> Volver
        </button>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            Sede · {venue.cities ? venue.cities.length : 0} {venue.cities && venue.cities.length === 1 ? 'Ciudad' : 'Ciudades'}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 10vw, 88px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -1 }}>
            {venue.name}
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
          { value: venue.cities ? venue.cities.length : 0, label: 'Ciudades Sede' },
          { value: details.stadiums.length, label: 'Estadios' },
          { value: details.stadiums.reduce((a, s) => a + parseInt(s.capacity.replace(/,/g, '')), 0).toLocaleString(), label: 'Capacidad Total' },
        ].map(stat => (
          <div key={stat.label} style={{ minWidth: 100 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: fg, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ===== DESCRIPTION ===== */}
      <section style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)', maxWidth: 800 }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
          {details.description}
        </p>
      </section>

      {/* ===== CITIES ===== */}
      {venue.cities && (
        <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 3vw, 36px)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Ciudades Sede
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {venue.cities.map(city => (
              <span key={city} style={{
                fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500,
                padding: '8px 18px',
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: tweaks.roundedCards ? 999 : 4,
                color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              }}>
                {city}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ===== PHOTO GALLERY ===== */}
      <section style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>
          Galería del País
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px, 25vw, 280px), 1fr))',
          gap: 'clamp(8px, 1.2vw, 12px)',
          gridAutoFlow: 'dense',
        }}>
          {details.galleryPhotos.map((photo, i) => (
            <GalleryPhotoCard key={i} photo={photo} tweaks={tweaks} index={i} onPhotoClick={setLightboxPhoto} />
          ))}
        </div>
      </section>

      {/* ===== STADIUMS ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 72px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
            Estadios
          </h3>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', padding: '3px 10px', borderRadius: 999 }}>
            {details.stadiums.length}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 28vw, 320px), 1fr))',
          gap: 'clamp(12px, 1.5vw, 16px)',
        }}>
          {details.stadiums.map((stadium, i) => (
            <StadiumCard key={stadium.name} stadium={stadium} tweaks={tweaks} venueGradient={venue.gradient} />
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ padding: 'clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: dark ? '#fff' : '#111', background: 'none',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease',
        }}>
          ← Ver todas las sedes
        </button>
      </section>

      {/* Lightbox */}
      <PhotoLightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  WCVenuePage, VENUE_DETAILS,
});