import { api } from './api';

export const propertySpecService = {
    fetch: async () => {
        const response = await api.get('/api/crud/property/specs');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/crud/property/specs/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/crud/property/specs', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/crud/property/specs/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/crud/property/specs/' + id);
        return response.data;
    },
};
