<template>
  <div class="Wrapper">
    <AppHeader v-if="$store.getters.isLoggedIn" />
    <RouterView class="Page" />
  </div>
</template>

<script>
import AppHeader from '@components/AppHeader.vue';
import LoginPage from '@pages/LoginPage.vue';

export default {
  components: {
    AppHeader,
    LoginPage,
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

.Page {
  flex-grow: 1;
}
</style>
