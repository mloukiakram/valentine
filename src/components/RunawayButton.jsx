import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function RunawayButton({ onHover }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const btnRef = useRef(null);
    const controls = useAnimation();

    const runAway = () => {
        if (onHover) onHover();

        // Calculate safe boundaries based on viewport
        const maxX = window.innerWidth - 150; // Button width buffer
        const maxY = window.innerHeight - 100; // Button height buffer

        // Random new position
        const newX = Math.random() * (maxX - 50) + 50;
        const newY = Math.random() * (maxY - 50) + 50;

        // Use absolute positioning relative to viewport
        // But since we are likely inside a flexible container, we might need fixed positioning
        // For simplicity in this demo, we'll just translate visually

        // Actually, let's just create a huge offset from initial
        const randomX = (Math.random() - 0.5) * 500;
        const randomY = (Math.random() - 0.5) * 500;

        controls.start({
            x: randomX,
            y: randomY,
            rotate: Math.random() * 20 - 10,
            transition: { type: "spring", stiffness: 300, damping: 15 }
        });
    };

    return (
        <motion.button
            ref={btnRef}
            animate={controls}
            onHoverStart={runAway}
            onTouchStart={(e) => { e.preventDefault(); runAway(); }}
            className="px-8 py-3 bg-gray-300 text-gray-600 rounded-full font-bold shadow-md relative z-50 whitespace-nowrap"
            style={{ position: 'relative' }}
        >
            No
        </motion.button>
    );
}
