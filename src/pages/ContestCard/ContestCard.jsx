import React from 'react';
import { Link } from 'react-router';
import { FaUsers, FaTag } from 'react-icons/fa';

const ContestCard = ({ contest }) => {
    if (!contest) return null;

    const { _id, contestTitle, contestType, contestImage, contestPrice, contestDescription, participantsCount } = contest;

    return (
        <div className="group flex flex-col bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 rounded-2xl h-full overflow-hidden transition-all duration-300">
            {/* Image Section - Fixed Height */}
            <figure className="relative w-full h-56 overflow-hidden">
                <img
                    src={contestImage || "https://via.placeholder.com/400x250"}
                    alt={contestTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Contest Type Badge */}
                <div className="top-4 left-4 absolute">
                    <div className="flex items-center gap-1.5 bg-purple-600/90 shadow-lg backdrop-blur-md px-3 py-1.5 rounded-lg font-bold text-white text-xs">
                        <FaTag className="text-[10px]" /> {contestType}
                    </div>
                </div>
            </figure>

            {/* Content Section - Flex Grow ensuring equal height */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow">
                    <h2 className="font-bold text-gray-800 dark:text-white group-hover:text-purple-600 text-xl line-clamp-1 transition-colors">
                        {contestTitle}
                    </h2>

                    <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        {contestDescription}
                    </p>

                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 mt-4 px-3 py-1.5 rounded-full w-fit font-semibold text-gray-600 dark:text-gray-300 text-sm">
                        <FaUsers className="text-purple-500" />
                        <span>{participantsCount || 0} Participants</span>
                    </div>
                </div>

                {/* Footer Section - Fixed at Bottom */}
                <div className="flex justify-between items-center mt-6 pt-4 border-gray-100 dark:border-gray-700 border-t">
                    <div>
                        {/* Label and Prize Display */}
                        <span className="block flex items-center gap-1 mb-0.5 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                            <span className="bg-purple-700 rounded-full w-2 h-2 animate-pulse"></span>
                            Win Prize
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-purple-600 font-black text-transparent text-2xl">
                                ${contestPrice}
                            </span>
                        </div>
                    </div>
                    <Link
                        to={`/contest-details/${_id}`}
                        className="bg-gray-900 hover:bg-purple-600 shadow-md px-5 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;