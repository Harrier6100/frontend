<template>
    <teleport to="body">
        <div v-if="isOpen">
            <template v-if="currentMenu === 'top'">
                <div v-for="menuItem in menuItems" :key="menuItem.routeNext" @click="pushMenu(menuItem.routeNext)">
                    {{ t(menuItem.label) }}
                    <i class="fa fa-chevron-right"></i>
                </div>
            </template>
            <template v-else>
                <div @click="popMenu">
                    <i class="fa fa-chevron-left"></i>
                </div>
                <template v-for="menuItem in menuItems" :key="menuItem.routeNext || menuItem.routeName">
                    <div v-if="menuItem.routeNext" @click="pushMenu(menuItem.routeNext)">
                        {{ t(menuItem.label) }}
                        <i class="fa fa-chevron-right"></i>
                    </div>
                    <router-link v-else-if="menuItem.routeName" :to="{ name: menuItem.routeName }" @click="$emit('close')">
                        {{ t(menuItem.label) }}
                    </router-link>
                </template>
            </template>
        </div>
    </teleport>
</template>

<script setup>
import router from '@/router';
import { useUser } from '@/composables/useUser';
import { guard } from '@/helpers';
import menuDefs from '@/config/menu';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();

const menus = ref([]);
const isForward = ref(false);

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) menus.value = [];
});

const currentMenu = computed(() => {
    return menus.value.at(-1) || 'top';
});

const menuItems = computed(() => {
    const menuDef = menuDefs[currentMenu.value] || [];

    return menuDef.filter(def => {
        if (def.routeNext) {
            const routeNext = menuDefs[def.routeNext] || [];
            return routeNext.some(can);
        }

        if (def.routeName) return can(def);

        return true;
    });
});

const can = (def) => {
    const { role, permissions } = useUser();
    const user = { isLoggedIn: true, role: role.value, permissions: permissions.value };
    const route = router.getRoutes().find(r => r.name === def.routeName);

    if (!route) return false;

    return guard(route.meta, user).ok;
};

const pushMenu = (def) => {
    menus.value.push(def);
    isForward.value = true;
};

const popMenu = () => {
    menus.value.pop();
    isForward.value = false;
};
</script>
