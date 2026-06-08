import { DecodedMetar, Flashcard } from "./types";

export const SAMPLE_METARS: Record<string, DecodedMetar> = {
  LFKC: {
    icao: "LFKC",
    name: "Calvi - Sainte-Catherine (Corse)",
    raw: "LFKC 071830Z 24022G38KT 180V280 9999 FEW030 SCT045 22/11 Q1013 NOSIG",
    category: "VFR",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    wind: {
      direction: 240,
      speedKt: 22,
      gustsKt: 38,
      status: "Vent fort de secteur Ouest-Sud-Ouest soufflant de la vallée."
    },
    visibility: "> 10 km (Excellente)",
    clouds: ["Quelques nuages (FEW) à 3000 ft", "Nuages épars (SCT) à 4500 ft"],
    tempDew: "Température : 22°C - Point de rosée : 11°C (Air relativement sec)",
    qnh: 1013,
    hazards: [
      "⚠️ Cisaillement de vent sévère en approche finale piste 36 dû au relief environnant.",
      "⚠️ Rafales à la limite supérieure pour les monomoteurs légers (type DR400 / C152 / C172).",
      "⚠️ Turbulence marquée sous le vent du Monte Cinto."
    ],
    briefing: "Météo compatible VFR, mais requiert une attention extrême. Les vents violents du 240 génèrent d'importants rotors au-dessus des collines bordant la vallée du Fango. Privilégier une approche piste 18 si les performances de vent arrière le permettent ou coordonner avec Ajaccio contrôle de possibles déroutements."
  },
  LFMN: {
    icao: "LFMN",
    name: "Nice - Côte d'Azur",
    raw: "LFMN 071830Z 09008KT 4500 BR BKN008 OVC012 14/13 Q1009 TEMPO 1500 DZ OVC004",
    category: "MVFR",
    categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    wind: {
      direction: 90,
      speedKt: 8,
      status: "Brise de mer modérée et stable."
    },
    visibility: "4500 m par brume côtière (BR)",
    clouds: ["Fragmenté (BKN) à 800 ft", "Soudé (OVC) à 1200 ft"],
    tempDew: "Température : 14°C - Point de rosée : 13°C (Taux d'humidité extrême, risque de sédimentation)",
    qnh: 1009,
    hazards: [
      "⚠️ Plafond bas (800 ft) sous l'altitude minimale de secteur pour les vols locaux.",
      "⚠️ Risque de détérioration rapide vers des conditions IFR par entrée maritime humide.",
      "⚠️ Risque de givrage carburateur modéré au régime de descente."
    ],
    briefing: "Conditions marginales pour le VFR (MVFR) à Nice aujourd’hui. La visibilité chute et le plafond est bas à 800 ft. Vol d’entraînement local déconseillé. Les arrivées IFR sont stabilisées mais surveillez l’évolution temporaire (TEMPO) annonçant de la bruine légère (DZ) descendue à 400 ft, bloquant l’accès aux approches VFR guidées."
  },
  LFBO: {
    icao: "LFBO",
    name: "Toulouse - Blagnac",
    raw: "LFBO 071830Z 31012KT 9999 CAVOK 19/08 Q1021 NOSIG",
    category: "VFR",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    wind: {
      direction: 310,
      speedKt: 12,
      status: "Vent modéré du Nord-Ouest (canalisation de la Garonne)."
    },
    visibility: "Supérieure à 10 km (CAVOK - Plafond et visibilité OK)",
    clouds: ["Pas de nuages significatifs sous 5000 ft et pas de CB (CAVOK)"],
    tempDew: "Température : 19°C - Point de rosée : 8°C (Humidité relative de 49%)",
    qnh: 1021,
    hazards: [],
    briefing: "Excellentes conditions de vol de cockpit. Visibilité illimitée, ciel dégagé, vent modéré et stable aligné avec les pistes 32L/32R. Idéal pour des tours de piste de nuit, des exercices d'encadrement en vol moteur, ou une navigation d'intégration VFR vers le Massif Central."
  },
  LFPG: {
    icao: "LFPG",
    name: "Paris - Roissy Charles de Gaulle",
    raw: "LFPG 071830Z 20018G25KT 3000 RA BR OVC005 11/11 Q0998 BECMG 9999 NSW BKN015",
    category: "IFR",
    categoryColor: "text-red-400 bg-red-500/10 border-red-500/20",
    wind: {
      direction: 200,
      speedKt: 18,
      gustsKt: 25,
      status: "Vent de travers fort et cisaillant avec de fréquentes rafales."
    },
    visibility: "3000 m sous pluie modérée (RA) et brume (BR)",
    clouds: ["Soudé (OVC) à 500 ft (Hors limites VFR minimales)"],
    tempDew: "Température : 11°C - Point de rosée : 11°C (Saturation totale de l'air - Brouillard imminent)",
    qnh: 998,
    hazards: [
      "⚠️ Plafond bas critique à 500 pieds (IFR obligatoire).",
      "⚠️ Dépression barométrique marquée (998 hPa) générant une vitesse vraie accrue.",
      "⚠️ Pistes mouillées entraînant une diminution des coefficients de friction au freinage.",
      "⚠️ Risque sévère de turbulence de sillage et de cisaillement en basse couche."
    ],
    briefing: "Conditions strictement IFR. Pour le VFR, le vol est formellement interdit en zone de contrôle. Pour l'IFR, les de-icers et les radars d'approche de Roissy régulent un fort trafic. Le décodeur IA vous alerte de l'imminence d'un passage en brouillard dense en raison de l'écart nul de température/point de rosée (11°/11°) combiné à la pluie."
  }
};

