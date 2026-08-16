import { useConfirmStore } from '@/stores/useConfirmStore';

export const useConfirm = () => {
    const store = useConfirmStore();
    const { isShow, confirmMessage } = storeToRefs(store);
    const { confirm, confirmYes, confirmNo } = store;

    return {
        isShow,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
};
