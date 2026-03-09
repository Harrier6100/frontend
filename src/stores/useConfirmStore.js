export const useConfirmStore = defineStore('confirm', () => {
    const isShow = ref(false);
    const confirmMessage = ref('');
    let fn = null;

    const confirm = (message) => {
        isShow.value = true;
        confirmMessage.value = message;
        return new Promise((resolve) => fn = resolve);
    };

    const confirmYes = () => {
        isShow.value = false;
        fn?.(true);
        fn = null;
    };

    const confirmNo = () => {
        isShow.value = false;
        fn?.(false);
        fn = null;
    };

    return {
        isShow,
        confirmMessage,
        confirm,
        confirmYes,
        confirmNo,
    };
});
