import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUser } from '@/composables/useUser';
import { menuItems } from '@/menu';
import routeDefs from './routes';

const createRouteMeta = (menuItems) => {
    const routeMeta = {};

    const recursive = (items) => {
        if (!Array.isArray(items)) return;

        for (const item of items) {
            if (item.routeName) {
                routeMeta[item.routeName] = {
                    requiresAuth: item.requiresAuth ?? true,
                    roles: item.roles ?? [],
                    permissions: item.permissions ?? [],
                };
            }

            if (item.children && menuItems[item.children]) {
                recursive(menuItems[item.children]);
            }
        }
    };
    recursive(menuItems['top']);

    return routeMeta;
};

const routeMeta = createRouteMeta(menuItems);

const routes = routeDefs.map(route => ({
    ...route,
    meta: routeMeta[route.name] || {},
}));

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { isAutoLoggedIn, isAuth, autoLogin } = useAuth();
    const { role, permissions } = useUser();
    const { requiresAuth: requiredAuth, roles: requiredRoles, permissions: requiredPermissions } = to.meta;

    if (!isAutoLoggedIn.value) {
        await autoLogin();
    }

    if (requiredAuth) {
        if (!isAuth.value) {
            sessionStorage.setItem('uri', to.fullPath);
            return next('/401');
        }

        const roleOk = requiredRoles.includes(role.value) ?? false;
        const permissionOk = permissions.value.some(p => requiredPermissions.includes(p)) ?? false;
        if (!roleOk && !permissionOk) return next('/403');
    }

    next();
});

export default router;
