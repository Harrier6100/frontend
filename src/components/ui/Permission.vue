<template>
    <teleport to="body">
        <div v-if="isOpen">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{{ t('LABEL.READ') }}</th>
                        <th>{{ t('LABEL.CREATE') }}</th>
                        <th>{{ t('LABEL.UPDATE') }}</th>
                        <th>{{ t('LABEL.DELETE') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(permissionDef, key) in permissionDefs" :key="key">
                        <td>{{ t(permissionDef.label) }}</td>
                        <td v-for="action in actions" :key="action">
                            <Checkbox v-model="permissions" :value="permissionDef.actions[action]" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button @click="onSave">{{ t('BUTTON.SAVE') }}</Button>
            <Button @click="emit('close')">{{ t('BUTTON.CLOSE') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { permissionDefs } from '@/config/permission';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['save', 'close']);

const { t } = useI18n();

const permissions = ref([]);
const actions = ['r', 'c', 'u', 'd'];

watch(() => props.modelValue, (value) => {
    if (Array.isArray(value)) permissions.value = [...value];
}, { immediate: true });

const onSave = () => {
    emit('save', permissions.value);
    emit('close');
};
</script>
