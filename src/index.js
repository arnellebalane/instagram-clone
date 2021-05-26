import { createApp } from 'vue';
import router from '@lib/router';
import store from '@lib/store';
import { auth } from '@lib/firebase';
import App from '@components/App.vue';
import '@styles/index.css';

let app;

auth.onAuthStateChanged((user) => {
  store.commit('setCurrentUser', user);

  if (app) {
    router.push({ name: user ? 'feed' : 'login' });
  } else {
    app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
  }
});
