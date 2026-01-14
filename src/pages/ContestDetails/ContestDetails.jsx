import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Countdown from "react-countdown";
import { FaClock, FaTag, FaDollarSign, FaCalendarAlt, FaChevronLeft } from "react-icons/fa";

const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => setContest(res.data))
    }, [id, axiosSecure]);

    if (!contest) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-purple-600 loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const isDeadlinePassed = new Date() > new Date(contest.contestDeadline);

    // Countdown Renderer
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="font-black text-red-500 uppercase">Registration Closed</span>;
        }
        return (
            <div className="flex justify-center sm:justify-start gap-2 sm:gap-4">
                {[
                    { label: 'D', val: days },
                    { label: 'H', val: hours },
                    { label: 'M', val: minutes },
                    { label: 'S', val: seconds }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="flex justify-center items-center bg-gray-900 shadow-lg rounded-xl w-10 sm:w-12 h-10 sm:h-12 font-mono text-white text-lg sm:text-xl">
                            {item.val.toString().padStart(2, '0')}
                        </div>
                        <span className="mt-1 font-bold text-[10px] text-gray-400 uppercase">{item.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 pb-20 min-h-screen">
            {/* Top Bar / Navigation */}
            <div className="mx-auto px-4 py-6 max-w-6xl">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 font-bold text-gray-500 hover:text-purple-600 transition-colors"
                >
                    <FaChevronLeft /> Back to Explore
                </button>
            </div>

            <div className="mx-auto px-4 max-w-5xl">
                <div className="bg-white shadow-2xl shadow-gray-200/50 border border-white rounded-[2.5rem] overflow-hidden">
                    
                    {/* Hero Section */}
                    <div className="group relative h-[300px] sm:h-[450px] overflow-hidden">
                        <img 
                            src={contest.contestImage || "https://via.placeholder.com/1200x600"} 
                            alt={contest.contestTitle} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="z-10 relative -mt-20 px-6 sm:px-12 pb-12">
                        {/* Header Info */}
                        <div className="bg-white shadow-xl p-6 sm:p-10 border border-gray-50 rounded-[2rem]">
                            <div className="flex md:flex-row flex-col justify-between gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-purple-600 text-sm uppercase tracking-widest">
                                        <FaTag /> {contest.contestType}
                                    </div>
                                    <h1 className="font-black text-gray-900 text-3xl sm:text-5xl leading-tight">
                                        {contest.contestTitle}
                                    </h1>
                                    <div className="flex items-center gap-4 font-medium text-gray-400 text-sm">
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> Posted: {new Date(contest.createAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col justify-center items-center bg-purple-50 p-6 rounded-3xl min-w-[180px]">
                                    <span className="mb-1 font-bold text-gray-500 text-xs uppercase">Win Prize</span>
                                    <div className="flex items-center font-black text-purple-600 text-4xl">
                                        <FaDollarSign className="text-2xl" /> {contest.contestPrice}
                                    </div>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-10 pt-8 border-gray-100 border-t">
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 font-bold text-gray-400 text-xs uppercase tracking-widest">
                                        <FaClock className="text-purple-500" /> Time Remaining
                                    </p>
                                    <Countdown date={new Date(contest.contestDeadline)} renderer={renderer} />
                                </div>
                                <div className="flex justify-start md:justify-end items-end">
                                    <button 
                                        onClick={() => navigate(`/dashboard/payment/${contest._id}`)}
                                        disabled={isDeadlinePassed}
                                        className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white transition-all transform active:scale-95 shadow-xl shadow-purple-200 ${
                                            isDeadlinePassed ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-gray-900'
                                        }`}
                                    >
                                        {isDeadlinePassed ? "Contest Expired" : "Register & Participate"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="gap-12 grid grid-cols-1 md:grid-cols-12 mt-12">
                            <div className="space-y-10 md:col-span-8">
                                <div>
                                    <h3 className="flex items-center gap-3 mb-4 font-black text-gray-900 text-xl">
                                        <span className="flex justify-center items-center bg-purple-100 rounded-lg w-8 h-8 text-purple-600 text-sm">01</span>
                                        About Competition
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                        {contest.contestDescription}
                                    </p>
                                </div>

                                {contest.contestTaskInstructions && (
                                    <div className="relative bg-gray-900 p-8 rounded-[2rem] overflow-hidden text-gray-300">
                                        <div className="z-10 relative">
                                            <h3 className="mb-4 font-black text-white text-xl">Submission Rules</h3>
                                            <p className="opacity-90 italic leading-relaxed">
                                                "{contest.contestTaskInstructions}"
                                            </p>
                                        </div>
                                        <div className="top-0 right-0 absolute opacity-10 p-4">
                                            <FaClock size={80} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-4">
                                <div className="bg-purple-500 p-8 rounded-[2rem] text-white">
                                    <h4 className="opacity-80 mb-4 font-bold text-xs uppercase tracking-[0.2em]">Quick Details</h4>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between pb-2 border-white/10 border-b">
                                            <span className="opacity-70">Category</span>
                                            <span className="font-bold">{contest.contestType}</span>
                                        </div>
                                        <div className="flex justify-between pb-2 border-white/10 border-b">
                                            <span className="opacity-70">Price Money</span>
                                            <span className="font-bold text-yellow-400">{contest.contestPrice}$</span>
                                        </div>
                                        <div className="flex justify-between pb-2 border-white/10 border-b">
                                            <span className="opacity-70">Status</span>
                                            <span className="bg-green-400 px-2 py-0.5 rounded font-black text-[10px] text-gray-900 uppercase">Active</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-white/10 border-t">
                                        <p className="opacity-60 text-[10px] italic leading-tight">
                                            * Make sure to submit your task before the deadline expires. Late submissions will not be accepted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;