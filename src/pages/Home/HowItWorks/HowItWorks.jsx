import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCloudUploadAlt, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        { 
            title: "Choose Contest", 
            desc: "Explore various categories and find the perfect challenge for your skills.",
            icon: <FaSearch />,
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20"
        },
        { 
            title: "Submit Work", 
            desc: "Prepare your innovative solution and upload it before the deadline hits.",
            icon: <FaCloudUploadAlt />,
            color: "from-purple-600 to-indigo-600",
            shadow: "shadow-purple-500/20"
        },
        { 
            title: "Win Prize", 
            desc: "Get evaluated by experts, stand out, and claim your rewards & recognition.",
            icon: <FaTrophy />,
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/20"
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 overflow-hidden">
            <div className="mx-auto px-4 max-w-6xl container">
                
                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="font-extrabold text-gray-900 text-4xl md:text-5xl tracking-tight"
                    >
                        Master the <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">Arena</span> in 3 Steps
                    </motion.h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "96px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full h-1.5"
                    />
                </div>

                {/* Steps Container */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative gap-10 md:gap-8 grid grid-cols-1 md:grid-cols-3"
                >
                    {/* Connecting Dashed Line (Desktop Only) */}
                    <div className="hidden md:block top-10 right-[15%] left-[15%] -z-0 absolute border-gray-300 border-t-2 border-dashed h-0.5" />

                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            className="group z-10 relative flex flex-col items-center text-center"
                        >
                            {/* Icon Circle */}
                            <div className={`w-20 h-20 bg-gradient-to-tr ${step.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl ${step.shadow} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-6 relative`}>
                                {step.icon}
                                
                                {/* Step Number Badge */}
                                <div className="-top-2 -right-2 absolute flex justify-center items-center bg-white shadow-lg border border-gray-100 rounded-full w-8 h-8 font-extrabold text-gray-800 text-xs">
                                    0{idx + 1}
                                </div>
                            </div>

                            {/* Card Box */}
                            <div className="bg-white/80 hover:bg-white shadow-sm hover:shadow-gray-200/50 hover:shadow-xl backdrop-blur-sm p-8 border border-gray-100/80 rounded-2xl w-full h-full transition-all hover:-translate-y-2 duration-300 transform">
                                <h3 className="mb-3 font-bold text-gray-800 group-hover:text-purple-600 text-2xl transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Callout / Social Proof */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 border border-purple-100 rounded-full font-medium text-purple-700 text-sm">
                        ⚡ Join 5,000+ innovators already competing!
                    </span>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;