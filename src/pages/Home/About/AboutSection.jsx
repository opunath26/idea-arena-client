import React from 'react';
import { BsRocketTakeoff } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router';

const AboutSection = () => {
    return (
        <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 overflow-hidden text-slate-800">
            <div className="mx-auto max-w-7xl">
                <div className="items-center gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Left: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-100 mb-3 sm:mb-4 px-3.5 py-1.5 border border-purple-200/80 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider">
                            <BsRocketTakeoff className="text-sm animate-bounce" /> About IdeaArena
                        </div>

                        <h2 className="font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
                            Where Creative Ideas Take Flight & Get <span className="bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-transparent">Rewarded</span>
                        </h2>

                        <p className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                            IdeaArena is a vibrant contest platform bridging the gap between creative minds and exciting opportunities. Whether you're here to participate, host challenges, or discover talent—we've got you covered.
                        </p>

                        {/* Quick Highlights */}
                        <div className="space-y-2.5 sm:space-y-3 mt-5 sm:mt-6">
                            <div className="flex items-start sm:items-center gap-3 font-medium text-slate-700 text-xs sm:text-sm lg:text-base">
                                <FaCheckCircle className="flex-shrink-0 mt-0.5 sm:mt-0 text-purple-600 text-base sm:text-lg" />
                                <span>Participate in exciting contests & win prizes</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-3 font-medium text-slate-700 text-xs sm:text-sm lg:text-base">
                                <FaCheckCircle className="flex-shrink-0 mt-0.5 sm:mt-0 text-purple-600 text-base sm:text-lg" />
                                <span>Host contests and find top creative talent easily</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-3 font-medium text-slate-700 text-xs sm:text-sm lg:text-base">
                                <FaCheckCircle className="flex-shrink-0 mt-0.5 sm:mt-0 text-purple-600 text-base sm:text-lg" />
                                <span>Transparent judging with a secure system</span>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="mt-6 sm:mt-8">
                            <Link 
                                to='/all-contests'
                                className="inline-block bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 px-6 sm:px-7 py-3 rounded-xl font-bold text-white text-sm sm:text-base active:scale-95 transition-all hover:-translate-y-0.5 transform"
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
                        className="relative mt-6 lg:mt-0"
                    >
                        <div className="absolute -inset-2 bg-purple-200/50 blur-2xl rounded-3xl pointer-events-none" />
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                            alt="IdeaArena Collaboration" 
                            className="z-10 relative shadow-xl border border-slate-200/60 rounded-2xl w-full h-64 sm:h-80 lg:h-[400px] object-cover"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;