export default [
    {
        path: '/locales',
        name: 'Locales',
        component: () => import('@/views/locales/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.read',
        },
    },
    {
        path: '/locales/new',
        name: 'Locales[new]',
        component: () => import('@/views/locales/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.create',
        },
    },
    {
        path: '/locales/:id',
        name: 'Locales[id]',
        component: () => import('@/views/locales/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.update',
        },
    },
];
