<template>
    <h3>{{ t('MENU.MATERIALS') }}</h3>
    <Input v-model="keyword" :placeholder="t('PLACEHOLDER.SEARCH')" />
    <Button v-can="'materials.create'" @click="onCreate">{{ t('BUTTON.CREATE_NEW') }}</Button>
    <table>
        <thead>
            <tr>
                <Th sortKey="id" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIALS.ID') }}</Th>
                <Th sortKey="name" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIALS.NAME') }}</Th>
                <Th sortKey="createdAt" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.CREATED_AT') }}</Th>
                <Th sortKey="createdBy" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.CREATED_BY') }}</Th>
                <Th sortKey="updatedAt" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.UPDATED_AT') }}</Th>
                <Th sortKey="updatedBy" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.UPDATED_BY') }}</Th>
                <Th></Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="material in paginatedData" :key="material.id">
                <Td>{{ material.id }}</Td>
                <Td>{{ material.name }}</Td>
                <Td>{{ getDateTime(material.createdAt) }}</Td>
                <Td>{{ material.createdBy }}</Td>
                <Td>{{ getDateTime(material.updatedAt) }}</Td>
                <Td>{{ material.updatedBy }}</Td>
                <Td>
                    <Button v-can="'materials.update'" @click="onUpdate(material.id)">{{ t('BUTTON.EDIT') }}</Button>
                    <Button v-can="'materials.delete'" @click="onDelete(material.id)">{{ t('BUTTON.DELETE') }}</Button>
                </Td>
            </tr>
        </tbody>
    </table>
    <Pagination v-model:page="page" :pageCount="pageCount" />
</template>

<script setup>
import { useLoading } from '@/composables/useLoading';
import { useQuery } from '@/composables/useQuery';
import { useDataTable } from '@/composables/useDataTableQuerySync';
import { materialService } from '@/services';
import { errorHandler } from '@/helpers/errorHandler';
import { getDateTime } from '@/utils/dateTime';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { setQuery } = useQuery();

const materials = ref([]);
const { keyword, page, pageCount, paginatedData, sortBy, orderBy } = useDataTable(materials);

onMounted(async () => {
    await runAsync(async () => {
        materials.value = await materialService.fetch();
    });
});

const onCreate = () => {
    setQuery(route.query);
    router.push({ name: 'Materials[new]' });
};

const onUpdate = (id) => {
    setQuery(route.query);
    router.push({ name: 'Materials[id]', params: { id }});
};

const onDelete = async (id) => {
    if (!await confirm(t('CONFIRM.DELETE'))) return;

    await runAsync(async () => {
        await materialService.delete(id);
        materials.value = await materialService.fetch();
        addToast(t('MESSAGE.DELETE'));
    });
};
</script>
