import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import idea from "../../assets/Idea.png";

const Logo = ({ isFooter = false }) => {
    const [animateWave, setAnimateWave] = useState(false);

    useEffect(() => {
        let timeoutId;
        const intervalId = setInterval(() => {
            setAnimateWave(true);
            timeoutId = setTimeout(() => setAnimateWave(false), 1000);
        }, 5000);

        return () => {
            clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const letterVariants = {
        initial: { y: 0 },
        animate: { 
            y: [-1, -8, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    return (
        <Link 
            to="/" 
            className="group inline-flex items-center gap-2.5 py-1 focus:outline-none select-none"
        >
            {/* 1. Light Bulb Icon */}
            <motion.div
                animate={{ 
                    scale: [1, 1.12, 1],
                    rotate: [0, -8, 8, 0],
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.2, rotate: 12 }}
                className="relative flex flex-shrink-0 justify-center items-center cursor-pointer"
            >
                {/* Outer Glowing Energy Aura */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-70 group-hover:opacity-100 blur-md group-hover:blur-lg rounded-full transition-all animate-pulse duration-500" />
                
                {/* Rotating Border Ring */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 border border-purple-300/40 dark:border-purple-400/30 border-dashed rounded-full pointer-events-none"
                />

                <img 
                    src={idea} 
                    alt="IdeaArena Light Bulb" 
                    className="z-10 relative drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] w-8 sm:w-10 md:w-11 lg:w-12 h-auto object-contain filter" 
                />
            </motion.div>

            {/* 2. Brand Name Text */}
            <motion.div 
                variants={containerVariants}
                initial="initial"
                animate={animateWave ? "animate" : "initial"}
                className="flex items-center font-mono text-xl sm:text-2xl md:text-3xl tracking-wide"
            >
                {/* "Idea" Section */}
                <div className={`flex font-extrabold ${
                    isFooter ? 'text-white' : 'text-slate-900'
                }`}>
                    {["I", "d", "e", "a"].map((letter, index) => (
                        <motion.span 
                            key={index} 
                            variants={letterVariants}
                            className="inline-block group-hover:text-purple-500 transition-colors duration-300"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* "Arena" Section */}
                <div className="flex ms-1">
                    {["A", "r", "e", "n", "a"].map((letter, index) => (
                        <motion.span 
                            key={index} 
                            variants={letterVariants}
                            className="inline-block bg-[length:200%_auto] bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-400 to-indigo-500 drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)] font-black text-transparent animate-gradient-x"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </Link>
    );
};

export default Logo;