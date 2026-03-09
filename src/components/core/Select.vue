<template>
    <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
    >
        <slot></slot>
    </select>
</template>

<script setup>
defineProps({
    modelValue: String,
});
</script>
