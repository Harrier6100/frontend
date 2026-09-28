import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const store = useUserStore();
    const { id, name, language } = storeToRefs(store);
    const { fetch, clear } = store;

    return {
        id,
        name,
        language,
        fetch,
        clear,
    };
};
