export const users = [
    {
        routeName: 'Users',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['users:r'],
        label: 'MENU.USERS',
        showInMenu: true,
    },
    {
        routeName: 'Users[new]',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['users:c'],
        label: 'MENU.USERS_NEW',
        showInMenu: false,
    },
    {
        routeName: 'Users[id]',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['users:u'],
        label: 'MENU.USERS_ID',
        showInMenu: false,
    },
];
