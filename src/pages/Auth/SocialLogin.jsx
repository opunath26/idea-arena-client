import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = ({ type }) => {

    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then((result) => {
                console.log(result.user);
                

                // create ue in the database
                    const userInfo = {
                        email: result.user.email,
                        displayName : result.user.displayName,
                        photoURL : result.user.photoURL
                    }

                    axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data);
                        navigate(location?.state || '/');
                        
                    })

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="mt-6">
            <div className="my-3 text-gray-400 text-center">Or</div>

            <button
                onClick={handleGoogleSignIn}
                className="flex justify-center items-center gap-2 py-3 border border-gray-300 hover:border-primary rounded-lg w-full transition-all"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5"
                />

                {
                    type === 'login'
                        ? 'Login with Google'
                        : 'Register with Google'
                }
            </button>
        </div>
    );
};

export default SocialLogin;
