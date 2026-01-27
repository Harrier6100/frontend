import { api } from './api';

export const materialStockService = {
    fetch: async (params) => {
        const response = await api.get('/api/material-stocks/search', { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/material-stocks');
        return response.data;
    },
};

