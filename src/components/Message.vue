<template>
    <div v-if="isShow">
        {{ message }}
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    error: String,
});

const isShow = computed(() => {
    return props.error;
});

const message = computed(() => {
    return props.error;
});
</script>
