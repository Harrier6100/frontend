import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
    const store = useAuthStore();
    const { isAuth, isAutoLoggedIn } = storeToRefs(store);
    const { login, autoLogin, logout } = store;

    return {
        isAuth,
        isAutoLoggedIn,
        login,
        autoLogin,
        logout,
    };
};
