<template>
    <Input
        ref="inputRef"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import flatpickr from 'flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import 'flatpickr/dist/flatpickr.min.css';

const props = defineProps({
    modelValue: String,
    style: {
        type: String,
        default: 'Y-m-d',
    },
});
const emit = defineEmits(['update:modelValue']);

const inputRef = ref(null);
let pickerInstance = null;

watch(() => props.modelValue, (value) => {
    if (pickerInstance) {
        pickerInstance.setDate(value || null, false);
    }
});

onMounted(() => {
    pickerInstance = flatpickr(inputRef.value.inputRef, {
        dateFormat: props.style,
        allowInput: true,
        locale: Japanese,
        onChange: ([selectedDate]) => {
            emit('update:modelValue', selectedDate);
        },
    });
});

onBeforeUnmount(() => {
    if (pickerInstance) {
        pickerInstance.destroy();
        pickerInstance = null;
    }
});
</script>
