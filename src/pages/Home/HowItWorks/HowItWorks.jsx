import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCloudUploadAlt, FaTrophy, FaArrowRight, FaRocket } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        { 
            title: "Discover Your Challenge", 
            desc: "Browse through active contests across design, dev, and creativity. Pick the one that aligns with your passion.",
            icon: <FaSearch />,
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/25",
            badge: "Step 01"
        },
        { 
            title: "Submit Pure Quality", 
            desc: "Craft your best solution, upload your work seamlessly, and showcase your talent to industry leaders.",
            icon: <FaCloudUploadAlt />,
            color: "from-purple-600 to-indigo-600",
            shadow: "shadow-purple-500/25",
            badge: "Step 02"
        },
        { 
            title: "Win Cash & Recognition", 
            desc: "Get judged by expert doctors/mentors, climb the leaderboard, and claim cash rewards & certificates.",
            icon: <FaTrophy />,
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/25",
            badge: "Step 03"
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-gray-50 via-white to-purple-50/30 py-24 overflow-hidden">
            {/* Background Decorative Blur Orbs */}
            <div className="top-10 left-1/2 -z-10 absolute bg-purple-200/40 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 pointer-events-none" />
            <div className="right-10 bottom-10 -z-10 absolute bg-blue-100/40 blur-3xl rounded-full w-80 h-80 pointer-events-none" />

            <div className="mx-auto px-4 max-w-6xl container">
                
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 bg-purple-100/80 mb-4 px-4 py-1.5 border border-purple-200/60 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                    >
                        <FaRocket className="text-purple-600" />
                        Simple & Rewarding
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-extrabold text-gray-900 text-4xl md:text-5xl tracking-tight"
                    >
                        Turn Your Skills Into <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">Rewards</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-2xl text-gray-600 text-base md:text-lg"
                    >
                        Participating is fast, transparent, and exciting. Follow three simple steps to start competing today.
                    </motion.p>
                </div>

                {/* Steps Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative gap-8 grid grid-cols-1 md:grid-cols-3"
                >
                    {/* Connecting Dashed Line (Desktop Only) */}
                    <div className="hidden md:block top-12 right-[16%] left-[16%] -z-0 absolute border-purple-200 border-t-2 border-dashed h-0.5" />

                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            className="group z-10 relative flex flex-col items-center"
                        >
                            {/* Icon Box with Gradient & Floating Badge */}
                            <div className={`w-20 h-20 bg-gradient-to-tr ${step.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ${step.shadow} transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 mb-8 relative`}>
                                {step.icon}
                                
                                {/* Step Badge */}
                                <div className="-top-3 -right-3 absolute bg-white shadow-md px-2.5 py-0.5 border border-gray-100 rounded-full font-bold text-[11px] text-gray-800 tracking-wider">
                                    {step.badge}
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="bg-white/90 hover:bg-white shadow-sm hover:shadow-purple-500/5 hover:shadow-xl backdrop-blur-md p-8 border border-gray-100 hover:border-purple-200 rounded-2xl w-full h-full text-center transition-all group-hover:-translate-y-2 duration-300 transform">
                                <h3 className="mb-3 font-bold text-gray-900 group-hover:text-purple-600 text-xl transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Proof + CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col items-center gap-5 mt-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 border border-purple-100 rounded-full font-medium text-purple-800 text-sm">
                        ⚡ Over 5,000+ creators are winning prizes right now!
                    </span>

                    
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;