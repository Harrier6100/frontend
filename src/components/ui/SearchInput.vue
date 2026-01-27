<template>
    <div>
        <Input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @change="$emit('change')"
            :readonly="readonly"
        />
        <Button v-if="!readonly" @click="$emit('close')">
            <i class="bi bi-search"></i>
        </Button>
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    readonly: Boolean,
});
defineEmits(['update:modelValue', 'change', 'open']);
</script>
