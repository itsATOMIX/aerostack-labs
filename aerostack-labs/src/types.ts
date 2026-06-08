export interface DecodedMetar {
  icao: string;
  name: string;
  raw: string;
  category: "VFR" | "MVFR" | "IFR" | "LIFR";
  categoryColor: string;
  wind: {
    direction: number;
    speedKt: number;
    gustsKt?: number;
    status: string;
  };
  visibility: string;
  clouds: string[];
  tempDew: string;
  qnh: number;
  hazards: string[];
  briefing: string;
}

export interface Flashcard {
  id: string;
  category: "Météorologie" | "Aérodynamique" | "Navigation" | "Règlementation";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
}
