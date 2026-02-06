import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="relative mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                <div className="text-8xl">💖</div>
                <motion.div
                    className="absolute inset-0 text-8xl overflow-hidden"
                    style={{ height: `${progress}%` }}
                >
                    <div className="text-8xl text-pink-600 grayscale-0">💖</div>
                </motion.div>
            </motion.div>

            <div className="w-64 h-2 bg-pink-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-pink-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-4 font-bold text-pink-400 animate-pulse">
                Loading Romance... {progress}%
            </p>
        </motion.div>
    );
}
