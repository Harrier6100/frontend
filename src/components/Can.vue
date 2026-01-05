<template>
    <slot v-if="isCan"></slot>
</template>

<script setup>
import { computed } from 'vue';
import { useUser } from '@/composables/auth';

const props = defineProps({
    roles: [String, Array],
    perms: [String, Array],
});

const isCan = computed(() => {
    const { role, permissions } = useUser();
    const { roles: requiredRoles, permissions: requiredPermissions } = props;

    if (role.value === 'admin') return true;

    if (requiredRoles) {
        if (Array.isArray(requiredRoles)) {
            const can = requiredRoles.includes(role.value);
            if (can) return true;
        } else {
            const can = requiredRoles === role.value;
            if (can) return true;
        }
    }

    if (requiredPermissions) {
        if (Array.isArray(requiredPermissions)) {
            const can = permissions.value.some(p => requiredPermissions.includes(p));
            if (can) return true;
        } else {
            const can = permissions.value.includes(requiredPermissions);
            if (can) return true;
        }
    }

    return false;
});
</script>
