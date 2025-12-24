import React from 'react';
import { Link } from 'react-router';

const ContestCard = ({ contest }) => {

    if (!contest) return null;


    const { _id, contestTitle, contestType, contestImage, contestPrice, contestDescription } = contest;

    return (
        <div className="bg-base-100 shadow-xl hover:shadow-2xl border h-full transition-all duration-300 card">
            <figure className="h-48 overflow-hidden">
                <img 
                    src={contestImage || "https://via.placeholder.com/400x200"} 
                    alt={contestTitle || "Contest Image"} 
                    className="w-full h-full object-cover" 
                />
            </figure>
            <div className="flex flex-col justify-between card-body">
                <div>
                    <div className="mb-2 badge badge-secondary">{contestType || "General"}</div>
                    <h2 className="font-bold text-xl card-title">
                        {contestTitle || "Untitled Contest"}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {contestDescription || "No description available."}
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