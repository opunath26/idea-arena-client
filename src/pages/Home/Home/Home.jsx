import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import FAQSection from '../FAQSection/FAQSection';
import Stats from '../Stats/Stats';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';
import Newsletter from '../Newsletter/Newsletter';
import RecentContests from '../RecentContests/RecentContests';
import AboutSection from '../About/AboutSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />
            <RecentContests />
            <AboutSection />
            <HowItWorks />
            <Stats />
            <Reviews />
            <FAQSection />
            <Newsletter /> 
        </div>
    );
};

export default Home;