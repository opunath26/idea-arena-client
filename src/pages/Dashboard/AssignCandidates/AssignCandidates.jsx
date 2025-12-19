import React, { useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const candidateModalRef = useRef();


    const { data: contests = [] } = useQuery({
        queryKey: ['contests', 'submit-done'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?submitStatus=submit-done')
            return res.data;
        }
    })

    const openAssignCandidateModal = (contest) => {
        candidateModalRef.current.showModal();
    }
    return (
        <div>
            <h2 className="text-5xl">Assign Candidates: {contests.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Title</th>
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
                                <td>{contest.contestTitle}</td>
                                <td>{contest.contestType}</td>
                                <td>{contest.contestCreationFee}</td>
                                <td>{contest.createAt}</td>
                                <td>
                                    <button 
                                    onClick={() => openAssignCandidateModal(contest)}
                                    className='btn btn-primary'>Assign Candidates</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            
            <dialog 
            ref={candidateModalRef}
            className="modal-bottom modal sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignCandidates;