<template>
    <h3>{{ t('MENU.LOCALES') }}</h3>
    <Input v-model="keyword" />
    <Button v-can="{ permissions: 'locales:c' }" @click="createLocale">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.LOCALES.ID') }}</Th>
                <Th>{{ t('LABEL.LOCALES.LOCALES') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th>{{ t('LABEL.ACTIONS') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="locale in paginatedData" :key="locale.id">
                <Td>{{ locale.id }}</Td>
                <Td>{{ locale.locales?.[lang] }}</Td>
                <Td>{{ getDateTime(locale.createdAt) }}</Td>
                <Td>{{ locale.createdBy }}</Td>
                <Td>{{ getDateTime(locale.updatedAt) }}</Td>
                <Td>{{ locale.updatedBy }}</Td>
                <Td>
                    <Button v-can="{ permissions: 'locales:u' }" @click="updateLocale(locale.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="{ permissions: 'locales:d' }" @click="deleteLocale(locale.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { localeService } from '@/services';

const { t, locale: lang } = useI18n();
const route = useRoute();
const router = useRouter();
const { confirm } = useConfirm();
const { isLoading, startLoading, stopLoading } = useLoading();
const { setQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();

const locales = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTableQuery(locales);

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

const createLocale = () => {
    setQuery(route.query);
    router.push({
        name: 'Locales[new]',
    });
};

const updateLocale = (id) => {
    setQuery(route.query);
    router.push({
        name: 'Locales[id]',
        params: { id },
    });
};

const deleteLocale = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    try {
        startLoading();
        await execute(async () => {
            await localeService.delete(id)
            locales.value = await localeService.fetch();
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
