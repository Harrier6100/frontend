export default [
    {
        path: '/forbidden',
        name: 'Forbidden',
        component: () => import('@/views/errors/Forbidden.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/errors/NotFound.vue'),
    },
];
