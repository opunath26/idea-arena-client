import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const WinnerSlider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: winners = [], isLoading } = useQuery({
        queryKey: ['winners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?submitStatus=prize-delivered');
            return res.data;
        }
    });

    if (isLoading) return null;

    if (winners.length === 0) return null;

    return (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
            <div className="mx-auto px-4 container">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="font-black text-gray-800 text-3xl md:text-5xl uppercase tracking-tighter">
                        Our Proud <span className="text-blue-600">Winners</span>
                    </h2>
                    <p className="mt-3 font-medium text-gray-500">Congratulations to the champions of Idea Arena!</p>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="bg-white shadow-2xl mx-auto rounded-3xl max-w-5xl overflow-hidden"
                >
                    {winners.map((winner) => (
                        <SwiperSlide key={winner._id}>
                            <div className="flex md:flex-row flex-col items-center gap-10 p-8 md:p-16">
                                {/* Winner Image */}
                                <div className="relative">
                                    <div className="shadow-xl border-8 border-blue-100 rounded-full w-48 md:w-64 h-48 md:h-64 overflow-hidden">
                                        <img 
                                            src={winner.candidateImage || 'https://i.ibb.co/5GzXkwq/user.png'} 
                                            alt={winner.candidateName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="-bottom-4 left-1/2 absolute bg-yellow-400 shadow-md px-6 py-1 rounded-full font-black text-gray-900 text-sm uppercase -translate-x-1/2">
                                        Champion
                                    </div>
                                </div>

                                {/* Winner Details */}
                                <div className="flex-1 md:text-left text-center">
                                    <h4 className="mb-2 font-bold text-blue-600 text-lg uppercase tracking-widest">
                                        {winner.contestTitle}
                                    </h4>
                                    <h3 className="mb-4 font-extrabold text-gray-900 text-3xl md:text-5xl">
                                        {winner.candidateName}
                                    </h3>
                                    <p className="mb-6 text-gray-600 text-lg italic">
                                        "Winning this contest was a dream come true. Thanks to Idea Arena for this amazing opportunity!"
                                    </p>
                                    <div className="inline-block bg-green-100 px-8 py-3 rounded-2xl text-green-700">
                                        <span className="block opacity-70 font-bold text-sm uppercase">Prize Money Won</span>
                                        <span className="font-black text-3xl">${winner.contestPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default WinnerSlider;