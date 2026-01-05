import { ref } from 'vue';

export const useSpinning = () => {
    const isSpinning = ref(false);

    const execute = async (fn) => {
        try {
            isSpinning.value = true;
            return await fn();
        } finally {
            isSpinning.value = false;
        }
    };

    return {
        isSpinning,
        execute,
    };
};
