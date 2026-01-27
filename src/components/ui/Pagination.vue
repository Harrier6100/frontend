<template>
    <div>
        <Button @click="emit('update:page', page - 1)" :disabled="page === 1">
            <i class="fa fa-chevron-left"></i>
        </Button>
        <template v-for="(p, index) in pages" :key="p === '...' ? p + '-' + index : p">
            <Button v-if="p === '...'" :disabled="true">...</Button>
            <Button v-if="p !== '...'" @click="emit('update:page', p)" :disabled="p === page">{{ p }}</Button>
        </template>
        <Button @click="emit('update:page', page + 1)" :disabled="page >= pageCount">
            <i class="fa fa-chevron-right"></i>
        </Button>
    </div>
</template>

<script setup>
const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    pageCount: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['update:page']);

const pages = computed(() => {
    const { page, pageCount } = props;

    const pageList = [];

    if (pageCount <= 7) {
        for (let p=1; p<=pageCount; p++) pageList.push(p);
    } else if (page < 4) {
        pageList.push(1, 2, 3, 4, 5, '...', pageCount);
    } else if (page >= (pageCount - 3)) {
        pageList.push(1, '...', pageCount -4, pageCount - 3, pageCount -2, pageCount - 1, pageCount);
    } else {
        pageList.push(1, '...', page - 1, page, page + 1, '...', pageCount);
    }

    return pageList;
});
</script>
