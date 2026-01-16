import { useQueryStore } from '@/stores/useQueryStore';

export const useQuery = () => {
    const store = useQueryStore();
    const { getQuery, setQuery } = store;

    return {
        getQuery,
        setQuery,
    };
};
