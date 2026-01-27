import { api } from './api';

export const localeService = {
    fetch: async (params) => {
        const response = await api.get('/api/locales', { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/locales/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/locales', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/locales/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/locales/' + id);
        return response.data;
    },
};

