export default [
    {
        path: '/materials',
        name: 'Materials',
        component: () => import('@/views/materials/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/materials/new',
        name: 'Materials[new]',
        component: () => import('@/views/materials/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/materials/:id',
        name: 'Materials[id]',
        component: () => import('@/views/materials/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
