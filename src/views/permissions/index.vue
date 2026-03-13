<template>
    <h4>{{ t('menu.permissions') }}</h4>
    <Input v-model="keyword" :placeholder="t('placeholder.search')" @input="page = 1"/>
    <Button v-can="'permissions.create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <table>
        <thead>
            <tr>
                <Th sortKey="id" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.id') }}</Th>
                <Th sortKey="name" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.name') }}</Th>
                <Th sortKey="isActive" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.is_active') }}</Th>
                <Th sortKey="createdAt" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.created_at') }}</Th>
                <Th sortKey="createdBy" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.created_by') }}</Th>
                <Th sortKey="updatedAt" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.updated_at') }}</Th>
                <Th sortKey="updatedBy" :orderBy="orderBy" @sort="sortBy">{{ t('permissions.updated_by') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="permission in paginatedData" :key="permission.id">
                <Td>{{ permission.id }}</Td>
                <Td>{{ t(permission.name) }}</Td>
                <Td>{{ permission.isActive ? t('permissions.is_active_true') : t('permissions.is_active_false') }}</Td>
                <Td>{{ formatDateTime(permission.createdAt) }}</Td>
                <Td>{{ permission.createdBy }}</Td>
                <Td>{{ formatDateTime(permission.updatedAt) }}</Td>
                <Td>{{ permission.updatedBy }}</Td>
                <Td>
                    <Button v-can="'permissions.update'" @click="onUpdate(permission.id)">{{ t('button.edit') }}</Button>
                    <Button v-can="'permissions.delete'" @click="onDelete(permission.id)">{{ t('button.delete') }}</Button>
                    <Button v-can="'permissions.create'" @click="onCopy(permission.id)">{{ t('button.copy') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { permissionService } from '@/services/permissionService';
import { formatDateTime } from '@/utils/formatDateTime';
import { useLoading } from '@/composables/useLoading';
import { useDataTable } from '@/composables/useDataTableSync';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useLoading();

const permissions = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(permissions);

onMounted(async () => {
    await execute(async () => {
        permissions.value = await permissionService.fetch();
    });
});

const onCreate = () => {
    router.push({
        name: 'Permissions[new]',
        query: { from: route.fullPath },
    });
};

const onUpdate = (id) => {
    router.push({
        name: 'Permissions[id]',
        params: { id },
        query: { from: route.fullPath },
    });
};

const onCopy = async (id) => {
    router.push({
        name: 'Permissions[new]',
        query: { id, from: route.fullPath },
    });
};

const onDelete = async (id) => {
    if (!await confirm(t('confirm.delete'))) return;

    await execute(async () => {
        await permissionService.delete(id);
        permissions.value = await permissionService.fetch();
        addToast(t('message.delete'));
    });
};
</script>
