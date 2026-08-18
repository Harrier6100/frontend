import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import i18n from '@/i18n';
import { fetchMessages } from '@/i18n/fetchMessages';
import can from '@/directives/can';
import './main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
await fetchMessages();
app.directive('can', can);
app.mount('#app');
