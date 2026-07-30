import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const getBaseURL = () => {
    if (import.meta.env.VITE_API_URL) {
        let url = import.meta.env.VITE_API_URL;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
        return url;
    }
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    return 'https://idea-arena-server-2nzwvmbbl-artistop26-2257s-projects.vercel.app';
};

const axiosSecure = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const statusCode = error.response?.status;

            if (statusCode === 401 || statusCode === 403) {
                await logOut();
                navigate('/login');
            }

            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };

    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;