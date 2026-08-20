<template>
    <Input v-model="keyword" />
    <Button v-can="'roles.create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <Table>
        <Thead>
            <Tr>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="id">{{ t('label.roles.id') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="name">{{ t('label.roles.name') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdAt">{{ t('label.created_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdBy">{{ t('label.created_by') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedAt">{{ t('label.updated_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedBy">{{ t('label.updated_by') }}</Th>
                <Th></Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr v-for="role in items" :key="role.id">
                <Td>{{ role.id }}</Td>
                <Td>{{ role.name }}</Td>
                <Td>{{ formatDateTime(role.createdAt) }}</Td>
                <Td>{{ role.createdBy }}</Td>
                <Td>{{ formatDateTime(role.updatedAt) }}</Td>
                <Td>{{ role.updatedBy }}</Td>
                <Td>
                    <Button v-can="'roles.update'" @click="onEdit(role.id)">{{ t('button.edit') }}</Button>
                    <Button v-can="'roles.create'" @click="onCopy(role.id)">{{ t('button.copy') }}</Button>
                </Td>
            </Tr>
        </Tbody>
    </Table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { roleService } from '@/services/roleService';
import { errorHandler } from '@/helpers/errorHandler';
import { formatDateTime } from '@/helpers/formatDateTime';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { execute } = useAsync();
const { addToast } = useToast();

const roles = ref([]);
const { keyword, page, pageCount, items, sortBy, orderBy } = useDataTable(roles);

const onCreate = () => {
    router.push({
        name: 'RolesCreate',
        query: { from: route.fullPath },
    });
};

const onEdit = (id) => {
    router.push({
        name: 'RolesUpdate',
        params: { id },
        query: { from: route.fullPath },
    });
};

const onCopy = (id) => {
    router.push({
        name: 'RolesCreate',
        query: { id, from: route.fullPath },
    });
};

onMounted(async () => {
    try {
        await execute(async () => {
            roles.value = await roleService.getAll();
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
});
</script>
