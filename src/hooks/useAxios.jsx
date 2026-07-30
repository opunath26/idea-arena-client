import axios from 'axios';

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

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;