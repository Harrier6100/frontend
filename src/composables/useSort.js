import { get } from 'lodash';

export const useSort = (items) => {
    const sort = ref(null);
    const order = ref(null);
    const { locale } = useI18n();

    const sortedItems = computed(() => {
        if (!Array.isArray(items.value)) return [];
        if (!sort.value) return [...items.value];

        const collator = new Intl.Collator(locale.value, {
            sensitivity: 'base',
            numeric: true,
            ignorePunctuation: true,
        });

        return [...items.value].sort((a, b) => {
            const aValue = get(a, sort.value);
            const bValue = get(b, sort.value);
            const set = order.value === 'asc' ? 1 : -1;

            if (aValue === null || bValue === null) {
                return (aValue === null ? 1 : -1) * set;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return collator.compare(aValue, bValue) * set;
            }

            const aNumber = +aValue;
            const bNumber = +bValue;
            if (!isNaN(aNumber) && !isNaN(bNumber)) {
                return (aNumber - bNumber) * set;
            }

            return (aValue > bValue ? 1 : aValue < bValue ? -1 : 0) * set;
        });
    });

    const sortBy = (key) => {
        if (sort.value === key) {
            if (order.value === 'asc') {
                order.value = 'desc';
            } else {
                sort.value = null;
                order.value = null;
            }
        } else {
            sort.value = key;
            order.value = 'asc';
        }
    };

    const orderBy = (key) => {
        return {
            asc: sort.value === key && order.value === 'asc',
            desc: sort.value === key && order.value === 'desc',
        };
    };

    return {
        sort,
        order,
        sortedItems,
        sortBy,
        orderBy,
    };
};
