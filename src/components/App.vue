<template>
  <AppHeader v-if="isLoggedIn" />
  <AppError v-if="hasError">{{ error }}</AppError>

  <div class="Wrapper">
    <RouterView class="Page" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppHeader from '@components/AppHeader.vue';
import AppError from '@components/AppError.vue';
import LoginPage from '@pages/LoginPage.vue';

export default {
  components: {
    AppHeader,
    AppError,
    LoginPage,
  },

  computed: {
    ...mapState(['error']),
    ...mapGetters(['isLoggedIn', 'hasError']),
  },
};
</script>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: column;

  max-width: 50rem;
  min-height: 100vh;
  padding-top: 7.4rem;
  margin: 0 auto;
}

.AppHeader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
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
