import { useFilter } from './useFilterWithQuery';
import { useSort } from './useSortWithQuery';
import { usePagination } from './usePaginationWithQuery';

export const useDataTableWithQuery = (tableData, pageSize = 10) => {
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

export { useDataTableWithQuery as useDataTable };
