<template>
    <h3>{{ id ? t('MENU.CUSTOMERS_ID') : t('MENU.CUSTOMERS_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.CUSTOMERS.ID') }}</Label>
            <Input v-model="form.id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.CUSTOMERS.NAME') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('LABEL.CUSTOMERS.DUNS') }}</Label>
            <Input v-model="form.duns" />
        </div>
        <div>
            <Label>{{ t('LABEL.CUSTOMERS.REMARKS') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
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
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useQuery } from '@/composables/data';
import { useLoading, useSpinning, useToast } from '@/composables/ui'
import { useYup } from '@/composables/yup';
import { errorHandler } from '@/utils/errorHandler';
import { customerService } from '@/services/customerService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const { errors, check } = useYup();

const schema = yup.object({
    id: yup.string().required().label('LABEL.CUSTOMERS.ID'),
    name: yup.string().required().label('LABEL.CUSTOMERS.NAME'),
});

const { id } = route.params;
const formRestore = () => ({
    id: '',
    name: '',
    duns: '',
    remarks: '',
    isActive: true,
});
const form = ref(formRestore());

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const responseData = await customerService.get(id);
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
            if (id) await customerService.update(id, form.value);
            else await customerService.create(form.value);
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
        name: 'Customers',
        query: getQuery() ?? {},
    });
};
</script>
