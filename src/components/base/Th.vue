<template>
    <th
        :role="sortable ? 'button' : undefined"
        @mousedown.prevent
        @click="onSort"
    >
        <slot></slot>
        <span>
            <i v-if="order.asc" class="fa fa-caret-up"></i>
            <i v-if="order.desc" class="fa fa-caret-down"></i>
        </span>
    </th>
</template>

<script setup>
const props = defineProps({
    orderBy: Function,
    sortKey: String,
});
const emit = defineEmits(['sort']);

const sortable = computed(() => {
    return typeof props.orderBy === 'function' && !!props.sortKey;
});

const order = computed(() => {
    if (!sortable.value) return {};
    return props.orderBy(props.sortKey);
});

const onSort = () => {
    if (!sortable.value) return;
    emit('sort', props.sortKey);
};
</script>
