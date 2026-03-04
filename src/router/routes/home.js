export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/sandbox',
        name: 'Sandbox',
        component: () => import('@/views/Sandbox.vue'),
    },
];
