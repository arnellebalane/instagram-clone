<template>
  <form @submit.prevent="submitForm">
    <img :src="currentUserPhotoURL" :alt="currentUser?.displayName" />
    <input type="text" name="comment" placeholder="Add a comment..." v-model="comment" required />
    <button :disabled="!isFormValid">Post</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  emits: ['submit'],

  data() {
    return {
      comment: '',
    };
  },

  computed: {
    ...mapState(['currentUser']),

    currentUserPhotoURL() {
      return this.currentUser?.photoURL || defaultPhoto;
    },

    isFormValid() {
      return this.comment.length > 0;
    },
  },

  methods: {
    submitForm() {
      this.$emit('submit', {
        comment: this.comment,
      });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
  border-top: 1px solid var(--gray-100);
}

img {
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
}

input {
  flex-grow: 1;
  padding: 8px 0;
  border: none;
  outline: none;
}

button {
  padding: 8px;
  border: none;
  margin-right: -8px;
  font-weight: 700;
  color: var(--primary);
  background: none;
}
</style>
