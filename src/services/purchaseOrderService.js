import { api } from './api';

export const purchaseOrderService = {
    search: async (params) => {
        const response = await api.get(`/api/purchase-orders/search`, { params });
        return response.data;
    },
};
