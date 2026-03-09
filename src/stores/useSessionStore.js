import { sessionService } from '@/services/sessionService';
import { useUserStore } from './useUserStore';

export const useSessionStore = defineStore('session', () => {
    const token = ref(localStorage.getItem('token'));
    const isAutoLogin = ref(false);
    const userStore = useUserStore();

    const isLogin = computed(() => {
        return !!token.value;
    });

    const setToken = (newToken) => {
        token.value = newToken;
        localStorage.removeItem('token');
        if (newToken) localStorage.setItem('token', newToken);
    };

    const startSession = async (data) => {
        const { token: newToken } = await sessionService.startSession(data);
        setToken(newToken);
        await userStore.get();
    };

    const autoStartSession = async () => {
        if (isAutoLogin.value) return;
        isAutoLogin.value = true;

        if (!token.value) {
            setToken(null);
            userStore.clear();
            return;
        }

        try {
            const { token: newToken } = await sessionService.autoStartSession();
            setToken(newToken);
            await userStore.get();
        } catch (err) {
            setToken(null);
        }
    };

    const endSession = async () => {
        await sessionService.endSession();
        setToken(null);
        userStore.clear();
    };

    return {
        isLogin,
        isAutoLogin,
        startSession,
        autoStartSession,
        endSession,
    };
});
