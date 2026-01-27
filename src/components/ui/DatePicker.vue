<template>
    <DatePicker v-model="innerValue" :masks="masks" :popover="popover">
        <template #default="{ inputValue, inputEvents }">
            <Input :value="inputValue" v-on="inputEvents" />
        </template>
    </DatePicker>
</template>

<script setup>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css'

const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const innerValue = ref(props.modelValue);

const masks = ref({
    input: 'YYYY-MM-DD',
});

const popover = ref({
    visibility: 'click',
});

watch(() => props.modelValue, (value) => {
    innerValue.value = value;
});

watch(innerValue, (value) => {
    emit('update:modelValue', value);
});
</script>
