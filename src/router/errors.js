export default [
    {
        path: '/forbidden',
        name: 'Forbidden',
        component: () => import('@/views/errors/Forbidden.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Notfound',
        component: () => import('@/views/errors/Notfound.vue'),
    },
];
