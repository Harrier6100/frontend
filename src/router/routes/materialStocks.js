export default [
    {
        path: '/material/stocks',
        name: 'MaterialStocks',
        component: () => import('@/views/MaterialStocks.vue'),
        meta: {
            requiresAuth: false,
        },
    },
];
