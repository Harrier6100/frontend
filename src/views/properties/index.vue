<template>
    <h3>{{ t('MENU.PROPERTIES') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'properties:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.PROPERTIES.ID') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.NAME') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.UOM') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="property in paginatedData" :key="property.id">
                <Td>{{ property.id }}</Td>
                <Td>{{ property.name }}</Td>
                <Td>{{ property.uom }}</Td>
                <Td>{{ getDateTime(property.createdAt) }}</Td>
                <Td>{{ property.createdBy }}</Td>
                <Td>{{ getDateTime(property.updatedAt) }}</Td>
                <Td>{{ property.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'properties:u' }" @click="updateData(property.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'properties:d' }" @click="deleteData(property.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { propertyService } from '@/services/propertyService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

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

const createData = () => {
    setQuery(route.query);
    router.push({
        name: 'Properties[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Properties[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await propertyService.delete(id);
            properties.value = await propertyService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
