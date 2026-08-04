import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo1 from '../../../assets/Brands/L1.png';
import logo2 from '../../../assets/Brands/L2.png';
import logo3 from '../../../assets/Brands/L3.png';
import logo4 from '../../../assets/Brands/L4.png';
import logo5 from '../../../assets/Brands/L5.png';

const Brands = () => {
    const clientLogos = [
        { id: 1, src: logo1, alt: "Client 1" },
        { id: 2, src: logo2, alt: "Client 2" },
        { id: 3, src: logo3, alt: "Client 3" },
        { id: 4, src: logo4, alt: "Client 4" },
        { id: 5, src: logo5, alt: "Client 5" },
        { id: 6, src: logo1, alt: "Client 1 Ref" },
        { id: 7, src: logo2, alt: "Client 2 Ref" },
        { id: 8, src: logo3, alt: "Client 3 Ref" },
        { id: 9, src: logo4, alt: "Client 4 Ref" },
        { id: 10, src: logo5, alt: "Client 5 Ref" },
    ];

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <section className="bg-white py-10 md:py-16 overflow-hidden">
            <div className="mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Header with Framer Motion Animation */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-2 font-semibold text-purple-600 text-xs uppercase tracking-widest text-center"
                    >
                        Our Strategic Partners
                    </motion.span>

                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-extrabold text-slate-800 text-xl sm:text-2xl md:text-3xl text-center tracking-tight"
                    >
                        Trusted By Industry Leaders
                    </motion.h2>

                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "64px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 mt-3 rounded-full h-1"
                    />
                </div>
                
                {/* Logo Slider Wrapper with Soft Gradient Masks */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    {/* Left & Right Gradient Fade Masks */}
                    <div className="top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-r from-white to-transparent w-8 sm:w-16 md:w-24 pointer-events-none" />
                    <div className="top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-l from-white to-transparent w-8 sm:w-16 md:w-24 pointer-events-none" />

                    <Slider {...settings} className="flex items-center brand-slider">
                        {clientLogos.map((logo) => (
                            <div key={logo.id} className="p-2 sm:p-3 focus:outline-none">
                                <div className="group flex justify-center items-center bg-gray-50/80 hover:bg-white shadow-xs hover:shadow-purple-500/10 hover:shadow-xl p-3 sm:p-4 border border-slate-100 hover:border-purple-200 rounded-xl sm:rounded-2xl h-16 sm:h-20 transition-all group-hover:-translate-y-1 duration-300 transform">
                                    <img 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        className="opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 w-auto max-h-8 sm:max-h-10 object-contain group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            </div>

            {/* Subtle Gradient Divider */}
            <div className="bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-auto mt-8 md:mt-12 max-w-4xl h-[1px]"></div>
        </section>
    );
};

export default Brands;