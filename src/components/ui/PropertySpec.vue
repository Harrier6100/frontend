<template>
    <teleport to="body">
        <div v-if="isOpen">
            <Button @click="emit('close')">{{ t('BUTTON.CLOSE_MODAL') }}</Button>
            <Form @submit.prevent="onSave">
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.PROPERTY_ID') }}</Label>
                    <PropertyIdInput
                        v-model="spec.propertyId"
                        @change="(property) => {
                            spec.propertyName = property?.name ?? '';
                            spec.uom = property?.uom ?? '';
                        }"
                        @error="({ message }) => errors.propertyId = message"
                    />
                    <Message :error="errors.propertyId" />
                </div>
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.PROPERTY_NAME') }}</Label>
                    <Input v-model="spec.propertyName" />
                </div>
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.PROPERTY_ID_NEW') }}</Label>
                    <PropertyIdInput
                        v-model="spec.propertyIdNew"
                        @error="({ message }) => errors.propertyIdNew = message"
                    />
                    <Message :error="errors.propertyIdNew" />
                </div>
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC') }}</Label>
                    <Input v-model="spec.spec" />
                </div>
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.UOM') }}</Label>
                    <Input v-model="spec.uom" />
                </div>
                <div>
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_TYPE') }}</Label>
                    <Select v-model="spec.specType">
                        <option value="">-</option>
                        <option value="00000">00000</option>
                        <option value="01000">01000</option>
                        <option value="00100">00100</option>
                        <option value="01100">01100</option>
                        <option value="00011">00011</option>
                    </Select>
                </div>
                <div v-show="spec.specType.charAt(0) === '1'">
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE_CONSTANT') }}</Label>
                    <Input v-model="spec.specValues[0]" />
                </div>
                <div v-show="spec.specType.charAt(1) === '1'">
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE_MIN') }}</Label>
                    <Input v-model="spec.specValues[1]" />
                </div>
                <div v-show="spec.specType.charAt(2) === '1'">
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE_MAX') }}</Label>
                    <Input v-model="spec.specValues[2]" />
                </div>
                <div v-show="spec.specType.charAt(3) === '1'">
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE_NOMINAL') }}</Label>
                    <Input v-model="spec.specValues[3]" />
                </div>
                <div v-show="spec.specType.charAt(4) === '1'">
                    <Label>{{ t('LABEL.PROPERTY_SPECS.SPEC_VALUE_TOLERANCE') }}</Label>
                    <Input v-model="spec.specValues[4]" />
                </div>
                <div>
                    <Checkbox id="propertySpec-isSpc" v-model="spec.isSpc" />
                    <Label for="propertySpec-isSpc">{{ t('LABEL.PROPERTY_SPECS.IS_SPC') }}</Label>
                </div>
                <div>
                    <Checkbox id="propertySpec-isActive" v-model="spec.isActive" />
                    <Label for="propertySpec-isActive">{{ spec.isActive ? t('LABEL.IS_ACTIVE_TRUE') : t('LABEL.IS_ACTIVE_FALSE') }}</Label>
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
import { useYup } from '@/composables/yup';

const props = defineProps({
    isOpen: Boolean,
    modelValue: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(['save', 'close']);

const { t } = useI18n();
const { errors } = useYup();

const spec = ref({
    propertyId: '',
    propertyName: '',
    propertyIdNew: '',
    spec: '',
    uom: '',
    specType: '',
    specValues: new Array(5).fill(null),
    isSpc: false,
    isActive: true,
});

watch(() => props.modelValue, (value) => {
    spec.value = {
        ...value,
        specValues: value.specValues
            ? [...value.specValues]
            : [null, null, null, null, null],
    };
}, { immediate: true });

watch(() => spec.value.specType, () => {
    spec.value.specValues = [null, null, null, null, null];
});

const onSave = () => {
    emit('save', spec.value);
    emit('close');
};
</script>
