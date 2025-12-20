import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrophy, FaRegCommentDots } from 'react-icons/fa'; // Icons import

const ContestManagement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [] } = useQuery({
        queryKey: ['contests', user.email, 'candidate-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/candidate?candidateEmail=${user.email}&submitStatus=candidate-assigned`);
            return res.data;
        }
    })

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md p-8 rounded-lg">
            <h2 className="mb-6 font-bold text-purple-600 text-3xl">
                Manage Submissions: {contests.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full border-collapse">
                    {/* head */}
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>#</th>
                            <th>Contest Title</th>
                            <th>Candidate Email</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, i) => (
                                <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <th>{i + 1}</th>
                                    <td className="font-semibold">{contest.contestTitle}</td>
                                    <td>{contest.candidateEmail || 'N/A'}</td>
                                    <td>
                                        <span className="bg-yellow-100 border-none text-yellow-700 badge badge-ghost">
                                            Pending Submission
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-3">
                                        {/* 1. View Submission Button */}
                                        <button 
                                            title="View Submission"
                                            className="btn-outline btn btn-sm btn-circle btn-info"
                                        >
                                            <FaEye />
                                        </button>

                                        {/* 2. Declare Winner Button */}
                                        <button 
                                            title="Declare Winner"
                                            className="text-white btn btn-sm btn-circle btn-success"
                                            disabled={contest.status === 'closed'} // Jodi winner declare hoye jay
                                        >
                                            <FaTrophy />
                                        </button>

                                        {/* 3. Feedback Button */}
                                        <button 
                                            title="Give Feedback"
                                            className="border-purple-500 btn-outline text-purple-500 btn btn-sm btn-circle"
                                        >
                                            <FaRegCommentDots />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {contests.length === 0 && (
                    <p className="py-10 text-gray-500 text-center">No submissions found to manage.</p>
                )}
            </div>
        </div>
    );
};

export default ContestManagement;