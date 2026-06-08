import { Plane, ShieldAlert, Cpu, Heart, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Philosophy() {
  const pillars = [
    {
      num: "01",
      icon: <Plane className="w-5 h-5 text-sky-400" />,
      title: "Pensé par des pilotes",
      desc: "Chaque paramètre aéronautique, temporisation de calcul ou disposition graphique est calqué sur l'attention sélective d'un pilote en cockpit de croisière. Pas de jargon inutile, uniquement la rigueur du vol réel."
    },
    {
      num: "02",
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      title: "Zéro friction",
      desc: "Les conditions météo changent en vol de navigation. Nos micro-services se chargent hors-ligne et répondent en moins de 100ms. L'interface affiche l'essentiel, pour libérer votre charge mentale."
    },
    {
      num: "03",
      icon: <ShieldAlert className="w-5 h-5 text-sky-400" />,
      title: "Focus Sécurité",
      desc: "Nous mettons en lumière les gouffres de sécurité cachés (notamment les isothermes critiques, l'érosion des marges de carburant ou le cisaillement du relief). La redondance logicielle au service de votre sérénité."
    }
  ];

  return (
    <section className="py-28 px-4 relative w-full max-w-5xl mx-auto border-t border-white/[0.03]" id="philosophie-section">
      {/* Visual background gradient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] rounded-full bg-sky-500/[0.01] blur-[150px] pointer-events-none" />

      {/* Philosophy Header */}
      <div className="text-center mb-20">
        <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-[4px]">
          Ingénierie du facteur humain
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-3">
          La charte de conception AeroStack.
        </h2>
      </div>

      {/* Grid of philosophy pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {pillars.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex flex-col relative bg-[#030303]/20 border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.01] p-6.5 rounded-2xl transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.01] border border-white/[0.08]">
                {p.icon}
              </div>
              <span className="font-mono text-xs font-medium text-zinc-600 tracking-wider">
                PILLIER {p.num}
              </span>
            </div>

            {/* Core title */}
            <h3 className="font-display text-[16px] font-semibold text-white tracking-tight mb-3">
              {p.title}
            </h3>

            {/* Core description */}
            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-light">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
