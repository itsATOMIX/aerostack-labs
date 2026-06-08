import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wind, Eye, CloudRain, ShieldAlert, BookOpen, Compass, Download, Zap, RefreshCw, Layers } from "lucide-react";
import { SAMPLE_METARS } from "../data";
import { DecodedMetar } from "../types";

export default function FlightBriefDecoder() {
  const [selectedIcao, setSelectedIcao] = useState<string>("LFKC");
  const [customMetarInput, setCustomMetarInput] = useState<string>("");
  const [activeMetar, setActiveMetar] = useState<DecodedMetar>(SAMPLE_METARS["LFKC"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasExported, setHasExported] = useState<boolean>(false);

  // METAR Regex decoder engine
  function processCustomMetar(input: string) {
    if (!input.trim()) return;
    setIsLoading(true);
    setHasExported(false);

    setTimeout(() => {
      const clean = input.trim().toUpperCase();
      const parts = clean.split(/\s+/);
      
      let icao = "LFXX";
      if (parts[0] && parts[0].length === 4 && /^[A-Z]{4}$/.test(parts[0])) {
        icao = parts[0];
      }
      
      let windDir = 0;
      let windSpeed = 0;
      let windGusts: number | undefined = undefined;
      let windStatus = "Vent variable ou calme.";
      
      // Wind pattern e.g., 24015G25KT
      const windMatch = clean.match(/(\d{3})(\d{2})(G\d{2})?KT/);
      if (windMatch) {
        windDir = parseInt(windMatch[1]);
        windSpeed = parseInt(windMatch[2]);
        if (windMatch[3]) {
          windGusts = parseInt(windMatch[3].slice(1));
        }
        windStatus = `${windDir}° / ${windSpeed} kt${windGusts ? ` (Rafales ${windGusts} kt)` : ""}.`;
      }

      // Visibility
      let visibility = "Supérieure à 10 km";
      let visNum = 10000;
      const visMatch = clean.match(/\b(\d{4})\b/);
      if (visMatch) {
        const v = parseInt(visMatch[1]);
        visNum = v;
        if (v === 9999) {
          visibility = "> 10 km (Excellent Vis)";
        } else {
          visibility = `${v} mètres`;
        }
      } else if (clean.includes("CAVOK")) {
        visibility = "> 10 km (CAVOK)";
        visNum = 10000;
      }

      // Clouds
      const clouds: string[] = [];
      let lowestCeilingFt = 99999;
      
      const cloudMatches = [...clean.matchAll(/\b(FEW|SCT|BKN|OVC)(\d{3})\b/g)];
      if (cloudMatches.length > 0) {
        cloudMatches.forEach(m => {
          const type = m[1];
          const height = parseInt(m[2]) * 100;
          const typeLabel = type === "FEW" ? "Quelques nuages (FEW)" :
                            type === "SCT" ? "Épars (SCT)" :
                            type === "BKN" ? "Fragmenté (BKN)" : "Plafond soudé (OVC)";
          clouds.push(`${typeLabel} à ${height} ft`);

          if ((type === "BKN" || type === "OVC") && height < lowestCeilingFt) {
            lowestCeilingFt = height;
          }
        });
      } else if (clean.includes("CAVOK")) {
        clouds.push("Aucun nuage à signaler (CAVOK)");
      } else {
        clouds.push("Pas de plafond nuageux bas identifié.");
      }

      // Temperature / Dew
      let temp = 15;
      let dew = 10;
      let tempDewLabel = "Température: 15°C - Rosée: 10°C";
      const tempMatch = clean.match(/\b(M?\d{2})\/(M?\d{2})\b/);
      if (tempMatch) {
        const tStr = tempMatch[1];
        const dStr = tempMatch[2];
        temp = tStr.startsWith("M") ? -parseInt(tStr.slice(1)) : parseInt(tStr);
        dew = dStr.startsWith("M") ? -parseInt(dStr.slice(1)) : parseInt(dStr);
        tempDewLabel = `Température: ${temp}°C / Rosée: ${dew}°C`;
      }

      // QNH
      let qnh = 1013;
      const qnhMatch = clean.match(/\bQ(\d{4})\b/);
      if (qnhMatch) {
        qnh = parseInt(qnhMatch[1]);
      }

      // Hazards
      const hazards: string[] = [];
      if (windSpeed > 15 || (windGusts && windGusts > 22)) {
        hazards.push(`⚠️ Risque de cisaillement de vent / fortes rafales (${windGusts || windSpeed} kt).`);
      }
      if (visNum < 5000) {
        hazards.push(`⚠️ Visibilité réduite à ${visNum}m (VFR restreint).`);
      }
      if (lowestCeilingFt < 1000) {
        hazards.push(`⚠️ Plafond nuageux critique à ${lowestCeilingFt} ft (VFR interdit).`);
      }
      const spread = temp - dew;
      if (spread >= 0 && spread <= 2 && visNum < 8000) {
        hazards.push(`⚠️ Risque extrême de brouillard / givrage carburateur (Temp/Rosée écart de ${spread}°C).`);
      }
      if (qnh < 1013) {
        hazards.push(`⚠️ Basse pression atmosphérique (${qnh} hPa). Altitudes géométriques réduites.`);
      }

      // Category
      let category: "VFR" | "MVFR" | "IFR" | "LIFR" = "VFR";
      let categoryColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      
      if (lowestCeilingFt < 500 || visNum < 1600) {
        category = "LIFR";
        categoryColor = "text-pink-400 bg-pink-500/10 border-pink-500/20";
      } else if (lowestCeilingFt < 1000 || visNum < 5000) {
        category = "IFR";
        categoryColor = "text-red-400 bg-red-500/10 border-red-500/20";
      } else if (lowestCeilingFt <= 3000 || visNum < 8000) {
        category = "MVFR";
        categoryColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
      }

      let briefing = "";
      if (category === "VFR") {
        briefing = `Briefing tactique : Conditions favorables pour un vol à vue vers ${icao}. Le vent (${windSpeed} kt) reste gérable mais l'orientation à ${windDir}° doit être prise en compte pour le calcul de dérive.`;
      } else if (category === "MVFR") {
        briefing = `Briefing tactique : Vigilance accrue recommandée pour ${icao}. Les conditions météo sont marginales. Attention au plafond à ${lowestCeilingFt === 99999 ? "Altitude non-bloquante" : `${lowestCeilingFt} ft`} et possibles entrées maritimes humides.`;
      } else {
        briefing = `Briefing tactique : Conditions IFR rigoureuses sur l'aérodrome ${icao}. Visibilité ou plafond bas. Vol à vue formellement compromis. Planifiez d'ores et déjà vos déroutements aéronautiques prioritaires.`;
      }

      setActiveMetar({
        icao,
        name: `Aérodrome de ${icao} (Aperçu Décodé)`,
        raw: clean,
        category,
        categoryColor,
        wind: {
          direction: windDir,
          speedKt: windSpeed,
          gustsKt: windGusts,
          status: windStatus
        },
        visibility,
        clouds,
        tempDew: tempDewLabel,
        qnh,
        hazards,
        briefing
      });

      setIsLoading(false);
    }, 700);
  }

  function handleAirportSelect(icao: string) {
    setSelectedIcao(icao);
    setActiveMetar(SAMPLE_METARS[icao]);
    setCustomMetarInput("");
    setHasExported(false);
  }

  function simulatePdfExport() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasExported(true);
    }, 1000);
  }

  return (
    <div className="flex flex-col h-full bg-[#030303]/40 border border-white/[0.04] p-5 sm:p-7 rounded-3xl" id="flightbrief-ui">
      {/* Product Tag & Action Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Compass className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              FlightBrief.ai
              <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest animate-pulse">
                Live 🟢
              </span>
            </h3>
            <p className="text-[11px] font-sans text-zinc-500">Briefing météo de vol assisté par IA locale</p>
          </div>
        </div>

        {/* Airport Selectors */}
        <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.05] rounded-full p-1">
          {Object.keys(SAMPLE_METARS).map((icao) => (
            <button
              key={icao}
              onClick={() => handleAirportSelect(icao)}
              className={`px-3 py-1 text-[11px] font-mono rounded-full font-medium transition-all cursor-pointer ${
                selectedIcao === icao && !customMetarInput
                  ? "bg-white/[0.08] text-white border border-white/10"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {icao}
            </button>
          ))}
        </div>
      </div>

      <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed mb-6">
        Analysez instantanément n'importe quel code METAR. L'application identifie les risques de vent de travers, de givrage carburateur, et rédige un dossier tactique aéronautique.
      </p>

      {/* METAR Code Box */}
      <div className="relative bg-black/60 border border-white/[0.05] rounded-xl p-4.5 mb-6 focus-within:border-white/15 transition-colors">
        <span className="absolute top-2.5 right-3 text-[9px] font-mono text-zinc-600 uppercase tracking-wider">CODE METAR / RAW</span>
        <div className="font-mono text-[12px] sm:text-[13px] text-zinc-300 leading-normal selection:bg-emerald-500/30 pr-12 min-h-[40px] flex items-center">
          {activeMetar.raw}
        </div>
      </div>

      {/* Interactive Custom METAR input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="md:col-span-9 relative">
          <input
            type="text"
            placeholder="Ex: LFBO 071830Z 31012KT 9999 CAVOK 19/08 Q1021..."
            value={customMetarInput}
            onChange={(e) => setCustomMetarInput(e.target.value)}
            className="w-full h-11 bg-white/[0.02] border border-white/[0.07] rounded-xl px-4 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.04] transition-all"
          />
          {customMetarInput && (
            <button
              onClick={() => setCustomMetarInput("")}
              className="absolute right-3 top-3.5 text-[9px] font-mono text-zinc-500 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>
        <button
          onClick={() => processCustomMetar(customMetarInput || activeMetar.raw)}
          disabled={isLoading}
          className="md:col-span-3 h-11 bg-white hover:bg-neutral-100 disabled:bg-neutral-800 text-zinc-950 font-sans font-medium text-xs rounded-xl flex items-center justify-center gap-2 select-none transition-all cursor-pointer shadow-lg shadow-black/40 disabled:text-zinc-600"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-zinc-950" />
              <span>Décoder</span>
            </>
          )}
        </button>
      </div>

      {/* METAR Parameter Deck */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* Wind */}
        <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
            <Wind className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] font-sans font-medium">VENT</span>
          </div>
          <span className="font-mono text-xs text-white tracking-wide truncate">
            {activeMetar.wind.direction}° / {activeMetar.wind.speedKt} kt
            {activeMetar.wind.gustsKt ? ` G ${activeMetar.wind.gustsKt}` : ""}
          </span>
        </div>

        {/* Visibility */}
        <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
            <Eye className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] font-sans font-medium">VISIBILITÉ</span>
          </div>
          <span className="font-mono text-xs text-white tracking-wide truncate">
            {activeMetar.visibility}
          </span>
        </div>

        {/* Clouds */}
        <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] font-sans font-medium">PLAFOND</span>
          </div>
          <span className="font-mono text-xs text-white tracking-wide truncate">
            {activeMetar.clouds[0] || "Aucun plafond bas"}
          </span>
        </div>

        {/* QNH */}
        <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] font-sans font-medium">ALTIMÈTRE</span>
          </div>
          <span className="font-mono text-xs text-white tracking-wide truncate">
            QNH {activeMetar.qnh} hPa
          </span>
        </div>
      </div>

      {/* Decoded Content Block */}
      <div className="flex-1 space-y-4">
        {/* Flight Category Alert Pill */}
        <div className="flex items-center justify-between border-b border-white/[0.03] pb-3">
          <span className="text-xs font-sans text-zinc-500">Catégorie aéronautique :</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border uppercase ${activeMetar.categoryColor}`}>
            VOL {activeMetar.category}
          </span>
        </div>

        {/* Tactical Air Briefing */}
        <div className="bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
          <h4 className="text-zinc-200 text-xs font-semibold mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Analyse Pilotage & IA
          </h4>
          <p className="text-zinc-400 text-xs leading-relaxed font-light">
            {activeMetar.briefing}
          </p>
        </div>

        {/* Risk Alerts */}
        {activeMetar.hazards.length > 0 && (
          <div className="bg-red-500/[0.02] border border-red-500/[0.08] p-4 rounded-xl">
            <h4 className="text-red-400 text-xs font-semibold mb-2.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Risques et alertes sécurité identifiés
            </h4>
            <div className="space-y-1.5">
              {activeMetar.hazards.map((hazard, idx) => (
                <p key={idx} className="text-zinc-500 text-xs font-light leading-relaxed pl-1">
                  {hazard}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Export Briefing Widget */}
      <div className="mt-6 pt-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest text-center sm:text-left">
          {activeMetar.name}
        </span>
        <button
          onClick={simulatePdfExport}
          disabled={isLoading || hasExported}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] disabled:bg-white/[0.01] disabled:border-white/[0.03] font-sans font-medium text-xs text-white hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
        >
          {hasExported ? (
            <span className="text-emerald-400 font-mono text-[11px] font-semibold">
              ✓ Dossier Exporté avec succès (Brief.pdf)
            </span>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Exporter le Briefing PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
