import { useState, useEffect } from "react";
import Envelope from "./components/Envelope";
import CardStack from "./components/CardStack";
import RunawayButton from "./components/RunawayButton";
import LoadingScreen from "./components/LoadingScreen";
import MouseParticles from "./components/MouseParticles";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [phase, setPhase] = useState("envelope"); // envelope | cards | question | success
    const [noAttempts, setNoAttempts] = useState(0);

    const handleEnvelopeOpen = () => {
        setPhase("cards");
    };

    const handleCardsComplete = () => {
        setTimeout(() => setPhase("question"), 500);
    };

    const handleNoClick = () => {
        setNoAttempts(prev => prev + 1);
    };

    const handleYesClick = () => {
        setPhase("success");
        fireConfetti();
    };

    const fireConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
            <MouseParticles />
            <AnimatePresence>
                {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <div className="z-10 w-full flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {phase === "envelope" && (
                            <motion.div
                                key="envelope"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                            >
                                <Envelope onOpen={handleEnvelopeOpen} />
                            </motion.div>
                        )}

                        {phase === "cards" && (
                            <motion.div
                                key="cards"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <CardStack onComplete={handleCardsComplete} />
                            </motion.div>
                        )}

                        {phase === "question" && (
                            <motion.div
                                key="question"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-8"
                            >
                                <h1 className="text-4xl md:text-6xl dancing-script text-pink-600 font-bold drop-shadow-sm">
                                    Will You Be My Valentine?
                                </h1>
                                <div className="flex flex-col md:flex-row items-center gap-8 mt-4 w-full justify-center relative min-h-[200px]">
                                    <motion.button
                                        onClick={handleYesClick}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{ scale: 1 + (noAttempts * 0.1) }}
                                        className="px-12 py-4 bg-green-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-green-400 transition-colors z-20"
                                    >
                                        YES! 💖
                                    </motion.button>

                                    <RunawayButton onHover={handleNoClick} />
                                </div>
                                {noAttempts > 0 && (
                                    <p className="text-pink-400 text-sm mt-4">
                                        Nice try! (Attempts: {noAttempts})
                                    </p>
                                )}
                            </motion.div>
                        )}

                        {phase === "success" && (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center"
                            >
                                <h1 className="text-6xl dancing-script text-pink-600 font-bold mb-4">
                                    YAAAAAY! 🎉
                                </h1>
                                <p className="text-2xl text-pink-800">
                                    You just made me the happiest person alive!
                                </p>
                                <div className="mt-8 text-8xl animate-bounce">
                                    💖
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
