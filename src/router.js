import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@pages/LoginPage.vue';
import RegisterPage from '@pages/RegisterPage.vue';
import FeedPage from '@pages/FeedPage.vue';
import ProfilePage from '@pages/ProfilePage.vue';
import PostPage from '@pages/PostPage.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    meta: {
      isPublicPage: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      isPublicPage: true,
    },
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
    path: '/:username',
    name: 'profile',
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
