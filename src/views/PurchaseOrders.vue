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
            <tr v-for="(data, index) of sortedData" :key="index">
                <Td>{{ data.purchaseId }}</Td>
                <Td>{{ data.purchaseNumber }}</Td>
                <Td>{{ data.orderDate }}</Td>
                <Td>{{ data.dueDate }}</Td>
                <Td>{{ data.materialCode }}</Td>
                <Td>{{ data.materialName }}</Td>
                <Td>{{ data.materialWidth }}</Td>
                <Td>{{ data.materialLength }}</Td>
                <Td>{{ data.materialVolume }}</Td>
                <Td>{{ data.orderQty }}</Td>
                <Td>{{ data.orderQtyUom }}</Td>
                <Td>{{ data.openQtyUom }}</Td>
                <Td>{{ data.supplierCode }}</Td>
                <Td>{{ data.supplierName }}</Td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { purchaseOrderService } from '@/services/purchaseOrderService';
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
