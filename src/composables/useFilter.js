import dayjs from 'dayjs';

export const useFilter = (filterData) => {
    const keyword = ref('');

    const flattenValues = (obj) => {
        if (obj === null || obj === undefined) return [];
        if (typeof obj === 'string') {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
                return [dayjs(obj).format('YYYY-MM-DD HH:mm:ss')];
            }
            return [obj];
        }
        if (typeof obj !== 'object') return [String(obj)];

        return Object.values(obj).flatMap(value => flattenValues(value));
    };

    const filteredData = computed(() => {
        const kw = keyword.value.toLowerCase();
        if (!kw) return filterData.value;

        return filterData.value.filter(obj => {
            const values = flattenValues(obj);
            return values.some(value => value.toLowerCase().includes(kw));
        });
    });

    return {
        keyword,
        filteredData,
    };
};
