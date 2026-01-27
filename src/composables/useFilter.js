import moment from 'moment';

export const useFilter = (filterData) => {
    const keyword = ref('');

    const flattenValues = (obj) => {
        if (obj === null || obj === undefined) return [];
        if (typeof obj === 'string') {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
                return [moment.utc(obj).local().format('YYYY-MM-DD HH:mm:ss')];
            }
            return [obj];
        }
        if (typeof obj !== 'object') return [String(obj)];

        return Object.values(obj).flatMap(value => flattenValues(value));
    };

    const filteredData = computed(() => {
        const word = keyword.value.toLowerCase();
        if (!word) return filterData.value;

        return filterData.value.filter(obj => {
            const values = flattenValues(obj);
            return values.some(value => value.toLowerCase().includes(word));
        });
    });

    return {
        keyword,
        filteredData,
    };
};
