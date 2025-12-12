<template>
    <teleport to="body">
        <div v-if="isOpen">
            <table class="table">
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
                    <tr v-for="(permissionAction, key) in permissionActions" :key="key">
                        <td>{{ t(permissionAction.label) }}</td>
                        <td v-for="action in actions" :key="action">
                            <input type="checkbox" v-model="permissions" :value="permissionAction.actions[action]" />
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
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { permissionActions } from '@/config/permissionActions';

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
const actions = ['read', 'create', 'update', 'delete'];

watch(() => props.modelValue, (value) => {
    if (Array.isArray(value)) permissions.value = [...value];
}, { immediate: true });

const onSave = () => {
    emit('save', permissions.value);
    emit('close');
};
</script>
