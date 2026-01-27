export const guard = (meta, user) => {
    const { requiresAuth, permission: requiredPermission } = meta;
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

    const can = requiredPermission ? permissions.includes(requiredPermission) : true;
    if (!can) {
        return { ok: false, reason: 'forbidden' };
    }

    return { ok: true };
};
