<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Input v-model="keyword" :placeholder="t('placeholder.search')" />
            <table>
                <thead>
                    <tr>
                        <Th></Th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="permission in paginatedData" :key="permission.id">
                        <Td><Label :for="permission.id">{{ t(permission.name) }}</Label></Td>
                        <Td><Checkbox v-model="selectItems" :id="permission.id" :value="permission.id" /></Td>
                    </tr>
                </tbody>
            </table>
            <Pagination v-model:page="page" :pageCount="pageCount" />
            <Button @click="onSave">{{ t('button.save') }}</Button>
            <Button @click="$emit('close')">{{ t('button.close') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
import { permissionService } from '@/services/permissionService';
import { useDataTable } from '@/composables/useDataTable';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['save', 'close']);

const { t } = useI18n();

const selectItems = ref([]);
const permissions = ref([]);
const { keyword, page, pageCount, paginatedData } = useDataTable(permissions);

onMounted(async () => {
    permissions.value = await permissionService.fetch();
});

watch(() => props.isOpen, (open) => {
    if (open) {
        selectItems.value = [...props.modelValue];
    }
}, { immediate: true });

const onSave = () => {
    emit('save', selectItems.value);
    emit('close');
};
</script>
