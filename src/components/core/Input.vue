<template>
    <input
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    modelValue: String,
    type: String,
    placeholder: String,
});

const inputRef = ref(null);

defineExpose({ inputRef });
</script>
