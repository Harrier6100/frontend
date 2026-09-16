import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { i18n, initI18n } from '@/i18n';
import router from '@/router';
import can from '@/directives/can';
import './main.css';

const main = async () => {
    const app = createApp(App);
    app.use(createPinia());
    app.use(i18n);
    app.use(router);

    await initI18n();
    app.directive('can', can);
    app.mount('#app');
};

main();
