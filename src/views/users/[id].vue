<template>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('label.users.id') }}</Label>
            <Input v-model="form.id" />
            <Alert :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('label.users.name') }}</Label>
            <Input v-model="form.name" />
            <Alert :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('label.users.language') }}</Label>
            <Select v-model="form.language">
                <option value="ja">{{ t('label.users.language_ja') }}</option>
            </Select>
        </div>
        <div>
            <Label>{{ t('label.users.remarks') }}</Label>
            <Text v-model="form.remarks"></Text>
        </div>
        <div>
            <Check v-model="form.isActive" id="isActive" />
            <Label for="isActive">{{ form.isActive ? t('label.users.is_active_true') : t('label.users.is_active_false') }}</Label>
        </div>
        <Button v-can="'users.delete'" v-if="id" @click="onDelete">{{ t('button.delete') }}</Button>
        <Button submit :spinning="isLoading">{{ t('button.save') }}</Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { userService } from '@/services/userService';
import { errorHandler } from '@/helpers/errorHandler';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useAsync();
const { confirm } = useConfirm();
const { addToast } = useToast();
const { errors, validate } = useValidation();

const id = computed(() => route.params.id);
const form = reactive({
    id: '',
    name: '',
    language: 'ja',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string()
        .required(() => t('validation.required', { field: t('label.users.id') })),
    name: yup.string()
        .required(() => t('validation.required', { field: t('label.users.name') })),
});

const fetchUser = async () => {
    try {
        const user = await userService.getById(id.value || route.query.id);
        Object.assign(form, user);
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onSave = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            if (id.value) {
                await userService.update(id.value, form);
                addToast(t('toast.updated', { resource: t('') }));
            } else {
                await userService.create(form);
                addToast(t('toast.created', { resource: t('') }));
            }
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
            await userService.delete(id.value);
            addToast(t('toast.deleted', { resource: t('') }));
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onBack = () => {
    router.push(route.query.from ?? {
        name: 'Users',
    });
};

onMounted(() => {
    if (id.value || route.query.id) {
        fetchUser();
    }
});
</script>
