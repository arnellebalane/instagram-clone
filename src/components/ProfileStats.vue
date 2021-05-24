<template>
  <ul class="ProfileStats">
    <li>
      <strong>{{ user.postsCount }}</strong> posts
    </li>
    <li>
      <strong>{{ user.followersCount }}</strong> followers
    </li>
    <li>
      <strong>{{ user.followingCount }}</strong> following
    </li>
  </ul>
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
ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 4px;
  padding: 1.2rem 0;
  border-top: 1px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);
  list-style: none;
}

li {
  text-align: center;
  color: var(--gray-500);
}

strong {
  display: block;
  color: var(--gray-900);
}
</style>
