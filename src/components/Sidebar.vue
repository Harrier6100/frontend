<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')"><i class="fa fa-x"></i></Button>
            <template v-if="currentMenu === 'top'">
                <div v-for="menu in menus" :key="menu.routeNext" @click="pushMenu(menu.routeNext)">
                    {{ t(menu.label) }}<i class="fa fa-chevron-right"></i>
                </div>
            </template>
            <template v-else>
                <div @click="popMenu"><i class="fa fa-chevron-left"></i></div>
                <template v-for="menu in menus" :key="menu.routeNext || menu.routeName">
                    <div>
                        <div v-if="menu.routeNext" @click="pushMenu(menu.routeNext)">
                            {{ t(menu.label) }}<i class="fa fa-chevron-right"></i>
                        </div>
                        <router-link
                            v-else-if="menu.routeName"
                            :to="{ name: menu.routeName }"
                            @click="emit('close')"
                        >
                            {{ t(menu.label) }}
                        </router-link>
                    </div>
                </template>
            </template>
        </div>
    </teleport>
</template>

<script setup>
import { menuTree } from '@/menu';
import { canActivate } from '@/helpers/canActivate';

const props = defineProps({
    isOpen: Boolean,
});
const emit = defineEmits(['close']);

const router = useRouter();
const { t } = useI18n();
const { permissions } = useSession();

const menuStacks = ref([]);
const isForward = ref(false);

watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) menuStacks.value = [];
});

const menuDefs = computed(() => {
    return menuTree(router.getRoutes());
});

const currentMenu = computed(() => {
    return menuStacks.value.at(-1) || 'top';
});

const menus = computed(() => {
    const menuDef = menuDefs.value[currentMenu.value] || [];

    return menuDef.filter(def => {
        if (def.routeNext) {
            const routeNext = menuDefs.value[def.routeNext] || [];
            return routeNext.some(pass);
        }
        if (def.routeName) return pass(def);

        return true;
    });
});

const pass = (menu) => {
    const route = router.getRoutes().find(r => r.name === menu.routeName);
    if (!route) return false;
    return canActivate(route.meta, { permissions: permissions.value }).ok;
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
