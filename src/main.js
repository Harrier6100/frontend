import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import i18n from '@/i18n';
import { fetchMessages } from '@/i18n/fetchMessages';
import router from '@/router';
import can from '@/directives/can';
import './main.css';

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
await fetchMessages();
app.use(router);
app.directive('can', can);
app.mount('#app');
