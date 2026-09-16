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
    const resources = await localeService.getAll();

    const messageMap = {};
    resources.forEach((resource) => {
        Object.entries(resource.translations).forEach(([locale, value]) => {
            messageMap[locale] ??= {};
            setNested(messageMap[locale], resource.id, value);
        });
    });

    Object.entries(messageMap).forEach(([locale, translations]) => {
        i18n.global.mergeLocaleMessage(locale, translations);
    });
};
