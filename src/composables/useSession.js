import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
    const store = useSessionStore();
    const { isLoggedIn, isAutoLoggedIn } = storeToRefs(store);
    const { startSession, autoStartSession, endSession } = store;

    return {
        isLoggedIn,
        isAutoLoggedIn,
        startSession,
        autoStartSession,
        endSession,
    };
};
