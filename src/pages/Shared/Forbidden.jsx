import React from 'react';
import Lottie from 'lottie-react';
import forbiddenAnimation from '../../assets/lottie/forbidden-lock.json';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 px-4 min-h-screen text-center">
            
            {/* Animation */}
            <div className="w-72 md:w-96">
                <Lottie
                    animationData={forbiddenAnimation}
                    loop={true}
                />
            </div>

            {/* Text */}
            <h1 className="mt-6 font-bold text-red-600 text-3xl">
                Access Forbidden
            </h1>

            <p className="mt-3 max-w-md text-gray-600">
                You do not have permission to access this page.
                This area is restricted to administrators only.
            </p>

            {/* Action */}
            <Link to="/">
                <button className="bg-primary hover:bg-primary/90 mt-6 px-6 py-2 rounded-lg font-semibold text-white transition">
                    Go Back Home
                </button>
            </Link>
        </div>
    );
};

export default Forbidden;
