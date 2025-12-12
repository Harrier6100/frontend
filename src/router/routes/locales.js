export default [
    {
        path: '/locales',
        name: 'Locales',
        component: () => import('@/views/locales/index.vue'),
    },
    {
        path: '/locales/new',
        name: 'Locales[new]',
        component: () => import('@/views/locales/[id].vue'),
    },
    {
        path: '/locales/:id',
        name: 'Locales[id]',
        component: () => import('@/views/locales/[id].vue'),
    },
];
