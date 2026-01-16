import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './useUserStore';
import { sessionService } from '@/services/sessionService';

export const useSessionStore = defineStore('session', () => {
    const token = ref(localStorage.getItem('token'));
    const isAutoLoggedIn = ref(false);
    const userStore = useUserStore();

    const isLoggedIn = computed(() => {
        return !!token.value;
    });

    const setToken = (newToken) => {
        token.value = newToken;
        if (newToken) localStorage.setItem('token', newToken);
        else localStorage.removeItem('token');
    };

    const startSession = async (credentials) => {
        const responseData = await sessionService.startSession(credentials);
        const { token: newToken } = responseData;
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
            const responseData = await sessionService.autoStartSession();
            const { token: newToken } = responseData;
            setToken(newToken);
            await userStore.get();
        } catch (error) {
            setToken(null);
        }
    };

    const endSession = async () => {
        try {
            await sessionService.endSession();
        } catch (error) {
            console.warn(error);
        }
        setToken(null);
        userStore.clear();
    };

    return {
        token,
        isLoggedIn,
        isAutoLoggedIn,
        startSession,
        autoStartSession,
        endSession,
    };
});
