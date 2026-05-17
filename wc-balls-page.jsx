const { useState, useEffect } = React;

// ============================================================
// WORLD CUP BALLS DATA — 1930 a 2026
// ============================================================
const BALLS_DATA = [
  {
    year: 1930, name: 'Tiento & T-Model', host: 'Uruguay',
    color: '#8B6914', manufacturer: 'Varios',
    panels: '—', material: 'Cuero natural',
    desc: 'El primer Mundial no tuvo un balón único. Argentina y Uruguay usaron uno distinto en cada tiempo de la final: el Tiento (argentino) en el primer tiempo y el T-Model (uruguayo) en el segundo. Uruguay ganó 4–2.',
    curiosities: [
      'Argentina ganó el primer tiempo 2–1 usando su balón; Uruguay ganó el segundo 3–0 usando el suyo.',
      'Los balones eran de cuero curtido cosido a mano, muy pesados cuando se mojaban.',
      'No existía un estándar FIFA para la pelota — cada selección prefería su propia versión.',
      'Este fue el único Mundial con dos balones oficiales distintos en la misma final.',
    ],
    image: 'assets/balon 1930.png',
  },
  {
    year: 1934, name: 'Federale 102', host: 'Italia',
    color: '#8B4513', manufacturer: 'Italiana',
    panels: 13, material: 'Cuero natural con 13 paneles',
    desc: 'Fabricado en Italia para el primer Mundial europeo. El Federale 102 tenía 13 paneles de cuero cosido a mano y una válvula de goma interna. Pesaba considerablemente más cuando se mojaba con lluvia.',
    curiosities: [
      'Era el primer balón fabricado localmente para el país anfitrión del Mundial.',
      'La selección italiana jugó de local y ganó el torneo — el primer equipo anfitrión campeón.',
      'Su nombre proviene del número de regulación deportiva italiana de la época.',
      'Podía absorber hasta 450 g de agua adicional durante un partido bajo lluvia.',
    ],
    image: 'assets/balon 1934.png',
  },
  {
    year: 1938, name: 'Allen', host: 'Francia',
    color: '#6B3A2A', manufacturer: 'Allen',
    panels: 12, material: 'Cuero con cámara de goma',
    desc: 'El balón Allen fue elegido para el Mundial de Francia por su calidad de fabricación artesanal. Doce paneles de cuero de alta calidad con una cámara de goma interna. Sería el último Mundial por 12 años debido a la Segunda Guerra Mundial.',
    curiosities: [
      'Francia 1938 fue el último Mundial antes del paréntesis de la Segunda Guerra Mundial (1942 y 1946 se cancelaron).',
      'Brasil marcó 14 goles en 3 partidos del torneo usando este balón.',
      'Los balones de cuero de la era tenían un cordón de atado visible que podía lastimar a los jugadores al cabecear.',
      'Leônidas da Silva ("Diamante Negro") fue el goleador del torneo con 8 tantos.',
    ],
    image: 'assets/balon 1938.png',
  },
  {
    year: 1950, name: 'Super Duplo T', host: 'Brasil',
    color: '#8B7355', manufacturer: 'Superball',
    panels: 18, material: 'Cuero curtido, 18 paneles',
    desc: 'Primer Mundial tras la Segunda Guerra Mundial. El Super Duplo T fue un balón de cuero con 18 paneles producido en Brasil. Fue testigo de la mayor sorpresa de la historia: el "Maracanazo", cuando Uruguay eliminó a Brasil ante 200.000 personas.',
    curiosities: [
      'El Maracaná albergó ~200.000 espectadores — el récord de asistencia en un partido de fútbol.',
      'No había una "final" oficial: era un round-robin. Uruguay ganó la última jornada y se coronó.',
      'Brasil repartió 22.000 panfletos para repartir para la "celebración" del título antes del partido final… nunca se usaron.',
      'El periodista brasileño Nelson Rodrigues llamó al resultado "la catástrofe, la tragedia".',
    ],
    image: 'assets/balon 1950.png',
  },
  {
    year: 1954, name: 'Swiss World Champion', host: 'Suiza',
    color: '#A0522D', manufacturer: 'Varias',
    panels: 18, material: 'Cuero con cámara de vejiga',
    desc: 'El Mundial suizo estrenó el balón con válvula de vejiga reemplazable, una mejora técnica importante. Fue el primer torneo con 2 juegos por grupo en la misma jornada. Hungría goleó 10–1 a El Salvador con este balón.',
    curiosities: [
      'Hungría (el "Equipo de Oro") llegó como gran favorito pero perdió la final ante la RFA — el "Milagro de Berna".',
      'Fue el primer Mundial televisado en Europa (aunque solo en Suiza y Alemania Occidental).',
      'La vejiga reemplazable eliminó la necesidad de desinflar el balón para repararlo.',
      'Se jugaron 5 partidos con más de 7 goles en este torneo — el más goleador de la historia hasta entonces.',
    ],
    image: 'assets/balon 1954.png',
  },
  {
    year: 1958, name: 'Top Star', host: 'Suecia',
    color: '#2F4F4F', manufacturer: 'Sydsvenska',
    panels: 18, material: 'Cuero sueco de alta calidad',
    desc: 'El Top Star fue fabricado en Suecia con cuero local de alta calidad. Es recordado como el balón con el que Pelé, a los 17 años, se convirtió en la estrella más joven en ganar un Mundial.',
    curiosities: [
      'Pelé marcó 6 goles en el torneo, incluyendo un hat-trick en semis y 2 en la final — con solo 17 años.',
      'Brasil ganó su primer título mundial con una generación que incluía también a Garrincha.',
      'El balón era más pequeño que los actuales y se inflaba a mayor presión para mayor bote.',
      'La selección brasileña viajó con 3 psicólogos — pioneros en preparación mental deportiva.',
    ],
    image: 'assets/balon 1958.png',
  },
  {
    year: 1962, name: 'Crack', host: 'Chile',
    color: '#C41E3A', manufacturer: 'Chilean',
    panels: 18, material: 'Cuero con revestimiento encerado',
    desc: 'El Crack fue fabricado en Chile para el Mundial más accidentado de la historia: terremotos previos devastaron el país, pero el torneo se celebró igualmente. Fue el segundo y último título de Pelé.',
    curiosities: [
      'Chile sufrió dos terremotos masivos (9.5 y 8.8 en la escala Richter) antes del Mundial — y aun así lo organizó.',
      'La "Batalla de Santiago" entre Italia y Chile es uno de los partidos más violentos de la historia del fútbol.',
      'Pelé solo jugó 2 partidos por lesión muscular, pero Brasil ganó el torneo de todas formas.',
      'Garrincha fue el mejor jugador del torneo a pesar de sus piernas deformes de nacimiento.',
    ],
    image: 'assets/balon 1962.png',
  },
  {
    year: 1966, name: 'Challenge 4-Star', host: 'Inglaterra',
    color: '#1C1C6E', manufacturer: 'Slazenger',
    panels: 18, material: 'Cuero con costuras selladas',
    desc: 'El Challenge 4-Star de Slazenger fue el primer balón producido por una marca deportiva reconocida para el Mundial. En este balón se disputó la histórica final de Wembley donde el gol de Geoff Hurst sigue en controversia.',
    curiosities: [
      'El gol de Hurst en la final tocó o no la línea — el juez de línea soviético lo validó y aún se debate.',
      'Era el primer Mundial en el que los jugadores llevaban números del 1 al 22 de forma fija.',
      'La Copa Jules Rimet fue robada antes del torneo y recuperada por un perro llamado Pickles.',
      'Eusébio fue el goleador con 9 goles — el máximo anotador en una sola edición hasta 2026.',
    ],
    image: 'assets/balon 1966.png',
  },
  {
    year: 1970, name: 'Telstar', host: 'México',
    color: '#1A1A1A', manufacturer: 'Adidas',
    panels: 32, material: 'Cuero con 32 paneles (20 hexágonos + 12 pentágonos)',
    desc: 'El Telstar de Adidas es el balón más icónico de la historia. Su diseño de 32 paneles en blanco y negro fue creado para ser visible en televisores en blanco y negro. Adidas inició aquí una tradición que dura hasta hoy.',
    curiosities: [
      'Su nombre viene del satélite de telecomunicaciones Telstar, ya que ambos eran blancos y negros y esféricos.',
      'El diseño de 32 paneles se convirtió en el símbolo universal del fútbol durante décadas.',
      'Pelé ganó aquí su tercer título mundial — el único jugador en lograrlo.',
      'Brasil marcó 19 goles en 6 partidos — considerado el mejor equipo de la historia del fútbol.',
    ],
    image: 'assets/balon 1970.png',
  },
  {
    year: 1974, name: 'Telstar Durlast', host: 'Alemania',
    color: '#222222', manufacturer: 'Adidas',
    panels: 32, material: 'Cuero con recubrimiento Durlast impermeable',
    desc: 'El Telstar Durlast mejoró al original con un recubrimiento sintético totalmente impermeable. Mantuvo el diseño clásico blanco y negro y fue testigo de la "finta sin balón" de Johan Cruyff — el movimiento más famoso de la historia.',
    curiosities: [
      'El "Cruyff Turn" (finta Cruyff) nació en este torneo contra Suecia y aún se enseña en academias del mundo.',
      'Holanda jugó el "fútbol total" — todos los jugadores atacaban y defendían, revolucionando el juego.',
      'La selección alemana ganó sin Cruyff en la final usando una estrategia de pressing pionera.',
      'El recubrimiento Durlast reducía el peso del balón mojado en un 30% respecto a los cueros anteriores.',
    ],
    image: 'assets/balon 1974.png',
  },
  {
    year: 1978, name: 'Tango', host: 'Argentina',
    color: '#75AADB', manufacturer: 'Adidas',
    panels: 20, material: 'Cuero sintético, 20 paneles triádicos',
    desc: 'El Tango revolucionó el diseño con 20 paneles idénticos de forma triádica que creaban la ilusión óptica de 12 círculos. Su estética dominó el diseño de balones durante las dos décadas siguientes.',
    curiosities: [
      'El patrón de "triadas" del Tango se usó como base para todos los balones del Mundial hasta 1994.',
      'Mario Kempes fue el héroe argentino: 6 goles incluidos 2 en la final ante Holanda.',
      'Fue el primer Mundial bajo una dictadura militar — Argentina ganó entre mucha controversia política.',
      'El nombre rinde homenaje al tango, el baile nacional de Argentina.',
    ],
    image: 'assets/balon 1978.png',
  },
  {
    year: 1982, name: 'Tango España', host: 'España',
    color: '#AA151B', manufacturer: 'Adidas',
    panels: 20, material: 'Poliuretano con costuras selladas termosoldadas',
    desc: 'Primer balón con costuras selladas resistentes al agua mediante termosoldado. Aunque visualmente similar al Tango, incorporó innovaciones técnicas que mejoraron su rendimiento en condiciones húmedas y fue el primer Mundial en que participaron 24 equipos.',
    curiosities: [
      'Italia ganó con Paolo Rossi, quien apenas había cumplido una suspensión por escándalo de amaños.',
      'Rossi marcó 6 goles en los últimos 4 partidos tras no marcar ninguno en la fase de grupos.',
      'El partido Brasil vs Italia es considerado el mejor partido de la historia del fútbol por muchos.',
      'Las costuras termosoldadas redujeron la absorción de agua del cuero en un 50%.',
    ],
    image: 'assets/balon 1982.png',
  },
  {
    year: 1986, name: 'Azteca', host: 'México',
    color: '#006847', manufacturer: 'Adidas',
    panels: 20, material: 'Poliuretano 100% sintético (primero en el Mundial)',
    desc: 'El Azteca fue el primer balón completamente sintético en la historia del Mundial. Decorado con motivos aztecas, es el balón con el que Maradona marcó la "Mano de Dios" y el "Gol del Siglo" el mismo día.',
    curiosities: [
      'El "Gol del Siglo" de Maradona ante Inglaterra fue elegido el mejor gol de la historia por los fans de la FIFA.',
      'La "Mano de Dios" ocurrió 4 minutos antes en el mismo partido — nadie vio la mano salvo el árbitro que no la pitó.',
      'Al ser 100% sintético, mantenía peso y forma constante en calor extremo — ideal para México.',
      'Los motivos aztecas del diseño hacen referencia al calendario solar azteca (Piedra del Sol).',
    ],
    image: 'assets/balon 1986.png',
  },
  {
    year: 1990, name: 'Etrusco Unico', host: 'Italia',
    color: '#009246', manufacturer: 'Adidas',
    panels: 20, material: 'Poliuretano con espuma interior de poliuretano',
    desc: 'Inspirado en la antigua civilización etrusca de Italia, presentaba cabezas de león como elemento decorativo. Incorporó una capa interna de espuma de poliuretano para mayor impermeabilidad y control.',
    curiosities: [
      'Italia 1990 fue el Mundial con menos goles por partido de la historia: 2.21 de promedio.',
      'El primer penalti en una semifinal del Mundial se disputó en este torneo (RFA vs Inglaterra).',
      'Camerún llegó a cuartos de final — mejor actuación africana hasta entonces.',
      'La espuma de poliuretano interna fue una innovación que luego adoptaron todos los fabricantes.',
    ],
    image: 'assets/balon 1990.png',
  },
  {
    year: 1994, name: 'Questra', host: 'Estados Unidos',
    color: '#002868', manufacturer: 'Adidas',
    panels: 20, material: 'Poliuretano con capa de espuma de polietileno',
    desc: 'El Questra —búsqueda de las estrellas— utilizó una capa de espuma de polietileno que le dio mayor velocidad y suavidad al toque. Fue el balón con el que Roberto Baggio falló el penalti decisivo en la primera final decidida en los lanzamientos.',
    curiosities: [
      'La primera final del Mundial decidida en penaltis: Brasil 0–0 Italia, Baggio falla el último y Brasil es campeón.',
      'Romario y Bebeto formaron la dupla más letal: 11 goles entre los dos.',
      'EE.UU. nunca había organizado un Mundial — y registró las mayores asistencias de la historia hasta ese momento.',
      'La capa de polietileno reducía la deformación del balón al impactar, mejorando la precisión de los disparos.',
    ],
    image: 'assets/balon 1994.png',
  },
  {
    year: 1998, name: 'Tricolore', host: 'Francia',
    color: '#002654', manufacturer: 'Adidas',
    panels: 20, material: 'Poliuretano con microburbujas de gas sintético',
    desc: 'El Tricolore fue el primer balón multicolor del Mundial, decorado con gallos azules, blancos y rojos en honor a la bandera francesa. Incorporó microburbujas de gas para mayor durabilidad y uniformidad.',
    curiosities: [
      'Zinedine Zidane marcó 2 goles de cabeza en la final — en el torneo donde se convirtió en leyenda.',
      'Brasil llegaba como bicampeón y máximo favorito pero perdió 3–0 en la final en una actuación extraña de Ronaldo.',
      'Ronaldo sufrió convulsiones horas antes de la final — el misterio del "caso Ronaldo" nunca se aclaró del todo.',
      'Las microburbujas internas mantenían la forma esférica más tiempo que las espumas tradicionales.',
    ],
    image: 'assets/balon 1998.png',
  },
  {
    year: 2002, name: 'Fevernova', host: 'Corea/Japón',
    color: '#C60C30', manufacturer: 'Adidas',
    panels: 20, material: 'Espuma de polímero sintético en capas',
    desc: 'El Fevernova rompió con el diseño Tango que dominó 24 años. Su exterior con motivos asiáticos en dorado, rojo y gris reflejaba la cultura oriental. Los porteros lo criticaron por su trayectoria impredecible.',
    curiosities: [
      'Fue el primer Mundial coorganizado por dos países y el primero en Asia.',
      'Francia, campeona vigente, quedó eliminada en fase de grupos sin marcar un solo gol.',
      'Corea del Sur llegó a las semifinales — la mayor sorpresa de un anfitrión en la historia moderna.',
      'Los porteros reclamaban que el balón "flotaba" de forma irregular — Adidas rechazó las críticas.',
    ],
    image: 'assets/balon 2002.png',
  },
  {
    year: 2006, name: '+Teamgeist', host: 'Alemania',
    color: '#1A1A1A', manufacturer: 'Adidas',
    panels: 14, material: 'Paneles unidos térmicamente, sin costuras',
    desc: 'Revolución total: solo 14 paneles en lugar de 32, unidos térmicamente sin costuras. Esto creó una superficie perfectamente esférica. El gol más famoso con este balón fue el "Gol de oro" de Zidane en la final — y su célebre cabezazo a Materazzi.',
    curiosities: [
      'Zidane fue expulsado en su último partido profesional por golpear a Materazzi con la cabeza en la final.',
      'Los 14 paneles termosoldados reducían las irregularidades superficiales que causaban trayectorias impredecibles.',
      'Oliver Kahn y Jens Lehmann, dos porteros alemanes, compitieron por el puesto hasta el último momento.',
      'Fue el primer balón con superficie completamente sin costuras externas — hito en ingeniería deportiva.',
    ],
    image: 'assets/balon 2006.png',
  },
  {
    year: 2010, name: 'Jabulani', host: 'Sudáfrica',
    color: '#FFB800', manufacturer: 'Adidas',
    panels: 8, material: '8 paneles 3D de polietileno moldeado',
    desc: '"Celebrar" en zulú. Con solo 8 paneles 3D fue el balón más esférico jamás creado. Fue el más polémico: los porteros denunciaron su trayectoria errática. Casillas, Buffon y todos los grandes lo criticaron.',
    curiosities: [
      'Los porteros lo apodaron "el balón loco" por sus cambios de dirección en vuelo sin causa aparente.',
      'Un estudio del MIT confirmó que el Jabulani tenía mayor movimiento aerodinámico que cualquier balón anterior.',
      'España ganó su primer Mundial con este balón, con el gol de Iniesta en el minuto 116 de la final.',
      'Las vuvuzelas sonaron durante todo el torneo, creando una polémica tan grande como la del balón.',
    ],
    image: 'assets/balon 2010.png',
  },
  {
    year: 2014, name: 'Brazuca', host: 'Brasil',
    color: '#006B2D', manufacturer: 'Adidas',
    panels: 6, material: '6 paneles simétricas de poliuretano unidas térmicamente',
    desc: 'Nombrado por votación popular en Brasil, "Brazuca" significa "brasileño" en argot. Con 6 paneles idénticos fue el más elogiado por jugadores y porteros en décadas. Fue testigo de la mayor humillación del fútbol: el 7–1 a Brasil.',
    curiosities: [
      'El 7–1 de Alemania a Brasil en semifinales es la mayor derrota de un anfitrión en su propio Mundial.',
      'La votación pública para el nombre se hizo entre 1 millón de brasileños — "Brazuca" ganó con 77.8%.',
      'Los 6 paneles simétricos daban una rotación más uniforme, eliminando las trayectorias imprevisibles del Jabulani.',
      'James Rodríguez ganó el premio al mejor gol del Mundial con un volea zurda desde 25 metros.',
    ],
    image: 'assets/balon 2014.png',
  },
  {
    year: 2018, name: 'Telstar 18', host: 'Rusia',
    color: '#C8102E', manufacturer: 'Adidas',
    panels: 6, material: '6 paneles con textura tipo píxel y chip NFC integrado',
    desc: 'Homenaje al icónico Telstar de 1970 con píxeles en lugar de hexágonos. Fue el primer balón del Mundial con chip NFC integrado que permitía acceder a contenido exclusivo escaneándolo con el móvil.',
    curiosities: [
      'El chip NFC almacenaba datos del balón: historia del partido, ubicación, información del jugador que lo poseía.',
      'Francia ganó con la generación Mbappé — el primer jugador de menos de 20 años en marcar en una final desde Pelé en 1958.',
      'El VAR debutó en un Mundial y anuló o confirmó 29 decisiones clave a lo largo del torneo.',
      'El patrón de píxeles rinde tributo al satélite Telstar y a la era digital del fútbol moderno.',
    ],
    image: 'assets/balon 2018.png',
  },
  {
    year: 2022, name: 'Al Rihla', host: 'Catar',
    color: '#8D1B3D', manufacturer: 'Adidas',
    panels: 20, material: '20 paneles de poliuretano con textura Speedshell',
    desc: '"El Viaje" en árabe. Inspirado en la cultura, arquitectura y embarcaciones catarís. Fue el balón más rápido de la historia del Mundial gracias a su texturizado Speedshell — y el primero fabricado con al menos un 20% de materiales reciclados.',
    curiosities: [
      'El Al Rihla fue oficialmente el balón más veloz en la historia del Mundial — velocidades registradas de hasta 130 km/h en tiros libres.',
      'Argentina ganó su tercer título y Messi completó su colección de trofeos — el único trofeo que le faltaba.',
      'El texturizado Speedshell son micro-texturas en relieve que reducen la resistencia aerodinámica.',
      'Fue el primer Mundial en Oriente Medio y el primero jugado en noviembre-diciembre por el calor extremo de verano.',
    ],
    image: 'assets/balon 2022.png',
  },
  {
    year: 2026, name: 'Por revelar', host: 'USA / México / Canadá',
    color: '#00C4B3', manufacturer: 'Adidas',
    panels: '—', material: 'Por confirmar',
    desc: 'El balón oficial del Mundial 2026 aún no ha sido revelado públicamente. Se espera que Adidas presente un diseño que honre la diversidad cultural de los tres países anfitriones, con tecnología de última generación y materiales sostenibles.',
    curiosities: [
      'Será el primer Mundial con 48 selecciones — 16 más que en Catar 2022.',
      'Se espera integración digital avanzada: rastreo de velocidad y trayectoria en tiempo real.',
      'Los tres países anfitriones (EE.UU., México y Canadá) tienen culturas muy diversas que inspirarán el diseño.',
      'Adidas lleva más de 50 años fabricando balones oficiales del Mundial — la alianza más larga en la historia del deporte.',
    ],
    image: 'assets/balon 2026.png',
  },
];

