<template>
  <header class="ProfileHeader">
    <img :src="user.photoURL" :alt="user.name" />

    <div>
      <h1>{{ user.name }}</h1>
      <p>{{ user.description }} lorem</p>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
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
