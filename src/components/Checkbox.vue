<template>
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean,
});
</script>
