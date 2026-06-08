import { motion } from "motion/react";
import { Compass, BookOpen, AlertCircle, Wind, Eye, Layers, ShieldAlert, Zap, Clock, Star, ExternalLink } from "lucide-react";

interface BentoSectionProps {
  onOpenSupport: () => void;
}

export default function BentoSection({ onOpenSupport }: BentoSectionProps) {
  return (
    <section className="py-24 px-4 relative w-full max-w-6xl mx-auto" id="outils-section">
      {/* Decorative localized glows under bento items */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-500/[0.015] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/[0.015] blur-[100px] pointer-events-none" />

      {/* Header text */}
      <div className="text-center md:text-left mb-16 space-y-3.5 select-none">
        <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-[3px] border border-sky-400/20 bg-sky-500/5 px-3 py-1 rounded-full">
          Gamme de Précision • Avionique v1.2
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-4">
          Micro-applicatifs de cockpit.
        </h2>
        <p className="text-zinc-500 text-xs sm:text-[14px] max-w-2xl font-light font-sans">
          Les instruments de bord traditionnels sont froids. Nos applications traduisent les masses d'informations complexes en actions immédiates, ergonomiques et sécurisées pour la conduite du vol VFR.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Card 1: FlightBrief.ai (Asymmetrical large span 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.6)] border border-white/[0.03] bg-zinc-950/20 backdrop-blur-xl group hover:border-white/[0.08] transition-all duration-500 flex flex-col"
        >
          <div className="p-6 sm:p-8 flex flex-col h-full">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
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
            </div>

            <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed mb-6">
              Analysez instantanément n'importe quel code METAR. L'application identifie les risques de vent de travers, de givrage carburateur, décode les plafonds marginaux et rédige un dossier tactique aéronautique complet pour votre vol en un clic.
            </p>

            {/* Launch Button Action */}
            <a
              href="https://flightbrief-app.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-sans font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_24px_rgba(16,185,129,0.22)] transition-all cursor-pointer select-none text-center"
            >
              <span>Ouvrir l'application FlightBrief.ai ↗</span>
            </a>
          </div>
        </motion.div>

        {/* Card 2: AeroBrain (Asymmetrical span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.6)] border border-white/[0.03] bg-zinc-950/20 backdrop-blur-xl group hover:border-white/[0.08] transition-all duration-500 flex flex-col"
        >
          <div className="p-6 sm:p-8 flex flex-col h-full">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                    AeroBrain
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest">
                      En Dev 🛠️
                    </span>
                  </h3>
                  <p className="text-[11px] font-sans text-zinc-500">Répétition espacée (SRS) & Théorie IA</p>
                </div>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed mb-6">
              Le moteur intelligent de mémorisation active pour plit votre BIA, LAPL, ou PPL théorique. Basé sur l'algorithme de répétition espacée SuperMemo-2 et l'explication interactive en cockpit virtuel.
            </p>

            {/* Launch Beta Form Action */}
            <button
              onClick={onOpenSupport}
              className="mt-auto w-full py-3.5 bg-zinc-900 hover:bg-zinc-850 text-white font-sans font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer select-none"
            >
              <span>Soutenir le développement (Bêta)</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick notice under grid */}
      <div className="mt-8 flex items-start gap-2.5 bg-white/[0.01] border border-white/[0.04] p-4.5 rounded-2xl max-w-3xl mx-auto justify-center">
        <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <p className="text-[11px] font-sans text-zinc-500 leading-normal">
          <strong>Avis aéronautique :</strong> Ces outils constituent des aides à la décision tactique et à l'apprentissage théorique. Ils ne se substituent pas aux canaux de briefing officiels (SIA, Météo-France, AEROWEB) ni aux décisions souveraines du commandant de bord en liaison avec le contrôle de trafic aérien (ATC).
        </p>
      </div>
    </section>
  );
}
