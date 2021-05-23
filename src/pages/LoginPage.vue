<template>
  <div class="LoginPage">
    <AuthCard>
      <img src="~_assets/images/logo.png" alt="Instagram logo" />

      <LoginForm />
      <AuthSeparator />
      <AuthButton />
    </AuthCard>

    <AuthFooter>
      <p>Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
    </AuthFooter>
  </div>
</template>

<script>
import LoginForm from '_components/LoginForm.vue';
import AuthCard from '_components/AuthCard.vue';
import AuthSeparator from '_components/AuthSeparator.vue';
import AuthButton from '_components/AuthButton.vue';
import AuthFooter from '_components/AuthFooter.vue';

export default {
  components: {
    LoginForm,
    AuthCard,
    AuthSeparator,
    AuthButton,
    AuthFooter,
  },
};
</script>

<style scoped>
.LoginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20rem;
}

img {
  display: block;
  width: 65%;
  margin: 0 auto;
  margin-bottom: 1.6rem;
}

.AuthFooter {
  margin-top: 1rem;
}

.AuthFooter a {
  font-weight: 700;
  text-decoration: none;
  color: var(--primary);
}
</style>
