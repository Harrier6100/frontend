import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';

export const useUser = () => {
    const store = useUserStore();
    const { id, name, role, permissions } = storeToRefs(store);
    const { clear } = store;

    return {
        id,
        name,
        role,
        permissions,
        clear,
    };
};
