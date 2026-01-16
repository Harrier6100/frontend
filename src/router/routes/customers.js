export default [
    {
        path: '/customers',
        name: 'Customers',
        component: () => import('@/views/customers/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/customers/new',
        name: 'Customers[new]',
        component: () => import('@/views/customers/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/customers/:id',
        name: 'Customers[id]',
        component: () => import('@/views/customers/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
