// ============================================================
//  NÁŠ SVET: texty spomienok. Tento súbor môžeš voľne upravovať.
//
//  title / place / when / text  ... čo sa ukáže na kartičke
//  photos: ['photos/tatry-1.jpg', ...]  ... fotky ulož do priečinka photos/
//  Pesnička: ulož súbor ako music/<id>.mp3 (napr. music/tatry.mp3) a zahrá sa
//            namiesto vstavanej melódie. Pre mapu je to music/mapa.mp3.
// ============================================================

export const NICKS = ['cukrík', 'princezná', 'magdubaby', 'hruštička'];

export const MOMENTS = [
  {
    id: 'stanica', island: 'kosice', emoji: '🚆',
    title: 'Otázka na stanici', place: 'Košice, hlavná stanica', when: 'zima',
    text: 'Lúčili sme sa na stanici, vonku mrholilo a ty si už nastupovala do vlaku. Vtedy som sa ťa konečne opýtal, či by si mala budúcu sobotu čas. Som rád, že som to stihol, kým sa zavreli dvere.',
    photos: [],
  },
  {
    id: 'ruze', island: 'kosice', emoji: '🌹',
    title: 'Sedem červených ruží', place: 'Košice, pred stanicou', when: 'o týždeň neskôr',
    text: 'O týždeň som ťa čakal pred stanicou so siedmimi červenými ružami. Bol som strašne nervózny. Pamätám si, ako si prišla v krémovom kabáte a usmiala sa na mňa.',
    photos: [],
  },
  {
    id: 'bombonik', island: 'kosice', emoji: '🥞',
    title: 'Prvé rande v Bomboniku', place: 'Čokoladéria Bombónik, Košice', when: 'naše prvé rande',
    text: 'Naše prvé rande bolo v Bomboniku. Dali sme si palacinky a rozprávali sa tak dlho, že som úplne zabudol na čas. Už vtedy som vedel, že ťa chcem vidieť znova.',
    photos: [],
  },
  {
    id: 'tatry', island: 'tatry', emoji: '⛄',
    title: 'Snehuliak Sigma', place: 'Popradské pleso, Vysoké Tatry', when: 'zima',
    text: 'Vyšli sme na Popradské pleso a zo snehu sme postavili snehuliaka. Dali sme mu takú brutálnu čeľusť, že dostal meno Sigma. Ešte teraz sa smejem, keď si na neho spomeniem.',
    photos: [],
  },
  {
    id: 'motokary', island: 'kosice', emoji: '🏎️',
    title: 'Valentín na motokárach', place: 'Motokáry', when: 'náš prvý Valentín',
    text: 'Náš prvý Valentín sme začali na motokárach, lebo my dvaja nevieme robiť veci normálne. Večer som ti dal náramok s dvoma srdiečkami a bol som šťastný, že sa ti páčil.',
    photos: [],
  },
  {
    id: 'korcule', island: 'kosice', emoji: '🛼',
    title: 'Paťo Čonka', place: 'Na kolieskových korčuliach', when: 'jar',
    text: 'Na jar sme boli na kolieskových korčuliach. Asi trinásťročného chalana sme presviedčali, že Paťo Čonka je raper a má dnes vystúpenie. Pozrel sa na nás a povedal len: nie, ďakujem.',
    photos: [],
  },
  {
    id: 'narodky', island: 'kosice', emoji: '🎂',
    title: 'Tvoje narodeniny', place: 'Minigolf a sushi', when: '14. apríl',
    text: 'Tvoje narodeniny sme oslávili na minigolfe. Dal som ti hodinky Guess a potom sme išli na sushi, ktoré bolo fakt úžasné. Bol to krásny deň a som rád, že som ho mohol stráviť s tebou.',
    photos: [],
  },
  {
    id: 'tokaj', island: 'tokaj', emoji: '🍹',
    title: 'Bobová dráha a Grand Bar', place: 'Grand Bar Tokaj', when: 'leto',
    text: 'V lete sme boli na bobovej dráhe a potom sme si sadli na drink do Grand Baru Tokaj. Obyčajný letný deň, ale s tebou bol jeden z tých, na ktoré rád spomínam.',
    photos: [],
  },
  {
    id: 'polignano', island: 'polignano', emoji: '🇮🇹',
    title: 'Polignano a Mare', place: 'Apúlia, Taliansko', when: 'leto',
    text: 'Polignano a Mare, mesto postavené na útesoch nad morom. Chodili sme po uličkách, kúpali sa pod mostom a ty si mala oranžový klobúčik s kvietkami. Tá dovolenka bola ako sen.',
    photos: [],
  },
  {
    id: 'jaskyne', island: 'polignano', emoji: '⛵',
    title: 'Loďkou do jaskýň', place: 'Polignano a Mare', when: 'leto',
    text: 'Vzali sme si loďku a plavili sa popri útesoch až do jaskýň. Voda tam bola neskutočne modrá. Ty si fotila jaskyne a ja som sa väčšinu času pozeral na teba.',
    photos: [],
  },
  {
    id: 'stuzkova', island: 'kosice', emoji: '💃',
    title: 'Stužková', place: 'Dom umenia, Košice', when: '',
    text: 'Stužková v Dome umenia. Ty si mala sivé trblietavé šaty, ja sivý oblek a pretancovali sme skoro celú noc. Bola si tam najkrajšia a bol som hrdý, že si tam so mnou.',
    photos: [],
  },
  {
    id: 'gelnica', island: 'gelnica', emoji: '⛸️',
    title: 'Korčuľovanie v Gelnici', place: 'Zimný štadión, Gelnica', when: 'zima',
    text: 'Verejné korčuľovanie na štadióne v Gelnici. Bola zima, ty si mala bielu čiapku a sivý šál a držali sme sa za ruky, aby sme nespadli. Teda aspoň tak sme to tvrdili.',
    photos: [],
  },
  {
    id: 'budapest', island: 'budapest', emoji: '🏛️',
    title: 'Valentín v Budapešti', place: 'Parlament, Budapešť', when: 'náš druhý Valentín',
    text: 'Na druhého Valentína sme išli do Budapešti. Stáli sme pred parlamentom, bola poriadna zima, ale mne to bolo jedno, lebo som tam bol s tebou.',
    photos: [],
  },
  {
    id: 'jazz', island: 'budapest', emoji: '🎷',
    title: 'Jazz club a prsteň', place: 'Jazz club, Budapešť', when: 'valentínsky večer',
    text: 'Večer sme sedeli v jazz clube a okolo nás hrala živá hudba. Dal som ti prsteň s dvoma srdiečkami. Mala si čierne šaty a ja som si kvôli tebe dal ružovú kravatu.',
    photos: [],
  },
  {
    id: 'praha', island: 'praha', emoji: '🌉',
    title: 'Praha', place: 'Hrad, ZOO, Karlov most, Sapa', when: 'začiatok leta',
    text: 'Začiatkom leta sme boli v Prahe. Stihli sme hrad, zoo, minigolf aj Karlov most. A na Sape vznikla fotka, kde držím veľkého čierneho plyšáka, ktorého sme si domov radšej nekúpili. S tebou je sranda všade.',
    photos: [],
  },
  {
    id: 'holandsko', island: 'holandsko', emoji: '🌷',
    title: 'Leto v Holandsku', place: 'Holandsko', when: 'celé leto',
    text: 'Celé leto sme pracovali v Holandsku v skleníku s kvetmi. Každé ráno sme išli do roboty na bicykloch a vo voľné dni sme chodili na výlety do Arnhemu a Nijmegenu. Bolo to náročné, ale s tebou to bolo krásne leto.',
    photos: [],
  },
  {
    id: 'alghero', island: 'sardinia', emoji: '🏖️',
    title: 'Alghero', place: 'Sardínia', when: 'začiatok septembra',
    text: 'Začiatkom septembra sme boli na Sardínii v Alghere. More bolo krásne modré a my sme hrali plážový tenis na pláži aj priamo vo vode. Nasmiali sme sa pri tom viac, než sme trafili loptičku.',
    photos: [],
  },
  {
    id: 'lod', island: 'sardinia', emoji: '🛥️',
    title: 'Loď iba pre nás', place: 'Sardínia', when: 'september',
    text: 'Na celý deň sme si prenajali loď iba pre seba. Plavili sme sa popri útesoch, plávali v nádhernom mori a ležali na palube. Bol to jeden z najkrajších dní, aké som zažil.',
    photos: [],
  },
];

// Tajný list. Odomkne sa, keď nájde všetky srdiečka.
export const LETTER = {
  title: 'Šťastné a veselé Vianoce, magdudarček',
  body: [
    'Verím, že sa ti páčil aspoň tak, ako sa ty páčiš mne.',
    'A verím, že do tohto sveta plného krásnych spomienok pribudne ešte nespočetné množstvo ďalších a ešte krajších.',
    'Teším sa na to, čo nás čaká.',
    'Ľúbkam ťa najviac, mua.',
  ],
  sign: 'Tvoj Dominik'
};
