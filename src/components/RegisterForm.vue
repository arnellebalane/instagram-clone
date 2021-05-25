<template>
  <form @submit.prevent="submitForm">
    <input type="name" name="name" placeholder="Full name" v-model="name" :disabled="loading" required />
    <input type="email" name="email" placeholder="Email" v-model="email" :disabled="loading" required />
    <input type="password" name="password" placeholder="Password" v-model="password" :disabled="loading" required />

    <button :disabled="loading || !isFormValid">Register</button>
  </form>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },

  emits: ['submit'],

  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },

  computed: {
    isFormValid() {
      return this.name.length > 0 && this.email.length > 0 && this.password.length > 0;
    },
  },

  methods: {
    submitForm() {
      this.$emit('submit', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
@import '@styles/auth-form.css';
</style>
