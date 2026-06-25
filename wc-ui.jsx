const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// DATA
// ============================================================
const TEAMS_DATA = [
  {
    id: 'argentina', name: 'Argentina', verticalText: 'Lionel Messi',
    gradient: 'linear-gradient(160deg, rgba(117,170,219,0.85) 0%, rgba(154,196,232,0.7) 50%, rgba(214,234,248,0.6) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(10,20,60,0.8) 0%, rgba(10,20,60,0.2) 50%, transparent 100%)',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=800&fit=crop&q=80',
    pattern: '10', cta: 'Ver Selección', ranking: 1, titles: 3, group: 'J',
    stars: ['Messi', 'Di María', 'Álvarez'], dark: true
  },
  {
    id: 'france', name: 'Francia', verticalText: 'Kylian Mbappé',
    gradient: 'linear-gradient(160deg, rgba(0,38,84,0.85) 0%, rgba(22,48,90,0.7) 50%, rgba(139,26,43,0.6) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(0,15,40,0.85) 0%, rgba(0,15,40,0.25) 50%, transparent 100%)',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop&q=80',
    pattern: '10', cta: 'Ver Selección', ranking: 2, titles: 2, group: 'I',
    stars: ['Mbappé', 'Griezmann', 'Tchouaméni'], dark: true
  },
  {
    id: 'brazil', name: 'Brasil', verticalText: 'Vinícius Jr.',
    gradient: 'linear-gradient(160deg, rgba(0,107,45,0.8) 0%, rgba(30,132,73,0.6) 40%, rgba(212,172,13,0.5) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(0,40,10,0.85) 0%, rgba(0,40,10,0.2) 50%, transparent 100%)',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=800&fit=crop&q=80',
    pattern: '7', cta: 'Ver Selección', ranking: 5, titles: 5, group: 'C',
    stars: ['Vinícius Jr.', 'Rodrygo', 'Endrick'], dark: true
  }
];

const VENUES_DATA = [
  {
    id: 'usa', name: 'Estados Unidos', verticalText: '11 Ciudades',
    gradient: 'linear-gradient(160deg, rgba(44,62,107,0.75) 0%, rgba(61,82,145,0.6) 50%, rgba(139,34,50,0.5) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.2) 50%, transparent 100%)',
    image: 'assets/New-York-New-Jersey-3840-x-2160-2.jpeg',
    bannerImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=600&fit=crop&q=80',
    cta: 'Ver Sedes', cities: ['New York', 'Los Angeles', 'Miami', 'Dallas', 'Houston', 'Atlanta', 'Philadelphia', 'Seattle', 'San Francisco', 'Kansas City', 'Boston'], dark: true
  },
  {
    id: 'mexico', name: 'México', verticalText: '3 Ciudades',
    gradient: 'linear-gradient(160deg, rgba(0,92,58,0.75) 0%, rgba(45,138,94,0.6) 40%, rgba(180,42,55,0.5) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(0,30,15,0.85) 0%, rgba(0,30,15,0.2) 50%, transparent 100%)',
    image: 'assets/Mexico-City-3840-x-2160-1.jpeg',
    bannerImage: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&h=600&fit=crop&q=80',
    cta: 'Ver Sedes', cities: ['Ciudad de México', 'Guadalajara', 'Monterrey'], dark: true
  },
  {
    id: 'canada', name: 'Canadá', verticalText: '2 Ciudades',
    gradient: 'linear-gradient(160deg, rgba(196,30,58,0.7) 0%, rgba(224,74,94,0.5) 50%, rgba(196,30,58,0.6) 100%)',
    overlayGrad: 'linear-gradient(to top, rgba(40,5,10,0.85) 0%, rgba(40,5,10,0.2) 50%, transparent 100%)',
    image: 'assets/Toronto-3840-x-2160-2.jpeg',
    bannerImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=600&fit=crop&q=80',
    cta: 'Ver Sedes', cities: ['Toronto', 'Vancouver'], dark: true
  }
];

