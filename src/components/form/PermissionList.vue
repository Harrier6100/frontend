<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Input v-model="keyword" :placeholder="t('PLACEHOLDER.SEARCH')" />
            <table>
                <thead>
                    <tr>
                        <Th></Th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="permission in paginatedData" :key="permission.id">
                        <Td>{{ t(permission.name) }}</Td>
                        <Td><Checkbox v-model="selectItems" :value="permission.id" /></Td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-model:page="page" :pageCount="pageCount" />
            <Button @click="onSave">{{ t('BUTTON.SAVE') }}</Button>
            <Button @click="$emit('close')">{{ t('BUTTON.CLOSE') }}</Button>
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

const permissions = ref([]);
const { keyword, page, pageCount, paginatedData } = useDataTable(permissions);

const selectItems = ref([]);

onMounted(async () => {
    permissions.value = await permissionService.fetch();
});

watch(() => props.isOpen, (open) => {
    if (open) selectItems.value = [...props.modelValue];
}, { immediate: true });

const onSave = () => {
    emit('save', selectItems.value);
    emit('close');
};
</script>
