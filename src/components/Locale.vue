<template>
    <button @click="switchLocale('ja')"><span class="fi fi-jp"></span></button>
    <button @click="switchLocale('en')"><span class="fi fi-us"></span></button>
    <button @click="switchLocale('ko')"><span class="fi fi-kr"></span></button>
</template>

<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';
import { getYupLocale } from '@/i18n/yup';

const { locale } = useI18n();

setLocale(getYupLocale());

watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(getYupLocale());
});

const switchLocale = (newLocale) => {
    locale.value = newLocale;
};
</script>
