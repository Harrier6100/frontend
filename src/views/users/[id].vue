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
            <Button @click="permission.open">{{ t('BUTTON.PERMISSION_SETTING') }}</Button>
        </div>
        <div v-if="form.role === 'guest'">
            <Label>{{ t('LABEL.USERS.EXPIRY_DATE') }}</Label>
            <DatePicker v-model="form.expiryDate" placeholder="YYYY-MM-DD" />
        </div>
        <div>
            <Label>{{ t('LABEL.USERS.REMARKS') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Label>
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>
    <Permission
        :isOpen="permission.state.isOpen"
        :modelValue="form.permissions"
        @save="form.permissions = $event"
        @close="permission.close"
    />
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useQuery } from '@/composables/data';
import { useLoading, useSpinning, useToast, useModal } from '@/composables/ui';
import { useYup } from '@/composables/yup';
import { errorHandler } from '@/utils/errorHandler';
import { userService } from '@/services/userService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();
const permission = useModal();
const { errors, check } = useYup();

const schema = yup.object({
    id: yup.string().required().label('LABEL.USERS.ID'),
    name: yup.string().required().label('LABEL.USERS.NAME'),
});

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

const roles = [
    { value: 'admin', label: t('LABEL.USERS.ROLE_ADMIN') },
    { value: 'user', label: t('LABEL.USERS.ROLE_USER') },
    { value: 'guest', label: t('LABEL.USERS.ROLE_GUEST') },
];

onMounted(async () => {
    if (!id) return;

    try {
        startLoading();
        await execute(async () => {
            const responseData = await userService.get(id);
            form.value = Object.assign(form.value, responseData);
        });
    } catch (error) {
        const { message } = errorHandler(error);
        addToast(message, 'error');
    } finally {
        stopLoading();
    }
});

watch(() => form.value.role, (role) => {
    if (role !== 'guest') {
        form.value.expiryDate = '';
    }
});

const onSave = async () => {
    const ok = await check(schema, form.value);
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
