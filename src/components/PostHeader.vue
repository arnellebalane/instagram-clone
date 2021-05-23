<template>
  <header>
    <img :src="author.photoURL" :alt="author.name" />
    <RouterLink :to="{ name: 'profile', params: { id: author.id } }">
      {{ author.name }}
    </RouterLink>
  </header>
</template>

<script>
export default {
  props: {
    author: {
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
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
}
</style>
