import React from 'react';
import { Link } from 'react-router';

const ContestCard = ({ contest }) => {
    // ১. সেফটি চেক: যদি contest না থাকে তবে কিছুই দেখাবে না
    if (!contest) return null;

    // ২. প্রপার্টি নেমগুলো ব্যাকএন্ডের সাথে মিলিয়ে নিন
    // আপনার ব্যাকএন্ডে 'contestName' আছে, তাই এখানেও 'contestName' হবে
    const { _id, contestName, contestType, image, contestPrice, description } = contest;

    return (
        <div className="bg-base-100 shadow-xl hover:shadow-2xl border h-full transition-all duration-300 card">
            <figure className="h-48 overflow-hidden">
                <img 
                    src={image || "https://via.placeholder.com/400x200"} 
                    alt={contestName || "Contest Image"} 
                    className="w-full h-full object-cover" 
                />
            </figure>
            <div className="flex flex-col justify-between card-body">
                <div>
                    <div className="mb-2 badge badge-secondary">{contestType || "General"}</div>
                    <h2 className="font-bold text-xl card-title">
                        {contestName || "Untitled Contest"}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {description || "No description available."}
                    </p>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                    <span className="font-bold text-primary text-xl">
                        ${contestPrice || 0}
                    </span>
                    <Link to={`/contest-details/${_id}`} className="px-4 btn-outline btn btn-sm btn-primary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;