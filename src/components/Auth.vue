<template>
    <router-link to="/"><i class="fa fa-house"></i></router-link>
    <template v-if="isAuth">
        <Button @click="onLogout">{{ t('BUTTON.LOGOUT') }}</Button>
        <Button @click="sidebar.toggle">...</Button>
        {{ name }}
    </template>
    <template v-else>
        <Button @click="modals.login.open">{{ t('BUTTON.LOGIN') }}</Button>
    </template>
    <Login
        :isOpen="modals.login.state.isOpen"
        @close="modals.login.close"
    />
    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuth, useUser } from '@/composables/auth';
import { useToggle } from '@/composables/core';
import { useConfirm } from '@/composables/state';
import { useModal } from '@/composables/ui';

const { t } = useI18n();
const router = useRouter();
const { isAuth, logout } = useAuth();
const { name } = useUser();
const sidebar = useToggle();
const { confirm } = useConfirm();

const modals = reactive({
    login: useModal(),
});

const onLogout = async () => {
    if (!await confirm(t('CONFIRM.LOGOUT'))) return;

    try {
        await logout();
        router.push('/');
    } catch (error) {
        console.error(error);
    }
};
</script>
