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
            <Label>{{ t('LABEL.MATERIAL_STOCKS.STOCK_STATUS') }}</Label>
            <Input v-model="form.stockStatus" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.PURCHASE_ID') }}</Label>
            <Input v-model="form.purchaseId" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL_STOCKS.RECEIVE_DATE') }}</Label>
            <Calendar v-model="form.receiveDateFrom" format="YYYYMMDD" :placeholder="t('LABEL.FROM')" />
            <Calendar v-model="form.receiveDateTo" format="YYYYMMDD" :placeholder="t('LABEL.TO')" />
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
                <Th sortKey="materialCode" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_CODE') }}</Th>
                <Th sortKey="materialName" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.MATERIAL_NAME') }}</Th>
                <Th sortKey="stockLot" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.STOCK_LOT') }}</Th>
                <Th sortKey="barcodeLot" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.BARCODE_LOT') }}</Th>
                <Th sortKey="stockWidth" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.STOCK_WIDTH') }}</Th>
                <Th sortKey="stockLength" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.STOCK_LENGTH') }}</Th>
                <Th sortKey="warehouseCode" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.WAREHOUSE_CODE') }}</Th>
                <Th sortKey="stockStatus" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.STOCK_STATUS') }}</Th>
                <Th sortKey="stockQty" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.STOCK_QTY') }}</Th>
                <Th sortKey="purchaseId" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.PURCHASE_ID') }}</Th>
                <Th sortKey="receiveDate" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.RECEIVE_DATE') }}</Th>
                <Th sortKey="claimNumber" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.CLAIM_NUMBER') }}</Th>
                <Th sortKey="remarks" :orderBy="orderBy" @sort="sortBy">{{ t('LABEL.MATERIAL_STOCKS.REMARKS') }}</Th>
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
                <Td>{{ row.stockStatus }}</Td>
                <Td>{{ row.stockQty }}</Td>
                <Td>{{ row.purchaseId }}</Td>
                <Td>{{ row.receiveDate }}</Td>
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
import { errorHandler } from '@/helpers/errorHandler';

const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();

const materialStocks = ref([]);
const { sortedData, sortBy, orderBy } = useDataTable(materialStocks);

const formRestore = () => ({
    materialCode: '',
    materialName: '',
    stockLot: '',
    stockWidth: '',
    stockLength: '',
    warehouseCode: '',
    stockStatus: '',
    purchaseId: '',
    receiveDateFrom: '',
    receiveDateTo: '',
});
const form = reactive(formRestore());

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

const onClear = () => {
    Object.assign(form, formRestore());
};
</script>
