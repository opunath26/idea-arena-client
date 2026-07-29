import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import ContestCard from '../../ContestCard/ContestCard';
import { FaFire, FaTrophy, FaArrowRight, FaClock } from 'react-icons/fa';

const ContestCardSkeleton = () => {
    return (
        <div className="flex flex-col justify-between bg-white shadow-sm p-4 border border-slate-200/80 rounded-3xl h-[420px] animate-pulse">
            <div>
                {/* Image Placeholder */}
                <div className="bg-slate-200/80 rounded-2xl w-full h-44"></div>
                
                {/* Content Placeholders */}
                <div className="space-y-3 mt-5">
                    {/* Badge / Tag Skeleton */}
                    <div className="bg-slate-200/80 rounded-full w-24 h-5"></div>
                    
                    {/* Title Skeleton */}
                    <div className="bg-slate-200/80 rounded-lg w-4/5 h-6"></div>
                    
                    {/* Description Skeletons */}
                    <div className="space-y-2 pt-1">
                        <div className="bg-slate-200/60 rounded-md w-full h-3.5"></div>
                        <div className="bg-slate-200/60 rounded-md w-2/3 h-3.5"></div>
                    </div>
                </div>
            </div>

            {/* Card Footer Skeleton */}
            <div className="flex justify-between items-center pt-4 border-slate-100 border-t">
                <div className="space-y-1.5">
                    <div className="bg-slate-200/60 rounded-sm w-12 h-3"></div>
                    <div className="bg-slate-200/80 rounded-md w-20 h-5"></div>
                </div>
                <div className="bg-slate-200/80 rounded-xl w-24 h-9"></div>
            </div>
        </div>
    );
};

const RecentContests = () => {
    const axiosPublic = useAxios();
    const [selectedFilter, setSelectedFilter] = useState('all');

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ['recentContests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests?limit=8');
            const data = res.data?.data || res.data?.contests || res.data;
            return Array.isArray(data) ? data : [];
        }
    });

    const filteredContests = contests.filter(contest => {
        if (!contest) return false;
        if (selectedFilter === 'trending') return (contest.participantsCount > 5) || contest.isPopular;
        if (selectedFilter === 'highPrize') return (contest.prizeMoney > 500);
        return true;
    });

    return (
        <section className="relative bg-gradient-to-b from-slate-50 via-purple-50/30 to-white py-20 lg:py-28 overflow-hidden text-slate-800">
            {/* Ambient Background Glows */}
            <div className="top-10 left-1/2 absolute bg-purple-200/40 blur-[120px] rounded-full w-[600px] h-[300px] -translate-x-1/2 pointer-events-none"></div>
            <div className="bottom-10 left-10 absolute bg-indigo-100/50 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>

            <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Header Section */}
                <div className="flex md:flex-row flex-col justify-between md:items-end gap-6 mb-12 lg:mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-purple-100 mb-4 px-3.5 py-1.5 border border-purple-200 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                        >
                            <FaTrophy className="text-amber-500" /> Active Competitions
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
                        >
                            Recent Innovation <span className="bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-transparent">Contests</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-3 text-slate-600 text-base sm:text-lg"
                        >
                            Explore top challenges, pitch your ideas, and win reward prize pools.
                        </motion.p>
                    </div>

                    {/* Quick Filter Tabs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="flex items-center self-start md:self-auto gap-2 bg-white shadow-sm p-1.5 border border-slate-200/80 rounded-2xl"
                    >
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                selectedFilter === 'all' 
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            All Recent
                        </button>
                        <button
                            onClick={() => setSelectedFilter('trending')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                                selectedFilter === 'trending' 
                                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <FaFire className={selectedFilter === 'trending' ? 'text-amber-300' : 'text-amber-500'} /> Trending
                        </button>
                    </motion.div>
                </div>

                {/* Content Cards Grid */}
                {isLoading ? (
                    <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <ContestCardSkeleton key={i} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="bg-white shadow-sm mx-auto py-12 border border-slate-200 rounded-3xl max-w-lg text-center">
                        <p className="font-semibold text-red-500 text-sm">Failed to load recent contests.</p>
                    </div>
                ) : filteredContests.length > 0 ? (
                    <motion.div 
                        layout 
                        className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                    >
                        <AnimatePresence>
                            {filteredContests.slice(0, 8).map((contest, idx) => (
                                <motion.div
                                    key={contest._id || idx}
                                    layout
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                                    whileHover={{ y: -6 }}
                                    className="h-full"
                                >
                                    <ContestCard contest={contest} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Empty State Fallback */
                    <div className="bg-white shadow-sm mx-auto py-16 border border-slate-200 rounded-3xl max-w-lg text-center">
                        <FaClock className="opacity-60 mx-auto mb-3 text-purple-500 text-4xl" />
                        <h3 className="font-bold text-slate-800 text-lg">No Contests Available</h3>
                        <p className="mt-1 text-slate-500 text-sm">Check back soon for new exciting challenges!</p>
                    </div>
                )}

                {/* View All Button Action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-14 lg:mt-20"
                >
                    <Link
                        to="/all-contests"
                        className="group inline-flex relative items-center gap-3 bg-slate-900 hover:bg-purple-600 shadow-purple-500/10 shadow-xl hover:shadow-purple-500/20 px-8 py-4 rounded-2xl font-bold text-white text-sm sm:text-base active:scale-95 transition-all duration-300"
                    >
                        <span>Explore All Contests</span>
                        <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1.5 duration-300" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default RecentContests;