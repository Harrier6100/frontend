<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('button.close_x') }}</Button>
            <Form @submit.prevent="onLogin">
                <div>
                    <Input v-model="form.id" :placeholder="t('login.id')" />
                    <Message :error="errors.id" />
                </div>
                <div>
                    <Input v-model="form.password" type="password" :placeholder="t('login.password')" />
                    <Message :error="errors.password" />
                </div>
                <Button type="submit" :disabled="isLoading">
                    {{ t('button.login') }}<span v-if="isSpinning">...</span>
                </Button>
                <Message :error="errors.error" />
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import * as yup from 'yup';
import { errorHandler } from '@/helpers/errorHandler';
import { useSession } from '@/composables/useSession';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { startSession } = useSession();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, runYup } = useYup();

const form = reactive({
    id: '',
    password: '',
});

const schema = yup.object({
    id: yup.string().required().label('login.id'),
    password: yup.string().required().label('login.password'),
});

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
        form.id = '';
        form.password = '';
    }
});

const onLogin = async () => {
    if (!(await runYup(schema, form))) return;

    try {
        await execute(async () => {
            await spin(async () => {
                await startSession(form);
                emit('close');
            });
        });
    } catch (err) {
        const error = errorHandler(err);
        errors.value.error = error.message;
    }
};
</script>
