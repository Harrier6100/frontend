export const canActivate = (meta, { isLoggedIn, permissions }) => {
    if (meta.requiresGuest && isLoggedIn) {
        return { ok: false, reason: 'authenticated' };
    }
    if (meta.requiresAuth && !isLoggedIn) {
        return { ok: false, reason: 'unauthorized' };
    }
    if (meta.permission && !permissions.includes(meta.permission)) {
        return { ok: false, reason: 'forbidden' };
    }
    return { ok: true };
};
