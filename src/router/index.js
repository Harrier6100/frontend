import { createRouter, createWebHistory } from 'vue-router';
import { can } from '@/helpers/can';
import { useSession } from '@/composables/useSession';
import { useUser } from '@/composables/useUser';

const routes = [];
const modules = import.meta.glob('./routes/*', { eager: true });
Object.values(modules).forEach((module) => {
    routes.push(...module.default);
});

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const { isLogin, isAutoLogin, autoStartSession } = useSession();
    const { role, permissions } = useUser();

    if (!isAutoLogin.value) {
        await autoStartSession();
    }

    const pass = can(
        to.meta,
        {
            isLogin: isLogin.value,
            role: role.value,
            permissions: permissions.value
        }
    );

    if (!pass.ok) {
        if (pass.reason === 'unauthorized') {
            sessionStorage.setItem('redirect', to.fullPath);
            return { path: '/401' };
        }
        if (pass.reason === 'forbidden') {
            return { path: '/403' };
        }
    }
});

export default router;
