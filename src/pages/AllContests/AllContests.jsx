import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ContestCard from "../ContestCard/ContestCard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaRedo, FaTrophy, FaThLarge } from "react-icons/fa";

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

const AllContests = () => {
    const [searchText, setSearchText] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ['contests', activeTab, submittedSearch],
        queryFn: async () => {
            const contestType = activeTab === 'All' ? '' : activeTab;
            const res = await axios.get(`${API_URL}/contests?search=${submittedSearch}&contestType=${contestType}`);
            const data = res.data?.data || res.data?.contests || res.data;
            return Array.isArray(data) ? data : [];
        }
    });

    const { data: allCategoriesSource = [] } = useQuery({
        queryKey: ['all-contests-categories'],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/contests`);
            const data = res.data?.data || res.data?.contests || res.data;
            return Array.isArray(data) ? data : [];
        },
        staleTime: 1000 * 60 * 10,
    });

    const categories = useMemo(() => {
        const extractedCategories = allCategoriesSource
            .map(item => item?.contestType)
            .filter(Boolean);
        return ['All', ...new Set(extractedCategories)];
    }, [allCategoriesSource]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmittedSearch(searchText);
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchText(val);
        if (val === '') {
            setSubmittedSearch('');
        }
    };

    const handleReset = () => {
        setSearchText('');
        setSubmittedSearch('');
        setActiveTab('All');
    };

    const SkeletonCard = () => (
        <div className="flex flex-col justify-between bg-white dark:bg-slate-900 shadow-sm p-4 border border-slate-200/80 dark:border-slate-800 rounded-2xl h-[420px] animate-pulse">
            <div>
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl w-full h-48"></div>
                <div className="space-y-3 mt-5">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 h-5"></div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-full h-3.5"></div>
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 h-3.5"></div>
                </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-slate-100 dark:border-slate-800/80 border-t">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-md w-16 h-6"></div>
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl w-24 h-9"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
            
            {/* Hero Header Section */}
            <div className="relative bg-slate-900 py-20 sm:py-24 border-slate-800 border-b overflow-hidden text-white">
                <div className="top-0 left-1/4 absolute bg-purple-600/20 blur-3xl rounded-full w-96 h-96 pointer-events-none"></div>
                <div className="right-1/4 bottom-0 absolute bg-indigo-600/20 blur-3xl rounded-full w-96 h-96 pointer-events-none"></div>

                <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-md mb-4 px-3.5 py-1.5 border border-purple-500/20 rounded-full font-semibold text-purple-300 text-xs">
                            <FaTrophy className="text-amber-400" /> Premium Design Challenges
                        </div>
                        <h1 className="font-black text-white text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            Explore Active <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent">Contests</span>
                        </h1>
                        <p className="mt-4 text-slate-300 text-base sm:text-lg">
                            Discover top competitions, showcase your creativity, and earn rewards from worldwide clients.
                        </p>
                    </motion.div>

                    {/* Integrated Search Bar */}
                    <div className="mx-auto mt-8 sm:mt-10 max-w-2xl">
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <div className="left-4 absolute text-slate-400">
                                <FaSearch className="text-base" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by contest title or tags..." 
                                className="bg-slate-800/80 shadow-2xl backdrop-blur-md py-4 pr-32 pl-11 border border-slate-700/80 focus:border-purple-500 rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/20 w-full text-white text-sm sm:text-base transition-all placeholder-slate-400"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <button 
                                type="submit" 
                                className="right-2 absolute bg-gradient-to-r from-purple-600 hover:from-purple-500 to-indigo-600 hover:to-indigo-500 shadow-lg px-6 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all cursor-pointer"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-7xl">
                
                {/* Dynamic Category Filter Tabs */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="flex items-center gap-2 font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                            <FaThLarge className="text-purple-600" /> Browse Categories
                        </h2>
                        {activeTab !== 'All' || submittedSearch ? (
                            <button 
                                onClick={handleReset}
                                className="flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400 text-xs hover:underline cursor-pointer"
                            >
                                <FaRedo className="text-[10px]" /> Reset Filters
                            </button>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-none">
                        {categories.map(cat => {
                            const isSelected = activeTab === cat;
                            return (
                                <button 
                                    key={cat} 
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                        isSelected 
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                        ) : isError ? (
                            <div className="col-span-full py-16 text-center">
                                <p className="font-semibold text-red-500">Failed to load contests. Please try again later.</p>
                            </div>
                        ) : contests.length > 0 ? (
                            contests.map((contest, idx) => (
                                <motion.div
                                    key={contest._id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                                >
                                    <ContestCard contest={contest} />
                                </motion.div>
                            ))
                        ) : (
                            /* Empty State */
                            <div className="col-span-full py-16 text-center">
                                <div className="bg-white dark:bg-slate-900 shadow-sm mx-auto p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 rounded-3xl max-w-md">
                                    <div className="flex justify-center items-center bg-purple-50 dark:bg-purple-900/30 mx-auto mb-4 rounded-2xl w-16 h-16 text-purple-600 dark:text-purple-400">
                                        <FaFilter className="text-2xl" />
                                    </div>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl">No Contests Found</h3>
                                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                                        We couldn't find any contest matching <span className="font-semibold text-purple-600">"{submittedSearch || activeTab}"</span>.
                                    </p>
                                    <button 
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-md mt-6 px-6 py-2.5 rounded-xl font-semibold text-white text-sm active:scale-95 transition-all cursor-pointer"
                                    >
                                        <FaRedo className="text-xs" /> Clear Search & Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AllContests;