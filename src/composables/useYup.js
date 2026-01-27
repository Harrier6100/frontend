export const useYup = () => {
    const errors = ref({});

    const check = async(schema, form) => {
        try {
            errors.value = {};
            await schema.validate(form, { abortEarly: false });
            return true;
        } catch (err) {
            const errs = {};
            if (err.inner && Array.isArray(err.inner)) {
                err.inner.forEach(e => {
                    const key = e.path || 'error';
                    errs[key] = e.message;
                });
            }
            errors.value = errs;
            return false;
        }
    };

    return {
        errors,
        check,
    };
};
