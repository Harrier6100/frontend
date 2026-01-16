import { api } from './api';

export const customerService = {
    fetch: async () => {
        const response = await api.get('/api/crud/customers');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/crud/customers/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/crud/customers', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/crud/customers/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/crud/customers/' + id);
        return response.data;
    },
};
