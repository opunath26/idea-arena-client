import React from 'react';
import useRole from '../../../hooks/useRole';
import SpinnerLoader from '../../SpinnerLoader';
import AdminDashboardHome from './AdminDashboardHome';
import CreatorDashboardHome from './CreatorDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const { role,  roleLoading} = useRole();
    if(roleLoading){
        return <SpinnerLoader></SpinnerLoader>
    }
    if(role === 'admin'){
        return <AdminDashboardHome />
    }
    else if(role === 'candidate'){
        return <CreatorDashboardHome />
    }
    else {
        return <UserDashboardHome />
    }
};

export default DashboardHome;