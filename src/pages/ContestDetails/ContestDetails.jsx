import { useParams, useNavigate } from "react-router"; // useNavigate যোগ করা হয়েছে
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState(null); // শুরুতে null রাখলে চেক করতে সুবিধা হয়
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => setContest(res.data))
    }, [id, axiosSecure]);

    // ডাটা লোড হওয়ার সময় একটি লোডার দেখানো
    if (!contest) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-primary loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Join বাটন ক্লিক করলে পেমেন্ট পেজে নিয়ে যাবে
    const handleJoinContest = () => {
        navigate(`/dashboard/payment/${contest._id}`);
    };

    return (
        <div className="mx-auto px-4 py-12 container">
            <div className="bg-white shadow-lg mx-auto border rounded-2xl max-w-5xl overflow-hidden">
                <img 
                    src={contest.image || "https://via.placeholder.com/800x400"} 
                    alt={contest.contestName} 
                    className="w-full h-96 object-cover" 
                />
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="font-bold text-4xl">{contest.contestName}</h1>
                        <span className="badge badge-lg badge-secondary">{contest.contestType}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-6">
                        <div className="bg-primary/10 px-4 py-2 rounded-lg">
                            <span className="font-bold text-primary text-xl">Fee: ${contest.contestPrice}</span>
                        </div>
                        <p className="text-gray-500 italic">Created at: {new Date(contest.createAt).toLocaleDateString()}</p>
                    </div>

                    <div className="divider">Description</div>
                    <p className="mb-10 text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {contest.description}
                    </p>
                    
                    <div className="flex md:flex-row flex-col items-center gap-4 pt-8 border-t">
                        <button 
                            onClick={handleJoinContest}
                            className="px-12 w-full md:w-auto font-bold text-white btn btn-primary btn-lg"
                        >
                            Join Contest Now
                        </button>
                        <p className="text-gray-500 text-sm">
                            * By clicking join, you agree to our contest terms and conditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;