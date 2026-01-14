import React from 'react';
import { Link } from 'react-router';
import { FaUsers } from 'react-icons/fa';

const ContestCard = ({ contest }) => {
    if (!contest) return null;

    const { _id, contestTitle, contestType, contestImage, contestPrice, contestDescription, participantsCount } = contest;

    return (
        <div className="group flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-2xl h-full transition-all duration-300 card">
            <figure className="relative h-52 overflow-hidden">
                <img 
                    src={contestImage || "https://via.placeholder.com/400x200"} 
                    alt={contestTitle} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="top-4 left-4 absolute">
                    <div className="shadow-sm py-3 font-semibold badge badge-secondary">{contestType}</div>
                </div>
            </figure>
            
            <div className="flex flex-col justify-between p-6 card-body">
                <div>
                    <h2 className="font-bold text-gray-800 group-hover:text-purple-600 text-xl transition-colors">
                        {contestTitle}
                    </h2>
                    <p className="mt-3 text-gray-500 text-sm line-clamp-3">
                        {contestDescription}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-4 font-medium text-gray-600 text-sm">
                        <FaUsers className="text-purple-500" />
                        <span>{participantsCount || 0} Participants joined</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-gray-50 border-t">
                    <div>
                        <span className="block font-bold text-gray-400 text-xs uppercase tracking-wider">Entry Fee</span>
                        <span className="font-extrabold text-primary text-2xl">
                            ${contestPrice}
                        </span>
                    </div>
                    <Link to={`/contest-details/${_id}`} className="rounded-xl btn btn-primary btn-md">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;