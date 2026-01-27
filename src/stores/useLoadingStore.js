export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false);

    const startLoading = () => {
        isLoading.value = true;
    };

    const stopLoading = () => {
        isLoading.value = false;
    };

    const runAsync = async (fn) => {
        startLoading();
        try {
            return await fn();
        } finally {
            stopLoading();
        }
    };

    return {
        isLoading,
        startLoading,
        stopLoading,
        runAsync,
    };
});
