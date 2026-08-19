<template>
    <Form @submit.prevent="onSave">
        <div>
            <Label for="id">{{ t('label.locales.id') }}</Label>
            <Input v-model="form.id" id="id" />
            <Alert :error="errors.id" />
        </div>
        <div>
            <Label for="ja">{{ t('label.locales.translations') }}</Label>
            <div>
                <span><i class="fi fi-jp"></i></span>
                <Input v-model="form.translations.ja" id="ja" />
            </div>
        </div>
        <Button v-can="'locales.delete'" v-if="id" @click="onDelete">{{ t('button.delete') }}</Button>
        <Button submit :spinning="isLoading">{{ t('button.save') }}</Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { localeService } from '@/services/localeService';
import { errorHandler } from '@/helpers/errorHandler';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useAsync();
const { confirm } = useConfirm();
const { addToast } = useToast();
const { errors, validate } = useValidation();

const id = computed(() => route.params.id);
const form = reactive({
    id: '',
    translations: {
        ja: '',
    },
});

const schema = yup.object({
    id: yup.string()
        .required(() => t('validation.required', { field: t('label.locales.id') })),
});

const fetchLocale = async () => {
    try {
        const locale = await localeService.getById(id.value || route.query.id);
        Object.assign(form, locale);
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onSave = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            if (id.value) {
                await localeService.update(id.value, form);
                addToast(t('toast.updated', { resource: t('') }));
            } else {
                await localeService.create(form);
                addToast(t('toast.created', { resource: t('') }));
            }
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onDelete = async () => {
    const ok = await confirm(t('confirm.delete'));
    if (!ok) return;

    try {
        await execute(async () => {
            await localeService.delete(id.value);
            addToast(t('toast.deleted', { resource: t('') }));
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onBack = () => {
    router.push(route.query.from ?? {
        name: 'Locales',
    });
};

onMounted(() => {
    if (id.value || route.query.id) {
        fetchLocale();
    }
});
</script>
