import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCloudUploadAlt, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        { 
            title: "Choose Contest", 
            desc: "Explore various categories and find the perfect challenge for your skills.",
            icon: <FaSearch />,
            color: "bg-blue-500"
        },
        { 
            title: "Submit Work", 
            desc: "Prepare your innovative solution and upload it before the deadline hits.",
            icon: <FaCloudUploadAlt />,
            color: "bg-purple-600"
        },
        { 
            title: "Win Prize", 
            desc: "Get evaluated by experts, stand out, and claim your rewards & recognition.",
            icon: <FaTrophy />,
            color: "bg-amber-500"
        }
    ];

    return (
        <section className="bg-gray-50 py-24 overflow-hidden">
            <div className="mx-auto px-4 container">
                {/* Header */}
                <div className="mb-16 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-bold text-gray-800 text-4xl md:text-5xl"
                    >
                        Master the <span className="text-purple-600">Arena</span> in 3 Steps
                    </motion.h2>
                    <div className="bg-purple-600 mx-auto mt-4 rounded-full w-24 h-1.5"></div>
                </div>

                {/* Steps Container */}
                <div className="relative gap-12 grid grid-cols-1 md:grid-cols-3">
                    
                    {/* Connecting Line (Only for Desktop) */}
                    <div className="hidden md:block top-20 right-[15%] left-[15%] z-0 absolute border-purple-200 border-t-2 border-dashed h-0.5"></div>

                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="group z-10 relative flex flex-col items-center text-center"
                        >
                            {/* Icon Circle */}
                            <div className={`w-20 h-20 ${step.color} text-white rounded-3xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300 mb-6`}>
                                {step.icon}
                                {/* Step Number Badge */}
                                <div className="-top-2 -right-2 absolute flex justify-center items-center bg-white shadow-md border border-gray-100 rounded-full w-8 h-8 font-black text-gray-800 text-sm">
                                    0{idx + 1}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="bg-white shadow-sm group-hover:shadow-xl p-8 border border-gray-100 rounded-2xl transition-shadow">
                                <h3 className="mb-3 font-bold text-gray-800 text-2xl">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA within section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="font-medium text-gray-400 italic">
                        Join 5,000+ innovators already competing!
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;