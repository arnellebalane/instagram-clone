import { createApp } from 'vue';
import router from './router';
import App from '_components/App.vue';
import '_styles/index.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
