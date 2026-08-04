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

  // Mobile Drawer Auto-Close Handler
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-4");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="bg-slate-50 mx-auto max-w-7xl min-h-screen drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="flex flex-col drawer-content">
        {/* Top Navbar */}
        <nav className="top-0 z-10 sticky flex justify-between items-center bg-white/80 shadow-sm backdrop-blur-md px-4 sm:px-6 py-2.5 border-slate-200/80 border-b w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="lg:hidden text-slate-700 hover:text-purple-600 btn btn-square btn-ghost btn-sm"
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

            <div className="flex items-center gap-2 font-bold text-slate-800 text-base sm:text-lg">
              <span className="bg-purple-100 p-1.5 rounded-lg text-purple-600">
                <MdOutlineDashboard className="size-5" />
              </span>
              <span className="truncate">Idea Arena Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hover:bg-purple-600 border-purple-500 hover:border-purple-600 rounded-lg btn-outline text-purple-600 hover:text-white transition-all btn btn-sm"
            >
              <FaHome /> <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6 grow">
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
        
        <div className="flex flex-col justify-between bg-white shadow-xl lg:shadow-none p-4 border-slate-200/80 border-r w-64 sm:w-72 lg:w-64 min-h-full text-slate-700">
          <div className="w-full">
            {/* Logo Section */}
            <div className="mb-6 px-2 py-2 pb-4 border-slate-100 border-b">
              <Link to="/" onClick={closeDrawer} className="flex items-center gap-3">
                <img src={logoImg} alt="Idea Arena Logo" className="w-auto h-8 sm:h-9 object-contain" />
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
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                        : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                        : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                        : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                        : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                      onClick={closeDrawer}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                      onClick={closeDrawer}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                      onClick={closeDrawer}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                      onClick={closeDrawer}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
                      onClick={closeDrawer}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "hover:bg-purple-50 text-slate-600 hover:text-purple-600"
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
          <div className="mt-auto pt-4 border-slate-100 border-t">
            <div className="flex justify-between items-center bg-slate-100/70 px-3 py-2 rounded-xl">
              <span className="font-medium text-slate-500 text-xs">Current Role</span>
              <span className="bg-purple-100 px-2.5 py-0.5 rounded-md font-bold text-purple-700 text-xs uppercase">
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