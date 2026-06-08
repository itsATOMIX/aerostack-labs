import { Plane, Heart, Twitter, Github, Globe, Compass, ExternalLink, LifeBuoy } from "lucide-react";

interface FooterProps {
  onOpenSupport: () => void;
}

export default function Footer({ onOpenSupport }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020202] border-t border-white/[0.04] pt-20 pb-12 px-4 selection:bg-sky-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

      <div className="w-full max-w-5xl mx-auto space-y-16">
        {/* Core CTA Block */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto bg-white/[0.01] border border-white/[0.03] p-8 sm:p-10 rounded-3xl backdrop-blur-sm">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500/10 animate-pulse" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
            Vous aimez notre hangar à outils ?
          </h3>
          <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed font-light">
            Soutenez l'idéal d'un logiciel aéronautique performant, fluide et dénué de publicités commerciales. Chaque goutte de carburant offerte élargit notre champ d'action.
          </p>
          <button
            onClick={onOpenSupport}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 font-sans tracking-wide hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.08)] hover:shadow-[0_0_32px_rgba(255,255,255,0.18)] cursor-pointer select-none"
          >
            Soutenir le studio (Buy Me a Kérosène ☕)
          </button>
        </div>

        {/* Links Column and Brands */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6 pt-4 border-t border-white/[0.02]">
          {/* Brand col */}
          <div className="sm:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              <span className="font-display font-semibold text-white tracking-tight text-[14px]">
                AeroStack Labs
              </span>
            </div>
            <p className="text-zinc-500 text-xs font-light max-w-sm leading-relaxed">
              Pôle de recherche logicielle en facteur humain et ergonomie de vol. Nous simplifions la vie des élèves-pilotes et de la communauté aéronautique générale.
            </p>
          </div>

          {/* Resources links col */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <Compass className="w-3 h-3 text-zinc-500" />
              LIENS VOL
            </h4>
            <ul className="text-xs space-y-2 text-zinc-500 font-light">
              <li>
                <a href="https://www.sia.aviation-civile.gouv.fr/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  SIA (AIP France) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://aviation.meteo.fr/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Météo-France Météo <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://www.geoportail.gouv.fr/carte" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Cartographie OACI <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social and legal col */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <LifeBuoy className="w-3 h-3 text-zinc-500" />
              SOCIÉTÉ
            </h4>
            <ul className="text-xs space-y-2 text-zinc-500 font-light">
              <li>
                <a href="mailto:atomix.officielyt@gmail.com" className="hover:text-white transition-colors cursor-pointer text-left inline-block">
                  Nous Contacter
                </a>
              </li>
              <li>
                <span className="text-zinc-600">Confidentialité 100% Locale</span>
              </li>
              <li>
                <span className="text-zinc-600">Pas de traceurs tiers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.02] text-[11px] font-mono text-zinc-600">
          <div>
            © {currentYear} AeroStack Labs. Conçu pour le VFR et l'ingénierie aéronautique.
          </div>
          
          {/* Social Icons row */}
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/[0.01] border border-white/[0.05] text-zinc-500 hover:text-white hover:border-white/10 transition-all">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/[0.01] border border-white/[0.05] text-zinc-500 hover:text-white hover:border-white/10 transition-all">
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
