<template>
    <div>
        <Button @click="emit('update:page', page - 1)" :disabled="page === 1">
            <i class="fa fa-chevron-left"></i>
        </Button>
        <template v-for="(p, index) in pages" :key="p === '...' ? p + '-' + index : p">
            <Button v-if="p === '...'" :disabled="true">...</Button>
            <Button v-if="p !== '...'" @click="emit('update:page', p)" :disabled="p === page">{{ p }}</Button>
        </template>
        <Button @click="emit('update:page', page + 1)" :disabled="page >= pageLen">
            <i class="fa fa-chevron-right"></i>
        </Button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    pageLen: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['update:page']);

const pages = computed(() => {
    const pageList = [];
    const { page, pageLen } = props;

    if (pageLen <= 7) {
        for (let p=1; p<=pageLen; p++) pageList.push(p);
    } else if (page < 4) {
        pageList.push(1, 2, 3, 4, 5, '...', pageLen);
    } else if (page >= (pageLen - 3)) {
        pageList.push(1, '...', pageLen - 4, pageLen - 3, pageLen - 2, pageLen - 1, pageLen);
    } else {
        pageList.push(1, '...', page - 1, page, page + 1, '...', pageLen);
    }

    return pageList;
});
</script>
