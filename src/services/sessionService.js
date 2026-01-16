import { api } from './api';

export const sessionService = {
    startSession: async (credentials) => {
        const response = await api.post('/api/session/start', credentials);
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
