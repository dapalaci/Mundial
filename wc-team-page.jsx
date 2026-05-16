const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// EXTENDED TEAM DATA (rosters + coaching staff)
// ============================================================
const TEAM_ROSTERS = {
  argentina: {
    coach: { name: 'Lionel Scaloni', role: 'Director Técnico', since: 2018 },
    staff: [
      { name: 'Pablo Aimar', role: 'Asistente Técnico' },
      { name: 'Walter Samuel', role: 'Asistente Técnico' },
      { name: 'Roberto Ayala', role: 'Asistente Técnico' },
      { name: 'Martín Tocalli', role: 'Entrenador de Arqueros' },
      { name: 'Luis Martín', role: 'Preparador Físico' },
    ],
    description: 'La Selección Argentina, campeona del mundo en 2022, busca defender su título en suelo americano. Con una mezcla de experiencia y juventud, la Albiceleste es una de las grandes favoritas del torneo.',
    colors: { primary: '#75AADB', secondary: '#FFFFFF', accent: '#F4D03F' },
    squad: {
      'Porteros': [
        { name: 'Emiliano Martínez', num: 23, club: 'Aston Villa', age: 33, initials: 'EM' },
        { name: 'Franco Armani', num: 1, club: 'River Plate', age: 39, initials: 'FA' },
        { name: 'Gerónimo Rulli', num: 12, club: 'Olympique de Marseille', age: 34, initials: 'GR' },
      ],
      'Defensas': [
        { name: 'Nicolás Otamendi', num: 19, club: 'Benfica', age: 38, initials: 'NO' },
        { name: 'Cristian Romero', num: 13, club: 'Tottenham', age: 28, initials: 'CR' },
        { name: 'Lisandro Martínez', num: 25, club: 'Manchester United', age: 28, initials: 'LM' },
        { name: 'Nahuel Molina', num: 26, club: 'Atlético Madrid', age: 28, initials: 'NM' },
        { name: 'Marcos Acuña', num: 8, club: 'Sevilla', age: 34, initials: 'MA' },
        { name: 'Gonzalo Montiel', num: 4, club: 'Nottingham Forest', age: 27, initials: 'GM' },
      ],
      'Mediocampistas': [
        { name: 'Rodrigo De Paul', num: 7, club: 'Atlético Madrid', age: 32, initials: 'RD' },
        { name: 'Leandro Paredes', num: 5, club: 'Roma', age: 31, initials: 'LP' },
        { name: 'Enzo Fernández', num: 24, club: 'Chelsea', age: 25, initials: 'EF' },
        { name: 'Alexis Mac Allister', num: 20, club: 'Liverpool', age: 27, initials: 'AM' },
        { name: 'Giovani Lo Celso', num: 18, club: 'Tottenham', age: 30, initials: 'GL' },
        { name: 'Exequiel Palacios', num: 14, club: 'Bayer Leverkusen', age: 26, initials: 'EP' },
      ],
      'Delanteros': [
        { name: 'Lionel Messi', num: 10, club: 'Inter Miami', age: 38, initials: 'LM', star: true },
        { name: 'Julián Álvarez', num: 9, club: 'Atlético Madrid', age: 26, initials: 'JA', star: true },
        { name: 'Lautaro Martínez', num: 22, club: 'Inter Milan', age: 28, initials: 'LM', star: true },
        { name: 'Ángel Di María', num: 11, club: 'Benfica', age: 38, initials: 'AD' },
        { name: 'Paulo Dybala', num: 21, club: 'Roma', age: 32, initials: 'PD' },
        { name: 'Alejandro Garnacho', num: 17, club: 'Manchester United', age: 21, initials: 'AG' },
      ],
    }
  },
  france: {
    coach: { name: 'Didier Deschamps', role: 'Director Técnico', since: 2012 },
    staff: [
      { name: 'Guy Stéphan', role: 'Asistente Técnico' },
      { name: 'Franck Raviot', role: 'Entrenador de Arqueros' },
      { name: 'Cyril Moine', role: 'Preparador Físico' },
      { name: 'Franck Le Gall', role: 'Médico del Equipo' },
    ],
    description: 'Les Bleus, subcampeones del mundo en 2022 y campeones en 2018, llegan con una de las plantillas más talentosas del torneo. Francia combina velocidad, potencia y creatividad como ningún otro equipo.',
    colors: { primary: '#002654', secondary: '#FFFFFF', accent: '#ED2939' },
    squad: {
      'Porteros': [
        { name: 'Mike Maignan', num: 16, club: 'AC Milan', age: 31, initials: 'MM' },
        { name: 'Brice Samba', num: 1, club: 'Lens', age: 30, initials: 'BS' },
        { name: 'Alphonse Areola', num: 23, club: 'West Ham', age: 33, initials: 'AA' },
      ],
      'Defensas': [
        { name: 'Dayot Upamecano', num: 4, club: 'Bayern Munich', age: 27, initials: 'DU' },
        { name: 'Ibrahima Konaté', num: 13, club: 'Liverpool', age: 27, initials: 'IK' },
        { name: 'William Saliba', num: 17, club: 'Arsenal', age: 25, initials: 'WS' },
        { name: 'Theo Hernández', num: 22, club: 'AC Milan', age: 28, initials: 'TH' },
        { name: 'Jules Koundé', num: 5, club: 'Barcelona', age: 27, initials: 'JK' },
        { name: 'Benjamin Pavard', num: 2, club: 'Inter Milan', age: 30, initials: 'BP' },
      ],
      'Mediocampistas': [
        { name: 'Aurélien Tchouaméni', num: 8, club: 'Real Madrid', age: 26, initials: 'AT', star: true },
        { name: 'Eduardo Camavinga', num: 6, club: 'Real Madrid', age: 23, initials: 'EC' },
        { name: 'N\'Golo Kanté', num: 13, club: 'Al-Ittihad', age: 35, initials: 'NK' },
        { name: 'Adrien Rabiot', num: 14, club: 'Juventus', age: 31, initials: 'AR' },
        { name: 'Warren Zaïre-Emery', num: 18, club: 'PSG', age: 20, initials: 'WZ' },
      ],
      'Delanteros': [
        { name: 'Kylian Mbappé', num: 10, club: 'Real Madrid', age: 27, initials: 'KM', star: true },
        { name: 'Antoine Griezmann', num: 7, club: 'Atlético Madrid', age: 35, initials: 'AG', star: true },
        { name: 'Ousmane Dembélé', num: 11, club: 'PSG', age: 29, initials: 'OD' },
        { name: 'Marcus Thuram', num: 15, club: 'Inter Milan', age: 28, initials: 'MT' },
        { name: 'Randal Kolo Muani', num: 12, club: 'PSG', age: 27, initials: 'RK' },
        { name: 'Bradley Barcola', num: 20, club: 'PSG', age: 22, initials: 'BB' },
      ],
    }
  },
  brazil: {
    coach: { name: 'Dorival Júnior', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Lucas Silvestre', role: 'Asistente Técnico' },
      { name: 'Taffarel', role: 'Entrenador de Arqueros' },
      { name: 'Guilherme Passos', role: 'Preparador Físico' },
      { name: 'Rodrigo Lasmar', role: 'Médico del Equipo' },
    ],
    description: 'A Seleção, con cinco títulos mundiales, busca recuperar la gloria después de años de sequía. Brasil apuesta por una nueva generación liderada por Vinícius Jr. y Rodrygo, con el hambre de volver a levantar la copa.',
    colors: { primary: '#006B2D', secondary: '#FFDF00', accent: '#009739' },
    squad: {
      'Porteros': [
        { name: 'Alisson Becker', num: 1, club: 'Liverpool', age: 33, initials: 'AB' },
        { name: 'Ederson', num: 23, club: 'Manchester City', age: 32, initials: 'ED' },
        { name: 'Bento', num: 12, club: 'Athletico Paranaense', age: 25, initials: 'BE' },
      ],
      'Defensas': [
        { name: 'Marquinhos', num: 4, club: 'PSG', age: 32, initials: 'MQ' },
        { name: 'Éder Militão', num: 14, club: 'Real Madrid', age: 28, initials: 'EM' },
        { name: 'Gabriel Magalhães', num: 6, club: 'Arsenal', age: 28, initials: 'GM' },
        { name: 'Danilo', num: 2, club: 'Juventus', age: 34, initials: 'DA' },
        { name: 'Guilherme Arana', num: 16, club: 'Atlético Mineiro', age: 27, initials: 'GA' },
        { name: 'Wendell', num: 13, club: 'Porto', age: 27, initials: 'WE' },
      ],
      'Mediocampistas': [
        { name: 'Casemiro', num: 5, club: 'Manchester United', age: 34, initials: 'CA' },
        { name: 'Lucas Paquetá', num: 10, club: 'West Ham', age: 28, initials: 'LP' },
        { name: 'Bruno Guimarães', num: 8, club: 'Newcastle', age: 28, initials: 'BG' },
        { name: 'André', num: 18, club: 'Fluminense', age: 23, initials: 'AN' },
        { name: 'João Gomes', num: 15, club: 'Wolverhampton', age: 23, initials: 'JG' },
      ],
      'Delanteros': [
        { name: 'Vinícius Jr.', num: 7, club: 'Real Madrid', age: 25, initials: 'VJ', star: true },
        { name: 'Rodrygo', num: 11, club: 'Real Madrid', age: 25, initials: 'RO', star: true },
        { name: 'Endrick', num: 9, club: 'Real Madrid', age: 19, initials: 'EN', star: true },
        { name: 'Raphinha', num: 19, club: 'Barcelona', age: 29, initials: 'RA' },
        { name: 'Gabriel Martinelli', num: 21, club: 'Arsenal', age: 24, initials: 'GM' },
        { name: 'Savinho', num: 20, club: 'Manchester City', age: 21, initials: 'SA' },
      ],
    }
  }
};

