import { jwtDecode } from 'jwt-decode';
import { sessionService } from '@/services/sessionService';
import { useUserStore } from './useUserStore';

export const useSessionStore = defineStore('session', () => {
    const token = ref(null);
    const isSessionReady = ref(false);
    const userStore = useUserStore();

    const isLoggedIn = computed(() => {
        return !!token.value;
    });

    const permissions = computed(() => {
        if (!token.value) return [];
        try {
            return jwtDecode(token.value).permissions ?? [];
        } catch {
            return [];
        }
    });

    const startSession = async (credentials) => {
        const { token: newToken } = await sessionService.startSession(credentials);
        token.value = newToken;
        await userStore.get();
    };

    const resumeSession = async () => {
        if (isSessionReady.value) return;
        isSessionReady.value = true;

        try {
            const { token: newToken } = await sessionService.resumeSession();
            token.value = newToken;
            await userStore.get();
        } catch (err) {
            token.value = null;
            userStore.clear();
        }
    };

    const endSession = async () => {
        try {
            await sessionService.endSession();
        } finally {
            token.value = null;
            userStore.clear();
        }
    };

    return {
        token,
        isSessionReady,
        isLoggedIn,
        permissions,
        startSession,
        resumeSession,
        endSession,
    };
});
