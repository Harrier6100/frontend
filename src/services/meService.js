import { api } from '@/api';

export const getMe = async () => {
    const response = await api.get('/api/me');
    return response.data;
};
