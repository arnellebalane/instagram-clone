<template>
  <form @submit.prevent="handleSubmit">
    <input type="name" name="name" placeholder="Full name" v-model="name" required />
    <input type="email" name="email" placeholder="Email" v-model="email" required />
    <input type="password" name="password" placeholder="Password" v-model="password" required />

    <button :disabled="!isFormValid">Register</button>
  </form>
</template>

<script>
export default {
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
    handleSubmit() {
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
