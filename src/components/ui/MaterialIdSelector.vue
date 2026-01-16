<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('BUTTON.CLOSE_MODAL') }}</Button>
            <Input v-model="keyword" />
            <table>
                <thead>
                    <tr>
                        <Th>{{ t('LABEL.MATERIALS.ID') }}</Th>
                        <Th>{{ t('LABEL.MATERIALS.NAME') }}</Th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="material in paginatedData" :key="material.id">
                        <Td>{{ material.id }}</Td>
                        <Td>{{ material.name }}</Td>
                        <Td>
                            <Button @click="onSelect(material)">{{ t('BUTTON.SELECT') }}</Button>
                        </Td>
                    </tr>
                </tbody>
            </table>
            <Pagination
                v-model:page="page"
                :pageCount="pageCount"
            />
        </div>
    </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDataTable } from '@/composables/data';
import { useLoading, useSpinning, useToast } from '@/composables/ui';
import { errorHandler } from '@/utils/errorHandler';
import { materialService } from '@/services/materialService';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);

const { t } = useI18n();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const materials = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(materials);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            materials.value = await materialService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSelect = (property) => {
    emit('select', property);
    emit('close');
};
</script>
