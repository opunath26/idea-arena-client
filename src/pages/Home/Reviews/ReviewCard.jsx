import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';


const RatingStars = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`text-xl ${
                        index < rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                    }`}
                />
            ))}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    const {quote, author, role, rating, photo} = review;
    return (
        <div
            // Base Card Styling and Hover Effect
            className="flex flex-col bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg hover:shadow-2xl p-6 border-purple-500 border-t-4 rounded-xl h-full hover:scale-[1.01] transition duration-500 cursor-pointer transform"
        >
            <div className="flex flex-col flex-grow">
                {/* Quote Icon and Rating */}
                <div className="flex justify-between items-center mb-4">
                    <FaQuoteLeft className="text-purple-600 dark:text-purple-400 text-3xl" />
                    <RatingStars rating={rating} />
                </div>
                
                {/* Quote Text */}
                <p className="flex-grow mt-2 text-gray-700 dark:text-gray-300 text-lg italic">
                    "{quote}"
                </p>
            </div>
            
            {/* Author Info (Footer) */}
            <div className="flex items-center mt-6 pt-4 border-gray-200 dark:border-gray-700 border-t">
                
                {/* Profile Picture (Need to handle asset paths) */}
                <img
                    src={photo}
                    alt={author}
                    className="mr-4 border-2 border-purple-500 rounded-full w-12 h-12 object-cover"
                />

                {/* Name and Role */}
                <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                        {author}
                    </p>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;