export default [
    {
        path: '/properties',
        name: 'Properties',
        component: () => import('@/views/properties/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/properties/new',
        name: 'Properties[new]',
        component: () => import('@/views/properties/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/properties/:id',
        name: 'Properties[id]',
        component: () => import('@/views/properties/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
