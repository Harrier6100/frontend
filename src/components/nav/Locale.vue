<template>
    <Button @click="switchLanguage('ja')"><span class="fi fi-jp"></span></Button>
    <Button @click="switchLanguage('en')"><span class="fi fi-us"></span></Button>
    <Button @click="switchLanguage('ko')"><span class="fi fi-kr"></span></Button>
</template>

<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';

const { locale, t } = useI18n();
const yupLocale = {
    mixed: {
        required: ({ label }) => t('YUP.REQUIRED', { label: t(label) }),
    },
};
setLocale(yupLocale);

watch(locale, (language) => {
    localStorage.setItem('language', language);
    setLocale(yupLocale);
});

const switchLanguage = (language) => {
    locale.value = language;
};
</script>
