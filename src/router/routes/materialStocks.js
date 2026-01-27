export default [
    {
        path: '/material-stocks',
        name: 'MaterialStocks',
        component: () => import('@/views/materialStocks.vue'),
        meta: {
            requiresAuth: false,
        },
    },
];
