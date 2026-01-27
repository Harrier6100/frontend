import { useUser } from '@/composables/useUser';
import { guard } from '@/helpers';

export default {
    mounted(el, binding) {
        const { role, permissions } = useUser();

        const can = guard(
            {
                requiresAuth: true,
                permission: binding.value,
            },
            {
                isLoggedIn: true,
                role: role.value,
                permissions: permissions.value,
            }
        );

        if (!can.ok) {
            el.remove();
        }
    }
};
