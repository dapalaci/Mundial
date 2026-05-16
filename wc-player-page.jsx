const { useState, useEffect, useRef } = React;

// ============================================================
// DETAILED PLAYER DATA
// ============================================================
const PLAYER_DETAILS = {
  'Lionel Messi': {
    fullName: 'Lionel Andrés Messi Cuccittini',
    birthDate: '24 de junio de 1987',
    birthPlace: 'Rosario, Argentina',
    height: '1.70 m',
    weight: '72 kg',
    nationality: 'Argentino',
    position: 'Delantero / Extremo derecho',
    currentClub: 'Inter Miami CF',
    jerseyNum: 10,
    preferredFoot: 'Izquierdo',
    gradient: 'linear-gradient(145deg, #75AADB 0%, #4A8AC4 40%, #1E3A5F 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lionel_Messi_White_House_2026_(3x4_cropped).jpg',
    stats: { goals: 838, assists: 378, caps: 187, intGoals: 109, balonsOro: 8, worldCups: 1 },
    career: [
      { club: 'FC Barcelona', years: '2004–2021', apps: 778, goals: 672 },
      { club: 'Paris Saint-Germain', years: '2021–2023', apps: 75, goals: 32 },
      { club: 'Inter Miami CF', years: '2023–presente', apps: 80, goals: 48 },
    ],
    trophies: ['Copa del Mundo 2022', '8 Balones de Oro', '4 Champions League', '10 La Liga', 'Copa América 2021', 'Copa América 2024', 'Finalissima 2022'],
    curiosities: [
      'Fue diagnosticado con deficiencia de hormona de crecimiento a los 10 años. El FC Barcelona financió su tratamiento.',
      'Es el máximo goleador en la historia del FC Barcelona con 672 goles en 778 partidos.',
      'Ha ganado más Balones de Oro que cualquier otro jugador en la historia: 8 en total.',
      'Anotó 91 goles en el año calendario 2012, un récord que aún se mantiene.',
      'Su debut profesional fue a los 16 años, convirtiéndose en el jugador más joven en debutar con el Barcelona en un partido de liga.',
      'Es embajador de UNICEF desde 2010 y ha donado millones a causas benéficas.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&q=80', caption: 'La magia del fútbol argentino' },
      { src: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&h=400&fit=crop&q=80', caption: 'Pasión albiceleste' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'El fútbol como arte' },
      { src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop&q=80', caption: 'Momentos históricos' },
    ],
    videos: [
      { id: 'RwD70UD6JdA', title: 'Los mejores goles de Messi' },
      { id: 'SxRCFC1cNg0', title: 'Messi — Campeón del Mundo 2022' },
    ],
  },
  'Kylian Mbappé': {
    fullName: 'Kylian Mbappé Lottin',
    birthDate: '20 de diciembre de 1998',
    birthPlace: 'París, Francia',
    height: '1.78 m',
    weight: '73 kg',
    nationality: 'Francés',
    position: 'Delantero / Extremo izquierdo',
    currentClub: 'Real Madrid CF',
    jerseyNum: 9,
    preferredFoot: 'Derecho',
    gradient: 'linear-gradient(145deg, #002654 0%, #1A3A6B 40%, #8B1A2B 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_(cropped).jpg',
    stats: { goals: 310, assists: 120, caps: 86, intGoals: 48, balonsOro: 0, worldCups: 1 },
    career: [
      { club: 'AS Monaco', years: '2015–2017', apps: 60, goals: 27 },
      { club: 'Paris Saint-Germain', years: '2017–2024', apps: 308, goals: 256 },
      { club: 'Real Madrid CF', years: '2024–presente', apps: 55, goals: 27 },
    ],
    trophies: ['Copa del Mundo 2018', '7 Ligue 1', 'Nations League 2021', 'Supercopa de España 2025'],
    curiosities: [
      'Se convirtió en el segundo adolescente en marcar en una final de Copa del Mundo (después de Pelé) en 2018, con solo 19 años.',
      'Anotó un hat-trick en la final del Mundial 2022 contra Argentina, uno de los momentos más dramáticos en la historia del fútbol.',
      'Su velocidad máxima registrada es de 38 km/h, haciéndolo uno de los jugadores más rápidos del mundo.',
      'Donó su salario completo del Mundial 2018 (cerca de €500,000) a una organización benéfica para niños discapacitados.',
      'Fue el fichaje más caro de la historia del Real Madrid y uno de los más mediáticos del fútbol mundial.',
      'Idolatraba a Cristiano Ronaldo de niño y tenía pósters de él en su habitación.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&q=80', caption: 'París, cuna de un campeón' },
      { src: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&h=400&fit=crop&q=80', caption: 'La velocidad hecha jugador' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'Fútbol francés' },
      { src: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&h=400&fit=crop&q=80', caption: 'Estadio Santiago Bernabéu' },
    ],
    videos: [
      { id: 'gVH9aWFCHQM', title: 'Mbappé — Velocidad y talento' },
      { id: 'J4p0ckPkDOI', title: 'Hat-trick en la final 2022' },
    ],
  },
  'Vinícius Jr.': {
    fullName: 'Vinícius José Paixão de Oliveira Júnior',
    birthDate: '12 de julio de 2000',
    birthPlace: 'São Gonçalo, Brasil',
    height: '1.76 m',
    weight: '73 kg',
    nationality: 'Brasileño',
    position: 'Extremo izquierdo',
    currentClub: 'Real Madrid CF',
    jerseyNum: 7,
    preferredFoot: 'Derecho',
    gradient: 'linear-gradient(145deg, #006B2D 0%, #1E8449 40%, #D4AC0D 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vinicius_Jr_2021.jpg',
    stats: { goals: 115, assists: 82, caps: 38, intGoals: 6, balonsOro: 0, worldCups: 0 },
    career: [
      { club: 'Flamengo', years: '2017–2018', apps: 37, goals: 6 },
      { club: 'Real Madrid CF', years: '2018–presente', apps: 290, goals: 109 },
    ],
    trophies: ['2 Champions League', '3 La Liga', '2 Supercopa de España', 'Mundial de Clubes 2022', 'The Best FIFA 2024'],
    curiosities: [
      'Fue fichado por el Real Madrid a los 16 años por 45 millones de euros, convirtiéndolo en uno de los adolescentes más caros de la historia.',
      'Creció en una favela de São Gonçalo y su familia vivía con recursos muy limitados.',
      'Es conocido por su habilidad en el regate: promedia más de 5 regates exitosos por partido.',
      'Ganó el premio The Best FIFA en 2024, confirmándose como el mejor jugador del mundo.',
      'Marcó el gol de la victoria en la final de la Champions League 2024 contra el Borussia Dortmund.',
      'Es un firme activista contra el racismo en el fútbol, levantando la voz en múltiples ocasiones.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop&q=80', caption: 'Río de Janeiro, Brasil' },
      { src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&h=400&fit=crop&q=80', caption: 'La samba del fútbol brasileño' },
      { src: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&h=400&fit=crop&q=80', caption: 'Santiago Bernabéu' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'Fútbol es alegría' },
    ],
    videos: [
      { id: 'VuXaZ9s3eFU', title: 'Vinícius Jr. — Habilidad pura' },
      { id: 'mWrGTpW_7Xo', title: 'Gol en la final Champions 2024' },
    ],
  },
  'Jude Bellingham': {
    fullName: 'Jude Victor William Bellingham',
    birthDate: '29 de junio de 2003',
    birthPlace: 'Stourbridge, Inglaterra',
    height: '1.86 m',
    weight: '75 kg',
    nationality: 'Inglés',
    position: 'Mediocampista / Mediapunta',
    currentClub: 'Real Madrid CF',
    jerseyNum: 5,
    preferredFoot: 'Derecho',
    gradient: 'linear-gradient(145deg, #C8102E 0%, #8B1A2B 40%, #012169 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_(cropped).jpg',
    stats: { goals: 78, assists: 48, caps: 45, intGoals: 8, balonsOro: 0, worldCups: 0 },
    career: [
      { club: 'Birmingham City', years: '2019–2020', apps: 44, goals: 4 },
      { club: 'Borussia Dortmund', years: '2020–2023', apps: 132, goals: 23 },
      { club: 'Real Madrid CF', years: '2023–presente', apps: 105, goals: 51 },
    ],
    trophies: ['Champions League 2024', 'La Liga 2024', 'Supercopa de España 2024'],
    curiosities: [
      'Birmingham City retiró su camiseta #22 cuando se fue al Dortmund — tenía solo 17 años.',
      'Fue el jugador más joven en representar al Birmingham City en un partido oficial, con 16 años y 38 días.',
      'En su primera temporada con el Real Madrid marcó 23 goles, un récord para un mediocampista en su debut.',
      'Su hermano menor, Jobe Bellingham, también es futbolista profesional y juega en el Sunderland.',
      'Se inspiró en Zinedine Zidane para elegir el número 5 en el Real Madrid.',
      'Habla alemán con fluidez tras sus tres años en el Borussia Dortmund.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&q=80', caption: 'Londres, Inglaterra' },
      { src: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&h=400&fit=crop&q=80', caption: 'El Bernabéu, su nueva casa' },
      { src: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&h=400&fit=crop&q=80', caption: 'Elegancia en el campo' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'Talento generacional' },
    ],
    videos: [
      { id: '2aKt3Y_FXHM', title: 'Bellingham — Temporada de ensueño' },
      { id: 'D-S4fYkYiWU', title: 'Todos los goles con el Real Madrid' },
    ],
  },
  'Erling Haaland': {
    fullName: 'Erling Braut Haaland',
    birthDate: '21 de julio de 2000',
    birthPlace: 'Leeds, Inglaterra',
    height: '1.94 m',
    weight: '88 kg',
    nationality: 'Noruego',
    position: 'Delantero centro',
    currentClub: 'Manchester City',
    jerseyNum: 9,
    preferredFoot: 'Izquierdo',
    gradient: 'linear-gradient(145deg, #BA0C2F 0%, #6B1520 40%, #00205B 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Erling_Haaland_June_2025.jpg',
    stats: { goals: 285, assists: 52, caps: 36, intGoals: 32, balonsOro: 0, worldCups: 0 },
    career: [
      { club: 'Molde FK', years: '2017–2019', apps: 50, goals: 20 },
      { club: 'Red Bull Salzburg', years: '2019–2020', apps: 27, goals: 29 },
      { club: 'Borussia Dortmund', years: '2020–2022', apps: 89, goals: 86 },
      { club: 'Manchester City', years: '2022–presente', apps: 130, goals: 110 },
    ],
    trophies: ['Premier League 2023, 2024', 'Champions League 2023', 'FA Cup 2023', 'Bota de Oro Premier 2023'],
    curiosities: [
      'Nació en Leeds, Inglaterra, mientras su padre Alf-Inge jugaba en el Leeds United.',
      'Anotó 9 goles en un solo partido del Mundial Sub-20 de la FIFA contra Honduras en 2019.',
      'Su ratio de goles por minuto es uno de los mejores en la historia de la Champions League.',
      'Practica meditación diariamente y atribuye gran parte de su éxito a su preparación mental.',
      'Marcó 52 goles en su primera temporada en la Premier League, rompiendo el récord de la competición.',
      'Es hijo de Alf-Inge Haaland, ex futbolista profesional que jugó en la Premier League.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&q=80', caption: 'Manchester, su hogar' },
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80', caption: 'Noruega, tierra de vikingos' },
      { src: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&h=400&fit=crop&q=80', caption: 'Potencia goleadora' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'El depredador del área' },
    ],
    videos: [
      { id: 'K5lYXaVkA0c', title: 'Haaland — Máquina de goles' },
      { id: 'V7S7kPnZXS0', title: 'Todos los goles en la Premier' },
    ],
  },
  'Pedri': {
    fullName: 'Pedro González López',
    birthDate: '25 de noviembre de 2002',
    birthPlace: 'Tegueste, Tenerife, España',
    height: '1.74 m',
    weight: '60 kg',
    nationality: 'Español',
    position: 'Mediocampista central / Interior',
    currentClub: 'FC Barcelona',
    jerseyNum: 8,
    preferredFoot: 'Derecho',
    gradient: 'linear-gradient(145deg, #AA151B 0%, #8B1117 40%, #F1BF00 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pedri.jpg',
    stats: { goals: 32, assists: 28, caps: 34, intGoals: 3, balonsOro: 0, worldCups: 0 },
    career: [
      { club: 'UD Las Palmas', years: '2019–2020', apps: 36, goals: 4 },
      { club: 'FC Barcelona', years: '2020–presente', apps: 190, goals: 28 },
    ],
    trophies: ['La Liga 2023', 'Supercopa de España 2023', 'Trofeo Kopa 2021', 'Golden Boy 2021', 'Eurocopa 2024'],
    curiosities: [
      'Ganó el premio Golden Boy y el Trofeo Kopa en 2021, con solo 18 años.',
      'Xavi Hernández lo comparó con Andrés Iniesta por su visión de juego y elegancia con el balón.',
      'En la Eurocopa 2020 (jugada en 2021) fue nombrado Mejor Jugador Joven del torneo con 18 años.',
      'Creció en las Islas Canarias jugando fútbol sala, lo que desarrolló su técnica excepcional en espacios reducidos.',
      'Firmó con el Barcelona por solo 5 millones de euros, considerada una de las mejores operaciones del club.',
      'Fue pieza clave en la conquista de la Eurocopa 2024 con España, siendo titular en todos los partidos.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=600&h=400&fit=crop&q=80', caption: 'Barcelona, ciudad condal' },
      { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80', caption: 'Tenerife, su tierra natal' },
      { src: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&h=400&fit=crop&q=80', caption: 'Elegancia española' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'La nueva generación' },
    ],
    videos: [
      { id: 'kAq4GqBYxlg', title: 'Pedri — El heredero de Iniesta' },
      { id: 'qzqKQy5ByXE', title: 'Lo mejor de Pedri en el Barcelona' },
    ],
  },
  'Lamine Yamal': {
    fullName: 'Lamine Yamal Nasraoui Ebana',
    birthDate: '13 de julio de 2007',
    birthPlace: 'Esplugues de Llobregat, Barcelona, España',
    height: '1.81 m',
    weight: '65 kg',
    nationality: 'Español',
    position: 'Extremo derecho',
    currentClub: 'FC Barcelona',
    jerseyNum: 19,
    preferredFoot: 'Izquierdo',
    gradient: 'linear-gradient(145deg, #AA151B 0%, #6B0E12 40%, #003DA5 100%)',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lamine_Yamal_in_2025_(cropped2).jpg',
    stats: { goals: 28, assists: 36, caps: 22, intGoals: 7, balonsOro: 0, worldCups: 0 },
    career: [
      { club: 'FC Barcelona', years: '2023–presente', apps: 98, goals: 28 },
    ],
    trophies: ['La Liga 2024–25', 'Eurocopa 2024', 'Trofeo Kopa 2024', 'Golden Boy 2024'],
    curiosities: [
      'Se convirtió en el jugador más joven en debutar con la selección española absoluta, con 15 años y 341 días.',
      'Marcó un gol en la semifinal de la Eurocopa 2024 contra Francia con solo 16 años, siendo el gol más joven en la historia del torneo.',
      'Cumplió 17 años el día de la final de la Eurocopa 2024, que España ganó. Celebró su cumpleaños como campeón de Europa.',
      'Debutó con el FC Barcelona con 15 años, convirtiéndose en el jugador más joven en la historia del club en un partido oficial.',
      'Su nombre fue escrito en el acta de nacimiento el mismo día que España ganó el Mundial Sub-17.',
      'Ganó el Golden Boy y el Trofeo Kopa 2024, siendo el jugador más joven en recibir ambos galardones.',
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=600&h=400&fit=crop&q=80', caption: 'Barcelona, su ciudad' },
      { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80', caption: 'La cantera del Barcelona' },
      { src: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&h=400&fit=crop&q=80', caption: 'La nueva era del fútbol español' },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&q=80', caption: 'Talento sin límites' },
    ],
    videos: [
      { id: 'HxjhSepWFRY', title: 'Lamine Yamal — El niño prodigio' },
      { id: 'kbg3EVrN5EA', title: 'Mejor jugador Eurocopa 2024' },
    ],
  },
};

// ============================================================
// STAT PILL
// ============================================================
function StatBlock({ value, label, accent }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 80 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ============================================================
// CAREER TABLE
// ============================================================
function CareerTable({ career, dark, radius }) {
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const bg2 = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const border = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ borderRadius: radius, overflow: 'hidden', border: `1px solid ${border}` }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 80px', padding: '10px 16px', background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: fgM }}>
        <span>Club</span><span>Período</span><span style={{ textAlign: 'center' }}>PJ</span><span style={{ textAlign: 'center' }}>Goles</span>
      </div>
      {career.map((c, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 80px', padding: '12px 16px', background: i % 2 === 0 ? 'transparent' : bg2, borderTop: `1px solid ${border}` }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: fg }}>{c.club}</span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: fgM }}>{c.years}</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: fg, textAlign: 'center' }}>{c.apps}</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: fg, textAlign: 'center' }}>{c.goals}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CURIOSITY CARD
// ============================================================
function CuriosityCard({ text, index, dark, radius }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      borderRadius: radius, padding: 20,
      transition: 'all 0.3s ease',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      cursor: 'default',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
        }}>
          {index + 1}
        </div>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)', lineHeight: 1.6, margin: 0 }}>
          {text}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// VIDEO CARD (YouTube embed)
// ============================================================
function VideoCard({ video, radius }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ borderRadius: radius, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#000', cursor: 'pointer' }}
      onClick={() => setPlaying(true)}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Play button overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s ease',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#111">
                <polygon points="6,3 20,12 6,21"></polygon>
              </svg>
            </div>
          </div>
          {/* Title */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500, color: '#fff' }}>{video.title}</span>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// PLAYER PAGE GALLERY PHOTO
// ============================================================
function PlayerGalleryPhoto({ photo, tweaks, index, onPhotoClick }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 12 : 0;
  const isLarge = index === 0;

  return (
    <div style={{
      position: 'relative', borderRadius: radius, overflow: 'hidden', cursor: 'pointer',
      gridColumn: isLarge ? 'span 2' : 'span 1',
      minHeight: isLarge ? 260 : 180,
      transform: hover ? 'scale(1.01)' : 'scale(1)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.06)',
    }}
      onClick={() => onPhotoClick && onPhotoClick(photo)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img src={photo.src} alt={photo.caption} loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hover ? 'scale(1.06)' : 'scale(1)',
        }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 14px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: '#fff' }}>{photo.caption}</span>
      </div>
    </div>
  );
}

// ============================================================
// PLAYER PAGE LIGHTBOX
// ============================================================
function PlayerLightbox({ photo, onClose }) {
  if (!photo) return null;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}></div>
      <div className="wc-modal-content" onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 800, width: '100%' }}>
        <img src={photo.src} alt={photo.caption} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{photo.caption}</span>
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: -48, right: 0, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PLAYER DETAIL PAGE
// ============================================================
function WCPlayerPage({ playerName, tweaks, onBack }) {
  const p = PLAYER_DETAILS[playerName];
  if (!p) return null;

  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', minHeight: 'clamp(420px, 60vh, 560px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: p.gradient }}></div>
        {/* Decorative number */}
        <div style={{ position: 'absolute', top: '45%', right: '5%', transform: 'translateY(-50%)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(200px, 30vw, 400px)', color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          {p.jerseyNum}
        </div>
        {/* Hex pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon fill='white' points='30,2 56,15 56,37 30,50 4,37 4,15'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}></div>

        {/* Player photo */}
        <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)', width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 3 }}>
          {p.photo
            ? <img src={p.photo} alt={playerName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            : <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, color: 'rgba(255,255,255,0.5)' }}>
                {playerName.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
          }
        </div>

        {/* Back button */}
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 0.5, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            #{p.jerseyNum} · {p.position}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 72px)', color: '#fff', margin: '0 0 12px', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: -1 }}>
            {playerName}
          </h1>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: 1 }}>
            {p.currentClub} · {p.nationality}
          </div>

          {/* Key stats */}
          <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            <StatBlock value={p.stats.goals} label="Goles" />
            <StatBlock value={p.stats.assists} label="Asistencias" />
            <StatBlock value={p.stats.caps} label="Partidos Intl." />
            <StatBlock value={p.stats.intGoals} label="Goles Intl." />
            {p.stats.balonsOro > 0 && <StatBlock value={p.stats.balonsOro} label="Balones de Oro" />}
            {p.stats.worldCups > 0 && <StatBlock value={p.stats.worldCups} label="Mundiales" />}
          </div>
        </div>
      </section>

      {/* ===== PERSONAL INFO ===== */}
      <section style={{ background: dark ? '#111118' : '#fff', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 48px)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>Información Personal</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Nombre completo', value: p.fullName },
            { label: 'Fecha de nacimiento', value: p.birthDate },
            { label: 'Lugar de nacimiento', value: p.birthPlace },
            { label: 'Nacionalidad', value: p.nationality },
            { label: 'Altura', value: p.height },
            { label: 'Peso', value: p.weight },
            { label: 'Pie preferido', value: p.preferredFoot },
            { label: 'Club actual', value: p.currentClub },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: fgMuted, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 500, color: fg }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CAREER ===== */}
      <section style={{ padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>Trayectoria</h3>
        <div style={{ maxWidth: 700 }}>
          <CareerTable career={p.career} dark={dark} radius={radius} />
        </div>
      </section>

      {/* ===== TROPHIES ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 1 }}>Palmarés Destacado</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {p.trophies.map(t => (
            <span key={t} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500, padding: '8px 16px', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>
              🏆 {t}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CURIOSITIES ===== */}
      <section style={{ padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>Curiosidades</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 35vw, 380px), 1fr))', gap: 12 }}>
          {p.curiosities.map((c, i) => (
            <CuriosityCard key={i} text={c} index={i} dark={dark} radius={radius} />
          ))}
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>Galería</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(180px, 22vw, 260px), 1fr))', gap: 10, gridAutoFlow: 'dense' }}>
          {p.gallery.map((photo, i) => (
            <PlayerGalleryPhoto key={i} photo={photo} tweaks={tweaks} index={i} onPhotoClick={setLightboxPhoto} />
          ))}
        </div>
      </section>

      {/* ===== VIDEOS ===== */}
      <section style={{ padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 48px)' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>Videos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 35vw, 420px), 1fr))', gap: 16 }}>
          {p.videos.map((v, i) => (
            <VideoCard key={i} video={v} radius={radius} />
          ))}
        </div>
      </section>

      {/* ===== BACK CTA ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease' }}>
          ← Volver al inicio
        </button>
      </section>

      <PlayerLightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================
Object.assign(window, {
  WCPlayerPage, PLAYER_DETAILS,
});