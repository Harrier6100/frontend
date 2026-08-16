export const usePagination = (items, pageSize) => {
    const page = ref(1);

    const pageCount = computed(() => {
        return Math.ceil(items.value.length / pageSize);
    });

    const paginatedItems = computed(() => {
        const startIndex = (page.value - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return items.value.slice(startIndex, endIndex);
    });

    watch(pageCount, () => {
        if (page.value > pageCount.value) {
            page.value = Math.max(1, pageCount.value);
        }
    });

    return {
        page,
        pageCount,
        paginatedItems,
    };
};
