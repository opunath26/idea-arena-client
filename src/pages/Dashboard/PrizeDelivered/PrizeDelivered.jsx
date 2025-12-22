import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PrizeDelivered = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], } = useQuery({
        queryKey: ['contests', user.email, 'candidate-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/candidate?candidateEmail=${user.email}&submitStatus=prize-delivered`);
            return res.data;
        }
    })

    // const calculateTotalPrize = contst => {
    //     if
    // }

    return (
        <div>
            <h2 className='text-4xl'>Prize Delivered: {contests.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            {/* <th>Contest Title</th> */}
                            <th>Contest Type</th>
                            <th>Contest CreationFee</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, index) => <tr key={contest._id}>
                                <th>{index + 1}</th>
                                {/* <td>{contest.candidateName}</td> */}
                                <td>{contest.contestType}</td>
                                <td>{contest.contestCreationFee}</td>
                                <td>{contest.createAt}</td>
                                <td>
                                    <button
                                        className='btn btn-primary'>Cash Out</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrizeDelivered;