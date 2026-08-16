<template>
    <teleport to="body">
        <div v-if="isShow">
            {{ confirmMessage }}
            <Button @click="confirmYes">{{ t('button.yes') }}</Button>
            <Button @click="confirmNo">{{ t('button.no') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
const { t } = useI18n();

const { isShow, confirmMessage, confirmYes, confirmNo } = useConfirm();
</script>
