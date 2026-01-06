<template>
    <h3>{{ id ? t('MENU.LOCALES_ID') : t('MENU.LOCALES_NEW')}}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.LOCALES.ID') }}</Label>
            <Input v-model="form.id" @input="form.id = form.id.toUpperCase()" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.LOCALES.LOCALES') }}</Label>
            <div>
                <div>
                    <Label><i class="fi fi-jp"></i></Label>
                    <Input v-model="form.locales.ja" />
                </div>
                <div>
                    <Label><i class="fi fi-us"></i></Label>
                    <Input v-model="form.locales.en" />
                </div>
                <div>
                    <Label><i class="fi fi-kr"></i></Label>
                    <Input v-model="form.locales.ko" />
                </div>
            </div>
        </div>
        <Button type="submit" :disabled="isLoading">
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
import { localeService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { getQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();
const { errors, setLabel, run } = useYup();

const schema = yup.object({
    id: setLabel('LABEL.LOCALES.ID', yup.string().required()),
});

const { id } = route.params;
const formRestore = () => ({
    id: '',
    locales: {
        ja: '',
        en: '',
        ko: '',
    },
});
const form = ref(formRestore());

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const data = await localeService.get(id);
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
            if (id) await localeService.update(id, form.value);
            else await localeService.create(form.value);
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
        name: 'Locales',
        query: getQuery() ?? {},
    });
};
</script>
