import React from 'react';
import useAuth from '../hooks/useAuth';
import SpinnerLoader from '../pages/SpinnerLoader';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/Shared/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();
    if (loading || roleLoading) {
        return <Forbidden></Forbidden>
    }

    if (role !== 'admin') {
        return <div>
            <h2 className='text-red-600 text-3xl'>Access Denied. You are not an Admin</h2>
        </div>
    }
    return children;
};

export default AdminRoute;