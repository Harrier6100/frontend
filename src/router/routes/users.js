export default [
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/index.vue'),
        meta: {
            requiresAuth: true,
            permission: 'users.read',
        },
    },
    {
        path: '/users/new',
        name: 'Users[new]',
        component: () => import('@/views/users/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'users.create',
        },
    },
    {
        path: '/users/:id',
        name: 'Users[id]',
        component: () => import('@/views/users/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'users.update',
        },
    },
];
