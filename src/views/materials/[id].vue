<template>
    <h3>{{ id ? t('MENU.MATERIALS_ID') : t('MENU.MATERIALS_NEW') }}</h3>
    <Form @submit.prevent="onSave">
        <div>
            <Label>{{ t('LABEL.MATERIAL.ID') }}</Label>
            <Input v-model="form.id" :readonly="!!id" />
            <Message :error="errors.id" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL.NAME') }}</Label>
            <Input v-model="form.name" />
            <Message :error="errors.name" />
        </div>
        <div>
            <Label>{{ t('LABEL.MATERIAL.SOLID_CONTENT_RATIO') }}</Label>
            <Input v-model="form.solidContentRatio" readonly />
            <Message :error="errors.name" />
        </div>
        <div>
            <Button @click="modals.component.open({ component })">{{ t('BUTTON.ADD') }}</Button>
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in components.items.value" :key="index">
                        <td>{{ item.componentId }}</td>
                        <td>{{ item.componentName }}</td>
                        <td>{{ item.contentRatio }}</td>
                        <td>
                            <Button @click="modals.component.open({ index, component: item })">{{ t('BUTTON.EDIT') }}</Button>
                            <Button @click="components.remove(index)">{{ t('BUTTON.REMOVE') }}</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Button type="submit" :disabled="isLoading">
            <span v-if="isSpinning">...</span>
            {{ t('BUTTON.SAVE') }}
        </Button>
        <Button @click="onBack">{{ t('BUTTON.BACK') }}</Button>
    </Form>

    <Component
        v-if="modals.component.state.isOpen"
        :isOpen="modals.component.state.isOpen"
        :modelValue="modals.component.state.payload.component"
        @save="(component) => (modals.component.state.payload.index ?? -1) >= 0
            ? form.components[modals.component.state.payload.index] = component
            : form.components.push(component)"
        @close="modals.component.close"
    />
</template>

<script setup>
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useArray } from '@/composables/useArray';
import { useQuery } from '@/composables/useQuery';
import { useModal } from '@/composables/useModal';
import { useYup } from '@/composables/useYup';
import { materialService } from '@/services';
import { errorHandler } from '@/helpers/errorHandler';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isLoading, runAsync } = useLoading();
const { isSpinning, execute } = useSpinning();
const { getQuery } = useQuery();
const modals = reactive({ component: useModal() });
const { errors, check } = useYup();

const { id } = route.params;
const components = useArray();
const component = {
    componentId: '',
    componentName: '',
    contentRatio: 0,
};
const form = reactive({
    id: '',
    name: '',
    solidContentRatio: 0,
    components: components.items,
});

const schema = yup.object({
    id: yup.string().required().label(t('LABEL.MATERIALS.ID')),
    name: yup.string().required().label(t('LABEL.MATERIALS.NAME')),
});

onMounted(async () => {
    if (!id) return;

    await runAsync(async () => {
        const data = await materialService.get(id);
        Object.assign(form, data);
    });
});

watch(() => components.items.value, (newItems) => {
    const total = newItems.reduce((sum, c) => sum + Number(c.contentRatio), 0);
    form.solidContentRatio = 100 - total;
}, { deep: true, immediate: true });

const onSave = async () => {
    if (!(await check(schema, form))) return;

    try {
        await runAsync(async () => {
            await execute(async () => {
                if (id) await materialService.update(id, form);
                if (!id) await materialService.create(form);
            });
        });
        addToast(t('MESSAGE.SAVE'));
    } catch (err) {
        addToast(errorHandler(err).message, 'error');
    }
};

const onBack = () => {
    router.push({
        name: 'Materials',
        query: getQuery(),
    });
};
</script>