export const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: "card_1",
    category: "Météorologie",
    difficulty: "Moyen",
    question: "Quelle condition atmosphérique est propice au développement de brouillards de rayonnement ?",
    options: [
      "Un ciel couvert, un vent fort et une forte dépression.",
      "Un ciel dégagé, un vent nul ou très faible (< 5 kt) et une humidité élevée.",
      "Le passage d'un front chaud accompagné de vents violents en altitude.",
      "Un anticyclone d'altitude avec des rafales de secteur Nord."
    ],
    correctIndex: 1,
    explanation: "Le brouillard de rayonnement se forme la nuit par refroidissement du sol irradiant sa chaleur vers l'espace. Un ciel dégagé favorise ce rayonnement, tandis qu'un vent nul ou très faible limite le mélange turbulent mais maintient l'air humide au contact du sol froid."
  },
  {
    id: "card_2",
    category: "Aérodynamique",
    difficulty: "Difficile",
    question: "Durant un virage à inclinaison constante et en palier, le facteur de charge (n)...",
    options: [
      "Reste égal à 1 G, car l'altitude ne varie pas.",
      "Diminue, car la portance efficace est redirigée vers le bas.",
      "Augmente proportionnellement à l'inverse du cosinus de l'angle d'inclinaison.",
      "Est maximal lorsque l'avion vole face au vent."
    ],
    correctIndex: 2,
    explanation: "Pour maintenir le palier en virage, la portance de l'aile doit augmenter pour compenser le poids et fournir la force centripète. Le facteur de charge vaut n = 1 / cos(inclinaison). À 60° d'inclinaison, l'avion subit exactement 2 G."
  },
  {
    id: "card_3",
    category: "Navigation",
    difficulty: "Facile",
    question: "Au calage altimétrique QNH, que mesure et affiche l'altimètre de bord d'un aéronef ?",
    options: [
      "La hauteur par rapport au sol de l'aérodrome (altitude-sol).",
      "L'altitude de l'aéronef par rapport au niveau moyen de la mer (AMSL).",
      "L'altitude-pression par rapport à l'isobare standard 1013,25 hPa.",
      "L'épaisseur de la couche atmosphérique standard d'inversion thermique."
    ],
    correctIndex: 1,
    explanation: "Le QNH est la pression atmosphérique ramenée au niveau de la mer selon l'atmosphère standard. Calé au QNH, l'altimètre indique l'altitude au-dessus du niveau de la mer (AMSL). Utile pour franchir les obstacles du relief d'une carte aéronautique."
  },
  {
    id: "card_4",
    category: "Règlementation",
    difficulty: "Moyen",
    question: "En espace aérien non contrôlé de classe G sous le niveau FL100, quelles sont les conditions minimales de visibilité pour un vol VFR classique ?",
    options: [
      "1500 mètres de visibilité, hors des nuages et en vue du sol.",
      "5 km de visibilité, espacement de 1,5 km horizontalement des nuages.",
      "8 km de visibilité avec un plafond jamais inférieur à 1500 pieds.",
      "Il n'y a aucune visibilité minimale requise du moment que le GPS fonctionne."
    ],
    correctIndex: 0,
    explanation: "En classe G sous le FL100 (ou sous 3000 ft AMSL), les aéronefs volant en régime VFR à vitesse modérée doivent disposer d'une visibilité minimale de 1500 mètres (ou 5 km si au-dessus d'une certaine vitesse), rester hors des nuages et garder la vue continue de la surface."
  }
];
