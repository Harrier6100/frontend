<template>
    <Input v-model="keyword" />
    <Button v-can="'users.create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <Table>
        <Thead>
            <Tr>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="id">{{ t('label.users.id') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="name">{{ t('label.users.name') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdAt">{{ t('label.created_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdBy">{{ t('label.created_by') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedAt">{{ t('label.updated_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedBy">{{ t('label.updated_by') }}</Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr v-for="user in items" :key="user.id">
                <Td>{{ user.id }}</Td>
                <Td>{{ user.name }}</Td>
                <Td>{{ formatDateTime(user.createdAt) }}</Td>
                <Td>{{ user.createdBy }}</Td>
                <Td>{{ formatDateTime(user.updatedAt) }}</Td>
                <Td>{{ user.updatedBy }}</Td>
                <Td>
                    <Button v-can="'users.update'" @click="onEdit(user.id)">{{ t('button.edit') }}</Button>
                    <Button v-can="'users.create'" @click="onCopy(user.id)">{{ t('button.copy') }}</Button>
                </Td>
            </Tr>
        </Tbody>
    </Table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { userService } from '@/services/userService';
import { errorHandler } from '@/helpers/errorHandler';
import { formatDateTime } from '@/helpers/formatDateTime';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { execute } = useAsync();
const { addToast } = useToast();

const users = ref([]);
const { keyword, page, pageCount, items, sortBy, orderBy } = useDataTable(users);

const fetchUsers = async () => {
    try {
        await execute(async () => {
            users.value = await userService.getAll();
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onCreate = () => {
    router.push({
        name: 'UsersCreate',
        query: { from: route.fullPath },
    });
};

const onEdit = (id) => {
    router.push({
        name: 'UsersUpdate',
        params: { id },
        query: { from: route.fullPath },
    });
};

const onCopy = (id) => {
    router.push({
        name: 'UsersCreate',
        query: { id, from: route.fullPath },
    });
};

onMounted(() => {
    fetchUsers();
});
</script>
