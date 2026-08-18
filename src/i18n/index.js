import { createI18n } from 'vue-i18n';

const modules = import.meta.glob('./locales/*', { eager: true });
const messages = Object.fromEntries(
    Object.entries(modules).map(([module, message]) => {
        const locale = module.replace(/^.*\/|\.json$/g, '');
        return [locale, message.default];
    })
);

const i18n = createI18n({
    legacy: false,
    locale: 'ja',
    fallbackLocale: false,
    fallbackWarn: false,
    missing: (locale, key) => key,
    messages,
});

export default i18n;
