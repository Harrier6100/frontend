import { api } from './api';

export const supplierService = {
    fetch: async () => {
        const response = await api.get('/api/crud/suppliers');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/crud/suppliers/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/crud/suppliers', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/crud/suppliers/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/crud/suppliers/' + id);
        return response.data;
    },
};
