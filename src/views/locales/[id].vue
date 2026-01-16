<template>
    <h3>{{ id ? t('MENU.LOCALES_ID') : t('MENU.LOCALES_NEW') }}</h3>
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
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useQuery } from '@/composables/data';
import { useLoading, useSpinning, useToast } from '@/composables/ui'
import { useYup } from '@/composables/yup';
import { errorHandler } from '@/utils/errorHandler';
import { localeService } from '@/services/localeService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const { errors, check } = useYup();

const schema = yup.object({
    id: yup.string().required().label('LABEL.LOCALES.ID'),
});

const { id } = route.params;
const formRestore = () => ({
    id: '',
    locales: {
        ja: '',
        en: '',
        ko: '',
    },
    isActive: true,
});
const form = ref(formRestore());

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const responseData = await localeService.get(id);
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
