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
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useQuery } from '@/composables/useQuery';
import { useYup } from '@/composables/useYup';
import { localeService } from '@/services';
import { errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();
const { getQuery } = useQuery();
const { errors, check } = useYup();

const { id } = route.params;
const form = reactive({
    id: '',
    locales: {
        ja: '',
        en: '',
    },
});

const schema = yup.object({
    id: yup.string().required().label(t('LABEL.LOCALES.ID')),
});

onMounted(async () => {
    if (!id) return;

    await runAsync(async () => {
        const data = await localeService.get(id);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    if (!(await check(schema, form))) return;

    try {
        await runAsync(async () => {
            await execute(async () => {
                if (id) await localeService.update(id, form);
                if (!id) await localeService.create(form);
            });
        });
        addToast(t('MESSAGE.SAVE'));
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};

const onBack = () => {
    router.push({
        name: 'Locales',
        query: getQuery(),
    });
};
</script>
