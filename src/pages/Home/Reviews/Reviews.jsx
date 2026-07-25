import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft, FaStar, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
    const testimonials = [
        {
            id: 1,
            name: "Tanvir Hasan",
            role: "UI/UX Designer",
            location: "Dhaka, Bangladesh",
            image: "https://i.pravatar.cc/150?u=tanvir",
            review: "IdeaArena-r contest e participate kore ami 1st prize peyechi! Platform tar transparency r payment process khubai fast & secure.",
            rating: 5,
            badge: "Contest Winner"
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            role: "Frontend Developer",
            location: "Chittagong, Bangladesh",
            image: "https://i.pravatar.cc/150?u=nusrat",
            review: "As a web developer, amar jonno ekhane project submit kora khubai easy chilo. Onno creator-der kaj dekhe onek kichu shikhte perechi.",
            rating: 5,
            badge: "Verified Creator"
        },
        {
            id: 3,
            name: "Ahmmed Rafiq",
            role: "Full-Stack Engineer",
            location: "Sylhet, Bangladesh",
            image: "https://i.pravatar.cc/150?u=rafiq",
            review: "Dashboard-er real-time notification r task submission system ta joss! Bangladeshi freelancer-der jonno best ekta platform.",
            rating: 5,
            badge: "Active Innovator"
        },
        {
            id: 4,
            name: "Sumaiya Akter",
            role: "Content Writer",
            location: "Rajshahi, Bangladesh",
            image: "https://i.pravatar.cc/150?u=sumaiya",
            review: "Amr contest create korar por admin khub taratari approve korechilo. Support team asolei khub helpful r responsive.",
            rating: 4,
            badge: "Contest Creator"
        },
        {
            id: 5,
            name: "Sabbir Hossain",
            role: "Graphics Designer",
            location: "Khulna, Bangladesh",
            image: "https://i.pravatar.cc/150?u=sabbir",
            review: "Logo design contest-e win kore direct client feedback peyechi. Amar portfolio build korar jonno eita onek help koreche.",
            rating: 5,
            badge: "Contest Winner"
        },
        {
            id: 6,
            name: "Farhana Islam",
            role: "Digital Marketer",
            location: "Dhaka, Bangladesh",
            image: "https://i.pravatar.cc/150?u=farhana",
            review: "IdeaArena-r community genuinely super supportive! Judges-der feedback r rating amar kajer quality onek barie diyeche.",
            rating: 5,
            badge: "Verified Creator"
        },
        {
            id: 7,
            name: "Mahmudul Karim",
            role: "App Developer",
            location: "Barisal, Bangladesh",
            image: "https://i.pravatar.cc/150?u=mahmud",
            review: "App innovation challenge-e join kore darun experience holo. UI smooth r kono hidden charge charai prize money withdraw kora jay.",
            rating: 5,
            badge: "Top Contender"
        },
        {
            id: 8,
            name: "Mehedi Hasan",
            role: "SEO Specialist",
            location: "Mymensingh, Bangladesh",
            image: "https://i.pravatar.cc/150?u=mehedi",
            review: "Contest create kora theke winner select kora porjonto shob process-i seamless. Bangladeshi user-der jonno highly recommended!",
            rating: 4,
            badge: "Contest Creator"
        }
    ];

    return (
        <section className="relative bg-gradient-to-b from-slate-50 via-purple-50/20 to-white py-20 lg:py-28 overflow-hidden text-slate-800">
            {/* Background Ambient Glows */}
            <div className="top-10 left-10 absolute bg-purple-200/30 blur-[130px] rounded-full w-96 h-96 pointer-events-none"></div>
            <div className="right-10 bottom-10 absolute bg-indigo-100/40 blur-[100px] rounded-full w-80 h-80 pointer-events-none"></div>

            <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-purple-100 mb-4 px-3.5 py-1.5 border border-purple-200 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                    >
                        Community Feedback
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
                    >
                        Loved By Innovators Across <span className="bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-transparent">Bangladesh</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-slate-600 text-base sm:text-lg"
                    >
                        See how students, creators, and professionals are learning, competing, and winning on IdeaArena.
                    </motion.p>
                </div>

                {/* Swiper Slider */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="px-2 pt-4 pb-16"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <motion.div 
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative flex flex-col justify-between bg-white shadow-md hover:shadow-xl p-7 sm:p-8 border border-slate-200/80 hover:border-purple-200 rounded-3xl h-full transition-all duration-300"
                                >
                                    <FaQuoteLeft className="top-6 right-6 absolute text-purple-100 text-4xl pointer-events-none" />
                                    
                                    <div>
                                        {/* Rating & Badge */}
                                        <div className="flex justify-between items-center gap-2 mb-4">
                                            <div className="flex gap-1 text-amber-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < item.rating ? 'text-amber-400' : 'text-slate-200'} />
                                                ))}
                                            </div>
                                            <span className="inline-flex items-center gap-1 bg-purple-50 px-2.5 py-0.5 border border-purple-100 rounded-md font-bold text-[11px] text-purple-700">
                                                <FaCheckCircle className="text-[10px]" /> {item.badge}
                                            </span>
                                        </div>

                                        {/* Review Text */}
                                        <p className="mb-8 text-slate-600 text-sm sm:text-base italic leading-relaxed">
                                            "{item.review}"
                                        </p>
                                    </div>

                                    {/* User Profile Footer */}
                                    <div className="flex items-center gap-4 pt-4 border-slate-100 border-t">
                                        <div className="relative">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="rounded-full ring-2 ring-purple-500 ring-offset-2 w-12 h-12 object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="flex items-center gap-1.5 font-bold text-slate-900 text-base">
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-xs">
                                                <span className="font-semibold text-purple-600">{item.role}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-0.5 text-slate-400">
                                                    <FaMapMarkerAlt className="text-[10px]" /> {item.location.split(',')[0]}
                                                </span>
                                            </div>
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