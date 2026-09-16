import { createI18n } from 'vue-i18n';
import { localeService } from '@/services/localeService';

const modules = import.meta.glob('./locales/*', { eager: true });
const messages = Object.fromEntries(
    Object.entries(modules).map(([modulePath, module]) => {
        const locale = modulePath.replace(/^.*\/|\.json$/g, '');
        return [locale, module.default];
    })
);

export const i18n = createI18n({
    legacy: false,
    locale: 'ja',
    fallbackLocale: false,
    fallbackWarn: false,
    missing: (locale, key) => key,
    messages,
});

const setNested = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => (acc[key] ??= {}), obj);
    target[lastKey] = value;
};

export const initI18n = async () => {
    const locales = await localeService.getAll();

    const messageMap = {};
    locales.forEach((locale) => {
        Object.entries(locale.translations).forEach(([language, message]) => {
            messageMap[language] ??= {};
            setNested(messageMap[language], locale.id, message);
        });
    });

    Object.entries(messageMap).forEach(([language, messages]) => {
        i18n.global.mergeLocaleMessage(language, messages);
    });
};
