import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import { FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

const getApiUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        let url = import.meta.env.VITE_API_URL;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
        return url;
    }
    return 'https://idea-arena-server-2nzwvmbbl-artistop26-2257s-projects.vercel.app';
};

const API_URL = getApiUrl();

const Contests = () => {
    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/contests`);
            // Ensure response is always an Array
            return Array.isArray(res.data) ? res.data : (res.data?.contests || res.data?.data || []);
        }
    });

    /* Loading State Skeleton */
    if (isLoading) {
        return (
            <div className="bg-slate-50 min-h-screen">
                <div className="mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-7xl">
                    <div className="flex flex-col items-center mb-10 sm:mb-14">
                        <div className="bg-slate-200/80 rounded-lg w-48 sm:w-64 h-8 sm:h-10 animate-pulse"></div>
                        <div className="bg-slate-200/50 mt-3 sm:mt-4 rounded-lg w-36 sm:w-48 h-3 sm:h-4 animate-pulse"></div>
                    </div>
                    <div className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white shadow-sm p-4 border border-slate-200/80 rounded-2xl h-[380px] sm:h-[400px] animate-pulse">
                                <div className="bg-slate-200/80 rounded-xl w-full h-40 sm:h-48"></div>
                                <div className="space-y-3 mt-4">
                                    <div className="bg-slate-200/80 rounded w-3/4 h-5 sm:h-6"></div>
                                    <div className="bg-slate-200/60 rounded w-full h-3 sm:h-4"></div>
                                    <div className="bg-slate-200/60 rounded w-5/6 h-3 sm:h-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* Error State UI */
    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center bg-slate-50 px-4 py-20 sm:py-28 min-h-[60vh] text-center">
                <div className="bg-rose-50 mb-4 p-4 sm:p-5 rounded-full text-rose-500 text-3xl sm:text-4xl">
                    <FaExclamationTriangle />
                </div>
                <h3 className="font-bold text-slate-800 text-lg sm:text-xl">Oops! Something went wrong</h3>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm">Error loading contests. Please refresh the page.</p>
            </div>
        );
    }

    return (
        /* Forced Light Background */
        <section className="bg-slate-50 bg-gradient-to-b from-white via-slate-50/50 to-purple-50/20 px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 min-h-screen text-slate-800">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Header */}
                <div className="flex flex-col items-center mb-10 sm:mb-16 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 bg-purple-100 mb-3 sm:mb-4 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-[10px] text-purple-700 sm:text-xs uppercase tracking-widest"
                    >
                        <FaTrophy className="text-xs sm:text-sm" /> Live Competitions
                    </motion.div>
                    <h2 className="font-black text-slate-900 text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        All Available <span className="text-purple-600">Contests</span>
                    </h2>
                    <div className="bg-purple-600 mt-3 sm:mt-4 rounded-full w-16 sm:w-20 h-1 sm:h-1.5"></div>
                </div>
                
                {/* Contests Grid */}
                {Array.isArray(contests) && contests.length > 0 ? (
                    <div className="gap-5 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {contests.map((contest, idx) => (
                            <motion.div
                                key={contest._id || idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <ContestCard contest={contest} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-12 sm:py-20 text-center">
                        <div className="bg-white shadow-sm mx-auto p-8 sm:p-12 border border-slate-200/80 border-dashed rounded-3xl sm:rounded-[2rem] max-w-md">
                            <h3 className="font-bold text-slate-700 text-lg sm:text-xl">No active contests found.</h3>
                            <p className="mt-2 text-slate-400 text-xs sm:text-sm">Stay tuned for upcoming challenges!</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contests;