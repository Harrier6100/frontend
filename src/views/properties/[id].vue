<template>
    <h3>{{ id ? t('MENU.PROPERTIES_ID') : t('MENU.PROPERTIES_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.PROPERTIES.ID') }}</Label>
            <Input v-model="form.id" @input="form.id = form.id.toUpperCase()" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.PROPERTIES.NAME') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('LABEL.PROPERTIES.UOM') }}</Label>
            <Input v-model="form.uom" />
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
import { propertyService } from '@/services/propertyService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const { errors, check } = useYup();

const schema = yup.object({
    id: yup.string().required().label('LABEL.PROPERTIES.ID'),
    name: yup.string().required().label('LABEL.PROPERTIES.NAME'),
});

const { id } = route.params;
const formRestore = () => ({
    id: '',
    name: '',
    uom: '',
});
const form = ref(formRestore());

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const responseData = await propertyService.get(id);
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
            if (id) await propertyService.update(id, form.value);
            else await propertyService.create(form.value);
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
        name: 'Properties',
        query: getQuery() ?? {},
    });
};
</script>
