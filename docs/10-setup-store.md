# Setup store

1. Install `vuex`

   ```bash
   npm install vuex@next
   ```

1. Create `src/lib/store.js`

   ```js
   import { createStore } from 'vuex';

   const state = {
     currentUser: null,
   };

   const getters = {
     isLoggedIn(state) {
       return state.currentUser !== null;
     },
   };

   const mutations = {
     setCurrentUser(state, user) {
       state.currentUser = user;
     },
   };

   const actions = {};

   const store = createStore({
     state,
     getters,
     mutations,
     actions,
   });

   export default store;
   ```

1. Use the store in the Vue app (`src/index.js`)

   ```diff
     import { createApp } from 'vue';
     import router from '@lib/router';
   + import store from '@lib/store';
     import { auth } from '@lib/firebase';
     import App from '@components/App.vue';

     ...

     const app = createApp(App);
     app.use(router);
   + app.use(store);
     app.mount('#app');
   ```

1. Store current user in vuex store, edit `src/index.js`

   ```diff
     auth.onAuthStateChanged((user) => {
   +   store.commit('setCurrentUser', user);
       if (user) {
         router.push({ name: 'feed' });
       } else {
         router.push({ name: 'login' });
       }
     });
   ```

### Switch to completed branch for this step:

```bash
git checkout 10-setup-store
```

---

- [**Return to previous step**](09-implement-login-feature.md)
- [**Proceed to next step**](11-add-navigation-guards.md)
