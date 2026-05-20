const { useState, useEffect, useRef } = React;

// ============================================================
// MATCH SCHEDULE DATA (representative sample)
// ============================================================
const MATCH_DAYS = [
  // ===== JORNADA 1 =====
  {
    date: '11 Jun 2026', label: 'Día 1 — Inauguración',
    matches: [
      { time: '17:00', local: 'CDMX', home: 'México', away: 'Rep. Checa', homeFlag: '🇲🇽', awayFlag: '🇨🇿', venue: 'Estadio Azteca, Ciudad de México', group: 'A', type: 'Inauguración' },
    ]
  },
  {
    date: '12 Jun 2026', label: 'Día 2',
    matches: [
      { time: '11:00', local: 'ET', home: 'Sudáfrica', away: 'Rep. de Corea', homeFlag: '🇿🇦', awayFlag: '🇰🇷', venue: 'AT&T Stadium, Dallas', group: 'A', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Canadá', away: 'Bosnia y Herz.', homeFlag: '🇨🇦', awayFlag: '🇧🇦', venue: 'BMO Field, Toronto', group: 'B', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Brasil', away: 'Escocia', homeFlag: '🇧🇷', awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: 'MetLife Stadium, Nueva Jersey', group: 'C', type: 'Grupos' },
      { time: '20:00', local: 'PT', home: 'Estados Unidos', away: 'Turquía', homeFlag: '🇺🇸', awayFlag: '🇹🇷', venue: 'SoFi Stadium, Los Ángeles', group: 'D', type: 'Grupos' },
    ]
  },
  {
    date: '13 Jun 2026', label: 'Día 3',
    matches: [
      { time: '11:00', local: 'ET', home: 'Catar', away: 'Suiza', homeFlag: '🇶🇦', awayFlag: '🇨🇭', venue: 'NRG Stadium, Houston', group: 'B', type: 'Grupos' },
      { time: '14:00', local: 'PT', home: 'Marruecos', away: 'Haití', homeFlag: '🇲🇦', awayFlag: '🇭🇹', venue: 'Rose Bowl, Los Ángeles', group: 'C', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Paraguay', away: 'Australia', homeFlag: '🇵🇾', awayFlag: '🇦🇺', venue: 'Hard Rock Stadium, Miami', group: 'D', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Alemania', away: 'Ecuador', homeFlag: '🇩🇪', awayFlag: '🇪🇨', venue: 'Mercedes-Benz Stadium, Atlanta', group: 'E', type: 'Grupos' },
    ]
  },
  {
    date: '14 Jun 2026', label: 'Día 4',
    matches: [
      { time: '11:00', local: 'ET', home: 'Costa de Marfil', away: 'Curazao', homeFlag: '🇨🇮', awayFlag: '🇨🇼', venue: 'Gillette Stadium, Boston', group: 'E', type: 'Grupos' },
      { time: '14:00', local: 'PT', home: 'Países Bajos', away: 'Suecia', homeFlag: '🇳🇱', awayFlag: '🇸🇪', venue: 'Lumen Field, Seattle', group: 'F', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Bélgica', away: 'Irán', homeFlag: '🇧🇪', awayFlag: '🇮🇷', venue: 'Lincoln Financial, Filadelfia', group: 'G', type: 'Grupos' },
      { time: '20:00', local: 'CT', home: 'España', away: 'Uruguay', homeFlag: '🇪🇸', awayFlag: '🇺🇾', venue: 'AT&T Stadium, Dallas', group: 'H', type: 'Grupos' },
    ]
  },
  {
    date: '15 Jun 2026', label: 'Día 5',
    matches: [
      { time: '11:00', local: 'PT', home: 'Japón', away: 'Túnez', homeFlag: '🇯🇵', awayFlag: '🇹🇳', venue: "Levi's Stadium, Santa Clara", group: 'F', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Egipto', away: 'Nueva Zelanda', homeFlag: '🇪🇬', awayFlag: '🇳🇿', venue: 'Hard Rock Stadium, Miami', group: 'G', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Cabo Verde', away: 'Arabia Saudí', homeFlag: '🇨🇻', awayFlag: '🇸🇦', venue: 'MetLife Stadium, Nueva Jersey', group: 'H', type: 'Grupos' },
      { time: '20:00', local: 'PT', home: 'Francia', away: 'Noruega', homeFlag: '🇫🇷', awayFlag: '🇳🇴', venue: 'SoFi Stadium, Los Ángeles', group: 'I', type: 'Grupos' },
    ]
  },
  {
    date: '16 Jun 2026', label: 'Día 6',
    matches: [
      { time: '11:00', local: 'ET', home: 'Senegal', away: 'Irak', homeFlag: '🇸🇳', awayFlag: '🇮🇶', venue: 'Mercedes-Benz Stadium, Atlanta', group: 'I', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Argentina', away: 'Austria', homeFlag: '🇦🇷', awayFlag: '🇦🇹', venue: 'NRG Stadium, Houston', group: 'J', type: 'Grupos' },
      { time: '17:00', local: 'PT', home: 'Portugal', away: 'Colombia', homeFlag: '🇵🇹', awayFlag: '🇨🇴', venue: 'Rose Bowl, Los Ángeles', group: 'K', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Inglaterra', away: 'Panamá', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇵🇦', venue: 'Lincoln Financial, Filadelfia', group: 'L', type: 'Grupos' },
    ]
  },
  {
    date: '17 Jun 2026', label: 'Día 7',
    matches: [
      { time: '11:00', local: 'CT', home: 'Argelia', away: 'Jordania', homeFlag: '🇩🇿', awayFlag: '🇯🇴', venue: 'AT&T Stadium, Dallas', group: 'J', type: 'Grupos' },
      { time: '14:00', local: 'PT', home: 'RD Congo', away: 'Uzbekistán', homeFlag: '🇨🇩', awayFlag: '🇺🇿', venue: 'BC Place, Vancouver', group: 'K', type: 'Grupos' },
      { time: '17:00', local: 'CT', home: 'Croacia', away: 'Ghana', homeFlag: '🇭🇷', awayFlag: '🇬🇭', venue: 'Arrowhead Stadium, Kansas City', group: 'L', type: 'Grupos' },
      { time: '20:00', local: 'CDMX', home: 'México', away: 'Rep. de Corea', homeFlag: '🇲🇽', awayFlag: '🇰🇷', venue: 'Estadio Akron, Guadalajara', group: 'A', type: 'Grupos' },
    ]
  },
  // ===== JORNADA 2 =====
  {
    date: '18 Jun 2026', label: 'Día 8',
    matches: [
      { time: '11:00', local: 'ET', home: 'Rep. Checa', away: 'Sudáfrica', homeFlag: '🇨🇿', awayFlag: '🇿🇦', venue: 'BMO Field, Toronto', group: 'A', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Canadá', away: 'Catar', homeFlag: '🇨🇦', awayFlag: '🇶🇦', venue: 'Gillette Stadium, Boston', group: 'B', type: 'Grupos' },
      { time: '17:00', local: 'PT', home: 'Suiza', away: 'Bosnia y Herz.', homeFlag: '🇨🇭', awayFlag: '🇧🇦', venue: 'Lumen Field, Seattle', group: 'B', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Brasil', away: 'Haití', homeFlag: '🇧🇷', awayFlag: '🇭🇹', venue: 'NRG Stadium, Houston', group: 'C', type: 'Grupos' },
    ]
  },
  {
    date: '19 Jun 2026', label: 'Día 9',
    matches: [
      { time: '11:00', local: 'PT', home: 'Escocia', away: 'Marruecos', homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', awayFlag: '🇲🇦', venue: 'SoFi Stadium, Los Ángeles', group: 'C', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Estados Unidos', away: 'Australia', homeFlag: '🇺🇸', awayFlag: '🇦🇺', venue: 'MetLife Stadium, Nueva Jersey', group: 'D', type: 'Grupos' },
      { time: '17:00', local: 'CT', home: 'Turquía', away: 'Paraguay', homeFlag: '🇹🇷', awayFlag: '🇵🇾', venue: 'AT&T Stadium, Dallas', group: 'D', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Alemania', away: 'Costa de Marfil', homeFlag: '🇩🇪', awayFlag: '🇨🇮', venue: 'Hard Rock Stadium, Miami', group: 'E', type: 'Grupos' },
    ]
  },
  {
    date: '20 Jun 2026', label: 'Día 10',
    matches: [
      { time: '11:00', local: 'PT', home: 'Ecuador', away: 'Curazao', homeFlag: '🇪🇨', awayFlag: '🇨🇼', venue: 'Rose Bowl, Los Ángeles', group: 'E', type: 'Grupos' },
      { time: '14:00', local: 'CT', home: 'Países Bajos', away: 'Túnez', homeFlag: '🇳🇱', awayFlag: '🇹🇳', venue: 'Arrowhead Stadium, Kansas City', group: 'F', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Suecia', away: 'Japón', homeFlag: '🇸🇪', awayFlag: '🇯🇵', venue: 'Mercedes-Benz Stadium, Atlanta', group: 'F', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Bélgica', away: 'Nueva Zelanda', homeFlag: '🇧🇪', awayFlag: '🇳🇿', venue: 'Lincoln Financial, Filadelfia', group: 'G', type: 'Grupos' },
    ]
  },
  {
    date: '21 Jun 2026', label: 'Día 11',
    matches: [
      { time: '11:00', local: 'PT', home: 'Irán', away: 'Egipto', homeFlag: '🇮🇷', awayFlag: '🇪🇬', venue: "Levi's Stadium, Santa Clara", group: 'G', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'España', away: 'Arabia Saudí', homeFlag: '🇪🇸', awayFlag: '🇸🇦', venue: 'MetLife Stadium, Nueva Jersey', group: 'H', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Uruguay', away: 'Cabo Verde', homeFlag: '🇺🇾', awayFlag: '🇨🇻', venue: 'Gillette Stadium, Boston', group: 'H', type: 'Grupos' },
      { time: '20:00', local: 'PT', home: 'Francia', away: 'Irak', homeFlag: '🇫🇷', awayFlag: '🇮🇶', venue: 'SoFi Stadium, Los Ángeles', group: 'I', type: 'Grupos' },
    ]
  },
  {
    date: '22 Jun 2026', label: 'Día 12',
    matches: [
      { time: '11:00', local: 'CT', home: 'Noruega', away: 'Senegal', homeFlag: '🇳🇴', awayFlag: '🇸🇳', venue: 'AT&T Stadium, Dallas', group: 'I', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Argentina', away: 'Jordania', homeFlag: '🇦🇷', awayFlag: '🇯🇴', venue: 'Hard Rock Stadium, Miami', group: 'J', type: 'Grupos' },
      { time: '17:00', local: 'ET', home: 'Austria', away: 'Argelia', homeFlag: '🇦🇹', awayFlag: '🇩🇿', venue: 'NRG Stadium, Houston', group: 'J', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Portugal', away: 'Uzbekistán', homeFlag: '🇵🇹', awayFlag: '🇺🇿', venue: 'BMO Field, Toronto', group: 'K', type: 'Grupos' },
    ]
  },
  {
    date: '23 Jun 2026', label: 'Día 13',
    matches: [
      { time: '11:00', local: 'PT', home: 'Colombia', away: 'RD Congo', homeFlag: '🇨🇴', awayFlag: '🇨🇩', venue: 'Rose Bowl, Los Ángeles', group: 'K', type: 'Grupos' },
      { time: '14:00', local: 'ET', home: 'Inglaterra', away: 'Ghana', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇬🇭', venue: 'Lincoln Financial, Filadelfia', group: 'L', type: 'Grupos' },
      { time: '17:00', local: 'CT', home: 'Panamá', away: 'Croacia', homeFlag: '🇵🇦', awayFlag: '🇭🇷', venue: 'Arrowhead Stadium, Kansas City', group: 'L', type: 'Grupos' },
    ]
  },
  // ===== JORNADA 3 — simultánea por grupo =====
  {
    date: '24 Jun 2026', label: 'Día 14 — Definición Grupos A y B',
    matches: [
      { time: '16:00', local: 'CDMX', home: 'México', away: 'Sudáfrica', homeFlag: '🇲🇽', awayFlag: '🇿🇦', venue: 'Estadio Azteca, Ciudad de México', group: 'A', type: 'Grupos' },
      { time: '16:00', local: 'CDMX', home: 'Rep. de Corea', away: 'Rep. Checa', homeFlag: '🇰🇷', awayFlag: '🇨🇿', venue: 'Estadio BBVA, Monterrey', group: 'A', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Canadá', away: 'Suiza', homeFlag: '🇨🇦', awayFlag: '🇨🇭', venue: 'BMO Field, Toronto', group: 'B', type: 'Grupos' },
      { time: '20:00', local: 'ET', home: 'Bosnia y Herz.', away: 'Catar', homeFlag: '🇧🇦', awayFlag: '🇶🇦', venue: 'Gillette Stadium, Boston', group: 'B', type: 'Grupos' },
    ]
  },
  {
    date: '25 Jun 2026', label: 'Día 15 — Definición Grupos C y D',
    matches: [
      { time: '15:00', local: 'ET', home: 'Brasil', away: 'Marruecos', homeFlag: '🇧🇷', awayFlag: '🇲🇦', venue: 'MetLife Stadium, Nueva Jersey', group: 'C', type: 'Grupos' },
      { time: '15:00', local: 'CT', home: 'Escocia', away: 'Haití', homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', awayFlag: '🇭🇹', venue: 'AT&T Stadium, Dallas', group: 'C', type: 'Grupos' },
      { time: '19:00', local: 'PT', home: 'Estados Unidos', away: 'Paraguay', homeFlag: '🇺🇸', awayFlag: '🇵🇾', venue: 'SoFi Stadium, Los Ángeles', group: 'D', type: 'Grupos' },
      { time: '19:00', local: 'ET', home: 'Australia', away: 'Turquía', homeFlag: '🇦🇺', awayFlag: '🇹🇷', venue: 'Hard Rock Stadium, Miami', group: 'D', type: 'Grupos' },
    ]
  },
  {
    date: '26 Jun 2026', label: 'Día 16 — Definición Grupos E y F',
    matches: [
      { time: '15:00', local: 'ET', home: 'Alemania', away: 'Curazao', homeFlag: '🇩🇪', awayFlag: '🇨🇼', venue: 'NRG Stadium, Houston', group: 'E', type: 'Grupos' },
      { time: '15:00', local: 'ET', home: 'Ecuador', away: 'Costa de Marfil', homeFlag: '🇪🇨', awayFlag: '🇨🇮', venue: 'Mercedes-Benz Stadium, Atlanta', group: 'E', type: 'Grupos' },
      { time: '19:00', local: 'PT', home: 'Países Bajos', away: 'Japón', homeFlag: '🇳🇱', awayFlag: '🇯🇵', venue: 'Rose Bowl, Los Ángeles', group: 'F', type: 'Grupos' },
      { time: '19:00', local: 'PT', home: 'Suecia', away: 'Túnez', homeFlag: '🇸🇪', awayFlag: '🇹🇳', venue: 'Lumen Field, Seattle', group: 'F', type: 'Grupos' },
    ]
  },
  {
    date: '27 Jun 2026', label: 'Día 17 — Definición Grupos G y H',
    matches: [
      { time: '15:00', local: 'ET', home: 'Bélgica', away: 'Egipto', homeFlag: '🇧🇪', awayFlag: '🇪🇬', venue: 'Lincoln Financial, Filadelfia', group: 'G', type: 'Grupos' },
      { time: '15:00', local: 'PT', home: 'Irán', away: 'Nueva Zelanda', homeFlag: '🇮🇷', awayFlag: '🇳🇿', venue: "Levi's Stadium, Santa Clara", group: 'G', type: 'Grupos' },
      { time: '19:00', local: 'CT', home: 'España', away: 'Cabo Verde', homeFlag: '🇪🇸', awayFlag: '🇨🇻', venue: 'Arrowhead Stadium, Kansas City', group: 'H', type: 'Grupos' },
      { time: '19:00', local: 'CT', home: 'Uruguay', away: 'Arabia Saudí', homeFlag: '🇺🇾', awayFlag: '🇸🇦', venue: 'AT&T Stadium, Dallas', group: 'H', type: 'Grupos' },
    ]
  },
  {
    date: '28 Jun 2026', label: 'Día 18 — Definición Grupos I y J',
    matches: [
      { time: '15:00', local: 'ET', home: 'Francia', away: 'Senegal', homeFlag: '🇫🇷', awayFlag: '🇸🇳', venue: 'MetLife Stadium, Nueva Jersey', group: 'I', type: 'Grupos' },
      { time: '15:00', local: 'PT', home: 'Noruega', away: 'Irak', homeFlag: '🇳🇴', awayFlag: '🇮🇶', venue: 'SoFi Stadium, Los Ángeles', group: 'I', type: 'Grupos' },
      { time: '19:00', local: 'ET', home: 'Argentina', away: 'Argelia', homeFlag: '🇦🇷', awayFlag: '🇩🇿', venue: 'Hard Rock Stadium, Miami', group: 'J', type: 'Grupos' },
      { time: '19:00', local: 'ET', home: 'Austria', away: 'Jordania', homeFlag: '🇦🇹', awayFlag: '🇯🇴', venue: 'NRG Stadium, Houston', group: 'J', type: 'Grupos' },
    ]
  },
  {
    date: '29 Jun 2026', label: 'Día 19 — Definición Grupos K y L',
    matches: [
      { time: '15:00', local: 'PT', home: 'Portugal', away: 'RD Congo', homeFlag: '🇵🇹', awayFlag: '🇨🇩', venue: 'Rose Bowl, Los Ángeles', group: 'K', type: 'Grupos' },
      { time: '15:00', local: 'ET', home: 'Colombia', away: 'Uzbekistán', homeFlag: '🇨🇴', awayFlag: '🇺🇿', venue: 'Gillette Stadium, Boston', group: 'K', type: 'Grupos' },
      { time: '19:00', local: 'ET', home: 'Inglaterra', away: 'Croacia', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇭🇷', venue: 'MetLife Stadium, Nueva Jersey', group: 'L', type: 'Grupos' },
      { time: '19:00', local: 'CT', home: 'Ghana', away: 'Panamá', homeFlag: '🇬🇭', awayFlag: '🇵🇦', venue: 'AT&T Stadium, Dallas', group: 'L', type: 'Grupos' },
    ]
  },
  // ===== RONDA DE 32 =====
  {
    date: '1 Jul 2026', label: 'Ronda de 32 — Día 1',
    matches: [
      { time: '13:00', local: 'ET', home: '1° Grupo A', away: '3° mejor (D/E/F)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, Nueva Jersey', group: '', type: 'Ronda 32' },
      { time: '17:00', local: 'ET', home: '1° Grupo C', away: '3° mejor (A/B/G)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Ronda 32' },
      { time: '21:00', local: 'CT', home: '1° Grupo B', away: '3° mejor (I/J/K/L)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Ronda 32' },
    ]
  },
  {
    date: '2 Jul 2026', label: 'Ronda de 32 — Día 2',
    matches: [
      { time: '13:00', local: 'PT', home: '1° Grupo D', away: '2° Grupo C', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, Los Ángeles', group: '', type: 'Ronda 32' },
      { time: '17:00', local: 'ET', home: '1° Grupo F', away: '2° Grupo E', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Mercedes-Benz Stadium, Atlanta', group: '', type: 'Ronda 32' },
      { time: '21:00', local: 'ET', home: '1° Grupo E', away: '2° Grupo D', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'NRG Stadium, Houston', group: '', type: 'Ronda 32' },
    ]
  },
  {
    date: '3 Jul 2026', label: 'Ronda de 32 — Día 3',
    matches: [
      { time: '13:00', local: 'PT', home: '1° Grupo G', away: '2° Grupo H', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Rose Bowl, Los Ángeles', group: '', type: 'Ronda 32' },
      { time: '17:00', local: 'ET', home: '1° Grupo I', away: '2° Grupo J', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Lincoln Financial, Filadelfia', group: '', type: 'Ronda 32' },
      { time: '21:00', local: 'ET', home: '1° Grupo H', away: '2° Grupo G', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'BMO Field, Toronto', group: '', type: 'Ronda 32' },
    ]
  },
  {
    date: '4 Jul 2026', label: 'Ronda de 32 — Día 4',
    matches: [
      { time: '13:00', local: 'ET', home: '1° Grupo J', away: '2° Grupo I', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, Nueva Jersey', group: '', type: 'Ronda 32' },
      { time: '17:00', local: 'CT', home: '1° Grupo K', away: '2° Grupo L', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Ronda 32' },
      { time: '21:00', local: 'PT', home: '1° Grupo L', away: '2° Grupo K', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, Los Ángeles', group: '', type: 'Ronda 32' },
    ]
  },
  {
    date: '5 Jul 2026', label: 'Ronda de 32 — Día 5',
    matches: [
      { time: '13:00', local: 'ET', home: '2° Grupo A', away: '3° mejor (H/I/J)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Ronda 32' },
      { time: '17:00', local: 'ET', home: '2° Grupo B', away: '3° mejor (C/D/E/F)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'NRG Stadium, Houston', group: '', type: 'Ronda 32' },
      { time: '21:00', local: 'ET', home: '2° Grupo F', away: '3° mejor (A/B/K/L)', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Mercedes-Benz Stadium, Atlanta', group: '', type: 'Ronda 32' },
    ]
  },
  // ===== OCTAVOS DE FINAL =====
  {
    date: '8 Jul 2026', label: 'Octavos de Final — Día 1',
    matches: [
      { time: '13:00', local: 'ET', home: 'Ganador R32-1', away: 'Ganador R32-2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, Nueva Jersey', group: '', type: 'Octavos' },
      { time: '17:00', local: 'PT', home: 'Ganador R32-3', away: 'Ganador R32-4', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, Los Ángeles', group: '', type: 'Octavos' },
      { time: '21:00', local: 'CT', home: 'Ganador R32-5', away: 'Ganador R32-6', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Octavos' },
    ]
  },
  {
    date: '9 Jul 2026', label: 'Octavos de Final — Día 2',
    matches: [
      { time: '13:00', local: 'ET', home: 'Ganador R32-7', away: 'Ganador R32-8', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Octavos' },
      { time: '17:00', local: 'ET', home: 'Ganador R32-9', away: 'Ganador R32-10', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Mercedes-Benz Stadium, Atlanta', group: '', type: 'Octavos' },
      { time: '21:00', local: 'ET', home: 'Ganador R32-11', away: 'Ganador R32-12', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'NRG Stadium, Houston', group: '', type: 'Octavos' },
    ]
  },
  {
    date: '10 Jul 2026', label: 'Octavos de Final — Día 3',
    matches: [
      { time: '13:00', local: 'PT', home: 'Ganador R32-13', away: 'Ganador R32-14', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Rose Bowl, Los Ángeles', group: '', type: 'Octavos' },
      { time: '17:00', local: 'ET', home: 'Ganador R32-15', away: 'Ganador R32-16', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Lincoln Financial, Filadelfia', group: '', type: 'Octavos' },
    ]
  },
  // ===== CUARTOS DE FINAL =====
  {
    date: '12 Jul 2026', label: 'Cuartos de Final — Día 1',
    matches: [
      { time: '14:00', local: 'ET', home: 'Ganador OF1', away: 'Ganador OF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, Nueva Jersey', group: '', type: 'Cuartos' },
      { time: '18:00', local: 'PT', home: 'Ganador OF3', away: 'Ganador OF4', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, Los Ángeles', group: '', type: 'Cuartos' },
    ]
  },
  {
    date: '13 Jul 2026', label: 'Cuartos de Final — Día 2',
    matches: [
      { time: '14:00', local: 'CT', home: 'Ganador OF5', away: 'Ganador OF6', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'AT&T Stadium, Dallas', group: '', type: 'Cuartos' },
      { time: '18:00', local: 'ET', home: 'Ganador OF7', away: 'Ganador OF8', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Cuartos' },
    ]
  },
  // ===== SEMIFINALES =====
  {
    date: '15 Jul 2026', label: 'Semifinal 1',
    matches: [
      { time: '17:00', local: 'ET', home: 'Ganador QF1', away: 'Ganador QF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, Nueva Jersey', group: '', type: 'Semifinal' },
    ]
  },
  {
    date: '16 Jul 2026', label: 'Semifinal 2',
    matches: [
      { time: '17:00', local: 'PT', home: 'Ganador QF3', away: 'Ganador QF4', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'SoFi Stadium, Los Ángeles', group: '', type: 'Semifinal' },
    ]
  },
  // ===== TERCER PUESTO Y FINAL =====
  {
    date: '18 Jul 2026', label: 'Tercer Puesto',
    matches: [
      { time: '16:00', local: 'ET', home: 'Perdedor SF1', away: 'Perdedor SF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'Hard Rock Stadium, Miami', group: '', type: 'Tercer puesto' },
    ]
  },
  {
    date: '19 Jul 2026', label: '🏆 Gran Final',
    matches: [
      { time: '16:00', local: 'ET', home: 'Ganador SF1', away: 'Ganador SF2', homeFlag: '🏳️', awayFlag: '🏳️', venue: 'MetLife Stadium, East Rutherford', group: '', type: 'FINAL' },
    ]
  },
];

const TIMEZONE_OPTIONS = [
  { label: 'ET (Nueva York)', offset: 0 },
  { label: 'CT (Dallas)', offset: -1 },
  { label: 'PT (Los Ángeles)', offset: -3 },
  { label: 'CDMX', offset: -1 },
  { label: 'Madrid (CEST)', offset: 6 },
  { label: 'Londres (BST)', offset: 5 },
  { label: 'Tokio (JST)', offset: 13 },
  { label: 'Buenos Aires (ART)', offset: 1 },
];

const TEAM_FLAG_CODES = {
  'México': 'mx', 'Sudáfrica': 'za', 'Rep. de Corea': 'kr', 'Rep. Checa': 'cz',
  'Canadá': 'ca', 'Bosnia y Herz.': 'ba', 'Catar': 'qa', 'Suiza': 'ch',
  'Brasil': 'br', 'Marruecos': 'ma', 'Haití': 'ht', 'Escocia': 'gb-sct',
  'Estados Unidos': 'us', 'Paraguay': 'py', 'Australia': 'au', 'Turquía': 'tr',
  'Alemania': 'de', 'Curazao': 'cw', 'Costa de Marfil': 'ci', 'Ecuador': 'ec',
  'Países Bajos': 'nl', 'Japón': 'jp', 'Suecia': 'se', 'Túnez': 'tn',
  'Bélgica': 'be', 'Egipto': 'eg', 'Irán': 'ir', 'Nueva Zelanda': 'nz',
  'España': 'es', 'Cabo Verde': 'cv', 'Arabia Saudí': 'sa', 'Uruguay': 'uy',
  'Francia': 'fr', 'Senegal': 'sn', 'Irak': 'iq', 'Noruega': 'no',
  'Argentina': 'ar', 'Argelia': 'dz', 'Austria': 'at', 'Jordania': 'jo',
  'Portugal': 'pt', 'RD Congo': 'cd', 'Uzbekistán': 'uz', 'Colombia': 'co',
  'Inglaterra': 'gb-eng', 'Croacia': 'hr', 'Ghana': 'gh', 'Panamá': 'pa',
};

function TeamFlag({ name, emoji }) {
  const code = TEAM_FLAG_CODES[name];
  if (!code) return React.createElement('span', { style: { fontSize: 20, lineHeight: 1 } }, emoji);
  return React.createElement('img', {
    src: `https://flagcdn.com/w40/${code}.png`,
    alt: name,
    style: { width: 28, height: 20, objectFit: 'cover', borderRadius: 2, flexShrink: 0 },
    onError: (e) => { e.currentTarget.style.display = 'none'; },
  });
}

function adjustTime(timeStr, offsetHours) {
  const [h, m] = timeStr.split(':').map(Number);
  let newH = h + offsetHours;
  let dayShift = '';
  if (newH >= 24) { newH -= 24; dayShift = ' (+1)'; }
  if (newH < 0) { newH += 24; dayShift = ' (-1)'; }
  return String(newH).padStart(2, '0') + ':' + String(m).padStart(2, '0') + dayShift;
}

function getTypeColor(type) {
  const map = {
    'Inauguración': '#F4A100',
    'Grupos': '#00C4B3',
    'Ronda 32': '#E060A0',
    'Octavos': '#6C5CE7',
    'Cuartos': '#E8344E',
    'Semifinal': '#FF6B6B',
    'Tercer puesto': '#A8A8A8',
    'FINAL': '#FFD700',
  };
  return map[type] || '#00C4B3';
}

// ============================================================
// CALENDAR PAGE
// ============================================================
function WCCalendarPage({ tweaks, onBack }) {
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgM = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const radius = tweaks.roundedCards ? 12 : 0;
  const [tz, setTz] = useState(0);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const types = ['Grupos', 'Ronda 32', 'Octavos', 'Cuartos', 'Semifinal', 'FINAL'];
  const filteredDays = filterType
    ? MATCH_DAYS.map(d => ({ ...d, matches: d.matches.filter(m => m.type === filterType) })).filter(d => d.matches.length > 0)
    : MATCH_DAYS;

  return (
    <div className="wc-team-page-enter" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(260px, 38vh, 380px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=1200&h=500&fit=crop&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(5,10,30,0.88), rgba(0,100,90,0.5))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
        <button onClick={onBack} className="wc-back-btn" style={{ position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Volver
        </button>
        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 4vw, 40px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>11 junio — 19 julio 2026</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 8vw, 68px)', color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 0.95 }}>Calendario de Partidos</h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>104 partidos · 16 ciudades · 3 países</p>
        </div>
      </section>

      {/* Controls */}
      <section style={{ background: dark ? '#111118' : '#fff', padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 4vw, 48px)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, position: 'sticky', top: 64, zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Timezone selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fgM} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: fgM, textTransform: 'uppercase', letterSpacing: 1 }}>Zona horaria</span>
            <select value={tz} onChange={e => setTz(Number(e.target.value))}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 600, padding: '8px 16px', borderRadius: tweaks.roundedCards ? 8 : 4, border: `1px solid ${dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'}`, background: dark ? 'rgba(255,255,255,0.07)' : '#fff', color: fg, outline: 'none', cursor: 'pointer', minWidth: 200 }}>
              {TIMEZONE_OPTIONS.map((t, i) => (
                <option key={i} value={t.offset}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Phase filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setFilterType(null)} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, padding: '5px 14px', border: 'none', cursor: 'pointer', borderRadius: tweaks.roundedCards ? 999 : 4, background: filterType === null ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'), color: filterType === null ? (dark ? '#111' : '#fff') : fgM, letterSpacing: 0.5, transition: 'all 0.2s' }}>Todos</button>
            {types.map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, padding: '5px 14px', border: 'none', cursor: 'pointer', borderRadius: tweaks.roundedCards ? 999 : 4, background: filterType === t ? (dark ? '#fff' : '#111') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'), color: filterType === t ? (dark ? '#111' : '#fff') : fgM, letterSpacing: 0.5, transition: 'all 0.2s' }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: 'clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px)', maxWidth: 800, margin: '0 auto' }}>
        {filteredDays.map((day, di) => (
          <div key={di} style={{ marginBottom: 36 }}>
            {/* Day header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 2vw, 20px)', color: fg, textTransform: 'uppercase', letterSpacing: 0.5 }}>{day.label}</div>
              <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}></div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgM }}>{day.date}</div>
            </div>

            {/* Matches */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {day.matches.map((match, mi) => (
                <MatchRow key={mi} match={match} tweaks={tweaks} tzOffset={tz} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: dark ? '#fff' : '#111', background: 'none', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, borderRadius: tweaks.roundedCards ? 999 : 4, padding: '14px 36px', cursor: 'pointer' }}>← Volver al inicio</button>
      </section>
    </div>
  );
}

function MatchRow({ match, tweaks, tzOffset }) {
  const [hover, setHover] = useState(false);
  const dark = tweaks.darkMode;
  const r = tweaks.roundedCards ? 10 : 0;
  const typeColor = getTypeColor(match.type);
  const adjustedTime = adjustTime(match.time, tzOffset);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 16px)',
      padding: 'clamp(12px, 1.5vw, 16px)',
      borderRadius: r,
      background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
      transform: hover ? 'translateX(4px)' : 'translateX(0)',
      transition: 'all 0.25s ease',
      cursor: 'default',
    }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

      {/* Time */}
      <div style={{ flexShrink: 0, minWidth: 60, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 26, color: dark ? '#fff' : '#111', lineHeight: 1 }}>{adjustedTime}</div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 3 }}>{TIMEZONE_OPTIONS.find(t => t.offset === tzOffset)?.label.split(' ')[0] || 'ET'}</div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 36, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', flexShrink: 0 }}></div>

      {/* Match info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <TeamFlag name={match.home} emoji={match.homeFlag} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.2 }}>{match.home}</span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 400, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>vs</span>
          <TeamFlag name={match.away} emoji={match.awayFlag} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: dark ? '#fff' : '#111', textTransform: 'uppercase', lineHeight: 1.2 }}>{match.away}</span>
        </div>
        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{match.venue}</div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
        {match.group && (
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: tweaks.roundedCards ? 999 : 2, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', letterSpacing: 1 }}>Gr. {match.group}</span>
        )}
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: tweaks.roundedCards ? 999 : 2, background: typeColor + '22', color: typeColor, letterSpacing: 0.5, textTransform: 'uppercase' }}>{match.type}</span>
      </div>
    </div>
  );
}

Object.assign(window, { WCCalendarPage });