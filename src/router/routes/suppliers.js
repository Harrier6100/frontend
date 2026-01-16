export default [
    {
        path: '/suppliers',
        name: 'Suppliers',
        component: () => import('@/views/suppliers/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/suppliers/new',
        name: 'Suppliers[new]',
        component: () => import('@/views/suppliers/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/suppliers/:id',
        name: 'Suppliers[id]',
        component: () => import('@/views/suppliers/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
