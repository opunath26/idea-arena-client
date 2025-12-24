import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ContestCard from "../ContestCard/ContestCard";

const AllContests = () => {
    const [contests, setContests] = useState([]);
    const [searchText, setSearchText] = useState(''); // সার্চ টেক্সট রাখার জন্য
    const axiosSecure = useAxiosSecure();

    // ডাটা ফেচ করার ফাংশন
    const fetchContests = (search = '') => {
        // ব্যাকএন্ডে কুয়েরি প্যারামিটার হিসেবে সার্চ টেক্সট পাঠানো হচ্ছে
        axiosSecure.get(`/contests?searchText=${search}`)
            .then(res => setContests(res.data))
    };

    useEffect(() => {
        fetchContests();
    }, [axiosSecure]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchContests(searchText);
    };

    return (
        <div className="mx-auto px-4 py-12 container">
            <h1 className="mb-6 font-bold text-4xl text-center">Explores All Contests</h1>
            
            {/* Search Bar */}
            <div className="flex justify-center mb-10">
                <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search by name or category..." 
                        className="w-full input input-bordered"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    contests.length > 0 ? (
                        contests.map(contest => (
                            <ContestCard key={contest._id} contest={contest}></ContestCard>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center">
                            <h3 className="text-gray-500 text-xl">No contests found matching your search.</h3>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllContests;