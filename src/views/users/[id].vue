<template>
    <h4>{{ id ? t('menu.users_id') : t('menu.users_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('users.id') }}</Label>
            <Input v-model="form.id" :readonly="!!id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('users.name') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('users.language') }}</Label>
            <Select v-model="form.language">
                <option value="ja">{{ t('users.language_ja') }}</option>
                <option value="en">{{ t('users.language_en') }}</option>
            </Select>
        </div>
        <div>
            <Label>{{ t('users.role') }}</Label>
            <div v-for="role in roles" :key="role.value">
                <Radio v-model="form.role" :id="role.value" :value="role.value" />
                <Label :for="role.value">{{ t(role.label) }}</Label>
            </div>
        </div>
        <div v-if="form.role === 'user'">
            <Button @click="modals.permissions.open">{{ t('users.permissions') }}</Button>
        </div>
        <div v-if="form.role === 'guest'">
            <Label>{{ t('users.expiry_date') }}</Label>
            <DatePicker v-model="form.expiryDate" />
        </div>
        <div>
            <Label>{{ t('users.remarks') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('users.is_active_true') : t('users.is_active_false') }}</Label>
        </div>
        <Button type="submit" :disabled="isLoading">
            {{ t('button.save') }}<span v-if="isSpinning">...</span>
        </Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>

    <Permissions
        :isOpen="modals.permissions.state.isOpen"
        :modelValue="form.permissions"
        @save="(permissions) => form.permissions = permissions"
        @close="modals.permissions.close"
    />
</template>

<script setup>
import * as yup from 'yup';
import { userService } from '@/services/userService';
import { errorHandler } from '@/helpers/errorHandler';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useModal } from '@/composables/useModal';
import { useYup } from '@/composables/useYup';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const modals = reactive({ permissions: useModal() });
const { errors, runYup } = useYup();

const roles = [
    { value: 'admin', label: 'users.role_admin' },
    { value: 'user', label: 'users.role_user' },
    { value: 'guest', label: 'users.role_guest' },
];

const { id } = route.params;
const form = reactive({
    id: '',
    name: '',
    language: 'ja',
    role: 'user',
    permissions: [],
    expiryDate: '',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string().required().label(t('users.id')),
    name: yup.string().required().label(t('users.name')),
});

onMounted(async () => {
    if (!id) return;

    await execute(async () => {
        const data = await userService.get(id);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    if (!(await runYup(schema, form))) return;

    try {
        await execute(async () => {
            await spin(async () => {
                if (id) await userService.update(id, form);
                if (!id) await userService.create(form);
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
        { name: 'Users' }
    );
};
</script>
