import React from 'react';
import { BsRocketTakeoff } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router';

const AboutSection = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-16 overflow-hidden transition-colors duration-300">
            <div className="mx-auto max-w-7xl">
                <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Left: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 mb-4 px-3 py-1 rounded-full font-semibold text-purple-600 dark:text-purple-300 text-xs uppercase tracking-wider">
                            <BsRocketTakeoff className="animate-bounce" /> About IdeaArena
                        </div>

                        <h2 className="font-extrabold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-tight tracking-tight">
                            Where Creative Ideas Take Flight & Get <span className="text-purple-600 dark:text-purple-400">Rewarded</span>
                        </h2>

                        <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                            IdeaArena is a vibrant contest platform bridging the gap between creative minds and exciting opportunities. Whether you're here to participate, host challenges, or discover talent—we've got you covered.
                        </p>

                        {/* Quick Highlights */}
                        <div className="space-y-3 mt-6">
                            <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                                <FaCheckCircle className="flex-shrink-0 text-purple-600 dark:text-purple-400 text-lg" />
                                <span>Participate in exciting contests & win prizes</span>
                            </div>
                            <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                                <FaCheckCircle className="flex-shrink-0 text-purple-600 dark:text-purple-400 text-lg" />
                                <span>Host contests and find top creative talent easily</span>
                            </div>
                            <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                                <FaCheckCircle className="flex-shrink-0 text-purple-600 dark:text-purple-400 text-lg" />
                                <span>Transparent judging with a secure system</span>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="mt-8">
                            <Link 
                                to='/all-contests'
                                className="inline-block bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg px-7 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 transform"
                            >
                                Explore Contests
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Clean Image Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="absolute -inset-2 bg-purple-500/20 blur-2xl rounded-3xl pointer-events-none" />
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                            alt="IdeaArena Collaboration" 
                            className="z-10 relative shadow-xl rounded-2xl w-full h-80 sm:h-96 object-cover"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;