<template>
    <div>
        <Input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" @change="emit('change')" :readonly="readonly" />
        <Button v-if="!readonly" @click="emit('open')">
            <i class="bi bi-search"></i>
        </Button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    readonly: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'open']);
</script>
