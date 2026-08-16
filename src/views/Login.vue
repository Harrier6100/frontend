<template>
    <Form @submit.prevent="onLogin">
        <div>
            <Label for="id">{{ t('label.id') }}</Label>
            <Input v-model="form.id" id="id" />
            <Alert :error="errors.id" />
        </div>
        <div>
            <Label for="password">{{ t('label.password') }}</Label>
            <Input v-model="form.password" type="password" id="password" />
            <Alert :error="errors.password" />
        </div>
        <Button submit :spinning="isLoading">{{ t('button.login') }}</Button>
        <Alert :error="errors.form" />
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { errorHandler } from '@/helpers/errorHandler';

const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useAsync();
const { startSession } = useSession();
const { errors, validate } = useValidation();

const form = reactive({
    id: '',
    password: '',
});

const schema = yup.object({
    id: yup.string()
        .required(() => t('validation.required', { field: t('label.id') })),
    password: yup.string()
        .required(() => t('validation.required', { field: t('label.password') })),
});

const redirect = () => {
    const redirectPath = sessionStorage.getItem('redirect');
    sessionStorage.removeItem('redirect');
    router.replace(redirectPath || '/');
};

const onLogin = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            await startSession(form);
            redirect();
        });
    } catch (err) {
        const error = errorHandler(err);
        errors.value.form = t(error.code);
    }
};
</script>
