import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
    const store = useSessionStore();
    const { isLogin, isAutoLogin } = storeToRefs(store);
    const { startSession, autoStartSession, endSession } = store;

    return {
        isLogin,
        isAutoLogin,
        startSession,
        autoStartSession,
        endSession,
    };
};
