import groups from './menus/groups';

export const menuTree = (routes) => {
    const tree = {};

    const addItem = (parent, item) => {
        tree[parent] ??= [];
        tree[parent].push(item);
    };

    Object.entries(groups).forEach(([key, def]) => {
        addItem(def.parent, { label: def.label, routeNext: key });
    });

    routes.forEach(route => {
        const menu = route.meta?.menu;
        if (!menu) return;
        addItem(menu.group ?? 'top', { label: menu.label, routeName: route.name });
    });

    return tree;
};
