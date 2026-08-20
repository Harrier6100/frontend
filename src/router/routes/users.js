export default [
    {
        path: '/users',
        component: () => import('@/components/View.vue'),
        meta: {
            breadcrumb: 'breadcrumb.users.read',
        },
        children: [
            {
                path: '',
                name: 'Users',
                component: () => import('@/views/users/index.vue'),
                meta: {
                    permission: 'users.read',
                    menu: { group: 'admin', label: 'menu.users' },
                },
            },
            {
                path: 'new',
                name: 'UsersCreate',
                component: () => import('@/views/users/[id].vue'),
                meta: {
                    permission: 'users.create',
                    breadcrumb: 'breadcrumb.users.create',
                },
            },
            {
                path: ':id',
                name: 'UsersUpdate',
                component: () => import('@/views/users/[id].vue'),
                meta: {
                    permission: 'users.update',
                    breadcrumb: 'breadcrumb.users.update',
                },
            },
        ],
    },
];
