import { api } from './api';

export const permissionService = {
    fetch: async () => {
        const response = await api.get('/api/permissions');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/permissions/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/permissions', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/permissions/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/permissions/' + id);
        return response.data;
    },
};

