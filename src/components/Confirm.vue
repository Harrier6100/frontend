<template>
    <teleport to="body">
        <div v-if="isOpen">
            {{ confirmMessage }}
            <Button @click="confirmNo">{{ t('BUTTON.NO') }}</Button>
            <Button @click="confirmYes">{{ t('BUTTON.YES') }}</Button>
        </div>
    </teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useConfirm } from '@/composables/state';

const { t } = useI18n();
const { isOpen, confirmMessage, confirmYes, confirmNo } = useConfirm();
</script>
