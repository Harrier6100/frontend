<template>
    <h3>{{ t('MENU.CUSTOMERS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'customers:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.CUSTOMERS.ID') }}</Th>
                <Th>{{ t('LABEL.CUSTOMERS.NAME') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in paginatedData" :key="customer.id">
                <Td>{{ customer.id }}</Td>
                <Td>{{ customer.name }}</Td>
                <Td>{{ getDateTime(customer.createdAt) }}</Td>
                <Td>{{ customer.createdBy }}</Td>
                <Td>{{ getDateTime(customer.updatedAt) }}</Td>
                <Td>{{ customer.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'customers:u' }" @click="updateData(customer.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'customers:d' }" @click="deleteData(customer.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { customerService } from '@/services/customerService';

const { t, locale: language } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const customers = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(customers);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            customers.value = await customerService.fetch();
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
        name: 'Customers[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Customers[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await customerService.delete(id);
            customers.value = await customerService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
