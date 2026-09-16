<template>
    <Form @submit.prevent="onSave">
        <div>
            <Label for="id">{{ t('label.users.id') }}</Label>
            <Input v-model="form.id" id="id" />
            <Alert :error="errors.id" />
        </div>
        <div>
            <Label for="name">{{ t('label.users.name') }}</Label>
            <Input v-model="form.name" id="name" />
            <Alert :error="errors.name" />
        </div>
        <div>
            <Label for="language">{{ t('label.users.language') }}</Label>
            <Select v-model="form.language" id="language" >
                <option value="ja">{{ t('label.users.language_ja') }}</option>
            </Select>
        </div>
        <div>
            <Label for="remarks">{{ t('label.users.remarks') }}</Label>
            <Text v-model="form.remarks" id="remarks" ></Text>
        </div>
        <div>
            <Check v-model="form.isActive" id="isActive" />
            <Label for="isActive">{{ form.isActive ? t('label.users.is_active_true') : t('label.users.is_active_false') }}</Label>
        </div>
        <div>
            <Label>{{ t('label.users.roles') }}</Label>
            <RoleCheckList v-model="form.roles" />
        </div>
        <div>
            <Label>{{t('label.users.permissions')}}</Label>
            <PermissionCheckList v-model="form.permissions" />
        </div>
        <Button v-if="routeId" v-can="'users.delete'" @click="onDelete">{{ t('button.delete') }}</Button>
        <Button submit :spinning="isLoading">{{ t('button.save') }}</Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { userService } from '@/services/userService';
import { errorHandler } from '@/helpers/errorHandler';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoading, execute } = useAsync();
const { confirm } = useConfirm();
const { addToast } = useToast();
const { errors, validate } = useValidation();

const routeId = computed(() => route.params.id);
const form = reactive({
    id: '',
    name: '',
    language: 'ja',
    remarks: '',
    isActive: true,
    roles: [],
    permissions: [],
});

const schema = yup.object({
    id: yup.string()
        .required(() => t('validation.required', { field: t('label.users.id') })),
    name: yup.string()
        .required(() => t('validation.required', { field: t('label.users.name') })),
});

const onSave = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            if (routeId.value) {
                await userService.update(routeId.value, form);
            } else {
                await userService.create(form);
            }
            await Promise.all([
                userService.updateRoles(form.id, form.roles),
                userService.updatePermissions(form.id, form.permissions),
            ]);
            addToast(t(routeId.value ? 'toast.updated' : 'toast.created', { resource: t('') }));
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
            await userService.delete(routeId.value);
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

onMounted(async () => {
    const id = routeId.value || route.query.id;
    if (id) {
        try {
            const [user, roles, permissions] = await Promise.all([
                userService.getById(id),
                userService.getRoles(id),
                userService.getPermissions(id),
            ]);
            Object.assign(form, user);
            form.roles = roles.map(role => role.id);
            form.permissions = permissions.map(permission => permission.id);
        } catch (err) {
            const error = errorHandler(err);
            addToast(t(error.code));
        }
    }
});
</script>
