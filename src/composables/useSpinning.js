export const useSpinning = () => {
    const isSpinning = ref(false);

    const startSpinning = () => {
        isSpinning.value = true;
    };

    const stopSpinning = () => {
        isSpinning.value = false;
    };

    const execute = async (fn) => {
        startSpinning();
        try {
            return await fn();
        } finally {
            stopSpinning();
        }
    };

    return {
        isSpinning,
        startSpinning,
        stopSpinning,
        execute,
    }
};
