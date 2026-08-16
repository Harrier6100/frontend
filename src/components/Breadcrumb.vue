<template>
    <nav>
        <ol>
            <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path">
                <router-link :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
            </li>
        </ol>
    </nav>
</template>

<script setup>
const route = useRoute();
const { t } = useI18n();

const breadcrumbs = computed(() => {
    return route.matched
        .filter(r => r.meta.breadcrumb)
        .map(r => ({ label: t(r.meta.breadcrumb), path: r.path }))
});
</script>
