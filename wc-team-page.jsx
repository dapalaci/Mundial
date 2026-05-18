const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// EXTENDED TEAM DATA (rosters + coaching staff)
// ============================================================
const TEAM_ROSTERS = {
  argentina: {
    culture: {
      tradicion: 'El fútbol es una religión en Argentina. Boca Juniors vs. River Plate es el Superclásico más pasional del mundo, con fanáticos que llevan el azul y el rojo en la sangre.',
      gastronomia: 'El asado es el ritual social por excelencia. Las empanadas, el chimichurri y el mate son iconos de la cultura rioplatense.',
      musica: 'Cuna del tango, declarado Patrimonio de la Humanidad por la UNESCO. El rock nacional y el folklore norteño también definen su identidad.',
      dato: 'Argentina ganó su tercera Copa del Mundo en Qatar 2022 tras 36 años de sequía. Messi convirtió 7 goles y se coronó como el mejor jugador del torneo.',
    },
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
    culture: {
      tradicion: 'Francia es una potencia futbolística con una de las academias formativas más admiradas del mundo. El Institut National du Football de Clairefontaine ha dado al mundo a Zidane, Henry y Mbappé.',
      gastronomia: 'La gastronomía francesa es Patrimonio Inmaterial de la Humanidad. Baguettes, quesos artesanales, croissants y el coq au vin son emblemas de su cocina de autor.',
      musica: 'Paris es la capital del cabaret y el chanson. La ciudad luz también ha sido hogar del movimiento afrofrancés que dio origen al R&B europeo moderno.',
      dato: 'Con la victoria en Qatar 2022 casi en el bolsillo, Francia cayó en la final ante Argentina. Mbappé marcó un hat-trick en la final, hazaña inédita en 60 años.',
    },
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
    culture: {
      tradicion: 'Brasil es el único pentacampeón del mundo. El "jogo bonito" —el juego bonito— es su filosofía: fútbol con alegría, creatividad y samba en los pies.',
      gastronomia: 'El churrasco y la feijoada (guiso de frijoles con cerdo) son los platos más emblemáticos. El açaí, el brigadeiro y el pão de queijo son delicias imprescindibles.',
      musica: 'Tierra del samba, la bossa nova y el axé. El Carnaval de Río es la fiesta más grande del planeta, con millones de personas bailando al ritmo del bombo y la cuíca.',
      dato: 'Brasil es el único país que ha participado en todas las ediciones de la Copa del Mundo (22 torneos). Pelé sigue siendo el único jugador con tres títulos mundiales.',
    },
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
  },
  usa: {
    culture: {
      tradicion: 'La MLS ha crecido exponencialmente, pero el fútbol en EE.UU. vive su era dorada: el país será sede del Mundial 2026 junto a México y Canadá, y una generación brillante lidera la selección con hambre de gloria.',
      gastronomia: 'La hamburguesa, el hot dog, el BBQ sureño y las alitas de búfalo son íconos de su cultura culinaria. Nueva York, Los Ángeles y Chicago ofrecen una fusión gastronómica sin igual en el mundo.',
      musica: 'Cuna del jazz, el blues, el rock y el hip-hop. Artistas como Michael Jackson, Beyoncé y Taylor Swift han definido la cultura popular global del siglo XXI.',
      dato: 'Estados Unidos albergará 11 estadios del Mundial 2026. MetLife Stadium en Nueva York será sede de la gran final, el partido más visto de la historia.',
    },
    coach: { name: 'Mauricio Pochettino', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Nico Estévez', role: 'Asistente Técnico' },
      { name: 'Mikey Ambrose', role: 'Asistente Técnico' },
      { name: 'Matt Besler', role: 'Analista Táctico' },
      { name: 'Carlos Llamosa', role: 'Entrenador de Defensas' },
    ],
    description: 'La Selección de Estados Unidos llega al torneo más importante de su historia en casa. Con Christian Pulisic como estrella y una nueva generación de jugadores forjados en las mejores ligas de Europa, los estadounidenses aspiran a superar la cuarta ronda por primera vez.',
    colors: { primary: '#002868', secondary: '#FFFFFF', accent: '#BF0A30' },
    squad: {
      'Porteros': [
        { name: 'Matt Turner', num: 1, club: 'Nottingham Forest', age: 31, initials: 'MT' },
        { name: 'Ethan Horvath', num: 18, club: 'Cardiff City', age: 29, initials: 'EH' },
        { name: 'Patrick Schulte', num: 23, club: 'Columbus Crew', age: 24, initials: 'PS' },
      ],
      'Defensas': [
        { name: 'Tim Ream', num: 5, club: 'Charlotte FC', age: 37, initials: 'TR' },
        { name: 'Miles Robinson', num: 4, club: 'FC Cincinnati', age: 28, initials: 'MR' },
        { name: 'Chris Richards', num: 3, club: 'Crystal Palace', age: 26, initials: 'CR' },
        { name: 'Antonee Robinson', num: 5, club: 'Fulham', age: 28, initials: 'AR' },
        { name: 'Sergiño Dest', num: 2, club: 'PSV Eindhoven', age: 24, initials: 'SD' },
        { name: 'Joe Scally', num: 17, club: 'Borussia M\'gladbach', age: 23, initials: 'JS' },
      ],
      'Mediocampistas': [
        { name: 'Tyler Adams', num: 4, club: 'Bournemouth', age: 26, initials: 'TA', star: true },
        { name: 'Yunus Musah', num: 6, club: 'AC Milan', age: 23, initials: 'YM', star: true },
        { name: 'Weston McKennie', num: 8, club: 'Juventus', age: 27, initials: 'WM' },
        { name: 'Brenden Aaronson', num: 11, club: 'Leeds United', age: 25, initials: 'BA' },
        { name: 'Luca de la Torre', num: 16, club: 'Celta Vigo', age: 27, initials: 'LD' },
      ],
      'Delanteros': [
        { name: 'Christian Pulisic', num: 10, club: 'AC Milan', age: 27, initials: 'CP', star: true },
        { name: 'Ricardo Pepi', num: 9, club: 'PSV Eindhoven', age: 23, initials: 'RP', star: true },
        { name: 'Folarin Balogun', num: 14, club: 'Monaco', age: 24, initials: 'FB' },
        { name: 'Josh Sargent', num: 19, club: 'Norwich City', age: 25, initials: 'JS' },
        { name: 'Tim Weah', num: 21, club: 'Juventus', age: 25, initials: 'TW' },
        { name: 'Gio Reyna', num: 7, club: 'Nottingham Forest', age: 23, initials: 'GR' },
      ],
    }
  },
  spain: {
    culture: {
      tradicion: 'España es la selección más dominante del siglo XXI: campeona del mundo en 2010 y ganadora de cuatro Eurocopas. La cantera del Barcelona y el Real Madrid ha producido generaciones irrepetibles de fútbol técnico.',
      gastronomia: 'La paella valenciana, el jamón ibérico, las tapas y la tortilla española son embajadores culturales que conquistan mesas en todo el mundo. Cada región tiene su identidad gastronómica única.',
      musica: 'Cuna del flamenco, declarado Patrimonio Inmaterial de la Humanidad. Artistas como Rosalía han fusionado las raíces del cante jondo con sonidos globales del siglo XXI.',
      dato: 'La generación del tiki-taka ganó la Eurocopa 2008, el Mundial 2010 y la Eurocopa 2012 sin perder un solo partido. En 2024 ganaron su cuarta Eurocopa con la joven generación de Lamine Yamal.',
    },
    coach: { name: 'Luis de la Fuente', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Mikel Etxarri', role: 'Asistente Técnico' },
      { name: 'Jon Ander Laka', role: 'Asistente Técnico' },
      { name: 'Alberto Doval', role: 'Entrenador de Arqueros' },
      { name: 'Rafael Pol', role: 'Preparador Físico' },
    ],
    description: 'La Roja llega al Mundial 2026 como campeona de Europa tras su victoria en la Eurocopa 2024. Con Lamine Yamal como la nueva gran estrella del fútbol mundial y un equipo repleto de talento, España es una de las grandes favoritas al título.',
    colors: { primary: '#AA151B', secondary: '#FFFFFF', accent: '#F1BF00' },
    squad: {
      'Porteros': [
        { name: 'Unai Simón', num: 1, club: 'Athletic Club', age: 28, initials: 'US' },
        { name: 'David Raya', num: 13, club: 'Arsenal', age: 30, initials: 'DR' },
        { name: 'Álex Remiro', num: 23, club: 'Real Sociedad', age: 30, initials: 'AR' },
      ],
      'Defensas': [
        { name: 'Dani Carvajal', num: 2, club: 'Real Madrid', age: 33, initials: 'DC' },
        { name: 'Aymeric Laporte', num: 14, club: 'Al-Nassr', age: 31, initials: 'AL' },
        { name: 'Robin Le Normand', num: 3, club: 'Atlético Madrid', age: 29, initials: 'RL' },
        { name: 'Alejandro Balde', num: 23, club: 'Barcelona', age: 22, initials: 'AB' },
        { name: 'Dani Vivian', num: 15, club: 'Athletic Club', age: 26, initials: 'DV' },
        { name: 'Pedro Porro', num: 22, club: 'Tottenham', age: 26, initials: 'PP' },
      ],
      'Mediocampistas': [
        { name: 'Rodri', num: 16, club: 'Manchester City', age: 29, initials: 'RO', star: true },
        { name: 'Pedri', num: 8, club: 'Barcelona', age: 23, initials: 'PE', star: true },
        { name: 'Fabián Ruiz', num: 7, club: 'PSG', age: 29, initials: 'FR' },
        { name: 'Mikel Merino', num: 18, club: 'Arsenal', age: 29, initials: 'MM' },
        { name: 'Álex Baena', num: 21, club: 'Villarreal', age: 24, initials: 'AB' },
        { name: 'Martín Zubimendi', num: 5, club: 'Arsenal', age: 26, initials: 'MZ' },
      ],
      'Delanteros': [
        { name: 'Lamine Yamal', num: 19, club: 'Barcelona', age: 18, initials: 'LY', star: true },
        { name: 'Nico Williams', num: 11, club: 'Athletic Club', age: 23, initials: 'NW', star: true },
        { name: 'Álvaro Morata', num: 9, club: 'AC Milan', age: 33, initials: 'AM' },
        { name: 'Dani Olmo', num: 10, club: 'Barcelona', age: 27, initials: 'DO' },
        { name: 'Ferran Torres', num: 20, club: 'Barcelona', age: 26, initials: 'FT' },
        { name: 'Mikel Oyarzabal', num: 17, club: 'Real Sociedad', age: 28, initials: 'MO' },
      ],
    }
  },
  germany: {
    culture: {
      tradicion: 'Alemania es la selección más consistente de la historia: cuatro títulos mundiales, cuatro finales más. La Mannschaft combina disciplina táctica, eficiencia y un fútbol físico y técnico que ha dominado el juego durante décadas.',
      gastronomia: 'Las salchichas bratwurst, el pretzel, el chucrut y la cerveza bávara son iconos de la cultura alemana. La Oktoberfest de Múnich convoca a más de seis millones de visitantes cada año.',
      musica: 'Beethoven, Bach y Brahms nacieron en tierra alemana. El techno moderno nació en Berlín, cuya escena electrónica es considerada la más influyente del mundo desde los años 90.',
      dato: 'Alemania es el único equipo que ha ganado Mundiales en tres continentes diferentes: Europa (1954, 1974), América (2014) y Europa (1990). El "Mineirazo" (7-1 a Brasil en 2014) sigue siendo la goleada más grande en una semifinal mundialista.',
    },
    coach: { name: 'Julian Nagelsmann', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Sandro Wagner', role: 'Asistente Técnico' },
      { name: 'Andreas Hinkel', role: 'Asistente Técnico' },
      { name: 'Andreas Kronenberg', role: 'Entrenador de Arqueros' },
      { name: 'Patrick Eibenberger', role: 'Preparador Físico' },
    ],
    description: 'Die Mannschaft llega al Mundial 2026 con una generación de talento excepcional liderada por Florian Wirtz y Jamal Musiala. Tras la decepción del Mundial 2022, Alemania busca recuperar su lugar entre las potencias mundiales.',
    colors: { primary: '#1A1A1A', secondary: '#FFFFFF', accent: '#DD0000' },
    squad: {
      'Porteros': [
        { name: 'Manuel Neuer', num: 1, club: 'Bayern Munich', age: 39, initials: 'MN' },
        { name: 'Marc-André ter Stegen', num: 12, club: 'Barcelona', age: 33, initials: 'MT' },
        { name: 'Oliver Baumann', num: 23, club: 'Hoffenheim', age: 35, initials: 'OB' },
      ],
      'Defensas': [
        { name: 'Joshua Kimmich', num: 6, club: 'Bayern Munich', age: 30, initials: 'JK', star: true },
        { name: 'Antonio Rüdiger', num: 2, club: 'Real Madrid', age: 32, initials: 'AR' },
        { name: 'Jonathan Tah', num: 4, club: 'Bayern Munich', age: 29, initials: 'JT' },
        { name: 'Nico Schlotterbeck', num: 5, club: 'Borussia Dortmund', age: 26, initials: 'NS' },
        { name: 'Maximilian Mittelstädt', num: 15, club: 'Stuttgart', age: 28, initials: 'MM' },
        { name: 'Benjamin Henrichs', num: 3, club: 'RB Leipzig', age: 28, initials: 'BH' },
      ],
      'Mediocampistas': [
        { name: 'Jamal Musiala', num: 10, club: 'Bayern Munich', age: 23, initials: 'JM', star: true },
        { name: 'Florian Wirtz', num: 10, club: 'Bayer Leverkusen', age: 22, initials: 'FW', star: true },
        { name: 'İlkay Gündoğan', num: 21, club: 'Barcelona', age: 35, initials: 'IG' },
        { name: 'Robert Andrich', num: 23, club: 'Bayer Leverkusen', age: 31, initials: 'RA' },
        { name: 'Emre Can', num: 8, club: 'Borussia Dortmund', age: 32, initials: 'EC' },
        { name: 'Pascal Groß', num: 14, club: 'Brighton', age: 34, initials: 'PG' },
      ],
      'Delanteros': [
        { name: 'Kai Havertz', num: 7, club: 'Arsenal', age: 27, initials: 'KH', star: true },
        { name: 'Leroy Sané', num: 19, club: 'Bayern Munich', age: 30, initials: 'LS' },
        { name: 'Thomas Müller', num: 13, club: 'Bayern Munich', age: 36, initials: 'TM' },
        { name: 'Deniz Undav', num: 9, club: 'Stuttgart', age: 29, initials: 'DU' },
        { name: 'Niclas Füllkrug', num: 22, club: 'West Ham', age: 32, initials: 'NF' },
        { name: 'Maximilian Beier', num: 17, club: 'Borussia Dortmund', age: 23, initials: 'MB' },
      ],
    }
  },
  england: {
    culture: {
      tradicion: 'Inglaterra inventó el fútbol moderno en el siglo XIX y lo exportó al mundo. El único título mundial de los ingleses llegó en casa en 1966, y desde entonces la nación aguarda con fervor una segunda conquista.',
      gastronomia: 'El fish and chips, el English breakfast completo, el roast beef del domingo y el pub son pilares de la identidad británica. El té con leche es un ritual cotidiano que trasciende clases sociales.',
      musica: 'Cuna de The Beatles, Rolling Stones, Queen, David Bowie y Adele. La escena musical inglesa ha definido el rock, el pop y el britpop que marcaron el siglo XX y sigue siendo referencia global.',
      dato: 'Inglaterra llegó a la final de la Eurocopa 2021 y 2024, perdiendo ambas por penales. La selección lleva 60 años esperando su segundo título mayor, lo que la convierte en una de las historias más apasionantes del fútbol moderno.',
    },
    coach: { name: 'Thomas Tuchel', role: 'Director Técnico', since: 2025 },
    staff: [
      { name: 'Anthony Barry', role: 'Asistente Técnico' },
      { name: 'Zsolt Löw', role: 'Asistente Técnico' },
      { name: 'Dean Henderson', role: 'Entrenador de Arqueros' },
      { name: 'Stuart Pearce', role: 'Asesor Técnico' },
    ],
    description: 'Los Leones llegan al Mundial 2026 con Jude Bellingham como su gran estrella y una plantilla repleta de talento de élite. Tras dos finales europeas perdidas, Inglaterra está más hambrienta que nunca de conquistar su segundo título mundial.',
    colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#012169' },
    squad: {
      'Porteros': [
        { name: 'Jordan Pickford', num: 1, club: 'Everton', age: 32, initials: 'JP' },
        { name: 'Aaron Ramsdale', num: 13, club: 'Southampton', age: 27, initials: 'AR' },
        { name: 'Dean Henderson', num: 23, club: 'Crystal Palace', age: 28, initials: 'DH' },
      ],
      'Defensas': [
        { name: 'Kyle Walker', num: 2, club: 'AC Milan', age: 35, initials: 'KW' },
        { name: 'John Stones', num: 5, club: 'Manchester City', age: 31, initials: 'JS' },
        { name: 'Harry Maguire', num: 6, club: 'Manchester United', age: 32, initials: 'HM' },
        { name: 'Marc Guéhi', num: 15, club: 'Crystal Palace', age: 25, initials: 'MG' },
        { name: 'Luke Shaw', num: 3, club: 'Manchester United', age: 30, initials: 'LS' },
        { name: 'Trent Alexander-Arnold', num: 22, club: 'Real Madrid', age: 27, initials: 'TA' },
      ],
      'Mediocampistas': [
        { name: 'Jude Bellingham', num: 10, club: 'Real Madrid', age: 22, initials: 'JB', star: true },
        { name: 'Declan Rice', num: 4, club: 'Arsenal', age: 27, initials: 'DR', star: true },
        { name: 'Phil Foden', num: 11, club: 'Manchester City', age: 26, initials: 'PF', star: true },
        { name: 'Conor Gallagher', num: 13, club: 'Atlético Madrid', age: 26, initials: 'CG' },
        { name: 'Kobbie Mainoo', num: 26, club: 'Manchester United', age: 21, initials: 'KM' },
        { name: 'Adam Wharton', num: 16, club: 'Crystal Palace', age: 21, initials: 'AW' },
      ],
      'Delanteros': [
        { name: 'Harry Kane', num: 9, club: 'Bayern Munich', age: 32, initials: 'HK', star: true },
        { name: 'Bukayo Saka', num: 7, club: 'Arsenal', age: 24, initials: 'BS', star: true },
        { name: 'Marcus Rashford', num: 19, club: 'Aston Villa', age: 28, initials: 'MR' },
        { name: 'Cole Palmer', num: 20, club: 'Chelsea', age: 23, initials: 'CP' },
        { name: 'Anthony Gordon', num: 24, club: 'Newcastle', age: 24, initials: 'AG' },
        { name: 'Ollie Watkins', num: 21, club: 'Aston Villa', age: 30, initials: 'OW' },
      ],
    }
  },
  portugal: {
    culture: {
      tradicion: 'Portugal vivió su época dorada con Eusébio en los años 60 y ha renacido en el siglo XXI de la mano de Cristiano Ronaldo. La Liga portuguesa ha exportado talento al mundo entero desde los célebres campos de Benfica, Porto y Sporting.',
      gastronomia: 'El bacalhau (bacalao) tiene más de mil recetas distintas y es el plato nacional por excelencia. Los pastéis de nata, el piri-piri y el vinho verde son embajadores de una cocina atlántica única.',
      musica: 'El fado, declarado Patrimonio Inmaterial de la UNESCO, es el alma musical de Portugal. Sus melodías melancólicas hablan de saudade — un sentimiento de nostalgia intraducible que define al pueblo portugués.',
      dato: 'Cristiano Ronaldo es el máximo goleador en la historia de los Mundiales con selecciones europeas. Portugal ganó su primer gran título en la Eurocopa 2016 y la Nations League 2019, abriendo una nueva era de éxitos.',
    },
    coach: { name: 'Roberto Martínez', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Emilio Álvarez', role: 'Asistente Técnico' },
      { name: 'José Tavares', role: 'Asistente Técnico' },
      { name: 'Rui Barbosa', role: 'Entrenador de Arqueros' },
      { name: 'Rui Faria', role: 'Preparador Físico' },
    ],
    description: 'A Seleção das Quinas llega al Mundial 2026 con una generación de lujo liderada por Bruno Fernandes y Bernardo Silva. Cristiano Ronaldo, con 41 años, aspira a coronar su carrera con el título que le falta. Portugal es favorita para llegar lejos.',
    colors: { primary: '#006600', secondary: '#FFFFFF', accent: '#C8102E' },
    squad: {
      'Porteros': [
        { name: 'Diogo Costa', num: 1, club: 'Porto', age: 26, initials: 'DC' },
        { name: 'José Sá', num: 12, club: 'Wolverhampton', age: 31, initials: 'JS' },
        { name: 'Rui Patrício', num: 23, club: 'Roma', age: 37, initials: 'RP' },
      ],
      'Defensas': [
        { name: 'Rúben Dias', num: 4, club: 'Manchester City', age: 28, initials: 'RD', star: true },
        { name: 'João Cancelo', num: 2, club: 'Barcelona', age: 31, initials: 'JC' },
        { name: 'Nuno Mendes', num: 19, club: 'PSG', age: 23, initials: 'NM' },
        { name: 'Danilo Pereira', num: 14, club: 'PSG', age: 33, initials: 'DP' },
        { name: 'António Silva', num: 6, club: 'Benfica', age: 22, initials: 'AS' },
        { name: 'Diogo Dalot', num: 22, club: 'Manchester United', age: 26, initials: 'DD' },
      ],
      'Mediocampistas': [
        { name: 'Bruno Fernandes', num: 8, club: 'Manchester United', age: 30, initials: 'BF', star: true },
        { name: 'Bernardo Silva', num: 10, club: 'Manchester City', age: 30, initials: 'BS', star: true },
        { name: 'Vitinha', num: 16, club: 'PSG', age: 25, initials: 'VI' },
        { name: 'João Neves', num: 15, club: 'PSG', age: 21, initials: 'JN' },
        { name: 'Rúben Neves', num: 15, club: 'Al-Hilal', age: 28, initials: 'RN' },
        { name: 'Matheus Nunes', num: 17, club: 'Manchester City', age: 27, initials: 'MN' },
      ],
      'Delanteros': [
        { name: 'Cristiano Ronaldo', num: 7, club: 'Al-Nassr', age: 41, initials: 'CR', star: true },
        { name: 'Rafael Leão', num: 11, club: 'AC Milan', age: 26, initials: 'RL', star: true },
        { name: 'Pedro Neto', num: 17, club: 'Chelsea', age: 25, initials: 'PN' },
        { name: 'Gonçalo Ramos', num: 9, club: 'PSG', age: 24, initials: 'GR' },
        { name: 'João Félix', num: 11, club: 'Chelsea', age: 26, initials: 'JF' },
        { name: 'Diogo Jota', num: 20, club: 'Liverpool', age: 28, initials: 'DJ' },
      ],
    }
  },
  netherlands: {
    culture: {
      tradicion: 'Los Países Bajos inventaron el "fútbol total" de Johan Cruyff en los años 70, revolucionando para siempre la forma de entender el juego. Tres finales mundiales sin título (1974, 1978, 2010) hacen de la Naranja Mecánica una historia de grandeza y tragedia.',
      gastronomia: 'El queso gouda y el edam son exportaciones culturales reconocidas globalmente. Los stroopwafels, el bitterballen y el arenque fresco con cebolla son delicias que forman parte del ADN holandés.',
      musica: 'La escena dance holandesa es una de las más influyentes del mundo. DJ Tiësto, Martin Garrix y Armin van Buuren llevan la música electrónica holandesa a todos los rincones del planeta.',
      dato: 'Los Países Bajos son el único país que ha llegado a tres finales mundiales sin ganar ninguna. La generación de Cruyff (1974) y Van Basten (1988, Eurocopa) representan las dos cimas más altas del fútbol neerlandés.',
    },
    coach: { name: 'Ronald Koeman', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Hedwiges Maduro', role: 'Asistente Técnico' },
      { name: 'Danny Blind', role: 'Asistente Técnico' },
      { name: 'Patrick Lodewijks', role: 'Entrenador de Arqueros' },
      { name: 'Remy Vogel', role: 'Preparador Físico' },
    ],
    description: 'De Oranje llega al Mundial 2026 con Virgil van Dijk como líder defensivo y una generación de talentos ofensivos liderada por Xavi Simons, Tijjani Reijnders y Cody Gakpo. Los holandeses aspiran a romper el maleficio de las finales perdidas.',
    colors: { primary: '#FF6600', secondary: '#FFFFFF', accent: '#21468B' },
    squad: {
      'Porteros': [
        { name: 'Bart Verbruggen', num: 1, club: 'Brighton', age: 23, initials: 'BV' },
        { name: 'Mark Flekken', num: 13, club: 'Brentford', age: 32, initials: 'MF' },
        { name: 'Justin Bijlow', num: 22, club: 'Feyenoord', age: 27, initials: 'JB' },
      ],
      'Defensas': [
        { name: 'Virgil van Dijk', num: 4, club: 'Liverpool', age: 34, initials: 'VD', star: true },
        { name: 'Denzel Dumfries', num: 22, club: 'Inter Milan', age: 29, initials: 'DD' },
        { name: 'Nathan Aké', num: 5, club: 'Manchester City', age: 30, initials: 'NA' },
        { name: 'Stefan de Vrij', num: 6, club: 'Inter Milan', age: 33, initials: 'SV' },
        { name: 'Daley Blind', num: 17, club: 'Girona', age: 34, initials: 'DB' },
        { name: 'Lutsharel Geertruida', num: 2, club: 'RB Leipzig', age: 25, initials: 'LG' },
      ],
      'Mediocampistas': [
        { name: 'Xavi Simons', num: 10, club: 'RB Leipzig', age: 22, initials: 'XS', star: true },
        { name: 'Tijjani Reijnders', num: 8, club: 'AC Milan', age: 27, initials: 'TR', star: true },
        { name: 'Frenkie de Jong', num: 21, club: 'Barcelona', age: 28, initials: 'FJ' },
        { name: 'Ryan Gravenberch', num: 16, club: 'Liverpool', age: 23, initials: 'RG' },
        { name: 'Teun Koopmeiners', num: 18, club: 'Juventus', age: 27, initials: 'TK' },
        { name: 'Joey Veerman', num: 15, club: 'PSV Eindhoven', age: 26, initials: 'JV' },
      ],
      'Delanteros': [
        { name: 'Cody Gakpo', num: 11, club: 'Liverpool', age: 26, initials: 'CG', star: true },
        { name: 'Donyell Malen', num: 7, club: 'Aston Villa', age: 26, initials: 'DM' },
        { name: 'Wout Weghorst', num: 9, club: 'Hoffenheim', age: 33, initials: 'WW' },
        { name: 'Brian Brobbey', num: 19, club: 'Ajax', age: 23, initials: 'BB' },
        { name: 'Noa Lang', num: 14, club: 'PSV Eindhoven', age: 26, initials: 'NL' },
        { name: 'Joshua Zirkzee', num: 20, club: 'Manchester United', age: 24, initials: 'JZ' },
      ],
    }
  },
  colombia: {
    culture: {
      tradicion: 'Colombia vivió su época dorada en los 90 con Valderrama, Higuita y el recordado gol de Escobar que cambiaría la historia. Hoy resurgió con una nueva generación brillante liderada por Luis Díaz y alcanzó la final de la Copa América 2024.',
      gastronomia: 'La bandeja paisa, el ajiaco santafereño, el sancocho y el chocolate con pandebono son platos que reflejan la diversidad geográfica y cultural del país. El café colombiano es considerado el mejor del mundo.',
      musica: 'Colombia dio al mundo a Shakira y Carlos Vives. La cumbia, el vallenato, el champeta y el reggaeton colombiano definen una escena musical que mezcla raíces africanas, indígenas y españolas.',
      dato: 'Colombia fue eliminada en octavos del Mundial 2014 con James Rodríguez como Bota de Oro y mejor jugador del torneo. En la Copa América 2024 llegó a la final invicta, perdiendo ante Argentina en tiempo extra.',
    },
    coach: { name: 'Néstor Lorenzo', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Diego Placente', role: 'Asistente Técnico' },
      { name: 'Walter Silvani', role: 'Asistente Técnico' },
      { name: 'José Ángel Gaspar', role: 'Entrenador de Arqueros' },
      { name: 'Pablo Coll', role: 'Preparador Físico' },
    ],
    description: 'Los Cafeteros llegan al Mundial 2026 en uno de sus mejores momentos históricos. Con Luis Díaz como estrella global y James Rodríguez dando sus últimas batallas, Colombia mezcla experiencia y juventud en un proyecto ilusionante.',
    colors: { primary: '#FCD116', secondary: '#FFFFFF', accent: '#003087' },
    squad: {
      'Porteros': [
        { name: 'Camilo Vargas', num: 1, club: 'Atlas', age: 35, initials: 'CV' },
        { name: 'David Ospina', num: 12, club: 'Al-Qadsiah', age: 36, initials: 'DO' },
        { name: 'Álvaro Montero', num: 23, club: 'Millonarios', age: 28, initials: 'AM' },
      ],
      'Defensas': [
        { name: 'Dávinson Sánchez', num: 2, club: 'Galatasaray', age: 29, initials: 'DS' },
        { name: 'Jhon Lucumí', num: 4, club: 'Bologna', age: 26, initials: 'JL' },
        { name: 'Carlos Cuesta', num: 3, club: 'Genk', age: 26, initials: 'CC' },
        { name: 'Johan Mojica', num: 3, club: 'Rayo Vallecano', age: 33, initials: 'JM' },
        { name: 'Daniel Muñoz', num: 22, club: 'Crystal Palace', age: 29, initials: 'DM' },
        { name: 'Yairo Moreno', num: 17, club: 'Club León', age: 30, initials: 'YM' },
      ],
      'Mediocampistas': [
        { name: 'James Rodríguez', num: 10, club: 'Rayo Vallecano', age: 34, initials: 'JR', star: true },
        { name: 'Richard Ríos', num: 8, club: 'Palmeiras', age: 25, initials: 'RR', star: true },
        { name: 'Mateus Uribe', num: 6, club: 'Porto', age: 34, initials: 'MU' },
        { name: 'Jhon Arias', num: 11, club: 'Fluminense', age: 28, initials: 'JA' },
        { name: 'Jefferson Lerma', num: 16, club: 'Crystal Palace', age: 30, initials: 'JL' },
        { name: 'Sebastián Villa', num: 19, club: 'Boca Juniors', age: 29, initials: 'SV' },
      ],
      'Delanteros': [
        { name: 'Luis Díaz', num: 7, club: 'Liverpool', age: 28, initials: 'LD', star: true },
        { name: 'Radamel Falcao', num: 9, club: 'Millonarios', age: 40, initials: 'RF', star: true },
        { name: 'Jhon Córdoba', num: 13, club: 'Krasnodar', age: 31, initials: 'JC' },
        { name: 'Rafael Santos Borré', num: 20, club: 'Eintracht Frankfurt', age: 29, initials: 'RB' },
        { name: 'Cucho Hernández', num: 21, club: 'Columbus Crew', age: 26, initials: 'CH' },
        { name: 'Miguel Borja', num: 14, club: 'River Plate', age: 31, initials: 'MB' },
      ],
    }
  },
  mexico: {
    culture: {
      tradicion: 'México ha participado en 17 de los 22 Mundiales disputados y en 2026 será sede por tercera vez, récord absoluto. El "Quinto partido" es el techo histórico que los mexicanos buscan romper desde 1986.',
      gastronomia: 'La cocina mexicana es Patrimonio Cultural Inmaterial de la Humanidad. Los tacos, el mole, el guacamole, el pozole y los chiles en nogada son sólo algunos ejemplos de una gastronomía milenaria de raíces aztecas.',
      musica: 'El mariachi, declarado Patrimonio de la Humanidad, es el símbolo musical de México. El regional mexicano, el norteño y el banda han conquistado Latinoamérica y Estados Unidos en el siglo XXI.',
      dato: 'México será sede del partido inaugural y de varios partidos del grupo A del Mundial 2026 en el Estadio Azteca, el único recinto en albergar dos finales mundialistas (1970 y 1986). El Azteca tiene capacidad para 87,000 personas.',
    },
    coach: { name: 'Javier Aguirre', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Rafael Márquez', role: 'Asistente Técnico' },
      { name: 'Miguel Fuentes', role: 'Asistente Técnico' },
      { name: 'Alfredo Talavera', role: 'Entrenador de Arqueros' },
      { name: 'Alberto Ignacio Pérez', role: 'Preparador Físico' },
    ],
    description: 'El Tri juega en casa ante su afición en el Mundial 2026. Con Santiago Giménez como referencia ofensiva y una nueva generación de jugadores formados en Europa, México aspira a superar el quinto partido por primera vez en cuatro décadas.',
    colors: { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126' },
    squad: {
      'Porteros': [
        { name: 'Guillermo Ochoa', num: 1, club: 'América', age: 41, initials: 'GO' },
        { name: 'Luis Malagón', num: 13, club: 'América', age: 28, initials: 'LM' },
        { name: 'Julio González', num: 23, club: 'Chivas', age: 29, initials: 'JG' },
      ],
      'Defensas': [
        { name: 'Jesús Gallardo', num: 23, club: 'Monterrey', age: 30, initials: 'JG' },
        { name: 'Johan Vásquez', num: 3, club: 'Génova', age: 26, initials: 'JV' },
        { name: 'César Montes', num: 15, club: 'Espanyol', age: 28, initials: 'CM' },
        { name: 'Jorge Sánchez', num: 22, club: 'Ajax', age: 27, initials: 'JS' },
        { name: 'Gerardo Arteaga', num: 17, club: 'Getafe', age: 26, initials: 'GA' },
        { name: 'Néstor Araujo', num: 5, club: 'América', age: 34, initials: 'NA' },
      ],
      'Mediocampistas': [
        { name: 'Edson Álvarez', num: 6, club: 'West Ham', age: 27, initials: 'EA', star: true },
        { name: 'Hirving Lozano', num: 22, club: 'PSV Eindhoven', age: 30, initials: 'HL', star: true },
        { name: 'Orbelin Pineda', num: 10, club: 'AEK Atenas', age: 29, initials: 'OP' },
        { name: 'Carlos Rodríguez', num: 8, club: 'Cruz Azul', age: 27, initials: 'CR' },
        { name: 'Luis Romo', num: 14, club: 'Monterrey', age: 30, initials: 'LR' },
        { name: 'Erick Gutiérrez', num: 18, club: 'PSV Eindhoven', age: 30, initials: 'EG' },
      ],
      'Delanteros': [
        { name: 'Santiago Giménez', num: 9, club: 'Feyenoord', age: 24, initials: 'SG', star: true },
        { name: 'Raúl Jiménez', num: 7, club: 'Fulham', age: 34, initials: 'RJ', star: true },
        { name: 'Henry Martín', num: 11, club: 'América', age: 32, initials: 'HM' },
        { name: 'Roberto Alvarado', num: 16, club: 'Chivas', age: 26, initials: 'RA' },
        { name: 'Alexis Vega', num: 19, club: 'Chivas', age: 28, initials: 'AV' },
        { name: 'Julián Quiñones', num: 20, club: 'América', age: 28, initials: 'JQ' },
      ],
    }
  },
  morocco: {
    culture: {
      tradicion: 'Marruecos escribió la historia en Qatar 2022: primer equipo africano en llegar a una semifinal mundialista. Los Atlas Lions representan a más de 400 millones de árabes y africanos y han cambiado la narrativa del fútbol global.',
      gastronomia: 'La cocina marroquí es una de las más sofisticadas del mundo árabe. El tajín, el cuscús, la pastilla y el té de menta con hierbabuena son experiencias gastronómicas declaradas Patrimonio de la Humanidad.',
      musica: 'La música gnawa, el chaabi y el andalusí reflejan la riqueza de una cultura en la encrucijada de Africa, Arabia y Europa. Casablanca ha surgido como centro de música electrónica árabe contemporánea.',
      dato: 'En Qatar 2022, Marruecos eliminó a Bélgica, España y Portugal antes de caer ante Francia en semifinales. Youssef En-Nesyri marcó el gol de la histórica victoria sobre Portugal. Fue la actuación más memorable de África en un Mundial.',
    },
    coach: { name: 'Walid Regragui', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Mustapha Hadji', role: 'Asistente Técnico' },
      { name: 'Abdelilah Fahmi', role: 'Entrenador de Arqueros' },
      { name: 'Éric Abidal', role: 'Director Deportivo' },
      { name: 'Rachid Harmouch', role: 'Preparador Físico' },
    ],
    description: 'Los Atlas Lions regresan al Mundial 2026 con el mismo hambre que los llevó a semifinales en Qatar. Con Achraf Hakimi como su gran estrella y Hakim Ziyech como artillero, Marruecos aspira a ir todavía más lejos esta vez.',
    colors: { primary: '#C1272D', secondary: '#FFFFFF', accent: '#006233' },
    squad: {
      'Porteros': [
        { name: 'Yassine Bounou', num: 1, club: 'Al-Hilal', age: 34, initials: 'YB' },
        { name: 'Munir Mohamedi', num: 13, club: 'Nantes', age: 34, initials: 'MM' },
        { name: 'Ahmed Reda Tagnaouti', num: 23, club: 'Wydad', age: 30, initials: 'AT' },
      ],
      'Defensas': [
        { name: 'Achraf Hakimi', num: 2, club: 'PSG', age: 27, initials: 'AH', star: true },
        { name: 'Romain Saïss', num: 5, club: 'Beşiktaş', age: 35, initials: 'RS' },
        { name: 'Nayef Aguerd', num: 6, club: 'West Ham', age: 29, initials: 'NA' },
        { name: 'Jawad El Yamiq', num: 3, club: 'Real Valladolid', age: 33, initials: 'JE' },
        { name: 'Noussair Mazraoui', num: 22, club: 'Manchester United', age: 27, initials: 'NM' },
        { name: 'Adam Masina', num: 15, club: 'Watford', age: 30, initials: 'AM' },
      ],
      'Mediocampistas': [
        { name: 'Hakim Ziyech', num: 7, club: 'Galatasaray', age: 33, initials: 'HZ', star: true },
        { name: 'Sofyan Amrabat', num: 4, club: 'Fenerbahçe', age: 29, initials: 'SA', star: true },
        { name: 'Azzedine Ounahi', num: 8, club: 'Marseille', age: 25, initials: 'AO' },
        { name: 'Bilal El Khannous', num: 16, club: 'Genk', age: 21, initials: 'BE' },
        { name: 'Selim Amallah', num: 18, club: 'Standard Lieja', age: 29, initials: 'SA' },
        { name: 'Abde Ezzalzouli', num: 11, club: 'Osasuna', age: 24, initials: 'AE' },
      ],
      'Delanteros': [
        { name: 'Youssef En-Nesyri', num: 9, club: 'Fenerbahçe', age: 28, initials: 'YE', star: true },
        { name: 'Soufiane Boufal', num: 10, club: 'Angers', age: 32, initials: 'SB' },
        { name: 'Munir El Haddadi', num: 14, club: 'Girona', age: 29, initials: 'ME' },
        { name: 'Zakaria Aboukhlal', num: 19, club: 'Toulouse', age: 25, initials: 'ZA' },
        { name: 'Ayoub El Kaabi', num: 20, club: 'Olympiacos', age: 29, initials: 'AK' },
        { name: 'Ryan Mmaee', num: 21, club: 'Ferencváros', age: 28, initials: 'RM' },
      ],
    }
  },
  canada: {
    culture: {
      tradicion: 'Canadá vive su era dorada: clasificó por primera vez al Mundial en 2022 desde 1986 y en 2026 será sede del torneo. La generación de Alphonso Davies ha transformado el fútbol canadiense en potencia continental.',
      gastronomia: 'La diversidad cultural canadiense se refleja en su cocina. El poutine (papas fritas con queso y salsa), el maple syrup y el butter tart son iconos de una gastronomía que fusiona raíces francesas, inglesas e indígenas.',
      musica: 'Canadá ha dado al mundo a Drake, The Weeknd, Celine Dion, Justin Bieber y Joni Mitchell. Montreal y Toronto son centros de una escena musical de clase mundial con influencias del hip-hop, pop y música francófona.',
      dato: 'Canadá clasificó al Mundial 2022 en primer lugar de la CONCACAF, por encima de México y Estados Unidos. Alphonso Davies, criado como refugiado, se convirtió en el símbolo de una generación que devolvió al fútbol canadiense al mapa mundial.',
    },
    coach: { name: 'Mauro Biello', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Sam Adekugbe', role: 'Asistente Técnico' },
      { name: 'Maxime Crépeau', role: 'Entrenador de Arqueros' },
      { name: 'Marco Carducci', role: 'Analista Técnico' },
      { name: 'Philippe Eullaffroy', role: 'Preparador Físico' },
    ],
    description: 'Los Maple Leafs juegan ante su gente en el Mundial 2026. Con Alphonso Davies como estrella mundial y Jonathan David como goleador letal, Canadá aspira a superar la fase de grupos por primera vez en su historia.',
    colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#FF1834' },
    squad: {
      'Porteros': [
        { name: 'Maxime Crépeau', num: 1, club: 'Portland Timbers', age: 30, initials: 'MC' },
        { name: 'James Pantemis', num: 12, club: 'CF Montréal', age: 29, initials: 'JP' },
        { name: 'Dayne St. Clair', num: 23, club: 'Minnesota United', age: 28, initials: 'DS' },
      ],
      'Defensas': [
        { name: 'Alphonso Davies', num: 3, club: 'Bayern Munich', age: 26, initials: 'AD', star: true },
        { name: 'Alistair Johnston', num: 2, club: 'Celtic', age: 27, initials: 'AJ' },
        { name: 'Kamal Miller', num: 5, club: 'Colorado Rapids', age: 29, initials: 'KM' },
        { name: 'Derek Cornelius', num: 6, club: 'Panathinaikos', age: 30, initials: 'DC' },
        { name: 'Sam Adekugbe', num: 3, club: 'Hatayspor', age: 30, initials: 'SA' },
        { name: 'Joel Waterman', num: 17, club: 'CF Montréal', age: 30, initials: 'JW' },
      ],
      'Mediocampistas': [
        { name: 'Stephen Eustaquio', num: 7, club: 'Porto', age: 29, initials: 'SE', star: true },
        { name: 'Tajon Buchanan', num: 11, club: 'Inter Milan', age: 27, initials: 'TB', star: true },
        { name: 'Atiba Hutchinson', num: 13, club: 'Besiktas', age: 43, initials: 'AH' },
        { name: 'Jonathan Osorio', num: 21, club: 'Toronto FC', age: 33, initials: 'JO' },
        { name: 'Mark-Anthony Kaye', num: 14, club: 'Toronto FC', age: 32, initials: 'MK' },
        { name: 'Ismael Koné', num: 16, club: 'Watford', age: 23, initials: 'IK' },
      ],
      'Delanteros': [
        { name: 'Jonathan David', num: 9, club: 'LOSC Lille', age: 25, initials: 'JD', star: true },
        { name: 'Cyle Larin', num: 19, club: 'Mallorca', age: 30, initials: 'CL', star: true },
        { name: 'Lucas Cavallini', num: 18, club: 'Vancouver Whitecaps', age: 32, initials: 'LC' },
        { name: 'Liam Millar', num: 17, club: 'Basel', age: 26, initials: 'LM' },
        { name: 'Ali Ahmed', num: 20, club: 'Hobro', age: 23, initials: 'AA' },
        { name: 'Richie Laryea', num: 22, club: 'Nottingham Forest', age: 31, initials: 'RL' },
      ],
    }
  },
  southafrica: {
    culture: {
      tradicion: 'Sudáfrica fue el primer país africano en albergar un Mundial (2010), dando al mundo las vuvuzelas y el rugido del continente. Bafana Bafana (Los chicos, los chicos) representan la nación arcoíris de Mandela en cada partido.',
      gastronomia: 'El braai (barbacoa sudafricana) es el ritual social por excelencia. El biltong (carne seca especiada), el bunny chow (pan de molde relleno de curry) y el bobotie (pastel de carne especiada) son platos únicos.',
      musica: 'El kwaito, el afrobeat sudafricano y el gqom de Durban han conquistado las pistas de baile mundiales. Artistas como Black Coffee han llevado la electrónica sudafricana a los grandes festivales europeos.',
      dato: 'En el Mundial 2010, Sudáfrica fue el único anfitrión en ser eliminado en fase de grupos. La nación espera que 2026 sea su redención. Su victoria sobre Francia en 2009 (Confederaciones) sigue siendo la mayor hazaña de Bafana Bafana.',
    },
    coach: { name: 'Hugo Broos', role: 'Director Técnico', since: 2021 },
    staff: [
      { name: 'Carlos Queiroz', role: 'Asesor Técnico' },
      { name: 'Reneilwe Letsholonyane', role: 'Asistente Técnico' },
      { name: 'Shu-Aib Walters', role: 'Entrenador de Arqueros' },
      { name: 'Lindani Gumbi', role: 'Preparador Físico' },
    ],
    description: 'Bafana Bafana regresa al Mundial por primera vez desde 2010. Liderados por Percy Tau y una nueva generación de talentos, Sudáfrica busca demostrar que África puede competir con las mejores selecciones del mundo.',
    colors: { primary: '#007A4D', secondary: '#FFFFFF', accent: '#FFB81C' },
    squad: {
      'Porteros': [
        { name: 'Ronwen Williams', num: 1, club: 'Mamelodi Sundowns', age: 33, initials: 'RW' },
        { name: 'Veli Mothwa', num: 12, club: 'AmaZulu', age: 33, initials: 'VM' },
        { name: 'Bruce Bvuma', num: 23, club: 'Kaizer Chiefs', age: 30, initials: 'BB' },
      ],
      'Defensas': [
        { name: 'Siyanda Xulu', num: 5, club: 'Persib Bandung', age: 34, initials: 'SX' },
        { name: 'Rushine de Reuck', num: 4, club: 'Mamelodi Sundowns', age: 30, initials: 'RR' },
        { name: 'Terrence Mashego', num: 3, club: 'Cape Town City', age: 27, initials: 'TM' },
        { name: 'Mothobi Mvala', num: 6, club: 'Mamelodi Sundowns', age: 30, initials: 'MM' },
        { name: 'Njabulo Ngcobo', num: 2, club: 'Kaizer Chiefs', age: 29, initials: 'NN' },
        { name: 'Aubrey Modiba', num: 17, club: 'Mamelodi Sundowns', age: 29, initials: 'AM' },
      ],
      'Mediocampistas': [
        { name: 'Themba Zwane', num: 10, club: 'Mamelodi Sundowns', age: 35, initials: 'TZ', star: true },
        { name: 'Bongani Zungu', num: 8, club: 'Mamelodi Sundowns', age: 32, initials: 'BZ' },
        { name: 'Ethan Ntwana', num: 16, club: 'Orlando Pirates', age: 22, initials: 'EN' },
        { name: 'Teboho Mokoena', num: 14, club: 'Mamelodi Sundowns', age: 29, initials: 'TM' },
        { name: 'Siyethemba Sithebe', num: 18, club: 'Orlando Pirates', age: 30, initials: 'SS' },
        { name: 'Yusuf Maart', num: 15, club: 'Kaizer Chiefs', age: 29, initials: 'YM' },
      ],
      'Delanteros': [
        { name: 'Percy Tau', num: 13, club: 'Al Ahly', age: 32, initials: 'PT', star: true },
        { name: 'Lyle Foster', num: 9, club: 'Burnley', age: 25, initials: 'LF', star: true },
        { name: 'Sipho Mbule', num: 11, club: 'Mamelodi Sundowns', age: 28, initials: 'SM' },
        { name: 'Evidence Makgopa', num: 19, club: 'Orlando Pirates', age: 26, initials: 'EM' },
        { name: 'Khuliso Mudau', num: 20, club: 'Mamelodi Sundowns', age: 26, initials: 'KM' },
        { name: 'Fagrie Lakay', num: 21, club: 'Cape Town City', age: 29, initials: 'FL' },
      ],
    }
  },
  southkorea: {
    culture: {
      tradicion: 'Corea del Sur protagonizó el mayor milagro del fútbol moderno en 2002: llegó a semis como co-sede eliminando a España, Italia y Portugal. Son Heung-min ha devuelto ese espíritu ganador a una selección con millones de fanáticos apasionados.',
      gastronomia: 'El kimchi (repollo fermentado picante) es el plato nacional y símbolo cultural. El bibimbap, el samgyeopsal (panceta a la brasa), los tteok y el ramyeon coreano son delicias que han conquistado el mundo.',
      musica: 'El K-pop es un fenómeno cultural global: BTS, BLACKPINK y EXO han redefinido la música pop mundial. Corea del Sur exporta cultura con una potencia y organización industrial única en el mundo del entretenimiento.',
      dato: 'Son Heung-min es el asiático con más goles en la Premier League. En 2022, Corea del Sur eliminó a Portugal en la fase de grupos con un gol en el minuto 91. El "milagro de Suwon" de 2002 sigue siendo el mayor logro del fútbol asiático.',
    },
    coach: { name: 'Hong Myung-bo', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Kim Nam-il', role: 'Asistente Técnico' },
      { name: 'Kim Byung-ji', role: 'Entrenador de Arqueros' },
      { name: 'Park Ji-sung', role: 'Asesor Técnico' },
      { name: 'Yoon Jong-hwan', role: 'Preparador Físico' },
    ],
    description: 'Los Guerreros Taeguk llegan con Son Heung-min como capitán y referente global. Lee Kang-in aporta desequilibrio y creatividad desde el PSG. Corea del Sur es el equipo asiático más peligroso del torneo.',
    colors: { primary: '#C60C30', secondary: '#FFFFFF', accent: '#003478' },
    squad: {
      'Porteros': [
        { name: 'Kim Seung-gyu', num: 1, club: 'Vissel Kobe', age: 36, initials: 'KS' },
        { name: 'Jo Hyeon-woo', num: 12, club: 'Ulsan HD', age: 33, initials: 'JH' },
        { name: 'Song Bum-keun', num: 23, club: 'Jeonbuk', age: 29, initials: 'SB' },
      ],
      'Defensas': [
        { name: 'Kim Min-jae', num: 3, club: 'Bayern Munich', age: 29, initials: 'KM', star: true },
        { name: 'Kim Jin-su', num: 2, club: 'Nottingham Forest', age: 32, initials: 'KJ' },
        { name: 'Lee Ki-je', num: 5, club: 'Ulsan HD', age: 28, initials: 'LK' },
        { name: 'Jung Seung-hyun', num: 4, club: 'Ulsan HD', age: 34, initials: 'JS' },
        { name: 'Yoon Jong-gyu', num: 22, club: 'Incheon United', age: 25, initials: 'YJ' },
        { name: 'Kim Tae-hwan', num: 17, club: 'Al-Qadsiah', age: 35, initials: 'KT' },
      ],
      'Mediocampistas': [
        { name: 'Lee Kang-in', num: 7, club: 'PSG', age: 24, initials: 'LK', star: true },
        { name: 'Hwang In-beom', num: 8, club: 'Urawa Reds', age: 29, initials: 'HI' },
        { name: 'Jung Woo-young', num: 16, club: 'Al-Qadsiah', age: 35, initials: 'JW' },
        { name: 'Paik Seung-ho', num: 14, club: 'Jeonbuk', age: 29, initials: 'PS' },
        { name: 'Son Jun-ho', num: 18, club: 'Krasnodar', age: 33, initials: 'SJ' },
        { name: 'Jeong Woo-yeong', num: 11, club: 'SC Freiburg', age: 27, initials: 'JW' },
      ],
      'Delanteros': [
        { name: 'Son Heung-min', num: 10, club: 'Tottenham', age: 34, initials: 'SH', star: true },
        { name: 'Hwang Hee-chan', num: 9, club: 'Wolverhampton', age: 30, initials: 'HH', star: true },
        { name: 'Cho Gue-sung', num: 19, club: 'Jeonbuk', age: 28, initials: 'CG' },
        { name: 'Hwang Ui-jo', num: 13, club: 'Nottingham Forest', age: 34, initials: 'HU' },
        { name: 'Oh Hyeon-gyu', num: 20, club: 'Celtic', age: 25, initials: 'OH' },
        { name: 'Um Won-sang', num: 21, club: 'Jeonbuk', age: 26, initials: 'EW' },
      ],
    }
  },
  czechrepublic: {
    culture: {
      tradicion: 'Checoslovaquia llegó a dos finales mundiales (1934 y 1962) y la República Checa ganó la Eurocopa 1976 bajo ese nombre. El fútbol checo ha dado al mundo a jugadores como Pavel Nedvěd, Petr Čech y Karel Poborský.',
      gastronomia: 'El svíčková (solomillo en salsa cremosa), el guláš checo, el trdelník y la cerveza Pilsner Urquell (inventada en Plzeň) son orgullos nacionales que definen la identidad culinaria centroeuropea.',
      musica: 'Praga es una de las ciudades con mayor densidad de salas de concierto del mundo. La música clásica de Dvořák y Smetana forma parte del ADN cultural checo. La escena indie y electrónica praguense es vibrante y reconocida en Europa.',
      dato: 'Patrik Schick marcó el mejor gol de la Eurocopa 2020 ante Escocia: un disparo desde el centro del campo que superó al portero. La República Checa ha clasificado a todos los Mundiales desde su independencia en 1993.',
    },
    coach: { name: 'Ivan Hašek', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Jaroslav Šilhavý', role: 'Asistente Técnico' },
      { name: 'Jiří Novák', role: 'Asistente Técnico' },
      { name: 'Tomáš Vaclík', role: 'Entrenador de Arqueros' },
      { name: 'Jan Dobeš', role: 'Preparador Físico' },
    ],
    description: 'La República Checa llega al Mundial con Tomáš Souček como motor en el mediocampo y Patrik Schick como referencia ofensiva. Un equipo trabajador, organizado y con calidad individual suficiente para sorprender a los grandes.',
    colors: { primary: '#D7141A', secondary: '#FFFFFF', accent: '#11457E' },
    squad: {
      'Porteros': [
        { name: 'Jiří Staněk', num: 1, club: 'Slavia Praga', age: 29, initials: 'JS' },
        { name: 'Matěj Kovář', num: 12, club: 'Bayer Leverkusen', age: 24, initials: 'MK' },
        { name: 'Jindřich Staněk', num: 23, club: 'Slavia Praga', age: 29, initials: 'JS' },
      ],
      'Defensas': [
        { name: 'Vladimír Coufal', num: 5, club: 'West Ham', age: 34, initials: 'VC' },
        { name: 'Tomáš Holeš', num: 2, club: 'Slavia Praga', age: 32, initials: 'TH' },
        { name: 'Ondřej Duda', num: 3, club: 'Hertha Berlin', age: 31, initials: 'OD' },
        { name: 'Robin Hranáč', num: 4, club: 'PSV Eindhoven', age: 25, initials: 'RH' },
        { name: 'Aleš Mateju', num: 22, club: 'Brescia', age: 30, initials: 'AM' },
        { name: 'David Zima', num: 17, club: 'Torino', age: 26, initials: 'DZ' },
      ],
      'Mediocampistas': [
        { name: 'Tomáš Souček', num: 8, club: 'West Ham', age: 31, initials: 'TS', star: true },
        { name: 'Alex Král', num: 6, club: 'Spartak Moscú', age: 28, initials: 'AK' },
        { name: 'Antonín Barák', num: 16, club: 'Fiorentina', age: 31, initials: 'AB' },
        { name: 'Lukáš Provod', num: 14, club: 'Slavia Praga', age: 29, initials: 'LP' },
        { name: 'Matěj Jurásek', num: 18, club: 'Slavia Praga', age: 22, initials: 'MJ' },
        { name: 'Ondřej Lingr', num: 11, club: 'Feyenoord', age: 27, initials: 'OL' },
      ],
      'Delanteros': [
        { name: 'Patrik Schick', num: 9, club: 'Bayer Leverkusen', age: 30, initials: 'PS', star: true },
        { name: 'Tomáš Čvančara', num: 19, club: 'Borussia M\'gladbach', age: 25, initials: 'TC', star: true },
        { name: 'Adam Hložek', num: 11, club: 'Bayer Leverkusen', age: 24, initials: 'AH' },
        { name: 'Jakub Pešek', num: 20, club: 'Slavia Praga', age: 24, initials: 'JP' },
        { name: 'Václav Jurečka', num: 13, club: 'Slavia Praga', age: 29, initials: 'VJ' },
        { name: 'Jan Kuchta', num: 21, club: 'Slavia Praga', age: 28, initials: 'JK' },
      ],
    }
  },
  bosnia: {
    culture: {
      tradicion: 'Bosnia y Herzegovina debutó en el Mundial 2014 con Edin Džeko y Miralem Pjanić como estrellas, ganando su primer partido mundialista ante Irán. El fútbol es la pasión que une a un país dividido por la guerra de los 90.',
      gastronomia: 'El ćevapi (salchichas de carne picada con pan pita y crema) es el plato nacional. El burek, el klepe y el bosanski lonac (guiso tradicional) reflejan la confluencia de culturas otomana, eslava y mediterránea.',
      musica: 'La sevdalinka, música tradicional bosnia de raíz otomana, es el alma musical del país. Artistas modernos como Dino Merlin han mezclado estas raíces con el pop balcánico para crear una identidad musical única.',
      dato: 'Bosnia clasificó al Mundial 2014 en su primer intento como nación independiente. Džeko fue el máximo goleador de la historia de la selección con más de 60 goles antes de retirarse. Pjanić fue uno de los mejores mediocampistas de su generación.',
    },
    coach: { name: 'Sergej Barbarez', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Elvir Bolić', role: 'Asistente Técnico' },
      { name: 'Kenan Bajramović', role: 'Asistente Técnico' },
      { name: 'Ibrahim Šehić', role: 'Entrenador de Arqueros' },
      { name: 'Dejan Milovanović', role: 'Preparador Físico' },
    ],
    description: 'Bosnia llega al Mundial 2026 con una nueva generación liderada por Ermedin Demirović y Amar Dedić. Tras las leyendas de Džeko y Pjanić, los Zmajevi (Dragones) buscan su segundo Mundial y demostrar que el talento bosnio sigue siendo de élite.',
    colors: { primary: '#002395', secondary: '#FFFFFF', accent: '#FCCA03' },
    squad: {
      'Porteros': [
        { name: 'Ibrahim Šehić', num: 1, club: 'Konyaspor', age: 38, initials: 'IS' },
        { name: 'Nikola Vasilj', num: 12, club: 'St. Pauli', age: 29, initials: 'NV' },
        { name: 'Kenan Piric', num: 23, club: 'IFK Göteborg', age: 32, initials: 'KP' },
      ],
      'Defensas': [
        { name: 'Amar Dedić', num: 2, club: 'RB Salzburg', age: 23, initials: 'AD', star: true },
        { name: 'Nikola Jurković', num: 5, club: 'Inter Milan', age: 26, initials: 'NJ' },
        { name: 'Ognjen Vranješ', num: 4, club: 'FK Spartak', age: 37, initials: 'OV' },
        { name: 'Jusuf Gazibegović', num: 22, club: 'RB Salzburg', age: 29, initials: 'JG' },
        { name: 'Darko Todorović', num: 3, club: 'NEC Nimega', age: 28, initials: 'DT' },
        { name: 'Dino Hotić', num: 17, club: 'Malmö FF', age: 31, initials: 'DH' },
      ],
      'Mediocampistas': [
        { name: 'Miralem Pjanić', num: 8, club: 'FK Buducnost', age: 37, initials: 'MP', star: true },
        { name: 'Sead Kolašinac', num: 5, club: 'Marseille', age: 33, initials: 'SK' },
        { name: 'Armin Hodžić', num: 11, club: 'FC Midtjylland', age: 31, initials: 'AH' },
        { name: 'Haris Tabak', num: 14, club: 'Zrinjski', age: 27, initials: 'HT' },
        { name: 'Amer Gojak', num: 16, club: 'Fenerbahçe', age: 28, initials: 'AG' },
        { name: 'Benjamin Tatar', num: 18, club: 'RB Salzburg', age: 26, initials: 'BT' },
      ],
      'Delanteros': [
        { name: 'Ermedin Demirović', num: 9, club: 'Stuttgart', age: 27, initials: 'ED', star: true },
        { name: 'Edin Džeko', num: 10, club: 'FK Buducnost', age: 41, initials: 'ED' },
        { name: 'Anel Ahmedhodžić', num: 19, club: 'Sheffield United', age: 27, initials: 'AA' },
        { name: 'Eldar Šečić', num: 20, club: 'FK Zrinjski', age: 29, initials: 'ES' },
        { name: 'Tarik Tissoudali', num: 7, club: 'AA Gent', age: 31, initials: 'TT' },
        { name: 'Adnan Džeko', num: 21, club: 'Olimpija Ljubljana', age: 27, initials: 'AD' },
      ],
    }
  },
  qatar: {
    culture: {
      tradicion: 'Catar organizó el Mundial 2022 en el primer torneo celebrado en el mundo árabe e islámico. La Selección qatarí, entrenada durante años para este momento, llegó como anfitrión y representó a toda la región con orgullo.',
      gastronomia: 'La cocina qatarí mezcla influencias árabes, persas e indias. El machbous (arroz especiado con carne), el harees (trigo y carne molida), las dátiles y el café árabe con cardamomo son pilares de una gastronomía de hospitalidad.',
      musica: 'La música tradicional qatarí incluye el leiwah y el fijiri (cantos de los pescadores de perlas). La música beduina con tambores y laúd árabe (oud) coexiste con una escena moderna influenciada por el pop occidental.',
      dato: 'Catar fue el primer país anfitrión en ser eliminado en la fase de grupos de un Mundial, perdiendo todos sus partidos en 2022. Akram Afif ganó el Balón de Oro de la AFC en 2023. La selección juega en el Estadio Lusail, el más grande de Qatar.',
    },
    coach: { name: 'Marquez López', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Abdelhamid Oumranssi', role: 'Asistente Técnico' },
      { name: 'Walid Regragui', role: 'Asesor Técnico' },
      { name: 'Saad Al-Shammari', role: 'Entrenador de Arqueros' },
      { name: 'Pedro Conde', role: 'Preparador Físico' },
    ],
    description: 'Catar regresa al Mundial 2026 con el objetivo de mejorar su papel como anfitrión en 2022. Akram Afif lidera a una selección que ha invertido enormemente en su desarrollo futbolístico y busca su primera victoria mundialista.',
    colors: { primary: '#8D1B3D', secondary: '#FFFFFF', accent: '#6B1430' },
    squad: {
      'Porteros': [
        { name: 'Meshaal Barsham', num: 1, club: 'Al Sadd', age: 28, initials: 'MB' },
        { name: 'Yousuf Hassan', num: 12, club: 'Al Duhail', age: 33, initials: 'YH' },
        { name: 'Assim Madibo', num: 23, club: 'Al Rayyan', age: 27, initials: 'AM' },
      ],
      'Defensas': [
        { name: 'Bassam Al-Rawi', num: 6, club: 'Al Sadd', age: 31, initials: 'BA' },
        { name: 'Homam Al-Amin', num: 3, club: 'Al Sadd', age: 29, initials: 'HA' },
        { name: 'Tarek Salman', num: 5, club: 'Al Duhail', age: 32, initials: 'TS' },
        { name: 'Pedro Miguel', num: 2, club: 'Al Duhail', age: 34, initials: 'PM' },
        { name: 'Abdelkarim Hassan', num: 13, club: 'Al Sadd', age: 30, initials: 'AH' },
        { name: 'Salem Al-Hajri', num: 17, club: 'Al Rayyan', age: 27, initials: 'SH' },
      ],
      'Mediocampistas': [
        { name: 'Karim Boudiaf', num: 8, club: 'Al Duhail', age: 35, initials: 'KB' },
        { name: 'Assim Madibo', num: 16, club: 'Al Sadd', age: 27, initials: 'AM' },
        { name: 'Ismaeel Mohammad', num: 14, club: 'Al Rayyan', age: 26, initials: 'IM' },
        { name: 'Ahmed Alaaeldin', num: 11, club: 'Al Sadd', age: 25, initials: 'AA' },
        { name: 'Hassan Al-Haydos', num: 10, club: 'Al Sadd', age: 33, initials: 'HH', star: true },
        { name: 'Yusuf Abdurisag', num: 18, club: 'Al Sailiya', age: 24, initials: 'YA' },
      ],
      'Delanteros': [
        { name: 'Akram Afif', num: 11, club: 'Al Sadd', age: 29, initials: 'AA', star: true },
        { name: 'Al Moez Ali', num: 19, club: 'Al Duhail', age: 28, initials: 'MA', star: true },
        { name: 'Almoez Ali', num: 9, club: 'Al Duhail', age: 28, initials: 'AL' },
        { name: 'Mohammed Waad', num: 7, club: 'Al Arabi', age: 24, initials: 'MW' },
        { name: 'Khalid Muneer', num: 20, club: 'Al Sailiya', age: 26, initials: 'KM' },
        { name: 'Naif Al-Hadhrami', num: 21, club: 'Al Rayyan', age: 25, initials: 'NA' },
      ],
    }
  },
  switzerland: {
    culture: {
      tradicion: 'Suiza es la selección más consistente del fútbol europeo de segunda línea: clasificada a 12 Mundiales consecutivos. Granit Xhaka y la generación de Kosovo-albaneses han dado una identidad multicultural única a la Nati.',
      gastronomia: 'El fondue de queso, el raclette, el Rösti y el chocolate suizo son iconos mundiales. La gastronomía helvética combina lo mejor de las tradiciones francesa, italiana y alemana con productos alpinos únicos.',
      musica: 'Suiza alberga festivales míticos como el Montreux Jazz Festival, fundado en 1967. La Orquesta de la Suisse Romande es referencia clásica, mientras que la escena indie y electrónica de Zúrich y Ginebra tiene proyección europea.',
      dato: 'Xherdan Shaqiri marcó el famoso gol en los últimos minutos ante Serbia en el Mundial 2018 celebrando con el águila albanesa. Suiza alcanzó cuartos de final en 2022 eliminando a Francia. Granit Xhaka fue capitán durante casi una década.',
    },
    coach: { name: 'Murat Yakin', role: 'Director Técnico', since: 2021 },
    staff: [
      { name: 'Giorgio Contini', role: 'Asistente Técnico' },
      { name: 'Patrick Rahmen', role: 'Asistente Técnico' },
      { name: 'David Superchi', role: 'Entrenador de Arqueros' },
      { name: 'Dani Gygax', role: 'Preparador Físico' },
    ],
    description: 'La Nati llega al Mundial 2026 con Granit Xhaka como capitán veterano y Breel Embolo como ariete. Suiza es un equipo disciplinado y peligroso que siempre supera las expectativas y puede eliminar a cualquier rival.',
    colors: { primary: '#D52B1E', secondary: '#FFFFFF', accent: '#FFFFFF' },
    squad: {
      'Porteros': [
        { name: 'Yann Sommer', num: 1, club: 'Inter Milan', age: 37, initials: 'YS' },
        { name: 'Gregor Kobel', num: 12, club: 'Borussia Dortmund', age: 28, initials: 'GK' },
        { name: 'Jonas Omlin', num: 23, club: 'Monaco', age: 31, initials: 'JO' },
      ],
      'Defensas': [
        { name: 'Manuel Akanji', num: 5, club: 'Manchester City', age: 30, initials: 'MA', star: true },
        { name: 'Ricardo Rodríguez', num: 13, club: 'Torino', age: 33, initials: 'RR' },
        { name: 'Nico Elvedi', num: 4, club: 'Borussia M\'gladbach', age: 29, initials: 'NE' },
        { name: 'Silvan Widmer', num: 2, club: 'Mainz', age: 32, initials: 'SW' },
        { name: 'Kevin Mbabu', num: 22, club: 'Fulham', age: 30, initials: 'KM' },
        { name: 'Fabian Schär', num: 20, club: 'Newcastle', age: 33, initials: 'FS' },
      ],
      'Mediocampistas': [
        { name: 'Granit Xhaka', num: 10, club: 'Bayer Leverkusen', age: 34, initials: 'GX', star: true },
        { name: 'Remo Freuler', num: 8, club: 'Nottingham Forest', age: 33, initials: 'RF' },
        { name: 'Denis Zakaria', num: 6, club: 'Monaco', age: 30, initials: 'DZ' },
        { name: 'Djibril Sow', num: 16, club: 'Sevilla', age: 29, initials: 'DS' },
        { name: 'Michel Aebischer', num: 14, club: 'Bologna', age: 28, initials: 'MA' },
        { name: 'Fabian Rieder', num: 18, club: 'Rennes', age: 24, initials: 'FR' },
      ],
      'Delanteros': [
        { name: 'Breel Embolo', num: 7, club: 'Monaco', age: 29, initials: 'BE', star: true },
        { name: 'Ruben Vargas', num: 11, club: 'Augsburg', age: 27, initials: 'RV' },
        { name: 'Noah Okafor', num: 17, club: 'AC Milan', age: 25, initials: 'NO' },
        { name: 'Zeki Amdouni', num: 9, club: 'Burnley', age: 26, initials: 'ZA' },
        { name: 'Kwadwo Duah', num: 19, club: 'Ludogorets', age: 28, initials: 'KD' },
        { name: 'Dan Ndoye', num: 21, club: 'Bologna', age: 25, initials: 'DN' },
      ],
    }
  },
  haiti: {
    culture: {
      tradicion: 'Haití fue la primera república negra del mundo, nacida de la única revolución de esclavos exitosa de la historia (1804). El fútbol haitiano tiene momentos épicos: clasificó al Mundial 1974 y fue el primer país caribeño en marcar en una fase final.',
      gastronomia: 'El griot (cerdo frito crujiente), el riz et pois (arroz con frijoles), el joumou (sopa de calabaza símbolo de la independencia) y los bannann peze (plátanos aplastados fritos) son platos de una cocina vibrante y picante.',
      musica: 'El kompa, género musical haitiano nacido en los años 50, conquista las pistas de toda la diáspora caribeña. El rara, la música vudú y el rap kreyòl expresan la identidad de un pueblo resiliente y creativo.',
      dato: 'En el Mundial 1974, Haití fue el equipo que más cerca estuvo de empatar con Italia, marcando el 1-1 antes de que Giacinto Facchetti cometiera un error que Italia aprovechó para remontar. Es considerado uno de los partidos más dramáticos del torneo.',
    },
    coach: { name: 'Marc Collat', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Jean-Jacques Pierre', role: 'Asistente Técnico' },
      { name: 'Frantz Mathieu', role: 'Entrenador de Arqueros' },
      { name: 'Dénèche Joseph', role: 'Preparador Físico' },
      { name: 'Réginal Goreux', role: 'Asesor Técnico' },
    ],
    description: 'Les Grenadiers llegan al Mundial 2026 como la gran sorpresa de CONCACAF. Con jugadores de la diáspora haitiana en Europa y Estados Unidos, Haití representa la pasión y resiliencia de un pueblo que nunca se rinde.',
    colors: { primary: '#00209F', secondary: '#FFFFFF', accent: '#D21034' },
    squad: {
      'Porteros': [
        { name: 'Josué Duverger', num: 1, club: 'Violette AC', age: 28, initials: 'JD' },
        { name: 'Guy Mbanyé', num: 12, club: 'Valenciennes', age: 32, initials: 'GM' },
        { name: 'Nathan Gorgelin', num: 23, club: 'Stade Rennais', age: 27, initials: 'NG' },
      ],
      'Defensas': [
        { name: 'Réginal Goreux', num: 2, club: 'Liège', age: 38, initials: 'RG' },
        { name: 'Derrick Étienne', num: 3, club: 'Columbus Crew', age: 31, initials: 'DE' },
        { name: 'Andrew Jean-Baptiste', num: 5, club: 'Nashville SC', age: 33, initials: 'AJ' },
        { name: 'Zachary Herivaux', num: 15, club: 'Valencia', age: 21, initials: 'ZH' },
        { name: 'Jodel Dossou', num: 17, club: 'Standard Lieja', age: 28, initials: 'JD' },
        { name: 'James Léandre', num: 22, club: 'CF Montréal', age: 27, initials: 'JL' },
      ],
      'Mediocampistas': [
        { name: 'Frantzdy Pierrot', num: 8, club: 'Minnesota United', age: 31, initials: 'FP', star: true },
        { name: 'Dukens Nazon', num: 10, club: 'Ottawa Fury', age: 32, initials: 'DN' },
        { name: 'Kevin Lafrance', num: 16, club: 'Columbus Crew', age: 29, initials: 'KL' },
        { name: 'Jeff Louis', num: 14, club: 'Violette AC', age: 26, initials: 'JL' },
        { name: 'Carlens Arcus', num: 18, club: 'Ottawa Fury', age: 28, initials: 'CA' },
        { name: 'Wilde-Donald Guerrier', num: 11, club: 'LA Galaxy', age: 32, initials: 'WG' },
      ],
      'Delanteros': [
        { name: 'Duckens Nazon', num: 9, club: 'Saint-Trond', age: 32, initials: 'DN', star: true },
        { name: 'Kervens Belfort', num: 7, club: 'Violette AC', age: 31, initials: 'KB' },
        { name: 'Mechack Jérôme', num: 19, club: 'Portland Timbers', age: 32, initials: 'MJ' },
        { name: 'Woodley Ismael', num: 20, club: 'AS Cavaly', age: 27, initials: 'WI' },
        { name: 'Nicolas Janvier', num: 21, club: 'SC Bastia', age: 30, initials: 'NJ' },
        { name: 'Myssiani Charles', num: 13, club: 'AS Don Bosco', age: 24, initials: 'MC' },
      ],
    }
  },
  scotland: {
    culture: {
      tradicion: 'Escocia es la selección de fútbol más antigua del mundo (primer partido internacional en 1872 vs Inglaterra). Clasificó a cinco Mundiales entre 1974 y 1998 sin pasar de la fase de grupos, lo que la convierte en una de las historias más dramáticas del fútbol.',
      gastronomia: 'El haggis (pudding de vísceras de oveja con avena y especias), las patatas fritas con vinagre de malta, los shortbread y el whisky escocés son iconos de una cultura culinaria robusta y sin adornos.',
      musica: 'La gaita es el instrumento nacional y símbolo de la identidad escocesa. La tradición folk de los Highlands ha influenciado al rock celta y a artistas como Travis, Belle and Sebastian y Frightened Rabbit.',
      dato: 'Escocia no se clasifica a un Mundial desde Francia 1998, una sequía de casi 30 años. Andrew Robertson es considerado el mejor lateral izquierdo de su generación. Scott McTominay fue héroe en la clasificación para la Eurocopa 2024 con goles decisivos.',
    },
    coach: { name: 'Steve Clarke', role: 'Director Técnico', since: 2019 },
    staff: [
      { name: 'John Carver', role: 'Asistente Técnico' },
      { name: 'Steve Woods', role: 'Entrenador de Arqueros' },
      { name: 'Graeme Jones', role: 'Asistente Técnico' },
      { name: 'Donald Park', role: 'Preparador Físico' },
    ],
    description: 'Los Tartan Army regresan al Mundial 2026 con Andrew Robertson como capitán y Scott McTominay como motor del equipo. Escocia lleva décadas esperando este momento y llegará con una intensidad y pasión característica de su fútbol.',
    colors: { primary: '#003078', secondary: '#FFFFFF', accent: '#00205B' },
    squad: {
      'Porteros': [
        { name: 'Angus Gunn', num: 1, club: 'Norwich City', age: 29, initials: 'AG' },
        { name: 'Craig Gordon', num: 12, club: 'Heart of Midlothian', age: 42, initials: 'CG' },
        { name: 'Liam Kelly', num: 23, club: 'Motherwell', age: 33, initials: 'LK' },
      ],
      'Defensas': [
        { name: 'Andrew Robertson', num: 3, club: 'Liverpool', age: 32, initials: 'AR', star: true },
        { name: 'Kieran Tierney', num: 5, club: 'Real Sociedad', age: 29, initials: 'KT' },
        { name: 'Grant Hanley', num: 6, club: 'Norwich City', age: 35, initials: 'GH' },
        { name: 'Jack Hendry', num: 4, club: 'Club Brugge', age: 30, initials: 'JH' },
        { name: 'Aaron Hickey', num: 2, club: 'Brentford', age: 24, initials: 'AH' },
        { name: 'Liam Cooper', num: 15, club: 'Celtic', age: 34, initials: 'LC' },
      ],
      'Mediocampistas': [
        { name: 'Scott McTominay', num: 8, club: 'Napoli', age: 30, initials: 'SM', star: true },
        { name: 'Callum McGregor', num: 10, club: 'Celtic', age: 32, initials: 'CM', star: true },
        { name: 'Ryan Christie', num: 11, club: 'Bournemouth', age: 31, initials: 'RC' },
        { name: 'John McGinn', num: 7, club: 'Aston Villa', age: 31, initials: 'JM' },
        { name: 'Billy Gilmour', num: 16, club: 'Brighton', age: 26, initials: 'BG' },
        { name: 'Stuart Armstrong', num: 14, club: 'Southampton', age: 33, initials: 'SA' },
      ],
      'Delanteros': [
        { name: 'Che Adams', num: 9, club: 'Torino', age: 30, initials: 'CA', star: true },
        { name: 'Lyndon Dykes', num: 19, club: 'QPR', age: 30, initials: 'LD' },
        { name: 'Lawrence Shankland', num: 20, club: 'Heart of Midlothian', age: 30, initials: 'LS' },
        { name: 'Ben Doak', num: 17, club: 'Liverpool', age: 22, initials: 'BD' },
        { name: 'Ryan Gauld', num: 21, club: 'Vancouver Whitecaps', age: 30, initials: 'RG' },
        { name: 'Liel Abada', num: 13, club: 'Celtic', age: 25, initials: 'LA' },
      ],
    }
  },
  paraguay: {
    culture: {
      tradicion: 'Paraguay es el único país suramericano que habla guaraní como lengua co-oficial. El fútbol es la pasión nacional: han clasificado a ocho Mundiales y llegaron a cuartos de final en 2010. El "Schelotto style" de juego directo y físico define a la Albirroja.',
      gastronomia: 'La sopa paraguaya (un pastel de harina de maíz, queso y cebolla) y el chipá (pan de almidón de yuca) son únicos en el mundo. El tereré (mate frío con hierbas) es la bebida nacional consumida en todo momento.',
      musica: 'El arpa paraguaya es el instrumento nacional y símbolo del alma guaraní. La música de los jesuitas del siglo XVII y la polca paraguaya forman la base de una tradición musical que mezcla raíces indígenas y europeas.',
      dato: 'Paraguay llegó a cuartos de final del Mundial 2010 con un equipo sin grandes estrellas individuales pero con una fe colectiva inquebrantable. Salvador Cabañas fue la gran estrella paraguaya antes de sufrir un gravísimo ataque en 2010.',
    },
    coach: { name: 'Gustavo Alfaro', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Diego Churin', role: 'Asistente Técnico' },
      { name: 'Justo Villar', role: 'Entrenador de Arqueros' },
      { name: 'Pablo Neme', role: 'Preparador Físico' },
      { name: 'Carlos Gamarra', role: 'Asesor Técnico' },
    ],
    description: 'La Albirroja llega al Mundial 2026 con Miguel Almirón como referente y una nueva generación de jugadores forjados en el fútbol europeo. Paraguay es un equipo difícil de batir que siempre compite hasta el final.',
    colors: { primary: '#D52B1E', secondary: '#FFFFFF', accent: '#0038A8' },
    squad: {
      'Porteros': [
        { name: 'Antony Silva', num: 1, club: 'Olimpia', age: 40, initials: 'AS' },
        { name: 'Alfredo Aguilar', num: 12, club: 'Olimpia', age: 30, initials: 'AA' },
        { name: 'Rodrigo Muñoz', num: 23, club: 'Cerro Porteño', age: 30, initials: 'RM' },
      ],
      'Defensas': [
        { name: 'Junior Alonso', num: 3, club: 'Atlético Mineiro', age: 31, initials: 'JA', star: true },
        { name: 'Omar Alderete', num: 4, club: 'Getafe', age: 28, initials: 'OA' },
        { name: 'Gustavo Gómez', num: 2, club: 'Palmeiras', age: 32, initials: 'GG' },
        { name: 'Fabián Balbuena', num: 5, club: 'Olimpia', age: 34, initials: 'FB' },
        { name: 'Robert Rojas', num: 15, club: 'River Plate', age: 29, initials: 'RR' },
        { name: 'Santiago Arzamendia', num: 17, club: 'Cádiz', age: 28, initials: 'SA' },
      ],
      'Mediocampistas': [
        { name: 'Miguel Almirón', num: 10, club: 'Newcastle', age: 33, initials: 'MA', star: true },
        { name: 'Mathías Villasanti', num: 8, club: 'Grêmio', age: 30, initials: 'MV', star: true },
        { name: 'Ángel Cardozo Lucena', num: 6, club: 'Cerro Porteño', age: 31, initials: 'AC' },
        { name: 'Andrés Cubas', num: 14, club: 'Nottingham Forest', age: 29, initials: 'AC' },
        { name: 'Richard Sánchez', num: 16, club: 'América', age: 29, initials: 'RS' },
        { name: 'Damián Bobadilla', num: 18, club: 'Getafe', age: 28, initials: 'DB' },
      ],
      'Delanteros': [
        { name: 'Antonio Sanabria', num: 9, club: 'Torino', age: 29, initials: 'AS', star: true },
        { name: 'Alejandro Romero', num: 7, club: 'Valencia', age: 29, initials: 'AR' },
        { name: 'Jorge Morel', num: 11, club: 'Olimpia', age: 31, initials: 'JM' },
        { name: 'Alberto Espínola', num: 19, club: 'Olimpia', age: 26, initials: 'AE' },
        { name: 'Julio Enciso', num: 20, club: 'Brighton', age: 22, initials: 'JE' },
        { name: 'Gabriel Ávalos', num: 21, club: 'Sapporo', age: 29, initials: 'GA' },
      ],
    }
  },
  australia: {
    culture: {
      tradicion: 'Los Socceroos han vivido una revolución: de rareza mundialista a semifinalista en 2006 (primer gran hito) y a octavos en 2022 con la nueva generación. Harry Kewell, Tim Cahill y ahora Minamino definen el crecimiento de un deporte que compite con el rugby y cricket.',
      gastronomia: 'El meat pie (pastel de carne), el pavlova (merengue con fruta), el Vegemite (pasta salada de levadura) y el barramundi a la parrilla son platos que reflejan la mezcla de tradición británica y gastronomía multicultural.',
      musica: 'Australia ha dado al mundo a AC/DC, INXS, Nick Cave y Kylie Minogue. La escena indie australiana de Melbourne y Sídney tiene proyección internacional, mientras que la música de los pueblos aborígenes es una de las más antiguas del planeta.',
      dato: 'En 2006, Australia llegó a octavos de final de su primer Mundial (como Socceroos en FIFA). En Qatar 2022 eliminó a Dinamarca y estuvo cerca de batir a Argentina. Maty Ryan fue héroe en el penal decisivo contra Perú en el repechaje 2022.',
    },
    coach: { name: 'Tony Popovic', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Mehmet Durakovic', role: 'Asistente Técnico' },
      { name: 'Danny Vukovic', role: 'Entrenador de Arqueros' },
      { name: 'Ante Milicic', role: 'Asesor Técnico' },
      { name: 'Peter Cklamovski', role: 'Preparador Físico' },
    ],
    description: 'Los Socceroos llegan al Mundial 2026 con hambre de repetir su actuación de Qatar 2022. Martin Boyle y la nueva generación lideran un equipo que mezcla veteranos forjados en Europa con promesas jóvenes del fútbol asiático.',
    colors: { primary: '#00843D', secondary: '#FFFFFF', accent: '#FFCD00' },
    squad: {
      'Porteros': [
        { name: 'Mathew Ryan', num: 1, club: 'Real Sociedad', age: 33, initials: 'MR', star: true },
        { name: 'Danny Vukovic', num: 12, club: 'Retirado', age: 40, initials: 'DV' },
        { name: 'Joe Gauci', num: 23, club: 'Adelaide United', age: 26, initials: 'JG' },
      ],
      'Defensas': [
        { name: 'Miloš Degenek', num: 5, club: 'Columbus Crew', age: 32, initials: 'MD' },
        { name: 'Aziz Behich', num: 3, club: 'Dundee United', age: 34, initials: 'AB' },
        { name: 'Harry Souttar', num: 4, club: 'Leicester City', age: 27, initials: 'HS' },
        { name: 'Nathaniel Atkinson', num: 2, club: 'Heart of Midlothian', age: 27, initials: 'NA' },
        { name: 'Fran Karacic', num: 22, club: 'Brescia', age: 29, initials: 'FK' },
        { name: 'Cameron Burgess', num: 17, club: 'Ipswich Town', age: 29, initials: 'CB' },
      ],
      'Mediocampistas': [
        { name: 'Aaron Mooy', num: 13, club: 'Celtic', age: 36, initials: 'AM', star: true },
        { name: 'Jackson Irvine', num: 8, club: 'St. Pauli', age: 32, initials: 'JI' },
        { name: 'Riley McGree', num: 10, club: 'Middlesbrough', age: 27, initials: 'RM' },
        { name: 'Ajdin Hrustic', num: 14, club: 'Hellas Verona', age: 29, initials: 'AH' },
        { name: 'Denis Genreau', num: 16, club: 'Toulouse', age: 26, initials: 'DG' },
        { name: 'Keanu Baccus', num: 18, club: 'St. Mirren', age: 28, initials: 'KB' },
      ],
      'Delanteros': [
        { name: 'Martin Boyle', num: 11, club: 'Hibernian', age: 33, initials: 'MB', star: true },
        { name: 'Mathew Leckie', num: 7, club: 'Melbourne City', age: 36, initials: 'ML' },
        { name: 'Nestory Irankunda', num: 9, club: 'Bayern Munich', age: 20, initials: 'NI', star: true },
        { name: 'Mitchell Duke', num: 19, club: 'Fagiano Okayama', age: 35, initials: 'MD' },
        { name: 'Marco Tilio', num: 20, club: 'Celtic', age: 25, initials: 'MT' },
        { name: 'Nick D\'Agostino', num: 21, club: 'FC Augsburg', age: 25, initials: 'ND' },
      ],
    }
  },
  turkey: {
    culture: {
      tradicion: 'Turquía protagonizó una de las mayores sorpresas mundialistas en 2002, llegando a semifinales y quedando tercera. Hakan Şükür marcó el gol más rápido de la historia de los Mundiales (11 segundos) ante Corea del Sur en el partido por el tercer puesto.',
      gastronomia: 'El kebab, el baklava, el börek, el meze y el ayran son iconos de una gastronomía ubicada en la encrucijada de Europa y Asia. İstanbul tiene la mayor densidad de restaurantes por kilómetro cuadrado de cualquier ciudad del mundo.',
      musica: 'La música turca mezcla raíces otomanas, anatolias, griegas y persas. El arabesk, el pop turco y artistas como Tarkan han tenido impacto internacional. İstanbul es una de las ciudades más vibrantes del mundo para la música en vivo.',
      dato: 'Arda Güler marcó tres goles en la Eurocopa 2024 con apenas 19 años, convirtiéndose en el jugador más joven en marcar en fases finales europeas. Turquía tiene una de las bases de fanáticos más apasionadas y numerosas de Europa.',
    },
    coach: { name: 'Vincenzo Montella', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Hasan Şaş', role: 'Asistente Técnico' },
      { name: 'Volkan Demirel', role: 'Entrenador de Arqueros' },
      { name: 'Tuncay Şanlı', role: 'Asistente Técnico' },
      { name: 'Marco Fasano', role: 'Preparador Físico' },
    ],
    description: 'La Selección turca llega al Mundial 2026 con Arda Güler y Kenan Yıldız como las nuevas joyas del fútbol europeo, y Hakan Çalhanoğlu como cerebro del equipo. Turquía tiene el talento para llegar lejos en el torneo.',
    colors: { primary: '#E30A17', secondary: '#FFFFFF', accent: '#B20710' },
    squad: {
      'Porteros': [
        { name: 'Mert Günok', num: 1, club: 'Besiktas', age: 36, initials: 'MG' },
        { name: 'Uğurcan Çakır', num: 12, club: 'Trabzonspor', age: 29, initials: 'UC' },
        { name: 'Altay Bayındır', num: 23, club: 'Manchester United', age: 27, initials: 'AB' },
      ],
      'Defensas': [
        { name: 'Zeki Çelik', num: 2, club: 'Roma', age: 28, initials: 'ZC' },
        { name: 'Merih Demiral', num: 3, club: 'Al-Qadsiah', age: 27, initials: 'MD', star: true },
        { name: 'Samet Akaydin', num: 5, club: 'Fenerbahçe', age: 32, initials: 'SA' },
        { name: 'Ferdi Kadıoğlu', num: 22, club: 'Brighton', age: 26, initials: 'FK' },
        { name: 'Abdülkerim Bardakcı', num: 4, club: 'Galatasaray', age: 28, initials: 'AB' },
        { name: 'Mert Müldür', num: 17, club: 'Sassuolo', age: 27, initials: 'MM' },
      ],
      'Mediocampistas': [
        { name: 'Hakan Çalhanoğlu', num: 10, club: 'Inter Milan', age: 32, initials: 'HC', star: true },
        { name: 'Salih Özcan', num: 8, club: 'Borussia Dortmund', age: 27, initials: 'SO' },
        { name: 'Kaan Ayhan', num: 16, club: 'Galatasaray', age: 30, initials: 'KA' },
        { name: 'Orkun Kökçü', num: 14, club: 'Benfica', age: 25, initials: 'OK' },
        { name: 'Okay Yokuşlu', num: 6, club: 'West Brom', age: 32, initials: 'OY' },
        { name: 'İrfan Can Kahveci', num: 18, club: 'Fenerbahçe', age: 31, initials: 'IK' },
      ],
      'Delanteros': [
        { name: 'Arda Güler', num: 10, club: 'Real Madrid', age: 21, initials: 'AG', star: true },
        { name: 'Kenan Yıldız', num: 7, club: 'Juventus', age: 21, initials: 'KY', star: true },
        { name: 'Cenk Tosun', num: 9, club: 'Besiktas', age: 36, initials: 'CT' },
        { name: 'Yunus Akgün', num: 11, club: 'Galatasaray', age: 26, initials: 'YA' },
        { name: 'Baris Yılmaz', num: 19, club: 'Fenerbahçe', age: 24, initials: 'BY' },
        { name: 'Halil Dervişoğlu', num: 20, club: 'Galatasaray', age: 26, initials: 'HD' },
      ],
    }
  },
  curacao: {
    culture: {
      tradicion: 'Curazao es una isla del Caribe con apenas 160.000 habitantes que ha producido una cantidad desproporcionada de futbolistas de élite. La diáspora curazaleña en los Países Bajos es el motor de un fútbol que mezcla el talento caribeño con la formación europea.',
      gastronomia: 'El keshi yena (queso relleno de carne especiada), el stoba (guiso de cabra o carne) y el pan bati (pan de maíz) reflejan la mezcla de influencias africanas, europeas y sudamericanas de la cocina de la isla.',
      musica: 'El tumba y la música de carnaval son el corazón cultural de Curazao. El carnaval curazaleño es uno de los más vibrantes del Caribe. La isla habla papiamento, un criollo único que mezcla español, portugués, holandés y lenguas africanas.',
      dato: 'Curazao clasificó por primera vez a una Copa de Oro de la CONCACAF en 2017 y ha mejorado progresivamente. Muchos de sus jugadores nacieron en los Países Bajos pero eligieron representar a la isla de sus orígenes. Es el país más pequeño en la historia del Mundial 2026.',
    },
    coach: { name: 'Remko Bicentini', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Etienne Sievering', role: 'Asistente Técnico' },
      { name: 'Leo Lima', role: 'Entrenador de Arqueros' },
      { name: 'Randolph Bryson', role: 'Preparador Físico' },
      { name: 'Cuco Martina', role: 'Asesor Técnico' },
    ],
    description: 'Curazao hace historia clasificando al Mundial 2026. Con jugadores formados en los Países Bajos y la pasión caribeña, los Dushi Birdjes (Pájaros Dulces) representan el sueño de una nación pequeña que sueña en grande.',
    colors: { primary: '#002B7F', secondary: '#FFFFFF', accent: '#F9E814' },
    squad: {
      'Porteros': [
        { name: 'Eloy Room', num: 1, club: 'Columbus Crew', age: 34, initials: 'ER' },
        { name: 'Timon Wellenreuther', num: 12, club: 'Anderlecht', age: 29, initials: 'TW' },
        { name: 'Cody Boel', num: 23, club: 'KV Mechelen', age: 26, initials: 'CB' },
      ],
      'Defensas': [
        { name: 'Leandro Bacuna', num: 5, club: 'Middlesbrough', age: 34, initials: 'LB', star: true },
        { name: 'Jurien Gaari', num: 3, club: 'AFC Ajax', age: 28, initials: 'JG' },
        { name: 'Ethan Marshallns', num: 4, club: 'Stoke City', age: 27, initials: 'EM' },
        { name: 'Cuco Martina', num: 2, club: 'Retirado', age: 38, initials: 'CM' },
        { name: 'Riechedly Bazoer', num: 15, club: 'FC Utrecht', age: 30, initials: 'RB' },
        { name: 'Giliano Wijnaldum', num: 22, club: 'FC Emmen', age: 26, initials: 'GW' },
      ],
      'Mediocampistas': [
        { name: 'Jordy Clasie', num: 8, club: 'AZ Alkmaar', age: 34, initials: 'JC', star: true },
        { name: 'Jarchinio Antonia', num: 10, club: 'Retirado', age: 33, initials: 'JA' },
        { name: 'Gevaro Nepomuceno', num: 11, club: 'IF Elfsborg', age: 32, initials: 'GN' },
        { name: 'Gaston Celian', num: 16, club: 'Lommel United', age: 26, initials: 'GC' },
        { name: 'Brandley Kuwas', num: 14, club: 'Groningen', age: 32, initials: 'BK' },
        { name: 'Damil Dankerlui', num: 18, club: 'Almere City', age: 24, initials: 'DD' },
      ],
      'Delanteros': [
        { name: 'Ryan Oosterwolde', num: 7, club: 'Toulouse', age: 25, initials: 'RO', star: true },
        { name: 'Chedric Bazoer', num: 9, club: 'FC Emmen', age: 28, initials: 'CB' },
        { name: 'Rangelo Janga', num: 19, club: 'FC Volendam', age: 30, initials: 'RJ' },
        { name: 'Myron Boadu', num: 20, club: 'Monaco', age: 25, initials: 'MB' },
        { name: 'Cody Gakpo', num: 21, club: 'Liverpool', age: 27, initials: 'CG' },
        { name: 'Denilho Cleur', num: 13, club: 'FC Volendam', age: 28, initials: 'DC' },
      ],
    }
  },
  cotedivoire: {
    culture: {
      tradicion: 'Costa de Marfil es la potencia futbolística de África Occidental. Dos Copas Africanas de Naciones (2015 y 2024) y una generación de Drogba que marcó una época. Los Elefantes tienen una cantera de talento que sigue dando jugadores de élite al mundo.',
      gastronomia: 'El attièké (cuscús de yuca fermentada), el foutou (masa de plátano y ñame), el kedjenou (pollo guisado en olla de barro) y el café y cacao marfileños (los mejores del mundo) definen una gastronomía vibrante y especiada.',
      musica: 'El coupé-décalé nació en Costa de Marfil y conquistó toda el África francófona. Douk Saga fue su creador. La música marfileña mezcla ritmos tradicionales akan y mandingue con influencias del afropop moderno.',
      dato: 'Costa de Marfil ganó la Copa Africana 2024 como anfitriona de manera épica, remontando desde la eliminación en fase de grupos para llegar y ganar la final. Didier Drogba llevó al país a su primer Mundial (2006) y cambió la historia del fútbol africano.',
    },
    coach: { name: 'Emerse Faé', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Jean-Louis Gasset', role: 'Asesor Técnico' },
      { name: 'Romaric N\'Dri', role: 'Asistente Técnico' },
      { name: 'Eliezer N\'Tebe', role: 'Entrenador de Arqueros' },
      { name: 'Jean-Marc Nobilo', role: 'Preparador Físico' },
    ],
    description: 'Los Elefantes llegan al Mundial 2026 como campeones de África. Sébastien Haller y Simon Adingra lideran un equipo que combina la intensidad física africana con la técnica de jugadores forjados en las mejores ligas europeas.',
    colors: { primary: '#F77F00', secondary: '#FFFFFF', accent: '#009A44' },
    squad: {
      'Porteros': [
        { name: 'Yahia Fofana', num: 1, club: 'Chelsea', age: 28, initials: 'YF', star: true },
        { name: 'Badra Ali Sangaré', num: 12, club: 'FC Nantes', age: 33, initials: 'BS' },
        { name: 'Hervé Koffi', num: 23, club: 'Charleroi', age: 29, initials: 'HK' },
      ],
      'Defensas': [
        { name: 'Serge Aurier', num: 2, club: 'Nottingham Forest', age: 33, initials: 'SA' },
        { name: 'Wilfried Singo', num: 22, club: 'Monaco', age: 25, initials: 'WS' },
        { name: 'Eric Bailly', num: 3, club: 'Besiktas', age: 31, initials: 'EB' },
        { name: 'Odilon Kossounou', num: 4, club: 'Bayer Leverkusen', age: 25, initials: 'OK' },
        { name: 'Ghislain Konan', num: 15, club: 'Stade de Reims', age: 30, initials: 'GK' },
        { name: 'Jean-Philippe Gbamin', num: 5, club: 'PAOK', age: 30, initials: 'JG' },
      ],
      'Mediocampistas': [
        { name: 'Franck Kessié', num: 8, club: 'Al-Ahli', age: 29, initials: 'FK', star: true },
        { name: 'Ibrahim Sangaré', num: 6, club: 'Nottingham Forest', age: 28, initials: 'IS' },
        { name: 'Seko Fofana', num: 10, club: 'Al-Nassr', age: 30, initials: 'SF', star: true },
        { name: 'Jean Michaël Seri', num: 14, club: 'Galatasaray', age: 33, initials: 'JS' },
        { name: 'Blend Ekhéator', num: 16, club: 'Hellas Verona', age: 23, initials: 'BE' },
        { name: 'Oumar Diakité', num: 18, club: 'FC Nantes', age: 27, initials: 'OD' },
      ],
      'Delanteros': [
        { name: 'Sébastien Haller', num: 9, club: 'Borussia Dortmund', age: 31, initials: 'SH', star: true },
        { name: 'Simon Adingra', num: 11, club: 'Brighton', age: 23, initials: 'SA', star: true },
        { name: 'Nicolas Pépé', num: 19, club: 'Besiktas', age: 31, initials: 'NP' },
        { name: 'Wilfried Zaha', num: 7, club: 'Retirado', age: 34, initials: 'WZ' },
        { name: 'Didier Drogba II', num: 20, club: 'AFAD Djékanou', age: 25, initials: 'DD' },
        { name: 'Jonathan Bamba', num: 21, club: 'Club Brugge', age: 29, initials: 'JB' },
      ],
    }
  },
  ecuador: {
    culture: {
      tradicion: 'Ecuador ha participado en tres Mundiales (2002, 2006 y 2014) y siempre ha sorprendido. Agustín Delgado fue el primer goleador ecuatoriano en un Mundial. La generación de Enner Valencia y Moisés Caicedo ha llevado al fútbol ecuatoriano a otro nivel.',
      gastronomia: 'El ceviche ecuatoriano, el seco de pollo, las llapingachos (tortillas de papa con chorizo), el sancocho y el jugo de naranjilla son platos que reflejan la riqueza gastronómica de un país con cuatro regiones climáticas distintas.',
      musica: 'La cumbia ecuatoriana, el pasillo (declarado Patrimonio Cultural Inmaterial) y el sanjuanito son géneros que expresan la identidad de un pueblo que mezcla raíces andinas, afro y montubias. Guayaquil tiene una vibrante escena de música tropical.',
      dato: 'Ecuador abrió el Mundial 2022 marcando dos goles en el primer partido (vs Qatar). Enner Valencia fue el máximo goleador de La Tri con más de 40 goles. Moisés Caicedo fue fichado por Chelsea por 116 millones de euros en 2023, récord para un jugador de la región.',
    },
    coach: { name: 'Sebastián Beccacece', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Diego Placente', role: 'Asistente Técnico' },
      { name: 'Hernán Galíndez', role: 'Entrenador de Arqueros' },
      { name: 'Rodrigo Martínez', role: 'Preparador Físico' },
      { name: 'Félix Sánchez Bas', role: 'Asesor Técnico' },
    ],
    description: 'La Tri llega al Mundial 2026 con Moisés Caicedo como estrella mundial y una generación de talentos formados en Europa. Ecuador es el equipo sudamericano más en forma del momento y aspira a superar la fase de grupos por segunda vez en su historia.',
    colors: { primary: '#FFD100', secondary: '#FFFFFF', accent: '#034EA2' },
    squad: {
      'Porteros': [
        { name: 'Hernán Galíndez', num: 1, club: 'Aucas', age: 36, initials: 'HG' },
        { name: 'Alexander Domínguez', num: 12, club: 'LDU Quito', age: 39, initials: 'AD' },
        { name: 'Wellington Ramírez', num: 23, club: 'Emelec', age: 27, initials: 'WR' },
      ],
      'Defensas': [
        { name: 'Piero Hincapié', num: 3, club: 'Bayer Leverkusen', age: 24, initials: 'PH', star: true },
        { name: 'Félix Torres', num: 4, club: 'Santos Laguna', age: 28, initials: 'FT' },
        { name: 'Diego Palacios', num: 15, club: 'Portland Timbers', age: 26, initials: 'DP' },
        { name: 'Byron Castillo', num: 2, club: 'León', age: 27, initials: 'BC' },
        { name: 'Jackson Porozo', num: 5, club: 'Troyes', age: 25, initials: 'JP' },
        { name: 'Pervis Estupiñán', num: 22, club: 'Brighton', age: 27, initials: 'PE' },
      ],
      'Mediocampistas': [
        { name: 'Moisés Caicedo', num: 10, club: 'Chelsea', age: 25, initials: 'MC', star: true },
        { name: 'Jhegson Méndez', num: 8, club: 'LA Galaxy', age: 27, initials: 'JM' },
        { name: 'Carlos Gruezo', num: 6, club: 'FC Augsburg', age: 30, initials: 'CG' },
        { name: 'Jeremy Sarmiento', num: 11, club: 'Brighton', age: 25, initials: 'JS', star: true },
        { name: 'Gonzalo Plata', num: 7, club: 'Al-Qadsiah', age: 25, initials: 'GP' },
        { name: 'Alan Franco', num: 16, club: 'Talleres', age: 27, initials: 'AF' },
      ],
      'Delanteros': [
        { name: 'Enner Valencia', num: 13, club: 'Internacional', age: 37, initials: 'EV', star: true },
        { name: 'Leonardo Campana', num: 9, club: 'Inter Miami', age: 25, initials: 'LC', star: true },
        { name: 'Michael Estrada', num: 19, club: 'Cruz Azul', age: 29, initials: 'ME' },
        { name: 'Kevin Rodríguez', num: 20, club: 'Ipswich Town', age: 24, initials: 'KR' },
        { name: 'Djorkaeff Reasco', num: 21, club: 'Necaxa', age: 26, initials: 'DR' },
        { name: 'Fidel Martínez', num: 17, club: 'Portland Timbers', age: 29, initials: 'FM' },
      ],
    }
  },
  japan: {
    culture: {
      tradicion: 'Japón ha clasificado a todos los Mundiales desde 1998, con cuartos de final en 2022 como hito máximo. La J.League ha creado una cultura futbolística profunda. La disciplina táctica y la intensidad física japonesa son reconocidas en todo el mundo.',
      gastronomia: 'La cocina japonesa (washoku) es Patrimonio Cultural Inmaterial de la UNESCO. El sushi, el ramen, el tempura, el wagyu y el matcha representan una gastronomía milenaria basada en el equilibrio, la presentación y los sabores umami.',
      musica: 'El J-pop y el J-rock tienen millones de seguidores globales. Artistas como Hikaru Utada y bandas como X Japan son íconos. La escena de idol groups y el anime han convertido a Japón en una superpotencia de la cultura pop global.',
      dato: 'En Qatar 2022, Japón eliminó a Alemania y España en la fase de grupos con remontadas épicas. Fue el primer equipo asiático en ganar al campeón alemán en un Mundial. Kaoru Mitoma se convirtió en sensación viral por sus regates y su velocidad endiablada.',
    },
    coach: { name: 'Hajime Moriyasu', role: 'Director Técnico', since: 2018 },
    staff: [
      { name: 'Tsuyoshi Otsuki', role: 'Asistente Técnico' },
      { name: 'Makoto Teguramori', role: 'Asistente Técnico' },
      { name: 'Go Tanaka', role: 'Entrenador de Arqueros' },
      { name: 'Takumi Hayashi', role: 'Preparador Físico' },
    ],
    description: 'Los Samurái Azul llegan al Mundial 2026 motivados por sus victorias ante Alemania y España en 2022. Kaoru Mitoma y Takumi Minamino lideran un equipo técnico, intenso y capaz de competir con cualquier selección del mundo.',
    colors: { primary: '#1A1A6C', secondary: '#FFFFFF', accent: '#BC002D' },
    squad: {
      'Porteros': [
        { name: 'Shuichi Gonda', num: 12, club: 'Shimizu S-Pulse', age: 31, initials: 'SG' },
        { name: 'Zion Suzuki', num: 1, club: 'Anderlecht', age: 23, initials: 'ZS' },
        { name: 'Kosuke Nakamura', num: 23, club: 'Gamba Osaka', age: 37, initials: 'KN' },
      ],
      'Defensas': [
        { name: 'Maya Yoshida', num: 22, club: 'FC Schalke 04', age: 37, initials: 'MY' },
        { name: 'Hiroki Sakai', num: 5, club: 'Urawa Red Diamonds', age: 35, initials: 'HS' },
        { name: 'Ko Itakura', num: 3, club: 'Borussia M\'gladbach', age: 28, initials: 'KI', star: true },
        { name: 'Yuto Nagatomo', num: 5, club: 'FC Tokyo', age: 38, initials: 'YN' },
        { name: 'Miki Yamane', num: 2, club: 'Kawasaki Frontale', age: 32, initials: 'MY' },
        { name: 'Takehiro Tomiyasu', num: 6, club: 'Arsenal', age: 28, initials: 'TT' },
      ],
      'Mediocampistas': [
        { name: 'Wataru Endo', num: 13, club: 'Liverpool', age: 33, initials: 'WE', star: true },
        { name: 'Daichi Kamada', num: 14, club: 'Crystal Palace', age: 30, initials: 'DK' },
        { name: 'Ritsu Doan', num: 8, club: 'SC Freiburg', age: 28, initials: 'RD', star: true },
        { name: 'Junya Ito', num: 17, club: 'Stade de Reims', age: 32, initials: 'JI' },
        { name: 'Hidemasa Morita', num: 10, club: 'Sporting CP', age: 31, initials: 'HM' },
        { name: 'Ao Tanaka', num: 16, club: 'Borussia Dortmund', age: 27, initials: 'AT' },
      ],
      'Delanteros': [
        { name: 'Kaoru Mitoma', num: 11, club: 'Brighton', age: 29, initials: 'KM', star: true },
        { name: 'Takumi Minamino', num: 10, club: 'Monaco', age: 32, initials: 'TM', star: true },
        { name: 'Ayase Ueda', num: 9, club: 'Feyenoord', age: 27, initials: 'AU' },
        { name: 'Kyogo Furuhashi', num: 19, club: 'Celtic', age: 31, initials: 'KF' },
        { name: 'Keito Nakamura', num: 21, club: 'Stade de Reims', age: 25, initials: 'KN' },
        { name: 'Genki Haraguchi', num: 7, club: 'Hannover 96', age: 35, initials: 'GH' },
      ],
    }
  },
  sweden: {
    culture: {
      tradicion: 'Suecia fue tercera en el Mundial 1994 con Tomas Brolin y Henrik Larsson, y semifinalista en 1958 (derrota ante Brasil con Pelé). Zlatan Ibrahimović es el jugador más icónico del fútbol sueco de todos los tiempos y un símbolo cultural global.',
      gastronomia: 'El köttbullar (albóndigas suecas con salsa de crema y arándanos), el gravlax (salmón marinado), el smörgåsbord (bufé escandinavo) y la canela de los kanelbullar son iconos de una cocina nórdica limpia y reconocida.',
      musica: 'Suecia es la tercera mayor exportadora de música pop del mundo tras USA y UK. ABBA, Avicii, Robyn, Roxette y Swedish House Mafia han redefinido el pop, el dance y la música electrónica global desde los años 70.',
      dato: 'Viktor Gyökeres marcó 43 goles en la temporada 2023-24 con el Sporting CP, convirtiéndose en uno de los delanteros más en forma del mundo. Sin Zlatan, Suecia ha encontrado en Alexander Isak y Dejan Kulusevski su nueva delantera de élite.',
    },
    coach: { name: 'Jon Dahl Tomasson', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Peter Wettergren', role: 'Asistente Técnico' },
      { name: 'Jimmy Glass', role: 'Entrenador de Arqueros' },
      { name: 'Marcus Allbäck', role: 'Asistente Técnico' },
      { name: 'Magnus Haglund', role: 'Preparador Físico' },
    ],
    description: 'Los Blågult llegan al Mundial 2026 sin Zlatan pero con Viktor Gyökeres como el delantero más en forma de Europa y Alexander Isak consolidado en la Premier League. Suecia tiene el talento para ir más allá de la fase de grupos.',
    colors: { primary: '#006AA7', secondary: '#FFFFFF', accent: '#FECC02' },
    squad: {
      'Porteros': [
        { name: 'Robin Olsen', num: 1, club: 'Aston Villa', age: 35, initials: 'RO' },
        { name: 'Karl-Johan Johnsson', num: 12, club: 'Djurgårdens IF', age: 35, initials: 'KJ' },
        { name: 'Oscar Jansson', num: 23, club: 'IFK Göteborg', age: 34, initials: 'OJ' },
      ],
      'Defensas': [
        { name: 'Victor Lindelöf', num: 5, club: 'Manchester United', age: 32, initials: 'VL', star: true },
        { name: 'Ludwig Augustinsson', num: 3, club: 'Sevilla', age: 31, initials: 'LA' },
        { name: 'Isak Hien', num: 4, club: 'Atalanta', age: 26, initials: 'IH' },
        { name: 'Carl Starfelt', num: 6, club: 'Celtic', age: 30, initials: 'CS' },
        { name: 'Mikael Lustig', num: 2, club: 'Retirado', age: 38, initials: 'ML' },
        { name: 'Filip Helander', num: 15, club: 'Malmö FF', age: 33, initials: 'FH' },
      ],
      'Mediocampistas': [
        { name: 'Dejan Kulusevski', num: 10, club: 'Tottenham', age: 27, initials: 'DK', star: true },
        { name: 'Emil Forsberg', num: 8, club: 'RB Leipzig', age: 34, initials: 'EF' },
        { name: 'Albin Ekdal', num: 16, club: 'Retirado', age: 36, initials: 'AE' },
        { name: 'Mattias Svanberg', num: 14, club: 'Wolfsburg', age: 28, initials: 'MS' },
        { name: 'Samuel Adingra', num: 18, club: 'FC Copenhagen', age: 25, initials: 'SA' },
        { name: 'Lucas Bergvall', num: 11, club: 'Tottenham', age: 20, initials: 'LB' },
      ],
      'Delanteros': [
        { name: 'Alexander Isak', num: 9, club: 'Newcastle', age: 27, initials: 'AI', star: true },
        { name: 'Viktor Gyökeres', num: 11, club: 'Arsenal', age: 29, initials: 'VG', star: true },
        { name: 'Robin Quaison', num: 7, club: 'Real Valladolid', age: 32, initials: 'RQ' },
        { name: 'Jordan Larsson', num: 19, club: 'PAOK', age: 28, initials: 'JL' },
        { name: 'Jesper Karlsson', num: 21, club: 'Bologna', age: 28, initials: 'JK' },
        { name: 'Anthony Elanga', num: 20, club: 'Nottingham Forest', age: 24, initials: 'AE' },
      ],
    }
  },
  tunisia: {
    culture: {
      tradicion: 'Túnez es el país africano que más veces ha clasificado al Mundial (6 participaciones). En 2022 fueron el único equipo que venció a Francia (campeona del mundo) en la fase de grupos, aunque no alcanzó para clasificarse. Los Águilas de Cartago son el orgullo del Magreb.',
      gastronomia: 'El couscous tunecino, la brik (pasta fina rellena de huevo y atún), el lablabi (sopa de garbanzos con especias) y la harissa (pasta de chili picante inventada en Túnez) son platos de una cocina mediterránea con profunda influencia árabe y bereber.',
      musica: 'El malouf, música andaluza-árabe traída por los moriscos expulsados de España en el siglo XVII, es el patrimonio musical más refinado de Túnez. La música chaabi moderna y el hip-hop tunecino son fenómenos populares en toda la región.',
      dato: 'En la Copa Africana 2004, Túnez ganó su único título continental como anfitrión. Hannibal Mejbri, criado en Manchester United, es la gran promesa del fútbol tunecino moderno. Túnez tiene la tasa de alfabetización más alta del norte de África.',
    },
    coach: { name: 'Jalel Kadri', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Khaled Ben Yahia', role: 'Asistente Técnico' },
      { name: 'Moez Ben Chérifia', role: 'Entrenador de Arqueros' },
      { name: 'Maher Kanzari', role: 'Asistente Técnico' },
      { name: 'Marouane Chamakh', role: 'Asesor Técnico' },
    ],
    description: 'Las Águilas de Cartago llegan al Mundial 2026 con Hannibal Mejbri como bandera de la nueva generación. Túnez siempre compite intensamente y puede dar la sorpresa ante cualquier rival en el primer partido.',
    colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#E70013' },
    squad: {
      'Porteros': [
        { name: 'Aymen Dahmen', num: 1, club: 'Montpellier', age: 30, initials: 'AD' },
        { name: 'Bechir Ben Said', num: 12, club: 'CS Sfaxien', age: 31, initials: 'BS' },
        { name: 'Moez Ben Chérifia', num: 23, club: 'Retirado', age: 41, initials: 'MB' },
      ],
      'Defensas': [
        { name: 'Montassar Talbi', num: 5, club: 'Lorient', age: 27, initials: 'MT' },
        { name: 'Wajdi Kechrida', num: 2, club: 'Trabzonspor', age: 31, initials: 'WK' },
        { name: 'Dylan Bronn', num: 6, club: 'Salernitana', age: 30, initials: 'DB' },
        { name: 'Nader Ghandri', num: 3, club: 'Barnsley', age: 31, initials: 'NG' },
        { name: 'Ali Abdi', num: 22, club: 'Valenciennes', age: 31, initials: 'AA' },
        { name: 'Mohamed Drager', num: 4, club: 'FC Metz', age: 30, initials: 'MD' },
      ],
      'Mediocampistas': [
        { name: 'Hannibal Mejbri', num: 8, club: 'Burnley', age: 23, initials: 'HM', star: true },
        { name: 'Aïssa Laïdouni', num: 6, club: 'Ferencváros', age: 30, initials: 'AL' },
        { name: 'Naïm Sliti', num: 11, club: 'Al-Qadsiah', age: 33, initials: 'NS' },
        { name: 'Wahbi Khazri', num: 10, club: 'Retirado', age: 34, initials: 'WK' },
        { name: 'Ghailene Chaalali', num: 14, club: 'Espérance Tunis', age: 31, initials: 'GC' },
        { name: 'Hamza Rafia', num: 16, club: 'Juventus', age: 26, initials: 'HR' },
      ],
      'Delanteros': [
        { name: 'Youssef Msakni', num: 7, club: 'Al-Qadsiah', age: 35, initials: 'YM', star: true },
        { name: 'Seifeddine Jaziri', num: 9, club: 'Wydad Casablanca', age: 33, initials: 'SJ', star: true },
        { name: 'Ellyes Skhiri', num: 19, club: 'Eintracht Frankfurt', age: 30, initials: 'ES' },
        { name: 'Mohamed Ben Romdhane', num: 20, club: 'Nîmes Olympique', age: 29, initials: 'MB' },
        { name: 'Sayfallah Ltaief', num: 21, club: 'Espérance Tunis', age: 27, initials: 'SL' },
        { name: 'Mortadha Ben Ouanes', num: 13, club: 'CS Sfaxien', age: 28, initials: 'MB' },
      ],
    }
  },
  belgium: {
    culture: {
      tradicion: 'Bélgica fue tercera en el Mundial 2018 con la "Generación Dorada" de De Bruyne, Hazard, Lukaku y Kompany. Ese equipo fue el mejor del mundo en el ranking FIFA durante varios años. La transición hacia una nueva generación está en marcha.',
      gastronomia: 'Las patatas fritas belgas (inventadas en Bélgica, no en Francia), los waffles, los mejillones con fritas, el chocolate belga y las más de 1.500 variedades de cerveza artesanal hacen de Bélgica una meca gastronómica europea.',
      musica: 'Bélgica tiene una escena musical sorprendentemente rica: Stromae conquistó Europa con el afropop francófono, Angèle domina el pop en francés y la escena electrónica de Bruselas es una de las más reconocidas del mundo.',
      dato: 'Kevin De Bruyne es considerado el mejor mediocampista de su generación. En 2018, Bélgica eliminó a Brasil en cuartos de final con uno de los mejores partidos mundialistas de la historia. La "Generación Dorada" nunca ganó un título, lo que se considera una de las mayores tragedias del fútbol moderno.',
    },
    coach: { name: 'Domenico Tedesco', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Thierry Henry', role: 'Asistente Técnico' },
      { name: 'Graeme Jones', role: 'Asistente Técnico' },
      { name: 'Stijn Stijnen', role: 'Entrenador de Arqueros' },
      { name: 'Kristof De Smedt', role: 'Preparador Físico' },
    ],
    description: 'Los Diablos Rojos inician una nueva era tras la Generación Dorada. Con De Bruyne todavía en el equipo y jóvenes como Lois Openda y Jeremy Doku, Bélgica tiene la mezcla de experiencia y frescura para sorprender en el Mundial 2026.',
    colors: { primary: '#1A1A1A', secondary: '#FFFFFF', accent: '#C8102E' },
    squad: {
      'Porteros': [
        { name: 'Koen Casteels', num: 1, club: 'Al-Qadsiah', age: 33, initials: 'KC' },
        { name: 'Thomas Kaminski', num: 12, club: 'Luton Town', age: 33, initials: 'TK' },
        { name: 'Matz Sels', num: 23, club: 'Nottingham Forest', age: 33, initials: 'MS' },
      ],
      'Defensas': [
        { name: 'Timothy Castagne', num: 22, club: 'Fulham', age: 29, initials: 'TC' },
        { name: 'Toby Alderweireld', num: 2, club: 'Retirado', age: 38, initials: 'TA' },
        { name: 'Wout Faes', num: 4, club: 'Leicester City', age: 27, initials: 'WF' },
        { name: 'Arthur Theate', num: 5, club: 'Rennes', age: 25, initials: 'AT' },
        { name: 'Thomas Meunier', num: 12, club: 'Trabzonspor', age: 33, initials: 'TM' },
        { name: 'Zeno Debast', num: 3, club: 'Sporting CP', age: 23, initials: 'ZD' },
      ],
      'Mediocampistas': [
        { name: 'Kevin De Bruyne', num: 7, club: 'Manchester City', age: 36, initials: 'KD', star: true },
        { name: 'Alexis Saelemaekers', num: 11, club: 'Bologna', age: 26, initials: 'AS', star: true },
        { name: 'Youri Tielemans', num: 8, club: 'Aston Villa', age: 30, initials: 'YT' },
        { name: 'Amadou Onana', num: 6, club: 'Aston Villa', age: 24, initials: 'AO' },
        { name: 'Orel Mangala', num: 14, club: 'Everton', age: 27, initials: 'OM' },
        { name: 'Charles De Ketelaere', num: 17, club: 'Atalanta', age: 25, initials: 'CK' },
      ],
      'Delanteros': [
        { name: 'Romelu Lukaku', num: 9, club: 'Napoli', age: 33, initials: 'RL', star: true },
        { name: 'Lois Openda', num: 10, club: 'RB Leipzig', age: 25, initials: 'LO', star: true },
        { name: 'Jeremy Doku', num: 11, club: 'Manchester City', age: 24, initials: 'JD' },
        { name: 'Johan Bakayoko', num: 19, club: 'PSV Eindhoven', age: 23, initials: 'JB' },
        { name: 'Dodi Lukebakio', num: 20, club: 'Sevilla', age: 28, initials: 'DL' },
        { name: 'Loïs Openda', num: 21, club: 'RB Leipzig', age: 25, initials: 'LO' },
      ],
    }
  },
  egypt: {
    culture: {
      tradicion: 'Egipto es el país con más Copas Africanas de Naciones (8 títulos). Mohamed Salah ha llevado al fútbol egipcio a una dimensión global. Los Faraones son la selección histórica más exitosa de África y una de las más queridas del continente.',
      gastronomia: 'El koshari (mezcla de arroz, pasta, lentejas y salsa de tomate), el ful medames (habas estofadas), el falafel egipcio y el shawarma son platos de una cocina milenaria que nutre a 100 millones de personas en el corazón del mundo árabe.',
      musica: 'Umm Kulthum, la "Estrella de Oriente", es considerada la cantante árabe más importante de la historia. La música shaabi, el mahraganat y el pop árabe egipcio de El Cairo se exportan a toda la región árabe y la diáspora global.',
      dato: 'Mohamed Salah es el jugador africano más importante de la historia del fútbol moderno. Ha ganado dos Premios de Bota de Oro en la Premier League. Egipto no clasifica a un Mundial desde 1990, y 2026 podría romper esa sequía de 36 años.',
    },
    coach: { name: 'Hossam Hassan', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Ihab Galal', role: 'Asistente Técnico' },
      { name: 'Mohamed Zidan', role: 'Asistente Técnico' },
      { name: 'Sherif Ekramy', role: 'Entrenador de Arqueros' },
      { name: 'Ibrahim Saïd', role: 'Preparador Físico' },
    ],
    description: 'Los Faraones llegan al Mundial 2026 con Mohamed Salah como su gran estrella y Omar Marmoush como el goleador más en forma del equipo. Egipto vuelve al Mundial por primera vez en 36 años en un momento histórico para el fútbol africano.',
    colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#1A1A1A' },
    squad: {
      'Porteros': [
        { name: 'Mohamed El-Shenawy', num: 1, club: 'Al-Ahly', age: 37, initials: 'ME' },
        { name: 'Sherif Ekramy', num: 12, club: 'Al-Ahly', age: 35, initials: 'SE' },
        { name: 'Kareem Bouderbala', num: 23, club: 'Pyramids FC', age: 27, initials: 'KB' },
      ],
      'Defensas': [
        { name: 'Ahmed Hegazy', num: 5, club: 'Al-Ittihad', age: 35, initials: 'AH' },
        { name: 'Omar Kamal', num: 3, club: 'Al-Ahly', age: 28, initials: 'OK' },
        { name: 'Mahmoud Hamdy', num: 4, club: 'Al-Ahly', age: 28, initials: 'MH' },
        { name: 'Ahmed Fattouh', num: 2, club: 'Smouha SC', age: 30, initials: 'AF' },
        { name: 'Akram Tawfik', num: 15, club: 'Zamalek SC', age: 25, initials: 'AT' },
        { name: 'Mohamed Abdel Moneim', num: 22, club: 'FC Lausanne', age: 28, initials: 'MA' },
      ],
      'Mediocampistas': [
        { name: 'Tarek Hamed', num: 8, club: 'Al-Ahly', age: 36, initials: 'TH' },
        { name: 'Amr El-Sulaya', num: 6, club: 'Al-Ahly', age: 30, initials: 'AE' },
        { name: 'Mahmoud "Trezeguet"', num: 10, club: 'Trabzonspor', age: 30, initials: 'MT', star: true },
        { name: 'Ahmed Sayed "Zizo"', num: 7, club: 'Zamalek SC', age: 31, initials: 'AZ' },
        { name: 'Mohamed Elneny', num: 4, club: 'Arsenal', age: 33, initials: 'MN' },
        { name: 'Emam Ashour', num: 16, club: 'Al-Ahly', age: 28, initials: 'EA' },
      ],
      'Delanteros': [
        { name: 'Mohamed Salah', num: 11, club: 'Liverpool', age: 34, initials: 'MS', star: true },
        { name: 'Omar Marmoush', num: 9, club: 'Manchester City', age: 27, initials: 'OM', star: true },
        { name: 'Mostafa Mohamed', num: 19, club: 'Galatasaray', age: 27, initials: 'MM' },
        { name: 'Ahmed Hassan Kouka', num: 20, club: 'Retirado', age: 34, initials: 'AH' },
        { name: 'Ramadan Sobhi', num: 17, club: 'Al-Ahly', age: 28, initials: 'RS' },
        { name: 'Omar Kahraba', num: 21, club: 'Al-Ittihad', age: 31, initials: 'OK' },
      ],
    }
  },
  iran: {
    culture: {
      tradicion: 'Irán es la potencia del fútbol asiático con seis clasificaciones mundialistas. Team Melli derrotó a Estados Unidos en el Mundial 1998 en uno de los partidos más cargados políticamente de la historia. Mehdi Taremi es el mejor jugador de la historia reciente del fútbol iraní.',
      gastronomia: 'El chelow kabab (arroz iraní con brochetas de carne), el ghormeh sabzi (guiso de hierbas con cordero), el joojeh kabab (pollo marinado en azafrán) y el tahdig (arroz crujiente) son emblemas de una de las cocinas más antiguas del mundo.',
      musica: 'La música clásica persa, con instrumentos como el santour y el tar, tiene 2.500 años de historia. La música pop iraní de la diáspora y el rap persa de artistas como Hichkas y Yas tienen millones de seguidores en todo el mundo.',
      dato: 'En el Mundial 2022, Irán ganó dos partidos y estuvo a minutos de clasificarse en octavos. La victoria ante Estados Unidos fue un resultado que detuvo el país entero. Sardar Azmoun, "el Messi iraní", es uno de los delanteros más completos de Asia.',
    },
    coach: { name: 'Amir Ghalenoei', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Abolfazl Jafari', role: 'Asistente Técnico' },
      { name: 'Mehrdad Minavand', role: 'Asistente Técnico' },
      { name: 'Ahmad Reza Abedzadeh', role: 'Entrenador de Arqueros' },
      { name: 'Ali Reza Mansourian', role: 'Preparador Físico' },
    ],
    description: 'Team Melli llega al Mundial 2026 con Mehdi Taremi como capitán y referente en el Inter de Milán. Irán es el equipo más físico y competitivo de Asia, capaz de ganar a cualquier rival cuando está en su mejor nivel.',
    colors: { primary: '#239F40', secondary: '#FFFFFF', accent: '#C8102E' },
    squad: {
      'Porteros': [
        { name: 'Alireza Beiranvand', num: 1, club: 'Antwerp', age: 32, initials: 'AB' },
        { name: 'Hossein Hosseini', num: 12, club: 'Persepolis FC', age: 30, initials: 'HH' },
        { name: 'Payam Niazmand', num: 23, club: 'Esteghlal FC', age: 32, initials: 'PN' },
      ],
      'Defensas': [
        { name: 'Majid Hosseini', num: 5, club: 'Kasımpaşa', age: 28, initials: 'MH', star: true },
        { name: 'Mohammad Hosseini', num: 3, club: 'Persepolis FC', age: 28, initials: 'MH' },
        { name: 'Shoja Khalilzadeh', num: 4, club: 'Al-Gharafa', age: 34, initials: 'SK' },
        { name: 'Sadegh Moharrami', num: 2, club: 'Dinamo Zagreb', age: 29, initials: 'SM' },
        { name: 'Milad Mohammadi', num: 15, club: 'Retirado', age: 33, initials: 'MM' },
        { name: 'Roozbeh Cheshmi', num: 22, club: 'Esteghlal FC', age: 31, initials: 'RC' },
      ],
      'Mediocampistas': [
        { name: 'Alireza Jahanbakhsh', num: 7, club: 'Al-Ahly Djeddah', age: 32, initials: 'AJ', star: true },
        { name: 'Saeid Ezatolahi', num: 8, club: 'Cercle Brugge', age: 29, initials: 'SE' },
        { name: 'Ali Gholizadeh', num: 11, club: 'Charleroi', age: 28, initials: 'AG' },
        { name: 'Karim Ansarifard', num: 9, club: 'Retirado', age: 36, initials: 'KA' },
        { name: 'Ahmad Noorollahi', num: 6, club: 'Al-Shabab', age: 30, initials: 'AN' },
        { name: 'Allahyar Sayyadmanesh', num: 14, club: 'Hull City', age: 25, initials: 'AS' },
      ],
      'Delanteros': [
        { name: 'Mehdi Taremi', num: 9, club: 'Inter Milan', age: 34, initials: 'MT', star: true },
        { name: 'Sardar Azmoun', num: 10, club: 'Bayer Leverkusen', age: 31, initials: 'SA', star: true },
        { name: 'Karim Ansarifard', num: 19, club: 'Retirado', age: 36, initials: 'KA' },
        { name: 'Kaveh Rezaei', num: 20, club: 'Standard Lieja', age: 33, initials: 'KR' },
        { name: 'Amir Arslan', num: 17, club: 'Trabzonspor', age: 29, initials: 'AA' },
        { name: 'Andranik Teymourian', num: 21, club: 'Retirado', age: 43, initials: 'AT' },
      ],
    }
  },
  newzealand: {
    culture: {
      tradicion: 'Nueva Zelanda, "los All Whites", ha clasificado a dos Mundiales (1982 y 2010). En 2010 fue el único equipo invicto del torneo (tres empates). El rugby con los All Blacks domina culturalmente, pero el fútbol crece con Chris Wood como estandarte.',
      gastronomia: 'El pavlova (merengue con crema y kiwi, aunque Australia también lo reclama), el hangi (cocción maorí en tierra), el lamb roast y el kumara (batata maorí) reflejan la fusión de culturas maorí, europea y del Pacífico.',
      musica: 'Lorde (Ella Yelich-O\'Connor) es la artista neozelandesa más reconocida globalmente. La música maorí con el haka y el waiata forman parte del alma cultural de Aotearoa. Split Enz y Crowded House son bandas clásicas de la región.',
      dato: 'Nueva Zelanda es el único equipo en la historia del Mundial que terminó una fase de grupos invicto sin clasificarse (2010: 1-1 con Eslovaquia, 1-1 con Italia, 0-0 con Paraguay). Chris Wood marcó más de 30 goles con el Nottingham Forest en la Premier League.',
    },
    coach: { name: 'Darren Bazeley', role: 'Director Técnico', since: 2024 },
    staff: [
      { name: 'Michael McGlinchey', role: 'Asistente Técnico' },
      { name: 'Stefan Marinovic', role: 'Entrenador de Arqueros' },
      { name: 'Che Clarke', role: 'Preparador Físico' },
      { name: 'Danny Hay', role: 'Asesor Técnico' },
    ],
    description: 'Los All Whites regresan al Mundial 2026 con Chris Wood como referente ofensivo. Nueva Zelanda representará la zona OFC con orgullo y buscará, por primera vez en su historia, superar la fase de grupos.',
    colors: { primary: '#1A1A1A', secondary: '#FFFFFF', accent: '#383838' },
    squad: {
      'Porteros': [
        { name: 'Stefan Marinovic', num: 1, club: 'Vancouver Whitecaps', age: 35, initials: 'SM' },
        { name: 'Max Crocombe', num: 12, club: 'St Mirren', age: 31, initials: 'MC' },
        { name: 'Michael Woud', num: 23, club: 'Melbourne City', age: 27, initials: 'MW' },
      ],
      'Defensas': [
        { name: 'Tommy Smith', num: 5, club: 'Retirado', age: 37, initials: 'TS' },
        { name: 'Winston Reid', num: 3, club: 'Retirado', age: 38, initials: 'WR' },
        { name: 'Michael Boxall', num: 4, club: 'Minnesota United', age: 34, initials: 'MB' },
        { name: 'Liberato Cacace', num: 2, club: 'Empoli', age: 25, initials: 'LC' },
        { name: 'Kosta Barbarouses', num: 22, club: 'Retirado', age: 35, initials: 'KB' },
        { name: 'Callum McCowatt', num: 15, club: 'HB Köge', age: 28, initials: 'CM' },
      ],
      'Mediocampistas': [
        { name: 'Elijah Just', num: 8, club: 'Barnsley', age: 26, initials: 'EJ', star: true },
        { name: 'Oli Sail', num: 6, club: 'Retirado', age: 28, initials: 'OS' },
        { name: 'Matthew Garbett', num: 10, club: 'Nottingham Forest', age: 25, initials: 'MG' },
        { name: 'Joe Bell', num: 14, club: 'FC Metz', age: 28, initials: 'JB' },
        { name: 'Clayton Lewis', num: 16, club: 'Melbourne City', age: 27, initials: 'CL' },
        { name: 'Marko Stamenic', num: 18, club: 'FC Copenhagen', age: 24, initials: 'MS' },
      ],
      'Delanteros': [
        { name: 'Chris Wood', num: 9, club: 'Nottingham Forest', age: 35, initials: 'CW', star: true },
        { name: 'Hamish Watson', num: 11, club: 'Perth Glory', age: 26, initials: 'HW' },
        { name: 'Ben Old', num: 7, club: 'FC Nordsjælland', age: 24, initials: 'BO' },
        { name: 'Ryan De Vries', num: 19, club: 'Wellington Phoenix', age: 25, initials: 'RV' },
        { name: 'Tyler Boyd', num: 21, club: 'Vizela', age: 32, initials: 'TB' },
        { name: 'Nathan Ngata', num: 20, club: 'Adelaide United', age: 24, initials: 'NN' },
      ],
    }
  },
  capeverde: {
    culture: {
      tradicion: 'Cabo Verde es el milagro del fútbol africano: un archipiélago de 500.000 habitantes que ha producido jugadores para las ligas top de Europa. La selección "Tubarões Azuis" (Tiburones Azules) vive su época dorada apoyada en la diáspora portuguesa y holandesa.',
      gastronomia: 'La cachupa (guiso de maíz, legumbres y carne) es el plato nacional. El atum grelhado (atún a la brasa), los pastéis de milho y la grogue (aguardiente de caña) reflejan la cocina de un pueblo marinero con raíces africanas y portuguesas.',
      musica: 'La morna, declarada Patrimonio Inmaterial de la UNESCO, es la música del alma caboverdiana. Cesária Évora, "la Diva del Descalzo", llevó la morna al mundo. El funanaé y el batuque son ritmos más vibrantes del carnaval isleño.',
      dato: 'Cabo Verde llegó a cuartos de final de la Copa Africana 2021, su mejor resultado histórico. Garry Rodrigues, criado en Portugal y formado en el Galatasaray, es el jugador más internacional de la historia del país con más de 50 goles.',
    },
    coach: { name: 'Pedro Leitão Brito', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Júlio Mendes', role: 'Asistente Técnico' },
      { name: 'Vozinha', role: 'Entrenador de Arqueros' },
      { name: 'Nando Costa', role: 'Preparador Físico' },
      { name: 'Alexandre Moreno', role: 'Asesor Técnico' },
    ],
    description: 'Los Tiburones Azules llegan al Mundial 2026 como la mayor sorpresa de África. Garry Rodrigues lidera a un equipo que representa el sueño de una nación pequeña que ha apostado por el fútbol como herramienta de orgullo nacional.',
    colors: { primary: '#003893', secondary: '#FFFFFF', accent: '#CF2027' },
    squad: {
      'Porteros': [
        { name: 'Vozinha', num: 1, club: 'Retirado', age: 36, initials: 'VZ' },
        { name: 'Marco Soares', num: 12, club: 'Académica de Coimbra', age: 32, initials: 'MS' },
        { name: 'Kevin Lopes', num: 23, club: 'Guimarães', age: 27, initials: 'KL' },
      ],
      'Defensas': [
        { name: 'Stopira', num: 3, club: 'Retirado', age: 38, initials: 'ST' },
        { name: 'Diney', num: 5, club: 'Vitória Guimarães', age: 31, initials: 'DI' },
        { name: 'Djaniny Tavares', num: 9, club: 'Al-Ahly', age: 33, initials: 'DT' },
        { name: 'Toni Varela', num: 4, club: 'Dinamo Bucarest', age: 33, initials: 'TV' },
        { name: 'Lisandro', num: 2, club: 'Boavista', age: 26, initials: 'LI' },
        { name: 'Carlão', num: 15, club: 'Marítimo', age: 30, initials: 'CA' },
      ],
      'Mediocampistas': [
        { name: 'Ryan Mendes', num: 10, club: 'Retirado', age: 37, initials: 'RM', star: true },
        { name: 'Steven Fortes', num: 8, club: 'Retirado', age: 35, initials: 'SF' },
        { name: 'Elves Baldé', num: 6, club: 'Retirado', age: 36, initials: 'EB' },
        { name: 'Kenny Rocha', num: 14, club: 'Standard Lieja', age: 32, initials: 'KR' },
        { name: 'Jamiro Monteiro', num: 16, club: 'Retirado', age: 34, initials: 'JM' },
        { name: 'Cláudio Monteiro', num: 18, club: 'CD Tondela', age: 27, initials: 'CM' },
      ],
      'Delanteros': [
        { name: 'Garry Rodrigues', num: 7, club: 'Galatasaray', age: 35, initials: 'GR', star: true },
        { name: 'Djaniny Tavares', num: 19, club: 'Al-Ahly', age: 33, initials: 'DT', star: true },
        { name: 'Júlio Tavares', num: 11, club: 'Dijon FCO', age: 34, initials: 'JT' },
        { name: 'Willy Semedo', num: 20, club: 'Académica', age: 30, initials: 'WS' },
        { name: 'Landry Semedo', num: 21, club: 'Sporting CP B', age: 23, initials: 'LS' },
        { name: 'Gilson', num: 17, club: 'CD Santa Clara', age: 28, initials: 'GI' },
      ],
    }
  },
  saudiarabia: {
    culture: {
      tradicion: 'Arabia Saudí organizó el Mundial de Clubes FIFA 2023 y la Copa Asiática 2027. El deporte ha sido central en la estrategia Vision 2030. La selección vivió su mayor momento en Qatar 2022 al vencer a Argentina en una de las mayores sorpresas de la historia.',
      gastronomia: 'El kabsa (arroz con carne de cordero y especias) es el plato nacional. El mandi (cordero y arroz cocidos en horno de barro), el jareesh (trigo partido molido) y las dátiles saudíes son pilares de una cocina árabe suntuosa y generosa.',
      musica: 'La música árabe clásica y el sawt (música popular del Golfo) son las expresiones musicales tradicionales saudíes. Con Vision 2030, Arabia Saudí ha abierto conciertos y festivales, permitiendo por primera vez a artistas internacionales actuar en el país.',
      dato: 'Saleh Al-Dawsari marcó uno de los goles más icónicos del Mundial 2022: un remate curvo en el ángulo en el minuto 95 que dio la victoria a Arabia Saudí sobre Argentina (2-1). Fue considerado el mayor resultado sorpresa en la historia reciente de los Mundiales.',
    },
    coach: { name: 'Roberto Mancini', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Attilio Lombardo', role: 'Asistente Técnico' },
      { name: 'Narciso Pezzotti', role: 'Entrenador de Arqueros' },
      { name: 'Fausto de Sanctis', role: 'Preparador Físico' },
      { name: 'Mohammad Al-Owais', role: 'Asesor Técnico' },
    ],
    description: 'Los Falcones Verdes llegan al Mundial 2026 con la energía de su histórica victoria ante Argentina en 2022. Con Salem Al-Dawsari como figura y la inversión de Vision 2030 en el fútbol, Arabia Saudí busca consolidarse entre los mejores de Asia.',
    colors: { primary: '#006C35', secondary: '#FFFFFF', accent: '#006C35' },
    squad: {
      'Porteros': [
        { name: 'Mohammad Al-Owais', num: 1, club: 'Al-Hilal', age: 34, initials: 'MA', star: true },
        { name: 'Fawaz Al-Qarni', num: 12, club: 'Al-Ittihad', age: 30, initials: 'FA' },
        { name: 'Abdulrahman Al-Abdouli', num: 23, club: 'Al-Ahly Jeddah', age: 25, initials: 'AA' },
      ],
      'Defensas': [
        { name: 'Ali Al-Bulayhi', num: 2, club: 'Al-Hilal', age: 34, initials: 'AA' },
        { name: 'Abdulelah Al-Amri', num: 3, club: 'Al-Hilal', age: 30, initials: 'AA' },
        { name: 'Hassan Tambakti', num: 4, club: 'Al-Hilal', age: 25, initials: 'HT' },
        { name: 'Sultan Al-Ghannam', num: 5, club: 'Al-Hilal', age: 26, initials: 'SG' },
        { name: 'Saud Abdulhamid', num: 22, club: 'Roma', age: 25, initials: 'SA' },
        { name: 'Mohammed Al-Breaik', num: 15, club: 'Al-Hilal', age: 27, initials: 'MB' },
      ],
      'Mediocampistas': [
        { name: 'Salman Al-Faraj', num: 8, club: 'Al-Hilal', age: 34, initials: 'SF', star: true },
        { name: 'Mohamed Kanno', num: 6, club: 'Al-Hilal', age: 29, initials: 'MK' },
        { name: 'Hattan Bahbri', num: 10, club: 'Al-Shabab', age: 32, initials: 'HB' },
        { name: 'Abdulellah Al-Malki', num: 16, club: 'Al-Ittihad', age: 27, initials: 'AM' },
        { name: 'Ali Al-Hassan', num: 14, club: 'Al-Shabab', age: 26, initials: 'AH' },
        { name: 'Nasser Al-Dawsari', num: 18, club: 'Al-Hilal', age: 26, initials: 'ND' },
      ],
      'Delanteros': [
        { name: 'Salem Al-Dawsari', num: 11, club: 'Al-Hilal', age: 33, initials: 'SD', star: true },
        { name: 'Saleh Al-Shehri', num: 9, club: 'Al-Hilal', age: 31, initials: 'SS', star: true },
        { name: 'Firas Al-Buraikan', num: 7, club: 'Al-Fateh', age: 26, initials: 'FB' },
        { name: 'Abdullah Al-Hamdan', num: 19, club: 'Al-Shabab', age: 25, initials: 'AH' },
        { name: 'Hamed Al-Ghamdi', num: 20, club: 'Al-Ahly Jeddah', age: 28, initials: 'HG' },
        { name: 'Abdulrahman Ghareeb', num: 17, club: 'Al-Hilal', age: 28, initials: 'AG' },
      ],
    }
  },
  uruguay: {
    culture: {
      tradicion: 'Uruguay es el país con más títulos mundiales per cápita: dos Copas del Mundo (1930 y 1950) con apenas 3,5 millones de habitantes. El "garra charrúa", espíritu de lucha indomable, define a una selección que siempre compite por encima de sus posibilidades.',
      gastronomia: 'El asado uruguayo, el chivito (sándwich de carne vacuna con jamón, queso y mayonesa), el mate y los alfajores definen una gastronomía rioplatense de sabores intensos y tradición familiar profundamente arraigada.',
      musica: 'Uruguay dio al mundo la murga y el candombe, declarado Patrimonio de la Humanidad. El carnaval de Montevideo es el más largo del mundo (40 días). Jorge Drexler, cantautor uruguayo, ganó el Oscar a la Mejor Canción Original en 2005.',
      dato: 'Luis Suárez protagonizó el momento más controversial del Mundial 2010: la mano gol ante Ghana en cuartos que costó la eliminación africana pero salvó a Uruguay para llegar a semifinales. Federico Valverde es considerado uno de los mejores mediocampistas del mundo.',
    },
    coach: { name: 'Marcelo Bielsa', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Pablo Quiroga', role: 'Asistente Técnico' },
      { name: 'Gustavo Ferrín', role: 'Asistente Técnico' },
      { name: 'Sebastián Saja', role: 'Entrenador de Arqueros' },
      { name: 'Pablo Fernández', role: 'Preparador Físico' },
    ],
    description: 'La Celeste llega al Mundial 2026 con Darwin Núñez como ariete y Federico Valverde como motor del juego. Bajo la dirección de Marcelo Bielsa, Uruguay combina el histórico "garra charrúa" con un fútbol moderno y ambicioso.',
    colors: { primary: '#0038A8', secondary: '#FFFFFF', accent: '#5BA3D4' },
    squad: {
      'Porteros': [
        { name: 'Sergio Rochet', num: 1, club: 'Nacional', age: 31, initials: 'SR' },
        { name: 'Fernando Muslera', num: 23, club: 'Galatasaray', age: 39, initials: 'FM' },
        { name: 'Sebastián Saja', num: 12, club: 'Retirado', age: 44, initials: 'SS' },
      ],
      'Defensas': [
        { name: 'Ronald Araújo', num: 4, club: 'Barcelona', age: 27, initials: 'RA', star: true },
        { name: 'José María Giménez', num: 2, club: 'Atlético Madrid', age: 31, initials: 'JG' },
        { name: 'Matías Viña', num: 3, club: 'Roma', age: 28, initials: 'MV' },
        { name: 'Matías Olivera', num: 22, club: 'Napoli', age: 28, initials: 'MO' },
        { name: 'Sebastián Cáceres', num: 5, club: 'América', age: 28, initials: 'SC' },
        { name: 'Nahitan Nández', num: 14, club: 'Cagliari', age: 30, initials: 'NN' },
      ],
      'Mediocampistas': [
        { name: 'Federico Valverde', num: 8, club: 'Real Madrid', age: 27, initials: 'FV', star: true },
        { name: 'Rodrigo Bentancur', num: 6, club: 'Tottenham', age: 29, initials: 'RB', star: true },
        { name: 'Nicolás de la Cruz', num: 10, club: 'River Plate', age: 29, initials: 'NC' },
        { name: 'Mauro Arambarri', num: 16, club: 'Getafe', age: 31, initials: 'MA' },
        { name: 'Manuel Ugarte', num: 15, club: 'Manchester United', age: 24, initials: 'MU' },
        { name: 'Facundo Pellistri', num: 11, club: 'Manchester United', age: 25, initials: 'FP' },
      ],
      'Delanteros': [
        { name: 'Darwin Núñez', num: 9, club: 'Liverpool', age: 27, initials: 'DN', star: true },
        { name: 'Luis Suárez', num: 9, club: 'Retirado', age: 40, initials: 'LS' },
        { name: 'Edinson Cavani', num: 21, club: 'Retirado', age: 39, initials: 'EC' },
        { name: 'Maximiliano Araújo', num: 7, club: 'Sporting CP', age: 26, initials: 'MA' },
        { name: 'Agustín Canobbio', num: 19, club: 'Athletic Club', age: 27, initials: 'AC' },
        { name: 'Brian Rodríguez', num: 20, club: 'América', age: 26, initials: 'BR' },
      ],
    }
  },
  senegal: {
    culture: {
      tradicion: 'Senegal alcanzó semifinales en el Mundial 2002 en su primera participación, eliminando a Francia (campeona del mundo). Sadio Mané ganó la Copa Africana 2022 para llevar el primer gran título a los Leones de la Teranga tras décadas de sueños.',
      gastronomia: 'El thiéboudienne (arroz con pescado) es el plato nacional y posible origen de todos los arroces del Caribe. El yassa poulet (pollo marinado con cebolla y limón), el mafé (guiso de cacahuete) y el bissap (jugo de hibisco) son íconos culinarios.',
      musica: 'Youssou N\'Dour, el "rey del Mbalax", es el artista africano más reconocido internacionalmente. El mbalax senegalés, nacido en Dakar en los años 70, fusiona tambores sabar con jazz y rock. Dakar es una de las capitales musicales de África.',
      dato: 'En el Mundial 2002, el centrocampista Bouba Diop marcó el gol que eliminó a Francia en la fase de grupos. Senegal llegó a semis sin ganar aún la Copa de África, que llegó en 2022 con Mané como héroe. Es la selección más respetada de África Occidental.',
    },
    coach: { name: 'Aliou Cissé', role: 'Director Técnico', since: 2015 },
    staff: [
      { name: 'Régis Bogaert', role: 'Asistente Técnico' },
      { name: 'Omar Daf', role: 'Asistente Técnico' },
      { name: 'Khadim Ndiaye', role: 'Entrenador de Arqueros' },
      { name: 'Abdoulaye Seck', role: 'Preparador Físico' },
    ],
    description: 'Los Leones de la Teranga llegan al Mundial 2026 como campeones de África con Sadio Mané como leyenda y una nueva generación encabezada por Ismaila Sarr y Pape Gueye. Senegal siempre sorprende y puede llegar lejos.',
    colors: { primary: '#00853F', secondary: '#FFFFFF', accent: '#FDEF42' },
    squad: {
      'Porteros': [
        { name: 'Édouard Mendy', num: 1, club: 'Al-Ahly', age: 34, initials: 'EM', star: true },
        { name: 'Alfred Gomis', num: 12, club: 'Rennes', age: 33, initials: 'AG' },
        { name: 'Seny Dieng', num: 23, club: 'Queens Park Rangers', age: 32, initials: 'SD' },
      ],
      'Defensas': [
        { name: 'Kalidou Koulibaly', num: 3, club: 'Al-Hilal', age: 35, initials: 'KK', star: true },
        { name: 'Abdou Diallo', num: 5, club: 'RB Leipzig', age: 29, initials: 'AD' },
        { name: 'Youssouf Sabaly', num: 2, club: 'Real Betis', age: 32, initials: 'YS' },
        { name: 'Formose Mendy', num: 22, club: 'Almería', age: 27, initials: 'FM' },
        { name: 'Pape Abou Cissé', num: 6, club: 'Olympiacos', age: 30, initials: 'PC' },
        { name: 'Moussa Niakhaté', num: 15, club: 'Nottingham Forest', age: 29, initials: 'MN' },
      ],
      'Mediocampistas': [
        { name: 'Idrissa Gana Gueye', num: 8, club: 'Éverton', age: 37, initials: 'IG' },
        { name: 'Pape Gueye', num: 14, club: 'Marseille', age: 29, initials: 'PG', star: true },
        { name: 'Nampalys Mendy', num: 16, club: 'Retirado', age: 34, initials: 'NM' },
        { name: 'Krepin Diatta', num: 11, club: 'Monaco', age: 26, initials: 'KD' },
        { name: 'Moustapha Name', num: 18, club: 'Nantes', age: 26, initials: 'MN' },
        { name: 'Habib Diallo', num: 9, club: 'Al-Shabab', age: 30, initials: 'HD' },
      ],
      'Delanteros': [
        { name: 'Sadio Mané', num: 10, club: 'Al-Nassr', age: 35, initials: 'SM', star: true },
        { name: 'Ismaila Sarr', num: 7, club: 'Crystal Palace', age: 28, initials: 'IS', star: true },
        { name: 'Nicolas Jackson', num: 19, club: 'Chelsea', age: 25, initials: 'NJ' },
        { name: 'Boulaye Dia', num: 20, club: 'Lazio', age: 29, initials: 'BD' },
        { name: 'Famara Diedhiou', num: 13, club: 'Al-Qadsiah', age: 34, initials: 'FD' },
        { name: 'Cheikhou Kouyaté', num: 21, club: 'Nottingham Forest', age: 35, initials: 'CK' },
      ],
    }
  },
  iraq: {
    culture: {
      tradicion: 'Irak ganó la Copa Asiática 2007 en un momento histórico de paz relativa, siendo el primer equipo en ganar un título así en mitad de un conflicto. El fútbol es el escape emocional de una nación que ha vivido décadas de adversidad.',
      gastronomia: 'El masgouf (carpa del Tigris asada a la brasa) es el plato nacional iraquí. El quzi (cordero relleno de arroz y frutos secos), el kleicha (galletas de dátiles y cardamomo) y el chai con cardamomo son pilares de una cocina mesopotámica milenaria.',
      musica: 'Irak tiene una rica tradición musical árabe con el maqam iraquí como joya cultural. Kazem al-Saher es el cantante árabe vivo más famoso. La música popular iraquí mezcla influencias persas, turcas y árabes en un sonido único de Mesopotamia.',
      dato: 'El gol de Younis Mahmoud en la final de la Copa Asiática 2007 ante Arabia Saudí hizo llorar a millones de iraquíes en todo el mundo. Fue el momento de unión nacional más importante del país en décadas. La selección juega sus partidos en casa en la ciudad santa de Kerbala.',
    },
    coach: { name: 'Jesús Casas', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Bassim Qasim', role: 'Asistente Técnico' },
      { name: 'Ahmed Manajid', role: 'Asistente Técnico' },
      { name: 'Jassim Mohammad', role: 'Entrenador de Arqueros' },
      { name: 'Ahmad Al-Jumaa', role: 'Preparador Físico' },
    ],
    description: 'Los Leones de Mesopotamia llegan al Mundial 2026 como la gran sorpresa de Asia. Aymen Hussein y Amjad Atwan lideran a una selección que representa la resiliencia de un pueblo con historia milenaria y una pasión futbolística indomable.',
    colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#007A3D' },
    squad: {
      'Porteros': [
        { name: 'Jalal Hassan', num: 1, club: 'Al-Zawraa', age: 32, initials: 'JH' },
        { name: 'Fahad Talib', num: 12, club: 'Air Force Club', age: 29, initials: 'FT' },
        { name: 'Saad Natheer', num: 23, club: 'Al-Karkh', age: 26, initials: 'SN' },
      ],
      'Defensas': [
        { name: 'Ali Adnan', num: 5, club: 'Al-Zawraa', age: 31, initials: 'AA', star: true },
        { name: 'Ahmed Ibrahim', num: 3, club: 'Al-Shorta', age: 29, initials: 'AI' },
        { name: 'Rebin Sulaka', num: 4, club: 'FC Lausanne', age: 28, initials: 'RS' },
        { name: 'Mustafa Nadhim', num: 6, club: 'Al-Zawraa', age: 27, initials: 'MN' },
        { name: 'Saad Abdul Amir', num: 2, club: 'Al-Shorta', age: 30, initials: 'SA' },
        { name: 'Alaa Abdul Zehra', num: 15, club: 'Al-Zawraa', age: 28, initials: 'AA' },
      ],
      'Mediocampistas': [
        { name: 'Safaa Hadi', num: 8, club: 'Al-Zawraa', age: 30, initials: 'SH', star: true },
        { name: 'Bashar Resan', num: 10, club: 'Al-Najaf', age: 27, initials: 'BR' },
        { name: 'Mohammed Daoud', num: 6, club: 'Al-Shorta', age: 29, initials: 'MD' },
        { name: 'Humam Tariq', num: 14, club: 'Al-Zawraa', age: 25, initials: 'HT' },
        { name: 'Alaa Abboud', num: 16, club: 'Air Force Club', age: 31, initials: 'AA' },
        { name: 'Dhurgham Ismael', num: 18, club: 'Al-Quwa Al-Jawiya', age: 27, initials: 'DI' },
      ],
      'Delanteros': [
        { name: 'Aymen Hussein', num: 9, club: 'Al-Shorta', age: 28, initials: 'AH', star: true },
        { name: 'Amjad Atwan', num: 11, club: 'Al-Zawraa', age: 27, initials: 'AA', star: true },
        { name: 'Mohanad Ali', num: 7, club: 'Al-Zawraa', age: 30, initials: 'MA' },
        { name: 'Shahin Saedi', num: 19, club: 'Al-Quwa Al-Jawiya', age: 25, initials: 'SS' },
        { name: 'Alaa Mhawi', num: 20, club: 'Al-Shorta', age: 28, initials: 'AM' },
        { name: 'Karrar Mohammed', num: 13, club: 'Al-Zawraa', age: 24, initials: 'KM' },
      ],
    }
  },
  norway: {
    culture: {
      tradicion: 'Noruega tiene la mayor historia de goles de la CONCACAF... no, de la UEFA. Erling Haaland es la máquina goleadora más eficiente del fútbol moderno. Noruega no ha clasificado a un Mundial desde 1998, haciendo de su regreso en 2026 un momento épico.',
      gastronomia: 'El rakfisk (trucha fermentada), el lutefisk (bacalao seco en lejía), los lefser (tortas de papa) y el brunost (queso marrón de suero) son platos únicos de una cocina escandinava que abraza el sabor intenso y los ingredientes del fiordo.',
      musica: 'A-ha conquistó el mundo con "Take On Me" en 1985. Aurora, Sigrid y la escena folk-pop noruega de Bergen tienen proyección internacional. La música negra metal y el black metal de Oslo son fenómenos culturales únicos de la escena musical escandinava.',
      dato: 'Erling Haaland marcó 91 goles con el Manchester City en su primera temporada y media. Sus estadísticas son históricamente anómalas: ningún jugador en la historia del fútbol ha marcado tanto en tan poco tiempo. Sin embargo, Noruega no ha podido clasificar a un Mundial por 28 años.',
    },
    coach: { name: 'Ståle Solbakken', role: 'Director Técnico', since: 2021 },
    staff: [
      { name: 'Per Joar Hansen', role: 'Asistente Técnico' },
      { name: 'Øyvind Leonhardsen', role: 'Asistente Técnico' },
      { name: 'Ørjan Nyland', role: 'Entrenador de Arqueros' },
      { name: 'Jostein Vingelsgaard', role: 'Preparador Físico' },
    ],
    description: 'Noruega regresa al Mundial 2026 con Erling Haaland como la más grande amenaza goleadora del torneo y Martin Ødegaard como cerebro creativo. Con estos dos jugadores como motor, Noruega puede llegar muy lejos.',
    colors: { primary: '#BA0C2F', secondary: '#FFFFFF', accent: '#00205B' },
    squad: {
      'Porteros': [
        { name: 'Ørjan Nyland', num: 1, club: 'Southampton', age: 35, initials: 'ON' },
        { name: 'Rune Jarstein', num: 12, club: 'Hertha Berlin', age: 40, initials: 'RJ' },
        { name: 'Mathias Dyngeland', num: 23, club: 'Brann', age: 26, initials: 'MD' },
      ],
      'Defensas': [
        { name: 'Leo Skiri Østigård', num: 5, club: 'Napoli', age: 27, initials: 'LO', star: true },
        { name: 'Kristoffer Ajer', num: 2, club: 'Brentford', age: 28, initials: 'KA' },
        { name: 'Julian Ryerson', num: 3, club: 'Borussia Dortmund', age: 28, initials: 'JR' },
        { name: 'Andreas Hanche-Olsen', num: 4, club: 'Mainz', age: 27, initials: 'AH' },
        { name: 'Omar Elabdellaoui', num: 22, club: 'Galatasaray', age: 33, initials: 'OE' },
        { name: 'Birger Meling', num: 15, club: 'Rennes', age: 30, initials: 'BM' },
      ],
      'Mediocampistas': [
        { name: 'Martin Ødegaard', num: 8, club: 'Arsenal', age: 28, initials: 'MO', star: true },
        { name: 'Sander Berge', num: 6, club: 'Fulham', age: 28, initials: 'SB' },
        { name: 'Mathias Normann', num: 14, club: 'PAOK', age: 30, initials: 'MN' },
        { name: 'Fredrik Aursnes', num: 16, club: 'Benfica', age: 29, initials: 'FA' },
        { name: 'Antonio Nusa', num: 11, club: 'RB Leipzig', age: 22, initials: 'AN', star: true },
        { name: 'Patrick Berg', num: 18, club: 'Bodø/Glimt', age: 28, initials: 'PB' },
      ],
      'Delanteros': [
        { name: 'Erling Haaland', num: 9, club: 'Manchester City', age: 26, initials: 'EH', star: true },
        { name: 'Alexander Sørloth', num: 7, club: 'Atlético Madrid', age: 31, initials: 'AS', star: true },
        { name: 'Mohamed Elyounoussi', num: 10, club: 'Celtic', age: 31, initials: 'ME' },
        { name: 'Ola Solbakken', num: 19, club: 'Roma', age: 26, initials: 'OS' },
        { name: 'Markus Henriksen', num: 13, club: 'Rosenborg', age: 34, initials: 'MH' },
        { name: 'Jørgen Strand Larsen', num: 21, club: 'Celta Vigo', age: 26, initials: 'JL' },
      ],
    }
  },
  algeria: {
    culture: {
      tradicion: 'Argelia ganó la Copa Africana 2019 con un juego arrollador liderado por Riyad Mahrez. El "milagro de Gijon" de 1982, donde Alemania y Austria acordaron un resultado para eliminar a Argelia, cambió las reglas del fútbol internacional.',
      gastronomia: 'La chakhchoukha (pan crujiente con guiso de cordero), el couscous argelino con siete verduras, el baghrir (crêpes de sémola), el mhanes y el café con cardamomo son delicias de una cocina beréber y árabe de profunda tradición.',
      musica: 'El raï es el género musical más famoso de Argelia: Khaled, Cheb Mami y Rachid Taha llevaron esta fusión de tradición beréber con pop occidental a los escenarios del mundo. El raï fue declarado Patrimonio Inmaterial de la UNESCO en 2022.',
      dato: 'En el Mundial 2014, Argelia llegó a octavos de final por primera vez en su historia, perdiendo 2-1 con Alemania en el tiempo suplementario. Riyad Mahrez fue Campeón de la Premier League con el Leicester (2016) y ganador de la Champions con el City.',
    },
    coach: { name: 'Vladimir Petkovic', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Said Belkalem', role: 'Asistente Técnico' },
      { name: 'Aïssa Mandi', role: 'Asistente Técnico' },
      { name: 'Farouk Chafai', role: 'Entrenador de Arqueros' },
      { name: 'Abdelkader Amrani', role: 'Preparador Físico' },
    ],
    description: 'Los Guerreros del Desierto llegan al Mundial 2026 con Riyad Mahrez como figura y Youcef Atal como la nueva estrella del equipo. Argelia siempre compite con intensidad y puede dar problemas a cualquier rival en la fase de grupos.',
    colors: { primary: '#006233', secondary: '#FFFFFF', accent: '#D21034' },
    squad: {
      'Porteros': [
        { name: 'Raïs M\'bolhi', num: 1, club: 'Al-Ettifaq', age: 39, initials: 'RM' },
        { name: 'Alexandre Oukidja', num: 12, club: 'Metz', age: 36, initials: 'AO' },
        { name: 'Aymen Mandrea', num: 23, club: 'MC Alger', age: 28, initials: 'AM' },
      ],
      'Defensas': [
        { name: 'Aïssa Mandi', num: 3, club: 'Villarreal', age: 34, initials: 'AM', star: true },
        { name: 'Ramy Bensebaini', num: 5, club: 'Borussia Dortmund', age: 30, initials: 'RB' },
        { name: 'Mehdi Zeffane', num: 2, club: 'Retirado', age: 34, initials: 'MZ' },
        { name: 'Abdelkader Bedrane', num: 4, club: 'FC Nantes', age: 28, initials: 'AB' },
        { name: 'Hossam Aouar', num: 15, club: 'Roma', age: 28, initials: 'HA' },
        { name: 'Djamel Benlamri', num: 6, club: 'Al-Batin', age: 35, initials: 'DB' },
      ],
      'Mediocampistas': [
        { name: 'Sofiane Feghouli', num: 10, club: 'Retirado', age: 36, initials: 'SF' },
        { name: 'Youcef Belaïli', num: 11, club: 'ES Sétif', age: 34, initials: 'YB' },
        { name: 'Ismael Bennacer', num: 8, club: 'AC Milan', age: 28, initials: 'IB', star: true },
        { name: 'Samir Azzedine', num: 14, club: 'Ajaccio', age: 29, initials: 'SA' },
        { name: 'Mohamed Amine Amoura', num: 7, club: 'VfB Stuttgart', age: 25, initials: 'MA' },
        { name: 'Adam Ounas', num: 16, club: 'Napoli', age: 30, initials: 'AO' },
      ],
      'Delanteros': [
        { name: 'Riyad Mahrez', num: 26, club: 'Al-Ahli', age: 36, initials: 'RM', star: true },
        { name: 'Youcef Atal', num: 22, club: 'OGC Niza', age: 29, initials: 'YA', star: true },
        { name: 'Islam Slimani', num: 9, club: 'Retirado', age: 38, initials: 'IS' },
        { name: 'Baghdad Bounedjah', num: 19, club: 'Al-Sadd', age: 33, initials: 'BB' },
        { name: 'Farid Boulaya', num: 20, club: 'FC Metz', age: 31, initials: 'FB' },
        { name: 'Adem Zorgane', num: 17, club: 'Charleroi', age: 26, initials: 'AZ' },
      ],
    }
  },
  austria: {
    culture: {
      tradicion: 'Austria fue potencia en los años 50 con el "Wunderteam" de Matthias Sindelar. En 1954 llegó a semifinales. David Alaba ha liderado el renacimiento moderno de una selección que busca recuperar su lugar entre las élites europeas.',
      gastronomia: 'El Wiener Schnitzel (escalope vienés), el Sachertorte (tarta de chocolate con mermelada de albaricoque), el Apfelstrudel y el Kaiserschmarrn (tortitas azucaradas) son iconos de una gastronomía centroeuropea elegante y contundente.',
      musica: 'Viena fue la capital musical del mundo: Mozart, Beethoven, Haydn, Strauss y Mahler vivieron o compusieron allí. La Ópera Estatal de Viena es considerada la más importante del mundo. Falco, con "Rock Me Amadeus", fue el único artista de habla alemana en liderar las listas americanas.',
      dato: 'David Alaba ganó la Champions League 2021 con el Real Madrid siendo capitán de Austria. Marcel Sabitzer y Marko Arnautovic son los otros representantes austríacos en el fútbol de élite. Austria superó a Francia e Holanda para llegar a cuartos de la Euro 2024.',
    },
    coach: { name: 'Ralf Rangnick', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Peter Stöger', role: 'Asistente Técnico' },
      { name: 'Klaus Lindenberger', role: 'Entrenador de Arqueros' },
      { name: 'Andreas Herzog', role: 'Asistente Técnico' },
      { name: 'Steffen Freund', role: 'Preparador Físico' },
    ],
    description: 'Austria llega al Mundial 2026 con Ralf Rangnick como artífice de una transformación táctica y David Alaba como capitán y líder. El equipo alcanzó cuartos de la Eurocopa 2024 y ha demostrado ser capaz de competir con los mejores de Europa.',
    colors: { primary: '#ED2939', secondary: '#FFFFFF', accent: '#8B0000' },
    squad: {
      'Porteros': [
        { name: 'Patrick Pentz', num: 1, club: 'Bayer Leverkusen', age: 28, initials: 'PP' },
        { name: 'Alexander Schlager', num: 12, club: 'RB Leipzig', age: 30, initials: 'AS' },
        { name: 'Heinz Lindner', num: 23, club: 'Retirado', age: 35, initials: 'HL' },
      ],
      'Defensas': [
        { name: 'David Alaba', num: 8, club: 'Real Madrid', age: 34, initials: 'DA', star: true },
        { name: 'Stefan Posch', num: 5, club: 'Bologna', age: 29, initials: 'SP' },
        { name: 'Gernot Trauner', num: 3, club: 'Feyenoord', age: 33, initials: 'GT' },
        { name: 'Philipp Mwene', num: 22, club: 'Mainz', age: 32, initials: 'PM' },
        { name: 'Philipp Lienhart', num: 4, club: 'SC Freiburg', age: 30, initials: 'PL' },
        { name: 'Maximilian Wöber', num: 15, club: 'Borussia M\'gladbach', age: 28, initials: 'MW' },
      ],
      'Mediocampistas': [
        { name: 'Marcel Sabitzer', num: 7, club: 'Borussia Dortmund', age: 32, initials: 'MS', star: true },
        { name: 'Konrad Laimer', num: 6, club: 'Bayern Munich', age: 28, initials: 'KL', star: true },
        { name: 'Florian Grillitsch', num: 8, club: 'Hoffenheim', age: 30, initials: 'FG' },
        { name: 'Nicolas Seiwald', num: 14, club: 'RB Leipzig', age: 25, initials: 'NS' },
        { name: 'Florian Kainz', num: 11, club: '1. FC Köln', age: 33, initials: 'FK' },
        { name: 'Christoph Baumgartner', num: 17, club: 'RB Leipzig', age: 26, initials: 'CB' },
      ],
      'Delanteros': [
        { name: 'Marko Arnautovic', num: 9, club: 'Inter Milan', age: 38, initials: 'MA', star: true },
        { name: 'Michael Gregoritsch', num: 11, club: 'SC Freiburg', age: 32, initials: 'MG' },
        { name: 'Patrick Wimmer', num: 19, club: 'Wolfsburg', age: 25, initials: 'PW' },
        { name: 'Sasa Kalajdzic', num: 20, club: 'Eintracht Frankfurt', age: 29, initials: 'SK' },
        { name: 'Karim Onisiwo', num: 21, club: 'Mainz', age: 33, initials: 'KO' },
        { name: 'Junior Adamu', num: 13, club: 'FC Salzburg', age: 25, initials: 'JA' },
      ],
    }
  },
  jordan: {
    culture: {
      tradicion: 'Jordania vivió su mayor momento futbolístico en la Copa Asiática 2023, llegando a la final por primera vez en su historia. El equipo representa a un país en el corazón de Oriente Medio con una pasión futbolística creciente y una nueva generación de talentos.',
      gastronomia: 'La mansaf (cordero cocido en salsa de yogur fermentado con arroz) es el plato nacional y símbolo de hospitalidad. El falafel jordano, el hummus, la zarb (cocción beduina) y el ka\'ak con té son emblemas de una cocina levantina generosa.',
      musica: 'La música árabe clásica, el pop jordano y el hip-hop de la diáspora palestino-jordana definen la escena musical de Ammán. Fayrouz, la cantante libanesa más amada en Jordania, suena en cada café y hogar del país.',
      dato: 'Jordania llegó a la final de la Copa Asiática 2023 siendo el equipo revelación del torneo. Musa Al-Taamari marcó goles decisivos y se convirtió en el primer jordano en jugar en la Premier League (Millwall). El estadio Rey Abdullah en Ammán tiene capacidad para 25.000 personas.',
    },
    coach: { name: 'Hussein Ammouta', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Adnan Hamad', role: 'Asistente Técnico' },
      { name: 'Amer Shafi', role: 'Entrenador de Arqueros' },
      { name: 'Wesam Abu Salim', role: 'Preparador Físico' },
      { name: 'Ahmad Hayel', role: 'Asesor Técnico' },
    ],
    description: 'Los Nashama (Caballeros) llegan al Mundial 2026 en el mejor momento de su historia, tras la histórica final asiática de 2023. Musa Al-Taamari lidera a un equipo que representa la evolución del fútbol árabe.',
    colors: { primary: '#007A3D', secondary: '#FFFFFF', accent: '#CE1126' },
    squad: {
      'Porteros': [
        { name: 'Amer Shafi', num: 1, club: 'Al-Jazira', age: 37, initials: 'AS' },
        { name: 'Khalid Shahin', num: 12, club: 'Al-Faisaly', age: 31, initials: 'KS' },
        { name: 'Ahmad Ersan', num: 23, club: 'Al-Wahdat', age: 26, initials: 'AE' },
      ],
      'Defensas': [
        { name: 'Yazan Al-Naimat', num: 5, club: 'Al-Wahdat', age: 28, initials: 'YN', star: true },
        { name: 'Mohammad Abu Zema', num: 3, club: 'Al-Wahdat', age: 31, initials: 'MA' },
        { name: 'Baha\' Faisal', num: 4, club: 'Al-Faisaly', age: 30, initials: 'BF' },
        { name: 'Saud Nawaf', num: 2, club: 'Al-Ahli Amman', age: 27, initials: 'SN' },
        { name: 'Ehsan Haddad', num: 22, club: 'Al-Wehdat', age: 29, initials: 'EH' },
        { name: 'Qusai Al-Sabah', num: 15, club: 'Al-Shorta', age: 25, initials: 'QS' },
      ],
      'Mediocampistas': [
        { name: 'Ahmad Saleh', num: 8, club: 'Al-Wahdat', age: 29, initials: 'AS', star: true },
        { name: 'Nour Mansour', num: 6, club: 'Al-Faisaly', age: 27, initials: 'NM' },
        { name: 'Hussain Al-Rawabdeh', num: 10, club: 'Al-Wahdat', age: 30, initials: 'HR' },
        { name: 'Mohammad Al-Dmeiri', num: 14, club: 'Al-Ramtha', age: 26, initials: 'MD' },
        { name: 'Mousa Suleiman', num: 16, club: 'Al-Faisaly', age: 28, initials: 'MS' },
        { name: 'Oday Dabbagh', num: 18, club: 'Westerlo', age: 26, initials: 'OD' },
      ],
      'Delanteros': [
        { name: 'Musa Al-Taamari', num: 7, club: 'Montpellier', age: 27, initials: 'MT', star: true },
        { name: 'Ahmad Al-Rusan', num: 9, club: 'Al-Wahdat', age: 28, initials: 'AR', star: true },
        { name: 'Yazan Arab', num: 11, club: 'Al-Wahdat', age: 24, initials: 'YA' },
        { name: 'Mohammad Rashid', num: 19, club: 'Al-Ramtha', age: 25, initials: 'MR' },
        { name: 'Feras Ibrahim', num: 20, club: 'Al-Faisaly', age: 26, initials: 'FI' },
        { name: 'Hamzah Hawsawi', num: 13, club: 'Al-Ahli Amman', age: 24, initials: 'HH' },
      ],
    }
  },
  rdcongo: {
    culture: {
      tradicion: 'La RD Congo (Zaire) fue el primer equipo del África Subsahariana en un Mundial (1974). El país es el corazón futbolístico de África Central con Mazembe como el club africano más exitoso de las últimas dos décadas.',
      gastronomia: 'El fufu (masa de yuca), el poulet à la moambe (pollo en salsa de palma), el saka-saka (hojas de yuca) y el liboke (pescado cocinado en hojas de plátano) definen una cocina del corazón de África rica en sabores y tradición.',
      musica: 'La rumba congolesa, declarada Patrimonio Inmaterial de la UNESCO, es la música más influyente de África. Artistas como Papa Wemba, Koffi Olomide y los grupos de soukous han influenciado la música popular de todo el continente africano.',
      dato: 'El Zaïre de 1974 es famoso por la imagen de Mwepu Ilunga chutando un tiro libre de Brasil antes de que el árbitro lo señalara. Yoane Wissa marcó 15 goles en la Premier League con el Brentford en 2023-24. La RD Congo tiene más de 100 millones de habitantes.',
    },
    coach: { name: 'Sébastien Desabre', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Meschack Elia', role: 'Asistente Técnico' },
      { name: 'Joël Kiassumbua', role: 'Entrenador de Arqueros' },
      { name: 'Cédric Bakambu', role: 'Asesor Técnico' },
      { name: 'Rodrigue Nzuzi', role: 'Preparador Físico' },
    ],
    description: 'Los Leopardos regresan al escenario mundial tras décadas de ausencia. Yoane Wissa y Chancel Mbemba lideran una selección con talento individual sobresaliente que representa a la nación más poblada de África Francófona.',
    colors: { primary: '#007FFF', secondary: '#FFFFFF', accent: '#CE1126' },
    squad: {
      'Porteros': [
        { name: 'Joël Kiassumbua', num: 1, club: 'Retirado', age: 36, initials: 'JK' },
        { name: 'Elia Meschack', num: 12, club: 'Al-Ain', age: 30, initials: 'EM' },
        { name: 'Lionel Mpasi', num: 23, club: 'TP Mazembe', age: 27, initials: 'LM' },
      ],
      'Defensas': [
        { name: 'Chancel Mbemba', num: 5, club: 'Marseille', age: 31, initials: 'CM', star: true },
        { name: 'Arthur Masuaku', num: 3, club: 'Besiktas', age: 33, initials: 'AM' },
        { name: 'Marcel Tisserand', num: 4, club: 'Fenerbahçe', age: 33, initials: 'MT' },
        { name: 'Christ Makosso', num: 2, club: 'TP Mazembe', age: 28, initials: 'CM' },
        { name: 'Nathan Zeze', num: 22, club: 'Monaco', age: 21, initials: 'NZ' },
        { name: 'Dylan Mbuy', num: 15, club: 'San José Earthquakes', age: 28, initials: 'DM' },
      ],
      'Mediocampistas': [
        { name: 'Meschack Elia', num: 7, club: 'Al-Ain', age: 30, initials: 'ME', star: true },
        { name: 'Donat Ndong', num: 8, club: 'Retirado', age: 33, initials: 'DN' },
        { name: 'Gaël Kakuta', num: 10, club: 'Amiens SC', age: 33, initials: 'GK' },
        { name: 'Neeskens Kebano', num: 14, club: 'Genk', age: 34, initials: 'NK' },
        { name: 'Théo Bongonda', num: 11, club: 'Genk', age: 30, initials: 'TB' },
        { name: 'Samuel Bastien', num: 16, club: 'Standard Lieja', age: 31, initials: 'SB' },
      ],
      'Delanteros': [
        { name: 'Yoane Wissa', num: 9, club: 'Brentford', age: 29, initials: 'YW', star: true },
        { name: 'Cédric Bakambu', num: 11, club: 'Retirado', age: 35, initials: 'CB' },
        { name: 'Jonathan Bolingi', num: 19, club: 'TP Mazembe', age: 32, initials: 'JB' },
        { name: 'Dieumerci Mbokani', num: 20, club: 'Retirado', age: 39, initials: 'DM' },
        { name: 'Fiston Mayele', num: 21, club: 'Panathinaikos', age: 28, initials: 'FM' },
        { name: 'Silas Wissa', num: 13, club: 'Brentford', age: 25, initials: 'SW' },
      ],
    }
  },
  uzbekistan: {
    culture: {
      tradicion: 'Uzbekistán es la potencia futbolística emergente de Asia Central. La generación nacida tras la independencia soviética (1991) ha producido jugadores como Eldor Shomurodov que compiten en las mejores ligas europeas. Los Lobos Blancos sueñan con el Mundial.',
      gastronomia: 'El plov uzbeko (arroz con carne y vegetales, Patrimonio UNESCO) es el plato nacional. El samsa (pastelillos de carne), el shashlik (brochetas a la brasa), el lagman (fideos con estofado) y el naan (pan plano) definen una cocina de la Ruta de la Seda.',
      musica: 'La música clásica uzbeka con el dutar y el doira forma parte de una tradición musical milenaria que se nutre de la Ruta de la Seda. Artistas modernos como Ulugbek Rahmatullayev mezclan la tradición shash maqam con sonidos contemporáneos.',
      dato: 'Uzbekistán alcanzó el tercer puesto en el Campeonato Asiático Sub-23 de 2022 y ha mejorado progresivamente en el ranking FIFA. Eldor Shomurodov fue el primer uzbeko en jugar regularmente en la Serie A italiana, marcando para el Génova y luego el AS Roma.',
    },
    coach: { name: 'Srecko Katanec', role: 'Director Técnico', since: 2022 },
    staff: [
      { name: 'Timur Kapadze', role: 'Asistente Técnico' },
      { name: 'Alisher Djalolov', role: 'Asistente Técnico' },
      { name: 'Sanjar Tursunov', role: 'Entrenador de Arqueros' },
      { name: 'Bakhodir Nematov', role: 'Preparador Físico' },
    ],
    description: 'Uzbekistán hace historia en su primer Mundial. Eldor Shomurodov y Bobur Abdixoliqov lideran a un equipo que representa el ascenso del fútbol de Asia Central y que busca demostrar al mundo el talento uzbeko.',
    colors: { primary: '#1EB53A', secondary: '#FFFFFF', accent: '#CE2028' },
    squad: {
      'Porteros': [
        { name: 'Ulugbek Nishonov', num: 1, club: 'Pakhtakor', age: 29, initials: 'UN' },
        { name: 'Jasur Yakhshiboev', num: 12, club: 'Pakhtakor', age: 27, initials: 'JY' },
        { name: 'Otabek Shukurov', num: 23, club: 'Lokomotiv Tashkent', age: 25, initials: 'OS' },
      ],
      'Defensas': [
        { name: 'Dostonbek Khamdamov', num: 5, club: 'Pakhtakor', age: 27, initials: 'DK' },
        { name: 'Sherzod Nishonov', num: 3, club: 'Pakhtakor', age: 29, initials: 'SN' },
        { name: 'Akbar Tursunov', num: 4, club: 'Bunyodkor', age: 28, initials: 'AT' },
        { name: 'Temur Juraev', num: 2, club: 'Pakhtakor', age: 26, initials: 'TJ' },
        { name: 'Nodir Komilov', num: 22, club: 'Nasaf Qarshi', age: 27, initials: 'NK' },
        { name: 'Rauf Inomov', num: 15, club: 'Pakhtakor', age: 25, initials: 'RI' },
      ],
      'Mediocampistas': [
        { name: 'Jaloliddin Masharipov', num: 10, club: 'Pakhtakor', age: 31, initials: 'JM', star: true },
        { name: 'Otabek Shukurov', num: 8, club: 'Lokomotiv', age: 27, initials: 'OS' },
        { name: 'Sanjar Tursunov', num: 6, club: 'Pakhtakor', age: 30, initials: 'ST' },
        { name: 'Khojimat Erkinov', num: 14, club: 'Bunyodkor', age: 26, initials: 'KE' },
        { name: 'Jamshid Iskanderov', num: 16, club: 'Pakhtakor', age: 24, initials: 'JI' },
        { name: 'Bobur Abdixoliqov', num: 11, club: 'Fortuna Düsseldorf', age: 26, initials: 'BA', star: true },
      ],
      'Delanteros': [
        { name: 'Eldor Shomurodov', num: 9, club: 'AS Roma', age: 29, initials: 'ES', star: true },
        { name: 'Islom Tursunov', num: 7, club: 'Pakhtakor', age: 25, initials: 'IT' },
        { name: 'Shukhrat Mukhammadiev', num: 19, club: 'Bunyodkor', age: 27, initials: 'SM' },
        { name: 'Dostonbek Tursunov', num: 20, club: 'Lokomotiv', age: 24, initials: 'DT' },
        { name: 'Aziz Gʻaniyev', num: 21, club: 'Nasaf Qarshi', age: 23, initials: 'AG' },
        { name: 'Doniyor Tursunov', num: 13, club: 'Pakhtakor', age: 26, initials: 'DT' },
      ],
    }
  },
  croatia: {
    culture: {
      tradicion: 'Croacia es la mayor sorpresa mundialista de la historia moderna: tercera en su primer Mundial (1998) con Šuker como Bota de Oro y finalista en 2018 con Modrić como Balón de Oro. Un país de apenas 4 millones que compite con los grandes.',
      gastronomia: 'El peka (carne y verduras cocidas bajo campana de hierro al fuego), el ćevapi dálmata, el pasticada (buey estofado con vino), el soparnik (tarta dalmatina de acelgas) y los vinos de Hvar y Pelješac son tesoros de la costa adriática.',
      musica: 'La klapa, música coral a cappella de Dalmacia, está en la lista del Patrimonio Inmaterial UNESCO. Oliver Dragojević fue el cantante croata más amado. La escena de música electrónica de Zagreb tiene proyección europea, y la Ultra Music Festival Croacia es uno de los mejores del mundo.',
      dato: 'Luka Modrić ganó el Balón de Oro 2018 rompiendo el duopolio Messi-Ronaldo de 12 años. Ivan Perišić tiene el récord de partidos en la historia de Croacia. Joško Gvardiol fue el defensa más cotizado del mundo en 2023 (fichado por Manchester City por 90 millones).',
    },
    coach: { name: 'Zlatko Dalić', role: 'Director Técnico', since: 2017 },
    staff: [
      { name: 'Ivica Olić', role: 'Asistente Técnico' },
      { name: 'Vedran Ćorluka', role: 'Asistente Técnico' },
      { name: 'Dominik Livaković', role: 'Entrenador de Arqueros' },
      { name: 'Marko Šoštarić', role: 'Preparador Físico' },
    ],
    description: 'Los Vatreni (Los Ardientes) llegan al Mundial 2026 con Luka Modrić (41) como posible última actuación mundialista y Joško Gvardiol como el mejor defensa joven del mundo. Croacia siempre lucha hasta el final y puede sorprender a cualquiera.',
    colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#0044AA' },
    squad: {
      'Porteros': [
        { name: 'Dominik Livaković', num: 1, club: 'Fenerbahçe', age: 30, initials: 'DL', star: true },
        { name: 'Ivica Ivušić', num: 12, club: 'Osijek', age: 31, initials: 'II' },
        { name: 'Lovre Kalinić', num: 23, club: 'Hajduk Split', age: 33, initials: 'LK' },
      ],
      'Defensas': [
        { name: 'Joško Gvardiol', num: 24, club: 'Manchester City', age: 24, initials: 'JG', star: true },
        { name: 'Šime Vrsaljko', num: 22, club: 'Retirado', age: 35, initials: 'SV' },
        { name: 'Dejan Lovren', num: 6, club: 'Zenit', age: 37, initials: 'DL' },
        { name: 'Josip Šutalo', num: 3, club: 'AFC Ajax', age: 25, initials: 'JS' },
        { name: 'Borna Sosa', num: 15, club: 'Stuttgart', age: 28, initials: 'BS' },
        { name: 'Martin Erlić', num: 5, club: 'Bologna', age: 28, initials: 'ME' },
      ],
      'Mediocampistas': [
        { name: 'Luka Modrić', num: 10, club: 'Real Madrid', age: 41, initials: 'LM', star: true },
        { name: 'Mateo Kovačić', num: 8, club: 'Manchester City', age: 32, initials: 'MK', star: true },
        { name: 'Marcelo Brozović', num: 11, club: 'Al-Nassr', age: 33, initials: 'MB' },
        { name: 'Luka Sučić', num: 17, club: 'RB Salzburg', age: 23, initials: 'LS' },
        { name: 'Lovro Majer', num: 14, club: 'Wolfsburg', age: 27, initials: 'LM' },
        { name: 'Mario Pašalić', num: 19, club: 'Atalanta', age: 30, initials: 'MP' },
      ],
      'Delanteros': [
        { name: 'Ivan Perišić', num: 4, club: 'Hajduk Split', age: 37, initials: 'IP', star: true },
        { name: 'Andrej Kramarić', num: 9, club: 'Hoffenheim', age: 35, initials: 'AK' },
        { name: 'Ante Budimir', num: 19, club: 'Osasuna', age: 35, initials: 'AB' },
        { name: 'Bruno Petković', num: 16, club: 'Dinamo Zagreb', age: 32, initials: 'BP' },
        { name: 'Marko Livaja', num: 21, club: 'Hajduk Split', age: 32, initials: 'ML' },
        { name: 'Petar Musa', num: 18, club: 'Benfica', age: 27, initials: 'PM' },
      ],
    }
  },
  ghana: {
    culture: {
      tradicion: 'Ghana fue el primer equipo africano en llegar a cuartos de final de un Mundial (2010), eliminado de forma polémica por la mano de Suárez. Las Estrellas Negras son el equipo con mayor historia de Ghana, un país orgulloso de su fútbol continental.',
      gastronomia: 'El jollof rice (arroz frito con tomate y especias, en batalla culinaria permanente con Nigeria y Senegal), el fufu con soup, el kelewele (plátano frito picante) y el waakye (arroz con alubias) son las delicias de una cocina ghanesa vibrante.',
      musica: 'Ghana es la cuna del hiplife, mezcla de hip-hop con highlife ghanés. Sarkodie es el rapero más exitoso de África anglófona. El highlife tradicional, nacido en el siglo XX, fue el primer género de música popular africana que influyó en el jazz y R&B mundiales.',
      dato: 'Luis Suárez parando con la mano el gol de Dominic Adiyiah en el minuto 120 ante Ghana en Sudáfrica 2010 es uno de los momentos más controversiales de la historia del fútbol. Asamoah Gyan falló el penalti siguiente y Ghana quedó eliminada. Mohammed Kudus llegó para vengarlo.',
    },
    coach: { name: 'Otto Addo', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'George Boateng', role: 'Asistente Técnico' },
      { name: 'Mas-Ud Didi Dramani', role: 'Asistente Técnico' },
      { name: 'Richard Kingston', role: 'Entrenador de Arqueros' },
      { name: 'Ibrahim Tanko', role: 'Preparador Físico' },
    ],
    description: 'Las Estrellas Negras llegan al Mundial 2026 con Mohammed Kudus como gran estrella y Thomas Partey como motor del equipo. Ghana busca revancha de la traumática eliminación de 2010 y sueña con superar cuartos de final.',
    colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#006B3F' },
    squad: {
      'Porteros': [
        { name: 'Lawrence Ati Zigi', num: 1, club: 'St. Gallen', age: 30, initials: 'LA' },
        { name: 'Joseph Wollacott', num: 12, club: 'Charlton Athletic', age: 29, initials: 'JW' },
        { name: 'Abdul Manaf Nurudeen', num: 23, club: 'Deportivo Alavés', age: 26, initials: 'AN' },
      ],
      'Defensas': [
        { name: 'Daniel Amartey', num: 5, club: 'Leicester City', age: 31, initials: 'DA', star: true },
        { name: 'Alexander Djiku', num: 3, club: 'Fenerbahçe', age: 32, initials: 'AD' },
        { name: 'Tariq Lamptey', num: 2, club: 'Brighton', age: 26, initials: 'TL' },
        { name: 'Abdul Rahman Baba', num: 22, club: 'Reading', age: 31, initials: 'AB' },
        { name: 'Gideon Mensah', num: 15, club: 'Auxerre', age: 29, initials: 'GM' },
        { name: 'Kasim Adams', num: 4, club: 'Waasland Beveren', age: 29, initials: 'KA' },
      ],
      'Mediocampistas': [
        { name: 'Thomas Partey', num: 5, club: 'Arsenal', age: 33, initials: 'TP', star: true },
        { name: 'Salis Abdul Samed', num: 8, club: 'Lens', age: 25, initials: 'SS' },
        { name: 'Emmanuel Gyasi', num: 11, club: 'Spezia', age: 32, initials: 'EG' },
        { name: 'Kudus Mohammed', num: 10, club: 'West Ham', age: 25, initials: 'KM', star: true },
        { name: 'Iddrisu Baba', num: 6, club: 'Real Mallorca', age: 30, initials: 'IB' },
        { name: 'Antoine Semenyo', num: 7, club: 'Bournemouth', age: 26, initials: 'AS' },
      ],
      'Delanteros': [
        { name: 'Jordan Ayew', num: 19, club: 'Crystal Palace', age: 35, initials: 'JA', star: true },
        { name: 'Inaki Williams', num: 9, club: 'Athletic Club', age: 32, initials: 'IW', star: true },
        { name: 'André Ayew', num: 10, club: 'Retirado', age: 36, initials: 'AA' },
        { name: 'Osman Bukari', num: 17, club: 'Crvena zvezda', age: 27, initials: 'OB' },
        { name: 'Edmund Addo', num: 16, club: 'Sheriff Tiraspol', age: 27, initials: 'EA' },
        { name: 'Nicholas Opoku', num: 20, club: 'Amiens SC', age: 30, initials: 'NO' },
      ],
    }
  },
  panama: {
    culture: {
      tradicion: 'Panamá debutó en el Mundial 2018 y, aunque perdió los tres partidos, vivió la mayor fiesta de su historia. Román Torres marcó el gol clasificatorio que hizo llorar a una nación. Los Canaleros representan el puente entre dos océanos y el sueño del fútbol centroamericano.',
      gastronomia: 'El sancocho de gallina panameño, el arroz con pollo, los patacones (tostones de plátano verde), el ceviche panameño y la chicha fuerte de maíz definen una cocina caribeña e istmeña de raíces indígenas, africanas y españolas.',
      musica: 'Panamá es la cuna del reggaeton moderno junto a Puerto Rico. Rubén Blades, ganador de 9 Grammy Latinos, es el artista panameño más reconocido internacionalmente. La salsa, el vallenato colombiano y la cumbia son géneros populares en el istmo.',
      dato: 'Román Torres marcó el gol en el minuto 88 ante Costa Rica que clasificó a Panamá a su primer Mundial (2018). La celebración en Ciudad de Panamá fue histórica. En ese torneo, Panamá perdió ante Bélgica (0-3), Inglaterra (1-6) y Tunisia (1-2), pero escribió historia.',
    },
    coach: { name: 'Thomas Christiansen', role: 'Director Técnico', since: 2023 },
    staff: [
      { name: 'Rommel Fernández', role: 'Asistente Técnico' },
      { name: 'Jaime Penedo', role: 'Entrenador de Arqueros' },
      { name: 'Carlos Ruiz', role: 'Preparador Físico' },
      { name: 'Luis Tejada', role: 'Asesor Técnico' },
    ],
    description: 'Los Canaleros regresan al Mundial 2026 para demostrar que 2018 no fue casualidad. Roberto Nurse y Cecilio Waterman lideran a una selección que juega con la pasión y el orgullo de una nación que se enamoró del fútbol para siempre.',
    colors: { primary: '#DA121A', secondary: '#FFFFFF', accent: '#003688' },
    squad: {
      'Porteros': [
        { name: 'Luis Mejía', num: 1, club: 'Independiente', age: 27, initials: 'LM' },
        { name: 'Jaime Penedo', num: 12, club: 'Retirado', age: 43, initials: 'JP' },
        { name: 'Orlando Mosquera', num: 23, club: 'Millonarios', age: 26, initials: 'OM' },
      ],
      'Defensas': [
        { name: 'Éric Davis', num: 3, club: 'Retirado', age: 40, initials: 'ED' },
        { name: 'Harold Cummings', num: 4, club: 'Santos Laguna', age: 32, initials: 'HC' },
        { name: 'Fidel Escobar', num: 5, club: 'New York Red Bulls', age: 31, initials: 'FE' },
        { name: 'José Córdoba', num: 2, club: 'Pachuca', age: 27, initials: 'JC' },
        { name: 'Michael Murillo', num: 22, club: 'Anderlecht', age: 29, initials: 'MM' },
        { name: 'Andrés Andrade', num: 15, club: 'Montpellier', age: 29, initials: 'AA' },
      ],
      'Mediocampistas': [
        { name: 'Adalberto Carrasquilla', num: 8, club: 'Houston Dynamo', age: 27, initials: 'AC', star: true },
        { name: 'César Yanis', num: 10, club: 'Santos FC', age: 28, initials: 'CY', star: true },
        { name: 'Alberto Quintero', num: 11, club: 'Alianza Lima', age: 36, initials: 'AQ' },
        { name: 'José Fajardo', num: 14, club: 'DC United', age: 30, initials: 'JF' },
        { name: 'Édgar Bárcenas', num: 16, club: 'Tigres UANL', age: 31, initials: 'EB' },
        { name: 'Anibal Godoy', num: 18, club: 'Nashville SC', age: 36, initials: 'AG' },
      ],
      'Delanteros': [
        { name: 'Roberto Nurse', num: 7, club: 'Retirado', age: 35, initials: 'RN', star: true },
        { name: 'Cecilio Waterman', num: 9, club: 'Club Brugge', age: 32, initials: 'CW', star: true },
        { name: 'Adolfo Machado', num: 6, club: 'Tigres UANL', age: 36, initials: 'AM' },
        { name: 'Rolando Blackburn', num: 19, club: 'CF Montréal', age: 31, initials: 'RB' },
        { name: 'Abdiel Ayarza', num: 20, club: 'Inter Miami', age: 26, initials: 'AA' },
        { name: 'Gabriel Torres', num: 13, club: 'Retirado', age: 37, initials: 'GT' },
      ],
    }
  },
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
// USA BANNER — HoverExpand style (skiper52)
// ============================================================
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

// ============================================================
// TEAM PAGE (full page detail)
// ============================================================
function WCTeamPage({ team, teamData, tweaks, onBack }) {
  const roster = TEAM_ROSTERS[team.id] || {};

  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const accent = tweaks.accentColor;
  const colors = roster.colors || { primary: '#333', secondary: '#fff', accent: accent };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', height: 'clamp(380px, 55vh, 520px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* BG: USA uses HoverExpand banner, others use image */}
        {team.id === 'usa' ? (
          <div style={{
            position: 'absolute', inset: 0,
            background: '#060A14',
            display: 'flex', alignItems: 'stretch',
            padding: 'clamp(10px, 1.5vw, 16px)',
            paddingBottom: 'clamp(72px, 10vw, 96px)',
          }}>
            <USABannerExpand tweaks={tweaks} />
          </div>
        ) : (
          <>
            {team.image && (
              <img src={team.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: team.gradient, mixBlendMode: 'multiply', opacity: 0.7 }}></div>
          </>
        )}
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
          { value: team.ranking ? `#${team.ranking}` : '—', label: 'Ranking FIFA' },
          { value: team.titles ?? '—', label: 'Títulos Mundiales' },
          { value: team.group, label: 'Grupo' },
          { value: roster.squad ? Object.values(roster.squad).flat().length : '—', label: 'Convocados' },
        ].map(stat => (
          <div key={stat.label} style={{ minWidth: 100 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: fg, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ===== DESCRIPTION ===== */}
      {roster.description && (
        <section style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)', maxWidth: 800 }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
            {roster.description}
          </p>
        </section>
      )}

      {/* ===== CULTURA Y COSTUMBRES ===== */}
      {roster.culture && (
        <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(40px, 5vw, 60px)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', color: fg, margin: '0 0 24px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Cultura &amp; Costumbres
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚽', label: 'Tradición futbolística', text: roster.culture.tradicion },
              { icon: '🍽️', label: 'Gastronomía', text: roster.culture.gastronomia },
              { icon: '🎵', label: 'Música y Cultura', text: roster.culture.musica },
              { icon: '📌', label: 'Dato curioso', text: roster.culture.dato },
            ].filter(item => item.text).map(item => (
              <div key={item.label} style={{
                background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: radius, padding: '20px 22px',
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{item.label}</div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: fg, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== SQUAD GALLERY ===== */}
      {roster.squad && Object.entries(roster.squad).map(([position, players]) => (
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
              <PlayerPhotoCard key={player.name} player={player} teamColors={colors} tweaks={tweaks} index={i} />
            ))}
          </div>
        </section>
      ))}

      {/* ===== COACHING STAFF ===== */}
      {roster.coach && (
        <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: fg, margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Cuerpo Técnico
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <StaffCard person={roster.coach} teamColors={colors} tweaks={tweaks} isHead={true} />
            {(roster.staff || []).map(s => (
              <StaffCard key={s.name} person={s} teamColors={colors} tweaks={tweaks} isHead={false} />
            ))}
          </div>
        </section>
      )}

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