export default [
    {
        path: '/forbidden',
        name: '403',
        component: () => import('@/views/errors/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/errors/404.vue'),
    },
];
