<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />

      <LoginForm :disabled="isLoading" @submit="loginWithEmail" />
      <AuthSeparator />
      <AuthButton :disabled="isLoading" @click="loginWithGoogle" />
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
import firebase, { auth } from '@lib/firebase';
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
        console.error(error);
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
        console.error(error);
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
