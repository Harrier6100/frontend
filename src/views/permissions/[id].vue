<template>
    <h3>{{ id ? t('MENU.PERMISSIONS_ID') : t('MENU.PERMISSIONS_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.PERMISSIONS.ID') }}</Label>
            <Input v-model="form.id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.PERMISSIONS.NAME') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
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
</template>

<script setup>
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useQuery } from '@/composables/useQuery';
import { useYup } from '@/composables/useYup';
import { permissionService } from '@/services';
import { errorHandler } from '@/helpers';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();
const { getQuery } = useQuery();
const { errors, check } = useYup();

const { id } = route.params;
const form = reactive({
    id: '',
    name: '',
    remarks: '',
    isActive: true,
});

const schema = yup.object({
    id: yup.string().required().label(t('LABEL.PERMISSIONS.ID')),
    name: yup.string().required().label(t('LABEL.PERMISSIONS.NAME')),
});

onMounted(async () => {
    if (!id) return;

    await runAsync(async () => {
        const data = await permissionService.get(id);
        Object.assign(form, data);
    });
});

const onSave = async () => {
    if (!(await check(schema, form))) return;

    try {
        await runAsync(async () => {
            await execute(async () => {
                if (id) await permissionService.update(id, form);
                if (!id) await permissionService.create(form);
            });
        });
        addToast(t('MESSAGE.SAVE'));
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};

const onBack = () => {
    router.push({
        name: 'Permissions',
        query: getQuery(),
    });
};
</script>
