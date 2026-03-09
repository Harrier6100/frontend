export const useYup = () => {
    const errors = ref({});

    const runYup = async(schema, form) => {
        try {
            errors.value = {};
            await schema.validate(form, { abortEarly: false });

            return true;
        } catch (err) {
            if (err.inner && Array.isArray(err.inner)) {
                err.inner.forEach(e => {
                    const key = e.path || 'error';
                    errors.value[key] = e.message;
                });
            }

            return false;
        }
    };

    return {
        errors,
        runYup,
    };
};
