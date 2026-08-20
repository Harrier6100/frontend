<template>
    <Form @submit.prevent="onSave">
        <div>
            <Label for="id">{{ t('label.roles.id') }}</Label>
            <Input v-model="form.id" id="id" />
            <Alert :error="errors.id" />
        </div>
        <div>
            <Label for="name">{{ t('label.roles.name') }}</Label>
            <Input v-model="form.name" id="name" />
            <Alert :error="errors.name" />
        </div>
        <div>
            <Label for="description">{{ t('label.roles.description') }}</Label>
            <Input v-model="form.description" id="description" />
        </div>
        <div>
            <Label>{{ t('label.roles.permissions') }}</Label>
            <PermissionCheckList v-model="form.permissions" />
        </div>
        <Button v-if="routeId" v-can="'roles.delete'" @click="onDelete">{{ t('button.delete') }}</Button>
        <Button submit :spinning="isLoading">{{ t('button.save') }}</Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { roleService } from '@/services/roleService';
import { errorHandler } from '@/helpers/errorHandler';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useAsync();
const { confirm } = useConfirm();
const { addToast } = useToast();
const { errors, validate } = useValidation();

const routeId = computed(() => route.params.id);
const form = reactive({
    id: '',
    name: '',
    description: '',
    permissions: [],
});

const schema = yup.object({
    id: yup.string()
        .required(() => t('validation.required', { field: t('label.roles.id') })),
    name: yup.string()
        .required(() => t('validation.required', { field: t('label.roles.name') })),
});

const onSave = async () => {
    const ok = await validate(form, schema);
    if (!ok) return;

    try {
        await execute(async () => {
            if (routeId.value) {
                await roleService.update(routeId.value, form);
            } else {
                await roleService.create(form);
            }
            await roleService.updatePermissions(form.id, form.permissions);
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
            await roleService.delete(routeId.value);
            addToast(t('toast.deleted', { resource: t('') }));
        });
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
};

const onBack = () => {
    router.push(route.query.from ?? {
        name: 'Roles',
    });
};

onMounted(async () => {
    const id = routeId.value || route.query.id;
    if (id) {
        try {
            const [role, permissions] = await Promise.all([
                roleService.getById(id),
                roleService.getPermissions(id),
            ]);
            Object.assign(form, role);
            form.permissions = permissions.map(permission => permission.id);
        } catch (err) {
            const error = errorHandler(err);
            addToast(t(error.code));
        }
    }
});
</script>
