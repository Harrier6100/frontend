import { debounce } from 'lodash';

export const useDataTable = (sourceItems, pageSize = 10, { withQuery = true } = {}) => {
    const { keyword, filteredItems } = useFilter(sourceItems);
    const { sort, order, sortedItems, sortBy, orderBy } = useSort(filteredItems);
    const { page, pageCount, paginatedItems } = usePagination(sortedItems, pageSize);
    const isInitialized = ref(!withQuery);

    const items = computed(() => {
        return paginatedItems.value;
    });

    if (withQuery) {
        const route = useRoute();
        const router = useRouter();

        onMounted(async () => {
            if (route.query.keyword) keyword.value = route.query.keyword;
            if (route.query.sort) sort.value = route.query.sort;
            if (route.query.order) order.value = route.query.order;
            if (route.query.page) page.value = Number(route.query.page);

            await nextTick();
            isInitialized.value = true;
        });

        const updateQuery = debounce(() => {
            router.replace({
                query: {
                    ...route.query,
                    keyword: keyword.value ?? undefined,
                    sort: sort.value ?? undefined,
                    order: order.value ?? undefined,
                    page: page.value ?? undefined,
                }
            });
        }, 100);

        watch([keyword, sort, order, page], () => updateQuery());
    }

    watch([keyword, sort, order], () => {
        if (!isInitialized.value) return;
        page.value = 1;
    });

    return {
        keyword,
        sort,
        order,
        page,
        pageCount,
        items,
        sortBy,
        orderBy,
    };
};
