import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = token;

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => Promise.reject(error),
);
