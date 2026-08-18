export default [
    {
        path: '/locales',
        component: () => import('@/components/View.vue'),
        meta: {
            breadcrumb: 'locales.read.breadcrumb',
        },
        children: [
            {
                path: '',
                name: 'Locales',
                component: () => import('@/views/locales/index.vue'),
                meta: {
                    permission: 'locales.read',
                    menu: { group: 'admin', label: 'menu.locales' },
                },
            },
            {
                path: 'new',
                name: 'LocalesCreate',
                component: () => import('@/views/locales/[id].vue'),
                meta: {
                    permission: 'locales.create',
                    breadcrumb: 'locales.create.breadcrumb',
                },
            },
            {
                path: ':id',
                name: 'LocalesUpdate',
                component: () => import('@/views/locales/[id].vue'),
                meta: {
                    permission: 'locales.update',
                    breadcrumb: 'locales.update.breadcrumb',
                },
            },
        ],
    },
];
