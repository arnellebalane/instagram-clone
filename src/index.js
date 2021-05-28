import { createApp } from 'vue';
import router from '@lib/router';
import { auth } from '@lib/firebase';
import App from '@components/App.vue';

auth.onAuthStateChanged((user) => {
  if (user) {
    router.push({ name: 'feed' });
  } else {
    router.push({ name: 'login' });
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
