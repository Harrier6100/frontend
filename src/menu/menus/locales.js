export const locales = [
    {
        routeName: 'Locales',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['locales:r'],
        label: 'MENU.LOCALES',
        showInMenu: true,
    },
    {
        routeName: 'Locales[new]',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['locales:c'],
        label: 'MENU.LOCALES_NEW',
        showInMenu: false,
    },
    {
        routeName: 'Locales[id]',
        requiresAuth: true,
        roles: ['admin'],
        permissions: ['locales:u'],
        label: 'MENU.LOCALES_ID',
        showInMenu: false,
    },
];
