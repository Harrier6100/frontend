<template>
    <th
        @click="onClick"
        :role="sortable ? 'button' : undefined"
        :class="{ 'is-sortable': sortable }"
    >
        <slot></slot>
        <span v-if="order.asc">↑</span>
        <span v-else-if="order.desc">↓</span>
    </th>
</template>

<script setup>
const props = defineProps({
    sortKey: String,
    orderBy: Function,
});
const emit = defineEmits(['sort']);

const sortable = computed(() => {
    return !!props.sortKey && typeof props.orderBy === 'function';
});

const onClick = () => {
    if (!sortable.value) return;
    emit('sort', props.sortKey);
};

const order = computed(() => {
    if (!sortable.value) return {};
    return props.orderBy(props.sortKey);
});
</script>

<style scoped>
.is-sortable {
    cursor: pointer;
}
</style>
