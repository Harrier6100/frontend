export default [
    {
        path: '/specs',
        name: 'Specs',
        component: () => import('@/views/specs/index.vue'),
    },
    {
        path: '/specs/new',
        name: 'Specs[new]',
        component: () => import('@/views/specs/[id].vue'),
    },
    {
        path: '/specs/:id',
        name: 'Specs[id]',
        component: () => import('@/views/specs/[id].vue'),
    },
];
