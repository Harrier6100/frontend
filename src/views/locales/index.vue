<template>
    <h3>{{ t('MENU.LOCALES') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'locales:c' }" @click="createData">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.LOCALES.ID') }}</Th>
                <Th>{{ t('LABEL.LOCALES.LOCALES') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="locale in paginatedData" :key="locale.id">
                <Td>{{ locale.id }}</Td>
                <Td>{{ locale.locales?.[language] }}</Td>
                <Td>{{ getDateTime(locale.createdAt) }}</Td>
                <Td>{{ locale.createdBy }}</Td>
                <Td>{{ getDateTime(locale.updatedAt) }}</Td>
                <Td>{{ locale.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'locales:u' }" @click="updateData(locale.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'locales:d' }" @click="deleteData(locale.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { localeService } from '@/services/localeService';

const { t, locale: language } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const locales = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(locales);

onMounted(async () => {
    try {
        startLoading();
        await execute(async () => {
            locales.value = await localeService.fetch();
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
        name: 'Locales[new]',
    });
};

const updateData = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Locales[id]',
        params: { id },
    });
};

const deleteData = async (id) => {
    if (!await confirm(t('MESSAGE.CONFIRM_DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await localeService.delete(id);
            locales.value = await localeService.fetch();
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};
</script>
