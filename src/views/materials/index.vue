<template>
    <h3>{{ t('MENU.MATERIALS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'materials:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.MATERIALS.ID') }}</Th>
                <Th>{{ t('LABEL.MATERIALS.NAME') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="supplier in paginatedData" :key="supplier.id">
                <Td>{{ supplier.id }}</Td>
                <Td>{{ supplier.name }}</Td>
                <Td>{{ getDateTime(supplier.createdAt) }}</Td>
                <Td>{{ supplier.createdBy }}</Td>
                <Td>{{ getDateTime(supplier.updatedAt) }}</Td>
                <Td>{{ supplier.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'materials:u' }" @click="updateData(supplier.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'materials:d' }" @click="deleteData(supplier.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { materialService } from '@/services/materialService';

const { t, locale: language } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
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

const createData = () => {
    setQuery(route.query);
    router.push({
        name: 'Materials[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Materials[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await materialService.delete(id);
            materials.value = await materialService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
