<template>
  <form @submit.prevent="submitForm">
    <input type="email" name="email" placeholder="Email" v-model="email" :disabled="disabled" required />
    <input type="password" name="password" placeholder="Password" v-model="password" :disabled="disabled" required />

    <button :disabled="disabled || !isFormValid">Login</button>
  </form>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },

  emits: ['submit'],

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
    submitForm() {
      this.$emit('submit', {
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
