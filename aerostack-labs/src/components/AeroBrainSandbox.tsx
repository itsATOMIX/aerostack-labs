import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, AlertCircle, HelpCircle, GraduationCap, CheckCircle2, XCircle, ChevronRight, RefreshCw, Trophy } from "lucide-react";
import { SAMPLE_FLASHCARDS } from "../data";
import { Flashcard } from "../types";

export default function AeroBrainSandbox() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [totalReviewed, setTotalReviewed] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [retentionScore, setRetentionScore] = useState<number>(85); // %

  const currentCard: Flashcard = SAMPLE_FLASHCARDS[currentIndex];

  function handleSelectOption(idx: number) {
    if (answered) return;
    setSelectedResponse(idx);
    setAnswered(true);

    const isCorrect = idx === currentCard.correctIndex;
    setTotalReviewed((prev) => prev + 1);

    if (isCorrect) {
      setStreak((prev) => {
        const next = prev + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
      setRetentionScore((prev) => Math.min(100, prev + 3));
    } else {
      setStreak(0);
      setRetentionScore((prev) => Math.max(50, prev - 8));
    }
  }

  function handleSrsRating(difficultyBoost: number) {
    // Reset card state and go to next
    setAnswered(false);
    setSelectedResponse(null);
    setRetentionScore((prev) => Math.min(100, Math.max(0, prev + difficultyBoost)));
    
    // Go to next card round robin
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_FLASHCARDS.length);
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedResponse(null);
    setAnswered(false);
    setTotalReviewed(0);
    setStreak(0);
    setRetentionScore(85);
  }

  return (
    <div className="flex flex-col h-full bg-[#030303]/40 border border-white/[0.04] p-5 sm:p-7 rounded-3xl" id="aerobrain-ui">
      {/* Header Tag and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
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
            <p className="text-[11px] font-sans text-zinc-500">Outil de répétition espacée SRS & Théorie IA</p>
          </div>
        </div>

        {/* Brain Stats Panel */}
        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/[0.05] rounded-xl px-3 py-1.5 self-start">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500">STREAK</span>
            <span className="text-[12px] font-mono text-white flex items-center gap-1 font-bold">
              ⚡ {streak}
            </span>
          </div>
          <div className="h-6 w-[1px] bg-white/[0.08]" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500">RÉTENTION</span>
            <span className="text-[12px] font-mono text-white font-bold">
              🧠 {retentionScore}%
            </span>
          </div>
          <div className="h-6 w-[1px] bg-white/[0.08]" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500">RÉVISIONS</span>
            <span className="text-[12px] font-mono text-white font-bold">
              📚 {totalReviewed}
            </span>
          </div>
        </div>
      </div>

      <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed mb-6">
        Le moteur de mémorisation active pour plier votre BIA ou PPL théorique. Relevez le défi interactif de notre prototype de cockpit ci-dessous.
      </p>

      {/* Card Arena with Slide Animations */}
      <div className="flex-1 min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* Card Category Header banner */}
            <div className="flex items-center justify-between mb-4.5">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-500/5 px-2 bg-opacity-15 py-0.5 border border-purple-500/10 rounded">
                Catégorie : {currentCard.category}
              </span>
              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                currentCard.difficulty === "Facile"
                  ? "text-emerald-400 border-emerald-500/10 bg-emerald-500/5"
                  : currentCard.difficulty === "Moyen"
                  ? "text-amber-400 border-amber-500/10 bg-amber-500/5"
                  : "text-red-400 border-red-500/10 bg-red-500/5"
              }`}>
                {currentCard.difficulty}
              </span>
            </div>

            {/* The Question */}
            <h4 className="font-display text-white text-sm sm:text-base font-medium leading-normal mb-6">
              {currentCard.question}
            </h4>

            {/* Answer Options Grid */}
            <div className="space-y-2 mb-6">
              {currentCard.options.map((option, idx) => {
                let optionStyle = "bg-white/[0.01] border-white/[0.06] text-zinc-400 hover:bg-white/[0.03] hover:border-white/[0.12]";
                let iconComponent = <HelpCircle className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />;

                if (answered) {
                  if (idx === currentCard.correctIndex) {
                    optionStyle = "bg-emerald-500/5 border-emerald-500/30 text-emerald-300";
                    iconComponent = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
                  } else if (idx === selectedResponse) {
                    optionStyle = "bg-red-500/5 border-red-500/30 text-red-300";
                    iconComponent = <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
                  } else {
                    optionStyle = "bg-white/[0.005] border-white/[0.03] text-zinc-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={answered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full group text-left px-4 py-3 border rounded-xl text-xs sm:text-[13px] leading-relaxed transition-all flex items-start gap-3 select-none ${
                      !answered ? "cursor-pointer" : "cursor-default"
                    } ${optionStyle}`}
                  >
                    {iconComponent}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation & SRS Buttons */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Explanation block */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-3.5 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                    Explication de l'instructeur
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light font-mono select-text">
                    {currentCard.explanation}
                  </p>
                </div>

                {/* SRS Control Center */}
                <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-2xl">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block text-center mb-2.5">
                    RÉPÉTITION ESPACÉE (SRS AI) — ÉVALUEZ VOTRE EFFORT :
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleSrsRating(-5)}
                      className="px-2.5 py-2 font-sans font-medium rounded-xl text-[10px] bg-red-500/5 text-red-300 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 active:scale-95 transition-all text-center select-none cursor-pointer"
                    >
                      Revoir 🔄
                      <span className="block text-[8px] text-red-500/60 font-mono mt-0.5">À retenter</span>
                    </button>
                    <button
                      onClick={() => handleSrsRating(1)}
                      className="px-2.5 py-2 font-sans font-medium rounded-xl text-[10px] bg-amber-500/5 text-amber-300 border border-amber-500/10 hover:bg-amber-500/10 hover:border-amber-500/20 active:scale-95 transition-all text-center select-none cursor-pointer"
                    >
                      Moyen ⏳
                      <span className="block text-[8px] text-amber-500/60 font-mono mt-0.5">Dans 2 jours</span>
                    </button>
                    <button
                      onClick={() => handleSrsRating(4)}
                      className="px-2.5 py-2 font-sans font-medium rounded-xl text-[10px] bg-emerald-500/5 text-emerald-300 border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 active:scale-95 transition-all text-center select-none cursor-pointer"
                    >
                      Facile 🚀
                      <span className="block text-[8px] text-emerald-500/60 font-mono mt-0.5">Dans 5 jours</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card Navigator Footer */}
      <div className="mt-6 pt-5 border-t border-white/[0.04] flex items-center justify-between gap-4">
        <button
          onClick={handleReset}
          className="text-[10px] font-mono text-zinc-600 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Réinitialiser le Deck
        </button>

        <span className="text-[10px] font-mono text-zinc-500">
          Question {currentIndex + 1} / {SAMPLE_FLASHCARDS.length}
        </span>
      </div>
    </div>
  );
}
