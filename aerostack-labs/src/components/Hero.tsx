import { motion } from "motion/react";
import { Compass, Sparkles, ChevronDown, CheckCircle } from "lucide-react";

interface HeroProps {
  onScrollToTools: () => void;
  onOpenSupport: () => void;
}

export default function Hero({ onScrollToTools, onOpenSupport }: HeroProps) {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-violet-500/[0.02] blur-[150px] pointer-events-none" />

      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative w-full max-w-4xl text-center flex flex-col items-center z-10 selection:bg-sky-500/30">
        {/* Fine badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md mb-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group cursor-pointer"
          onClick={onScrollToTools}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[11px] font-mono font-medium tracking-tight text-white/70">
            L'intelligence artificielle au service des pilotes
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        </motion.div>

        {/* Master heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-[1.1] mb-6 max-w-3xl"
        >
          La suite d'outils tactiques pour les pilotes de demain.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="text-base sm:text-lg md:text-[19px] leading-relaxed text-zinc-400 max-w-2.5xl mb-12 font-light tracking-wide"
        >
          Bienvenue chez <span className="text-white font-medium">AeroStack Labs</span>. Nous développons des micro-applications de calcul, de briefing et d'auto-apprentissage à l'ergonomie radar radicalement épurée pour les élèves-pilotes et passionnés de l'aviation certifiée.
        </motion.p>

        {/* Call to Actions buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4"
        >
          <button
            onClick={onScrollToTools}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold bg-white text-zinc-950 font-sans tracking-wide hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:shadow-[0_0_32px_rgba(255,255,255,0.22)] transform hover:-translate-y-0.5 select-none cursor-pointer"
          >
            Découvrir la suite d'outils
          </button>
          <button
            onClick={onOpenSupport}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold bg-[#030303]/40 hover:bg-white/[0.03] text-white/80 hover:text-white border border-white/[0.08] hover:border-white/[0.18] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 select-none cursor-pointer"
          >
            Donner du kérosène au cockpit ☕
          </button>
        </motion.div>

        {/* Subtle dynamic telemetry / features below main buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-2 border-t border-white/[0.03]"
        >
          <span className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
            100% CONFORTÉ SÉCURITÉ
          </span>
          <span className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
            OFFLINE-CAPABLE
          </span>
          <span className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
            VIGILANCE DIRECTE EN VOL
          </span>
        </motion.div>
      </div>

      {/* Pulsing aircraft silhouette down indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-45 hover:opacity-100 transition-opacity" onClick={onScrollToTools}>
        <span className="text-[10px] font-mono uppercase tracking-[2px] text-zinc-500">Approche</span>
        <Compass className="w-5 h-5 text-sky-400 animate-spin-[linear_10s_infinite]" />
        <ChevronDown className="w-4 h-4 text-zinc-500 animate-bounce mt-1" />
      </div>
    </section>
  );
}
