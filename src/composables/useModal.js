export const useModal = () => {
    const state = reactive({
        isOpen: false,
        payload: null,
    });

    const open = (payload = null) => {
        state.isOpen = true;
        state.payload = payload;
    };

    const close = () => {
        state.isOpen = false;
        state.payload = null;
    };

    return {
        state,
        open,
        close,
    };
};
