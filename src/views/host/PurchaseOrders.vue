<template>
    <h4>{{ t('menu.purchase_orders') }}</h4>
    <Form @submit.prevent="onSearch">
        <div>
            <Label>{{ t('purchase_orders.purchase_id') }}</Label>
            <Input v-model="form.purchaseId" />
        </div>
        <div>
            <Label>{{ t('purchase_orders.due_date') }}</Label>
            <DatePicker v-model="form.dueDateFrom" format="YYYYMMDD" :placeholder="t('common.from')" />
            <DatePicker v-model="form.dueDateTo" format="YYYYMMDD" :placeholder="t('common.to')" />
        </div>
        <Button type="submit" :disabled="isLoading">
            {{ t('button.search') }}<span v-if="isSpinning">...</span>
        </Button>
        <Button @click="onClear">{{ t('button.clear') }}</Button>
    </Form>
    <table>
        <thead>
            <tr>
                <Th sortKey="purchaseId" :orderBy="orderBy" @sort="sortBy">{{ t('purchase_orders.purchase_id') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of sortedData" :key="index">
                <Td>{{ row.purchaseId }}</Td>
                <Td>{{ row.purchaseNumber }}</Td>
                <Td>{{ row.orderDate }}</Td>
                <Td>{{ row.dueDate }}</Td>
                <Td>{{ row.materialCode }}</Td>
                <Td>{{ row.materialName }}</Td>
                <Td>{{ row.materialWidth }}</Td>
                <Td>{{ row.materialLength }}</Td>
                <Td>{{ row.materialVolume }}</Td>
                <Td>{{ row.orderQty }}</Td>
                <Td>{{ row.orderQtyUom }}</Td>
                <Td>{{ row.openQtyUom }}</Td>
                <Td>{{ row.supplierCode }}</Td>
                <Td>{{ row.supplierName }}</Td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { purchaseOrderService } from '@/services/purchaseOrderService';
import { errorHandler } from '@/helpers/errorHandler';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useDataTable } from '@/composables/useDataTable';

const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();

const purchaseOrders = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(purchaseOrders);

const formRestore = () => ({
    purchaseId: '',
    dueDateFrom: '',
    dueDateTo: '',
});
const form = reactive(formRestore());

const onSearch = async () => {
    await execute(async () => {
        await spin(async () => {
            purchaseOrders.value = await purchaseOrderService.search(form);
        });
    });
};

const onClear = () => {
    Object.assign(form, formRestore());
};
</script>
