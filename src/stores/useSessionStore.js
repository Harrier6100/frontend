import { useUserStore } from './useUserStore';
import { sessionService } from '@/services';

export const useSessionStore = defineStore('session', () => {
    const token = ref(localStorage.getItem('token'));
    const isAutoLoggedIn = ref(false);
    const userStore = useUserStore();

    const isLoggedIn = computed(() => {
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
        if (isAutoLoggedIn.value) return;
        isAutoLoggedIn.value = true;

        if (!localStorage.getItem('token')) {
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
        isLoggedIn,
        isAutoLoggedIn,
        startSession,
        autoStartSession,
        endSession,
    };
});
