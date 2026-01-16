<template>
    <h3>{{ id ? t('MENU.PROPERTY_SPECS_ID') : t('MENU.PROPERTY_SPECS_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.PROPERTY_SPECS.MATERIAL_ID') }}</Label>
            <MaterialIdInput
                v-model="form.materialId"
                @change="(material) => form.materialName = material?.name ?? ''"
                @error="({ message }) => errors.materialId = message"
            />
            <Message :error="errors.materialId" />
        </div>
        <div>
            <Label>{{ t('LABEL.PROPERTY_SPECS.MATERIAL_NAME') }}</Label>
            <Input v-model="form.materialName" />
        </div>
        <div>
            <Label>{{ t('LABEL.PROPERTY_SPECS.SUPPLIER_ID') }}</Label>
            <SupplierIdInput
                v-model="form.supplierId"
                @change="(supplier) => form.supplierName = supplier?.name ?? ''"
                @error="({ message }) => errors.supplierId = message"
            />
            <Message :error="errors.supplierId" />
        </div>
        <div>
            <Label>{{ t('LABEL.PROPERTY_SPECS.SUPPLIER_NAME') }}</Label>
            <Input v-model="form.supplierName" />
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.PROPERTY_ID') }}</Th>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.PROPERTY_NAME') }}</Th>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE') }}</Th>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.UOM') }}</Th>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.IS_SPC') }}</Th>
                        <Th>{{ t('LABEL.PROPERTY_SPECS.IS_ACTIVE') }}</Th>
                        <Th>
                            <Button @click="specs.add(spec)">{{ t('BUTTON.ADD') }}</Button>
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in specs.items.value" :key="index">
                        <td>{{ item.propertyId }}</td>
                        <td>{{ item.propertyName }}</td>
                        <td>{{ item.spec }}</td>
                        <td>{{ item.uom }}</td>
                        <td>{{ item.isSpc ? t('LABEL.PROPERTY_SPECS.IS_SPC_TRUE') : t('LABEL.PROPERTY_SPECS.IS_SPC_FALSE')}}</td>
                        <td>{{ item.isActive ? t('LABEL.PROPERTY_SPECS.IS_ACTIVE_TRUE') : t('LABEL.PROPERTY_SPECS.IS_ACTIVE_FALSE')}}</td>
                        <td>
                            <Button @click="modals.propertySpec.open({ index })">{{ t('BUTTON.EDIT') }}</Button>
                            <Button @click="specs.push(index, spec)">{{ t('BUTTON.PUSH') }}</Button>
                            <Button @click="specs.up(index)">{{ t('BUTTON.UP') }}</Button>
                            <Button @click="specs.down(index)">{{ t('BUTTON.DOWN') }}</Button>
                            <Button @click="specs.remove(index)">{{ t('BUTTON.REMOVE') }}</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Label>
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>
    <PropertySpec
        v-if="modals.propertySpec.state.isOpen"
        :isOpen="modals.propertySpec.state.isOpen"
        :modelValue="form.specs[modals.propertySpec.state.payload.index]"
        @save="(spec) => form.specs[modals.propertySpec.state.payload.index] = spec"
        @close="modals.propertySpec.close"
    />
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useQuery, useArray } from '@/composables/data';
import { useLoading, useSpinning, useToast, useModal } from '@/composables/ui'
import { useYup } from '@/composables/yup';
import { errorHandler } from '@/utils/errorHandler';
import { propertySpecService } from '@/services/propertySpecService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const modals = reactive({
    propertySpec: useModal(),
});
const { errors, check } = useYup();

const schema = yup.object({
    materialId: yup.string().required().label('LABEL.PROPERTY_SPECS.MATERIAL_ID'),
    supplierId: yup.string().required().label('LABEL.PROPERTY_SPECS.SUPPLIER_ID'),
});

const { id } = route.params;
const specs = useArray();
const spec = {
    propertyId: '',
    propertyName: '',
    spec: '',
    uom: '',
    specType: '',
    specValues: new Array(5).fill(null),
    isSpc: false,
    isActive: true,
};
const formRestore = () => ({
    id: '',
    materialId: '',
    materialName: '',
    supplierId: '',
    supplierName: '',
    specs: specs.items,
    remarks: '',
    isActive: true,
});
const form = ref(formRestore());

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const responseData = await propertySpecService.get(id);
            form.value = Object.assign(form.value, responseData);
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSave = async () => {
    const ok = await check(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            if (id) await propertySpecService.update(id, form.value);
            else await propertySpecService.create(form.value);
            addToast(t('MESSAGE.SAVE'), 'success');
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
};

const onBack = () => {
    router.push({
        name: 'PropertySpecs',
        query: getQuery() ?? {},
    });
};
</script>
