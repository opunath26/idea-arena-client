import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Countdown from "react-countdown";
import { 
  FaClock, 
  FaTag, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaChevronLeft, 
  FaTrophy, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaFileAlt
} from "react-icons/fa";

const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => setContest(res.data));
    }, [id, axiosSecure]);

    if (!contest) {
        return (
            <div className="flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="relative flex justify-center items-center">
                    <div className="absolute border-4 border-purple-200 border-t-purple-600 rounded-full w-16 h-16 animate-spin"></div>
                    <span className="font-semibold text-purple-600 text-sm">Loading Arena...</span>
                </div>
            </div>
        );
    }

    const isDeadlinePassed = new Date() > new Date(contest.contestDeadline);

    // Countdown Renderer
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 border border-red-200 rounded-xl font-bold text-red-600 text-sm">
                    <FaExclamationCircle /> Registration Closed
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2 sm:gap-3">
                {[
                    { label: 'Days', val: days },
                    { label: 'Hours', val: hours },
                    { label: 'Mins', val: minutes },
                    { label: 'Secs', val: seconds }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="flex justify-center items-center bg-purple-50 shadow-sm border border-purple-200/80 rounded-2xl w-12 sm:w-14 h-12 sm:h-14 font-mono font-black text-purple-700 text-lg sm:text-xl">
                            {item.val.toString().padStart(2, '0')}
                        </div>
                        <span className="mt-1.5 font-semibold text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="relative bg-slate-50 pt-6 pb-20 min-h-screen overflow-hidden text-slate-800">
            {/* Ambient Background Glows for Light Theme */}
            <div className="top-10 left-1/2 -z-10 absolute bg-purple-300/30 blur-[140px] rounded-full w-[600px] h-[300px] -translate-x-1/2 pointer-events-none" />
            <div className="right-10 bottom-20 -z-10 absolute bg-indigo-200/40 blur-[150px] rounded-full w-[400px] h-[400px] pointer-events-none" />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="group inline-flex items-center gap-2 bg-white shadow-sm backdrop-blur-md mb-8 px-4 py-2 border border-slate-200/80 hover:border-purple-300 rounded-xl font-semibold text-slate-600 hover:text-purple-700 text-sm transition-all duration-300"
                >
                    <FaChevronLeft className="transition-transform group-hover:-translate-x-1" /> Back to Explore
                </button>

                {/* Main Glassmorphic Container */}
                <div className="bg-white/80 shadow-purple-900/5 shadow-xl backdrop-blur-xl border border-white rounded-3xl overflow-hidden">
                    
                    {/* Hero Banner Section */}
                    <div className="relative w-full h-[280px] sm:h-[420px] overflow-hidden">
                        <img 
                            src={contest.contestImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"} 
                            alt={contest.contestTitle} 
                            className="w-full h-full object-center object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="top-6 right-6 left-6 z-10 absolute flex justify-between items-center">
                            <span className="inline-flex items-center gap-2 bg-white/90 shadow-md backdrop-blur-md px-4 py-1.5 border border-purple-100 rounded-full font-bold text-purple-700 text-xs uppercase tracking-widest">
                                <FaTag className="text-purple-600" /> {contest.contestType}
                            </span>
                            
                            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                                isDeadlinePassed 
                                    ? 'bg-red-50 border border-red-200 text-red-600' 
                                    : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                            }`}>
                                <span className={`w-2 h-2 rounded-full ${isDeadlinePassed ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
                                {isDeadlinePassed ? "Ended" : "Live Arena"}
                            </span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="z-10 relative -mt-16 sm:-mt-24 px-6 sm:px-10 pb-12">
                        
                        {/* Header Box */}
                        <div className="bg-white shadow-lg shadow-purple-900/5 p-6 sm:p-8 border border-purple-50 rounded-2xl">
                            <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-6">
                                
                                <div className="space-y-3">
                                    <h1 className="font-black text-slate-900 text-2xl sm:text-4xl leading-tight tracking-tight">
                                        {contest.contestTitle}
                                    </h1>
                                    
                                    <div className="flex flex-wrap items-center gap-4 font-semibold text-slate-500 text-xs">
                                        <span className="flex items-center gap-1.5">
                                            <FaCalendarAlt className="text-purple-600" /> Posted: {new Date(contest.createAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Prize Money Card */}
                                <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:px-6 border border-purple-100 rounded-2xl min-w-[200px]">
                                    <div className="flex justify-center items-center bg-purple-600 shadow-md shadow-purple-200 rounded-xl w-12 h-12 text-white text-xl">
                                        <FaTrophy />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-[10px] text-purple-600 uppercase tracking-widest">Prize Pool</span>
                                        <div className="flex items-center font-black text-slate-900 text-2xl">
                                            <FaDollarSign className="text-purple-600 text-xl" />
                                            <span>{contest.contestPrice}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Timer and CTA Bar */}
                            <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mt-8 pt-6 border-slate-100 border-t">
                                <div>
                                    <p className="flex items-center gap-2 mb-3 font-bold text-slate-500 text-xs uppercase tracking-wider">
                                        <FaClock className="text-purple-600" /> Time Remaining
                                    </p>
                                    <Countdown date={new Date(contest.contestDeadline)} renderer={renderer} />
                                </div>

                                <button 
                                    onClick={() => navigate(`/dashboard/payment/${contest._id}`)}
                                    disabled={isDeadlinePassed}
                                    className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 transform active:scale-95 shadow-lg ${
                                        isDeadlinePassed 
                                            ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none' 
                                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25 hover:shadow-purple-500/40'
                                    }`}
                                >
                                    {isDeadlinePassed ? "Contest Closed" : "Register & Participate"}
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="gap-8 grid grid-cols-1 lg:grid-cols-12 mt-10">
                            
                            {/* Main Content Info */}
                            <div className="space-y-8 lg:col-span-8">
                                
                                {/* About Section */}
                                <div className="bg-white shadow-sm p-6 sm:p-8 border border-slate-100 rounded-2xl">
                                    <h3 className="flex items-center gap-3 mb-4 font-bold text-slate-900 text-lg">
                                        <span className="flex justify-center items-center bg-purple-100 rounded-lg w-8 h-8 font-bold text-purple-700 text-sm">
                                            01
                                        </span>
                                        About Competition
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                        {contest.contestDescription}
                                    </p>
                                </div>

                                {/* Submission Rules */}
                                {contest.contestTaskInstructions && (
                                    <div className="relative bg-purple-50/60 p-6 sm:p-8 border border-purple-100 rounded-2xl overflow-hidden">
                                        <div className="z-10 relative">
                                            <h3 className="flex items-center gap-2 mb-3 font-bold text-purple-900 text-lg">
                                                <FaFileAlt className="text-purple-600" /> Submission Guidelines
                                            </h3>
                                            <p className="bg-white/80 shadow-sm p-4 border border-purple-100/80 rounded-xl text-slate-700 text-sm italic leading-relaxed">
                                                "{contest.contestTaskInstructions}"
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-4">
                                <div className="space-y-6 bg-white shadow-sm p-6 border border-slate-100 rounded-2xl">
                                    <h4 className="pb-3 border-slate-100 border-b font-bold text-purple-600 text-xs uppercase tracking-widest">
                                        Quick Summary
                                    </h4>
                                    
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>Category</span>
                                            <span className="font-semibold text-slate-900">{contest.contestType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>Entry Fee</span>
                                            <span className="font-semibold text-emerald-600">Free / Registered</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>Prize Pool</span>
                                            <span className="font-bold text-purple-600">${contest.contestPrice}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>Deadline Status</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                isDeadlinePassed ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {isDeadlinePassed ? 'Expired' : 'Accepting Entries'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4 border-slate-100 border-t">
                                        <div className="flex items-start gap-2 text-slate-500 text-xs">
                                            <FaCheckCircle className="mt-0.5 text-purple-600 shrink-0" />
                                            <span>Ensure your submission matches instructions before deadline.</span>
                                        </div>
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