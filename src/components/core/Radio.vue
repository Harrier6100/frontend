<template>
    <input
        type="radio"
        :checked="modelValue === value"
        :value="value"
        @change="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    modelValue: String,
    value: String,
});
</script>
