import { useEffect, useState } from "react";
import ContestCard from "../ContestCard/ContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

const AllContests = () => {
    const [contests, setContests] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const categories = ['All', 'Business', 'Medical', 'Article Writing', 'Gaming', 'Marketing'];

    const fetchContests = (search = '', category = 'All') => {
        setIsLoading(true);
        const contestType = category === 'All' ? '' : category;
        
        axiosSecure.get(`/contests?search=${search}&contestType=${contestType}`)
            .then(res => {
                setContests(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching contests:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchContests(searchText, activeTab);
    }, [activeTab]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchContests(searchText, activeTab);
    };

    const SkeletonCard = () => (
        <div className="bg-white shadow-sm p-4 border border-gray-100 rounded-2xl h-[450px] animate-pulse">
            <div className="bg-gray-200 rounded-xl w-full h-52"></div>
            <div className="space-y-3 mt-5">
                <div className="bg-gray-200 rounded w-3/4 h-6"></div>
                <div className="bg-gray-200 rounded w-full h-4"></div>
                <div className="bg-gray-200 rounded w-5/6 h-4"></div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-gray-50 border-t">
                <div className="bg-gray-200 rounded w-16 h-8"></div>
                <div className="bg-gray-200 rounded w-24 h-10"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50/30 min-h-screen">
            {/* Hero Header Section */}
            <div className="bg-white border-gray-100 border-b">
                <div className="mx-auto px-4 py-16 container">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-black text-gray-900 text-4xl md:text-5xl lg:text-6xl tracking-tight">
                            Explore All <span className="text-purple-600">Contests</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-gray-500 text-lg">
                            Find the perfect challenge to showcase your skills and win amazing prizes.
                        </p>
                    </motion.div>

                    {/* Modern Search Bar */}
                    <div className="flex justify-center mt-10">
                        <form onSubmit={handleSearch} className="group relative flex-grow w-full max-w-2xl">
                            <div className="left-0 absolute inset-y-0 flex items-center pl-5 pointer-events-none">
                                <FaSearch className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by contest title or type..." 
                                className="bg-gray-50 focus:bg-white shadow-sm py-4 pr-32 pl-12 border-2 border-gray-100 focus:border-purple-400 rounded-2xl outline-none w-full text-gray-700 transition-all"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit" className="top-2 right-2 absolute bg-gray-900 hover:bg-purple-600 shadow-lg px-8 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all transform">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 py-12 container">
                {/* Filter Tabs Section */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex flex-wrap justify-center gap-2 bg-white shadow-sm p-1.5 border border-gray-100 rounded-2xl">
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setActiveTab(cat)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                    activeTab === cat 
                                    ? 'bg-purple-600 text-white shadow-md' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                        ) : contests.length > 0 ? (
                            contests.map((contest, idx) => (
                                <motion.div
                                    key={contest._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <ContestCard contest={contest} />
                                </motion.div>
                            ))
                        ) : (
                            /* Empty State Design */
                            <div className="col-span-full py-24 text-center">
                                <div className="bg-white shadow-sm mx-auto p-12 border border-gray-100 rounded-3xl max-w-md">
                                    <div className="inline-flex justify-center items-center bg-gray-50 mb-6 rounded-full w-20 h-20">
                                        <FaFilter className="text-gray-300 text-2xl" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-2xl italic">No contests found!</h3>
                                    <p className="mt-2 text-gray-500">Try adjusting your search or category filters.</p>
                                    <button 
                                        onClick={() => {setActiveTab('All'); setSearchText('');}}
                                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg mt-8 px-8 py-3 rounded-2xl font-bold text-white active:scale-95 transition-all transform"
                                    >
                                        <FaRedo className="text-sm" /> Clear All Filters
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