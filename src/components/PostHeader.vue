<template>
  <header>
    <img :src="post.author.photoURL" :alt="post.author.name" />
    <RouterLink :to="{ name: 'profile', params: { id: post.author.id } }">
      {{ post.author.name }}
    </RouterLink>
  </header>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
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
  text-decoration: none;
}
</style>
