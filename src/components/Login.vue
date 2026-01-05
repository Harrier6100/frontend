<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('BUTTON.CLOSE') }}</Button>
            <form @submit.prevent="onLogin" autocomplete="off">
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
            </form>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import { useAuth } from '@/composables/auth';
import { useLoading } from '@/composables/state';
import { useSpinning } from '@/composables/ui';
import { useYup } from '@/composables/validation';
import { errorHandler } from '@/utils';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { login } = useAuth();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { errors, setLabel, run } = useYup();

const formRestore = () => ({
    id: '',
    password: '',
});
const form = ref(formRestore());
const schema = yup.object({
    id: setLabel('LABEL.LOGIN.ID', yup.string().required()),
    password: setLabel('LABEL.LOGIN.PASSWORD', yup.string().required()),
});

const onLogin = async () => {
    const ok = await run(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            await login(form.value);
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
