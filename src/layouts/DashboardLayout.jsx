import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, Outlet } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
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

      {/* Extracted Sidebar Component */}
      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;