import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {

    const {user, logOut} = useAuth();

    const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      })};

    const links = <>
        <li><NavLink to="/add-contest">Add Contest</NavLink></li>
        <li><NavLink to="">About</NavLink></li>
    </>

    return (
        <div className="bg-base-100 shadow-sm navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="z-1 bg-base-100 shadow mt-3 p-2 rounded-box w-52 menu menu-sm dropdown-content">
                        {links}
                    </ul>
                </div>
                <a className=""> <Logo></Logo> </a>
            </div>
            <div className="hidden lg:flex navbar-center">
                <ul className="px-1 menu menu-horizontal">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleLogOut} className="bg-primary btn">Logout</a> : 
                    <Link className='btn' to="/login"> Log in </Link>
                }
                <Link className='btn btn-primary' to="/creator">Be a Creator</Link>
            </div>
        </div>
    );
};

export default Navbar;