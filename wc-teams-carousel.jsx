const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// ALL 48 TEAMS — FIFA WORLD CUP 2026
// ============================================================
// Flag images via flagcdn.com (reliable, free, always available)
const FLAG_IMG = (code) => `https://flagcdn.com/w640/${code}.png`;

const ALL_TEAMS = [
  // Grupo A: México · Sudáfrica · Rep. de Corea · Rep. Checa
  { id: 'mexico',        name: 'México',           code: 'MEX', group: 'A', gradient: 'linear-gradient(145deg, #006847, #CE1126)', flag: '🇲🇽', dark: true,  hasDetail: true, ranking: 15, titles: 0, flagCode: 'mx', image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=400&h=530&fit=crop&q=75' },
  { id: 'southafrica',   name: 'Sudáfrica',        code: 'RSA', group: 'A', gradient: 'linear-gradient(145deg, #007A4D, #FFB81C)', flag: '🇿🇦', dark: true,  hasDetail: true, ranking: 60, titles: 0, flagCode: 'za', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=530&fit=crop&q=75' },
  { id: 'southkorea',    name: 'Rep. de Corea',    code: 'KOR', group: 'A', gradient: 'linear-gradient(145deg, #C60C30, #003478)', flag: '🇰🇷', dark: true,  hasDetail: true, ranking: 25, titles: 0, flagCode: 'kr', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=530&fit=crop&q=75' },
  { id: 'czechrepublic', name: 'República Checa',  code: 'CZE', group: 'A', gradient: 'linear-gradient(145deg, #D7141A, #11457E)', flag: '🇨🇿', dark: true,  hasDetail: true, ranking: 41, titles: 0, flagCode: 'cz', image: 'https://images.unsplash.com/photo-1562704577-37e6a79e3b3b?w=400&h=530&fit=crop&q=75' },
  // Grupo B: Canadá · Bosnia y Herz. · Catar · Suiza
  { id: 'canada',        name: 'Canadá',           code: 'CAN', group: 'B', gradient: 'linear-gradient(145deg, #C8102E, #FF1834)', flag: '🇨🇦', dark: true,  hasDetail: true, ranking: 30, titles: 0, flagCode: 'ca', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=530&fit=crop&q=75' },
  { id: 'bosnia',        name: 'Bosnia y Herz.',   code: 'BIH', group: 'B', gradient: 'linear-gradient(145deg, #002395, #FCCA03)', flag: '🇧🇦', dark: true,  hasDetail: true, ranking: 65, titles: 0, flagCode: 'ba', image: 'https://images.unsplash.com/photo-1544329095-a7c19df83018?w=400&h=530&fit=crop&q=75' },
  { id: 'qatar',         name: 'Catar',            code: 'QAT', group: 'B', gradient: 'linear-gradient(145deg, #8D1B3D, #6B1430)', flag: '🇶🇦', dark: true,  hasDetail: true, ranking: 55, titles: 0, flagCode: 'qa', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=530&fit=crop&q=75' },
  { id: 'switzerland',   name: 'Suiza',            code: 'SUI', group: 'B', gradient: 'linear-gradient(145deg, #D52B1E, #8B0000)', flag: '🇨🇭', dark: true,  hasDetail: true, ranking: 19, titles: 0, flagCode: 'ch', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=530&fit=crop&q=75' },
  // Grupo C: Brasil · Marruecos · Haití · Escocia
  { id: 'brazil',        name: 'Brasil',           code: 'BRA', group: 'C', gradient: 'linear-gradient(145deg, #006B2D, #D4AC0D)', flag: '🇧🇷', dark: true,  hasDetail: true, ranking: 6,  titles: 5, flagCode: 'br', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=530&fit=crop&q=75' },
  { id: 'morocco',       name: 'Marruecos',        code: 'MAR', group: 'C', gradient: 'linear-gradient(145deg, #006233, #C1272D)', flag: '🇲🇦', dark: true,  hasDetail: true, ranking: 8,  titles: 0, flagCode: 'ma', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&h=530&fit=crop&q=75' },
  { id: 'haiti',         name: 'Haití',            code: 'HAI', group: 'C', gradient: 'linear-gradient(145deg, #00209F, #D21034)', flag: '🇭🇹', dark: true,  hasDetail: true, ranking: 83, titles: 0, flagCode: 'ht', image: 'https://images.unsplash.com/photo-HlseIzr_6fI?w=400&h=530&fit=crop&q=75' },
  { id: 'scotland',      name: 'Escocia',          code: 'SCO', group: 'C', gradient: 'linear-gradient(145deg, #003078, #00205B)', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', dark: true,  hasDetail: true, ranking: 43, titles: 0, flagCode: 'gb-sct', image: 'https://images.unsplash.com/photo-OlbCWO7068Y?w=400&h=530&fit=crop&q=75' },
  // Grupo D: Estados Unidos · Paraguay · Australia · Turquía
  { id: 'usa',           name: 'Estados Unidos',   code: 'USA', group: 'D', gradient: 'linear-gradient(145deg, #002868, #BF0A30)', flag: '🇺🇸', dark: true,  hasDetail: true, ranking: 16, titles: 0, flagCode: 'us', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=530&fit=crop&q=75' },
  { id: 'paraguay',      name: 'Paraguay',         code: 'PAR', group: 'D', gradient: 'linear-gradient(145deg, #D52B1E, #0038A8)', flag: '🇵🇾', dark: true,  hasDetail: true, ranking: 40, titles: 0, flagCode: 'py', image: 'https://images.unsplash.com/photo-S0LqHCU-GIM?w=400&h=530&fit=crop&q=75' },
  { id: 'australia',     name: 'Australia',        code: 'AUS', group: 'D', gradient: 'linear-gradient(145deg, #00843D, #FFCD00)', flag: '🇦🇺', dark: true,  hasDetail: true, ranking: 27, titles: 0, flagCode: 'au', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=530&fit=crop&q=75' },
  { id: 'turkey',        name: 'Turquía',          code: 'TUR', group: 'D', gradient: 'linear-gradient(145deg, #E30A17, #B20710)', flag: '🇹🇷', dark: true,  hasDetail: true, ranking: 22, titles: 0, flagCode: 'tr', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=530&fit=crop&q=75' },
  // Grupo E: Alemania · Curazao · Costa de Marfil · Ecuador
  { id: 'germany',       name: 'Alemania',         code: 'GER', group: 'E', gradient: 'linear-gradient(145deg, #1A1A1A, #DD0000)', flag: '🇩🇪', dark: true,  hasDetail: true, ranking: 10, titles: 4, flagCode: 'de', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=530&fit=crop&q=75' },
  { id: 'curacao',       name: 'Curazao',          code: 'CUW', group: 'E', gradient: 'linear-gradient(145deg, #002B7F, #F9E814)', flag: '🇨🇼', dark: true,  hasDetail: true, ranking: 82, titles: 0, flagCode: 'cw', image: 'https://images.unsplash.com/photo-hHVEUp73ok4?w=400&h=530&fit=crop&q=75' },
  { id: 'cotedivoire',   name: 'Costa de Marfil',  code: 'CIV', group: 'E', gradient: 'linear-gradient(145deg, #F77F00, #009A44)', flag: '🇨🇮', dark: true,  hasDetail: true, ranking: 34, titles: 0, flagCode: 'ci', image: 'https://images.unsplash.com/photo-1621419203597-02b4a6b97e3d?w=400&h=530&fit=crop&q=75' },
  { id: 'ecuador',       name: 'Ecuador',          code: 'ECU', group: 'E', gradient: 'linear-gradient(145deg, #FFD100, #034EA2)', flag: '🇪🇨', dark: true,  hasDetail: true, ranking: 23, titles: 0, flagCode: 'ec', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400&h=530&fit=crop&q=75' },
  // Grupo F: Países Bajos · Japón · Suecia · Túnez
  { id: 'netherlands',   name: 'Países Bajos',     code: 'NED', group: 'F', gradient: 'linear-gradient(145deg, #FF6600, #21468B)', flag: '🇳🇱', dark: true,  hasDetail: true, ranking: 7,  titles: 0, flagCode: 'nl', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5571?w=400&h=530&fit=crop&q=75' },
  { id: 'japan',         name: 'Japón',            code: 'JPN', group: 'F', gradient: 'linear-gradient(145deg, #1A1A6C, #BC002D)', flag: '🇯🇵', dark: true,  hasDetail: true, ranking: 18, titles: 0, flagCode: 'jp', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=530&fit=crop&q=75' },
  { id: 'sweden',        name: 'Suecia',           code: 'SWE', group: 'F', gradient: 'linear-gradient(145deg, #006AA7, #FECC02)', flag: '🇸🇪', dark: true,  hasDetail: true, ranking: 38, titles: 0, flagCode: 'se', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&h=530&fit=crop&q=75' },
  { id: 'tunisia',       name: 'Túnez',            code: 'TUN', group: 'F', gradient: 'linear-gradient(145deg, #C8102E, #E70013)', flag: '🇹🇳', dark: true,  hasDetail: true, ranking: 44, titles: 0, flagCode: 'tn', image: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=400&h=530&fit=crop&q=75' },
  // Grupo G: Bélgica · Egipto · Irán · Nueva Zelanda
  { id: 'belgium',       name: 'Bélgica',          code: 'BEL', group: 'G', gradient: 'linear-gradient(145deg, #1A1A1A, #C8102E)', flag: '🇧🇪', dark: true,  hasDetail: true, ranking: 9,  titles: 0, flagCode: 'be', image: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=400&h=530&fit=crop&q=75' },
  { id: 'egypt',         name: 'Egipto',           code: 'EGY', group: 'G', gradient: 'linear-gradient(145deg, #C8102E, #1A1A1A)', flag: '🇪🇬', dark: true,  hasDetail: true, ranking: 29, titles: 0, flagCode: 'eg', image: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&h=530&fit=crop&q=75' },
  { id: 'iran',          name: 'Irán',             code: 'IRN', group: 'G', gradient: 'linear-gradient(145deg, #239F40, #C8102E)', flag: '🇮🇷', dark: true,  hasDetail: true, ranking: 21, titles: 0, flagCode: 'ir', image: 'https://images.unsplash.com/photo-1565711561500-49678a10a63f?w=400&h=530&fit=crop&q=75' },
  { id: 'newzealand',    name: 'Nueva Zelanda',    code: 'NZL', group: 'G', gradient: 'linear-gradient(145deg, #1A1A1A, #383838)', flag: '🇳🇿', dark: true,  hasDetail: true, ranking: 85, titles: 0, flagCode: 'nz', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=530&fit=crop&q=75' },
  // Grupo H: España · Cabo Verde · Arabia Saudí · Uruguay
  { id: 'spain',         name: 'España',           code: 'ESP', group: 'H', gradient: 'linear-gradient(145deg, #AA151B, #F1BF00)', flag: '🇪🇸', dark: true,  hasDetail: true, ranking: 2,  titles: 1, flagCode: 'es', image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=400&h=530&fit=crop&q=75' },
  { id: 'capeverde',     name: 'Cabo Verde',       code: 'CPV', group: 'H', gradient: 'linear-gradient(145deg, #003893, #CF2027)', flag: '🇨🇻', dark: true,  hasDetail: true, ranking: 69, titles: 0, flagCode: 'cv', image: 'https://images.unsplash.com/photo-IMZdIiZPDRo?w=400&h=530&fit=crop&q=75' },
  { id: 'saudiarabia',   name: 'Arabia Saudí',     code: 'KSA', group: 'H', gradient: 'linear-gradient(145deg, #006C35, #004D28)', flag: '🇸🇦', dark: true,  hasDetail: true, ranking: 61, titles: 0, flagCode: 'sa', image: 'https://images.unsplash.com/photo-1586724237569-9c5b1fb0f040?w=400&h=530&fit=crop&q=75' },
  { id: 'uruguay',       name: 'Uruguay',          code: 'URU', group: 'H', gradient: 'linear-gradient(145deg, #0038A8, #5BA3D4)', flag: '🇺🇾', dark: true,  hasDetail: true, ranking: 17, titles: 2, flagCode: 'uy', image: 'https://images.unsplash.com/photo-1615236490988-ec5970e3e78e?w=400&h=530&fit=crop&q=75' },
  // Grupo I: Francia · Senegal · Irak · Noruega
  { id: 'france',        name: 'Francia',          code: 'FRA', group: 'I', gradient: 'linear-gradient(145deg, #002654, #8B1A2B)', flag: '🇫🇷', dark: true,  hasDetail: true, ranking: 1,  titles: 2, flagCode: 'fr', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=530&fit=crop&q=75' },
  { id: 'senegal',       name: 'Senegal',          code: 'SEN', group: 'I', gradient: 'linear-gradient(145deg, #00853F, #FDEF42)', flag: '🇸🇳', dark: true,  hasDetail: true, ranking: 14, titles: 0, flagCode: 'sn', image: 'https://images.unsplash.com/photo-QuCvjY4gCng?w=400&h=530&fit=crop&q=75' },
  { id: 'iraq',          name: 'Irak',             code: 'IRQ', group: 'I', gradient: 'linear-gradient(145deg, #CE1126, #007A3D)', flag: '🇮🇶', dark: true,  hasDetail: true, ranking: 57, titles: 0, flagCode: 'iq', image: 'https://images.unsplash.com/photo-C3wwqfFRBck?w=400&h=530&fit=crop&q=75' },
  { id: 'norway',        name: 'Noruega',          code: 'NOR', group: 'I', gradient: 'linear-gradient(145deg, #BA0C2F, #00205B)', flag: '🇳🇴', dark: true,  hasDetail: true, ranking: 31, titles: 0, flagCode: 'no', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop&q=75' },
  // Grupo J: Argentina · Argelia · Austria · Jordania
  { id: 'argentina',     name: 'Argentina',        code: 'ARG', group: 'J', gradient: 'linear-gradient(145deg, #75AADB, #4A8AC4)', flag: '🇦🇷', dark: true,  hasDetail: true, ranking: 3,  titles: 3, flagCode: 'ar', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&h=530&fit=crop&q=75' },
  { id: 'algeria',       name: 'Argelia',          code: 'ALG', group: 'J', gradient: 'linear-gradient(145deg, #006233, #D21034)', flag: '🇩🇿', dark: true,  hasDetail: true, ranking: 28, titles: 0, flagCode: 'dz', image: 'https://images.unsplash.com/photo-1583423230901-bd5df2daa9ab?w=400&h=530&fit=crop&q=75' },
  { id: 'austria',       name: 'Austria',          code: 'AUT', group: 'J', gradient: 'linear-gradient(145deg, #ED2939, #8B0000)', flag: '🇦🇹', dark: true,  hasDetail: true, ranking: 24, titles: 0, flagCode: 'at', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&h=530&fit=crop&q=75' },
  { id: 'jordan',        name: 'Jordania',         code: 'JOR', group: 'J', gradient: 'linear-gradient(145deg, #007A3D, #CE1126)', flag: '🇯🇴', dark: true,  hasDetail: true, ranking: 63, titles: 0, flagCode: 'jo', image: 'https://images.unsplash.com/photo-5_Bu25SV6X8?w=400&h=530&fit=crop&q=75' },
  // Grupo K: Portugal · RD Congo · Uzbekistán · Colombia
  { id: 'portugal',      name: 'Portugal',         code: 'POR', group: 'K', gradient: 'linear-gradient(145deg, #006600, #C8102E)', flag: '🇵🇹', dark: true,  hasDetail: true, ranking: 5,  titles: 0, flagCode: 'pt', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=530&fit=crop&q=75' },
  { id: 'rdcongo',       name: 'RD Congo',         code: 'COD', group: 'K', gradient: 'linear-gradient(145deg, #007FFF, #CE1126)', flag: '🇨🇩', dark: true,  hasDetail: true, ranking: 46, titles: 0, flagCode: 'cd', image: 'https://images.unsplash.com/photo-StJWD4ci8wY?w=400&h=530&fit=crop&q=75' },
  { id: 'uzbekistan',    name: 'Uzbekistán',       code: 'UZB', group: 'K', gradient: 'linear-gradient(145deg, #1EB53A, #CE2028)', flag: '🇺🇿', dark: true,  hasDetail: true, ranking: 50, titles: 0, flagCode: 'uz', image: 'https://images.unsplash.com/photo-hvLu3ABC1n0?w=400&h=530&fit=crop&q=75' },
  { id: 'colombia',      name: 'Colombia',         code: 'COL', group: 'K', gradient: 'linear-gradient(145deg, #FCD116, #003893)', flag: '🇨🇴', dark: true,  hasDetail: true, ranking: 13, titles: 0, flagCode: 'co', image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=530&fit=crop&q=75' },
  // Grupo L: Inglaterra · Croacia · Ghana · Panamá
  { id: 'england',       name: 'Inglaterra',       code: 'ENG', group: 'L', gradient: 'linear-gradient(145deg, #C8102E, #012169)', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', dark: true,  hasDetail: true, ranking: 4,  titles: 1, flagCode: 'gb-eng', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=530&fit=crop&q=75' },
  { id: 'croatia',       name: 'Croacia',          code: 'CRO', group: 'L', gradient: 'linear-gradient(145deg, #C8102E, #0044AA)', flag: '🇭🇷', dark: true,  hasDetail: true, ranking: 11, titles: 0, flagCode: 'hr', image: 'https://images.unsplash.com/photo-1555990538-1e15c8912498?w=400&h=530&fit=crop&q=75' },
  { id: 'ghana',         name: 'Ghana',            code: 'GHA', group: 'L', gradient: 'linear-gradient(145deg, #CE1126, #006B3F)', flag: '🇬🇭', dark: true,  hasDetail: true, ranking: 74, titles: 0, flagCode: 'gh', image: 'https://images.unsplash.com/photo-E9NPWGBXM9o?w=400&h=530&fit=crop&q=75' },
  { id: 'panama',        name: 'Panamá',           code: 'PAN', group: 'L', gradient: 'linear-gradient(145deg, #DA121A, #003688)', flag: '🇵🇦', dark: true,  hasDetail: true, ranking: 33, titles: 0, flagCode: 'pa', image: 'https://images.unsplash.com/photo-1540610410855-b4c8877b761c?w=400&h=530&fit=crop&q=75' },
];

// ============================================================
// TEAM CAROUSEL CARD (compact)
// ============================================================
function TeamCarouselCard({ team, tweaks, onClick, isActive }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;
  const isDark = team.dark;
  const textColor = isDark ? '#fff' : '#111';
  const hasDetail = team.hasDetail;

  return (
    <div style={{
      flexShrink: 0, width: 'clamp(160px, 20vw, 200px)',
      cursor: 'pointer', scrollSnapAlign: 'start',
      transform: hover ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick && onClick(team)}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: radius, overflow: 'hidden',
        background: team.gradient,
        boxShadow: hover ? '0 16px 40px rgba(0,0,0,0.25)' : '0 2px 12px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease',
      }}>
        {/* Background photo — falls back to country flag if Unsplash fails */}
        <img
          src={team.image || FLAG_IMG(team.flagCode)}
          alt={team.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FLAG_IMG(team.flagCode); e.currentTarget.onerror = null; }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hover ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Color overlay */}
        <div style={{ position: 'absolute', inset: 0, background: team.gradient, opacity: 0.45, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)' }}></div>

        {/* Group badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10,
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
          padding: '3px 8px', borderRadius: tweaks.roundedCards ? 999 : 2,
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Gr. {team.group}
        </div>

        {/* Bottom info gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 14px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>
            {team.code}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>
            {team.name}
          </div>
        </div>

        {/* Detail indicator */}
        {hasDetail && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
            borderRadius: tweaks.roundedCards ? 999 : 2, padding: '3px 8px',
            fontFamily: "'Barlow', sans-serif", fontSize: 9, fontWeight: 600,
            color: '#fff', letterSpacing: 1, textTransform: 'uppercase',
          }}>
            ★ Detalle
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// GROUP FILTER PILLS
// ============================================================
function GroupFilter({ groups, activeGroup, onChange, tweaks }) {
  const dark = tweaks.darkMode;
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
      <button onClick={() => onChange(null)}
        style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600,
          padding: '6px 16px', border: 'none', cursor: 'pointer',
          borderRadius: tweaks.roundedCards ? 999 : 4,
          background: activeGroup === null ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
          color: activeGroup === null ? (dark ? '#111' : '#fff') : (dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'),
          transition: 'all 0.2s ease', letterSpacing: 0.5,
        }}>
        Todos
      </button>
      {groups.map(g => (
        <button key={g} onClick={() => onChange(g)}
          style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600,
            padding: '6px 14px', border: 'none', cursor: 'pointer',
            borderRadius: tweaks.roundedCards ? 999 : 4,
            background: activeGroup === g ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
            color: activeGroup === g ? (dark ? '#111' : '#fff') : (dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'),
            transition: 'all 0.2s ease', letterSpacing: 0.5,
          }}>
          Grupo {g}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// TEAMS CAROUSEL SECTION
// ============================================================
function WCTeamsCarousel({ tweaks, onTeamClick }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#fff';
  const fg = dark ? '#fff' : '#111';
  const scrollRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(null);

  const groups = [...new Set(ALL_TEAMS.map(t => t.group))].sort();
  const filtered = activeGroup ? ALL_TEAMS.filter(t => t.group === activeGroup) : ALL_TEAMS;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' });
    }
  };

  const handleTeamClick = useCallback((team) => {
    if (onTeamClick) onTeamClick(team);
  }, [onTeamClick]);

  return (
    <section id="selecciones" style={{ background: bg, padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div style={{ padding: '0 clamp(20px, 4vw, 48px)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: fg, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
              Explora por Selección
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', margin: '6px 0 0', fontWeight: 400 }}>
              48 selecciones participantes · 12 grupos
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => scroll(-1)} className="wc-scroll-btn" style={{ width: 40, height: 40, borderRadius: tweaks.roundedCards ? 999 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, background: 'none', color: fg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={() => scroll(1)} className="wc-scroll-btn" style={{ width: 40, height: 40, borderRadius: tweaks.roundedCards ? 999 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, background: 'none', color: fg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Group filter */}
        <GroupFilter groups={groups} activeGroup={activeGroup} onChange={setActiveGroup} tweaks={tweaks} />
      </div>

      {/* Scrollable cards */}
      <div ref={scrollRef} style={{
        display: 'flex', gap: 'clamp(10px, 1.2vw, 14px)',
        overflowX: 'auto', padding: '8px clamp(20px, 4vw, 48px) 20px',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {filtered.map(team => (
          <TeamCarouselCard key={team.id} team={team} tweaks={tweaks} onClick={handleTeamClick} />
        ))}
      </div>

      {/* Count indicator */}
      <div style={{ padding: '8px clamp(20px, 4vw, 48px) 0', fontFamily: "'Barlow', sans-serif", fontSize: 12, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
        {activeGroup ? `Grupo ${activeGroup} · ${filtered.length} selecciones` : `${filtered.length} selecciones`} — Desliza para ver más →
      </div>
    </section>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  WCTeamsCarousel, ALL_TEAMS, TeamCarouselCard,
});