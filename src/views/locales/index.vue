<template>
    <Input v-model="keyword" />
    <Button v-can="'users.create'" @click="onCreate">{{ t('button.create_new') }}</Button>
    <Table>
        <Thead>
            <Tr>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="id">{{ t('label.locales.id') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" :sortKey="`translations.${currentLocale}`">{{ t('label.locales.translations') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdAt">{{ t('label.created_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="createdBy">{{ t('label.created_by') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedAt">{{ t('label.updated_at') }}</Th>
                <Th :orderBy="orderBy" @sort="sortBy" sortKey="updatedBy">{{ t('label.updated_by') }}</Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr v-for="locale in items" :key="locale.id">
                <Td>{{ locale.id }}</Td>
                <Td>{{ locale.translations?.[currentLocale] }}</Td>
                <Td>{{ formatDateTime(locale.createdAt) }}</Td>
                <Td>{{ locale.createdBy }}</Td>
                <Td>{{ formatDateTime(locale.updatedAt) }}</Td>
                <Td>{{ locale.updatedBy }}</Td>
                <Td>
                    <Button v-can="'locales.update'" @click="onEdit(locale.id)">{{ t('button.edit') }}</Button>
                    <Button v-can="'locales.create'" @click="onCopy(locale.id)">{{ t('button.copy') }}</Button>
                </Td>
            </Tr>
        </Tbody>
    </Table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { localeService } from '@/services/localeService';
import { errorHandler } from '@/helpers/errorHandler';
import { formatDateTime } from '@/helpers/formatDateTime';

const route = useRoute();
const router = useRouter();
const { t, locale: currentLocale } = useI18n();
const { execute } = useAsync();
const { addToast } = useToast();

const locales = ref([]);
const { keyword, page, pageCount, items, sortBy, orderBy } = useDataTable(locales);

const fetchLocales = async () => {
    try {
        await execute(async () => {
            locales.value = await localeService.getAll();
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onCreate = () => {
    router.push({
        name: 'Locales[new]',
        query: { from: route.fullPath },
    });
};

const onEdit = (id) => {
    router.push({
        name: 'Locales[id]',
        params: { id },
        query: { from: route.fullPath },
    });
};

const onCopy = (id) => {
    router.push({
        name: 'Locales[new]',
        query: { id, from: route.fullPath },
    });
};

onMounted(() => {
    fetchLocales();
});
</script>
