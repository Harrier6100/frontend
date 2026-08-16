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

router.beforeEach(async (to, from) => {
    const { isSessionReady, isLoggedIn, permissions, resumeSession } = useSession();

    if (!isSessionReady.value) {
        await resumeSession();
    }

    const result = canActivate(to.meta, {
        isLoggedIn: isLoggedIn.value,
        permissions: permissions.value,
    });

    if (!result.ok) {
        if (result.reason === 'authenticated') {
            return { path: '/' };
        }
        if (result.reason === 'unauthorized') {
            sessionStorage.setItem('redirect', to.fullPath);
            return { path: '/login' };
        }
        if (result.reason === 'forbidden') {
            return { path: '/forbidden' };
        }
    }
});

export default router;
