export default [
    {
        path: '/roles',
        component: () => import('@/components/View.vue'),
        meta: {
            breadcrumb: 'roles.read.breadcrumb',
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
                    breadcrumb: 'roles.create.breadcrumb',
                },
            },
            {
                path: ':id',
                name: 'RolesUpdate',
                component: () => import('@/views/roles/[id].vue'),
                meta: {
                    permission: 'roles.update',
                    breadcrumb: 'roles.update.breadcrumb',
                },
            },
        ],
    },
];
