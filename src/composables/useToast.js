import { useToastStore } from '@/stores/useToastStore';

export const useToast = () => {
    const store = useToastStore();
    const { toasts } = storeToRefs(store);
    const { removeToast } = store;

    return {
        toasts,
        removeToast,
    };
};
