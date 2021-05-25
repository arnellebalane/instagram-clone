<template>
  <header>
    <img :src="authorPhotoURL" :alt="post.author.displayName" />

    <RouterLink :to="{ name: 'profile', params: { id: post.author.id } }">
      {{ post.author.displayName }}
    </RouterLink>
  </header>
</template>

<script>
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    authorPhotoURL() {
      return this.post.author.photoURL || defaultPhoto;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: 1.6rem;

  padding: 1.6rem;
  border-bottom: 1px solid var(--gray-100);
}

img {
  width: 3.2rem;
  height: 3.2rem;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
}

a {
  font-weight: 700;
}
</style>
