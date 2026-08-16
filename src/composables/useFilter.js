import dayjs from 'dayjs';

export const useFilter = (items) => {
    const keyword = ref(null);

    const flattenValues = (obj) => {
        if (obj === null || obj === undefined) return [];

        if (typeof obj === 'string') {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
                return [obj, dayjs(obj).format('YYYY-MM-DD HH:mm:ss')];
            }

            return [obj];
        }

        if (typeof obj !== 'object') return [String(obj)];

        return Object.values(obj).flatMap(value => flattenValues(value));
    };

    const filteredItems = computed(() => {
        if (!keyword.value) return items.value;
        const word = keyword.value.toLowerCase();

        return items.value.filter(obj => {
            const values = flattenValues(obj);
            return values.some(value => value.toLowerCase().includes(word));
        });
    });

    return {
        keyword,
        filteredItems,
    };
};