// ============================================================
// BACK ARROW
// ============================================================
const BackArrow = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// ============================================================
// PLAYER PHOTO CARD (with gradient + initials placeholder)
// ============================================================
function PlayerPhotoCard({ player, teamColors, tweaks, index }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;
  const isStar = player.star;

  // Generate a subtle unique gradient from the team colors
  const hueShift = (index * 15) % 60;
  const cardGrad = `linear-gradient(145deg, ${teamColors.primary}ee, ${teamColors.primary}88 50%, ${teamColors.accent || teamColors.secondary}55 100%)`;

  return (
    <div className="wc-player-photo-card" style={{
      position: 'relative', borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
      transform: hover ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: hover ? '0 16px 40px rgba(0,0,0,0.25)' : '0 2px 12px rgba(0,0,0,0.1)',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>

      {/* Card face */}
      <div style={{ background: cardGrad, aspectRatio: '3/4', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

        {/* Star badge */}
        {isStar && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: teamColors.accent || '#F4D03F', color: '#111', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: tweaks.roundedCards ? 999 : 2, zIndex: 5 }}>
            ★ Estrella
          </div>
        )}

        {/* Large number background */}
        <div style={{
          position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
          fontSize: 140, lineHeight: 1, color: 'rgba(255,255,255,0.07)',
          userSelect: 'none', pointerEvents: 'none'
        }}>
          {player.num}
        </div>

        {/* Initials as placeholder "photo" */}
        <div style={{
          position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 90, height: 90, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 32,
          color: 'rgba(255,255,255,0.7)', zIndex: 3,
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        }}>
          {player.initials}
        </div>

        {/* Bottom info */}
        <div style={{ position: 'relative', zIndex: 3, padding: '0 16px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)', paddingTop: 40 }}>
          {/* Number pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, color: '#fff', lineHeight: 1 }}>
              #{player.num}
            </span>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 }}>
              {player.age} años
            </span>
          </div>

          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, textWrap: 'pretty' }}>
            {player.name}
          </div>

          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: 0.3 }}>
            {player.club}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STAFF CARD
// ============================================================
function StaffCard({ person, teamColors, tweaks, isHead }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;
  const dark = tweaks.darkMode;

  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderRadius: radius, padding: isHead ? 28 : 20,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      transition: 'all 0.3s ease',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      flex: isHead ? '1 1 100%' : '1 1 200px',
      cursor: 'default',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Avatar */}
        <div style={{
          width: isHead ? 64 : 48, height: isHead ? 64 : 48, borderRadius: '50%',
          background: `linear-gradient(135deg, ${teamColors.primary}, ${teamColors.accent || teamColors.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: isHead ? 22 : 16, color: '#fff', flexShrink: 0,
        }}>
          {person.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: isHead ? 22 : 16, color: dark ? '#fff' : '#111',
            textTransform: 'uppercase', lineHeight: 1.2,
          }}>
            {person.name}
          </div>
          <div style={{
            fontFamily: "'Barlow', sans-serif", fontSize: isHead ? 13 : 12,
            color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
            marginTop: 2, fontWeight: 500,
          }}>
            {person.role}{person.since ? ` · Desde ${person.since}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TEAM PAGE (full page detail)
// ============================================================
function WCTeamPage({ team, teamData, tweaks, onBack }) {
  const roster = TEAM_ROSTERS[team.id];
  if (!roster) return null;

  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const accent = tweaks.accentColor;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', height: 'clamp(380px, 55vh, 520px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* BG image */}
        {team.image && (
          <img src={team.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: team.gradient, mixBlendMode: 'multiply', opacity: 0.7 }}></div>
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
          <BackArrow size={16} color="#fff" /> Volver
        </button>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            Selección · Grupo {team.group}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 10vw, 88px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -1 }}>
            {team.name}
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
          { value: `#${team.ranking}`, label: 'Ranking FIFA' },
          { value: team.titles, label: 'Títulos Mundiales' },
          { value: team.group, label: 'Grupo' },
          { value: Object.values(roster.squad).flat().length, label: 'Convocados' },
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
          {roster.description}
        </p>
      </section>

      {/* ===== SQUAD GALLERY ===== */}
      {Object.entries(roster.squad).map(([position, players]) => (
        <section key={position} style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
              {position}
            </h3>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', padding: '3px 10px', borderRadius: 999 }}>
              {players.length}
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 20vw, 185px), 1fr))',
            gap: 'clamp(8px, 1.5vw, 14px)',
          }}>
            {players.map((player, i) => (
              <PlayerPhotoCard key={player.name} player={player} teamColors={roster.colors} tweaks={tweaks} index={i} />
            ))}
          </div>
        </section>
      ))}

      {/* ===== COACHING STAFF ===== */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>
          Cuerpo Técnico
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <StaffCard person={roster.coach} teamColors={roster.colors} tweaks={tweaks} isHead={true} />
          {roster.staff.map(s => (
            <StaffCard key={s.name} person={s} teamColors={roster.colors} tweaks={tweaks} isHead={false} />
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: dark ? '#fff' : '#111', background: 'none',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease',
        }}>
          ← Ver todas las selecciones
        </button>
      </section>
    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  WCTeamPage, TEAM_ROSTERS,
});