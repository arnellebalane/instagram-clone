# Add navigation guards

1. Delay app initialization until authentication status is determined (`src/index.js`)

   ```diff
   + let app;

     auth.onAuthStateChanged((user) => {
       store.commit('setCurrentUser', user);

   -   if (user) {
   -     router.push({ name: 'feed' });
   -   } else {
   -     router.push({ name: 'login' });
   -   }
   +   if (app) {
   +     router.push({ name: user ? 'feed' : 'login' });
   +   } else {
   +     app = createApp(App);
   +     app.use(router);
   +     app.use(store);
   +     app.mount('#app');
   +   }
     });
   ```

1. Add `ensureLoggedOut` navigation guard in `src/lib/router.js` and use it for public routes

   ```diff
     import { createRouter, createWebHistory } from 'vue-router';
   + import store from '@lib/store';
     import LoginPage from '@pages/LoginPage.vue';
     import RegisterPage from '@pages/RegisterPage.vue';
     import FeedPage from '@pages/FeedPage.vue';
     import ProfilePage from '@pages/ProfilePage.vue';
     import PostPage from '@pages/PostPage.vue';
     import NotFoundPage from '@pages/NotFoundPage.vue';

   + function ensureLoggedOut() {
   +   if (store.getters.isLoggedIn) {
   +     return { name: 'feed' };
   +   }
   +   return true;
   + }

     const routes = [
       {
         path: '/',
         name: 'login',
         component: LoginPage,
   +     beforeEnter: [ensureLoggedOut],
       },
       {
         path: '/register',
         name: 'register',
         component: RegisterPage,
   +     beforeEnter: [ensureLoggedOut],
       },
   ```

1. Add `ensureLoggedIn` navigation guard in `src/lib/router.js` and use it for authenticated routes

   ```diff
   + function ensureLoggedIn() {
   +   if (!store.getters.isLoggedIn) {
   +     return { name: 'login' };
   +   }
   +   return true;
   + }

     function ensureLoggedOut() {
       if (store.getters.isLoggedIn) {
         return { name: 'feed' };
       }
       return true;
     }


     const routes = [
       ...

       {
         path: '/feed',
         name: 'feed',
         component: FeedPage,
   +     beforeEnter: [ensureLoggedIn],
       },
       {
         path: '/p/:id',
         name: 'post',
         component: PostPage,
   +     beforeEnter: [ensureLoggedIn],
       },
       {
         path: '/not-found',
         name: 'not-found',
         component: NotFoundPage,
       },
       {
         path: '/:id',
         name: 'profile',
         component: ProfilePage,
   +     beforeEnter: [ensureLoggedIn],
       },
     ];
   ```

### Switch to completed branch for this step:

```bash
git checkout 11-add-navigation-guards
```

---

- [**Return to previous step**](10-setup-store.md)
- [**Proceed to next step**](12-add-loading-states.md)
