export default [
    {
        path: '/permissions',
        name: 'Permissions',
        component: () => import('@/views/permissions/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions.read',
        },
    },
    {
        path: '/permissions/new',
        name: 'Permissions[new]',
        component: () => import('@/views/permissions/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions.create',
        },
    },
    {
        path: '/permissions/:id',
        name: 'Permissions[id]',
        component: () => import('@/views/permissions/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'permissions.update',
        },
    },
];
