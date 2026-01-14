import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaRocket, FaArrowRight } from "react-icons/fa";
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
        <div className="flex justify-center items-center bg-[#F3F4F9] p-0 sm:p-6 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex md:flex-row flex-col bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] sm:rounded-[3rem] w-full max-w-6xl min-h-[700px] overflow-hidden"
            >
                
                {/* Left Side: Hero Image Section */}
                <div className="hidden md:block relative md:w-[55%] overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
                        alt="Login Visual" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-800/50 to-transparent"></div>
                    
                    <div className="z-10 relative flex flex-col justify-between p-16 h-full text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl w-12 h-12">
                                <FaRocket className="text-yellow-400 text-xl" />
                            </div>
                            <span className="font-black text-2xl tracking-tighter">IdeaArena</span>
                        </div>
                        
                        <div>
                            <h2 className="mb-6 font-black text-5xl leading-tight">
                                Welcome <br />
                                <span className="text-yellow-400 decoration-2 decoration-wavy underline underline-offset-8">Back</span> to Arena.
                            </h2>
                            <p className="opacity-90 max-w-sm font-medium text-purple-100 text-lg">
                                Log in to access your dashboard, participate in contests, and manage your ideas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className="flex flex-col justify-center bg-white p-8 sm:p-16 md:w-[45%]">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-10">
                            <h2 className="mb-2 font-black text-gray-900 text-4xl">Hello Again!</h2>
                            <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-1">
                                <label className="ml-1 font-bold text-gray-500 text-xs uppercase">Email Address</label>
                                <div className="group relative">
                                    <FaEnvelope className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type="email"
                                        {...register("email", { required: "Email is required" })}
                                        placeholder="Enter your email"
                                        className="bg-gray-50 focus:bg-white py-4 pr-4 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                </div>
                                {errors.email && <p className="ml-2 font-bold text-[10px] text-red-500">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="font-bold text-gray-500 text-xs uppercase">Password</label>
                                    <button type="button" className="font-black text-[10px] text-purple-600 hover:text-indigo-700 uppercase tracking-tighter">Forgot Password?</button>
                                </div>
                                <div className="group relative">
                                    <FaLock className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: "Password is required" })}
                                        placeholder="••••••••"
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
                                {errors.password && <p className="ml-2 font-bold text-[10px] text-red-500">{errors.password.message}</p>}
                            </div>

                            <button className="flex justify-center items-center gap-3 bg-purple-600 hover:bg-gray-900 shadow-[0_20px_40px_-10px_rgba(147,51,234,0.3)] py-4 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all transform">
                                Sign In <FaArrowRight className="text-sm" />
                            </button>
                        </form>

                        {/* Demo Access */}
                        <div className="mt-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1 bg-gray-100 h-px"></div>
                                <p className="font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">Demo Login</p>
                                <div className="flex-1 bg-gray-100 h-px"></div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => handleDemoLogin('user')} className="flex-1 hover:bg-purple-50 py-3 border-2 border-gray-100 hover:border-purple-200 rounded-xl font-black text-[10px] text-gray-500 hover:text-purple-700 uppercase tracking-widest transition-all">
                                    User Demo
                                </button>
                                <button onClick={() => handleDemoLogin('admin')} className="flex-1 hover:bg-indigo-50 py-3 border-2 border-gray-100 hover:border-indigo-200 rounded-xl font-black text-[10px] text-gray-500 hover:text-indigo-700 uppercase tracking-widest transition-all">
                                    Admin Demo
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <SocialLogin />
                        </div>

                        <p className="mt-10 font-medium text-gray-500 text-sm text-center">
                            New here? 
                            <Link to="/register" className="ml-2 font-black text-purple-600 decoration-2 hover:underline underline-offset-4">Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;