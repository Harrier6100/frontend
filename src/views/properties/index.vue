<template>
    <h3>{{ t('MENU.PROPERTIES') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'properties:c' }" @click="createProperty">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.PROPERTIES.ID') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.NAME') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.PROPERTIES.UPDATED_BY') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="property in paginatedData" :key="property.id">
                <Td>{{ property.id }}</Td>
                <Td>{{ property.name }}</Td>
                <Td>{{ getDateTime(property.createdAt) }}</Td>
                <Td>{{ property.createdBy }}</Td>
                <Td>{{ getDateTime(property.updatedAt) }}</Td>
                <Td>{{ property.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'properties:u' }" @click="updateProperty(property.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'properties:d' }" @click="deleteProperty(property.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { useDataTableQuery } from '@/composables/data';
import { useQuery, useLoading, useToast, useConfirm } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { getDateTime, errorHandler } from '@/utils';
import { propertyService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { addToast } = useToast();
const { confirm } = useConfirm();
const { isSpinning, execute } = useSpinning();

const properties = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTableQuery(properties);

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

const createProperty = () => {
    setQuery(route.query);
    router.push({
        name: 'Properties[new]',
    });
};

const updateProperty = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Properties[id]',
        params: { id },
    });
};

const deleteProperty = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            const data = await propertyService.delete(id);
            properties.value = await propertyService.fetch();
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
