const { useState } = React;

function USABannerExpand({ tweaks }) {
  const [active, setActive] = useState(1);
  const radius = tweaks.roundedCards ? 24 : 6;

  const panels = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/San_Francisco_skyline_from_Twin_Peaks_2021.jpg/1200px-San_Francisco_skyline_from_Twin_Peaks_2021.jpg',
      label: 'San Francisco',
      sub: 'Levi\'s Stadium · Sede',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Dallas_Texas_skyline_from_Reunion_Tower_September_2025_%28cropped%29.png/1200px-Dallas_Texas_skyline_from_Reunion_Tower_September_2025_%28cropped%29.png',
      label: 'Dallas',
      sub: 'AT&T Stadium · Sede',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Downtown_Seattle_skyline_from_Kerry_Park_-_October_2019.jpg/1200px-Downtown_Seattle_skyline_from_Kerry_Park_-_October_2019.jpg',
      label: 'Seattle',
      sub: 'Lumen Field · Sede',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Los_Angeles_Skyline_08-2024.jpg/1200px-Los_Angeles_Skyline_08-2024.jpg',
      label: 'Los Ángeles',
      sub: 'SoFi Stadium · Sede',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Miami_Sunset_%2845863661094%29.jpg/1200px-Miami_Sunset_%2845863661094%29.jpg',
      label: 'Miami',
      sub: 'Hard Rock Stadium · Sede',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1200px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
      label: 'Nueva York',
      sub: 'MetLife Stadium · Final',
    },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      width: '100%',
      height: '100%',
      gap: 6,
    }}>
      {panels.map((panel, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: radius,
            cursor: 'pointer',
            transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            flex: active === i ? 5 : 1,
            minWidth: 0,
          }}
          onMouseEnter={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <img
            src={panel.src}
            alt={panel.label}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* tint overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: active === i
              ? 'linear-gradient(to top, rgba(0,6,20,0.82) 0%, rgba(0,6,20,0.15) 55%, transparent 100%)'
              : 'rgba(0,6,20,0.5)',
            transition: 'background 0.4s ease',
          }} />
          {/* USA accent stripe top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(to right, #002868 0%, #BF0A30 100%)',
            opacity: active === i ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }} />
          {/* label when expanded */}
          <div style={{
            position: 'absolute', bottom: 18, left: 16, right: 16,
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
          }}>
            <div style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 2.5,
              color: 'rgba(255,255,255,0.45)', marginBottom: 5,
            }}>
              {panel.sub}
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
              fontSize: 22, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1,
            }}>
              {panel.label}
            </div>
          </div>
          {/* vertical label when collapsed */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            whiteSpace: 'nowrap',
            opacity: active !== i ? 0.35 : 0,
            transition: 'opacity 0.25s ease',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: 10, color: '#fff',
            textTransform: 'uppercase', letterSpacing: 3,
          }}>
            {panel.label}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { USABannerExpand });