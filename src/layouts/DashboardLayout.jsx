import React from "react";
import { FaFlagCheckered, FaHome, FaUsers, FaUser } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { GrCompliance, GrUserWorker } from "react-icons/gr";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { MdAssignmentInd, MdOutlineDashboard } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import logoImg from "../assets/Idea.png";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="bg-slate-50 dark:bg-base-300 mx-auto max-w-7xl min-h-screen drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <nav className="top-0 z-10 sticky flex justify-between items-center bg-base-100/80 shadow-sm backdrop-blur-md px-4 py-2.5 border-base-200 border-b w-full">
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="lg:hidden text-base-content btn btn-square btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-lg">
              <span className="bg-purple-100 dark:bg-purple-900/40 p-1.5 rounded-lg text-purple-600 dark:text-purple-300">
                <MdOutlineDashboard className="size-5" />
              </span>
              <span>Idea Arena Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hover:bg-purple-600 border-purple-500 hover:border-purple-600 rounded-lg btn-outline text-purple-600 hover:text-white transition-all btn btn-sm"
            >
              <FaHome /> Back to Home
            </Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="p-4 md:p-6 grow">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Area */}
      <div className="z-20 drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col justify-between bg-base-100 shadow-lg lg:shadow-none p-4 border-base-200 border-r w-64 min-h-full text-base-content">
          <div className="w-full">
            {/* Logo Section */}
            <div className="mb-6 px-3 py-2 pb-4 border-base-200 border-b">
              <Link to="/" className="flex items-center gap-3">
                <img src={logoImg} alt="Idea Arena Logo" className="w-auto h-9 object-contain" />
                <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold text-transparent text-xl tracking-wide">
                  Idea Arena
                </span>
              </Link>
            </div>

            {/* Menu Links */}
            <ul className="gap-1.5 p-0 w-full menu menu-md">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                        : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  <MdOutlineDashboard className="size-5" />
                  <span>Dashboard Overview</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                        : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  <FaUser className="size-4" />
                  <span>My Profile</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-contests"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                        : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  <FaFlagCheckered className="size-4" />
                  <span>My Contests</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                        : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  <FaRegCreditCard className="size-4" />
                  <span>Payment History</span>
                </NavLink>
              </li>

              {/* Candidate Specific Links */}
              {role === "candidate" && (
                <>
                  <div className="px-3 pt-4 pb-1 font-semibold text-slate-400 text-xs uppercase tracking-wider">
                    Organizer Menu
                  </div>
                  <li>
                    <NavLink
                      to="/dashboard/contest-management"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                            : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                        }`
                      }
                    >
                      <HiOutlineDocumentReport className="size-5" />
                      <span>Contest Management</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/prize-delivered"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                            : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                        }`
                      }
                    >
                      <GrCompliance className="size-4" />
                      <span>Prize Delivered</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Specific Links */}
              {role === "admin" && (
                <>
                  <div className="px-3 pt-4 pb-1 font-semibold text-slate-400 text-xs uppercase tracking-wider">
                    Admin Menu
                  </div>
                  <li>
                    <NavLink
                      to="/dashboard/approve-candidates"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                            : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                        }`
                      }
                    >
                      <GrUserWorker className="size-4" />
                      <span>Approve Candidates</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/assign-candidates"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                            : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                        }`
                      }
                    >
                      <MdAssignmentInd className="size-5" />
                      <span>Assign Candidates</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/users-management"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none"
                            : "hover:bg-base-200 text-slate-600 dark:text-slate-300"
                        }`
                      }
                    >
                      <FaUsers className="size-4" />
                      <span>Users Management</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* User Role Badge in Sidebar Footer */}
          <div className="mt-auto pt-4 border-base-200 border-t">
            <div className="flex justify-between items-center bg-base-200/60 px-3 py-2 rounded-xl">
              <span className="font-medium text-slate-500 text-xs">Current Role</span>
              <span className="bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded-md font-bold text-purple-700 dark:text-purple-300 text-xs uppercase">
                {role || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;