import { createI18n } from 'vue-i18n';

const locales = import.meta.glob('./locales/*', { eager: true });

const messages = Object.fromEntries(
    Object.entries(locales).map(([locale, message]) => {
        const language = locale.split('/').pop().replace('.json', '');
        return [language, message];
    })
);

const i18n = createI18n({
    locale: localStorage.getItem('language') ?? 'ja',
    messages,
    missing: (locale, key) => key,
    fallbackLocale: false,
    fallbackWarn: false,
    legacy: false,
});

export default i18n;
