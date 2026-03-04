export default [
    {
        path: '/purchase/orders',
        name: 'PurchaseOrders',
        component: () => import('@/views/PurchaseOrders.vue'),
        meta: {
            requiresAuth: false,
        },
    },
];
