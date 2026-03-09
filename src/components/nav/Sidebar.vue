<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="$emit('close')">{{ t('button.close_x') }}</Button>
            <template v-if="currentMenu === 'top'">
                <div v-for="menu in menus" :key="menu.routeNext" @click="pushMenu(menu.routeNext)">
                    {{ t(menu.label) }}
                    <i class="fa fa-chevron-right"></i>
                </div>
            </template>
            <template v-else>
                <div @click="popMenu">
                    <i class="fa fa-chevron-left"></i>
                </div>
                <template v-for="menu in menus" :key="menu.routeNext || menu.routeName">
                    <div v-if="menu.routeNext" @click="pushMenu(menu.routeNext)">
                        <div>{{ t(menu.label) }}</div>
                        <i class="fa fa-chevron-right"></i>
                    </div>
                    <router-link v-else-if="menu.routeName" :to="{ name: menu.routeName }" @click="$emit('close')">
                        <div>{{ t(menu.label) }}</div>
                    </router-link>
                </template>
            </template>
        </div>
    </teleport>
</template>

<script setup>
import router from '@/router';
import { can } from '@/helpers/can';
import { useUser } from '@/composables/useUser';
import menuDefs from '@/config/menu';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const { t } = useI18n();
const menuStacks = ref([]);
const isForward = ref(false);

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) menuStacks.value = [];
});

const currentMenu = computed(() => {
    return menuStacks.value.at(-1) || 'top';
});

const menus = computed(() => {
    const menuDef = menuDefs[currentMenu.value] || [];

    return menuDef.filter(def => {
        if (def.routeNext) {
            const routeNext = menuDefs[def.routeNext] || [];
            return routeNext.some(pass);
        }
        if (def.routeName) return pass(def);

        return true;
    });
});

const pass = (menu) => {
    const { role, permissions } = useUser();
    const user = { isLogin: true, role: role.value, permissions: permissions.value };
    const route = router.getRoutes().find(r => r.name === menu.routeName);

    if (!route) return false;
    return can(route.meta, user).ok;
};

const pushMenu = (menu) => {
    menuStacks.value.push(menu);
    isForward.value = true;
};

const popMenu = () => {
    menuStacks.value.pop();
    isForward.value = false;
};
</script>
