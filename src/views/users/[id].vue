<template>
    <h3>{{ id ? t('MENU.USERS_ID') : t('MENU.USERS_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.USERS.ID') }}</Label>
            <Input v-model="form.id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.USERS.NAME') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('LABEL.USERS.ROLE') }}</Label>
            <div v-for="role in roles" :key="role.value">
                <Radio v-model="form.role" :id="role.value" :value="role.value" />
                <Label :for="role.value">{{ role.label }}</Label>
            </div>
        </div>
        <div v-if="form.role === 'user'">
            <Button @click="modals.permission.open">{{ t('BUTTON.PERMISSION') }}</Button>
        </div>
        <div v-if="form.role === 'guest'">
            <Label>{{ t('LABEL.USERS.EXPIRY_DATE') }}</Label>
            <DatePicker v-model="form.expiryDate" placeholder="YYYY-MM-DD" />
        </div>
        <div>
            <Label>{{ t('LABEL.USERS.REMARKS') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>
    <Permission
        :isOpen="modals.permission.state.isOpen"
        :modelValue="form.permissions"
        @save="form.permissions = $event"
        @close="modals.permission.close"
    />
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useLoading, useQuery, useToast } from '@/composables/state';
import { useModal, useSpinning } from '@/composables/ui';
import { useYup } from '@/composables/useYup';
import { errorHandler } from '@/utils';
import { userService } from '@/services';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { getQuery } = useQuery();
const { addToast } = useToast();
const { isSpinning, execute } = useSpinning();
const { errors, setLabel, run } = useYup();

const modals = reactive({
    permission: useModal(),
});

const schema = yup.object({
    id: setLabel('LABEL.USERS.ID', yup.string().required()),
    name: setLabel('LABEL.USERS.NAME', yup.string().required()),
});

const roles = [
    { value: 'admin', label: t('LABEL.USERS.ROLE_ADMIN') },
    { value: 'user', label: t('LABEL.USERS.ROLE_USER') },
    { value: 'guest', label: t('LABEL.USERS.ROLE_GUEST') },
];

const { id } = route.params;
const formRestore = () => ({
    id: '',
    name: '',
    role: 'user',
    permissions: [],
    expiryDate: '',
    remarks: '',
    isActive: true,
});
const form = ref(formRestore());

watch(() => form.value.role, (value) => {
    if (value !== 'guest') {
        form.value.expiryDate = '';
    }
});

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const data = await userService.get(id);
            form.value = Object.assign(form.value, data);
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

const onSave = async () => {
    const ok = await run(schema, form.value);
    if (!ok) return;

    try {
        startLoading();
        await execute(async () => {
            if (id) await userService.update(id, form.value);
            else await userService.create(form.value);
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
        name: 'Users',
        query: getQuery() ?? {},
    });
};
</script>
