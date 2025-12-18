import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from 'react-icons/fi';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return (
        <div>
            <h2 className='text-4xl'>Manage Users: {users.length} </h2>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>User</th>
        <th>Email</th>
        <th>Role</th>
        <th>Admin Action</th>
        <th>Others Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => <tr>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img
                  src={user.photoURL}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.displayName}</div>
            </div>
          </div>
        </td>
        <td>
            {user.email}
        </td>
        <td>
            {user.role}
        </td>
        <td>
            <button className="btn btn-ghost">
                <FaUserShield />
            </button>
            <button className="btn btn-ghost">
                <FiShieldOff />
            </button>
        </td>
        <th>
          <button className="btn btn-ghost btn-xs">Actions</button>
        </th>
      </tr>
    )}
      
     
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default UsersManagement;