<template>
    <Button @click="sidebar.open">...</Button>
    <template v-if="isLoggedIn">
        <Button @click="onLogout">{{ t('BUTTON.LOGOUT') }}</Button>
        <span>{{ name }}</span>
    </template>
    <template v-else>
        <Button @click="modals.login.open">{{ t('BUTTON.LOGIN') }}</Button>
    </template>

    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
    <Login
        :isOpen="modals.login.state.isOpen"
        @close="modals.login.close"
    />
</template>

<script setup>
import { useSession } from '@/composables/useSession';
import { useUser } from '@/composables/useUser';
import { useToggle } from '@/composables/useToggle';
import { useModal } from '@/composables/useModal';

const router = useRouter();
const { t } = useI18n();
const { isLoggedIn, endSession } = useSession();
const { name } = useUser();
const sidebar = useToggle();
const modals = reactive({ login: useModal() });

const onLogout = async () => {
    if (!await confirm(t('CONFIRM.LOGOUT'))) return;

    await endSession();
    router.push('/');
};
</script>
