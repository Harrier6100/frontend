import api from './api';

export const userService = {
    getAll: async () => {
        const response = await api.get(`/api/users`);
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    },
    getRoles: async (id) => {
        const response = await api.get(`/api/users/${id}/roles`);
        return response.data;
    },
    getPermissions: async (id) => {
        const response = await api.get(`/api/users/${id}/permissions`);
        return response.data;
    },
    search: async (params) => {
        const response = await api.get(`/api/users`, { params });
        return response.data;
    },
    create: async (data) => {
        const response = await api.post(`/api/users`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/api/users/${id}`, data);
        return response.data;
    },
    updateRoles: async (id, roles) => {
        const response = await api.put(`/api/users/${id}/roles`, { roles });
        return response.data;
    },
    updatePermissions: async (id, permissions) => {
        const response = await api.put(`/api/users/${id}/permissions`, { permissions });
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/api/users/${id}`);
        return response.data;
    },
};
