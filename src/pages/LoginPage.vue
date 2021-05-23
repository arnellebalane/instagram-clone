<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />

      <LoginForm :loading="isLoading" @submit="loginWithEmail" />
      <AuthSeparator />
      <AuthButton :disabled="isLoading" @click="loginWithGoogle" />
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
import firebase, { auth } from '@lib/firebase';
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

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async loginWithEmail(data) {
      this.isLoading = true;
      this.$store.commit('clearError');
      try {
        await auth.signInWithEmailAndPassword(data.email, data.password);
      } catch (error) {
        this.$store.commit('setError', error.message);
      }
      this.isLoading = false;
    },

    async loginWithGoogle() {
      this.isLoading = true;
      this.$store.commit('clearError');
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
      } catch (error) {
        this.$store.commit('setError', error.message);
      }
      this.isLoading = false;
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
