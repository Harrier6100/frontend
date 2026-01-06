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
        <Button type="submit">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useLoading, useQuery, useToast } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { useYup } from '@/composables/useYup';
import { errorHandler } from '@/utils';
import { propertyService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { getQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();
const { errors, setLabel, run } = useYup();

const schema = yup.object({
    id: setLabel('LABEL.PROPERTIES.ID', yup.string().required()),
    name: setLabel('LABEL.PROPERTIES.NAME', yup.string().required()),
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
            const data = await propertyService.get(id);
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
