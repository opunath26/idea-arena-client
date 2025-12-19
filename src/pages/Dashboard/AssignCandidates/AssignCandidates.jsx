import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const { data: candidates = [] } = useQuery({
        queryKey: ['candidates', 'submit-done'],
        queryFn: async () => {
            const res = await axiosSecure.get('/candidates?submitStatus=submit-done')
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-5xl">Assign Candidates: {candidates.length}</h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {
        
      }
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AssignCandidates;