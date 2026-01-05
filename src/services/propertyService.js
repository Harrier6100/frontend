import { api } from '@/api';

export const propertyService = {
    fetch: async () => {
        const response = await api.get('/api/properties');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/properties/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/properties/', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/properties/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/properties/' + id);
        return response.data;
    },
};
