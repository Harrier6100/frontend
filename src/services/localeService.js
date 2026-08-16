import api from './api';

export const localeService = {
    getAll: async () => {
        const response = await api.get(`/api/locales`);
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/api/locales/${id}`);
        return response.data;
    },
    search: async (params) => {
        const response = await api.get(`/api/locales`, { params });
        return response.data;
    },
    create: async (data) => {
        const response = await api.post(`/api/locales`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/api/locales/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/locales/${id}`);
        return response.data;
    },
};
