import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Contests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading, isError } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    });

    if (isLoading) {
        return <SpinnerLoader />;
    }

   
    if (isError) {
        return <div className="py-20 text-red-500 text-center">Error loading contests. Please try again later.</div>;
    }

    return (
        <div className="mx-auto px-4 py-10 container">
            <h1 className="mb-8 font-bold text-gray-800 dark:text-white text-3xl text-center">
                All Available Contests
            </h1>
            
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {
                    contests.length > 0 ? (
                        contests.map(contest => (
                            <ContestCard
                                key={contest._id}
                                contest={contest}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500 text-center">No contests found.</p>
                    )
                }
            </div>
        </div>
    );
};

export default Contests;