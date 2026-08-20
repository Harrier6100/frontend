<template>
    <template v-if="route.name !== 'Login'">
        <Header />
        <Breadcrumb />
    </template>
    <router-view />
    <Confirm />
    <ToastContainer />
    <Loading />
</template>

<script setup>
const route = useRoute();
</script>
