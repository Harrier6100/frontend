import { watch } from 'vue';
import { useFilter } from './useFilterQuery';
import { useSort } from './useSortQuery';
import { usePagination } from './usePaginationQuery';

export const useDataTableQuery = (tableData, pageSize = 10) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageLen, paginatedData } = usePagination(sortedData, pageSize);

    watch(keyword, () => page.value = 1);

    return {
        keyword,
        page,
        pageLen,
        filteredData,
        sortedData,
        paginatedData,
        sortBy,
        orderBy,
    };
};

export { useDataTableQuery as useDataTable };
