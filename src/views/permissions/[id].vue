<template>
    <h4>{{ routeId ? t('menu.permissions_id') : t('menu.permissions_new') }}</h4>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('permissions.id') }}</Label>
            <Input v-model="form.id" :readonly="!!routeId" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('permissions.name') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('permissions.remarks') }}</Label>
            <Textarea v-model="form.remarks"></Textarea>
        </div>
        <div>
            <Checkbox id="isActive" v-model="form.isActive" />
            <Label for="isActive">{{ form.isActive ? t('permissions.is_active_true') : t('permissions.is_active_false') }}</Label>
        </div>
        <Button type="submit" :disabled="isLoading">
            {{ t('button.save') }}<span v-if="isSpinning">...</span>
        </Button>
        <Button @click="onBack">{{ t('button.back') }}</Button>
    </Form>
</template>

<script setup>
import * as yup from 'yup';
import { permissionService } from '@/services/permissionService';
import { errorHandler } from '@/helpers/errorHandler';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useYup } from '@/composables/useYup';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, execute } = useLoading();
const { isSpinning, spin } = useSpinning();
const { errors, runYup } = useYup();

const { id: routeId } = route.params;
const form = reactive({
    id: '',
    name: '',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string().required().label(t('permissions.id')),
    name: yup.string().required().label(t('permissions.name')),
});

onMounted(async () => {
    if (route.query.id) {
        const permission = await permissionService.get(route.query.id);
        Object.assign(form, permission);
    }
    if (!routeId) return;

    await execute(async () => {
        const data = await permissionService.get(routeId);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    if (!(await runYup(schema, form))) return;

    try {
        await execute(async () => {
            await spin(async () => {
                if (routeId) await permissionService.update(routeId, form);
                if (!routeId) await permissionService.create(form);
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
        { name: 'Permissions' }
    );
};
</script>
