import { canActivate } from '@/helpers/canActivate';
import { useSession } from '@/composables/useSession';

export default {
    mounted(el, binding) {
        const { permissions } = useSession();

        const pass = canActivate(
            { permission: binding.value },
            { permissions: permissions.value }
        );

        if (!pass.ok) {
            el.remove();
        }
    }
};
