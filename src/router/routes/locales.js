export default [
    {
        path: '/locales',
        name: 'Locales',
        component: () => import('@/views/locales/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.read',
            breadcrumb: 'locales.read.breadcrumb',
        },
    },
    {
        path: '/locales/new',
        name: 'Locales[new]',
        component: () => import('@/views/locales/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.create',
            breadcrumb: 'locales.create.breadcrumb',
        },
    },
    {
        path: '/locales/:id',
        name: 'Locales[id]',
        component: () => import('@/views/locales/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'locales.update',
            breadcrumb: 'locales.update.breadcrumb',
        },
    },
];
