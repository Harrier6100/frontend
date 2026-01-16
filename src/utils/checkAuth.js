export const checkAuth = (routeMeta, user) => {
    const { requiresAuth, roles: requiredRoles, permissions: requiredPermissions } = routeMeta;
    const { isLoggedIn, role, permissions } = user;

    if (role === 'admin') {
        return { ok: true };
    }

    if (!requiresAuth) {
        return { ok: true };
    }

    if (!isLoggedIn) {
        return { ok: false, reason: 'unauthorized' };
    }

    const roleCan = requiredRoles ? requiredRoles.includes(role): true;
    const permissionCan = requiredPermissions ? permissions.some(perm => requiredPermissions.includes(perm)) : true;
    if (!roleCan || !permissionCan) {
        return { ok: false, reason: 'forbidden' };
    }

    return { ok: true };
};
