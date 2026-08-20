<template>
    <teleport to="body">
        <div v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    </teleport>
</template>

<script setup>
const { isLoading } = useLoading();
</script>
