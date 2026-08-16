<template>
    <teleport to="body">
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :toast="toast"
            @close="removeToast(toast.id)"
        />
    </teleport>
</template>

<script setup>
const { toasts, removeToast } = useToast();
</script>
