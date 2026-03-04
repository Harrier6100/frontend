export default {
    top: [
        {
            label: 'MENU.ADMIN',
            routeNext: 'admin',
        },
        {
            label: 'MENU.STOCK',
            routeNext: 'stock',
        },
        {
            label: 'MENU.PURCHASE',
            routeNext: 'purchase',
        },
    ],
    admin: [
        {
            label: 'MENU.LOCALES',
            routeName: 'Locales',
        },
        {
            label: 'MENU.PERMISSIONS',
            routeName: 'Permissions',
        },
        {
            label: 'MENU.USERS',
            routeName: 'Users',
        },
        {
            label: 'MENU.MATERIALS',
            routeName: 'Materials',
        },
    ],
    stock: [
        {
            label: 'MENU.MATERIAL_STOCKS',
            routeName: 'MaterialStocks',
        },
    ],
    purchase: [
        {
            label: 'MENU.PURCHASE_ORDERS',
            routeName: 'PurchaseOrders',
        },
    ],
};
