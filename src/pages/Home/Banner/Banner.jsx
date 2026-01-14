import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

import banner1 from "../../../assets/banner.jpg"; 
// import banner2 from "../../../assets/banner2.jpg"; 
// import banner3 from "../../../assets/banner3.jpg"; 

const Banner = ({ onSearch }) => {
    
    
    const images = [
        banner1,
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = e.target.searchField.value;
        onSearch(searchText);
    };

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            
            {/* Swiper Slider Section */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect={'fade'}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="bg-cover bg-center w-full h-full hover:scale-110 transition-transform duration-[5000ms]"
                            style={{ backgroundImage: `url(${img})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content Container (Fixed over Slider) */}
            <div className="z-10 absolute inset-0 flex flex-col justify-center items-center p-4 text-white text-center">
                
                <motion.h1 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 font-bold text-5xl md:text-7xl tracking-tight"
                >
                    Idea<span className="text-purple-500">Arena</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-8 max-w-2xl font-medium text-gray-200 text-lg md:text-2xl"
                >
                    Fuel your creativity and compete with the best minds in the world.
                </motion.p>

                {/* Search Bar */}
                <motion.form 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onSubmit={handleSubmit} 
                    className="flex bg-white/95 shadow-2xl backdrop-blur-sm p-1.5 border border-white/20 rounded-full w-full max-w-2xl"
                >
                    <input
                        name="searchField"
                        type="text"
                        placeholder="Explore innovate contests..."
                        className="flex-grow bg-transparent px-6 py-3 rounded-l-full focus:outline-none text-gray-800"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-10 py-3 rounded-full font-bold text-white active:scale-95 transition-all transform">
                        Search
                    </button>
                </motion.form>

                {/* CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap justify-center gap-4 mt-12"
                >
                    <button className="bg-purple-600 hover:bg-purple-700 shadow-purple-500/20 shadow-xl px-10 py-4 border-none rounded-xl h-auto min-h-0 font-bold text-white btn">
                        Get Started
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-10 py-4 border border-white/30 rounded-xl h-auto min-h-0 font-bold text-white btn">
                        See Gallery
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;