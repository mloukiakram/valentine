import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "../assets/images";

const CARDS = [
    { id: 1, img: images.card1, text: "From the moment I met you, my world became brighter..." },
    { id: 2, img: images.card2, text: "Your smile is my favorite view in the entire universe..." },
    { id: 3, img: images.card3, text: "Every moment with you feels like a beautiful dream..." },
    { id: 4, img: images.card4, text: "You make my heart skip a beat, every single day..." },
    { id: 5, img: images.card5, text: "So I have something very important to ask you..." }
];

export default function CardStack({ onComplete }) {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < CARDS.length - 1) {
            setIndex(index + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="relative w-full max-w-sm h-96 flex items-center justify-center perspecitve-1000" onClick={handleNext}>
            <AnimatePresence mode="popLayout">
                {CARDS.map((card, i) => {
                    if (i < index) return null; // Already swiped

                    const isTop = i === index;
                    const offset = i - index;

                    // Only render top 3 cards for performance/stack effect
                    if (offset > 2) return null;

                    return (
                        <motion.div
                            key={card.id}
                            className={`absolute w-72 h-96 bg-white rounded-2xl shadow-2xl flex flex-col items-center p-6 border-4 border-pink-100 cursor-pointer ${isTop ? 'z-50' : 'z-40'}`}
                            style={{ zIndex: 50 - offset }}
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{
                                scale: 1 - offset * 0.05,
                                y: offset * 20,
                                opacity: 1 - offset * 0.2,
                                rotate: isTop ? 0 : (offset % 2 === 0 ? 5 : -5)
                            }}
                            exit={{
                                x: -400,
                                y: 50,
                                opacity: 0,
                                rotate: -45,
                                transition: { duration: 0.5, ease: "easeOut" }
                            }}
                            whileHover={isTop ? { scale: 1.05, rotate: 2 } : {}}
                            whileTap={isTop ? { scale: 0.95 } : {}}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div className="w-full h-48 rounded-lg mb-6 overflow-hidden shadow-inner bg-pink-50">
                                <img src={card.img} alt="Illustration" className="w-full h-full object-cover pointer-events-none" />
                            </div>
                            <p className="text-xl text-center text-pink-800 dancing-script font-bold leading-relaxed px-2">
                                {card.text}
                            </p>
                            <div className="absolute bottom-4 text-xs text-pink-300 font-bold uppercase tracking-widest">
                                {isTop ? "Tap to continue" : "Next"}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
