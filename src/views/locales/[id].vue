<template>
    <h3>
        <span v-if="id">{{ t('MENU.LOCALES_ID') }}</span>
        <span v-if="!id">{{ t('MENU.LOCALES_NEW') }}</span>
    </h3>
    <form @submit.prevent="onSubmit" autocomplete="off">
        <div>
            <Label>{{ t('LABEL.LOCALES.ID') }}</Label>
            <Input v-model="form.id" />
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
            <span v-if="isSpinning">...</span>{{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useToast } from '@/composables/useToast';
import { useQuery } from '@/composables/useQuery';
import { useYup } from '@/composables/useYup';
import { errorHandler } from '@/utils/errorHandler';
import { localeService } from '@/services/localeService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const { getQuery } = useQuery();
const { errors, setLabel, run } = useYup();

const id = ref(route.params.id);
const formRestore = () => ({
    id: '',
    locales: {
        ja: '',
        en: '',
        ko: '',
    },
});
const form = ref(formRestore());
const schema = yup.object({
    id: setLabel('LABEL.LOCALES.ID', yup.string().required()),
});

onMounted(async () => {
    if (!id.value) return;

    try {
        startLoading();
        await execute(async () => {
            const data = await localeService.get(id.value);
            form.value = data;
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSubmit = async () => {
    const ok = await run(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            if (id.value) await localeService.update(id.value, form.value);
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
