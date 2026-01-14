import React from 'react';
import Slider from 'react-slick';
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
        speed: 4000,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="mx-auto px-6 max-w-7xl">
                {/* Section Title with subtle underline */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="font-bold text-slate-800 text-2xl md:text-3xl text-center tracking-tight">
                        Trusted By Industry Leaders
                    </h2>
                    <div className="bg-blue-500 mt-4 rounded-full w-16 h-1"></div>
                </div>
                
                {/* Logo Slider Wrapper */}
                <div className="relative">
                    {/* Left & Right Fade Effect (Masking) */}
                    <div className="left-0 z-10 absolute inset-y-0 bg-gradient-to-r from-white to-transparent w-20 pointer-events-none"></div>
                    <div className="right-0 z-10 absolute inset-y-0 bg-gradient-to-l from-white to-transparent w-20 pointer-events-none"></div>

                    <Slider {...settings} className="flex items-center brand-slider">
                        {clientLogos.map((logo) => (
                            <div key={logo.id} className="px-8 focus:outline-none">
                                <div className="flex justify-center items-center opacity-40 hover:opacity-100 grayscale hover:grayscale-0 h-20 hover:scale-110 transition-all duration-500 transform">
                                    <img 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        className="w-auto max-h-12 object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-auto mt-10 max-w-4xl h-[1px]"></div>
        </section>
    );
};

export default Brands;