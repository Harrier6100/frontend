<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('BUTTON.CLOSE_MODAL') }}</Button>
            <Input v-model="keyword" />
            <table>
                <thead>
                    <tr>
                        <Th>{{ t('LABEL.PROPERTIES.ID') }}</Th>
                        <Th>{{ t('LABEL.PROPERTIES.NAME') }}</Th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="property in paginatedData" :key="property.id">
                        <Td>{{ property.id }}</Td>
                        <Td>{{ property.name }}</Td>
                        <Td>
                            <Button @click="onSelect(property)">{{ t('BUTTON.SELECT') }}</Button>
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
import { useLoading, useToast } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { errorHandler } from '@/utils';
import { propertyService } from '@/services';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['select', 'close']);

const { t } = useI18n();
const { isLoading, startLoading, stopLoading } = useLoading();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();

const properties = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(properties);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            properties.value = await propertyService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSelect = (data) => {
    emit('select', data);
    emit('close');
};
</script>
