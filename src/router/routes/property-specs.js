export default [
    {
        path: '/property-specs',
        name: 'PropertySpecs',
        component: () => import('@/views/property-specs/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/property-specs/new',
        name: 'PropertySpecs[new]',
        component: () => import('@/views/property-specs/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/property-specs/:id',
        name: 'PropertySpecs[id]',
        component: () => import('@/views/property-specs/[id].vue'),
        meta: {
            requiresAuth: true,
        },
    },
];
