<template>
    <h4>{{ id ? t('menu.ecoas_id') : t('menu.ecoas_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('ecoas.id') }}</Label>
            <Input v-model="form.id" readonly />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('ecoas.product_id') }}</Label>
            <Input v-model="form.productId" />
            <Message :error="errors.productId" />
        </div>
        <div>
            <Label>{{ t('ecoas.parts_number') }}</Label>
            <Input v-model="form.partsNumber" />
            <Message :error="errors.partsNumber" />
        </div>
        <div>
            <Label>{{ t('ecoas.customer_id') }}</Label>
            <Input v-model="form.customerId" />
            <Message :error="errors.customerId" />
        </div>
        <div>
            <Input v-model="form.template" type="file" accept=".xml" @change="onFileChange" />
        </div>
        <div v-for="key in Object.keys(form.properties)" :key="key">
            <Label>{{ key }}</Label>
            <Input v-model="form.properties[key]" />
        </div>
        <Button type="submit" :disabled="isLoading">
            {{ t('button.save') }}<span v-if="isSpinning">...</span>
        </Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { XMLParser } from 'fast-xml-parser';
import { errorHandler } from '@/helpers/errorHandler';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, runYup } = useYup();

const { id: routeId } = route.params;
const form = reactive({
    id: '',
    productId: '',
    partsNumber: '',
    customerId: '',
    template: null,
    properties: [],
});

const schema = yup.object({
    id: yup.string().required().label(t('ecoas.id')),
    productId: yup.string().required().label(t('ecoas.product_id')),
    partsNumber: yup.string().required().label(t('ecoas.parts_number')),
    customerId: yup.string().required().label(t('ecoas.customer_id')),
});

const id = computed(() => {
    return `${form.productId}_${form.partsNumber}_${form.customerId}`;
});

watch(id, (newId) => {
    form.id = newId;
}, { immediate: true });

const onFileChange = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const text = await file.text();

    const parser = new XMLParser();
    const parserAttr = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(text);
    const jsonAttr = parserAttr.parse(text);

    const partsNumber = Object.values(jsonAttr)[1]['@_MaterialCode'];
    const properties = Object.values(json)[1].Lot;

    form.partsNumber = partsNumber;
    form.properties = { ...properties };
};

const onSave = async () => {
    if (!await runYup(schema, form)) return;

    try {
    } catch (err) {
        const error = errorHandler(err);
        addToast(error.message, 'error');
    }
};

const onBack = () => {
    router.push(
        route.query.from ??
        { name: 'eCOAs' }
    );
};
</script>
