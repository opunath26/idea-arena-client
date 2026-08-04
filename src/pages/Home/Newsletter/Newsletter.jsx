import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRegBell, FaEnvelope, FaCheckCircle, FaLock, FaSpinner } from 'react-icons/fa';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubscribed(true);
            setEmail('');
        }, 1200);
    };

    return (
        <section className="relative bg-gradient-to-b from-white via-purple-50/40 to-slate-50 py-16 sm:py-20 lg:py-28 overflow-hidden text-slate-800">
            {/* Ambient Background Glows */}
            <div className="top-1/2 left-1/2 absolute bg-purple-200/30 blur-[100px] sm:blur-[130px] rounded-full w-[300px] sm:w-[700px] h-[200px] sm:h-[350px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="right-10 bottom-0 absolute bg-indigo-100/40 blur-[80px] sm:blur-[100px] rounded-full w-60 sm:w-80 h-60 sm:h-80 pointer-events-none" />

            <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white shadow-2xl shadow-purple-500/10 p-6 sm:p-10 lg:p-16 border border-purple-100 rounded-3xl sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden"
                >
                    {/* Decorative Top Accent Line */}
                    <div className="top-0 absolute inset-x-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 h-2" />

                    <div className="flex lg:flex-row flex-col justify-between items-center gap-8 lg:gap-16">

                        {/* Text Content Area */}
                        <div className="w-full lg:w-1/2 lg:text-left text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-purple-100/80 mb-4 sm:mb-5 px-3.5 py-1.5 border border-purple-200 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                            >
                                <FaRegBell className="text-purple-600 animate-bounce" /> Stay Ahead Of The Curve
                            </motion.div>

                            <h2 className="font-black text-slate-900 text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                                Unlock Your <span className="bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-transparent">Innovation</span> Potential
                            </h2>

                            <p className="mx-auto lg:mx-0 mt-3 sm:mt-4 max-w-xl text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Get exclusive contest updates, curated winning strategies, and expert interview guides delivered straight to your inbox.
                            </p>

                            {/* Trust Metrics */}
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 mt-6 font-medium text-slate-500 text-xs sm:text-sm">
                                <span className="flex items-center gap-1.5">
                                    <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                                    10,000+ Innovators Joined
                                </span>
                                <span className="hidden sm:inline text-slate-300">•</span>
                                <span className="flex items-center gap-1.5">
                                    <FaLock className="text-slate-400 text-xs" />
                                    No Spam, Unsubscribe Anytime
                                </span>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="w-full lg:w-1/2 max-w-lg">
                            <AnimatePresence mode="wait">
                                {isSubscribed ? (
                                    <motion.div
                                        key="subscribed"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-3 bg-emerald-50/80 p-6 sm:p-8 border border-emerald-200/80 rounded-2xl sm:rounded-3xl text-center"
                                    >
                                        <FaCheckCircle className="mx-auto text-emerald-500 text-3xl sm:text-4xl" />
                                        <h3 className="font-bold text-slate-900 text-lg sm:text-xl">You're Subscribed!</h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            Thank you for joining. Check your inbox soon for fresh contest opportunities and tips.
                                        </p>
                                        <button
                                            onClick={() => setIsSubscribed(false)}
                                            className="pt-2 font-semibold text-purple-600 text-xs hover:underline cursor-pointer"
                                        >
                                            Subscribe another email
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form 
                                        key="form"
                                        onSubmit={handleSubmit} 
                                        className="space-y-3.5 sm:space-y-4"
                                    >
                                        <div className="relative flex sm:flex-row flex-col items-center gap-2 sm:gap-3 bg-slate-50/80 p-2 sm:p-2.5 border border-slate-200 focus-within:border-purple-500 rounded-2xl sm:rounded-full focus-within:ring-4 focus-within:ring-purple-500/10 transition-all duration-300">

                                            <div className="relative flex items-center py-2 sm:py-0 pr-2 pl-3 sm:pl-4 w-full">
                                                <FaEnvelope className="mr-2.5 sm:mr-3 text-slate-400 text-base sm:text-lg shrink-0" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email address..."
                                                    className="bg-transparent border-none outline-none focus:ring-0 w-full text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group inline-flex justify-center items-center gap-2 bg-slate-900 hover:bg-purple-600 disabled:opacity-70 shadow-lg shadow-slate-900/10 hover:shadow-purple-500/25 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full w-full sm:w-auto font-bold text-white text-xs sm:text-sm whitespace-nowrap active:scale-95 transition-all duration-300 cursor-pointer"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <FaSpinner className="text-xs animate-spin" />
                                                        <span>Subscribing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Subscribe</span>
                                                        <FaPaperPlane className="text-xs transition-transform group-hover:translate-x-1 duration-300" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <p className="px-2 text-[11px] text-slate-400 sm:text-xs lg:text-left text-center">
                                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;