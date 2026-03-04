import { api } from './api';

export const purchaseOrderService = {
    fetch: async (params) => {
        const response = await api.get('/api/purchase-orders/search', { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get('/api/purchase-orders');
        return response.data;
    },
};

