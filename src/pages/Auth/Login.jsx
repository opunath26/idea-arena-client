import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-center bg-base-200 px-4 min-h-screen">

            {/* Card Wrapper */}
            <div className="bg-white shadow-2xl backdrop-blur-lg p-10 border border-primary/20 rounded-2xl w-full max-w-md animate__animated animate__fadeIn">

                {/* Logo */}
                <h2 className="mb-2 font-extrabold text-primary text-3xl text-center tracking-wide">
                    Welcome Back
                </h2>
                <p className="mb-6 text-gray-600 text-center">Login with IdeaArena</p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full input-bordered input"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' && (
                            <p className='mt-1 text-red-500 text-sm'>
                                Email is required.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            {...register("email", {
                                required: true, minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                            })}
                            className="focus:outline-none focus:ring-2 focus:ring-primary/50 w-full input-bordered input"
                            placeholder="Enter your password"
                        />

                        {/* Errors */}
                        {errors.password?.type === 'required' && (
                            <p className='mt-1 text-red-500 text-sm'>
                                Password is required.
                            </p>
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

                    {/* Login Button */}
                    <button
                        type="button"
                        className="shadow-md hover:shadow-lg rounded-xl w-full text-white text-lg transition-all duration-300 btn btn-primary"
                    >
                        Login
                    </button>
                </form>

                {/* Social Login */}
                <div className="my-4">
                    <SocialLogin></SocialLogin>
                </div>

                {/* Bottom link */}
                <p className="mt-4 text-sm text-center">
                    Don’t have an account?
                    <Link 
                        state={location.state}
                        to="/register"
                        className="ml-1 font-semibold text-primary hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
