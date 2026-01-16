<template>
    <h3>{{ t('MENU.PROPERTY_SPECS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'property-specs:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.PROPERTY_SPECS.MATERIAL_ID') }}</Th>
                <Th>{{ t('LABEL.PROPERTY_SPECS.MATERIAL_NAME') }}</Th>
                <Th>{{ t('LABEL.PROPERTY_SPECS.SUPPLIER_ID') }}</Th>
                <Th>{{ t('LABEL.PROPERTY_SPECS.SUPPLIER_NAME') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="propertySpec in paginatedData" :key="propertySpec.id">
                <Td>{{ propertySpec.materialId }}</Td>
                <Td>{{ propertySpec.materialName }}</Td>
                <Td>{{ propertySpec.supplierId }}</Td>
                <Td>{{ propertySpec.supplierName }}</Td>
                <Td>{{ getDateTime(propertySpec.createdAt) }}</Td>
                <Td>{{ propertySpec.createdBy }}</Td>
                <Td>{{ getDateTime(propertySpec.updatedAt) }}</Td>
                <Td>{{ propertySpec.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'property-specs:u' }" @click="updateData(propertySpec.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'property-specs:d' }" @click="deleteData(propertySpec.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { useDataTable, useQuery } from '@/composables/data';
import { useConfirm, useLoading, useSpinning, useToast } from '@/composables/ui';
import { getDateTime } from '@/utils/formatDateTime';
import { errorHandler } from '@/utils/errorHandler';
import { propertySpecService } from '@/services/propertySpecService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const propertySpecs = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(propertySpecs);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            propertySpecs.value = await propertySpecService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const createData = () => {
    setQuery(route.query);
    router.push({
        name: 'PropertySpecs[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'PropertySpecs[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await propertySpecService.delete(id);
            propertySpecs.value = await propertySpecService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
