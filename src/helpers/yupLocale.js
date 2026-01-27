import { setLocale } from 'yup';
import i18n from '@/i18n';

export const yupLocale = () => {
    setLocale({
        mixed: {
            required: ({ label }) =>
                i18n.global.t('YUP.REQUIRED', { label }),
        },
    });
};
