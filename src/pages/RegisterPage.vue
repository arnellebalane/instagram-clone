<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="~_assets/images/logo.png" alt="Instagram logo" />
      <p>Register to see photos and videos from your friends</p>

      <AuthButton filled />
      <AuthSeparator />
      <RegisterForm />
    </AuthCard>

    <AuthFooter>
      <p>
        Have an account?
        <RouterLink to="/">Login</RouterLink>
      </p>
    </AuthFooter>
  </div>
</template>

<script>
import AuthCard from '_components/AuthCard.vue';
import AuthButton from '_components/AuthButton.vue';
import AuthSeparator from '_components/AuthSeparator.vue';
import AuthFooter from '_components/AuthFooter.vue';
import RegisterForm from '_components/RegisterForm.vue';

export default {
  components: {
    AuthCard,
    AuthButton,
    AuthSeparator,
    AuthFooter,
    RegisterForm,
  },
};
</script>

<style scoped>
@import '_styles/auth.css';

.AuthCard p {
  font-weight: 700;
  text-align: center;
  color: var(--gray-500);
}
</style>
