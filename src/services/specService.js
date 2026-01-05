import { api } from '@/api';

export const specService = {
    fetch: async () => {
        const response = await api.get('/api/specs');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/specs/' + id);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/api/specs/', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put('/api/specs/' + id, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete('/api/specs/' + id);
        return response.data;
    },
};
