<template>
    <SearchInput v-model="inputValue" @change="onChange" @open="modals.selector.open" :readonly="readonly" />
    <PropertyIdSelector :isOpen="modals.selector.state.isOpen" @select="onSelect" @close="modals.selector.close" />
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useLoading } from '@/composables/state';
import { useModal } from '@/composables/ui';
import { errorHandler } from '@/utils';
import { propertyService } from '@/services';

const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'error']);

const { isLoading, startLoading, stopLoading } = useLoading();

const modals = reactive({
    selector: useModal(),
});

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
        const data = await propertyService.get(inputValue.value);
        emit('change', data);
        emit('error', { isError: false, message: '' });
    } catch (error) {
        const { message } = errorHandler(error);
        emit('change', null);
        emit('error', { isError: true, message });
    } finally {
        stopLoading();
    }
};

const onSelect = (data) => {
    inputValue.value = data?.id ?? '';
    emit('change', data);
    emit('error', { isError: false, message: '' });
};
</script>
