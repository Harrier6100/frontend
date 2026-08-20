import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLoading = () => {
    const store = useLoadingStore();
    const { isLoading } = storeToRefs(store);
    const { start, stop } = store;

    return {
        isLoading,
        start,
        stop,
    };
};
