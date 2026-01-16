export default [
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users/new',
        name: 'Users[new]',
        component: () => import('@/views/users/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users/:id',
        name: 'Users[id]',
        component: () => import('@/views/users/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
