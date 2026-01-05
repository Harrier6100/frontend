<template>
    <teleport to="body">
        <div v-if="isOpen">
            <template v-if="currentMenu === 'top'">
                <div v-for="menu in filteredMenu" :key="menu.children" @click="pushMenu(menu.children)">
                    {{ t(menu.label) }}
                    <i class="fa fa-chevron-right"></i>
                </div>
            </template>
            <template v-else>
                <div @click="popMenu">
                    <i class="fa fa-chevron-left"></i>
                </div>
                <template v-for="menu in filteredMenu" :key="menu.routeName || menu.children">
                    <div v-if="menu.children" @click="pushMenu(menu.children)">
                        {{ t(menu.label) }}
                        <i class="fa fa-chevron-right"></i>
                    </div>
                    <router-link v-else-if="menu.routeName" :to="{ name: menu.routeName }" @click="emit('close')">
                        {{ t(menu.label) }}
                    </router-link>
                </template>
            </template>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUser } from '@/composables/auth';
import { menuItems } from '@/menu';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const { role, permissions } = useUser();

const menus = ref([]);
const isForwardMenu = ref(false);

watch(() => props.isOpen, (value) => {
    if (!value) menus.value = [];
});

const currentMenu = computed(() => {
    return menus.value.at(-1) || 'top';
});

const filteredMenu = computed(() => {
    const items = menuItems[currentMenu.value] || [];

    return items.filter(item => {
        if (item.routeName) return can(item);

        if (item.children) {
            const children = menuItems[item.children] || [];
            return children.some(can);
        }

        return true;
    });
});

const can = (item) => {
    if (!item.showInMenu) return false;

    if (item.requiresAuth) {
        const roleOk = item.roles.includes(role.value);
        const permissionOk = permissions.value.some(p => item.permissions.includes(p));
        return roleOk || permissionOk;
    }

    return true;
};

const pushMenu = (item) => {
    menus.value.push(item);
    isForwardMenu.value = true;
};

const popMenu = () => {
    menus.value.pop();
    isForwardMenu.value = false;
};
</script>
