import { createRouter, createWebHistory } from 'vue-router';
import store from '@lib/store';
import LoginPage from '@pages/LoginPage.vue';
import RegisterPage from '@pages/RegisterPage.vue';
import FeedPage from '@pages/FeedPage.vue';
import ProfilePage from '@pages/ProfilePage.vue';
import PostPage from '@pages/PostPage.vue';
import NotFoundPage from '@pages/NotFoundPage.vue';

function ensureLoggedIn() {
  if (!store.getters.isLoggedIn) {
    return { name: 'login' };
  }
  return true;
}

function ensureLoggedOut() {
  if (store.getters.isLoggedIn) {
    return { name: 'feed' };
  }
  return true;
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    beforeEnter: [ensureLoggedOut],
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    beforeEnter: [ensureLoggedOut],
  },
  {
    path: '/feed',
    name: 'feed',
    component: FeedPage,
    beforeEnter: [ensureLoggedIn],
  },
  {
    path: '/p/:id',
    name: 'post',
    component: PostPage,
    beforeEnter: [ensureLoggedIn],
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
    beforeEnter: [ensureLoggedIn],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
