import { useToastStore } from '@/stores/useToastStore';

export const addToast = (message, type = 'success') => {
    const store = useToastStore();
    store.addToast(message, type);
};
