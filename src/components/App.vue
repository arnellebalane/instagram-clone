<template>
  <div class="Wrapper">
    <AppHeader v-if="currentUser" />
    <LoginPage class="Page" />
  </div>
</template>

<script>
import AppHeader from '_components/AppHeader.vue';
import LoginPage from '_pages/LoginPage.vue';

export default {
  components: {
    AppHeader,
    LoginPage,
  },

  data() {
    return {
      currentUser: null,
    };
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
