import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const store = useLoadingStore();
    const { isLoading } = storeToRefs(store);
    const { startLoading, stopLoading } = store;

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
};
