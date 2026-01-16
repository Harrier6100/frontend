<template>
    <SearchInput v-model="inputValue" @change="onChange" @open="selector.open" :readonly="readonly" />
    <CustomerIdSelector :isOpen="selector.state.isOpen" @select="onSelect" @close="selector.close" />
</template>

<script setup>
import { computed } from 'vue';
import { useLoading, useModal } from '@/composables/ui';
import { errorHandler } from '@/utils/errorHandler';
import { customerService } from '@/services/customerService';

const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'error']);

const { isLoading, startLoading, stopLoading } = useLoading();
const selector = useModal();

const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const onChange = async () => {
    emit('change', null);
    emit('error', { isError: false, message: '' });
    if (!inputValue.value) return;

    try {
        startLoading();
        const responseData = await customerService.get(inputValue.value);
        emit('change', responseData);
        emit('error', { isError: false, message: '' });
    } catch (error) {
        const { message } = errorHandler(error);
        emit('change', null);
        emit('error', { isError: true, message });
    } finally {
        stopLoading();
    }
};

const onSelect = (selectData) => {
    inputValue.value = selectData?.id ?? '';
    emit('change', selectData);
    emit('error', { isError: false, message: '' });
};
</script>
