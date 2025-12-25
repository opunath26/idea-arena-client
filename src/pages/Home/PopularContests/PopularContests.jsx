import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaUsers, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const PopularContests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests?submitStatus=approved&sort=popular&limit=6');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center my-10">
                <span className="text-primary loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto px-4 container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="font-black text-gray-800 text-3xl md:text-4xl uppercase tracking-tight">
                        Popular <span className="text-blue-600">Contests</span>
                    </h2>
                    <div className="bg-blue-600 mx-auto mt-4 rounded-full w-24 h-1.5"></div>
                    <p className="mx-auto mt-4 max-w-lg text-gray-500">
                        Explore the most trending contests right now based on participation.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {contests.map((contest) => (
                        <div 
                            key={contest._id} 
                            className="group flex flex-col bg-gray-50 hover:shadow-2xl border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                            {/* Image Placeholder or Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={contest.image || 'https://via.placeholder.com/400x200'} 
                                    alt={contest.contestTitle} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="top-4 right-4 absolute bg-blue-600 shadow-lg px-3 py-1 rounded-lg font-bold text-white text-sm">
                                    {contest.contestType}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-6">
                                <h3 className="mb-2 font-bold text-gray-800 text-xl line-clamp-1">
                                    {contest.contestTitle}
                                </h3>
                                <p className="mb-4 text-gray-600 text-sm line-clamp-2">
                                    {contest.description || "Join this exciting contest and showcase your skills to win amazing prizes!"}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-4 pt-4 border-t">
                                        <div className="flex items-center gap-2 font-medium text-gray-500">
                                            <FaUsers className="text-blue-500" />
                                            <span>{contest.participantsCount || 0} Participants</span>
                                        </div>
                                        <div className="font-bold text-green-600 text-lg">
                                            ${contest.contestPrice}
                                        </div>
                                    </div>

                                    <Link 
                                        to={`/contest-details/${contest._id}`}
                                        className="flex justify-center items-center gap-2 bg-gray-900 hover:bg-blue-600 py-3 rounded-xl w-full font-bold text-white transition-colors duration-300"
                                    >
                                        View Details <FaArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link 
                        to="/all-contests" 
                        className="px-8 rounded-full btn-outline font-bold btn btn-primary"
                    >
                        Explore More Contests
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularContests;