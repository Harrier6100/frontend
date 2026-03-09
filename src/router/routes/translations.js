export default [
    {
        path: '/translations',
        name: 'Translations',
        component: () => import('@/views/translations/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations.read',
        },
    },
    {
        path: '/translations/new',
        name: 'Translations[new]',
        component: () => import('@/views/translations/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations.create',
        },
    },
    {
        path: '/translations/:id',
        name: 'Translations[id]',
        component: () => import('@/views/translations/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'translations.update',
        },
    },
];
