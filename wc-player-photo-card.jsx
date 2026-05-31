const { useState } = React;

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

Object.assign(window, { PlayerPhotoCard });