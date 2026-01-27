<template>
    <input
        type="checkbox"
        v-model="isChecked"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [Boolean, Array],
        required: true,
    },
    value: {
        required: false,
    },
});
const emit = defineEmits(['update:modelValue']);

const isChecked = computed({
    get() {
        return Array.isArray(props.modelValue)
            ? props.modelValue.includes(props.value)
            : !!props.modelValue;
    },
    set(checked) {
        if (!Array.isArray(props.modelValue)) {
            emit('update:modelValue', checked);
            return;
        }

        const newValue = checked
            ? [...props.modelValue, props.value]
            : props.modelValue.filter(v => v !== props.value);

        emit('update:modelValue', newValue);
    },
});
</script>
