const { useState, useEffect, useCallback } = React;

// ============================================================
// DATA — 48 teams, celebrity/star player + jersey info
// ============================================================
const UNIFORMS_DATA = [
  // Grupo A: México · Sudáfrica · Rep. de Corea · Rep. Checa
  { id: 'mexico',        group: 'A', brand: 'Adidas',  jerseyImg: 'assets/ChatGPT Image 17 may 2026, 13_50_34.png',  celebName: 'Javier Hernández',   role: 'Delantero · LA Galaxy',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Hertha_BSC_vs._West_Ham_United_20190731_%28139%29.jpg' },
  { id: 'southafrica',   group: 'A', brand: 'Nike',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 13_53_52.png',  teamName: 'Sudáfrica',   teamFlag: '🇿🇦', teamCode: 'RSA', celebName: 'Percy Tau',          role: 'Extremo · Al-Ahly',           celebImg: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Percy_Tau_2019.jpg' },
  { id: 'southkorea',    group: 'A', brand: 'Nike',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 13_55_34.png',  teamName: 'Rep. de Corea', teamFlag: '🇰🇷', teamCode: 'KOR', celebName: 'Son Heung-min',      role: 'Delantero · Tottenham',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/960px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg' },
  { id: 'czechrepublic', group: 'A', brand: 'Puma',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 14_00_56.png',  teamName: 'Rep. Checa',  teamFlag: '🇨🇿', teamCode: 'CZE', celebName: 'Patrik Schick',      role: 'Delantero · Leverkusen',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UEFA_EURO_2020_-_Group_D_-_Czech_Republic_v_England_-_Patrik_Schick_%28cropped%29.jpg/640px-UEFA_EURO_2020_-_Group_D_-_Czech_Republic_v_England_-_Patrik_Schick_%28cropped%29.jpg' },
  // Grupo B: Canadá · Bosnia y Herz. · Catar · Suiza
  { id: 'canada',        group: 'B', brand: 'Nike',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 18_20_27.png',  celebName: 'Alphonso Davies',    role: 'Lateral · Bayern Munich',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Alphonso_Davies_in_2022.jpg' },
  { id: 'bosnia',        group: 'B', brand: 'Macron',  jerseyImg: 'assets/ChatGPT Image 17 may 2026, 18_25_32.png',  teamName: 'Bosnia y Herz.', teamFlag: '🇧🇦', teamCode: 'BIH', celebName: 'Edin Džeko',         role: 'Delantero · Leyenda',         celebImg: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Edin_D%C5%BEeko_%28cropped%29.jpg' },
  { id: 'qatar',         group: 'B', brand: 'Nike',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 14_02_33.png',  celebName: 'Almoez Ali',         role: 'Delantero · Al-Duhail',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Moez_Ali_at_Qatar_v_Japan_%E2%80%93_AFC_Asian_Cup_2019_final_32_%282%29.jpg' },
  { id: 'switzerland',   group: 'B', brand: 'Puma',    jerseyImg: 'assets/ChatGPT Image 17 may 2026, 14_04_27.png',  celebName: 'Xherdan Shaqiri',    role: 'Extremo · Chicago Fire',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Xherdan_Shaqiri_2018.jpg' },
  // Grupo C: Brasil · Marruecos · Haití · Escocia
  { id: 'brazil',        group: 'C', brand: 'Nike',    jerseyImg: 'assets/uniforme brasil.webp',                        celebName: 'Vinicius Jr.',       role: 'Extremo · Real Madrid',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg' },
  { id: 'morocco',       group: 'C', brand: 'Puma',    jerseyImg: 'assets/uniforme marruecos.webp',                        celebName: 'Achraf Hakimi',      role: 'Lateral · PSG',               celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Achraf_Hakimi_%28cropped%29.jpg/960px-Achraf_Hakimi_%28cropped%29.jpg' },
  { id: 'haiti',         group: 'C', brand: 'Nike',    jerseyImg: 'assets/uniforme haiti.webp',                        celebName: 'Duckens Nazon',      role: 'Delantero · Sint-Truiden',    celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Haiti_v_Trinidad_and_Tobago_2019-06-25_%2808%29_%28Duckens_Nazon%29.jpg/640px-Haiti_v_Trinidad_and_Tobago_2019-06-25_%2808%29_%28Duckens_Nazon%29.jpg' },
  { id: 'scotland',      group: 'C', brand: 'Adidas',  jerseyImg: 'assets/uniforme escocia.webp',                      celebName: 'Scott McTominay',    role: 'Mediocampista · Napoli',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Manchester_United_v_Liverpool%2C_22_August_2022_%2821%29_%28Scott_McTominay%29.jpg' },
  // Grupo D: Estados Unidos · Paraguay · Australia · Turquía
  { id: 'usa',           group: 'D', brand: 'Nike',    jerseyImg: 'assets/uniforme usa.webp',                        celebName: 'Christian Pulisic',  role: 'Extremo · AC Milan',          celebImg: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Christian_Pulisic_USMNT_v_Belgium_Mar_28_2026-73_%28cropped%29.jpg' },
  { id: 'paraguay',      group: 'D', brand: 'Umbro',   jerseyImg: 'assets/uniforme paraguay.webp',                  celebName: 'Miguel Almirón',     role: 'Mediocampista · Newcastle', celebImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Miguel_Almir%C3%B3n_Red_Bull_Atlanta_5.31.25-069_%28cropped%29.jpg/960px-Miguel_Almir%C3%B3n_Red_Bull_Atlanta_5.31.25-069_%28cropped%29.jpg' },
  { id: 'australia',     group: 'D', brand: 'Nike',    jerseyImg: 'assets/uniforme australia.webp',                        celebName: 'Aaron Mooy',         role: 'Mediocampista · Celtic',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/20180601_FIFA_Friendly_Match_Czech_Republic_vs._Australia_Aaron_Mooy_850_0283.jpg/960px-20180601_FIFA_Friendly_Match_Czech_Republic_vs._Australia_Aaron_Mooy_850_0283.jpg' },
  { id: 'turkey',        group: 'D', brand: 'Nike',    jerseyImg: 'assets/uniforme turquia.webp',                      celebName: 'Hakan Çalhanoğlu',   role: 'Mediocampista · Inter Milan', celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/AUT_vs._TUR_2016-03-29_%28342%29.jpg/960px-AUT_vs._TUR_2016-03-29_%28342%29.jpg' },
  // Grupo E: Alemania · Curazao · Costa de Marfil · Ecuador
  { id: 'germany',       group: 'E', brand: 'Adidas',  jerseyImg: 'assets/seleccion-de.webp',                        celebName: 'Thomas Müller',      role: 'Delantero · Bayern Munich',   celebImg: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_19.jpg' },
  { id: 'ecuador',       group: 'E', brand: 'Marathon', jerseyImg: 'assets/seleccion-ec.webp',                       celebName: 'Enner Valencia',     role: 'Delantero · Internacional',   celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Enner_Valencia_CONTINUACI%C3%93N_DE_LA_SESI%C3%93N_N.%C2%BA_056_DEL_PLENO_DE_LA_ASAMBLEA_NACIONAL._ECUADOR%2C_09_DE_DICIEMBRE_DE_2025_%28cropped%29.jpg/960px-Enner_Valencia_CONTINUACI%C3%93N_DE_LA_SESI%C3%93N_N.%C2%BA_056_DEL_PLENO_DE_LA_ASAMBLEA_NACIONAL._ECUADOR%2C_09_DE_DICIEMBRE_DE_2025_%28cropped%29.jpg' },
  // Grupo F: Países Bajos · Japón · Suecia · Túnez
  { id: 'netherlands',   group: 'F', brand: 'Nike',    jerseyImg: 'assets/seleccion-nl.webp',                        celebName: 'Virgil van Dijk',    role: 'Defensa · Liverpool',         celebImg: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg' },
  { id: 'japan',         group: 'F', brand: 'Adidas',  jerseyImg: 'assets/seleccion-jp.webp',                        celebName: 'Takumi Minamino',    role: 'Mediocampista · Monaco',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Minamino_asse_asm_2425.png' },
  { id: 'sweden',        group: 'F', brand: 'Adidas',  jerseyImg: 'assets/seleccion-se.webp',                        celebName: 'Zlatan Ibrahimović', role: 'Delantero · Leyenda',          celebImg: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Zlatan_Ibrahimovi%C4%87_June_2018.jpg' },
  { id: 'tunisia',       group: 'F', brand: 'Kappa',                                                                 celebName: 'Wahbi Khazri',       role: 'Delantero · Montpellier',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Wahbi_Khazri.jpg' },
  // Grupo G: Bélgica · Egipto · RI de Irán · Nueva Zelanda
  { id: 'belgium',       group: 'G', brand: 'Adidas',  jerseyImg: 'assets/seleccion-be.webp',                        celebName: 'Kevin De Bruyne',    role: 'Mediocampista · Man. City',   celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/960px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg' },
  { id: 'egypt',         group: 'G', brand: 'Nike',                                                                  celebName: 'Mohamed Salah',      role: 'Extremo · Liverpool',         celebImg: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mohamed_Salah_2018.jpg' },
  { id: 'iran',          group: 'G', brand: 'Meyba',                                                                 celebName: 'Mehdi Taremi',       role: 'Delantero · Inter Milan',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Iran_-_Japan%2C_AFC_Asian_Cup_2019_42_%28cropped%29.jpg' },
  { id: 'newzealand',    group: 'G', brand: 'Nike',    jerseyImg: 'assets/seleccion-zl.webp',                        celebName: 'Chris Wood',         role: 'Delantero · Nottm Forest',    celebImg: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/New_Zealand-Portugal_%28155_%28cropped%29.jpg' },
  // Grupo H: España · Cabo Verde · Arabia Saudí · Uruguay
  { id: 'spain',         group: 'H', brand: 'Adidas',  jerseyImg: 'assets/seleccion-es.webp',                        celebName: 'Lamine Yamal',       role: 'Extremo · FC Barcelona',      celebImg: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Lamine_Yamal_in_2025.jpg' },
  { id: 'saudiarabia',   group: 'H', brand: 'Adidas',  jerseyImg: 'assets/seleccion-sa.webp',                        celebName: 'Salem Al-Dawsari',   role: 'Extremo · Al-Hilal',          celebImg: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Salem_Al-Dawsari_2018.jpg' },
  { id: 'uruguay',       group: 'H', brand: 'Puma',    jerseyImg: 'assets/seleccion-ur.webp',                        celebName: 'Luis Suárez',        role: 'Delantero · River Plate',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Luis_Su%C3%A1rez_2026_%28cropped%29.jpg' },
  // Grupo I: Francia · Senegal · Irak · Noruega
  { id: 'france',        group: 'I', brand: 'Nike',    jerseyImg: 'assets/seleccion-fr.webp',                        celebName: 'Kylian Mbappé',      role: 'Delantero · Real Madrid',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg' },
  { id: 'senegal',       group: 'I', brand: 'Puma',    jerseyImg: 'assets/seleccion-sn.webp',                        celebName: 'Sadio Mané',         role: 'Extremo · Al-Nassr',          celebImg: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Sadio_Mane_Al-Nassr.jpg' },
  { id: 'norway',        group: 'I', brand: 'Nike',    jerseyImg: 'assets/seleccion-no.webp',                        celebName: 'Erling Haaland',     role: 'Delantero · Man. City',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Erling_Haaland_June_2025.jpg/960px-Erling_Haaland_June_2025.jpg' },
  // Grupo J: Argentina · Argelia · Austria · Jordania
  { id: 'argentina',     group: 'J', brand: 'Adidas',  jerseyImg: 'assets/seleccion-ar.webp',                        celebName: 'Lionel Messi',       role: 'Delantero · Inter Miami',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg' },
  { id: 'algeria',       group: 'J', brand: 'Puma',                                                                  celebName: 'Riyad Mahrez',       role: 'Extremo · Al-Ahli',           celebImg: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mahrez_2021.jpg' },
  { id: 'austria',       group: 'J', brand: 'Puma',                                                                  celebName: 'David Alaba',        role: 'Defensa · Real Madrid',       celebImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg/960px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg' },
  // Grupo K: Portugal · RD Congo · Uzbekistán · Colombia
  { id: 'portugal',      group: 'K', brand: 'Nike',    jerseyImg: 'assets/seleccion-pt.webp',                        celebName: 'Cristiano Ronaldo',  role: 'Delantero · Al-Nassr',        celebImg: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg' },
  { id: 'colombia',      group: 'K', brand: 'Adidas',  jerseyImg: 'assets/seleccion-co.webp',                        celebName: 'Luis Díaz',          role: 'Extremo · Liverpool',         celebImg: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg' },
  // Grupo L: Inglaterra · Croacia · Ghana · Panamá
  { id: 'england',       group: 'L', brand: 'Nike',    jerseyImg: 'assets/seleccion-en.webp',                        celebName: 'Jude Bellingham',    role: 'Mediocampista · Real Madrid', celebImg: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg' },
  { id: 'croatia',       group: 'L', brand: 'Nike',    jerseyImg: 'assets/seleccion-hr.webp',                        celebName: 'Luka Modrić',        role: 'Mediocampista · Real Madrid', celebImg: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Ofrenda_de_la_Liga_y_la_Champions-57-L.Mill%C3%A1n_%2852109310843%29_%28Luka_Modri%C4%87%29.jpg' },
  { id: 'ghana',         group: 'L', brand: 'Nike',    jerseyImg: 'assets/seleccion-gh.webp',                        celebName: 'Thomas Partey',      role: 'Mediocampista · Arsenal',     celebImg: 'https://upload.wikimedia.org/wikipedia/commons/4/42/ATL-Madrid-Lokomotiv001-Thomas_%28cropped%29.jpg' },
];

// Gradient palette per brand for fallback cards
const BRAND_COLORS = {
  'Nike':          { a: '#111', b: '#333' },
  'Adidas':        { a: '#1a1a2e', b: '#16213e' },
  'Puma':          { a: '#1a0a0a', b: '#2d1515' },
  'Hummel':        { a: '#0a1a2e', b: '#0f2944' },
  'New Balance':   { a: '#0d0d1a', b: '#1a1a33' },
  'Umbro':         { a: '#001a0d', b: '#003319' },
  'Marathon':      { a: '#0d0d00', b: '#1a1a00' },
  'Meyba':         { a: '#1a001a', b: '#2d002d' },
  'Castore':       { a: '#00001a', b: '#00002d' },
  'Kappa':         { a: '#1a001a', b: '#330033' },
  'One All Sports':{ a: '#001a00', b: '#003300' },
};

// ============================================================
// UNIFORM CARD
// ============================================================
function UniformCard({ team, uniformData, tweaks }) {
  const [hover, setHover] = useState(false);
  const radius = tweaks.roundedCards ? 16 : 0;
  const ud = uniformData || {};
  const gradColors = BRAND_COLORS[ud.brand] || { a: '#1a1a2e', b: '#16213e' };

  return (
    <div
      className="wc-gallery-card"
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        cursor: 'pointer',
        height: 'clamp(220px, 26vw, 320px)',
        background: `linear-gradient(145deg, ${gradColors.a}, ${gradColors.b})`,
        transform: hover ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hover ? '0 16px 40px rgba(0,0,0,0.35)' : '0 2px 12px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Flag watermark */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 72, opacity: 0.08, pointerEvents: 'none', userSelect: 'none',
      }}>
        {team?.flag || '⚽'}
      </div>

      {/* Jersey image */}
      {(ud.jerseyImg || team?.image) && (
        <img
          src={ud.jerseyImg || team.image}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            transition: 'transform 0.3s ease',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}

// ============================================================
// UNIFORMS PAGE
// ============================================================
function WCUniformsPage({ tweaks, onBack }) {
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [search, setSearch] = useState('');
  const dark = tweaks.darkMode;
  const bg = dark ? '#0A0A12' : '#FAFAFA';
  const fg = dark ? '#fff' : '#111';
  const fgMuted = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
  const radius = tweaks.roundedCards ? 12 : 0;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const teamById = Object.fromEntries(ALL_TEAMS.map(t => [t.id, t]));

  const groups = ['all', ...Array.from(new Set(UNIFORMS_DATA.map(u => u.group))).sort()];
  const brands = ['all', ...Array.from(new Set(UNIFORMS_DATA.map(u => u.brand).filter(Boolean))).sort()];

  const filtered = UNIFORMS_DATA.filter(ud => {
    if (activeGroup !== 'all' && ud.group !== activeGroup) return false;
    if (activeBrand !== 'all' && ud.brand !== activeBrand) return false;
    if (search) {
      const team = teamById[ud.id];
      const q = search.toLowerCase();
      return (
        (team?.name || ud.teamName || ud.id).toLowerCase().includes(q) ||
        (team?.code || ud.teamCode || ud.id).toLowerCase().includes(q) ||
        (ud.celebName || '').toLowerCase().includes(q) ||
        (ud.brand || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', height: 'clamp(220px, 30vh, 320px)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'linear-gradient(145deg, #0A0F2E 0%, #1A0A1A 50%, #0A0A12 100%)',
      }}>
        {/* Background image */}
        <img src="assets/ChatGPT Image 17 may 2026, 13_50_34.png" alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Back button */}
        <button onClick={onBack} className="wc-back-btn" style={{
          position: 'absolute', top: 80, left: 'clamp(20px, 4vw, 48px)', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: tweaks.roundedCards ? 999 : 4, padding: '10px 20px',
          color: '#fff', cursor: 'pointer', fontFamily: "'Barlow', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
          backdropFilter: 'blur(8px)', transition: 'all 0.25s ease',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Volver
        </button>

        <div style={{ position: 'relative', zIndex: 5, padding: '0 clamp(20px, 4vw, 48px) clamp(24px, 3vw, 36px)' }}>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
            Catálogo Oficial · 48 Selecciones
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(42px, 9vw, 80px)', color: '#fff', margin: 0,
            textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: -1,
          }}>
            Uniformes<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Mundial 2026</span>
          </h1>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: dark ? 'rgba(10,10,18,0.92)' : 'rgba(250,250,250,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        padding: '10px clamp(20px, 4vw, 48px)',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {/* Row 1: Group tabs + search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
            {groups.map(g => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13,
                  textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer',
                  padding: '6px 14px', border: 'none',
                  borderRadius: tweaks.roundedCards ? 999 : 4,
                  background: activeGroup === g
                    ? (tweaks.accentColor || '#00C4B3')
                    : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                  color: activeGroup === g ? '#fff' : fgMuted,
                  transition: 'all 0.2s ease',
                }}
              >
                {g === 'all' ? 'Todos' : `Gr. ${g}`}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Buscar país, marca o jugador..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 500,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              borderRadius: tweaks.roundedCards ? 999 : 4,
              padding: '8px 16px', color: fg, outline: 'none',
              width: 'clamp(160px, 20vw, 260px)',
            }}
          />
        </div>
        {/* Row 2: Brand filter */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {brands.map(b => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              style={{
                fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: 0.8, cursor: 'pointer',
                padding: '4px 12px', border: 'none',
                borderRadius: tweaks.roundedCards ? 999 : 4,
                background: activeBrand === b
                  ? (tweaks.accentColor || '#00C4B3')
                  : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                color: activeBrand === b ? '#fff' : fgMuted,
                transition: 'all 0.2s ease',
              }}
            >
              {b === 'all' ? 'Todas las marcas' : b}
            </button>
          ))}
        </div>
      </section>

      {/* ===== COUNT ===== */}
      <div style={{ padding: 'clamp(16px, 2vw, 24px) clamp(20px, 4vw, 48px) 0' }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, color: fgMuted, textTransform: 'uppercase', letterSpacing: 2 }}>
          {filtered.length} {filtered.length === 1 ? 'uniforme' : 'uniformes'}
        </span>
      </div>

      {/* ===== GRID ===== */}
      <section style={{ padding: 'clamp(16px, 2vw, 24px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(160px, 18vw, 220px), 1fr))',
          gap: 'clamp(10px, 1.5vw, 16px)',
        }}>
          {filtered.map(ud => {
            const team = teamById[ud.id] || {
              id: ud.id, name: ud.teamName || ud.id,
              code: ud.teamCode || ud.id.toUpperCase().slice(0, 3),
              flag: ud.teamFlag || '⚽', image: '',
              gradient: 'linear-gradient(145deg, #1a1a2e, #16213e)',
            };
            return (
              <UniformCard key={ud.id} team={team} uniformData={ud} tweaks={tweaks} />
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: fgMuted, fontFamily: "'Barlow', sans-serif", fontSize: 14 }}>
            No hay resultados para "{search}"
          </div>
        )}
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)', textAlign: 'center' }}>
        <button onClick={onBack} style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: dark ? '#fff' : '#111', background: 'none',
          border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: tweaks.roundedCards ? 999 : 4,
          padding: '14px 36px', cursor: 'pointer', transition: 'all 0.25s ease',
        }}>
          Ver todas las secciones
        </button>
      </section>
    </div>
  );
}

Object.assign(window, { WCUniformsPage });
