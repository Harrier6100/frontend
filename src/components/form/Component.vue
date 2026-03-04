<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Form @submit.prevent="onSave">
                <div>
                    <Label></Label>
                    <Input v-model="component.componentId" />
                </div>
                <div>
                    <Label></Label>
                    <Input v-model="component.componentName" />
                </div>
                <div>
                    <Label></Label>
                    <Input v-model="component.contentRatio" />
                </div>
                <Button @click="onSave">{{ t('BUTTON.SAVE') }}</Button>
                <Button @click="$emit('close')">{{ t('BUTTON.CLOSE') }}</Button>
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import { useDataTable } from '@/composables/useDataTable';
import { permissionService } from '@/services';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['save', 'close']);

const { t } = useI18n();

const component = ref({});

// const component = ref({
//     componentId: '',
//     componentName: '',
//     contentRatio: 0,
// });

watch(() => props.modelValue, (value) => {
    component.value = { ...value };
}, { immediate: true });

const onSave = () => {
    emit('save', component.value);
    emit('close');
};
</script>
