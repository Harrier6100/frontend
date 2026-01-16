import { reactive } from 'vue';

export const useModal = () => {
    const state = reactive({
        payload: null,
        isOpen: false,
    });

    const open = (payload = null) => {
        state.payload = payload;
        state.isOpen = true;
    };

    const close = () => {
        state.payload = null;
        state.isOpen = false;
    };

    return {
        state,
        open,
        close,
    };
};
