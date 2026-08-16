import i18n from '@/i18n';
import { userService } from '@/services/userService';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const id = computed(() => user.value?.id ?? '');
    const name = computed(() => user.value?.name ?? '');
    const language = computed(() => user.value?.language ?? 'ja');

    const get = async () => {
        user.value = await userService.getById('me');
        i18n.global.locale.value = language.value;
    };

    const clear = () => {
        user.value = null;
    };

    return {
        id,
        name,
        language,
        get,
        clear,
    };
});
