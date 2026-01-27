<template>
    <input
        ref="inputRef"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    modelValue: String,
    placeholder: String,
});

const inputRef = ref(null);

defineExpose({ inputRef });
</script>
