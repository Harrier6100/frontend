import { admin } from './admin';

export const menuItems = {
    top: [
        {
            children: 'admin',
            label: 'MENU.ADMIN',
            showInMenu: true,
        },
    ],
    admin,
};
