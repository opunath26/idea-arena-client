import React from 'react';

const SpinnerLoader = () => {
    return (
        <div className="flex justify-center items-center p-12 min-h-[300px]">
            {/* Tailwind CSS Circular Spinner */}
            <div 
                className="border-4 border-gray-200 border-purple-500 dark:border-gray-700 border-t-4 dark:border-t-purple-400 rounded-full w-12 h-12 animate-spin"
                role="status"
            >
                {/* Screen-reader-er jonyo text */}
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerLoader;