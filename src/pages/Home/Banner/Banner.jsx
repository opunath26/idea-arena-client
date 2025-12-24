import React from 'react';
import banner from "../../../assets/banner.jpg"; 

const Banner = ({ onSearch }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = e.target.searchField.value;
        onSearch(searchText);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            <img 
                src={banner} 
                alt="IdeaArena Innovation Banner" 
                className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white">
                <h1 className="mb-4 font-bold text-5xl md:text-7xl tracking-wider">
                    Idea<span className="text-purple-400">Arena</span>
                </h1>
                <p className="mb-8 font-light text-xl md:text-2xl italic">
                    Where Innovation Takes Flight.
                </p>

                {/* Search Bar Form */}
                <form onSubmit={handleSubmit} className="flex bg-white shadow-2xl p-2 rounded-full w-full max-w-2xl">
                    <input
                        name="searchField"
                        type="text"
                        placeholder="Search Contests..."
                        className="flex-grow p-3 rounded-l-full focus:outline-none text-gray-800"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold text-white transition duration-300">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Banner;