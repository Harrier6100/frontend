import { can } from '@/helpers/can';
import { useUser } from '@/composables/useUser';

export default {
    mounted(el, binding) {
        const { role, permissions } = useUser();

        const pass = can(
            {
                requiresAuth: true,
                permission: binding.value,
            },
            {
                isLogin: true,
                role: role.value,
                permissions: permissions.value,
            }
        );

        if (!pass.ok) {
            el.remove();
        }
    }
};
