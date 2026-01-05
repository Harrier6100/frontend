<template>
    <SearchInput v-model="inputValue" @change="onChange" />
</template>

<script setup>
import { computed } from 'vue';
import { useLoading } from '@/composables/state';
import { propertyService } from '@/services';

const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue']);

const { isLoading, startLoading, stopLoading } = useLoading();

const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const onChange = async () => {
    if (!inputValue.value) return;

    try {
        startLoading();
        const data = await propertyService.get(inputValue.value);
        emit('change', data);
        emit('error', false);
        emit('errorMessage', '');
    } catch (error) {
        emit('change', null);
        emit('error', true);
        emit('errorMessage', error.message);
    } finally {
        stopLoading();
    }
};
</script>
