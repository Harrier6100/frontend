import { userService } from '@/services';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const id = computed(() => user.value?.id ?? '');
    const name = computed(() => user.value?.name ?? '');
    const language = computed(() => user.value?.language ?? 'ja');
    const role = computed(() => user.value?.role ?? '');
    const permissions = computed(() => user.value?.permissions ?? []);

    const get = async () => {
        user.value = await userService.getMe();
        sessionStorage.setItem('language', user.value.language);
    };

    const clear = () => {
        user.value = null;
    };

    return {
        id,
        name,
        language,
        role,
        permissions,
        get,
        clear,
    };
});
