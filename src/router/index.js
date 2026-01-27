import { createRouter, createWebHistory } from 'vue-router';
import { useSession } from '@/composables/useSession';
import { useUser } from '@/composables/useUser';
import { guard } from '@/helpers';

const routes = [];
const modules = import.meta.glob('./routes/*', { eager: true });
Object.values(modules).forEach((module) => {
    routes.push(...module.default);
});

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { isLoggedIn, isAutoLoggedIn, autoStartSession } = useSession();
    const { role, permissions } = useUser();

    if (!isAutoLoggedIn.value) {
        await autoStartSession();
    }

    const can = guard(
        to.meta,
        {
            isLoggedIn: isLoggedIn.value,
            role: role.value,
            permissions: permissions.value
        }
    );

    if (can.reason === 'unauthorized') {
        sessionStorage.setItem('redirect', to.fullPath);
        return next('/401');
    }

    if (can.reason === 'forbidden') {
        return next('/403');
    }

    next();
});

export default router;
