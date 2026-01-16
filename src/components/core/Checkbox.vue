<template>
    <input
        type="checkbox"
        :checked="isChecked"
        @change="onChange($event.target.checked)"
    />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Array, Boolean],
        required: true,
    },
    value: {
        required: false,
    },
});
const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    } else {
        return !!props.modelValue;
    }
});

const onChange = (checked) => {
    if (Array.isArray(props.modelValue)) {
        const newValue = [...props.modelValue];
        if (checked) {
            if (!newValue.includes(props.value)) {
                newValue.push(props.value);
            }
        } else {
            const index = newValue.indexOf(props.value);
            if (index !== -1) newValue.splice(index, 1);
        }
        emit('update:modelValue', newValue);
    } else {
        emit('update:modelValue', checked);
    }
};
</script>
