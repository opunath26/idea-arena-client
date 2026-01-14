import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => navigate(location?.state || '/'))
            .catch(error => console.error(error));
    };

    const handleDemoLogin = (role) => {
        const credentials = role === 'admin' 
            ? { email: 'admin@ideaarena.com', pass: 'Admin@123' } 
            : { email: 'user@demo.com', pass: 'User@123' };
        
        setValue('email', credentials.email);
        setValue('password', credentials.pass);
    };

    return (
        <div className="flex justify-center items-center bg-[#F3F4F9] p-4 sm:p-6 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex md:flex-row flex-col bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3rem] w-full max-w-6xl min-h-[700px] overflow-hidden"
            >
                
                {/* Left Side: Eye-Catching Image Section */}
                <div className="hidden md:block relative md:w-[55%] overflow-hidden">
                    {/* আকর্ষণীয় ইমেজ */}
                    <img 
                        src="https://img.freepik.com/free-vector/gradient-dynamic-purple-lines-background_23-2148995757.jpg?t=st=1716300000&exp=1716303600&hmac=..." 
                        // বিকল্প ইমেজ (3D Illustration): 
                        // src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3718441.png"
                        alt="Arena Visual" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Overlay with Content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-700/80 via-indigo-800/60 to-transparent"></div>
                    
                    <div className="z-10 relative flex flex-col justify-between p-16 h-full">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center bg-white shadow-lg rounded-xl w-10 h-10">
                                <FaRocket className="text-purple-600 text-xl" />
                            </div>
                            <span className="font-black text-white text-2xl tracking-tighter">IdeaArena</span>
                        </div>
                        
                        <div className="text-white">
                            <h2 className="mb-6 font-black text-5xl leading-tight">
                                Start Your <br />
                                <span className="text-yellow-400 decoration-2 decoration-wavy underline underline-offset-8">Innovation</span> Journey.
                            </h2>
                            <p className="max-w-sm font-medium text-purple-100 text-lg">
                                Join 10,000+ innovators and compete in the world's most exciting challenges.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Professional Form Section */}
                <div className="flex flex-col justify-center bg-white p-8 sm:p-16 md:w-[45%]">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-10">
                            <h2 className="mb-2 font-black text-gray-900 text-4xl">Hello Again!</h2>
                            <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-1">
                                <div className="group relative">
                                    <FaEnvelope className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type="email"
                                        {...register("email", { required: true })}
                                        placeholder="Email Address"
                                        className="bg-gray-50 focus:bg-white py-4 pr-4 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <div className="group relative">
                                    <FaLock className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: true })}
                                        placeholder="Password"
                                        className="bg-gray-50 focus:bg-white py-4 pr-12 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="top-1/2 right-4 absolute text-gray-400 hover:text-purple-600 transition-colors -translate-y-1/2"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button className="bg-purple-600 hover:bg-gray-900 shadow-[0_20px_40px_-10px_rgba(147,51,234,0.3)] py-4 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all transform">
                                Sign In Now
                            </button>
                        </form>

                        {/* Demo Login - More Attractive */}
                        <div className="mt-10">
                            <p className="mb-4 font-black text-[10px] text-gray-400 text-center uppercase tracking-[0.2em]">Quick Access Demo</p>
                            <div className="flex gap-3">
                                <button onClick={() => handleDemoLogin('user')} className="flex-1 hover:bg-purple-50 py-3 border-2 border-gray-100 hover:border-purple-200 rounded-xl font-bold text-gray-600 text-xs transition-all">
                                    User Demo
                                </button>
                                <button onClick={() => handleDemoLogin('admin')} className="flex-1 hover:bg-indigo-50 py-3 border-2 border-gray-100 hover:border-indigo-200 rounded-xl font-bold text-gray-600 text-xs transition-all">
                                    Admin Demo
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <SocialLogin />
                        </div>

                        <p className="mt-10 font-medium text-gray-500 text-center">
                            Don't have an account? 
                            <Link to="/register" className="ml-2 font-black text-purple-600 decoration-2 hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;