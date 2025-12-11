import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import SpinnerLoader from '../pages/SpinnerLoader';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    

    if (loading) {
        return <div>
            <SpinnerLoader></SpinnerLoader>
        </div>;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace></Navigate>;
    }

    return children;
};

export default PrivateRoute;