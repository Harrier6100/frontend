import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { userService } from '@/services/userService';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const id = computed(() => {
        return user.value?.id ?? '';
    });

    const name = computed(() => {
        return user.value?.name ?? '';
    });

    const role = computed(() => {
        return user.value?.role ?? '';
    });

    const permissions = computed(() => {
        return user.value?.permissions ?? [];
    });

    const get = async () => {
        try {
            const responseData = await userService.getMe();
            user.value = responseData;
        } catch (error) {
            user.value = null;
        }
    };

    const clear = () => {
        user.value = null;
    };

    return {
        id,
        name,
        role,
        permissions,
        get,
        clear,
    };
});
