<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />

      <LoginForm />
      <AuthSeparator />
      <AuthButton />
    </AuthCard>

    <AuthFooter>
      <p>
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </AuthFooter>
  </div>
</template>

<script>
import LoginForm from '@components/LoginForm.vue';
import AuthCard from '@components/AuthCard.vue';
import AuthSeparator from '@components/AuthSeparator.vue';
import AuthButton from '@components/AuthButton.vue';
import AuthFooter from '@components/AuthFooter.vue';

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
@import '@styles/auth.css';

img {
  margin-bottom: 1.6rem;
}
</style>
