import React from 'react';
import useAuth from '../hooks/useAuth';
import SpinnerLoader from '../pages/SpinnerLoader';
import Forbidden from '../pages/Shared/Forbidden';
import useRole from '../hooks/useRole';

const OrganizerRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <SpinnerLoader></SpinnerLoader>
    }

    if (role !== 'candidate') {
        return <Forbidden></Forbidden>
    }
    
    return children;
};

export default OrganizerRoute;