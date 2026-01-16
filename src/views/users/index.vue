<template>
    <h3>{{ t('MENU.USERS') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'users:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.USERS.ID') }}</Th>
                <Th>{{ t('LABEL.USERS.NAME') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
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
                    <Button v-can="{ permissions: 'users:u' }" @click="updateData(user.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'users:d' }" @click="deleteData(user.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { userService } from '@/services/userService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const users = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(users);

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

const createData = () => {
    setQuery(route.query);
    router.push({
        name: 'Users[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Users[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await userService.delete(id);
            users.value = await userService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
