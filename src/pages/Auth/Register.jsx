import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUser, FaEnvelope, FaLock, FaImage, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append("image", profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            role: 'user' // Default role
                        };

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User synced to database');
                                }
                            });

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error));
                    });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="flex justify-center items-center bg-[#F3F4F9] p-0 sm:p-6 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex md:flex-row flex-col bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] sm:rounded-[3rem] w-full max-w-6xl min-h-[750px] overflow-hidden"
            >
                {/* Left Side: Visual Section */}
                <div className="hidden md:block relative md:w-[45%] overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                        alt="Register Visual" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-800/40 to-transparent"></div>
                    
                    <div className="z-10 relative flex flex-col justify-end p-12 h-full text-white">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="mb-4 font-black text-5xl leading-tight">
                                Join the <br /> <span className="text-yellow-400">Innovation</span> Hub.
                            </h2>
                            <p className="opacity-90 max-w-sm text-purple-100 text-lg">
                                Create an account to participate in global contests and showcase your talent.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className="flex flex-col justify-center bg-white p-8 sm:p-16 md:w-[55%] overflow-y-auto">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8">
                            <h2 className="mb-2 font-black text-gray-900 text-4xl tracking-tight">Create Account</h2>
                            <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">Start your journey today</p>
                        </div>

                        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-1">
                                <label className="ml-1 font-bold text-gray-500 text-xs uppercase">Full Name</label>
                                <div className="group relative">
                                    <FaUser className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="Enter your name"
                                        className="bg-gray-50 focus:bg-white py-3.5 pr-4 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                </div>
                                {errors.name && <p className="ml-2 font-bold text-[10px] text-red-500 italic tracking-wide">{errors.name.message}</p>}
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-1">
                                <label className="ml-1 font-bold text-gray-500 text-xs uppercase tracking-tighter">Profile Photo</label>
                                <div className="group relative">
                                    <FaImage className="top-1/2 left-4 z-10 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type="file"
                                        {...register("photo", { required: "Photo is required" })}
                                        className="bg-gray-50 hover:file:bg-purple-200 focus:bg-white file:bg-purple-100 file:mr-4 file:px-4 py-3 file:py-1 pr-4 pl-12 border-2 border-gray-200 focus:border-purple-600 file:border-0 border-dashed rounded-2xl file:rounded-full outline-none w-full font-semibold file:font-black text-gray-400 file:text-purple-700 file:text-xs transition-all cursor-pointer"
                                    />
                                </div>
                                {errors.photo && <p className="ml-2 font-bold text-[10px] text-red-500 italic tracking-wide">{errors.photo.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="ml-1 font-bold text-gray-500 text-xs uppercase">Email Address</label>
                                <div className="group relative">
                                    <FaEnvelope className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type="email"
                                        {...register("email", { required: "Email is required" })}
                                        placeholder="email@example.com"
                                        className="bg-gray-50 focus:bg-white py-3.5 pr-4 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                </div>
                                {errors.email && <p className="ml-2 font-bold text-[10px] text-red-500 italic tracking-wide">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="ml-1 font-bold text-gray-500 text-xs uppercase">Set Password</label>
                                <div className="group relative">
                                    <FaLock className="top-1/2 left-4 absolute text-gray-300 group-focus-within:text-purple-600 transition-colors -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { 
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Min 6 characters" },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                                                message: "Uppercase & special char required"
                                            }
                                        })}
                                        placeholder="••••••••"
                                        className="bg-gray-50 focus:bg-white py-3.5 pr-12 pl-12 border-2 border-gray-50 focus:border-purple-600 rounded-2xl outline-none w-full font-semibold text-gray-700 transition-all"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="top-1/2 right-4 absolute text-gray-400 hover:text-purple-600 transition-colors -translate-y-1/2"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <p className="ml-2 font-bold text-[10px] text-red-500 italic tracking-wide">{errors.password.message}</p>}
                            </div>

                            <button className="flex justify-center items-center gap-3 bg-purple-600 hover:bg-gray-900 shadow-purple-100 shadow-xl mt-4 py-4 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all transform">
                                Create Account <FaArrowRight />
                            </button>
                        </form>

                        <div className="mt-8">
                            <SocialLogin />
                        </div>

                        <p className="mt-8 font-medium text-gray-500 text-center">
                            Already have an account? 
                            <Link to="/login" className="ml-2 font-black text-purple-600 decoration-2 hover:underline">Login here</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;