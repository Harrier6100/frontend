import { useSessionStore } from '@/stores/useSessionStore';

export const useSession = () => {
    const store = useSessionStore();
    const { isLoggedIn, permissions } = storeToRefs(store);
    const { startSession, resumeSession, endSession } = store;

    return {
        isLoggedIn,
        permissions,
        startSession,
        resumeSession,
        endSession,
    };
};
