import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Brands from '../Brands/Brands';
import FAQSection from '../FAQSection/FAQSection';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ContestCard from '../../ContestCard/ContestCard';
import { Link } from 'react-router';

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
            
            <About />

            {/* Recent Contests Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto px-4 container">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 font-bold text-gray-800 text-4xl">
                            Recent Innovation <span className="text-purple-600">Contests</span>
                        </h2>
                        <p className="text-gray-500">Check out the latest challenges and join the arena!</p>
                        <div className="bg-purple-500 mx-auto mt-4 rounded-full w-24 h-1"></div>
                    </div>

                    <ContestCard 
                        contests={contests} 
                        isLoading={isLoading} 
                    />

                    <div className="flex justify-center mt-12">
                        <Link to='/all-contests' className="rounded-full font-bold btn btn-primary btn-wide">
                            View All Contests
                        </Link>
                    </div>
                </div>
            </section>

            <Brands />
            <FAQSection />
        </div>
    );
};

export default Home;