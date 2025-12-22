import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://idea-arena-server.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;