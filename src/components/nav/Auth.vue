<template>
    <Button @click="sidebar.open">...</Button>
    <template v-if="isLoggedIn">
        <Button @click="onLogout">{{ t('BUTTON.LOGOUT') }}</Button>
        {{ name }}
    </template>
    <template v-else>
        <Button @click="login.open">{{ t('BUTTON.LOGIN') }}</Button>
    </template>
    <Login
        :isOpen="login.state.isOpen"
        @close="login.close"
    />
    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useSession, useUser } from '@/composables/auth';
import { useConfirm, useToggle, useModal } from '@/composables/ui';

const { t } = useI18n();
const router = useRouter();
const { isLoggedIn, endSession } = useSession();
const { name } = useUser();
const { confirm } = useConfirm();
const sidebar = useToggle();
const login = useModal();

const onLogout = async () => {
    if (!await confirm(t('MESSAGE.CONFIRM_LOGOUT'))) return;

    try {
        await endSession();
        router.push('/');
    } catch (error) {
        console.error(error);
    }
};
</script>
