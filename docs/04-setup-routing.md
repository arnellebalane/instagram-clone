# Setup routing

1. Create page components

   - `src/pages/LoginPage.vue`

     ```vue
     <template>
       <div class="LoginPage">
         <h1>LoginPage</h1>
       </div>
     </template>
     ```

   - `src/pages/RegisterPage.vue`

     ```vue
     <template>
       <div class="RegisterPage">
         <h1>RegisterPage</h1>
       </div>
     </template>
     ```

   - `src/pages/FeedPage.vue`

     ```vue
     <template>
       <div class="FeedPage">
         <h1>FeedPage</h1>
       </div>
     </template>
     ```

   - `src/pages/ProfilePage.vue`

     ```vue
     <template>
       <div class="ProfilePage">
         <h1>ProfilePage</h1>
       </div>
     </template>
     ```

   - `src/pages/PostPage.vue`

     ```vue
     <template>
       <div class="PostPage">
         <h1>PostPage</h1>
       </div>
     </template>
     ```

   - `src/pages/NotFoundPage.vue`

     ```vue
     <template>
       <div class="NotFoundPage">
         <h1>Sorry, this page does not exist.</h1>
       </div>
     </template>

     <style scoped>
     h1 {
       padding: 3.6rem;
       font-size: 2rem;
       text-align: center;
       color: var(--gray-500);
     }
     </style>
     ```

1. Install `vue-router`

   ```bash
   npm install vue-router@next
   ```

1. Create `src/lib/router.js`

   ```js
   import { createRouter, createWebHistory } from 'vue-router';
   import LoginPage from '@pages/LoginPage.vue';
   import RegisterPage from '@pages/RegisterPage.vue';
   import FeedPage from '@pages/FeedPage.vue';
   import ProfilePage from '@pages/ProfilePage.vue';
   import PostPage from '@pages/PostPage.vue';
   import NotFoundPage from '@pages/NotFoundPage.vue';

   const routes = [
     {
       path: '/',
       name: 'login',
       component: LoginPage,
     },
     {
       path: '/register',
       name: 'register',
       component: RegisterPage,
     },
     {
       path: '/feed',
       name: 'feed',
       component: FeedPage,
     },
     {
       path: '/p/:id',
       name: 'post',
       component: PostPage,
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
     },
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;
   ```

1. Use the router in the Vue app (`src/index.js`)

   ```diff
     import { createApp } from 'vue';
   + import router from '@lib/router';
     import App from '@components/App.vue';

     const app = createApp(App);
   + app.use(router);
     app.mount('#app');
   ```

1. Render the current page component (`src/components/App.vue`)

   ```diff
     <template>
       <div class="Wrapper">
   -     <h1>Hello Vue!</h1>
   +     <RouterView />
       </div>
     </template>
   ```

### Switch to completed branch for this step:

```bash
git checkout 04-setup-routing
```

---

- [**Return to previous step**](03-setup-build-tools.md)
- [**Proceed to next step**](05-implement-login-page-ui.md)
