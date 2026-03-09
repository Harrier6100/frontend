export const can = (meta, user) => {
    const { requiresAuth, permission: requiredPermission } = meta;
    const { isLogin, role, permissions } = user;

    if (role === 'admin') {
        return { ok: true };
    }

    if (!requiresAuth) {
        return { ok: true };
    }

    if (!isLogin) {
        return { ok: false, reason: 'unauthorized' };
    }

    const isCan = requiredPermission ? permissions.includes(requiredPermission) : true;
    if (!isCan) {
        return { ok: false, reason: 'forbidden' };
    }

    return { ok: true };
};
