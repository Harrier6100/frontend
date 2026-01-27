export const usePagination = (paginationData, pageSize) => {
    const page = ref(1);

    const pageCount = computed(() => {
        return Math.ceil(paginationData.value.length / pageSize);
    });

    const paginatedData = computed(() => {
        const startIndex = (page.value - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return paginationData.value.slice(startIndex, endIndex);
    });

    return {
        page,
        pageCount,
        paginatedData,
    };
};
