import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const store = useLoadingStore();
    const { isLoading } = storeToRefs(store);
    const { startLoading, stopLoading, execute } = store;

    return {
        isLoading,
        startLoading,
        stopLoading,
        execute,
    };
};
