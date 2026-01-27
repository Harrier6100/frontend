import { api } from './api';

export const sessionService = {
    startSession: async (data) => {
        const response = await api.post('/api/session/start', data);
        return response.data;
    },
    autoStartSession: async () => {
        const response = await api.post('/api/session/auto/start');
        return response.data;
    },
    endSession: async () => {
        const response = await api.post('/api/session/end');
        return response.data;
    },
};
