export const useAsync = () => {
    const isPending = ref(false);

    const start = () => {
        isPending.value = true;
    };

    const stop = () => {
        isPending.value = false;
    };

    const execute = async (fn) => {
        start();
        try {
            return await fn();
        } finally {
            stop();
        }
    };

    return {
        isPending,
        execute,
    };
};
