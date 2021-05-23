<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" placeholder="Email" v-model="email" required />
    <input type="password" name="password" placeholder="Password" v-model="password" required />

    <button :disabled="!isFormValid">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    isFormValid() {
      return this.email.length > 0 && this.password.length > 0;
    },
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
@import '_styles/auth-form.css';
</style>
