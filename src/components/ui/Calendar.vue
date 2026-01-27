<template>
    <DatePicker v-model="innerValue" :masks="masks" :popover="popover" :attributes="attributes">
        <template #default="{ inputValue, inputEvents }">
            <Input :value="inputValue" v-on="inputEvents" :placeholder="placeholder" />
        </template>
    </DatePicker>
</template>

<script setup>
import moment from 'moment';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css'

const props = defineProps({
    modelValue: String,
    format: {
        type: String,
        default: 'YYYY-MM-DD',
    },
    placeholder: String,
});
const emit = defineEmits(['update:modelValue']);

const innerValue = computed({
    get() {
        if (props.modelValue) return '';
        return moment(props.modelValue, props.format).toDate();
    },
    set(value) {
        const formatted = value ? moment(value).format(props.format) : '';
        emit('update:modelValue', formatted);
    },
});

const masks = {
    input: 'YYYY-MM-DD',
};

const popover = {
    visibility: 'click',
};

const attributes = [
    {
        dot: true,
        dates: new Date(),
    },
];
</script>
