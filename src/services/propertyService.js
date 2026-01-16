import { api } from './api';

export const propertyService = {
    fetch: async () => {
        const response = await api.get('/api/crud/properties');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/crud/properties/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/crud/properties', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/crud/properties/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/crud/properties/' + id);
        return response.data;
    },
};
