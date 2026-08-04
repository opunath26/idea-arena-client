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
            shadow: "shadow-blue-500/20",
            badge: "Step 01"
        },
        { 
            title: "Submit Pure Quality", 
            desc: "Craft your best solution, upload your work seamlessly, and showcase your talent to industry leaders.",
            icon: <FaCloudUploadAlt />,
            color: "from-purple-600 to-indigo-600",
            shadow: "shadow-purple-500/20",
            badge: "Step 02"
        },
        { 
            title: "Win Cash & Recognition", 
            desc: "Get judged by expert mentors, climb the leaderboard, and claim cash rewards & certificates.",
            icon: <FaTrophy />,
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/20",
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
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-purple-50/30 py-12 sm:py-16 lg:py-24 overflow-hidden text-slate-800">
            {/* Background Decorative Blur Orbs */}
            <div className="top-10 left-1/2 -z-10 absolute bg-purple-200/40 blur-3xl rounded-full w-[300px] sm:w-[500px] h-[180px] sm:h-[300px] -translate-x-1/2 pointer-events-none" />
            <div className="right-5 bottom-10 -z-10 absolute bg-indigo-100/50 blur-3xl rounded-full w-60 sm:w-80 h-60 sm:h-80 pointer-events-none" />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 bg-purple-100 mb-3 sm:mb-4 px-3.5 py-1.5 border border-purple-200/80 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                    >
                        <FaRocket className="text-purple-600" />
                        Simple & Rewarding
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-black text-slate-900 text-2xl sm:text-4xl lg:text-5xl tracking-tight"
                    >
                        Turn Your Skills Into <span className="bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-transparent">Rewards</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mt-2.5 sm:mt-4 max-w-2xl text-slate-600 text-sm sm:text-base lg:text-lg"
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
                    className="relative gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3"
                >
                    {/* Connecting Dashed Line (Desktop Only) */}
                    <div className="hidden lg:block top-10 right-[15%] left-[15%] -z-0 absolute border-purple-200 border-t-2 border-dashed h-0.5 pointer-events-none" />

                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            className="group z-10 relative flex flex-col items-center"
                        >
                            {/* Icon Box with Gradient & Floating Badge */}
                            <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-tr ${step.color} text-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${step.shadow} transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 mb-6 sm:mb-8 relative`}>
                                {step.icon}
                                
                                {/* Step Badge */}
                                <div className="-top-2.5 -right-2.5 absolute bg-white shadow-md px-2.5 py-0.5 border border-slate-200/80 rounded-full font-bold text-[10px] text-slate-800 sm:text-[11px] tracking-wider">
                                    {step.badge}
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="bg-white/90 hover:bg-white shadow-sm hover:shadow-purple-500/10 backdrop-blur-md p-6 sm:p-8 border border-slate-200/80 hover:border-purple-300 rounded-2xl w-full h-full text-center transition-all group-hover:-translate-y-1.5 duration-300 transform">
                                <h3 className="mb-2.5 font-bold text-slate-900 group-hover:text-purple-600 text-lg sm:text-xl transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Proof Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col items-center gap-4 mt-12 sm:mt-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 bg-purple-100/70 px-4 py-2 border border-purple-200/80 rounded-full font-medium text-purple-900 text-xs sm:text-sm">
                        ⚡ Over 5,000+ creators are winning prizes right now!
                    </span>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;