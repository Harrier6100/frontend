<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">x</Button>
            <Form @submit.prevent="onLogin">
                <div>
                    <Input v-model="form.id" />
                    <Message :error="errors.id" />
                </div>
                <div>
                    <Input type="password" v-model="form.password" />
                    <Message :error="errors.password" />
                </div>
                <Button type="submit" :disabled="isLoading">
                    <span v-if="isSpinning">...</span>
                    {{ t('BUTTON.LOGIN') }}
                </Button>
                <Message :error="errors.err" />
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import * as yup from 'yup';
import { useSession } from '@/composables/useSession';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';
import { errorHandler } from '@/helpers/errorHandler';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { startSession } = useSession();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();
const { errors, check } = useYup();

const form = reactive({
    id: '',
    password: '',
});

const schema = yup.object({
    id: yup.string().required().label('LABEL.LOGIN.ID'),
    password: yup.string().required().label('LABEL.LOGIN.PASSWORD'),
});

const onLogin = async () => {
    if (!(await check(schema, form))) return;

    try {
        await runAsync(async () => {
            await execute(async () => {
                await startSession(form);
                emit('close');
            });
        });
    } catch (err) {
        errors.value.err = errorHandler(err).message;
    }
};
</script>
