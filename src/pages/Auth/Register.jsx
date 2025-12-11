import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in register', location);
    

    const handleRegistration = (data) => {
        console.log('after register', data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                // store the image and the photo URL
                const formData = new FormData();
                formData.append("image", profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                .then( res =>{
                    console.log('after image upload', res.data.data.url);

                    // update user profile
                    const userProfile = {
                        displayName : data.name,
                        photoURL : res.data.data.url
                    }
                    updateUserProfile(userProfile)
                    .then(() => {
                        console.log("user profile updated done");
                        navigate(location.state || '/');
                    })
                    .catch(error => console.log(error))
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-center bg-base-200 px-4 min-h-screen">

            <div className="bg-white shadow-2xl backdrop-blur-lg p-10 border border-primary/20 rounded-2xl w-full max-w-md animate__animated animate__fadeIn">

                {/* Logo */}
                <h2 className="mb-2 font-extrabold text-primary text-3xl text-center tracking-wide">
                    Create an Account
                </h2>
                <p className="mb-6 text-gray-600 text-center">Register with IdeaArena</p>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full input-bordered input"
                            placeholder="Name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">Name is required</span>
                        )}
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block mb-1 font-medium">Photo</label>
                        <input
                            type="file"
                            {...register("photo", { required: true })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full file-input-bordered file-input"
                            placeholder="Your Photo"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">Photo is required</span>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full input-bordered input"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && (
                            <p className='mt-1 text-red-500 text-sm'>Email is required.</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                            })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full input-bordered input"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' && (
                            <p className='mt-1 text-red-500 text-sm'>Password is required.</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span className="text-red-500 text-sm">
                                Password must be at least 6 characters
                            </span>
                        )}
                        {errors.password?.type === "pattern" && (
                            <span className="text-red-500 text-sm">
                                Must contain an uppercase & a special character
                            </span>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="shadow-md hover:shadow-lg rounded-xl w-full text-white text-lg transition-all duration-300 btn btn-primary"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4">
                    <SocialLogin></SocialLogin>
                </div>

                {/* Bottom link */}
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link
                        state={location.state}
                        to="/login"
                        className="font-semibold text-primary hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
