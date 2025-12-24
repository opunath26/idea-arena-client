import React from 'react';

const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 px-4 min-h-screen">
            <div className="text-center">
                {/* Error Number/Illustration */}
                <h1 className="font-extrabold text-blue-600 text-9xl tracking-widest">404</h1>
                
                {/* Message */}
                <div className="absolute bg-blue-600 -mt-16 ml-24 px-2 rounded text-white text-sm rotate-12">
                    Page Not Found
                </div>

                <h2 className="mt-8 font-bold text-gray-800 text-3xl md:text-4xl">
                    Oops! Kichu ekta vul hoyeche.
                </h2>
                
                <p className="mt-4 text-gray-600 text-lg">
                    Apni jei page-ti khujchen seta hoyto delete hoye geche ba link-e vul ache.
                </p>

                {/* Navigation Button */}
                <div className="mt-10">
                    <a
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-3 rounded-full font-semibold text-white transition duration-300 ease-in-out"
                    >
                        Back to Home
                    </a>
                </div>
            </div>

            <div className="mt-12">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
                    alt="Error Illustration" 
                    className="opacity-80 w-64 h-64 object-contain"
                 />
            </div>
        </div>
    );
};

export default Error;