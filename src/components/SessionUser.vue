<template>
    <div v-if="isLoggedIn">
        <Button @click="sidebar.open">...</Button>
        {{ id }} {{ name }}
        <Button @click="onLogout">{{ t('button.logout') }}</Button>
    </div>

    <Sidebar
        :isOpen="sidebar.isOpen.value"
        @close="sidebar.close"
    />
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();

const { isLoggedIn, endSession } = useSession();
const { id, name } = useUser();
const { confirm } = useConfirm();

const sidebar = useToggle();

const onLogout = async () => {
    const ok = await confirm(t('confirm.logout'));
    if (!ok) return;

    try {
        await endSession();
    } finally {
        router.push('/login');
    }
};
</script>
