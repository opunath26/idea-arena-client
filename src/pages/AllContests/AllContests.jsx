import { useEffect, useState } from "react";
import ContestCard from "../ContestCard/ContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllContests = () => {
    const [contests, setContests] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const axiosSecure = useAxiosSecure();


    const categories = ['All', 'Business', 'Medical', 'Article Writing', 'Gaming', 'Marketing'];

    const fetchContests = (search = '', category = 'All') => {

        const contestType = category === 'All' ? '' : category;
        
        axiosSecure.get(`/contests?search=${search}&contestType=${contestType}`)
            .then(res => {
                setContests(res.data);
            })
            .catch(err => {
                console.error("Error fetching contests:", err);
            });
    };

    useEffect(() => {
        fetchContests(searchText, activeTab);
    }, [activeTab, axiosSecure]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchContests(searchText, activeTab);
    };

    return (
        <div className="mx-auto px-4 py-12 min-h-screen container">
            <h1 className="mb-8 font-bold text-4xl text-center uppercase tracking-tight">Explore All Contests</h1>
            
            {/* Search Bar */}
            <div className="flex justify-center mb-10">
                <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search by contest title..." 
                        className="shadow-sm focus:border-primary w-full input input-bordered"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit" className="px-8 font-bold text-white uppercase btn btn-primary">Search</button>
                </form>
            </div>

            {/* Category Tabs (DaisyUI) */}
            <div className="flex justify-center mb-12">
                <div className="bg-white shadow-sm p-1 border tabs tabs-boxed">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveTab(cat)}
                            className={`tab transition-all duration-300 ${activeTab === cat ? 'tab-active !bg-primary !text-white' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contests Grid */}
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    contests.length > 0 ? (
                        contests.map(contest => (
                            <ContestCard key={contest._id} contest={contest}></ContestCard>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-50 mx-auto p-10 border-2 border-dashed rounded-2xl max-w-md">
                                <h3 className="font-medium text-gray-400 text-xl italic">No contests found.</h3>
                                <button 
                                    onClick={() => {setActiveTab('All'); setSearchText('');}}
                                    className="mt-4 font-bold text-primary hover:underline"
                                >
                                    View All Contests
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllContests;