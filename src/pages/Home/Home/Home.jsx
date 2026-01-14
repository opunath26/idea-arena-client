import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Brands from '../Brands/Brands';
import FAQSection from '../FAQSection/FAQSection';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ContestCard from '../../ContestCard/ContestCard';
import { Link } from 'react-router';
import Stats from '../Stats/Stats';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';
import Newsletter from '../Newsletter/Newsletter';
import { motion } from 'framer-motion';

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['recentContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?limit=6');
            return res.data;
        }
    });

    return (
        <div>
            <Banner />

            <Stats />
            <About />

            {/* Recent Contests Section */}
            <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden">
                {/* Background Decor */}
                <div className="top-0 right-0 absolute bg-purple-100/50 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>
                <div className="bottom-0 left-0 absolute bg-indigo-50/50 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative mx-auto px-4 container">
                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-block bg-purple-100 mb-4 px-4 py-1.5 rounded-full font-bold text-purple-600 text-xs uppercase tracking-widest"
                        >
                            Latest Opportunities
                        </motion.span>
                        <h2 className="mb-4 font-black text-gray-900 text-4xl md:text-5xl tracking-tight">
                            Recent Innovation <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-purple-600 text-transparent">Contests</span>
                        </h2>
                        <p className="mx-auto max-w-xl text-gray-500 text-lg">
                            Discover the most recent challenges. Show your skills, compete with the best, and win big!
                        </p>
                        <div className="bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6 rounded-full w-32 h-1.5"></div>
                    </div>

                    {/* Content Area */}
                    {isLoading ? (
                        /* Skeleton Loader for Recent Contests */
                        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white shadow-sm p-4 border border-gray-100 rounded-3xl h-[450px] animate-pulse">
                                    <div className="bg-gray-200 rounded-2xl w-full h-52"></div>
                                    <div className="space-y-4 mt-6">
                                        <div className="bg-gray-200 rounded w-3/4 h-6"></div>
                                        <div className="bg-gray-200 rounded w-full h-4"></div>
                                        <div className="bg-gray-100 rounded w-1/2 h-4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                            {contests.slice(0, 6).map((contest, idx) => (
                                <motion.div
                                    key={contest._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <ContestCard contest={contest} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* View All Button */}
                    <div className="flex justify-center mt-20">
                        <Link
                            to='/all-contests'
                            className="group inline-flex relative items-center gap-3 bg-gray-900 hover:bg-purple-600 shadow-2xl hover:shadow-purple-200 px-10 py-4 rounded-2xl overflow-hidden font-bold text-white transition-all duration-300"
                        >
                            <span className="z-10 relative">Explore All Contests</span>
                            <svg
                                className="z-10 relative w-5 h-5 transition-transform group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform -translate-x-full group-hover:translate-x-full duration-1000"></div>
                        </Link>
                    </div>
                </div>
            </section>
            <HowItWorks />
            <Reviews />
            <Brands />
            <FAQSection />
            <Newsletter />
        </div>
    );
};

export default Home;