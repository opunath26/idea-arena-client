import React from 'react';
import { Link, useRouteError } from 'react-router';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const Error = () => {
    const error = useRouteError();

    return (
        <div className="flex justify-center items-center bg-slate-50 px-4 min-h-screen">
            <div className="mx-auto max-w-lg text-center">
                
                {/* Animated Graphic Container */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex justify-center items-center mx-auto mb-6"
                >
                    {/* Glowing Accent Background */}
                    <div className="top-1/2 left-1/2 -z-10 absolute bg-purple-500/20 blur-3xl rounded-full w-48 h-48 -translate-x-1/2 -translate-y-1/2"></div>
                    
                    <span className="opacity-20 font-black text-purple-600 text-8xl sm:text-9xl tracking-widest select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="flex justify-center items-center bg-purple-100 shadow-purple-500/10 shadow-xl p-5 rounded-3xl text-purple-600">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl" />
                        </div>
                    </div>
                </motion.div>

                {/* Error Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <h1 className="font-black text-slate-900 text-3xl sm:text-4xl tracking-tight">
                        Oops! Page Not Found
                    </h1>
                    <p className="mx-auto max-w-md font-medium text-slate-500 text-sm sm:text-base leading-relaxed">
                        {error?.statusText || error?.message || "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable."}
                    </p>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex sm:flex-row flex-col justify-center items-center gap-3 sm:gap-4 mt-8"
                >
                    <button 
                        onClick={() => window.history.back()}
                        className="flex justify-center items-center gap-2 bg-white hover:bg-slate-100 shadow-sm px-6 py-3 border border-slate-200 rounded-xl w-full sm:w-auto font-bold text-slate-700 text-sm active:scale-95 transition-all cursor-pointer"
                    >
                        <FaArrowLeft /> Go Back
                    </button>

                    <Link 
                        to="/" 
                        className="flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25 px-6 py-3 rounded-xl w-full sm:w-auto font-bold text-white text-sm active:scale-95 transition-all cursor-pointer"
                    >
                        <FaHome /> Back to Home
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default Error;