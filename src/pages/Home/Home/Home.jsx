import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Brands from '../Brands/Brands';
import FAQSection from '../FAQSection/FAQSection';
import Stats from '../Stats/Stats';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';
import Newsletter from '../Newsletter/Newsletter';
import RecentContests from '../RecentContests/RecentContests';

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />
            <RecentContests />
            <About />
            <HowItWorks />
            <Stats />
            <Reviews />
            <FAQSection />
            <Newsletter />
        </div>
    );
};

export default Home;