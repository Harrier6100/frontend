import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const store = useConfirmStore();
    const { isShow, confirmMessage } = storeToRefs(store);
    const { confirmYes, confirmNo } = store;

    return {
        isShow,
        confirmMessage,
        confirmYes,
        confirmNo,
    };
};
