import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setLocale } from 'yup';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';
import { yupLocale } from '@/helpers';
import can from '@/directives/can';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flag-icons/css/flag-icons.min.css';

yupLocale();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.directive('can', can);
app.mount('#app');
