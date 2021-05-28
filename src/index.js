import { createApp } from 'vue';
import router from '@lib/router';
import store from '@lib/store';
import { auth } from '@lib/firebase';
import App from '@components/App.vue';

auth.onAuthStateChanged((user) => {
  store.commit('setCurrentUser', user);

  if (user) {
    router.push({ name: 'feed' });
  } else {
    router.push({ name: 'login' });
  }
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
