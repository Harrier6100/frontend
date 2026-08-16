<template>
    <div>
        <span>{{ toast.notice }}</span>
        <Button @click="emit('close')">x</Button>
    </div>
</template>

<script setup>
const props = defineProps({
    toast: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['close']);
</script>
