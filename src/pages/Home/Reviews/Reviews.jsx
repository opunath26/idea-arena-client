import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Graphic Designer",
            image: "https://i.pravatar.cc/150?u=alex",
            review: "IdeaArena is the best platform I've used to showcase my design skills. The competition is tough, but the rewards are worth it!",
            rating: 5
        },
        {
            name: "Sarah Miller",
            role: "Web Developer",
            image: "https://i.pravatar.cc/150?u=sarah",
            review: "I love the transparency of the contests. Winning the 'Tech Innovation' challenge was a huge milestone for my career.",
            rating: 5
        },
        {
            name: "David Chen",
            role: "Content Creator",
            image: "https://i.pravatar.cc/150?u=david",
            review: "The UI is very intuitive. As a creator, I found it extremely easy to manage my submissions and track the results.",
            rating: 4
        },
        {
            name: "Elena Rodriguez",
            role: "UI/UX Specialist",
            image: "https://i.pravatar.cc/150?u=elena",
            review: "A fantastic community! The feedback from the judges helped me improve my craft significantly. Highly recommended.",
            rating: 5
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="mx-auto px-4 container">
                
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.h4 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-2 font-bold text-purple-600 text-sm uppercase tracking-widest"
                    >
                        Testimonials
                    </motion.h4>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-bold text-gray-800 text-4xl md:text-5xl"
                    >
                        What Our <span className="text-purple-600">Innovators</span> Say
                    </motion.h2>
                </div>

                {/* Swiper Slider */}
                <div className="mx-auto max-w-6xl">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="pb-16"
                    >
                        {testimonials.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <motion.div 
                                    whileHover={{ y: -10 }}
                                    className="relative flex flex-col bg-gray-50 shadow-sm p-8 border border-gray-100 rounded-3xl h-full"
                                >
                                    <FaQuoteLeft className="top-6 right-8 absolute text-purple-200 text-5xl" />
                                    
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4 text-amber-400">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>

                                    <p className="flex-grow mb-8 text-gray-600 italic">
                                        "{item.review}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="rounded-full ring ring-purple-500 ring-offset-2 ring-offset-base-100 w-14">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                                            <p className="font-medium text-purple-600 text-sm">{item.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Reviews;