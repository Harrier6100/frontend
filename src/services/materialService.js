import { api } from './api';

export const materialService = {
    fetch: async () => {
        const response = await api.get('/api/crud/materials');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/crud/materials/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/crud/materials', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/crud/materials/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/crud/materials/' + id);
        return response.data;
    },
};
