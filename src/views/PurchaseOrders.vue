<template>
    <h3>{{ t('MENU.PURCHASE_ORDERS') }}</h3>
    <Form @submit.prevent="onSearch">
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.PURCHASE_ID') }}</Label>
            <Input v-model="form.purchaseId" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.PURCHASE_NUMBER') }}</Label>
            <Input v-model="form.purchaseNumber" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_CODE') }}</Label>
            <Input v-model="form.materialCode" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_NAME') }}</Label>
            <Input v-model="form.materialName" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.ORDER_DATE') }}</Label>
            <Calendar v-model="form.orderDateFrom" format="YYYYMMDD" :placeholder="t('LABEL.FROM')" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.ORDER_DATE') }}</Label>
            <Calendar v-model="form.orderDateTo" format="YYYYMMDD" :placeholder="t('LABEL.TO')" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.DUE_DATE') }}</Label>
            <Calendar v-model="form.dueDateFrom" format="YYYYMMDD" :placeholder="t('LABEL.FROM')" />
        </div>
        <div>
            <Label>{{ t('LABEL.PURCHASE_ORDERS.DUE_DATE') }}</Label>
            <Calendar v-model="form.dueDateTo" format="YYYYMMDD" :placeholder="t('LABEL.TO')" />
        </div>
        <div>
            <Label for="isInactiveDataIncluded">{{ t('LABEL.PURCHASE_ORDERS.IS_INACTIVE_DATA_INCLUDED') }}</Label>
            <Checkbox id="isInactiveDataIncluded" v-model="form.isInactiveDataIncluded" />
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SEARCH') }}
        </Button>
        <Button @click="onClear">
            {{ t('BUTTON.CLEAR') }}
        </Button>
    </Form>
    <table>
        <thead>
            <tr>
                <Th sortKey="purchaseId" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.PURCHASE_ID') }}</Th>
                <Th sortKey="purchaseNumber" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.PURCHASE_NUMBER') }}</Th>
                <Th sortKey="orderDate" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.ORDER_DATE') }}</Th>
                <Th sortKey="dueDate" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.DUE_DATE') }}</Th>
                <Th sortKey="materialCode" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_CODE') }}</Th>
                <Th sortKey="materialName" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_NAME') }}</Th>
                <Th sortKey="materialWidth" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_WIDTH') }}</Th>
                <Th sortKey="materialLength" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_LENGTH') }}</Th>
                <Th sortKey="materialVolume" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.MATERIAL_VOLUME') }}</Th>
                <Th sortKey="orderQty" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.ORDER_QTY') }}</Th>
                <Th sortKey="orderQtyUom" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.ORDER_QTY_UOM') }}</Th>
                <Th sortKey="openQty" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.OPEN_QTY') }}</Th>
                <Th sortKey="supplierCode" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.SUPPLIER_CODE') }}</Th>
                <Th sortKey="supplierName" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.PURCHASE_ORDERS.SUPPLIER_NAME') }}</Th>
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
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useDataTable } from '@/composables/useDataTable';
import { purchaseOrderService } from '@/services';
import { errorHandler } from '@/helpers/errorHandler';

const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();

const purchaseOrders = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(purchaseOrders);

const formRestore = () => ({
    purchaseId: '',
    purchaseNumber: '',
    materialCode: '',
    materialName: '',
    orderDateFrom: '',
    orderDateTo: '',
    dueDateFrom: '',
    dueDateTo: '',
    isInactiveDataIncluded: false,
});
const form = reactive(formRestore());

const onSearch = async () => {
    try {
        await runAsync(async () => {
            await execute(async () => {
                purchaseOrders.value = await purchaseOrderService.fetch(form);
            });
        });
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};

const onClear = () => {
    Object.assign(form, formRestore());
};
</script>
