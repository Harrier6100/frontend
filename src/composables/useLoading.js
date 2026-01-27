import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const store = useLoadingStore();
    const { isLoading } = storeToRefs(store);
    const { startLoading, stopLoading, runAsync } = store;

    return {
        isLoading,
        startLoading,
        stopLoading,
        runAsync,
    };
};
