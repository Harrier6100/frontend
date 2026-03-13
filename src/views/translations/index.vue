<template>
    <h4>{{ t('menu.translations') }}</h4>
    <Input v-model="keyword" :placeholder="t('placeholder.search')" @input="page = 1"/>
    <Button v-can="'translations.create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <table>
        <thead>
            <tr>
                <Th sortKey="id" :orderBy="orderBy" @sort="sortBy">{{ t('translations.id') }}</Th>
                <Th :sortKey="`locales.${language}`" :orderBy="orderBy" @sort="sortBy">{{ t('translations.translation') }}</Th>
                <Th sortKey="createdAt" :orderBy="orderBy" @sort="sortBy">{{ t('translations.created_at') }}</Th>
                <Th sortKey="createdBy" :orderBy="orderBy" @sort="sortBy">{{ t('translations.created_by') }}</Th>
                <Th sortKey="updatedAt" :orderBy="orderBy" @sort="sortBy">{{ t('translations.updated_at') }}</Th>
                <Th sortKey="updatedBy" :orderBy="orderBy" @sort="sortBy">{{ t('translations.updated_by') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="translation in paginatedData" :key="translation.id">
                <Td>{{ translation.id }}</Td>
                <Td>{{ translation.locales?.[language] }}</Td>
                <Td>{{ formatDateTime(translation.createdAt) }}</Td>
                <Td>{{ translation.createdBy }}</Td>
                <Td>{{ formatDateTime(translation.updatedAt) }}</Td>
                <Td>{{ translation.updatedBy }}</Td>
                <Td>
                    <Button v-can="'translations.update'" @click="onUpdate(translation.id)">{{ t('button.edit') }}</Button>
                    <Button v-can="'translations.delete'" @click="onDelete(translation.id)">{{ t('button.delete') }}</Button>
                    <Button v-can="'translations.create'" @click="onCopy(translation.id)">{{ t('button.copy') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { translationService } from '@/services/translationService';
import { formatDateTime } from '@/utils/formatDateTime';
import { useLoading } from '@/composables/useLoading';
import { useDataTable } from '@/composables/useDataTableSync';

const route = useRoute();
const router = useRouter();
const { t, locale: language } = useI18n();
const { isLoading, execute } = useLoading();

const translations = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(translations);

onMounted(async () => {
    await execute(async () => {
        translations.value = await translationService.fetch();
    });
});

const onCreate = () => {
    router.push({
        name: 'Translations[new]',
        query: { from: route.fullPath },
    });
};

const onUpdate = (id) => {
    router.push({
        name: 'Translations[id]',
        params: { id },
        query: { from: route.fullPath },
    });
};

const onCopy = async (id) => {
    router.push({
        name: 'Translations[new]',
        query: { id, from: route.fullPath },
    });
};

const onDelete = async (id) => {
    if (!await confirm(t('confirm.delete'))) return;

    await execute(async () => {
        await translationService.delete(id);
        translations.value = await translationService.fetch();
        addToast(t('message.delete'));
    });
};
</script>
