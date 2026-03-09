<template>
    <div>
        <span>{{ toast.message }}</span>
        <Button @click="$emit('close')">{{ t('button.close_x') }}</Button>
    </div>
</template>

<script setup>
defineProps({
    toast: {
        type: Object,
        required: true,
    },
});

const { t } = useI18n();
</script>
