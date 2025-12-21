import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ContestManagement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests', user.email, 'candidate-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/candidate?candidateEmail=${user.email}&submitStatus=candidate-assigned`);
            return res.data;
        }
    })

    const handleSubmissionStatusUpdate = (contest, status) => {
        const statusInfo = { 
            submitStatus: status,
            candidateId: contest.candidateId,
            trackingId: contest.trackingId
        };

        let message = `Contest Status is updated with ${status.split('-').join(' ')}`;

        axiosSecure.patch(`/contests/${contest._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


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
                            <th className="text-center">Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, i) => (
                                <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <th>{i + 1}</th>
                                    <td className="font-semibold">{contest.contestTitle}</td>
                                    <td>{contest.candidateEmail}</td>
                                    <td className="flex justify-center gap-3">

                                        {
                                            contest.submitStatus === 'candidate-assigned' ?
                                                <>
                                                    <button
                                                        onClick={() => handleSubmissionStatusUpdate(contest, 'submission-approved')}
                                                        className='bg-green-400 text-black btn'>Accept</button>

                                                    <button className='bg-red-400 text-black btn'>Reject</button>
                                                </>
                                                :
                                                <span>Approved</span>
                                        }


                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleSubmissionStatusUpdate(contest, 'winner-selected')}
                                            className='bg-blue-500 text-white btn'>Select Winner</button>
                                        <button
                                            onClick={() => handleSubmissionStatusUpdate(contest, 'prize-delivered')}
                                            className='bg-green-500 mx-2 text-white btn'>Prize Delivered</button>
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