<template>
  <div class="LoginPage">
    <div class="LoginCard">
      <img src="~_assets/images/logo.png" alt="Instagram logo" />

      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '_components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.LoginPage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.LoginCard {
  max-width: 36rem;
  padding: 3.6rem;
  border: 1px solid var(--gray-200);
  background-color: var(--white);
}

img {
  display: block;
  width: 60%;
  margin: 0 auto;
}
</style>
