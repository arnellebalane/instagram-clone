<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />

      <LoginForm @submit="loginWithEmail" />
      <AuthSeparator />
      <AuthButton @click="loginWithGoogle" />
    </AuthCard>

    <AuthFooter>
      <p>
        Don't have an account?
        <RouterLink :to="{ name: 'register' }">Register</RouterLink>
      </p>
    </AuthFooter>
  </div>
</template>

<script>
import AuthCard from '@components/AuthCard.vue';
import AuthSeparator from '@components/AuthSeparator.vue';
import AuthButton from '@components/AuthButton.vue';
import AuthFooter from '@components/AuthFooter.vue';
import LoginForm from '@components/LoginForm.vue';

export default {
  components: {
    LoginForm,
    AuthCard,
    AuthSeparator,
    AuthButton,
    AuthFooter,
  },

  methods: {
    loginWithEmail(data) {
      console.log(data);
    },

    loginWithGoogle() {
      console.log('login with google');
    },
  },
};
</script>

<style scoped>
@import '@styles/auth.css';

img {
  margin-bottom: 1.6rem;
}
</style>
