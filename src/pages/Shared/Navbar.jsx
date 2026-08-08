import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    FaUserCircle,
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

    // Close dropdown on click (DaisyUI UX fix)
    const closeDropdown = () => {
        const elem = document.activeElement;
        if (elem && typeof elem.blur === 'function') {
            elem.blur();
        }
    };

    const handleLogOut = () => {
        closeDropdown();
        logOut()
            .then(() => { })
            .catch(error => console.error("Logout Error:", error));
    };

    // NavLinks configuration
    const navItemClass = ({ isActive }) =>
        `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 block ${isActive
            ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
            : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
        }`;

    const links = (
        <>
            <li><NavLink to="/" onClick={closeDropdown} className={navItemClass}>Home</NavLink></li>
            <li><NavLink to="/all-contests" onClick={closeDropdown} className={navItemClass}>All Contests</NavLink></li>
            <li><NavLink to="/leaderboard" onClick={closeDropdown} className={navItemClass}>Leaderboard</NavLink></li>
            <li><NavLink to="/about" onClick={closeDropdown} className={navItemClass}>About Us</NavLink></li>
            <li><NavLink to="/contact" onClick={closeDropdown} className={navItemClass}>Contact</NavLink></li>

            {/* Conditional Links based on Role */}
            {user && role === 'user' && (
                <li>
                    <NavLink to="/candidate" onClick={closeDropdown} className={navItemClass}>
                        Become Creator
                    </NavLink>
                </li>
            )}

            {user && role === 'candidate' && (
                <>
                    <li><NavLink to="/add-contest" onClick={closeDropdown} className={navItemClass}>Add Contest</NavLink></li>
                    <li><NavLink to="/dashboard/my-contests" onClick={closeDropdown} className={navItemClass}>My Contests</NavLink></li>
                </>
            )}

            {user && role === 'admin' && (
                <>
                    <li><NavLink to="/add-contest" onClick={closeDropdown} className={navItemClass}>Add Contest</NavLink></li>
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
                    <Logo />
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
                                <div className="rounded-full w-10 overflow-hidden">
                                    <img
                                        alt="User Avatar"
                                        referrerPolicy="no-referrer"
                                        src={user?.photoURL || "https://i.ibb.co/mJR9QPG/placeholder.png"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://i.ibb.co/mJR9QPG/placeholder.png";
                                        }}
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
                                        <div className="mt-1.5">
                                            {isRoleLoading ? (
                                                <span className="inline-block bg-slate-100 rounded-full w-16 h-4 animate-pulse"></span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-purple-50 px-2.5 py-0.5 border border-purple-100 rounded-full font-semibold text-[11px] text-purple-700 uppercase">
                                                    {role === 'admin' && <FaUserShield className="text-purple-600" />}
                                                    {role === 'candidate' && <FaBriefcase className="text-purple-600" />}
                                                    {role === 'user' && <FaUserCircle className="text-purple-600" />}
                                                    {role}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </li>

                                {/* Navigation Links */}
                                <div className="space-y-1 py-1">
                                    <li>
                                        <Link to="/dashboard" onClick={closeDropdown} className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
                                            <FaThLarge className="text-purple-500" /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile" onClick={closeDropdown} className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
                                            <FaUserCircle className="text-purple-500" /> My Profile
                                        </Link>
                                    </li>
                                    {(role === 'candidate' || role === 'admin') && (
                                        <li>
                                            <Link to="/add-contest" onClick={closeDropdown} className="flex items-center gap-2.5 py-2 rounded-xl text-slate-700 hover:text-purple-600">
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
                                        className="flex items-center gap-2.5 hover:bg-rose-50 py-2 rounded-xl w-full font-medium text-rose-600 hover:text-rose-700 text-left transition-colors"
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