import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const store = useUserStore();
    const { id, name, language, role, permissions } = storeToRefs(store);
    const { get, clear } = store;

    return {
        id,
        name,
        language,
        role,
        permissions,
        get,
        clear,
    };
};
