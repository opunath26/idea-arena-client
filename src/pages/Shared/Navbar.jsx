import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { 
    FaUserCircle, 
    FaTrophy, 
    FaPlusCircle, 
    FaThLarge, 
    FaSignOutAlt, 
    FaUserShield, 
    FaBriefcase 
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user role dynamically
    const { data: roleData, isLoading: isRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data;
        }
    });

    const role = roleData?.role || 'user';

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.error("Logout Error:", error));
    };

    // NavLinks configuration
    const navItemClass = ({ isActive }) =>
        `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isActive
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
        }`;

    const links = (
        <>
            <li><NavLink to="/" className={navItemClass}>Home</NavLink></li>
            <li><NavLink to="/all-contests" className={navItemClass}>All Contests</NavLink></li>
            <li><NavLink to="/about" className={navItemClass}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={navItemClass}>Contact</NavLink></li>
            
            {/* Conditional Links based on Role */}
            {user && role === 'user' && (
                <li>
                    <NavLink to="/candidate" className={navItemClass}>
                        Become Creator
                    </NavLink>
                </li>
            )}

            {user && role === 'candidate' && (
                <>
                    <li><NavLink to="/add-contest" className={navItemClass}>Add Contest</NavLink></li>
                    <li><NavLink to="/dashboard/my-contests" className={navItemClass}>My Contests</NavLink></li>
                </>
            )}

            {user && role === 'admin' && (
                <>
                    <li><NavLink to="/dashboard/manage-users" className={navItemClass}>Manage Users</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <header className="top-0 z-50 sticky bg-white/80 backdrop-blur-md border-slate-100 border-b w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl navbar">
                
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="lg:hidden dropdown">
                        <div tabIndex={0} role="button" className="mr-2 btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="z-50 space-y-1 bg-white shadow-xl mt-3 p-3 border border-slate-100 rounded-2xl w-56 menu dropdown-content">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>
                </div>

                {/* Navbar Center */}
                <div className="hidden lg:flex navbar-center">
                    <ul className="flex items-center gap-1 px-1 menu menu-horizontal">
                        {links}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="flex items-center gap-3 navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="ring-2 ring-purple-500/30 hover:ring-purple-600 transition-all btn btn-ghost btn-circle avatar">
                                <div className="rounded-full w-10">
                                    <img 
                                        alt="User Avatar" 
                                        src={user?.photoURL || "https://i.ibb.co/mJR9QPG/placeholder.png"} 
                                    />
                                </div>
                            </div>
                            
                            {/* Profile Dropdown Menu */}
                            <ul tabIndex={0} className="z-50 bg-white shadow-2xl mt-4 p-2 border border-slate-100 rounded-2xl w-64 text-slate-700 menu dropdown-content">
                                {/* User Info Header */}
                                <li className="hover:bg-transparent px-3 py-3 border-slate-100 border-b">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-slate-900 text-sm truncate">
                                            {user?.displayName || "Anonymous User"}
                                        </span>
                                        <span className="text-slate-500 text-xs truncate">
                                            {user?.email}
                                        </span>
                                        <span className="inline-flex items-center self-start gap-1 bg-purple-50 mt-1.5 px-2 py-0.5 border border-purple-100 rounded-full font-semibold text-[11px] text-purple-700 uppercase">
                                            {role === 'admin' && <FaUserShield className="text-purple-600" />}
                                            {role === 'candidate' && <FaBriefcase className="text-purple-600" />}
                                            {role === 'user' && <FaUserCircle className="text-purple-600" />}
                                            {role}
                                        </span>
                                    </div>
                                </li>

                                {/* Navigation Links */}
                                <div className="space-y-1 py-1">
                                    <li>
                                        <Link to="/dashboard" className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
                                            <FaThLarge className="text-purple-500" /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile" className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
                                            <FaUserCircle className="text-purple-500" /> My Profile
                                        </Link>
                                    </li>
                                    {role === 'candidate' && (
                                        <li>
                                            <Link to="/add-contest" className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
                                                <FaPlusCircle className="text-purple-500" /> Create Contest
                                            </Link>
                                        </li>
                                    )}
                                </div>

                                <div className="my-1 border-slate-100 border-t"></div>

                                {/* Logout Button */}
                                <li>
                                    <button 
                                        onClick={handleLogOut} 
                                        className="flex items-center gap-2.5 hover:bg-rose-50 py-2 rounded-xl font-medium text-rose-600 hover:text-rose-700 transition-colors"
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link 
                                to="/login" 
                                className="bg-slate-900 hover:bg-purple-600 shadow-md hover:shadow-purple-500/20 px-5 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all duration-200"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Navbar;