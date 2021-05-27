<template>
  <form @submit.prevent="submitForm">
    <img :src="currentUserPhotoURL" :alt="currentUser?.displayName" />
    <input
      type="text"
      name="comment"
      placeholder="Add a comment..."
      ref="commentInput"
      v-model="comment"
      :disabled="isLoading"
      required
    />
    <button :disabled="isLoading || !isFormValid">Post</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import firebase, { db } from '@lib/firebase';
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      comment: '',
      isLoading: false,
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
    focusForm() {
      this.$refs.commentInput.focus();
    },

    clearForm() {
      this.comment = '';
    },

    async submitForm() {
      this.isLoading = true;
      this.$store.commit('clearError');

      try {
        await db.collection(`posts/${this.post.id}/comments`).add({
          body: this.comment,
          datePosted: firebase.firestore.FieldValue.serverTimestamp(),
          author: {
            id: this.currentUser.uid,
            displayName: this.currentUser.displayName,
          },
        });
        this.clearForm();
      } catch (error) {
        console.error(error);
        this.$store.commit('setError', 'Failed to save comment. Please try again.');
      }

      this.isLoading = false;
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
