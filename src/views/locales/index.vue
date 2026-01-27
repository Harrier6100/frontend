<template>
    <h3>{{ t('MENU.LOCALES') }}</h3>
    <Input v-model="keyword" :placeholder="t('PLACEHOLDER.SEARCH')" />
    <Button v-can="'locales.create'" @click="onCreate">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.LOCALES.ID') }}</Th>
                <Th>{{ t('LABEL.LOCALES.LOCALES') }}</Th>
                <Th>{{ t('LABEL.CREATED_AT') }}</Th>
                <Th>{{ t('LABEL.CREATED_BY') }}</Th>
                <Th>{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th>{{ t('LABEL.UPDATED_BY') }}</Th>
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
                    <Button v-can="'locales.update'" @click="onUpdate(locale.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="'locales.delete'" @click="onDelete(locale.id)">{{ t('BUTTON.DELETE') }}</Button>
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
import { localeService } from '@/services';
import { getDateTime, errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t, locale: language } = useI18n();
const { isLoading, runAsync } = useLoading();
const { setQuery } = useQuery();

const locales = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(locales);

onMounted(async () => {
    await runAsync(async () => {
        locales.value = await localeService.fetch();
    });
});

const onCreate = () => {
    setQuery(route.query);
    router.push({ name: 'Locales[new]' });
};

const onUpdate = (id) => {
    setQuery(route.query);
    router.push({ name: 'Locales[id]', params: { id }});
};

const onDelete = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    await runAsync(async () => {
        await localeService.delete(id);
        locales.value = await localeService.fetch();
        addToast(t('MESSAGE.DELETE'));
    });
};
</script>
