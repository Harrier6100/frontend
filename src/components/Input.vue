<template>
    <input
        ref="inputRef"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: String,
    placeholder: String,
});

const inputRef = ref(null);

defineExpose({
    inputRef
});
</script>
