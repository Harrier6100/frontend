<template>
    <h3>{{ t('MENU.USERS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'users:c' }" @click="createUser">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.USERS.ID') }}</Th>
                <Th>{{ t('LABEL.USERS.NAME') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th>{{ t('LABEL.ACTIONS') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in paginatedData" :key="user.id">
                <Td>{{ user.id }}</Td>
                <Td>{{ user.name }}</Td>
                <Td>{{ getDateTime(user.createdAt) }}</Td>
                <Td>{{ user.createdBy }}</Td>
                <Td>{{ getDateTime(user.updatedAt) }}</Td>
                <Td>{{ user.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'users:u' }" @click="updateUser(user.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'users:d' }" @click="deleteUser(user.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { useConfirm, useLoading, useQuery, useToast } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { errorHandler, getDateTime } from '@/utils';
import { userService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { setQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();

const users = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTableQuery(users);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            users.value = await userService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const createUser = () => {
    setQuery(route.query);
    router.push({
        name: 'Users[new]',
    });
};

const updateUser = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Users[id]',
        params: { id },
    });
};

const deleteUser = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await userService.delete(id);
            users.value = await userService.fetch();
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
