<template>
    <h4>{{ id ? t('menu.translations_id') : t('menu.translations_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('translations.id') }}</Label>
            <Input v-model="form.id" :readonly="!!id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('translations.translation') }}</Label>
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
            {{ t('button.save') }}<span v-if="isSpinning">...</span>
        </Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { translationService } from '@/services/translationService';
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

const { id } = route.params;
const form = reactive({
    id: '',
    locales: {
        ja: '',
        en: '',
    },
});

const schema = yup.object({
    id: yup.string().required().label(t('translations.id')),
});

onMounted(async () => {
    if (route.query.id) {
        const translation = await translationService.get(route.query.id);
        Object.assign(form, translation);
    }
    if (!id) return;

    await execute(async () => {
        const data = await translationService.get(id);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    if (!(await runYup(schema, form))) return;

    try {
        await execute(async () => {
            await spin(async () => {
                if (id) await translationService.update(id, form);
                if (!id) await translationService.create(form);
                addToast(t('message.save'));
            });
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(error.message, 'error');
    }
};

const onBack = () => {
    router.push(
        route.query.from ??
        { name: 'Translations' }
    );
};
</script>
