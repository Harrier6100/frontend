import { useToastStore } from '@/stores/useToastStore';

export const useToast = () => {
    const store = useToastStore();
    const { toasts } = storeToRefs(store);
    const { addToast, removeToast } = store;

    return {
        toasts,
        addToast,
        removeToast,
    };
};
