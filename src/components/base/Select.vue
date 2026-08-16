<template>
    <select
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
    >
        <slot></slot>
    </select>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
</script>
