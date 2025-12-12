import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from '@/i18n';
import router from '@/router';
import App from '@/App.vue';
import can from '@/directives/can';
import 'flag-icons/css/flag-icons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.directive('can', can);
const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount('#app');