const PLAYERS_DATA = [
  { name: 'Lionel Messi', team: 'Argentina', pos: 'Delantero', num: 10, grad: 'linear-gradient(135deg, #75AADB, #D6EAF8)', photo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Lionel_Messi%2C_Player_of_Argentina_national_football_team.JPG' },
  { name: 'Kylian Mbappé', team: 'Francia', pos: 'Delantero', num: 7, grad: 'linear-gradient(135deg, #002654, #4A6FA5)', photo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Kylian_Mbappe_2017.jpg' },
  { name: 'Vinícius Jr.', team: 'Brasil', pos: 'Extremo', num: 7, grad: 'linear-gradient(135deg, #006B2D, #D4AC0D)', photo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Vinicius_Junior_WC2022.jpg' },
  { name: 'Jude Bellingham', team: 'Inglaterra', pos: 'Mediocampista', num: 10, grad: 'linear-gradient(135deg, #C8102E, #012169)', photo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Jude_Bellingham_2022-11-21_1.jpg' },
  { name: 'Erling Haaland', team: 'Noruega', pos: 'Delantero', num: 9, grad: 'linear-gradient(135deg, #BA0C2F, #00205B)', photo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Erling_Haaland_June_2025.jpg' },
  { name: 'Pedri', team: 'España', pos: 'Mediocampista', num: 8, grad: 'linear-gradient(135deg, #AA151B, #F1BF00)', photo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Pedri.jpg' },
  { name: 'Lamine Yamal', team: 'España', pos: 'Extremo', num: 19, grad: 'linear-gradient(135deg, #AA151B, #003DA5)', photo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Lamine_Yamal_in_2025_%28cropped2%29.jpg' },
  { name: 'Luis Díaz', team: 'Colombia', pos: 'Extremo', num: 7, grad: 'linear-gradient(135deg, #FCD116, #003087)', photo: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Luis_D%C3%ADaz_%28portrait%29.jpg' },
];

const NAV_LINKS = ['Selecciones', 'Sedes', 'Estrellas', 'Calendario', 'Tienda'];

// ============================================================
// HOOKS
// ============================================================
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    // Fallback: check after a short delay for elements already in viewport
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) { setVis(true); obs.unobserve(el); }
    }, 200);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
  return [ref, vis];
}

// ============================================================
// ICONS (inline SVG)
// ============================================================
const SearchIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const HeartIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const BagIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
);
const MenuIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const CloseIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ArrowIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// ============================================================
// NAV
// ============================================================
function WCNav({ tweaks, onSearchClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const dark = tweaks.darkMode;
  const bg = dark ? 'rgba(10,10,18,0.96)' : 'rgba(255,255,255,0.97)';
  const fg = dark ? '#fff' : '#111';
  const border = scrolled ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)') : 'transparent';

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: bg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${border}`, transition: 'all 0.3s ease', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px, 4vw, 48px)' }}>
      {/* Logo */}
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: fg, letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span style={{ color: tweaks.accentColor }}>⬢</span>{' '}FIFA World Cup 26™
      </div>

      {/* Desktop Links */}
      <div className="wc-nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="wc-nav-link" style={{ color: fg, textDecoration: 'none', fontSize: 14, fontWeight: 500, fontFamily: "'Barlow', sans-serif", letterSpacing: 0.5 }}>{link}</a>
        ))}
      </div>

      {/* Icons */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <button className="wc-icon-btn" onClick={onSearchClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, padding: 4, display: 'flex' }}><SearchIcon /></button>
        <button className="wc-icon-btn wc-hide-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, padding: 4, display: 'flex' }}><HeartIcon /></button>
        <button className="wc-icon-btn wc-hide-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, padding: 4, display: 'flex' }}><BagIcon /></button>
        <button className="wc-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, padding: 4, display: 'none' }}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, background: bg, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, borderBottom: `1px solid ${border}` }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} style={{ color: fg, textDecoration: 'none', fontSize: 16, fontWeight: 500, fontFamily: "'Barlow', sans-serif" }}>{link}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function WCHero({ tweaks, onCalendarClick }) {
  const [heroRef, heroVis] = useScrollReveal(0.05);
  const accent = tweaks.accentColor;

  return (
    <section ref={heroRef} id="hero" style={{ position: 'relative', minHeight: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center', overflow: 'hidden', background: '#070714', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
      {/* Background image with Ken Burns animation */}
      <div className="wc-hero-bg" style={{ position: 'absolute', inset: '-5%', zIndex: 0 }}>
        <img src="images/hero-bg.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
      </div>

      {/* Dark overlays for readability */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(7,7,20,0.45) 0%, rgba(7,7,20,0.15) 35%, rgba(7,7,20,0.3) 65%, rgba(7,7,20,0.92) 100%)' }}></div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `radial-gradient(ellipse at center, transparent 30%, rgba(7,7,20,0.5) 100%)` }}></div>

      {/* Subtle animated light streaks */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div className="wc-hero-flare" style={{ position: 'absolute', top: '20%', left: '45%', width: 300, height: 600, background: `linear-gradient(180deg, ${accent}15 0%, transparent 100%)`, filter: 'blur(80px)', transformOrigin: 'top center' }}></div>
      </div>

      <div className={`wc-hero-content ${heroVis ? 'wc-visible' : ''}`} style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: 900 }}>
        {/* Overline */}
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase', color: accent, marginBottom: 24, opacity: 0.9 }}>
          11 junio — 19 julio 2026
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(56px, 12vw, 140px)', lineHeight: 0.9, color: '#fff', margin: 0, letterSpacing: -1, textTransform: 'uppercase' }}>
          Mundial<br />
          <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>2026</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(14px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)', marginTop: 20, fontWeight: 400, letterSpacing: 6, textTransform: 'uppercase' }}>
          USA&ensp;•&ensp;México&ensp;•&ensp;Canadá
        </p>

        {/* CTA */}
        <button className="wc-cta-hero" onClick={onCalendarClick} style={{ marginTop: 48, fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0A0A14', background: accent, border: 'none', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '16px 40px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
          Ver Calendario
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="wc-scroll-indicator" style={{ position: 'absolute', bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#fff' }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}></div>
      </div>
    </section>
  );
}

// ============================================================
// NIKE-STYLE CARD
// ============================================================
function WCCard({ item, tweaks, onClick }) {
  const [hover, setHover] = useState(false);
  const [cardRef, vis] = useScrollReveal(0.15);
  const isDark = item.dark;
  const textColor = isDark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 12 : 0;

  return (
    <div ref={cardRef}
      className={`wc-card-wrapper ${vis ? 'wc-visible' : ''}`}
      style={{ flex: '1 1 0', minWidth: 260, cursor: 'pointer' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick && onClick(item)}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: radius, overflow: 'hidden',
        background: item.gradient,
        transform: hover ? 'scale(1.015)' : 'scale(1)',
        boxShadow: hover ? '0 20px 60px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Background image */}
        {item.image && (
          <img src={item.image} alt={item.name} loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            imageRendering: 'high-quality',
          }} />
        )}

        {/* Color gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: item.gradient, mixBlendMode: item.image ? 'multiply' : 'normal', opacity: item.image ? 0.6 : 1 }}></div>

        {/* Bottom readability gradient */}
        {item.overlayGrad && <div style={{ position: 'absolute', inset: 0, background: item.overlayGrad }}></div>}
        {/* Large faded number / pattern */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(140px, 20vw, 280px)',
          color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none'
        }}>
          {item.pattern || ''}
        </div>

        {/* Football hex shapes decoration */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '60%', opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 40 35'%3E%3Cpolygon fill='${isDark ? 'white' : 'black'}' points='20,1 37,10 37,25 20,34 3,25 3,10'/%3E%3C/svg%3E")`, backgroundSize: '40px 35px', pointerEvents: 'none' }}></div>

        {/* Country name large */}
        <div style={{ position: 'absolute', bottom: 80, left: 24, right: 60, zIndex: 3 }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: textColor, margin: 0, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.1 }}>
            {item.name}
          </h3>
        </div>

        {/* Vertical text (like Nike player name) */}
        <div style={{
          position: 'absolute', top: 16, right: 14, zIndex: 3,
          writingMode: 'vertical-rl', textOrientation: 'mixed',
          fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500,
          letterSpacing: 2, textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)',
        }}>
          {item.verticalText}
        </div>

        {/* Pill CTA */}
        <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 3 }}>
          <div className="wc-pill-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: isDark ? '#fff' : '#111',
            color: isDark ? '#111' : '#fff',
            fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
            padding: '10px 22px', borderRadius: tweaks.roundedCards ? 999 : 4,
            transition: 'all 0.25s ease',
            transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          }}>
            {item.cta} <ArrowIcon size={14} color={isDark ? '#111' : '#fff'} />
          </div>
        </div>

        {/* Hover gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)',
          opacity: hover ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none'
        }}></div>
      </div>
    </div>
  );
}

// ============================================================
// CARD SECTION (3 cards in a row, like Nike's "Shop by Sport")
// ============================================================
function WCCardSection({ id, title, items, tweaks, onCardClick }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#fff';
  const fg = dark ? '#fff' : '#111';
  const [titleRef, titleVis] = useScrollReveal(0.2);

  return (
    <section id={id} style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)' }}>
      <h2 ref={titleRef} className={`wc-section-title ${titleVis ? 'wc-visible' : ''}`}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: fg, margin: '0 0 clamp(24px, 4vw, 40px) 0', textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 16px)', flexWrap: 'wrap' }}>
        {items.map(item => (
          <WCCard key={item.id} item={item} tweaks={tweaks} onClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// BANNER / QUOTE
// ============================================================
const UPCOMING_MATCHES = [
  { date: '12 JUN', home: 'CAN', away: 'BIH', time: '15:00 ET' },
  { date: '12 JUN', home: 'USA', away: 'PAR', time: '18:00 PT' },
  { date: '13 JUN', home: 'QAT', away: 'SUI', time: '12:00 PT' },
  { date: '13 JUN', home: 'BRA', away: 'MAR', time: '18:00 ET' },
];

const RECENT_RESULTS = [
  { home: 'KOR', homeScore: 0, away: 'CZE', awayScore: 0, date: 'EN JUEGO' },
  { home: 'MEX', homeScore: 2, away: 'RSA', awayScore: 0, date: '11 JUN' },
];

function BannerCard({ title, badge, badgeColor, children, tweaks }) {
  return (
    <div style={{
      background: 'rgba(8,8,18,0.72)', backdropFilter: 'blur(16px)',
      borderRadius: tweaks.roundedCards ? 18 : 4,
      padding: '22px 26px', flex: '0 0 290px', display: 'flex', flexDirection: 'column', gap: 0,
      position: 'relative', zIndex: 1, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        {badge && (
          <span style={{
            background: badgeColor || 'rgba(255,255,255,0.12)', borderRadius: 999,
            padding: '3px 10px', fontSize: 9, fontFamily: "'Barlow', sans-serif",
            fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            {badge === 'live' && (
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8344E', display: 'inline-block', boxShadow: '0 0 8px #E8344E' }} />
            )}
            {badge === 'live' ? 'En vivo' : badge}
          </span>
        )}
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5 }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function WCBanner({ tweaks }) {
  const accent = tweaks.accentColor;
  const [ref, vis] = useScrollReveal(0.2);
  const [wide, setWide] = React.useState(typeof window !== 'undefined' && window.innerWidth >= 960);
  React.useEffect(() => {
    const h = () => setWide(window.innerWidth >= 960);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' };
  const codeStyle = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' };
  const tagStyle = { fontFamily: "'Barlow', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 };

  return (
    <section ref={ref} className={`wc-banner ${vis ? 'wc-visible' : ''}`}
      style={{ background: accent, padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon fill='black' points='30,2 56,15 56,37 30,50 4,37 4,15'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px', pointerEvents: 'none' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 36px)', maxWidth: 1200, marginInline: 'auto', position: 'relative', zIndex: 1 }}>

        {/* LEFT: Próximos amistosos */}
        {wide && (
          <BannerCard title="Próximos partidos" badge="Fase de grupos" badgeColor="rgba(255,255,255,0.3)" tweaks={tweaks}>
            {UPCOMING_MATCHES.map((m, i) => (
              <div key={i} style={{ ...rowStyle, borderBottom: i < UPCOMING_MATCHES.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                <span style={tagStyle}>{m.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={codeStyle}>{m.home}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>vs</span>
                  <span style={codeStyle}>{m.away}</span>
                </div>
                <span style={tagStyle}>{m.time}</span>
              </div>
            ))}
          </BannerCard>
        )}

        {/* CENTER: Quote */}
        <p style={{ flex: 1, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4.5vw, 52px)', color: '#0A0A14', margin: 0, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.15, textAlign: 'center' }}>
          48 selecciones.<br />16 ciudades.<br />Un solo campeón.
        </p>

        {/* RIGHT: Resultados en vivo */}
        {wide && (
          <BannerCard title="Resultados" badge="live" tweaks={tweaks}>
            <div style={{ fontSize: 10, fontFamily: "'Barlow', sans-serif", color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontWeight: 500 }}>
              Mundial 2026 · Jornada 1 de la fase de grupos
            </div>
            {RECENT_RESULTS.map((r, i) => (
              <div key={i} style={{ ...rowStyle, borderBottom: i < RECENT_RESULTS.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                <span style={{ ...codeStyle, flex: 1, textAlign: 'right' }}>{r.home}</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 15, color: '#fff', background: 'rgba(255,255,255,0.12)', padding: '3px 10px', borderRadius: tweaks.roundedCards ? 6 : 2, margin: '0 8px', letterSpacing: 1 }}>
                  {r.homeScore}–{r.awayScore}
                </span>
                <span style={{ ...codeStyle, flex: 1 }}>{r.away}</span>
                <span style={{ ...tagStyle, marginLeft: 8 }}>{r.date}</span>
              </div>
            ))}
          </BannerCard>
        )}
      </div>
    </section>
  );
}

// ============================================================
// PLAYER CARDS (horizontal scroll)
// ============================================================
function WCPlayerCard({ player, tweaks, index, onClick }) {
  const [hover, setHover] = useState(false);
  const isDark = player.grad.includes('#002') || player.grad.includes('#00205') || player.grad.includes('#012');
  const textColor = isDark ? '#fff' : '#111';
  const radius = tweaks.roundedCards ? 16 : 0;

  return (
    <div className="wc-player-card" style={{
      flexShrink: 0, width: 'clamp(200px, 28vw, 260px)',
      borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
      transform: hover ? 'translateY(-6px)' : 'translateY(0)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      animationDelay: `${index * 80}ms`,
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick && onClick(player)}>
      <div style={{ background: player.grad, aspectRatio: '4/5', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20 }}>
        {/* Player photo */}
        {player.photo && (
          <img src={player.photo} alt={player.name} loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transform: hover ? 'scale(1.06)' : 'scale(1)', willChange: 'transform', backfaceVisibility: 'hidden', imageRendering: 'high-quality' }} />
        )}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: player.photo ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' : player.grad, opacity: player.photo ? 1 : 0.9 }} />
        {/* Jersey number watermark (only when no photo) */}
        {!player.photo && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 120, color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {player.num}
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{player.pos}</div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>{player.name}</div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{player.team}</div>
        </div>
      </div>
    </div>
  );
}

function WCPlayersSection({ tweaks, onPlayerClick }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#fff';
  const fg = dark ? '#fff' : '#111';
  const scrollRef = useRef(null);
  const [titleRef, titleVis] = useScrollReveal(0.2);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="estrellas" style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 clamp(20px, 4vw, 48px)', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        <h2 ref={titleRef} className={`wc-section-title ${titleVis ? 'wc-visible' : ''}`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: fg, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
          Estrellas del Torneo
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => scroll(-1)} className="wc-scroll-btn" style={{ width: 40, height: 40, borderRadius: tweaks.roundedCards ? 999 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, background: 'none', color: fg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={() => scroll(1)} className="wc-scroll-btn" style={{ width: 40, height: 40, borderRadius: tweaks.roundedCards ? 999 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, background: 'none', color: fg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div ref={scrollRef} style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 clamp(20px, 4vw, 48px) 16px', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {PLAYERS_DATA.map((p, i) => (
          <WCPlayerCard key={p.name} player={p} tweaks={tweaks} index={i} onClick={onPlayerClick} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// NEWSLETTER
// ============================================================
function WCNewsletter({ tweaks }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dark = tweaks.darkMode;
  const bg = dark ? '#111118' : '#F5F5F5';
  const fg = dark ? '#fff' : '#111';
  const [ref, vis] = useScrollReveal(0.2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('@')) setSubmitted(true);
  };

  return (
    <section ref={ref} className={`wc-newsletter ${vis ? 'wc-visible' : ''}`}
      style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 4vw, 36px)', color: fg, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
          No te pierdas nada
        </h2>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', margin: '0 0 32px', lineHeight: 1.5 }}>
          Recibe noticias, resultados y contenido exclusivo del Mundial 2026 directo en tu bandeja.
        </p>
        {submitted ? (
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: 600, color: tweaks.accentColor, padding: 20 }}>
            ✓ ¡Listo! Te mantendremos al tanto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 440, margin: '0 auto' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{ flex: 1, fontFamily: "'Barlow', sans-serif", fontSize: 14, padding: '14px 20px', border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, background: dark ? 'rgba(255,255,255,0.05)' : '#fff', color: fg, outline: 'none' }} />
            <button type="submit" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '14px 28px', background: '#111', color: '#fff', border: 'none', borderRadius: tweaks.roundedCards ? 999 : 4, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function WCFooter({ tweaks }) {
  const fg = tweaks.darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const fgStrong = tweaks.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const bg = tweaks.darkMode ? '#060610' : '#111';
  const columns = [
    { title: 'Torneo', links: ['Calendario', 'Grupos', 'Sedes', 'Entradas'] },
    { title: 'Selecciones', links: ['Argentina', 'Francia', 'Brasil', 'España', 'Todas'] },
    { title: 'Info', links: ['Sobre FIFA', 'Prensa', 'Voluntarios', 'Contacto'] },
  ];

  return (
    <footer style={{ background: bg, padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px) 32px', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 6vw, 80px)', marginBottom: 48 }}>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
            <span style={{ color: tweaks.accentColor }}>⬢</span> FIFA World Cup 26™
          </div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', maxWidth: 260 }}>
            La fiesta del fútbol más grande del mundo. Estados Unidos, México y Canadá.
          </p>
        </div>
        {columns.map(col => (
          <div key={col.title} style={{ flex: '0 0 auto', minWidth: 120 }}>
            <h4 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1.5, margin: '0 0 16px' }}>{col.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(link => (
                <a key={link} href="#" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>{link}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 FIFA. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacidad', 'Términos', 'Cookies'].map(link => (
            <a key={link} href="#" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MODAL (for card details)
// ============================================================
function WCModal({ item, onClose, tweaks }) {
  if (!item) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  const isDark = item.dark;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}></div>
      <div className="wc-modal-content" onClick={e => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 560, background: item.gradient, borderRadius: tweaks.roundedCards ? 20 : 4, overflow: 'hidden', padding: 'clamp(32px, 5vw, 48px)' }}>
        {/* Close button */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)', border: 'none', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: isDark ? '#fff' : '#111' }}>
          <CloseIcon size={18} />
        </button>

        <div style={{ color: isDark ? '#fff' : '#111' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, opacity: 0.5, marginBottom: 8 }}>
            {item.cities ? 'Sede' : 'Selección'}
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 52px)', margin: '0 0 24px', textTransform: 'uppercase', lineHeight: 1 }}>
            {item.name}
          </h2>

          {/* Stats or cities */}
          {item.cities ? (
            <div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.5, marginBottom: 12 }}>Ciudades sede</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.cities.map(city => (
                  <span key={city} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, padding: '6px 14px', background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)', borderRadius: tweaks.roundedCards ? 999 : 4 }}>{city}</span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {item.ranking && (
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 36 }}>#{item.ranking}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.5 }}>Ranking FIFA</div>
                </div>
              )}
              {item.titles != null && (
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 36 }}>{item.titles}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.5 }}>Títulos mundiales</div>
                </div>
              )}
              {item.group && (
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 36 }}>{item.group}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.5 }}>Grupo</div>
                </div>
              )}
            </div>
          )}

          {item.stars && (
            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.5, marginBottom: 12 }}>Figuras</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {item.stars.map(s => (
                  <span key={s} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, padding: '6px 14px', background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)', borderRadius: tweaks.roundedCards ? 999 : 4 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SEARCH OVERLAY
// ============================================================
function WCSearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}></div>
      <div style={{ position: 'relative', maxWidth: 600, margin: '120px auto 0', padding: '0 24px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: 16 }}>
          <SearchIcon size={24} color="rgba(255,255,255,0.5)" />
          <input ref={inputRef} type="text" placeholder="Buscar selecciones, sedes, jugadores..."
            style={{ flex: 1, fontFamily: "'Barlow', sans-serif", fontSize: 20, fontWeight: 400, color: '#fff', background: 'none', border: 'none', outline: 'none' }} />
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '6px 12px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Barlow', sans-serif", fontSize: 12, cursor: 'pointer' }}>ESC</button>
        </div>
        <div style={{ marginTop: 24, color: 'rgba(255,255,255,0.35)', fontFamily: "'Barlow', sans-serif", fontSize: 13 }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 11, fontWeight: 600, marginBottom: 12 }}>Populares</div>
          {['Argentina', 'Calendario de partidos', 'Sedes en México', 'Entradas'].map(t => (
            <div key={t} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  WCNav, WCHero, WCCardSection, WCBanner, WCPlayersSection,
  WCNewsletter, WCFooter, WCModal, WCSearchOverlay,
  TEAMS_DATA, VENUES_DATA,
});