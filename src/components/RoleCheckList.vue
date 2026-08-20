<template>
    <div v-for="role in roles" :key="role.id">
        <Check :modelValue="modelValue" :id="role.id" :value="role.id" @update:modelValue="emit('update:modelValue', $event)" />
        <Label :for="role.id">{{ role.name }}</Label>
    </div>
</template>

<script setup>
import { roleService } from '@/services/roleService';
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

const roles = ref([]);

onMounted(async () => {
    try {
        roles.value = await roleService.getAll();
    } catch (err) {
        const error = errorHandler(err);
        addToast(t(error.code));
    }
});
</script>
