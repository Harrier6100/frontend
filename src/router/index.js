import { createRouter, createWebHistory } from 'vue-router';
import routeDefs from './routes';
import { useSession, useUser } from '@/composables/auth';
import { checkAuth } from '@/utils/checkAuth';

const routes = routeDefs.map(routeDef => ({
    ...routeDef,
}));

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

    const can = checkAuth(
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
