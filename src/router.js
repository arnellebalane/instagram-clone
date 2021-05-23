import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import LoginPage from '@pages/LoginPage.vue';
import RegisterPage from '@pages/RegisterPage.vue';
import FeedPage from '@pages/FeedPage.vue';
import ProfilePage from '@pages/ProfilePage.vue';
import PostPage from '@pages/PostPage.vue';

function ensureLoggedIn() {
  if (!store.getters.isLoggedIn) {
    return { to: { name: 'login' } };
  }
  return true;
}

function ensureLoggedOut() {
  if (store.getters.isLoggedIn) {
    return { to: { name: 'feed' } };
  }
  return true;
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    meta: {
      isPublicPage: true,
    },
    beforeEnter: [ensureLoggedOut],
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      isPublicPage: true,
    },
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
    path: '/:username',
    name: 'profile',
    component: ProfilePage,
    beforeEnter: [ensureLoggedIn],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  store.commit('clearError');
  return true;
});

export default router;
