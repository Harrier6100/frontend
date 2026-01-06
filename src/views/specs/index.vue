<template>
    <h3>{{ t('MENU.SPECS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'specs:c' }" @click="createSpec">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.SPECS.MATERIAL_ID') }}</Th>
                <Th>{{ t('LABEL.SPECS.MATERIAL_NAME') }}</Th>
                <Th>{{ t('LABEL.SPECS.SUPPLIER_ID') }}</Th>
                <Th>{{ t('LABEL.SPECS.SUPPLIER_NAME') }}</Th>
                <Th>{{ t('LABEL.IS_ACTIVE') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="spec in paginatedData" :key="spec.id">
                <Td>{{ spec.materialId }}</Td>
                <Td>{{ spec.materialName }}</Td>
                <Td>{{ spec.supplierId }}</Td>
                <Td>{{ spec.supplierName }}</Td>
                <Td>{{ spec.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Td>
                <Td>{{ getDateTime(spec.createdAt) }}</Td>
                <Td>{{ spec.createdBy }}</Td>
                <Td>{{ getDateTime(spec.updatedAt) }}</Td>
                <Td>{{ spec.updatedBy }}</Td>
                <Td>
                    <Button @click="updateSpec(spec.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button @click="deleteSpec(spec.id)">{{ t('BUTTON.DELETE') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination
        v-model:page="page"
        :pageCount="pageCount"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDataTable } from '@/composables/data';
import { useConfirm, useLoading, useQuery, useToast } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { errorHandler, getDateTime } from '@/utils';
import { specService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { setQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();

const specs = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(specs);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            specs.value = await specService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const createSpec = () => {
    setQuery(route.query);
    router.push({
        name: 'Specs[new]',
    });
};

const updateSpec = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Specs[id]',
        params: { id },
    });
};

const deleteSpec = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await specService.delete(id);
            specs.value = await specService.fetch();
        });
        addToast('MESSAGE.DELETE', 'success');
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
