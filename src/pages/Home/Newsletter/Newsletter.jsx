import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRegBell } from 'react-icons/fa';

const Newsletter = () => {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <div className="top-0 right-0 absolute bg-purple-50 opacity-60 blur-3xl rounded-full w-[500px] h-[500px] -translate-y-1/2 translate-x-1/4"></div>
            <div className="bottom-0 left-0 absolute bg-blue-50 opacity-60 blur-3xl rounded-full w-[500px] h-[500px] -translate-x-1/4 translate-y-1/2"></div>

            <div className="z-10 relative mx-auto px-4 container">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-purple-600 to-indigo-700 shadow-2xl shadow-purple-200 mx-auto p-1 md:p-1.5 rounded-[3rem] max-w-6xl"
                >
                    <div className="flex lg:flex-row flex-col justify-between items-center gap-12 bg-white p-8 md:p-16 rounded-[2.8rem]">
                        
                        <div className="lg:w-1/2 lg:text-left text-center">
                            <div className="inline-flex items-center gap-2 bg-purple-100 mb-6 px-4 py-2 rounded-full font-bold text-purple-700 text-sm uppercase tracking-wider">
                                <FaRegBell className="animate-swing" /> Stay Notified
                            </div>
                            <h2 className="mb-6 font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight">
                                Unlock Your <span className="text-purple-600">Innovation</span> Potential
                            </h2>
                            <p className="text-gray-500 text-lg">
                                Subscribe to get the latest contest updates, winner stories, and special tips delivered straight to your inbox.
                            </p>
                        </div>

                        <div className="w-full lg:w-1/2 max-w-lg">
                            <form 
                                onSubmit={(e) => e.preventDefault()} 
                                className="relative flex sm:flex-row flex-col items-center gap-3"
                            >
                                <div className="relative w-full">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your professional email" 
                                        className="bg-gray-50 focus:bg-white shadow-inner px-6 py-5 border-2 border-gray-100 focus:border-purple-400 rounded-2xl outline-none w-full text-gray-800 text-lg transition-all" 
                                    />
                                </div>
                                <button className="flex justify-center items-center gap-3 bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200 hover:shadow-xl px-10 py-5 rounded-2xl w-full sm:w-auto font-black text-white whitespace-nowrap active:scale-95 transition-all">
                                    Subscribe <FaPaperPlane />
                                </button>
                            </form>
                            <p className="flex justify-center lg:justify-start items-center gap-2 mt-5 text-gray-400 text-sm lg:text-left text-center">
                                <span className="bg-green-500 rounded-full w-1.5 h-1.5"></span> 
                                Join 10k+ innovators. No spam, ever.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;