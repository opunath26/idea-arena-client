import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Brands from '../Brands/Brands';
import FAQSection from '../FAQSection/FAQSection';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ContestCard from '../../ContestCard/ContestCard';
import { Link } from 'react-router';
import Stats from '../Stats/Stats';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';
import Newsletter from '../Newsletter/Newsletter';

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['recentContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?limit=6');
            return res.data;
        }
    });

    return (
        <div>
            <Banner />
            
            <Stats />
            <About />

            {/* Recent Contests Section */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto px-4 container">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 font-bold text-gray-800 text-4xl">
                            Recent Innovation <span className="text-purple-600">Contests</span>
                        </h2>
                        <p className="text-gray-500">Check out the latest challenges and join the arena!</p>
                        <div className="bg-purple-500 mx-auto mt-4 rounded-full w-24 h-1"></div>
                    </div>

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <span className="text-purple-600 loading loading-bars loading-lg"></span>
                        </div>
                    ) : (
                        
                        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {contests.map(contest => (
                                <ContestCard key={contest._id} contest={contest} />
                            ))}
                        </div>
                    )}

                    {/* Show All Button */}
                    <div className="flex justify-center mt-16">
                        <Link to='/all-contests' className="shadow-lg hover:shadow-purple-200 px-12 rounded-full font-bold transition-all btn btn-primary btn-lg">
                            View All Contests
                        </Link>
                    </div>
                </div>
            </section>
            <HowItWorks />
            <Reviews />
            <Brands />
            <FAQSection />
            <Newsletter />
        </div>
    );
};

export default Home;