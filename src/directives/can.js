import { useUser } from '@/composables/auth';
import { checkAuth } from '@/utils/checkAuth';

export default {
    mounted(el, binding) {
        const { role, permissions } = useUser();

        const can = checkAuth(
            {
                requiresAuth: true,
                roles: binding.value.roles,
                permissions: binding.value.permissions
            },
            {
                isLoggedIn: true,
                role: role.value,
                permissions: permissions.value
            }
        );

        if (!can.ok) {
            el.remove();
        }
    }
}
