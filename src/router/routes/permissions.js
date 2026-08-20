export default [
    {
        path: '/permissions',
        component: () => import('@/components/View.vue'),
        meta: {
            breadcrumb: 'breadcrumb.permissions.read',
        },
        children: [
            {
                path: '',
                name: 'Permissions',
                component: () => import('@/views/permissions/index.vue'),
                meta: {
                    permission: 'permissions.read',
                    menu: { group: 'admin', label: 'menu.permissions' },
                },
            },
        ],
    },
];
