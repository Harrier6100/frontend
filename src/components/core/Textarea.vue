<template>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
});
</script>
