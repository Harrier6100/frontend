import { debounce } from 'lodash';
import { useFilter } from './useFilter';
import { useSort } from './useSort';
import { usePagination } from './usePagination';

export const useDataTableSync = (tableData, pageSize = 10) => {
    const route = useRoute();
    const router = useRouter();
    const { keyword, filteredData } = useFilter(tableData);
    const { sort, order, sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageCount, paginatedData } = usePagination(sortedData, pageSize);

    onMounted(() => {
        if (route.query.keyword) keyword.value = route.query.keyword;
        if (route.query.sort) sort.value = route.query.sort;
        if (route.query.order) order.value = route.query.order;
        if (route.query.page) page.value = Number(route.query.page);
    });

    const updateQuery = debounce(() => {
        router.replace({
            query: {
                ...route.query,
                keyword: keyword.value,
                sort: sort.value,
                order: order.value,
                page: page.value,
            },
        });
    }, 100);

    watch([keyword, sort, order, page], () => {
        updateQuery()
    });

    return {
        keyword,
        page,
        pageCount,
        filteredData,
        sortedData,
        paginatedData,
        sortBy,
        orderBy,
    };
};

export { useDataTableSync as useDataTable };
