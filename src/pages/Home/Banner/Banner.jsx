import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { FiSearch } from 'react-icons/fi';
import { FaRocket, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import banner1 from "../../../assets/banner.jpg"; 

const Banner = ({ onSearch }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const slidesData = [
        {
            img: banner1,
            badge: "Welcome to IdeaArena",
            title: "Where Creative Ideas Take Flight",
            desc: "Compete with global innovators, showcase your skills, and win exciting cash rewards."
        },
        {
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            badge: "Host & Discover",
            title: "Launch Your Next Big Challenge",
            desc: "Empower talented creators by hosting transparent, high-impact contests with real results."
        },
        {
            img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
            badge: "Compete & Earn",
            title: "Turn Passion Into Recognition",
            desc: "Get noticed by industry experts, build an outstanding portfolio, and climb the leaderboard."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleQuickSearch = (category) => {
        setSearchValue(category);
        if (onSearch) {
            onSearch(category);
        }
    };

    return (
        <div className="relative w-full h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
            
            {/* Background Swiper Slider */}
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="[&_.swiper-pagination-bullet-active]:bg-purple-500 w-full h-full"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="bg-cover bg-center w-full h-full hover:scale-105 transition-transform duration-[7000ms] ease-out"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-purple-950/70 to-gray-950/80" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Foreground Content Container */}
            <div className="z-10 absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-white text-center">
                
                {/* Dynamic Title & Subtitle based on active slide */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center max-w-4xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md mb-3 sm:mb-4 px-3.5 sm:px-4 py-1.5 border border-purple-400/30 rounded-full font-semibold text-purple-300 text-xs sm:text-sm uppercase tracking-wider">
                            <FaRocket className="text-purple-400" />
                            {slidesData[activeIndex].badge}
                        </div>

                        {/* Title */}
                        <h1 className="mb-3 sm:mb-4 font-black text-3xl sm:text-5xl lg:text-7xl leading-tight sm:leading-none tracking-tight">
                            {slidesData[activeIndex].title}
                        </h1>

                        {/* Description */}
                        <p className="mb-6 sm:mb-8 max-w-2xl font-normal text-gray-200 text-sm sm:text-lg lg:text-xl leading-relaxed">
                            {slidesData[activeIndex].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Glassmorphic Search Bar */}
                <motion.form 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    onSubmit={handleSubmit} 
                    className="flex items-center bg-white/90 dark:bg-gray-900/90 shadow-2xl backdrop-blur-md p-1.5 border border-white/20 dark:border-gray-700/50 rounded-full w-full max-w-2xl"
                >
                    <div className="pl-4 sm:pl-5 text-gray-400 text-lg sm:text-xl">
                        <FiSearch />
                    </div>
                    <input
                        name="searchField"
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search innovative contests, tags, categories..."
                        className="flex-grow bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 rounded-l-full focus:outline-none font-medium text-gray-800 dark:text-gray-100 text-xs sm:text-base placeholder-gray-400"
                    />
                    <button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-indigo-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25 px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-base whitespace-nowrap active:scale-95 transition-all cursor-pointer transform"
                    >
                        Search
                    </button>
                </motion.form>

                {/* Popular Search Quick Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="hidden sm:flex items-center gap-2 mt-4 text-gray-300 text-xs"
                >
                    <span className="font-semibold text-purple-300">Popular:</span>
                    {["Web Dev", "Logo Design", "Writing", "AI Art"].map((tag, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleQuickSearch(tag)}
                            className="bg-white/10 hover:bg-purple-500/30 px-3 py-1 border border-white/10 hover:border-purple-400/50 rounded-full transition-colors cursor-pointer"
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* Action CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
                >
                    <Link 
                        to="/all-contests"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 hover:from-purple-700 to-indigo-600 hover:to-indigo-700 shadow-lg shadow-purple-600/30 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-white text-xs sm:text-sm transition-all hover:-translate-y-0.5 transform"
                    >
                        <FaTrophy className="text-yellow-300" /> Explore Contests
                    </Link>
                    <Link 
                        to="/dashboard"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 border border-white/20 rounded-xl font-bold text-white text-xs sm:text-sm transition-all hover:-translate-y-0.5 transform"
                    >
                        Get Started
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default Banner;