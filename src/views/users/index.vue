<template>
    <h3>{{ t('MENU.USERS') }}</h3>
    <Input v-model="keyword" :placeholder="t('PLACEHOLDER.SEARCH')" />
    <Button v-can="'users.create'" @click="onCreate">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.USERS.ID') }}</Th>
                <Th>{{ t('LABEL.USERS.NAME') }}</Th>
                <Th>{{ t('LABEL.IS_ACTIVE') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in paginatedData" :key="user.id">
                <Td>{{ user.id }}</Td>
                <Td>{{ user.name }}</Td>
                <Td>{{ user.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Td>
                <Td>{{ getDateTime(user.createdAt) }}</Td>
                <Td>{{ user.createdBy }}</Td>
                <Td>{{ getDateTime(user.updatedAt) }}</Td>
                <Td>{{ user.updatedBy }}</Td>
                <Td>
                    <Button v-can="'users.update'" @click="onUpdate(user.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="'users.delete'" @click="onDelete(user.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { userService } from '@/services';
import { getDateTime, errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { setQuery } = useQuery();

const users = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(users);

onMounted(async () => {
    await runAsync(async () => {
        users.value = await userService.fetch();
    });
});

const onCreate = () => {
    setQuery(route.query);
    router.push({ name: 'Users[new]' });
};

const onUpdate = (id) => {
    setQuery(route.query);
    router.push({ name: 'Users[id]', params: { id }});
};

const onDelete = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    await runAsync(async () => {
        await userService.delete(id);
        users.value = await userService.fetch();
        addToast(t('MESSAGE.DELETE'));
    });
};
</script>
