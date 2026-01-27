<template>
    <Button @click="switchLanguage('ja')"><span class="fi fi-jp"></span></Button>
    <Button @click="switchLanguage('en')"><span class="fi fi-us"></span></Button>
</template>

<script setup>
import { setLocale } from 'yup';
import { yupLocale } from '@/helpers';

const { locale, t } = useI18n();

watch(locale, (language) => {
    sessionStorage.setItem('language', language);
    yupLocale();
});

const switchLanguage = (language) => {
    locale.value = language;
};
</script>
