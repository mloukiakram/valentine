import { motion } from "framer-motion";

export default function Envelope({ onOpen }) {
    return (
        <motion.div
            className="relative cursor-pointer w-64 h-44 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            onClick={onOpen}
        >
            <div className="absolute w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-2xl z-10 flex items-center justify-center">
                <motion.div
                    className="text-6xl filter drop-shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    💌
                </motion.div>
            </div>

            {/* Flap */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 rounded-t-lg origin-top z-20"
                style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
                animate={{ rotateX: 0 }}
                whileTap={{ rotateX: 180 }}
            />

            <p className="absolute -bottom-16 text-2xl font-bold text-pink-700 dancing-script animate-bounce">
                Click to Open
            </p>
        </motion.div>
    );
}
