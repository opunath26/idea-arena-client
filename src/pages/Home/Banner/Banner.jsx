import React from 'react';
import banner from "../../../assets/banner.jpg"; 

const Banner = () => {
    
    return (
        // 1. **Outer Container** - Relative position for absolute children
        <div className="relative w-full h-[500px] overflow-hidden">
            
            {/* 2. **Image Background** - Full width, Full height, cover the area */}
            <img 
                src={banner} 
                alt="IdeaArena Innovation Banner" 
                className="w-full h-full object-cover" 
            />

            {/* 3. **Overlay (Dark Tint)** - Text readability er jonye */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* 4. **Content Container** - Absolute position, centered */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white">
                
                {/* Title */}
                <h1 className="mb-4 font-bold text-5xl md:text-7xl tracking-wider">
                    Idea<span className="text-purple-400">Arena</span>
                </h1>
                
                {/* Tagline */}
                <p className="mb-8 font-light text-xl md:text-2xl italic">
                    Where Innovation Takes Flight.
                </p>

                {/* Search Bar (Banner Requirement Onujayi) */}
                <div className="flex bg-white shadow-2xl p-2 rounded-full w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search Contests by Type (e.g., Image Design, Article Writing)..."
                        className="flex-grow p-3 rounded-l-full focus:outline-none text-gray-800"
                    />
                    
                    {/* Search Button/Icon */}
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold text-white transition duration-300">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;