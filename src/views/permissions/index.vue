<template>
    <Input v-model="keyword" />
    <Table>
        <Thead>
            <Tr>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="id">{{ t('label.permissions.id') }}</Th>
                <Th>{{ t('label.permissions.name') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdAt">{{ t('label.created_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdBy">{{ t('label.created_by') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedAt">{{ t('label.updated_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedBy">{{ t('label.updated_by') }}</Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr v-for="permission in items" :key="permission.id">
                <Td>{{ permission.id }}</Td>
                <Td>{{ t('permission.' + permission.id + '.name') }}</Td>
                <Td>{{ formatDateTime(permission.createdAt) }}</Td>
                <Td>{{ permission.createdBy }}</Td>
                <Td>{{ formatDateTime(permission.updatedAt) }}</Td>
                <Td>{{ permission.updatedBy }}</Td>
            </Tr>
        </Tbody>
    </Table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { permissionService } from '@/services/permissionService';
import { errorHandler } from '@/helpers/errorHandler';
import { formatDateTime } from '@/helpers/formatDateTime';

const { t } = useI18n();
const { execute } = useAsync();
const { addToast } = useToast();

const permissions = ref([]);
const { keyword, page, pageCount, items, sortBy, orderBy } = useDataTable(permissions);

onMounted(async () => {
    try {
        await execute(async () => {
            permissions.value = await permissionService.getAll();
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
});
</script>
