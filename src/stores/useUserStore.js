import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getMe } from '@/services/meService';

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

    const hasPermission = (permission) => {
        return permissions.value.includes(permission);
    };

    const fetch = async () => {
        try {
            const data = await getMe();
            user.value = data;
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
        hasPermission,
        fetch,
        clear,
    };
});
