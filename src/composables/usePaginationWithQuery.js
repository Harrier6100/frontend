import { usePagination } from './usePagination';

export const usePaginationWithQuery = (paginationData, pageSize) => {
    const route = useRoute();
    const router = useRouter();
    const pagination = usePagination(paginationData, pageSize);

    onMounted(() => {
        if (route.query.page) {
            pagination.page.value = Number(route.query.page);
        }
    });

    const updateQuery = () => {
        router.replace({
            query: {
                ...route.query,
                page: pagination.page.value,
            },
        });
    };

    watch(pagination.page, updateQuery);

    return pagination;
};

export { usePaginationWithQuery as usePagination };
