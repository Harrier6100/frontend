import i18n from '@/i18n';

const t = (key, params) => i18n.global.t(key, params);

export const getYupLocale = () => ({
    mixed: {
        required: ({ label }) => t('YUP.REQUIRED', { label: t(label) }),
    },
});
