import i18n from '@/i18n';
import { localeService } from '@/services/localeService';

const setNested = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => (acc[key] ??= {}), obj);
    target[lastKey] = value;
};

export const fetchMessages = async () => {
    const locales = await localeService.getAll();
    const messages = {};

    locales.forEach((locale) => {
        Object.entries(locale.translations).forEach(([language, value]) => {
            messages[language] ??= {};
            setNested(messages[language], locale.id, value);
        });
    });

    Object.entries(messages).forEach(([locale, message]) => {
        i18n.global.mergeLocaleMessage(locale, message);
    });
};
