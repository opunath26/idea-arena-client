import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => {
                console.log(error);
            })
    };


    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/all-contests">All Contests</NavLink></li>
        <li><NavLink to="/candidate">Be a Creator</NavLink></li>
        <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
        {
            user && <>
                <li><NavLink to="/add-contest">Add Contest</NavLink></li>
                <li><NavLink to="/dashboard/my-contests">My Contests</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    return (
        <div className="top-0 z-50 sticky bg-base-100 shadow-sm w-full navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="z-1 bg-base-100 shadow mt-3 p-2 rounded-box w-52 menu menu-sm dropdown-content">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>
            </div>
            <div className="hidden lg:flex navbar-center">
                <ul className="px-1 menu menu-horizontal">
                    {links}
                </ul>
            </div>
            <div className="flex items-center gap-4 navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="rounded-full w-10">
                                <img 
                                    alt="User Profile" 
                                    src={user?.photoURL || "https://i.ibb.co/mJR9QPG/placeholder.png"} 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="z-1 bg-base-100 shadow mt-3 p-2 rounded-box w-52 menu menu-sm dropdown-content">
                            <li className="px-4 py-2 font-bold text-primary">{user?.displayName || "User Name"}</li>
                            <div className="my-0 divider"></div>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/dashboard/profile">My Profile</Link></li>
                            <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link className="bg-primary text-white btn" to="/login">
                        Log in
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;