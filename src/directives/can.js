import { useUser } from '@/composables/useUser';

export default {
    mounted(el, binding) {
        const { role, permissions } = useUser();
        const { roles: requiredRoles, permissions: requiredPermissions } = binding.value;

        if (role.value === 'admin') return;

        if (requiredRoles) {
            if (Array.isArray(requiredRoles)) {
                const can = requiredRoles.includes(role.value);
                if (can) return;
            } else {
                const can = requiredRoles === role.value;
                if (can) return;
            }
        }

        if (requiredPermissions) {
            if (Array.isArray(requiredPermissions)) {
                const can = permissions.value.some(p => requiredPermissions.includes(p));
                if (can) return;
            } else {
                const can = permissions.value.includes(requiredPermissions);
                if (can) return;
            }
        }

        el.remove();
    }
}
