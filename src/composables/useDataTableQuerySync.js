import { useFilter } from './useFilterQuerySync';
import { useSort } from './useSortQuerySync';
import { usePagination } from './usePaginationQuerySync';

export const useDataTableQuerySync = (tableData, pageSize = 10) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageCount, paginatedData } = usePagination(sortedData, pageSize);

    watch(keyword, () => page.value = 1);

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

export { useDataTableQuerySync as useDataTable };
