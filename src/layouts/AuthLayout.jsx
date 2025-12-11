import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='mx-auto max-w-7xl'>
            <Logo></Logo>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;