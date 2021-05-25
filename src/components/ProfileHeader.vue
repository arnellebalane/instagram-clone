<template>
  <header>
    <img :src="userPhotoURL" :alt="user.displayName" />

    <div>
      <h1>{{ user.displayName }}</h1>
      <p>{{ user.description }}</p>
    </div>
  </header>
</template>

<script>
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userPhotoURL() {
      return this.user.photoURL || defaultPhoto;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  gap: 3.6rem;
}

img {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
}

div {
  padding-top: 1.2rem;
}

h1 {
  margin-bottom: 4px;
  font-size: 2.4rem;
  font-weight: 400;
}
</style>
