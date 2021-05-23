<template>
  <div class="Wrapper">
    <LoginPage class="Page" />
  </div>
</template>

<script>
import LoginPage from '_pages/LoginPage.vue';

export default {
  components: {
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
