<template>
    <h3>{{ t('MENU.MATERIAL_STOCKS') }}</h3>
    <Form @submit.prevent="onSearch">
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_CODE') }}</Label>
            <Input v-model="form.materialCode" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_NAME') }}</Label>
            <Input v-model="form.materialName" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.STOCK_LOT') }}</Label>
            <Input v-model="form.stockLot" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.STOCK_WIDTH') }}</Label>
            <Input v-model="form.stockWidth" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.STOCK_LENGTH') }}</Label>
            <Input v-model="form.stockLength" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.WAREHOUSE_CODE') }}</Label>
            <Input v-model="form.warehouseCode" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.STOCK_STATUS_CLASS') }}</Label>
            <Input v-model="form.stockStatusClass" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.PURCHASE_NUMBER') }}</Label>
            <Input v-model="form.purchaseNumber" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.RECEIVED_DATE') }}</Label>
            <Calendar v-model="form.receivedDateFrom" format="YYYYMMDD" :placeholder="t('LABEL.FROM')" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.RECEIVED_DATE') }}</Label>
            <Calendar v-model="form.receivedDateTo" format="YYYYMMDD"  :placeholder="t('LABEL.TO')" />
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SEARCH') }}
        </Button>
    </Form>
    <table>
        <thead>
            <tr>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_CODE') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_NAME') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.STOCK_LOT') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.BARCODE_LOT') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.STOCK_WIDTH') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.STOCK_LENGTH') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.WAREHOUSE_CODE') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.STOCK_STATUS_CLASS') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.STOCK_QTY') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.PURCHASE_NUMBER') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.RECEIVED_DATE') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.CLAIM_NUMBER') }}</Th>
                <Th>{{ t('LABEL.MATERIAL_STOCKS.REMARKS') }}</Th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of sortedData" :key="index">
                <Td>{{ row.materialCode }}</Td>
                <Td>{{ row.materialName }}</Td>
                <Td>{{ row.stockLot }}</Td>
                <Td>{{ row.barcodeLot }}</Td>
                <Td>{{ row.stockWidth }}</Td>
                <Td>{{ row.stockLength }}</Td>
                <Td>{{ row.warehouseCode }}</Td>
                <Td>{{ row.stockStatusClass }}</Td>
                <Td>{{ row.stockQty }}</Td>
                <Td>{{ row.purchaseNumber }}</Td>
                <Td>{{ row.receivedDate }}</Td>
                <Td>{{ row.claimNumber }}</Td>
                <Td>{{ row.remarks }}</Td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useDataTable } from '@/composables/useDataTable';
import { materialStockService } from '@/services';
import { errorHandler } from '@/helpers';

const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();

const materialStocks = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(materialStocks);

const form = reactive({
    materialCode: '',
    materialName: '',
    stockLot: '',
    stockWidth: '',
    stockLength: '',
    warehouseCode: '',
    stockStatusClass: '',
    purchaseNumber: '',
    receivedDateFrom: '',
    receivedDateTo: '',
});

const onSearch = async () => {
    try {
        await runAsync(async () => {
            await execute(async () => {
                materialStocks.value = await materialStockService.fetch(form);
            });
        });
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};
</script>
