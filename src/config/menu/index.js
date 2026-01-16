import admin from './menus/admin';
import master from './menus/master';

export const menuDefs = {
    top: [
        {
            label: 'MENU.ADMIN',
            routeNext: 'admin',
        },
        {
            label: 'MENU.MASTER',
            routeNext: 'master',
        },
        {
            label: 'MENU.NONE',
            routeNext: 'none',
        },
    ],
    admin,
    master,
    none: [
        {
            label: 'MENU.PROPERTIES',
            routeName: 'Properties',
        },
        {
            label: 'MENU.PROPERTY_SPECS',
            routeName: 'PropertySpecs',
        },
    ],
};
