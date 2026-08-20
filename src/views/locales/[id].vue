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
        <Button v-if="routeId" v-can="'locales.delete'" @click="onDelete">{{ t('button.delete') }}</Button>
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

const routeId = computed(() => route.params.id);
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

const onSave = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            if (routeId.value) {
                await localeService.update(routeId.value, form);
            } else {
                await localeService.create(form);
            }
            addToast(t(routeId.value ? 'toast.updated' : 'toast.created', { resource: t('') }));
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
            await localeService.delete(routeId.value);
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

onMounted(async () => {
    const id = routeId.value || route.query.id;
    if (id) {
        try {
            const locale = await localeService.getById(id);
            Object.assign(form, locale);
        } catch (err) {
            const error = errorHandler(err);
            addToast(t(error.code));
        }
    }
});
</script>