// ============================================================
// BALL CARD
// ============================================================
function BallCard({ ball, tweaks, index, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const dark = tweaks.darkMode;
  const radius = tweaks.roundedCards ? 14 : 2;
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const fgS = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.28)';
  const cardBg = dark ? 'rgba(255,255,255,0.03)' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const imgBg = dark ? '#141420' : '#F0F0F0';
  const badgeBg = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)';

  return (
    <div style={{ display: 'flex', gap: 'clamp(14px, 2.5vw, 24px)', marginBottom: isLast ? 0 : 28, position: 'relative' }}>
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 36 }}>
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)', border: `2.5px solid ${dark ? '#0A0A12' : '#FAFAFA'}`, zIndex: 2, marginTop: 24, flexShrink: 0 }} />
        {!isLast && <div style={{ width: 1, flex: 1, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', marginTop: 4 }} />}
      </div>

      {/* Card */}
      <div style={{ flex: 1, borderRadius: radius, border: `1px solid ${border}`, background: cardBg, overflow: 'hidden' }}>

        {/* Image banner — full width, horizontal */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(160px, 22vw, 220px)', background: imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={ball.image}
            alt={`Balón ${ball.name} ${ball.year}`}
            loading="lazy"
            style={{ height: '92%', width: 'auto', maxWidth: '70%', objectFit: 'contain', filter: dark ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))' : 'drop-shadow(0 6px 20px rgba(0,0,0,0.18))' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Year + name overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 18px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4vw, 38px)', color: '#fff', lineHeight: 1, letterSpacing: -0.5 }}>{ball.year}</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.7)', marginLeft: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>{ball.name}</span>
          </div>
          {/* Host chip */}
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', borderRadius: tweaks.roundedCards ? 999 : 2, padding: '4px 10px' }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: 0.3 }}>{ball.host}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(14px, 2vw, 20px)' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: fgS, background: badgeBg, borderRadius: tweaks.roundedCards ? 999 : 2, padding: '3px 9px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{ball.manufacturer}</span>
            {ball.panels !== '—' && <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, color: fgS, background: badgeBg, borderRadius: tweaks.roundedCards ? 999 : 2, padding: '3px 9px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{ball.panels} paneles</span>}
            {ball.material !== 'Por confirmar' && <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: fgS, background: badgeBg, borderRadius: tweaks.roundedCards ? 999 : 2, padding: '3px 9px' }}>{ball.material}</span>}
          </div>

          {/* Description */}
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13.5, color: fgM, lineHeight: 1.65, margin: '0 0 12px' }}>{ball.desc}</p>

          {/* Curiosidades toggle */}
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700,
              color: fgM, background: 'none', border: `1px solid ${border}`,
              borderRadius: tweaks.roundedCards ? 999 : 2, padding: '5px 14px',
              cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
          >
            {expanded ? '▲ Ocultar' : '▼ Curiosidades'}
          </button>

          {expanded && (
            <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ball.curiosities.map((c, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: fgS, fontWeight: 700, fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: fgM, lineHeight: 1.6 }}>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BALLS PAGE
// ============================================================
function WCBallsPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(300px, 40vh, 400px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="assets/balon 2022.png" alt="" style={{ position: 'absolute', right: 'clamp(40px, 8vw, 120px)', top: '50%', transform: 'translateY(-50%)', height: '85%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.5))', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.97) 0%, rgba(10,10,30,0.85) 55%, rgba(10,10,30,0.3) 100%)' }} />
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Historia · 1930–2026</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 72px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Balones del Mundial</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>23 ediciones · Del cuero artesanal al polímero de alta tecnología</p>
        </div>
      </section>

      {/* Counter bar */}
      <div style={{ background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, padding: '14px clamp(20px,4vw,48px)', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {[['23', 'Ediciones'], ['56', 'Años de historia'], ['Adidas', 'Fabricante actual'], ['1930', 'Primera edición']].map(([val, lbl]) => (
          <div key={lbl}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: tweaks.accentColor, lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: fgM, textTransform: 'uppercase', letterSpacing: 1 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <section style={{ padding: 'clamp(36px, 5vw, 64px) clamp(20px, 4vw, 48px)', maxWidth: 960, margin: '0 auto' }}>
        {BALLS_DATA.map((ball, i) => (
          <BallCard key={ball.year} ball={ball} tweaks={tweaks} index={i} isLast={i === BALLS_DATA.length - 1} />
        ))}
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: fg, background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>
          ← Volver al inicio
        </button>
      </section>
    </div>
  );
}

Object.assign(window, { WCBallsPage });
