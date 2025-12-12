import { createI18n } from 'vue-i18n';

const locales = import.meta.glob('./locales/*', { eager: true });

const messages = Object.fromEntries(
    Object.entries(locales).map(([key, value]) => {
        const locale = key.split('/').pop().replace('.json', '');
        return [locale, value];
    })
);

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') ?? 'ja',
    messages,
    missing: (locale, key) => key,
});

export default i18n;
