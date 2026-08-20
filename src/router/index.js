import { createRouter, createWebHistory } from 'vue-router';
import { canActivate } from '@/helpers/canActivate';
import errorRoutes from './routes/errors.js';

const routes = [];
const modules = import.meta.glob('./routes/*', { eager: true });
Object.entries(modules)
    .filter(([path]) => !path.includes('/errors'))
    .forEach(([, module]) => routes.push(...module.default));
routes.push(...errorRoutes);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {
    useLoading().start();
});

router.beforeEach(async (to, from) => {
    const { isSessionReady, isLoggedIn, permissions, resumeSession } = useSession();
    if (!isSessionReady.value) await resumeSession();

    if (to.meta.requiresGuest) {
        return isLoggedIn.value ? { path: '/' } : undefined;
    }

    if (!isLoggedIn.value) {
        sessionStorage.setItem('redirect', to.fullPath);
        return { path: '/login' };
    }

    const pass = canActivate(to.meta, { permissions: permissions.value });
    if (!pass.ok && pass.reason === 'forbidden') {
        return { path: '/forbidden' };
    }
});

router.afterEach(() => {
    useLoading().stop();
});

router.onError(() => {
    useLoading().stop();
});

export default router;
