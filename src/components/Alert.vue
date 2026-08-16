<template>
    <div v-if="error">{{ error }}</div>
</template>

<script setup>
const props = defineProps({
    error: String,
});
</script>
