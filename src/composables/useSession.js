import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
    const store = useSessionStore();
    const { isSessionReady, isLoggedIn, permissions } = storeToRefs(store);
    const { startSession, resumeSession, endSession } = store;

    return {
        isSessionReady,
        isLoggedIn,
        permissions,
        startSession,
        resumeSession,
        endSession,
    };
};
