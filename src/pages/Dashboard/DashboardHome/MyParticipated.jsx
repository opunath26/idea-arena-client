import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: participations = [], isLoading } = useQuery({
        queryKey: ['my-participated', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-payments/${user?.email}`);
            return res.data;
        }
    });

 
    const sortedParticipations = [...participations].sort((a, b) => 
        new Date(a.contestDeadline) - new Date(b.contestDeadline)
    );

    if (isLoading) return <span className="text-primary loading loading-spinner"></span>;

    return (
        <div className="p-5">
            <h2 className="mb-5 font-bold text-2xl">My Participated Contests</h2>
            <div className="shadow-lg rounded-lg overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Contest Name</th>
                            <th>Payment Status</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedParticipations.map((item, index) => (
                            <tr key={item._id} className="hover">
                                <td>{index + 1}</td>
                                <td className="font-semibold">{item.contestName}</td>
                                <td>
                                    <span className="text-white badge badge-success">Paid</span>
                                </td>
                                <td>{new Date(item.contestDeadline).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedParticipations.length === 0 && (
                    <p className="py-10 text-gray-500 text-center">You haven't participated in any contests yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyParticipated;