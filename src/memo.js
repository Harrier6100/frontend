1. パス通過用のレイアウトコンポーネント（新規） — ネストした子ルートを描画するための <router-view> の入れ物です。


<!-- frontend/src/layouts/RouterView.vue -->
<template>
    <router-view />
</template>
2. users.js をネスト構成に変更


// frontend/src/router/routes/users.js
export default [
    {
        path: '/users',
        component: () => import('@/layouts/RouterView.vue'),
        meta: {
            breadcrumb: 'users.read.breadcrumb',
        },
        children: [
            {
                path: '',
                name: 'Users',
                component: () => import('@/views/users/index.vue'),
                meta: {
                    requiresAuth: true,
                    permission: 'users.read',
                },
            },
            {
                path: 'new',
                name: 'Users[new]',
                component: () => import('@/views/users/[id].vue'),
                meta: {
                    requiresAuth: true,
                    permission: 'users.create',
                    breadcrumb: 'users.create.breadcrumb',
                },
            },
            {
                path: ':id',
                name: 'Users[id]',
                component: () => import('@/views/users/[id].vue'),
                meta: {
                    requiresAuth: true,
                    permission: 'users.update',
                    breadcrumb: (route) => route.params.id,
                },
            },
        ],
    },
];
3. Breadcrumb.vue を関数breadcrumbに対応させる


<script setup>
const route = useRoute();
const { t } = useI18n();

const breadcrumbs = computed(() => {
    return route.matched
        .filter(r => r.meta.breadcrumb)
        .map((r, i, arr) => ({
            label: typeof r.meta.breadcrumb === 'function'
                ? r.meta.breadcrumb(route)
                : t(r.meta.breadcrumb),
            path: i === arr.length - 1 ? route.path : r.path,
        }));
});
</script>