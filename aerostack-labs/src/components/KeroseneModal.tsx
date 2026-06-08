import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, PlaneTakeoff, Compass, Users, Check, AlertTriangle, Loader2 } from "lucide-react";

interface KeroseneModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSuccessLiters?: number | null;
}

export default function KeroseneModal({ isOpen, onClose, initialSuccessLiters }: KeroseneModalProps) {
  const [liters, setLiters] = useState<number>(15);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync initial success from stripe checkout redirect
  useEffect(() => {
    if (initialSuccessLiters) {
      setLiters(initialSuccessLiters);
      setSuccess(true);
    }
  }, [initialSuccessLiters]);

  const LITER_PRICE = 2.15; // € per liter (AVGAS 100LL average)
  const totalCost = (liters * LITER_PRICE).toFixed(2);
  
  // DR400 / C172 average burn rate is roughly 30L/h
  const flightTimeHours = (liters / 30).toFixed(1);
  
  // AVGAS 100LL fuel density is 0.72 kg/L
  const fuelWeightKg = (liters * 0.72).toFixed(1);

  async function handleSubmitDonation(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liters }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Impossible d'initier la transaction Stripe.");
      }

      const session = await response.json();
      if (session.url) {
        // Redirect user to Stripe Checkout
        window.location.href = session.url;
      } else {
        throw new Error("URL de paiement manquante dans la réponse du serveur.");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Une erreur est survenue lors de l'ouverture du guichet de paiement.");
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#070707] border border-white/10 rounded-3xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)] z-10 p-6 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!success ? (
              <form onSubmit={handleSubmitDonation} className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-sky-400 fill-sky-400/10 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-tight">
                      Soutenir AeroStack Labs
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                      Fuel Dispenser (Buy me a Kérosène ☕)
                    </p>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  AeroStack Labs est un studio indépendant créé par des passionnés d'aviation. Vos dons nous permettent de financer l'infrastructure, d'affiner nos algorithmes IA et de conserver nos micro-outils totalement gratuits.
                </p>

                {/* Interactive fuel slider */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-sans text-zinc-400 font-medium">
                      Offrir du carburant (AVGAS 100LL) :
                    </span>
                    <span className="font-display font-bold text-white text-lg sm:text-xl">
                      ⚡ {liters} LITRES
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="150"
                    step="1"
                    value={liters}
                    disabled={loading}
                    onChange={(e) => setLiters(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                    <span>1 L (Minimum)</span>
                    <span>75 L</span>
                    <span>150 L (Un plein)</span>
                  </div>

                  {/* Physics & Aircraft flight prediction stats */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.03]">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">Heures de Vol Permises</span>
                      <span className="text-xs font-mono text-sky-400 font-semibold">
                        🤖 +{flightTimeHours} heures (Robin DR400)
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">Masse utile embarquée</span>
                      <span className="text-xs font-mono text-zinc-300 font-semibold">
                        ⚖️ +{fuelWeightKg} kg (Densité 0.72)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount display */}
                <div className="flex items-center justify-between px-5 py-4 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                  <span className="text-xs text-zinc-400">Total du soutien :</span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-display font-bold text-white">
                      {totalCost} €
                    </span>
                    <span className="block text-[10px] font-mono text-zinc-600">Calculé à 2,15€/L</span>
                  </div>
                </div>

                {/* Error handling block */}
                {error && (
                  <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
                    <span className="text-xs text-rose-300 leading-normal font-sans">
                      {error}
                    </span>
                  </div>
                )}

                {/* Payment Selection with single Stripe focus */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Mode de transfert :
                  </span>
                  <div className="bg-[#030303] border border-white/[0.04] p-3.5 rounded-xl flex items-center justify-between text-xs transition-colors hover:border-sky-500/20">
                    <span className="text-zinc-300 font-medium flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-400" : "bg-sky-400 animate-pulse"}`} />
                      {loading ? "Préparation de la session..." : "Paiement Sécurisé via Stripe"}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Stripe Checkout</span>
                  </div>
                </div>

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-sans font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_24px_rgba(14,165,233,0.35)] disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />
                      <span>Redirection vers Stripe...</span>
                    </>
                  ) : (
                    <>
                      <PlaneTakeoff className="w-4 h-4 text-zinc-950" />
                      <span>Soutenir via Stripe ↗</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Réservoir Rempli ! ✈️
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] font-light max-w-sm mx-auto leading-relaxed">
                    Merci infiniment pour vos <strong>{liters} Litres</strong> de carburant ({totalCost} €) ! Vous venez d'injecter {flightTimeHours} heures d'autonomie et de développement dans notre hangar aéronautique.
                  </p>
                </div>

                <div className="py-3 px-4.5 bg-zinc-950 border border-white/[0.05] rounded-xl inline-flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Reçu aéronautique</span>
                  <span className="font-mono text-xs text-emerald-400 font-bold">STATUS : INJECTÉ (AVGAS 100LL)</span>
                </div>

                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="w-full py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white font-sans font-medium text-xs rounded-xl border border-white/[0.08] transition-all cursor-pointer"
                >
                  Fermer le robinet de fuel
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
