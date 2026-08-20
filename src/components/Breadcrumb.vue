<template>
    <nav>
        <ol>
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.path">
                <router-link v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
                <span v-else aria-current="page">{{ breadcrumb.label }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
const route = useRoute();
const { t } = useI18n();

const breadcrumbs = computed(() => {
    const matched = route.matched
        .filter(r => r.meta.breadcrumb)
        .map((r, i, arr) => ({
            label: typeof r.meta.breadcrumb === 'function' ? r.meta.breadcrumb(route) : t(r.meta.breadcrumb),
            path: i === arr.length - 1 ? route.path : r.path,
        }));

    if (route.name === 'Home') return matched;
    return [{ label: t('menu.home'), path: '/' }, ...matched];
});
</script>
