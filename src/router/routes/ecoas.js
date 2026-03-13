export default [
    // {
    //     path: '/ecoas',
    //     name: 'eCOAs',
    //     component: () => import('@/views/ecoas/index.vue'),
    //     meta: {
    //         requiresAuth: true,
    //         permission: 'ecoas.read',
    //     },
    // },
    {
        path: '/ecoas/new',
        name: 'eCOAs[new]',
        component: () => import('@/views/ecoas/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'ecoas.create',
        },
    },
    {
        path: '/ecoas/:id',
        name: 'eCOAs[id]',
        component: () => import('@/views/ecoas/[id].vue'),
        meta: {
            requiresAuth: true,
            permission: 'ecoas.update',
        },
    },
];
