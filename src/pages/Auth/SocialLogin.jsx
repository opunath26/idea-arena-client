import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = ({ type, handleGoogleLogin }) => {
    const { googleSignIn } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        if (handleGoogleLogin) {
            handleGoogleLogin();
            return;
        }

        googleSignIn()
            .then((result) => {
                const userInfo = {
                    email: result.user?.email,
                    displayName: result.user?.displayName,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user'
                };

                axiosSecure.post('/users', userInfo)
                    .then((res) => {
                        console.log('User data stored:', res.data);
                        navigate(location?.state || '/', { replace: true });
                    })
                    .catch((err) => {
                        console.error('User save error:', err);
                        navigate(location?.state || '/', { replace: true });
                    });
            })
            .catch((error) => {
                console.error("Google Sign In Error:", error);
            });
    };

    return (
        <div className="mt-6">
            <div className="flex items-center gap-3 my-4">
                <div className="flex-1 bg-gray-200 h-px"></div>
                <span className="font-semibold text-gray-400 text-xs uppercase">Or</span>
                <div className="flex-1 bg-gray-200 h-px"></div>
            </div>

            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex justify-center items-center gap-3 bg-gray-50 hover:bg-purple-50 py-3.5 border-2 border-gray-100 hover:border-purple-200 rounded-2xl w-full font-bold text-gray-700 text-sm active:scale-95 transition-all cursor-pointer"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />

                <span>
                    {type === 'login'
                        ? 'Login with Google'
                        : 'Continue with Google'}
                </span>
            </button>
        </div>
    );
};

export default SocialLogin;