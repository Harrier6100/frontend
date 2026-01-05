<template>
    <h3>
        <span v-if="id">{{ t('MENU.SPECS_ID') }}</span>
        <span v-if="!id">{{ t('MENU.SPECS_NEW') }}</span>
    </h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.SPECS.MATERIAL_ID') }}</Label>
            <Input v-model="form.materialId" />
            <Message :error="errors.materialId" />
        </div>
        <div>
            <Label>{{ t('LABEL.SPECS.MATERIAL_NAME') }}</Label>
            <Input v-model="form.materialName" />
        </div>
        <div>
            <Label>{{ t('LABEL.SPECS.SUPPLIER_ID') }}</Label>
            <Input v-model="form.supplierId" />
            <Message :error="errors.supplierId" />
        </div>
        <div>
            <Label>{{ t('LABEL.SPECS.SUPPLIER_NAME') }}</Label>
            <Input v-model="form.supplierName" />
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <Th>{{ t('LABEL.SPECS.PROPERTY_ID') }}</Th>
                        <Th>{{ t('LABEL.SPECS.PROPERTY_NAME') }}</Th>
                        <Th>{{ t('LABEL.SPECS.SPEC_VALUE') }}</Th>
                        <Th>{{ t('LABEL.SPECS.UOM') }}</Th>
                        <Th>{{ t('LABEL.SPECS.IS_SPC') }}</Th>
                        <Th>{{ t('LABEL.IS_ACTIVE') }}</Th>
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
                        <td>{{ item.isSpc ? t('LABEL.SPECS.IS_SPC_TRUE') : t('LABEL.SPECS.IS_SPC_FALSE') }}</td>
                        <td>{{ item.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</td>
                        <td>
                            <Button @click="modals.spec.open({ index })">{{ t('BUTTON.EDIT') }}</Button>
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
        <div>
            <Textarea v-model="form.remarks" />
        </div>
        <Button type="submit">{{ t('BUTTON.SAVE') }}</Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>
    <Spec
        v-if="modals.spec.state.isOpen"
        :isOpen="modals.spec.state.isOpen"
        :modelValue="form.specs[modals.spec.state.payload.index]"
        @save="(spec) => form.specs[modals.spec.state.payload.index] = spec"
        @close="modals.spec.close"
    />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useArray } from '@/composables/core';
import { useQuery, useLoading, useToast } from '@/composables/state';
import { useSpinning, useModal } from '@/composables/ui';
import { useYup } from '@/composables/validation';
import { errorHandler } from '@/utils';
import { specService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, stopLoading, startLoading } = useLoading();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();
const modals = reactive({
    spec: useModal(),
});
const { errors, setLabel, run } = useYup();

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
    materialId: '',
    materialName: '',
    supplierId: '',
    supplierName: '',
    specs: specs.items,
    isActive: true,
    remarks: '',
});
const form = ref(formRestore());
const schema = yup.object({
    materialId: setLabel('LABEL.SPECS.MATERIAL_ID', yup.string().required()),
    supplierId: setLabel('LABEL.SPECS.SUPPLIER_ID', yup.string().required()),
});

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const data = await specService.get(id);
            form.value = Object.assign(form.value, data);
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSave = async () => {
    const ok = await run(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            if (id) await specService.update(id, form.value);
            else await specService.create(form.value);
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
        name: 'Specs',
        query: getQuery() ?? {},
    });
};
</script>
