import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const store = useConfirmStore();
    const { isOpen, confirmMessage } = storeToRefs(store);
    const { confirm, confirmYes, confirmNo } = store;

    return {
        isOpen,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
};
