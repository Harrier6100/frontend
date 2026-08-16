export const useValidation = () => {
    const errors = ref({});

    const validate = async (form, schema) => {
        try {
            errors.value = {};
            await schema.validate(form, { abortEarly: false });
            return true;
        } catch (err) {
            if (err.name !== 'ValidationError') throw err;

            err.inner.forEach(e => {
                errors.value[e.path || 'error'] = e.message;
            });
            return false;
        }
    };

    return {
        errors,
        validate,
    };
};
