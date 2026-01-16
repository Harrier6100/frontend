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
                    <span v-if="isSpinning">...</span>{{ t('BUTTON.LOGIN') }}
                </Button>
                <Message :error="errors.error" />
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import { useSession } from '@/composables/auth';
import { useLoading, useSpinning } from '@/composables/ui';
import { useYup } from '@/composables/yup';
import { errorHandler } from '@/utils/errorHandler';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { startSession } = useSession();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { errors, check } = useYup();

const schema = yup.object({
    id: yup.string().required().label(t('LABEL.LOGIN.ID')),
    password: yup.string().required().label(t('LABEL.LOGIN.PASSWORD')),
});

const formRestore = () => ({
    id: '',
    password: '',
});
const form = ref(formRestore());

const onLogin = async () => {
    const ok = await check(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            await startSession(form.value);
            emit('close');
        });
    } catch (error) {
        const { message } = errorHandler(error);
        errors.value.error = message;
    } finally {
        stopLoading();
    }
};
</script>
