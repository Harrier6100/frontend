export const useQuery = () => {
    const getQuery = () => {
        const q = sessionStorage.getItem('q');
        if (!q) return null;

        try {
            return JSON.parse(q);
        } catch {
            sessionStorage.removeItem('q');
            return null;
        }
    };

    const setQuery = (obj) => {
        sessionStorage.setItem('q', JSON.stringify(obj));
    };

    return {
        getQuery,
        setQuery,
    };
};
