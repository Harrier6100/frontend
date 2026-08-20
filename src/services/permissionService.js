import api from './api';

export const permissionService = {
    getAll: async () => {
        const response = await api.get(`/api/permissions`);
        return response.data;
    },
};
