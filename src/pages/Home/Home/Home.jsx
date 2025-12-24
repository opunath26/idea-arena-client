import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import FAQSection from '../FAQSection/FAQSection';
import ContestCard from '../../ContestCard/ContestCard';


// const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <ContestCard />
            <Brands />
            {/* <Reviews reviewsPromise={reviewsPromise}/> */}
            <FAQSection />
        </div>
    );
};

export default Home;