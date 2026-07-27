import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://idea-arena-server-7gxifh8b6-artistop26-2257s-projects.vercel.app'
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;