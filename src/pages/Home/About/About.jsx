import React from 'react';
import { GiOldKing } from 'react-icons/gi';
import { IoCreateSharp, IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";

const About = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
            
            {/* Main Header Section */}
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="flex font-extrabold text-gray-900 dark:text-white text-4xl sm:text-5xl">
                    IdeaArena: Where Ideas Take Flight <BsRocketTakeoff />
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-xl">
                    A platform dedicated to fostering creativity, innovation, and competition across diverse fields.
                </p>
            </div>

            {/* Core Mission Section */}
            <div className="mx-auto mt-12 max-w-7xl">
                <div className="bg-white dark:bg-gray-800 shadow-xl p-8 rounded-lg overflow-hidden">
                    <h3 className="mb-6 pb-2 border-b font-bold text-purple-600 dark:text-purple-400 text-3xl">
                        Our Mission
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                        Our core goal is to build a vibrant community where **anyone can browse and explore contests**, **registered users can participate** and showcase their skills, and **Contest Creators can find the best talent** for their challenges. We believe in celebrating every achievement and turning concepts into reality.
                    </p>
                    <blockquote className="mt-6 pl-4 border-purple-500 border-l-4 font-semibold text-gray-500 dark:text-gray-400 text-xl italic">
                        "Build a fully functional, fully responsive, and visually appealing contest platform."
                    </blockquote>
                </div>
            </div>
            
            {/* Role-Based Structure Section */}
<div className="mx-auto mt-12 max-w-7xl">
    <h3 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl text-center">
        The Arena is Built for Everyone 
    </h3>
    
    <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
        
        {/* Role Card 1: Normal User */}
        <div className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl p-6 border-blue-500 hover:border-purple-600 border-t-4 rounded-lg hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-blue-500 dark:text-blue-400 text-3xl"><IoPersonSharp /></span>
                <h4 className="font-semibold text-gray-900 dark:text-white text-xl">Normal Users</h4>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Join contests after secure payment.</li>
                <li>Submit tasks and track progress.</li>
                <li>See participated & won contests in the Dashboard.</li>
            </ul>
        </div>

        {/* Role Card 2: Contest Creator */}
        <div className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl p-6 border-green-500 hover:border-purple-600 border-t-4 rounded-lg hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-green-500 dark:text-green-400 text-3xl"><IoCreateSharp /></span>
                <h4 className="font-semibold text-gray-900 dark:text-white text-xl">Contest Creators</h4>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Easily add, edit, and manage new contests.</li>
                <li>Review submissions efficiently.</li>
                <li>**Declare the winner** after the deadline.</li>
            </ul>
        </div>

        {/* Role Card 3: Admin */}
        <div className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl p-6 border-red-500 hover:border-purple-600 border-t-4 rounded-lg hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-red-500 dark:text-red-400 text-3xl"><GiOldKing /></span>
                <h4 className="font-semibold text-gray-900 dark:text-white text-xl">Admins</h4>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>**Approve or reject** new contests.</li>
                <li>Manage and change user roles (User ↔ Creator).</li>
                <li>Maintain platform integrity and security.</li>
            </ul>
        </div>
    </div>
</div>
            
            {/* Closing CTA Section */}
            <div className="mx-auto mt-16 max-w-4xl text-center">
                <p className="font-medium text-gray-800 dark:text-gray-200 text-2xl">
                    Ready to launch your idea or find the next big talent?
                </p>
                <button 
                    // onClick={() => window.location.href = '/all-contests'}
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 shadow-sm mt-6 px-8 py-3 border border-transparent rounded-full font-medium text-white text-lg transition duration-300"
                >
                    Explore Contests Now
                </button>
            </div>
            
        </div>
    );
};

export default About;