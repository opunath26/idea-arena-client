import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import logo1 from '../../../assets/Brands/L1.png';
import logo2 from '../../../assets/Brands/L2.png';
import logo3 from '../../../assets/Brands/L3.png';
import logo4 from '../../../assets/Brands/L4.png';
import logo5 from '../../../assets/Brands/L5.png';



const clientLogos = [
    { id: 1, src: logo1, alt: "Client Company 1" },
    { id: 2, src: logo2, alt: "Client Company 2" },
    { id: 3, src: logo3, alt: "Client Company 3" },
    { id: 4, src: logo4, alt: "Client Company 4" },
    { id: 5, src: logo5, alt: "Client Company 5" },
    { id: 6, src: logo1, alt: "Client Company 1 Duplicate" },
    { id: 7, src: logo2, alt: "Client Company 2 Duplicate" },
    { id: 7, src: logo3, alt: "Client Company 3 Duplicate" },
    { id: 7, src: logo4, alt: "Client Company 4 Duplicate" },
    { id: 7, src: logo5, alt: "Client Company 5 Duplicate" },
    { id: 7, src: logo2, alt: "Client Company 2 Duplicate" },
];

const Brands = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
            <h2 className="mb-8 font-bold text-gray-800 dark:text-white text-3xl text-center">
                Trusted By Industry Leaders
            </h2>
            
            <div className="mx-auto px-4 max-w-7xl overflow-hidden">
                <Slider {...settings}>
                    {clientLogos.map((logo) => (
                        <div key={logo.id} className="flex justify-center items-center p-4">
                            
                            <img 
                                src={logo.src} 
                                alt={logo.alt} 
                                className="opacity-60 hover:opacity-100 grayscale hover:grayscale-0 w-auto h-10 transition duration-300 filter"
                                style={{ maxHeight: '40px' }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Brands;