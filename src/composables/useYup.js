import { ref } from 'vue';

export const useYup = () => {
    const errors = ref({});

    const setLabel = (label, schema) => {
        return schema.label(label);
    };

    const run = async (schema, formData) => {
        try {
            errors.value = {};
            await schema.validate(formData, { abortEarly: false });
            return true;
        } catch (err) {
            const newErrors = {};
            if (err.inner && Array.isArray(err.inner)) {
                err.inner.forEach(e => {
                    const key = e.path || 'error';
                    newErrors[key] = e.message;
                });
            }
            errors.value = newErrors;
            return false;
        }
    };

    return {
        errors,
        setLabel,
        run,
    };
};
