export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);

    const colors = {
        success: 'success',
        error: 'error',
    };

    const addToast = (message, variant, delay = 5000) => {
        const id = Date.now();
        toasts.value.push({ id, message, variant: colors[variant] || colors.success });
        setTimeout(() => removeToast(id), delay);
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
});
