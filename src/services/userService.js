import { api } from './api';

export const userService = {
    fetch: async (params) => {
        const response = await api.get('/api/users', { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/users/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/users', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/users/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/users/' + id);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/api/users/me');
        return response.data;
    },
};

