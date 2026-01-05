<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Form @submit.prevent="onSave">
                <Button @click="emit('close')">{{ t('BUTTON.CLOSE_MODAL') }}</Button>
                <div>
                    <Label>{{ t('LABEL.SPECS.PROPERTY_ID') }}</Label>
                    <PropertyIdInput
                        v-model="spec.propertyId"
                        @change="spec.propertyName = $event?.name ?? ''"
                        @error=""
                        @errorMessage=""
                    />
                </div>
                <div>
                    <Label>{{ t('LABEL.SPECS.PROPERTY_NAME') }}</Label>
                    <Input v-model="spec.propertyName" />
                </div>
                <div>
                    <Label>{{ t('LABEL.SPECS.PROPERTY_ID_NEW') }}</Label>
                    <PropertyIdInput v-model="spec.propertyIdNew" />
                </div>
                <div>
                    <Label>{{ t('LABEL.SPECS.SPEC') }}</Label>
                    <Input v-model="spec.spec" />
                </div>
                <div>
                    <Label>{{ t('LABEL.SPECS.UOM') }}</Label>
                    <Input v-model="spec.uom" />
                </div>
                <div>
                    <Label>{{ t('LABEL.SPECS.SPEC_TYPE') }}</Label>
                    <Select v-model="spec.specType">
                        <option value="00000">00000</option>
                        <option value="01000">01000</option>
                        <option value="00100">00100</option>
                        <option value="01100">01100</option>
                        <option value="00011">00011</option>
                    </Select>
                </div>
                <div v-show="spec.specType.charAt(0) === '1'">
                    <Label>{{ t('LABEL.SPECS.SPEC_VALUE_CONSTANT') }}</Label>
                    <Input v-model="spec.specValues[0]" />
                </div>
                <div v-show="spec.specType.charAt(1) === '1'">
                    <Label>{{ t('LABEL.SPECS.SPEC_VALUE_MIN') }}</Label>
                    <Input v-model="spec.specValues[1]" />
                </div>
                <div v-show="spec.specType.charAt(2) === '1'">
                    <Label>{{ t('LABEL.SPECS.SPEC_VALUE_MAX') }}</Label>
                    <Input v-model="spec.specValues[2]" />
                </div>
                <div v-show="spec.specType.charAt(3) === '1'">
                    <Label>{{ t('LABEL.SPECS.SPEC_VALUE_NOMINAL') }}</Label>
                    <Input v-model="spec.specValues[3]" />
                </div>
                <div v-show="spec.specType.charAt(4) === '1'">
                    <Label>{{ t('LABEL.SPECS.SPEC_VALUE_TOLERANCE') }}</Label>
                    <Input v-model="spec.specValues[4]" />
                </div>
                <div>
                    <Checkbox id="spec-isSpc" v-model="spec.isSpc" />
                    <Label for="spec-isSpc">{{ t('LABEL.SPECS.IS_SPC') }}</Label>
                </div>
                <div>
                    <Checkbox id="spec-isActive" v-model="spec.isActive" />
                    <Label for="spec-isActive">{{ spec.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Label>
                </div>
                <Button type="submit">{{ t('BUTTON.SAVE') }}</Button>
                <Button @click="emit('close')">{{ t('BUTTON.CLOSE') }}</Button>
            </Form>
        </div>
    </teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(['save','close']);

const { t } = useI18n();
const spec = ref({});

watch(() => props.modelValue, (value) => {
    spec.value = {
        ...value,
        specValues: value.specValues ? [...value.specValues] : [null,null,null,null,null]
    }
}, { immediate: true });

watch(() => spec.value.specType, () => {
    spec.value.specValues[0] = null;
    spec.value.specValues[1] = null;
    spec.value.specValues[2] = null;
    spec.value.specValues[3] = null;
    spec.value.specValues[4] = null;
});

const onSave = () => {
    emit('save', spec.value);
    emit('close');
};
</script>
