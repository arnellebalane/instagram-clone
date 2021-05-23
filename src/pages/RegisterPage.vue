<template>
  <div class="AuthPage">
    <AuthCard>
      <img src="@assets/images/logo.png" alt="Instagram logo" />
      <p>Register to see photos and videos from your friends</p>

      <AuthButton filled :disabled="isLoading" @click="registerWithGoogle" />
      <AuthSeparator />
      <RegisterForm :loading="isLoading" @submit="registerWithEmail" />
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
import firebase, { auth } from '@lib/firebase';
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

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async registerWithEmail(data) {
      this.isLoading = true;
      this.$store.commit('clearError');
      try {
        const credential = await auth.createUserWithEmailAndPassword(data.email, data.password);
        await credential.user.updateProfile({ displayName: data.name });
      } catch (error) {
        this.$store.commit('setError', error.message);
      }
      this.isLoading = false;
    },

    async registerWithGoogle() {
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

.AuthCard p {
  font-weight: 700;
  text-align: center;
  color: var(--gray-500);
}
</style>
