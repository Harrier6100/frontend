<template>
    <div>
        <span>{{ toast.message }}</span>
        <Button @click="$emit('close')">x</Button>
    </div>
</template>

<script setup>
defineProps({
    toast: {
        type: Object,
        required: true,
    },
});
</script>
