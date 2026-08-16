<template>
    <button
        :type="submit ? 'submit' : 'button'"
        :disabled="disabled || spinning"
    >
        <span v-if="spinning">...</span>
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    submit: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    spinning: {
        type: Boolean,
        default: false,
    },
});
</script>
