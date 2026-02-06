import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseParticles() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newParticle = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };
            setParticles((prev) => [...prev.slice(-20), newParticle]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-2 h-2 bg-pink-400 rounded-full"
                    style={{ left: p.x, top: p.y }}
                />
            ))}
        </div>
    );
}
