/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoSection from "./components/BentoSection";
import Philosophy from "./components/Philosophy";
import Footer from "./components/Footer";
import KeroseneModal from "./components/KeroseneModal";

export default function App() {
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [initialSuccessLiters, setInitialSuccessLiters] = useState<number | null>(null);

  // Parse Stripe redirect callbacks
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const litersStr = params.get("liters");

    if (status === "success" && litersStr) {
      const parsedLiters = parseInt(litersStr, 10);
      if (!isNaN(parsedLiters)) {
        setInitialSuccessLiters(parsedLiters);
        setIsSupportOpen(true);
      }
      
      // Clean query params from the URL bar for a pristine look
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    } else if (status === "cancelled") {
      // Clean query params on cancel
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030303] bg-grid text-zinc-100 font-sans selection:bg-sky-500/20 selection:text-white overflow-hidden">
      {/* Immersive UI Glow Orbs */}
      <div className="glow-orb top-[-100px] left-[-100px]" />
      <div className="glow-orb bottom-[-100px] right-[-100px]" style={{ background: "radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)" }} />

      {/* Absolute top cockpit background ambient flow glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[300px] left-1/3 w-[750px] h-[750px] rounded-full bg-sky-600/[0.01] blur-[180px] pointer-events-none" />

      {/* Modern Capsule Floating Header */}
      <Navbar
        onOpenSupport={() => setIsSupportOpen(true)}
        onScrollToTools={() => scrollToSection("outils-section")}
        onScrollToPhilosophy={() => scrollToSection("philosophie-section")}
      />

      {/* Main Structural Space */}
      <main className="relative z-10">
        {/* Dynamic Flying Hero Area */}
        <Hero
          onScrollToTools={() => scrollToSection("outils-section")}
          onOpenSupport={() => setIsSupportOpen(true)}
        />

        {/* Tactical Air Tools & Interactive Bento Demos */}
        <BentoSection onOpenSupport={() => setIsSupportOpen(true)} />

        {/* Human Factor & Safety Pillars */}
        <Philosophy />
      </main>

      {/* High-End Cockpit Footer */}
      <Footer onOpenSupport={() => setIsSupportOpen(true)} />

      {/* Fuel Injection Support Modal */}
      <KeroseneModal
        isOpen={isSupportOpen}
        onClose={() => {
          setIsSupportOpen(false);
          setInitialSuccessLiters(null);
        }}
        initialSuccessLiters={initialSuccessLiters}
      />
    </div>
  );
}

