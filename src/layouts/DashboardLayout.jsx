import { NavLink, Outlet } from "react-router";
import { FaHome, FaPlusCircle, FaListAlt, FaUsers, FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex bg-base-200 min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block bg-base-100 shadow-lg w-64">
        <div className="p-5 border-b font-bold text-xl">
          Dashboard
        </div>
        <ul className="gap-2 p-4 menu">
          {/* <li>
            <NavLink to="/dashboard" className="flex gap-2">
              <FaHome /> Overview
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/dashboard/add-contest" className="flex gap-2">
              <FaPlusCircle /> Add Contest
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/dashboard/my-contests" className="flex gap-2">
              <FaListAlt /> My Contests
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/dashboard/users" className="flex gap-2">
              <FaUsers /> Users
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/dashboard/profile" className="flex gap-2">
              <FaUserCircle /> Profile
            </NavLink>
          </li> */}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Outlet></Outlet>
        {/* Top Navbar */}
        <div className="md:hidden bg-base-100 shadow-md navbar">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-semibold">Dashboard</div>
        </div>

        {/* Drawer for Mobile */}
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <main className="p-4">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <aside className="bg-base-100 w-64">
            <ul className="gap-2 p-4 menu">
              {/* <li><NavLink to="/dashboard"><FaHome /> Overview</NavLink></li>
              <li><NavLink to="/dashboard/add-contest"><FaPlusCircle /> Add Contest</NavLink></li>
              <li><NavLink to="/dashboard/my-contests"><FaListAlt /> My Contests</NavLink></li>
              <li><NavLink to="/dashboard/users"><FaUsers /> Users</NavLink></li>
              <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li> */}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
