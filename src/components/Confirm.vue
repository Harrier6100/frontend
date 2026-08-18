<template>
    <teleport to="body">
        <div v-if="isShow">
            {{ confirmMessage }}
            <Button @click="confirmNo">{{ t('button.no') }}</Button>
            <Button @click="confirmYes">{{ t('button.yes') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
const { t } = useI18n();

const { isShow, confirmMessage, confirmYes, confirmNo } = useConfirm();
</script>
