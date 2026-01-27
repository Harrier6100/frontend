import { createI18n } from 'vue-i18n';

const modules = import.meta.glob('./locales/*', { eager: true });
const messages = Object.fromEntries(
    Object.entries(modules).map(([module, message]) => {
        const language = module.replace(/^.*\/|\.json$/g, '');
        return [language, message];
    })
);

const i18n = createI18n({
    locale: sessionStorage.getItem('language') ?? 'ja',
    messages,
    missing: (locale, key) => key,
    fallbackLocale: false,
    fallbackWarn: false,
    legacy: false,
});

export default i18n;
