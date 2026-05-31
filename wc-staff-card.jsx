const { useState } = React;

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

Object.assign(window, { StaffCard });