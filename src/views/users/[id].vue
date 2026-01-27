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
            <Label>{{ t('LABEL.USERS.LANGUAGE') }}</Label>
            <Select v-model="form.language">
                <option value="ja">{{ t('LABEL.LANGUAGE_JA') }}</option>
                <option value="en">{{ t('LABEL.LANGUAGE_EN') }}</option>
            </Select>
        </div>
        <div>
            <Label>{{ t('LABEL.USERS.ROLE') }}</Label>
            <div v-for="role in roles" :key="role.value">
                <Radio v-model="form.role" :id="role.value" :value="role.value" />
                <Label :for="role.value">{{ role.label }}</Label>
            </div>
        </div>
        <div v-if="form.role === 'user'">
            <Button @click="modals.permissionList.open">{{ t('MODAL.PERMISSION') }}</Button>
        </div>
        <div v-if="form.role === 'guest'">
            <Label>{{ t('LABEL.USERS.EXPIRY_DATE') }}</Label>
            <DatePicker v-model="form.expiryDate" />
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

    <PermissionList
        :isOpen="modals.permissionList.state.isOpen"
        :modelValue="form.permissions"
        @save="form.permissions = $event"
        @close="modals.permissionList.close"
    />
</template>

<script setup>
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useQuery } from '@/composables/useQuery';
import { useModal } from '@/composables/useModal';
import { useYup } from '@/composables/useYup';
import { userService } from '@/services';
import { errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();
const { getQuery } = useQuery();
const modals = reactive({ permissionList: useModal() });
const { errors, check } = useYup();

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
    id: yup.string().required().label(t('LABEL.USERS.ID')),
    name: yup.string().required().label(t('LABEL.USERS.NAME')),
});

const roles = [
    { value: 'admin', label: t('LABEL.USERS.ROLE_ADMIN') },
    { value: 'user', label: t('LABEL.USERS.ROLE_USER') },
    { value: 'guest', label: t('LABEL.USERS.ROLE_GUEST') },
];

onMounted(async () => {
    if (!id) return;

    await runAsync(async () => {
        const data = await userService.get(id);
        Object.assign(form, data);
    });
});

watch(() => form.role, (role) => {
    if (role !== 'guest') form.expiryDate = '';
});

const onSave = async () => {
    if (!(await check(schema, form))) return;

    try {
        await runAsync(async () => {
            await execute(async () => {
                if (id) await userService.update(id, form);
                if (!id) await userService.create(form);
            });
        });
        addToast(t('MESSAGE.SAVE'));
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};

const onBack = () => {
    router.push({
        name: 'Users',
        query: getQuery(),
    });
};
</script>
