import { useConfirmStore } from '@/stores/useConfirmStore';

export const confirm = (message) => {
    const store = useConfirmStore();
    return store.confirm(message);
};
