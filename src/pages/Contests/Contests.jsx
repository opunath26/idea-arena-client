import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ContestCard from '../ContestCard/ContestCard';

const Contests = () => {
    const axiosSecure = useAxiosSecure();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/contests')
            .then(res => {
                setContests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-primary loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 py-10 container">
            <h1 className="mb-8 font-bold text-3xl text-center">All Available Contests</h1>
            
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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