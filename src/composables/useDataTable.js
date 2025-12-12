import { useFilter } from './useFilter';
import { useSort } from './useSort';
import { usePagination } from './usePagination';

export const useDataTable = (tableData, pageSize = 10) => {
    const { keyword, filteredData } = useFilter(tableData);
    const { sortedData, sortBy, orderBy } = useSort(filteredData);
    const { page, pageLen, paginatedData } = usePagination(sortedData, pageSize);

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
