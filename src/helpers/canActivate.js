export const canActivate = (meta, { permissions }) => {
    if (meta.permission && !permissions.includes(meta.permission)) {
        return { ok: false, reason: 'forbidden' };
    }
    return { ok: true };
};
