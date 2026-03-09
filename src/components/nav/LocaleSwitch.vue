<template>
    <Button @click="localeSwitch('ja')"><span class="fi fi-jp"></span></Button>
    <Button @click="localeSwitch('en')"><span class="fi fi-us"></span></Button>
</template>

<script setup>
const { locale } = useI18n();

watch(locale, (language) => {
    sessionStorage.setItem('language', language);
});

const localeSwitch = (language) => {
    locale.value = language;
};
</script>
