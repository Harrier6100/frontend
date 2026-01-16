<template>
    <input
        type="radio"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
const props = defineProps({
    value: String,
    modelValue: String,
});
</script>
