export const useConfirmStore = defineStore('confirm', () => {
    const isOpen = ref(false);
    const confirmMessage = ref('');
    let fn = null;

    const confirm = (message) => {
        isOpen.value = true;
        confirmMessage.value = message;
        return new Promise((resolve) => fn = resolve);
    };

    const confirmYes = () => {
        isOpen.value = false;
        fn?.(true);
        fn = null;
    };

    const confirmNo = () => {
        isOpen.value = false;
        fn?.(false);
        fn = null;
    };

    return {
        isOpen,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
});
