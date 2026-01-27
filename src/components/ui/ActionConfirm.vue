<template>
    <teleport to="body">
        <div v-if="isOpen">
            <span>{{ confirmMessage }}</span>
            <Button @click="confirmNo">{{ t('BUTTON.NO') }}</Button>
            <Button @click="confirmYes">{{ t('BUTTON.YES') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
import { useConfirm } from '@/composables/useConfirm';

const { t } = useI18n();
const { isOpen, confirmMessage, confirmYes, confirmNo } = useConfirm();
</script>
