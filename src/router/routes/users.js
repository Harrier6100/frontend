export default [
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/index.vue'),
    },
    {
        path: '/users/new',
        name: 'Users[new]',
        component: () => import('@/views/users/[id].vue'),
    },
    {
        path: '/users/:id',
        name: 'Users[id]',
        component: () => import('@/views/users/[id].vue'),
    },
];
