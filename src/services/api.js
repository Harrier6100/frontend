import axios from 'axios';
import { useSessionStore } from '@/stores/useSessionStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const { token } = useSessionStore();
        if (token) config.headers.Authorization = token;
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default api;
