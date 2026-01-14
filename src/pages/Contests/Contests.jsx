import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion'; 
import { FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

const Contests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="mx-auto px-4 py-16 container">
                <div className="flex flex-col items-center mb-12">
                    <div className="bg-gray-200 rounded-lg w-64 h-10 animate-pulse"></div>
                    <div className="bg-gray-100 mt-4 rounded-lg w-48 h-4 animate-pulse"></div>
                </div>
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white shadow-sm p-4 border border-gray-100 rounded-2xl h-[400px] animate-pulse">
                            <div className="bg-gray-200 rounded-xl w-full h-48"></div>
                            <div className="space-y-3 mt-4">
                                <div className="bg-gray-200 rounded w-3/4 h-6"></div>
                                <div className="bg-gray-200 rounded w-full h-4"></div>
                                <div className="bg-gray-200 rounded w-5/6 h-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center py-24 text-center">
                <div className="bg-red-50 mb-4 p-4 rounded-full text-red-500 text-4xl">
                    <FaExclamationTriangle />
                </div>
                <h3 className="font-bold text-gray-800 text-xl">Oops! Something went wrong</h3>
                <p className="text-gray-500">Error loading contests. Please refresh the page.</p>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-white to-gray-50/50 py-20">
            <div className="mx-auto px-4 container">
                
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 bg-purple-100 mb-4 px-4 py-1.5 rounded-full font-bold text-purple-600 text-xs uppercase tracking-widest"
                    >
                        <FaTrophy className="text-sm" /> Live Competitions
                    </motion.div>
                    <h2 className="font-black text-gray-900 text-4xl md:text-5xl tracking-tight">
                        All Available <span className="text-purple-600">Contests</span>
                    </h2>
                    <div className="bg-purple-600 mt-4 rounded-full w-20 h-1.5"></div>
                </div>
                
                {/* Contests Grid */}
                {contests.length > 0 ? (
                    <div className="gap-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                        {contests.map((contest, idx) => (
                            <motion.div
                                key={contest._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <ContestCard contest={contest} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-20 text-center">
                        <div className="bg-gray-50 shadow-sm mx-auto p-12 border border-gray-100 border-dashed rounded-[2rem] max-w-md">
                            <h3 className="font-bold text-gray-400 text-xl">No active contests found.</h3>
                            <p className="mt-2 text-gray-400">Stay tuned for upcoming challenges!</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contests;