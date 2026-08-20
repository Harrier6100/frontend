export default [
    {
        path: '/roles',
        component: () => import('@/components/View.vue'),
        meta: {
            breadcrumb: 'breadcrumb.roles.read',
        },
        children: [
            {
                path: '',
                name: 'Roles',
                component: () => import('@/views/roles/index.vue'),
                meta: {
                    permission: 'roles.read',
                    menu: { group: 'admin', label: 'menu.roles' },
                },
            },
            {
                path: 'new',
                name: 'RolesCreate',
                component: () => import('@/views/roles/[id].vue'),
                meta: {
                    permission: 'roles.create',
                    breadcrumb: 'breadcrumb.roles.create',
                },
            },
            {
                path: ':id',
                name: 'RolesUpdate',
                component: () => import('@/views/roles/[id].vue'),
                meta: {
                    permission: 'roles.update',
                    breadcrumb: 'breadcrumb.roles.update',
                },
            },
        ],
    },
];
