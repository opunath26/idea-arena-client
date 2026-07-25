import React from 'react';
import { Link } from 'react-router';
import { FaUsers, FaTag, FaTrophy, FaArrowRight } from 'react-icons/fa';

const ContestCard = ({ contest }) => {
    if (!contest) return null;

    const { _id, contestTitle, contestType, contestImage, contestPrice, contestDescription, participantsCount } = contest;

    return (
        <div className="group relative flex flex-col bg-white shadow-sm hover:shadow-purple-100/60 hover:shadow-xl border border-slate-200/80 hover:border-purple-300 rounded-3xl h-full overflow-hidden transition-all duration-300">
            
            {/* Image Section */}
            <figure className="relative w-full h-52 overflow-hidden">
                <img
                    src={contestImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"}
                    alt={contestTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="top-4 left-4 z-10 absolute">
                    <div className="flex items-center gap-1.5 bg-white/90 shadow-md backdrop-blur-md px-3 py-1 border border-purple-100 rounded-full font-bold text-purple-700 text-xs">
                        <FaTag className="text-[10px] text-purple-600" /> {contestType}
                    </div>
                </div>
            </figure>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow space-y-3">
                    <h2 className="font-bold text-slate-800 group-hover:text-purple-600 text-xl line-clamp-1 transition-colors">
                        {contestTitle}
                    </h2>

                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {contestDescription}
                    </p>

                    {/* Participants Count */}
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 border border-slate-100 rounded-xl w-fit font-semibold text-slate-600 text-xs">
                        <FaUsers className="text-purple-600" />
                        <span>{participantsCount || 0} Participants</span>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center mt-6 pt-4 border-slate-100 border-t">
                    <div>
                        <span className="flex items-center gap-1.5 mb-0.5 font-bold text-[10px] text-purple-600 uppercase tracking-widest">
                            <FaTrophy className="text-purple-600" />
                            Prize Pool
                        </span>
                        <div className="flex items-baseline gap-0.5">
                            <span className="font-black text-slate-900 text-2xl tracking-tight">
                                ${contestPrice}
                            </span>
                        </div>
                    </div>

                    <Link
                        to={`/contest-details/${_id}`}
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 px-4 py-2.5 rounded-xl font-bold text-white text-xs active:scale-95 transition-all"
                    >
                        <span>Details</span>
                        <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;