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
        <div className="relative w-full max-w-sm h-96 flex items-center justify-center" onClick={handleNext}>
            <AnimatePresence>
                {CARDS.map((card, i) => (
                    i === index && (
                        <motion.div
                            key={card.id}
                            className="absolute w-72 h-96 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center cursor-pointer border-4 border-pink-200"
                            initial={{ x: 300, opacity: 0, rotate: 10 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            exit={{ x: -300, opacity: 0, rotate: -10 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-full h-48 bg-pink-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                <img src={card.img} alt="Illustration" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-xl text-pink-800 dancing-script dark:text-pink-900 font-bold leading-relaxed">
                                {card.text}
                            </p>
                            <div className="absolute bottom-4 right-4 text-xs text-pink-400 font-sans font-bold">
                                {i + 1} / {CARDS.length}
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
            <div className="absolute -bottom-12 text-pink-600 text-sm animate-pulse">
                {index < CARDS.length ? "Tap card to continue..." : ""}
            </div>
        </div>
    );
}
