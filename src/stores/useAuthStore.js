import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services';
import { useUserStore } from './useUserStore';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const isAutoLoggedIn = ref(false);
    const userStore = useUserStore();

    const isAuth = computed(() => {
        return !!token.value;
    });

    const setToken = (newToken) => {
        token.value = newToken;
        if (newToken) localStorage.setItem('token', newToken);
        else localStorage.removeItem('token');
    };

    const login = async ({ id, password }) => {
        const data = await authService.login({ id, password });
        const { token: newToken } = data;
        setToken(newToken);
        await userStore.fetch();
    };

    const autoLogin = async () => {
        if (isAutoLoggedIn.value) return;
        isAutoLoggedIn.value = true;

        const savedToken = localStorage.getItem('token');
        if (!savedToken) {
            setToken(null);
            userStore.clear();
            return;
        }

        try {
            const data = await authService.autoLogin();
            const { token: newToken } = data;
            setToken(newToken);
            await userStore.fetch();
        } catch (error) {
            setToken(null);
            userStore.clear();
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (e) {
            console.warn(e);
        }
        setToken(null);
        userStore.clear();
    };

    return {
        token,
        isAuth,
        isAutoLoggedIn,
        login,
        autoLogin,
        logout,
    };
});
