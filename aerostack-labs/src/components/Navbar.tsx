import { Plane, Heart, Cpu, FileText } from "lucide-react";

interface NavbarProps {
  onOpenSupport: () => void;
  onScrollToTools: () => void;
  onScrollToPhilosophy: () => void;
}

export default function Navbar({ onOpenSupport, onScrollToTools, onScrollToPhilosophy }: NavbarProps) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl glass rounded-full px-6 py-2.5 flex items-center justify-between transition-all duration-300 hover:border-white/[0.15] shadow-2xl">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.1] transition-transform duration-500 group-hover:rotate-12">
            <Plane className="w-4.5 h-4.5 text-sky-400 group-hover:text-sky-300 transition-colors" />
            <div className="absolute -inset-1 rounded-full bg-sky-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display font-medium text-[15px] tracking-tight text-white flex items-center gap-1.5 selection:bg-sky-500/30">
            AeroStack <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/40 tracking-normal">LABS</span>
          </span>
        </div>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={onScrollToTools}
            className="text-[13px] font-sans font-medium text-white/50 hover:text-white transition-colors cursor-pointer relative py-1"
          >
            Nos Outils
          </button>
          <button
            onClick={onScrollToPhilosophy}
            className="text-[13px] font-sans font-medium text-white/50 hover:text-white transition-colors cursor-pointer relative py-1"
          >
            Philosophie
          </button>
        </nav>

        {/* Call to Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSupport}
            className="relative px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] text-white/90 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10 group-hover:fill-rose-500 group-hover:scale-110 transition-all duration-300" />
            <span className="hidden sm:inline">Soutenir le Studio</span>
            <span className="sm:hidden">Soutenir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
