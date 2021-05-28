<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />
      <p>Register to see photos and videos from your friends</p>

      <AuthButton filled @click="registerWithGoogle" />
      <AuthSeparator />
      <RegisterForm @submit="registerWithEmail" />
    </AuthCard>

    <AuthFooter>
      <p>
        Have an account?
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </p>
    </AuthFooter>
  </div>
</template>

<script>
import AuthCard from '@components/AuthCard.vue';
import AuthButton from '@components/AuthButton.vue';
import AuthSeparator from '@components/AuthSeparator.vue';
import AuthFooter from '@components/AuthFooter.vue';
import RegisterForm from '@components/RegisterForm.vue';

export default {
  components: {
    AuthCard,
    AuthButton,
    AuthSeparator,
    AuthFooter,
    RegisterForm,
  },

  methods: {
    registerWithEmail(data) {
      console.log(data);
    },

    registerWithGoogle() {
      console.log('register with google');
    },
  },
};
</script>

<style scoped>
@import '@styles/auth.css';

.AuthCard p {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  color: var(--gray-500);
}
</style>
