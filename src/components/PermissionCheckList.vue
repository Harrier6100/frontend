<template>
    <div v-for="permission in permissions" :key="permission.id">
        <Check :modelValue="modelValue" :id="permission.id" :value="permission.id" @update:modelValue="emit('update:modelValue', $event)" />
        <Label :for="permission.id">{{ t('permission.' + permission.id + '.name') }}</Label>
    </div>
</template>

<script setup>
import { permissionService } from '@/services/permissionService';
import { errorHandler } from '@/helpers/errorHandler';

const props = defineProps({
    modelValue: {
        type: Array,
        required: true,
    },
});
const emit = defineEmits(['update:modelValue']);

const { t } = useI18n();
const { addToast } = useToast();

const permissions = ref([]);

onMounted(async () => {
    try {
        permissions.value = await permissionService.getAll();
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
});
</script>
