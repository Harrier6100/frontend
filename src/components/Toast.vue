<template>
    <teleport to="body">
        <div v-for="toast in toasts" :key="toast.id">
            <div>{{ toast.message }}</div>
            <Button @click="removeToast(toast.id)"></Button>
        </div>
    </teleport>
</template>

<script setup>
import { useToast } from '@/composables/state';
const { toasts, removeToast } = useToast();
</script>
