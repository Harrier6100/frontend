<template>
    <h3>{{ t('MENU.PERMISSIONS') }}</h3>
    <Input v-model="keyword" :placeholder="t('PLACEHOLDER.SEARCH')" />
    <Button v-can="'permissions.create'" @click="onCreate">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.PERMISSIONS.ID') }}</Th>
                <Th>{{ t('LABEL.PERMISSIONS.NAME') }}</Th>
                <Th>{{ t('LABEL.IS_ACTIVE') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="permission in paginatedData" :key="permission.id">
                <Td>{{ permission.id }}</Td>
                <Td>{{ permission.name }}</Td>
                <Td>{{ permission.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Td>
                <Td>{{ getDateTime(permission.createdAt) }}</Td>
                <Td>{{ permission.createdBy }}</Td>
                <Td>{{ getDateTime(permission.updatedAt) }}</Td>
                <Td>{{ permission.updatedBy }}</Td>
                <Td>
                    <Button v-can="'permissions.update'" @click="onUpdate(permission.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="'permissions.delete'" @click="onDelete(permission.id)">{{ t('BUTTON.DELETE') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { useLoading } from '@/composables/useLoading';
import { useQuery } from '@/composables/useQuery';
import { useDataTable } from '@/composables/useDataTableWithQuery';
import { permissionService } from '@/services';
import { getDateTime, errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { setQuery } = useQuery();

const permissions = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(permissions);

onMounted(async () => {
    await runAsync(async () => {
        permissions.value = await permissionService.fetch();
    });
});

const onCreate = () => {
    setQuery(route.query);
    router.push({ name: 'Permissions[new]' });
};

const onUpdate = (id) => {
    setQuery(route.query);
    router.push({ name: 'Permissions[id]', params: { id }});
};

const onDelete = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    await runAsync(async () => {
        await permissionService.delete(id);
        permissions.value = await permissionService.fetch();
        addToast(t('MESSAGE.DELETE'));
    });
};
</script>
