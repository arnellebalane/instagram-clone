<template>
  <div class="Wrapper">
    <AppHeader v-if="$store.getters.isLoggedIn" />
    <AppError v-if="$store.getters.hasError">{{ $store.state.error }}</AppError>
    <RouterView class="Page" />
  </div>
</template>

<script>
import { auth } from '@lib/firebase';
import AppHeader from '@components/AppHeader.vue';
import AppError from '@components/AppError.vue';
import LoginPage from '@pages/LoginPage.vue';

export default {
  components: {
    AppHeader,
    AppError,
    LoginPage,
  },

  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.commit('setCurrentUser', user);
      if (user) {
        this.$router.push({ name: 'feed' });
      } else if (!this.$route.meta.isPublicPage) {
        this.$router.push({ name: 'login' });
      }
    });
  },
};
</script>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: column;

  max-width: 50rem;
  min-height: 100vh;
  margin: 0 auto;
}

.AppError {
  position: fixed;
  top: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
}

.Page {
  flex-grow: 1;
}
</style>
