import { createApp } from 'vue';
import router from '@lib/router';
import App from '@components/App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app');
